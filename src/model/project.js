import moment from "moment";

export class CmsProject{
    constructor(id, name, desc, json, pic, time){
        this.id = id
        this.name = name
        this.desc = desc
        this.json = json ? JSON.parse(json) : {}
        this.pic = pic
        this.time = moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
}