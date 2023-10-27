<script>
    import {PathDelPaymentMethod} from "$lib/api/paths.js"
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { getContext } from "svelte";
    import {translation} from "$lib/translation.js"

    import { redirector } from "$lib/api/auth";

    let close
    
    let {paymentMethodStore} = getContext("paymentMethodStore")

    async function deleteTarget(){
        
        let res = await fetch(PathDelPaymentMethod($paymentMethodStore.id),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"DELETE"
        })
        redirector(res)

        res = await res.json()
        if(res.status == "success"){
            close.click()
            let text = `Deleted payment method successfully` 
            toast(text,"success")
            invalidate("paymentMethods:refresh")
        }

    }

</script>

<div id="deletePaymentMethodModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body text-center p-5">
                <div class="text-end">
                    <button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="mt-2">
                    <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon>
                    <h4 class="mb-3 mt-4">{translation.areYouSure[localStorage.getItem("language")]} {translation["?"][localStorage.getItem("language")]}</h4>
                    <p class="text-muted fs-15 mb-4">{translation.areYouSureYouWantToDel[localStorage.getItem("language")]} <span class="text-primary">{`${$paymentMethodStore.card_holder_name}'s card #${$paymentMethodStore.id}`}</span> {translation["?"][localStorage.getItem("language")]}</p>
                    <div class="hstack gap-2 justify-content-center"> 
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>{translation.close[localStorage.getItem("language")]}</button>
                        <button type="button" class="btn btn-danger waves-effect waves-light" on:click={deleteTarget}>{translation.delete[localStorage.getItem("language")]}</button>
                    </div>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->