import { c as create_ssr_component, b as subscribe, h as add_attribute, v as validate_component, s as setContext, f as each, g as getContext, e as escape } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import { D as DeleteStudentModal } from './DeleteStudentModal-0c666034.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import './index-64aa7a5e.js';
import { Q as Qr, P as ParentsTableCollapse, Y as YearsTableCollapse } from './Qr-fe66647c.js';
import { S as SchoolsTableCollapse } from './SchoolsTableCollapse-505cea76.js';
import { D as DivisionsTableCollapse } from './DivisionsTableCollapse-614cba4d.js';
import { w as writable } from './index2-7897530e.js';
import { p as page, n as navigating } from './stores-fc2c2f25.js';
import './translation-88f21498.js';
import './ModalPagination-ba97b167.js';
import './Accordion-5106493f.js';
import './paths-53224d1e.js';
import './auth-d76f3c60.js';
import './navigation-766853ab.js';
import 'qr-code-styling';
import 'print-js';

const ViewStudentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $studentStore, $$unsubscribe_studentStore;
  let { studentStore } = getContext("studentStore");
  $$unsubscribe_studentStore = subscribe(studentStore, (value) => $studentStore = value);
  $$unsubscribe_studentStore();
  return `<div class="modal fade" id="viewStudentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-fwqd2z"><h5 class="modal-title" id="exampleModalgridLabel">View Permission</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4"><img class="rounded avatar-xl mb-3 object-fit-cover" alt="Student image" width="200"${add_attribute("src", $studentStore?.image?.full_path, 0)}> ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Name : <span class="fw-normal">${escape($studentStore?.fullname)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Father : 
                            <img${add_attribute("src", $studentStore?.father?.user?.profile?.image?.full_path, 0)} alt="" class="avatar-xs d-inline rounded-circle"> ${escape($studentStore?.father?.user?.profile?.fullname)}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Status :         ${$studentStore?.subscribed ? `<span class="badge bg-success-subtle text-success" data-svelte-h="svelte-3hcgtk">Subscribed</span>` : `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-1a2xrxf">Not Subscribed</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `School :      
                            <img${add_attribute("src", $studentStore?.school?.logo?.full_path, 0)} alt="" class="avatar-xs rounded-circle"> ${escape($studentStore?.school?.name)}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Devision : ${$studentStore?.division ? `<span class="fw-normal">${escape($studentStore?.division?.name)}</span>` : `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-xnfvbo">No Division</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Class : <span class="fw-normal">${escape($studentStore.className)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Created at : <span class="fw-normal">${escape(formatTimestamp($studentStore.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Updated at : <span class="fw-normal">${escape(formatTimestamp($studentStore.updated_at))}</span>`;
    }
  })} <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-1vrqtk3"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const EditStudentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $studentStore, $$unsubscribe_studentStore;
  let close;
  let form;
  let selectClass;
  let schoolId = "";
  let resetParent;
  let resetSchool;
  let resetYear;
  let resetDivision;
  let editImage = false;
  let { studentStore } = getContext("studentStore");
  $$unsubscribe_studentStore = subscribe(studentStore, (value) => $studentStore = value);
  studentStore.subscribe(() => {
    $studentStore.father_id;
    schoolId = $studentStore.school_id;
    $studentStore.academic_year_id;
    $studentStore.division_id;
  });
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="modal fade" id="editStudentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-4b19vr"><h5 class="modal-title" id="exampleModalgridLabel">Add Student</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <div class="${["row g-3", ""].join(" ").trim()}"> ${validate_component(ParentsTableCollapse, "ParentsTableCollapse").$$render(
      $$result,
      {
        collapse: true,
        selected: $studentStore.father,
        title: "Student's Parent",
        resetParent
      },
      {
        resetParent: ($$value) => {
          resetParent = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${``} ${validate_component(SchoolsTableCollapse, "SchoolsTableCollapse").$$render(
      $$result,
      {
        collapse: true,
        selected: $studentStore.school,
        title: "Student's School",
        resetSchool
      },
      {
        resetSchool: ($$value) => {
          resetSchool = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${``} ${validate_component(YearsTableCollapse, "YearsTableCollapse").$$render(
      $$result,
      {
        collapse: true,
        schoolId,
        selected: $studentStore.academic_year,
        title: "Student's Academic Year",
        resetYear
      },
      {
        resetYear: ($$value) => {
          resetYear = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${``} ${validate_component(DivisionsTableCollapse, "DivisionsTableCollapse").$$render(
      $$result,
      {
        collapse: true,
        schoolId,
        selected: $studentStore.division,
        title: "Student's Division",
        resetDivision
      },
      {
        resetDivision: ($$value) => {
          resetDivision = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${``} <form${add_attribute("this", form, 0)}><div class="row g-3"><div class="col-xxl-6"><div><label for="firstName" class="form-label" data-svelte-h="svelte-1hs0n20">First Name</label> <input type="text" name="firstname" class="form-control" id="firstName" placeholder="Enter Firstname"${add_attribute("value", $studentStore.firstname, 0)}> ${``}</div></div>  <div class="col-xxl-6"><div><label for="lastName" class="form-label" data-svelte-h="svelte-1tzb4fa">Last Name</label> <input type="text" name="lastname" class="form-control" id="lastName" placeholder="Enter Lastname"${add_attribute("value", $studentStore.lastname, 0)}> ${``}</div></div> <div class="col-lg-12"><label for="class" class="form-label" data-svelte-h="svelte-15fukk2">Class</label> <select class="form-select" name="class" id="class" aria-label="Default select example"${add_attribute("this", selectClass, 0)}><option disabled selected value data-svelte-h="svelte-wf9klv">-- select a class -- </option><option${add_attribute("value", 0, 0)} data-svelte-h="svelte-14ylisr">Primary School - Grade 1</option><option${add_attribute("value", 1, 0)} data-svelte-h="svelte-bmc3c9">Primary School - Grade 2</option><option${add_attribute("value", 2, 0)} data-svelte-h="svelte-pzy12b">Primary School - Grade 3</option><option${add_attribute("value", 3, 0)} data-svelte-h="svelte-17rvz3h">Primary School - Grade 4</option><option${add_attribute("value", 4, 0)} data-svelte-h="svelte-152oma3">Primary School - Grade 5</option><option${add_attribute("value", 5, 0)} data-svelte-h="svelte-1y7a26p">Primary School - Grade 6</option><option${add_attribute("value", 6, 0)} data-svelte-h="svelte-118wla">Middle School - Grade 1</option><option${add_attribute("value", 7, 0)} data-svelte-h="svelte-1gxeq1e">Middle School - Grade 2</option><option${add_attribute("value", 8, 0)} data-svelte-h="svelte-oul01a">Middle School - Grade 3</option><option${add_attribute("value", 9, 0)} data-svelte-h="svelte-1coeeh0">Secondary School - Grade 1</option><option${add_attribute("value", 10, 0)} data-svelte-h="svelte-kq57ip">Secondary School - Grade 2</option><option${add_attribute("value", 11, 0)} data-svelte-h="svelte-14cpvwt">Secondary School - Grade 3</option></select> ${``}</div> <div class="col-lg-12"><label for="studentname" class="form-label" data-svelte-h="svelte-1xnq29g">NFC ID</label> <input type="text" name="nfc_id" class="form-control" id="nfc_id" placeholder="Enter Studentname name"${add_attribute("value", $studentStore.nfc_id, 0)}> ${``}</div>  <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", $studentStore.onhold, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-vorh5w">On Hold</label> </div></div> <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", editImage, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-mhtbt5">Edit Image</label> </div></div> ${`<figure class="figure"><img alt="school logo " width="200"${add_attribute("src", $studentStore?.image?.full_path, 0)} class="figure-img rounded avatar-xl mb-3 object-fit-cover"> <figcaption class="figure-caption" data-svelte-h="svelte-1j0mbyv">Current Student image</figcaption></figure>`} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div></div></form> </div></div></div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_studentStore();
  return $$rendered;
});
const StudentItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_studentStore;
  let { student } = $$props;
  let notified = false;
  let { studentStore } = getContext("studentStore");
  $$unsubscribe_studentStore = subscribe(studentStore, (value) => value);
  let subsToolTip;
  if ($$props.student === void 0 && $$bindings.student && student !== void 0)
    $$bindings.student(student);
  $$unsubscribe_studentStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(student.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", student.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(student.fullname)}</div></div></td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", student.father.user.profile.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(student.father.user.profile.fullname)}</div></div></td> <td><span class="${"badge " + escape(
    student.subscribedStatus == "Active Subscription" ? "bg-success-subtle text-success" : student.subscribedStatus == "Preactive Subscription" || student.subscribedStatus == "Inactive Subscription" ? "bg-warning-subtle text-warning" : "bg-danger-subtle text-danger",
    true
  )}">${escape(student.subscribedStatus)}</span></td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", student.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(student.school.name)}</div></div></td> <td>${student.division ? `${escape(student.division.name)}` : `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-xnfvbo">No Division</span>`}</td> <td>${escape(student.className)}</td> <td><div class="hstack gap-3"> ${JSON.parse(sessionStorage.getItem("permissions")).includes("students.notify-parent") && student.face_id == null && notified == false ? `<span data-svelte-h="svelte-hnhmbp"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Notify"><i class="ri-notification-3-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("students.otp") ? `<span data-bs-toggle="modal" data-bs-target="#ViewQrStudentModal" data-svelte-h="svelte-16cfjz2"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Qr Code"><i class="ri-qr-code-line"></i></a></span>` : ``} <span><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Subscribtion"${add_attribute("this", subsToolTip, 0)} data-svelte-h="svelte-11ty0pd"><i class="ri-money-dollar-circle-line"></i></a></span> ${JSON.parse(sessionStorage.getItem("permissions")).includes("students.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewStudentModal" data-svelte-h="svelte-1so25d1"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("students.update") ? `<span data-bs-toggle="modal" data-bs-target="#editStudentModal" data-svelte-h="svelte-l088sk"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("students.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteStudentModal" data-svelte-h="svelte-46fona"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const StudentsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { studentsList } = $$props;
  setContext("studentStore", { studentStore: writable({}) });
  if ($$props.studentsList === void 0 && $$bindings.studentsList && studentsList !== void 0)
    $$bindings.studentsList(studentsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-1mv0z8j"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Student</th> <th scope="col">Father</th> <th scope="col">Status</th> <th scope="col">School</th> <th scope="col">Division</th> <th scope="col">Class</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(studentsList, (student) => {
    return `${validate_component(StudentItem, "StudentItem").$$render($$result, { student }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(Qr, "Qr").$$render($$result, {}, {}, {})} ${validate_component(ViewStudentModal, "ViewStudentModal").$$render($$result, {}, {}, {})} ${validate_component(DeleteStudentModal, "DeleteStudentModal").$$render($$result, {}, {}, {})} ${validate_component(EditStudentModal, "EditStudentModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const AddStudentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let close;
  let form;
  let selectClass;
  let onHold = false;
  let schoolId = "";
  let resetParent;
  let resetSchool;
  let resetYear;
  let resetDivision;
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="modal fade" id="addStudentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-4b19vr"><h5 class="modal-title" id="exampleModalgridLabel">Add Student</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <div class="${["row g-3", ""].join(" ").trim()}"> ${validate_component(ParentsTableCollapse, "ParentsTableCollapse").$$render(
      $$result,
      {
        collapse: true,
        title: "Student's Parent",
        resetParent
      },
      {
        resetParent: ($$value) => {
          resetParent = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${``} ${validate_component(SchoolsTableCollapse, "SchoolsTableCollapse").$$render(
      $$result,
      {
        collapse: true,
        title: "Student's School",
        resetSchool
      },
      {
        resetSchool: ($$value) => {
          resetSchool = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${``} ${validate_component(YearsTableCollapse, "YearsTableCollapse").$$render(
      $$result,
      {
        collapse: true,
        schoolId,
        title: "Student's Academic Year",
        resetYear
      },
      {
        resetYear: ($$value) => {
          resetYear = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${``} ${validate_component(DivisionsTableCollapse, "DivisionsTableCollapse").$$render(
      $$result,
      {
        collapse: true,
        schoolId,
        title: "Student's Division",
        resetDivision
      },
      {
        resetDivision: ($$value) => {
          resetDivision = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${``} <form${add_attribute("this", form, 0)}><div class="row g-3"><div class="col-xxl-6"><div><label for="firstName" class="form-label" data-svelte-h="svelte-1hs0n20">First Name</label> <input type="text" name="firstname" class="form-control" id="firstName" placeholder="Enter Firstname"> ${``}</div></div>  <div class="col-xxl-6"><div><label for="lastName" class="form-label" data-svelte-h="svelte-1tzb4fa">Last Name</label> <input type="text" name="lastname" class="form-control" id="lastName" placeholder="Enter Lastname"> ${``}</div></div> <div class="col-lg-12"><label for="class" class="form-label" data-svelte-h="svelte-15fukk2">Class</label> <select class="form-select" name="class" id="class" aria-label="Default select example"${add_attribute("this", selectClass, 0)}><option disabled selected value data-svelte-h="svelte-wf9klv">-- select a class -- </option><option${add_attribute("value", 0, 0)} data-svelte-h="svelte-14ylisr">Primary School - Grade 1</option><option${add_attribute("value", 1, 0)} data-svelte-h="svelte-bmc3c9">Primary School - Grade 2</option><option${add_attribute("value", 2, 0)} data-svelte-h="svelte-pzy12b">Primary School - Grade 3</option><option${add_attribute("value", 3, 0)} data-svelte-h="svelte-17rvz3h">Primary School - Grade 4</option><option${add_attribute("value", 4, 0)} data-svelte-h="svelte-152oma3">Primary School - Grade 5</option><option${add_attribute("value", 5, 0)} data-svelte-h="svelte-1y7a26p">Primary School - Grade 6</option><option${add_attribute("value", 6, 0)} data-svelte-h="svelte-118wla">Middle School - Grade 1</option><option${add_attribute("value", 7, 0)} data-svelte-h="svelte-1gxeq1e">Middle School - Grade 2</option><option${add_attribute("value", 8, 0)} data-svelte-h="svelte-oul01a">Middle School - Grade 3</option><option${add_attribute("value", 9, 0)} data-svelte-h="svelte-1coeeh0">Secondary School - Grade 1</option><option${add_attribute("value", 10, 0)} data-svelte-h="svelte-kq57ip">Secondary School - Grade 2</option><option${add_attribute("value", 11, 0)} data-svelte-h="svelte-14cpvwt">Secondary School - Grade 3</option></select> ${``}</div> <div class="col-lg-12"><label for="studentname" class="form-label" data-svelte-h="svelte-1xnq29g">NFC ID</label> <input type="text" name="nfc_id" class="form-control" id="nfc_id" placeholder="Enter Studentname name"> ${``}</div>  <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", onHold, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-vorh5w">On Hold</label> </div></div> <div><label for="formFile" class="form-label" data-svelte-h="svelte-3h3qwu">Student  Image</label> <input class="form-control" name="file" type="file" id="formFile"> ${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div></div></form> </div></div></div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let studentsList;
  let studentsPagination;
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { data } = $$props;
  let studentsPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  studentsList = data.studentsResponse.data.students;
  studentsPagination = data.studentsResponse.pagination;
  $$unsubscribe_page();
  return `<div class="row "${add_attribute("this", studentsPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1" data-svelte-h="svelte-c7i863">Students Managment</h4> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("students.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addStudentModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-3ylrul"><i class="ri-add-line align-bottom me-1"></i> Add Student</button> ${validate_component(AddStudentModal, "AddStudentModal").$$render($$result, {}, {}, {})}` : ``}</div></div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("students.index") ? `<div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Student" }, {}, {})} <div class="col-xl-3 mb-3"><select class="form-select" name="class" id="class" aria-label="Default select example"><option${add_attribute("value", "all", 0)} data-svelte-h="svelte-13f2t2c">All</option><option${add_attribute("value", "archived", 0)} data-svelte-h="svelte-1q69t1u">Archived</option><option${add_attribute("value", "not archived", 0)} data-svelte-h="svelte-aygy80">Not Archived</option></select></div> <div class="col-xl-3 mb-3"><select class="form-select" name="class" id="class" aria-label="Default select example"><option${add_attribute("value", "all", 0)} data-svelte-h="svelte-13f2t2c">All</option><option${add_attribute("value", "subscribed", 0)} data-svelte-h="svelte-1r4nn6a">Subscribed</option><option${add_attribute("value", "not subscribed", 0)} data-svelte-h="svelte-17v6sc">Not Subscribed</option></select></div>  ${validate_component(StudentsTable, "StudentsTable").$$render($$result, { studentsList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, studentsPagination), {}, {})} </div>   </div>` : ``} </div></div> </div> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-6988a799.js.map
