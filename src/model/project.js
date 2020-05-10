import moment from "moment";

export class CmsProject{
    constructor(id, name, desc, json, pic, time, width=1920, height=1080){
        this.id = id
        this.name = name
        this.desc = desc
        this.json = json ? JSON.parse(json) : {}
        this.pic = pic
        this.time = moment(time).format('YYYY-MM-DD HH:mm:ss')
        this.width = width
        this.height = height
    }
}