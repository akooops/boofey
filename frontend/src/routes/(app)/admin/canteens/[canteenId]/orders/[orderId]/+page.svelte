<script>

    import CartProduct from "./CartProduct.svelte";
    import OrderSummary from "./OrderSummary.svelte";
    import AddProductToCart from "$lib/modals/add/AddProductToCart.svelte";
    import { writable } from 'svelte/store';
        
    
    
    
    
    
    
    export let data
    $:order = data.orderResponse.data.order
    $:productsList = data.orderResponse.data.order.order_items

    // let productsList = []
    
    </script>
    <div class="row" >
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
    
        
                    <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">#{order.id}</span> Order View</h4>
    
                </div><!-- end card header -->
            </div><!-- end card -->
        </div>
    </div>
    
    
    
    <div class="row mb-3">
        <div class="col-xl-8">
            {#if productsList}
                {#each productsList as product,i (product.id)}
                    <CartProduct bind:orderItem={product}/>
                {/each}
            {/if}
        </div>
        <!-- end col -->
        <OrderSummary {order} />
        
    </div>
    
        