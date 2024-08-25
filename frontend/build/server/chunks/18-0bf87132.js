import { d as PathGetQueueStudents, D as DefaultGetQueries } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends, params }) {
  depends("queueStudents:refresh");
  let simple = JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.index.simplified");
  let res = await fetch(PathGetQueueStudents(params.queueId, DefaultGetQueries(url), simple), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  redirector(res);
  let queueStudentsResponse = await res.json();
  return { queueStudentsResponse, tabTitle: "Students' Queue" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 18;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-deeac080.js')).default;
const universal_id = "src/routes/(app)/admin/canteens/[canteenId]/queues/[queueId]/queueStudents/+page.js";
const imports = ["_app/immutable/nodes/18.961da4fa.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/auth.660986fb.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/Pagination.94643daa.js","_app/immutable/chunks/stores.b420ea9f.js","_app/immutable/chunks/translation.098a1f9d.js","_app/immutable/chunks/SearchTable.d9fb7dc1.js","_app/immutable/chunks/QueueStudentsTable.ca1ca9db.js","_app/immutable/chunks/toast.aca1940a.js","_app/immutable/chunks/ViewRow.487fb326.js","_app/immutable/chunks/initFlatpickr.06386e0f.js","_app/immutable/chunks/ExitQueueStudent.dc5d6de1.js","_app/immutable/chunks/ModalPagination.03117239.js","_app/immutable/chunks/Accordion.adfb252c.js","_app/immutable/chunks/index.955fed47.js","_app/immutable/chunks/initToolTip.b2308c6a.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=18-0bf87132.js.map
