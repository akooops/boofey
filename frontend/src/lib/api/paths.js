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
export function PathGenCanteenAPi(canteenId){
    return `${DOMAIN}/canteens/${canteenId}/generate`

}
export function PathRevokeAPi(canteenId){
    return `${DOMAIN}/canteens/${canteenId}/revoke`

}
///
export function PathGetStudents({page,search}){
    return `${DOMAIN}/students?page=${page}&search=${search}`
}
export function PathAddStudent(){
    return `${DOMAIN}/students/store`
}
export function PathUpdateStudent(studentId){
    return `${DOMAIN}/students/${studentId}/update`
}

export function PathDelStudent(studentId){
    return `${DOMAIN}/students/${studentId}/destroy`
}

////

export function PathGetCoupons({page,search}){
    return `${DOMAIN}/coupons?page=${page}&search=${search}`
}
export function PathAddCoupon(){
    return `${DOMAIN}/coupons/store`
}
export function PathUpdateCoupon(couponId){
    return `${DOMAIN}/coupons/${couponId}/update`
}
export function PathDelCoupon(couponId){
    return `${DOMAIN}/coupons/${couponId}/destroy`
}



//// 
export function PathGetSubscriptions(studentId,{page,search}){
    return `${DOMAIN}/students/${studentId}/subscriptions?page=${page}&search=${search}`
}
export function PathAddSub(studentId){
    return `${DOMAIN}/students/${studentId}/subscriptions/store`
}
export function PathUpdateSub(subId){
    return `${DOMAIN}/subscriptions/${subId}/update`
}
export function PathDelSub(subId){
    return `${DOMAIN}/subscriptions/${subId}/destroy`
}

//////
export function PathGetQueues(canteenId,{page,search}){
    return `${DOMAIN}/canteens/${canteenId}/queues?page=${page}&search=${search}`
}
export function PathAddQueue(canteenId){
    return `${DOMAIN}/canteens/${canteenId}/queues/store`
}
export function PathUpdateQueue(queueId){
    return `${DOMAIN}/queues/${queueId}/update`
}
export function PathDelQueue(queueId){
    return `${DOMAIN}/queues/${queueId}/destroy`
}

////
export function PathGetQueueStudents(queueId,{page,search}){
    return `${DOMAIN}/queues/${queueId}/queueStudents?page=${page}&search=${search}`
}
export function PathAddQueueStudent(queueId){
    return `${DOMAIN}/queues/${queueId}/queueStudents/store`
}
export function PathUpdateQueueStudent(queueStudentsId){
    return `${DOMAIN}/queueStudents/${queueStudentsId}/update`
}
export function PathDelQueueStudent(queueStudentsId){
    return `${DOMAIN}/queueStudents/${queueStudentsId}/destroy`
}


/////
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

