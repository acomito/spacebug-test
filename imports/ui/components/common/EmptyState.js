// TOP LEVEL IMPORTS
import React from 'react';
import PropTypes from 'prop-types';
// ANTD
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
import Tag from 'antd/lib/tag';



const EmptyState = ({ header, subheader, image, actionLink }) => {
	return (
		<div style={{width: 500, margin: 'auto', maxWidth: '99%', minHeight: 250, display:'flex', alignItems: 'center', justifyContent: 'center'}}>
			<div style={{textAlign: 'center'}}>
				{image && image}
				<h3>{ header }</h3>
				<h4 style={{color: '#888', margin: 0}}>{ subheader }</h4>
				{actionLink && actionLink}
			</div>
		</div>
	);
}

EmptyState.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string,
  image: PropTypes.object,
  actionLink: PropTypes.object,
};

// Specifies the default values for props:
EmptyState.defaultProps = {
  header: '',
  subheader: '',
  image: null,
  actionLink: null
};

export default EmptyState;
