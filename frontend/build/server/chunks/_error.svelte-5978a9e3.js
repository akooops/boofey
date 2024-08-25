import { c as create_ssr_component, b as subscribe, e as escape, v as validate_component } from './ssr-69d45533.js';
import { p as page } from './stores-fc2c2f25.js';

const E404 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` <div class="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100" data-svelte-h="svelte-1sc6346"> <div class="auth-page-content overflow-hidden p-0"><div class="container"><div class="row justify-content-center"><div class="col-xl-7 col-lg-8"><div class="text-center"><img src="/assets/images/error400-cover.png" alt="error img" class="img-fluid"> <div class="mt-3"><h3 class="text-uppercase">Sorry, Page not Found 😭</h3> <p class="text-muted mb-4">The page you are looking for not available!</p> <a href="/" class="btn btn-info"><i class="mdi mdi-home me-1"></i>Back to home</a></div></div> </div></div> </div> </div> </div> `;
});
const E500 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` <div class="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100" data-svelte-h="svelte-1s2hlxc"> <div class="auth-page-content overflow-hidden p-0"><div class="container-fluid"><div class="row justify-content-center"><div class="col-xl-4 text-center"><div class="error-500 position-relative"><img src="/assets/images/error500.png" alt="" class="img-fluid error-500-img error-img"> <h1 class="title text-muted">500</h1></div> <div><h4>Internal Server Error!</h4> <p class="text-muted w-75 mx-auto">Server Error 500. We&#39;re not exactly sure what happened, but our servers say something is wrong.</p> <a href="/" class="btn btn-info"><i class="mdi mdi-home me-1"></i>Back to home</a></div> </div></div> </div> </div> </div>`;
});
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-3xt61b_START -->${$$result.title = `<title>${escape($page.status == 404 ? "Page not Found 404" : "Internal error 500")} - boofey</title>`, ""}<!-- HEAD_svelte-3xt61b_END -->`, ""} ${$page.status == 404 ? `${validate_component(E404, "E404").$$render($$result, {}, {}, {})}` : `${$page.status == 500 ? `${validate_component(E500, "E500").$$render($$result, {}, {}, {})}` : ``}`}`;
});

export { Error as default };
//# sourceMappingURL=_error.svelte-5978a9e3.js.map
