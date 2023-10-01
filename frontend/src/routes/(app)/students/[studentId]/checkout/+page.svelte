<script>    
    import OrderSummary from "./OrderSummary.svelte";
    import BillingCard from "./BillingCard.svelte";
    export let data
    $:billings = data.billings
    $:payment = data.payment
    $:paymentMethods = data.paymentMethods
    $:customerIp = data.customerIp
    $:customerEmail = data.customerEmail

    // $:productsList = data.orderResponse.data.order.order_items

    // let productsList = []
        let couponId
        

    </script>

    
    
    
    <div class="row mb-3">
        <div class="col-xl-8">
            <BillingCard {billings} {couponId} {paymentMethods} {customerEmail} {customerIp} paymentId={payment.id} paymentRef={payment.ref}/>
        </div>
        <!-- end col -->
        <OrderSummary {payment} bind:couponId={couponId}/>
        
    </div>
    
        