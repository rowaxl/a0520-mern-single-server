import { FETCH_SURVEYS } from '../actions/types';

const initialState = {
    surveyList: []
};

const surveyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_SURVEYS:
            return{
                surveyList: payload
            }
    
        default:
            return state;
    }
};

export default surveyReducer;