// export const DOMAIN = "https://boofey.akoops.com/"
export const DOMAIN = "https://backend.boofey.app/"


export const ADMIN_DOMAIN = `${DOMAIN}api/admin`
export const AUTH_DOMAIN = `${DOMAIN}api/auth`
export const PARENT_DOMAIN = `${DOMAIN}api`



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
export function PathGetUsers({page,search},verified){
    return `${ADMIN_DOMAIN}/users?page=${page}&verified=${verified}`

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
export function PathGetSchools({page,search},type){
    if(type == "parent"){
        return `${PARENT_DOMAIN}/schools?page=${page}&search=${search}`
    }
    return `${ADMIN_DOMAIN}/schools?page=${page}&search=${search}`
}

export function PathAddSchool(){
    return `${ADMIN_DOMAIN}/schools`
}
export function PathDelSchool(id){
    return `${ADMIN_DOMAIN}/schools/${id}`
}
export function PathUpdateSchool(id,type){
    if(type == "parent"){
        return `${PARENT_DOMAIN}/schools/${id}/update`
    }
    return `${ADMIN_DOMAIN}/schools/${id}/update`
}
////////////
export function PathGetAcademicYears(schoolId,{page,search},type){
    if(type == "parent"){
        return `${PARENT_DOMAIN}/schools/${schoolId}/academicYears?page=${page}&search=${search}`
    }
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
export function PathGetPackages(schoolId,{page,search},{popular=undefined,yearly=undefined,hidden=undefined} = {}){
    if(schoolId == null){
        return `${ADMIN_DOMAIN}/packages?page=${page}&search=${search}&yearly=${yearly}&popular=${popular}&hidden=${hidden}`
    }

    return `${ADMIN_DOMAIN}/schools/${schoolId}/packages?page=${page}&search=${search}`
}
export function PathGetPackagesById(packageId){
    return `${PARENT_DOMAIN}/packages/${packageId}`
}

export function PathGetPackagesBySchoolId(schoolId){
    return `${PARENT_DOMAIN}/schools/${schoolId}/packages`
}



export function PathAddPackage(schoolId,general){
    if(general){
        return `${ADMIN_DOMAIN}/packages`
    }
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
export function PathUpdateParent(parentId){
    return `${ADMIN_DOMAIN}/fathers/${parentId}/update`

}
export function PathDelParent(parentId){
    return `${ADMIN_DOMAIN}/fathers/${parentId}`

}

/////
export function PathGetCanteens(schoolId,{page,search}){
    if(schoolId == null){
        return `${ADMIN_DOMAIN}/canteens?page=${page}&search=${search}`
    }
    return `${ADMIN_DOMAIN}/schools/${schoolId}/canteens?page=${page}&search=${search}`
}
export function PathGetAllCanteens({page,search}){
    return `${ADMIN_DOMAIN}/getCanteens?page=${page}&search=${search}`
}

export function PathAddCanteen(schoolId,general){
    if(general){
        return `${ADMIN_DOMAIN}/canteens`
    }
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
export function PathGetCanteenUsers(userId,{page,search}){
    return `${ADMIN_DOMAIN}/users/${userId}/canteens?page=${page}&search=${search}`
}
export function PathAddCanteenUser(userId){
    return `${ADMIN_DOMAIN}/users/${userId}/canteens`
}
export function PathDelCanteenUser(canteenUserId){
    return `${ADMIN_DOMAIN}/canteenUsers/${canteenUserId}`
}




////
export function PathGetStudents({page,search},type,{archived=undefined,subscribed=undefined} =  {}){
    if(type == "parent"){
        return `${PARENT_DOMAIN}/students?page=${page}&search=${search}`
    }
    return `${ADMIN_DOMAIN}/students?page=${page}&search=${search}&archived=${archived}&subscribed=${subscribed}`
}
export function PathGetStudent(studentId){
    return `${PARENT_DOMAIN}/students/${studentId}`
}
export function PathAddStudent(type){
    if(type == "parent"){
        return `${PARENT_DOMAIN}/students`
    }
    return `${ADMIN_DOMAIN}/students`
}
export function PathUpdateStudent(studentId,type){
    if(type == "parent"){
        return `${PARENT_DOMAIN}/students/${studentId}/update`
    }
    return `${ADMIN_DOMAIN}/students/${studentId}/update`
}

export function PathDelStudent(studentId,type){
    if(type == "parent"){
        return `${PARENT_DOMAIN}/students/${studentId}`
    }
    return `${ADMIN_DOMAIN}/students/${studentId}`
}

export function PathGetStudentQr(studentId,type){
if(type == "parent"){
        return `${PARENT_DOMAIN}/students/${studentId}/otp`
    }
    return `${ADMIN_DOMAIN}/students/${studentId}/otp`
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
export function PathGetSubscriptions(){
    return `${PARENT_DOMAIN}/subscriptions`
}
export function PathGetSubscriptionsByStudent(studentId,{page,search},type){
    if(type == "parent"){
        return `${PARENT_DOMAIN}/students/${studentId}/subscriptions?page=${page}&search=${search}`
    }
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
export function PathEnableSub(subId){
    return `${ADMIN_DOMAIN}/subscriptions/${subId}/enable`
}
export function PathDisableSub(subId){
    return `${ADMIN_DOMAIN}/subscriptions/${subId}/disable`
}
export function PathGenInvoice(subId,type){
    if(type == "parent"){
        return `${PARENT_DOMAIN}/subscriptions/${subId}/generateInvoice`
    }
    return `${ADMIN_DOMAIN}/subscriptions/${subId}/generateInvoice`
}

export function PathGetInvoices({page,search},type){
    if(type == "parent"){
        return `${PARENT_DOMAIN}/invoices?page=${page}&search=${search}`
    }
    return `${ADMIN_DOMAIN}/invoices?page=${page}&search=${search}`
}

export function PathGetPayments({page,search},type){
    if(type == "parent"){
        return `${PARENT_DOMAIN}/payments?page=${page}&search=${search}`
    }
    return `${ADMIN_DOMAIN}/payments?page=${page}&search=${search}`
}



export function PathGetInvoiceDetails(invoiceId,type){
    if(type == "parent"){
        return `${PARENT_DOMAIN}/invoices/${invoiceId}`
    }
    return `${ADMIN_DOMAIN}/invoices/${invoiceId}`

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

////
export function PathGetProducts({page,search},category){
    return `${ADMIN_DOMAIN}/products?page=${page}&search=${search}&category=${category}`
}
export function PathAddProduct(){
    return `${ADMIN_DOMAIN}/products`
}
export function PathUpdateProduct(productId){
    return `${ADMIN_DOMAIN}/products/${productId}/update`
}
export function PathDelProduct(productId){
    return `${ADMIN_DOMAIN}/products/${productId}`
}

//////

export function PathGetOrders({page,search}){
    return `${ADMIN_DOMAIN}/orders?page=${page}&search=${search}`
}
export function PathGetOrderById(orderId){
    return `${ADMIN_DOMAIN}/orders/${orderId}`
}
export function PathAddOrder(){
    return `${ADMIN_DOMAIN}/orders`
}
export function PathUpdateOrder(orderId){
    return `${ADMIN_DOMAIN}/orders/${orderId}/update`
}
export function PathDelOrder(orderId){
    return `${ADMIN_DOMAIN}/orders/${orderId}`
}

////
export function PathGetProfile(){
    return `${PARENT_DOMAIN}/profiles`
}
export function PathChangePass(){
    return `${PARENT_DOMAIN}/passwordReset`
}
export function PathUpdateProfile(){
    return `${PARENT_DOMAIN}/profiles`
}


///
export function PathGetBillings(){
    return `${PARENT_DOMAIN}/billings`
}
export function PathAddBilling(){
    return `${PARENT_DOMAIN}/billings`
}
export function PathDelBilling(billingId){
    return `${PARENT_DOMAIN}/billings/${billingId}`
}
export function PathUpdateBilling(billingId){
    return `${PARENT_DOMAIN}/billings/${billingId}/update`
}
////
export function PathInitSubscription(){
    return `${PARENT_DOMAIN}/subscriptions/init`
}

export function PathCheckCoupon(code){
    return `${PARENT_DOMAIN}/coupons/check/${code}`

}
export function PathPay(){
    return `${PARENT_DOMAIN}/payments/process`

}

export function PathPayementRedirection(){
    return `${PARENT_DOMAIN}/payments/processRedirection`
}
export function PathCheckPaymentRedirection(ref){
    return `${PARENT_DOMAIN}/payments/checkPaymentRedirection/${ref}`
}

export function PathCheckPaymentRef(ref){
    return `${PARENT_DOMAIN}/payments/check/${ref}`
}

//// 
export function PathGetPaymentMethods({page,search}){
    return `${PARENT_DOMAIN}/paymentMethods?page=${page}&search=${search}`
}
export function PathInitPaymentMethod(){
    return `${PARENT_DOMAIN}/paymentMethods/init`
}
export function PathAddPaymentMethod(fatherId){
    return `${PARENT_DOMAIN}/paymentMethods/store/${fatherId}`
}
export function PathDelPaymentMethod(paymentMethodId){
    return `${PARENT_DOMAIN}/paymentMethods/${paymentMethodId}`
}



//////

export function PathGetDashCount({start_date,end_date}){
    start_date = start_date != null  ? start_date : ""
    end_date = end_date != null  ? end_date : ""

    return `${ADMIN_DOMAIN}/dashboards/count?start_date=${start_date}&end_date=${end_date}`
}
export function PathGetDashDailyTotal({range,start_date,end_date}){
    return `${ADMIN_DOMAIN}/dashboards/dailyTotal?range=${range}&start_date=${start_date}&end_date=${end_date}`
}
export function PathGetDoneByCanteens(canteenId,{range,start_date,end_date}){
    return `${ADMIN_DOMAIN}/dashboards/doneByCanteens/${canteenId}?range=${range}&start_date=${start_date}&end_date=${end_date}`
}
export function PathGetAvgByCanteens(canteenId,{range,start_date,end_date}){
    return `${ADMIN_DOMAIN}/dashboards/avgByCanteens/${canteenId}?range=${range}&start_date=${start_date}&end_date=${end_date}`
}
export function PathGetLastSubs({page,perPage,searchQuery}){
    return `${ADMIN_DOMAIN}/dashboards/lastSubscribedStudents?page=${page}&perPage=${perPage}&search=${searchQuery}`
}
export function PathGetExpiringSubs({page,perPage,searchQuery}){
    return `${ADMIN_DOMAIN}/dashboards/expiringSoonStudents?page=${page}&perPage=${perPage}&search=${searchQuery}`
}
export function PathGetCanteensStatus({page,perPage,searchQuery}){
    return `${ADMIN_DOMAIN}/dashboards/canteensStatus?page=${page}&perPage=${perPage}&search=${searchQuery}`
}
export function PathGetAbsentStudents({page,perPage,searchQuery}){
    return `${ADMIN_DOMAIN}/dashboards/absentStudents?page=${page}&perPage=${perPage}&search=${searchQuery}`
}




/////
export function PathLogin(){
    return `${AUTH_DOMAIN}/login`
}

export function PathRegister(){
    return `${AUTH_DOMAIN}/register`
}

export function PathGenVerificationCode(){
    return `${PARENT_DOMAIN}/users/generateVerificationCode`
}
export function PathGenVerify(){
    return `${PARENT_DOMAIN}/users/verify`
}

export function generatePasswordResetToken(){
    return `${PARENT_DOMAIN}/users/generatePasswordResetToken`
}
export function passwordReset(){
    return `${PARENT_DOMAIN}/users/passwordReset`
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

export function returnUrl(father){
    return `https://localhost:5173/paymentReturn/${father}`
}

