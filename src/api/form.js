import request from '@/utils/request'
import { getToken, getUserId } from '@/utils/auth'

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

export async function getFormComs() {
    let obj = initUserToken()
    let target = {};
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/formcoms`,
        method: 'get',
        params: pam
    })
    return dataobj.data
}

export async function getDesigns() {
    let obj = initUserToken()
    let target = {};
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/formdesigns`,
        method: 'get',
        params: pam
    })
    return dataobj.data
}
//formdesign
export async function getDesignById({ id }) {
    let obj = initUserToken()
    let target = { id: id };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/formdesign`,
        method: 'get',
        params: pam
    })
    return dataobj.data
}
export async function getFormVals({ formid, rowid }) {
    let obj = initUserToken()
    let target = { formid: formid, rowid: rowid };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/formVals`,
        method: 'get',
        params: pam
    })
    return dataobj.data
}
export async function getFormDatas({ pageindex, pagesize, formid, itemid, type = 'px', datainfo = "desc", filters }) {
    let obj = initUserToken()
    let target = { pageindex: pageindex, pagesize: pagesize, formid: formid, itemid: itemid, type: type, datainfo: datainfo, filters: filters };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/formdatas`,
        method: 'post',
        data: pam
    })
    return dataobj
}

export async function saveDesign({ id, name, mdesc }) {
    let obj = initUserToken()
    let target = { id: id, name: name, desc: mdesc };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/savedesign`,
        method: 'post',
        params: pam
    })
    return dataobj.data
}
export async function saveDesignConf({ id, confs }) {
    let obj = initUserToken()
    let target = { id: id };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/savedesignconf`,
        method: 'post',
        params: pam,
        data: { confs: confs }
    })
    return dataobj.data
}
export async function addFormVal({ formid, rowid, datas }) {
    let obj = initUserToken()
    let target = { formid: formid, rowid: rowid };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/addformval`,
        method: 'post',
        params: pam,
        data: { datas: datas }
    })
    return dataobj.data
}
export async function delDesign({ id }) {
    let obj = initUserToken()
    let target = { id: id };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/deldesign`,
        method: 'post',
        params: pam
    })
    return dataobj.data
}
export async function delvals({ rowid }) {
    let obj = initUserToken()
    let target = { rowid: rowid };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/delvals`,
        method: 'post',
        params: pam
    })
    return dataobj.data
}