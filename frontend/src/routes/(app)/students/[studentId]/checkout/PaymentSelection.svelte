<script>
	import PaymentMethod from "./PaymentMethod.svelte";
    import { onMount, createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let paymentMethods

    let paymentMethodId
    onMount(() => {
        paymentMethodId = paymentMethods[0].id
    })
    function select(e){
        paymentMethodId = e.detail.paymentMethodId
    }

    async function SendPaymentMethod(){
        dispatch("proceed",{paymentMethodId})
    }
    async function back(){
        dispatch("back",{paymentMethodId})
    }

</script>


<div>
    <h5 class="mb-1">Payment Selection</h5>
    <p class="text-muted mb-4">Please select a Payment Method</p>
</div>

<div class="mt-4">
    <div class="d-flex align-items-center mb-2">
        <div class="flex-grow-1">
            <h5 class="fs-14 mb-0">Saved Payment Methods</h5>
        </div>
    </div>
    <div class="row gy-3">
        {#each paymentMethods as paymentMethod,_ (paymentMethod.id)}
            <PaymentMethod {paymentMethod} selectedPaymentMethodId={paymentMethodId} on:select={select}/>
        {/each}
    </div>
    
</div>

<div class="d-flex align-items-start gap-3 mt-4">
    <button type="button" class="btn btn-light btn-label previestab" on:click={back}><i class="ri-arrow-left-line label-icon align-middle fs-16 me-2" ></i>Back to Billing Info</button>
    <button type="button" class="btn btn-primary btn-label right ms-auto nexttab" on:click={SendPaymentMethod}><i class="ri-shopping-basket-line label-icon align-middle fs-16 ms-2"></i>Complete Order</button>
</div>
