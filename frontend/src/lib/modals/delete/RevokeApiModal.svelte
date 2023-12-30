<script>
    import {PathRevokeAPi} from "$lib/api/paths.js"
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { getContext } from "svelte";
    import { redirector } from "$lib/api/auth";


    let close
    let loading = false
    let {canteenStore} = getContext("canteenStore")

    async function revokeTarget(){
        loading = true
        let res = await fetch(PathRevokeAPi($canteenStore.id),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST"
        })
        redirector(res)

        res = await res.json()
        loading = false
        if(res.status == "success"){
            close.click()
            let text = `Revoked ${$canteenStore.name} #${$canteenStore.id} API` 
            toast(text,"success")
            // invalidate("canteens:refresh")
        }

    }

</script>


<div id="RevokeApiModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body text-center p-5">
        <div class="text-end">
                    <button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {#if loading }
                <div class="mt-2">
                    <div class="text-center">
                        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                    </div>
                </div>
                {/if}

                <div class="mt-2" class:d-none={loading}>
                    <form  on:submit|preventDefault={revokeTarget}  class:d-none={loading}>
                
                    <lord-icon src="https://cdn.lordicon.com/tdrtiskw.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon>
                    <h4 class="mb-3 mt-4">Are you Sure ?</h4>
                    <p class="text-muted fs-15 mb-4">Are you Sure You want to Revoke the Api of <span class="text-primary">{`${$canteenStore.name} #${$canteenStore.id}`}</span> ?</p>
                    <div class="hstack gap-2 justify-content-center"> 
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>Close</button>
                        <button type="button" class="btn btn-danger waves-effect waves-light" on:click={revokeTarget}>Revoke</button>
                    </div>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->