import { c as create_ssr_component, e as escape, h as add_attribute } from './ssr-69d45533.js';
import { t as translation } from './translation-88f21498.js';

const ReceiptCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let date;
  let time;
  let { invoice } = $$props;
  function formatDateShortMonth() {
    const optionsDate = {
      year: "numeric",
      month: "short",
      day: "2-digit"
    };
    const optionsTime = { hour: "2-digit", minute: "2-digit" };
    const date2 = new Date(invoice.created_at);
    const formattedDate = date2.toLocaleDateString("en-US", optionsDate);
    const formattedTime = date2.toLocaleTimeString("en-US", optionsTime);
    return [formattedDate, formattedTime];
  }
  if ($$props.invoice === void 0 && $$bindings.invoice && invoice !== void 0)
    $$bindings.invoice(invoice);
  [date, time] = formatDateShortMonth();
  return `<div class="row justify-content-center" dir="ltr"><div class="col-xxl-9"><div class="card" id="demo"><div class="row"><div class="col-lg-12" data-svelte-h="svelte-mf8sc4"><div class="card-header border-bottom-dashed p-4"><div class="d-flex"><div class="flex-grow-1"><img src="/assets/images/logo.png" class="card-logo card-logo-dark" alt="logo dark" height="50"> <img src="/assets/images/logo.png" class="card-logo card-logo-light" alt="logo light" height="50"> <div class="mt-sm-5 mt-4"><h6 class="text-muted text-uppercase fw-semibold">Address</h6> <p class="text-muted mb-1" id="address-details">Riyadh,  Saudi Arabia</p> <p class="text-muted mb-0" id="zip-code"><span>Zip-code:</span> 12211</p></div></div> <div class="flex-shrink-0 mt-sm-0 mt-3"><h6><span class="text-muted fw-normal">Legal Registration No:</span><span id="legal-register-no">000000</span></h6> <h6><span class="text-muted fw-normal">Email:</span><span id="email">contact@boofey.app</span></h6> <h6><span class="text-muted fw-normal">Website:</span> <a href="https://boofey.app/" class="link-primary" target="_blank" id="website">www.boofey.app</a></h6> <h6 class="mb-0"><span class="text-muted fw-normal">Contact No: </span><span id="contact-no">+(966) 56 382 3920</span></h6></div></div></div>  </div> <div class="col-lg-12"><div class="card-body p-4"><div class="row g-3"><div class="col-lg-3 col-6"><p class="text-muted mb-2 text-uppercase fw-semibold" data-svelte-h="svelte-fyf3jb">Invoice No</p> <h5 class="fs-15 mb-0">#${escape(invoice.ref)}</h5></div>  <div class="col-lg-3 col-6"><p class="text-muted mb-2 text-uppercase fw-semibold" data-svelte-h="svelte-1rewmsl">Date</p> <h5 class="fs-15 mb-0"><span id="invoice-date">${escape(date)}</span> <small class="text-muted" id="invoice-time">${escape(time)}</small></h5></div>  <div class="col-lg-3 col-6"><p class="text-muted mb-2 text-uppercase fw-semibold" data-svelte-h="svelte-1pyz5uu">Invoice Status</p> ${invoice?.subscription?.payment == null ? `<span class="badge bg-info-subtle text-info fs-11" id="invoice-status" data-svelte-h="svelte-1viwxjj">System</span>` : `${invoice.subscription.payment.status == 14 || invoice.subscription.payment.status == null ? `<span class="badge bg-success-subtle text-success fs-11" id="invoice-status" data-svelte-h="svelte-1agrl8v">Success</span>` : `<span class="badge bg-danger-subtle text-danger fs-11" id="invoice-status" data-svelte-h="svelte-1jca85">Failed</span>`}`}</div>  <div class="col-lg-3 col-6"><p class="text-muted mb-2 text-uppercase fw-semibold" data-svelte-h="svelte-8v49of">Total Amount</p> <h5 class="fs-15 mb-0">${escape(invoice.total)} SAR</h5></div> </div> </div>  </div> <div class="col-lg-12"><div class="card-body p-4 border-top border-top-dashed"><div class="row g-3">${invoice?.subscription?.payment?.billing ? `<div class="col-6"><h6 class="text-muted text-uppercase fw-semibold mb-3" data-svelte-h="svelte-o498ip">Billing Address</h6> <p class="fw-medium mb-2" id="billing-name">${escape(invoice?.billing?.firstname)} ${escape(invoice?.billing?.lastname)}</p> <p class="text-muted mb-1" id="billing-address-line-1">${escape(invoice?.billing?.email)}</p> <p class="text-muted mb-1">${escape(invoice?.billing?.phone)}</p> <p class="text-muted mb-1">${escape(invoice?.billing?.state)},${escape(invoice?.billing?.city)},${escape(invoice?.billing?.zipcode)}</p> <p class="text-muted mb-0">${escape(invoice?.billing?.address)}</p></div>` : ``}  <div class="col-6"><h6 class="text-muted text-uppercase fw-semibold mb-3" data-svelte-h="svelte-1d61dv9">Student</h6> <p class="fw-medium mb-2" id="billing-name">${escape(invoice?.subscription?.student?.fullname)}</p></div> </div> </div>  </div> <div class="col-lg-12"><div class="card-body p-4"><div class="table-responsive"><table class="table table-borderless table-nowrap align-middle mb-0"><thead><tr class="table-active"><th scope="col" data-svelte-h="svelte-z0rb3w">Name</th> <th scope="col" data-svelte-h="svelte-16s5zj3">School</th> <th scope="col" data-svelte-h="svelte-1a10dfm">Code</th> <th scope="col" class="${"text-" + escape(
    localStorage.getItem("language") == "ar" ? "start" : "end",
    true
  )}">Price</th></tr></thead> <tbody id="products-list"><tr><td>${escape(invoice.subscription.package.name)}</td> <div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", invoice.subscription.package.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(invoice.subscription.package.school.name)}</div></div> <td><span class="badge border border-primary text-primary">${escape(invoice.subscription.package.code)}</span></td> <td class="${"text-" + escape(
    localStorage.getItem("language") == "ar" ? "start" : "end",
    true
  )}">${escape(invoice.subscription.package.currentPrice)} SAR</td></tr></tbody></table></div> <div class="border-top border-top-dashed mt-2"><table class="${"table table-borderless table-nowrap align-middle mb-0 " + escape(
    localStorage.getItem("language") == "ar" ? "me-auto" : "ms-auto",
    true
  )}" style="width:250px"><tbody><tr><td data-svelte-h="svelte-12lbjyq">Sub Total</td> <td class="${"text-" + escape(
    localStorage.getItem("language") == "ar" ? "start" : "end",
    true
  )}">${escape(invoice.subtotal)} SAR</td></tr> <tr><td>Estimated Tax (${escape(invoice.tax)}%)</td> <td class="${"text-" + escape(
    localStorage.getItem("language") == "ar" ? "start" : "end",
    true
  )}">+ ${escape(invoice.taxCalculated)} SAR</td></tr> <tr><td>Discount <small class="text-muted">(${escape(invoice.discount)}%)</small></td> <td class="${"text-" + escape(
    localStorage.getItem("language") == "ar" ? "start" : "end",
    true
  )}">- ${escape(invoice.discountCalculated)} SAR</td></tr> <tr class="border-top border-top-dashed fs-15"><th scope="row" data-svelte-h="svelte-1g20arj">Total Amount</th> <th class="${"text-" + escape(
    localStorage.getItem("language") == "ar" ? "start" : "end",
    true
  )}">${escape(invoice.total)} SAR</th></tr></tbody></table> </div> ${invoice?.subscription?.payment ? `<div class="mt-3"><h6 class="text-muted text-uppercase fw-semibold mb-3" data-svelte-h="svelte-11z8aat">Invoice Details:</h6> <p class="text-muted mb-1">Invoice Method: <span class="fw-medium" id="invoice-method">${escape(invoice.subscription.payment.payment_option)}</span></p> <p class="text-muted mb-1">Card Holder: <span class="fw-medium" id="card-holder-name">${escape(invoice.subscription.payment.card_holder_name)}</span></p> <p class="text-muted mb-1">Card Number: <span class="fw-medium" id="card-number">${escape(invoice.subscription.payment.card_number)}</span></p> <p class="text-muted">Total Amount: ${escape(invoice.total)} SAR</p></div>` : ``}  <div class="hstack gap-2 justify-content-end d-print-none mt-4"><a href="javascript:window.print()" class="btn btn-info"><i class="ri-printer-line align-bottom me-1"></i> ${escape(translation.print[localStorage.getItem("language")])}</a></div></div>  </div> </div></div> </div> </div>`;
});

export { ReceiptCard as R };
//# sourceMappingURL=ReceiptCard-9f9d069e.js.map
