// top-level imports
import React from 'react';
import { Link, browserHistory } from 'react-router';
//antd
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
// apollo
import { forgotPassword } from 'meteor-apollo-accounts'
import apollo from '/imports/ui/apollo/ApolloClient'
import { LOGIN_LOGO, LOGIN_IMAGE } from '/imports/modules/config';
import { alertErrors} from '/imports/modules/helpers';
import { FormErrorArea } from '/imports/ui/components/common'

// CONSTANTS & DESTRUCTURING
// ====================================
const FormItem = Form.Item;


// STYLES
// ====================================
  const styles = {
    cardStyles: {
      maxWidth: 400,
      width: 400,
      margin: "0px auto",
      padding: 0,
    },
    loginButton: {
      width: '100%'
    }
  };



// INTERNAL COMPONENTS
// ====================================

class ForgotPasswordForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loading: false,
      emailSent: false,
      errors: []
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    let errors = [];
    this.setState({loading: true, errors})
    let _this = this;
    const { form } = _this.props;
    
    form.validateFields((err, { email }) => {
      if (err) { return this.setState({loading: false, submitted: false, errors }); }
      forgotPassword({email}, apollo)
      .then(res =>  {
        this.setState({loading: false, emailSent: true, errors})
        message.success('a recovery email has been sent to your inbox!', 4)
      })
      .catch( e => alertErrors(e, this))
    });
  }
  render(){

    const { form, onCancel } = this.props;
    const { getFieldDecorator } = form;


    if (this.state.emailSent) {
      return (
         <Card bodyStyle={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} style={{height: 257}}>
          <div style={{textAlign: 'center'}}>
            <Icon style={{fontSize: 50, marginBottom: 10}} type='like-o' />
            <h2 style={{textAlign: 'center', margin: 0, color: '#000'}}>
              Please Check Your Email!
            </h2>
            <h3 style={{textAlign: 'center', margin: 0, color: '#888'}}>
             A password reset link has been sent to your email!
            </h3>
           </div>
         </Card>
      );
    }

    return (
      <Card>
        <h1 style={{textAlign: 'center', marginBottom: 20, color: '#000'}}>Forgot Your Password?</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'An email is required!'},
                { type: 'email' , message: 'Please input a valid email!' }
              ],
            })(
              <Input prefix={<Icon type="mail" />} placeholder="Enter your email..." />
            )}
          </FormItem>
          <Button loading={this.state.loading} disabled={this.state.loading} htmlType="submit" type='primary' size='large'>
              Send Instructions
          </Button>
          <Link to='/login' style={{marginTop: 10, display: 'block'}} >
            Need to login?
          </Link>
        </Form>
        <FormErrorArea errors={this.state.errors} />
      </Card>
    );
  }
}



// EXPORTED COMPONENT
// ====================================
const ForgotPasswordComponent = Form.create()(ForgotPasswordForm);




// EXPORT
// ====================================
const ForgotPassword = () => {
  return (
    <div style={{width: 400, maxWidth: '95%', margin: 'auto', textAlign: 'center'}} >
     <ForgotPasswordComponent /> 
    </div>
  );
}

export default ForgotPassword;

