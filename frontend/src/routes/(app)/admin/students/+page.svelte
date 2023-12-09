<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    import StudentsTable from "$lib/tables/StudentsTable.svelte";
    import AddStudentModal from "$lib/modals/add/AddStudentModal.svelte";
	import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    export let data
    $: studentsList = data.studentsResponse.data.students
    $: studentsPagination = data.studentsResponse.pagination

    let archived = "all"
    let subscribed = "all"

    let studentsPage
    onMount(() => {
        initToolTip(studentsPage)

        let state = $page.url.searchParams.get("archived")
        if(state != null){
            archived = state == "true" ? "archived" : "not archived"
        }
        state = $page.url.searchParams.get("subscribed")
        if(state != null){
            subscribed = state == "true" ? "subscribed" : "not subscribed"
        }

    
        
        // InitFlatPickr()
    })

    function toggleFilters(state){
            const url = new URL($page.url);
            url.searchParams.delete("page")

            if(archived == "all"){
                url.searchParams.delete("archived")
            }else {
                url.searchParams.set("archived",archived == "archived")
            }
            if(subscribed == "all"){
                url.searchParams.delete("subscribed")
            }else {
                url.searchParams.set("subscribed",subscribed == "subscribed")
            }
            
            goto(url)
    }


    
</script>
<div class="row "  in:fade={{duration: 200 }} bind:this={studentsPage}>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1">Students Managment</h4>
                <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("students.store")}
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addStudentModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i> Add Student</button>
                    <AddStudentModal />
                    {/if}
                </div>
            </div>
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("students.index")}
            <div class="card-body">

                <!-- <div class="live-preview"> -->
                    <div class="row">
                            <!-- Input with Icon -->
                        <SearchTable type={"Student"}/>

                        <div class="col-xl-3 mb-3">
                            <select class="form-select" name="class" id="class" aria-label="Default select example" bind:value={archived} on:change={toggleFilters}>
                                <option value={"all"}>All</option>
                                <option value={"archived"}>Archived</option>
                                <option value={"not archived"}>Not Archived</option>
                            </select>
                        </div>
                        <div class="col-xl-3 mb-3">
                            <select class="form-select" name="class" id="class" aria-label="Default select example" bind:value={subscribed} on:change={toggleFilters}>
                                <option value={"all"}>All</option>
                                <option value={"subscribed"}>Subscribed</option>
                                <option value={"not subscribed"}>Not Subscribed</option>
                            </select>
                        </div>


                       
                        
                        <!-- <div class="row ps-4 mb-2">
                            <div class="form-check form-switch col" >
                                <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={archived} on:change={toggleArchived} >
                                <label class="form-check-label" for="SwitchCheck1">Show archived</label>
                            </div>

                        </div> -->
                        <StudentsTable {studentsList}/>
                        <Pagination {...studentsPagination} />
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

    