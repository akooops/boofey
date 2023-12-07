<script>
    import {PathAddBilling} from "$lib/api/paths"
    import { createEventDispatcher,onMount } from 'svelte';
    
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import {states} from "$lib/env.js"
    import {translation} from "$lib/translation.js"
    import { page } from '$app/stores';  

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
        
        formData.set("lang",localStorage.getItem("language"))
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
            invalidate("checkOut:refresh")
            addressId = res.data.billing.id  
            dispatch("proceed",{addressId})
        }else {
            errors = res.errors
        }

    }else {
        
        if(addressId){
            dispatch("proceed",{addressId})
        }

    }




}

onMount(() => {
    if(billings[0]){
        addressId = billings[0].id
    }
    addressId = $page.url.searchParams.get("billing") ? $page.url.searchParams.get("billing") : addressId 
})

function select(e){
    addressId = e.detail.addressId
}

function setBillingObj(e){
    
    billingObj = e.detail.billing
}

</script>
<div>
    <h5 class="mb-1">{translation.billingInfo[localStorage.getItem("language")]}</h5>
    <p class="text-muted mb-4">{translation.pleaseFillInfo[localStorage.getItem("language")]}</p>
</div>

<div class="">
    <!-- Switches Color -->
    <div class="form-check form-switch col" >
        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={newAdress}>
        <label class="form-check-label" for="SwitchCheck1">{translation.userNewAddress[localStorage.getItem("language")]}</label>
    </div><!-- Switches Color -->

</div>

<form  on:submit|preventDefault={SendAdress} bind:this={form}>
    <div class="mt-4" class:d-none={!newAdress}>
        <div class="row">
            <div class="col-sm-6">
                <div class="mb-3">
                    <label for="billinginfo-firstName" class="form-label">{translation.firstName[localStorage.getItem("language")]}</label>
                    <input type="text" class="form-control" name="firstname" id="billinginfo-firstName" placeholder={translation.enterFirstName[localStorage.getItem("language")]} value="">
                    {#if errors?.firstname}
                    <strong class="text-danger ms-1 my-2">{errors.firstname[0]}</strong>
                    {/if}
                </div>
            </div>

            <div class="col-sm-6">
                <div class="mb-3">
                    <label for="billinginfo-lastName" class="form-label">{translation.lastName[localStorage.getItem("language")]}</label>
                    <input type="text" class="form-control" name="lastname" id="billinginfo-lastName" placeholder={translation.enterLastName[localStorage.getItem("language")]} value="">
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
                    <input type="email" class="form-control" name="email" id="billinginfo-email" placeholder={translation.enterEmail[localStorage.getItem("language")]}>
                    {#if errors?.email}
                    <strong class="text-danger ms-1 my-2">{errors.email[0]}</strong>
                    {/if}
                </div>
            </div>

            <div class="col-sm-6">
                <div class="mb-3">
                    <label for="billinginfo-phone" class="form-label">{translation.phone[localStorage.getItem("language")]}</label>
                    <input type="tel" class="form-control" name="phone" id="billinginfo-phone" placeholder={translation.enterPhone[localStorage.getItem("language")]}>
                    {#if errors?.phone}
                    <strong class="text-danger ms-1 my-2">{errors.phone[0]}</strong>
                    {/if}
                </div>
            </div>
        </div>

        <div class="mb-3">
            <label for="billinginfo-address" class="form-label">{translation.address[localStorage.getItem("language")]}</label>
            <textarea class="form-control" id="billinginfo-address" name="address" placeholder={translation.enterAddress[localStorage.getItem("language")]} rows="3"></textarea>
            {#if errors?.address}
                <strong class="text-danger ms-1 my-2">{errors.address[0]}</strong>
            {/if}
        </div>

        <div class="row">
            <div class="col-md-4">
                <div class="mb-3">
                    <label for="zip" class="form-label">{translation.state[localStorage.getItem("language")]}</label>
                    <select class="form-select" name="state" id="class" aria-label="Default select example">
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
                    <input type="text" class="form-control" id="zip" name="city" placeholder="{translation.enterCity[localStorage.getItem("language")]}">
                    {#if errors?.city}
                        <strong class="text-danger ms-1 my-2">{errors.city[0]}</strong>
                    {/if}
                </div>
            </div>
            <div class="col-md-4">
                <div class="mb-3">
                    <label for="zip" class="form-label">{translation.zipCode[localStorage.getItem("language")]}</label>
                    <input type="text" class="form-control" id="zip" name="zipcode" placeholder={translation.enterZipCode[localStorage.getItem("language")]}>
                    {#if errors?.zipcode}
                    <strong class="text-danger ms-1 my-2">{errors.zipcode[0]}</strong>
                    {/if}
                </div>
            </div>
        </div>

    </div>
    <div class="mt-4" class:d-none={newAdress}>
        <div class="d-flex align-items-center mb-2">
            <div class="flex-grow-1">
                <h5 class="fs-14 mb-0">{translation.savedAddresses[localStorage.getItem("language")]}</h5>
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
    <div class="d-flex align-items-start gap-3 mt-3">
        <button type="button" class="btn btn-primary btn-label right ms-auto nexttab" on:click={SendAdress} disabled={!newAdress && addressId == null}>
            <i class="ri-bank-card-line label-icon align-middle fs-16 ms-2"></i>{translation.proceedtoPayment[localStorage.getItem("language")]}
        </button>
    </div>
</form>