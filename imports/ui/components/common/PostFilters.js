// TOP LEVEL IMPORTS
import React from 'react';
import { browserHistory, Link } from 'react-router';
// ANTD
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Checkbox from 'antd/lib/checkbox';
import Collapse from 'antd/lib/collapse';
import DatePicker from 'antd/lib/date-picker';
import Select from 'antd/lib/select';
// APOLLO
import { graphql } from 'react-apollo'
// REDUX
import { connect } from 'react-redux'
import * as actions from '/imports/ui/redux/actions'
import { STATUS_OPTIONS, CATEGORY_OPTIONS } from '/imports/modules/config'
import moment from 'moment'



// CONSTANTS & DESTRUCTURING
// ====================================
const { RangePicker } = DatePicker;
const Panel = Collapse.Panel;
const Option = Select.Option;



// EXPORTED COMPONENT
// ====================================
class PostFilters extends React.Component {
	renderStatusOptions = () => {
		const { statuses, onStatusesChange } = this.props;

			return STATUS_OPTIONS.map(item => {
				return (
					<Checkbox 
						style={{display: 'block'}} 
						key={item}
						checked={statuses.includes(item)}
						onChange={() => onStatusesChange(item)}
					>
						{item}
					</Checkbox>
				)
			})
	}
	renderCategoryOptions = () => {
		const { categories, onCategoriesChange } = this.props;

			return CATEGORY_OPTIONS.map(item => {
				return (
					<Checkbox 
						style={{display: 'block'}} 
						key={item}
						checked={categories.includes(item)}
						onChange={() => onCategoriesChange(item)}
					>
						{item}
					</Checkbox>
				)
			})
	}
	render(){

		
		return (
			<div>
				FILTERS
				{/*<span 
					className='fpm-action-link-sm' 
					onClick={()=>onClearRequestFilters()}
				>
					clear filters
				</span>*/}
				<div>
				  <Collapse bordered={false} defaultActiveKey={['1']}>

				    <Panel header="Status" key="1">
				    	{this.renderStatusOptions()}
				    </Panel>

				    <Panel header="Category" key="2">
				    	{this.renderCategoryOptions()}
				    </Panel>

				  </Collapse>
				</div>
			</div>
		);
	}
}



let mapStateToProps = ({ search }) => {
	return {
		statuses: search.statuses,
		categories: search.categories
	}
}

export default connect(mapStateToProps, actions)(PostFilters);