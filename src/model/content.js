import moment from "moment";
import { getBasePath } from "@/utils/common";

export class CmsContent {
    constructor(id, categoryId, title, desc, lydw, lydwmc, publishTime, clicks, tpwj, nrwj, spwj, zqbjson, gjmc, reallydw, lkmod, url, tags, status, sort, mmdj, olden) {
        this.id = id
        this.categoryId = categoryId
        this.title = title
        this.desc = desc
        this.lydw = lydw
        this.lydwmc = lydwmc
        this.publishTime = moment(publishTime).format('YYYY-MM-DD HH:mm:ss')
        this.clicks = clicks
        this.tpwj = tpwj
        this.nrwj = nrwj
        this.spwj = spwj
        this.zqbjson = zqbjson ? JSON.parse(zqbjson) : []
        this.gjmc = gjmc
        this.reallydw = reallydw
        this.setUrl(lkmod)
        this.url = '//' + url
        //////
        let arr = tags.split(',')
        let ts = []
        let ts2 = []
        for(let a of arr){
            let aiarr = a.split("|")
            if(aiarr.length == 2){
                ts.push(aiarr[0])
                ts2.push(aiarr[1])
            }
        }
        this.tags = ts
        this.tagids = ts2
        this.status = status
        this.sort = sort
        this.mmdj = mmdj
        this.olden = olden
    }

    setUrl(lkmod) {
        if (lkmod) {
            let basepath = getBasePath()
            let url = basepath + '&path=' + lkmod.value + '&'
            let arr = []
            for (let p of lkmod.params) {
                arr.push(`${p.field}=${this[p.value]}`)
            }
            url += arr.join('&')
            this.href = url
        } else {
            this.href = ''
        }
    }
}
export var contentFields = [
    { label: '内容ID', value: 'id' },
    { label: '点击数', value: 'clicks' },
    { label: '时间', value: 'time' },
    { label: '来源', value: 'source' },
    { label: '标题', value: 'title' },
    { label: '图片', value: 'src' }
]