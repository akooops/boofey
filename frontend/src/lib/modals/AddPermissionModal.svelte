<script>
import { PathAddPermission } from "$lib/api/paths";
import {onMount} from "svelte"

let modal
let permissionName
let form

function save(){
    let formData = new FormData()
    formData.append("name",permissionName)
    modal.modal("hide")
    // fetch(PathAddPermission(),{
    //     method:"POST",
    //     body:formData
    // })

}
</script>


<div class="modal  fade" id="addPermisionModal" bind:this={modal} tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">Add Permission</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form bind:this={form} on:submit={save}>
                    <div class="row g-3">

                            <div>
                                <label for="firstName" class="form-label">Permission Name</label>
                                <input type="text" class="form-control" id="firstName" placeholder="Enter Permission name" bind:value={permissionName}>
                            </div>


                            <div class="hstack gap-2 justify-content-end">
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                                <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save">
                            </div>
                    </div><!--end row-->
                </form>
            </div>
        </div>
    </div>
</div>