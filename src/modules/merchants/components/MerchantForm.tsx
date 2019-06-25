import React from 'react'
import { Form, Input, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Merchant } from '../types';

type Props = { merchant: Merchant | null } & FormComponentProps;

// TODO: forwardRef
class MerchForm extends React.Component<Props> {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { merchant } = this.props;
    console.log(merchant);

    return (
      <Form layout = "vertical" >
        <Form.Item label="First name">
          {getFieldDecorator('firstname', {
            rules: [{ required: true, message: 'Required' }],
            initialValue: merchant && merchant.firstname
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Last name">
          {getFieldDecorator('lastname', {
            rules: [{ required: true, message: 'Required' }],
            initialValue: merchant && merchant.lastname
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            // rules: [{ type: 'email', message: 'Type in valid email' }],
            initialValue: merchant ? merchant.email : ''
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone">
          {getFieldDecorator('phone', {
            initialValue: merchant ? merchant.phone : ''
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Avatar url">
          {getFieldDecorator('avatarUrl', {
            rules: [{ type: 'url', message: 'Type in valid url' }],
            initialValue: merchant ? merchant.avatarUrl : '',
          })(<Input />)}
        </Form.Item>
        <Form.Item className="collection-create-form_last-form-item">
          {getFieldDecorator('hasPremium', {
            valuePropName: 'checked',
            initialValue: Boolean(merchant && merchant.hasPremium),
          })(
            <Checkbox>Has premium</Checkbox>
          )}
        </Form.Item>
      </Form>
    )

  }
}

export default Form.create<Props>({
  name: 'createMerchantForm'
})(MerchForm);
