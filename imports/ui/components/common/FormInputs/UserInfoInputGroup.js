// TOP LEVEL IMPORTS
import React from 'react';
import PropTypes from 'prop-types';
//ANTD 
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
// MODULES
import { selectFilterByLabel, states_list, country_list } from '/imports/modules/helpers'

// CONSTANTS & DESTRUCTURING
// ===================================
const FormItem = Form.Item;
const FormGroup = Input.Group;
const Option = Select.Option

// EXPORTED COMPONENT
// ===================================

class UserInfoInputGroup extends React.Component {
  render(){
    const { form, initialValue, label, required, message } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const { initialEmail, initialFirstName, initialLastName, initialWorkphone, initialCellphone  } = initialValue;
    return (
      <Row gutter={10}>
        <FormItem label="Email" colon={false}>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input a Email!' }],
            initialValue: initialEmail
          })(
            <Input placeholder="Email..." />
          )}
        </FormItem>
        <FormItem label="First Name" colon={false}>
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input a First Name!' }],
            initialValue: initialFirstName
          })(
            <Input placeholder="First Name..." />
          )}
        </FormItem>
        <FormItem label="Last Name" colon={false}>
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input a Last Name!' }],
            initialValue: initialLastName
          })(
            <Input placeholder="Last Name..." />
          )}
        </FormItem>
        <FormItem label="Work Phone" colon={false}>
          {getFieldDecorator('workPhone', {
            rules: [{ required: false, message: 'Please input a Work Phone!' }],
            initialValue: initialWorkphone
          })(
            <Input placeholder="Work Phone..." />
          )}
        </FormItem>
        <FormItem label="Cell Phone" colon={false}>
          {getFieldDecorator('cellPhone', {
            rules: [{ required: false, message: 'Please input a Cell Phone!' }],
            initialValue: initialCellphone
          })(
            <Input placeholder="Cell Phone..." />
          )}
        </FormItem>
        </Row>
    );
  }
}

UserInfoInputGroup.propTypes = {
  label: PropTypes.string,
  form: PropTypes.object,
  initialValue: PropTypes.oneOfType([ PropTypes.string, PropTypes.object, PropTypes.number, PropTypes.array ]),
  message: PropTypes.string,
  required: PropTypes.bool
};

// Specifies the default values for props:
UserInfoInputGroup.defaultProps = {
  label: 'Priority',
  initialValue: null,
  message: 'Please choose a Priority!',
  required: true
};


export { UserInfoInputGroup };