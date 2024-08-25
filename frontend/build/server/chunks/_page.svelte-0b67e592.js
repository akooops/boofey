import { c as create_ssr_component, h as add_attribute, v as validate_component, b as subscribe, s as setContext, f as each, g as getContext, e as escape } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import { w as writable } from './index2-7897530e.js';
import { n as navigating } from './stores-fc2c2f25.js';
import './translation-88f21498.js';

const ViewPaymentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $paymentStore, $$unsubscribe_paymentStore;
  let { paymentStore } = getContext("paymentStore");
  $$unsubscribe_paymentStore = subscribe(paymentStore, (value) => $paymentStore = value);
  $$unsubscribe_paymentStore();
  return `<div class="modal fade" id="viewPaymentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1pum18u"><h5 class="modal-title" id="exampleModalgridLabel">View Payment</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4">${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Payment Ref :<span class="badge border border-primary text-primary">${escape($paymentStore?.ref)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Subscription Ref : <span class="badge border border-primary text-primary">${escape($paymentStore?.subscription?.ref == null ? "not found" : $paymentStore.subscription.ref)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Fort ID : <span class="fw-normal">${escape($paymentStore?.fort_id)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Father :    <img${add_attribute("src", $paymentStore?.father?.user?.profile?.image?.full_path, 0)} class="avatar-xxs rounded-circle me-1" alt=""> <a href="" class="text-reset">${escape($paymentStore?.father?.user?.profile?.fullname)}</a>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Status : ${$paymentStore?.status == 14 || $paymentStore?.status == null ? `<span class="badge bg-success-subtle text-success" id="invoice-status" data-svelte-h="svelte-13v117n">Success</span>` : `<span class="badge bg-danger-subtle text-danger" id="invoice-status" data-svelte-h="svelte-s5cc4p">Failed</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Amount : <span class="fw-normal">${escape($paymentStore?.amount)} SAR</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Paid At : <span class="fw-normal">${escape($paymentStore?.paid_at)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Response Code : <span class="fw-normal">${escape($paymentStore?.response_code)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Response Message : <span class="fw-normal">${escape($paymentStore?.response_message)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Payment Option : <span class="fw-normal">${escape($paymentStore?.payment_option)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Card Number : <span class="fw-normal">${escape($paymentStore?.card_number)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Card Holder Name : <span class="fw-normal">${escape($paymentStore?.card_holder_name)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Billing :`;
    }
  })} <div class="ps-3">${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `First Name : <span class="fw-normal">${escape($paymentStore?.firstname)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Last Name : <span class="fw-normal">${escape($paymentStore?.lastname)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Email : <span class="fw-normal">${escape($paymentStore?.email)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Phone : <span class="fw-normal">${escape($paymentStore?.phone)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Address : <span class="fw-normal">${escape($paymentStore?.address)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `State : <span class="fw-normal">${escape($paymentStore?.state)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `City : <span class="fw-normal">${escape($paymentStore?.city)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Zip code : <span class="fw-normal">${escape($paymentStore?.zipcode)}</span>`;
    }
  })}</div> ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Created at : <span class="fw-normal">${escape(formatTimestamp($paymentStore?.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Updated at : <span class="fw-normal">${escape(formatTimestamp($paymentStore?.updated_at))}</span>`;
    }
  })} <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-1vrqtk3"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const PaymentItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_paymentStore;
  let { payment } = $$props;
  let { paymentStore } = getContext("paymentStore");
  $$unsubscribe_paymentStore = subscribe(paymentStore, (value) => value);
  if ($$props.payment === void 0 && $$bindings.payment && payment !== void 0)
    $$bindings.payment(payment);
  $$unsubscribe_paymentStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(payment.id)}</td> <td><span class="badge border border-primary text-primary">${escape(payment.ref)}</span></td> <td>${payment?.subscription?.ref == null ? `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-pp1ynj">not found</span>` : `${escape(payment.subscription.ref)}`}</td> <td>${escape(payment.fort_id)}</td> <td><img${add_attribute("src", payment.father.user.profile.image.full_path, 0)} class="avatar-xxs rounded-circle me-1" alt=""> <a href="" class="text-reset">${escape(payment.father.user.profile.fullname)}</a></td> <td>${payment.status == 14 || payment.status == null ? `<span class="badge bg-success-subtle text-success" id="invoice-status" data-svelte-h="svelte-13v117n">Success</span>` : `<span class="badge bg-danger-subtle text-danger" id="invoice-status" data-svelte-h="svelte-s5cc4p">Failed</span>`}</td> <td>${escape(payment.amount)} SAR</td> <td>${escape(payment.paid_at)}</td> <td><div class="hstack gap-3">${JSON.parse(sessionStorage.getItem("permissions")).includes("payments.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewPaymentModal" data-svelte-h="svelte-1hpq45r"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``}</div></td></tr>`;
});
const PaymentsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { paymentsList } = $$props;
  setContext("paymentStore", { paymentStore: writable({}) });
  if ($$props.paymentsList === void 0 && $$bindings.paymentsList && paymentsList !== void 0)
    $$bindings.paymentsList(paymentsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-oxnmi9"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Payment Ref</th> <th scope="col">Subscription Ref</th> <th scope="col">Fort ID</th> <th scope="col">Parent</th> <th scope="col">Status</th> <th scope="col">Amount</th> <th scope="col">Paid At</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(paymentsList, (payment) => {
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
  return `<div class="row"${add_attribute("this", paymentsPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex" data-svelte-h="svelte-1s6z7ms"><h4 class="card-title mb-0 flex-grow-1">Payments Managment</h4> <div class="flex-shrink-0"></div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("payments.index") ? `<div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Payment" }, {}, {})} ${validate_component(PaymentsTable, "PaymentsTable").$$render($$result, { paymentsList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, paymentsPagination), {}, {})} </div>   </div>` : ``} </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-0b67e592.js.map
