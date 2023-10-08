<script>

    // import QueuesTable from "$lib/tables/QueuesTable.svelte";
    import AddQueueModal from "$lib/modals/add/AddQueueModal.svelte";
    import {InitFlatPickr} from "$lib/init/initFlatpickr.js"
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
	import ViewQueueModal from "$lib/modals/view/ViewQueueModal.svelte";
	import EditQueueModal from "$lib/modals/edit/EditQueueModal.svelte";
	import DeleteQueueModal from "$lib/modals/delete/DeleteQueueModal.svelte";




	import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
	import ActiveQueue from "$lib/components/cards/ActiveQueue.svelte";
	import QueuesTable from "$lib/tables/QueuesTable.svelte";
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { fade } from 'svelte/transition';




export let data

    setContext('queueStore', {
        queueStore: writable({})
    });

    $: queuesList = data.queuesResponse.data.queues
    $: activeQueue = data.queuesResponse.data.activeQueue
    $: canteen = data.queuesResponse.data.canteen
    $: queuesPagination = data.queuesResponse.pagination


    let queuesPage
    onMount(() => {
        initToolTip(queuesPage)
        // InitFlatPickr()

    })
    
</script>
<div class="row" in:fade={{delay:200,duration: 200 }} out:fade={{duration: 200 }} bind:this={queuesPage}>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex">

                <div class="d-flex gap-2 align-items-center flex-grow-1">
                <div class="flex-shrink-0">
                    <img src={canteen.school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                </div>
                <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">{canteen.school.name}</span> - <span class="text-primary">{canteen.name}</span> - Queue Managment</h4>
            </div> 

               
                <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.store")}
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addQueueModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Start Queue</button>
                    <AddQueueModal {canteen}/>
                    {/if}
                    <ViewQueueModal />
                    <EditQueueModal /> 
                    <DeleteQueueModal />
                </div>
            </div><!-- end card header -->
        </div><!-- end card -->
        {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.index")}
            <ActiveQueue {activeQueue} />
        {/if}

        <div class="card">
            <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1">All queues</h4>
            </div><!-- end card header -->

            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.index")}
            <div class="card-body">
        
                <!-- <div class="live-preview"> -->
                    <div class="row">
                            <!-- Input with Icon -->
                        <SearchTable type={"Queue"}/>
                        <QueuesTable {queuesList}/>
                        <Pagination {...queuesPagination} />
                        <!--end col-->
                    </div>
                    <!--end row-->
                <!-- </div> -->
            </div><!-- end card-body -->
            {/if}
        </div><!-- end card -->
        
       
    
    </div>
                 <!--  
             <DeleteQueueModal /> -->
            <!--  
     end col -->
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

    