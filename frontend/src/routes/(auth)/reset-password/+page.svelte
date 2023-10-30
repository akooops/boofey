<script>
    import {generatePasswordResetToken,passwordReset} from "$lib/api/paths.js"
    import { goto } from '$app/navigation';
	import { onMount } from "svelte";
    import {initApp} from "$lib/init/initApp.js"
	import Password from "$lib/components/Password.svelte";
    import { phoneMask } from "$lib/inputMasks.js";
    import {translation} from "$lib/translation.js"



    export let data;
    let form 
    let errors
    let step = "phone" 
    let phone 
    let resendAvailable = true
    let time = "01:00"
    let timeLeft = 58
    let loading = false


    async function sendPhone(){
        loading = true
        errors = {}
        let formData = new FormData(form)
        formData.set("lang",localStorage.getItem("language"))

        let res = await fetch(generatePasswordResetToken(),{
            method:"POST",
            body:formData
        })

        res = await res.json()
        if(res.status == "success") {
            phone = formData.get("phone")
            step = "passwordReset"

        }else {
            errors = res.errors
        }

        loading = false

    }


async function resetPassword(){
    loading = true
        errors = {}
        let formData = new FormData(form)
        formData.set("phone",phone)
        formData.set("lang",localStorage.getItem("language"))

        let res = await fetch(passwordReset(),{
            method:"POST",
            body:formData
        })

        res = await res.json()
        if(res.status == "success") {
            // goto("/signin")
            step = "success"
        }else {
            errors = res.errors
        }
        loading = false

    }

    onMount(() => {
        phoneMask()

    })


async function genCode(){
        let formData = new FormData(form)
        formData.set("phone",phone)
        
        let res = await fetch(generatePasswordResetToken(),{
            method:"POST",
            body:formData
        })

        resendAvailable = false
        updateTimer()

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



</script>
{#if step == "phone"}
<div class="row justify-content-center">
    <div class="col-md-9 col-lg-7 col-xl-6">
        <div class="card mt-4">

            <div class="card-body p-4">
                <div class="text-center mt-2">
                    <h5 class="text-primary">{translation.forgotPassword[localStorage.getItem("language")]}{translation["?"][localStorage.getItem("language")]}</h5>
                    <!-- <p class="text-muted">Reset password with boofey</p> -->

                    <lord-icon src="https://cdn.lordicon.com/rhvddzym.json" trigger="loop" colors="primary:#0ab39c" class="avatar-xl">
                    </lord-icon>

                </div>

                <div class="alert border-0 alert-warning text-center mb-2 mx-2" role="alert">
                    {translation.enterPhoneAndReset[localStorage.getItem("language")]}
                </div>
                <div class="p-2">
                    <form on:submit|preventDefault={sendPhone} bind:this={form}>
                        <div class="mb-4">
                            <label class="form-label">{translation.phone[localStorage.getItem("language")]}</label>
                            <input type="tel" class="form-control" name="phone" id="cleave-phone" placeholder={translation.enterPhone[localStorage.getItem("language")]}>
                        </div>
                        {#if errors?.phone}
                            <strong class="text-danger ms-1 my-2">{errors.phone[0]}</strong>
                        {/if}
                        <div class="text-center mt-4">
                            <button class="btn btn-info w-100 btn-load" type="submit" disabled={loading}>
                                {#if loading}
                                <span class="spinner-border " role="status"></span>
                                {:else}
                                {translation.sendResetCode[localStorage.getItem("language")]}
                                {/if}                                        
                            </button>
                        </div>
                    </form><!-- end form -->
                </div>
            </div>
            <!-- end card body -->
        </div>
        <!-- end card -->

        <div class="mt-4 text-center">
            <p class="mb-0">{translation.iRemember[localStorage.getItem("language")]}... <a href="/signin" class="fw-semibold text-primary text-decoration-underline"> {translation.clickHere[localStorage.getItem("language")]} </a> </p>
        </div>

    </div>
</div>
{:else if step == "passwordReset"}
<div class="row justify-content-center">
    <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card mt-4">

            <div class="card-body p-4">
                <div class="text-center mt-2">
                    <h5 class="text-primary">{translation.createNewPass[localStorage.getItem("language")]}</h5>
                    <p class="text-muted">{translation.enterNewPasswordAndToken[localStorage.getItem("language")]}.</p>
                </div>

                <div class="p-2">
                    <form on:submit|preventDefault={resetPassword} bind:this={form}>
                        <div class="mb-3">
                            <label class="form-label" for="password-input">{translation.password[localStorage.getItem("language")]}</label>
                            <div class="position-relative auth-pass-inputgroup">
                                
                                <Password name={"password"} placeholder={translation.enterPassword[localStorage.getItem("language")]}/>
                                <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button>
                            </div>
                            {#if errors?.password}
                                <strong class="text-danger ms-1 my-2">{errors.password[0]}</strong>
                            {/if}
                        </div>

                        <div class="mb-3">
                            <label class="form-label" for="confirm-password-input">{translation.confirmPassword[localStorage.getItem("language")]}</label>
                            <div class="position-relative auth-pass-inputgroup mb-3">
                                <Password name={"password_confirmation"} placeholder={translation.enterPasswordConfirmation[localStorage.getItem("language")]}/>
                                <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="confirm-password-input"><i class="ri-eye-fill align-middle"></i></button>
                            </div>
                            {#if errors?.password_confirmation}
                                <strong class="text-danger ms-1 my-2">{errors.password_confirmation[0]}</strong>
                            {/if}
                        </div>

                        <div class="mb-3">
                            <label class="form-label">{translation.verificationCode[localStorage.getItem("language")]}</label>
                            <input type="text" class="form-control" name="token" id="cleave-phone" placeholder={translation.enterVerificationCode[localStorage.getItem("language")]}>
                            {#if errors?.token}
                                <strong class="text-danger ms-1 my-2">{errors.token[0]}</strong>
                            {/if}
                        </div>

                        <div class="mt-4">
                            <button class="btn btn-info w-100 btn-load" type="submit" disabled={loading}>
                                {#if loading}
                                <span class="spinner-border " role="status"></span>
                                {:else}
                                {translation.resetPass[localStorage.getItem("language")]}
                                {/if}                                        
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            <!-- end card body -->
        </div>
        <!-- end card -->

        <div class="mt-4 text-center">
            {#if resendAvailable}
            <p class="mb-0">{translation.didntReceiveCode[localStorage.getItem("language")]}  {translation["?"][localStorage.getItem("language")]} <a href="javascript:void(0);" on:click={genCode} class="fw-semibold text-primary text-decoration-underline"> {translation.resend[localStorage.getItem("language")]} </a> </p>
            {:else}
            <p class="mb-0">{translation.youNeedToWait[localStorage.getItem("language")]} <span>{time}</span> {translation.inOrderToResend[localStorage.getItem("language")]}  </p>
            

            {/if}
        </div>

    </div>
</div>
{:else}

<div class="row justify-content-center">
    <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card mt-4">
            <div class="card-body p-4 text-center">
                <div class="avatar-lg mx-auto mt-2">
                    <div class="avatar-title bg-light text-success display-3 rounded-circle">
                        <i class="ri-checkbox-circle-fill"></i>
                    </div>
                </div>
                <div class="mt-4 pt-2">
                    <h4>{translation.success[localStorage.getItem("language")]} !</h4>
                    <p class="text-muted mx-4">{translation.passChangedSuccess[localStorage.getItem("language")]}</p>
                    <div class="mt-4">
                        <a href="/signin" class="btn btn-info w-100">{translation.signIn[localStorage.getItem("language")]}</a>
                    </div>
                </div>
            </div>
            <!-- end card body -->
        </div>
        <!-- end card -->

    </div>
</div>




{/if}
