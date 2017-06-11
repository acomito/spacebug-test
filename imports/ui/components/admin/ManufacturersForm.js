// TOP LEVEL IMPORTS
import React from 'react';
import { Link, browserHistory } from 'react-router';
//APOLLO
import { graphql } from 'react-apollo';
import { CREATE_MANUFACTURER, SAVE_MANUFACTURER } from '/imports/ui/apollo/mutations';
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
import { ROLE_OPTIONS, STATUS_TYPES } from '/imports/modules/config'
import ClientInput from './ClientInput'



// CONSTANTS & DESTRUCTURING
// ===================================
const FormItem = Form.Item;
const Option = Select.Option

 
// EXPORTED COMPONENT
// ===================================
class ManufacturersForm extends React.Component {

  state = { 
    loading: false,
    errors: []
  };

  onCreate = (params, refetchQueries) => {
    const { createManufacturer } = this.props;
    createManufacturer({ variables: { params }, refetchQueries })
      .then(() => {
        message.success('manufacturer added!', 3);
        this.setState({ loading: false });
        return this.props.onAdded();
      });
  }
  onSave = (params, refetchQueries) => {
    const { manufacturer, saveManufacturer } = this.props;
    let variables = { _id: manufacturer._id, params }
    saveManufacturer({ variables, refetchQueries })
      .then(() => {
        message.success('manufacturer saved!', 3);
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
    const { form, data, updateForm, facility } = this.props;
    const { getFieldDecorator } = form;

    if (data.loading) { return null }

    return (
      <Card style={{width: 450, margin: 'auto'}}>
      <Form onSubmit={this.handleSubmit} >
        <FormItem label="Title">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input a Client Title!' }],
            initialValue: updateForm && facility && facility.title ? facility.title : null
          })(
            <Input placeholder="Title..." />
          )}
        </FormItem>
        <FormItem label="Website">
          {getFieldDecorator('website', {
            rules: [{ required: true, message: 'Please input a website!' }],
            initialValue: updateForm && facility && facility.website ? facility.website : null
          })(
            <Input placeholder="Website..." />
          )}
        </FormItem>

        
        {/*<ClientInput 
          {...this.props}
          initialValue={updateForm && user && user.profile.clientId ? user.profile.clientId  : null}
        />*/}
        <FormItem>
          <Button loading={this.state.loading} htmlType="submit" type='primary'>
            {!updateForm  ? 'ADD MANUFACTURER' : 'SAVE MANUFACTURER'}
          </Button>
        </FormItem>
      </Form>
      </Card>
    );
  }
}



export default 
graphql(GET_CLIENTS)(
  graphql(CREATE_MANUFACTURER, { name: 'createManufacturer'})(
    graphql(SAVE_MANUFACTURER, { name: 'saveManufacturer'})(
      Form.create()(ManufacturersForm)
    )
  )
);