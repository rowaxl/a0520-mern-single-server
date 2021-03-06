import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import surveyReducer from './survey.reducer';

export default combineReducers({
    auth: authReducer,
    surveys: surveyReducer
});