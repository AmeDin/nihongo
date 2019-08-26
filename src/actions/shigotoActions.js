import { GET_SHIGOTOS, SHIGOTOS_LOADING, RANDOM_SHIGOTO, ADD_SHIGOTO } from './types';
import { returnErrors } from './errorActions';
import axios from 'axios';
import { tokenConfig } from './authActions';

export const getShigotos = () => dispatch => {
    dispatch(setShigotosLoading());
    axios
        .get('/api/shigoto')
        .then(res => 
            dispatch({
                type: GET_SHIGOTOS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );

}

export const setShigotosLoading = () => {
    return {
        type: SHIGOTOS_LOADING
    }
}

export const randomShigoto = () => dispatch  => {
    dispatch({
        type: RANDOM_SHIGOTO
    })
}

export const addShigoto = (shigoto) => (dispatch, getState) => {
    console.log(shigoto)
    var formData = new FormData();
    formData.set("engName", shigoto.engName);
    formData.set("jpName", shigoto.jpName);
    formData.set("hiragana", shigoto.hiragana);
    formData.set("kanji", shigoto.kanji);
    formData.append("image", shigoto.file);
    axios
        .post('/api/shigoto', formData, { headers: {
            'Content-Type': 'multipart/form-data'
        }})
        .then(res => 
            dispatch({
                type: ADD_SHIGOTO,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
}