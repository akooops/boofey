<script>
    import DeleteOrderModal from "$lib/modals/delete/DeleteOrderModal.svelte"
    import OrderItem from "./items/OrderItem.svelte";
    
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    
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
                    <th scope="col">Tax</th>
                    <th scope="col">Calculated Tax</th>
                    <th scope="col">Discount</th>
                    <th scope="col">SubTotal</th>
                    <th scope="col">Total</th>
                    <th scope="col">Action</th>

                </tr>
            </thead>
            <tbody class="list">
                {#each ordersList as order}
                    <OrderItem {order} />
                {/each}
            </tbody>
        </table>
         <DeleteOrderModal /> 

    </div>
</div>