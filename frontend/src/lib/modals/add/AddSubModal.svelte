<script>
    import { PathAddSub } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import { bill } from "$lib/utils.js";

    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import Accordion from "$lib/components/Accordion.svelte";
	import CouponTableCollapse from "../collapses/CouponTableCollapse.svelte";

    
    let close
    let form 
    let errors
    export let student
    export let packages = []
    let shouldStartAt
    let useCoupon = false
    let applyDiscount = false
    let excludeFromCalc = false
    let coupon
    let resetCoupon
    let selectPackage
    let subtotal =0 
    let tax = 0
    let days = 0
    let calculatedTax = 0
    let total = 0
    let packageId
    let discount


    async function save(){
    
        errors = {}
    
        let formData = new FormData(form)

        if(coupon?.id){
            formData.set("coupon_id",coupon.id)
        }
        formData.set("apply_coupon",useCoupon)
        formData.set("apply_discount",applyDiscount)
        formData.set("exclude_from_calculation",excludeFromCalc)


    
        let res = await fetch(PathAddSub(student.id),{
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
            let text = `Added a new subscription` 
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
        useCoupon = false
        applyDiscount = false
        excludeFromCalc = false
        subtotal =0 
        tax = 0
        days = 0
        calculatedTax = 0
        total = 0
        discount = 0
    }

    $: {
        if(packageId){
            let packageObj = packages.find(obj => obj.id === packageId);
            subtotal = packageObj.currentPrice
            days = packageObj.days
        }
        // console.log(bill({subtotal,tax,coupon}))
        if(applyDiscount && !useCoupon){
            [total,calculatedTax] = bill({subtotal,tax,coupon:{id:5,discount}})
        }else {

            [total,calculatedTax] = bill({subtotal,tax,coupon})
        }
    }


    function checkCoupon(){
        if(!useCoupon){
            resetCoupon()
        }
    }

    function applyTax(){
        let packageObj = packages.find(obj => obj.id === packageId);
        tax = packageObj.tax
    }

    </script>
    
    
    <div class="modal  fade" id="addSubModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Sub</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form  on:submit|preventDefault={save} bind:this={form}>
                        <div class="row g-3">
                            <div class="col-lg-12">
                                <label for="role" class="form-label">Package</label>
                                <select class="form-select" name="package_id" id="role" aria-label="Default select example" bind:this={selectPackage} bind:value={packageId} on:change={applyTax}>
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
                                        <label for="tax" class="form-label">Tax</label>
                                        <input type="text" name="tax" class="form-control" id="tax" placeholder="Enter Subscription tax" bind:value={tax}>
                                        {#if errors?.tax}
                                        <strong class="text-danger ms-1 my-2">{errors.tax[0]}</strong>
                                        {/if}
                                    </div>


                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={applyDiscount}>
                                        <label class="form-check-label" for="SwitchCheck1">Apply Discount</label>
                                    </div><!-- Switches Color -->

                                </div>
                                {#if applyDiscount}
                                  


                                    <div class="row ps-3 g-3">
                                        <!-- Switches Color -->
                                        <div class="form-check form-switch col" >
                                            <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={useCoupon} on:change={checkCoupon}>
                                            <label class="form-check-label" for="SwitchCheck1">Use coupon</label>
                                        </div><!-- Switches Color -->

                                    </div>

                                    {#if !useCoupon}
                                    <div>
                                        <label for="tax" class="form-label">Discount (%)</label>
                                        <input type="text" name="discount" class="form-control" id="tax" placeholder="Enter Subscription discount" bind:value={discount}>
                                        {#if errors?.discount}
                                        <strong class="text-danger ms-1 my-2">{errors.discount[0]}</strong>
                                        {/if}
                                    </div>
                                    {/if}

                                    {#if useCoupon}
                                    <Accordion id={"coupon"} title={"Coupons"}>
                                        <CouponTableCollapse on:select={(e) => coupon = e.detail.coupon} bind:resetCoupon/>            
                                    </Accordion>
                                        {#if errors?.coupon_id}
                                        <strong class="text-danger ms-1 my-2">{errors.coupon_id[0]}</strong>
                                        {/if}
                                    {/if}

                                {/if}

                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={excludeFromCalc}>
                                        <label class="form-check-label" for="SwitchCheck1">Exclude from calculation</label>
                                    </div><!-- Switches Color -->

                                </div>
                               


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

                                                {#if applyDiscount && !useCoupon}
                                                    <tr>
                                                        <td>Discount <span class="text-muted">({discount ? discount : 0})</span> : </td>
                                                        <td class="text-end" id="cart-subtotal">
                                                            {#if isNaN(parseFloat(discount * (subtotal / 100)).toFixed(3))}
                                                            unset
                                                            {:else}
                                                            - {parseFloat(discount * (subtotal / 100)).toFixed(3)} SAR
                                                            {/if}
                                                        </td>
                                                    </tr>
                                                {/if}

                                                {#if (useCoupon && coupon?.id)}
                                                <tr>
                                                    <td>Discount <span class="text-muted">({coupon.name})</span> : </td>
                                                    <td class="text-end" id="cart-subtotal">
                                                        {#if subtotal === ""}
                                                        unset
                                                        {:else}
                                                        - {parseFloat(coupon.discount * (subtotal / 100)).toFixed(3)} SAR
                                                        {/if}
                                                    </td>
                                                </tr>
                                                {/if}
                                                <tr>
                                                    <td>Estimated Tax({tax == null ? 0 : tax}%) : </td>
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
                                
                                {#if errors?.student_id}
                                    <strong class="text-danger ms-1 my-2">{errors.student_id[0]}</strong>
                                {/if}

    
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