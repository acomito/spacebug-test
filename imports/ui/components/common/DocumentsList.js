import React from 'react';
import { browserHistory, Link } from 'react-router';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Tag from 'antd/lib/tag';
// APOLLO
import { graphql } from 'react-apollo';
import { GET_POSTS } from '/imports/ui/apollo/queries';
import PostCard from '/imports/ui/components/common/PostCard'



class DocumentsList extends React.Component {
	render() {
		console.log(this.props)
		if (this.props.data.loading) {
			return <p>loading....</p>
		}
		if (!this.props.data.posts && this.props.data.posts.length < 0) {
			return <p>no junk yet....</p>
		}
		return (
			<div style={{height: '100%', marginTop: 15, display: 'flex', alignItems: 'flex-start', justifyContent: 'top'}}>
				<div style={{flex: 1}}>
					<Card style={{height: 200, width: 150}}>
						FILTERS GO HERE
					</Card>
				</div>
				<div style={{flex: 3}}>
					{this.props.data.posts.map( item => {
						return <PostCard key={item._id} item={item} />
					})}
				</div>
			</div>
		);
	}
}



export default graphql(GET_POSTS)(DocumentsList)