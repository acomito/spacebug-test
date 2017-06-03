
import React from 'react';
import { browserHistory, Link } from 'react-router';
// MODULES
import { formatDate, timeAgo } from '/imports/modules/helpers';
import { DEFAULT_AVATAR } from '/imports/modules/config';
// ANTD
import Table from 'antd/lib/table';
import Popconfirm from 'antd/lib/popconfirm';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Tabs from 'antd/lib/tabs';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tag from 'antd/lib/tag';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import DiscussionCard from './DiscussionCard'
import DiscussionForm from './DiscussionForm'

const styles = {
	timeStyle: {
		color: '#888', 
		fontStyle: 'italic', 
		fontSize: 10
	},
	showOrHideText: {
		color: '#888',
		marginTop: 12,
		cursor: 'pointer'
	},
	textButton: {
		color: 'blue',
		marginTop: 12,
		cursor: 'pointer'
	}
}


class DiscussionCardArea extends React.Component {
	state = {
		showForm: false,
		showComments: false
	}
	onToggleForm = () => {
		let currentState = this.state.showForm;
		this.setState({ showForm: !currentState });
	}
	onToggleComments = () => {
		let currentState = this.state.showComments;
		this.setState({ showComments: !currentState });
	}
	renderComments = () => {
		const { item } = this.props;

		if (this.state.showForm) {
			return (
				<DiscussionForm 
					onCancel={this.onToggleForm} 
					parentId={item._id} 
					parentModelType={'message'} 
				/>
			)
		}
	}
	renderDiscussionForm = () => {
		const { item } = this.props;
		if (this.state.showForm) {
			return (
				<DiscussionForm 
					onCancel={this.onToggleForm} 
					parentId={item._id} 
					parentModelType={'message'} 
				/>
			)
		}
	}
	renderComments = () => {
		const { item, onClickReply, showForm, user } = this.props;

		if (item.messages && item.messages.length > 0) {
			return item.messages.map( comment => {
				return <DiscussionCard key={comment._id} item={comment} user={user} />
			})
		}
	}
	renderCommentsButton = () => {
		const { item, onClickReply, showForm } = this.props;

		if (this.state.showComments) {
			return (
				<div>
					<p onClick={this.onToggleComments} style={styles.showOrHideText}>
						hide comments
					</p>
					{this.renderComments()}
					<p onClick={this.onToggleComments} style={styles.showOrHideText}>
						hide comments
					</p>
				</div>
			)
		} else {
			return (
				<p onClick={this.onToggleComments} style={styles.showOrHideText}>
					show comments ({item.messages && item.messages.length})
				</p>
			)
		}
	}
	render(){
		const { item, onClickReply, showForm } = this.props;
		
		return (
			<div>
				<DiscussionCard {...this.props} />
				<div style={{marginLeft: 20, paddingLeft: 20, borderLeft: '1px solid #efefef'}}>
					{this.renderCommentsButton()}
				</div>
				{this.renderDiscussionForm()}
			</div>
		);
	}
}


export default DiscussionCardArea;