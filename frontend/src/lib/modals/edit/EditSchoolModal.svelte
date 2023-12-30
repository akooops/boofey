<script>
    import { PathUpdateSchool } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { getContext } from "svelte";
    import { redirector } from "$lib/api/auth";

    let {schoolStore} = getContext("schoolStore")
    let editLogo = false
    let close
    let form 
    let schoolName = ""
    let errors
let loading = false
    async function save(){
loading = true
    
        errors = {}
        let formData = new FormData(form)
        if(formData.get("file")?.size == 0){
            formData.delete("file")
        }
        formData.set("edit_logo",editLogo)
        formData.set("qr_enabled",$schoolStore.qr_enabled)


        let res = await fetch(PathUpdateSchool($schoolStore.id),{
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
            let text = `Edited #${$schoolStore.id} to ${$schoolStore.name}` 
            toast(text,"success")
            invalidate("schools:refresh")
            reset()
        }else {
            errors = res.errors
        }
    
        
    
    }
    function reset(){
        editLogo = false
        errors = {}

    }

    </script>
    
    
    <div class="modal  fade" id="editSchoolModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit School</h5>
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
                                <div>
                                    <label for="name" class="form-label">School Name</label>
                                    <input type="text" name="name" class="form-control" id="name" placeholder="Enter Permission name" bind:value={$schoolStore.name}>
                                    {#if errors?.name}
                                        <strong class="text-danger ms-1 my-2">{errors.name[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="productarName" class="form-label">Arabic Name</label>
                                    <input type="text" class="form-control" id="productName" name="name_ar" dir="rtl" placeholder="ادخل اسم المدرسة" bind:value={$schoolStore.name_ar}>
                                    {#if errors?.name_ar}
                                    <strong class="text-danger ms-1 my-2">{errors.name_ar[0]}</strong>
                                    {/if}
                                </div>

                                <div>
                                    <label for="name" class="form-label">School Code</label>
                                    <input type="text" name="code" class="form-control" id="name" placeholder="Enter School code" bind:value={$schoolStore.code}>
                                    {#if errors?.code}
                                    <strong class="text-danger ms-1 my-2">{errors.code[0]}</strong>
                                    {/if}
                                </div>

                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={$schoolStore.qr_enabled} >
                                        <label class="form-check-label" for="SwitchCheck1">Enable Qr</label>
                                    </div><!-- Switches Color -->

                                    {#if errors?.qr_enabled}
                                        <strong class="text-danger ms-1 my-2">{errors.qr_enabled[0]}</strong>
                                    {/if}
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
                                        {#if errors?.file}
                                        <strong class="text-danger ms-1 my-2">{errors.file[0]}</strong>
                                        {/if}
                                    </div>
                                {:else}
                                    <figure class="figure">
                                        <img  alt="school logo " width="200" src={$schoolStore?.logo?.full_path} class="figure-img rounded avatar-xl mb-3 object-fit-cover" >
                                        <figcaption class="figure-caption">Current School logo</figcaption>
                                    </figure>
                                    
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