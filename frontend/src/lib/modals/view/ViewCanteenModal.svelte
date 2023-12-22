<script>
    import { getContext, onMount } from "svelte"
import QRCodeStyling from "qr-code-styling";
import printJS from 'print-js'
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"

    let {canteenStore} = getContext("canteenStore")
    export let general
    export let simple = false
    


    let view 
    let width = 200
    let height = 200
    let qrInstance
    let isCopied = false
    let showQr = false

    function copyApiKey(){
        if(isCopied) return;
        navigator.clipboard.writeText($canteenStore.api_key);
        
        isCopied = true;
        setTimeout(() => {
            isCopied = false;
        }, 1000); 
    }

    canteenStore.subscribe(() => {
        if(qrInstance){
            qrInstance.update({
                    width,
                    height,
                    type: "png",
                    data:$canteenStore.api_key
            })

        }
    })

    onMount(() => {
    
    qrInstance = new QRCodeStyling({
            width,
            height,
            type: "png",
        });

    qrInstance.append(view);
})


async function downLoad(){
        await qrInstance.download({
            name:$canteenStore.name,
            extension:"png"
        })

    }

    async function print(){
        // printJS('qrImage', 'html')
        printJS({ printable: 'qrImage', type: 'html', header: `Boofey - ${$canteenStore.name}`})
    }


function reset(){
    showQr = false
}

</script>

<div class="modal  fade" id="viewCanteenModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" on:hidden.bs.modal={reset} >
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
             {#if simple == false}
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
                    <span class:d-none={showQr}>
                        <ViewRow>
                        <button type="button" class="btn btn-primary waves-effect waves-light" on:click={() => showQr = true}>Generate Qr</button>
                        </ViewRow>
                    </span>
                    <span class:d-none={showQr == false}>
                        <div bind:this={view} class="text-center" id="qrImage" >
                        </div>
                        <div class="text-center hstack gap-2 justify-content-center mb-2">
                            
                            <button type="button" class="btn btn-primary waves-effect waves-light" on:click={downLoad}>Download</button>
                            <button type="button" class="btn btn-primary waves-effect waves-light" on:click={print}>Print</button>
                        </div>
                    </span>
                </div>
            {/if}
 
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
    .blur-image {
        filter: blur(7px);

    }
    .blur-image:hover {
        filter: blur(0px);

    }
    .blur {
        color: transparent;
        text-shadow: 0 0 5px rgba(0,0,0,0.5);
    }
    .blur:hover {
        color: var(--vz-body-color);;
        text-shadow: none;

    }
</style>