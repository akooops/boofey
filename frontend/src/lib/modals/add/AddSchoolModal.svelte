<script>
    import { PathAddSchool } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";

    
    let close
    let form 
    let schoolName = ""
    let errors
    let loading = false
    let enableQr = true
    async function save(){
        loading = true
    
        errors = {}
    
        let formData = new FormData(form)
        formData.set("qr_enabled",enableQr)
        let res = await fetch(PathAddSchool(),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
        loading = false
        if(res.status == "success") {
            close.click()
            let text = `Added ${schoolName} as a new school` 
            toast(text,"success")
            invalidate("schools:refresh")
            reset()
        }else {
            errors = res.errors
        }
    
    
    }

    function reset(){
        form.reset()
        enableQr = true
        errors = {}
    }


    </script>
    
    
    <div class="modal  fade" id="addSchoolModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add School</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" >
                    {#if loading }
                    <div class="text-center">
                        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                    </div>
                    {/if}
    
                    <form  on:submit|preventDefault={save} bind:this={form} class:d-none={loading}>
                        <div class="row g-3">
                                <div>
                                    <label for="name" class="form-label">School Name</label>
                                    <input type="text" name="name" class="form-control" id="name" placeholder="Enter School name" bind:value={schoolName}>
                                    {#if errors?.name}
                                    <strong class="text-danger ms-1 my-2">{errors.name[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="productarName" class="form-label">Arabic Name</label>
                                    <input type="text" class="form-control" id="productName" name="name_ar" dir="rtl" placeholder="ادخل اسم المدرسة">
                                    {#if errors?.name_ar}
                                    <strong class="text-danger ms-1 my-2">{errors.name_ar[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="name" class="form-label">School Code</label>
                                    <input type="text" name="code" class="form-control" id="name" placeholder="Enter School code">
                                    {#if errors?.code}
                                    <strong class="text-danger ms-1 my-2">{errors.code[0]}</strong>
                                    {/if}
                                </div>
                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={enableQr} >
                                        <label class="form-check-label" for="SwitchCheck1">Enable Qr</label>
                                    </div><!-- Switches Color -->

                                    {#if errors?.qr_enabled}
                                        <strong class="text-danger ms-1 my-2">{errors.qr_enabled[0]}</strong>
                                    {/if}
                                </div>    
                                <div>
                                    <label for="formFile" class="form-label">School Logo</label>
                                    <input class="form-control" name="file" type="file" id="formFile">
                                    {#if errors?.file}
                                    <strong class="text-danger ms-1 my-2">{errors.file[0]}</strong>
                                    {/if}
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