<script>

     let menuItems = [
    {
      title: "Admin",
      submenu: [
        { title: "Dashboards", links: ["Analytics", "CRM", "Ecommerce", "Crypto", "Projects", "NFT", "Job"] },
        { title: "Permissions", links: [],route:"/admin/permissions"},
        { title: "Roles", links: [], route:"/admin/roles"},
        { title: "Users", links: [], route:"/admin/users"},
        { title: "Schools", links: [], route:"/admin/schools"},
        { title: "Parents", links: [], route:"/admin/parents"},
        { title: "Students", links: [], route:"/admin/students"},

      ],
    },
    { title: "Pages",submenu: [], links: [] },
  ];


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
                    <li class="menu-title"><span >{item.title}</span></li>

                    {#each item.submenu as submenu}
                        {#if submenu.links.length > 0}
                            <li class="nav-item">
                                <a class="nav-link menu-link" href="#sidebarDashboards" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                                    <i class="ri-dashboard-2-line"></i> <span >{submenu.title}</span>
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
                            <a class="nav-link menu-link" href="{submenu.route}"  role="button" aria-expanded="false" >
                                <i class="ri-dashboard-2-line"></i> <span >{submenu.title}</span>
                            </a>
                        </li>
                        {/if}
                    
                        {/each}
                {/each}

            
        </div>
        <!-- Sidebar -->
    </div>

    <div class="sidebar-background"></div>
</div>