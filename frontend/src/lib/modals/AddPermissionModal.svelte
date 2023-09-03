<script>
import { PathAddPermission } from "$lib/api/paths";
import {onMount} from "svelte"
import { toast } from "$lib/components/toast.js";
import { invalidate } from '$app/navigation';

let permissionName
let close

async function save(){


    let formData = new FormData()
    formData.append("name",permissionName)

    let res = await (await fetch(PathAddPermission(),{
        method:"POST",
        body:formData
    })).json()

    if(res.status == "success") {
        close.click()
        let text = `Added ${permissionName} as a new permission` 
        toast(text,"success")
        invalidate("permissions:refresh")
        
    }


}
</script>


<div class="modal  fade" id="addPermisionModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">Add Permission</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form  on:submit={save}>
                    <div class="row g-3">

                            <div>
                                <label for="firstName" class="form-label">Permission Name</label>
                                <input type="text" class="form-control" id="firstName" placeholder="Enter Permission name" bind:value={permissionName}>
                            </div>


                            <div class="hstack gap-2 justify-content-end">
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal" bind:this={close}>Close</button>
                                <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save">
                            </div>
                    </div><!--end row-->
                </form>
            </div>
        </div>
    </div>
</div>