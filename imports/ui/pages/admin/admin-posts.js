// TOP LEVEL IMPORTS
import React from 'react';
import { Link } from 'react-router';

// ANTD
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import gql from 'graphql-tag';
// APOLLO
import { GET_ALL_POSTS } from '/imports/ui/apollo/queries';
import { graphql } from 'react-apollo';




const columns = [
	{
	  title: '_id',
	  dataIndex: '_id',
	  key: '_id',
	  render: _id => <Link to={`/admin/posts/${_id}`}>{_id}</Link>,
	},
	{
	  title: 'title',
	  dataIndex: 'title',
	  key: 'title',
	},
	{
	  title: 'description',
	  dataIndex: 'description',
	  key: 'description',
	},
	{
	  title: 'category',
	  dataIndex: 'category',
	  key: 'category',
	},
];


class AdminPostsTable extends React.Component {
	render(){
		return (
			<Table
				rowKey={record => record._id} 
				columns={columns} 
				dataSource={this.props.data.allPosts}  
			/>
		);
	}
}

class AdminPostsPage extends React.Component {
	render(){
		const { data, children } = this.props;
		const { loading, users } = data;

		if (loading) { return <div>Loading...</div>; }

		return (
			<div>
				{children ? children : <AdminPostsTable {...this.props} />}
			</div>
		);
	}
}



export default graphql(GET_ALL_POSTS)(AdminPostsPage);