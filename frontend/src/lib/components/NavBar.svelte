<script>
import UserItem from "../tables/items/UserItem.svelte";
import {onMount} from "svelte"
import { page } from '$app/stores';  

    export let user = {}

    let menuItems = []

     let menuItemsAdmin = [
     {
      submenu: [
        { title: "Dashboards", links: [], route:"/admin" ,permission:null,icon:"ri-dashboard-line"},
      ],
     },
     {
      title: "Users",
      submenu: [
        { title: "Permissions", links: [],route:"/admin/permissions",permission:"permissions.index",icon:"ri-error-warning-line"},
        { title: "Roles", links: [], route:"/admin/roles",permission:"roles.index",icon:"ri-briefcase-line"},
        { title: "Users", links: [], route:"/admin/users",permission:"users.index",icon:"ri-group-line"},
        { title: "Parents", links: [], route:"/admin/parents",permission:"fathers.index",icon:"ri-group-2-line"},
        
      ],

    },
    { title: "School",
        submenu: [
            { title: "Schools", links: [], route:"/admin/schools",permission:"schools.index",icon:"ri-building-4-line"},
            { title: "Packages", links: [], route:"/admin/packages",permission:"packages.index",icon:"ri-archive-line"},
            { title: "Canteens", links: [], route:"/admin/canteens",permission:"canteens.index",icon:"ri-restaurant-2-line"},
            { title: "Students", links: [], route:"/admin/students",permission:"students.index",icon:"ri-user-2-line"},    
            { title: "Qr Exit Scan ", links: [], route:"/admin/qr-exit",permission:"queueStudents.exit",icon:"ri-qr-code-line"},

        ]
    },
    { title: "Point Of Sale (POS)",
        submenu: [
            { title: "Coupons", links: [], route:"/admin/coupons",permission:"coupons.index",icon:"ri-coupon-2-line"},
            { title: "Categories ", links: [], route:"/admin/categories",permission:"categories.index",icon:"ri-node-tree"},
            { title: "Products ", links: [], route:"/admin/products",permission:"products.index",icon:"ri-shopping-bag-line"},
            { title: "Orders ", links: [], route:"/admin/orders",permission:"orders.index",icon:"ri-survey-line"},
            { title: "Invoices ", links: [], route:"/admin/invoices",permission:"invoices.index",icon:"ri-file-paper-2-line"},
            { title: "Payments ", links: [], route:"/admin/payments",permission:"payments.index",icon:"ri-bank-card-line"},
        ]
    },
  ];


  let menuItemsParent = [
    {
      title: "Pages",
      submenu: [
        { title: "Students", links: [], route:"/students",icon:"ri-user-2-line"},
        { title: "Payment Methods", links: [], route:"/paymentMethods",icon:"ri-bank-card-line"},

      ],
    },
  ];


$: {
    menuItems = user?.roles[0]?.name != "parent" ? menuItemsAdmin : menuItemsParent 
}

function checkEmptySubMenus(){
    let userPermissions = JSON.parse(sessionStorage.getItem("permissions")) 

    menuItemsAdmin = menuItemsAdmin.filter((menuItem) => {
    menuItem.submenu = menuItem.submenu.filter((subMenuItem) => {
      // Keep the submenu if it has no permission or the user has the required permission
      return !subMenuItem.permission || userPermissions.includes(subMenuItem.permission);
    });

    // Keep the main menu item if it has at least one submenu left
    return menuItem.submenu.length > 0;
  });
}


onMount(() => {
    checkEmptySubMenus()
})



</script>



<div class="app-menu navbar-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
        <!-- Dark Logo-->
        <a href="index.html" class="logo logo-dark">
            <span class="logo-sm">
                <img src="/assets/images/logo-sm.png" alt="" height="22">
            </span>
            <span class="logo-lg">
                <img src="/assets/images/logo-dark.png" alt="" height="17">
            </span>
        </a>
        <!-- Light Logo-->
        <a href="index.html" class="logo logo-light">
            <span class="logo-sm">
                <img src="/assets/images/logo-sm.png" alt="" height="22">
            </span>
            <span class="logo-lg">
                <img src="/assets/images/logo-light.png" alt="" height="17">
            </span>
        </a>
        <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
            <i class="ri-record-circle-line"></i>
        </button>
    </div>

    <div id="scrollbar">
        <div class="container-fluid">

            <div id="two-column-menu">
            </div>
            <ul class="navbar-nav" id="navbar-nav">
                {#each menuItems as item}

                    {#if item.title}
                        <li class="menu-title"><span >{item.title}</span></li>
                    {/if}

                    {#each item.submenu as submenu}
                        <!-- {#if JSON.parse(sessionStorage.getItem("permissions")).includes(submenu.permission)} -->
                            {#if submenu.links.length > 0}
                                <li class="nav-item">
                                    <a class="nav-link menu-link" href="#sidebarDashboards" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                                        <i class="{submenu.icon}"></i> <span >{submenu.title}</span>
                                    </a>
                                    {#each submenu.links as link}
                                    <div class="collapse menu-dropdown" id="sidebarDashboards">
            
                                        <ul class="nav nav-sm flex-column">
                                            <li class="nav-item">
                                                <a href="dashboard-analytics.html" class="nav-link">{link}</a>
                                            </li>
                                        </ul>
                                        
                                    </div>
                                    {/each}    
                                </li>
                            {:else}


                            <li class="nav-item">
                                <a class="nav-link menu-link" class:active={$page.url.pathname.includes(submenu.route)} href="{submenu.route}"  role="button" aria-expanded="false" >
                                    <i class="{submenu.icon}"></i> <span >{submenu.title}</span>
                                </a>
                            </li>
                            {/if}
                        <!-- {/if} -->
                    
                    {/each}
                {/each}

            
        </div>
        <!-- Sidebar -->
    </div>

    <div class="sidebar-background"></div>
</div>