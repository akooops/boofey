<script>
    import {PathCloseQueue} from "$lib/api/paths.js"
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { getContext } from "svelte";
    import { redirector } from "$lib/api/auth";
    

    let close
    let loading = false
    let {queueStore} = getContext("queueStore")
    let errors

    async function closeQueue(){
        loading = true
        let res = await fetch(PathCloseQueue($queueStore.id),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"Post"
        })
        redirector(res)

        res = await res.json()
        
        loading = false
        if(res.status == "success"){
            close.click()
            let text = `Queue closed` 
            toast(text,"success")
            invalidate("queues:refresh")
        }else {
            errors = res.errors
        }

    }

</script>


<div id="closeQueueModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
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
                    <lord-icon src="https://cdn.lordicon.com/crithpny.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon>
                    <h4 class="mb-3 mt-4">Are you Sure ?</h4>
                    <p class="text-muted fs-15 mb-4">Are you Sure You want to close this <span class="text-primary">active Queue</span> ?</p>
                    {#if errors?.close}
                
                        <div class="alert text-start alert-danger alert-border-left alert-dismissible fade show" role="alert">
                            <i class="ri-alert-line me-3 align-middle"></i>{errors.close[0]}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    {/if}    
                    <div class="hstack gap-2 justify-content-center"> 
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>Cancel</button>
                        <button type="button" class="btn btn-warning waves-effect waves-light" on:click={closeQueue}>Close Queue</button>
                    </div>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->