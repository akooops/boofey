<script>
import NavBar from "$lib/components/NavBar.svelte";
	import TopBar from "$lib/components/TopBar.svelte";
	import { onMount } from "svelte";


export let data 
$: user = data.userResponse.data.user
$: console.log(user)


</script>


<div id="layout-wrapper">


<TopBar {user}/>
<NavBar />

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

{@html `<script src="/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>`}
{@html ` <script src="/assets/libs/simplebar/simplebar.min.js"></script>`}
{@html `<script src="/assets/libs/node-waves/waves.min.js"></script>`}
{@html ` <script src="/assets/libs/feather-icons/feather.min.js"></script>`}
{@html ` <script src="/assets/js/pages/plugins/lord-icon-2.1.0.js"></script>`}
{@html ` <script src="/assets/js/plugins.js"></script>`}
{@html `<script src="/assets/js/app.js"></script>`}


