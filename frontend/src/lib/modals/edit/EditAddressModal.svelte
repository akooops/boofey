<script>
    import { PathUpdateBilling } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import { redirector } from "$lib/api/auth";
    import { getContext } from 'svelte';
    import {translation} from "$lib/translation.js"
    import {states} from "$lib/env.js"
    

    export let billingObj = {}
    let close
    let form
    let errors
let loading = false

    async function save(){
loading = true
        errors = {}
    
        let formData = new FormData(form)    
        formData.set("lang",localStorage.getItem("language"))
        
        let res = await fetch(PathUpdateBilling(billingObj.id),{
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
            let text = `Edited Billing address successfully ` 
            toast(text,"success")
            invalidate("billings:refresh")
            reset()
            
        }else {
            errors = res.errors
        }

    }

    function reset(){
        form.reset()
        // onHold = false
        errors = {}

    }



    </script>
    
    
    <div class="modal  fade" id="editAddressModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">{translation.editBillingAddress[localStorage.getItem("language")]}</h5>
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
    
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="billinginfo-firstName" class="form-label">{translation.firstName[localStorage.getItem("language")]}</label>
                                    <input type="text" class="form-control" name="firstname" id="billinginfo-firstName" placeholder={translation.enterFirstName[localStorage.getItem("language")]}  bind:value={billingObj.firstname}>
                                    {#if errors?.firstname}
                                    <strong class="text-danger ms-1 my-2">{errors.firstname[0]}</strong>
                                    {/if}
                                </div>
                            </div>
                
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="billinginfo-lastName" class="form-label">{translation.lastName[localStorage.getItem("language")]}</label>
                                    <input type="text" class="form-control" name="lastname" id="billinginfo-lastName" placeholder={translation.enterLastName[localStorage.getItem("language")]} bind:value={billingObj.lastname}>
                                    {#if errors?.lastname}
                                    <strong class="text-danger ms-1 my-2">{errors.lastname[0]}</strong>
                                    {/if}
                                </div>
                            </div>
                        </div>
                
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="billinginfo-email" class="form-label">{translation.email[localStorage.getItem("language")]}</label>
                                    <input type="email" class="form-control" name="email" id="billinginfo-email" placeholder={translation.enterEmail[localStorage.getItem("language")]} bind:value={billingObj.email}>
                                    {#if errors?.email}
                                    <strong class="text-danger ms-1 my-2">{errors.email[0]}</strong>
                                    {/if}
                                </div>
                            </div>
                
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="billinginfo-phone" class="form-label">{translation.phone[localStorage.getItem("language")]}</label>
                                    <input type="tel" class="form-control" name="phone" id="billinginfo-phone" placeholder={translation.enterPhone[localStorage.getItem("language")]}  bind:value={billingObj.phone}>
                                    {#if errors?.phone}
                                    <strong class="text-danger ms-1 my-2">{errors.phone[0]}</strong>
                                    {/if}
                                </div>
                            </div>
                        </div>
                
                        <div class="mb-3">
                            <label for="billinginfo-address" class="form-label">{translation.address[localStorage.getItem("language")]}</label>
                            <textarea class="form-control" id="billinginfo-address" name="address" placeholder={translation.enterAddress[localStorage.getItem("language")]} rows="3"  bind:value={billingObj.address}></textarea>
                            {#if errors?.address}
                                <strong class="text-danger ms-1 my-2">{errors.address[0]}</strong>
                            {/if}
                        </div>
                
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="zip" class="form-label">{translation.state[localStorage.getItem("language")]}</label>
                                            <select class="form-select" name="state" id="class" aria-label="Default select example" bind:value={billingObj.state}>
                                                <option disabled selected value> -- {translation.selectState[localStorage.getItem("language")]} -- </option>
                                                {#each states as state}
                                                    <option value={state.name_en}>{state.name_en}</option>
                                                {/each}
                                            </select>
                                            {#if errors?.state}
                                            <strong class="text-danger ms-1 my-2">{errors.state[0]}</strong>
                                            {/if}
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="zip" class="form-label">{translation.city[localStorage.getItem("language")]}</label>
                                            <input type="text" class="form-control" id="zip" name="city" placeholder="{translation.enterCity[localStorage.getItem("language")]}" bind:value={billingObj.city}>
                                            {#if errors?.city}
                                                <strong class="text-danger ms-1 my-2">{errors.city[0]}</strong>
                                            {/if}
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="zip" class="form-label">{translation.zipCode[localStorage.getItem("language")]}</label>
                                            <input type="text" class="form-control" id="zip" name="zipcode" placeholder={translation.enterZipCode[localStorage.getItem("language")]} bind:value={billingObj.zipcode}>
                                            {#if errors?.zipcode}
                                            <strong class="text-danger ms-1 my-2">{errors.zipcode[0]}</strong>
                                            {/if}
                                        </div>
                                    </div>
                                </div>

                                <div class="hstack gap-2 justify-content-end">
                                    <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>{translation.close[localStorage.getItem("language")]}</button>
                                    <input type="submit" class="btn btn-primary waves-effect waves-light" value="{translation.save[localStorage.getItem("language")]}">
                                </div>
                            </form>
                        </div><!--end row-->
                    </div>
                <!-- </form> -->
            </div>
        </div>
