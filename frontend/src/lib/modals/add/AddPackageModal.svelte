<script>
    import { PathAddPackage } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import Accordion from "$lib/components/Accordion.svelte";
    import SchoolsTableCollapse from "../collapses/SchoolsTableCollapse.svelte";
    import { bill,formatTimestamp } from "$lib/utils.js";
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"

    export let general
    export let schoolId
    let resetSchool
    let packageName
    let close
    let form
    let features = []
    let yearly = false// switch value for yearly 
    let sale  // switch value for sale_price 
    let tax // switch value for tax 
    let hidden = false
    let popular = false
    let errors
let loading = false
let shouldStartLater = false
    let shouldStartAtInput

    let menuEn
    let menuAr

    async function save(){
loading = true
    
        errors = {}
        let formData = new FormData(form)
        formData.append("features",JSON.stringify(features))
        formData.set("yearly",yearly)
        formData.set("hidden",hidden)
        formData.set("popular",popular)
        formData.set("school_id",schoolId)
        // formData.set("should_start_later",shouldStartLater)

        formData.set("menu_en",menuEn)
        formData.set("menu_ar",menuAr)
        // formData.append("name",packageName)
        
        let res = await fetch(PathAddPackage(schoolId,general),{
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
            let text = `Added ${packageName} as a new package` 
            toast(text,"success")
            invalidate("packages:refresh")  
            reset()
        }else {
            errors = res.errors
        }
    
    
    
    }
    function addFeature(){
        features = [...features,{name:"",checked:false}]
    }

    function deleteFeature(i){
        features.splice(i,1)
        features = features
    }

    function reset(){
        // loadDefaultDate(shouldStartAtInput,Date.now())
        form.reset()
        features = []
        yearly = sale = tax = hidden = popular = shouldStartLater = false
        if(general) resetSchool()
        schoolId = ""
        errors = {}
    }
    import {Editor} from '@tadashi/svelte-editor-quill'

    const options = {
        theme: 'snow',
        plainclipboard: true
    }

    
    function onTextChangeEn(event) {
        menuEn = event.detail.html
    }

    function onTextChangeAr(event) {
        menuAr = event.detail.html
    }
    </script>

<svelte:head>
  <link rel="preconnect" href="https://cdn.quilljs.com" crossorigin>
  <link rel="stylesheet" href="https://cdn.quilljs.com/1.3.7/quill.snow.css">
</svelte:head>


    <div class="modal  fade" id="addPackageModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Package</h5>
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
                                    <label for="name" class="form-label">Package Name</label>
                                    <input type="text" class="form-control" name="name" id="firstName" placeholder="Enter Package name" bind:value={packageName}>
                                    {#if errors?.name}
                                    <strong class="text-danger ms-1 my-2">{errors.name[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="productarName" class="form-label">Arabic Name</label>
                                    <input type="text" class="form-control" id="productName" name="name_ar" dir="rtl" placeholder="ادخل اسم الباقة">
                                    {#if errors?.name_ar}
                                    <strong class="text-danger ms-1 my-2">{errors.name_ar[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="code" class="form-label">Package Code</label>
                                    <input type="text" name="code" class="form-control" id="firstName" placeholder="Enter package code" >
                                    {#if errors?.code}
                                    <strong class="text-danger ms-1 my-2">{errors.code[0]}</strong>
                                    {/if}
                                </div>
                                {#if general}
                                    <SchoolsTableCollapse collapse={true} on:select={(e) => schoolId = e.detail.schoolId} bind:resetSchool title={"Package's School"}/>                     
                                {#if errors?.school_id}
                                <strong class="text-danger ms-1 my-2">{errors.school_id[0]}</strong>
                                {/if}
                                {/if}


                                <div>
                                    <label for="exampleFormControlTextarea5" class="form-label">Package Description</label>
                                    <textarea class="form-control" name="description" id="exampleFormControlTextarea5" placeholder="Enter package description"  rows="3"></textarea>
                                    {#if errors?.description}
                                    <strong class="text-danger ms-1 my-2">{errors.description[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="productarName" class="form-label">Arabic Description</label>
                                    <textarea class="form-control" name="description_ar" id="exampleFormControlTextarea5" dir="rtl" placeholder="ادخل وصف الباقة"  rows="3"></textarea>
                                    {#if errors?.description_ar}
                                    <strong class="text-danger ms-1 my-2">{errors.description_ar[0]}</strong>
                                    {/if}
                                </div>
                                <!-- <div class="row ps-3 g-3">
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={shouldStartLater}>
                                        <label class="form-check-label" for="SwitchCheck1">Should Start Later</label>
                                    </div>
                                    {#if errors?.should_start_later}
                                    <strong class="text-danger ms-1 my-2">{errors.should_start_later[0]}</strong>
                                    {/if}
                                </div>
                                <div class="col-xxl-12" class:d-none={!shouldStartLater}>
                                    <label for="from" class="form-label">Should Sart At</label> 
                                    <input type="text" name="should_start_at" class="form-control" placeholder="Insert start date" data-provider="flatpickr"  data-minDate="{formatTimestamp(Date.now())}"  data-date-format="Y-m-d" id="from" bind:this={shouldStartAtInput}>
                                    {#if errors?.should_start_at}
                                    <strong class="text-danger ms-1 my-2">{errors.should_start_at[0]}</strong>
                                    {/if}
                                </div> -->
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
                                    <input type="text" class="form-control" name="price" id="firstName" placeholder="Enter Package price" >
                                    {#if errors?.price}
                                    <strong class="text-danger ms-1 my-2">{errors.price[0]}</strong>
                                    {/if}
                                </div>
                                {#if sale}
                                <div class="col-xxl-6">
                                    <label for="code" class="form-label">Package Sale Price</label>
                                    <input type="text" name="sale_price" class="form-control" id="firstName" placeholder="Enter Package Sale price" >
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
                                    <input type="text" name="tax" class="form-control" id="firstName" placeholder="Enter Package tax" >
                                    {#if errors?.tax}
                                    <strong class="text-danger ms-1 my-2">{errors.tax[0]}</strong>
                                    {/if}
                                </div>
                                {/if}

                                <div>
                                    <label for="code" class="form-label">Menu English</label>
                                    <Editor {options} on:text-change={onTextChangeEn} data='' />

                                    {#if errors?.menu_en}
                                    <strong class="text-danger ms-1 my-2">{errors.menu_en[0]}</strong>
                                    {/if}
                                </div>

                                <div>
                                    <label for="code" class="form-label">Menu Arabic</label>
                                    <Editor {options} on:text-change={onTextChangeAr} data='' />
                                    {#if errors?.menu_ar}
                                    <strong class="text-danger ms-1 my-2">{errors.menu_ar[0]}</strong>
                                    {/if}
                                </div>



                                <!-- <hr class="border border-primary  opacity-25"/> -->
                                <div class="flex-shrink-0  text-end ">
                                    <button type="button"  on:click={addFeature} class=" align-self-end btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i> Add Feature</button>
                                </div>
                               
                                <div class="table-responsive">
                                    <table class="table align-end table-nowrap mb-0 border-top">
                                        <thead class="table-light">
                                            <tr>
                                                <th scope="col">Feature Name</th>
                                                <th scope="col">Arabic Name</th>
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
                                                    <input type="text" class="form-control" id="firstName" dir="rtl" placeholder="ادخل اسم الميزة" bind:value={feature.name_ar}>
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