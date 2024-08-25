import { c as create_ssr_component, b as subscribe, s as setContext, h as add_attribute, e as escape, v as validate_component, f as each, g as getContext, i as createEventDispatcher, d as add_classes } from './ssr-69d45533.js';
import { w as writable } from './index2-7897530e.js';
import { p as page } from './stores-fc2c2f25.js';
import { t as translation } from './translation-88f21498.js';
import { D as DeleteStudentModal } from './DeleteStudentModal-0c666034.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import './index-64aa7a5e.js';
import 'qr-code-styling';
import 'print-js';
import { M as ModalSearchTable, a as ModalPagination } from './ModalPagination-ba97b167.js';
import { A as Accordion } from './Accordion-5106493f.js';
import { R as PathGetStudentQr } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './navigation-766853ab.js';

const ViewStudentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $studentStore, $$unsubscribe_studentStore;
  let { studentStore } = getContext("studentStore");
  $$unsubscribe_studentStore = subscribe(studentStore, (value) => $studentStore = value);
  $$unsubscribe_studentStore();
  return `<div class="modal fade" id="viewStudentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalgridLabel">${escape(translation.viewStudent[localStorage.getItem("language")])}</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4"><img class="rounded avatar-xl mb-3 object-fit-cover" alt="Student image" width="200"${add_attribute("src", $studentStore?.image?.full_path, 0)}> ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.theName[localStorage.getItem("language")])} : <span class="fw-normal">${escape($studentStore?.fullname)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.status[localStorage.getItem("language")])} :         ${$studentStore?.subscribed ? `<span class="badge bg-success-subtle text-success">${escape(translation.subscribed[localStorage.getItem("language")])}</span>` : `<span class="badge bg-danger-subtle text-danger">${escape(translation.notSubscribed[localStorage.getItem("language")])}</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.school[localStorage.getItem("language")])} :      
                            <img${add_attribute("src", $studentStore?.school?.logo?.full_path, 0)} alt="" class="avatar-xs rounded-circle"> ${escape($studentStore?.school?.name)}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.class[localStorage.getItem("language")])} : <span class="fw-normal">${escape($studentStore.class)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.className[localStorage.getItem("language")])} : <span class="fw-normal">${escape(localStorage.getItem("language") == "ar" ? $studentStore.classNameAr : $studentStore.className)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.createdAt[localStorage.getItem("language")])} : <span class="fw-normal">${escape(formatTimestamp($studentStore.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(translation.updatedAt[localStorage.getItem("language")])} : <span class="fw-normal">${escape(formatTimestamp($studentStore.updated_at))}</span>`;
    }
  })} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">${escape(translation.close[localStorage.getItem("language")])}</button></div></div></div></div></div>`;
});
const SchoolsTableCollapse = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let schoolsList = [];
  let schoolsPagination;
  let { selected = {} } = $$props;
  let { collapse } = $$props;
  let { title } = $$props;
  let openCollapse;
  function resetSchool() {
    selected = {};
  }
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.collapse === void 0 && $$bindings.collapse && collapse !== void 0)
    $$bindings.collapse(collapse);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.resetSchool === void 0 && $$bindings.resetSchool && resetSchool !== void 0)
    $$bindings.resetSchool(resetSchool);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${selected?.id ? `<label for="productarName" class="form-label">${escape(title)}</label> <div class="table-responsive mt-0"><table class="table align-middle table-nowrap mb-0 border-top"><tbody class="list align-middle"><tr class="bg-secondary-subtle"><th scope="col">${escape(selected.id)}</th> <th scope="col"><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", selected.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(selected.name)}</div></div></th> <th scope="col" class="text-center"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-ad1dtz"><i class="ri-close-line"></i></a></th></tr></tbody></table></div>` : ``} <div${add_classes((selected?.id != null ? "d-none" : "").trim())}>${collapse ? `${validate_component(Accordion, "Accordion").$$render(
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
          return `${validate_component(ModalSearchTable, "ModalSearchTable").$$render(
            $$result,
            {
              type: translation.school[localStorage.getItem("language")]
            },
            {},
            {}
          )} <div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light"><tr scope="row"><td scope="col">${escape(translation.id[localStorage.getItem("language")])}</td> <td scope="col">${escape(translation.name[localStorage.getItem("language")])}</td> <td scope="col">${escape(translation.actions[localStorage.getItem("language")])}</td></tr></thead> <tbody class="list">${each(schoolsList, (school) => {
            return `<tr scope="row"${add_classes((school.id == selected?.id ? "bg-secondary-subtle" : "").trim())}><td>${escape(school.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(school.name)}</div> </div></td> <td><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-1o4icwl"><i class="ri-check-line"></i></a> </div></td> </tr>`;
          })}</tbody></table></div></div> ${validate_component(ModalPagination, "ModalPagination").$$render($$result, Object.assign({}, schoolsPagination), {}, {})}`;
        }
      }
    )}` : `${validate_component(ModalSearchTable, "ModalSearchTable").$$render(
      $$result,
      {
        type: translation.school[localStorage.getItem("language")]
      },
      {},
      {}
    )} <div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light"><tr scope="row"><td scope="col">${escape(translation.id[localStorage.getItem("language")])}</td> <td scope="col">${escape(translation.name[localStorage.getItem("language")])}</td> <td scope="col">${escape(translation.actions[localStorage.getItem("language")])}</td></tr></thead> <tbody class="list">${each(schoolsList, (school) => {
      return `<tr scope="row"${add_classes((school.id == selected?.id ? "bg-secondary-subtle" : "").trim())}><td>${escape(school.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(school.name)}</div> </div></td> <td><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-1o4icwl"><i class="ri-check-line"></i></a> </div></td> </tr>`;
    })}</tbody></table></div></div> ${validate_component(ModalPagination, "ModalPagination").$$render($$result, Object.assign({}, schoolsPagination), {}, {})}`}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const css$1 = {
  code: "video.svelte-ae9qa3{width:100%;display:block}canvas.svelte-ae9qa3{display:none}.square.svelte-ae9qa3{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);outline:4px solid #695eef}.camera-btn-container.svelte-ae9qa3{position:relative;margin-top:0;margin-bottom:75px}.camera-btn-group.svelte-ae9qa3{position:absolute;width:100%;top:100%;margin-top:0;background-color:black;display:flex;flex-direction:row;align-items:center;justify-content:center}.none.svelte-ae9qa3{display:none}",
  map: null
};
const EditStudentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $studentStore, $$unsubscribe_studentStore;
  let close;
  let form;
  let { studentStore } = getContext("studentStore");
  $$unsubscribe_studentStore = subscribe(studentStore, (value) => $studentStore = value);
  let useCamera = true;
  studentStore.subscribe(() => {
    $studentStore.father_id;
    $studentStore.school_id;
  });
  $$result.css.add(css$1);
  $$unsubscribe_studentStore();
  return `<div class="modal fade" id="editStudentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalgridLabel">${escape(translation.editStudent[localStorage.getItem("language")])}</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body"><div class="modal-body">${``} <div class="${["row g-3", ""].join(" ").trim()}"> <form${add_attribute("this", form, 0)}><div class="row g-3">    <div class="alert alert-warning alert-border-left alert-dismissible fade show" role="alert"><i class="ri-alert-line me-3 align-middle"></i> <strong>${escape(translation.warning[localStorage.getItem("language")])}</strong> - ${escape(translation.uploadFace[localStorage.getItem("language")])} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div> <div class="${["row ps-3 g-3 svelte-ae9qa3", ""].join(" ").trim()}"><div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", useCamera, 1)}> <label class="form-check-label" for="SwitchCheck1">${escape(translation.useCamera[localStorage.getItem("language")])}</label></div></div> ${`<div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert"><!-- HTML_TAG_START -->${translation.picGuideCamera[localStorage.getItem("language")]}<!-- HTML_TAG_END --></div> <div class="${["svelte-ae9qa3", ""].join(" ").trim()}">${`${`<button type="button" class="btn btn-primary waves-effect waves-light">${escape(translation.launchCamera[localStorage.getItem("language")])}</button>`}`}</div>`} ${``} ${``} <div class="${["svelte-ae9qa3", ""].join(" ").trim()}" data-svelte-h="svelte-hcgumb"></div> ${``} ${``} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)}>${escape(translation.close[localStorage.getItem("language")])}</button> ${!$studentStore.subscribed ? `` : ``} <input type="submit" class="btn btn-primary waves-effect waves-light"${add_attribute("value", translation.save[localStorage.getItem("language")], 0)}></div></div></form> </div></div></div></div></div> </div>`;
});
const css = {
  code: "video.svelte-vtz7js{width:100%;display:block}canvas.svelte-vtz7js{display:none}.square.svelte-vtz7js{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);outline:4px solid #695eef}.camera-btn-container.svelte-vtz7js{position:relative;margin-top:0;margin-bottom:75px}.camera-btn-group.svelte-vtz7js{position:absolute;width:100%;top:100%;margin-top:0;background-color:black;display:flex;flex-direction:row;align-items:center;justify-content:center}",
  map: null
};
const AddStudentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let close;
  let form;
  let selectClass;
  let resetSchool;
  let useCamera = true;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="modal fade" id="addStudentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalgridLabel">${escape(translation.addStudent[localStorage.getItem("language")])}</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <div class="${["row g-3", ""].join(" ").trim()}">${validate_component(SchoolsTableCollapse, "SchoolsTableCollapse").$$render(
      $$result,
      {
        collapse: true,
        title: translation.studentSchool[localStorage.getItem("language")],
        resetSchool
      },
      {
        resetSchool: ($$value) => {
          resetSchool = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${``} <form${add_attribute("this", form, 0)}><div class="row g-3"><div class="col-xxl-6"><div><label for="firstName" class="form-label">${escape(translation.firstName[localStorage.getItem("language")])}</label> <input type="text" name="firstname" class="form-control" id="firstName"${add_attribute("placeholder", translation.enterFirstName[localStorage.getItem("language")], 0)}> ${``}</div></div>  <div class="col-xxl-6"><div><label for="lastName" class="form-label">${escape(translation.lastName[localStorage.getItem("language")])}</label> <input type="text" name="lastname" class="form-control" id="lastName"${add_attribute("placeholder", translation.enterLastName[localStorage.getItem("language")], 0)}> ${``}</div></div> <div class="col-lg-12"><label for="class" class="form-label">${escape(translation.class[localStorage.getItem("language")])}</label> <select class="form-select" name="class" id="class" aria-label="Default select example"${add_attribute("this", selectClass, 0)}><option disabled selected value>-- ${escape(translation.selectClass[localStorage.getItem("language")])} -- </option><option${add_attribute("value", 0, 0)}>${escape(translation.primarySchool[localStorage.getItem("language")])} - ${escape(translation.grade[localStorage.getItem("language")])} 1</option><option${add_attribute("value", 1, 0)}>${escape(translation.primarySchool[localStorage.getItem("language")])} - ${escape(translation.grade[localStorage.getItem("language")])} 2</option><option${add_attribute("value", 2, 0)}>${escape(translation.primarySchool[localStorage.getItem("language")])} - ${escape(translation.grade[localStorage.getItem("language")])} 3</option><option${add_attribute("value", 3, 0)}>${escape(translation.primarySchool[localStorage.getItem("language")])} - ${escape(translation.grade[localStorage.getItem("language")])} 4</option><option${add_attribute("value", 4, 0)}>${escape(translation.primarySchool[localStorage.getItem("language")])} - ${escape(translation.grade[localStorage.getItem("language")])} 5</option><option${add_attribute("value", 5, 0)}>${escape(translation.primarySchool[localStorage.getItem("language")])} - ${escape(translation.grade[localStorage.getItem("language")])} 6</option><option${add_attribute("value", 6, 0)}>${escape(translation.middleSchool[localStorage.getItem("language")])} - ${escape(translation.grade[localStorage.getItem("language")])} 1</option><option${add_attribute("value", 7, 0)}>${escape(translation.middleSchool[localStorage.getItem("language")])} - ${escape(translation.grade[localStorage.getItem("language")])} 2</option><option${add_attribute("value", 8, 0)}>${escape(translation.middleSchool[localStorage.getItem("language")])} - ${escape(translation.grade[localStorage.getItem("language")])} 3</option><option${add_attribute("value", 9, 0)}>${escape(translation.secondarySchool[localStorage.getItem("language")])} - ${escape(translation.grade[localStorage.getItem("language")])} 1</option><option${add_attribute("value", 10, 0)}>${escape(translation.secondarySchool[localStorage.getItem("language")])} - ${escape(translation.grade[localStorage.getItem("language")])} 2</option><option${add_attribute("value", 11, 0)}>${escape(translation.secondarySchool[localStorage.getItem("language")])} - ${escape(translation.grade[localStorage.getItem("language")])} 3</option></select> ${``}</div> <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", useCamera, 1)}> <label class="form-check-label" for="SwitchCheck1">${escape(translation.useCamera[localStorage.getItem("language")])}</label> </div></div> ${`<div>${`${`<button type="button" class="btn btn-primary waves-effect waves-light">${escape(translation.launchCamera[localStorage.getItem("language")])}</button>`}`}</div>`} ${``} ${``} <div>${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)}>${escape(translation.close[localStorage.getItem("language")])}</button> <input type="submit" class="btn btn-primary waves-effect waves-light"${add_attribute("value", translation.save[localStorage.getItem("language")], 0)}></div></div></form> </div></div></div></div> </div>`;
  } while (!$$settled);
  return $$rendered;
});
const StudentCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_studentStore;
  let { student } = $$props;
  let { studentStore } = getContext("studentStore");
  $$unsubscribe_studentStore = subscribe(studentStore, (value) => value);
  let subsToolTip;
  let viewBtn;
  let editBtn;
  if ($$props.student === void 0 && $$bindings.student && student !== void 0)
    $$bindings.student(student);
  $$unsubscribe_studentStore();
  return `<div class="col-xxl-3 col-xl-4 col-lg-5 col-sm-6 col-xs-12"><div class="card card-animate p-3 py-2" role="button"><div class="row g-0"><div class="card-body text-center"><div class="avatar-md mb-3 mx-auto"><img${add_attribute("src", student.image.full_path, 0)} alt="" id="candidate-img" class="avatar-md rounded-circle"></div> <h5 id="candidate-name" class="mb-1 text-truncate">${escape(student.fullname)}</h5> ${student.subscribed ? `<span class="badge bg-success-subtle text-success">${escape(translation.subscribed[localStorage.getItem("language")])}</span>` : `<span class="badge bg-danger-subtle text-danger">${escape(translation.notSubscribed[localStorage.getItem("language")])}</span>`} <div class="d-flex gap-2 mt-4 flex-wrap">${student.face_id == null ? `<span data-bs-toggle="modal" class="col-12 d-none" data-bs-target="#editStudentModal"${add_attribute("this", editBtn, 0)}><button type="button" class="btn col-12 text-start btn-soft-success btn-label waves-effect waves-light"><i class="ri-edit-2-line label-icon align-middle fs-16 me-2"></i> ${escape(translation.edit[localStorage.getItem("language")])}</button></span>` : ``} <button type="button" class="col-12 btn text-start btn-soft-secondary btn-label waves-effect waves-light"${add_attribute("this", subsToolTip, 0)}><i class="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> ${escape(translation.subscribe[localStorage.getItem("language")])}</button> ${student.qrEnabled && student.subscribed ? `<span data-bs-toggle="modal" class="col-12" data-bs-target="#ViewQrStudentModal"><button type="button" class="col-12 btn text-start btn-soft-danger btn-label waves-effect waves-light"><i class="ri-qr-code-line label-icon align-middle fs-16 me-2"></i> ${escape(translation.qrCode[localStorage.getItem("language")])}</button></span>` : ``} <button type="button" class="d-none" data-bs-toggle="modal" data-bs-target="#viewStudentModal"${add_attribute("this", viewBtn, 0)}></button></div></div></div></div> </div>`;
});
const Qr = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $studentStore, $$unsubscribe_studentStore;
  let { type } = $$props;
  let { studentStore } = getContext("studentStore");
  $$unsubscribe_studentStore = subscribe(studentStore, (value) => $studentStore = value);
  let view;
  let qrInstance;
  function loadQr(data) {
    qrInstance.update({
      width: 300,
      height: 300,
      type: "png",
      data
    });
  }
  studentStore.subscribe(async () => {
    if ($studentStore?.id == null)
      return;
    let res = await fetch(PathGetStudentQr($studentStore.id, type), {
      headers: {
        Authorization: `${localStorage.getItem("SID")}`
      },
      method: "POST"
    });
    redirector(res);
    let otpResponse = await res.json();
    if (otpResponse.status == "success") {
      loadQr(otpResponse.data.otp);
    }
  });
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  $$unsubscribe_studentStore();
  return `<div class="modal fade" id="ViewQrStudentModal" tabindex="-1" aria-labelledby="ViewQrStudentModal" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalgridLabel">${escape(translation.studentQrCode[localStorage.getItem("language")])}</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body"><form><div class="row g-3 d-print-block"><div class="text-center" id="qrImage"${add_attribute("this", view, 0)} data-svelte-h="svelte-isak5x"></div> <div class="text-center hstack gap-2 justify-content-center"><button type="button" class="btn btn-primary waves-effect waves-light">${escape(translation.download[localStorage.getItem("language")])}</button> <button type="button" class="btn btn-primary waves-effect waves-light">${escape(translation.print[localStorage.getItem("language")])}</button></div> <div> <div class="alert alert-warning alert-border-left alert-dismissible fade show" role="alert"><i class="ri-alert-line me-3 align-middle"></i>${escape(translation.qrExpireNote[localStorage.getItem("language")])} <strong>${escape(translation.endOfDay[localStorage.getItem("language")])}</strong>.
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div></div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">${escape(translation.close[localStorage.getItem("language")])}</button></div> </div></form></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let studentsList;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let studentsPage;
  let noFaceStudent = "Student";
  setContext("studentStore", { studentStore: writable({}) });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  studentsList = data.studentsResponse.data.students;
  data.studentsResponse.pagination;
  $$unsubscribe_page();
  return `<div class="row"${add_attribute("this", studentsPage, 0)}><div class="col-lg-12">${$page.url.searchParams.get("noFace") ? ` <div class="alert alert-warning alert-border-left alert-dismissible fade show" role="alert"><i class="ri-alert-line me-3 align-middle"></i><!-- HTML_TAG_START -->${translation.noPicSub[localStorage.getItem("language")]}<!-- HTML_TAG_END --> <strong class="text-primary">${escape(noFaceStudent)}</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>` : ``} <div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1">${escape(translation.studentsManagement[localStorage.getItem("language")])}</h4> <div class="flex-shrink-0"> ${validate_component(AddStudentModal, "AddStudentModal").$$render($$result, {}, {}, {})}</div></div> ${validate_component(Qr, "Qr").$$render($$result, { type: "parent" }, {}, {})} ${validate_component(ViewStudentModal, "ViewStudentModal").$$render($$result, {}, {}, {})} ${validate_component(DeleteStudentModal, "DeleteStudentModal").$$render($$result, {}, {}, {})} ${validate_component(EditStudentModal, "EditStudentModal").$$render($$result, {}, {}, {})} </div></div> ${each(studentsList, (student, _) => {
    return `${validate_component(StudentCard, "StudentCard").$$render($$result, { student }, {}, {})}`;
  })}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-2c0984cf.js.map
