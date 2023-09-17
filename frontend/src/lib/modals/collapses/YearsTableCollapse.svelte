
<script>
    import DeleteStudentModal from "$lib/modals/delete/DeleteStudentModal.svelte"

    import ModalSearchTable from "$lib/components/ModalSearchTable.svelte";
    import ModalPagination from "$lib/components/ModalPagination.svelte";
    import {PathGetAcademicYears} from "$lib/api/paths.js"
    import {redirector} from "$lib/api/auth.js"
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();


    import { onMount } from "svelte";
    export let schoolId    
    let yearsList = []
    let yearsPagination
    let page = 1 
    
    let searchQuery = ""
    let selected = {}

    async function fetchYears(){
        console.log(page,searchQuery)
        let res = await fetch(PathGetAcademicYears(schoolId,{page,search:searchQuery}),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)


        let yearsResponse = await res.json() 
        yearsList = yearsResponse.data.academicYears
        console.log(yearsList)
        
        yearsPagination = yearsResponse.pagination
    }

    $: if(schoolId){
        fetchYears()
    }

    function selectYear(year){
        selected = year
        dispatch("select",{yearId:selected.id})
    }

    function unSelectYear(){
        selected = {}
        dispatch("select",{yearId:""})

    }  

    function search(e){
        page = 1
        searchQuery = e.detail.searchQuery
        console.log(page,e.detail.searchQuery)
        fetchYears()
    }

    function switchPage(e){
        page = e.detail.page
        console.log(page,e.detail.searchQuery)
        fetchYears()
    }


    export function resetYear(){
        selected = {}
    }



</script>

{#if schoolId}


{#if selected?.id}

<div class="row pe-0 mb-3">
    <div class="table-responsive">
        <table class="table align-middle table-nowrap mb-0 border-top">
            <tbody class="list align-middle">
                <tr class="bg-secondary-subtle">
                    <th scope="col">{selected.id}</th>
                    <th>{selected.name}
                    {#if selected.current}
                    <span class="badge bg-success-subtle text-success ms-1">Current</span>
                    {/if}
                    </th>
                    <th>{selected.from}</th>
                    <th>{selected.to}</th>
                    <th scope="col">
                        <div class="hstack gap-3 flex-wrap">
                            <a href="javascript:void(0);" on:click={unSelectYear} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-close-line"></i></a>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</div>
{/if}

<ModalSearchTable type={"Year"} on:search={search}/>
<div class="row pe-0">
    <div class="table-responsive">
        <table class="table align-middle table-nowrap mb-0 border-top">
            <thead class="table-light">
                <tr scope="row">
                    <td scope="col">ID</td>
                    <td scope="col">Name</td>
                    <td scope="col">From</td>
                    <td scope="col">To</td>
                    <td scope="col">Action</td>
                </tr>
            </thead>
            <tbody class="list">
                {#each yearsList as year}
                <tr scope="row" class:bg-secondary-subtle={year.id == selected?.id}>
                    <td>{year.id}</td>
                    <td>{year.name}
                    {#if year.current}
                    <!-- <span class="badge bg-warning">Current</span> -->
                    <span class="badge bg-success-subtle text-success ms-1">Current</span>

                    {/if}
                    </td>
                    <td>{year.from}</td>
                    <td>{year.to}</td>
                    <td>
                        <div class="hstack gap-3 flex-wrap">
                            <a href="javascript:void(0);" on:click={() => selectYear(year)} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-check-line"></i></a>
                        </div>
                    </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
<ModalPagination {...yearsPagination} on:switchPage={switchPage}/>

{:else}
<!-- Warning Alert -->
<div class="alert alert-warning alert-border-left alert-dismissible fade show" role="alert">
    <i class="ri-alert-line me-3 align-middle"></i> <strong>Warning</strong> - Please select a school first 
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

{/if}