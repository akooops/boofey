import { c as create_ssr_component, h as add_attribute, v as validate_component } from './ssr-69d45533.js';
import './initApp-e077d2ff.js';
import { P as Password } from './Password-fcf754f4.js';
import 'cleave.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let form;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="row justify-content-center"><div class="col-md-9 col-lg-7 col-xl-6"><div class="card mt-4"><div class="card-body p-4"><div class="text-center mt-2" data-svelte-h="svelte-b69thu"><h5 class="text-primary">Welcome Back !</h5> <p class="text-muted">Sign up to continue to Boofey.</p></div> <div class="p-2 mt-4"><form${add_attribute("this", form, 0)}><div class="row g-3"><div class="col-lg-12"><label for="username" class="form-label" data-svelte-h="svelte-170ol5y">Username</label> <input type="text" name="username" class="form-control" id="username" placeholder="Enter Username"> ${``}</div> <div class="col-xxl-6"><div><label for="firstName" class="form-label" data-svelte-h="svelte-1hs0n20">First Name</label> <input type="text" name="firstname" class="form-control" id="firstName" placeholder="Enter First Name"> ${``}</div></div>  <div class="col-xxl-6"><div><label for="lastName" class="form-label" data-svelte-h="svelte-1tzb4fa">Last Name</label> <input type="text" name="lastname" class="form-control" id="lastName" placeholder="Enter Last Name"> ${``}</div></div> <div class="col-xxl-6"><label for="email" class="form-label" data-svelte-h="svelte-7zanfm">Email</label> <input type="email" name="email" class="form-control" id="email" placeholder="Enter Email"> ${``}</div> <div class="col-xxl-6"><label for="phone" class="form-label" data-svelte-h="svelte-6oyajm">Phone</label> <input type="tel" name="phone" class="form-control" id="phone" placeholder="Enter Phone Number"> ${``}</div> <div class="col-lg-12"><label for="phone" class="form-label" data-svelte-h="svelte-1k3c40b">Identity Number</label> <input type="text" name="identity_number" class="form-control" id="phoneedit" placeholder="Enter Identity no."> ${``}</div> <div class="col-xxl-6"><label for="password" class="form-label" data-svelte-h="svelte-tyrfrg">Password</label> <div class="position-relative auth-pass-inputgroup mb-3">${validate_component(Password, "Password").$$render(
    $$result,
    {
      name: "password",
      placeholder: "Enter Password"
    },
    {},
    {}
  )}</div> ${``}</div> <div class="col-xxl-6"><label for="passwordconfirm" class="form-label" data-svelte-h="svelte-a297se">Confirm Password</label> <div class="position-relative auth-pass-inputgroup mb-3">${validate_component(Password, "Password").$$render(
    $$result,
    {
      name: "password_confirmation",
      placeholder: "Confirm Password"
    },
    {},
    {}
  )}</div> ${``}</div> ${``} <div class="mt-4"><button class="btn btn-primary w-100 btn-load" type="submit" ${""}>${`Sign Up`}</button></div></div></form></div></div> </div>  <div class="mt-4 text-center" data-svelte-h="svelte-1i8yp5o"><p class="mb-0">Already have an account ? <a href="/signin" class="fw-semibold text-primary text-decoration-underline">Sign In</a></p></div></div></div> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-0464e71e.js.map
