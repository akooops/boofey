<script>
    import { PathAddPackage } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    
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


    async function save(){
    
    
        let formData = new FormData(form)
        formData.append("features",JSON.stringify(features))
        formData.set("yearly",yearly)
        formData.set("hidden",hidden)
        formData.set("popular",popular)

        // formData.append("name",packageName)
    
        let res = await (await fetch(PathAddPackage(schoolId),{
            method:"POST",
            body:formData
        })).json()
    
        if(res.status == "success") {
            close.click()
            let text = `Added ${packageName} as a new package` 
            toast(text,"success")
            invalidate("packages:refresh")  
            reset()
        }
    
    
    }
    function addFeature(){
        console.log("adding feature")
        features = [...features,{name:"",checked:false}]
    }

    function deleteFeature(i){
        features.splice(i,1)
        features = features
    }

    function reset(){
        form.reset()
        features = []
        yearly = sale = tax = hidden = popular = false
    }
    
    </script>
    
    
    <div class="modal  fade" id="addPackageModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
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
                                    <input type="text" class="form-control" name="name" id="firstName" placeholder="Enter Package name" bind:value={packageName}>
                                </div>
                                <div>
                                    <label for="code" class="form-label">Package Code</label>
                                    <input type="text" name="code" class="form-control" id="firstName" placeholder="Enter package code" >
                                </div>
                                <div>
                                    <label for="exampleFormControlTextarea5" class="form-label">Package Description</label>
                                    <textarea class="form-control" name="description" id="exampleFormControlTextarea5" placeholder="Enter package description"  rows="3"></textarea>
                                </div>
                                <div class="row g-3 ps-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" name="yearly" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={yearly}>
                                        <label class="form-check-label" for="SwitchCheck1">Is Yearly</label>
                                    </div><!-- Switches Color -->
                                    <div class="form-check form-switch col">
                                        <input class="form-check-input" name="hidden" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={hidden}>
                                        <label class="form-check-label" for="SwitchCheck1">Is Hidden</label>
                                    </div><!-- Switches Color -->
                                    <div class="form-check form-switch col">
                                        <input class="form-check-input" name="popular" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={popular}>
                                        <label class="form-check-label" for="SwitchCheck1">Is Popular</label>
                                    </div>

                                </div>
                                {#if !yearly}
                                <div>
                                    <label for="days" class="form-label">Package Days</label>
                                    <input type="text" name="days" class="form-control" id="firstName" placeholder="Enter Package days" >
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
                                    <input type="text" class="form-control" name="price" id="firstName" placeholder="Enter Package price" >
                                </div>
                                {#if sale}
                                <div class="col-xxl-6">
                                    <label for="code" class="form-label">Package Sale Price</label>
                                    <input type="text" name="sale_price" class="form-control" id="firstName" placeholder="Enter Package Sale price" >
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
                                    <input type="text" name="tax" class="form-control" id="firstName" placeholder="Enter Package tax" >
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
                                            {#each features as feature,i}
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