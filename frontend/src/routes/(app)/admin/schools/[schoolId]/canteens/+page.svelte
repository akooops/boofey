<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    import CanteensTable from "$lib/tables/CanteensTable.svelte";
    import AddCanteenModal from "$lib/modals/add/AddCanteenModal.svelte";
	import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { setContext } from 'svelte';
import { fade } from 'svelte/transition';
    import { writable } from 'svelte/store';

    export let data
    $: canteensList = data.canteensResponse.data.canteens
    $: school = data.canteensResponse.data.school  
    $: canteensPagination = data.canteensResponse.pagination

    let canteensPage
    onMount(() => {
        initToolTip(canteensPage)
        // InitFlatPickr()
    })

    setContext('apiStore', {
	    apiStore: writable("")
    });

    setContext('canteenStore', {
	    canteenStore: writable({})
    });


    
</script>
<div class="row"  in:fade={{duration: 200 }} bind:this={canteensPage}>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex">

                <div class="d-flex gap-2 align-items-center flex-grow-1">
                <div class="flex-shrink-0">
                    <img src={school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                </div>
                <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">{school.name}'s</span> Canteens Management</h4>
            </div> 

               
                <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.storeBySchool")}
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addCanteenModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Canteen</button>
                    <AddCanteenModal schoolId={school.id}/>
                    {/if}
                </div>
            </div><!-- end card header -->
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.indexBySchool")}

            <div class="card-body">

                <!-- <div class="live-preview"> -->
                    <div class="row">
                            <!-- Input with Icon -->
                        <SearchTable type={"Canteen"}/>
                        <CanteensTable {canteensList}/>
                        <Pagination {...canteensPagination} />
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

<!-- src="https://boofey.akoops.com/uploads/schools/_5607de8d-e2d4-47e3-a808-d54851903b65.jpeg"
<div class="d-flex gap-2 align-items-center">
    <div class="flex-shrink-0">
        <img src={school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
    </div>
    <div class="flex-grow-1">
        {school.name}
    </div>
</div> -->

    