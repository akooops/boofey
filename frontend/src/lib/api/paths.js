export const DOMAIN = "https://boofey.akoops.com/"
// export const DOMAIN = "https://backend.boofey.app/"


export const ADMIN_DOMAIN = `${DOMAIN}api/admin`
export const AUTH_DOMAIN = `${DOMAIN}api/auth`


export function PathGetPermissions({page,search}){
    return `${ADMIN_DOMAIN}/permissions?page=${page}&search=${search}`
}
export function PathAddPermission(){
    return `${ADMIN_DOMAIN}/permissions`
}
export function PathDelPermission(id){
    return `${ADMIN_DOMAIN}/permissions/${id}`
}
export function PathUpdatePermission(id){
    return `${ADMIN_DOMAIN}/permissions/${id}/update`
}



///////////
export function PathGetRoles({page,search}){
    return `${ADMIN_DOMAIN}/roles?page=${page}&search=${search}`
}
export function PathAddRole(){
    return `${ADMIN_DOMAIN}/roles`
}
export function PathDelRole(id){
    return `${ADMIN_DOMAIN}/roles/${id}`
}
export function PathUpdateRole(id){
    return `${ADMIN_DOMAIN}/roles/${id}/update`
}

/////////
export function PathGetUsers({page,search}){
    return `${ADMIN_DOMAIN}/users?page=${page}&search=${search}`

}
export function PathAddUser(){
    return `${ADMIN_DOMAIN}/users`
}
export function PathDelUser(id){
    return `${ADMIN_DOMAIN}/users/${id}`
}
export function PathUpdateUser(id){
    return `${ADMIN_DOMAIN}/users/${id}/update`
}

/////////
export function PathGetSchools({page,search}){
    return `${ADMIN_DOMAIN}/schools?page=${page}&search=${search}`
}

export function PathAddSchool(){
    return `${ADMIN_DOMAIN}/schools`
}
export function PathDelSchool(id){
    return `${ADMIN_DOMAIN}/schools/${id}`
}
export function PathUpdateSchool(id){
    return `${ADMIN_DOMAIN}/schools/${id}/update`
}
////////////
export function PathGetAcademicYears(schoolId,{page,search}){
    return `${ADMIN_DOMAIN}/schools/${schoolId}/academicYears?page=${page}&search=${search}`
}

export function PathAddAcademicYear(schoolId){
    return `${ADMIN_DOMAIN}/schools/${schoolId}/academicYears`
}
export function PathUpdateAcademicYear(id){
    return `${ADMIN_DOMAIN}/academicYears/${id}/update`
}
export function PathDelAcademicYear(id){
    return `${ADMIN_DOMAIN}/academicYears/${id}`
}
//////////
export function PathGetAcademicBreaks(yearId,{page,search}){
    return `${ADMIN_DOMAIN}/academicYears/${yearId}/academicBreaks?page=${page}&search=${search}`
}
export function PathAddAcademicBreak(yearId){
    return `${ADMIN_DOMAIN}/academicYears/${yearId}/academicBreaks`
}
export function PathUpdateAcademicBreak(breakId){
    return `${ADMIN_DOMAIN}/academicBreaks/${breakId}/update`
}
export function PathDelAcademicBreak(breakId){
    return `${ADMIN_DOMAIN}/academicBreaks/${breakId}`
}

/////////
export function PathGetPackages(schoolId,{page,search}){
    return `${ADMIN_DOMAIN}/schools/${schoolId}/packages?page=${page}&search=${search}`
}
export function PathAddPackage(schoolId){
    return `${ADMIN_DOMAIN}/schools/${schoolId}/packages`
}
export function PathUpdatePackage(packageId){
    return `${ADMIN_DOMAIN}/packages/${packageId}/update`
}
export function PathDelPackage(packageId){
    return `${ADMIN_DOMAIN}/packages/${packageId}`
}

////////
export function PathGetParents({page,search}){
    return `${ADMIN_DOMAIN}/fathers?page=${page}&search=${search}`

}
export function PathDelParent(parentId){
    return `${ADMIN_DOMAIN}/fathers/${parentId}`

}

/////
export function PathGetCanteens(schoolId,{page,search}){
    return `${ADMIN_DOMAIN}/schools/${schoolId}/canteens?page=${page}&search=${search}`
}

export function PathAddCanteen(schoolId){
    return `${ADMIN_DOMAIN}/schools/${schoolId}/canteens`
}
export function PathUpdateCanteen(canteenId){
    return `${ADMIN_DOMAIN}/canteens/${canteenId}/update`
}
export function PathDelCanteen(canteenId){
    return `${ADMIN_DOMAIN}/canteens/${canteenId}`
}
export function PathGenCanteenAPi(canteenId){
    return `${ADMIN_DOMAIN}/canteens/${canteenId}/generate`

}
export function PathRevokeAPi(canteenId){
    return `${ADMIN_DOMAIN}/canteens/${canteenId}/revoke`

}
///
export function PathGetStudents({page,search}){
    return `${ADMIN_DOMAIN}/students?page=${page}&search=${search}`
}
export function PathAddStudent(){
    return `${ADMIN_DOMAIN}/students`
}
export function PathUpdateStudent(studentId){
    return `${ADMIN_DOMAIN}/students/${studentId}/update`
}

export function PathDelStudent(studentId){
    return `${ADMIN_DOMAIN}/students/${studentId}`
}

////

export function PathGetCoupons({page,search}){
    return `${ADMIN_DOMAIN}/coupons?page=${page}&search=${search}`
}
export function PathAddCoupon(){
    return `${ADMIN_DOMAIN}/coupons`
}
export function PathUpdateCoupon(couponId){
    return `${ADMIN_DOMAIN}/coupons/${couponId}/update`
}
export function PathDelCoupon(couponId){
    return `${ADMIN_DOMAIN}/coupons/${couponId}`
}



//// 
export function PathGetSubscriptions(studentId,{page,search}){
    return `${ADMIN_DOMAIN}/students/${studentId}/subscriptions?page=${page}&search=${search}`
}
export function PathAddSub(studentId){
    return `${ADMIN_DOMAIN}/students/${studentId}/subscriptions`
}
export function PathUpdateSub(subId){
    return `${ADMIN_DOMAIN}/subscriptions/${subId}/update`
}
export function PathDelSub(subId){
    return `${ADMIN_DOMAIN}/subscriptions/${subId}`
}

//////
export function PathGetQueues(canteenId,{page,search}){
    return `${ADMIN_DOMAIN}/canteens/${canteenId}/queues?page=${page}&search=${search}`
}
export function PathAddQueue(canteenId){
    return `${ADMIN_DOMAIN}/canteens/${canteenId}/queues`
}
export function PathUpdateQueue(queueId){
    return `${ADMIN_DOMAIN}/queues/${queueId}/update`
}
export function PathDelQueue(queueId){
    return `${ADMIN_DOMAIN}/queues/${queueId}`
}

////
export function PathGetQueueStudents(queueId,{page,search}){
    return `${ADMIN_DOMAIN}/queues/${queueId}/queueStudents?page=${page}&search=${search}`
}
export function PathAddQueueStudent(queueId){
    return `${ADMIN_DOMAIN}/queues/${queueId}/queueStudents`
}
export function PathUpdateQueueStudent(queueStudentsId){
    return `${ADMIN_DOMAIN}/queueStudents/${queueStudentsId}/update`
}
export function PathDelQueueStudent(queueStudentsId){
    return `${ADMIN_DOMAIN}/queueStudents/${queueStudentsId}`
}
export function PathExitQueue(){
    return `${ADMIN_DOMAIN}/qr/exit`
}

////
export function PathGetCategories({page,search}){
    return `${ADMIN_DOMAIN}/categories?page=${page}&search=${search}`
}
export function PathAddCategory(){
    return `${ADMIN_DOMAIN}/categories`
}
export function PathUpdateCategory(categoryId){
    return `${ADMIN_DOMAIN}/categories/${categoryId}/update`
}
export function PathDelCategory(categoryId){
    return `${ADMIN_DOMAIN}/categories/${categoryId}`
}

/////
export function PathLogin(){
    return `${AUTH_DOMAIN}/login`
}

export function PathRefresh(){
    return `${AUTH_DOMAIN}/tokens/refresh`
}
export function PathAuth(){
    return `${AUTH_DOMAIN}/authenticated`
}
export function PathLogOut(){
    return `${AUTH_DOMAIN}/logout`
}



export function DefaultGetQueries(url){
    let page =  url.searchParams.get("page")
    page = page ? page : 1
    let search =  url.searchParams.get("search")
    search = search ? search : ""
    return {page,search}
}

