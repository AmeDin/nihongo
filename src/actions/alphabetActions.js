import { GET_ALPHABETS, GET_ALL_ALPHABETS, RANDOM_ALPHABET, LOADING } from './types';
import { returnErrors } from './errorActions';
import axios from 'axios';

export const getAlphabets = (settings) => dispatch => {
    dispatch(setLoading());
    console.log(settings)
    axios
        .get('/api/alphabet/config/'+settings.isHiragana+'.'+settings.level)
        .then(res => 
            dispatch({
                type: GET_ALPHABETS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );

}

export const getAllAlphabets = (settings) => dispatch => {
    dispatch(setLoading());
    console.log(settings)
    axios
        .get('/api/alphabet/all/'+settings.level)
        .then(res => 
            dispatch({
                type: GET_ALL_ALPHABETS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );

}

export const setLoading = () => {
    return {
        type: LOADING
    }
}

export const randomAlphabet = () => dispatch  => {
    dispatch({
        type: RANDOM_ALPHABET
    })
}