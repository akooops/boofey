<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"
	import Progress from "$lib/components/Progress.svelte";

    let {queueStore} = getContext("queueStore")


</script>

<div class="modal  fade" id="viewQueueModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View Queue</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
            
                


                <ViewRow>
                    Type :  <span class="badge bg-primary-subtle text-primary">{$queueStore.type == 1 ? "Snack" : ":Main Meal"}</span>
                </ViewRow>
                <ViewRow>
                    Started At : <span class="fw-normal">{$queueStore.started_at}</span>
                </ViewRow>
                <ViewRow>
                    Student Count : <span class="fw-normal">{$queueStore.studentsCount}</span>
                </ViewRow>
                <ViewRow>
                    students In : <span class="fw-normal">{$queueStore.studentsInCount}</span>
                </ViewRow>
                <ViewRow>
                    Students Exited : <span class="fw-normal">{$queueStore.studentsExitedCount}</span>
                </ViewRow>
                <ViewRow>
                    Last Synced  At : <span class="fw-normal">{$queueStore.lastSyncedAt}</span>
                </ViewRow>
                <ViewRow>
                    Created at : <span class="fw-normal">{formatTimestamp($queueStore?.created_at)}</span>
                </ViewRow>
                <ViewRow>
                    Updated at : <span class="fw-normal">{formatTimestamp($queueStore?.updated_at)}</span>
                </ViewRow>

                <div class="hstack gap-2 justify-content-end">
                    <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>