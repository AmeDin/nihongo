import { combineReducers } from 'redux';
import shigotoReducer from './shigotoReducer';
import vocabularyReducer from './vocabularyReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    shigoto: shigotoReducer,
    vocabulary: vocabularyReducer,
    error: errorReducer,
    auth: authReducer
});
