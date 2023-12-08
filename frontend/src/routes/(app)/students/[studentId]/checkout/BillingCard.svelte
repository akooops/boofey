<script>
    import SavedAdress from "./SavedAdress.svelte";
    import BillingInfo from "./BillingInfo.svelte";
	import PaymentSelection from "./PaymentSelection.svelte";
    import { redirector } from "$lib/api/auth";
    import { PathPay,PathCheckPaymentRef,PathPayementRedirection } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import {translation} from "$lib/translation.js"
    import { page } from '$app/stores';  
    import { env } from '$env/dynamic/public';
	import { onMount } from "svelte";

    export let billings
    export let couponId
    export let paymentMethods
    export let customerEmail
    export let customerIp
    export let paymentId
    export let paymentRef

    let pending = true
    let error


    let states = ["active","",""]
    let addressId
    let paymentMethodId
    let interval

    export let data


    onMount(() => {
        addressId = $page.url.searchParams.get("billing")
        paymentMethodId = $page.url.searchParams.get("payment")
        if($page.url.searchParams.get("error")){
            error = $page.url.searchParams.get("error")
        }
        if(addressId && paymentMethodId){
            pay()
        }
        if(addressId || paymentMethodId || error){
            states = ["done","done","active"]
        }
    })

    async function proceed(index,e){
        addressId = e.detail.addressId != null ? e.detail.addressId : addressId
        paymentMethodId = e.detail.paymentMethodId != null ? e.detail.paymentMethodId : paymentMethodId
        states[index] = "done"
        states[index+1] = "active"
        if(index == 1){
           pay()
        }


    }

    function pay(){
        console.log("paying")
        if(env.PUBLIC_PAYMENT_REDIRECTION == "true"){
            paymentRedirection()
        }else {
            sendPayment()
        }
    }

    function back(index){
        states[index] = ""
        states[index-1] = "active"
    }

    export async function free(appliedCoupon){
        states = ["done","done","active"]
        couponId = appliedCoupon
        sendPayment()
    }

    export async function sendPayment(){

        let formData = new FormData()

        formData.set("subscription_id",paymentId)
        formData.set("customer_email",customerEmail)
        formData.set("customer_ip",customerIp)
        formData.set("payment_method_id",paymentMethodId)
        formData.set("billing_id",addressId)
        formData.set("language",localStorage.getItem("language"))
 
        const url = new URL(window.location.href);
        url.searchParams.set("billing",addressId)
        url.searchParams.set("payment",paymentMethodId)

        
        // formData.set("return_url",url.href)
        console.log($page)
        formData.set("return_url",`${$page.url.origin}/students/${$page.params.studentId}/subscriptions?ref=${paymentRef}`)
        if(couponId){
            formData.set("coupon_id",couponId)
        }

        
        let res = await fetch(PathPay(),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
        if(res.status == "success") {
            pending = false                    
            let text = `Payment has been fullfilled` 
            toast(text,"success")
        }else if (res.status == "error"){
            error = res.error
        }
        else {
            // let popup = window.open(res.data["3ds_url"])
        window.location.href = res.data["3ds_url"]

            interval = setInterval(async () => {
                if (popup.closed) {
                    let res = await fetch(PathCheckPaymentRef(paymentRef),{
                        headers:{
                            Authorization: `${localStorage.getItem("SID")}`
                        }
                    })

                    redirector(res)

                    res = await res.json()
    
                    if(res.status == "success") {
                        if(res?.data?.payment?.status == 14){
                            pending = false                    
                            let text = `Payment has been fullfilled` 
                            toast(text,"success")
                        }else {
                            error = res?.data?.payment?.response_message
                        }
                    }else if (res.status == "error"){
                        error = res.error.message
                    }
                    clearInterval(interval);

                }
            }, 500);
        }

    }

    async function paymentRedirection(){

        let returnUrl = `https://localhost:5173/paymentReturn/feedback/${$page.url.pathname.split("/")[2]}`

        let formData = new FormData()
        formData.set("language",localStorage.getItem("language"))
        formData.set("customer_ip",customerIp)
        formData.set("customer_email",customerEmail)
        formData.set("billing_id",addressId)
        formData.set("subscription_id",paymentId)
        formData.set("return_url",returnUrl)
        if(couponId){
            formData.set("coupon_id",couponId)
        }
        if(paymentMethodId){
            formData.set("payment_method_id",paymentMethodId)
        }

        let res = await fetch(PathPayementRedirection(),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        res = await res.json()

        
        createForm(res.data.payload,res.data.url)
        


    }

    function createForm(data,url){
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;

        // Append the payload data as hidden input fields to the form
        Object.entries(data).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });

        // Append the form to the body and submit it
        document.body.appendChild(form);
        form.submit();
    };
    


</script>

<div class="card">
    <div class="card-body checkout-tab">

        <form action="#">
            <div class="step-arrow-nav mt-n3 mx-n3 mb-3">

                <ul class="nav nav-pills nav-justified custom-nav" >
                    <li class="nav-item" role="presentation">
                        <button class="nav-link fs-15 p-3 {states[0]}" id="pills-bill-info-tab" type="button"  aria-controls="pills-bill-info" aria-selected="true">
                            <i class="ri-bill-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i> {translation.billingInfo[localStorage.getItem("language")]}
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link fs-15 p-3 {states[1]}" id="pills-payment-tab"  type="button"  aria-controls="pills-payment" aria-selected="false">
                            <i class="ri-bank-card-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i> {translation.paymentInfo[localStorage.getItem("language")]}
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link fs-15 p-3 {states[2]}" id="pills-finish-tab"  type="button" aria-controls="pills-finish" aria-selected="false">
                            <i class="ri-checkbox-circle-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i> {translation.finish[localStorage.getItem("language")]}
                        </button>
                    </li>
                </ul>
            </div>

            <div class="tab-content">
                <div class="tab-pane fade {states[0] == "active" ? "show active" : ""}" id="pills-bill-info" role="tabpanel" aria-labelledby="pills-bill-info-tab">
                   <BillingInfo {billings} on:proceed={(e) => proceed(0,e)}/>
                </div>


                <div class="tab-pane fade {states[1] == "active" ? "show active" : ""}" id="pills-payment" role="tabpanel" aria-labelledby="pills-payment-tab">
                    <PaymentSelection billingId={addressId} {data} {paymentMethods} on:proceed={(e) => proceed(1,e)} on:back={(e) => back(1)}/>
                </div>
                <!-- end tab pane -->

                <div class="tab-pane fade {states[2] == "active" ? "show active" : ""}" id="pills-finish" role="tabpanel" aria-labelledby="pills-finish-tab">
                    <div class="text-center py-5">
                        {#if pending}

                            {#if error}
                            <div class="mb-4">
                                <lord-icon src="https://cdn.lordicon.com/tdrtiskw.json" trigger="loop" colors="primary:#f06548,secondary:#f7b84b" style="width:120px;height:120px"></lord-icon>
                                <h5 class="text-danger">{translation.error[localStorage.getItem("language")]}</h5>
                                <p class="text-muted">{error}</p>
                                <p class="text-muted">{translation.goBackTo[localStorage.getItem("language")]} <a href="/students" class="text-decoration-underline">{translation.students[localStorage.getItem("language")]}</a></p>

                            </div>
                        
                            {:else}
                            <div class="mb-4">
                                <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                                <h5>{translation.proccessingPayment[localStorage.getItem("language")]}...</h5>
                            </div>
                            {/if}
                        {:else}
                        <div class="mb-4">
                            <lord-icon src="https://cdn.lordicon.com/lupuorrc.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                        </div>
                        <h5>{translation.orderCompleted[localStorage.getItem("language")]} !</h5>
                        <p class="text-muted">{translation.goBackTo[localStorage.getItem("language")]} <a href="/students" class="text-decoration-underline">{translation.students[localStorage.getItem("language")]}</a></p>
                        {/if}
                    </div>
                </div>
                <!-- end tab pane -->
            </div>
            <!-- end tab content -->
        </form>
    </div>
    <!-- end card body -->
</div>