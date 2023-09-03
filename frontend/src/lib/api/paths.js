export const DOMAIN = "https://boofey.akoops.com/api"

export function PathGetPermissions(){
    return `${DOMAIN}/permissions`
}
export function PathAddPermission(){
    return `${DOMAIN}/permissions/store`
}



export function PathGetRoles(){
    return `${DOMAIN}/roles`
}
export function PathGetUsers(){
    return `${DOMAIN}/users`

}