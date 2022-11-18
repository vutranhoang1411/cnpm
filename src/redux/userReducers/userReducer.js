import {set_user_value} from '../../config/actionType'
const userState = {
    user: ''
}
export const userReducer = (state = userState, action) => {
    switch (action.type) {
        case set_user_value:
            state.user = action.data
            console.log(state.user);
            return {...state}
        default:
            return state
    }
}