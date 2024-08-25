import { c as create_ssr_component, e as escape, h as add_attribute } from './ssr-69d45533.js';
import './initApp-e077d2ff.js';
import 'cleave.js';
import { t as translation } from './translation-88f21498.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let form;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${`<div class="row justify-content-center"><div class="col-md-9 col-lg-7 col-xl-6"><div class="card mt-4"><div class="card-body p-4"><div class="text-center mt-2"><h5 class="text-primary">${escape(translation.welcomeBack[localStorage.getItem("language")])}</h5> <p class="text-muted">${escape(translation.signInToContinue[localStorage.getItem("language")])} Boofey.</p> <div class="mb-4" data-svelte-h="svelte-180fvxm"><div class="avatar-lg mx-auto"><div class="avatar-title bg-light text-primary display-5 rounded-circle"><i class="ri-bank-card-2-line"></i></div></div></div></div> <div class="p-2"><form${add_attribute("this", form, 0)}><div class="mb-4"><label class="form-label">${escape(translation.idNumber[localStorage.getItem("language")])}</label> <input type="text" class="form-control" name="identity_number" id="cleave-phone"${add_attribute("placeholder", translation.enterIdNumber[localStorage.getItem("language")], 0)}></div> ${``} <div class="mb-4"><p class="mb-0 fs-13 text-muted fst-italic"><!-- HTML_TAG_START -->${translation.acceptTermsPrivacy[localStorage.getItem("language")]}<!-- HTML_TAG_END --></p></div> <div class="text-center mt-4"><button class="btn btn-primary w-100 btn-load" type="submit" ${""}>${`${escape(translation.submit[localStorage.getItem("language")])}`}</button></div> </form></div></div> </div> </div></div>`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-72365333.js.map
