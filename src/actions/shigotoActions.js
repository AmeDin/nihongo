import { GET_SHIGOTOS, SHIGOTOS_LOADING, RANDOM_SHIGOTO } from './types';
import { returnErrors } from './errorActions';
import axios from 'axios';

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