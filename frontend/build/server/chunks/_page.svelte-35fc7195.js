import { c as create_ssr_component, h as add_attribute } from './ssr-69d45533.js';
import './initApp-e077d2ff.js';
import 'cleave.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let form;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${`<div class="row justify-content-center"><div class="col-md-9 col-lg-7 col-xl-6"><div class="card mt-4"><div class="card-body p-4"><div class="text-center mt-2" data-svelte-h="svelte-meawt3"><h5 class="text-primary">Forgot password ?</h5>  <lord-icon src="https://cdn.lordicon.com/rhvddzym.json" trigger="loop" colors="primary:#0ab39c" class="avatar-xl"></lord-icon></div> <div class="alert border-0 alert-warning text-center mb-2 mx-2" role="alert" data-svelte-h="svelte-10kk9qr">Enter your Phone Number and a reset code will be sent to you !</div> <div class="p-2"><form${add_attribute("this", form, 0)}><div class="mb-4" data-svelte-h="svelte-vrctbl"><label class="form-label">Phone</label> <input type="tel" class="form-control" name="phone" id="cleave-phone" placeholder="Enter Phone Number"></div> ${``} <div class="text-center mt-4"><button class="btn btn-primary w-100 btn-load" type="submit" ${""}>${`Send Reset Code`}</button></div> </form></div></div> </div>  <div class="mt-4 text-center" data-svelte-h="svelte-1wn601b"><p class="mb-0">Wait, I remember my password... <a href="/signin" class="fw-semibold text-primary text-decoration-underline">Click Here</a></p></div></div></div>`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-35fc7195.js.map
