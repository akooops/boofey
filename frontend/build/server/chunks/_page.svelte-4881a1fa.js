import { c as create_ssr_component, b as subscribe, v as validate_component, i as createEventDispatcher, e as escape, h as add_attribute, f as each, d as add_classes } from './ssr-69d45533.js';
import './index-64aa7a5e.js';
import { t as translation } from './translation-88f21498.js';
import { s as states } from './env-841d6f91.js';
import { p as page } from './stores-fc2c2f25.js';
import { p as public_env } from './shared-server-58a5f352.js';
import { S as PathPay, L as PathCheckPaymentRef, E as returnUrl, F as PathInitPaymentMethod } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import 'cleave.js';
import { g as goto } from './navigation-766853ab.js';
import './utils-5d589345.js';

function toast(text, type) {
  let styleType = {
    success: ".bg-success"
  };
  Toastify({
    text,
    duration: 3e3,
    close: true,
    gravity: "bottom",
    // `top` or `bottom`
    position: "right",
    // `left`, `center` or `right`
    style: {
      background: styleType[type]
    }
    // onClick: function(){} // Callback after click
  }).showToast();
}
const OrderSummary = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { payment } = $$props;
  let { packageObj } = $$props;
  let { couponId } = $$props;
  let form;
  if ($$props.payment === void 0 && $$bindings.payment && payment !== void 0)
    $$bindings.payment(payment);
  if ($$props.packageObj === void 0 && $$bindings.packageObj && packageObj !== void 0)
    $$bindings.packageObj(packageObj);
  if ($$props.couponId === void 0 && $$bindings.couponId && couponId !== void 0)
    $$bindings.couponId(couponId);
  return `<div class="col-xl-4"><div class="sticky-side-div"><div class="card"><div class="card-header border-bottom-dashed"><h5 class="card-title mb-0">${escape(translation.orderSummary[localStorage.getItem("language")])}</h5></div> <div class="card-header border-bottom-dashed"><div class="d-flex align-items-center"><div class="flex-grow-1">${localStorage.getItem("language") == "en" ? `<h5 class="mb-1 fw-semibold">${escape(packageObj.name)}</h5> <p class="${["text-muted mb-0", packageObj.description == null ? "d-none" : ""].join(" ").trim()}">${escape(packageObj.description)}</p>` : `<h5 class="mb-1 fw-semibold">${escape(packageObj.name_ar)}</h5> <p class="${["text-muted mb-0", packageObj.description_ar == null ? "d-none" : ""].join(" ").trim()}">${escape(packageObj.description_ar)}</p>`}</div> <div class=""><h5>${escape(packageObj.currentPrice)}<sup><small>${escape(translation.sar[localStorage.getItem("language")])}</small></sup> <span class="fs-13 text-muted">${escape(packageObj.yearly ? "" : `/ ${packageObj.days} ${translation.days[localStorage.getItem("language")]}`)}</span></h5></div></div></div> <form${add_attribute("this", form, 0)}><div class="card-header bg-light-subtle border-bottom-dashed"><label for="name" class="form-label px-1">${escape(translation.couponCode[localStorage.getItem("language")])}</label> <div class="hstack gap-3 px-3 mx-n3 mb-1"><input class="form-control me-auto" type="text"${add_attribute("placeholder", translation.enterCouponCode[localStorage.getItem("language")], 0)} name="code" aria-label="Add Promo Code here..."> <input type="submit" class="btn btn-primary w-xs"${add_attribute("value", translation.apply[localStorage.getItem("language")], 0)}></div> ${``}</div></form> <div class="card-body pt-2"><div class="table-responsive"><table class="table table-borderless mb-0"><tbody><tr><td>${escape(translation.subTotal[localStorage.getItem("language")])} :</td> <td class="text-end" id="cart-subtotal">${escape(payment?.subtotal)} ${escape(translation.sar[localStorage.getItem("language")])}</td></tr> <tr><td>${escape(translation.discount[localStorage.getItem("language")])} <span class="text-muted">(${escape(payment?.discount)}%)</span> :</td> <td class="text-end" id="cart-discount">${escape(payment?.discountCalculated)} ${escape(translation.sar[localStorage.getItem("language")])}</td></tr> <tr><td>${escape(translation.estimatedTax[localStorage.getItem("language")])} (${escape(payment?.tax)}%) :</td> <td class="text-end" id="cart-tax">${escape(payment?.taxCalculated)} ${escape(translation.sar[localStorage.getItem("language")])}</td></tr> <tr class="table-active"><th>${escape(translation.total[localStorage.getItem("language")])} (${escape(translation.sar[localStorage.getItem("language")])}) :</th> <td class="text-end"><span class="fw-semibold" id="cart-total">${escape(payment?.total)} ${escape(translation.sar[localStorage.getItem("language")])}</span></td></tr></tbody></table></div></div></div></div> </div>`;
});
const SavedAdress = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { billing } = $$props;
  let { selectedaddressId } = $$props;
  if ($$props.billing === void 0 && $$bindings.billing && billing !== void 0)
    $$bindings.billing(billing);
  if ($$props.selectedaddressId === void 0 && $$bindings.selectedaddressId && selectedaddressId !== void 0)
    $$bindings.selectedaddressId(selectedaddressId);
  return `<div class="col-lg-4 col-sm-6"><div class="card-radio"><input type="checkbox" class="form-check-input" ${selectedaddressId == billing.id ? "checked" : ""}> <label class="form-check-label" for="shippingAddress01"><span class="fs-14 mb-2 d-block">${escape(billing.firstname)} ${escape(billing.lastname)}</span> <span class="text-muted fw-normal text-wrap mb-1 d-block">${escape(billing.email)}</span> <span class="text-muted fw-normal text-wrap mb-1 d-block">${escape(billing.phone)}</span> <span class="text-muted fw-normal text-wrap mb-1 d-block">${escape(billing.state)},${escape(billing.city)},${escape(billing.zipcode)}</span> <span class="text-muted fw-normal text-wrap mb-1 d-block">${escape(billing.address)}</span></label></div> <div class="d-flex flex-wrap p-2 py-1 bg-light rounded-bottom border mt-n1"><div><a href="#" class="d-block text-body p-1 px-2" data-bs-toggle="modal" data-bs-target="#editAddressModal"><i class="ri-pencil-fill text-muted align-bottom me-1"></i> ${escape(translation.edit[localStorage.getItem("language")])}</a></div> <div><a href="#" class="d-block text-body p-1 px-2" data-bs-toggle="modal" data-bs-target="#deleteAddressModal"><i class="ri-delete-bin-fill text-muted align-bottom me-1"></i> ${escape(translation.delete[localStorage.getItem("language")])}</a></div></div></div>`;
});
const DeleteAddressModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let close;
  let { billingObj } = $$props;
  if ($$props.billingObj === void 0 && $$bindings.billingObj && billingObj !== void 0)
    $$bindings.billingObj(billingObj);
  return `<div id="deleteAddressModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4">${escape(translation.areYouSure[localStorage.getItem("language")])} ${escape(translation["?"][localStorage.getItem("language")])}</h4> <p class="text-muted fs-15 mb-4">${escape(translation.areYouSureYouWantToDelAddress[localStorage.getItem("language")])} ${escape(translation["?"][localStorage.getItem("language")])}</p> <div class="card-radio mb-4"><label class="form-check-label text-start"><span class="fs-14 mb-2 d-block">${escape(billingObj?.firstname)} ${escape(billingObj?.lastname)}</span> <span class="text-muted fw-normal text-wrap mb-1 d-block" data-svelte-h="svelte-1cp8oxi">4739 Bubby Drive Austin, TX 78729</span> <span class="text-muted fw-normal text-wrap mb-1 d-block">${escape(billingObj?.email)}</span> <span class="text-muted fw-normal text-wrap mb-1 d-block">${escape(billingObj?.phone)}</span> <span class="text-muted fw-normal text-wrap mb-1 d-block">${escape(billingObj?.country)},${escape(billingObj?.state)},${escape(billingObj?.zipcode)}</span> <span class="text-muted fw-normal text-wrap mb-1 d-block">${escape(billingObj?.address)}</span></label></div> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)}>${escape(translation.close[localStorage.getItem("language")])}</button> <button type="button" class="btn btn-danger waves-effect waves-light">${escape(translation.delete[localStorage.getItem("language")])}</button></div></form></div></div> </div> </div> </div>`;
});
const EditAddressModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { billingObj = {} } = $$props;
  let close;
  let form;
  if ($$props.billingObj === void 0 && $$bindings.billingObj && billingObj !== void 0)
    $$bindings.billingObj(billingObj);
  return `<div class="modal fade" id="editAddressModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalgridLabel">${escape(translation.editBillingAddress[localStorage.getItem("language")])}</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div class="col-sm-6"><div class="mb-3"><label for="billinginfo-firstName" class="form-label">${escape(translation.firstName[localStorage.getItem("language")])}</label> <input type="text" class="form-control" name="firstname" id="billinginfo-firstName"${add_attribute("placeholder", translation.enterFirstName[localStorage.getItem("language")], 0)}${add_attribute("value", billingObj.firstname, 0)}> ${``}</div></div> <div class="col-sm-6"><div class="mb-3"><label for="billinginfo-lastName" class="form-label">${escape(translation.lastName[localStorage.getItem("language")])}</label> <input type="text" class="form-control" name="lastname" id="billinginfo-lastName"${add_attribute("placeholder", translation.enterLastName[localStorage.getItem("language")], 0)}${add_attribute("value", billingObj.lastname, 0)}> ${``}</div></div></div> <div class="row"><div class="col-sm-6"><div class="mb-3"><label for="billinginfo-email" class="form-label">${escape(translation.email[localStorage.getItem("language")])}</label> <input type="email" class="form-control" name="email" id="billinginfo-email"${add_attribute("placeholder", translation.enterEmail[localStorage.getItem("language")], 0)}${add_attribute("value", billingObj.email, 0)}> ${``}</div></div> <div class="col-sm-6"><div class="mb-3"><label for="billinginfo-phone" class="form-label">${escape(translation.phone[localStorage.getItem("language")])}</label> <input type="tel" class="form-control" name="phone" id="billinginfo-phone"${add_attribute("placeholder", translation.enterPhone[localStorage.getItem("language")], 0)}${add_attribute("value", billingObj.phone, 0)}> ${``}</div></div></div> <div class="mb-3"><label for="billinginfo-address" class="form-label">${escape(translation.address[localStorage.getItem("language")])}</label> <textarea class="form-control" id="billinginfo-address" name="address"${add_attribute("placeholder", translation.enterAddress[localStorage.getItem("language")], 0)} rows="3">${escape(billingObj.address || "")}</textarea> ${``}</div> <div class="row"><div class="col-md-4"><div class="mb-3"><label for="zip" class="form-label">${escape(translation.state[localStorage.getItem("language")])}</label> <select class="form-select" name="state" id="class" aria-label="Default select example"><option disabled selected value>-- ${escape(translation.selectState[localStorage.getItem("language")])} -- </option>${each(states, (state) => {
    return `<option${add_attribute("value", state.name_en, 0)}>${escape(state.name_en)}</option>`;
  })}</select> ${``}</div></div> <div class="col-md-4"><div class="mb-3"><label for="zip" class="form-label">${escape(translation.city[localStorage.getItem("language")])}</label> <input type="text" class="form-control" id="zip" name="city"${add_attribute("placeholder", translation.enterCity[localStorage.getItem("language")], 0)}${add_attribute("value", billingObj.city, 0)}> ${``}</div></div> <div class="col-md-4"><div class="mb-3"><label for="zip" class="form-label">${escape(translation.zipCode[localStorage.getItem("language")])}</label> <input type="text" class="form-control" id="zip" name="zipcode"${add_attribute("placeholder", translation.enterZipCode[localStorage.getItem("language")], 0)}${add_attribute("value", billingObj.zipcode, 0)}> ${``}</div></div></div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)}>${escape(translation.close[localStorage.getItem("language")])}</button> <input type="submit" class="btn btn-primary waves-effect waves-light"${add_attribute("value", translation.save[localStorage.getItem("language")], 0)}></div></form> </div></div> </div></div>`;
});
const BillingInfo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  createEventDispatcher();
  let { billings } = $$props;
  let newAdress = false;
  let addressId;
  let billingObj;
  let form;
  let errors = {};
  if ($$props.billings === void 0 && $$bindings.billings && billings !== void 0)
    $$bindings.billings(billings);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div><h5 class="mb-1">${escape(translation.billingInfo[localStorage.getItem("language")])}</h5> <p class="text-muted mb-4">${escape(translation.pleaseFillInfo[localStorage.getItem("language")])}</p></div> <div class=""> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", newAdress, 1)}> <label class="form-check-label" for="SwitchCheck1">${escape(translation.userNewAddress[localStorage.getItem("language")])}</label> </div></div> <form${add_attribute("this", form, 0)}><div class="${["mt-4", "d-none"].join(" ").trim()}"><div class="row"><div class="col-sm-6"><div class="mb-3"><label for="billinginfo-firstName" class="form-label">${escape(translation.firstName[localStorage.getItem("language")])}</label> <input type="text" class="form-control" name="firstname" id="billinginfo-firstName"${add_attribute("placeholder", translation.enterFirstName[localStorage.getItem("language")], 0)} value=""> ${errors?.firstname ? `<strong class="text-danger ms-1 my-2">${escape(errors.firstname[0])}</strong>` : ``}</div></div> <div class="col-sm-6"><div class="mb-3"><label for="billinginfo-lastName" class="form-label">${escape(translation.lastName[localStorage.getItem("language")])}</label> <input type="text" class="form-control" name="lastname" id="billinginfo-lastName"${add_attribute("placeholder", translation.enterLastName[localStorage.getItem("language")], 0)} value=""> ${errors?.lastname ? `<strong class="text-danger ms-1 my-2">${escape(errors.lastname[0])}</strong>` : ``}</div></div></div> <div class="row"><div class="col-sm-6"><div class="mb-3"><label for="billinginfo-email" class="form-label">${escape(translation.email[localStorage.getItem("language")])}</label> <input type="email" class="form-control" name="email" id="billinginfo-email"${add_attribute("placeholder", translation.enterEmail[localStorage.getItem("language")], 0)}> ${errors?.email ? `<strong class="text-danger ms-1 my-2">${escape(errors.email[0])}</strong>` : ``}</div></div> <div class="col-sm-6"><div class="mb-3"><label for="billinginfo-phone" class="form-label">${escape(translation.phone[localStorage.getItem("language")])}</label> <input type="tel" class="form-control" name="phone" id="billinginfo-phone"${add_attribute("placeholder", translation.enterPhone[localStorage.getItem("language")], 0)}> ${errors?.phone ? `<strong class="text-danger ms-1 my-2">${escape(errors.phone[0])}</strong>` : ``}</div></div></div> <div class="mb-3"><label for="billinginfo-address" class="form-label">${escape(translation.address[localStorage.getItem("language")])}</label> <textarea class="form-control" id="billinginfo-address" name="address"${add_attribute("placeholder", translation.enterAddress[localStorage.getItem("language")], 0)} rows="3"></textarea> ${errors?.address ? `<strong class="text-danger ms-1 my-2">${escape(errors.address[0])}</strong>` : ``}</div> <div class="row"><div class="col-md-4"><div class="mb-3"><label for="zip" class="form-label">${escape(translation.state[localStorage.getItem("language")])}</label> <select class="form-select" name="state" id="class" aria-label="Default select example"><option disabled selected value>-- ${escape(translation.selectState[localStorage.getItem("language")])} -- </option>${each(states, (state) => {
      return `<option${add_attribute("value", state.name_en, 0)}>${escape(state.name_en)}</option>`;
    })}</select> ${errors?.state ? `<strong class="text-danger ms-1 my-2">${escape(errors.state[0])}</strong>` : ``}</div></div> <div class="col-md-4"><div class="mb-3"><label for="zip" class="form-label">${escape(translation.city[localStorage.getItem("language")])}</label> <input type="text" class="form-control" id="zip" name="city"${add_attribute("placeholder", translation.enterCity[localStorage.getItem("language")], 0)}> ${errors?.city ? `<strong class="text-danger ms-1 my-2">${escape(errors.city[0])}</strong>` : ``}</div></div> <div class="col-md-4"><div class="mb-3"><label for="zip" class="form-label">${escape(translation.zipCode[localStorage.getItem("language")])}</label> <input type="text" class="form-control" id="zip" name="zipcode"${add_attribute("placeholder", translation.enterZipCode[localStorage.getItem("language")], 0)}> ${errors?.zipcode ? `<strong class="text-danger ms-1 my-2">${escape(errors.zipcode[0])}</strong>` : ``}</div></div></div></div> <div class="${["mt-4", ""].join(" ").trim()}"><div class="d-flex align-items-center mb-2"><div class="flex-grow-1"><h5 class="fs-14 mb-0">${escape(translation.savedAddresses[localStorage.getItem("language")])}</h5></div></div> <div class="row gy-3">${each(billings, (billing, _) => {
      return `${validate_component(SavedAdress, "SavedAdress").$$render(
        $$result,
        { billing, selectedaddressId: addressId },
        {
          selectedaddressId: ($$value) => {
            addressId = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}</div> ${validate_component(DeleteAddressModal, "DeleteAddressModal").$$render($$result, { billingObj }, {}, {})} ${validate_component(EditAddressModal, "EditAddressModal").$$render($$result, { billingObj }, {}, {})}</div> <div class="d-flex align-items-start gap-3 mt-3"><button type="button" class="btn btn-primary btn-label right ms-auto nexttab" ${addressId == null ? "disabled" : ""}><i class="ri-bank-card-line label-icon align-middle fs-16 ms-2"></i>${escape(translation.proceedtoPayment[localStorage.getItem("language")])}</button></div></form>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
const AddCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let { billingId } = $$props;
  let studentId;
  let packageId;
  async function load() {
    let formData = new FormData();
    studentId = $page.params.studentId;
    packageId = $page.url.searchParams.get("package");
    formData.set("return_url", `${returnUrl(data.userResponse.data.father.id)}?student=${studentId}&package=${packageId}&billing=${billingId}`);
    let res = await fetch(PathInitPaymentMethod(), {
      headers: {
        Authorization: `${localStorage.getItem("SID")}`
      },
      method: "POST",
      body: formData
    });
    redirector(res);
    payFort = (await res.json()).data;
  }
  let payFort;
  let expiry_date;
  let expiryFormatted;
  let cardForm;
  let cardNumber = "";
  let submitBtn;
  function addCard() {
    submitBtn.click();
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.billingId === void 0 && $$bindings.billingId && billingId !== void 0)
    $$bindings.billingId(billingId);
  if ($$props.addCard === void 0 && $$bindings.addCard && addCard !== void 0)
    $$bindings.addCard(addCard);
  {
    {
      if (billingId) {
        load();
      }
    }
  }
  $$unsubscribe_page();
  return `${payFort ? `<form${add_attribute("action", payFort.payfort_url, 0)} method="POST" id="payment-form" name="form1" autocomplete="off"${add_attribute("this", cardForm, 0)}><div class="collapse show" id="paymentmethodCollapse" style=""> <input type="hidden" name="service_command" value="TOKENIZATION"> <input type="hidden" name="language" value="en"> <input type="hidden" name="merchant_identifier"${add_attribute("value", payFort.merchant_identifier, 0)}> <input type="hidden" name="access_code"${add_attribute("value", payFort.access_code, 0)}> <input type="hidden" name="signature"${add_attribute("value", payFort.signature, 0)}> <input type="hidden" name="return_url"${add_attribute("value", `${returnUrl(data.userResponse.data.father.id)}?student=${studentId}&package=${packageId}&billing=${billingId}`, 0)}> <input type="hidden" name="merchant_reference" id="merchant_reference"${add_attribute("value", payFort.merchant_reference, 0)}>  <input type="hidden" name="expiry_date"${add_attribute("value", `${expiryFormatted?.[1]}${expiryFormatted?.[0]}`, 0)}> <input type="hidden" name="card_number"${add_attribute("value", cardNumber.replace(/ /g, ""), 0)}> <input type="hidden" name="remember_me" value="YES"> ${``}  <div class="row gy-3 mt-2"><div class="card"><div class="card-header"><h5 class="card-title mb-0">${escape(translation.cardDetails[localStorage.getItem("language")])}</h5></div> <div class="card-body"><div class="row align-items-start d-flex gx-1"><div class="col-xl-12" data-svelte-h="svelte-14lgf1l"><div class="card-wrapper mb-3"></div></div> <div class="form-container active col-xl-12 "><div class="mb-3"><label for="card-number-input" class="form-label">${escape(translation.cardNumber[localStorage.getItem("language")])}</label> <input class="form-control" name=""${add_attribute("placeholder", translation.cardNumber[localStorage.getItem("language")], 0)} type="tel" id="card-number-input"${add_attribute("value", cardNumber, 0)}></div> <div class="mb-3"><label for="card-name-input" class="form-label">${escape(translation.holderName[localStorage.getItem("language")])}</label> <input class="form-control" name="card_holder_name"${add_attribute("placeholder", translation.holderName[localStorage.getItem("language")], 0)} type="text" id="card-name-input"></div> <div class="row"><div class="col-sm-6"><div class="mb-0"><label for="card-expiry-input" class="form-label">${escape(translation.expiryDate[localStorage.getItem("language")])}</label> <input class="form-control" placeholder="MM/YY" type="tel" id="card-expiry-input"${add_attribute("value", expiry_date, 0)}></div></div> <div class="col-sm-6"><div class="mb-0"><label for="card-cvc-input" class="form-label">${escape(translation.cvc[localStorage.getItem("language")])}</label> <input class="form-control" name="card_security_code"${add_attribute("placeholder", translation.cvc[localStorage.getItem("language")], 0)} type="number" id="card-cvc-input"></div></div></div></div> <div class="d-flex align-items-start gap-3 mt-4 d-none"><button type="submit" class="btn btn-primary right ms-auto"${add_attribute("this", submitBtn, 0)}>${escape(translation.addCard[localStorage.getItem("language")])}</button></div></div></div> </div> </div></div></form>` : ``}`;
});
const PaymentSelection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { data } = $$props;
  let { paymentMethods } = $$props;
  let { billingId } = $$props;
  let { IsFree } = $$props;
  let add = true;
  let addCard;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.paymentMethods === void 0 && $$bindings.paymentMethods && paymentMethods !== void 0)
    $$bindings.paymentMethods(paymentMethods);
  if ($$props.billingId === void 0 && $$bindings.billingId && billingId !== void 0)
    $$bindings.billingId(billingId);
  if ($$props.IsFree === void 0 && $$bindings.IsFree && IsFree !== void 0)
    $$bindings.IsFree(IsFree);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div><h5 class="mb-1">${escape(translation.paymentSelection[localStorage.getItem("language")])}</h5> <p class="text-muted mb-4">${escape(translation.pleaseSelectPayment[localStorage.getItem("language")])}</p></div> <div class=""> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", add, 1)}> <label class="form-check-label" for="SwitchCheck1">${escape(translation.newPaymentMethod[localStorage.getItem("language")])}</label> </div></div> ${`${validate_component(AddCard, "AddCard").$$render(
      $$result,
      { data, billingId, addCard },
      {
        addCard: ($$value) => {
          addCard = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} <div class="d-flex align-items-start gap-3 mt-4"><button type="button" class="btn btn-light btn-label previestab"><i class="${"ri-arrow-" + escape(
      localStorage.getItem("language") == "ar" ? "right" : "left",
      true
    ) + "-line label-icon align-middle fs-16 me-2"}"></i>${escape(translation.backToBilling[localStorage.getItem("language")])}</button>  <button type="button" class="btn btn-primary btn-label right ms-auto nexttab" ${public_env.PUBLIC_PAYMENT_REDIRECTION != "true" && add == false ? "disabled" : ""}><i class="ri-shopping-basket-line label-icon align-middle fs-16 ms-2"></i>${escape(translation.completeOrder[localStorage.getItem("language")])}</button></div>`;
  } while (!$$settled);
  return $$rendered;
});
const BillingCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { billings } = $$props;
  let { couponId } = $$props;
  let { paymentMethods } = $$props;
  let { customerEmail } = $$props;
  let { customerIp } = $$props;
  let { paymentId } = $$props;
  let { paymentRef } = $$props;
  let pending = true;
  let error;
  let IsFree = false;
  let states2 = ["active", "", ""];
  let addressId;
  let paymentMethodId;
  let interval;
  let { data } = $$props;
  async function free(appliedCoupon) {
    IsFree = true;
  }
  async function sendPayment() {
    let formData = new FormData();
    formData.set("subscription_id", paymentId);
    formData.set("customer_email", customerEmail);
    formData.set("customer_ip", customerIp);
    formData.set("payment_method_id", paymentMethodId);
    formData.set("billing_id", addressId);
    formData.set("language", localStorage.getItem("language"));
    const url = new URL(window.location.href);
    url.searchParams.set("billing", addressId);
    url.searchParams.set("payment", paymentMethodId);
    console.log($page);
    formData.set("return_url", `${$page.url.origin}/students/${$page.params.studentId}/subscriptions?ref=${paymentRef}`);
    if (couponId) {
      formData.set("coupon_id", couponId);
    }
    let res = await fetch(PathPay(data.student.id), {
      headers: {
        Authorization: `${localStorage.getItem("SID")}`
      },
      method: "POST",
      body: formData
    });
    redirector(res);
    res = await res.json();
    if (res.status == "success") {
      pending = false;
      let text = `Payment has been fullfilled`;
      toast(text, "success");
    } else if (res.status == "error") {
      error = res.error;
    } else {
      window.location.href = res.data["3ds_url"];
      interval = setInterval(
        async () => {
          if (popup.closed) {
            let res2 = await fetch(PathCheckPaymentRef(paymentRef), {
              headers: {
                Authorization: `${localStorage.getItem("SID")}`
              }
            });
            redirector(res2);
            res2 = await res2.json();
            if (res2.status == "success") {
              if (res2?.data?.payment?.status == 14) {
                pending = false;
                let text = `Payment has been fullfilled`;
                toast(text, "success");
              } else {
                error = res2?.data?.payment?.response_message;
              }
            } else if (res2.status == "error") {
              error = res2.error.message;
            }
            clearInterval(interval);
          }
        },
        500
      );
    }
  }
  if ($$props.billings === void 0 && $$bindings.billings && billings !== void 0)
    $$bindings.billings(billings);
  if ($$props.couponId === void 0 && $$bindings.couponId && couponId !== void 0)
    $$bindings.couponId(couponId);
  if ($$props.paymentMethods === void 0 && $$bindings.paymentMethods && paymentMethods !== void 0)
    $$bindings.paymentMethods(paymentMethods);
  if ($$props.customerEmail === void 0 && $$bindings.customerEmail && customerEmail !== void 0)
    $$bindings.customerEmail(customerEmail);
  if ($$props.customerIp === void 0 && $$bindings.customerIp && customerIp !== void 0)
    $$bindings.customerIp(customerIp);
  if ($$props.paymentId === void 0 && $$bindings.paymentId && paymentId !== void 0)
    $$bindings.paymentId(paymentId);
  if ($$props.paymentRef === void 0 && $$bindings.paymentRef && paymentRef !== void 0)
    $$bindings.paymentRef(paymentRef);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.free === void 0 && $$bindings.free && free !== void 0)
    $$bindings.free(free);
  if ($$props.sendPayment === void 0 && $$bindings.sendPayment && sendPayment !== void 0)
    $$bindings.sendPayment(sendPayment);
  $$unsubscribe_page();
  return `<div class="card"><div class="card-body checkout-tab"><form action="#"><div class="step-arrow-nav mt-n3 mx-n3 mb-3"><ul class="nav nav-pills nav-justified custom-nav"><li class="nav-item" role="presentation"><button class="${"nav-link fs-15 p-3 " + escape(states2[0], true)}" id="pills-bill-info-tab" type="button" aria-controls="pills-bill-info" aria-selected="true"><i class="ri-bill-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i> ${escape(translation.billingInfo[localStorage.getItem("language")])}</button></li> <li class="nav-item" role="presentation"><button class="${"nav-link fs-15 p-3 " + escape(states2[1], true)}" id="pills-payment-tab" type="button" aria-controls="pills-payment" aria-selected="false"><i class="ri-bank-card-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i> ${escape(translation.paymentInfo[localStorage.getItem("language")])}</button></li> <li class="nav-item" role="presentation"><button class="${"nav-link fs-15 p-3 " + escape(states2[2], true)}" id="pills-finish-tab" type="button" aria-controls="pills-finish" aria-selected="false"><i class="ri-checkbox-circle-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i> ${escape(translation.finish[localStorage.getItem("language")])}</button></li></ul></div> <div class="tab-content"><div class="${"tab-pane fade " + escape("show active", true)}" id="pills-bill-info" role="tabpanel" aria-labelledby="pills-bill-info-tab">${validate_component(BillingInfo, "BillingInfo").$$render($$result, { billings }, {}, {})}</div> <div class="${"tab-pane fade " + escape("", true)}" id="pills-payment" role="tabpanel" aria-labelledby="pills-payment-tab">${validate_component(PaymentSelection, "PaymentSelection").$$render(
    $$result,
    {
      billingId: addressId,
      IsFree,
      data,
      paymentMethods
    },
    {},
    {}
  )}</div>  <div class="${"tab-pane fade " + escape("", true)}" id="pills-finish" role="tabpanel" aria-labelledby="pills-finish-tab"><div class="text-center py-5">${pending ? `${error ? `<div class="mb-4"><lord-icon src="https://cdn.lordicon.com/tdrtiskw.json" trigger="loop" colors="primary:#f06548,secondary:#f7b84b" style="width:120px;height:120px"></lord-icon> <h5 class="text-danger">${escape(translation.error[localStorage.getItem("language")])}</h5> <p class="text-muted">${escape(error)}</p> <p class="text-muted">${escape(translation.goBackTo[localStorage.getItem("language")])} <a href="/students" class="text-decoration-underline">${escape(translation.students[localStorage.getItem("language")])}</a></p></div>` : `<div class="mb-4"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon> <h5>${escape(translation.proccessingPayment[localStorage.getItem("language")])}...</h5></div>`}` : `<div class="mb-4" data-svelte-h="svelte-ppoque"><lord-icon src="https://cdn.lordicon.com/lupuorrc.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div> <h5>${escape(translation.orderCompleted[localStorage.getItem("language")])} !</h5> <p class="text-muted">${escape(translation.goBackTo[localStorage.getItem("language")])} <a href="/students" class="text-decoration-underline">${escape(translation.students[localStorage.getItem("language")])}</a></p>`}</div></div> </div> </form></div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let billings;
  let subscription;
  let paymentMethods;
  let customerIp;
  let customerEmail;
  let packageObj;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let free;
  let couponId;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    billings = data.billings;
    subscription = data.subscription;
    paymentMethods = data.paymentMethods;
    customerIp = data.customerIp;
    customerEmail = data.customerEmail;
    packageObj = data.package;
    {
      {
        if (data?.errors?.face_id[0]) {
          goto(`/students?noFace=true&id=${$page.params.studentId}`);
        }
      }
    }
    $$rendered = `${data.status == "error" ? ` <div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : `<div class="row mb-3"><div class="col-xl-8">${validate_component(BillingCard, "BillingCard").$$render(
      $$result,
      {
        data,
        billings,
        couponId,
        paymentMethods,
        customerEmail,
        customerIp,
        paymentId: subscription.id,
        paymentRef: subscription.ref,
        free
      },
      {
        free: ($$value) => {
          free = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  ${validate_component(OrderSummary, "OrderSummary").$$render(
      $$result,
      {
        payment: subscription,
        packageObj,
        couponId
      },
      {
        couponId: ($$value) => {
          couponId = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>`}`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-4881a1fa.js.map
