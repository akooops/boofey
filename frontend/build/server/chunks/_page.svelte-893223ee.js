import { c as create_ssr_component, b as subscribe, s as setContext, h as add_attribute, e as escape } from './ssr-69d45533.js';
import { w as writable } from './index2-7897530e.js';
import './index-64aa7a5e.js';
import 'cleave.js';

const css = {
  code: ".numberBadge.svelte-zyd0jp:hover{background-color:#E12828 !important}.selectedParent.svelte-zyd0jp:hover{background-color:var(--vz-danger-bg-subtle) !important}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $smsContent, $$unsubscribe_smsContent;
  let { data } = $$props;
  let form;
  let smsContent = writable({ message: "", numbers: [], parents: [] });
  $$unsubscribe_smsContent = subscribe(smsContent, (value) => $smsContent = value);
  setContext("smsContentStore", { smsContent });
  let smsPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_smsContent();
  return `<div class="row"${add_attribute("this", smsPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex" data-svelte-h="svelte-1cmberq"><h4 class="card-title mb-0 flex-grow-1">SMS</h4> </div>  <div class="card-body">  <form class=""${add_attribute("this", form, 0)}><div class="row g-3 col-lg-9 col-xs-12"><div><label for="exampleFormControlTextarea5" class="form-label" data-svelte-h="svelte-1sjnc6p">Message</label> <textarea class="form-control" name="message" id="exampleFormControlTextarea5" rows="3">${escape($smsContent.message || "")}</textarea> ${``} ${``}</div> <div><label class="form-label" data-svelte-h="svelte-w04crd">SMS Type</label> <select class="form-select mb-3">${JSON.parse(sessionStorage.getItem("permissions")).includes("sms.sendSMS") ? `<option value="numbers" data-svelte-h="svelte-2ba6ce">Numbers</option>` : ``}${JSON.parse(sessionStorage.getItem("permissions")).includes("sms.sendParentsSMS") ? `<option value="parents" data-svelte-h="svelte-zs1jzc">Parents</option>` : ``}<option value="condition" data-svelte-h="svelte-5vsz4o">Condition</option></select></div> ${`${`${``}`}`} <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-5kkdti"><input type="submit" class="btn btn-primary waves-effect waves-light" value="Compose"></div></div></form>    </div>  </div></div>  </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-893223ee.js.map
