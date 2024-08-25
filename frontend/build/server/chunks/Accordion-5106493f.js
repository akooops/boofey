import { c as create_ssr_component, h as add_attribute, e as escape } from './ssr-69d45533.js';

const Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { id } = $$props;
  let openBtn;
  function openCollapse() {
    openBtn.click();
  }
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.openCollapse === void 0 && $$bindings.openCollapse && openCollapse !== void 0)
    $$bindings.openCollapse(openCollapse);
  return `<div class="accordion"><div class="accordion-item text-body"><h2 class="accordion-header" id="headingOne"${add_attribute("this", openBtn, 0)}><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="${"#" + escape(id, true)}" aria-expanded="true"${add_attribute("aria-controls", id, 0)}>${escape(title)}</button></h2> <div${add_attribute("id", id, 0)} class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#default-accordion-example"><div class="accordion-body text-body">${slots.default ? slots.default({}) : ``}</div></div></div></div>`;
});

export { Accordion as A };
//# sourceMappingURL=Accordion-5106493f.js.map
