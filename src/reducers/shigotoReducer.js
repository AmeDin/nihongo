import { GET_SHIGOTOS, SHIGOTOS_LOADING, RANDOM_SHIGOTO,TOGGLE_LANGUAGE } from '../actions/types';

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
        case SHIGOTOS_LOADING:
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
        default:
            return state;

    }
}