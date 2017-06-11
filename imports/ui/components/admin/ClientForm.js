// TOP LEVEL IMPORTS
import React from 'react';
import { Link, browserHistory } from 'react-router';
//APOLLO
import { graphql } from 'react-apollo';
import { CREATE_CLIENT, SAVE_CLIENT } from '/imports/ui/apollo/mutations';
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
import { TENANT_MODEL_TYPES, ROLE_OPTIONS, TICKET_MODEL_TYPES, TICKET_CATEGORIES, STATUS_TYPES } from '/imports/modules/config'




// CONSTANTS & DESTRUCTURING
// ===================================
const FormItem = Form.Item;
const Option = Select.Option

 
// EXPORTED COMPONENT
// ===================================
class ClientForm extends React.Component {

  state = { 
    loading: false,
    errors: []
  };

  onCreate = (params, refetchQueries) => {
    const { createClient } = this.props;
    createClient({ variables: { params }, refetchQueries })
      .then(() => {
        message.success('group added!', 3);
        this.setState({ loading: false });
        return this.props.onAdded();
      });
  }
  onSave = (params, refetchQueries) => {
    const { group, saveClient } = this.props;
    let variables = { _id: group._id, params }
    saveClient({ variables, refetchQueries })
      .then(() => {
        message.success('group saved!', 3);
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
    const { form, data, updateForm, client } = this.props;
    const { getFieldDecorator } = form;

    if (data.loading) { return null }

    return (
      <Card style={{width: 450, margin: 'auto'}}>
      <Form onSubmit={this.handleSubmit} >
        <FormItem label="CLIENT Title">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input a CLIENT Title!' }],
            initialValue: updateForm && client && client.title ? client.title : null
          })(
            <Input placeholder="Client Title..." />
          )}
        </FormItem>
        <FormItem label='CLIENT Admin'>
          {getFieldDecorator('clientAdminId', {
            rules: [{ required: false, message: 'Please choose a CLIENT admin!' }],
            initialValue: updateForm && client && client.clientAdminId ? client.clientAdminId : null
          })(
            <Select showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
              {data && data.users && data.users.length > 0 && data.users.map(item => {
                return <Option key={item._id} value={item._id}>{item.profile.firstName} {item.profile.lastName}</Option>
              })}
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button loading={this.state.loading} htmlType="submit" type='primary'>
            {!updateForm  ? 'ADD CLIENT' : 'SAVE CLIENT'}
          </Button>
        </FormItem>
      </Form>
      </Card>
    );
  }
}



export default 
graphql(GET_USERS)(
  graphql(CREATE_CLIENT, { name: 'createClient'})(
    graphql(SAVE_CLIENT, { name: 'saveClient'})(
      Form.create()(ClientForm)
    )
  )
);