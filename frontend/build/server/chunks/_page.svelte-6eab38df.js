import { c as create_ssr_component, h as add_attribute, v as validate_component, b as subscribe, s as setContext, f as each, d as add_classes, g as getContext, e as escape } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import './index-64aa7a5e.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import { w as writable } from './index2-7897530e.js';
import { n as navigating } from './stores-fc2c2f25.js';
import './translation-88f21498.js';

const DeleteCategoryModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $categoryStore, $$unsubscribe_categoryStore;
  let close;
  let { categoryStore } = getContext("categoryStore");
  $$unsubscribe_categoryStore = subscribe(categoryStore, (value) => $categoryStore = value);
  $$unsubscribe_categoryStore();
  return `<div id="deleteCategoryModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$categoryStore.name} #${$categoryStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const ViewCategoryModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $categoryStore, $$unsubscribe_categoryStore;
  let { categoryStore } = getContext("categoryStore");
  $$unsubscribe_categoryStore = subscribe(categoryStore, (value) => $categoryStore = value);
  $$unsubscribe_categoryStore();
  return `<div class="modal fade" id="viewCategoryModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-16jl4jo"><h5 class="modal-title" id="exampleModalgridLabel">View Coupon</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4">${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Name : <span class="fw-normal">${escape($categoryStore.name)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Arabic Name : <span class="fw-normal">${escape($categoryStore.name_ar)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Products Count : <span class="badge bg-primary">${escape($categoryStore.productsCount)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Created at : <span class="fw-normal">${escape(formatTimestamp($categoryStore.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Updated at : <span class="fw-normal">${escape(formatTimestamp($categoryStore.updated_at))}</span>`;
    }
  })} <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-1vrqtk3"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const EditCategoryModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $categoryStore, $$unsubscribe_categoryStore;
  let { categoryStore } = getContext("categoryStore");
  $$unsubscribe_categoryStore = subscribe(categoryStore, (value) => $categoryStore = value);
  let close;
  let form;
  $$unsubscribe_categoryStore();
  return `<div class="modal fade" id="editCategoryModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-19y8o50"><h5 class="modal-title" id="exampleModalgridLabel">Add Category</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="categoryName" class="form-label" data-svelte-h="svelte-1yor20o">Name</label> <input type="text" class="form-control" id="categoryName" name="name" placeholder="Enter Category name"${add_attribute("value", $categoryStore.name, 0)}> ${``}</div> <div><label for="categoryarName" class="form-label" data-svelte-h="svelte-1rfisrd">Arabic Name</label> <input type="text" class="form-control" id="categoryName" name="name_ar" dir="rtl" placeholder="ادخل اسم الصنف"${add_attribute("value", $categoryStore.name_ar, 0)}> ${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const CategoryItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_categoryStore;
  let { category } = $$props;
  let { categoryStore } = getContext("categoryStore");
  $$unsubscribe_categoryStore = subscribe(categoryStore, (value) => value);
  if ($$props.category === void 0 && $$bindings.category && category !== void 0)
    $$bindings.category(category);
  $$unsubscribe_categoryStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(category.id)}</td> <td>${escape(category.name)}</td> <td>${escape(category.name_ar)}</td> <td><span class="badge bg-primary">${escape(category.productsCount)}</span></td> <td><div class="hstack gap-3">${JSON.parse(sessionStorage.getItem("permissions")).includes("categories.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewCategoryModal" data-svelte-h="svelte-ayr0vb"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("categories.update") ? `<span data-bs-toggle="modal" data-bs-target="#editCategoryModal" data-svelte-h="svelte-11zxmri"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("categories.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteCategoryModal" data-svelte-h="svelte-ce7e0k"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const CategoriesTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { categoriesList } = $$props;
  setContext("categoryStore", { categoryStore: writable({}) });
  if ($$props.categoriesList === void 0 && $$bindings.categoriesList && categoriesList !== void 0)
    $$bindings.categoriesList(categoriesList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive">²
        <table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-2mzv4i"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Name</th> <th scope="col">Arabic name</th> <th scope="col">Products Count</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(categoriesList, (category) => {
    return `${validate_component(CategoryItem, "CategoryItem").$$render($$result, { category }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(EditCategoryModal, "EditCategoryModal").$$render($$result, {}, {}, {})} ${validate_component(ViewCategoryModal, "ViewCategoryModal").$$render($$result, {}, {}, {})} ${validate_component(DeleteCategoryModal, "DeleteCategoryModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const AddCategoryModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categoryName;
  let close;
  let form;
  return `<div class="modal fade" id="addCategoryModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-19y8o50"><h5 class="modal-title" id="exampleModalgridLabel">Add Category</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="categoryName" class="form-label" data-svelte-h="svelte-1yor20o">Name</label> <input type="text" class="form-control" id="categoryName" name="name" placeholder="Enter Category name"${add_attribute("value", categoryName, 0)}> ${``}</div> <div><label for="categoryarName" class="form-label" data-svelte-h="svelte-1rfisrd">Arabic Name</label> <input type="text" class="form-control" id="categoryName" name="name_ar" dir="rtl" placeholder="ادخل اسم الصنف"> ${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categoriesList;
  let categoriesPagination;
  let { data } = $$props;
  let categoriesPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  categoriesList = data.categoriesResponse.data;
  categoriesPagination = data.categoriesResponse.pagination;
  return `<div class="row"${add_attribute("this", categoriesPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1" data-svelte-h="svelte-uzderz">Categories Managment</h4> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("categories.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addCategoryModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-1tmzafd"><i class="ri-add-line align-bottom me-1"></i>Add Category</button> ${validate_component(AddCategoryModal, "AddCategoryModal").$$render($$result, {}, {}, {})}` : ``}</div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("categories.index") ? `<div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Categorie" }, {}, {})} ${validate_component(CategoriesTable, "CategoriesTable").$$render($$result, { categoriesList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, categoriesPagination), {}, {})} </div>   </div>` : ``} </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-6eab38df.js.map
