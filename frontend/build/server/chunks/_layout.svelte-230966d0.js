import { c as create_ssr_component, e as escape } from './ssr-69d45533.js';
import { t as translation } from './translation-88f21498.js';

const css = {
  code: '.auth-one-bg.svelte-1be3phu{background-image:url("/assets/images/cafeteria.jpg")}',
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="auth-page-wrapper pt-5"> <div class="auth-one-bg-position auth-one-bg svelte-1be3phu" id="auth-particles" data-svelte-h="svelte-8gmrhh"><div class="bg-overlay" style="background:linear-gradient(to right,#e16f28,#e12828);"></div> <div class="shape"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120"><path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path></svg></div></div>  <div class="auth-page-content"><div class="container"><div class="row"><div class="col-lg-12"><div class="text-center mt-sm-5 mb-4 text-white-50"><div data-svelte-h="svelte-escw6f"><a href="/" class="d-inline-block auth-logo"><img src="/assets/images/logo-white.svg" alt="" height="30"></a></div> <p class="mt-3 fs-15 fw-medium">${escape(translation.bestSystem[localStorage.getItem("language")])}</p></div></div></div>  ${slots.default ? slots.default({}) : ``} </div> </div>   <footer class="footer"><div class="container"><div class="row"><div class="col-lg-12"><div class="text-center"><p class="mb-0 text-muted">©
                            ${escape(( new Date()).getFullYear())} <!-- HTML_TAG_START -->${translation.crafted[localStorage.getItem("language")]}<!-- HTML_TAG_END --></p></div></div></div></div></footer>  </div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-230966d0.js.map
