import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { Merchant } from "./types";
import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

export const loadMerchantsAsync = createAsyncAction(
  'LOAD_MERCHANTS_REQUEST',
  'LOAD_MERCHANTS_SUCCESS',
  'LOAD_MERCHANTS_FAIL',
  )<undefined, Merchant[], Error>();

export const loadMerchantsAction = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
  dispatch(loadMerchantsAsync.request())

  try {
    const response = await fetch(process.env.REACT_APP_API_URL as string);
    const merchants = await response.json()
    dispatch(loadMerchantsAsync.success(merchants));
  } catch (e) {
    dispatch(loadMerchantsAsync.failure(e));
  }
}

export const addMerchantAsync = createAsyncAction(
  'ADD_MERCHANT_REQUEST',
  'ADD_MERCHANT_SUCCESS',
  'ADD_MERCHANT_FAIL',
)<undefined, Merchant, Error>();

export const editMerchantAsync = createAsyncAction(
  'EDIT_MERCHANT_REQUEST',
  'EDIT_MERCHANT_SUCCESS',
  'EDIT_MERCHANT_FAIL',
)<undefined, Merchant, Error>();

export const deleteMerchantAsync = createAsyncAction(
  'DELETE_MERCHANT_REQUEST',
  'DELETE_MERCHANT_SUCCESS',
  'DELETE_MERCHANT_FAIL',
)<undefined, number, Error>();

export const addMerchantAction = (data: Merchant): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
  dispatch(addMerchantAsync.request());

  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL as string,
      {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      }
    );
    const merchant = await response.json();
    dispatch(addMerchantAsync.success({ ...merchant, bids: [] }));
    dispatch(closeMerchantModal())

  } catch (e) {
    dispatch(addMerchantAsync.failure(e));
  }
}
export const editMerchantAction = (data: Merchant): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
  dispatch(editMerchantAsync.request());

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL as string}/${data.id}`,
      {
        method: 'put',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const merchant = await response.json();

    dispatch(editMerchantAsync.success(merchant));
    dispatch(closeMerchantModal())

  } catch (e) {
    dispatch(editMerchantAsync.failure(e));
  }
}

export const deleteMerchantAction = (id: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
  dispatch(deleteMerchantAsync.request());

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL as string}/${id}`,
      {
        method: 'delete',
      }
    );

    dispatch(deleteMerchantAsync.success(id));
    dispatch(closeMerchantModal())

  } catch (e) {
    dispatch(deleteMerchantAsync.failure(e));
  }
}

export const openMerchantModal = createStandardAction('OPEN_MERCHANT_MODAL')<{ merchantId?: number, actionType?: string } | null>();
export const closeMerchantModal = createStandardAction('CLOSE_MERCHANT_MODAL')();
export const cleanupMerchantModal = createStandardAction('CLEANUP_MERCHANT_MODAL')();
