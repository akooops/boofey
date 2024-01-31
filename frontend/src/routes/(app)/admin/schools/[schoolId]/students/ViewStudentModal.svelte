<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"

    let {studentStore} = getContext("studentStore")
    

</script>

<div class="modal  fade" id="viewStudentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View Permission</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <img class="rounded avatar-xl mb-3 object-fit-cover" alt="Student image" width="200" src={$studentStore?.image?.full_path}>
            
                <ViewRow>
                   Name : <span class="fw-normal">{$studentStore?.fullname}</span>
                </ViewRow>
                <ViewRow>
                   Father : 
                            <img src={$studentStore?.father?.user?.profile?.image?.full_path} alt="" class="avatar-xs d-inline rounded-circle" />
                            {$studentStore?.father?.user?.profile?.fullname}
                </ViewRow>
    
                <ViewRow>
                    Status :         {#if $studentStore?.subscribed}
                    <span class="badge bg-success-subtle text-success">Subscribed</span>
                    {:else}
                    <span class="badge bg-danger-subtle text-danger">Not Subscribed</span>
                    {/if}
                </ViewRow>
    
                <ViewRow>
                    Devision : {#if $studentStore?.division}
                    <span class="fw-normal">{$studentStore?.division?.name}</span>
                    {:else}
                    <span class="badge bg-danger-subtle text-danger">No Division</span>
                    {/if}
                </ViewRow>
                <ViewRow>
                    Class : <span class="fw-normal">{$studentStore.className}</span>
                </ViewRow>
    
                <ViewRow>
                    Created at : <span class="fw-normal">{formatTimestamp($studentStore.created_at)}</span>
                </ViewRow>
                <ViewRow>
                    Updated at : <span class="fw-normal">{formatTimestamp($studentStore.updated_at)}</span>
                </ViewRow>

                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button>
                    </div>
            </div>
        </div>
    </div>
</div>