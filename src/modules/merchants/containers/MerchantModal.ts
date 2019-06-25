import { MerchantsState } from "../reducer";
import { connect } from "react-redux";
import { ModalView } from "../components/ModalView";
import { openMerchantModal, closeMerchantModal, addMerchantAction, editMerchantAction, deleteMerchantAction, cleanupMerchantModal } from "../actions";

const mapStateToProps = (state: MerchantsState) => ({
  isVisible: state.handleMerchants.isModalOpen,
  isProcessing: state.handleMerchants.isProcessingMerchant,
  actionType: state.handleMerchants.currentActionType,
  merchant: state.handleMerchants.currentMerchant ? state.merchants.entities.merchants[state.handleMerchants.currentMerchant] : null,
});

const mapDispatchToProps = {
  openModal: openMerchantModal,
  closeModal: closeMerchantModal,
  createMerchant: addMerchantAction,
  editMerchant: editMerchantAction,
  deleteMerchant: deleteMerchantAction,
  cleanupModal: cleanupMerchantModal,
}

export type ModalViewComponentProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(ModalView as any);
