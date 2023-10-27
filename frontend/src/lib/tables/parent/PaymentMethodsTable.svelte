<script>
    import DeletePaymentMethodModal from "$lib/modals/delete/DeletePaymentMethodModal.svelte"
	// import ViewPaymentMethodModal from "$lib/modals/view/parent/ViewPaymentMethodModal.svelte";
	// import EditPaymentMethodModal from "$lib/modals/edit/parent/EditPaymentMethodModal.svelte";
    import PaymentMethodItem from "$lib/tables/items/parent/PaymentMethodItem.svelte";
    
    import { setContext } from 'svelte';
    import { navigating } from '$app/stores';
    import { writable } from 'svelte/store';
    import {translation} from "$lib/translation.js"

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
                    <th scope="col">{translation.id[localStorage.getItem("language")]}</th>
                    <th scope="col">{translation.holderName[localStorage.getItem("language")]}</th>
                    <th scope="col">{translation.number[localStorage.getItem("language")]}</th>
                    <th scope="col">{translation.expiryDate[localStorage.getItem("language")]}</th>
                    <th scope="col">{translation.actions[localStorage.getItem("language")]}</th>
                </tr>
             </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
            <tbody class="list">
                {#each paymentMethodsList as paymentMethod,_ (paymentMethod.id)}
                    <PaymentMethodItem {paymentMethod} />
                {/each}
            </tbody>
            {/if}
        </table>
            <DeletePaymentMethodModal />
    </div>
</div>

{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}