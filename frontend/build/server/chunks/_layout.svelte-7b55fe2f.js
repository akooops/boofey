import { c as create_ssr_component, b as subscribe, v as validate_component, d as add_classes, f as each, e as escape, h as add_attribute } from './ssr-69d45533.js';
import { n as navigating, p as page } from './stores-fc2c2f25.js';
import { t as translation } from './translation-88f21498.js';
import './initApp-e077d2ff.js';
import { r as routes } from './env-841d6f91.js';

const NavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { user = {} } = $$props;
  let menuItems = [];
  let menuItemsAdmin = [
    {
      submenu: [
        {
          title: "Dashboards",
          links: [],
          route: "/admin",
          permission: null,
          icon: "ri-dashboard-line"
        }
      ]
    },
    {
      title: "School",
      submenu: [
        {
          title: "Schools",
          links: [],
          route: "/admin/schools",
          permission: "schools.index",
          icon: "ri-building-4-line"
        },
        {
          title: "Packages",
          links: [],
          route: "/admin/packages",
          permission: "packages.index",
          icon: "ri-archive-line"
        },
        {
          title: "Canteens",
          links: [],
          route: "/admin/canteens",
          permission: "canteens.index",
          icon: "ri-restaurant-2-line"
        },
        {
          title: "Canteens",
          links: [],
          route: "/admin/canteens",
          permission: "canteens.index.simplified",
          icon: "ri-restaurant-2-line"
        }
      ]
    },
    {
      title: "Students",
      submenu: [
        {
          title: "Parents",
          links: [],
          route: "/admin/parents",
          permission: "fathers.index",
          icon: "ri-group-2-line"
        },
        {
          title: "Students",
          links: [],
          route: "/admin/students",
          permission: "students.index",
          icon: "ri-user-2-line"
        }
      ]
      // { title: "Qr Exit Scan ", links: [], route:"/admin/qr-exit",permission:"queueStudents.exit",icon:"ri-qr-code-line"},
    },
    {
      title: "Subscriptions",
      submenu: [
        {
          title: "Coupons",
          links: [],
          route: "/admin/coupons",
          permission: "coupons.index",
          icon: "ri-coupon-2-line"
        },
        {
          title: "Invoices ",
          links: [],
          route: "/admin/invoices",
          permission: "invoices.index",
          icon: "ri-file-paper-2-line"
        },
        {
          title: "Payments ",
          links: [],
          route: "/admin/payments",
          permission: "payments.index",
          icon: "ri-bank-card-line"
        }
      ]
    },
    {
      title: "Users",
      submenu: [
        {
          title: "Users",
          links: [],
          route: "/admin/users",
          permission: "users.index",
          icon: "ri-group-line"
        },
        {
          title: "Roles",
          links: [],
          route: "/admin/roles",
          permission: "roles.index",
          icon: "ri-briefcase-line"
        },
        {
          title: "Permissions",
          links: [],
          route: "/admin/permissions",
          permission: "permissions.index",
          icon: "ri-error-warning-line"
        }
      ]
    },
    {
      title: "Point Of Sale (POS)",
      submenu: [
        {
          title: "Categories ",
          links: [],
          route: "/admin/categories",
          permission: "categories.index",
          icon: "ri-node-tree"
        },
        {
          title: "Products ",
          links: [],
          route: "/admin/products",
          permission: "products.index",
          icon: "ri-shopping-bag-line"
        }
      ]
      // { title: "Orders ", links: [], route:"/admin/orders",permission:"orders.index",icon:"ri-survey-line"},
    },
    {
      title: "Reports",
      submenu: [
        {
          title: "Daily Preparation",
          links: [],
          route: "/admin/reports/todaySubscribers",
          permission: "reports.todaySubscribers",
          icon: "ri-file-list-3-line"
        },
        {
          title: "Subsription Status",
          links: [],
          route: "/admin/reports/subsriptionStatus",
          permission: "reports.subsriptionStatus",
          icon: "ri-survey-line"
        },
        {
          title: "Revenues",
          links: [],
          route: "/admin/reports/revenues",
          permission: "reports.revenues",
          icon: "ri-wallet-3-line"
        }
      ]
    },
    {
      title: "Contact",
      submenu: [
        {
          title: "SMS",
          links: [],
          route: "/admin/sms",
          permission: "sms.index",
          icon: "ri-chat-1-line"
        }
      ]
    }
  ];
  let menuItemsParent = [
    {
      title: "Menu",
      submenu: [
        {
          title: translation.students[localStorage.getItem("language")],
          links: [],
          route: "/students",
          icon: "ri-user-2-line"
        },
        {
          title: translation.paymentMethods[localStorage.getItem("language")],
          links: [],
          route: "/paymentMethods",
          icon: "ri-bank-card-line"
        },
        {
          title: translation.payments[localStorage.getItem("language")],
          links: [],
          route: "/payments",
          icon: "ri-money-dollar-circle-line"
        },
        {
          title: translation.subs[localStorage.getItem("language")],
          links: [],
          route: "/subscriptions",
          icon: "ri-refund-2-line"
        },
        {
          title: translation.invoices[localStorage.getItem("language")],
          links: [],
          route: "/invoices",
          permission: "invoices.index",
          icon: "ri-file-paper-2-line"
        }
      ]
    }
  ];
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  {
    {
      menuItems = user?.roles[0]?.name != "parent" ? menuItemsAdmin : menuItemsParent;
    }
  }
  $$unsubscribe_page();
  return `<div class="${["app-menu navbar-menu", user.roles[0].name == "pos" ? "d-none" : ""].join(" ").trim()}"> <div class="navbar-brand-box" data-svelte-h="svelte-11fi4xf"> <a href="index.html" class="logo logo-dark"><span class="logo-sm"><img src="/assets/images/logo.svg" alt="" height="10"></span> <span class="logo-lg"><img src="/assets/images/logo.svg" alt="" height="22"></span></a>  <a href="index.html" class="logo logo-light"><span class="logo-sm"><img src="/assets/images/logo.svg" alt="" height="10"></span> <span class="logo-lg"><img src="/assets/images/logo.svg" alt="" height="30"></span></a> <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover"><i class="ri-record-circle-line"></i></button></div> <div id="scrollbar"><div class="container-fluid"><div id="two-column-menu" data-svelte-h="svelte-gomvyr"></div> <ul class="navbar-nav" id="navbar-nav">${each(menuItems, (item) => {
    return `${item.title ? `<li class="menu-title"><span>${escape(item.title)}</span></li>` : ``} ${each(item.submenu, (submenu) => {
      return ` ${submenu.links.length > 0 ? `<li class="nav-item"><a class="nav-link menu-link" href="#sidebarDashboards" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards"><i${add_attribute("class", submenu.icon, 0)}></i> <span>${escape(submenu.title)}</span></a> ${each(submenu.links, (link) => {
        return `<div class="collapse menu-dropdown" id="sidebarDashboards"><ul class="nav nav-sm flex-column"><li class="nav-item"><a href="dashboard-analytics.html" class="nav-link">${escape(link)}</a> </li></ul> </div>`;
      })} </li>` : `<li class="nav-item">${submenu.route == "/admin" ? `<a class="${["nav-link menu-link", $page.url.pathname == "/admin" ? "active" : ""].join(" ").trim()}"${add_attribute("href", submenu.route, 0)} role="button" aria-expanded="false"><i${add_attribute("class", submenu.icon, 0)}></i> <span>${escape(submenu.title)}</span> </a>` : `<a class="${[
        "nav-link menu-link",
        $page.url.pathname.includes(submenu.route) ? "active" : ""
      ].join(" ").trim()}"${add_attribute("href", submenu.route, 0)} role="button" aria-expanded="false"><i${add_attribute("class", submenu.icon, 0)}></i> <span>${escape(submenu.title)}</span> </a>`} </li>`} `;
    })}`;
  })}</ul></div> </div> <div class="sidebar-background"></div></div>`;
});
const TopBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { user } = $$props;
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  return `<header id="page-topbar"${add_classes((user.roles[0].name == "pos" ? "start-0" : "").trim())}><div class="layout-width"><div class="navbar-header"><div class="d-flex"> <div class="navbar-brand-box horizontal-logo" data-svelte-h="svelte-krcjp1"><a href="index.html" class="logo logo-dark"><span class="logo-sm"><img src="/assets/images/logo-sm.png" alt="" height="22"> </span> <span class="logo-lg"><img src="/assets/images/logo-dark.png" alt="" height="17"></span></a> <a href="index.html" class="logo logo-light"><span class="logo-sm"><img src="/assets/images/logo-sm.png" alt="" height="22"></span> <span class="logo-lg"><img src="/assets/images/logo-light.png" alt="" height="17"></span></a></div> <button type="button" class="${[
    "btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger",
    user.roles[0].name == "pos" ? "d-none" : ""
  ].join(" ").trim()}" id="topnav-hamburger-icon" data-svelte-h="svelte-1s47wo3"><span class="hamburger-icon"><span></span> <span></span> <span></span></span></button></div> <div class="d-flex align-items-center"> ${user?.roles[0]?.name == "parent" ? `<div class="dropdown ms-1 topbar-head-dropdown header-item" data-svelte-h="svelte-39eqz1"><button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img id="header-lang-img" src="/assets/images/flags/us.svg" alt="Header Language" height="20" class="rounded"></button> <div class="dropdown-menu dropdown-menu-end"> <a href="javascript:void(0);" class="dropdown-item notify-item language py-2" data-lang="en" title="English"><img src="/assets/images/flags/us.svg" alt="user-image" class="me-2 rounded" height="18"> <span class="align-middle">English</span></a>  <a href="javascript:void(0);" class="dropdown-item notify-item language" data-lang="ar" title="Arabic"><img src="/assets/images/flags/sa.svg" alt="user-image" class="me-2 rounded" height="18"> <span class="align-middle">العربية</span></a></div></div>` : ``}  ${user?.roles[0]?.name != "parent" ? `<div class="ms-1 header-item d-none d-sm-flex" data-svelte-h="svelte-pjcklq"><button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" data-toggle="fullscreen"><i class="bx bx-fullscreen fs-22"></i></button></div>` : ``} <div class="ms-1 header-item d-none d-sm-flex" data-svelte-h="svelte-14pe8oe"><button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"><i class="bx bx-moon fs-22"></i></button></div> <div class="dropdown topbar-head-dropdown ms-1 header-item" id="notificationDropdown" data-svelte-h="svelte-1dajnhj"><button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false"><i class="bx bx-bell fs-22"></i> <span class="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">0<span class="visually-hidden">unread messages</span></span></button> <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown"><div class="dropdown-head bg-primary bg-pattern rounded-top"><div class="p-3"><div class="row align-items-center"><div class="col"><h6 class="m-0 fs-16 fw-semibold text-white">Notifications</h6></div> <div class="col-auto dropdown-tabs"><span class="badge bg-light-subtle text-body fs-13">0 New</span></div></div></div> <div class="px-2 pt-2"><ul class="nav nav-tabs dropdown-tabs nav-tabs-custom" data-dropdown-tabs="true" id="notificationItemsTab" role="tablist"><li class="nav-item waves-effect waves-light"><a class="nav-link active" data-bs-toggle="tab" href="#all-noti-tab" role="tab" aria-selected="true">All (0)</a></li> <li class="nav-item waves-effect waves-light"><a class="nav-link" data-bs-toggle="tab" href="#messages-tab" role="tab" aria-selected="false">Messages</a></li> <li class="nav-item waves-effect waves-light"><a class="nav-link" data-bs-toggle="tab" href="#alerts-tab" role="tab" aria-selected="false">Alerts</a></li></ul></div></div> <div class="tab-content position-relative" id="notificationItemsTabContent"><div class="tab-pane fade show active py-2 ps-2" id="all-noti-tab" role="tabpanel"><div data-simplebar style="max-height: 300px;" class="pe-2"> <div class="my-3 text-center view-all"><button type="button" class="btn btn-soft-success waves-effect waves-light">View
                                        All Notifications <i class="ri-arrow-right-line align-middle"></i></button></div></div></div> <div class="tab-pane fade py-2 ps-2" id="messages-tab" role="tabpanel" aria-labelledby="messages-tab"><div data-simplebar style="max-height: 300px;" class="pe-2"> <div class="my-3 text-center view-all"><button type="button" class="btn btn-soft-success waves-effect waves-light">View
                                        All Messages <i class="ri-arrow-right-line align-middle"></i></button></div></div></div> <div class="tab-pane fade p-4" id="alerts-tab" role="tabpanel" aria-labelledby="alerts-tab"></div> <div class="notification-actions" id="notification-actions"><div class="d-flex text-muted justify-content-center">Select <div id="select-content" class="text-body fw-semibold px-1">0</div> Result <button type="button" class="btn btn-link link-danger p-0 ms-3" data-bs-toggle="modal" data-bs-target="#removeNotificationModal">Remove</button></div></div></div></div></div> <div class="dropdown ms-sm-3 header-item topbar-user"><button type="button" class="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="d-flex align-items-center"><img class="rounded-circle header-profile-user"${add_attribute("src", user?.profile?.image?.full_path, 0)} alt="Header Avatar"> <span class="text-start ms-xl-2"><span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text">${escape(user?.profile?.fullname)}</span> <span class="d-none d-xl-block ms-1 fs-12 user-name-sub-text">${escape(user?.roles[0]?.name)}</span></span></span></button> <div class="dropdown-menu dropdown-menu-end"> <a class="dropdown-item" href="javascript:void(0);"><i class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span class="align-middle">${escape(translation.profile[localStorage.getItem("language")])}</span></a> <a class="dropdown-item" href=""><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span class="align-middle" data-key="t-logout">${escape(translation.logOut[localStorage.getItem("language")])}</span></a></div></div></div></div></div></header>  <div id="removeNotificationModal" class="modal fade zoomIn" tabindex="-1" aria-hidden="true" data-svelte-h="svelte-1e5wqtm"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="NotificationModalbtn-close"></button></div> <div class="modal-body"><div class="mt-2 text-center"><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5"><h4>Are you sure ?</h4> <p class="text-muted mx-4 mb-0">Are you sure you want to remove this Notification ?</p></div></div> <div class="d-flex gap-2 justify-content-center mt-4 mb-2"><button type="button" class="btn w-sm btn-light" data-bs-dismiss="modal">Close</button> <button type="button" class="btn w-sm btn-danger" id="delete-notification">Yes, Delete It!</button></div></div> </div> </div> </div>`;
});
const BreadCrumbs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let title;
  let item;
  let active;
  let itemHref;
  let { data } = $$props;
  function matchPathWithPatterns(currentPath) {
    for (const route of routes) {
      const { path, title: title2, item: item2, active: active2, itemHref: itemHref2 } = route;
      if (currentPath.match(path)) {
        return { title: title2, item: item2, active: active2, itemHref: itemHref2 };
      }
    }
    return null;
  }
  page.subscribe(() => {
    if ($page.url.pathname == "/admin" || $page.url.pathname == "/") {
      title = "Dashboard";
      item = "Dashboard";
      active = null;
      return;
    }
    let currentPath = $page.url.pathname.replace("/admin", "");
    let matchedObject = matchPathWithPatterns(currentPath);
    if (matchedObject) {
      title = matchedObject.title;
      item = matchedObject.item;
      active = matchedObject.active;
      itemHref = matchedObject?.itemHref;
    }
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_page();
  return `<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between"><h4 class="mb-sm-0">${escape(title)}</h4> <div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="${escape(
    $page.url.pathname.includes("/admin") && itemHref ? "/admin" : "",
    true
  ) + escape(itemHref ? itemHref($page.url.pathname) : "", true)}">${escape(item)}</a></li> ${active ? `<li class="breadcrumb-item active">${escape(active)}</li>` : ``}</ol></div></div></div></div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  user = data.userResponse.data.user;
  {
    {
      const permissionNames = user.roles[0].permissions.map((permission) => permission.name);
      sessionStorage.setItem("permissions", JSON.stringify(permissionNames));
    }
  }
  $$unsubscribe_navigating();
  return `<div id="layout-wrapper">${validate_component(TopBar, "TopBar").$$render($$result, { user }, {}, {})}  ${validate_component(NavBar, "NavBar").$$render($$result, { user }, {}, {})} <div class="vertical-overlay"></div>  <div class="${["main-content", user.roles[0].name == "pos" ? "ms-0" : ""].join(" ").trim()}"><div class="page-content"><div class="container-fluid"> ${validate_component(BreadCrumbs, "BreadCrumbs").$$render($$result, { data }, {}, {})}  <div${add_classes((!($navigating == null || $navigating?.from?.route?.id == $navigating?.to?.route?.id) ? "d-none" : "").trim())}>${slots.default ? slots.default({}) : ``}</div> ${$navigating?.from?.route?.id != $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-1eqlld5"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}</div></div></div></div> ${``}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-7b55fe2f.js.map
