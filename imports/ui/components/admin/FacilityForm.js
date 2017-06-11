// TOP LEVEL IMPORTS
import React from 'react';
import { Link, browserHistory } from 'react-router';
//APOLLO
import { graphql } from 'react-apollo';
import { CREATE_FACILITY, SAVE_FACILITY } from '/imports/ui/apollo/mutations';
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
import { states_list, selectFilterByLabel, alertErrors } from '/imports/modules/helpers'
import { TENANT_MODEL_TYPES, ROLE_OPTIONS, TICKET_MODEL_TYPES, TICKET_CATEGORIES, STATUS_TYPES } from '/imports/modules/config'
import ClientInput from './ClientInput'
import { LocationInputGroup } from '/imports/ui/components/common/FormInputs'
import { FormErrorArea } from '/imports/ui/components/common'


// CONSTANTS & DESTRUCTURING
// ===================================
const FormItem = Form.Item;
const Option = Select.Option

 
// EXPORTED COMPONENT
// ===================================
class FacilityForm extends React.Component {

  state = { 
    loading: false,
    errors: []
  };

  onCreate = (params, refetchQueries) => {
    const { createFacility } = this.props;
    createFacility({ variables: { params }, refetchQueries })
      .then(() => {
        message.success('facility added!', 3);
        this.setState({ loading: false });
        return this.props.onAdded();
      })
      .catch(e => alertErrors(e, this));
  }
  onSave = (params, refetchQueries) => {
    const { facility, saveFacility } = this.props;
    let variables = { _id: facility._id, params }
    saveFacility({ variables, refetchQueries })
      .then(() => {
        message.success('facility saved!', 3);
        this.setState({ loading: false });
        return this.props.toggleEditing();
      })
      .catch(e => alertErrors(e, this));
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
      if (err) { return this.setState({loading: false}); }
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
        <ClientInput 
          {...this.props}
          initialValue={updateForm && facility && facility.clientId ? facility.clientId  : null}
        />
        <LocationInputGroup
          {...this.props}
          initialValue={{
            initialState: updateForm && facility && facility.location && facility.location.state ? facility.location.state : null,
            initialCountry: updateForm && facility && facility.location && facility.location.country ? facility.location.country : null,
            initialStreet1: updateForm && facility && facility.location && facility.location.street1 ? facility.location.street1 : null,
            initialStreet2: updateForm && facility && facility.location && facility.location.street2 ? facility.location.street2 : null,
            initialCity: updateForm && facility && facility.location && facility.location.city ? facility.location.city : null, 
            initialSuburb: updateForm && facility && facility.location && facility.location.suburb ? facility.location.suburb : null, 
            initialPostal: updateForm && facility && facility.location && facility.location.postal ? facility.location.postal : null, 
          }}
        />
        <FormItem>
          <Button loading={this.state.loading} htmlType="submit" type='primary'>
            {!updateForm  ? 'ADD FACILITY' : 'SAVE FACILITY'}
          </Button>
        </FormItem>
      </Form>
      <FormErrorArea errors={this.state.errors} />
      </Card>
    );
  }
}



export default 
graphql(GET_CLIENTS)(
  graphql(CREATE_FACILITY, { name: 'createFacility'})(
    graphql(SAVE_FACILITY, { name: 'saveFacility'})(
      Form.create()(FacilityForm)
    )
  )
);