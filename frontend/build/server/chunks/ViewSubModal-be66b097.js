import { c as create_ssr_component, g as getContext, b as subscribe, e as escape, v as validate_component, h as add_attribute } from './ssr-69d45533.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import { P as Progress } from './Progress-2ab42500.js';
import { t as translation } from './translation-88f21498.js';

const ViewSubModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $subStore, $$unsubscribe_subStore;
  let { subStore } = getContext("subStore");
  $$unsubscribe_subStore = subscribe(subStore, (value) => $subStore = value);
  $$unsubscribe_subStore();
  return `<div class="modal fade" id="viewSubModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalgridLabel">${escape(translation.viewSubscription[localStorage.getItem("language")])}</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4">${$subStore?.student ? `${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.student[localStorage.getItem("language")])} : 
                                <img${add_attribute("src", $subStore?.student?.image?.full_path, 0)} alt="" class="avatar-xs rounded-circle"> ${escape($subStore?.student?.fullname)}`;
    }
  })}` : ``} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.package[localStorage.getItem("language")])} :
                                <img${add_attribute("src", $subStore?.package?.school?.logo?.full_path, 0)} alt="" class="avatar-xs rounded-circle"> ${localStorage.getItem("language") == "ar" ? `${escape($subStore?.package?.school?.name_ar)} - ${escape($subStore?.package?.name_ar)}` : `${escape($subStore?.package?.school?.name)} - ${escape($subStore?.package?.name)}`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.days[localStorage.getItem("language")])} :  <span class="fw-normal">${escape($subStore?.days)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0">${escape(translation.balance[localStorage.getItem("language")])} :</div> <div class="flex-grow-1">${validate_component(Progress, "Progress").$$render(
        $$result,
        {
          now: $subStore?.balance,
          max: $subStore?.days
        },
        {},
        {}
      )}</div></div>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.startedAt[localStorage.getItem("language")])} : <span class="fw-normal">${escape($subStore?.started_at == null ? "unset" : $subStore?.started_at)}</span>`;
    }
  })} ${$subStore?.status == "active" ? `${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.createdAt[localStorage.getItem("language")])} : <span class="fw-normal">${escape(formatTimestamp($subStore?.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.updatedAt[localStorage.getItem("language")])} : <span class="fw-normal">${escape(formatTimestamp($subStore?.updated_at))}</span>`;
    }
  })} <div class="row mb-3"><div class="table-responsive "><table class="table table-borderless mb-0"><tbody><tr><td>${escape(translation.subTotal[localStorage.getItem("language")])} :</td> <td class="text-end" id="cart-subtotal">${escape($subStore.subtotal)} ${escape(translation.sar[localStorage.getItem("language")])}</td></tr> ${$subStore?.coupon ? `<tr><td>${escape(translation.discount[localStorage.getItem("language")])} <span class="text-muted" data-svelte-h="svelte-n2yguh">($subStore?.coupon)</span> :</td> <td class="text-end" id="cart-subtotal">${escape($subStore.discount)} ${escape(translation.sar[localStorage.getItem("language")])}</td></tr>` : ``} <tr><td>${escape(translation.estimatedTax[localStorage.getItem("language")])}(${escape($subStore.tax)}%) :</td> <td class="text-end" id="cart-discount">+ ${escape($subStore.taxCalculated)} ${escape(translation.sar[localStorage.getItem("language")])}</td></tr> <tr class="table-active"><th>${escape(translation.total[localStorage.getItem("language")])} (${escape(translation.sar[localStorage.getItem("language")])}) :</th> <td class="text-end"><span class="fw-semibold" id="cart-total">${escape($subStore.total)} ${escape(translation.sar[localStorage.getItem("language")])}</span></td></tr></tbody></table></div></div>` : `${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.status[localStorage.getItem("language")])} :${$subStore.status == "scheduled" ? ` <span class="badge bg-info-subtle text-info ms-1" data-svelte-h="svelte-ulcrrz">Scheduled</span>` : `${$subStore.status == "expired" ? ` <span class="badge bg-danger-subtle text-danger ms-1" data-svelte-h="svelte-mnas7v">Expired</span>` : `${$subStore.status == "disabled" ? ` <span class="badge bg-warning-subtle text-warning ms-1" data-svelte-h="svelte-qdecv2">Disabled</span>` : `${$subStore.status == "inactive" ? ` <span class="badge bg-dark-subtle text-dark ms-1" data-svelte-h="svelte-adctlb">Inactive</span>` : ``}`}`}`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.createdAt[localStorage.getItem("language")])} : <span class="fw-normal">${escape(formatTimestamp($subStore?.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.updatedAt[localStorage.getItem("language")])} : <span class="fw-normal">${escape(formatTimestamp($subStore?.updated_at))}</span>`;
    }
  })}`} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">${escape(translation.close[localStorage.getItem("language")])}</button></div></div></div></div></div>`;
});

export { ViewSubModal as V };
//# sourceMappingURL=ViewSubModal-be66b097.js.map
