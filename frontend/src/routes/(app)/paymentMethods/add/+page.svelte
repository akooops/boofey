<script>

import {PathInitPaymentMethod} from "$lib/api/paths.js"
import {onMount} from "svelte"
import { redirector } from "$lib/api/auth";
import { returnUrl } from "$lib/api/paths";
import { fade } from 'svelte/transition';


//https://sbcheckout.payfort.com/FortAPI/paymentPage

//expiry_date

// {
//     "payfort_url": "https://sbcheckout.PayFort.com/FortAPI/paymentPage",
//     "service_command": "TOKENIZATION",
//     "language": "en",
//     "access_code": "fVV2e5KWuLxKDRqIcBYW",
//     "merchant_identifier": "ea198946",
//     "merchant_reference": "TOKENIZATION-APFKNTDW",
//     "signature": "8a82ee7ccfb7f5512c77aee0c7600ad55dbcb2e5bf416bd68fdcc6228d120e4c"
// }
export let data 
$: payFort = data.paymentMethodInitResponse.data
$: fatherId = data.fatherId
let expiry_date

let params 

function slash(event){
    const input = event.target;
    const value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (value.length > 2) {
        // Insert a slash after the second digit
        input.value = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else {
        input.value = value;
    }

    console.log(expiry_date[3],expiry_date[4],expiry_date[0],expiry_date[1])
}
onMount(() => {
    params = new URL(document.location).searchParams;

})



</script>


<form  method="post" action="{payFort.payfort_url}"  id="payment-form" name="form1">
    <div class="collapse show" id="paymentmethodCollapse" style="">
        <div class="card p-4 border shadow-none mb-0 mt-4">

                <input type="hidden" name="service_command" value="TOKENIZATION" />
                <input type="hidden" name="language" value="en" />
                <input type="hidden" name="merchant_identifier" value="{payFort.merchant_identifier}" />
                <input type="hidden" name="access_code" value="{payFort.access_code}" />
                <input type="hidden" name="signature" value="{payFort.signature}" />
                <input type="hidden" name="return_url" value="{returnUrl(fatherId)}" />
                <input type="hidden" name="merchant_reference" id="merchant_reference" value="{payFort.merchant_reference}" />
                <input type="hidden" name="remember_me" value="YES" />
                <input type="hidden"name="expiry_date" value="{`${expiry_date?.[3]}${expiry_date?.[4]}${expiry_date?.[0]}${expiry_date?.[1]}`}">
                {#if params?.get("status") == "fail"}
                    <div class="row p-3">
                        <!-- Danger Alert -->
                        <div class="alert alert-danger alert-border-left alert-dismissible fade show" role="alert">
                            <i class="ri-error-warning-line me-3 align-middle"></i> <strong>Fail</strong> - {params?.get("msg")}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>

                    </div>
                {/if}

                <div class="row gy-3">
                    <div class="col-md-12">
                        <label for="cc-name" class="form-label">Name on card</label>
                        <input type="text" name="card_holder_name" class="form-control" id="cc-name" placeholder="Enter name">
                        <small class="text-muted">Full name as displayed on card</small>
                    </div>
    
                    <div class="col-md-6">
                        <label for="cc-number" class="form-label">Credit card number</label>
                        <input type="text" name="card_number" class="form-control" id="cc-number" placeholder="xxxx xxxx xxxx xxxx">
                    </div>
    
                    <div class="col-md-3">
                        <label for="cc-expiration" class="form-label">Expiration</label>
                        <input type="text" class="form-control" id="cc-expiration" placeholder="MM/YY" maxlength="5" on:input={slash} bind:value={expiry_date}>
                    </div>
    
                    <div class="col-md-3">
                        <label for="cc-cvv" class="form-label">CVV</label>
                        <input type="text" name="card_security_code" class="form-control" id="cc-cvv" maxlength="3" placeholder="xxx">
                    </div>
                </div>
        </div>
    </div>

    <div class="d-flex align-items-start gap-3 mt-4">
        <button type="submit" class="btn btn-primary right ms-auto">Add Card</button>
    </div>
</form>