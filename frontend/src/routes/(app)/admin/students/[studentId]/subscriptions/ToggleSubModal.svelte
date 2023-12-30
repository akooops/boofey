<script>
    import { PathEnableSub,PathDisableSub } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import {getContext} from "svelte"

    
    let close
    let form 
    let errors
let loading = false
    let {subStore} = getContext("subStore")

    async function save(){
loading = true
    
        errors = {}
        let formData = new FormData(form)
        let path = $subStore.status == "disabled" ? PathEnableSub($subStore.id) : PathDisableSub($subStore.id)
        let res = await fetch(path,{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
    
        if(res.status == "success") {
            close.click()
            let text = `Successfuly ${$subStore.status == "disabled" ? "Enabled" : "Disabled"} Subscription` 
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

    subStore.subscribe(() => {
        
    })

    </script>
    
    
    <div class="modal  fade" id="toggleSubModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">{$subStore.status == "disabled" ? "Enable" : "Disable"}  Subscription</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                            <div class="modal-body" >
                {#if loading }
                <div class="text-center">
                    <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                </div>
                {/if}

                <form  on:submit|preventDefault={save} bind:this={form} class:d-none={loading}>
                        <div class="row g-3">
                            <!-- Info Alert -->
                            <div>
                                <div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert">
                                    <i class="ri-airplay-line me-3 align-middle"></i> you are gonna <strong>{$subStore.status == "disabled" ? "Enable" : "Disable"}</strong> are you sure you want to proceed ? 
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>

                                {#if errors?.student_id}
                                <strong class="text-danger ms-1 my-2">{errors.student_id[0]}</strong>
                                {/if}
                                {#if errors?.subscription_id}
                                <strong class="text-danger ms-1 my-2">{errors.subscription_id[0]}</strong>
                                {/if}
                            </div>

                            
                        
                            <div class="hstack gap-2 justify-content-end">
                                <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>Close</button>
                                <input type="submit" class="btn btn-primary waves-effect waves-light" value={$subStore.status == "disabled" ? "Enable" : "Disable"}>
                            </div>
                        </div><!--end row-->
                    </form>
                </div>
            </div>
        </div>
    </div>