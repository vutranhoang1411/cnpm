const initialState = {
    loading: false
}
export const loadingReducer = (state = initialState, action) => {
    console.log("loading reducer");
    switch (action.type) {
        case "ON_LOADING":
            return { loading: true }
        case "OFF_LOADING":
            return { loading: false }
        default:
            return state
    }
}