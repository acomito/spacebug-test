// TOP LEVEL IMPORTS
import React from 'react';
import { Link, browserHistory } from 'react-router';
//APOLLO
import { graphql } from 'react-apollo';
import { GET_MACHINE_MODELS } from '/imports/ui/apollo/queries';
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
class MachineModelInput extends React.Component {
  render(){
    const { form, data, updateForm, initialValue } = this.props;
    const { getFieldDecorator } = form;

    if (data.loading) { return null }

    if (data && data.machineModels && data.machineModels.length < 0) { return null }

    return (
        <FormItem label='Machine Model ID'>
          {getFieldDecorator('machineModelId', {
            rules: [{ required: true, message: 'Please choose a machineModelId admin!' }],
            initialValue: initialValue
          })(
            <Select showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
              {data.machineModels.map(item => {
                return <Option key={item._id} value={item._id}>{item.title}</Option>
              })}
            </Select>
          )}
        </FormItem>
    );
  }
}

export default graphql(GET_MACHINE_MODELS)(MachineModelInput);