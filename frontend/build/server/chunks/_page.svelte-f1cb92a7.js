import { c as create_ssr_component, b as subscribe, g as getContext, e as escape, f as each, h as add_attribute } from './ssr-69d45533.js';
import { n as navigating } from './stores-fc2c2f25.js';
import { t as translation } from './translation-88f21498.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import './index-64aa7a5e.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let subsList;
  let $navigating, $$unsubscribe_navigating;
  let $currentFilter, $$unsubscribe_currentFilter;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { data } = $$props;
  let { currentFilter } = getContext("currentFilterStore");
  $$unsubscribe_currentFilter = subscribe(currentFilter, (value) => $currentFilter = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  subsList = data.subscriptions;
  $$unsubscribe_navigating();
  $$unsubscribe_currentFilter();
  return `${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<div class="fw-medium align-items-center d-flex gap-4 mb-4"><div class="d-flex gap-3 align-items-center"><p class="col-auto mb-0">From:  ${escape($currentFilter.startDate)}</p> <p class="col-auto mb-0">To:  ${escape($currentFilter.endDate)}</p> <p class="col-auto mb-0">Count: ${escape(data.count)}</p></div></div> <div class="row"><div class=""><table class="table align-middle mb-0 border-top"><thead class="table-light align-middle" data-svelte-h="svelte-u64g58"><tr><th scope="col">SubTotal</th> <th scope="col">Subscription Reference</th> <th scope="col">Student</th> <th scope="col">Package</th> <th scope="col">Status</th> <th scope="col">Created At</th> <th scope="col">SubTotal</th> <th scope="col">Discount</th> <th scope="col">Tax</th> <th scope="col">Total</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(subsList, (sub) => {
    return `<tr scope="row"><td>${escape(sub.id)}</td> <td>${escape(sub.ref)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", sub.student.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(sub.student.fullname)}</div> </div></td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", sub.package.school?.logo?.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(sub.package.school?.name)} - ${escape(sub.package?.name)}</div> </div></td> <td>${sub.status == "active" ? `<span class="badge bg-success-subtle text-success ms-1" data-svelte-h="svelte-100iaeo">Active</span>` : `${sub.status == "inactive" ? `<span class="badge bg-dark-subtle text-dark ms-1" data-svelte-h="svelte-adctlb">Inactive</span>` : `${sub.status == "disabled" ? `<span class="badge bg-warning-subtle text-warning ms-1" data-svelte-h="svelte-qdecv2">Disabled</span>` : `${sub.status == "expired" ? `<span class="badge bg-danger-subtle text-danger ms-1" data-svelte-h="svelte-mnas7v">Expired</span>` : ``}`}`}`}</td> <td>${escape(formatTimestamp(sub.created_at))}</td> <td class="text-end">${escape(sub.subtotal)}</td> <td class="text-end">${escape(sub.discount)}</td> <td class="text-end">${escape(sub.tax)}</td> <td class="text-end">${escape(sub.total)}</td> </tr>`;
  })} <tr class="ms-auto"><td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td class="text-end">${escape(data.subtotalSum)}</td> <td class="text-end">${escape(data.discountSum)}</td> <td class="text-end">${escape(data.taxSum)}</td> <th class="text-end">${escape(data.totalSum)}</th></tr></tbody>` : ``}</table> <table class="table table-borderless table-nowrap align-middle mb-0 ms-auto" style="width:250px" data-svelte-h="svelte-385rsk"><tbody></tbody></table></div></div> <div class="hstack gap-2 justify-content-end d-print-none mt-4"><a href="javascript:window.print()" class="btn btn-info"><i class="ri-printer-line align-bottom me-1"></i> ${escape(translation.print[localStorage.getItem("language")])}</a></div>` : ``} ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-1dg75t9"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-f1cb92a7.js.map
