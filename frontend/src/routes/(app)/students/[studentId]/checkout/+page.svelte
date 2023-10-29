<script>    
    import OrderSummary from "./OrderSummary.svelte";
    import BillingCard from "./BillingCard.svelte";
import { phoneMask } from "$lib/inputMasks.js";
import { onMount } from "svelte";



    export let data
    $:billings = data.billings
    $:subscription = data.subscription
    $:paymentMethods = data.paymentMethods
    $:customerIp = data.customerIp
    $:customerEmail = data.customerEmail
    $:packageObj = data.package
    // $:productsList = data.orderResponse.data.order.order_items

    // let productsList = []
        let couponId
        onMount(() => {
            phoneMask()
        })

    </script>

    
    
    
    <div class="row mb-3">
        <div class="col-xl-8">
            <BillingCard {billings} {couponId} {paymentMethods} {customerEmail} {customerIp} paymentId={subscription.id} paymentRef={subscription.ref}/>
        </div>
        <!-- end col -->
        <OrderSummary payment={subscription} {packageObj} bind:couponId={couponId}/>
        
    </div>
    
        