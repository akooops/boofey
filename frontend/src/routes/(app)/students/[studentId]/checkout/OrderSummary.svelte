<script>
    import {PathCheckCoupon} from "$lib/api/paths.js"
    import { createEventDispatcher} from 'svelte';
    import { redirector } from "$lib/api/auth";
    import { toast } from "$lib/components/toast.js";
    import {bill} from "$lib/utils.js"
    import {translation} from "$lib/translation.js"


    const dispatch = createEventDispatcher();


    export let payment

    export let packageObj

    let couponCode
    let errors

    export let couponId

    let form
    async function checkCoupon(){
        errors = null
        let formData = new FormData(form)
        let res = await fetch(PathCheckCoupon(),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
    
        if(res.status == "success") {
            let text = `Coupon successfully applied` 
            toast(text,"success")
            payment.discount = res.data.coupon.discount
            dispatch("coupon",{couponId:res.data.coupon.id})
            couponId = res.data.coupon.id
            reCalculate(res.data.coupon)
        }else {
            errors = res.errors
        }
    }

    function reCalculate(coupon){

        [payment.total,payment.taxCalculated] = bill({subtotal:payment.subtotal,tax:payment.tax,coupon})
         payment.discountCalculated = parseFloat(coupon.discount * (payment.subtotal / 100)).toFixed(3)

         if(payment.total == 0){
            dispatch("free")
         }
    }
    

</script>

<div class="col-xl-4">
    <div class="sticky-side-div">
        <div class="card">
            <div class="card-header border-bottom-dashed">
                <h5 class="card-title mb-0">{translation.orderSummary[localStorage.getItem("language")]}</h5>
            </div>

            <div class="card-header border-bottom-dashed">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        {#if localStorage.getItem("language") == "en"}
                        <h5 class="mb-1 fw-semibold" >{packageObj.name}</h5>
                        <p class="text-muted mb-0" class:d-none={packageObj.description == null}>{packageObj.description}</p>
                        {:else}
                        <h5 class="mb-1 fw-semibold">{packageObj.name_ar}</h5>
                        <p class="text-muted mb-0" class:d-none={packageObj.description_ar == null}>{packageObj.description_ar}</p>
                        {/if}
                    </div>
                    <div class="">
                        <h5>{packageObj.currentPrice}<sup><small>{translation.sar[localStorage.getItem("language")]}</small></sup> <span class="fs-13 text-muted">{packageObj.yearly ? "" : `/ ${packageObj.days} ${translation.days[localStorage.getItem("language")]}`}</span></h5>
                    </div>
                </div>

            </div>

            <form  on:submit|preventDefault={checkCoupon} bind:this={form}>
            <div class="card-header bg-light-subtle border-bottom-dashed">
                <label for="name" class="form-label  px-1">{translation.couponCode[localStorage.getItem("language")]}</label>
                <div class="hstack gap-3 px-3 mx-n3 mb-1">
                    <input class="form-control me-auto" type="text" placeholder={translation.enterCouponCode[localStorage.getItem("language")]} name="code" aria-label="Add Promo Code here...">
                    <input type="submit" class="btn btn-primary w-xs" value="{translation.apply[localStorage.getItem("language")]}">
                </div>
                {#if errors}
                 <strong class="text-danger ms-1 my-2 ">{errors.code}</strong>
                {/if}

            </div>
            </form>


            <div class="card-body pt-2">
                <div class="table-responsive">
                    <table class="table table-borderless mb-0">
                        <tbody>
                            <tr>
                                <td>{translation.subTotal[localStorage.getItem("language")]} :</td>
                                <td class="text-end" id="cart-subtotal">{payment?.subtotal} {translation.sar[localStorage.getItem("language")]}</td>
                            </tr>
                            <tr>
                                <td>{translation.discount[localStorage.getItem("language")]} <span class="text-muted">({payment?.discount}%)</span> : </td>
                                <td class="text-end" id="cart-discount">{payment?.discountCalculated} {translation.sar[localStorage.getItem("language")]}</td>
                            </tr>
                            <tr>
                                <td>{translation.estimatedTax[localStorage.getItem("language")]} ({payment?.tax}%) : </td>
                                <td class="text-end" id="cart-tax">{payment?.taxCalculated} {translation.sar[localStorage.getItem("language")]}</td>
                            </tr>
                            <tr class="table-active">
                                <th>{translation.total[localStorage.getItem("language")]} ({translation.sar[localStorage.getItem("language")]}) :</th>
                                <td class="text-end">
                                    <span class="fw-semibold" id="cart-total">
                                        {payment?.total} {translation.sar[localStorage.getItem("language")]}
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