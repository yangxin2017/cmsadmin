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

export function getUserData() {
    return initUserToken()
}

export async function topContent({ id }) {
    let obj = initUserToken()
    let target = { id: id, sort: -1 };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/topContent`,
        method: 'post',
        params: pam
    })
    return dataobj
}
export async function cancleTopContent({ id }) {
    let obj = initUserToken()
    let target = { id: id, sort: 0 };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/topContent`,
        method: 'post',
        params: pam
    })
    return dataobj
}

export async function uncheckContent({ ids, type = "1", uncheck = true, reason = "" }) {
    let obj = initUserToken()
    let target = { ids: ids, type: type, uncheck: uncheck, reason: reason };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/uncheckContent`,
        method: 'post',
        params: pam
    })
    return dataobj
}

export async function deleteContent({ ids }) {
    let obj = initUserToken()
    let target = { ids: ids };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/delContent`,
        method: 'post',
        params: pam
    })
    return dataobj
}

export async function getDicData({ id: id }) {
    let obj = initUserToken()
    let target = {
        id: id
    };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/dicdatas`,
        params: pam
    })
    let res = []
    for (let c of dataobj.data) {
        res.push({ text: c.text, value: c.id.value });
    }
    return res
}

export async function addContent({ id, cid, title, desc, lydw, level, gjlb, nrwj, tpwj, spwj, xwstr, tagstr, draft, filetype, url, sftt }) {
    let obj = initUserToken()
    let target = {
        id: id, cid: cid, title: title, desc: desc, lydw: lydw, level: level,
        gjlb: gjlb, nrwj: nrwj, tpwj: tpwj, spwj: spwj, xwstr: xwstr, tagstr, draft,
        filetype: filetype, url: url, sftt: sftt
    };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/addContent`,
        method: 'post',
        params: pam
    })
    return dataobj
}

export async function sbdata({ id, cid, title, desc, lydw, level, gjlb, nrwj, tpwj, spwj, xwstr, tagstr, draft, filetype }) {
    let obj = initUserToken()
    let target = {
        id: id, cid: cid, title: title, desc: desc, lydw: lydw, level: level,
        gjlb: gjlb, nrwj: nrwj, tpwj: tpwj, spwj: spwj, xwstr: xwstr, tagstr, draft,
        filetype: filetype
    };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/sbdatatmp`,
        method: 'post',
        params: pam
    })
    return dataobj
}

export async function shtgTag({ id: id }) {
    let obj = initUserToken()
    let target = {
        id: id
    };
    let pam = Object.assign(obj, target);

    let dataobj = await request({
        url: `/cms/api/shtgtag`,
        method: 'post',
        params: pam
    })
    return dataobj
}

export async function getTags({ name = undefined, webtype = "main" }) {
    let url = webtype == 'main' ? 'alltags' : 'alltagstmp';
    let obj = initUserToken()
    let target = {
        name: name
    };
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/${url}`,
        params: pam
    })

    for (let d of dataobj.data) {
        d.cfs = {}
        for (let c of d.confs) {
            if (!d.cfs['m_' + c.categoryId]) {
                d.cfs['m_' + c.categoryId] = {}
            }
            d.cfs['m_' + c.categoryId] = c;
        }
    }

    let setChild = (pa) => {
        for (let d of dataobj.data) {
            if (d.parentId == pa.id) {
                setChild(d)
                if (!pa.children) {
                    pa.children = []
                }
                pa.children.push(d)
            }
        }
    };

    let res = [];
    for (let d of dataobj.data) {
        if (!d.parentId) {
            d.children = []
            setChild(d)
            res.push(d)
        }
    }
    return res
}

export async function addSelfTag({ parentId, id, status, lydw, name, webtype, issh }){
    let url = "addtag";
    let obj = initUserToken()
    let target = {
        name: name,
        parentId: parentId,
        id: id,
        status: 1,
        lydw: lydw,
        issh: false
    };
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/${url}`,
        method: 'post',
        params: pam
    })
    return dataobj
}
export async function addTag({ parentId, id, status, lydw, name, webtype, issh }) {
    let url = webtype == 'main' ? "addtag" : "addtagtmp";
    let obj = initUserToken()
    let target = {
        name: name,
        parentId: parentId,
        id: id,
        status: status,
        lydw: lydw,
        issh: issh
    };
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/${url}`,
        method: 'post',
        params: pam
    })
    return dataobj
}

export async function delTag({ id }) {
    let obj = initUserToken()
    let target = {
        id: id
    }
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/deltag`,
        method: 'post',
        params: pam
    })
    return dataobj
}

export async function addTagConf({ cid, tid, str }) {
    let obj = initUserToken()
    let target = {
        cid: cid,
        tid: tid,
        str: str
    }
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/addtagconf`,
        method: 'post',
        params: pam
    })
    return dataobj
}

export async function getTagConf({ cid, tid }) {
    let obj = initUserToken()
    let target = {
        cid: cid,
        tid: tid
    }
    let pam = Object.assign(obj, target);
    let dataobj = await request({
        url: `/cms/api/tagconf`,
        params: pam
    })
    return dataobj.data
}

export async function getAllBM({ webtype = 'main' }) {
    let url = webtype == 'main' ? 'allbms' : 'allbmstmp';
    let obj = initUserToken()
    let dataobj = await request({
        url: `/cms/api/${url}`,
        params: obj
    })

    let getLevelDatas = (datas, level, pa) => {
        var tmparr = [];
        for (let d of datas) {
            if (d.xh.length == level * 2) {
                if (level == 1) {
                    pa.push({ "bmnm": d.bmnm, "xh": d.xh, "mc": d.mc, "children": [] });
                } else {
                    if (d.xh.indexOf(pa.xh) == 0) {
                        pa.children.push({ "bmnm": d.bmnm, "xh": d.xh, "mc": d.mc, "children": [] });
                    }
                }
            }
        }
        if (level < 10) {
            if (level == 1) {
                ++level;
                for (let p of pa) {
                    getLevelDatas(datas, level, p);
                }
            } else {
                ++level;
                for (let p of pa.children) {
                    getLevelDatas(datas, level, p);
                }
            }
        }
    };
    let getDatas = (datas) => {
        var res = [];
        getLevelDatas(datas, 1, res);
        for (let d of res) {
            if (d.children.length == 0) {
                d.children.push({ "bmnm": d.bmnm, "xh": d.xh, "mc": d.mc, "children": [] });
            }
        }
        return res;
    };
    let res = getDatas(dataobj.data)
    return res
}

export async function getContentById({ id }) {
    let obj = initUserToken()
    let params = Object.assign(obj, {
        id: id
    })
    let dataobj = await request({
        url: `/cms/api/content`,
        params
    })
    let d = dataobj.data;
    let res = new CmsContent(d.id, d.categoryId, d.title, d.description, d.lydw, d.lydwmc, d.publishDate, d.clicks, d.tpwj, d.nrwj, d.spwj, d.sftt, d.gjmc, d.tttp, null, d.url, d.tagIds, d.status, d.sort, d.mmdj, d)
    return res
}

////////////
export async function ContentMessage({ pageindex, pagesize }) {
    let obj = initUserToken()
    let params = Object.assign(obj, {
        pageindex: pageindex,
        pagesize: pagesize
    })
    let dataobj = await request({
        url: `/cms/api/conmes`,
        params: params
    })
    let res = {
        data: dataobj.data,
        total: dataobj.total
    };
    return res
}
export async function DelMessage({ id }) {
    let obj = initUserToken()
    let params = Object.assign(obj, {
        id: id
    })
    let dataobj = await request({
        url: `/cms/api/delmes`,
        params: params
    })
    let res = {
        data: dataobj.data,
        total: dataobj.total
    };
    return res
}
////

export async function getSeatConfByCid({ cid }) {
    let obj = initUserToken()
    let params = Object.assign(obj, {
        cid: cid
    })
    let dataobj = await request({
        url: `/cms/api/seatconfs`,
        params: params
    })
    return dataobj.data
}
export async function delSeatConfById({ id }) {
    let obj = initUserToken()
    let params = Object.assign(obj, {
        id: id
    })
    let dataobj = await request({
        url: `/cms/api/delseatconf`,
        params: params
    })
    return dataobj.data
}
export async function addSeatConf({ id, cid, seatids, name }) {
    let obj = initUserToken()
    let params = Object.assign(obj, {
        id: id,
        cid: cid,
        seatids: seatids,
        name: name
    })
    let dataobj = await request({
        url: `/cms/api/addseatconf`,
        params: params
    })
    return dataobj.data
}