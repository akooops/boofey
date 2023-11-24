<script>
    import {PathDelBilling} from "$lib/api/paths.js"
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { getContext } from "svelte";
    import { redirector } from "$lib/api/auth";
    import {translation} from "$lib/translation.js"


    let close
    export let billingObj
    let loading = false
    async function deleteTarget(){
        loading = true
        let res = await fetch(PathDelBilling(billingObj.id),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"DELETE"
        })
        redirector(res)

        res = await res.json()
        loading = false
        if(res.status == "success"){
            close.click()
            let text = `Billing Address Deleted Successfully` 
            toast(text,"success")
            invalidate("checkOut:refresh")
        }

    }

</script>


<div id="deleteAddressModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body text-center p-5">
        <div class="text-end">
                    <button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {#if loading }
                <div class="mt-2">
                    <div class="text-center">
                        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                    </div>
                </div>
                {/if}

                <div class="mt-2" class:d-none={loading}>
                    <form  on:submit|preventDefault={deleteTarget}  class:d-none={loading}>
                    <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon>
                    <h4 class="mb-3 mt-4">{translation.areYouSure[localStorage.getItem("language")]} {translation["?"][localStorage.getItem("language")]}</h4>
                    <p class="text-muted fs-15 mb-4">{translation.areYouSureYouWantToDelAddress[localStorage.getItem("language")]} {translation["?"][localStorage.getItem("language")]}</p>
                        <div class="card-radio mb-4" >
                            <label class="form-check-label text-start">
                                <span class="fs-14 mb-2 d-block">{billingObj?.firstname} {billingObj?.lastname}</span>
                                <span class="text-muted fw-normal text-wrap mb-1 d-block">4739 Bubby Drive Austin, TX 78729</span>
                                <span class="text-muted fw-normal text-wrap mb-1 d-block">{billingObj?.email}</span>
                                <span class="text-muted fw-normal text-wrap mb-1 d-block">{billingObj?.phone}</span>
                                <span class="text-muted fw-normal text-wrap mb-1 d-block">{billingObj?.country},{billingObj?.state},{billingObj?.zipcode}</span>
                                <span class="text-muted fw-normal text-wrap mb-1 d-block">{billingObj?.address}</span>
                    
                            </label>
                        </div>
                    <div class="hstack gap-2 justify-content-center"> 
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>{translation.close[localStorage.getItem("language")]}</button>
                        <button type="button" class="btn btn-danger waves-effect waves-light" on:click={deleteTarget}>{translation.delete[localStorage.getItem("language")]}</button>
                    </div>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->