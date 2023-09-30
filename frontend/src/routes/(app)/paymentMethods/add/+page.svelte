<script>

import {PathInitPaymentMethod} from "$lib/api/paths.js"
import {onMount} from "svelte"
import { redirector } from "$lib/api/auth";
import { returnUrl } from "$lib/api/paths";


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
let form

async function save(){
    

    let formData = new FormData(form)
    let res = await fetch(payFort.payfort_url,{
        method:"POST",
        mode:"no-cors",
        body:formData
    })
    redirector(res)

    res = await res.json()

    // if(res.status == "success") {
    //     close.click()
    //     let text = `Added a new subscription` 
    //     toast(text,"success")
    //     invalidate("subs:refresh")
    //     reset()
    // }else {
    //     errors = res.errors
    // }


}


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
                        <input type="text" class="form-control" name="expiry_date" id="cc-expiration" placeholder="MM/YY">
                    </div>
    
                    <div class="col-md-3">
                        <label for="cc-cvv" class="form-label">CVV</label>
                        <input type="text" name="card_security_code" class="form-control" id="cc-cvv" placeholder="xxx">
                    </div>
                </div>
        </div>
    </div>

    <div class="d-flex align-items-start gap-3 mt-4">
        <button type="button" class="btn btn-light btn-label previestab">
            <i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>Back
        </button>
        <button type="submit" class="btn btn-primary right ms-auto">Add Card</button>
    </div>
</form>