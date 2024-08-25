import { c as create_ssr_component, h as add_attribute, v as validate_component } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import { O as OrdersTable } from './OrdersTable-b2eb16a6.js';
import './stores-fc2c2f25.js';
import './translation-88f21498.js';
import './index-64aa7a5e.js';
import './index2-7897530e.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ordersList;
  let ordersPagination;
  let { data } = $$props;
  let ordersPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ordersList = data.ordersResponse.data;
  ordersPagination = data.ordersResponse.pagination;
  return `<div class="row"${add_attribute("this", ordersPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1" data-svelte-h="svelte-177umtu">Orders Managment</h4> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("orders.store") ? `<a type="button" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-1fv29gz"><i class="ri-add-line align-bottom me-1"></i>Add Order</a>` : ``}</div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("orders.index") ? `<div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Order" }, {}, {})} ${validate_component(OrdersTable, "OrdersTable").$$render($$result, { ordersList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, ordersPagination), {}, {})} </div>   </div>` : ``} </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-da298cb1.js.map
