import { 
	ON_SEARCH_TEXT_CHANGE,
	ON_CATEGORIES_CHANGE,
	ON_SEARCH_CLEAR,
	ON_STATUSES_CHANGE
} from '../actions/types';



// ABOUT
// =======================================================
// This reducer handles the state for the search results page (consumer-facing app)
// It is possible you could just re-use the same reducer for controlling state during search and on the request page
// but for now I split them up to see how the play out, if there is enough overlap to work them into the same reducer
// then I'll combine them into one. But as of now it seems they may have some differene worth keeping them separate.
const getNewArray = (state, action, stateItem) => {
	
	// if elements exists in array, remove the action.payload value
	if (state[stateItem].includes(action.payload)) {
		return state[stateItem].filter(element => element !== action.payload)
	} 
	// if element does not exists, return a new array that includes the action.payload value
	else {
		return state[stateItem].concat(action.payload)
	}

}


// INITIAL STATE
// =======================================================
const INITIAL_STATE = {
	searchText: null,
	statuses: [],
	categories: []
}

// REDUCER HELPERS
// =======================================================



// EXPORTED REDUCER
// =======================================================
export default function(state=INITIAL_STATE, action){
	let newArray;
	switch(action.type){
		case ON_SEARCH_TEXT_CHANGE:
	      	return {...state, searchText: action.payload };
	    case ON_CATEGORIES_CHANGE:
	    	newArray = getNewArray(state, action, 'categories')
	      	return {...state, categories: newArray };
	    case ON_STATUSES_CHANGE:
	    	newArray = getNewArray(state, action, 'statuses')
	      	return {...state, statuses: newArray };
	    case ON_SEARCH_CLEAR:
	      	return INITIAL_STATE;
		default:
			return state;
	}
}