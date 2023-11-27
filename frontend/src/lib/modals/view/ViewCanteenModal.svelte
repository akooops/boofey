<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"

    let {canteenStore} = getContext("canteenStore")
    export let general
    
    let isCopied = false

    function copyApiKey(){
        if(isCopied) return;
        navigator.clipboard.writeText($canteenStore.api_key);
        
        isCopied = true;
        setTimeout(() => {
            isCopied = false;
        }, 1000); 
    }

</script>

<div class="modal  fade" id="viewCanteenModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered " >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View Canteen</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
             
            <ViewRow>
               Name : <span class="fw-normal">{$canteenStore.name}</span>
            </ViewRow>
            <ViewRow>
                Arabic Name : <span class="fw-normal">{$canteenStore.name_ar}</span>
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
                Arabic Address : <span class="fw-normal">{$canteenStore.address_ar}</span>
             </ViewRow>
 
            <ViewRow>
                APi Key 
             </ViewRow>
             <div class="ps-3">
            <ViewRow>
                <div class="input-group">

                <input type="text" class="form-control blur" aria-label="APi key" readonly role="button" bind:value={$canteenStore.api_key} on:click={copyApiKey}>
                <button type="button" class="btn btn-icon  waves-effect waves-light {isCopied ? "btn-success" : "btn-primary"}"  on:click={copyApiKey}>    
                    {#if isCopied}
                    <i class="ri-check-double-line"></i>
                    {:else}
                    <i class="ri-file-copy-line"></i>
                    {/if}
                </button>

             </div>
                
            </ViewRow>
            
            </div>
 
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

<style>
    .blur {
        color: transparent;
        text-shadow: 0 0 5px rgba(0,0,0,0.5);
    }
    .blur:hover {
        color: var(--vz-body-color);;
        text-shadow: none;
    }
</style>