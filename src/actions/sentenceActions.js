import { GET_SENTENCES, LOADING, RANDOM_SENTENCE, ADD_SENTENCE } from './types';
import { returnErrors } from './errorActions';
import axios from 'axios';
import { tokenConfig } from './authActions';

export const getSentences = () => dispatch => {
    dispatch(setSentencesLoading());
    axios
        .get('/api/sentence')
        .then(res => 
            dispatch({
                type: GET_SENTENCES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );

}

export const setSentencesLoading = () => {
    return {
        type: LOADING
    }
}

export const randomSentence = () => dispatch  => {
    dispatch({
        type: RANDOM_SENTENCE
    })
}

export const addSentence = (sentence) => (dispatch, getState) => {
    console.log(sentence)
    var formData = new FormData();
    formData.set("engName", sentence.engName);
    formData.set("jpName", sentence.jpName);
    formData.set("hiragana", sentence.hiragana);
    formData.append("image", sentence.file);
    axios
        .post('/api/sentence', formData, { headers: {
            'Content-Type': 'multipart/form-data'
          }},  tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ADD_SENTENCE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
}