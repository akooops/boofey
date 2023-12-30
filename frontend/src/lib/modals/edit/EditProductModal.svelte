<script>
    import { PathUpdateProduct } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import { redirector } from "$lib/api/auth";
    import { getContext } from 'svelte';
    
    let close
    let form
    let errors
let loading = false
    let selectCategory
    let categoryId
    let editImage = false

    let {productStore} = getContext("productStore")

    export let categories = []
    async function save(){
loading = true
        errors = {}
    
        let formData = new FormData(form)    
        formData.set("edit_image",editImage)
        
        let res = await fetch(PathUpdateProduct($productStore.id),{
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
            let text = `Edited ${$productStore.name} successfully` 
            toast(text,"success")
            invalidate("products:refresh")
            reset()
            
        }else {
            errors = res.errors
        }

    }

    function reset(){
        form.reset()
        editImage = false
        selectCategory.selectedIndex = 0
        errors = {}
    }

    productStore.subscribe(() => {
        
        categoryId = $productStore?.category?.id

    })



    </script>
    
    
    <div class="modal  fade" id="editProductModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Product</h5>
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
                                    <label for="productName" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="productName" name="name" placeholder="Enter Product name" bind:value={$productStore.name}>
                                    {#if errors?.name}
                                    <strong class="text-danger ms-1 my-2">{errors.name[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="productarName" class="form-label">Arabic Name</label>
                                    <input type="text" class="form-control" id="productName" name="name_ar" dir="rtl" placeholder="ادخل اسم المنتج" bind:value={$productStore.name_ar}>
                                    {#if errors?.name_ar}
                                    <strong class="text-danger ms-1 my-2">{errors.name_ar[0]}</strong>
                                    {/if}
                                </div>
                                
                                <div>
                                    <label for="productarName" class="form-label">Description</label>
                                    <textarea class="form-control" name="description" id="exampleFormControlTextarea5" placeholder="Enter product description"  rows="3" bind:value={$productStore.description}></textarea>
                                    {#if errors?.description}
                                    <strong class="text-danger ms-1 my-2">{errors.description[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="productarName" class="form-label">Arabic Description</label>
                                    <textarea class="form-control" name="description_ar" id="exampleFormControlTextarea5" dir="rtl"  placeholder="ادخل وصف المنتح"  rows="3" bind:value={$productStore.description_ar}></textarea>
                                    {#if errors?.description_ar}
                                    <strong class="text-danger ms-1 my-2">{errors.description_ar[0]}</strong>
                                    {/if}
                                </div>
                                <div class="col-xxl-6">
                                    <label for="code" class="form-label">Price</label>
                                    <input type="text" name="price" class="form-control" id="firstName" placeholder="Enter Product price" bind:value={$productStore.price}>
                                    {#if errors?.price}
                                    <strong class="text-danger ms-1 my-2">{errors.price[0]}</strong>
                                    {/if}
                                </div>
                                <div class="col-xxl-6">
                                    <label for="code" class="form-label">Sale Price</label>
                                    <input type="text" name="sale_price" class="form-control" id="firstName" placeholder="Enter Product Sale price" bind:value={$productStore.sale_price}>
                                    {#if errors?.sale_price}
                                    <strong class="text-danger ms-1 my-2">{errors.sale_price[0]}</strong>
                                    {/if}
                                </div>

                                <div class="col-lg-12">
                                    <label for="role" class="form-label">Category</label>
                                    <select class="form-select" name="category_id" id="role" aria-label="Default select example" bind:this={selectCategory} bind:value={categoryId}>
                                        <!-- <option disabled selected value> -- select a package -- </option -->
                                        {#each categories as category}
                                        <option value={category.id}>{category.name}</option>
                                        {/each}
                                    </select>
                                    {#if errors?.category_id}
                                    <strong class="text-danger ms-1 my-2">{errors.category_id[0]}</strong>
                                    {/if}
                                </div>

                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={editImage}>
                                        <label class="form-check-label" for="SwitchCheck1">Edit Image</label>
                                    </div><!-- Switches Color -->

                                </div>

                                {#if editImage}
                                <div>
                                    <label for="formFile" class="form-label">Product Image</label>
                                    <input class="form-control" name="file" type="file" id="formFile">
                                    {#if errors?.file}
                                    <strong class="text-danger ms-1 my-2">{errors.file[0]}</strong>
                                    {/if}
                                </div>
                                {:else}
                                <figure class="figure">
                                    <img  alt="product image " width="200" src={$productStore?.image?.full_path} class="figure-img rounded avatar-xl mb-3 object-fit-cover" >
                                    <figcaption class="figure-caption">Current Product image</figcaption>
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