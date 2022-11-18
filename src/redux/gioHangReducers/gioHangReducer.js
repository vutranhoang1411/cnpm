const gioHangState = {
    gioHang: {
        dsMonAn: [

        ],
        soLuong: 0
    }
}
export const gioHangReducer = (state = gioHangState, action) => {
    let dsGioHang = state.gioHang.dsMonAn
    switch (action.type) {
        case 'gio_hang_database':
            state.gioHang.dsMonAn = action.data;
            state.gioHang.soLuong = action.data.length;
            state.gioHang = { ...state.gioHang }
            return { ...state }
        case 'them_mon_an':
            console.log(action.monAn);
            let index = dsGioHang.findIndex((item) => item.id === action.monAn.id)
            if (index !== -1) {
                dsGioHang[index].soLuong = 1;
            } else {
                dsGioHang.push(action.monAn)
                state.gioHang.soLuong += 1;
            }
            console.log(state.gioHang);
            // state.gioHang.dsMonAn =[...dsGioHang]
            // chỉ cần compare state.gioHang , không cần compare tới dsMonAn vì lấy state gioHang->soLuong , ko lay dsMonAn
            state.gioHang = { ...state.gioHang };
            return { ...state }
        case 'cap_nhat_soluong':
            let monAn = action.data;
            let index2 = dsGioHang.findIndex((item) => item.id === monAn.id)
            if (index2 !== -1) {
                state.gioHang.dsMonAn[index2].soLuong = monAn.soLuong;
            }
            console.log(state.gioHang.dsMonAn);
            state.gioHang.dsMonAn = [...dsGioHang]
            state.gioHang = { ...state.gioHang };
            return { ...state }
        case 'xoa_mon':
            let idMonAn = action.id
            let index3 = state.gioHang.dsMonAn.findIndex(item => item.id === idMonAn);
            if (index3 !== -1) {
                state.gioHang.dsMonAn.splice(index3, 1);
            } else {
                alert("Item not found !")
            }
            state.gioHang.dsMonAn = [...state.gioHang.dsMonAn];
            state.gioHang = { ...state.gioHang }
            state.gioHang.soLuong -= 1;
            return { ...state }
        default:
            return state
    }
}