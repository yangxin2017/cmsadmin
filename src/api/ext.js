import request from '@/utils/request'
import { getToken, getUserId } from '@/utils/auth'
import moment from "moment";

function initUserToken() {
    let obj = {
        authToken: getToken(), //Cookies.get('token'),
        authUserId: getUserId(), //Cookies.get("userid")
    };
    return obj;
}

export function getUserData() {
    return initUserToken()
}

export async function getTableData({ pageindex, pagesize }) {
    let obj = initUserToken()
    let target = { pageindex: pageindex, pagesize: pagesize };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/getTableData`,
        method: 'get',
        params: pam
    })
    for(let d of dataobj.data){
        d.createTime = moment(d.createTime).format('YYYY-MM-DD HH:mm:ss')
    }
    let res = {
        total: dataobj.total,
        data: dataobj.data
    }
    return res
}

export async function addTableData({ title, descript, id }) {
    let obj = initUserToken()
    let target = { id: id, title: title, descript: descript };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/saveTableData`,
        method: 'post',
        params: pam
    })
    return dataobj
}
export async function delTableData({ id }) {
    let obj = initUserToken()
    let target = { id: id };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/delTableData`,
        method: 'post',
        params: pam
    })
    return dataobj
}
