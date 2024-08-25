import { c as create_ssr_component, i as createEventDispatcher, g as getContext, b as subscribe, e as escape, h as add_attribute } from './ssr-69d45533.js';
import './index-64aa7a5e.js';

const ExitQueueStudent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $queueStudentStore, $$unsubscribe_queueStudentStore;
  createEventDispatcher();
  let close;
  let { queueStudentStore } = getContext("queueStudentStore");
  $$unsubscribe_queueStudentStore = subscribe(queueStudentStore, (value) => $queueStudentStore = value);
  let { route = "queueStudents" } = $$props;
  if ($$props.route === void 0 && $$bindings.route && route !== void 0)
    $$bindings.route(route);
  $$unsubscribe_queueStudentStore();
  return `<div id="exitQueueStudent" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><lord-icon src="https://cdn.lordicon.com/gwvmctbb.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want <span class="text-primary">${escape($queueStudentStore?.student?.fullname)}</span> to exit the Queue ?</p> ${``} <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-s1avm2">Cancel</button> <button type="button" class="btn btn-warning waves-effect waves-light" data-svelte-h="svelte-m6sw5u">Exit Queue</button></div></div></div> </div> </div> </div>`;
});

export { ExitQueueStudent as E };
//# sourceMappingURL=ExitQueueStudent-d5a17802.js.map
