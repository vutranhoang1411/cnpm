import {lay_danh_sach_mon_an} from '../../config/actionType'
const dsMonAnSate = {
    danhSach: []
}
export const danhSachMonAnReducer = (state = dsMonAnSate, action) => {
    switch (action.type) {
        case lay_danh_sach_mon_an:
            console.log(action.data);
            state.danhSach = [...action.data]
            return {...state}
        default:
            return state
    }
}