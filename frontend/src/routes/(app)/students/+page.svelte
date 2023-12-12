<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    import StudentsTable from "$lib/tables/parent/StudentsTable.svelte";
    import AddStudentModal from "$lib/modals/add/parent/AddStudentModal.svelte";
    import StudentCard from "./StudentCard.svelte"
	import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import {translation} from "$lib/translation.js"

    import DeleteStudentModal from "$lib/modals/delete/DeleteStudentModal.svelte"
	import ViewStudentModal from "$lib/modals/view/parent/ViewStudentModal.svelte";
	import EditStudentModal from "$lib/modals/edit/parent/EditStudentModal.svelte";
	import Qr from "./Qr.svelte";


    export let data
    $: studentsList = data.studentsResponse.data.students
    $: studentsPagination = data.studentsResponse.pagination
    let studentsPage 

    onMount(() => {
        initToolTip(studentsPage)
    })

    setContext('studentStore', {
	    studentStore: writable({})
    });



    import { goto } from '$app/navigation';

</script>
<div class="row"  in:fade={{duration: 200 }}  bind:this={studentsPage}>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1">{translation.studentsManagement[localStorage.getItem("language")]}</h4>
                <div class="flex-shrink-0">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addStudentModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>{translation.addStudent[localStorage.getItem("language")]}</button>
                    <AddStudentModal/>
                </div>
            </div>
            <Qr type={"parent"}/>
            <ViewStudentModal /> 
            <DeleteStudentModal />
            <EditStudentModal />
            <!-- <div class="card-body">

                    <div class="row">
                        <SearchTable type={translation.student[localStorage.getItem("language")]}/>
                        <StudentsTable {studentsList} />
                        <Pagination {...studentsPagination} />
                     
                        



                    </div>
            </div> -->

          
        </div>
    </div>

    {#each studentsList as student,_ (student.id)}
        <StudentCard {student} />
    {/each}

</div>
