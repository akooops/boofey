import { c as create_ssr_component, g as getContext, b as subscribe, v as validate_component, e as escape, h as add_attribute, d as add_classes, f as each } from './ssr-69d45533.js';
import './index-64aa7a5e.js';
import 'qr-code-styling';
import 'print-js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import { n as navigating } from './stores-fc2c2f25.js';
import { S as SchoolsTableCollapse } from './SchoolsTableCollapse-505cea76.js';

const DeleteCanteenModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $canteenStore, $$unsubscribe_canteenStore;
  let close;
  let { canteenStore } = getContext("canteenStore");
  $$unsubscribe_canteenStore = subscribe(canteenStore, (value) => $canteenStore = value);
  $$unsubscribe_canteenStore();
  return `<div id="deleteCanteenModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$canteenStore.name} #${$canteenStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></div></div> </div> </div> </div>`;
});
const css = {
  code: ".blur.svelte-n6xcfj{color:transparent;text-shadow:0 0 5px rgba(0,0,0,0.5)}.blur.svelte-n6xcfj:hover{color:var(--vz-body-color);;;text-shadow:none}",
  map: null
};
const ViewCanteenModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $canteenStore, $$unsubscribe_canteenStore;
  let { canteenStore } = getContext("canteenStore");
  $$unsubscribe_canteenStore = subscribe(canteenStore, (value) => $canteenStore = value);
  let { general } = $$props;
  let { simple = false } = $$props;
  let view;
  canteenStore.subscribe(() => {
  });
  if ($$props.general === void 0 && $$bindings.general && general !== void 0)
    $$bindings.general(general);
  if ($$props.simple === void 0 && $$bindings.simple && simple !== void 0)
    $$bindings.simple(simple);
  $$result.css.add(css);
  $$unsubscribe_canteenStore();
  return `<div class="modal fade" id="viewCanteenModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered "><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1kqagam"><h5 class="modal-title" id="exampleModalgridLabel">View Canteen</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4">${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Name : <span class="fw-normal">${escape($canteenStore.name)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Arabic Name : <span class="fw-normal">${escape($canteenStore.name_ar)}</span>`;
    }
  })} ${general ? `${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `School :      
                        <img${add_attribute("src", $canteenStore?.school?.logo?.full_path, 0)} alt="" class="avatar-xs rounded-circle"> ${escape($canteenStore?.school?.name)}`;
    }
  })}` : ``} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Address : <span class="fw-normal">${escape($canteenStore.address)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Arabic Address : <span class="fw-normal">${escape($canteenStore.address_ar)}</span>`;
    }
  })} ${simple == false ? `${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `APi Key`;
    }
  })} <div class="ps-3">${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="input-group"><input type="text" class="form-control blur svelte-n6xcfj" aria-label="APi key" readonly role="button"${add_attribute("value", $canteenStore.api_key, 0)}> <button type="button" class="${"btn btn-icon waves-effect waves-light " + escape("btn-primary", true)}">${`<i class="ri-file-copy-line"></i>`}</button></div>`;
    }
  })} <span${add_classes("".trim())}>${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `<button type="button" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-1wqdv19">Generate Qr</button>`;
    }
  })}</span> <span${add_classes("d-none".trim())}><div class="text-center" id="qrImage"${add_attribute("this", view, 0)} data-svelte-h="svelte-1kvxcwl"></div> <div class="text-center hstack gap-2 justify-content-center mb-2"><button type="button" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-6n7v8c">Download</button> <button type="button" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-19so32g">Print</button></div></span></div>` : ``} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Created at : <span class="fw-normal">${escape(formatTimestamp($canteenStore.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Updated at : <span class="fw-normal">${escape(formatTimestamp($canteenStore.updated_at))}</span>`;
    }
  })} <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-1vrqtk3"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div> </div>`;
});
const ViewApiModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_canteenStore;
  let $apiStore, $$unsubscribe_apiStore;
  let { apiStore } = getContext("apiStore");
  $$unsubscribe_apiStore = subscribe(apiStore, (value) => $apiStore = value);
  let { canteenStore } = getContext("canteenStore");
  $$unsubscribe_canteenStore = subscribe(canteenStore, (value) => value);
  let view;
  let animationValue = "iOwqS7PMGO2kNNRh9UE8wvOWbZTmoMYAblxqVOfxCHweUaVKrXwucPa24LR7iQLu";
  apiStore.subscribe(() => {
  });
  $$unsubscribe_canteenStore();
  $$unsubscribe_apiStore();
  return `<div class="modal fade" id="ApiModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1ndu0ny"><h5 class="modal-title" id="exampleModalgridLabel">Canteen&#39;s API Key</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body"><form><div class="row g-3"><div><label for="canteenName" class="form-label" data-svelte-h="svelte-1h1ngyq">Canteen API key</label> <div class="input-group">${$apiStore == "" ? `<input type="text" class="form-control text-primary" aria-label="APi key" disabled${add_attribute("value", animationValue, 0)}>` : `<input type="text" class="form-control" aria-label="APi key" readonly${add_attribute("value", $apiStore, 0)}>`} <button type="button" class="${"btn btn-icon waves-effect waves-light " + escape("btn-primary", true)}" ${$apiStore == "" ? "disabled" : ""}>${`<i class="ri-file-copy-line"></i>`}</button> </div></div> <div class="text-center" id="qrImage"${add_attribute("this", view, 0)} data-svelte-h="svelte-v72knf"></div> <div class="text-center hstack gap-2 justify-content-center"><button type="button" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-6n7v8c">Download</button> <button type="button" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-19so32g">Print</button></div> <div data-svelte-h="svelte-wdqe76"> <div class="alert alert-warning alert-border-left alert-dismissible fade show" role="alert"><i class="ri-alert-line me-3 align-middle"></i>Please note that this API key cannot be retrieved once generated, so it&#39;s crucial to store it securely, preferably within an environment variable. Failing to do so may pose a risk of data leaks or unauthorized access to your sensitive information. Protect your API key like a digital key to your home.
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div></div> <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-ogmzhf"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div> </div></form></div></div></div></div>`;
});
const EditCanteenModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $canteenStore, $$unsubscribe_canteenStore;
  let { canteenStore } = getContext("canteenStore");
  $$unsubscribe_canteenStore = subscribe(canteenStore, (value) => $canteenStore = value);
  let close;
  let form;
  $$unsubscribe_canteenStore();
  return `<div class="modal fade" id="editCanteenModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-147s2wb"><h5 class="modal-title" id="exampleModalgridLabel">Edit Canteen</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="canteenName" class="form-label" data-svelte-h="svelte-wiyfp8">Canteen Name</label> <input type="text" class="form-control" id="canteenName" name="name" placeholder="Enter canteen name"${add_attribute("value", $canteenStore.name, 0)}> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-1nwxuze">Arabic Name</label> <input type="text" class="form-control" id="productName" name="name_ar" dir="rtl" placeholder="ادخل اسم المقصف"${add_attribute("value", $canteenStore.name_ar, 0)}> ${``}</div> <div><label for="exampleFormControlTextarea5" class="form-label" data-svelte-h="svelte-1hqr47e">Canteen Address</label> <textarea class="form-control" name="address" id="exampleFormControlTextarea5" placeholder="Enter canteen address" rows="3">${escape($canteenStore.address || "")}</textarea> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-dj2fbf">Arabic Address</label> <textarea class="form-control" name="address_ar" id="exampleFormControlTextarea5" dir="rtl" placeholder="ادخل عنوان المقصف" rows="3">${escape($canteenStore.address_ar || "")}</textarea> ${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const CanteenItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_apiStore;
  let $$unsubscribe_canteenStore;
  let { canteen } = $$props;
  let { general } = $$props;
  let { canteenStore } = getContext("canteenStore");
  $$unsubscribe_canteenStore = subscribe(canteenStore, (value) => value);
  let { apiStore } = getContext("apiStore");
  $$unsubscribe_apiStore = subscribe(apiStore, (value) => value);
  let queuesToolTip;
  let qrExit;
  let orderToolTip;
  if ($$props.canteen === void 0 && $$bindings.canteen && canteen !== void 0)
    $$bindings.canteen(canteen);
  if ($$props.general === void 0 && $$bindings.general && general !== void 0)
    $$bindings.general(general);
  $$unsubscribe_apiStore();
  $$unsubscribe_canteenStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1z5pzi"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(canteen.id)}</td> <td>${escape(canteen.name)}</td> <td>${escape(canteen.name_ar)}</td> ${general ? `<td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", canteen.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(canteen.school.name)}</div></div></td>` : ``} <td>${escape(canteen.address)}</td> <td>${escape(canteen.address_ar)}</td> <td><div class="hstack gap-3">${JSON.parse(sessionStorage.getItem("permissions")).includes("orders.index") ? `<span${add_attribute("this", orderToolTip, 0)} data-svelte-h="svelte-au3gk"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Orders"><i class="ri-survey-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.exit") ? `<span${add_attribute("this", qrExit, 0)} data-svelte-h="svelte-tv2fb1"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Qr Exit"><i class="ri-qr-code-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.index") ? `<span${add_attribute("this", queuesToolTip, 0)} data-svelte-h="svelte-chqxv3"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Queues"><i class="ri-team-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.revoke") ? `<span data-bs-toggle="modal" data-bs-target="#RevokeApiModal" data-svelte-h="svelte-aggpe0"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Revoke API Key"><i class="ri-eraser-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.generate") ? `<span data-bs-toggle="modal" data-bs-target="#ApiModal" data-svelte-h="svelte-vg9d8m"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Generate API Key"><i class="ri-refresh-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewCanteenModal" data-svelte-h="svelte-hl3m7z"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.update") ? `<span data-bs-toggle="modal" data-bs-target="#editCanteenModal" data-svelte-h="svelte-1n6amly"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteCanteenModal" data-svelte-h="svelte-1ngmh28"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const RevokeApiModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $canteenStore, $$unsubscribe_canteenStore;
  let close;
  let { canteenStore } = getContext("canteenStore");
  $$unsubscribe_canteenStore = subscribe(canteenStore, (value) => $canteenStore = value);
  $$unsubscribe_canteenStore();
  return `<div id="RevokeApiModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/tdrtiskw.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Revoke the Api of <span class="text-primary">${escape(`${$canteenStore.name} #${$canteenStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-1w9yuys">Revoke</button></div></form></div></div> </div> </div> </div>`;
});
const CanteensTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { canteensList } = $$props;
  let { general = false } = $$props;
  if ($$props.canteensList === void 0 && $$bindings.canteensList && canteensList !== void 0)
    $$bindings.canteensList(canteensList);
  if ($$props.general === void 0 && $$bindings.general && general !== void 0)
    $$bindings.general(general);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-end mb-0 border-top"><thead class="table-light"><tr><th scope="col" style="width: 25px;" data-svelte-h="svelte-gbrsm8"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col" data-svelte-h="svelte-njzezq">ID</th> <th scope="col" data-svelte-h="svelte-z0rb3w">Name</th> <th scope="col" data-svelte-h="svelte-1sr5kji">Arabic Name</th> ${general ? `<th scope="col" data-svelte-h="svelte-16s5zj3">School</th>` : ``} <th scope="col" data-svelte-h="svelte-wjripr">Address</th> <th scope="col" data-svelte-h="svelte-1bnvx33">Arabic Address</th> <th scope="col" data-svelte-h="svelte-13kjjst">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(canteensList, (canteen) => {
    return `${validate_component(CanteenItem, "CanteenItem").$$render($$result, { canteen, general }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(EditCanteenModal, "EditCanteenModal").$$render($$result, {}, {}, {})} ${validate_component(DeleteCanteenModal, "DeleteCanteenModal").$$render($$result, {}, {}, {})} ${validate_component(ViewCanteenModal, "ViewCanteenModal").$$render($$result, { general }, {}, {})} ${validate_component(ViewApiModal, "ViewApiModal").$$render($$result, {}, {}, {})} ${validate_component(RevokeApiModal, "RevokeApiModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const AddCanteenModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_apiStore;
  let { apiStore } = getContext("apiStore");
  $$unsubscribe_apiStore = subscribe(apiStore, (value) => value);
  let canteenName;
  let close;
  let form;
  let apiBtn;
  let resetSchool;
  let { general } = $$props;
  let { schoolId } = $$props;
  if ($$props.general === void 0 && $$bindings.general && general !== void 0)
    $$bindings.general(general);
  if ($$props.schoolId === void 0 && $$bindings.schoolId && schoolId !== void 0)
    $$bindings.schoolId(schoolId);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="modal fade" id="addCanteenModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1wcxwyp"><h5 class="modal-title" id="exampleModalgridLabel">Add Year</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="canteenName" class="form-label" data-svelte-h="svelte-wiyfp8">Canteen Name</label> <input type="text" class="form-control" id="canteenName" name="name" placeholder="Enter canteen name"${add_attribute("value", canteenName, 0)}> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-1nwxuze">Arabic Name</label> <input type="text" class="form-control" id="productName" name="name_ar" dir="rtl" placeholder="ادخل اسم المقصف"> ${``}</div> <div><label for="exampleFormControlTextarea5" class="form-label" data-svelte-h="svelte-1hqr47e">Canteen Address</label> <textarea class="form-control" name="address" id="exampleFormControlTextarea5" placeholder="Enter canteen address" rows="3"></textarea> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-dj2fbf">Arabic Address</label> <textarea class="form-control" name="address_ar" id="exampleFormControlTextarea5" dir="rtl" placeholder="ادخل عنوان المقصف" rows="3"></textarea> ${``}</div> ${general ? `${validate_component(SchoolsTableCollapse, "SchoolsTableCollapse").$$render(
      $$result,
      {
        collapse: true,
        title: "Canteens's School",
        resetSchool
      },
      {
        resetSchool: ($$value) => {
          resetSchool = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${``}` : ``} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>  <span class="d-none" data-bs-toggle="modal" data-bs-target="#ApiModal"${add_attribute("this", apiBtn, 0)}></span>`;
  } while (!$$settled);
  $$unsubscribe_apiStore();
  return $$rendered;
});

export { AddCanteenModal as A, CanteensTable as C, ViewCanteenModal as V };
//# sourceMappingURL=AddCanteenModal-09d619c6.js.map
