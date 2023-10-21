<script>
    import NavBar from "$lib/components/NavBar.svelte";
    import TopBar from "$lib/components/TopBar.svelte";
    import { browser } from '$app/environment';
    import {initApp} from "$lib/init/initApp.js"
	import { onMount } from "svelte";
	import BreadCrumbs from "$lib/components/BreadCrumbs.svelte";
    import { page } from '$app/stores';
    
    export let data 
    $: user = data.userResponse.data.user
    $: {
        const permissionNames = user.roles[0].permissions.map(permission => permission.name);    
        sessionStorage.setItem("permissions",JSON.stringify(permissionNames))
        
    }

    onMount(() => {
        initApp()
    })

</script>


    
    <div id="layout-wrapper">
    
    
    <TopBar {user}/>
    <NavBar {user}/>
    
        <!-- ========== App Menu ========== -->
    <div class="vertical-overlay"></div>
    <!-- Left Sidebar End -->
    
    <!-- right content  start -->
    
        <div class="main-content">
            <div class="page-content">
                <div class="container-fluid">
                     <!-- start page title -->
                     <BreadCrumbs />
                    <!-- end page title --> 
                    <slot /> 
                </div>
            </div>
        </div>
    </div>
    {#if browser}
        <script>


        </script>
    {/if}
    {@html ''}
    
    