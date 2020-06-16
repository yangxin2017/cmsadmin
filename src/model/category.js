export class CmsCategory{
    constructor(id, name, show, code, children, type, content, fileds, count, spec){
        this.id = id
        this.name = name
        this.code = code
        this.show = show
        this.select = false
        this.type = type
        if(children && children.length > 0){
            this.children = children
        }
        this.content = content
        this.fileds = fileds
        this.count = count
        this.isspec = spec
    }
}