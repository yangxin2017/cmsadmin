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
        let tmp = new CmsProject(d.id, d.name, d.desc, d.jsonstr, d.pic, d.ctime)
        res.push(tmp)
    }
    return res
}
export async function getProjectById({ id }) {
    let dataobj = await request({
        url: `/cms/api/project?id=${id}`
    })
    let d = dataobj.data
    let res = new CmsProject(d.id, d.name, d.desc, d.jsonstr, d.pic, d.ctime)
    return res
}

export async function getAllCategorys() {
    let dataobj = await request({
        url: `/cms/api/allcategorys`
    })
    let res = []
    for (let d of dataobj.data) {
        let child = []
        for (let di of d.children) {
            let tmp = new CmsCategory(di.id, di.name, di.show, di.code, [], di.type)
            child.push(tmp)
        }
        let one = new CmsCategory(d.id, d.name, d.show, d.code, child, d.type)
        res.push(one)
    }
    return res
}

export async function getContent({ cid, pagenum, pagesize, linkmod, containChild }) {
    let obj = initUserToken()
    let params = Object.assign(obj, {
        pageindex: pagenum,
        pagesize: pagesize,
        cid: cid,
        containChild: containChild ? true : false
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
        let tmp = new CmsContent(d.id, d.categoryId, d.title, d.description, d.lydw, d.lydwmc, d.publishDate, d.clicks, d.tpwj, d.nrwj, d.spwj, d.sftt, d.gjmc, d.tttp, linkmod)
        res.data.push(tmp)
    }
    return res
}

export async function getContentById({ id }){
    let obj = initUserToken()
    let params = Object.assign(obj, {
        id: id
    })
    let dataobj = await request({
        url: `/cms/api/content`,
        params
    })
    return dataobj.data;
}

export async function getHotWords(){
    let obj = initUserToken()
    let params = Object.assign(obj, {
        pageindex: 1,
        pagesize: 10
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
        let tmp = new CmsContent(d.id, d.categoryId, d.title, d.description, d.lydw, d.lydwmc, d.publishDate, d.clicks, d.tpwj, d.nrwj, d.spwj, d.sftt, d.gjmc, d.tttp, linkmod)
        res.data.push(tmp)
    }
    return res
}

export function saveProject({ id, json }) {
    return request({
        url: 'http://localhost:30003/cms/api/saveproject',
        method: 'post',
        data: { "id": id, "json": json }
    })
}