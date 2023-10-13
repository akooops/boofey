<script>
    import { PathUpdateSub } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import Accordion from "$lib/components/Accordion.svelte";
	import CouponTableCollapse from "../collapses/CouponTableCollapse.svelte";
    import {getContext} from "svelte"
    import { bill } from "$lib/utils.js";

    
    let close
    let form 
    let subName = ""
    let errors
    export let student
    export let packages = []
    let shouldStartAt
    let usePackageInfo = false
    let useCoupon = false
    let coupon
    let resetCoupon
    let selectPackage
    let subtotal =0 
    let tax = 0
    let days = 0
    let calculatedTax = 0
    let total = 0
    let packageId
    let balance
    let updatePrices = false

    let {subStore} = getContext("subStore")

    async function save(){
    
        errors = {}
    
        let formData = new FormData(form)

        if(coupon?.id){
            formData.set("coupon_id",coupon.id)
        }
        formData.set("use_package_info",usePackageInfo)
        formData.set("apply_coupon",useCoupon)
        formData.set("update_prices",updatePrices)
        
        let res = await fetch(PathUpdateSub($subStore.id),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
    
        if(res.status == "success") {
            close.click()
            let text = `Successfuly edited ` 
            toast(text,"success")
            invalidate("subs:refresh")
            reset()
        }else {
            errors = res.errors
        }
    
    
    }

    function reset(){
        loadDefaultDate(shouldStartAt,Date.now())
        form.reset()
        selectPackage.selectedIndex = 0
        if (useCoupon){
            resetCoupon()
        }
        
        errors = {}
        usePackageInfo = false
        useCoupon = false
        subtotal =0 
        tax = 0
        days = 0
        calculatedTax = 0
        total = 0
    }

    $: {
        if($subStore.payment){
            if(usePackageInfo && packageId){
                let packageObj = packages.find(obj => obj.id === packageId);
                days = packageObj.days
                subtotal = packageObj.currentPrice
                tax = packageObj.tax
            }

            [total,calculatedTax] = bill({subtotal,tax,coupon})

            
        }
    }

    subStore.subscribe(() => {
        if(Object.keys($subStore).length == 0 || shouldStartAt == undefined) return;
        console.log("sub")
        loadDefaultDate(shouldStartAt,$subStore.should_start_at)
        coupon = $subStore.payment.coupon
        days = $subStore.days
        packageId = $subStore.payment.package.id
        subtotal = $subStore.payment.subtotal
        tax = $subStore.payment.tax
        balance = $subStore.balance
        useCoupon = $subStore?.payment.coupon ? true : false 
        
    })


    function checkCoupon(){
        if(!useCoupon){
            resetCoupon()
        }
    }

    </script>
    
    
    <div class="modal  fade" id="editSubModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit  Subscription</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form  on:submit|preventDefault={save} bind:this={form}>
                        <div class="row g-3">
                            <div class="col-lg-12">
                                <label for="role" class="form-label">Package</label>
                                <select class="form-select" name="package_id" id="role" aria-label="Default select example" bind:this={selectPackage} bind:value={packageId}>
                                    <option disabled selected value> -- select a package -- </option>
                                    {#each packages as packageObj}
                                    <option value={packageObj.id}>{packageObj.name}</option>
                                    {/each}
                                </select>
                                {#if errors?.package_id}
                                <strong class="text-danger ms-1 my-2">{errors.package_id[0]}</strong>
                                {/if}
                            </div>
                                <div>
                                    <label for="from" class="form-label">Should Start At</label>
                                    <input type="text" name="should_start_at" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" id="from" bind:this={shouldStartAt}>
                                    {#if errors?.should_start_at}
                                    <strong class="text-danger ms-1 my-2">{errors.should_start_at[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="name" class="form-label">Balance</label>
                                    <input type="text" name="balance" class="form-control" id="days" placeholder="Enter Subscription days" bind:value={balance}>
                                    {#if errors?.balance}
                                    <strong class="text-danger ms-1 my-2">{errors.balance[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="name" class="form-label">Days</label>
                                    <input type="text" name="days" class="form-control" id="days" placeholder="Enter Subscription days" bind:value={days}>
                                    {#if errors?.days}
                                    <strong class="text-danger ms-1 my-2">{errors.days[0]}</strong>
                                    {/if}
                                </div>

                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={updatePrices}>
                                        <label class="form-check-label" for="SwitchCheck1">Update Prices</label>
                                    </div><!-- Switches Color -->

                                </div>

                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={usePackageInfo}>
                                        <label class="form-check-label" for="SwitchCheck1">Use package info</label>
                                    </div><!-- Switches Color -->

                                </div>
                                {#if !usePackageInfo}
                                    

                                    <div>
                                        <label for="subtotal" class="form-label">Sub total</label>
                                        <input type="text" name="subtotal" class="form-control" id="subtotal" placeholder="Enter Subscription subtotal" bind:value={subtotal}>
                                        {#if errors?.subtotal}
                                        <strong class="text-danger ms-1 my-2">{errors.subtotal[0]}</strong>
                                        {/if}
                                    </div>

                                    <div>
                                        <label for="tax" class="form-label">Tax</label>
                                        <input type="text" name="tax" class="form-control" id="tax" placeholder="Enter Subscription tax" bind:value={tax}>
                                        {#if errors?.tax}
                                        <strong class="text-danger ms-1 my-2">{errors.tax[0]}</strong>
                                        {/if}
                                    </div>

                                {/if}
                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={useCoupon} on:change={checkCoupon}>
                                        <label class="form-check-label" for="SwitchCheck1">Use coupon</label>
                                    </div><!-- Switches Color -->

                                </div>
                                {#if useCoupon}
                                <Accordion id={"coupon"} title={"Coupons"}>
                                    <CouponTableCollapse on:select={(e) => coupon = e.detail.coupon} selected={coupon} bind:resetCoupon/>            
                                </Accordion>
                                {#if errors?.coupon_id}
                                <strong class="text-danger ms-1 my-2">{errors.coupon_id[0]}</strong>
                                {/if}
                                {/if}


                                <div class="row mb-3">

                                    <div class="table-responsive ">
                                        <table class="table table-borderless mb-0">
                                            <tbody>
                                                <tr>
                                                    <td>days : </td>
                                                    <td class="text-end" id="cart-discount">{days !== "" ? days : "unset"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Sub total : </td>
                                                    <td class="text-end" id="cart-discount">{subtotal !== "" ? subtotal+" SAR" : "unset"} </td>
                                                </tr>
                                                {#if useCoupon && coupon?.id}
                                                <tr>
                                                    <td>Discount <span class="text-muted">({coupon.name})</span> : </td>
                                                    <td class="text-end" id="cart-subtotal">
                                                        {#if subtotal === ""}
                                                        unset
                                                        {:else}
                                                        {parseFloat(coupon.discount * (subtotal / 100)).toFixed(3)} SAR
                                                        {/if}
                                                    </td>
                                                </tr>
                                                {/if}
                                                <tr>
                                                    <td>Estimated Tax({tax}%) : </td>
                                                    <td class="text-end" id="cart-discount">
                                                        {#if tax !== ""}
                                                        + {parseFloat(calculatedTax).toFixed(3)} SAR
                                                        {:else}
                                                        unset
                                                        {/if}
                                                    </td>
                                                </tr>
                                                <tr class="table-active">
                                                    <th>Total (SAR) :</th>
                                                    <td class="text-end">
                                                        <span class="fw-semibold" id="cart-total">
                                                            {total} SAR
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                


    
                                <div class="hstack gap-2 justify-content-end">
                                    <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>Close</button>
                                    <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save">
                                </div>
                        </div><!--end row-->
                    </form>
                </div>
            </div>
        </div>
    </div>