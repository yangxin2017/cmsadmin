import request from '@/utils/request'
import { CmsProject } from '@/model/project'
import { CmsCategory } from '@/model/category'
import { getToken, getUserId } from '@/utils/auth'
import { CmsContent } from '@/model/content';

function initUserToken() {
    let obj = {
        authToken: getToken(), //Cookies.get('token'),
        authUserId: getUserId(), //Cookies.get("userid")
    };
    return obj;
}

export async function getProjects({ pagenum, pagesize }) {
    let obj = initUserToken()

    let dataobj = await request({
        url: `/cms/api/projects?pagenum=${pagenum}&pagesize=${pagesize}`,
        method: 'get',
        obj
    })
    let res = []
    for (let d of dataobj.data) {
        let tmp = new CmsProject(d.id, d.name, d.desc, d.jsonstr, d.pic, d.ctime, d.seatids)
        res.push(tmp)
    }
    return res
}
export async function getProjectById({ id }) {
    let dataobj = await request({
        url: `/cms/api/project?id=${id}`
    })
    let d = dataobj.data
    let res = new CmsProject(d.id, d.name, d.desc, d.jsonstr, d.pic, d.ctime, d.seatids)
    return res
}

export async function getAllCategorys({ title = undefined, lydw = undefined, status = undefined }) {
    let obj = initUserToken()
    let target = { title: title, lydw: lydw, status: status };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/allcategorys`,
        params: pam
    })

    let res = []
    for (let d of dataobj.data) {
        let child = []
        for (let di of d.children) {
            let tmp = new CmsCategory(di.id, di.name, di.show, di.code, [], di.type, true, di.fields, di.count, di.spec)
            child.push(tmp)
        }
        let one = new CmsCategory(d.id, d.name, d.show, d.code, child, d.type, false, d.fields, d.count, d.spec)
        res.push(one)
    }
    return res
}

export async function getDeptCates({ deptid }) {
    let obj = initUserToken()
    let target = { deptid: deptid };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/deptCates`,
        params: pam
    })
    let res = []
    for (let d of dataobj.data) {
        res.push(d.id.categoryId)
    }
    return res
}

export function updateDept({ deptid, name, desc, url, cids, parentId }) {
    let obj = initUserToken()
    let target = { deptId: deptid, name: name, desc: desc, url: url, cids: cids, parentId: parentId }
    let pam = Object.assign(obj, target);
    let dataobj = request({
        url: `/cms/api/saveDept`,
        params: pam,
        method: 'post'
    })
    return dataobj
}

export async function getContent({ cid, pagenum, pagesize, linkmod, containChild, lydw = undefined, gjmc = undefined, orderField = undefined }) {
    let obj = initUserToken()
    let params = Object.assign(obj, {
        pageindex: pagenum,
        pagesize: pagesize,
        cid: cid,
        containChild: containChild ? true : false,
        gjmc: gjmc,
        orderField: orderField,
        lydw: lydw
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
        let tmp = new CmsContent(d.id, d.categoryId, d.title, d.description, d.lydw, d.lydwmc, d.publishDate, d.clicks, d.tpwj, d.nrwj, d.spwj, d.sftt, d.gjmc, d.tttp, linkmod, d.url, d.tagIds)
        res.data.push(tmp)
    }
    return res
}

export async function getContentById({ id, linkmod }) {
    let obj = initUserToken()
    let params = Object.assign(obj, {
        id: id
    })
    let dataobj = await request({
        url: `/cms/api/content`,
        params
    })
    let d = dataobj.data;
    let tmp = new CmsContent(d.id, d.categoryId, d.title, d.description, d.lydw, d.lydwmc, d.publishDate, d.clicks, d.tpwj, d.nrwj, d.spwj, d.sftt, d.gjmc, d.tttp, linkmod, d.url, d.tagIds)
    return tmp;
}

export async function getHotWords({ pageindex = 1, pagesize = 10 }) {
    let obj = initUserToken()
    let params = Object.assign(obj, {
        pageindex: pageindex,
        pagesize: pagesize
    })
    let dataobj = await request({
        url: `/cms/api/words`,
        params
    })
    return dataobj.data;
}

export async function searchContents({ cid, pagenum, pagesize, linkmod, keyword }) {
    let obj = initUserToken()
    let params = Object.assign(obj, {
        pageindex: pagenum,
        pagesize: pagesize,
        cid: cid,
        containChild: true,
        word: keyword
    })
    let dataobj = await request({
        url: `/cms/api/searchcons`,
        params
    })
    let res = {
        total: 0,
        data: []
    }
    res.total = dataobj.total;
    for (let d of dataobj.data) {
        let tmp = new CmsContent(d.id, d.categoryId, d.title, d.description, d.lydw, d.lydwmc, d.publishDate, d.clicks, d.tpwj, d.nrwj, d.spwj, d.sftt, d.gjmc, d.tttp, linkmod, d.url, d.tagIds)
        res.data.push(tmp)
    }
    return res
}

export async function getCoutryAndOcean() {
    let obj = initUserToken()
    let dataobj = await request({
        url: '/cms/api/guohais',
        method: 'get',
        params: obj
    })
    let country = []
    let ocean = []
    for (let c of dataobj.data.guo) {
        country.push({ text: c.text, value: c.id.value });
    }
    for (let c of dataobj.data.hai) {
        ocean.push({ text: c.text, value: c.id.value });
    }
    return { country: country, ocean: ocean };
}

export function ssologin(params){
    return request({
      url: '/cms/ssologin',
      method: 'get',
      params
    })
}

export function saveProject({ id, json, name }) {
    return request({
        url: '/cms/api/saveproject',
        method: 'post',
        data: { "id": id, "json": json, "name": name }
    })
}

export async function updateProConf({id, seatids}) {
    let obj = initUserToken()
    let target = {
        id: id,
        seatids: seatids
    }
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/updateproconf`,
        params: pam
    })
    return dataobj
}