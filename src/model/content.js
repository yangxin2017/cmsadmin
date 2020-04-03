export class CmsContent{
    constructor(id, title, level, category, publishDate, dept, uploaduser, status, checkuser){
        this.id = id
        this.title = title
        this.level = level
        this.category = category
        this.publishDate = publishDate
        this.dept = dept
        this.uploaduser = uploaduser
        this.status = status
        this.checkuser = checkuser
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