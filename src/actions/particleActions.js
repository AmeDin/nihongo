import { GET_PARTICLES, GET_ALL_PARTICLES, RANDOM_PARTICLE, LOADING } from './types';
import { returnErrors } from './errorActions';
import axios from 'axios';

export const getParticles = (settings) => dispatch => {
    dispatch(setLoading());
    console.log(settings)
    axios
        .get('/api/particle/config/'+settings.level)
        .then(res => 
            dispatch({
                type: GET_PARTICLES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );

}

export const getAllParticles = (settings) => dispatch => {
    dispatch(setLoading());
    console.log(settings)
    axios
        .get('/api/alphabet/all/'+settings.level)
        .then(res => 
            dispatch({
                type: GET_ALL_PARTICLES,
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

export const randomParticle = () => dispatch  => {
    dispatch({
        type: RANDOM_PARTICLE
    })
}