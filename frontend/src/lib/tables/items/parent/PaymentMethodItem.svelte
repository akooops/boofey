<script>
    import { getContext } from "svelte"

    export let paymentMethod


    let {paymentMethodStore} = getContext("paymentMethodStore")
    
    function setPaymentMethod(){
        $paymentMethodStore = JSON.parse(JSON.stringify(paymentMethod));
    }

    $: expiry_date = paymentMethod?.expiry_date?.toString()


</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td >{paymentMethod.id}</td>
    <td>
        {paymentMethod.card_holder_name}
    </td>
    <td>
       {paymentMethod.card_number}
    </td>
    {#if paymentMethod.expiry_date}
    <td>{expiry_date[2]}{expiry_date[3]}/{expiry_date[0]}{expiry_date[1]}</td>
    {:else}
    <td>{ paymentMethod.expiry_date}</td>
    {/if}
    <td>
        <div class="hstack gap-3 flex-wrap">
            <span data-bs-toggle="modal" data-bs-target="#deletePaymentMethodModal" on:click={setPaymentMethod}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
        </div>
    </td>
</tr>