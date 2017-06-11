// TOP LEVEL IMPORTS
import React from 'react';
import { Link } from 'react-router';
// COMPONENTS
import DataLink from '/imports/ui/components/common/DataLink'
import DataRow from '/imports/ui/components/common/DataRow'
// APOLLO
import { CLIENT_BY_ID } from '/imports/ui/apollo/queries'
import { graphql } from 'react-apollo';



class AdminClientsSingle extends React.Component {
	renderFacilities = () => {
		const { loading, clientById } = this.props.data;
		if (!loading && clientById.facilities && clientById.facilities.length > 0) {
			return (
				<div>
					<h2>Facilities:</h2>
					{clientById.facilities.map( item => (
						<div key={item._id}>
							<Link  to={`/admin/facilities/${item._id}`}>
								{ item.title }
							</Link>
						</div>
					))}
				</div>
			);
		}
		
	}
	render(){
		
		const { loading, clientById } = this.props.data;

		if ( loading ) { return <div>Loading...</div>; }

		return (
			<div>
				<DataRow 
	            	label={'_id'}
	            	value={clientById._id} 
	          	/>
	          	<DataRow 
	            	label={'title'}
	            	value={clientById.title} 
	          	/>
	          	{this.renderFacilities()}
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

export default graphql(CLIENT_BY_ID, { options })(
	AdminClientsSingle
);