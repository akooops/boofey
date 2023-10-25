<script>
    import DeleteStudentModal from "$lib/modals/delete/DeleteStudentModal.svelte"

    import ModalSearchTable from "$lib/components/ModalSearchTable.svelte";
    import ModalPagination from "$lib/components/ModalPagination.svelte";
    import {PathGetCanteens} from "$lib/api/paths.js"
    import {redirector} from "$lib/api/auth.js"
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();


    import { onMount } from "svelte";
        
    let canteenUsersList = []
    let canteenUsersPagination
    let page = 1 
    let searchQuery = ""
    export let selected = {}

    async function fetchCanteenUsers(){
        let res = await fetch(`${PathGetCanteens(null,{page,search:searchQuery})}`,{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)


        let canteenUsersResponse = await res.json() 
        canteenUsersList = canteenUsersResponse.data.canteens
        canteenUsersPagination = canteenUsersResponse.pagination
    }

    onMount(() => {
        fetchCanteenUsers()
    })

    function selectCanteenUser(canteenUser){
        selected = canteenUser
        dispatch("select",{canteenUser:selected})
    }

    function unSelectCanteenUser(){
        selected = {}
        dispatch("select",{canteenUser:selected})

    }  

    function search(e){
        page = 1
        searchQuery = e.detail.searchQuery
        fetchCanteenUsers()
    }

    function switchPage(e){
        page = e.detail.page
        fetchCanteenUsers()
    }

    export function resetCanteenUser(){
        selected = {}
    }



</script>

{#if selected?.id}
<div class="row pe-0 mb-3">
    <div class="table-responsive">
        <table class="table align-middle table-nowrap mb-0 border-top">
            <tbody class="list align-middle">
                <tr class="bg-secondary-subtle">
                    <th>{selected.id}</th>
                    <th>{selected.name}</th>
                    <th> 
                        <div class="d-flex gap-2 align-items-center">
                            <div class="flex-shrink-0">
                                <img src={selected.school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                            </div>
                            <div class="flex-grow-1">
                                {selected.school.name}
                            </div>
                        </div>
                    </th>
                    <th>{selected.address}%</th>
                    <th scope="col">
                        <div class="hstack gap-3 flex-wrap">
                            <a href="javascript:void(0);" on:click={unSelectCanteenUser} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-close-line"></i></a>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</div>
{/if}

<ModalSearchTable type={"CanteenUser"} on:search={search}/>
<div class="row pe-0">
    <div class="table-responsive">
        <table class="table align-middle table-nowrap mb-0 border-top">
            <thead class="table-light">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">School</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody class="list">
                {#each canteenUsersList as canteenUser}
                <tr scope="row" class:bg-secondary-subtle={canteenUser.id == selected?.id}>
                    <td>{canteenUser.id}</td>
                    <td>{canteenUser.name}</td>
                    <td>
                        <div class="d-flex gap-2 align-items-center">
                            <div class="flex-shrink-0">
                                <img src={canteenUser.school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                            </div>
                            <div class="flex-grow-1">
                                {canteenUser.school.name}
                            </div>
                        </div>
                    </td>
                    <td>{canteenUser.address}</td>
                    <td>
                        <div class="hstack gap-3 flex-wrap">
                            <a href="javascript:void(0);" on:click={() => selectCanteenUser(canteenUser)} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-check-line"></i></a>
                        </div>
                    </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
<ModalPagination {...canteenUsersPagination} on:switchPage={switchPage}/>