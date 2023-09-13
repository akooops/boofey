<script>
    import { PathUpdatePermission } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { getContext } from "svelte";

    
    let {permissionStore} = getContext("permissionStore")

    let close
    let errors

    async function save(){
        errors = {}
    
    
        let formData = new FormData()
        formData.append("name",$permissionStore.name)
        
        let res = await (await fetch(PathUpdatePermission($permissionStore.id),{
            method:"POST",
            body:formData
        })).json()
    
        if(res.status == "success") {
            close.click()
            let text = `Edited #${$permissionStore.id} to ${$permissionStore.name}` 
            toast(text,"success")
            invalidate("permissions:refresh")
        }else {
            errors = res.errors
        }

    
    
    }
    </script>
    
    
    <div class="modal  fade" id="editPermissionModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit Permission</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form  on:submit={save}>
                        <div class="row g-3">
    
                                <div>
                                    <label for="firstName" class="form-label">Permission Name</label>
                                    <input type="text" class="form-control" id="firstName" placeholder="Enter Permission name" bind:value={$permissionStore.name}>
                                </div>
                                {#if errors?.name}
                                <strong class="text-danger ms-1 my-2">{errors.name[0]}</strong>
                                {/if}
    
                                <div class="hstack gap-2 justify-content-end">
                                    <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>Close</button>
                                    <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save">
                                </div>
                        </div><!--end row-->
                    </form>
                </div>
            </div>
        </div>
    </div>