<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"
	import Progress from "$lib/components/Progress.svelte";

    let {queueStudentStore} = getContext("queueStudentStore")


</script>

<div class="modal  fade" id="viewQueueStudentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View QueueStudent</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
            
                


                <ViewRow>
                    Student : <img src={$queueStudentStore?.student?.image?.full_path} alt="" class="avatar-xs rounded-circle me-1" /> <span class="fw-normal">{$queueStudentStore?.student?.fullname}</span>

                </ViewRow>
                <ViewRow>
                    Started At : <span class="fw-normal">{$queueStudentStore?.started_at}</span>
                </ViewRow>
                <ViewRow>
                    Synced At : <span class="fw-normal">{$queueStudentStore?.synced_at}</span>
                </ViewRow>
                <ViewRow>
                    Exited At : 
                    {#if $queueStudentStore?.exited_at}
                    <span class="fw-normal">{$queueStudentStore?.exited_at}</span>
                    {:else}
                    <span class="badge bg-danger-subtle text-danger">Not Out Yet</span>
                    {/if}
                </ViewRow>
                <ViewRow>
                    Created at : <span class="fw-normal">{formatTimestamp($queueStudentStore?.created_at)}</span>
                </ViewRow>
                <ViewRow>
                    Updated at : <span class="fw-normal">{formatTimestamp($queueStudentStore?.updated_at)}</span>
                </ViewRow>

                <div class="hstack gap-2 justify-content-end">
                    <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>