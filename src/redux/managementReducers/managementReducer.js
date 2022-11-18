
const manageState = {
    content: []
}
export const managementReducer = (state = manageState, action) => {
    switch (action.type) {
        case "dispatch_data":
            let data = action.data;
            console.log("Management reducer", data);
            state.content = [...data]
            return { ...state }
        case "remove_user":
            let id = action.data;
            let index = state.content.findIndex(item => item.id === parseInt(id));
            if (index !== -1) {
                state.content.splice(index, 1);
            }
            state.content = [...state.content];
            return { ...state }
        case "value_update":
            let { Fid, Fkey, Fvalue } = action.data;
            let Findex = state.content.findIndex(item => item.id === Fid)
            if (Findex !== -1) {
                state.content[Findex][Fkey] = Fvalue
                state.content = [...state.content]
            }
            console.log(state.content);
            return {...state}
        default:
            return state;
    }
}