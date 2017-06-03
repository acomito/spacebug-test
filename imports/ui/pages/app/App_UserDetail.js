import React from 'react';
import AddDocument from '/imports/ui/components/common/AddDocument'
import DocumentsList from '/imports/ui/components/common/DocumentsList';
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
// APOLLO
import { graphql } from 'react-apollo';
import { GET_USER_BY_ID } from '/imports/ui/apollo/queries';


const UserCard = ({ item }) => {
	console.log(item)
	return (
		<div style={{padding: 20}}>
			<Card>
				{ item.profile.firstName }
			</Card>
		</div>
	);
}
 
class AppUserDetail extends React.Component {
	render(){
		if (this.props.data.loading) {
			return null
		}
		return (
			<div style={{padding: 20}}>
				<UserCard item={this.props.data.getUserById} />
			</div>
		);
	}
}

let options = (props) =>  {
	let variables = {
		_id: props.params._id
	};
	return { variables }
}

export default graphql(GET_USER_BY_ID, { options })(AppUserDetail);

