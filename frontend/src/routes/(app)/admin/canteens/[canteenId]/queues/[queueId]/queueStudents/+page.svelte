<script>
    import Pagination from "$lib/components/Pagination.svelte";    
    import SearchTable from "$lib/components/SearchTable.svelte";    
    import QueueStudentsTable from "$lib/tables/QueueStudentsTable.svelte";
    import AddQueueStudentModal from "./AddQueueStudentModal.svelte"
    import {InitFlatPickr} from "$lib/init/initFlatpickr.js"
    import { fade } from 'svelte/transition';
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { navigating } from '$app/stores';

	import QueueStudentCard from "./simplified/QueueStudentCard.svelte";
    import DeleteQueueStudentModal from "$lib/modals/delete/DeleteQueueStudentModal.svelte"

	import ViewQueueStudentModal from "$lib/modals/view/ViewQueueStudentModal.svelte";

	import EditQueueStudentModal from "$lib/modals/edit/EditQueueStudentModal.svelte";

import ExitQueueStudent from "$lib/modals/confirmation/ExitQueueStudent.svelte";
	import AddQueueStudentSimple from "./simplified/AddQueueStudentModalSimple.svelte";
	import AddQueueStudentModalSimple from "./simplified/AddQueueStudentModalSimple.svelte";

    export let data
    $: queueStudentsList = data.queueStudentsResponse.data.queueStudents
    $: queue = data.queueStudentsResponse.data.queue
    $: queueStudentsPagination = data.queueStudentsResponse.pagination

let queueStudentsPage
onMount(() => {
    initToolTip(queueStudentsPage)
    InitFlatPickr()
})

setContext('queueStudentStore', {
    queueStudentStore: writable({})
});


</script>
<div class="row"  in:fade={{duration: 200 }} bind:this={queueStudentsPage}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">

                    <div class="d-flex gap-2 align-items-center flex-grow-1">
                        <div class="flex-shrink-0">
                            <img src={queue?.canteen?.school?.logo?.full_path} alt="" class="avatar-xs rounded-circle" />
                        </div>
                        <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">{queue?.canteen?.school?.name}</span> - <span class="text-primary">{queue?.canteen?.name}</span> - <span class="text-primary">Queue #{queue.id}</span> - Queue students Managment</h4>
                    </div><!-- end card header -->
                    <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.store")}

                        <button type="button" data-bs-toggle="modal" data-bs-target="#addQueueStudentModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Student</button>
                        <AddQueueStudentModal {queue}/>
                    {/if}
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.store.simplified")}
                        <button type="button" data-bs-toggle="modal" data-bs-target="#addQueueStudentModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Student</button>
                        <AddQueueStudentModalSimple {queue}/>
                    {/if}
                    </div>
                </div>
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.index")}
                <div class="card-body">
    
                        
                    <SearchTable type={"Student"}/>
                    <QueueStudentsTable {queueStudentsList}/>
                    <Pagination {...queueStudentsPagination} />
                
                </div>
                {/if}
        </div><!-- end card -->
    </div>
        <!-- end col -->
        {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.index.simplified")}
            <SearchTable type={"Student"}/>
            {#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
                    <div class="text-center">
                        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                    </div>
            {:else}
                {#each queueStudentsList as queueStudent,_ (queueStudent.id)}
                    <QueueStudentCard {queueStudent} />
                {/each}
            {/if}
            <Pagination {...queueStudentsPagination} />
        {/if}
        
</div>

<ViewQueueStudentModal /> 
<EditQueueStudentModal />
<DeleteQueueStudentModal />
<ExitQueueStudent />
