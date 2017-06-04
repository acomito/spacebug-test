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
import { GET_MY_POSTS } from '/imports/ui/apollo/queries';
import PostCard from '/imports/ui/components/common/PostCard';


const StuffCard = ({ item }) => {
	return (
		<Card>
			{ item.title }
		</Card>
	);
}

const StuffList = ({ items, user }) => {
	if (!items || !items.length < 0) {
		return null
	}

	return (
		<div>
			{items.map( item => <PostCard key={item._id} item={item} user={user} />)}
		</div>
	);
}
 
class AppMyStuff extends React.Component {
	render(){

		if (this.props.data.loading || this.props.user.loading) {
			return null
		}

		return (
			<div style={{width: 600, maxWidth: '98%', margin: 'auto'}}>
				<AddDocument />
				<StuffList items={this.props.data.myPosts} user={this.props.user.user} />
			</div>
		);
	}
}

export default graphql(GET_MY_POSTS)(AppMyStuff);
