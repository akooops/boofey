<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let paymentMethod

    export let selectedPaymentMethodId


    function select(){
        dispatch("select",{paymentMethodId:paymentMethod.id})
    }


    

</script>
<div class="col-lg-4 col-sm-6">
    <div class=" card-radio" on:click={select}>
        <input  type="checkbox" class="form-check-input" checked={selectedPaymentMethodId == paymentMethod.id}>
        <label class="form-check-label" for="shippingAddress01">
            <span class="fs-14 mb-2 d-block">{paymentMethod.card_holder_name}</span>
            <span class="text-muted fw-normal text-wrap mb-1 d-block">{paymentMethod.card_number}</span>
            <span class="text-muted fw-normal text-wrap mb-1 d-block">{paymentMethod.expiry_date}</span>

        </label>
    </div>
</div>