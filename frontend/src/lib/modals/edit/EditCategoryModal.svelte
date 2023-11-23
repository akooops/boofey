<script>
    import { PathUpdateCategory } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import { redirector } from "$lib/api/auth";
    import { getContext } from "svelte";
    
    let {categoryStore} = getContext("categoryStore")

    let close
    let form
    let errors
let loading = false

    async function save(){
loading = true
        errors = {}
    
        let formData = new FormData(form)    
        
        let res = await fetch(PathUpdateCategory($categoryStore.id),{
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
            let text = `Edited ${categoryStore.name} successfuly` 
            toast(text,"success")
            invalidate("categories:refresh")
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
    
    
    <div class="modal  fade" id="editCategoryModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Category</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                            <div class="modal-body" >
                {#if loading }
                <div class="text-center">
                    <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                </div>
                {/if}

                <form  on:submit={save} bind:this={form} class:d-none={loading}>
                        <div class="row g-3">
    
                                <div>
                                    <label for="categoryName" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="categoryName" name="name" placeholder="Enter Category name" bind:value={$categoryStore.name}>
                                    {#if errors?.name}
                                    <strong class="text-danger ms-1 my-2">{errors.name[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="categoryarName" class="form-label">Arabic Name</label>
                                    <input type="text" class="form-control" id="categoryName" name="name_ar" dir="rtl" placeholder="ادخل اسم الصنف" bind:value={$categoryStore.name_ar}>
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