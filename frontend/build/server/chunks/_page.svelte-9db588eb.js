import { c as create_ssr_component, e as escape, v as validate_component, h as add_attribute } from './ssr-69d45533.js';
import './index-64aa7a5e.js';
import { t as translation } from './translation-88f21498.js';
import { P as Password } from './Password-fcf754f4.js';

const PersonalDetails = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { user } = $$props;
  let form;
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  return `<div class="tab-pane active" id="personalDetails" role="tabpanel"><form${add_attribute("this", form, 0)}><div class="row"><div class="col-xxl-3"><div class="text-center"><div class="profile-user position-relative d-inline-block mx-auto mb-4"><img${add_attribute("src", user?.profile?.image?.full_path, 0)} class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image"> <div class="avatar-xs p-0 rounded-circle profile-photo-edit"><input id="profile-img-file-input" name="file" type="file" class="profile-img-file-input"> <label for="profile-img-file-input" class="profile-photo-edit avatar-xs" data-svelte-h="svelte-1hsqj3p"><span class="avatar-title rounded-circle bg-light text-body"><i class="ri-camera-fill"></i></span></label></div></div> <h5 class="fs-16 mb-1">${escape(user?.profile.fullname)}</h5> <p class="text-muted mb-0">${escape(user?.roles[0]?.name)}</p></div></div> <div class="col-xxl-9 row"><div class="col-xxl-6"><div class="mb-3"><label for="firstnameInput" class="form-label">${escape(translation.firstName[localStorage.getItem("language")])}</label> <input type="text" class="form-control" id="firstnameInput"${add_attribute("placeholder", translation.enterFirstName[localStorage.getItem("language")], 0)} name="firstname"${add_attribute("value", user.profile.firstname, 0)}> ${``}</div></div>  <div class="col-xxl-6"><div class="mb-3"><label for="lastnameInput" class="form-label">${escape(translation.lastName[localStorage.getItem("language")])}</label> <input type="text" class="form-control" id="lastnameInput"${add_attribute("placeholder", translation.enterLastName[localStorage.getItem("language")], 0)} name="lastname"${add_attribute("value", user.profile.lastname, 0)}> ${``}</div></div>  <div class="col-lg-12"><div class="mb-3 pb-2"><label for="exampleFormControlTextarea" class="form-label">${escape(translation.description[localStorage.getItem("language")])}</label> <textarea class="form-control" id="exampleFormControlTextarea"${add_attribute("placeholder", translation.enterDescription[localStorage.getItem("language")], 0)} name="description" rows="4">${escape(user.profile.description || "")}</textarea> ${``}</div></div>  <div class="col-lg-12"><div class="hstack gap-2 justify-content-end"><button type="submit" class="btn btn-primary">${escape(translation.update[localStorage.getItem("language")])}</button></div></div></div> </div> </form></div>`;
});
const ChangePassword = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let form;
  return `<div class="tab-pane" id="changePassword" role="tabpanel"><form${add_attribute("this", form, 0)}><div class="row g-2"><div class="col-lg-4"><div><label for="oldpasswordInput" class="form-label">${escape(translation.currentPass[localStorage.getItem("language")])}</label> ${validate_component(Password, "Password").$$render(
    $$result,
    {
      name: "old_password",
      placeholder: translation.enterCurrentPass[localStorage.getItem("language")]
    },
    {},
    {}
  )} ${``}</div></div>  <div class="col-lg-4"><div><label for="newpasswordInput" class="form-label">${escape(translation.newPass[localStorage.getItem("language")])}</label> ${validate_component(Password, "Password").$$render(
    $$result,
    {
      name: "password",
      placeholder: translation.enterNewPass[localStorage.getItem("language")]
    },
    {},
    {}
  )} ${``}</div></div>  <div class="col-lg-4"><div><label for="confirmpasswordInput" class="form-label">${escape(translation.confirmPassword[localStorage.getItem("language")])}</label> ${validate_component(Password, "Password").$$render(
    $$result,
    {
      name: "password_confirmation",
      placeholder: translation.enterPasswordConfirmation[localStorage.getItem("language")]
    },
    {},
    {}
  )} ${``}</div></div>  <div class="col-lg-12 mt-4"><div class="text-end"><button type="submit" class="btn btn-info">${escape(translation.changePass[localStorage.getItem("language")])}</button></div></div> </div></form></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  user = data.profileResponse.data.user;
  return `<div class="position-relative mx-n4 mt-n4" data-svelte-h="svelte-1srf0z3"><div class="profile-wid-bg profile-setting-img"></div></div> <div class="row">  <div class=""><div class="card mt-xxl-n5"><div class="card-header"><ul class="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist"><li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#personalDetails" role="tab"><i class="fas fa-home"></i> ${escape(translation.personalDetails[localStorage.getItem("language")])}</a></li> <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#changePassword" role="tab"><i class="far fa-user"></i> ${escape(translation.changePass[localStorage.getItem("language")])}</a></li></ul></div> <div class="card-body p-4"><div class="tab-content">${validate_component(PersonalDetails, "PersonalDetails").$$render($$result, { user }, {}, {})} ${validate_component(ChangePassword, "ChangePassword").$$render($$result, {}, {}, {})}  </div></div></div></div> </div> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-9db588eb.js.map
