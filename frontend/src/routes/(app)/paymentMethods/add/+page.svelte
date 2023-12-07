<script>

import {PathInitPaymentMethod} from "$lib/api/paths.js"
import {onMount} from "svelte"
import { redirector } from "$lib/api/auth";
import { returnUrl } from "$lib/api/paths";
import { fade } from 'svelte/transition';
import {translation} from "$lib/translation.js"

// import Card from 'card-js';


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

}
let card 
onMount(() => {
    params = new URL(document.location).searchParams;

    card = new Card({
        form: cardForm,
        container: '.card-wrapper',
        formSelectors: {
            numberInput: 'input#card-number-input',
            expiryInput: 'input#card-expiry-input',
            cvcInput: 'input#card-cvc-input',
            nameInput: 'input#card-name-input'
        },
        placeholders: {
            number: '•••• •••• •••• ••••',
            name: 'Full Name',
            expiry: '••/••',
            cvc: '•••'
        },
        masks: {
            cardNumber: '•' // optional - mask card number
        },
    });

})

let cardForm
let cardNumber = ""
</script>

<form   action="{payFort.payfort_url}" method="POST"   id="payment-form" name="form1" autocomplete="off" bind:this={cardForm}>
    <div class="collapse show" id="paymentmethodCollapse" style="">
        <!-- <div class="card p-4 border shadow-none mb-0 "> -->

                <input type="hidden" name="service_command" value="TOKENIZATION" />
                <input type="hidden" name="language" value="en" />
                <input type="hidden" name="merchant_identifier" value="{payFort.merchant_identifier}" />
                <input type="hidden" name="access_code" value="{payFort.access_code}" />
                <input type="hidden" name="signature" value="{payFort.signature}" />
                <input type="hidden" name="return_url" value="{returnUrl(fatherId)}" />
                <input type="hidden" name="merchant_reference" id="merchant_reference" value="{payFort.merchant_reference}" />
                <input type="hidden" name="remember_me" value="YES" />
                <input type="hidden"name="expiry_date" value="{`${expiry_date?.[5]}${expiry_date?.[6]}${expiry_date?.[0]}${expiry_date?.[1]}`}">
                <input type="hidden"name="card_number" value="{cardNumber.replace(/ /g,'')}">
                <input type="hidden"name="remember_me" value="YES">

                {#if params?.get("status") == "fail"}
                    <div class="row p-3 ">
                        <!-- Danger Alert -->
                        <div class="alert alert-danger alert-border-left alert-dismissible fade show mb-0" role="alert">
                            <i class="ri-error-warning-line me-3 align-middle"></i> <strong>Fail</strong> - {params?.get("msg")}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>

                    </div>
                {/if}    
        <!-- </div> -->
        <div class="row gy-3 mt-2">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">{translation.cardDetails[localStorage.getItem("language")]}</h5>
                    </div>
                    <div class="card-body">
                        <div class="row align-items-start d-flex gx-1">
                            <div class="col-xl-4">
                                <div class="card-wrapper mb-3"></div>
                            </div>
                
                            <div class="form-container active col-xl-8 col-md-12">
                                    <div class="mb-3">
                                        <label for="card-number-input" class="form-label">{translation.cardNumber[localStorage.getItem("language")]}</label>
                                        <input class="form-control" name="" placeholder="{translation.cardNumber[localStorage.getItem("language")]}" type="tel" id="card-number-input" bind:value={cardNumber}>
                                    </div>
                                    <div class="mb-3">
                                        <label for="card-name-input" class="form-label">{translation.holderName[localStorage.getItem("language")]}</label>
                                        <input class="form-control" name="card_holder_name" placeholder="{translation.holderName[localStorage.getItem("language")]}" type="text" id="card-name-input">
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="mb-0">
                                                <label for="card-expiry-input" class="form-label">{translation.expiryDate[localStorage.getItem("language")]}</label>
                                                <input class="form-control"  placeholder="MM/YY" type="tel" id="card-expiry-input" bind:value={expiry_date}>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="mb-0">
                                                <label for="card-cvc-input" class="form-label">{translation.cvc[localStorage.getItem("language")]}</label>
                                                <input class="form-control" name="card_security_code"  placeholder="{translation.cvc[localStorage.getItem("language")]}" type="number" id="card-cvc-input">
                                            </div>
                                        </div>
                                    </div>
                                    
                            </div>
                            <div class="d-flex align-items-start gap-3 mt-4">
                                <button type="submit" class="btn btn-primary right ms-auto">{translation.addCard[localStorage.getItem("language")]}</button>
                            </div>
                    </div>
                    </div>
                    <!-- end card-body -->
                </div>
                <!-- end card -->

        </div>
    </div>

    
</form>


