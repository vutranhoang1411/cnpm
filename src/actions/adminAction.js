import axios from "axios"
import { url } from "../config/setting"
import { history } from "../models/history"
import { deleteToken } from "./courseAction"

export const getAllUsers = async (dispatch) => {
    let token = localStorage.getItem('accessToken')
    try {
        let result = await axios({
            url: `${url}/admin/getusers`,
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        dispatch({
            type: "dispatch_data",
            data: result.data
        })
    } catch (error) {
        deleteToken()
        history.push('/admin/login')
        console.log(error);
    }
}
export const removeUser = async (id,active) => {

        let token = localStorage.getItem('accessToken');
        try {
            await axios({
                url: `${url}/admin/removeuser?id=${id}&active=${active}`,
                method: 'DELETE',
                headers: {
                    Authorization: token
                }
            })
            // dispatch({
            //     type: 'remove_user',
            //     data: id
            // })
        } catch (error) {
            deleteToken()
            history.push('/admin/login')
            console.log(error.response);
        }
    
}
export const getAllOrdersbyAdmin = async (dispatch) => {
    let token = localStorage.getItem('accessToken');
    try {
        let result = await axios({
            url: `${url}/admin/getorders`,
            method: 'get',
            headers: {
                Authorization: token
            }
        })
        console.log(result.data);
        dispatch({
            type: 'dispatch_data',
            data: result.data
        })
    } catch (error) {
        deleteToken()
        history.push('/admin/login')
        console.log(error.response);
    }
}
export const updateOrderByAdmin = async (data) => {
    let token = localStorage.getItem('accessToken');
    try {
        await axios({
            url: `${url}/admin/updateorder`,
            method: 'put',
            data,
            headers: {
                Authorization: token
            }
        })
    } catch (error) {
        // deleteToken()
        // history.push('/admin/login')
        console.log(error.response);
    }
}
export const addNewFood = (file, data) => {
    return async (dispatch) => {
        let token = localStorage.getItem('accessToken');
        let formdata = new FormData()
        formdata.append('file', file)
        formdata.append('data', JSON.stringify(data))
        console.log(formdata);
        try {
            await axios({
                url: `${url}/admin/upload`,
                method: 'POST',
                data: formdata,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: token
                },
                // onUploadProgress: (progressEvent) => {
                //     console.log(progressEvent.loaded);
                // }

            })
            dispatch({
                type: 'change_message',
                data: 'successful'
            })
        } catch (error) {
            if (error.response?.data) {
                dispatch({
                    type: 'change_message',
                    data: error.response.data
                })
            } else {
                deleteToken()
                history.push('/admin/login')
            }
        }
    }
}
// }
export const getAllFood = async (dispatch) => {
    let token = localStorage.getItem('accessToken');
    try {
        let result = await axios({
            url: `${url}/admin/allfood`,
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        dispatch({
            type: 'dispatch_data',
            data: result.data
        })
        console.log(result.data);
    } catch (error) {
        deleteToken()
        history.push('/admin/login')
    }
}
export const updateFood = async (data) => {
    let token = localStorage.getItem('accessToken');
    console.log("data update: ", data);
    try {
        console.log(data.img);
        let formdata = new FormData();
        formdata.append('file', data.img)
        formdata.append('data', JSON.stringify(data))
        // delete data.img;
        await axios({
            url: `${url}/admin/updatefood`,
            method: 'post',
            data: formdata,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token
            }
        })
        // console.log(result.data);
    } catch (error) {
        deleteToken()
        history.push('/admin/login')
    }
}
export const searchUserBy = (data) => {
    return async (dispatch) => {
        let token = localStorage.getItem('accessToken')
        const { searchValue, searchBy, model } = data
        console.log(searchValue, searchBy, model)
        try {
            let result = await axios({
                method: 'GET',
                url: `${url}/admin/getusersby?model=${model}&searchby=${searchBy}&value=${searchValue}`,
                headers: {
                    Authorization: token
                }
            })
            // clg
            dispatch({
                type: "dispatch_data",
                data: result.data
            })
        } catch (error) {
            console.log(error?.response?.data)
        }

        // console.log(result.data.data)
    }
}
export const removeFood = async (id) => {
    let token = localStorage.getItem('accessToken')
    console.log("idddddddd: ",id)
    let result = await axios({
        url: `${url}/admin/removefood`,
        method: 'PUT',
        data: {id},
        headers: {
            Authorization: token
        }
    })

}