// TOP LEVE IMPORTS
import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';
// ANTD
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Tag from 'antd/lib/tag';
import Icon from 'antd/lib/icon';
import Popconfirm from 'antd/lib/popconfirm';
// MODULES
import { DEFAULT_AVATAR, DEFAULT_POST_IMAGE } from '/imports/modules/config';
import { timeAgo } from '/imports/modules/helpers';



const PostOwner = ({ item }) => {
	let { owner } = item;
	return (
		<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
			<div style={{flex: 1}}>
				<Link to={`/app/users/${owner._id}`}>
					<img 
						alt="post-avatar" 
						style={{height: 40, width: 40, borderRadius: '50%'}} 
						src={owner && owner.profile.image || DEFAULT_AVATAR} 
					/>
				</Link>
			</div>
			<div style={{flex: 3}}>
				<span>posted by
					<Link style={{fontSize: 14, marginLeft: 3}} to={`/app/users/${item.owner._id}`}>
							{`${owner.profile.firstName} ${owner.profile.lastName}`}
					</Link>
				</span>
			</div>
			<div style={{flex: 2}} />
		</div>
	);
}

const PostTitle = ({ item }) => {
	return (
		<div style={{display: 'flex'}}>
			<h1>{item.title}</h1>
		</div>
	);
}

const PostInfo = ({ item }) => {
	return (
		<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
			<div style={{flex: 1, minHeight: 30}}>
				<p>{item.description}</p>
			</div>
			<div style={{flex: 1, minHeight: 30}}>
				<Tag>{item.category}</Tag>
				<Tag>{item.status}</Tag>
			</div>
		</div>
	);
}


class PostBottom extends React.Component {
	onDeletePost = () => {
		message.warning('post was deleted!');
	}
	render(){
		const { item, user } = this.props;
			return (
				<div style={{display: 'flex', height: 30, justifyContent: 'center', alignItems: 'center', flex: 1}}>
					<div style={{flex: 1}}>
						<span style={{color: '#e74c3c'}} >
							<Icon type="heart" style={{color: '#e74c3c'}} /> {item.numberOfLikes} likes
						</span>
					</div>
					<div style={{flex: 1}}>
						<Icon type="message" style={{color: '#888', cursor: 'pointer', marginRight: 4}} /> 
							<Link to={`/app/junk/${item._id}`}>
								{item.numberOfComments} comments
							</Link>
					</div>
					<div style={{flex: 1}}>
						<Link to={`/app/junk/${item._id}`}>VIEW</Link>
					</div>
					{item.owner._id === user._id && (
						<div style={{flex: 1}}>
							<Link to={`/app/junk/${item._id}`}>EDIT</Link>
						</div>
					)}
					{item.owner._id === user._id && (
						<div style={{flex: 1}}>
							<Popconfirm title="Are you sure delete this post?" onConfirm={this.onDeletePost} okText="Yes" cancelText="No">
							   <a href="#">DELETE</a>
							</Popconfirm>
						</div>
					)}
				</div>
			);
	}
}


const PostBody = ({ item, user }) => {
	return (
		<div style={{padding: '10px 16px'}}>
			<PostTitle item={item} />
	      	<PostInfo item={item}  />
			<PostBottom item={item} user={user} />
	    </div>
	);
}

const PostTop = ({ item }) => {
	return (
		<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
			<div style={{flex: 1, height: 60, width: '100%'}}>
		      	<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
			      	<div style={{flex: 3}}>
				      <PostOwner item={item} />
				    </div>
				    <div style={{flex: 1}}>
				      <span style={{color: '#888'}}>
				      	<Icon color={'#888'} style={{marginRight: 3}} type="clock-circle-o" /> 
				      	{timeAgo(item.createdAt)}
				      </span>
				    </div>
			    </div>
		    </div>
	      	<div style={{flex: 1}}>
		      <img alt="post-image" style={{display: 'block', width: '100%'}} src={item.image || DEFAULT_POST_IMAGE} />
		    </div>
	    </div>
	);
}


class PostCard extends React.Component {
	render() {
		const { item, user } = this.props;
		return (
			<Card 
				style={{marginTop: '20px', maxWidth: '99%', width: 500}} 
				bodyStyle={{paddingBottom: 5}}
			>
				<PostTop item={item} />
				<PostBody item={item} user={user} />
			</Card>
		);
	}
}

PostCard.propTypes = {
  item: PropTypes.object,
  user: PropTypes.object,
};

// Specifies the default values for props:
PostCard.defaultProps = {
  item: null,
  user: null,
};



export default PostCard
