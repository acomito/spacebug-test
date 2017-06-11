// TOP LEVEL IMPORTS
import React from 'react';
// COMPONENTS
import { ChangePassword } from '/imports/ui/components/common';
// APOLLO
import { MANUFACTURER_BY_ID } from '/imports/ui/apollo/queries'
import { graphql } from 'react-apollo';
import DataLink from '/imports/ui/components/common/DataLink'
import DataRow from '/imports/ui/components/common/DataRow'


class AdminManufacturersSingle extends React.Component {
	render(){
		
		const { loading, manufacturerById } = this.props.data;

		if ( loading ) { return <div>Loading...</div>; }

		return (
			<div>
				<DataRow 
	            	label={'_id'}
	            	value={manufacturerById._id} 
	          	/>
	          	<DataRow 
	            	label={'title'}
	            	value={manufacturerById.title} 
	          	/>
	          	<DataRow 
	            	label={'website'}
	            	value={manufacturerById.website} 
	          	/>
			</div>
		);

	}
}

let options = (props) => {
	return { 
		variables: { 
			_id: props.params._id 
		} 
	} 
}

export default graphql(MANUFACTURER_BY_ID, { options })(
	AdminManufacturersSingle
);