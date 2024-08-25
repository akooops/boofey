import { c as create_ssr_component, d as add_classes, h as add_attribute, v as validate_component, f as each, b as subscribe, s as setContext, o as onDestroy, g as getContext, e as escape } from './ssr-69d45533.js';
import './index-64aa7a5e.js';
import { S as SchoolsTableCollapse } from './SchoolsTableCollapse-505cea76.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import 'svelte-quill';
import { n as navigating } from './stores-fc2c2f25.js';
import { w as writable } from './index2-7897530e.js';

const Editor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { options = {} } = $$props;
  let { data = "" } = $$props;
  let { class: className = "" } = $$props;
  options = { theme: "snow", ...options };
  let node;
  onDestroy(() => {
  });
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${add_attribute("class", className, 0)}><div${add_attribute("this", node, 0)}><!-- HTML_TAG_START -->${data}<!-- HTML_TAG_END --></div></div>`;
});
const AddPackageModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { general } = $$props;
  let { schoolId } = $$props;
  let resetSchool;
  let packageName;
  let close;
  let form;
  let features = [];
  let yearly = false;
  let sale;
  let tax;
  let hidden = false;
  let popular = false;
  const options = { theme: "snow", plainclipboard: true };
  if ($$props.general === void 0 && $$bindings.general && general !== void 0)
    $$bindings.general(general);
  if ($$props.schoolId === void 0 && $$bindings.schoolId && schoolId !== void 0)
    $$bindings.schoolId(schoolId);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-3bnlrz_START --><link rel="preconnect" href="https://cdn.quilljs.com" crossorigin><link rel="stylesheet" href="https://cdn.quilljs.com/1.3.7/quill.snow.css"><!-- HEAD_svelte-3bnlrz_END -->`, ""} <div class="modal fade" id="addPackageModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1stps6m"><h5 class="modal-title" id="exampleModalgridLabel">Add Package</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="name" class="form-label" data-svelte-h="svelte-u9uzac">Package Name</label> <input type="text" class="form-control" name="name" id="firstName" placeholder="Enter Package name"${add_attribute("value", packageName, 0)}> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-1nwxuze">Arabic Name</label> <input type="text" class="form-control" id="productName" name="name_ar" dir="rtl" placeholder="ادخل اسم الباقة"> ${``}</div> <div><label for="code" class="form-label" data-svelte-h="svelte-8jd088">Package Code</label> <input type="text" name="code" class="form-control" id="firstName" placeholder="Enter package code"> ${``}</div> ${general ? `${validate_component(SchoolsTableCollapse, "SchoolsTableCollapse").$$render(
      $$result,
      {
        collapse: true,
        title: "Package's School",
        resetSchool
      },
      {
        resetSchool: ($$value) => {
          resetSchool = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${``}` : ``} <div><label for="exampleFormControlTextarea5" class="form-label" data-svelte-h="svelte-9lia6u">Package Description</label> <textarea class="form-control" name="description" id="exampleFormControlTextarea5" placeholder="Enter package description" rows="3"></textarea> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-co6v89">Arabic Description</label> <textarea class="form-control" name="description_ar" id="exampleFormControlTextarea5" dir="rtl" placeholder="ادخل وصف الباقة" rows="3"></textarea> ${``}</div>  <div class="row g-3 ps-3"> <div class="form-check form-switch col"><input class="form-check-input" name="yearly" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", yearly, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1q7mon8">Is Yearly</label> </div> <div class="form-check form-switch col"><input class="form-check-input" name="hidden" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", hidden, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1eshwqa">Is Hidden</label> </div> <div class="form-check form-switch col"><input class="form-check-input" name="popular" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", popular, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-ktlip1">Is Popular</label></div></div> ${`<div><label for="days" class="form-label" data-svelte-h="svelte-6vs0gg">Package Days</label> <input type="text" name="days" class="form-control" id="firstName" placeholder="Enter Package days"> ${``}</div>`} <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", sale, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1jul1xb">Include a sale price</label> </div></div> <div${add_classes("".trim())}><label for="name" class="form-label" data-svelte-h="svelte-hp149g">Package Price</label> <input type="text" class="form-control" name="price" id="firstName" placeholder="Enter Package price"> ${``}</div> ${``} <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", tax, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1d22k6s">Include a tax</label> </div></div> ${``} <div><label for="code" class="form-label" data-svelte-h="svelte-1ui30dq">Menu English</label> ${validate_component(Editor, "Editor").$$render($$result, { options, data: "" }, {}, {})} ${``}</div> <div><label for="code" class="form-label" data-svelte-h="svelte-1uhxxwi">Menu Arabic</label> ${validate_component(Editor, "Editor").$$render($$result, { options, data: "" }, {}, {})} ${``}</div>  <div class="flex-shrink-0 text-end "><button type="button" class="align-self-end btn btn-primary waves-effect waves-light" data-svelte-h="svelte-14k625v"><i class="ri-add-line align-bottom me-1"></i> Add Feature</button></div> <div class="table-responsive"><table class="table align-end table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-sslqv3"><tr><th scope="col">Feature Name</th> <th scope="col">Arabic Name</th> <th scope="col">Checked</th> <th scope="col">Actions</th></tr></thead> <tbody class="list">${each(features, (feature, i) => {
      return `<tr class="align-middle"><td><input type="text" class="form-control" id="firstName" placeholder="Enter Feature Name"${add_attribute("value", feature.name, 0)}></td> <td><input type="text" class="form-control" id="firstName" dir="rtl" placeholder="ادخل اسم الميزة"${add_attribute("value", feature.name_ar, 0)}></td> <td><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", feature.checked, 1)}></td> <td><a role="button" class="fs-15" data-bs-toggle="tooltip" data-bs-title="Delete" data-svelte-h="svelte-12joufv"><i class="ri-delete-bin-line"></i></a></td> </tr>`;
    })}</tbody></table></div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
const DeletePackageModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $packageStore, $$unsubscribe_packageStore;
  let close;
  let { packageStore } = getContext("packageStore");
  $$unsubscribe_packageStore = subscribe(packageStore, (value) => $packageStore = value);
  $$unsubscribe_packageStore();
  return `<div id="deletePackageModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$packageStore.name} #${$packageStore.id}`)}</span> ?</p> ${``} <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const ViewPackageModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $packageStore, $$unsubscribe_packageStore;
  let { general = false } = $$props;
  let { packageStore } = getContext("packageStore");
  $$unsubscribe_packageStore = subscribe(packageStore, (value) => $packageStore = value);
  if ($$props.general === void 0 && $$bindings.general && general !== void 0)
    $$bindings.general(general);
  $$unsubscribe_packageStore();
  return `<div class="modal fade" id="viewPackageModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-18sipgg"><h5 class="modal-title" id="exampleModalgridLabel">View Package</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4">${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Name : <span class="fw-normal">${escape($packageStore.name)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Arabic Name : <span class="fw-normal">${escape($packageStore.name_ar)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Description : <span class="fw-normal">${escape($packageStore.description)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Arabic Description : <span class="fw-normal">${escape($packageStore.description_ar)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Should Start At : <span class="fw-normal">${escape($packageStore.should_start_at)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Code : <span class="badge border border-primary text-primary">${escape($packageStore.code)}</span>`;
    }
  })} ${general ? `${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `School :      
                        <img${add_attribute("src", $packageStore?.school?.logo?.full_path, 0)} alt="" class="avatar-xs rounded-circle"> ${escape($packageStore?.school?.name)}`;
    }
  })}` : ``} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Price : <span class="fs-5">${escape($packageStore.price)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Sale Price : ${$packageStore.sale_price ? `<span class="fs-5">${escape($packageStore.sale_price)}</span>` : `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-w3ocur">not set</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Current Price : ${$packageStore.sale_price ? `<span class="fs-6 text-decoration-line-through text-danger">${escape($packageStore.price)}</span> <span class="fs-5">${escape($packageStore.sale_price)}</span>` : `<span class="fs-5">${escape($packageStore.price)}</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Tax : <span class="fw-normal">${escape($packageStore.tax)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Days : <span class="fw-normal">${escape($packageStore.days)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Yearly : ${$packageStore.yearly ? `<span class="badge bg-success-subtle text-success" data-svelte-h="svelte-aowl2y">Yearly</span>` : `<span class="badge bg-warning-subtle text-warning" data-svelte-h="svelte-1da78mf">Not Yearly</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Popular : ${$packageStore.popular ? `<span class="badge bg-success-subtle text-success" data-svelte-h="svelte-1gob8ix">Popular</span>` : `<span class="badge bg-warning-subtle text-warning" data-svelte-h="svelte-o4p2bk">Not Popular</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Hidden : ${$packageStore.hidden ? `<span class="badge bg-success-subtle text-success" data-svelte-h="svelte-1gauyqc">Hidden</span>` : `<span class="badge bg-warning-subtle text-warning" data-svelte-h="svelte-fmgda1">Not Hidden</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Created at : <span class="fw-normal">${escape(formatTimestamp($packageStore.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Updated at : <span class="fw-normal">${escape(formatTimestamp($packageStore.updated_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Features : <!-- HTML_TAG_START -->${$packageStore?.package_features?.length > 0 ? "" : ': <span class="badge bg-warning">no features</span>'}<!-- HTML_TAG_END -->`;
    }
  })} ${$packageStore?.package_features?.length > 0 ? `<div class="row mb-4"><div class="table-responsive"><table class="table table-hover align-end table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-n76fbn"><tr><th scope="col">ID</th> <th scope="col">Name</th></tr></thead> <tbody class="list">${each($packageStore?.package_features || [], (feature) => {
    return `<tr><td>${escape(feature.id)}</td> <td>${escape(feature.name)}</td> </tr>`;
  })}</tbody></table></div></div>` : ``} <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-1vrqtk3"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const EditPackageModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $packageStore, $$unsubscribe_packageStore;
  let { general = false } = $$props;
  let close;
  let form;
  let sale;
  let tax;
  let { packageStore } = getContext("packageStore");
  $$unsubscribe_packageStore = subscribe(packageStore, (value) => $packageStore = value);
  let packageStoreInstance;
  packageStore.subscribe(() => {
    packageStoreInstance = JSON.parse(JSON.stringify($packageStore));
    sale = packageStoreInstance.sale_price ? true : false;
    tax = packageStoreInstance.tax ? true : false;
  });
  let editMenu = false;
  if ($$props.general === void 0 && $$bindings.general && general !== void 0)
    $$bindings.general(general);
  packageStoreInstance.menu_en;
  packageStoreInstance.menu_ar;
  $$unsubscribe_packageStore();
  return `${$$result.head += `<!-- HEAD_svelte-ep6pof_START --><link rel="preconnect" href="https://cdn.quilljs.com" crossorigin><link rel="stylesheet" href="https://cdn.quilljs.com/1.3.7/quill.snow.css"><!-- HEAD_svelte-ep6pof_END -->`, ""} <div class="modal fade" id="editPackageModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-hatm0d"><h5 class="modal-title" id="exampleModalgridLabel">Edit Package</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="name" class="form-label" data-svelte-h="svelte-u9uzac">Package Name</label> <input type="text" class="form-control" name="name" id="firstName" placeholder="Enter Package name"${add_attribute("value", packageStoreInstance.name, 0)}> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-1nwxuze">Arabic Name</label> <input type="text" class="form-control" id="productName" name="name_ar" dir="rtl" placeholder="ادخل اسم الباكج"${add_attribute("value", packageStoreInstance.name_ar, 0)}> ${``}</div> <div><label for="code" class="form-label" data-svelte-h="svelte-8jd088">Package Code</label> <input type="text" name="code" class="form-control" id="firstName" placeholder="Enter package code"${add_attribute("value", packageStoreInstance.code, 0)}> ${``}</div> <div><label for="exampleFormControlTextarea5" class="form-label" data-svelte-h="svelte-9lia6u">Package Description</label> <textarea class="form-control" name="description" id="exampleFormControlTextarea5" placeholder="Enter package description" rows="3">${escape(packageStoreInstance.description || "")}</textarea> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-co6v89">Arabic Description</label> <textarea class="form-control" name="description_ar" id="exampleFormControlTextarea5" dir="rtl" placeholder="ادخل وصف الباقة" rows="3">${escape(packageStoreInstance.description_ar || "")}</textarea> ${``}</div>  <div class="row g-3 ps-3"> <div class="form-check form-switch col"><input class="form-check-input" name="yearly" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", packageStoreInstance.yearly, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1q7mon8">Is Yearly</label> </div> <div class="form-check form-switch col"><input class="form-check-input" name="hidden" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", packageStoreInstance.hidden, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1eshwqa">Is Hidden</label> </div> <div class="form-check form-switch col"><input class="form-check-input" name="popular" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", packageStoreInstance.popular, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-ktlip1">Is Popular</label></div></div> ${!packageStoreInstance.yearly ? `<div><label for="days" class="form-label" data-svelte-h="svelte-6vs0gg">Package Days</label> <input type="text" name="days" class="form-control" id="firstName" placeholder="Enter Package days"${add_attribute("value", packageStoreInstance.days, 0)}> ${``}</div>` : ``} <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", sale, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1jul1xb">Include a sale price</label> </div></div> <div${add_classes((sale ? "col-xxl-6" : "").trim())}><label for="name" class="form-label" data-svelte-h="svelte-hp149g">Package Price</label> <input type="text" class="form-control" name="price" id="firstName" placeholder="Enter Package price"${add_attribute("value", packageStoreInstance.price, 0)}> ${``}</div> ${sale ? `<div class="col-xxl-6"><label for="code" class="form-label" data-svelte-h="svelte-hyyzb1">Package Sale Price</label> <input type="text" name="sale_price" class="form-control" id="firstName" placeholder="Enter Package Sale price"${add_attribute("value", packageStoreInstance.sale_price, 0)}> ${``}</div>` : ``} <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", tax, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1d22k6s">Include a tax</label> </div></div> ${tax ? `<div><label for="code" class="form-label" data-svelte-h="svelte-1adkix5">Package Tax %</label> <input type="text" name="tax" class="form-control" id="firstName" placeholder="Enter Package tax"${add_attribute("value", packageStoreInstance.tax, 0)}> ${``}</div>` : ``} <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", editMenu, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-ldnr59">Edit Menu</label> </div></div> ${``}  <div class="flex-shrink-0 text-end "><button type="button" class="align-self-end btn btn-primary waves-effect waves-light" data-svelte-h="svelte-14k625v"><i class="ri-add-line align-bottom me-1"></i> Add Feature</button></div> <div class="table-responsive"><table class="table align-end table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-sslqv3"><tr><th scope="col">Feature Name</th> <th scope="col">Arabic Name</th> <th scope="col">Checked</th> <th scope="col">Actions</th></tr></thead> <tbody class="list">${each(packageStoreInstance.package_features || [], (feature, i) => {
    return `<tr class="align-middle"><td><input type="text" class="form-control" id="firstName" placeholder="Enter Feature Name"${add_attribute("value", feature.name, 0)}></td> <td><input type="text" class="form-control" id="firstName" dir="rtl" placeholder="ادخل اسم الميزة"${add_attribute("value", feature.name_ar, 0)}></td> <td><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", feature.checked, 1)}></td> <td><a role="button" class="fs-15" data-bs-toggle="tooltip" data-bs-title="Delete" data-svelte-h="svelte-12joufv"><i class="ri-delete-bin-line"></i></a></td> </tr>`;
  })}</tbody></table></div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const PackageItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_packageStore;
  let { general = false } = $$props;
  let { packageObj } = $$props;
  let { packageStore } = getContext("packageStore");
  $$unsubscribe_packageStore = subscribe(packageStore, (value) => value);
  if ($$props.general === void 0 && $$bindings.general && general !== void 0)
    $$bindings.general(general);
  if ($$props.packageObj === void 0 && $$bindings.packageObj && packageObj !== void 0)
    $$bindings.packageObj(packageObj);
  $$unsubscribe_packageStore();
  return `<tr scope="row"${add_attribute(
    "class",
    packageObj.current ? "table-active bg-success-subtle" : "",
    0
  )}><td data-svelte-h="svelte-1z5pzi"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(packageObj.id)}</td> <td>${escape(packageObj.name)}</td> <td>${escape(packageObj.name_ar)}</td> <td><span class="badge border border-primary text-primary">${escape(packageObj.code)}</span></td> <td>${packageObj.should_start_at == null ? `<span class="badge bg-warning-subtle text-warning" data-svelte-h="svelte-1phe2t6">not scheduled</span>` : `${escape(packageObj.should_start_at)}`}</td> ${general ? `<td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", packageObj.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(packageObj.school.name)}</div></div></td>` : ``} <td>${packageObj.sale_price ? `<span class="fs-6 text-decoration-line-through text-danger">${escape(packageObj.price)}</span> <span class="fs-5">${escape(packageObj.sale_price)}</span>` : `<span class="fs-5">${escape(packageObj.price)}</span>`}</td> <td>${escape(packageObj.tax)}</td> <td>${escape(packageObj.days)}</td> <td>${packageObj.yearly ? `<span class="badge bg-success-subtle text-success" data-svelte-h="svelte-aowl2y">Yearly</span>` : `<span class="badge bg-warning-subtle text-warning" data-svelte-h="svelte-1da78mf">Not Yearly</span>`}</td> <td>${packageObj.popular ? `<span class="badge bg-success-subtle text-success" data-svelte-h="svelte-1gob8ix">Popular</span>` : `<span class="badge bg-warning-subtle text-warning" data-svelte-h="svelte-o4p2bk">Not Popular</span>`}</td> <td>${packageObj.hidden ? `<span class="badge bg-success-subtle text-success" data-svelte-h="svelte-1gauyqc">Hidden</span>` : `<span class="badge bg-warning-subtle text-warning" data-svelte-h="svelte-fmgda1">Not Hidden</span>`}</td> <td><div class="hstack gap-3">${JSON.parse(sessionStorage.getItem("permissions")).includes("packages.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewPackageModal" data-svelte-h="svelte-lj7jlv"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("packages.update") ? `<span data-bs-toggle="modal" data-bs-target="#editPackageModal" data-svelte-h="svelte-187hldm"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("packages.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deletePackageModal" data-svelte-h="svelte-5j9l78"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const PackagesTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { packagesList } = $$props;
  let { general = false } = $$props;
  setContext("packageStore", { packageStore: writable({}) });
  if ($$props.packagesList === void 0 && $$bindings.packagesList && packagesList !== void 0)
    $$bindings.packagesList(packagesList);
  if ($$props.general === void 0 && $$bindings.general && general !== void 0)
    $$bindings.general(general);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-end table-nowrap mb-0 border-top"><thead class="table-light"><tr><th scope="col" style="width: 25px;" data-svelte-h="svelte-gbrsm8"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col" data-svelte-h="svelte-njzezq">ID</th> <th scope="col" data-svelte-h="svelte-z0rb3w">Name</th> <th scope="col" data-svelte-h="svelte-1sr5kji">Arabic Name</th> <th scope="col" data-svelte-h="svelte-1a10dfm">Code</th> <th scope="col" data-svelte-h="svelte-1p5rj6n">Should Start At</th> ${general ? `<th scope="col" data-svelte-h="svelte-16s5zj3">School</th>` : ``} <th scope="col" data-svelte-h="svelte-e78zak">Price</th> <th scope="col" data-svelte-h="svelte-a5n1m4">Tax</th> <th scope="col" data-svelte-h="svelte-17mwsy0">Days</th> <th scope="col" data-svelte-h="svelte-bk7ssd">Yearly</th> <th scope="col" data-svelte-h="svelte-4jnib4">Popular</th> <th scope="col" data-svelte-h="svelte-d2yqo3">Hidden</th> <th scope="col" data-svelte-h="svelte-l137bu">Actions</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(packagesList, (packageObj) => {
    return `${validate_component(PackageItem, "PackageItem").$$render($$result, { general, packageObj }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(EditPackageModal, "EditPackageModal").$$render($$result, {}, {}, {})} ${validate_component(DeletePackageModal, "DeletePackageModal").$$render($$result, {}, {}, {})} ${validate_component(ViewPackageModal, "ViewPackageModal").$$render($$result, { general }, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});

export { AddPackageModal as A, PackagesTable as P };
//# sourceMappingURL=PackagesTable-3ddb34ae.js.map
