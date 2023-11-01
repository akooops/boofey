<script>
    import DeleteOrderModal from "$lib/modals/delete/DeleteOrderModal.svelte"
    import OrderItem from "./items/OrderItem.svelte";
    
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { navigating } from '$app/stores';
    
    export let ordersList
    setContext('orderStore', {
	    orderStore: writable({})
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
                    <th scope="col">Order Ref</th>
                    <th scope="col">Tax</th>
                    <th scope="col">Calculated Tax</th>
                    <th scope="col">Discount</th>
                    <th scope="col">SubTotal</th>
                    <th scope="col">Total</th>
                    <th scope="col">Action</th>

                </tr>
             </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
            <tbody class="list">
                {#each ordersList as order}
                    <OrderItem {order} />
                {/each}
            </tbody>
            {/if}
        </table>
         <DeleteOrderModal /> 

    </div>
</div>

{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}