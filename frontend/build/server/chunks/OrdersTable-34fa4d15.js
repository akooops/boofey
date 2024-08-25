import { c as create_ssr_component, b as subscribe, s as setContext, f as each, v as validate_component, g as getContext, d as add_classes, e as escape, h as add_attribute } from './ssr-69d45533.js';
import './index-64aa7a5e.js';
import { w as writable } from './index2-7897530e.js';
import { n as navigating } from './stores-fc2c2f25.js';

const DeleteOrderModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $orderStore, $$unsubscribe_orderStore;
  let close;
  let { orderStore } = getContext("orderStore");
  $$unsubscribe_orderStore = subscribe(orderStore, (value) => $orderStore = value);
  $$unsubscribe_orderStore();
  return `<div id="deleteOrderModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`#${$orderStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const OrderItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_orderStore;
  let { order } = $$props;
  let { orderStore } = getContext("orderStore");
  $$unsubscribe_orderStore = subscribe(orderStore, (value) => value);
  if ($$props.order === void 0 && $$bindings.order && order !== void 0)
    $$bindings.order(order);
  $$unsubscribe_orderStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(order.id)}</td> <td><span class="badge border border-primary text-primary">${escape(order.ref)}</span></td> <td>+ ${escape(order.tax)}%</td> <td>+ ${escape(order.taxCalculated)}</td> <td>- ${escape(order.discount)}%</td> <td>${escape(order.subtotal)} SAR</td> <td>${escape(order.total)} SAR</td> <td><div class="hstack gap-3 flex-wrap">${JSON.parse(sessionStorage.getItem("permissions")).includes("orders.show") ? `<a href="${"/admin/orders/" + escape(order.id, true)}" target="_blank" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("orders.update") ? `<a href="${"/admin/orders/" + escape(order.id, true) + "/edit"}" target="_blank" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("orders.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteOrderModal" data-svelte-h="svelte-1etalvg"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const OrdersTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { ordersList } = $$props;
  setContext("orderStore", { orderStore: writable({}) });
  if ($$props.ordersList === void 0 && $$bindings.ordersList && ordersList !== void 0)
    $$bindings.ordersList(ordersList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-93bzrp"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Order Ref</th> <th scope="col">Tax</th> <th scope="col">Calculated Tax</th> <th scope="col">Discount</th> <th scope="col">SubTotal</th> <th scope="col">Total</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(ordersList, (order) => {
    return `${validate_component(OrderItem, "OrderItem").$$render($$result, { order }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(DeleteOrderModal, "DeleteOrderModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});

export { OrdersTable as O };
//# sourceMappingURL=OrdersTable-34fa4d15.js.map
