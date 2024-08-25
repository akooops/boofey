import { c as create_ssr_component, g as getContext, b as subscribe, d as add_classes, e as escape, h as add_attribute } from './ssr-69d45533.js';
import './index-64aa7a5e.js';
import { t as translation } from './translation-88f21498.js';

const DeleteStudentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $studentStore, $$unsubscribe_studentStore;
  let close;
  let { studentStore } = getContext("studentStore");
  $$unsubscribe_studentStore = subscribe(studentStore, (value) => $studentStore = value);
  $$unsubscribe_studentStore();
  return `<div id="deleteStudentModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4">${escape(translation.areYouSure[localStorage.getItem("language")])} ${escape(translation["?"][localStorage.getItem("language")])}</h4> <p class="text-muted fs-15 mb-4">${escape(translation.areYouSureYouWantToDel[localStorage.getItem("language")])} <span class="text-primary">${escape(`${$studentStore.fullname} #${$studentStore.id}`)}</span> ${escape(translation["?"][localStorage.getItem("language")])}</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)}>${escape(translation.close[localStorage.getItem("language")])}</button> <button type="button" class="btn btn-danger waves-effect waves-light">${escape(translation.delete[localStorage.getItem("language")])}</button></div></form></div></div> </div> </div> </div>`;
});

export { DeleteStudentModal as D };
//# sourceMappingURL=DeleteStudentModal-0c666034.js.map
