import { c as create_ssr_component, e as escape, h as add_attribute } from './ssr-69d45533.js';

const Progress = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let percentage;
  let { now } = $$props;
  let { max } = $$props;
  let bg = "bg-success";
  let color = "text-success";
  let { animation = true } = $$props;
  if ($$props.now === void 0 && $$bindings.now && now !== void 0)
    $$bindings.now(now);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.animation === void 0 && $$bindings.animation && animation !== void 0)
    $$bindings.animation(animation);
  percentage = now * 100 / max;
  {
    {
      if (percentage > 66.66) {
        bg = "bg-success";
        color = "text-success";
      } else if (percentage < 33.33) {
        bg = "bg-danger";
        color = "text-danger";
      } else {
        bg = "bg-warning";
        color = "text-warning";
      }
    }
  }
  return `<div class="d-flex gap-2 align-items-center"><div class="flex-grow-1 d-print-none"><div class="${["progress progress-sm progress-label", animation ? "animated-progress" : ""].join(" ").trim()}"><div class="${"progress-bar bg-gradient " + escape(bg, true)}" role="progressbar" style="${"width: " + escape(percentage, true) + "%"}"></div></div></div> <div class="flex-shrink-0"><span${add_attribute("class", color, 0)}>${escape(now)}</span>/${escape(max)}</div></div>`;
});

export { Progress as P };
//# sourceMappingURL=Progress-2ab42500.js.map
