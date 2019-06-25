import React from 'react'
import { Modal } from 'antd';
import { ModalViewComponentProps } from '../containers/MerchantModal';
import MerchantForm from './MerchantForm';
import { FormComponentProps } from 'antd/lib/form';

export class ModalView extends React.Component<ModalViewComponentProps & { children(props: ModalViewComponentProps): React.ReactChildren }> {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  };

  merchFormRef = React.createRef<React.Component<FormComponentProps>>();

  handleOk = () => {
    const { merchant, editMerchant, createMerchant, deleteMerchant, actionType } = this.props;

    if (actionType === 'DELETE' && merchant) {
      deleteMerchant(merchant.id)
    } else {
      const { form } = this.merchFormRef.current!.props;
      form.validateFields((err, values) => {
        if (!err) {
          if (merchant) {
            editMerchant({ ...values, id: merchant.id })
            form.resetFields();
          } else {
            createMerchant(values);
          }
        }
      })

    }
  };

  handleCancel = () => {
    this.props.closeModal();
  };

  render() {
    const { isVisible, children, merchant, isProcessing, actionType, cleanupModal } = this.props;
    return (
      <>
        <Modal
          visible={isVisible}
          onOk={this.handleOk}
          confirmLoading={isProcessing}
          onCancel={this.handleCancel}
          afterClose={cleanupModal}
        >
          {actionType === 'DELETE' ? <p>Sure?</p> : <MerchantForm
            wrappedComponentRef={this.merchFormRef}
            merchant={merchant}
          />}
        </Modal>
        {children({
          ...this.props
        })}
      </>
    );
  }
}
