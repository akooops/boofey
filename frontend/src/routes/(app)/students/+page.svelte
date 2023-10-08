<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    import StudentsTable from "$lib/tables/parent/StudentsTable.svelte";
    import AddStudentModal from "$lib/modals/add/parent/AddStudentModal.svelte";
	import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { fade } from 'svelte/transition';

    export let data
    $: studentsList = data.studentsResponse.data.students
    $: studentsPagination = data.studentsResponse.pagination
    let studentsPage 

    onMount(() => {
        initToolTip(studentsPage)
    })

    import { goto } from '$app/navigation';

    function go(){
        // goto(`/students/2/subscriptions`)

    }
</script>
<div class="row" in:fade={{delay:200,duration: 200 }} out:fade={{duration: 200 }}  bind:this={studentsPage}>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1">Students Managment</h4>
                <div class="flex-shrink-0">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addStudentModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i> Add Student</button>
                    <AddStudentModal/>
                </div>
            </div>

            <div class="card-body" on:click={go}>

                <!-- <div class="live-preview"> -->
                    <div class="row">
                            <!-- Input with Icon -->
                        <SearchTable type={"Student"}/>
                        <StudentsTable {studentsList} />
                        <Pagination {...studentsPagination} />
                        <!--end col-->
                    </div>
                    <!--end row-->
                <!-- </div> -->
            </div><!-- end card-body -->
        </div><!-- end card -->
    </div>
    <!-- end col -->
</div>
