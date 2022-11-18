import axios from 'axios'
import { url } from '../config/setting';
import { history } from '../models/history';
export const deleteToken = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('accessToken')
}
export const layDanhSachMonAn = async (dispatch) => {
    try {
        let danhSachMonAn = await axios({
            url: `${url}/course/`,
            method: 'GET',
        });
        console.log(danhSachMonAn)
        dispatch({
            type: 'lay_danh_sach_mon_an',
            data: danhSachMonAn.data
        })

    } catch (error) {
        // deleteToken()
    }

}
export const getCourseListByType = (type) => {
    return async (dispatch) => {
        try {
            let danhSachMonAn = await axios({
                url: `${url}/course/${type}`,
                method: 'GET'
            });
            dispatch({
                type: 'lay_danh_sach_mon_an',
                data: danhSachMonAn.data
            })
        } catch (error) {
            console.log(error);
        }
    }

}
export const loginStateChecker = () => {
    if (!localStorage.getItem('name') || !localStorage.getItem('accessToken')) {
        return false;
    } else {
        return true
    }
}
export const addToCart = (monAn) => {
    return async (dispatch) => {
        let token = localStorage.getItem('accessToken')
        if (!loginStateChecker()) {
            history.push('/login')
        } else {
            try {
                // Call API
                await axios({
                    url: `${url}/course/`,
                    method: 'POST',
                    data: monAn,
                    headers: {
                        Authorization: token
                    }
                })
                //
                dispatch({
                    type: 'them_mon_an',
                    monAn
                })

            } catch (error) {
                deleteToken()
                history.push('/login')
            }
        }


    }
}
export const payment = (data) => async (dispatch) => {
    let token = localStorage.getItem('accessToken')
    console.log(data)
    try {
        dispatch({
            type: "ON_LOADING"
        })
        let result = await axios({
            url: `${url}/payment`,
            method: 'POST',
            headers: {
                Authorization: token
            }
            , data
        })
        window.location.href = result.data
    } catch (error) {
        dispatch({
            type: "OFF_LOADING"
        })
        console.log(error.response);
        localStorage.removeItem('name')
        localStorage.removeItem('accessToken')
        // alert('Vui lòng đăng nhập lại')
        history.push('/login')
    }

}
export const getAllOrder = async (dispatch) => {
    let token = localStorage.getItem('accessToken')
    try {
        let result = await axios({
            url: `${url}/order`,
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        console.log("get all orders: ",result.data);
        dispatch({
            type: 'get_order_list',
            data: result.data
        })
    } catch (error) {
        console.log("fail get all orders: ",error.response?.data);
    }

}
export const removeCart = (id) => {
    let token = localStorage.getItem('accessToken')
    return async (dispatch) => {
        try {
            await axios({
                url: `${url}/course`,
                method: 'DELETE',
                data: { id },
                headers: {
                    Authorization: token
                }
            })
            console.log("id :", id);
            dispatch({
                type: 'xoa_mon',
                id
            })
        } catch (error) {
            // alert(error)
            console.log(error);
        }
    }


}