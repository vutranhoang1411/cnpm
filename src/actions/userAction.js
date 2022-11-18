import axios from 'axios'
import { change_message } from '../config/actionType';
import { url } from '../config/setting';
import { history } from '../models/history';
import { loginStateChecker } from './courseAction';
export const userLogin = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "ON_LOADING"
            })
            let result = await axios({
                url: `${url}/login`,
                method: 'POST',
                data,
            })
            localStorage.setItem('accessToken', result.data.token)
            localStorage.setItem('name', result.data.name)
            console.log(result.data)
            if (result.data.role === "manager" || result.data.role === "clerk" || result.data.role === "chef") {
                history.push('/admin')
            } else {
                history.push('/')
            }
            dispatch({
                type: "OFF_LOADING"
            })
        } catch (error) {
            console.log(typeof error?.response?.data);
            if (typeof error?.response?.data === "string") {
                dispatch({
                    type: "OFF_LOADING"
                })
                dispatch({
                    type: 'set_user_value',
                    data: error?.response?.data
                })

            }


        }


    }
}
export const singUp = (data) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: `${url}/signup`,
                method: 'post',
                data
            })
            history.push('/login')
            dispatch({
                type: 'set_user_value',
                data: result.data
            })
            // set alert result.data = Registration Completed Successfully
            console.log(result.data);

        } catch (error) {
            if (error.response?.data.startsWith("Email already exist")) {
                dispatch({
                    type: 'set_user_value',
                    data: error.response.data
                })
            }
        }
    }
}
export const getUserInfor = async () => {
    let token = localStorage.getItem('accessToken')
    if (!loginStateChecker()) {
        history.push('/login')
    } else {
        try {
            let result = await axios({
                url: 'http://localhost:7000/profile',
                method: 'GET',
                headers: {
                    Authorization: token
                }
            })
            return result.data;
        } catch (error) {
            history.push('/login')
        }

    }

}
export const updateUserInfor = (file, data) => {
    return async (dispatch) => {
        let token = localStorage.getItem('accessToken')
        if (!loginStateChecker()) {
            history.push('/login')
        } else {
            try {
                console.log(file);
                let formdata = new FormData();
                formdata.append('file', file)
                formdata.append('data', JSON.stringify(data))
                await axios({
                    url: `${url}/profile`,
                    method: 'put',
                    data: formdata,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: token
                    }
                })
                dispatch({
                    type: change_message,
                    data: "",
                })
            } catch (error) {
                dispatch({
                    type: change_message,
                    data: error?.response.data,
                })
            }

        }
    }
}
export const logOut = () => {
    localStorage.clear();
    window.location.href = "http://localhost:3000"
}