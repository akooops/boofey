import { c as create_ssr_component, h as add_attribute, e as escape, v as validate_component, b as subscribe, s as setContext, f as each, g as getContext } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import { t as translation } from './translation-88f21498.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import { w as writable } from './index2-7897530e.js';
import { n as navigating } from './stores-fc2c2f25.js';

const ViewPaymentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $paymentStore, $$unsubscribe_paymentStore;
  let { paymentStore } = getContext("paymentStore");
  $$unsubscribe_paymentStore = subscribe(paymentStore, (value) => $paymentStore = value);
  $$unsubscribe_paymentStore();
  return `<div class="modal fade" id="viewPaymentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalgridLabel">${escape(translation.viewPayment[localStorage.getItem("language")])}</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4">${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.payRef[localStorage.getItem("language")])} :<span class="badge border border-primary text-primary">${escape($paymentStore?.ref)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.subRef[localStorage.getItem("language")])} : <span class="badge border border-primary text-primary">${escape($paymentStore?.subscription?.ref == null ? "not found" : $paymentStore.subscription.ref)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.status[localStorage.getItem("language")])} : ${$paymentStore?.status == 14 || $paymentStore?.status == null ? `<span class="badge bg-success-subtle text-success" id="invoice-status">${escape(translation.success[localStorage.getItem("language")])}</span>` : `<span class="badge bg-danger-subtle text-danger" id="invoice-status">${escape(translation.failed[localStorage.getItem("language")])}</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.amount[localStorage.getItem("language")])} : <span class="fw-normal">${escape($paymentStore?.amount)} ${escape(translation.sar[localStorage.getItem("language")])}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.paidAt[localStorage.getItem("language")])} : <span class="fw-normal">${escape($paymentStore?.paid_at)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.paymentOption[localStorage.getItem("language")])} : <span class="fw-normal">${escape($paymentStore?.payment_option)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.cardNumber[localStorage.getItem("language")])} : <span class="fw-normal">${escape($paymentStore?.card_number)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.holderName[localStorage.getItem("language")])} : <span class="fw-normal">${escape($paymentStore?.card_holder_name)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.billing[localStorage.getItem("language")])} :`;
    }
  })} <div class="ps-3">${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.firstName[localStorage.getItem("language")])} : <span class="fw-normal">${escape($paymentStore?.firstname)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.lastName[localStorage.getItem("language")])} : <span class="fw-normal">${escape($paymentStore?.lastname)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.email[localStorage.getItem("language")])} : <span class="fw-normal">${escape($paymentStore?.email)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.phone[localStorage.getItem("language")])} : <span class="fw-normal">${escape($paymentStore?.phone)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.address[localStorage.getItem("language")])} : <span class="fw-normal">${escape($paymentStore?.address)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.state[localStorage.getItem("language")])} : <span class="fw-normal">${escape($paymentStore?.state)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.city[localStorage.getItem("language")])} : <span class="fw-normal">${escape($paymentStore?.city)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.zipCode[localStorage.getItem("language")])} : <span class="fw-normal">${escape($paymentStore?.zipcode)}</span>`;
    }
  })}</div> ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.createdAt[localStorage.getItem("language")])} : <span class="fw-normal">${escape(formatTimestamp($paymentStore?.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.updatedAt[localStorage.getItem("language")])} : <span class="fw-normal">${escape(formatTimestamp($paymentStore?.updated_at))}</span>`;
    }
  })} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">${escape(translation.close[localStorage.getItem("language")])}</button></div></div></div></div></div>`;
});
const PaymentItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_paymentStore;
  let { payment } = $$props;
  let { paymentStore } = getContext("paymentStore");
  $$unsubscribe_paymentStore = subscribe(paymentStore, (value) => value);
  if ($$props.payment === void 0 && $$bindings.payment && payment !== void 0)
    $$bindings.payment(payment);
  $$unsubscribe_paymentStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(payment.id)}</td> <td><span class="badge border border-primary text-primary">${escape(payment.ref)}</span></td> <td>${payment?.subscription?.ref == null ? `<span class="badge bg-danger-subtle text-danger">${escape(translation.notFound[localStorage.getItem("language")])}</span>` : `${escape(payment.subscription.ref)}`}</td> <td><img${add_attribute("src", payment?.subscription?.student?.image?.full_path, 0)} class="avatar-xxs rounded-circle me-1" alt=""> <a href="" class="text-reset">${escape(payment?.subscription?.student?.fullname)}</a></td> <td>${payment.status == 14 || payment.status == null ? `<span class="badge bg-success-subtle text-success" id="invoice-status">${escape(translation.success[localStorage.getItem("language")])}</span>` : `<span class="badge bg-danger-subtle text-danger" id="invoice-status">${escape(translation.failed[localStorage.getItem("language")])}</span>`}</td> <td>${escape(payment.amount)} ${escape(translation.sar[localStorage.getItem("language")])}</td> <td>${escape(payment.paid_at)}</td> <td><div class="hstack gap-3"><span data-bs-toggle="modal" data-bs-target="#viewPaymentModal" data-svelte-h="svelte-1hpq45r"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span></div></td></tr>`;
});
const PaymentsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { paymentsList } = $$props;
  setContext("paymentStore", { paymentStore: writable({}) });
  if ($$props.paymentsList === void 0 && $$bindings.paymentsList && paymentsList !== void 0)
    $$bindings.paymentsList(paymentsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light"><tr><th scope="col" style="width: 25px;" data-svelte-h="svelte-gbrsm8"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">${escape(translation.id[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.payRef[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.subRef[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.student[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.status[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.amount[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.paidAt[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.actions[localStorage.getItem("language")])}</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(paymentsList, (payment) => {
    return `${validate_component(PaymentItem, "PaymentItem").$$render($$result, { payment }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(ViewPaymentModal, "ViewPaymentModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let paymentsList;
  let paymentsPagination;
  let { data } = $$props;
  let paymentsPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  paymentsList = data.paymentsResponse.data.payments;
  paymentsPagination = data.paymentsResponse.pagination;
  return `<div class="row"${add_attribute("this", paymentsPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1">${escape(translation.paymentManagement[localStorage.getItem("language")])}</h4> <div class="flex-shrink-0" data-svelte-h="svelte-1htjqfz"></div> </div> <div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render(
    $$result,
    {
      type: translation.payment[localStorage.getItem("language")]
    },
    {},
    {}
  )} ${validate_component(PaymentsTable, "PaymentsTable").$$render($$result, { paymentsList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, paymentsPagination), {}, {})} </div>   </div> </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-b1e2c8dc.js.map
