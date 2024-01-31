
<script>
    import DeleteStudentModal from "$lib/modals/delete/DeleteStudentModal.svelte"

    import ModalSearchTable from "$lib/components/ModalSearchTable.svelte";
    import ModalPagination from "$lib/components/ModalPagination.svelte";
    import {PathGetDivisions} from "$lib/api/paths.js"
    import {redirector} from "$lib/api/auth.js"
    import { createEventDispatcher } from 'svelte';
    import Accordion from "$lib/components/Accordion.svelte";

    const dispatch = createEventDispatcher();


    import { onMount } from "svelte";
    export let schoolId    
    let divisionsList = []
    let divisionsPagination
    let page = 1 
    
    let searchQuery = ""
    export let selected = {}
    export let type 
    export let collapse
    export let title 

    let openCollapse

    async function fetchDivisions(){
        let res = await fetch(PathGetDivisions(schoolId,{page,search:searchQuery}),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)


        let divisionsResponse = await res.json() 
        divisionsList = divisionsResponse.data.divisions
        
        divisionsPagination = divisionsResponse.pagination
    }

    $: if(schoolId){
        fetchDivisions()
    }

    function selectDivision(division){
        selected = division
        dispatch("select",{divisionId:selected.id,division:selected})
    }

    function unSelectDivision(){
        selected = {}
        dispatch("select",{divisionId:""})
        openCollapse()

    }  

    function search(e){
        page = 1
        searchQuery = e.detail.searchQuery
        fetchDivisions()
    }

    function switchPage(e){
        page = e.detail.page
        fetchDivisions()
    }


    export function resetDivision(){
        selected = {}
    }



</script>


    {#if selected?.id && schoolId}
    <label for="productarName" class="form-label">{title}</label>

    <div class="table-responsive mt-0">
        <div class="table-responsive">
            <table class="table align-middle table-nowrap mb-0 border-top">
                <tbody class="list align-middle">
                    <tr class="bg-secondary-subtle">
                        <th scope="col">{selected.id}</th>
                        <th>{selected.name}
                        <th>{selected.name_ar}</th>
                        <th scope="col">
                            <div class="hstack gap-3 flex-wrap">
                                <a href="javascript:void(0);" on:click={unSelectDivision} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-close-line"></i></a>
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    {/if}
    <div class:d-none={selected?.id != null && (schoolId != null && schoolId != "")}>
      
        {#if collapse}
            <Accordion id={"division"} {title} bind:openCollapse>        
                {#if schoolId}

                <ModalSearchTable type={"Division"} on:search={search}/>
                <div class="row pe-0">
                    <div class="table-responsive">
                        <table class="table align-middle table-nowrap mb-0 border-top">
                            <thead class="table-light">
                                <tr scope="row">
                                    <td scope="col">ID</td>
                                    <td scope="col">Name</td>
                                    <td scope="col">Arabic Name</td>
                                    <td scope="col">Action</td>
                                </tr>
                            </thead>
                            <tbody class="list">
                                {#each divisionsList as division}
                                <tr scope="row" class:bg-secondary-subtle={division.id == selected?.id}>
                                    <td>{division.id}</td>
                                    <td>{division.name}
                                    <td>{division.name_ar}</td>
                                    <td>
                                        <div class="hstack gap-3 flex-wrap">
                                            <a href="javascript:void(0);" on:click={() => selectDivision(division)} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-check-line"></i></a>
                                        </div>
                                    </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ModalPagination {...divisionsPagination} on:switchPage={switchPage}/>
                {:else}
                <!-- Warning Alert -->
                <div class="alert alert-warning alert-border-left alert-dismissible fade show" role="alert">
                    <i class="ri-alert-line me-3 align-middle"></i> <strong>Warning</strong> - Please select a school first 
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>

                {/if}
            </Accordion>
          
        {/if}
    </div>
