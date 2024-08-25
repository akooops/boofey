import { c as create_ssr_component, h as add_attribute, e as escape, v as validate_component, b as subscribe, s as setContext, f as each, g as getContext } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import { t as translation } from './translation-88f21498.js';
import { w as writable } from './index2-7897530e.js';
import { n as navigating } from './stores-fc2c2f25.js';

const InvoiceItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_invoiceStore;
  let { invoice } = $$props;
  let { invoiceStore } = getContext("invoiceStore");
  $$unsubscribe_invoiceStore = subscribe(invoiceStore, (value) => value);
  if ($$props.invoice === void 0 && $$bindings.invoice && invoice !== void 0)
    $$bindings.invoice(invoice);
  $$unsubscribe_invoiceStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(invoice.id)}</td> <td>${invoice?.ref == null ? `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-pp1ynj">not found</span>` : `${escape(invoice.ref)}`}</td> <td>${invoice?.subscription?.ref == null ? `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-pp1ynj">not found</span>` : `${escape(invoice.subscription.ref)}`}</td> <td>${escape(invoice.generated_at)}</td> <td>${invoice?.subscription?.ref == null ? `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-pp1ynj">not found</span>` : `<div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", invoice.subscription.package.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> ${localStorage.getItem("language") == "ar" ? `<div class="flex-grow-1">${escape(invoice.subscription.package.school.name_ar)} - ${escape(invoice.subscription.package.name_ar)}</div>` : `<div class="flex-grow-1">${escape(invoice.subscription.package.school.name)} - ${escape(invoice.subscription.package.name)}</div>`}</div>`}</td> <td>${invoice?.subscription?.ref == null ? `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-pp1ynj">not found</span>` : `<div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", invoice.subscription.student.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(invoice.subscription.student.fullname)}</div></div>`}</td> <td><div class="hstack gap-3 flex-wrap"><a href="${"/invoices/" + escape(invoice.id, true)}" target="_blank" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.print[localStorage.getItem("language")], 0)}><i class="ri-printer-line"></i></a></div></td></tr>`;
});
const InvoicesTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { invoicesList } = $$props;
  setContext("invoiceStore", { invoiceStore: writable({}) });
  if ($$props.invoicesList === void 0 && $$bindings.invoicesList && invoicesList !== void 0)
    $$bindings.invoicesList(invoicesList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light"><tr><th scope="col" style="width: 25px;" data-svelte-h="svelte-gbrsm8"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">${escape(translation.id[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.invoiceRef[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.subRef[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.genAt[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.package[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.student[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.actions[localStorage.getItem("language")])}</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(invoicesList, (invoice) => {
    return `${validate_component(InvoiceItem, "InvoiceItem").$$render($$result, { invoice }, {}, {})}`;
  })}</tbody>` : ``}</table> </div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let invoicesList;
  let invoicesPagination;
  let { data } = $$props;
  let invoicesPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  invoicesList = data.invoicesResponse.data.invoices;
  invoicesPagination = data.invoicesResponse.pagination;
  return `<div class="row"${add_attribute("this", invoicesPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1">${escape(translation.invoiceManagement[localStorage.getItem("language")])}</h4> <div class="flex-shrink-0" data-svelte-h="svelte-1htjqfz"></div> </div> <div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render(
    $$result,
    {
      type: translation.invoice[localStorage.getItem("language")]
    },
    {},
    {}
  )} ${validate_component(InvoicesTable, "InvoicesTable").$$render($$result, { invoicesList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, invoicesPagination), {}, {})} </div>   </div> </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-6806a49c.js.map
