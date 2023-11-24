<script>
    import { PathAddCoupon } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import { redirector } from "$lib/api/auth";
    
    let couponName
    let close
    let form
    let onHold = false
    let errors
let loading = false

    async function save(){
loading = true
        errors = {}
    
        let formData = new FormData(form)    
        formData.set("onhold",onHold)
        
        let res = await fetch(PathAddCoupon(),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
        loading = false
        if(res.status == "success") {
            close.click()
            let text = `Added ${couponName} as a new coupon` 
            toast(text,"success")
            invalidate("coupons:refresh")
            reset()
            
        }else {
            errors = res.errors
        }

    }

    function reset(){
        form.reset()
        onHold = false
        errors = {}

    }



    </script>
    
    
    <div class="modal  fade" id="addCouponModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Coupon</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                            <div class="modal-body" >
                {#if loading }
                <div class="text-center">
                    <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                </div>
                {/if}

                <form  on:submit|preventDefault={save} bind:this={form} class:d-none={loading}>
                        <div class="row g-3">
    
                                <div>
                                    <label for="couponName" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="couponName" name="name" placeholder="Enter Coupon name" bind:value={couponName}>
                                    {#if errors?.name}
                                    <strong class="text-danger ms-1 my-2">{errors.name[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="couponName" class="form-label">Code</label>
                                    <input type="text" class="form-control" id="couponName" name="code" placeholder="Enter Coupon code">
                                    {#if errors?.code}
                                    <strong class="text-danger ms-1 my-2">{errors.code[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="couponName" class="form-label">Discount</label>
                                    <input type="text" class="form-control" id="couponName" name="discount" placeholder="Enter Coupon discount" >
                                    {#if errors?.discount}
                                    <strong class="text-danger ms-1 my-2">{errors.discount[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <label for="couponName" class="form-label">Max</label>
                                    <input type="text" class="form-control" id="couponName" name="max" placeholder="Enter Coupon max" >
                                    {#if errors?.max}
                                    <strong class="text-danger ms-1 my-2">{errors.max[0]}</strong>
                                    {/if}
                                </div>

                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={onHold}>
                                        <label class="form-check-label" for="SwitchCheck1">On Hold</label>
                                    </div><!-- Switches Color -->

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