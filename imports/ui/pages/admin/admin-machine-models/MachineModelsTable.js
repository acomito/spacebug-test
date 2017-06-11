// TOP LEVEL IMPORTS
import React from 'react';
import { Link } from 'react-router';
// ANTD
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';

// APOLLO
import { GET_MACHINE_MODELS } from '/imports/ui/apollo/queries';
import { graphql } from 'react-apollo';
//COMPONENTS



const columns = [
	{
	  title: '_id',
	  dataIndex: '_id',
	  key: '_id',
	  render: _id => <Link to={`/admin/machine-models/${_id}`}>{_id}</Link>,
	},
	{
	  title: 'title',
	  dataIndex: 'title',
	  key: 'title'
	},
	{
	  title: 'category',
	  dataIndex: 'category',
	  key: 'category'
	},
	{
	  title: 'manufacturer',
	  dataIndex: 'manufacturer.title',
	  key: 'manufacturer.title',
	  render: (text, record) => {
	  	return <Link to={`/admin/manufacturers/${record.manufacturer._id}`}>{record.manufacturer.title}</Link>
	  }
	},
/*	{
	  title: 'clientAdminId',
	  dataIndex: 'clientAdminId',
	  key: 'clientAdminId',
	  render: (text, record, index) => {
	  	if (!record.groupAdmin) {
  			return <Alert message="Please assign an admin" type="warning" showIcon/>;
  		}
  		return (
				<p>{record.groupAdmin._id}</p>
			);
		}
	},*/
	// {
	//   title: 'groupAdmin',
	//   dataIndex: 'groupAdmin.title',
	//   key: 'groupAdmin.title',
	//   render: (text, record, index) => {
	//   		if (!record.groupAdmin) {
	//   			return null
	//   			return <Alert message="Please assign an admin" type="warning" />;
	//   		}
	//   		return (
	//   			<Link to={`/admin/users/${record.groupAdmin._id}`}>
	//   				{record.groupAdmin.profile.firstName} {record.groupAdmin.profile.lastName}
	//   			</Link>
	//   		)
	//   	},
	// }
];


class MachineModelsTable extends React.Component {
	render(){
		
		if (this.props.data.loading) {
			return null
		}
		console.log(this.props.data)
		return (
			<Table
				rowKey={record => record._id} 
				columns={columns} 
				dataSource={this.props.data.machineModels}  
			/>
		);
	}
}

export default graphql(GET_MACHINE_MODELS)(MachineModelsTable);