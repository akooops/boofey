<script>
    import { PathGenInvoice } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import {getContext} from "svelte"
    import {translation} from "$lib/translation.js"

    
    let close
    let form 
    let errors
    let {subStore} = getContext("subStore")

    async function save(){
    
        errors = {}
        let formData = new FormData(form)
        let res = await fetch(PathGenInvoice($subStore.id,"parent"),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
    
        if(res.status == "success") {

            window.open(`/invoices/${res.data.invoice_id}`, "_blank");
            close.click()
            let text = `Successfuly Generated Subscription's invoice` 
            toast(text,"success")
            invalidate("subs:refresh")
            reset()
        }else {
            errors = res.errors
        }
    
    
    }

    function reset(){
        form.reset()
        
        errors = {}
    }


    </script>
    
    
    <div class="modal  fade" id="genSubInvoiceModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">{translation.genInvoice[localStorage.getItem("language")]}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form  on:submit|preventDefault={save} bind:this={form}>
                        <div class="row g-3">
                            <!-- Info Alert -->
                            <div>
                                <div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert">
                                    <i class="ri-airplay-line me-3 align-middle"></i> {translation.youAreGonnaGen[localStorage.getItem("language")]}<strong>{translation.generate[localStorage.getItem("language")]}</strong>  {translation.anInvoice[localStorage.getItem("language")]}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>

                                {#if errors?.invoice_id}
                                <strong class="text-danger ms-1 my-2">{errors.invoice_id[0]}</strong>
                                {/if}
                            </div>

                            
                        
                            <div class="hstack gap-2 justify-content-end">
                                <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>{translation.close[localStorage.getItem("language")]}</button>
                                <input type="submit" class="btn btn-primary waves-effect waves-light" value="{translation.generate[localStorage.getItem("language")]}">
                            </div>
                        </div><!--end row-->
                    </form>
                </div>
            </div>
        </div>
    </div>