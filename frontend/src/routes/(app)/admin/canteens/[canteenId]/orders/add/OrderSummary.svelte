<script>
    import {bill} from "$lib/utils.js"
    import { PathAddOrder } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { redirector } from "$lib/api/auth";
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';  

    export let productsList = []
    let subtotal = 0 
    let discount = 0
    let tax = 0
    let total = 0
    let calculatedTax = 0
    let pending = false
    let errors = {}
    $: {
        subtotal = productsList.reduce((total, product) => {
            return total + product.currentPrice * product.qty;
        }, 0);
    }
    $: {
        [total,calculatedTax] = bill({subtotal,tax,coupon:{id:1,discount}})
    }

    async function save(){
        // if(productsList.length == 0) return;

        errors = {}
        pending = true 
        let formData = new FormData()

        formData.set("products", JSON.stringify(productsList))
        if(tax){
            formData.set("tax",tax)
        }
        if(discount){
            formData.set("discount",discount)
        }

        let res = await fetch(PathAddOrder($page.params.canteenId),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
    
        if(res.status == "success") {
            let text = `Added a new Order` 
            toast(text,"success")
            goto(`/admin/orders/${res.data.id}?canteen=${$page.params.canteenId}`)
            errors = {}
        }else {
            errors = res.errors
        }

        pending = false 


    }



</script>

<div class="col-xl-4">
    <div class="sticky-side-div">
        <div class="card">
            <div class="card-header border-bottom-dashed">
                <h5 class="card-title mb-0">Order Summary</h5>
            </div>

            <div class="card-header border-bottom-dashed">
                <div class="mb-3">
                    <label for="name" class="form-label">Discount %</label>
                    <input type="text" class="form-control" name="discount" id="firstName" bind:value={discount} placeholder="Enter Discount Percentage ">
                    {#if errors?.discount}
                        <strong class="text-danger ms-1 my-2">{errors.discount[0]}</strong>
                    {/if}
                </div>

                <div>
                    <label for="name" class="form-label">Tax %</label>
                    <input type="text" class="form-control" name="tax" id="firstName"bind:value={tax} placeholder="Enter Tax Percentage ">
                    {#if errors?.tax}
                        <strong class="text-danger ms-1 my-2">{errors.tax[0]}</strong>
                    {/if}
                </div>
                
            </div>

            <div class="card-body pt-2">
                <div class="table-responsive">
                    <table class="table table-borderless mb-0">
                        <tbody>
                            <tr>
                                <td>Sub Total :</td>
                                <td class="text-end" id="cart-subtotal">{subtotal} SAR</td>
                            </tr>
                            <tr>
                                <td>Discount <span class="text-muted">({discount}%)</span> : </td>
                                <td class="text-end" id="cart-discount">{isNaN(parseFloat(discount * (subtotal / 100))) ? "unset" : parseFloat(discount * (subtotal / 100)).toFixed(3)} SAR</td>
                            </tr>
                            <tr>
                                <td>Estimated Tax ({tax}%) : </td>
                                <td class="text-end" id="cart-tax">{isNaN(calculatedTax) ? "unset" : calculatedTax.toFixed(3)} SAR</td>
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


                <!-- Danger Alert -->
                {#if errors?.products}
                <div class="alert alert-danger alert-border-left alert-dismissible fade show mt-3" role="alert">
                    <i class="ri-error-warning-line me-3 align-middle"></i> <strong>Products</strong> - {errors.products[0]}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                {/if}




                <div class="row g-3 mt-2 ">
                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-primary waves-effect waves-light" disabled={pending} on:click={save}>Checkout</button>
                    </div>
                </div>
                <!-- end table-responsive -->
            </div>
        </div>
    </div>
    <!-- end stickey -->

</div>