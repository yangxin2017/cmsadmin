export class CmsCategory{
    constructor(id, name, allowContent, formlist, children){
        this.id = id
        this.name = name
        this.allowContent = allowContent
        this.formlist = formlist
        this.children = children
    }
}