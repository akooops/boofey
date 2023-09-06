<script>
    import { PathUpdateSchool } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { getContext } from "svelte";

    let {schoolStore} = getContext("schoolStore")
    let editLogo = false
    let close
    let form 
    let schoolName = ""
    async function save(){
    
    
        let formData = new FormData(form)
        if(formData.get("file").size == 0){
            formData.delete("file")
        }
        let res = await (await fetch(PathUpdateSchool($schoolStore.id),{
            method:"POST",
            body:formData
        })).json()
    
        if(res.status == "success") {
            close.click()
            let text = `Edited #${$schoolStore.id} to ${$schoolStore.name}` 
            toast(text,"success")
            invalidate("schools:refresh")
            
        }
    
    
    }
    </script>
    
    
    <div class="modal  fade" id="editSchoolModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit School</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form  on:submit|preventDefault={save} bind:this={form}>
                        <div class="row g-3">
                                <div>
                                    <label for="name" class="form-label">School Name</label>
                                    <input type="text" name="name" class="form-control" id="name" placeholder="Enter Permission name" bind:value={$schoolStore.name}>
                                </div>


                                <div class="mb-2 col-lg-12">
                                    <input class="form-check-input" type="checkbox" id="formCheck1" bind:checked={editLogo}>
                                    <label class="form-check-label" for="formCheck1">
                                        Edit Logo 
                                    </label>
                                </div>
                                {#if editLogo}
                                    <div>
                                        <label for="formFile" class="form-label">School Logo</label>
                                        <input class="form-control" name="file" type="file" id="formFile">
                                    </div>
                                {/if}
                                 <figure class="figure">
                                    <img  alt="school logo " width="200" src={$schoolStore?.logo?.full_path} class="figure-img rounded avatar-xl mb-3 object-fit-cover" >
                                    <figcaption class="figure-caption">Current School logo</figcaption>
                                </figure>
    
    
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