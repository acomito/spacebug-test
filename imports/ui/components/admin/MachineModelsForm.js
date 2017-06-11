// TOP LEVEL IMPORTS
import React from 'react';
import { Link, browserHistory } from 'react-router';
//APOLLO
import { graphql } from 'react-apollo';
import { CREATE_MACHINE_MODEL, SAVE_MACHINE_MODEL } from '/imports/ui/apollo/mutations';
import { GET_USERS, GET_CLIENTS } from '/imports/ui/apollo/queries';
//ANTD 
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';
// MODULES
import { states_list, selectFilterByLabel } from '/imports/modules/helpers'
import { MACHINE_MODEL_CATEGORIES, ROLE_OPTIONS, TICKET_MODEL_TYPES, TICKET_CATEGORIES, STATUS_TYPES } from '/imports/modules/config'
import ManufacturersInput from './ManufacturersInput'



// CONSTANTS & DESTRUCTURING
// ===================================
const FormItem = Form.Item;
const Option = Select.Option

 
// EXPORTED COMPONENT
// ===================================
class MachineModelsForm extends React.Component {

  state = { 
    loading: false,
    errors: []
  };

  onCreate = (params, refetchQueries) => {
    const { createMachineModel } = this.props;
        console.log(params)
    createMachineModel({ variables: { params }, refetchQueries })
      .then(() => {
        message.success('machine model added!', 3);
        this.setState({ loading: false });
        return this.props.onAdded();
      });
  }
  onSave = (params, refetchQueries) => {
    const { manufacturer, saveMachineModel } = this.props;
    let variables = { _id: manufacturer._id, params }
    saveMachineModel({ variables, refetchQueries })
      .then(() => {
        message.success('machine model saved!', 3);
        this.setState({ loading: false });
        return this.props.toggleEditing();
      });
  }
  onSuccessfulSubmit = (params) => {

    const { updateForm } = this.props;
    let refetchQueries = [{ query: GET_CLIENTS }];

    if (!updateForm) {
      this.onCreate(params, refetchQueries)
    }
    if (updateForm) {
      this.onSave(params, refetchQueries)
    }
    
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { data, mutate, user, form, updateForm } = this.props;
    this.setState({loading: true});

    form.validateFields((err, values) => {
      if (err) { return console.log(err); }
        this.onSuccessfulSubmit(values); //values is an object passed from antd's form HOC: https://ant.design/components/form/
    });

  }
  render(){
    const { form, data, updateForm, machineModel } = this.props;
    const { getFieldDecorator } = form;

    if (data.loading) { return null }

    return (
      <Card style={{width: 450, margin: 'auto'}}>
      <Form onSubmit={this.handleSubmit} >
        <FormItem label="Title">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input a Client Title!' }],
            initialValue: updateForm && machineModel && machineModel.title ? machineModel.title : null
          })(
            <Input placeholder="Title..." />
          )}
        </FormItem>
        <ManufacturersInput 
          {...this.props}
          initialValue={updateForm && machineModel && machineModel.manufacturerId ? machineModel.manufacturerId  : null}
        />
        
        <FormItem label="category">
          {getFieldDecorator('category', {
            rules: [{ required: true, message: 'Please input a category!' }],
            initialValue: updateForm && machineModel && machineModel.category ? machineModel.category : null
          })(
             <Select showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
              {MACHINE_MODEL_CATEGORIES.map(item => <Option key={item} value={item}>{item}</Option>)}
            </Select>
          )}
        </FormItem>

        <FormItem>
          <Button loading={this.state.loading} htmlType="submit" type='primary'>
            {!updateForm  ? 'ADD Machine Model' : 'SAVE Machine Model'}
          </Button>
        </FormItem>
      </Form>
      </Card>
    );
  }
}



export default 
graphql(GET_CLIENTS)(
  graphql(CREATE_MACHINE_MODEL, { name: 'createMachineModel'})(
    graphql(SAVE_MACHINE_MODEL, { name: 'saveMachineModel'})(
      Form.create()(MachineModelsForm)
    )
  )
);