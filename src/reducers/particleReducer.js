import {GET_PARTICLES, GET_ALL_PARTICLES, RANDOM_PARTICLE, LOADING } from '../actions/types';

const initialState = {
    particles: [],
    loading: false,
    randomParticle: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PARTICLES:
        case GET_ALL_PARTICLES:
            return {
                ...state,
                particles: action.payload,
                randomParticle: action.payload.randomElement(),
                loading: false
            };
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case RANDOM_PARTICLE:
            return  {
                ...state,
                randomParticle: state.particles.randomElement(),
                loading: false
            }
        default:
            return state;

    }
}