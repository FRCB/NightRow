import axios from 'axios';

const initialState = {
    user: {}
}

const GET_USER_DATA = 'GET_USER_DATA'

export default function reducer(state = initialState, action) {
    switch(action.type) {
        // case GET_USER_DATA + '_PENDING': 
        //     return
        case GET_USER_DATA + '_FULFILLED': 
            return Object.assign({}, state, {user : action.payload})
        // case GET_USER_DATA + '_REJECTED': 
        //     return     
        default:
            return state
    }
}

export function getUser() {
    let userData = axios.get('/auth/user').then(res => res.data);

    return {
        type: GET_USER_DATA,
        payload: userData
    }
}

