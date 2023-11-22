<script>
    import Pagination from "$lib/components/Pagination.svelte";    
    import SearchTable from "$lib/components/SearchTable.svelte";    
    import UsersTable from "$lib/tables/UsersTable.svelte";
    import AddUserModal from "$lib/modals/add/AddUserModal.svelte";
    import { onMount } from "svelte";
import { fade } from 'svelte/transition';
import {initToolTip} from "$lib/init/initToolTip.js"
import { phoneMask } from "$lib/inputMasks.js";
import { page } from '$app/stores';
import { goto } from '$app/navigation';


    export let data
    $: usersList = data.usersResponse.data.users
    $: usersPagination = data.usersResponse.pagination
    $: roles = data.usersResponse.data.roles
let usersPage


let verified = "all"

onMount(() => {
    initToolTip(usersPage)
    phoneMask()

    let state = $page.url.searchParams.get("verified")
    if(state != null){
        verified = state == "true" ? "verified" : "not verified"
    }

})

function toggleVerified(state){
        const url = new URL($page.url);
        url.searchParams.delete("page")

        if(verified == "all"){
            url.searchParams.delete("verified")
        }else {
            url.searchParams.set("verified",verified == "verified")
        }
        goto(url)
}


</script>
    <div class="row"  in:fade={{duration: 200 }} bind:this={usersPage}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">Users Managment</h4>
                    <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("users.store")}
                        <button type="button" data-bs-toggle="modal" data-bs-target="#addUserModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i> Add User</button>
                        <AddUserModal {roles}/>
                    {/if}
                        
                    </div>
                </div><!-- end card header -->
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("users.index")}
                <div class="card-body">
    
                    <!-- <div class="live-preview"> -->
                        
                            <SearchTable type={"User"}/>

                            <div class="col-xl-3 mb-3">
                                <select class="form-select" name="class" id="class" aria-label="Default select example" bind:value={verified} on:change={toggleVerified}>
                                    <option value={"all"}>All</option>
                                    <option value={"verified"}>Verified</option>
                                    <option value={"not verified"}>Not Verified</option>
                                </select>
                            </div>

                            
                            <UsersTable {usersList}/>
                            <Pagination {...usersPagination} />
                            <!--end col-->
                        
                        <!--end row-->
                    <!-- </div> -->
                </div><!-- end card-body -->
                {/if}
            </div><!-- end card -->
        </div>
        <!-- end col -->
    </div>