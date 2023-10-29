<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';

    export let payment


    let {paymentStore} = getContext("paymentStore")
    
    function setPayment(){
        $paymentStore = JSON.parse(JSON.stringify(payment));
        console.log($paymentStore)
    }






</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td>{payment.id}</td>
    <td><span class="badge border border-primary text-primary">{payment.ref}</span></td>
    <td>
        {#if payment?.subscription?.ref == null}
        <span class="badge bg-danger-subtle text-danger">not found</span> 
        {:else}
        {payment.subscription.ref}
        {/if}
    </td>
    <td>{payment.fort_id}</td>
    <td>             
        <img src={payment.father.user.profile.image.full_path} class="avatar-xxs rounded-circle me-1" alt="">
        <a href="" class="text-reset">{payment.father.user.profile.fullname}</a>
    </td>
    <td>
        {#if payment.status == 14 || payment.status == null}
            <span class="badge bg-success-subtle text-success" id="invoice-status">Success</span>
        {:else}
        <span class="badge bg-danger-subtle text-danger" id="invoice-status">Failed</span>
        {/if}
    </td>
    <td>{payment.amount} SAR</td>
    <td>{payment.paid_at}</td>

    <td>
        <div class="hstack gap-3 flex-wrap">
            
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("payments.show")}
            <span data-bs-toggle="modal" data-bs-target="#viewPaymentModal" on:click={setPayment}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            {/if}
 
        </div>
    </td>
</tr>