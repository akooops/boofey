<script>
    import { PathAddSchool } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    
    let close
    let form 
    let schoolName = ""
    async function save(){
    
    
        let formData = new FormData(form)
    
        let res = await (await fetch(PathAddSchool(),{
            method:"POST",
            body:formData
        })).json()
    
        if(res.status == "success") {
            close.click()
            let text = `Added ${schoolName} as a new school` 
            toast(text,"success")
            invalidate("schools:refresh")
            
        }
    
    
    }
    </script>
    
    
    <div class="modal  fade" id="addSchoolModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add School</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form  on:submit|preventDefault={save} bind:this={form}>
                        <div class="row g-3">
                                <div>
                                    <label for="name" class="form-label">School Name</label>
                                    <input type="text" name="name" class="form-control" id="name" placeholder="Enter Permission name" bind:value={schoolName}>
                                </div>
                                <div>
                                    <label for="formFile" class="form-label">School Logo</label>
                                    <input class="form-control" name="file" type="file" id="formFile">
                                </div>
    
    
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