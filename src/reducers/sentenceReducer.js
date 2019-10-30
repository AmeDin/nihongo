import { GET_SENTENCES, LOADING, RANDOM_SENTENCE, ADD_SENTENCE } from '../actions/types';

const initialState = {
    sentences: [],
    loading: false,
    randomSentence: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SENTENCES:
            return {
                ...state,
                sentences: action.payload,
                randomSentence: action.payload.randomElement(),
                loading: false
            };
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case RANDOM_SENTENCE:
            return  {
                ...state,
                randomSentence: state.sentences.randomElement(),
                loading: false
            }
        case ADD_SENTENCE:
            return {
                ...state,
                sentences: [action.payload, ...state.sentences]
            }
        default:
            return state;

    }
}