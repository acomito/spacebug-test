import React from 'react';
import AddDocument from '/imports/ui/components/common/AddDocument'
import DocumentsList from '/imports/ui/components/common/DocumentsList';
//antd
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import InputNumber from 'antd/lib/input-number';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';

const FriendList = () => {
	return (
		<div style={{padding: 20}}>
			<Card>
				FRIEND
			</Card>
			<Card>
				FRIEND
			</Card>
			<Card>
				FRIEND
			</Card>
			<Card>
				FRIEND
			</Card>
			<Card>
				FRIEND
			</Card>
		</div>
	);
}
 
const AppMyFriends = () => {
	return (
		<div style={{padding: 20}}>
			<FriendList />
		</div>
	);
}

export default AppMyFriends;