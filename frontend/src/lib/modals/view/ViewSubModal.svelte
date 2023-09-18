<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"
	import Progress from "$lib/components/Progress.svelte";

    let {subStore} = getContext("subStore")


</script>

<div class="modal  fade" id="viewSubModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View Subscription</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
            
                <ViewRow>
                   Package :
                                <img src={$subStore?.payment?.package?.school?.logo?.full_path} alt="" class="avatar-xs rounded-circle" />
                                {$subStore?.payment?.package?.school?.name} - {$subStore?.payment?.package?.name}
                            
                        
                </ViewRow>
    
                <ViewRow>
                    Days :  <span class="fw-normal">{$subStore?.days}</span>
                </ViewRow>
    
                <ViewRow>
                    <div class="d-flex gap-2 align-items-center">
                        <div class="flex-shrink-0">Balance : </div>
                        <div class="flex-grow-1">
                        <Progress now={$subStore?.balance} max={$subStore?.days}/>
                        </div>
                    </div>
                </ViewRow>
    
                <ViewRow>
                    Should Start At : <span class="fw-normal">{$subStore?.should_start_at == null ? "unset" : $subStore?.should_start_at}</span>
                </ViewRow>
    
                <ViewRow>
                    Started At : <span class="fw-normal">{$subStore?.started_at == null ? "unset" : $subStore?.started_at}</span>
                </ViewRow>
                {#if $subStore?.status == "active"}
                    <ViewRow>
                        Created at : <span class="fw-normal">{formatTimestamp($subStore?.created_at)}</span>
                    </ViewRow>
                    <ViewRow>
                        Updated at : <span class="fw-normal">{formatTimestamp($subStore?.updated_at)}</span>
                    </ViewRow>
                    <div class="row mb-3">

                        <div class="table-responsive ">
                            <table class="table table-borderless mb-0">
                                <tbody>
                                    {#if $subStore?.payment?.coupon}
                                    <tr>
                                        <td>Discount <span class="text-muted">($subStore?.payment?.coupon)</span> : </td>
                                        <td class="text-end" id="cart-subtotal">{$subStore.payment.discount} SAR</td>
                                    </tr>
                                    {/if}
                                    <tr>
                                        <td>Estimated Tax({$subStore.payment.tax}%) : </td>
                                        <td class="text-end" id="cart-discount">- {$subStore.payment.taxCalculated} SAR</td>
                                    </tr>
                                    <tr class="table-active">
                                        <th>Total (SAR) :</th>
                                        <td class="text-end">
                                            <span class="fw-semibold" id="cart-total">
                                                {$subStore.payment.total} SAR
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                {:else}
                <ViewRow>
                    Status :{#if $subStore.status == "scheduled"}
                            <span class="badge bg-info-subtle text-info ms-1">Scheduled</span>
                            {:else if $subStore.status == "expired"}
                            <span class="badge bg-danger-subtle text-danger ms-1">Expired</span>
                            {/if}
                </ViewRow>
                <ViewRow>
                    Created at : <span class="fw-normal">{formatTimestamp($subStore?.created_at)}</span>
                </ViewRow>
                <ViewRow>
                    Updated at : <span class="fw-normal">{formatTimestamp($subStore?.updated_at)}</span>
                </ViewRow>

                {/if}


                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button>
                    </div>
            </div>
        </div>
    </div>
</div>