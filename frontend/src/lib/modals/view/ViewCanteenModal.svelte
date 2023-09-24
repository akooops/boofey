<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"

    let {canteenStore} = getContext("canteenStore")
    export let general
    

</script>

<div class="modal  fade" id="viewCanteenModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View Permission</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
             
            <ViewRow>
               Name : <span class="fw-normal">{$canteenStore.name}</span>
            </ViewRow>

            {#if general}
            <ViewRow>
                School :      
                        <img src={$canteenStore?.school?.logo?.full_path} alt="" class="avatar-xs rounded-circle" />
                        {$canteenStore?.school?.name}
            </ViewRow>
            {/if}

            <ViewRow>
               Address : <span class="fw-normal">{$canteenStore.address}</span>
            </ViewRow>

            <ViewRow>
                Created at : <span class="fw-normal">{formatTimestamp($canteenStore.created_at)}</span>
            </ViewRow>
            <ViewRow>
                Updated at : <span class="fw-normal">{formatTimestamp($canteenStore.updated_at)}</span>
            </ViewRow>

                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button>
                    </div>
            </div>
        </div>
    </div>
</div>