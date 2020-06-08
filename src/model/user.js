import moment from "moment";

export class CmsRole{
    constructor(id, rolename, allright, allmodel, menustr, buttonstr){
        this.id = id
        this.rolename = rolename
        this.allright = allright ? '是' : '否'
        this.allmodel = allmodel ? '是' : '否'
        this.menustr = menustr
        this.buttonstr = buttonstr
    }
}

export class CmsDept{
    constructor(id, name, parentid, parentname, desc, children){
        this.id = id
        this.name = name
        this.parentname = parentname
        this.parentid = parentid
        this.desc = desc
        this.children = children
    }
}

export class CmsUser{
    constructor(id, name, nickname, deptid, deptname, allcontent, roles, rolename, superadmin, lastlogindate, lastloginip, logincount, seatid, seatname){
        this.id = id
        this.name = name
        this.deptname = deptname
        this.nickname = nickname
        this.deptid = deptid
        this.allcontent = allcontent
        this.roles = roles
        this.rolename = rolename
        this.superadmin = superadmin
        this.lastlogindate = lastlogindate ? moment(lastlogindate).format('YYYY-MM-DD HH:mm:ss') : '无'
        this.lastloginip = lastloginip
        this.logincount = logincount
        this.seatid = seatid
        this.seatname = seatname
    }
}