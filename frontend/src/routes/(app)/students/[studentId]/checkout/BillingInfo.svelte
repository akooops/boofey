<script>
    import {PathAddBilling} from "$lib/api/paths"
    import { createEventDispatcher,onMount } from 'svelte';
    
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";

const dispatch = createEventDispatcher();

import SavedAdress from "./SavedAdress.svelte";
import DeleteAddressModal from "$lib/modals/delete/DeleteAddressModal.svelte";
import EditAddressModal from "$lib/modals/edit/EditAddressModal.svelte";

export let billings
let newAdress = false
let addressId

let billingObj

let form
let errors = {}

async function SendAdress(){

    if(newAdress){
        errors = {}
        let formData = new FormData(form)

        let res = await fetch(PathAddBilling(),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
    
        if(res.status == "success") {
            let text = `Added a new Billing Address` 
            toast(text,"success")
            // newAdress = false
            invalidate("billings:refresh")
            addressId = res.data.billing.id  

            // reset()
            
        }else {
            errors = res.errors
        }

    }





    dispatch("proceed",{addressId})
}

onMount(() => {
    if(billings[0]){
        addressId = billings[0].id
    }
})

function select(e){
    addressId = e.detail.addressId
}

function setBillingObj(e){
    
    billingObj = e.detail.billing
    console.log(billingObj)
}

</script>
<div>
    <h5 class="mb-1">Billing Information</h5>
    <p class="text-muted mb-4">Please fill all information below</p>
</div>

<div class="">
    <!-- Switches Color -->
    <div class="form-check form-switch col" >
        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={newAdress}>
        <label class="form-check-label" for="SwitchCheck1">Use a New Adress</label>
    </div><!-- Switches Color -->

</div>

<form  on:submit|preventDefault={SendAdress} bind:this={form}>
    {#if newAdress}
    <div class="mt-4">
        <div class="row">
            <div class="col-sm-6">
                <div class="mb-3">
                    <label for="billinginfo-firstName" class="form-label">First Name</label>
                    <input type="text" class="form-control" name="firstname" id="billinginfo-firstName" placeholder="Enter first name" value="">
                    {#if errors?.firstname}
                    <strong class="text-danger ms-1 my-2">{errors.firstname[0]}</strong>
                    {/if}
                </div>
            </div>

            <div class="col-sm-6">
                <div class="mb-3">
                    <label for="billinginfo-lastName" class="form-label">Last Name</label>
                    <input type="text" class="form-control" name="lastname" id="billinginfo-lastName" placeholder="Enter last name" value="">
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
                    <input type="email" class="form-control" name="email" id="billinginfo-email" placeholder="Enter email">
                    {#if errors?.email}
                    <strong class="text-danger ms-1 my-2">{errors.email[0]}</strong>
                    {/if}
                </div>
            </div>

            <div class="col-sm-6">
                <div class="mb-3">
                    <label for="billinginfo-phone" class="form-label">Phone</label>
                    <input type="text" class="form-control" name="phone" id="billinginfo-phone" placeholder="Enter phone no.">
                    {#if errors?.phone}
                    <strong class="text-danger ms-1 my-2">{errors.phone[0]}</strong>
                    {/if}
                </div>
            </div>
        </div>

        <div class="mb-3">
            <label for="billinginfo-address" class="form-label">Address</label>
            <textarea class="form-control" id="billinginfo-address" name="address" placeholder="Enter address" rows="3"></textarea>
            {#if errors?.address}
                <strong class="text-danger ms-1 my-2">{errors.address[0]}</strong>
            {/if}
        </div>

        <div class="row">
            <div class="col-md-4">
                <div class="mb-3">
                    <label for="zip" class="form-label">Country</label>
                    <input type="text" class="form-control" id="zip"name="country" placeholder="Enter Country Name">
                    {#if errors?.country}
                    <strong class="text-danger ms-1 my-2">{errors.country[0]}</strong>
                    {/if}
                </div>
            </div>
            <div class="col-md-4">
                <div class="mb-3">
                    <label for="zip" class="form-label">State</label>
                    <input type="text" class="form-control" id="zip" name="state" placeholder="Enter State Name">
                    {#if errors?.state}
                    <strong class="text-danger ms-1 my-2">{errors.state[0]}</strong>
                    {/if}
                </div>
            </div>
            <div class="col-md-4">
                <div class="mb-3">
                    <label for="zip" class="form-label">Zip Code</label>
                    <input type="text" class="form-control" id="zip" name="zipcode" placeholder="Enter zip code">
                    {#if errors?.zipcode}
                    <strong class="text-danger ms-1 my-2">{errors.zipcode[0]}</strong>
                    {/if}
                </div>
            </div>
        </div>

    </div>
    {:else}
    <div class="mt-4">
        <div class="d-flex align-items-center mb-2">
            <div class="flex-grow-1">
                <h5 class="fs-14 mb-0">Saved Address</h5>
            </div>
        </div>
        <div class="row gy-3">
            {#each billings as billing,_ (billing.id)}
                <SavedAdress {billing} bind:selectedaddressId={addressId} on:select={select} on:setBillingObj={setBillingObj}/>
            {/each}
        </div>
        <DeleteAddressModal {billingObj}/>
        <EditAddressModal {billingObj}/>

    </div>
    {/if}
    <div class="d-flex align-items-start gap-3 mt-3">
        <button type="button" class="btn btn-primary btn-label right ms-auto nexttab" on:click={SendAdress}>
            <i class="ri-bank-card-line label-icon align-middle fs-16 ms-2"></i>Proceed to Payment
        </button>
    </div>
</form>