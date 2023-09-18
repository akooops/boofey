<script>
    import DeleteCouponModal from "$lib/modals/delete/DeleteCouponModal.svelte"
	import ViewCouponModal from "$lib/modals/view/ViewCouponModal.svelte";
	import EditCouponModal from "$lib/modals/edit/EditCouponModal.svelte";
    import CouponItem from "./items/CouponItem.svelte";
    
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    
    export let couponsList
    setContext('couponStore', {
	    couponStore: writable({})
    });

</script>


<div class="row pe-0">
    <div class="table-responsive">
        <table class="table align-middle table-nowrap mb-0 border-top">
            <thead class="table-light">
                <tr>
                    <th scope="col" style="width: 25px;">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="checkAll" value="option1">
                        </div>
                    </th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Code</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Used</th>
                    <th scope="col">Max</th>
                    <th scope="col">Status</th>
                    <th scope="col">On Hold</th>
                    <th scope="col">Action</th>

                </tr>
            </thead>
            <tbody class="list">
                {#each couponsList as coupon}
                    <CouponItem {coupon} />
                {/each}
            </tbody>
        </table>
        <ViewCouponModal />
        <EditCouponModal /> 
         <DeleteCouponModal /> 
             

    </div>
</div>