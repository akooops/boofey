<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"

    let {paymentStore} = getContext("paymentStore")

    

</script>

<div class="modal  fade" id="viewPaymentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View Payment</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
             
            <ViewRow>
               Payment Ref :<span class="badge border border-primary text-primary">{$paymentStore?.ref}</span>
            </ViewRow>

            <ViewRow>
               Subscription Ref : <span class="badge border border-primary text-primary">{$paymentStore?.subscription?.ref == null ? "not found" : $paymentStore.subscription.ref}</span>
            </ViewRow>

            <ViewRow>
                Fort ID : <span class="fw-normal">{$paymentStore?.discount}%</span>
            </ViewRow>
 
            <ViewRow>
                Father :    <img src={$paymentStore?.father?.user?.profile?.image?.full_path} class="avatar-xxs rounded-circle me-1" alt="">
                            <a href="" class="text-reset">{$paymentStore?.father?.user?.profile?.fullname}</a>
             </ViewRow>
             <ViewRow>
                Status : {#if $paymentStore?.status == 14 || $paymentStore?.status == null}
                            <span class="badge bg-success-subtle text-success" id="invoice-status">Success</span>
                        {:else}
                        <span class="badge bg-danger-subtle text-danger" id="invoice-status">Failed</span>
                        {/if}
             </ViewRow>

             <ViewRow>
                Amount : <span class="fw-normal">{$paymentStore?.amount} SAR</span>
             </ViewRow>

             <ViewRow>
                Paid At : <span class="fw-normal">{$paymentStore?.paid_at} </span>
             </ViewRow>
             <ViewRow>
                Response Code : <span class="fw-normal">{$paymentStore?.response_code}</span>
            </ViewRow>
            <ViewRow>
                Response Message : <span class="fw-normal">{$paymentStore?.response_message}</span>
            </ViewRow>
            <ViewRow>
                Payment Option : <span class="fw-normal">{$paymentStore?.payment_option}</span>
            </ViewRow>
            <ViewRow>
                Card Number : <span class="fw-normal">{$paymentStore?.card_number}</span>
            </ViewRow>
            <ViewRow>
                Card Holder Name : <span class="fw-normal">{$paymentStore?.card_holder_name}</span>
            </ViewRow>
            <ViewRow>
            Billing : 
            </ViewRow>
            <div class="ps-3">
            <ViewRow>
                First Name : <span class="fw-normal">{$paymentStore?.firstname}</span>
            </ViewRow>
            <ViewRow>
                Last Name : <span class="fw-normal">{$paymentStore?.lastname}</span>
            </ViewRow>
            <ViewRow>
                Email : <span class="fw-normal">{$paymentStore?.email}</span>
            </ViewRow>
            <ViewRow>
                Phone : <span class="fw-normal">{$paymentStore?.phone}</span>
            </ViewRow>
            <ViewRow>
                Address : <span class="fw-normal">{$paymentStore?.address}</span>
            </ViewRow>
            <ViewRow>
                State : <span class="fw-normal">{$paymentStore?.state}</span>
            </ViewRow>
            <ViewRow>
                City : <span class="fw-normal">{$paymentStore?.city}</span>
            </ViewRow>
            <ViewRow>
                Zip code : <span class="fw-normal">{$paymentStore?.zipcode}</span>
            </ViewRow>
            </div>
            <ViewRow>
                Created at : <span class="fw-normal">{formatTimestamp($paymentStore?.created_at)}</span>
            </ViewRow>
            <ViewRow>
                Updated at : <span class="fw-normal">{formatTimestamp($paymentStore?.updated_at)}</span>
            </ViewRow>

                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button>
                    </div>
            </div>
        </div>
    </div>
</div>