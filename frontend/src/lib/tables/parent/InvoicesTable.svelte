<script>
	// import ViewInvoiceModal from "$lib/modals/view/ViewInvoiceModal.svelte";
    import InvoiceItem from "$lib/tables/items/parent/InvoiceItem.svelte";
    
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { navigating } from '$app/stores';
    
    export let invoicesList
    setContext('invoiceStore', {
	    invoiceStore: writable({})
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
                    <th scope="col">Invoice Reference</th>
                    <th scope="col">Subscription Reference</th>
                    <th scope="col">Generated at</th>
                    <th scope="col">Package</th>
                    <th scope="col">Student</th>
                    <th scope="col">Action</th>

                </tr>
             </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
            <tbody class="list">
                {#each invoicesList as invoice}
                    <InvoiceItem {invoice} />
                {/each}
            </tbody>
            {/if}
        </table>
        <!-- <ViewInvoiceModal /> -->
             

    </div>
</div>

{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}