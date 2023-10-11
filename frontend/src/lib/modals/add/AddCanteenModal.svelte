<script>
    import { PathAddCanteen } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import {redirector} from "$lib/api/auth"
    import { getContext } from "svelte"
    import Accordion from "$lib/components/Accordion.svelte";
    import SchoolsTableCollapse from "../collapses/SchoolsTableCollapse.svelte";

    let {apiStore} = getContext("apiStore")

    let canteenName
    let close
    let form
    let apiBtn
    let apiKey
    let resetSchool

    export let general
    export let schoolId
    let errors

    async function save(){
        errors = {}
        let formData = new FormData(form)    
        // if(schoolId == null){
        //     errors.school_id = ["school is required"]
        //     return;
            // }
        formData.set("school_id",schoolId)
        
    
        let res = await fetch(PathAddCanteen(schoolId,general),{
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
            $apiStore = res.data.api_key
            apiBtn.click()
            
            let text = `Added ${canteenName} as a new canteen` 
            toast(text,"success")
            invalidate("canteens:refresh")
            reset()


            

        }else {
            errors = res.errors
        }

    }

    function reset(){
        form.reset()
        if(general) resetSchool()
        schoolId = ""
        errors = {}
    }



    </script>
    
    
    <div class="modal  fade" id="addCanteenModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Year</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form   on:submit|preventDefault={save} bind:this={form}>
                        <div class="row g-3">
    
                                <div>
                                    <label for="canteenName" class="form-label">Canteen Name</label>
                                    <input type="text" class="form-control" id="canteenName" name="name" placeholder="Enter canteen name" bind:value={canteenName}>
                                    {#if errors?.name}
                                    <strong class="text-danger ms-1 my-2">{errors.name[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="productarName" class="form-label">Arabic Name</label>
                                    <input type="text" class="form-control" id="productName" name="name_ar" dir="rtl" placeholder="ادخل اسم المقصف">
                                    {#if errors?.name_ar}
                                    <strong class="text-danger ms-1 my-2">{errors.name_ar[0]}</strong>
                                    {/if}
                                </div>
                                
                                
                                <div>
                                <label for="exampleFormControlTextarea5" class="form-label">Canteen Address</label>
                                    <textarea class="form-control" name="address" id="exampleFormControlTextarea5" placeholder="Enter canteen address"  rows="3"></textarea>
                                    {#if errors?.address}
                                    <strong class="text-danger ms-1 my-2">{errors.address[0]}</strong>
                                    {/if}
                                </div>

                                <div>
                                    <label for="productarName" class="form-label">Arabic Address</label>
                                    <textarea class="form-control" name="address_ar" id="exampleFormControlTextarea5" dir="rtl" placeholder="ادخل عنوان المقصف"  rows="3"></textarea>
                                    {#if errors?.address_ar}
                                    <strong class="text-danger ms-1 my-2">{errors.address_ar[0]}</strong>
                                    {/if}
                                </div>
                                {#if general}
                                <Accordion id={"school"} title={"Canteens's School"}>               
                                    <SchoolsTableCollapse  on:select={(e) => schoolId = e.detail.schoolId} bind:resetSchool/>                     
                                </Accordion>
                                {#if errors?.school_id}
                                <strong class="text-danger ms-1 my-2">{errors.school_id[0]}</strong>
                                {/if}
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

    <!--  -->

    <span class="d-none" data-bs-toggle="modal" data-bs-target="#ApiModal" bind:this={apiBtn}></span>
    

