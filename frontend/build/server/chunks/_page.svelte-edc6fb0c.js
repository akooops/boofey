import { c as create_ssr_component, b as subscribe, g as getContext, j as set_store_value, h as add_attribute, e as escape, f as each, v as validate_component } from './ssr-69d45533.js';
import { n as navigating } from './stores-fc2c2f25.js';
import { t as translation } from './translation-88f21498.js';
import './index-64aa7a5e.js';
import { P as Progress } from './Progress-2ab42500.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let count;
  let date;
  let studentsList;
  let $selectedSchool, $$unsubscribe_selectedSchool;
  let $navigating, $$unsubscribe_navigating;
  let $currentFilter, $$unsubscribe_currentFilter;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { data } = $$props;
  let { selectedSchool } = getContext("selectedSchoolStore");
  $$unsubscribe_selectedSchool = subscribe(selectedSchool, (value) => $selectedSchool = value);
  let { currentFilter } = getContext("currentFilterStore");
  $$unsubscribe_currentFilter = subscribe(currentFilter, (value) => $currentFilter = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  count = data.todaySubs.data.count;
  date = data.todaySubs.data.date;
  studentsList = data.todaySubs.data.students;
  set_store_value(selectedSchool, $selectedSchool = data.todaySubs.data.school, $selectedSchool);
  $$unsubscribe_selectedSchool();
  $$unsubscribe_navigating();
  $$unsubscribe_currentFilter();
  return `${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<div class="fw-medium align-items-center d-flex gap-4 mb-4">${$selectedSchool ? `<div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", $selectedSchool?.logo?.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="">${escape($selectedSchool?.name)} - ${escape($currentFilter)}</div></div>` : `Filter : ${escape($currentFilter)}`} <div class="d-flex gap-3 align-items-center"><p class="col-auto mb-0">Count: ${escape(count)}</p> <p class="col-auto mb-0">Date:  ${escape(date)}</p></div></div> <div class="row"><div class=""><table class="table align-middle mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-fbvdus"><tr><th scope="col">ID</th> <th scope="col">Student</th> <th scope="col">School - package</th> <th scope="col">Class</th> <th scope="col">Plan User</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(studentsList, (student) => {
    return `<tr scope="row"><td>${escape(student.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", student.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(student.fullname)}</div> </div></td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", student.school?.logo?.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(student.school?.name)} - ${escape(student.active_subscription.package?.name)}</div> </div></td> <td>${escape(student.className)}</td> <td class="col-2">${validate_component(Progress, "Progress").$$render(
      $$result,
      {
        now: student.active_subscription.balance,
        max: student.active_subscription.days
      },
      {},
      {}
    )}</td> </tr>`;
  })}</tbody>` : ``}</table></div></div> <div class="hstack gap-2 justify-content-end d-print-none mt-4"><a href="javascript:window.print()" class="btn btn-info"><i class="ri-printer-line align-bottom me-1"></i> ${escape(translation.print[localStorage.getItem("language")])}</a></div>` : ``} ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-1dg75t9"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-edc6fb0c.js.map
