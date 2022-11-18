const OrderState = {
    orderList: [],
    total:0,
}
export const orderReducer = (state = OrderState, action) => {
    switch (action.type) {
        case 'get_order_list':
            let orderList = action.data
            state.orderList=[...orderList];
            return  {...state}
        default:
            return state
    }
}