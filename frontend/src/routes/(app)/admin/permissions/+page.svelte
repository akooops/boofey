<script>
import Pagination from "$lib/components/Pagination.svelte";
import SearchTable from "$lib/components/SearchTable.svelte";
import PermissionsTable from "$lib/tables/PermissionsTable.svelte";
import AddPermissionModal from "$lib/modals/add/AddPermissionModal.svelte";
import { onMount } from "svelte";
import {initToolTip} from "$lib/init/initToolTip.js"
import { fade } from 'svelte/transition';
import { navigating } from '$app/stores';

export let data
$: permissionsList = data.permissionsResponse.data  
$: permissionsPagination = data.permissionsResponse.pagination

let permissionsPage

onMount(() => {
    initToolTip(permissionsPage)
})


</script>
<div class="row"  in:fade={{duration: 200 }} bind:this={permissionsPage} >
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1">Permissions Managment</h4>
                <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("permissions.store")}

                    <button type="button" data-bs-toggle="modal" data-bs-target="#addPermissionModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i> Add Permission</button>
                    <AddPermissionModal />
                    {/if}
                </div>
            </div><!-- end card header -->
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("permissions.index")}
            <div class="card-body">

                <!-- <div class="live-preview"> -->
                    <div class="row">
                            <!-- Input with Icon -->
                        <SearchTable type={"Permission"}/>
                        <PermissionsTable {permissionsList}/>
                        <Pagination {...permissionsPagination} />
                        <!--end col-->
                    </div>
                    <!--end row-->
                <!-- </div> -->
            </div><!-- end card-body -->
            {/if}
        </div><!-- end card -->
    </div>
    <!-- end col -->
</div>
