import {combineReducers} from 'redux';
import users from './users';
import auth from './auth';
import questions from './questions';

export default combineReducers({
    users,
    auth,
    questions
})