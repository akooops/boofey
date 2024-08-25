import { f as formatTimestamp } from './utils-5d589345.js';

const DOMAIN = "https://backend.boofey.app/";
const ADMIN_DOMAIN = `${DOMAIN}api/admin`;
const AUTH_DOMAIN = `${DOMAIN}api/auth`;
const PARENT_DOMAIN = `${DOMAIN}api`;
function PathGetPermissions({ page, search }) {
  return `${ADMIN_DOMAIN}/permissions?page=${page}&search=${search}`;
}
function PathGetRoles({ page, search }) {
  return `${ADMIN_DOMAIN}/roles?page=${page}&search=${search}`;
}
function PathGetUsers({ page, search }, verified) {
  return `${ADMIN_DOMAIN}/users?page=${page}&verified=${verified}`;
}
function PathGetSchools({ page, search }, type) {
  if (type == "parent") {
    return `${PARENT_DOMAIN}/schools?page=${page}&search=${search}`;
  }
  return `${ADMIN_DOMAIN}/schools?page=${page}&search=${search}`;
}
function PathGetAcademicYears(schoolId, { page, search }, type) {
  if (type == "parent") {
    return `${PARENT_DOMAIN}/schools/${schoolId}/academicYears?page=${page}&search=${search}`;
  }
  return `${ADMIN_DOMAIN}/schools/${schoolId}/academicYears?page=${page}&search=${search}`;
}
function PathGetAcademicBreaks(yearId, { page, search }) {
  return `${ADMIN_DOMAIN}/academicYears/${yearId}/academicBreaks?page=${page}&search=${search}`;
}
function PathGetPackages(schoolId, { page, search }, { popular = void 0, yearly = void 0, hidden = void 0 } = {}) {
  if (schoolId == null) {
    return `${ADMIN_DOMAIN}/packages?page=${page}&search=${search}&yearly=${yearly}&popular=${popular}&hidden=${hidden}`;
  }
  return `${ADMIN_DOMAIN}/schools/${schoolId}/packages?page=${page}&search=${search}`;
}
function PathGetPackagesBySchoolId(schoolId) {
  return `${PARENT_DOMAIN}/schools/${schoolId}/packages`;
}
function PathGetParents({ page, search }) {
  return `${ADMIN_DOMAIN}/fathers?page=${page}&search=${search}`;
}
function PathGetDivisions(schoolId, { page, search }) {
  return `${ADMIN_DOMAIN}/schools/${schoolId}/divisions?page=${page}&search=${search}`;
}
function PathGetCanteens(schoolId, { page, search }) {
  if (schoolId == null) {
    return `${ADMIN_DOMAIN}/canteens?page=${page}&search=${search}`;
  }
  return `${ADMIN_DOMAIN}/schools/${schoolId}/canteens?page=${page}&search=${search}`;
}
function PathGetCanteenUsers(userId, { page, search }) {
  return `${ADMIN_DOMAIN}/users/${userId}/canteens?page=${page}&search=${search}`;
}
function PathGetStudents({ page, search }, type, { archived = void 0, subscribed = void 0 } = {}) {
  if (type == "parent") {
    return `${PARENT_DOMAIN}/students?page=${page}&search=${search}`;
  }
  return `${ADMIN_DOMAIN}/students?page=${page}&search=${search}&archived=${archived}&subscribed=${subscribed}`;
}
function PathGetStudentsBySchool(schoolId, { page, search }, type, { archived = void 0, subscribed = void 0 } = {}) {
  return `${ADMIN_DOMAIN}/schools/${schoolId}/students?page=${page}&search=${search}&archived=${archived}&subscribed=${subscribed}`;
}
function PathGetStudent(studentId) {
  return `${PARENT_DOMAIN}/students/${studentId}`;
}
function PathGetStudentQr(studentId, type) {
  if (type == "parent") {
    return `${PARENT_DOMAIN}/students/${studentId}/otp`;
  }
  return `${ADMIN_DOMAIN}/students/${studentId}/otp`;
}
function PathGetCoupons({ page, search }) {
  return `${ADMIN_DOMAIN}/coupons?page=${page}&search=${search}`;
}
function PathGetSubscriptions() {
  return `${PARENT_DOMAIN}/subscriptions`;
}
function PathGetSubscriptionsByStudent(studentId, { page, search }, type) {
  if (type == "parent") {
    return `${PARENT_DOMAIN}/students/${studentId}/subscriptions?page=${page}&search=${search}`;
  }
  return `${ADMIN_DOMAIN}/students/${studentId}/subscriptions?page=${page}&search=${search}`;
}
function PathGetInvoices({ page, search }, type) {
  if (type == "parent") {
    return `${PARENT_DOMAIN}/invoices?page=${page}&search=${search}`;
  }
  return `${ADMIN_DOMAIN}/invoices?page=${page}&search=${search}`;
}
function PathGetPayments({ page, search }, type) {
  if (type == "parent") {
    return `${PARENT_DOMAIN}/payments?page=${page}&search=${search}`;
  }
  return `${ADMIN_DOMAIN}/payments?page=${page}&search=${search}`;
}
function PathGetInvoiceDetails(invoiceId, type) {
  if (type == "parent") {
    return `${PARENT_DOMAIN}/invoices/${invoiceId}`;
  }
  return `${ADMIN_DOMAIN}/invoices/${invoiceId}`;
}
function PathGetQueues(canteenId, { page, search }) {
  return `${ADMIN_DOMAIN}/canteens/${canteenId}/queues?page=${page}&search=${search}`;
}
function PathGetQueueStudents(queueId, { page, search }, simple) {
  return `${ADMIN_DOMAIN}/queues/${queueId}/queueStudents?page=${page}&search=${search}&simplified=${simple}`;
}
function PathGetCategories({ page, search }) {
  return `${ADMIN_DOMAIN}/categories?page=${page}&search=${search}`;
}
function PathGetProducts({ page, search }, category) {
  return `${ADMIN_DOMAIN}/products?page=${page}&search=${search}&category=${category}`;
}
function PathGetOrders({ page, search }, canteenId) {
  return `${ADMIN_DOMAIN}/canteens/${canteenId}/orders?page=${page}&search=${search}`;
}
function PathGetOrderById(orderId) {
  return `${ADMIN_DOMAIN}/orders/${orderId}`;
}
function PathGetProfile() {
  return `${PARENT_DOMAIN}/profiles`;
}
function PathGetBillings() {
  return `${PARENT_DOMAIN}/billings`;
}
function PathInitSubscription() {
  return `${PARENT_DOMAIN}/subscriptions/init`;
}
function PathPay(studentId) {
  return `${PARENT_DOMAIN}/students/${studentId}/payments/process `;
}
function PathCheckPaymentRedirection(ref) {
  return `${PARENT_DOMAIN}/payments/checkPaymentRedirection/${ref}`;
}
function PathCheckPaymentRef(ref) {
  return `${PARENT_DOMAIN}/payments/check/${ref}`;
}
function PathGetPaymentMethods({ page, search }) {
  return `${PARENT_DOMAIN}/paymentMethods?page=${page}&search=${search}`;
}
function PathInitPaymentMethod() {
  return `${PARENT_DOMAIN}/paymentMethods/init`;
}
function PathAddPaymentMethod(fatherId) {
  return `${PARENT_DOMAIN}/paymentMethods/store/${fatherId}`;
}
function PathExitQr(canteenId) {
  return `${ADMIN_DOMAIN}/canteens/${canteenId}/qr/exit`;
}
function PathRefresh() {
  return `${AUTH_DOMAIN}/tokens/refresh`;
}
function PathAuth() {
  return `${AUTH_DOMAIN}/authenticated`;
}
function PathGetTodaySubs(schoolId, { level, grade, division } = {}) {
  const queryParams = new URLSearchParams();
  if (level != null) {
    queryParams.set("level", level);
  }
  if (grade != null) {
    queryParams.set("grade", grade);
  }
  if (division != null) {
    queryParams.set("division", division);
  }
  return `${ADMIN_DOMAIN}/reports/todaySubscribers/${schoolId}?${queryParams.toString()}`;
}
function PathGetSubStatus({ school, level, grade } = {}) {
  const queryParams = new URLSearchParams();
  if (level != null) {
    queryParams.set("level", level);
  }
  if (grade != null) {
    queryParams.set("grade", grade);
  }
  if (school != null) {
    queryParams.set("school", school);
  }
  return `${ADMIN_DOMAIN}/reports/subsriptionStatus?${queryParams.toString()}`;
}
function PathGetRevenues({ start_date, end_date } = {}) {
  const queryParams = new URLSearchParams();
  start_date = start_date == null ? formatTimestamp(Date.now(), true) : start_date;
  end_date = end_date == null ? formatTimestamp(Date.now(), true) : end_date;
  queryParams.set("start_date", start_date);
  queryParams.set("end_date", end_date);
  return `${ADMIN_DOMAIN}/reports/revenues?${queryParams.toString()}`;
}
function DefaultGetQueries(url) {
  if (url == null) {
    return { page: 1, search: "" };
  }
  let page = url.searchParams.get("page");
  page = page ? page : 1;
  let search = url.searchParams.get("search");
  search = search ? search : "";
  return { page, search };
}
function returnUrl(father) {
  return `${window.location.origin}/paymentReturn/${father}`;
}

export { PathGetUsers as A, PathGetCanteenUsers as B, PathGetPaymentMethods as C, DefaultGetQueries as D, returnUrl as E, PathInitPaymentMethod as F, PathGetProfile as G, PathGetBillings as H, PathInitSubscription as I, PathGetStudent as J, PathGetPackagesBySchoolId as K, PathCheckPaymentRef as L, PathCheckPaymentRedirection as M, PathGetSubscriptions as N, PathAddPaymentMethod as O, PathGetCanteens as P, PathExitQr as Q, PathGetStudentQr as R, PathPay as S, PathGetOrders as a, PathGetOrderById as b, PathGetQueues as c, PathGetQueueStudents as d, PathGetCategories as e, PathGetCoupons as f, PathGetInvoices as g, PathGetInvoiceDetails as h, PathGetPackages as i, PathGetParents as j, PathGetPayments as k, PathRefresh as l, PathAuth as m, PathGetPermissions as n, PathGetProducts as o, PathGetRevenues as p, PathGetSubStatus as q, PathGetTodaySubs as r, PathGetRoles as s, PathGetSchools as t, PathGetAcademicYears as u, PathGetAcademicBreaks as v, PathGetDivisions as w, PathGetStudentsBySchool as x, PathGetStudents as y, PathGetSubscriptionsByStudent as z };
//# sourceMappingURL=paths-53224d1e.js.map
