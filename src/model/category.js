export class CmsCategory{
    constructor(id, name, show, code, children){
        this.id = id
        this.name = name
        this.code = code
        this.show = show
        this.select = false
        if(children && children.length > 0){
            this.children = children
        }
        
    }
}