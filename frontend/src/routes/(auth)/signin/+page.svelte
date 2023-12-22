<script>
    import {PathSendId,PathSendIdVerification} from "$lib/api/paths.js"
    import { goto } from '$app/navigation';
	import { onMount } from "svelte";
    import {initApp} from "$lib/init/initApp.js"
	import Password from "$lib/components/Password.svelte";
    import { phoneMask } from "$lib/inputMasks.js";
    import {translation} from "$lib/translation.js"



    export let data;
    let form 
    let errors
    let loading = false
    let step = "id" 
    let idNumber
    let phone 
    let resendAvailable = true
    let time = "01:00"
    let timeLeft = 58
    let cencoredPhone


    async function sendId(){
        loading = true
        errors = {}
        let formData = new FormData(form)
        idNumber = formData.get("identity_number")
        formData.set("lang",localStorage.getItem("language"))
        let res = await fetch(PathSendId(),{
            method:"POST",
            body:formData
        })

        res = await res.json()
        if(res.status == "success") {
            phone = res.data.phone
            cencoredPhone = 'x'.repeat(phone.length - 3) + phone.slice(-3);
            step = "verification"

        }else {
            errors = res.errors
        }

        loading = false

    }


    async function resendId(){
        errors = {}
        let formData = new FormData()
        formData.set("identity_number",idNumber)
        let res = await fetch(PathSendId(),{
            method:"POST",
            body:formData
        })

        res = await res.json()
        if(res.status == "success") {
            phone = res.data.phone
         
        }

        resendAvailable = false
        updateTimer()

    }


async function sendPhone(){
    if(loading) return;
    loading = true

    errors = {}
    let formData = new FormData(form)

    let allValues = [];

    // Iterate through the FormData entries
    for (const pair of formData.entries()) {
        const [name, value] = pair;
        allValues.push(value);
    }

    formData = new FormData()
    formData.set("verification_code",allValues.join(''))
    formData.set("phone",phone)
    formData.set("lang",localStorage.getItem("language"))

    let res = await fetch(PathSendIdVerification(),{
            method:"POST",
            body:formData
    })

    let resJson = await res.json()
    if(resJson.status == "success") {
        localStorage.setItem("SID", `Bearer ${resJson.data.token}`);
        if(resJson?.data?.user?.verified == false){
            goto("/verification")   
        }


        if(resJson?.data?.roles[0]?.name != "parent"){
            window.location.href = `${window.location.origin}/admin`
            // goto("")
        }else {
            window.location.href = `${window.location.origin}/students`
            // goto("/")
        }

        // history.back()
    }else {
        if(res.status == 422){
            errors = resJson.errors
        }else {
            message = resJson.message
        }
    }


    loading = false

}
function updateTimer() {
            const seconds = timeLeft % 60;
            time = `00:${seconds < 10 ? '0' : ''}${seconds}`;

            if (timeLeft === 0) {
                // Timer has ended, you can add code to handle this event
                resendAvailable = true
                timeLeft = 59
            } else {
                timeLeft--;
                setTimeout(updateTimer, 1000); // Update the timer every 1 second
            }
    }


    function moveToNext(index, event) {
        function getInputElement(index) {
            return document.getElementById('digit' + index + '-input');
        }

        const eventCode = event.which || event.keyCode;
        if (getInputElement(index).value.length === 1) {
            if (index !== 6) {
                getInputElement(index + 1).focus();
            } else {
                getInputElement(index).blur();
                // Submit code
                sendPhone()
            }
        }
        if (eventCode === 8 && index !== 1) {
            getInputElement(index - 1).focus();
        }
    }

    function paste(){
        let clipboardData = (event.clipboardData || window.clipboardData);
        let pastedText = clipboardData.getData('text');

        for(let i=1;i<=6;i++){
            let input =  document.getElementById('digit' + i + '-input');            
            input.value = pastedText[i-1] == null ? "" : pastedText[i-1]
        }

        if(pastedText.length >= 6){
            sendPhone()
        }else {
            let input =  document.getElementById('digit' + pastedText.length + '-input');
            input.focus()
        }
        
    }

    function checkLength(e){
        let input = e.target
        input.value = input.value.slice(0,input.maxLength)
        let text = "" + input.value
        if(text.length >= 6){
            sendPhone()
        }

    }



</script>
{#if step == "id"}
<div class="row justify-content-center">
    <div class="col-md-9 col-lg-7 col-xl-6">
        <div class="card mt-4">

            <div class="card-body p-4">
                <div class="text-center mt-2">
                    <h5 class="text-primary">{translation.welcomeBack[localStorage.getItem("language")]}</h5>
                    <p class="text-muted">{translation.signInToContinue[localStorage.getItem("language")]} Boofey.</p>
                    <div class="mb-4">
                        <div class="avatar-lg mx-auto">
                            <div class="avatar-title bg-light text-primary display-5 rounded-circle">
                                <i class="ri-bank-card-2-line"></i>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="p-2">
                    <form on:submit|preventDefault={sendId} bind:this={form}>
                        <div class="mb-4">
                            <label class="form-label">{translation.idNumber[localStorage.getItem("language")]}</label>
                            <input type="text" class="form-control" name="identity_number" id="cleave-phone" placeholder={translation.enterIdNumber[localStorage.getItem("language")]}>
                        </div>
                        {#if errors?.identity_number}
                            <strong class="text-danger ms-1 my-2">{errors.identity_number[0]}</strong>
                        {/if}
                        <div class="mb-4">
                            <p class="mb-0 fs-13 text-muted fst-italic">{@html translation.acceptTermsPrivacy[localStorage.getItem("language")]}</p>
                        </div>
                        <div class="text-center mt-4">
                            <button class="btn btn-primary w-100 btn-load" type="submit" disabled={loading}>
                                {#if loading}
                                <span class="spinner-border " role="status"></span>
                                {:else}
                                {translation.submit[localStorage.getItem("language")]}
                                {/if}                                        
                            </button>
                        </div>
                    </form><!-- end form -->
                </div>
            </div>
            <!-- end card body -->
        </div>
        <!-- end card -->
    </div>
</div>
{:else if step == "verification"}

<div class="row justify-content-center">
    <div class="col-md-9 col-lg-7 col-xl-6">
        <div class="card mt-4">

            <div class="card-body p-4">
                <div class="text-center mt-2">
                    <h5 class="text-primary">{translation.welcomeBack[localStorage.getItem("language")]}</h5>
                    <p class="text-muted">{translation.signInToContinue[localStorage.getItem("language")]} Boofey.</p>
                    <lord-icon src="https://cdn.lordicon.com/rhvddzym.json" trigger="loop" colors="primary:#0ab39c" class="avatar-xl">
                    </lord-icon>

                </div>

                <div class="p-2 ">
                    <div class="text-muted text-center mb-4 mx-lg-3">
                        <p>{translation.enterSix[localStorage.getItem("language")]} : <span class="text-primary">{cencoredPhone}</span> </p>
                    </div>

                    <form autocomplete="off" on:submit|preventDefault={sendPhone} bind:this={form}>
                        <div class="row">
                            <div class="col-12">
                                <div class="mb-3">
                                    <label for="digit1-input" class="visually-hidden">Digit 1</label>
                                    <input type="number" name="1" class="form-control form-control-lg bg-light border-light text-center p-0 p-0" on:input={checkLength} maxLength="6" id="digit1-input">
                                </div>
                            </div><!-- end col -->
                        </div>
                    </form><!-- end form -->
                    {#if errors?.verification_code}
                        <div class="my-1 text-center">
                            <p class="mb-0 text-danger">{errors?.verification_code[0]}</p>
                        </div>
                    {/if}
                    {#if errors?.["403"]}
                        <div class="my-1 text-center">
                            <p class="mb-0 text-danger">{errors?.["403"]}</p>
                        </div>
                    {/if}
                    <div class="mt-3">
                        <button class="btn btn-primary w-100 btn-load" type="submit" disabled={loading}>
                            {#if loading}
                            <span class="spinner-border " role="status"></span>
                            {:else}
                            {translation.confirm[localStorage.getItem("language")]}
                            {/if}                                        
                        </button>
                    </div>
                </div>
            </div>
            <!-- end card body -->
        </div>

        <div class="mt-4 text-center">
            {#if resendAvailable}
            <p class="mb-0">{translation.didntReceiveCode[localStorage.getItem("language")]} {translation["?"][localStorage.getItem("language")]} <a href="javascript:void(0);" on:click={resendId} class="fw-semibold text-primary text-decoration-underline"> {translation.resend[localStorage.getItem("language")]}  </a> </p>
            {:else}
            <p class="mb-0">{translation.youNeedToWait[localStorage.getItem("language")]} <span>{time}</span> {translation.inOrderToResend[localStorage.getItem("language")]} </p>
            

            {/if}
        </div>
        <!-- end card -->
    </div>
</div>

{/if}