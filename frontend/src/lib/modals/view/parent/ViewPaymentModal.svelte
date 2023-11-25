<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"
    import {translation} from "$lib/translation.js"

    let {paymentStore} = getContext("paymentStore")

    

</script>

<div class="modal  fade" id="viewPaymentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">{translation.viewPayment[localStorage.getItem("language")]}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
             
            <ViewRow>
                {translation.payRef[localStorage.getItem("language")]} :<span class="badge border border-primary text-primary">{$paymentStore?.ref}</span>
            </ViewRow>

            <ViewRow>
                {translation.subRef[localStorage.getItem("language")]} : <span class="badge border border-primary text-primary">{$paymentStore?.subscription?.ref == null ? "not found" : $paymentStore.subscription.ref}</span>
            </ViewRow>

             <ViewRow>
                {translation.status[localStorage.getItem("language")]} : {#if $paymentStore?.status == 14 || $paymentStore?.status == null}
                            <span class="badge bg-success-subtle text-success" id="invoice-status">{translation.success[localStorage.getItem("language")]}</span>
                        {:else}
                        <span class="badge bg-danger-subtle text-danger" id="invoice-status">{translation.failed[localStorage.getItem("language")]}</span>
                        {/if}
             </ViewRow>

             <ViewRow>
                {translation.amount[localStorage.getItem("language")]} : <span class="fw-normal">{$paymentStore?.amount} {translation.sar[localStorage.getItem("language")]}</span>
             </ViewRow>

             <ViewRow>
                {translation.paidAt[localStorage.getItem("language")]} : <span class="fw-normal">{$paymentStore?.paid_at} </span>
             </ViewRow>
            <ViewRow>
                {translation.paymentOption[localStorage.getItem("language")]} : <span class="fw-normal">{$paymentStore?.payment_option}</span>
            </ViewRow>
            <ViewRow>
                {translation.cardNumber[localStorage.getItem("language")]} : <span class="fw-normal">{$paymentStore?.card_number}</span>
            </ViewRow>
            <ViewRow>
                {translation.holderName[localStorage.getItem("language")]} : <span class="fw-normal">{$paymentStore?.card_holder_name}</span>
            </ViewRow>
            <ViewRow>
                {translation.billing[localStorage.getItem("language")]} : 
            </ViewRow>
            <div class="ps-3">
            <ViewRow>
                {translation.firstName[localStorage.getItem("language")]} : <span class="fw-normal">{$paymentStore?.firstname}</span>
            </ViewRow>
            <ViewRow>
                {translation.lastName[localStorage.getItem("language")]} : <span class="fw-normal">{$paymentStore?.lastname}</span>
            </ViewRow>
            <ViewRow>
                {translation.email[localStorage.getItem("language")]} : <span class="fw-normal">{$paymentStore?.email}</span>
            </ViewRow>
            <ViewRow>
                {translation.phone[localStorage.getItem("language")]} : <span class="fw-normal">{$paymentStore?.phone}</span>
            </ViewRow>
            <ViewRow>
                {translation.address[localStorage.getItem("language")]} : <span class="fw-normal">{$paymentStore?.address}</span>
            </ViewRow>
            <ViewRow>
                {translation.state[localStorage.getItem("language")]} : <span class="fw-normal">{$paymentStore?.state}</span>
            </ViewRow>
            <ViewRow>
                {translation.city[localStorage.getItem("language")]} : <span class="fw-normal">{$paymentStore?.city}</span>
            </ViewRow>
            <ViewRow>
                {translation.zipCode[localStorage.getItem("language")]} : <span class="fw-normal">{$paymentStore?.zipcode}</span>
            </ViewRow>
            </div>
            <ViewRow>
                {translation.createdAt[localStorage.getItem("language")]} : <span class="fw-normal">{formatTimestamp($paymentStore?.created_at)}</span>
            </ViewRow>
            <ViewRow>
                {translation.updatedAt[localStorage.getItem("language")]} : <span class="fw-normal">{formatTimestamp($paymentStore?.updated_at)}</span>
            </ViewRow>

                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">{translation.close[localStorage.getItem("language")]}</button>
                    </div>
            </div>
        </div>
    </div>
</div>