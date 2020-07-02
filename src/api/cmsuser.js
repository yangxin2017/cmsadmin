import request from '@/utils/request'
import { getToken, getUserId } from '@/utils/auth'
import { CmsRole, CmsDept, CmsUser } from '@/model/user'
import { CmsContent } from '@/model/content';

function initUserToken() {
    let obj = {
        authToken: getToken(), //Cookies.get('token'),
        authUserId: getUserId(), //Cookies.get("userid")
    };
    return obj;
}

export async function getRoles() {
    let obj = initUserToken()
    let dataobj = await request({
        url: `/cms/api/roles`,
        method: 'get',
        params: obj
    })
    let res = []
    for (let d of dataobj.data) {
        let tm = new CmsRole(d.id, d.name, d.ownsAllRight, d.showAllModule, d.rolemenu, d.buttonmenu)
        res.push(tm)
    }
    return res
}

export async function getDepts() {
    let obj = initUserToken()
    let dataobj = await request({
        url: `/cms/api/alldepts`,
        method: 'get',
        params: obj
    })
    let res = []
    for (let d of dataobj.data) {
        let children = []
        for (let di of d.children) {
            let tmi = new CmsDept(di.id, di.name, di.parentId, d.name, di.description, di.url, undefined)
            children.push(tmi)
        }
        let tm = new CmsDept(d.id, d.name, d.parentId, '无', d.description, d.url, children)
        res.push(tm)
    }
    return res
}

export async function delDept({ id }) {
    let obj = initUserToken()
    let target = { id: id };
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/delDept`,
        method: 'post',
        params: pam
    })
    return dataobj
}

export async function getUsers({ pageindex = 1, pagesize = 10, deptid = undefined, keyword = undefined }) {
    let obj = initUserToken()
    let target = { deptid: deptid, pageindex: pageindex, pagesize: pagesize, keyword: keyword };
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/allusers`,
        method: 'get',
        params: pam
    })
    let res = []
    for (let d of dataobj.data) {
        let tm = new CmsUser(d.id, d.name, d.nickname, d.deptid, d.deptname, d.allcontent, d.roles, d.rolename, d.superadmin, d.lastlogindate, d.lastloginip, d.logincount, d.seatid, d.seatname)
        res.push(tm)
    }
    let datao = {
        data: res,
        total: dataobj.total
    }
    return datao
}

export async function addCategory({ cid = undefined, title, code, pcode, isallow, types }) {
    let obj = initUserToken()
    let target = { cid: cid, name: title, code: code, pcode: pcode, isallow: isallow, types: types.join(",") };
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/addcategory`,
        method: 'get',
        params: pam
    })
    return dataobj
}
export async function delCategory({ cid }) {
    let obj = initUserToken()
    let target = { cid: cid };
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/delCategory`,
        method: 'get',
        params: pam
    })
    return dataobj
}

export async function saveRole({ id, rolems, buts }) {
    let obj = initUserToken()
    let target = { id: id, rolems: rolems, buts: buts };
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/addRole`,
        method: 'post',
        params: pam
    })
    return dataobj
}

export async function getRoleById({ id }) {
    let obj = initUserToken()
    let target = { id: id };
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/onerole`,
        method: 'get',
        params: pam
    })
    return dataobj.data
}

export async function getContent({ cid, pagenum, pagesize, containChild, status = 1, lydw = undefined, gjmc = undefined, orderField = undefined, title = undefined, orderType = undefined }) {
    let istb = "false";
    if (status == '10') {
        istb = "true";
        status = "1";
    }
    let obj = initUserToken()
    let params = Object.assign(obj, {
        pageindex: pagenum,
        pagesize: pagesize,
        cid: cid,
        containChild: containChild ? true : false,
        gjmc: gjmc,
        orderField: orderField,
        orderType: orderType,
        lydw: lydw,
        status: status,
        title: title,
        istbzz: istb
    })
    let dataobj = await request({
        url: `/cms/api/contents`,
        params
    })
    let res = {
        total: 0,
        data: []
    }
    res.total = dataobj.total;
    for (let d of dataobj.data) {
        let tmp = new CmsContent(d.id, d.categoryId, d.title, d.description, d.lydw, d.lydwmc, d.publishDate, d.clicks, d.tpwj, d.nrwj, d.spwj, d.sftt, d.gjmc, d.tttp, null, d.url, d.tagIds, d.status, d.sort, d.mmdj, d)
        res.data.push(tmp)
    }
    return res
}

export async function addUsers({ id, name, isadmin, password, role, deptid, nickname, xw }) {
    let obj = initUserToken()
    let target = {
        id: id, name: name, isadmin: isadmin, password: password, role: role, deptid: deptid, nickname: nickname, xw: xw
    };
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/addUsers`,
        method: 'get',
        params: pam
    })
    return dataobj
}

export async function deleteUser({ id }) {
    let obj = initUserToken()
    let target = {
        id: id
    };
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/deleteuser`,
        method: 'get',
        params: pam
    })
    return dataobj
}