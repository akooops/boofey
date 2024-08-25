import { c as create_ssr_component, i as createEventDispatcher, e as escape, h as add_attribute, d as add_classes, v as validate_component, f as each } from './ssr-69d45533.js';
import './index-64aa7a5e.js';
import { M as ModalSearchTable, a as ModalPagination } from './ModalPagination-ba97b167.js';
import { A as Accordion } from './Accordion-5106493f.js';

const SchoolsTableCollapse = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let schoolsList = [];
  let schoolsPagination;
  let { title = "" } = $$props;
  let { selected = {} } = $$props;
  let { type } = $$props;
  let { collapse } = $$props;
  let openCollapse;
  function resetSchool() {
    selected = {};
  }
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.collapse === void 0 && $$bindings.collapse && collapse !== void 0)
    $$bindings.collapse(collapse);
  if ($$props.resetSchool === void 0 && $$bindings.resetSchool && resetSchool !== void 0)
    $$bindings.resetSchool(resetSchool);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${selected?.id ? `<label for="productarName" class="form-label">${escape(title)}</label> <div class="table-responsive mt-0"><table class="table align-middle table-nowrap mb-0 border-top"><tbody class="list align-middle"><tr class="bg-secondary-subtle"><th scope="col">${escape(selected.id)}</th> <th scope="col"><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", selected.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(selected.name)}</div></div></th> <th class="text-center" scope="col"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-ad1dtz"><i class="ri-close-line"></i></a></th></tr></tbody></table></div>` : ``} <div${add_classes((selected?.id != null ? "d-none" : "").trim())}>${collapse ? `${validate_component(Accordion, "Accordion").$$render(
      $$result,
      { id: "school", title, openCollapse },
      {
        openCollapse: ($$value) => {
          openCollapse = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(ModalSearchTable, "ModalSearchTable").$$render($$result, { type: "School" }, {}, {})} <div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-1svnyji"><tr scope="row"><td scope="col">ID</td> <td scope="col">Name</td> <td scope="col">Action</td></tr></thead> <tbody class="list">${each(schoolsList, (school) => {
            return `<tr scope="row"${add_classes((school.id == selected?.id ? "bg-secondary-subtle" : "").trim())}><td>${escape(school.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(school.name)}</div> </div></td> <td><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-1o4icwl"><i class="ri-check-line"></i></a> </div></td> </tr>`;
          })}</tbody></table></div></div> ${validate_component(ModalPagination, "ModalPagination").$$render($$result, Object.assign({}, schoolsPagination), {}, {})}`;
        }
      }
    )}` : `${validate_component(ModalSearchTable, "ModalSearchTable").$$render($$result, { type: "School" }, {}, {})} <div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-1svnyji"><tr scope="row"><td scope="col">ID</td> <td scope="col">Name</td> <td scope="col">Action</td></tr></thead> <tbody class="list">${each(schoolsList, (school) => {
      return `<tr scope="row"${add_classes((school.id == selected?.id ? "bg-secondary-subtle" : "").trim())}><td>${escape(school.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(school.name)}</div> </div></td> <td><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-1o4icwl"><i class="ri-check-line"></i></a> </div></td> </tr>`;
    })}</tbody></table></div></div> ${validate_component(ModalPagination, "ModalPagination").$$render($$result, Object.assign({}, schoolsPagination), {}, {})}`}</div>`;
  } while (!$$settled);
  return $$rendered;
});

export { SchoolsTableCollapse as S };
//# sourceMappingURL=SchoolsTableCollapse-505cea76.js.map
