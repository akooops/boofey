<script>
    import { PathAddProduct } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import { redirector } from "$lib/api/auth";
    
    let productName
    let close
    let form
    let errors
let loading = false
    let selectCategory
    export let categories = []
    async function save(){
loading = true
        errors = {}
    
        let formData = new FormData(form)    
        
        let res = await fetch(PathAddProduct(),{
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
            let text = `Added ${productName} as a new product` 
            toast(text,"success")
            invalidate("products:refresh")
            reset()
            
        }else {
            errors = res.errors
        }

    }

    function reset(){
        form.reset()
        selectCategory.selectedIndex = 0
        errors = {}
    }



    </script>
    
    
    <div class="modal  fade" id="addProductModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
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
                                    <input type="text" class="form-control" id="productName" name="name" placeholder="Enter Product name" bind:value={productName}>
                                    {#if errors?.name}
                                    <strong class="text-danger ms-1 my-2">{errors.name[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="productarName" class="form-label">Arabic Name</label>
                                    <input type="text" class="form-control" id="productName" name="name_ar" dir="rtl" placeholder="ادخل اسم المنتج">
                                    {#if errors?.name_ar}
                                    <strong class="text-danger ms-1 my-2">{errors.name_ar[0]}</strong>
                                    {/if}
                                </div>
                                
                                <div>
                                    <label for="productarName" class="form-label">Description</label>
                                    <textarea class="form-control" name="description" id="exampleFormControlTextarea5" placeholder="Enter product description"  rows="3"></textarea>
                                    {#if errors?.description}
                                    <strong class="text-danger ms-1 my-2">{errors.description[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="productarName" class="form-label">Arabic Description</label>
                                    <textarea class="form-control" name="description_ar" id="exampleFormControlTextarea5" dir="rtl"  placeholder="ادخل وصف المنتح"  rows="3"></textarea>
                                    {#if errors?.description_ar}
                                    <strong class="text-danger ms-1 my-2">{errors.description_ar[0]}</strong>
                                    {/if}
                                </div>
                                <div class="col-xxl-6">
                                    <label for="code" class="form-label">Price</label>
                                    <input type="text" name="price" class="form-control" id="firstName" placeholder="Enter Product price" >
                                    {#if errors?.price}
                                    <strong class="text-danger ms-1 my-2">{errors.price[0]}</strong>
                                    {/if}
                                </div>
                                <div class="col-xxl-6">
                                    <label for="code" class="form-label">Sale Price</label>
                                    <input type="text" name="sale_price" class="form-control" id="firstName" placeholder="Enter Product Sale price" >
                                    {#if errors?.sale_price}
                                    <strong class="text-danger ms-1 my-2">{errors.sale_price[0]}</strong>
                                    {/if}
                                </div>

                                <div class="col-lg-12">
                                    <label for="role" class="form-label">Category</label>
                                    <select class="form-select" name="category_id" id="role" aria-label="Default select example" bind:this={selectCategory}>
                                        <option disabled selected value> -- select a package -- </option>
                                        {#each categories as category}
                                        <option value={category.id}>{category.name}</option>
                                        {/each}
                                    </select>
                                    {#if errors?.category_id}
                                    <strong class="text-danger ms-1 my-2">{errors.category_id[0]}</strong>
                                    {/if}
                                </div>


                                <div>
                                    <label for="formFile" class="form-label">Product Image</label>
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