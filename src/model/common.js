export class CmsLevel{
    constructor(id, name, value){
        this.id = id
        this.name = name
        this.value = value
    }
}

export class CmsDept{
    constructor(id, name, children){
        this.id = id
        this.name = name
        this.children = children
    }
}

export class CmsUser{
    constructor(id, name, role, token){
        this.id = id
        this.name = name
        this.role = role
        this.token = token
    }
}