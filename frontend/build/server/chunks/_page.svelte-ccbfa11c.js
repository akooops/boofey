import { c as create_ssr_component, s as setContext, e as escape, h as add_attribute, v as validate_component, f as each, g as getContext, b as subscribe } from './ssr-69d45533.js';
import { w as writable } from './index2-7897530e.js';
import { t as translation } from './translation-88f21498.js';

const PricingCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_packageStore;
  let { packageStore } = getContext("packageStore");
  $$unsubscribe_packageStore = subscribe(packageStore, (value) => value);
  let { packageObj } = $$props;
  let { studentId } = $$props;
  if ($$props.packageObj === void 0 && $$bindings.packageObj && packageObj !== void 0)
    $$bindings.packageObj(packageObj);
  if ($$props.studentId === void 0 && $$bindings.studentId && studentId !== void 0)
    $$bindings.studentId(studentId);
  $$unsubscribe_packageStore();
  return `<div class="col-lg-4"><div class="${"card pricing-box " + escape(packageObj.popular ? "ribbon-box right" : "", true)}"><div class="card-body p-4 m-2 ">${packageObj.popular ? `<div class="ribbon-two ribbon-two-danger"><span>${escape(translation.popular[localStorage.getItem("language")])}</span></div>` : ``} <div class="d-flex align-items-center"><div class="flex-grow-1">${localStorage.getItem("language") == "en" ? `<h5 class="mb-1 fw-semibold">${escape(packageObj.name)}</h5> <p class="${["text-muted mb-0", packageObj.description == null ? "d-none" : ""].join(" ").trim()}">${escape(packageObj.description)}</p>` : `<h5 class="mb-1 fw-semibold">${escape(packageObj.name_ar)}</h5> <p class="${["text-muted mb-0", packageObj.description_ar == null ? "d-none" : ""].join(" ").trim()}">${escape(packageObj.description_ar)}</p>`}</div></div> <div class="pt-4"><h2>${escape(packageObj.currentPrice)}<sup><small>${escape(translation.sar[localStorage.getItem("language")])}</small></sup> <span class="fs-13 text-muted">${escape(packageObj.yearly ? "" : `/ ${packageObj.days} ${translation.days[localStorage.getItem("language")]}`)}</span></h2></div> <hr class="my-4 text-muted"> <div><ul class="list-unstyled text-muted vstack gap-3">${each(packageObj.package_features, (feature) => {
    return `<li><div class="d-flex">${feature.checked ? `<div class="flex-shrink-0 text-success me-1" data-svelte-h="svelte-19ysx53"><i class="ri-checkbox-circle-fill fs-15 align-middle"></i> </div>` : `<div class="flex-shrink-0 text-danger me-1" data-svelte-h="svelte-1su1nw6"><i class="ri-close-circle-fill fs-15 align-middle"></i> </div>`} <div class="flex-grow-1">${escape(localStorage.getItem("language") == "en" ? feature.name : feature.name_ar)} </div></div> </li>`;
  })}</ul> <div class="mt-4"><a href="javascript:void(0);" class="btn w-100 waves-effect waves-light btn-soft-primary" data-bs-toggle="modal" data-bs-target="#viewPackageMenuModal">${escape(translation.checkMenu[localStorage.getItem("language")])}</a></div> <div class="mt-2"><a href="javascript:void(0);" class="${"btn w-100 waves-effect waves-light " + escape(!packageObj.popular ? "btn-soft-info" : "btn-info", true)}">${escape(translation.select[localStorage.getItem("language")])}</a></div></div></div></div></div>`;
});
const ViewPackageMenuModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $packageStore, $$unsubscribe_packageStore;
  let { packageStore } = getContext("packageStore");
  $$unsubscribe_packageStore = subscribe(packageStore, (value) => $packageStore = value);
  $$unsubscribe_packageStore();
  return `<div class="modal fade" id="viewPackageMenuModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalgridLabel">${escape(translation.checkMenu[localStorage.getItem("language")])}</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4">${localStorage.getItem("language") == "en" && $packageStore.menu_en != null ? `<!-- HTML_TAG_START -->${$packageStore.menu_en}<!-- HTML_TAG_END -->` : ``} ${localStorage.getItem("language") == "ar" && $packageStore.menu_ar != null ? `<!-- HTML_TAG_START -->${$packageStore.menu_ar}<!-- HTML_TAG_END -->` : ``}</div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let student;
  let packages;
  let { data } = $$props;
  setContext("packageStore", { packageStore: writable({}) });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  student = data.student;
  packages = data.packages;
  data.yearlyPackages;
  return `<div class="row justify-content-center mt-4"><div class="col-lg-5"><div class="text-center mb-4"><h4 class="fw-semibold fs-22">${escape(translation.chooseThePlan[localStorage.getItem("language")])}</h4> <p class="text-muted mb-4 fs-15">${escape(translation.simplePricingQuote[localStorage.getItem("language")])}</p></div></div> </div> <div class="row"><div class="card"><div class="card-header align-items-center d-flex"><div class="d-flex gap-2 align-items-center flex-grow-1"><div class="flex-shrink-0"><img${add_attribute("src", student.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <h4 class="card-title mb-0 flex-grow-1">${escape(student.fullname)}</h4></div> <div class="flex-shrink-0"> <ul class="nav nav-pills nav-custom-outline nav-primary" role="tablist"><li class="nav-item waves-effect waves-light" role="presentation"><a class="nav-link active" data-bs-toggle="tab" href="#border-nav-home" role="tab" aria-selected="false" tabindex="-1">${escape(translation.monthly[localStorage.getItem("language")])}</a></li> <li class="nav-item waves-effect waves-light" role="presentation"><a class="nav-link" data-bs-toggle="tab" href="#border-nav-profile" role="tab" aria-selected="false" tabindex="-1">${escape(translation.yearly[localStorage.getItem("language")])}</a></li></ul></div> </div> </div></div> ${validate_component(ViewPackageMenuModal, "ViewPackageMenuModal").$$render($$result, {}, {}, {})} <div class="row justify-content-center"><div class="col-xl-12"><div class="row justify-content-center">${`${each(packages, (packageObj) => {
    return `${validate_component(PricingCard, "PricingCard").$$render($$result, { packageObj, studentId: student.id }, {}, {})}`;
  })}`} </div> </div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-ccbfa11c.js.map
