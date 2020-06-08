import request from '@/utils/request'
import { getToken, getUserId } from '@/utils/auth'
import { CmsRole, CmsDept, CmsUser } from '@/model/user'

function initUserToken() {
    let obj = {
        authToken: getToken(), //Cookies.get('token'),
        authUserId: getUserId(), //Cookies.get("userid")
    };
    return obj;
}

export async function getRoles(){
    let obj = initUserToken()
    let dataobj = await request({
        url: `/cms/api/roles`,
        method: 'get',
        params: obj
    })
    let res = []
    for(let d of dataobj.data){
        let tm = new CmsRole(d.id, d.name, d.ownsAllRight, d.showAllModule, d.rolemenu, d.buttonmenu)
        res.push(tm)
    }
    return res
} 

export async function getDepts(){
    let obj = initUserToken()
    let dataobj = await request({
        url: `/cms/api/alldepts`,
        method: 'get',
        params: obj
    })
    let res = []
    for(let d of dataobj.data){
        let children = []
        for(let di of d.children){
            let tmi = new CmsDept(di.id, di.name, di.parentId, d.name, di.description, [])
            children.push(tmi)
        }
        let tm = new CmsDept(d.id, d.name, d.parentId, '无', d.description, children)
        res.push(tm)
    }
    return res
}

export async function getUsers({pageindex=1, pagesize=10, deptid=undefined, keyword=undefined}){
    let obj = initUserToken()
    let target = {deptid: deptid, pageindex: pageindex, pagesize: pagesize, keyword: keyword};
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/allusers`,
        method: 'get',
        params: pam
    })
    let res = []
    for(let d of dataobj.data){
        let tm = new CmsUser(d.id, d.name, d.nickname, d.deptid, d.deptname, d.allcontent, d.roles, d.rolename, d.superadmin, d.lastlogindate, d.lastloginip, d.logincount, d.seatid, d.seatname)
        res.push(tm)
    }
    let datao = {
        data: res,
        total: dataobj.total
    }
    return datao
}