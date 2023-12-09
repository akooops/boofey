<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';
    
    
    let {canteenStore} = getContext("canteenStore")
    export let canteen


        
    function setCanteen(){
        $canteenStore = JSON.parse(JSON.stringify(canteen));
    }

    let queuesToolTip

    function openQueues(){
        let toolTipInstance = bootstrap.Tooltip.getOrCreateInstance(queuesToolTip)
        goto(`/admin/canteens/${canteen.id}/queues`)
        toolTipInstance.hide()
    }

</script>


<div class="col-xxl-3 col-xl-4  col-lg-5  col-sm-6   col-xs-12">
    <div class="card card-animate p-3 "   role="button">

        <div class="d-flex  align-items-center">
            <div class="flex-shrink-0">
                <img src={canteen.school.logo.full_path} alt="" class="avatar-sm rounded-circle" />
            </div>
            <div class="flex-grow-1 ms-2">
                <h5 class="card-title mb-1">{canteen.name}</h5>
                <p class="text-muted mb-0">{canteen.school.name}</p>
            </div>
            <!-- Soft Buttons -->
            <!-- <button type="button" class="btn btn-soft-success waves-effect waves-light">Open</button> -->
            {#if canteen.status == "open"}
            <span class="badge bg-success-subtle text-success">{canteen.status}</span>
            {:else}
            <span class="badge bg-danger-subtle text-danger">{canteen.status}</span>
            {/if}
        </div>
        <div class="d-flex gap-2  mt-4 flex-wrap">
            <span data-bs-toggle="modal" class="col-12" data-bs-target="#editCanteenModal" on:click={openQueues} bind:this={queuesToolTip}>
                <button type="button" class="btn  col-12 text-start btn-soft-success btn-label  waves-effect waves-light">
                    <i class="ri-edit-2-line label-icon align-middle fs-16 me-2"></i> Manage
                </button>
            </span>
            <span data-bs-toggle="modal" class="col-12" data-bs-target="#viewCanteenModal" on:click|stopPropagation={setCanteen}>
                <button type="button" class="btn  col-12 text-start btn-soft-secondary btn-label  waves-effect waves-light">
                    <i class="ri-eye-fill label-icon align-middle fs-16 me-2"></i> View Canteen
                </button>
            </span>
        </div>
    </div>
</div><!-- end col -->

