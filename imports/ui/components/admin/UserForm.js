// TOP LEVEL IMPORTS
import React from 'react';
import { Link, browserHistory } from 'react-router';
//APOLLO
import { graphql } from 'react-apollo';
import { ADMIN_CREATE_USER, SAVE_USER_ACCOUNT } from '/imports/ui/apollo/mutations';
import { GET_USERS , GET_USER_BY_ID } from '/imports/ui/apollo/queries';
//ANTD
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';
// MODULES
import { selectFilterByLabel, alertErrors } from '/imports/modules/helpers'
import { ROLE_OPTIONS, USER_MODEL_TYPES } from '/imports/modules/config';
// COMPNENTS
import { UserInfoInputGroup } from '/imports/ui/components/common/FormInputs'
import { FormErrorArea } from '/imports/ui/components/common/FormErrorArea'



// CONSTANTS & DESTRUCTURING
// ===================================
const FormItem = Form.Item;
const Option = Select.Option


// EXPORTED COMPONENT
// ===================================
class UserForm extends React.Component {

  state = { 
    loading: false,
    errors: []
  };

  onCreate  = (refetchQueries, params) => {
    const { createUser } = this.props;
    createUser({ variables: {  params }, refetchQueries })
    .then(() => {
      message.success('user added!', 3);
      this.setState({ loading: false });
      return this.props.onAdded();
    })
    .catch(e => alertErrors(e, this));
  }
  onSave  = (refetchQueries, params) => {
    const { saveUser, user } = this.props;
    saveUser({ variables: { _id: user._id,params }, refetchQueries })
    .then(() => {
      message.success('user saved!', 3);
      this.setState({ loading: false });
      return this.props.toggleEditing();
    })
    .catch(e => alertErrors(e, this));
  }
  onSuccessfulSubmit = (params) => {
    const { updateForm, user } = this.props;
   
    let refetchQueries = [
      { query: GET_USERS }
    ];
    
    if (!updateForm) {
      this.onCreate(refetchQueries, params)
    } else {
      refetchQueries.push({ query: GET_USER_BY_ID, variables: { _id: user._id } })
      this.onSave(refetchQueries, params)
    }

  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { data, mutate, user, form } = this.props;
    this.setState({loading: true});

    form.validateFields((err, values) => {
      if (err) { return this.setState({ loading: false }); }
      this.onSuccessfulSubmit(values);
    });

  }
  render(){
    const { form, updateForm, user } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Card style={{width: 450, margin: 'auto'}}>
      <Form onSubmit={this.handleSubmit} >
        <UserInfoInputGroup 
          {...this.props}
          initialValue={{
            initialEmail: updateForm && user && user.emails[0].address ? user.emails[0].address : null,
            initialFirstName: updateForm && user && user.profile.firstName ? user.profile.firstName: null,
            initialLastName: updateForm && user && user.profile.lastName ? user.profile.lastName: null,
            initialWorkphone: updateForm && user && user.profile.workPhone ? user.profile.workPhone: null,
            initialCellphone: updateForm && user && user.profile.cellPhone ? user.profile.cellPhone: null,
          }}
        />
        <FormItem label='Roles'>
          {getFieldDecorator('roles', {
            rules: [{ required: false, message: 'Please choose roles!' }],
            initialValue: updateForm && user && user.roles ? user.roles  : []
          })(
            <Select mode='multiple' showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
              {ROLE_OPTIONS.map(item => <Option key={item} value={item}>{item}</Option> )}
            </Select>
          )}
        </FormItem>
{/*        <FormItem label='User Type'>
          {getFieldDecorator('userModelType', {
            initialValue: updateForm && user && user.profile.userModelType ? user.profile.userModelType  : null
          })(
            <Select showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
              {USER_MODEL_TYPES.map(item => <Option key={item} value={item}>{item}</Option> )}
            </Select>
          )}
        </FormItem>*/}
        

        <FormItem>
          <Button loading={this.state.loading} htmlType="submit" type='primary'>
            {!updateForm ? 'ADD USER' : 'SAVE USER'}
          </Button>
        </FormItem>
      </Form>
      <FormErrorArea errors={this.state.errors} />
      </Card>
    );
  }
}


export default 
graphql(ADMIN_CREATE_USER, { name: 'createUser'})(
    graphql(SAVE_USER_ACCOUNT, { name: 'saveUser'})(
      Form.create()(UserForm)
    )
);