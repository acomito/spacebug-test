import { 
	ON_SEARCH_TEXT_CHANGE,
	ON_TICKET_TYPE_CHANGE,
	ON_DATE_RANGE_CHANGE,
	ON_UNIT_ID_CHANGE,
	ON_TENTANT_ID_CHANGE,
	ON_SEARCH_CLEAR
} from '../actions/types';



// ABOUT
// =======================================================
// This reducer handles the state for the search results page (consumer-facing app)
// It is possible you could just re-use the same reducer for controlling state during search and on the request page
// but for now I split them up to see how the play out, if there is enough overlap to work them into the same reducer
// then I'll combine them into one. But as of now it seems they may have some differene worth keeping them separate.


// INITIAL STATE
// =======================================================
const INITIAL_STATE = {
	searchText: null,
}

// REDUCER HELPERS
// =======================================================



// EXPORTED REDUCER
// =======================================================
export default function(state=INITIAL_STATE, action){
	
	switch(action.type){
		case ON_SEARCH_TEXT_CHANGE:
	      	return {...state, searchText: action.payload };
	    case ON_SEARCH_CLEAR:
	      	return INITIAL_STATE;
		default:
			return state;
	}
}