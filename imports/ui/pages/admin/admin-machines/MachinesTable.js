// TOP LEVEL IMPORTS
import React from 'react';
import { Link } from 'react-router';
// ANTD
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';

// APOLLO
import { GET_MACHINES } from '/imports/ui/apollo/queries';
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
	  title: 'model',
	  dataIndex: 'machineModel.title',
	  key: 'machineModel.title',
	  render: (text, record) => {
	  	return <Link to={`/admin/machine-models/${record.machineModel._id}`}>{record.machineModel.title}</Link>
	  }
	},
	{
	  title: 'manufacturer',
	  dataIndex: 'machineModel.manufacturer.title',
	  key: 'machineModel.manufacturer.title',
	  render: (text, record) => {
	  	return <Link to={`/admin/manufacturers/${record.machineModel.manufacturer._id}`}>{record.machineModel.manufacturer.title}</Link>
	  }
	},
	{
	  title: 'facility',
	  dataIndex: 'facility.title',
	  key: 'facility.title',
	  render: (text, record) => {
	  	return <Link to={`/admin/facilities/${record.facility._id}`}>{record.facility.title}</Link>
	  }
	},
/*	{
	  title: 'manufacturer.title',
	  dataIndex: 'manufacturer.title',
	  key: 'manufacturer.title',
	  render: (text, record) => {
	  	return <Link to={`/admin/manufacturers/${record.manufacturer._id}`}>{record.manufacturer.title}</Link>
	  }
	},*/
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


class MachinesTable extends React.Component {
	render(){
		
		if (this.props.data.loading) {
			return null
		}
		console.log(this.props.data)
		return (
			<Table
				rowKey={record => record._id} 
				columns={columns} 
				dataSource={this.props.data.machines}  
			/>
		);
	}
}

export default graphql(GET_MACHINES)(MachinesTable);