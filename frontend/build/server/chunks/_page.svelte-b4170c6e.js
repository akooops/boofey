import { c as create_ssr_component, v as validate_component } from './ssr-69d45533.js';
import { R as ReceiptCard } from './ReceiptCard-9f9d069e.js';
import './translation-88f21498.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(ReceiptCard, "ReceiptCard").$$render($$result, { invoice: data.invoice }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-b4170c6e.js.map
