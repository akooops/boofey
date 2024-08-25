import { c as create_ssr_component, h as add_attribute } from './ssr-69d45533.js';

const Password = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { placeholder } = $$props;
  let passwordInput;
  let { value } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `<div class="position-relative auth-pass-inputgroup mb-3"><input type="password" class="form-control pe-5 password-input"${add_attribute("placeholder", placeholder, 0)}${add_attribute("name", name, 0)} id="password-input"${add_attribute("this", passwordInput, 0)}${add_attribute("value", value, 0)}> <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" data-svelte-h="svelte-jluyj6"><i class="ri-eye-fill align-middle"></i></button></div>`;
});

export { Password as P };
//# sourceMappingURL=Password-fcf754f4.js.map
