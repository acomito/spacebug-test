// TOP LEVEL IMPORTS
import React from 'react';
import { Link, browserHistory } from 'react-router';
//APOLLO
import { graphql } from 'react-apollo';
import { GET_MANUFACTURERS } from '/imports/ui/apollo/queries';
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
class ManufacturersInput extends React.Component {
  render(){
    const { form, data, updateForm, initialValue } = this.props;
    const { getFieldDecorator } = form;

    if (data.loading) { return null }

    if (data && data.manufacturers && data.manufacturers.length < 0) { return null }

    return (
        <FormItem label='Manufacturers ID'>
          {getFieldDecorator('manufacturerId', {
            rules: [{ required: true, message: 'Please choose a ManufacturersInput admin!' }],
            initialValue: initialValue
          })(
            <Select showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
              {data.manufacturers.map(item => {
                return <Option key={item._id} value={item._id}>{item.title}</Option>
              })}
            </Select>
          )}
        </FormItem>
    );
  }
}

export default graphql(GET_MANUFACTURERS)(ManufacturersInput);