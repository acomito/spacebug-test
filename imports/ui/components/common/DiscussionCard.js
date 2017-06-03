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
import DiscussionForm from './DiscussionForm'

const styles = {
	timeStyle: {
		color: '#888', 
		fontStyle: 'italic', 
		fontSize: 10
	},
}


const TopRow = ({ item }) => {
	return (
		<div style={{flex: 1, marginBottom: 15}}>
			<div style={{display: 'flex'}}>
				<div style={{flex: 1}}>
					<img
			          src={item.owner && item.owner.profile && item.owner.profile.image || DEFAULT_AVATAR}
			          style={{height: 40, width: 40, cursor: 'pointer', borderRadius: '50%'}}
			        />
				</div>
				<div style={{flex: 4}}>
					<p style={{fontSize: 15}}>
						{item.owner.profile.firstName} {item.owner.profile.lastName}
					</p> 
					<p style={styles.timeStyle}>
						{timeAgo(item.createdAt)}
					</p>
					
				</div>
				<div style={{flex: 1}} />
			</div>
		</div>
	);
}

const MiddleRow = ({ item }) => {
	return (
		<div style={{flex: 3}}>
			<div style={{display: 'flex'}}>
				<div style={{flex: 1}} />
				<div style={{flex: 5}}>
					<p style={{fontSize: 13}}>{item.messageValue}</p>
				</div>
			</div>
		</div>
	);
}

const BottomRow = ({ item, onClickReply, showForm }) => {
	return (
		<div style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
			<div style={{display: 'flex'}}>
				<div style={{flex: 1}} />
				<div style={{flex: 5}}>
					{item.parentModelType !== 'message' && (
						<p onClick={()=>onClickReply()} className='text-button'>
							REPLY
						</p>
					)}
				</div>
			</div>
		</div>
	);
}


class DiscussionCard extends React.Component {
	state = {
		showForm: false
	}
	onToggleForm = () => {
		let currentState = this.state.showForm;
		this.setState({ showForm: !currentState });
	}
	renderDiscussionForm = () => {
		const { item, user } = this.props;
		if (this.state.showForm) {
			return (
				<DiscussionForm 
					onCancel={this.onToggleForm} 
					parentId={item._id} 
					parentModelType={'message'}
					user={user}
				/>
			)
		}
	}
	render(){
		const { item, onClickReply, showForm } = this.props;
		return (
			<div>
				<Card style={{minHeight: 150, marginTop: 10, maxWidth: '90%', width: 450}} bodyStyle={{height: '100%'}}>
					<div style={{display: 'flex', flexDirection: 'column'}}>
						<TopRow item={item} />
						<div style={{flex: 1}} />
						<MiddleRow item={item} />
						<BottomRow item={item} onClickReply={this.onToggleForm} showForm={this.state.showForm || showForm} />
					</div>
				</Card>
				{/*this.renderDiscussionForm()*/}
			</div>
		);
	}
}




export default DiscussionCard;