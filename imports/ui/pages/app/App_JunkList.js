import React from 'react';
import AddDocument from '/imports/ui/components/common/AddDocument'
import DocumentsList from '/imports/ui/components/common/DocumentsList';


const HomePage = () => {
	return (
		<div style={{padding: 20}}>
			AppJunkList
		</div>
	);
}

class AppJunkList extends React.Component {
	render(){
		const props = Object.assign({}, this.props);
		delete props.children;
		return (
			<div>
				{this.props.children ? React.cloneElement(this.props.children, {...props}) : <HomePage {...this.props} />}
			</div>
		);
	}
}

export default AppJunkList