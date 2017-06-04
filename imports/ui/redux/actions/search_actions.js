import {
	ON_SEARCH_TEXT_CHANGE,
	ON_SEARCH_CLEAR,
	ON_CATEGORIES_CHANGE,
	ON_STATUSES_CHANGE
} from './types';


export const onStatusesChange = (status) => dispatch => {
	dispatch({ 
		type: ON_STATUSES_CHANGE,
		payload: status
	});
};


export const onCategoriesChange = (category) => dispatch => {
	dispatch({ 
		type: ON_CATEGORIES_CHANGE,
		payload: category
	});
};


export const onSearchClear = () => dispatch => {
	dispatch({ 
		type: ON_SEARCH_CLEAR,
	});
};

export const onSearchTextChange = (text) => dispatch => {
	dispatch({ 
		type: ON_SEARCH_TEXT_CHANGE,
		payload: text
	});
};

