import { c as create_ssr_component, h as add_attribute, v as validate_component, b as subscribe, s as setContext, f as each, d as add_classes, e as escape, g as getContext } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import './index-64aa7a5e.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import { P as Product } from './Product-402ba5c0.js';
import { w as writable } from './index2-7897530e.js';
import { n as navigating, p as page } from './stores-fc2c2f25.js';
import './translation-88f21498.js';

const DeleteProductModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $productStore, $$unsubscribe_productStore;
  let close;
  let { productStore } = getContext("productStore");
  $$unsubscribe_productStore = subscribe(productStore, (value) => $productStore = value);
  $$unsubscribe_productStore();
  return `<div id="deleteProductModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$productStore.name} #${$productStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const ViewProductModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $productStore, $$unsubscribe_productStore;
  let { productStore } = getContext("productStore");
  $$unsubscribe_productStore = subscribe(productStore, (value) => $productStore = value);
  $$unsubscribe_productStore();
  return `<div class="modal fade" id="viewProductModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-5d1s2j"><h5 class="modal-title" id="exampleModalgridLabel">View Product</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4"><img class="rounded avatar-xl mb-3 object-fit-cover" alt="Product  Image" width="200"${add_attribute("src", $productStore?.image?.full_path, 0)}> ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Name : <span class="fw-normal">${escape($productStore.name)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Arabic Name : <span class="fw-normal">${escape($productStore.name_ar)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Category : <span class="fw-normal">${escape($productStore.category?.name)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Description : <span class="fw-normal">${escape($productStore.description == null ? "no Description" : $productStore.description)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Arabic Description : <span class="fw-normal">${escape($productStore.description_ar == null ? "no Description" : $productStore.description_ar)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Sale Price : ${$productStore.sale_price ? `<span class="fs-5">${escape($productStore.sale_price)}</span>` : `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-w3ocur">not set</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Current Price : ${$productStore.sale_price ? `<span class="fs-6 text-decoration-line-through text-danger">${escape($productStore.price)}</span> <span class="fs-5">${escape($productStore.sale_price)}</span>` : `<span class="fs-5">${escape($productStore.price)}</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Created at : <span class="fw-normal">${escape(formatTimestamp($productStore.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Updated at : <span class="fw-normal">${escape(formatTimestamp($productStore.updated_at))}</span>`;
    }
  })} <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-1vrqtk3"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const EditProductModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $productStore, $$unsubscribe_productStore;
  let close;
  let form;
  let selectCategory;
  let editImage = false;
  let { productStore } = getContext("productStore");
  $$unsubscribe_productStore = subscribe(productStore, (value) => $productStore = value);
  let { categories = [] } = $$props;
  productStore.subscribe(() => {
    $productStore?.category?.id;
  });
  if ($$props.categories === void 0 && $$bindings.categories && categories !== void 0)
    $$bindings.categories(categories);
  $$unsubscribe_productStore();
  return `<div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-fuhvd3"><h5 class="modal-title" id="exampleModalgridLabel">Add Product</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="productName" class="form-label" data-svelte-h="svelte-piin45">Name</label> <input type="text" class="form-control" id="productName" name="name" placeholder="Enter Product name"${add_attribute("value", $productStore.name, 0)}> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-1nwxuze">Arabic Name</label> <input type="text" class="form-control" id="productName" name="name_ar" dir="rtl" placeholder="ادخل اسم المنتج"${add_attribute("value", $productStore.name_ar, 0)}> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-bzuh4h">Description</label> <textarea class="form-control" name="description" id="exampleFormControlTextarea5" placeholder="Enter product description" rows="3">${escape($productStore.description || "")}</textarea> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-co6v89">Arabic Description</label> <textarea class="form-control" name="description_ar" id="exampleFormControlTextarea5" dir="rtl" placeholder="ادخل وصف المنتح" rows="3">${escape($productStore.description_ar || "")}</textarea> ${``}</div> <div class="col-xxl-6"><label for="code" class="form-label" data-svelte-h="svelte-d88v52">Price</label> <input type="text" name="price" class="form-control" id="firstName" placeholder="Enter Product price"${add_attribute("value", $productStore.price, 0)}> ${``}</div> <div class="col-xxl-6"><label for="code" class="form-label" data-svelte-h="svelte-uwdlat">Sale Price</label> <input type="text" name="sale_price" class="form-control" id="firstName" placeholder="Enter Product Sale price"${add_attribute("value", $productStore.sale_price, 0)}> ${``}</div> <div class="col-lg-12"><label for="role" class="form-label" data-svelte-h="svelte-1efy536">Category</label> <select class="form-select" name="category_id" id="role" aria-label="Default select example"${add_attribute("this", selectCategory, 0)}>${each(categories, (category) => {
    return `<option${add_attribute("value", category.id, 0)}>${escape(category.name)}</option>`;
  })}</select> ${``}</div> <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", editImage, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-mhtbt5">Edit Image</label> </div></div> ${`<figure class="figure"><img alt="product image " width="200"${add_attribute("src", $productStore?.image?.full_path, 0)} class="figure-img rounded avatar-xl mb-3 object-fit-cover"> <figcaption class="figure-caption" data-svelte-h="svelte-1gz45az">Current Product image</figcaption></figure>`} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const ProductItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_productStore;
  let { product } = $$props;
  let { productStore } = getContext("productStore");
  $$unsubscribe_productStore = subscribe(productStore, (value) => value);
  if ($$props.product === void 0 && $$bindings.product && product !== void 0)
    $$bindings.product(product);
  $$unsubscribe_productStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(product.id)}</td> <td>${validate_component(Product, "Product").$$render(
    $$result,
    {
      src: product.image.full_path,
      name: product.name,
      category: product?.category?.name
    },
    {},
    {}
  )}</td> <td>${product.sale_price ? `<span class="fs-6 text-decoration-line-through text-danger">${escape(product.price)}</span> <span class="fs-5">${escape(product.sale_price)}</span>` : `<span class="fs-5">${escape(product.price)}</span>`}</td> <td><div class="hstack gap-3 flex-wrap">${JSON.parse(sessionStorage.getItem("permissions")).includes("products.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewProductModal" data-svelte-h="svelte-xe64v9"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("products.update") ? `<span data-bs-toggle="modal" data-bs-target="#editProductModal" data-svelte-h="svelte-1orga9w"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("products.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteProductModal" data-svelte-h="svelte-qhalpu"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const ProductsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { productsList } = $$props;
  setContext("productStore", { productStore: writable({}) });
  let { categories = [] } = $$props;
  if ($$props.productsList === void 0 && $$bindings.productsList && productsList !== void 0)
    $$bindings.productsList(productsList);
  if ($$props.categories === void 0 && $$bindings.categories && categories !== void 0)
    $$bindings.categories(categories);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-1vzc7l7"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Product</th> <th scope="col">Price</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(productsList, (product) => {
    return `${validate_component(ProductItem, "ProductItem").$$render($$result, { product }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(ViewProductModal, "ViewProductModal").$$render($$result, {}, {}, {})} ${validate_component(EditProductModal, "EditProductModal").$$render($$result, { categories }, {}, {})} ${validate_component(DeleteProductModal, "DeleteProductModal").$$render($$result, {}, {}, {})} </div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const AddProductModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let productName;
  let close;
  let form;
  let selectCategory;
  let { categories = [] } = $$props;
  if ($$props.categories === void 0 && $$bindings.categories && categories !== void 0)
    $$bindings.categories(categories);
  return `<div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-fuhvd3"><h5 class="modal-title" id="exampleModalgridLabel">Add Product</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="productName" class="form-label" data-svelte-h="svelte-piin45">Name</label> <input type="text" class="form-control" id="productName" name="name" placeholder="Enter Product name"${add_attribute("value", productName, 0)}> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-1nwxuze">Arabic Name</label> <input type="text" class="form-control" id="productName" name="name_ar" dir="rtl" placeholder="ادخل اسم المنتج"> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-bzuh4h">Description</label> <textarea class="form-control" name="description" id="exampleFormControlTextarea5" placeholder="Enter product description" rows="3"></textarea> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-co6v89">Arabic Description</label> <textarea class="form-control" name="description_ar" id="exampleFormControlTextarea5" dir="rtl" placeholder="ادخل وصف المنتح" rows="3"></textarea> ${``}</div> <div class="col-xxl-6"><label for="code" class="form-label" data-svelte-h="svelte-d88v52">Price</label> <input type="text" name="price" class="form-control" id="firstName" placeholder="Enter Product price"> ${``}</div> <div class="col-xxl-6"><label for="code" class="form-label" data-svelte-h="svelte-uwdlat">Sale Price</label> <input type="text" name="sale_price" class="form-control" id="firstName" placeholder="Enter Product Sale price"> ${``}</div> <div class="col-lg-12"><label for="role" class="form-label" data-svelte-h="svelte-1efy536">Category</label> <select class="form-select" name="category_id" id="role" aria-label="Default select example"${add_attribute("this", selectCategory, 0)}><option disabled selected value data-svelte-h="svelte-myvy7z">-- select a package -- </option>${each(categories, (category) => {
    return `<option${add_attribute("value", category.id, 0)}>${escape(category.name)}</option>`;
  })}</select> ${``}</div> <div><label for="formFile" class="form-label" data-svelte-h="svelte-1eii8l0">Product Image</label> <input class="form-control" name="file" type="file" id="formFile"> ${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const CategoriesList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { categoriesList } = $$props;
  let activeCategory;
  if ($$props.categoriesList === void 0 && $$bindings.categoriesList && categoriesList !== void 0)
    $$bindings.categoriesList(categoriesList);
  $$unsubscribe_page();
  return `<div class="col-xl-3 col-lg-4"><div class="card"><div class="accordion accordion-flush filter-accordion"><div class="card-body border-bottom"><div><p class="text-muted text-uppercase fs-12 fw-medium mb-2" data-svelte-h="svelte-1rg8gfe">Categories</p> <ul class="list-unstyled mb-0 filter-list"><li><a href="#" class="d-flex py-1 align-items-center"><div class="flex-grow-1"><h5 class="${["fs-13 mb-0 listname", "text-primary"].join(" ").trim()}" data-svelte-h="svelte-1jslc9z">All Categories</h5></div></a></li> ${each(categoriesList, (category) => {
    return `<li><a href="#" class="d-flex py-1 align-items-center"><div class="flex-grow-1"><h5 class="${["fs-13 mb-0 listname", activeCategory == category.id ? "text-primary" : ""].join(" ").trim()}">${escape(category.name)}</h5></div> ${category.productsCount ? `<div class="flex-shrink-0 ms-2"><span class="badge bg-light text-muted">${escape(category.productsCount)}</span> </div>` : ``}</a> </li>`;
  })}</ul></div></div> </div></div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let productsList;
  let categoriesList;
  let productsPagination;
  let { data } = $$props;
  let productsPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  productsList = data.productsResponse.data.products;
  categoriesList = data.productsResponse.data.categories;
  productsPagination = data.productsResponse.pagination;
  return `<div class="row"${add_attribute("this", productsPage, 0)}>${validate_component(CategoriesList, "CategoriesList").$$render($$result, { categoriesList }, {}, {})} <div class="col-xl-9 col-lg-8"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1" data-svelte-h="svelte-1abaniz">Products Managment</h4> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("products.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addProductModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-183ogwp"><i class="ri-add-line align-bottom me-1"></i>Add Product</button> ${validate_component(AddProductModal, "AddProductModal").$$render($$result, { categories: categoriesList }, {}, {})}` : ``}</div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("products.index") ? `<div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Product" }, {}, {})} ${validate_component(ProductsTable, "ProductsTable").$$render($$result, { productsList, categories: categoriesList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, productsPagination), {}, {})} </div>   </div>` : ``} </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-ebade5b0.js.map
