// TOP LEVEL IMPORTS
import React from 'react';
import { Link } from 'react-router';

// ANTD
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import gql from 'graphql-tag';
// APOLLO
import { GET_POSTS } from '/imports/ui/apollo/queries';
import { graphql } from 'react-apollo';




const columns = [
	{
	  title: '_id',
	  dataIndex: '_id',
	  key: '_id',
	  render: _id => <Link to={`/admin/users/${_id}`}>{_id}</Link>,
	},
	{
	  title: 'email',
	  dataIndex: 'emails.0.address',
	  key: 'emails.0.address'
	},
	{
	  title: 'role',
	  dataIndex: 'roles',
	  key: 'roles'
	},
];


class AdminUsersTable extends React.Component {
	render(){
		return (
			<Table
				rowKey={record => record._id} 
				columns={columns} 
				dataSource={this.props.users}  
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
				{/*children ? children : <AdminUsersTable users={users} />*/}
			</div>
		);
	}
}



export default graphql(GET_POSTS)(AdminPostsPage);