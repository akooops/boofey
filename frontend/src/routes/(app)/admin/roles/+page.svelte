<script>
    import Pagination from "$lib/components/Pagination.svelte";    
    import RolesTable from "$lib/tables/RolesTable.svelte";
    import AddRoleModal from "$lib/modals/add/AddRoleModal.svelte";
	import SearchTable from "$lib/components/SearchTable.svelte";
    import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { fade,blur } from 'svelte/transition';

    export let data
    $: rolesList = data.rolesResponse.data.roles
    $: rolesPagination = data.rolesResponse.pagination
    $: permissions = data.rolesResponse.data.permissions
    let rolesPage
    onMount(() => {
        initToolTip(rolesPage)
    })

</script>
    <div class="row" in:fade={{delay:200,duration: 200 }} out:fade={{duration: 200 }} bind:this={rolesPage}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">Roles Managment</h4>
                    <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("roles.store")}

                        <button type="button" data-bs-toggle="modal" data-bs-target="#addRoleModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i> Add Role</button>
                        <AddRoleModal {permissions}/>
                    {/if}
                    </div>
                </div><!-- end card header -->
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("roles.index")}
                <div class="card-body">
    
                    <!-- <div class="live-preview"> -->
                        <div class="row">
                                <!-- Input with Icon -->
                            <SearchTable type={"Role"}/>
                            <RolesTable {rolesList}/>
                            <Pagination {...rolesPagination} />
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