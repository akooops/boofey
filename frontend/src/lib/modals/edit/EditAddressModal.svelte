<script>
    import { PathUpdateBilling } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import { redirector } from "$lib/api/auth";
    import { getContext } from 'svelte';
    

    export let billingObj = {}
    let close
    let form
    let errors

    async function save(){
        errors = {}
    
        let formData = new FormData(form)    
        
        let res = await fetch(PathUpdateBilling(billingObj.id),{
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
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit Billing Address</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form   on:submit|preventDefault={save} bind:this={form}>
                        <div class="row g-3">
    
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="billinginfo-firstName" class="form-label">First Name</label>
                                    <input type="text" class="form-control" name="firstname" id="billinginfo-firstName" placeholder="Enter first name" bind:value={billingObj.firstname}>
                                    {#if errors?.firstname}
                                    <strong class="text-danger ms-1 my-2">{errors.firstname[0]}</strong>
                                    {/if}
                                </div>
                            </div>
                
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="billinginfo-lastName" class="form-label">Last Name</label>
                                    <input type="text" class="form-control" name="lastname" id="billinginfo-lastName" placeholder="Enter last name" bind:value={billingObj.lastname}>
                                    {#if errors?.lastname}
                                    <strong class="text-danger ms-1 my-2">{errors.lastname[0]}</strong>
                                    {/if}
                                </div>
                            </div>
                        </div>
                
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="billinginfo-email" class="form-label">Email</label>
                                    <input type="email" class="form-control" name="email" id="billinginfo-email" placeholder="Enter email"  bind:value={billingObj.email}>
                                    {#if errors?.email}
                                    <strong class="text-danger ms-1 my-2">{errors.email[0]}</strong>
                                    {/if}
                                </div>
                            </div>
                
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label for="billinginfo-phone" class="form-label">Phone</label>
                                    <input type="text" class="form-control" name="phone" id="billinginfo-phone" placeholder="Enter phone no."  bind:value={billingObj.phone}>
                                    {#if errors?.phone}
                                    <strong class="text-danger ms-1 my-2">{errors.phone[0]}</strong>
                                    {/if}
                                </div>
                            </div>
                        </div>
                
                        <div class="mb-3">
                            <label for="billinginfo-address" class="form-label">Address</label>
                            <textarea class="form-control" id="billinginfo-address" name="address" placeholder="Enter address" rows="3"  bind:value={billingObj.address}></textarea>
                            {#if errors?.address}
                                <strong class="text-danger ms-1 my-2">{errors.address[0]}</strong>
                            {/if}
                        </div>
                
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="zip" class="form-label">Country</label>
                                    <input type="text" class="form-control" id="zip"name="country" placeholder="Enter Country Name" bind:value={billingObj.country}>
                                    {#if errors?.country}
                                    <strong class="text-danger ms-1 my-2">{errors.country[0]}</strong>
                                    {/if}
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="zip" class="form-label">State</label>
                                    <input type="text" class="form-control" id="zip" name="state" placeholder="Enter State Name" bind:value={billingObj.state}>
                                    {#if errors?.state}
                                    <strong class="text-danger ms-1 my-2">{errors.state[0]}</strong>
                                    {/if}
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="zip" class="form-label">Zip Code</label>
                                    <input type="text" class="form-control" id="zip" name="zipcode" placeholder="Enter zip code" bind:value={billingObj.zipcode}>
                                    {#if errors?.zipcode}
                                    <strong class="text-danger ms-1 my-2">{errors.zipcode[0]}</strong>
                                    {/if}
                                </div>
                            </div>
                            
                                </div>
                                <div class="hstack gap-2 justify-content-end">
                                    <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>Close</button>
                                    <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save">
                                </div>
                            </form>
                        </div><!--end row-->
                    </div>
                <!-- </form> -->
            </div>
        </div>
