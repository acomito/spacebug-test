
import React from 'react';
import PropTypes from 'prop-types';
//antd
import Alert from 'antd/lib/alert';

const FormErrorArea = ({errors}) => {
	return (
		<div style={{marginTop: 15}}>
  			{errors.length > 0 && errors.map(error => {
          		return <Alert key={error} message={error} type="error" showIcon />
          	})}
  		</div>
	)
}


FormErrorArea.propTypes = {
  errors: PropTypes.array,
};

// Specifies the default values for props:
FormErrorArea.defaultProps = {
  errors: [],
};


export { FormErrorArea }