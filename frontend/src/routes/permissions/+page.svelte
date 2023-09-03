<script>
import Pagination from "$lib/components/Pagination.svelte";
import PermissionTable from "$lib/tables/PermissionTable.svelte";
import AddPermissionModal from "$lib/modals/AddPermissionModal.svelte";
export let data
$: permissionsList = data.permissionsResponse.data  
$: permissionsPagination = data.permissionsResponse.pagination

let path = "$lib"
import { browser } from '$app/environment';

// onMount(() => {
//     import("$lib/assets/libs/bootstrap/js/bootstrap.bundle.min.js")
//     import("$lib/assets/js/plugins.js")
//     // import("$lib/assets/js/app.js")
// })

</script>
<div class="row">
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1">My Permissions</h4>
                <div class="flex-shrink-0">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addPermisionModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i> Add Permission</button>
                    <AddPermissionModal />
                </div>
            </div><!-- end card header -->

            <div class="card-body">

                <!-- <div class="live-preview"> -->
                    <div class="row">
                            <!-- Input with Icon -->
                            <div class="row mb-4">
                                <div class="col-xxl-3 col-md-6">
                                    <div class="form-icon">
                                        <input type="email" class="form-control form-control-icon" id="iconInput" placeholder="Search for permission...">
                                        <i class="ri-search-line"></i>
                                    </div>
                                </div>
                            </div>
                        <PermissionTable {permissionsList}/>
                        <Pagination {...permissionsPagination} />
                        <!--end col-->
                    </div>
                    <!--end row-->
                <!-- </div> -->
            </div><!-- end card-body -->
        </div><!-- end card -->
    </div>
    <!-- end col -->
</div>

