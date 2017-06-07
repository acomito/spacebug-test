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
      emailSent: false
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({loading: true})
    let _this = this;
    const { form } = _this.props;
    
    form.validateFields((err, { email }) => {
      if (err) { return formFailure(err, _this); }
      forgotPassword({email}, apollo).then(res =>  {
        this.setState({loading: false, emailSent: true})
        message.success('a recovery email has been sent to your inbox!', 4)
      })
    });
  }
  render(){

    const { form, onCancel } = this.props;
    const { getFieldDecorator } = form;

    if (this.state.emailSent) {
      return (
        <Card style={{border: 0}}>
          <h1 style={{textAlign: 'center', marginBottom: 20, color: '#000'}}>
            Please Check Your Email!
          </h1>
        </Card>
      );
    }

    return (
      <Card style={{ border: 0}}>
        <h1 style={{textAlign: 'center', marginBottom: 20, color: '#000'}}>Forgot Your Password?</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="mail" />} placeholder="Enter your email..." />
            )}
          </FormItem>
          <Button loading={this.state.loading} type="primary" htmlType="submit" size={'large'}>
              Send Instructions
          </Button>
          <Link to='/login' style={{marginTop: 10, display: 'block'}}>
            Need to login?
          </Link>
        </Form>
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
    <div>
      <div style={{width: 400, margin: 'auto', textAlign: 'center', maxWidth: '90%'}} >
          <ForgotPasswordComponent /> 
      </div>
    </div>
  );
}

export default ForgotPassword;

