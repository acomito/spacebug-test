
import React from 'react';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router';
//antd
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import InputNumber from 'antd/lib/input-number';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';
import Alert from 'antd/lib/alert';
//
import ApolloClient from '/imports/ui/apollo/ApolloClient'
//
import { handleLogin } from '../../../../modules/helpers'
import { FormErrorArea } from '../../../components/common'

const FormItem = Form.Item;



class FormComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = { loading: false, errors: [] };
	}
	onSubmit = (e) => {
	  	e.preventDefault();
	  	let _this = this;
	  	_this.setState({ loading: true, errors: [] });
	  	const { form, client } = _this.props;
	    form.validateFields( (err, {email, password}) => {
	    	if (err) { return _this.setState({ loading: false }); }
	    	return handleLogin(email, password, _this);
	    });
	}
	render() {
    const { getFieldDecorator } = this.props.form;
    return (
		<div style={{width: 500, margin: 'auto', textAlign: 'center'}} >
			<Card style={{height: 370, width: 500, border: 0}}>
				<h1 style={{textAlign: 'center', marginBottom: 20, color: '#000'}}>Log in</h1>
				<Form onSubmit={this.onSubmit} >
					<FormItem hasFeedback>
						{getFieldDecorator('email', {
							rules: [
								{ required: true, message: 'Input your Email!' },
								{ type: 'email', message: 'The input is not valid E-mail!'}
							],
							
						})(
							<Input prefix={<Icon type="mail" />} placeholder="Email" />
						)}
					</FormItem>
					<FormItem hasFeedback>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your Password!' }],
						})(
							<Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />
						)}
						<Link style={{marginTop: 0, textAlign: 'left', display: 'inherit'}} to='/forgot-password'>Forgot Password?</Link>
						<Link style={{marginTop: 10, textAlign: 'left', display: 'inherit'}} to='/signup'>Or signup</Link>
					</FormItem>

					<Button size={'large'} loading={this.state.loading} type="default" htmlType="submit" style={{position: 'absolute', right: 31}}>
						{!this.state.loading ? 'Log In' : 'Logging In...'}
					</Button>
					
				</Form>
			</Card>
			<div>
				{/*<Link style={{marginTop: 10}} to='/signup'>Need an Account?</Link>*/}
			</div>
			<FormErrorArea errors={this.state.errors} />
		</div>
    );
  }
}

const LoginForm = Form.create()(FormComponent);

export default LoginForm;