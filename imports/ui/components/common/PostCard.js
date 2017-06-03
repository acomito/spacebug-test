import React from 'react';
import { browserHistory, Link } from 'react-router';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Tag from 'antd/lib/tag';
import Icon from 'antd/lib/icon';

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
			<h2>{item.title}</h2>
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


const PostBottom = ({ item }) => {
	return (
		<div style={{display: 'flex', height: 30, justifyContent: 'center', alignItems: 'center', flex: 1}}>
			<div style={{flex: 1}}>
				<span style={{color: '#e74c3c'}} >
					<Icon type="heart" style={{color: '#e74c3c'}} /> {item.numberOfLikes} likes
				</span>
			</div>
			<div style={{flex: 1}}>
				<Icon type="message" style={{color: '#888', cursor: 'pointer'}} /> 
					<Link to={`/app/junk/${item._id}`}>
						{item.numberOfComments} comments
					</Link>
			</div>
			<div style={{flex: 2}} />
			<div style={{flex: 1}}>
				<Link to={`/app/junk/${item._id}`}>VIEW</Link>
			</div>
		</div>
	);
}

const PostBody = ({ item }) => {
	return (
		<div style={{padding: '10px 16px'}}>
			<PostTitle item={item} />
	      	<PostInfo item={item} />
			<PostBottom item={item} />
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
		const { item } = this.props;
		return (
			<Card 
				style={{margin: 20, maxWidth: '90%', width: 500, margin: 'auto'}} 
				bodyStyle={{paddingBottom: 5}}
			>
				<PostTop item={item} />
				<PostBody item={item} />
			</Card>
		);
	}
}


export default PostCard
