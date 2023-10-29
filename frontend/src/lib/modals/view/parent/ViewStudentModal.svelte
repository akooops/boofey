<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"
    import {translation} from "$lib/translation.js"

    let {studentStore} = getContext("studentStore")
    

</script>

<div class="modal  fade" id="viewStudentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">{translation.viewStudent[localStorage.getItem("language")]}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <img class="rounded avatar-xl mb-3 object-fit-cover" alt="Student image" width="200" src={$studentStore?.image?.full_path}>
            
                <ViewRow>
                    {translation.theName[localStorage.getItem("language")]} : <span class="fw-normal">{$studentStore?.fullname}</span>
                </ViewRow>
                <ViewRow>
                    {translation.status[localStorage.getItem("language")]} :         {#if $studentStore?.subscribed}
                    <span class="badge bg-success-subtle text-success">{translation.subscribed[localStorage.getItem("language")]}</span>
                    {:else}
                    <span class="badge bg-danger-subtle text-danger">{translation.notSubscribed[localStorage.getItem("language")]}</span>
                    {/if}
                </ViewRow>
    
                <ViewRow>
                    {translation.school[localStorage.getItem("language")]} :      
                            <img src={$studentStore?.school?.logo?.full_path} alt="" class="avatar-xs rounded-circle" />
                            {$studentStore?.school?.name}
                </ViewRow>
    
                <ViewRow>
                    {translation.class[localStorage.getItem("language")]} : <span class="fw-normal">{$studentStore.class}</span>
                </ViewRow>
    
                <ViewRow>
                    {translation.createdAt[localStorage.getItem("language")]} : <span class="fw-normal">{formatTimestamp($studentStore.created_at)}</span>
                </ViewRow>
                <ViewRow>
                    {translation.updatedAt[localStorage.getItem("language")]} : <span class="fw-normal">{formatTimestamp($studentStore.updated_at)}</span>
                </ViewRow>

                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">{translation.close[localStorage.getItem("language")]}</button>
                    </div>
            </div>
        </div>
    </div>
</div>