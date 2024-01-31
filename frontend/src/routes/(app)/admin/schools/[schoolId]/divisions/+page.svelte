<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    import DivisionsTable from "./DivisionsTable.svelte";
    import AddDivisionModal from "./AddDivisionModal.svelte";
	import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { setContext } from 'svelte';
import { fade } from 'svelte/transition';
    import { writable } from 'svelte/store';

    export let data
    $: divisionsList = data.divisionsResponse.data.divisions
    $: school = data.divisionsResponse.data.school
    $: divisionsPagination = data.divisionsResponse.pagination

    let divisionsPage
    onMount(() => {
        initToolTip(divisionsPage)
        // InitFlatPickr()
    })

    setContext('divisionStore', {
	    divisionStore: writable({})
    });


    
</script>
<div class="row"  in:fade={{duration: 200 }} bind:this={divisionsPage}>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex">

                <div class="d-flex gap-2 align-items-center flex-grow-1">
                <div class="flex-shrink-0">
                    <img src={school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                </div>
                <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">{school.name}'s</span> Divisions Management</h4>
            </div> 

               
                <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("divisions.store")}
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addDivisionModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Division</button>
                        <AddDivisionModal schoolId={school.id}/>
                    {/if}
                </div>
            </div><!-- end card header -->
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("divisions.index")}

            <div class="card-body">

                <!-- <div class="live-preview"> -->
                    <div class="row">
                            <!-- Input with Icon -->
                        <SearchTable type={"Division"}/>
                        <DivisionsTable {divisionsList}/>
                        <Pagination {...divisionsPagination} />
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

    