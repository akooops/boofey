<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';

    export let coupon


    let {couponStore} = getContext("couponStore")
    
    function setCoupon(){
        $couponStore = JSON.parse(JSON.stringify(coupon));
    }






</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td>{coupon.id}</td>
    <td>{coupon.name}</td>
    <td><span class="badge border border-primary text-primary">{coupon.code}</span></td>
    <td>{coupon.discount}%</td>
    <td>{coupon.used}</td>
    <td>{coupon.max}</td>
    <td>
        {#if coupon.expired}
        <span class="badge bg-danger-subtle text-danger">Expired</span>
        {:else}
        <span class="badge bg-success-subtle text-success">Valid</span>
        {/if}
    </td>
    <td>
        {#if coupon.onhold}
        <span class="badge bg-danger-subtle text-danger">Yes</span>
        {:else}
        <span class="badge bg-success-subtle text-success">No</span>
        {/if}
    </td>
    <td>
        <div class="hstack gap-3">
            
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("coupons.show")}
            <span data-bs-toggle="modal" data-bs-target="#viewCouponModal" on:click={setCoupon}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("coupons.update")}
            <span data-bs-toggle="modal" data-bs-target="#editCouponModal" on:click={setCoupon}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("coupons.destroy")}
            <span data-bs-toggle="modal" data-bs-target="#deleteCouponModal" on:click={setCoupon}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
            {/if}
        
        </div>
    </td>
</tr>