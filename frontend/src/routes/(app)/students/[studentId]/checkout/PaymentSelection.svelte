<script>
	import PaymentMethod from "./PaymentMethod.svelte";
    import { onMount, createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import {translation} from "$lib/translation.js"
    import { invalidate } from '$app/navigation';


    export let paymentMethods
    let loading = false
    let paymentMethodId
    onMount(() => {
        if(paymentMethods[0]){
            paymentMethodId = paymentMethods[0].id
        }
    })
    function select(e){
        paymentMethodId = e.detail.paymentMethodId
    }

    async function SendPaymentMethod(){
        if(paymentMethodId){
            dispatch("proceed",{paymentMethodId})
        }
    }
    async function back(){
        dispatch("back",{paymentMethodId})
    }

    async function refresh(){
        loading = true 
        await invalidate("checkOut:refresh")
        loading = false
    }

</script>


<div>
    <h5 class="mb-1">{translation.paymentSelection[localStorage.getItem("language")]}</h5>
    <p class="text-muted mb-4">{translation.pleaseSelectPayment[localStorage.getItem("language")]}</p>
</div>

<div class="mt-4">
    <div class="d-flex align-items-center mb-2">
        <div class="flex-grow-1">
            <h5 class="fs-14 mb-0">{translation.savedPaymentMethods[localStorage.getItem("language")]}</h5>
            {#if loading }
                <div class="text-center">
                    <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                </div>
            
            {:else}
                {#if paymentMethods.length < 1}
                    <p class="text-muted ">{translation.oopsNoPaymentMthods[localStorage.getItem("language")]}</p>
                    <a role="button" class="btn btn-primary waves-effect waves-light" href="/paymentMethods/add" target="_blank">{translation.addPaymentMethod[localStorage.getItem("language")]}</a><span class="text-muted mx-1"> {translation.or[localStorage.getItem("language")]} </span>
                    <button type="button" class="btn btn-secondary waves-effect waves-light" on:click={refresh}>{translation.refresh[localStorage.getItem("language")]}</button>
                {/if}
            {/if}
        </div>
    </div>
    <div class="row gy-3">
        {#each paymentMethods as paymentMethod,_ (paymentMethod.id)}
            <PaymentMethod {paymentMethod} selectedPaymentMethodId={paymentMethodId} on:select={select}/>
        {/each}
    </div>
    
</div>

<div class="d-flex align-items-start gap-3 mt-4">
    <button type="button" class="btn btn-light btn-label previestab" on:click={back}><i class="ri-arrow-{localStorage.getItem("language") == "ar" ? "right" : "left"}-line label-icon align-middle fs-16 me-2" ></i>{translation.backToBilling[localStorage.getItem("language")]}</button>
    <button type="button" class="btn btn-primary btn-label right ms-auto nexttab" on:click={SendPaymentMethod} disabled={paymentMethodId == null}><i class="ri-shopping-basket-line label-icon align-middle fs-16 ms-2"></i>{translation.completeOrder[localStorage.getItem("language")]}</button>
</div>
