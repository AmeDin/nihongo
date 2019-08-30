import { GET_VOCABULARY, LOADING, RANDOM_VOCABULARY, ADD_VOCABULARY } from './types';
import { returnErrors } from './errorActions';
import axios from 'axios';
import { tokenConfig } from './authActions';

export const getVocabulary = () => dispatch => {
    dispatch(setVocabularyLoading());
    axios
        .get('/api/vocabulary')
        .then(res => 
            dispatch({
                type: GET_VOCABULARY,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );

}

export const setVocabularyLoading = () => {
    return {
        type: LOADING
    }
}

export const randomVocabulary = () => dispatch  => {
    dispatch({
        type: RANDOM_VOCABULARY
    })
}

export const addVocabulary = (vocabulary) => (dispatch, getState) => {
    console.log(vocabulary)
    var formData = new FormData();
    formData.set("engName", vocabulary.engName);
    formData.set("jpName", vocabulary.jpName);
    formData.set("hiragana", vocabulary.hiragana);
    formData.set("kanji", vocabulary.kanji);
    formData.set("category", vocabulary.category);
    formData.append("image", vocabulary.file);
    axios
        .post('/api/vocabulary', formData, { headers: {
            'Content-Type': 'multipart/form-data'
          }},  tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ADD_VOCABULARY,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
}