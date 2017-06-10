import React from 'react';
import AddDocument from '/imports/ui/components/common/AddDocument'
import DocumentsList from '/imports/ui/components/common/DocumentsList';
import PostFilters from '/imports/ui/components/common/PostFilters';
import SearchBox from '/imports/ui/components/common/SearchBox';
// ANTD
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Tag from 'antd/lib/tag';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

const HomePage = ({ user }) => {
	return (
		<Row style={{padding: 20}} type='flex'>
			{/*<Col xs={24} sm={8}>
				<div>
					<SearchBox />
				</div>
				<Card bodyStyle={{padding: 10}} style={{minHeight: 300, width: 225}}>
					<PostFilters />
				</Card>
			</Col>*/}
			<Col xs={24}>
				<DocumentsList user={user.user} />
			</Col>
		</Row>
	);
}

/*const HomePage = ({ user }) => {
	console.log(user)
	return (
		<div style={{padding: 20}}>
			<div style={{height: '100%', marginTop: 15, display: 'flex', alignItems: 'flex-start', justifyContent: 'top'}}>
				<div style={{flex: 1}}>
					<div>
						<SearchBox />
					</div>
					<Card bodyStyle={{padding: 10}} style={{minHeight: 300, width: 225}}>
						<PostFilters />
					</Card>
				</div>
				<div style={{flex: 2}}>
					<DocumentsList user={user.user} />
				</div>
				<div style={{flex: 2}} />
			</div>
		</div>
	);
}*/

export default HomePage;