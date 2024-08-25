import { c as create_ssr_component, h as add_attribute, v as validate_component } from './ssr-69d45533.js';
import './initApp-e077d2ff.js';
import { P as Password } from './Password-fcf754f4.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let form;
  let keep_me_signed_in = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="row justify-content-center"><div class="col-md-8 col-lg-6 col-xl-5"><div class="card mt-4"><div class="card-body p-4"><div class="text-center mt-2" data-svelte-h="svelte-4rnjjw"><h5 class="text-primary">Welcome Back !</h5> <p class="text-muted">Sign in to continue to Boofey.</p></div> <div class="p-2 mt-4"><form${add_attribute("this", form, 0)}><div class="mb-3"><label for="username" class="form-label" data-svelte-h="svelte-1f7p7ai">Username</label> <input type="text" class="form-control" id="username" name="login" placeholder="Enter username, email or phone"> ${``}</div> <div class="mb-3"><div class="float-end" data-svelte-h="svelte-r9ee5n"><a href="/reset-password" class="text-muted">Forgot password ?</a></div> <label class="form-label" for="password-input" data-svelte-h="svelte-1a98ful">Password</label> <div class="position-relative auth-pass-inputgroup mb-3">${validate_component(Password, "Password").$$render(
    $$result,
    {
      name: "password",
      placeholder: "Enter Password"
    },
    {},
    {}
  )}</div> ${``}</div> <div class="form-check"><input class="form-check-input" type="checkbox" id="auth-remember-check"${add_attribute("checked", keep_me_signed_in, 1)}> <label class="form-check-label" for="auth-remember-check" data-svelte-h="svelte-3oqf06">Keep me signed in</label></div> ${``}  <div class="mt-4"><button class="btn btn-primary w-100 btn-load" type="submit" ${""}>${`Sign In`}</button></div></form></div></div> </div>  <div class="mt-4 text-center" data-svelte-h="svelte-mw7r13"></div></div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-249f6410.js.map
