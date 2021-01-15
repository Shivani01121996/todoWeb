import todoReducer from './todo';
import bucketsReducer from './bucket';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    todos: todoReducer,
    buckets: bucketsReducer
});

export default allReducers; 
//
