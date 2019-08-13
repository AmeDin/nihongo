import { combineReducers } from 'redux';
import shigotoReducer from './shigotoReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    shigoto: shigotoReducer,
    error: errorReducer
});
