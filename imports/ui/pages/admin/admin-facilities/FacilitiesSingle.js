// TOP LEVEL IMPORTS
import React from 'react';
import { Link } from 'react-router';
// COMPONENTS
import DataLink from '/imports/ui/components/common/DataLink'
import DataRow from '/imports/ui/components/common/DataRow'
// APOLLO
import { FACILITY_BY_ID } from '/imports/ui/apollo/queries'
import { graphql } from 'react-apollo';



class AdminFacilitiesSingle extends React.Component {
	renderMachines = () => {
		const { loading, facilityById } = this.props.data;
		if (facilityById && facilityById.machines && facilityById.machines.length > 0) {
			return (
				<div>
					<h2>Machines:</h2>
					{facilityById.machines.map( item => (
						<div key={item._id}>
							<Link to={`/admin/machines/${item._id}`}>{item.title}</Link>
						</div>
					))}
				</div>
			)
		}
	}
	render(){
		
		const { loading, facilityById } = this.props.data;

		if ( loading ) { return <div>Loading...</div>; }

		return (
			<div>
				<DataRow 
	            	label={'_id'}
	            	value={facilityById._id} 
	          	/>
	          	<DataRow 
	            	label={'title'}
	            	value={facilityById.title || null} 
	          	/>
	          	<DataRow 
	            	label={'client'}
	            	value={<Link  to={`/admin/clients/${facilityById.client._id}`}>
								{ facilityById.client.title }
							</Link>} 
	          	/>
	          	{facilityById && facilityById.location && (
	          		<div>
	          			<DataRow 
			            	label={'street'}
			            	value={facilityById.location.street || null} 
			          	/>
			          	<DataRow 
			            	label={'street1'}
			            	value={facilityById.location.street1 || null} 
			          	/>
			          	<DataRow 
			            	label={'street2'}
			            	value={facilityById.location.street2 || null} 
			          	/>
			          	<DataRow 
			            	label={'city'}
			            	value={facilityById.location.city || null}  
			          	/>
			          	<DataRow 
			            	label={'postal'}
			            	value={facilityById.location.postal || null}  
			          	/>
			          	<DataRow 
			            	label={'state'}
			            	value={facilityById.location.state || null} 
			          	/>
			          	<DataRow 
			            	label={'country'}
			            	value={facilityById.location.country || null} 
			          	/>
	          		</div>
	          	)}
	          	{this.renderMachines()}
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

export default graphql(FACILITY_BY_ID, { options })(
	AdminFacilitiesSingle
);