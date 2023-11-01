<script>

    import {translation} from "$lib/translation.js"

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let billing

    export let selectedaddressId


    function select(){
        dispatch("select",{addressId:billing.id})
    }
    function setBillingObj(){
        dispatch("setBillingObj",{billing})
    }

</script>
<div class="col-lg-4 col-sm-6">
    <div class=" card-radio" on:click={select}>
        <input  type="checkbox" class="form-check-input" checked={selectedaddressId == billing.id}>
        <label class="form-check-label" for="shippingAddress01">
            <span class="fs-14 mb-2 d-block">{billing.firstname} {billing.lastname}</span>
            <span class="text-muted fw-normal text-wrap mb-1 d-block">{billing.email}</span>
            <span class="text-muted fw-normal text-wrap mb-1 d-block">{billing.phone}</span>
            <span class="text-muted fw-normal text-wrap mb-1 d-block">{billing.state},{billing.city},{billing.zipcode}</span>
            <span class="text-muted fw-normal text-wrap mb-1 d-block">{billing.address}</span>

        </label>
    </div>
    <div class="d-flex flex-wrap p-2 py-1 bg-light rounded-bottom border mt-n1">
        <div>
            <a href="#" class="d-block text-body p-1 px-2" data-bs-toggle="modal" data-bs-target="#editAddressModal" on:click={setBillingObj}><i class="ri-pencil-fill text-muted align-bottom me-1"></i> {translation.edit[localStorage.getItem("language")]}</a>
        </div>
        <div>
            <a href="#" class="d-block text-body p-1 px-2" data-bs-toggle="modal" data-bs-target="#deleteAddressModal" on:click={setBillingObj}><i class="ri-delete-bin-fill text-muted align-bottom me-1"></i> {translation.delete[localStorage.getItem("language")]}</a>
        </div>
    </div>
</div>