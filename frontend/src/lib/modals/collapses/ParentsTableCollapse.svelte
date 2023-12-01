<script>
    import DeleteStudentModal from "$lib/modals/delete/DeleteStudentModal.svelte"

    import ModalSearchTable from "$lib/components/ModalSearchTable.svelte";
    import ModalPagination from "$lib/components/ModalPagination.svelte";
    import {PathGetParents} from "$lib/api/paths.js"
    import {redirector} from "$lib/api/auth.js"
    import { createEventDispatcher } from 'svelte';
    import Accordion from "$lib/components/Accordion.svelte";

    const dispatch = createEventDispatcher();


    import { onMount } from "svelte";
        
    let parentsList = []
    let parentsPagination
    let page = 1 
    let searchQuery = ""
    export let selected = {}
    export let title 
    export let collapse
    let openCollapse

    async function fetchParents(){
        let res = await fetch(PathGetParents({page,search:searchQuery}),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)


        let parentsResponse = await res.json() 
        parentsList = parentsResponse.data.fathers
        parentsPagination = parentsResponse.pagination
    }

    onMount(() => {
        fetchParents()
    })

    function selectParent(parent){
        selected = parent
        dispatch("select",{parentId:selected.id})
    }

    function unSelectParent(){
        selected = {}
        dispatch("select",{parentId:""})
        openCollapse()

    }  

    function search(e){
        page = 1
        searchQuery = e.detail.searchQuery
        fetchParents()
    }

    function switchPage(e){
        page = e.detail.page
        fetchParents()
    }

    export function resetParent(){
        selected = {}
    }



</script>

{#if selected?.id}
<label for="productarName" class="form-label">{title}</label>
<div class="table-responsive mt-0">
    <div class="table-responsive">
        <table class="table align-middle table-nowrap mb-0 border-top">
            <tbody class="list align-middle">
                <tr class="bg-secondary-subtle">
                    <th scope="col">{selected.id}</th>
                    <th scope="col">
                        <div class="d-flex gap-2 align-items-center">
                            <div class="flex-shrink-0">
                                <img src={selected.user.profile.image.full_path} alt="" class="avatar-xs rounded-circle" />
                            </div>
                            <div class="flex-grow-1">
                                {selected.user.profile.fullname}
                            </div>
                        </div>
                    </th>
                    <th scope="col">{selected.user.email}</th>
                    <th scope="col">{selected.user.phone}</th>
                    <th scope="col">
                        <div class="hstack gap-3 flex-wrap">
                            <a href="javascript:void(0);" on:click={unSelectParent} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-close-line"></i></a>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</div>
{/if}
<div class:d-none={selected?.id != null}>
    {#if collapse}
        <Accordion id={"parent"} {title} bind:openCollapse>      
            <ModalSearchTable type={"Parent"} on:search={search}/>
            <div class="row pe-0">
                <div class="table-responsive">
                    <table class="table align-middle table-nowrap mb-0 border-top">
                        <thead class="table-light">
                            <tr scope="row">
                                <td scope="col">ID</td>
                                <td scope="col">Username</td>
                                <td scope="col">Email</td>
                                <td scope="col">Phone</td>
                                <td scope="col">Action</td>
                            </tr>
                        </thead>
                        <tbody class="list">
                            {#each parentsList as parent}
                            <tr scope="row" class:bg-secondary-subtle={parent.id == selected?.id}>
                                <td>{parent.id}</td>
                                <td>
                                <div class="d-flex gap-2 align-items-center">
                                    <div class="flex-shrink-0">
                                        <img src={parent.user.profile.image.full_path} alt="" class="avatar-xs rounded-circle" />
                                    </div>
                                    <div class="flex-grow-1">
                                        {parent.user.username}
                                    </div>
                                </div>
                                </td>
                                <td>{parent.user.email}</td>
                                <td>{parent.user.phone}</td>
                                <td>
                                    <div class="hstack gap-3 flex-wrap">
                                        <a href="javascript:void(0);" on:click={() => selectParent(parent)} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-check-line"></i></a>
                                    </div>
                                </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalPagination {...parentsPagination} on:switchPage={switchPage}/>
        </Accordion>
    {:else}
    <ModalSearchTable type={"Parent"} on:search={search}/>
    <div class="row pe-0">
        <div class="table-responsive">
            <table class="table align-middle table-nowrap mb-0 border-top">
                <thead class="table-light">
                    <tr scope="row">
                        <td scope="col">ID</td>
                        <td scope="col">Username</td>
                        <td scope="col">Email</td>
                        <td scope="col">Phone</td>
                        <td scope="col">Action</td>
                    </tr>
                </thead>
                <tbody class="list">
                    {#each parentsList as parent}
                    <tr scope="row" class:bg-secondary-subtle={parent.id == selected?.id}>
                        <td>{parent.id}</td>
                        <td>
                        <div class="d-flex gap-2 align-items-center">
                            <div class="flex-shrink-0">
                                <img src={parent.user.profile.image.full_path} alt="" class="avatar-xs rounded-circle" />
                            </div>
                            <div class="flex-grow-1">
                                {parent.user.username}
                            </div>
                        </div>
                        </td>
                        <td>{parent.user.email}</td>
                        <td>{parent.user.phone}</td>
                        <td>
                            <div class="hstack gap-3 flex-wrap">
                                <a href="javascript:void(0);" on:click={() => selectParent(parent)} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-check-line"></i></a>
                            </div>
                        </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
    <ModalPagination {...parentsPagination} on:switchPage={switchPage}/>
{/if}
</div>
