import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';
// MODULES
import { formatDate, timeAgo } from '/imports/modules/helpers';
import { DEFAULT_AVATAR } from '/imports/modules/config';
// ANTD
import Table from 'antd/lib/table';
import Popconfirm from 'antd/lib/popconfirm';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Tabs from 'antd/lib/tabs';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tag from 'antd/lib/tag';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
// COMPONENTS
import DiscussionCard from './DiscussionCard'
import { FormErrorArea } from '/imports/ui/components/common/FormErrorArea'
// APOLLO
import { CREATE_MESSAGE } from '/imports/ui/apollo/mutations'
import { GET_POST_BY_ID } from '/imports/ui/apollo/queries'
import { graphql} from 'react-apollo';

const styles = {
	timeStyle: {
		color: '#888', 
		fontStyle: 'italic', 
		fontSize: 10
	},
	textButton: {
		color: 'blue',
		marginTop: 12,
		cursor: 'pointer'
	},
	cardStyles: {
		minHeight: 150, marginTop: 10, maxWidth: '95%', width: 500
	}
}

class DiscussionForm extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			loading: false,
			messageValue:'',
			errors: []
		}
	}
	onTextAreaChange = (e) => {
		this.setState({messageValue: e.target.value})
	}
	onSubmit = () => {
		let errors = []
		this.setState({ loading: true, errors });
		if (this.state.messageValue.length < 2) {
			let newError = 'Please type more than two characters...'
			errors.push(newError)
			return this.setState({ loading: false, errors });
		}
		let variables = {
			params: {
				parentId: this.props.parentId,
				parentModelType: this.props.parentModelType,
				messageValue: this.state.messageValue
			}
		}
		let params = { _id: this.props.parentId }
		let refetchQueries = [
			{ 
				query: GET_POST_BY_ID, 
				variables: { _id: this.props.parentId }
			}
		]
		this.props.createMessage({ variables, refetchQueries }).then(res => {
			this.setState({loading: false, messageValue:  ''});
			message.success('Your comment was posted!')
			console.log(variables)
			this.props.onCancel()
		});
	}
	render(){
		const { onCancel, user } = this.props;
		return (
			<Card style={styles.cardStyles} bodyStyle={{height: '100%'}}>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					<div style={{flex: 1, marginBottom: 15}}>
						<div style={{display: 'flex', alignItem: 'center', justifyContent: 'center'}}>
							<div style={{flex: 1}}>
								<img
						          src={user && user.profile && user.profile.image || DEFAULT_AVATAR}
						          style={{height: 30, width: 30, cursor: 'pointer', borderRadius: '50%'}}
						        />
							</div>
							<div style={{flex: 4}}>
								<h3 style={{margin: 0}}>
									Leave a reply 
									<span 
										onClick={() => onCancel()}
										style={{color: '#888', marginLeft: 4, cursor: 'pointer', fontSize: 10 }}
									>
										(cancel)
									</span>
								</h3>
							</div>
							<div style={{flex: 1}} />
						</div>
					</div>
				</div>
				<div style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
					<div style={{display: 'flex'}}>
						<div style={{flex: 1}} />
						<div style={{flex: 5}} className='discussion-form-container'>
							<Input 
								placeholder="Type your reply here..." 
								disabled={this.state.loading} 
								type="textarea"
								onChange={this.onTextAreaChange}
								rows={4} 
							/>
							{!this.state.loading 
								? <p onClick={this.onSubmit} className='text-button'>SEND</p>
								: <p className='text-button'>SENDING...</p>
							}
						</div>
					</div>
				</div>
				<FormErrorArea errors={this.state.errors} />
			</Card>
		);
	}
}

DiscussionForm.propTypes = {
  onCancel: PropTypes.func,
  parentId: PropTypes.string,
  parentModelType: PropTypes.string,
  user: PropTypes.object
};

// Specifies the default values for props:
DiscussionForm.defaultProps = {
  onCancel: () => console.log('on cancel default'),
  parentId: '',
  parentModelType: '',
  user: {}
};


export default graphql(CREATE_MESSAGE, { name: 'createMessage' })(DiscussionForm);