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
                    <h5 class="text-primary">Forgot password ?</h5>
                    <!-- <p class="text-muted">Reset password with boofey</p> -->

                    <lord-icon src="https://cdn.lordicon.com/rhvddzym.json" trigger="loop" colors="primary:#0ab39c" class="avatar-xl">
                    </lord-icon>

                </div>

                <div class="alert border-0 alert-warning text-center mb-2 mx-2" role="alert">
                    Enter your Phone Number and a reset code will be sent to you !
                </div>
                <div class="p-2">
                    <form on:submit|preventDefault={sendPhone} bind:this={form}>
                        <div class="mb-4">
                            <label class="form-label">Phone</label>
                            <input type="tel" class="form-control" name="phone" id="cleave-phone" placeholder="Enter Phone Number">
                        </div>
                        {#if errors?.phone}
                            <strong class="text-danger ms-1 my-2">{errors.phone[0]}</strong>
                        {/if}
                        <div class="text-center mt-4">
                            <button class="btn btn-info w-100 btn-load" type="submit" disabled={loading}>
                                {#if loading}
                                <span class="spinner-border " role="status"></span>
                                {:else}
                                Send Reset Code
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
            <p class="mb-0">Wait, I remember my password... <a href="/signin" class="fw-semibold text-primary text-decoration-underline"> Click Here </a> </p>
        </div>

    </div>
</div>
{:else if step == "passwordReset"}
<div class="row justify-content-center">
    <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card mt-4">

            <div class="card-body p-4">
                <div class="text-center mt-2">
                    <h5 class="text-primary">Create New Password</h5>
                    <p class="text-muted">Enter a new password , and the token that has been sent to your phone.</p>
                </div>

                <div class="p-2">
                    <form on:submit|preventDefault={resetPassword} bind:this={form}>
                        <div class="mb-3">
                            <label class="form-label" for="password-input">Password</label>
                            <div class="position-relative auth-pass-inputgroup">
                                
                                <Password name={"password"} placeholder="Enter Password"/>
                                <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button>
                            </div>
                            {#if errors?.password}
                                <strong class="text-danger ms-1 my-2">{errors.password[0]}</strong>
                            {/if}
                        </div>

                        <div class="mb-3">
                            <label class="form-label" for="confirm-password-input">Confirm Password</label>
                            <div class="position-relative auth-pass-inputgroup mb-3">
                                <Password name={"password_confirmation"} placeholder="Confirm Password"/>
                                <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="confirm-password-input"><i class="ri-eye-fill align-middle"></i></button>
                            </div>
                            {#if errors?.password_confirmation}
                                <strong class="text-danger ms-1 my-2">{errors.password_confirmation[0]}</strong>
                            {/if}
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Verification Code</label>
                            <input type="text" class="form-control" name="token" id="cleave-phone" placeholder="Enter Verification Code">
                            {#if errors?.token}
                                <strong class="text-danger ms-1 my-2">{errors.token[0]}</strong>
                            {/if}
                        </div>

                        <div class="mt-4">
                            <button class="btn btn-info w-100 btn-load" type="submit" disabled={loading}>
                                {#if loading}
                                <span class="spinner-border " role="status"></span>
                                {:else}
                                Reset Password
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
            <p class="mb-0">Didn't receive the code ? <a href="javascript:void(0);" on:click={genCode} class="fw-semibold text-primary text-decoration-underline"> Resend </a> </p>
            {:else}
            <p class="mb-0">You need to wait <span>{time}</span> in order to resend again  </p>
            

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
                    <h4>Success !</h4>
                    <p class="text-muted mx-4">your password has been changed successfully</p>
                    <div class="mt-4">
                        <a href="/signin" class="btn btn-info w-100">Sign in</a>
                    </div>
                </div>
            </div>
            <!-- end card body -->
        </div>
        <!-- end card -->

    </div>
</div>




{/if}
