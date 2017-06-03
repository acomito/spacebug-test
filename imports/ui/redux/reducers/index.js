import search from './search_reducer'
// REDUX
import { combineReducers } from 'redux';
// APOLLO
import client from '/imports/ui/apollo/ApolloClient';

export default combineReducers({ 
	search,
	apollo: client.reducer(),
});