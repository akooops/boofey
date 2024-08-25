import { c as create_ssr_component, h as add_attribute, e as escape } from './ssr-69d45533.js';
import { E as returnUrl } from './paths-53224d1e.js';
import './index-64aa7a5e.js';
import { t as translation } from './translation-88f21498.js';
import './utils-5d589345.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let payFort;
  let fatherId;
  let { data } = $$props;
  let expiry_date;
  let expiryFormatted;
  let cardForm;
  let cardNumber = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  payFort = data.paymentMethodInitResponse.data;
  fatherId = data.fatherId;
  return `<form${add_attribute("action", payFort.payfort_url, 0)} method="POST" id="payment-form" name="form1" autocomplete="off"${add_attribute("this", cardForm, 0)}><div class="collapse show" id="paymentmethodCollapse" style=""> <input type="hidden" name="service_command" value="TOKENIZATION"> <input type="hidden" name="language" value="en"> <input type="hidden" name="merchant_identifier"${add_attribute("value", payFort.merchant_identifier, 0)}> <input type="hidden" name="access_code"${add_attribute("value", payFort.access_code, 0)}> <input type="hidden" name="signature"${add_attribute("value", payFort.signature, 0)}> <input type="hidden" name="return_url"${add_attribute("value", returnUrl(fatherId), 0)}> <input type="hidden" name="merchant_reference" id="merchant_reference"${add_attribute("value", payFort.merchant_reference, 0)}> <input type="hidden" name="remember_me" value="YES"> <input type="hidden" name="expiry_date"${add_attribute("value", `${expiryFormatted?.[1]}${expiryFormatted?.[0]}`, 0)}> <input type="hidden" name="card_number"${add_attribute("value", cardNumber.replace(/ /g, ""), 0)}> <input type="hidden" name="remember_me" value="YES"> ${``}  <div class="row gy-3 mt-2"><div class="card"><div class="card-header"><h5 class="card-title mb-0">${escape(translation.cardDetails[localStorage.getItem("language")])}</h5></div> <div class="card-body"><div class="row align-items-start d-flex gx-1"><div class="col-xl-4" data-svelte-h="svelte-1t8bpy4"><div class="card-wrapper mb-3"></div></div> <div class="form-container active col-xl-8 col-md-12"><div class="mb-3"><label for="card-number-input" class="form-label">${escape(translation.cardNumber[localStorage.getItem("language")])}</label> <input class="form-control" name=""${add_attribute("placeholder", translation.cardNumber[localStorage.getItem("language")], 0)} type="tel" id="card-number-input"${add_attribute("value", cardNumber, 0)}></div> <div class="mb-3"><label for="card-name-input" class="form-label">${escape(translation.holderName[localStorage.getItem("language")])}</label> <input class="form-control" name="card_holder_name"${add_attribute("placeholder", translation.holderName[localStorage.getItem("language")], 0)} type="text" id="card-name-input"></div> <div class="row"><div class="col-sm-6"><div class="mb-0"><label for="card-expiry-input" class="form-label">${escape(translation.expiryDate[localStorage.getItem("language")])}</label> <input class="form-control" placeholder="MM/YY" type="tel" id="card-expiry-input"${add_attribute("value", expiry_date, 0)}></div></div> <div class="col-sm-6"><div class="mb-0"><label for="card-cvc-input" class="form-label">${escape(translation.cvc[localStorage.getItem("language")])}</label> <input class="form-control" name="card_security_code"${add_attribute("placeholder", translation.cvc[localStorage.getItem("language")], 0)} type="number" id="card-cvc-input"></div></div></div></div> <div class="d-flex align-items-start gap-3 mt-4"><button type="submit" class="btn btn-primary right ms-auto">${escape(translation.addCard[localStorage.getItem("language")])}</button></div></div></div> </div> </div></div></form>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-03eb9168.js.map
