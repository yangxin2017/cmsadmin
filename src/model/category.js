export class CmsCategory{
    constructor(id, name, show, code, children, type){
        this.id = id
        this.name = name
        this.code = code
        this.show = show
        this.select = false
        this.type = type
        if(children && children.length > 0){
            this.children = children
        }
        
    }
}