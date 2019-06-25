import { createReducer } from 'typesafe-actions';
import { Merchant } from './types';
import { combineReducers } from 'redux';
import { loadMerchantsAsync, addMerchantAsync, openMerchantModal, closeMerchantModal, editMerchantAsync, cleanupMerchantModal, deleteMerchantAsync } from './actions';
import { merchantListSchema, merchantSchema } from './schema';
import { normalize } from 'normalizr';

export type MerchantEntities = {
  entities: {
    merchants: {
      [merchantId: number]: Merchant;
    }
  };
  result: string[];
};

export interface MerchantEntity extends Omit<MerchantEntities, 'result'> {
  result: string;
}
const initialState: MerchantEntities = {
  entities: {
    merchants: {}
  },
  result: [],
};

type MerchantState = {
  isModalOpen: boolean,
  currentActionType: string,
  currentMerchant: number | null,
  isProcessingMerchant: boolean,
}
const merchantState: MerchantState = {
  isModalOpen: false,
  currentActionType: '',
  currentMerchant: null,
  isProcessingMerchant: false,
}

const isLoadingMerchants = createReducer(false as boolean)
  .handleAction([loadMerchantsAsync.request], () => true)
  .handleAction([loadMerchantsAsync.success, loadMerchantsAsync.failure], () => false);

const handleMerchants = createReducer(merchantState)
  .handleAction([addMerchantAsync.request, editMerchantAsync.request], (state) => ({ ...state, isProcessingMerchant: true }))
  .handleAction([addMerchantAsync.success, editMerchantAsync.success], (state) => ({ ...state, isProcessingMerchant: false }))
  .handleAction([openMerchantModal], (state, action) => ({
    ...state,
    isModalOpen: true,
    currentMerchant: action.payload.merchantId,
    currentActionType: action.payload.actionType
  }))
  .handleAction([cleanupMerchantModal], (state) => ({
    ...state,
    currentMerchant: null,
    currentActionType: ''
  }))
  .handleAction([closeMerchantModal], (state) => ({
    ...state,
    isModalOpen: false,
  }));

const merchants = createReducer(initialState)
  .handleAction(loadMerchantsAsync.success, (state, action) => normalize(action.payload, merchantListSchema))
  .handleAction([addMerchantAsync.success], (state, action) => {
    const newMerchant: MerchantEntity = normalize(action.payload, merchantSchema);

    return {
      ...state,
      entities: {
        ...state.entities,
        merchants: {
          ...state.entities.merchants,
          ...newMerchant.entities.merchants

        }
      },
      result: [
        ...state.result,
        newMerchant.result
      ]
    }
  })
  .handleAction([editMerchantAsync.success], (state, action) => {
    return {
      ...state,
      entities: {
        ...state.entities,
        merchants: {
          ...state.entities.merchants,
          [action.payload.id]: {
            ...state.entities.merchants[action.payload.id],
            ...action.payload
          }
        }
      }
    }
  })
  .handleAction([deleteMerchantAsync.success], (state, action) => {
    const { [action.payload]: omit, ...merchants } = state.entities.merchants
    return {
      ...state,
      entities: {
        merchants
      },
      result: state.result.filter(i => i !== action.payload)
    }
  });

const merchantsReducer = combineReducers({
  isLoadingMerchants,
  merchants,
  handleMerchants,
});

export default merchantsReducer;

export type MerchantsState = ReturnType<typeof merchantsReducer>;
