<script>    
    import OrderSummary from "./OrderSummary.svelte";
    import BillingCard from "./BillingCard.svelte";
    export let data
    $:billings = data.billings
    // $:productsList = data.orderResponse.data.order.order_items

    // let productsList = []
    
    </script>

    
    
    
    <div class="row mb-3">
        <div class="col-xl-8">
            <BillingCard {billings}/>
        </div>
        <!-- end col -->
        <OrderSummary />
        
    </div>
    
        