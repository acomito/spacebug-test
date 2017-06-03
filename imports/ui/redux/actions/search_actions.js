import {
	ON_SEARCH_TEXT_CHANGE,
	ON_SEARCH_CLEAR
} from './types';



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

