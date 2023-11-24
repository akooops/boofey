<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"
	import Progress from "$lib/components/Progress.svelte";    
    import {translation} from "$lib/translation.js"


    let {subStore} = getContext("subStore")


</script>

<div class="modal  fade" id="viewSubModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">{translation.viewSubscription[localStorage.getItem("language")]}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                {#if $subStore?.student}
                <ViewRow>
                    {translation.student[localStorage.getItem("language")]} : 
                                <img src={$subStore?.student?.image?.full_path} alt="" class="avatar-xs rounded-circle" />
                                {$subStore?.student?.fullname} 
                            
                        
                </ViewRow>
                {/if}

                <ViewRow>
                    {translation.package[localStorage.getItem("language")]} :
                                <img src={$subStore?.package?.school?.logo?.full_path} alt="" class="avatar-xs rounded-circle" />
                                {#if localStorage.getItem("language") == "ar"}
                                    {$subStore?.package?.school?.name_ar} - {$subStore?.package?.name_ar}
                                {:else}
                                    {$subStore?.package?.school?.name} - {$subStore?.package?.name}
                                {/if}
                            
                        
                </ViewRow>
    
                <ViewRow>
                    {translation.days[localStorage.getItem("language")]} :  <span class="fw-normal">{$subStore?.days}</span>
                </ViewRow>
    
                <ViewRow>
                    <div class="d-flex gap-2 align-items-center">
                        <div class="flex-shrink-0">{translation.balance[localStorage.getItem("language")]} : </div>
                        <div class="flex-grow-1">
                        <Progress now={$subStore?.balance} max={$subStore?.days}/>
                        </div>
                    </div>
                </ViewRow>
    
            
    
                <ViewRow>
                    {translation.startedAt[localStorage.getItem("language")]} : <span class="fw-normal">{$subStore?.started_at == null ? "unset" : $subStore?.started_at}</span>
                </ViewRow>
                {#if $subStore?.status == "active"}
                    <ViewRow>
                        {translation.createdAt[localStorage.getItem("language")]} : <span class="fw-normal">{formatTimestamp($subStore?.created_at)}</span>
                    </ViewRow>
                    <ViewRow>
                        {translation.updatedAt[localStorage.getItem("language")]} : <span class="fw-normal">{formatTimestamp($subStore?.updated_at)}</span>
                    </ViewRow>
                    <div class="row mb-3">

                        <div class="table-responsive ">
                            <table class="table table-borderless mb-0">
                                <tbody>
                                    {#if $subStore?.coupon}
                                    <tr>
                                        <td>{translation.discount[localStorage.getItem("language")]} <span class="text-muted">($subStore?.coupon)</span> : </td>
                                        <td class="text-end" id="cart-subtotal">{$subStore.discount} {translation.sar[localStorage.getItem("language")]}</td>
                                    </tr>
                                    {/if}
                                    <tr>
                                        <td>{translation.estimatedTax[localStorage.getItem("language")]}({$subStore.tax}%) : </td>
                                        <td class="text-end" id="cart-discount">- {$subStore.taxCalculated} {translation.sar[localStorage.getItem("language")]}</td>
                                    </tr>
                                    <tr class="table-active">
                                        <th>{translation.total[localStorage.getItem("language")]} ({translation.sar[localStorage.getItem("language")]}) :</th>
                                        <td class="text-end">
                                            <span class="fw-semibold" id="cart-total">
                                                {$subStore.total} {translation.sar[localStorage.getItem("language")]}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                {:else}
                <ViewRow>
                    {translation.status[localStorage.getItem("language")]} :{#if $subStore.status == "scheduled"}
                            <span class="badge bg-info-subtle text-info ms-1">Scheduled</span>
                            {:else if $subStore.status == "expired"}
                            <span class="badge bg-danger-subtle text-danger ms-1">Expired</span>
                            {:else if $subStore.status == "disabled"}
                            <span class="badge bg-warning-subtle text-warning ms-1">Disabled</span>
                            {:else if $subStore.status == "inactive"}
                            <span class="badge bg-dark-subtle text-dark ms-1">Inactive</span>
                            {/if}
                </ViewRow>
                <ViewRow>
                    {translation.createdAt[localStorage.getItem("language")]} : <span class="fw-normal">{formatTimestamp($subStore?.created_at)}</span>
                </ViewRow>
                <ViewRow>
                    {translation.updatedAt[localStorage.getItem("language")]} : <span class="fw-normal">{formatTimestamp($subStore?.updated_at)}</span>
                </ViewRow>

                {/if}


                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">{translation.close[localStorage.getItem("language")]}</button>
                    </div>
            </div>
        </div>
    </div>
</div>