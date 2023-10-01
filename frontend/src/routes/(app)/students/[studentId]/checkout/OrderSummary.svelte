<script>
    import {PathCheckCoupon} from "$lib/api/paths.js"
    import { createEventDispatcher} from 'svelte';
    import { redirector } from "$lib/api/auth";
    import { toast } from "$lib/components/toast.js";
    import {bill} from "$lib/utils.js"

    const dispatch = createEventDispatcher();


    export let payment

    let couponCode
    let error

    export let couponId

    async function checkCoupon(){
        error = null
        let res = await fetch(PathCheckCoupon(couponCode),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
        })
        redirector(res)

        res = await res.json()
    
        if(res.status == "success") {
            let text = `Coupon successfully applied` 
            toast(text,"success")
            payment.discount = res.data.coupon.discount
            dispatch("coupon",{couponId:res.data.coupon.id})
            reCalculate(res.data.coupon)
            couponId = res.data.coupon.id
        }else {
            error = res.error
        }
    }

    function reCalculate(coupon){

        [payment.total,payment.taxCalculated] = bill({subtotal:payment.subtotal,tax:payment.tax,coupon})
         payment.discountCalculated = parseFloat(coupon.discount * (payment.subtotal / 100)).toFixed(3)
    }
    

</script>

<div class="col-xl-4">
    <div class="sticky-side-div">
        <div class="card">
            <div class="card-header border-bottom-dashed">
                <h5 class="card-title mb-0">Order Summary</h5>
            </div>

            <div class="card-header bg-light-subtle border-bottom-dashed">
                <label for="name" class="form-label  px-1">Coupon Code</label>
                <div class="hstack gap-3 px-3 mx-n3 mb-1">
                    <input class="form-control me-auto" type="text" placeholder="Enter coupon code" aria-label="Add Promo Code here..." bind:value={couponCode}>
                    <button type="button" class="btn btn-primary w-xs" on:click={checkCoupon}>Apply</button>
                </div>
                {#if error}
                 <strong class="text-danger ms-1 my-2 ">{error}</strong>
                {/if}

            </div>


            <div class="card-body pt-2">
                <div class="table-responsive">
                    <table class="table table-borderless mb-0">
                        <tbody>
                            <tr>
                                <td>Sub Total :</td>
                                <td class="text-end" id="cart-subtotal">{payment?.subtotal} SAR</td>
                            </tr>
                            <tr>
                                <td>Discount <span class="text-muted">({payment?.discount}%)</span> : </td>
                                <td class="text-end" id="cart-discount">{payment?.discountCalculated} SAR</td>
                            </tr>
                            <tr>
                                <td>Estimated Tax ({payment?.tax}%) : </td>
                                <td class="text-end" id="cart-tax">{payment?.taxCalculated} SAR</td>
                            </tr>
                            <tr class="table-active">
                                <th>Total (SAR) :</th>
                                <td class="text-end">
                                    <span class="fw-semibold" id="cart-total">
                                        {payment?.total} SAR
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
    <!-- end stickey -->

</div>