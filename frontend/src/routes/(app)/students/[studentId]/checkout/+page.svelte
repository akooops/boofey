<script>    
    import OrderSummary from "./OrderSummary.svelte";
    import BillingCard from "./BillingCard.svelte";
import { phoneMask } from "$lib/inputMasks.js";
import { onMount } from "svelte";
import {translation} from "$lib/translation.js"



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

    
    {#if data.status == "error"}
    <div class="card card-body text-center">
        
        <div class="row mb-3">
            <div class="mb-4">
                <lord-icon src="https://cdn.lordicon.com/tdrtiskw.json" trigger="loop" colors="primary:#f06548,secondary:#f7b84b" style="width:120px;height:120px"></lord-icon>
                <h5 class="text-danger">{translation.error[localStorage.getItem("language")]}</h5>
                <!-- <p class="text-muted">{data?.error?.student_id[0]}</p> -->
                <p class="text-muted">{data?.errors?.student_id[0]}</p>
                <p class="text-muted">{translation.goBackTo[localStorage.getItem("language")]} <a href="/students" class="text-decoration-underline">{translation.students[localStorage.getItem("language")]}</a></p>
                
            </div>
        </div>
    </div>
    {:else}
    
    <div class="row mb-3">
        <div class="col-xl-8">
            <BillingCard {billings} {couponId} {paymentMethods} {customerEmail} {customerIp} paymentId={subscription.id} paymentRef={subscription.ref}/>
        </div>
        <!-- end col -->
        <OrderSummary payment={subscription} {packageObj} bind:couponId={couponId}/>
        
    </div>
    {/if
    }
    
        