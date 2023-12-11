<script>
    import DeleteStudentModal from "$lib/modals/delete/DeleteStudentModal.svelte"

    import ModalSearchTable from "$lib/components/ModalSearchTable.svelte";
    import ModalPagination from "$lib/components/ModalPagination.svelte";
    import {PathGetStudentsBySchool} from "$lib/api/paths.js"
    import {redirector} from "$lib/api/auth.js"
    import { createEventDispatcher } from 'svelte';
    import Accordion from "$lib/components/Accordion.svelte";


    const dispatch = createEventDispatcher();


    import { onMount } from "svelte";
        
    let studentsList = []
    let studentsPagination
    let page = 1 
    let searchQuery = ""
    export let selected = {}
    export let collapse
    export let title 
    export let schoolId

    let openCollapse



    async function fetchStudents(){
        let res = await fetch(PathGetStudentsBySchool(schoolId,{page,search:searchQuery},null,{subscribed:true,archived:false}),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)


        let studentsResponse = await res.json() 
        studentsList = studentsResponse.data.students
        studentsPagination = studentsResponse.pagination
    }

    onMount(() => {
        fetchStudents()
    })

    function selectStudent(student){
        selected = student
        dispatch("select",{studentId:selected.id})
    }

    function unSelectStudent(){
        selected = {}
        dispatch("select",{studentId:""})
        openCollapse()


    }  

    function search(e){
        page = 1
        searchQuery = e.detail.searchQuery
        fetchStudents()
    }

    function switchPage(e){
        page = e.detail.page
        fetchStudents()
    }

    export function resetStudent(){
        selected = {}
    }



</script>

{#if selected?.id}
<label for="productarName" class="form-label">{title}</label>

<div class="table-responsive mt-0">
    <table class="table align-middle table-nowrap mb-0 border-top">
        <tbody class="list align-middle">
            <tr class="bg-secondary-subtle">
                <th>{selected.id}</th>
                <th>
                <div class="d-flex gap-2 align-items-center">
                    <div class="flex-shrink-0">
                        <img src={selected.image.full_path} alt="" class="avatar-xs rounded-circle" />
                    </div>
                    <div class="flex-grow-1">
                        {selected.fullname}
                    </div>
                </div>
                </th>
                <th scope="col">
                    <div class="hstack gap-3 flex-wrap">
                        <a href="javascript:void(0);" on:click={unSelectStudent} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-close-line"></i></a>
                    </div>
                </th>
            </tr>
        </tbody>
    </table>
</div>
{/if}
<div class:d-none={selected?.id != null}>
    {#if collapse}
        <Accordion id={"student"} {title} bind:openCollapse>        
            <ModalSearchTable type={"Student"} on:search={search}/>
            <div class="row pe-0">
                <div class="table-responsive">
                    <table class="table align-middle table-nowrap mb-0 border-top">
                        <thead class="table-light">
                            <tr scope="row">
                                <td scope="col">ID</td>
                                <td scope="col">Full Name</td>
                                <td scope="col">Action</td>
                            </tr>
                        </thead>
                        <tbody class="list">
                            {#each studentsList as student}
                            <tr scope="row" class:bg-secondary-subtle={student.id == selected?.id}>
                                <td>{student.id}</td>
                                <td>
                                <div class="d-flex gap-2 align-items-center">
                                    <div class="flex-shrink-0">
                                        <img src={student.image.full_path} alt="" class="avatar-xs rounded-circle" />
                                    </div>
                                    <div class="flex-grow-1">
                                        {student.fullname}
                                    </div>
                                </div>
                                </td>
                                <td>
                                    <div class="hstack gap-3 flex-wrap">
                                        <a href="javascript:void(0);" on:click={() => selectStudent(student)} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-check-line"></i></a>
                                    </div>
                                </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalPagination {...studentsPagination} on:switchPage={switchPage}/>
        </Accordion>
    {:else}
    <ModalSearchTable type={"Student"} on:search={search}/>
    <div class="row pe-0">
        <div class="table-responsive">
            <table class="table align-middle table-nowrap mb-0 border-top">
                <thead class="table-light">
                    <tr scope="row">
                        <td scope="col">ID</td>
                        <td scope="col">Full Name</td>
                        <td scope="col">Action</td>
                    </tr>
                </thead>
                <tbody class="list">
                    {#each studentsList as student}
                    <tr scope="row" class:bg-secondary-subtle={student.id == selected?.id}>
                        <td>{student.id}</td>
                        <td>
                        <div class="d-flex gap-2 align-items-center">
                            <div class="flex-shrink-0">
                                <img src={student.image.full_path} alt="" class="avatar-xs rounded-circle" />
                            </div>
                            <div class="flex-grow-1">
                                {student.fullname}
                            </div>
                        </div>
                        </td>
                        <td>
                            <div class="hstack gap-3 flex-wrap">
                                <a href="javascript:void(0);" on:click={() => selectStudent(student)} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-check-line"></i></a>
                            </div>
                        </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
    <ModalPagination {...studentsPagination} on:switchPage={switchPage}/>
    {/if}
</div>