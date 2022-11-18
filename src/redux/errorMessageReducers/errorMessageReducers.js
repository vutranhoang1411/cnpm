import {change_message} from '../../config/actionType'
const errorMessageDefault = {
    errorMessage: ''
}
export const errorMessageReducers = (state = errorMessageDefault, action) => {
    switch (action.type) {
        case change_message:
            state.errorMessage = action.data
            return { ...state }
        default:
            return state
    }
}