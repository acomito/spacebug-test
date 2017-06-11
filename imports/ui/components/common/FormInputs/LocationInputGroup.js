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
import { PRIORITY_OPTIONS } from '/imports/modules/config'

// CONSTANTS & DESTRUCTURING
// ===================================
const FormItem = Form.Item;
const FormGroup = Input.Group;
const Option = Select.Option

// EXPORTED COMPONENT
// ===================================

class LocationInputGroup extends React.Component {
  render(){
    const { form, initialValue, label, required, message } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const { initialState, initialCountry, initialStreet1, initialStreet2, initialCity, initialSuburb, initialPostal  } = initialValue;
    return (
      <Row gutter={10}>
       <Col xs={24}>
        <FormItem label={'location.street1'}>
          {getFieldDecorator('location.street1', {
            rules: [{ required, message }],
            initialValue: initialStreet1
          })(
            <Input placeholder="street1..." />
          )}
        </FormItem>
        </Col>
          <Col xs={24}>
        <FormItem label={'location.street2'}>
          {getFieldDecorator('location.street2', {
            rules: [{ required, message }],
            initialValue: initialStreet2
          })(
            <Input placeholder="street2..." />
          )}
        </FormItem>
         </Col>
      <Col xs={12}>
        <FormItem label={'location.city'}>
          {getFieldDecorator('location.city', {
            rules: [{ required, message }],
            initialValue: initialCity
          })(
            <Input placeholder="city..." />
          )}
        </FormItem>
      </Col>
      <Col xs={12}>
        <FormItem label={'location.postal'}>
          {getFieldDecorator('location.postal', {
            rules: [{ required, message }],
            initialValue: initialPostal
          })(
            <Input placeholder="postal..." />
          )}
        </FormItem>
      </Col>
      <Col xs={12}>
        <FormItem label={'location.suburb'}>
          {getFieldDecorator('location.suburb', {
            rules: [{ required, message }],
            initialValue: initialSuburb
          })(
            <Input placeholder="suburb..." />
          )}
        </FormItem>
      </Col>
      <Col xs={12}>
        <FormItem label={'State'}>
          {getFieldDecorator('location.state', {
            rules: [{ required, message }],
            initialValue: initialState
          })(
            <Select showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
              {states_list.map(({abbreviation, name}) => {
                return <Option key={abbreviation} value={abbreviation}>{name}</Option>
              })}
            </Select>
          )}
        </FormItem>
      </Col>
        
        
        <Col xs={12}>
        
        <FormItem label={'country'}>
          {getFieldDecorator('location.country', {
            rules: [{ required, message }],
            initialValue: initialCountry || 'United States of America'
          })(
            <Select showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
              {country_list.map(item => {
                return <Option key={item} value={item}>{item}</Option>
              })}
            </Select>
          )}
        </FormItem>
        </Col>
        </Row>
    );
  }
}

LocationInputGroup.propTypes = {
  label: PropTypes.string,
  form: PropTypes.object,
  initialValue: PropTypes.oneOfType([ PropTypes.string, PropTypes.object, PropTypes.number, PropTypes.array ]),
  message: PropTypes.string,
  required: PropTypes.bool
};

// Specifies the default values for props:
LocationInputGroup.defaultProps = {
  label: 'Priority',
  initialValue: null,
  message: 'Please choose a Priority!',
  required: false
};


export { LocationInputGroup };