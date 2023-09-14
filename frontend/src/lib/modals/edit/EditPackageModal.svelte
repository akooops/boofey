<script>
    import { PathUpdatePackage } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { getContext, onMount } from "svelte";
    import { redirector } from "$lib/api/auth";
    
    export let schoolId
    let packageName
    let close
    let form
    let features = []
    let yearly // switch value for yearly 
    let sale // switch value for sale_price 
    let tax // switch value for tax 
    let hidden
    let popular
    let errors
    let {packageStore} = getContext("packageStore")
    let packageStoreInstance


    async function save(){
        
        errors = {}
    
        let formData = new FormData(form)
        formData.append("features",JSON.stringify(packageStoreInstance.package_features))
        formData.set("yearly",packageStoreInstance.yearly)
        formData.set("hidden",packageStoreInstance.hidden)
        formData.set("popular",packageStoreInstance.popular)

        // formData.append("name",packageName)
    
        let res = await fetch(PathUpdatePackage(packageStoreInstance.id),{
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
            let text = `Edited ${packageName} ` 
            toast(text,"success")
            invalidate("packages:refresh")  
            reset()
        }else {
            errors = res.errors
        }
    
    
    
    }
    function addFeature(){
        packageStoreInstance.package_features = [...packageStoreInstance.package_features,{name:"",checked:false}]
    }

    function deleteFeature(i){
        packageStoreInstance.package_features.splice(i,1)
        packageStoreInstance.package_features = packageStoreInstance.package_features
    }

    function reset(){
        errors = {}

    }

    packageStore.subscribe(() => {

        packageStoreInstance = JSON.parse(JSON.stringify($packageStore))
        sale = packageStoreInstance.sale_price ? true : false
        tax = packageStoreInstance.tax ? true : false


    })

    </script>
    
    
    <div class="modal  fade" id="editPackageModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Package</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form   on:submit|preventDefault={save} bind:this={form}>
                        <div class="row g-3">
    
                                <div>
                                    <label for="name" class="form-label">Package Name</label>
                                    <input type="text" class="form-control" name="name" id="firstName" placeholder="Enter Package name" bind:value={packageStoreInstance.name}>
                                    {#if errors?.name}
                                    <strong class="text-danger ms-1 my-2">{errors.name[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="code" class="form-label">Package Code</label>
                                    <input type="text" name="code" class="form-control" id="firstName" placeholder="Enter package code" bind:value={packageStoreInstance.code}>
                                    {#if errors?.code}
                                    <strong class="text-danger ms-1 my-2">{errors.code[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="exampleFormControlTextarea5" class="form-label">Package Description</label>
                                    <textarea class="form-control" name="description" id="exampleFormControlTextarea5" placeholder="Enter package description"  bind:value={packageStoreInstance.description} rows="3"></textarea>
                                    {#if errors?.description}
                                    <strong class="text-danger ms-1 my-2">{errors.description[0]}</strong>
                                    {/if}
                                </div>
                                <div class="row g-3 ps-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" name="yearly" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={packageStoreInstance.yearly}>
                                        <label class="form-check-label" for="SwitchCheck1">Is Yearly</label>
                                    </div><!-- Switches Color -->
                                    <div class="form-check form-switch col">
                                        <input class="form-check-input" name="hidden" type="checkbox" role="switch" id="SwitchCheck1"  bind:checked={packageStoreInstance.hidden}>
                                        <label class="form-check-label" for="SwitchCheck1">Is Hidden</label>
                                    </div><!-- Switches Color -->
                                    <div class="form-check form-switch col">
                                        <input class="form-check-input" name="popular" type="checkbox" role="switch" id="SwitchCheck1"  bind:checked={packageStoreInstance.popular}>
                                        <label class="form-check-label" for="SwitchCheck1">Is Popular</label>
                                    </div>

                                </div>
                                {#if !packageStoreInstance.yearly}
                                <div>
                                    <label for="days" class="form-label">Package Days</label>
                                    <input type="text" name="days" class="form-control" id="firstName" placeholder="Enter Package days" bind:value={packageStoreInstance.days}>
                                    {#if errors?.days}
                                    <strong class="text-danger ms-1 my-2">{errors.days[0]}</strong>
                                    {/if}
                                </div>
                                {/if}
                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={sale}>
                                        <label class="form-check-label" for="SwitchCheck1">Include a sale price</label>
                                    </div><!-- Switches Color -->

                                </div>


                                <div class:col-xxl-6={sale}>
                                    <label for="name" class="form-label">Package Price</label>
                                    <input type="text" class="form-control" name="price" id="firstName" placeholder="Enter Package price" bind:value={packageStoreInstance.price}>
                                    {#if errors?.price}
                                    <strong class="text-danger ms-1 my-2">{errors.price[0]}</strong>
                                    {/if}
                                </div>
                                {#if sale}
                                <div class="col-xxl-6">
                                    <label for="code" class="form-label">Package Sale Priccode898255e</label>
                                    <input type="text" name="sale_price" class="form-control" id="firstName" placeholder="Enter Package Sale price" bind:value={packageStoreInstance.sale_price}>
                                    {#if errors?.sale_price}
                                    <strong class="text-danger ms-1 my-2">{errors.sale_price[0]}</strong>
                                    {/if}
                                </div>
                                {/if}

                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={tax}>
                                        <label class="form-check-label" for="SwitchCheck1">Include a tax</label>
                                    </div><!-- Switches Color -->

                                </div>
                                {#if tax}
                                <div >
                                    <label for="code" class="form-label">Package Tax %</label>
                                    <input type="text" name="tax" class="form-control" id="firstName" placeholder="Enter Package tax" bind:value={packageStoreInstance.tax}>
                                    {#if errors?.tax}
                                    <strong class="text-danger ms-1 my-2">{errors.tax[0]}</strong>
                                    {/if}
                                </div>
                                {/if}
                                <!-- <hr class="border border-primary  opacity-25"/> -->
                                <div class="flex-shrink-0  text-end ">
                                    <button type="button"  on:click={addFeature} class=" align-self-end btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i> Add Feature</button>
                                </div>
                               
                                
                                <div class="table-responsive">
                                    <table class="table align-end table-nowrap mb-0 border-top">
                                        <thead class="table-light">
                                            <tr>
                                                <th scope="col">Feature Name</th>
                                                <th scope="col">Checked</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody class="list">
                                            {#each packageStoreInstance.package_features || [] as feature,i}
                                            <tr class="align-middle">
                                                <td>
                                                     <input type="text" class="form-control" id="firstName" placeholder="Enter Feature Name" bind:value={feature.name}>
                                                </td>
                                                <td>
                                                <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={feature.checked}>
                                                </td>
                                                <td>    
                                                <a role="button" class="fs-15" data-bs-toggle="tooltip" data-bs-title="Delete" on:click={() => deleteFeature(i)}><i class="ri-delete-bin-line"></i></a>
                                                </td>
                                            </tr>
                                            {/each}
                                        </tbody>
                                    </table>
                            
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