import { GET_VOCABULARY, LOADING, RANDOM_VOCABULARY, ADD_VOCABULARY } from '../actions/types';

const initialState = {
    vocabularys: [],
    loading: false,
    randomVocabulary: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_VOCABULARY:
            return {
                ...state,
                vocabularys: action.payload,
                randomVocabulary: action.payload.randomElement(),
                loading: false
            };
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case RANDOM_VOCABULARY:
            return  {
                ...state,
                randomVocabulary: state.vocabularys.randomElement(),
                loading: false
            }
        case ADD_VOCABULARY:
            return {
                ...state,
                vocabularys: [action.payload, ...state.vocabularys]
            }
        default:
            return state;

    }
}