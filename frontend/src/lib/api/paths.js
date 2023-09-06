export const DOMAIN = "https://boofey.akoops.com/api"

export function PathGetPermissions({page,search}){
    return `${DOMAIN}/permissions?page=${page}&search=${search}`
}
export function PathAddPermission(){
    return `${DOMAIN}/permissions/store`
}
export function PathDelPermission(id){
    return `${DOMAIN}/permissions/${id}/destroy`
}
export function PathUpdatePermission(id){
    return `${DOMAIN}/permissions/${id}/update`
}




export function PathGetRoles({page,search}){
    return `${DOMAIN}/roles?page=${page}&search=${search}`
}
export function PathAddRole(){
    return `${DOMAIN}/roles/store`
}
export function PathDelRole(id){
    return `${DOMAIN}/roles/${id}/destroy`
}
export function PathUpdateRole(id){
    return `${DOMAIN}/roles/${id}/update`
}


export function PathGetUsers({page,search}){
    return `${DOMAIN}/users?page=${page}&search=${search}`

}
export function PathAddUser(){
    return `${DOMAIN}/users/store`
}
export function PathDelUser(id){
    return `${DOMAIN}/users/${id}/destroy`
}
export function PathUpdateUser(id){
    return `${DOMAIN}/users/${id}/update`
}


export function PathGetSchools({page,search}){
    return `${DOMAIN}/schools?page=${page}&search=${search}`
}

export function PathAddSchool(){
    return `${DOMAIN}/schools/store`
}
export function PathDelSchool(id){
    return `${DOMAIN}/schools/${id}/destroy`
}
export function PathUpdateSchool(id){
    return `${DOMAIN}/schools/${id}/update`
}

export function DefaultGetQueries(url){
    let page =  url.searchParams.get("page")
    page = page ? page : 1
    let search =  url.searchParams.get("search")
    search = search ? search : ""
    return {page,search}
}