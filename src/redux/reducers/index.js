import { combineReducers } from 'redux';
import commentsReducer from './commentReducer'; // Update path as necessary

const rootReducer = combineReducers({
    comments: commentsReducer
    
});

export default rootReducer;
