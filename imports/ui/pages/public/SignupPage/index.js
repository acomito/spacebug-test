import React from 'react';
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
//
import SignupForm from '/imports/ui/components/common/SignupForm';
//common
import { AlreadyLoggedIn } from '/imports/ui/components/common/AlreadyLoggedIn'


class SignupPage extends React.Component {
	getContent = () => {
		const { data } = this.props;
		
		if (!data || !data.user || data.user === null) {
			return <SignupForm /> 
		} else {
			return <AlreadyLoggedIn user={data.user} />
		}

	}
	render(){
		const { data } = this.props.data
		return (
			<div>
				{this.getContent()}
			</div>
		);
	}
}

export { SignupPage };