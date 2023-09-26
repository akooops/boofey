<script>
    import NavBar from "$lib/components/NavBar.svelte";
        import TopBar from "$lib/components/TopBar.svelte";
        import { browser } from '$app/environment';
    
    
    export let data 
    $: user = data.userResponse.data.user
    $: sessionStorage.setItem("type", user.roles[0].name);


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
                     <div class="row">
                        <div class="col-12">
                            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 class="mb-sm-0">Permissions</h4>
    
                                <div class="page-title-right">
                                    <ol class="breadcrumb m-0">
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Admin</a></li>
                                        <li class="breadcrumb-item active">Permissions</li>
                                    </ol>
                                </div>
    
                            </div>
                        </div>
                    </div>
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
    
    