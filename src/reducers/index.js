import { combineReducers } from 'redux';
import shigotoReducer from './shigotoReducer';
import vocabularyReducer from './vocabularyReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import alphabetReducer from './alphabetReducer';
import sentenceReducer from './sentenceReducer';

export default combineReducers({
    shigoto: shigotoReducer,
    vocabulary: vocabularyReducer,
    error: errorReducer,
    auth: authReducer,
    alphabet: alphabetReducer,
    sentence: sentenceReducer
});
