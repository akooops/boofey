<script>
    import DeletePaymentMethodModal from "$lib/modals/delete/DeletePaymentMethodModal.svelte"
	// import ViewPaymentMethodModal from "$lib/modals/view/parent/ViewPaymentMethodModal.svelte";
	// import EditPaymentMethodModal from "$lib/modals/edit/parent/EditPaymentMethodModal.svelte";
    import PaymentMethodItem from "$lib/tables/items/parent/PaymentMethodItem.svelte";
    
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    
    export let paymentMethodsList
    setContext('paymentMethodStore', {
	    paymentMethodStore: writable({})
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
                    <th scope="col">Holder Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Expiry Date</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody class="list">
                {#each paymentMethodsList as paymentMethod,_ (paymentMethod.id)}
                    <PaymentMethodItem {paymentMethod} />
                {/each}
            </tbody>
        </table>
            <DeletePaymentMethodModal />
    </div>
</div>