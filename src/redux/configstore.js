import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { danhSachMonAnReducer } from './danhSachMonAnReducers/danhSachMonAnReducers'
import { gioHangReducer } from './gioHangReducers/gioHangReducer'
import { userReducer } from './userReducers/userReducer'
import { orderReducer } from './Order/orderReducer'
import { managementReducer } from './managementReducers/managementReducer'
import { errorMessageReducers } from './errorMessageReducers/errorMessageReducers'
import { loadingReducer } from './loadingReducer/loadingReducer'
const rootReducer = combineReducers({
    danhSachMonAnReducer, gioHangReducer, userReducer, orderReducer, managementReducer,errorMessageReducers, loadingReducer
})
export const store = createStore(rootReducer, applyMiddleware(ReduxThunk))