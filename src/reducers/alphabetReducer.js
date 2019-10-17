import { GET_ALPHABETS, LOADING, RANDOM_ALPHABET, GET_ALL_ALPHABETS } from '../actions/types';

const initialState = {
    alphabets: [],
    loading: false,
    randomAlphabet: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ALPHABETS:
        case GET_ALL_ALPHABETS:
            return {
                ...state,
                alphabets: action.payload,
                randomAlphabet: action.payload.randomElement(),
                loading: false
            };
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case RANDOM_ALPHABET:
            return  {
                ...state,
                randomAlphabet: state.alphabets.randomElement(),
                loading: false
            }
        default:
            return state;

    }
}