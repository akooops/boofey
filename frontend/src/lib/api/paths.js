export const DOMAIN = "https://backend.boofey.app/api"

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



///////////
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

/////////
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

/////////
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
////////////
export function PathGetAcademicYears(schoolId,{page,search}){
    return `${DOMAIN}/schools/${schoolId}/academicYears?page=${page}&search=${search}`
}

export function PathAddAcademicYear(schoolId){
    return `${DOMAIN}/schools/${schoolId}/academicYears/store`
}
export function PathUpdateAcademicYear(id){
    return `${DOMAIN}/academicYears/${id}/update`
}
export function PathDelAcademicYear(id){
    return `${DOMAIN}/academicYears/${id}/destroy`
}
//////////
export function PathGetAcademicBreaks(yearId,{page,search}){
    return `${DOMAIN}/academicYears/${yearId}/academicBreaks?page=${page}&search=${search}`
}
export function PathAddAcademicBreak(yearId){
    return `${DOMAIN}/academicYears/${yearId}/academicBreaks/store`
}
export function PathUpdateAcademicBreak(breakId){
    return `${DOMAIN}/academicBreaks/${breakId}/update`
}
export function PathDelAcademicBreak(breakId){
    return `${DOMAIN}/academicBreaks/${breakId}/destroy`
}

/////////
export function PathGetPackages(schoolId,{page,search}){
    return `${DOMAIN}/schools/${schoolId}/packages?page=${page}&search=${search}`
}
export function PathAddPackage(schoolId){
    return `${DOMAIN}/schools/${schoolId}/packages/store`
}
export function PathUpdatePackage(packageId){
    return `${DOMAIN}/packages/${packageId}/update`
}
export function PathDelPackage(packageId){
    return `${DOMAIN}/packages/${packageId}/destroy`
}

////////
export function PathGetParents({page,search}){
    return `${DOMAIN}/fathers?page=${page}&search=${search}`

}
export function PathDelParent(parentId){
    return `${DOMAIN}/fathers/${parentId}/destroy`

}

/////
export function PathGetCanteens(schoolId,{page,search}){
    return `${DOMAIN}/schools/${schoolId}/canteens?page=${page}&search=${search}`
}

export function PathAddCanteen(schoolId){
    return `${DOMAIN}/schools/${schoolId}/canteens/store`
}
export function PathUpdateCanteen(canteenId){
    return `${DOMAIN}/canteens/${canteenId}/update`
}
export function PathDelCanteen(canteenId){
    return `${DOMAIN}/canteens/${canteenId}/destroy`
}

///
export function PathLogin(){
    return `${DOMAIN}/login`
}

export function PathRefresh(){
    return `${DOMAIN}/tokens/refresh`
}
export function PathAuth(){
    return `${DOMAIN}/authenticated`
}
export function PathLogOut(){
    return `${DOMAIN}/logout`
}


export function DefaultGetQueries(url){
    let page =  url.searchParams.get("page")
    page = page ? page : 1
    let search =  url.searchParams.get("search")
    search = search ? search : ""
    return {page,search}
}

