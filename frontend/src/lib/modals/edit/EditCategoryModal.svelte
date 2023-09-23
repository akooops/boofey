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

    async function save(){
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
    
        if(res.status == "success") {
            close.click()
            let text = `Added ${categoryStore.name} as a new category` 
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
                <div class="modal-body">
                    <form   on:submit|preventDefault={save} bind:this={form}>
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