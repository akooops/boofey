<script>
    import DeleteStudentModal from "$lib/modals/delete/DeleteStudentModal.svelte"

    import ModalSearchTable from "$lib/components/ModalSearchTable.svelte";
    import ModalPagination from "$lib/components/ModalPagination.svelte";
    import {PathGetSchools} from "$lib/api/paths.js"
    import {redirector} from "$lib/api/auth.js"
    import { createEventDispatcher } from 'svelte';
    import {translation} from "$lib/translation.js"

    import Accordion from "$lib/components/Accordion.svelte";

    const dispatch = createEventDispatcher();


    import { onMount } from "svelte";
        
    let schoolsList = []
    let schoolsPagination
    let page = 1 
    let searchQuery = ""
    export let selected = {}
    export let collapse
    export let title 

    let openCollapse


    async function fetchSchools(){
        console.log(page,searchQuery)
        let res = await fetch(PathGetSchools({page,search:searchQuery},"parent"),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`,
            }
        })

        redirector(res)


        let schoolsResponse = await res.json() 
        schoolsList = schoolsResponse.data
        schoolsPagination = schoolsResponse.pagination
    }

    onMount(() => {
        fetchSchools()
    })

    function selectSchool(school){
        selected = school
        dispatch("select",{schoolId:selected.id})
    }

    function unSelectSchool(){
        selected = {}
        dispatch("select",{schoolId:""})
        openCollapse()


    }  

    function search(e){
        page = 1
        searchQuery = e.detail.searchQuery
        console.log(page,e.detail.searchQuery)
        fetchSchools()
    }

    function switchPage(e){
        page = e.detail.page
        console.log(page,e.detail.searchQuery)
        fetchSchools()
    }


    export function resetSchool(){
        selected = {}
    }





</script>

{#if selected?.id}
<label for="productarName" class="form-label">{title}</label>

<div class="table-responsive mt-0">
    <table class="table align-middle table-nowrap mb-0 border-top">
        <tbody class="list align-middle">
            <tr class="bg-secondary-subtle">
                <th scope="col">{selected.id}</th>
                <th scope="col">
                    <div class="d-flex gap-2 align-items-center">
                        <div class="flex-shrink-0">
                            <img src={selected.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                        </div>
                        <div class="flex-grow-1">
                            {selected.name}
                        </div>
                    </div>
                </th>

                <th scope="col" class="text-center" >

                        <a href="javascript:void(0);" on:click={unSelectSchool} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-close-line"></i></a>
                </th>
            </tr>
        </tbody>
    </table>
</div>
{/if}
<div class:d-none={selected?.id != null}>
    {#if collapse}
        <Accordion id={"school"} {title} bind:openCollapse>               

        <ModalSearchTable type={translation.school[localStorage.getItem("language")]} on:search={search}/>
        <div class="row pe-0">
            <div class="table-responsive">
                <table class="table align-middle table-nowrap mb-0 border-top">
                    <thead class="table-light">
                        <tr scope="row">
                            <td scope="col">{translation.id[localStorage.getItem("language")]}</td>
                            <td scope="col">{translation.name[localStorage.getItem("language")]}</td>
                            <td scope="col">{translation.actions[localStorage.getItem("language")]}</td>
                        </tr>
                    </thead>
                    <tbody class="list">
                        {#each schoolsList as school}
                        <tr scope="row" class:bg-secondary-subtle={school.id == selected?.id}>
                            <td>{school.id}</td>
                            <td>
                            <div class="d-flex gap-2 align-items-center">
                                <div class="flex-shrink-0">
                                    <img src={school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                                </div>
                                <div class="flex-grow-1">
                                    {school.name}
                                </div>
                            </div>
                            </td>
                            <td>
                                <div class="hstack gap-3 flex-wrap">
                                    <a href="javascript:void(0);" on:click={() => selectSchool(school)} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-check-line"></i></a>
                                </div>
                            </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
        <ModalPagination {...schoolsPagination} on:switchPage={switchPage}/>
        </Accordion>
    {:else}
    <ModalSearchTable type={translation.school[localStorage.getItem("language")]} on:search={search}/>
        <div class="row pe-0">
            <div class="table-responsive">
                <table class="table align-middle table-nowrap mb-0 border-top">
                    <thead class="table-light">
                        <tr scope="row">
                            <td scope="col">{translation.id[localStorage.getItem("language")]}</td>
                            <td scope="col">{translation.name[localStorage.getItem("language")]}</td>
                            <td scope="col">{translation.actions[localStorage.getItem("language")]}</td>
                        </tr>
                    </thead>
                    <tbody class="list">
                        {#each schoolsList as school}
                        <tr scope="row" class:bg-secondary-subtle={school.id == selected?.id}>
                            <td>{school.id}</td>
                            <td>
                            <div class="d-flex gap-2 align-items-center">
                                <div class="flex-shrink-0">
                                    <img src={school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                                </div>
                                <div class="flex-grow-1">
                                    {school.name}
                                </div>
                            </div>
                            </td>
                            <td>
                                <div class="hstack gap-3 flex-wrap">
                                    <a href="javascript:void(0);" on:click={() => selectSchool(school)} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-check-line"></i></a>
                                </div>
                            </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
        <ModalPagination {...schoolsPagination} on:switchPage={switchPage}/>
        {/if}
</div>