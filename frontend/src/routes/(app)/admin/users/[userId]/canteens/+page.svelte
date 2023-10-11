<script>
    import Pagination from "$lib/components/Pagination.svelte";    
    import SearchTable from "$lib/components/SearchTable.svelte";    
    import CanteenUsersTable from "$lib/tables/CanteenUsersTable.svelte";
    import AddCanteenUserModal from "$lib/modals/add/AddCanteenUserModal.svelte";
    import { onMount } from "svelte";
import { fade } from 'svelte/transition';
import {initToolTip} from "$lib/init/initToolTip.js"

    export let data
    $: canteensList = data.canteenUsersResponse.data.canteens
    $: canteenUsersPagination = data.canteenUsersResponse.pagination
    $: user = data.canteenUsersResponse.data.user
    let canteenUsersPage
    onMount(() => {
        initToolTip(canteenUsersPage)
    })

</script>
    <div class="row" in:fade={{delay:200,duration: 200 }} out:fade={{duration: 200 }} bind:this={canteenUsersPage}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <div class="d-flex gap-2 align-items-center flex-grow-1">
                        <div class="flex-shrink-0">
                            <img src={user.profile.image.full_path} alt="user's image " class="avatar-xs rounded-circle" />
                        </div>
                        <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">{user.profile.fullname}'s</span> - Canteens Managment</h4>
                    </div> 
                   
                    <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteenUsers.store")}
                        <button type="button" data-bs-toggle="modal" data-bs-target="#addCanteenUserModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i> Add Canteen</button>
                        <AddCanteenUserModal userId={user.id} />
                    {/if}
                        
                    </div>
                </div><!-- end card header -->
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteenUsers.index")}
                <div class="card-body">
    
                    <!-- <div class="live-preview"> -->
                        
                            <SearchTable type={"Canteen"}/>
                            <CanteenUsersTable {canteensList}/>
                            <Pagination {...canteenUsersPagination} />
                            <!--end col-->
                        
                        <!--end row-->
                    <!-- </div> -->
                </div><!-- end card-body -->
                {/if}
            </div><!-- end card -->
        </div>
        <!-- end col -->
    </div>