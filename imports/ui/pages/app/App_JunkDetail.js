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
import { GET_POST_BY_ID } from '/imports/ui/apollo/queries';
import PostCard from '/imports/ui/components/common/PostCard'
import DiscussionForm from '/imports/ui/components/common/DiscussionForm'
//import DiscussionArea from '/imports/ui/components/common/DiscussionArea';

class CommentCard extends React.Component {
	render(){
		const { item } = this.props;
		return (
			<Card style={{width: 200, marginTop: 5}}>
				{ item.messageValue }
			</Card>
		);
	}
}

class CommentArea extends React.Component {
	render(){
		const { items } = this.props;
		return (
			<div style={{padding: 10}}>
				{items.map( item => {
					return <CommentCard key={item._id} item={ item } />
				})}
			</div>
		);
	}
}


class AppJunkDetail extends React.Component {
	state = { showForm: false }
	toggleDiscussionForm = () => {
		let currentState = this.state.showForm;
		this.setState({ showForm: !currentState });
	}
	renderDiscussionForm = () => {

		if (this.state.showForm) {
			return (
				<DiscussionForm 
					onCancel={this.toggleDiscussionForm} 
					parentModelType={'post'} 
					parentId={this.props.data.post._id} 
				/>
			);
		}

		if (!this.state.showForm) {
			return (
				<div>
					<Button onClick={this.toggleDiscussionForm}>
						Comment
					</Button>
				</div>
			);
		}
	}
	render(){
		
		if (this.props.data.loading) {
			return null
		}

		return (
			<div>
				<PostCard item={this.props.data.post} />
				{this.renderDiscussionForm()}
				<CommentArea 
					items={this.props.data.post.comments}
				/>
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

export default graphql(GET_POST_BY_ID, { options })(AppJunkDetail);

