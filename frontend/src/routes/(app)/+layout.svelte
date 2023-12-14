<script>
    import NavBar from "$lib/components/NavBar.svelte";
    import TopBar from "$lib/components/TopBar.svelte";
    import { browser } from '$app/environment';
    import {initApp} from "$lib/init/initApp.js"
	import { onMount } from "svelte";
	import BreadCrumbs from "$lib/components/BreadCrumbs.svelte";
    import { page } from '$app/stores';
import { navigating } from '$app/stores';
    
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
    <!-- {#if user.roles[0].name != "pos"} -->
        <NavBar {user}/>
    <!-- {/if} -->
    
        <!-- ========== App Menu ========== -->
    <div class="vertical-overlay"></div>
    <!-- Left Sidebar End -->
    
    <!-- right content  start -->
    
        <div class="main-content">
            <div class="page-content">
                <div class="container-fluid">
                     <!-- start page title -->
                     <BreadCrumbs {data}/>
                    <!-- end page title --> 
                    <div class:d-none={!($navigating == null || $navigating?.from?.route?.id == $navigating?.to?.route?.id)}>
                        <slot /> 
                    </div>
                    {#if $navigating?.from?.route?.id != $navigating?.to?.route?.id  && $navigating}
                        <div class="text-center">
                            <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
    {#if browser}
        <script>


        </script>
    {/if}
    {@html ''}
    
    