
<script>
    import Progress from "$lib/components/Progress.svelte"
    import { getContext } from "svelte";
    import { goto } from '$app/navigation';

    export let activeQueue
    let queueStudentsToolTip

    let {queueStore} = getContext("queueStore")
    
    function setQueue(){
        $queueStore = JSON.parse(JSON.stringify(activeQueue));
    }

    function openQueueStudents(){
        let toolTipInstance = bootstrap.Tooltip.getOrCreateInstance(queueStudentsToolTip)
        // goto(`/admin/queues/${activeQueue.id}/queueStudents`)
        goto(`queues/${activeQueue.id}/queueStudents`)
        toolTipInstance.hide()
    }   
  


</script>


<div class="card">
    <div class="card-header align-items-center d-flex">

        <h4 class="card-title mb-0 flex-grow-1">Active Queue</h4>


       
        <div class="flex-shrink-0">
            {#if activeQueue}
            <div class="hstack gap-3 flex-wrap">
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.index")}
                <span on:click={openQueueStudents} bind:this={queueStudentsToolTip}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Queues" ><i class="bx bxs-graduation"></i></a></span>
                {/if}
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.close")}
                    <span data-bs-toggle="modal" data-bs-target="#closeQueueModal" on:click={setQueue}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="Close queue" ><i class="ri-stop-circle-line"></i></a></span>
                {/if}
                <span data-bs-toggle="modal" data-bs-target="#viewQueueModal" on:click={setQueue}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="View" ><i class="ri-eye-fill"></i></a></span>
                <span data-bs-toggle="modal" data-bs-target="#editQueueModal" on:click={setQueue}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
                <span data-bs-toggle="modal" data-bs-target="#deleteQueueModal" on:click={setQueue}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
            </div>
            {/if}
            <!-- <AddQueueModal schoolId={school.id}/> -->
        </div>
    </div><!-- end card header -->

    <div class="card-body">

        <!-- <div class="live-preview"> -->
            <!--end col-->
        {#if activeQueue}

            <div class="row pe-0">
                <div class="table-responsive">
                    <table class="table align-middle table-nowrap mb-0 border-top">
                        <thead class="table-light">
                            <tr>
                                <th scope="col" style="width: 25px;">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="checkAll" value="option1">
                                    </div>
                                </th>
                                <th scope="col">ID</th>
                                <th scope="col">Type</th>
                                <th scope="col">Started At</th>
                                <th scope="col">Students Count</th>
                                <th scope="col">Students In</th>
                                <th scope="col">Students Out</th>
                                <th scope="col">Last Synced At</th>
                            </tr>
                        </thead>
                        <tbody class="list">
                            <tr scope="row">
                                <td>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
                                    </div>
                                </td>
                                <td>{activeQueue.id}</td>
                                <td><span class="badge bg-primary-subtle text-primary">{activeQueue.type == 1 ? "Snack" : "Main Meal"}</span></td>
                                <td>{activeQueue.started_at}</td>
                                <td>{activeQueue.studentsCount}</td>
                                <td>{activeQueue.studentsInCount}</td>
                                <td>{activeQueue.studentsExitedCount}</td>
                                <td>{activeQueue.lastSyncedAt}</td>

                                
                        </tbody>
                    </table>
                            <!-- <ViewQueueModal /> 
                            <DeleteQueueModal /> -->
                        <!--  
                        <EditQueueModal />  balance * 100 / days 
                        -->
            
                </div>
            </div>
          
        {:else}
                    <!-- Info Alert -->
        <div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert">
            <i class="ri-airplay-line me-3 align-middle"></i> There are no <strong>Active Queues</strong> at the moment 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>


        {/if}
            <!--end row-->
        <!-- </div> -->
    </div><!-- end card-body -->
</div><!-- end card -->