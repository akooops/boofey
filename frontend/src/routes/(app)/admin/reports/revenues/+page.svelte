<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import PaymentMethodsTable from "$lib/tables/parent/PaymentMethodsTable.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    import { goto } from '$app/navigation';
    import { navigating } from '$app/stores';
    import {translation} from "$lib/translation.js"
	import Progress from "$lib/components/Progress.svelte";

    // import PaymentMethodsTable from "$lib/tables/PaymentMethodsTable.svelte";
    // import AddPaymentMethodModal from "$lib/modals/add/AddPaymentMethodModal.svelte";
    import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { fade } from 'svelte/transition';
    import { getContext } from "svelte"
    import {formatTimestamp} from "$lib/utils.js"
    
    export let data
    let {currentFilter} = getContext("currentFilterStore")
    $: subsList = data.subscriptions
   
    

</script>
    

{#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
    
<div class="fw-medium align-items-center d-flex gap-4 mb-4">
    <div class="d-flex gap-3 align-items-center">

    <p class="col-auto mb-0">From:  {$currentFilter.startDate}</p>
    <p class="col-auto mb-0">To:  {$currentFilter.endDate}</p>
    <p class="col-auto mb-0">Count: {data.count} </p>

    </div>
</div>
<div class="row">
    <div class="">
        <table class="table align-middle mb-0 border-top">
            <thead class="table-light align-middle">
                <tr>
                    <th scope="col">SubTotal</th>
                    <th scope="col">Subscription Reference</th>
                    <th scope="col">Student</th>
                    <th scope="col">Package</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">SubTotal</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Tax</th>
                    <th scope="col">Total</th>

                </tr>
             </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
            <tbody class="list">
                {#each subsList as sub}
                <tr scope="row">
                    <td>{sub.id}</td>
                    <td>{sub.ref}</td>
                    <td>
                        <div class="d-flex gap-2 align-items-center">
                            <div class="flex-shrink-0">
                                <img src={sub.student.image.full_path} alt="" class="avatar-xs rounded-circle" />
                            </div>
                            <div class="flex-grow-1">
                                {sub.student.fullname}
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex gap-2 align-items-center">
                            <div class="flex-shrink-0">
                                <img src={sub.package.school?.logo?.full_path} alt="" class="avatar-xs rounded-circle" />
                            </div>
                            <div class="flex-grow-1">
                                {sub.package.school?.name} - {sub.package?.name}
                            </div>
                        </div>
                    </td>
                    <td>
                        {#if sub.status == "active"}
                        <span class="badge bg-success-subtle text-success ms-1">Active</span>
                        {:else if sub.status == "inactive"}
                        <span class="badge bg-dark-subtle text-dark ms-1">Inactive</span>
                        {:else if sub.status == "disabled"}
                        <span class="badge bg-warning-subtle text-warning ms-1">Disabled</span>
                        {:else if sub.status == "expired"}
                        <span class="badge bg-danger-subtle text-danger ms-1">Expired</span>
                        {/if}
                
                    </td>
                    <td>{formatTimestamp(sub.created_at)}</td>
                    <td class="text-end">{sub.subtotal}</td>
                    <td class="text-end">{sub.discount}</td>
                    <td class="text-end">{sub.tax}</td>
                    <td class="text-end">{sub.total}</td>
                </tr>
                {/each}
                <tr class="ms-auto">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="text-end">{data.subtotalSum}</td>
                    <td class="text-end">{data.discountSum}</td>
                    <td class="text-end">{data.taxSum}</td>
                    <th class="text-end">{data.totalSum}</th>
                </tr>
            </tbody>
            {/if}
        </table>

        <table class="table table-borderless table-nowrap align-middle mb-0 ms-auto" style="width:250px">
            <tbody >
              
            </tbody>
        </table>
    </div>
</div>
<div class="hstack gap-2 justify-content-end d-print-none mt-4">
    <a href="javascript:window.print()" class="btn btn-info"><i class="ri-printer-line align-bottom me-1"></i> {translation.print[localStorage.getItem("language")]}</a>
</div>

{/if}

{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}