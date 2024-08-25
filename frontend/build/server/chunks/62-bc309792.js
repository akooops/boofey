import { z as PathGetSubscriptionsByStudent, D as DefaultGetQueries, L as PathCheckPaymentRef, M as PathCheckPaymentRedirection } from './paths-53224d1e.js';
import { p as public_env } from './shared-server-58a5f352.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch: fetch2, url, depends, params }) {
  depends("subs:refresh");
  let res = await fetch2(PathGetSubscriptionsByStudent(params.studentId, DefaultGetQueries(url), "parent"), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  redirector(res);
  let subsResponse = await res.json();
  let msg;
  if (public_env.PUBLIC_PAYMENT_REDIRECTION == "true") {
    msg = await payFortRedirection(url);
  } else {
    msg = await redirection3ds(url);
  }
  url.searchParams;
  return { subsResponse, msg, tabTitle: "Subscriptions", arTabTitle: "الاشتراكات" };
}
async function redirection3ds(url) {
  let msg;
  if (url.searchParams.get("ref")) {
    let res = await fetch(PathCheckPaymentRef(url.searchParams.get("ref")), {
      headers: {
        Authorization: `${localStorage.getItem("SID")}`
      }
    });
    redirector(res);
    res = await res.json();
    let status = "success";
    if (res.status == "success") {
      if (res?.data?.payment?.status != 14) {
        status = "fail";
        msg = res?.data?.payment?.response_message;
      }
    } else if (res.status == "error") {
      msg = res.error.message;
    }
    url.searchParams.set("status", status);
  }
  return msg;
}
async function payFortRedirection(url) {
  let msg;
  if (url.searchParams.get("ref")) {
    let res = await fetch(PathCheckPaymentRedirection(url.searchParams.get("ref")), {
      headers: {
        Authorization: `${localStorage.getItem("SID")}`
      },
      method: "POST"
    });
    res = await res.json();
    let status = "success";
    if (res.status == "success") {
      if (res?.data?.payment?.status != 14) {
        status = "fail";
        msg = res?.data?.payment?.response_message;
      }
    } else if (res.status == "error") {
      status = "fail";
      msg = res.error.message;
    }
    url.searchParams.set("status", status);
  }
  return msg;
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 62;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-845ba2a9.js')).default;
const universal_id = "src/routes/(app)/students/[studentId]/subscriptions/+page.js";
const imports = ["_app/immutable/nodes/62.cd21e71a.js","_app/immutable/chunks/paths.29c5142d.js","_app/immutable/chunks/utils.5f096ebf.js","_app/immutable/chunks/singletons.df66ea99.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.7846b4ff.js","_app/immutable/chunks/public.ce06da06.js","_app/immutable/chunks/auth.82ff8344.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/translation.098a1f9d.js","_app/immutable/chunks/Pagination.0a529dad.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/stores.1008b3f8.js","_app/immutable/chunks/SearchTable.1c079677.js","_app/immutable/chunks/ViewSubModal.2ad36122.js","_app/immutable/chunks/ViewRow.487fb326.js","_app/immutable/chunks/Progress.9dbf192f.js","_app/immutable/chunks/initToolTip.b2308c6a.js","_app/immutable/chunks/index.955fed47.js","_app/immutable/chunks/toast.aca1940a.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=62-bc309792.js.map
