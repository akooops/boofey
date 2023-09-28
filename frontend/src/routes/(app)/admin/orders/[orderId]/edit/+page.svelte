<script>

    import CartProduct from "./CartProduct.svelte";
    import OrderSummary from "./OrderSummary.svelte";
    import AddProductToCart from "$lib/modals/add/AddProductToCart.svelte";
    import { writable } from 'svelte/store';
    import {onMount} from "svelte"
        
    
    
    
    
    let productsList = []
    
    export let data
    $:order = data.orderResponse.data.order
    $:products = data.orderResponse.data.order.order_items

    function addProduct(e){
        const existingProductIndex = productsList.findIndex((product) => product.id == e.detail.product.id);
        console.log(e.detail.product)
        if (existingProductIndex != -1) {    
            productsList[existingProductIndex].qty++;
        } else {
            e.detail.product.qty = 1
            let product = {
                currentPrice:e.detail.product.currentPrice,
                image:e.detail.product.image,
                category:e.detail.product.category,
                name:e.detail.product.name
            }


            e.detail.product.product = product
            productsList = [...productsList,e.detail.product]
        }



    }
    onMount(() => {
        productsList = products.map(product => ({
            ...product,
            id: product.product.id
            }));
    })

    function remove(e){ 
        
        productsList = productsList.filter((product) => product.id !== e.detail.id);
    }

    
</script>
    <div class="row" >
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
    
        
                    <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">#{order.id}</span> Order Edit</h4>
                    <div class="flex-shrink-0">
                        <button type="button" data-bs-toggle="modal" data-bs-target="#addProductToCartModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Product</button>
                        <AddProductToCart on:select={addProduct}/>
                    </div>
                </div><!-- end card header -->
            </div><!-- end card -->
        </div>
    </div>
    
    
    
    <div class="row mb-3">
        <div class="col-xl-8">
            {#if productsList}
                {#each productsList as product,i (product.id)}
                    <CartProduct  on:remove={remove} bind:orderItem={product}/>
                {/each}
            {/if}
        </div>
        <!-- end col -->
        <OrderSummary {...order} {productsList}/>
        
    </div>
    
        