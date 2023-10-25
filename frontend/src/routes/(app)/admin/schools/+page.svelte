<script>
import Pagination from "$lib/components/Pagination.svelte";
import SearchTable from "$lib/components/SearchTable.svelte";

import SchoolsTable from "$lib/tables/SchoolsTable.svelte";
import AddSchoolModal from "$lib/modals/add/AddSchoolModal.svelte";
import { onMount } from "svelte";
import { fade } from 'svelte/transition';
import {initToolTip} from "$lib/init/initToolTip.js"
export let data

$: schoolsList = data.schoolsResponse.data  
$: schoolsPagination = data.schoolsResponse.pagination
let schoolsPage
onMount(() => {
    initToolTip(schoolsPage)
})

</script>
<div class="row"  in:fade={{duration: 200 }} bind:this={schoolsPage}>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1">Schools Managment</h4>
                <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("schools.store")}
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addSchoolModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add School</button>
                    <AddSchoolModal />
                    {/if}
                </div>
            </div><!-- end card header -->
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("schools.index")}

            <div class="card-body">

                <!-- <div class="live-preview"> -->
                    <div class="row">
                            <!-- Input with Icon -->
                        <SearchTable type={"School"}/>
                        <SchoolsTable {schoolsList}/>
                        <Pagination {...schoolsPagination} />
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

