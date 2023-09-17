<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"

    let {couponStore} = getContext("couponStore")

    

</script>

<div class="modal  fade" id="viewCouponModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View Coupon</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
             
            <ViewRow>
               Name : <span class="fw-normal">{$couponStore.name}</span>
            </ViewRow>

            <ViewRow>
               Code : <span class="badge border border-primary text-primary">{$couponStore.code}</span>
            </ViewRow>

            <ViewRow>
                Discount : <span class="fw-normal">{$couponStore.discount}%</span>
            </ViewRow>
 
            <ViewRow>
                Status : {#if $couponStore.expired}
                <span class="badge bg-danger-subtle text-danger">Expired</span>
                {:else}
                <span class="badge bg-success-subtle text-success">Valid</span>
                {/if}
             </ViewRow>
             <ViewRow>
                On Hold : {#if $couponStore.onhold}
                <span class="badge bg-danger-subtle text-danger">Yes</span>
                {:else}
                <span class="badge bg-success-subtle text-success">No</span>
                {/if}
             </ViewRow>


            <ViewRow>
                Created at : <span class="fw-normal">{formatTimestamp($couponStore.created_at)}</span>
            </ViewRow>
            <ViewRow>
                Updated at : <span class="fw-normal">{formatTimestamp($couponStore.updated_at)}</span>
            </ViewRow>

                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button>
                    </div>
            </div>
        </div>
    </div>
</div>