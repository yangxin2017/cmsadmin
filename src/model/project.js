import moment from "moment";
import { Base64 } from 'js-base64';

export class CmsProject {
    constructor(id, name, desc, json, pic, time, seatids, width = 1920, height = 1080) {
        // console.log(json)
        json = Base64.decode(json)
        this.id = id
        this.name = Base64.decode(name)
        this.desc = desc
        this.seatids = seatids
        this.json = json ? JSON.parse(json) : {}
        this.pic = pic
        this.time = moment(time).format('YYYY-MM-DD HH:mm:ss')
        this.width = width
        this.height = height
    }
}