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
import PostForm from '/imports/ui/components/common/PostForm'

//import DiscussionArea from '/imports/ui/components/common/DiscussionArea';

class CommentCard extends React.Component {
	render(){
		const { item } = this.props;
		return (
			<Card style={{marginTop: 10, maxWidth: '99%', width: 500}}> 
				{ item.messageValue }
			</Card>
		);
	}
}



class CommentArea extends React.Component {
	render(){
		const { items } = this.props;
		return (
			<div>
				{items.map( item => {
					return <CommentCard key={item._id} item={ item } />
				})}
			</div>
		);
	}
}


class AppJunkDetail extends React.Component {
	state = { 
		showDiscussionForm: false,
	}
	toggleDiscussionForm = () => {
		let currentState = this.state.showDiscussionForm;
		this.setState({ showDiscussionForm: !currentState });
	}
	renderDiscussionForm = () => {

		if (this.state.showDiscussionForm) {
			return (
				<DiscussionForm 
					onCancel={this.toggleDiscussionForm} 
					parentModelType={'post'} 
					parentId={this.props.data.post._id} 
				/>
			);
		}

		if (!this.state.showDiscussionForm) {
			return (
				<div>
					<Button onClick={this.toggleDiscussionForm} size='large' type='primary' style={{marginTop: 15}}>
						Comment
					</Button>
				</div>
			);
		}
	}
	render(){
		
		if (this.props.data.loading) { return null } // render nothing if loading

		if (!this.props.data.post) {
			return (
				<div style={{width: 600, maxWidth: '98%', margin: 'auto'}}>
					<p style={{textAlign: 'center'}}>can't find this item</p>
				</div>
			)
		}

		return (
			<div style={{width: 600, maxWidth: '98%', margin: 'auto'}}>
				<PostCard 
					item={this.props.data.post} 
					user={this.props.user.user} 
					toggleEditForm={this.toggleEditForm}
				/>
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

