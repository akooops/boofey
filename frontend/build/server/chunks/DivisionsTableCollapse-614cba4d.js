import { c as create_ssr_component, i as createEventDispatcher, e as escape, d as add_classes, v as validate_component, f as each } from './ssr-69d45533.js';
import { w as PathGetDivisions } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import { M as ModalSearchTable, a as ModalPagination } from './ModalPagination-ba97b167.js';
import { A as Accordion } from './Accordion-5106493f.js';

const DivisionsTableCollapse = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { schoolId } = $$props;
  let divisionsList = [];
  let divisionsPagination;
  let page = 1;
  let searchQuery = "";
  let { selected = {} } = $$props;
  let { type } = $$props;
  let { collapse } = $$props;
  let { title } = $$props;
  let openCollapse;
  async function fetchDivisions() {
    let res = await fetch(PathGetDivisions(schoolId, { page, search: searchQuery }), {
      headers: {
        Authorization: `${localStorage.getItem("SID")}`
      }
    });
    redirector(res);
    let divisionsResponse = await res.json();
    divisionsList = divisionsResponse.data.divisions;
    divisionsPagination = divisionsResponse.pagination;
  }
  function resetDivision() {
    selected = {};
  }
  if ($$props.schoolId === void 0 && $$bindings.schoolId && schoolId !== void 0)
    $$bindings.schoolId(schoolId);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.collapse === void 0 && $$bindings.collapse && collapse !== void 0)
    $$bindings.collapse(collapse);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.resetDivision === void 0 && $$bindings.resetDivision && resetDivision !== void 0)
    $$bindings.resetDivision(resetDivision);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (schoolId) {
        fetchDivisions();
      }
    }
    $$rendered = `${selected?.id && schoolId ? `<label for="productarName" class="form-label">${escape(title)}</label> <div class="table-responsive mt-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><tbody class="list align-middle"><tr class="bg-secondary-subtle"><th scope="col">${escape(selected.id)}</th> <th>${escape(selected.name)} </th><th>${escape(selected.name_ar)}</th> <th scope="col"><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-19ldu68"><i class="ri-close-line"></i></a></div></th></tr></tbody></table></div></div>` : ``} <div${add_classes((selected?.id != null && (schoolId != null && schoolId != "") ? "d-none" : "").trim())}>${collapse ? `${validate_component(Accordion, "Accordion").$$render(
      $$result,
      { id: "division", title, openCollapse },
      {
        openCollapse: ($$value) => {
          openCollapse = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${schoolId ? `${validate_component(ModalSearchTable, "ModalSearchTable").$$render($$result, { type: "Division" }, {}, {})} <div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-1kz3tqz"><tr scope="row"><td scope="col">ID</td> <td scope="col">Name</td> <td scope="col">Arabic Name</td> <td scope="col">Action</td></tr></thead> <tbody class="list">${each(divisionsList, (division) => {
            return `<tr scope="row"${add_classes((division.id == selected?.id ? "bg-secondary-subtle" : "").trim())}><td>${escape(division.id)}</td> <td>${escape(division.name)} </td><td>${escape(division.name_ar)}</td> <td><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-1gn18af"><i class="ri-check-line"></i></a> </div></td> </tr>`;
          })}</tbody></table></div></div> ${validate_component(ModalPagination, "ModalPagination").$$render($$result, Object.assign({}, divisionsPagination), {}, {})}` : ` <div class="alert alert-warning alert-border-left alert-dismissible fade show" role="alert" data-svelte-h="svelte-1opf86q"><i class="ri-alert-line me-3 align-middle"></i> <strong>Warning</strong> - Please select a school first 
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`}`;
        }
      }
    )}` : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});

export { DivisionsTableCollapse as D };
//# sourceMappingURL=DivisionsTableCollapse-614cba4d.js.map
