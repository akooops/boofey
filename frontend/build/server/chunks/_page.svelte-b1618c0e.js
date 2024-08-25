import { c as create_ssr_component, h as add_attribute, e as escape, v as validate_component, b as subscribe, s as setContext, f as each, g as getContext, d as add_classes } from './ssr-69d45533.js';
import { t as translation } from './translation-88f21498.js';
import './index-64aa7a5e.js';
import { n as navigating } from './stores-fc2c2f25.js';
import { w as writable } from './index2-7897530e.js';

const DeletePaymentMethodModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $paymentMethodStore, $$unsubscribe_paymentMethodStore;
  let close;
  let { paymentMethodStore } = getContext("paymentMethodStore");
  $$unsubscribe_paymentMethodStore = subscribe(paymentMethodStore, (value) => $paymentMethodStore = value);
  $$unsubscribe_paymentMethodStore();
  return `<div id="deletePaymentMethodModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4">${escape(translation.areYouSure[localStorage.getItem("language")])} ${escape(translation["?"][localStorage.getItem("language")])}</h4> <p class="text-muted fs-15 mb-4">${escape(translation.areYouSureYouWantToDel[localStorage.getItem("language")])} <span class="text-primary">${escape(`${$paymentMethodStore.card_holder_name}'s card #${$paymentMethodStore.id}`)}</span> ${escape(translation["?"][localStorage.getItem("language")])}</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)}>${escape(translation.close[localStorage.getItem("language")])}</button> <button type="button" class="btn btn-danger waves-effect waves-light">${escape(translation.delete[localStorage.getItem("language")])}</button></div></form></div></div> </div> </div> </div>`;
});
const PaymentMethodItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let expiry_date;
  let $$unsubscribe_paymentMethodStore;
  let { paymentMethod } = $$props;
  let { paymentMethodStore } = getContext("paymentMethodStore");
  $$unsubscribe_paymentMethodStore = subscribe(paymentMethodStore, (value) => value);
  if ($$props.paymentMethod === void 0 && $$bindings.paymentMethod && paymentMethod !== void 0)
    $$bindings.paymentMethod(paymentMethod);
  expiry_date = paymentMethod?.expiry_date?.toString();
  $$unsubscribe_paymentMethodStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(paymentMethod.id)}</td> <td>${escape(paymentMethod.card_holder_name)}</td> <td>${escape(paymentMethod.card_number)}</td> ${paymentMethod.expiry_date ? `<td>${escape(expiry_date[2])}${escape(expiry_date[3])}/${escape(expiry_date[0])}${escape(expiry_date[1])}</td>` : `<td>${escape(paymentMethod.expiry_date)}</td>`} <td><div class="hstack gap-3 flex-wrap"><span data-bs-toggle="modal" data-bs-target="#deletePaymentMethodModal"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.delete[localStorage.getItem("language")], 0)}><i class="ri-delete-bin-line"></i></a></span></div></td></tr>`;
});
const PaymentMethodsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { paymentMethodsList } = $$props;
  setContext("paymentMethodStore", { paymentMethodStore: writable({}) });
  if ($$props.paymentMethodsList === void 0 && $$bindings.paymentMethodsList && paymentMethodsList !== void 0)
    $$bindings.paymentMethodsList(paymentMethodsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light"><tr><th scope="col" style="width: 25px;" data-svelte-h="svelte-gbrsm8"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">${escape(translation.id[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.holderName[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.number[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.expiryDate[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.actions[localStorage.getItem("language")])}</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(paymentMethodsList, (paymentMethod, _) => {
    return `${validate_component(PaymentMethodItem, "PaymentMethodItem").$$render($$result, { paymentMethod }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(DeletePaymentMethodModal, "DeletePaymentMethodModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let paymentMethodsList;
  let { data } = $$props;
  let paymentMethodsPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  paymentMethodsList = data.paymentMethodsResponse.data.paymentMethods;
  return `<div class="row"${add_attribute("this", paymentMethodsPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1">${escape(translation.paymentMethods[localStorage.getItem("language")])}</h4> <div class="flex-shrink-0"><button type="button" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>${escape(translation.addPaymentMethod[localStorage.getItem("language")])}</button> </div> </div> <div class="card-body">${``}  <div class="row">  ${validate_component(PaymentMethodsTable, "PaymentMethodsTable").$$render($$result, { paymentMethodsList }, {}, {})}  </div>   </div> </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-b1618c0e.js.map
