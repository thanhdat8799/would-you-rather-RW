import {USERS_GET} from '../actions/users';

const initState = JSON.parse(localStorage.getItem('users'));

export default function users( state = initState, action){
    switch(action.type) {
        case USERS_GET:
            localStorage.setItem('users', JSON.stringify(action.users));
            return action.users;
        default:
            return state;
    }
}