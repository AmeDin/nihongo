import { GET_SHIGOTOS, LOADING, RANDOM_SHIGOTO,TOGGLE_LANGUAGE, ADD_SHIGOTO } from '../actions/types';

const initialState = {
    shigotos: [],
    loading: false,
    randomShigoto: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SHIGOTOS:
            return {
                ...state,
                shigotos: action.payload,
                randomShigoto: action.payload.randomElement(),
                loading: false
            };
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case RANDOM_SHIGOTO:
            return  {
                ...state,
                randomShigoto: state.shigotos.randomElement(),
                loading: false
            }
        case TOGGLE_LANGUAGE:
            return {
                ...state,
                togglePracticeJpLanguage: !state.TOGGLE_LANGUAGE
            }
        case ADD_SHIGOTO:
            return {
                ...state,
                shigotos: [action.payload, ...state.shigotos]
            }
        default:
            return state;

    }
}