<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    import StudentsTable from "$lib/tables/StudentsTable.svelte";
    import AddStudentModal from "$lib/modals/add/AddStudentModal.svelte";
	import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';

    export let data
    $: studentsList = data.studentsResponse.data.students
    $: studentsPagination = data.studentsResponse.pagination

    let studentsPage
    onMount(() => {
        initToolTip(studentsPage)
        // InitFlatPickr()
    })


    
</script>
<div class="row" bind:this={studentsPage}>
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

    