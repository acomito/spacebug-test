// TOP LEVEL IMPORTS
import React from 'react';
import { Link, browserHistory } from 'react-router';
//APOLLO
import { graphql } from 'react-apollo';
import { GET_FACILITIES } from '/imports/ui/apollo/queries';
//ANTD 
import Icon from 'antd/lib/icon';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
// MODULES
import { selectFilterByLabel } from '/imports/modules/helpers'


// CONSTANTS & DESTRUCTURING
// ===================================
const FormItem = Form.Item;
const Option = Select.Option



// EXPORTED COMPONENT
// ===================================
class FacilityInput extends React.Component {
  render(){
    const { form, data, updateForm, building, initialValue } = this.props;
    const { getFieldDecorator } = form;

    if (data.loading) { return null }

    return (
        <FormItem label='Facility ID'>
          {getFieldDecorator('facilityId', {
            rules: [{ required: true, message: 'Please choose a Facility!' }],
            initialValue: initialValue
          })(
            <Select showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
              {data && data.facilities && data.facilities.length > 0 && data.facilities.map(item => {
                return <Option key={item._id} value={item._id}>{item.title}</Option>
              })}
            </Select>
          )}
        </FormItem>
    );
  }
}

export default graphql(GET_FACILITIES)(FacilityInput);