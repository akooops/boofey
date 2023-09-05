export const DOMAIN = "https://boofey.akoops.com/api"

export function PathGetPermissions(){
    return `${DOMAIN}/permissions`
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




export function PathGetRoles(){
    return `${DOMAIN}/roles`
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


export function PathGetUsers(){
    return `${DOMAIN}/users`

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