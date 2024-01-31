<script>
    import { PathUpdateDivision } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import { redirector } from "$lib/api/auth";
    import { getContext } from "svelte";
    
    let {divisionStore} = getContext("divisionStore")

    let close
    let form
    let errors
let loading = false

    async function save(){
loading = true
        errors = {}
    
        let formData = new FormData(form)    
        
        let res = await fetch(PathUpdateDivision($divisionStore.id),{
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
            let text = `Edited ${divisionStore.name} successfuly` 
            toast(text,"success")
            invalidate("divisions:refresh")
            reset()
            
        }else {
            errors = res.errors
        }

    }

    function reset(){
        form.reset()
        errors = {}
    }



    </script>
    
    
    <div class="modal  fade" id="editDivisionModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Division</h5>
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
                                    <label for="divisionName" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="divisionName" name="name" placeholder="Enter Division name" bind:value={$divisionStore.name}>
                                    {#if errors?.name}
                                    <strong class="text-danger ms-1 my-2">{errors.name[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="divisionarName" class="form-label">Arabic Name</label>
                                    <input type="text" class="form-control" id="divisionName" name="name_ar" dir="rtl" placeholder="ادخل اسم القسم" bind:value={$divisionStore.name_ar}>
                                    {#if errors?.name_ar}
                                    <strong class="text-danger ms-1 my-2">{errors.name_ar[0]}</strong>
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