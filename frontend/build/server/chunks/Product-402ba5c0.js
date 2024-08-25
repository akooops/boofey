import { c as create_ssr_component, h as add_attribute, e as escape } from './ssr-69d45533.js';

const Product = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { name } = $$props;
  let { category } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.category === void 0 && $$bindings.category && category !== void 0)
    $$bindings.category(category);
  return `<span><div class="d-flex align-items-center"><div class="flex-shrink-0 me-3"><div class="avatar-sm bg-light rounded p-1"><img${add_attribute("src", src, 0)} alt="" class="img-fluid d-block"></div></div> <div class="flex-grow-1"><h5 class="fs-14 mb-1"><a href="apps-ecommerce-product-details.html" class="text-body">${escape(name)}</a></h5> <p class="text-muted mb-0">Category : <span class="fw-medium">${escape(category == null ? "no category" : category)}</span></p></div></div></span>`;
});

export { Product as P };
//# sourceMappingURL=Product-402ba5c0.js.map
