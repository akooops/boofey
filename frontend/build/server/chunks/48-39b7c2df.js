import { y as PathGetStudents, D as DefaultGetQueries } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends, params }) {
  depends("students:refresh");
  let archived = url.searchParams.get("archived");
  if (archived) {
    archived = archived == "true" ? "true" : "false";
  } else {
    archived = "";
  }
  let subscribed = url.searchParams.get("subscribed");
  if (subscribed) {
    subscribed = subscribed == "true" ? "true" : "false";
  } else {
    subscribed = "";
  }
  let res = await fetch(PathGetStudents(DefaultGetQueries(url), null, { archived, subscribed }), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  redirector(res);
  let studentsResponse = await res.json();
  return { studentsResponse, tabTitle: "Students" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 48;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-9a417642.js')).default;
const universal_id = "src/routes/(app)/admin/students/+page.js";
const imports = ["_app/immutable/nodes/48.8e8f2cd2.js","_app/immutable/chunks/paths.29c5142d.js","_app/immutable/chunks/utils.5f096ebf.js","_app/immutable/chunks/singletons.df66ea99.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.7846b4ff.js","_app/immutable/chunks/auth.82ff8344.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/Pagination.0a529dad.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/stores.1008b3f8.js","_app/immutable/chunks/translation.098a1f9d.js","_app/immutable/chunks/SearchTable.1c079677.js","_app/immutable/chunks/DeleteStudentModal.27ddd880.js","_app/immutable/chunks/toast.aca1940a.js","_app/immutable/chunks/ViewRow.487fb326.js","_app/immutable/chunks/Qr.e7e61473.js","_app/immutable/chunks/ModalPagination.ba1b79f6.js","_app/immutable/chunks/Accordion.adfb252c.js","_app/immutable/chunks/print.92311ca4.js","_app/immutable/chunks/_commonjsHelpers.725317a4.js","_app/immutable/chunks/initFlatpickr.06386e0f.js","_app/immutable/chunks/SchoolsTableCollapse.54a8e5ef.js","_app/immutable/chunks/DivisionsTableCollapse.167c8c7c.js","_app/immutable/chunks/initToolTip.b2308c6a.js","_app/immutable/chunks/index.955fed47.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=48-39b7c2df.js.map