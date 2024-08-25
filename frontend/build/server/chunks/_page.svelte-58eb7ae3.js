import { c as create_ssr_component, h as add_attribute, e as escape, v as validate_component } from './ssr-69d45533.js';
import { t as translation } from './translation-88f21498.js';

const IdCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { user } = $$props;
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  return `<div class="card"><div class="card-body"><h5 class="card-title mb-3 text-primary">${escape(translation.info[localStorage.getItem("language")])}</h5> <div class="table-responsive"><table class="table table-borderless mb-0"><tbody><tr><th class="ps-0" scope="row">${escape(translation.username[localStorage.getItem("language")])} :</th> <td class="text-muted">${escape(user?.username)}</td></tr> <tr><th class="ps-0" scope="row">${escape(translation.firstName[localStorage.getItem("language")])} :</th> <td class="text-muted">${escape(user?.profile?.firstname)}</td></tr> <tr><th class="ps-0" scope="row">${escape(translation.lastName[localStorage.getItem("language")])} :</th> <td class="text-muted">${escape(user?.profile?.lastname)}</td></tr> <tr><th class="ps-0" scope="row">${escape(translation.phone[localStorage.getItem("language")])} :</th> <td class="text-muted">${escape(user?.phone)}</td></tr> <tr><th class="ps-0" scope="row">${escape(translation.email[localStorage.getItem("language")])} :</th> <td class="text-muted">${escape(user?.email)}</td></tr></tbody></table></div> </div> </div>`;
});
const css = {
  code: ".profile-wid-bg.svelte-1eanll7:before{background:linear-gradient(to top,#ff4141,#ff7f41) !important}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  user = data.profileResponse.data.user;
  return `<div class="profile-foreground position-relative mx-n4 mt-n4" data-svelte-h="svelte-1ynyqra"><div class="profile-wid-bg svelte-1eanll7"></div></div> <div class="pt-5 profile-wrapper"><div class="row g-4"><div class="col-auto"> <div class="profile-user position-relative d-inline-block mx-auto"><img${add_attribute("src", user?.profile?.image?.full_path, 0)} class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image"></div></div>  <div class="col align-self-center"><div class=""><h3 class="text-white mb-1">${escape(user?.profile.fullname)}</h3> <p class="text-white text-opacity-75">${escape(user?.roles[0]?.name)}</p></div></div> </div> </div> <div class="row"><div class="col-lg-12"><div><div class="d-flex profile-wrapper justify-content-end"><a href="javascript:void(0);" class="btn btn-info"><i class="ri-edit-box-line align-bottom"></i> ${escape(translation.editProfile[localStorage.getItem("language")])}</a></div>  <div class="tab-content pt-4 text-muted"><div class="tab-pane active" id="overview-tab" role="tabpanel"><div class="row"><div class="col-xxl-3">${validate_component(IdCard, "IdCard").$$render($$result, { user }, {}, {})} </div>  <div class="col-xxl-9"><div class="card"><div class="card-body"><h5 class="card-title mb-3 text-primary">${escape(translation.about[localStorage.getItem("language")])}</h5> ${user?.profile?.description ? `<p>${escape(user?.profile?.description)}</p>` : `<div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert"><i class="ri-airplay-line me-3 align-middle"></i><strong>${escape(translation.noDescription[localStorage.getItem("language")])}</strong> - ${escape(translation.youCanAddDescription[localStorage.getItem("language")])} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`}</div>  </div></div> </div> </div> </div> </div></div> </div> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-58eb7ae3.js.map
