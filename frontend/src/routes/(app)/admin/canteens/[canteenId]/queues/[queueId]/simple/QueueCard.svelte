<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';


    export let queue
    export let active
    export let canteen
    let queueStudentsToolTip

    let {queueStore} = getContext("queueStore")

    function setQueue(){
        $queueStore = JSON.parse(JSON.stringify(queue));
    }
    async function openQueueStudents(){
        let toolTipInstance = bootstrap.Tooltip.getOrCreateInstance(queueStudentsToolTip)
        toolTipInstance.hide()
        if(active){
            await goto(`/admin/canteens/${canteen.id}/queues`)
        }
        await goto(`/admin/canteens/${canteen.id}/queues/${queue.id}/`)
    }   
  
    
</script>


<div class="col-xxl-3 col-xl-4  col-lg-5  col-sm-6   col-xs-12">
    <div class="card card-animate p-3 "   role="button">

        <div class="d-flex  align-items-center">
            
            <div class="flex-grow-1">
                <p class="text-muted mb-0">Started At : {queue?.started_at == null ? "Not started yet" : queue.started_at}</p>
            </div>
            <!-- Soft Buttons -->
            <!-- <button type="button" class="btn btn-soft-success waves-effect waves-light">Open</button> -->
            <td><span class="badge bg-primary-subtle text-primary">{queue.type == 1 ? "Snack" : "Main Meal"}</span></td>

        </div>

        <div class="d-flex mt-2 justify-content-center">
            <div class="col-4">
                <p class="text-muted mb-0">All</p>
                <h2 class=" mb-1">{queue.studentsCount}</h2>
            </div>
            <div class="col-4">
                <p class="text-muted mb-0">In</p>
                <h2 class=" mb-1">{queue.studentsInCount}</h2>
            </div>
            <div class="col-4">
                <p class="text-muted mb-0">Out</p>
                <h2 class=" mb-1">{queue.studentsExitedCount}</h2>
            </div>
        </div>


        <div class="d-flex gap-2  mt-4 flex-wrap">
            <!-- {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.update.simplified")}
            <span data-bs-toggle="modal" class="col-12" data-bs-target="#editQueueModal" on:click|stopPropagation={setQueue}>
                <button type="button" class="btn  col-12 text-start btn-soft-success btn-label  waves-effect waves-light">
                    <i class="ri-edit-2-line label-icon align-middle fs-16 me-2"></i> Edit Queue
                </button>
            </span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.show.simplified")}
            <span data-bs-toggle="modal" class="col-12" data-bs-target="#viewQueueModal" on:click|stopPropagation={setQueue}>
                <button type="button" class="btn  col-12 text-start btn-soft-secondary btn-label  waves-effect waves-light">
                    <i class="ri-eye-fill label-icon align-middle fs-16 me-2"></i> View Queue
                </button>
            </span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.destroy.simplified")}
            <span data-bs-toggle="modal" class="col-12" data-bs-target="#deleteQueueModal" on:click|stopPropagation={setQueue}>
                <button type="button" class="btn  col-12 text-start btn-soft-danger btn-label  waves-effect waves-light">
                    <i class="ri-delete-bin-line label-icon align-middle fs-16 me-2"></i> Delete Queue
                </button>
            </span>
            {/if} -->
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.index.simplified")}
            <span  class="col-12" on:click|stopPropagation={openQueueStudents} bind:this={queueStudentsToolTip} data-bs-dismiss="modal">
                <button type="button" class="btn  col-12 text-start btn-soft-primary btn-label  waves-effect waves-light">
                    <i class="ri-user-2-line label-icon align-middle fs-16 me-2"></i> Students
                </button>
            </span>
            {/if}
        </div>
    </div>
</div><!-- end col -->