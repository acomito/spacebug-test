import React from 'react';
import { browserHistory } from 'react-router';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Tag from 'antd/lib/tag';
// APOLLO
import { graphql } from 'react-apollo';
import { GET_DOCUMENTS } from '/imports/ui/apollo/queries';

class JunkCard extends React.Component {
	render() {
		const { item } = this.props;
		return (
			<Card style={{margin: 20}} title={item.title}>
				<p>{item.content}</p>
				<Tag>{item.category}</Tag>
			</Card>
		);
	}
}


class DocumentsList extends React.Component {
	render() {
		console.log(this.props)
		if (this.props.data.loading) {
			return <p>loading....</p>
		}
		if (!this.props.data.documents && this.props.data.documents.length < 0) {
			return <p>no junk yet....</p>
		}
		return (
			<div style={{padding: 20, width: 450, maxWidth: '90%'}}>
				{this.props.data.documents.map( item => {
					return <JunkCard key={item._id} item={item} />
				})}
			</div>
		);
	}
}



export default graphql(GET_DOCUMENTS)(DocumentsList)