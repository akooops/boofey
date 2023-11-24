<script>
    import {PathGenVerify,PathGenVerificationCode} from "$lib/api/paths.js"
    import { goto } from '$app/navigation';
	import { onMount } from "svelte";
    import {initApp} from "$lib/init/initApp.js"
    import {translation} from "$lib/translation.js"

    export let data;
    let form 
    let message = ""
    let errors
    let loading = false 
    let time = "01:00"
    let timeLeft = 58
    let resendAvailable = true
    async function verify(){
        loading = true

        errors = {}
        message = ""
        let formData = new FormData(form)

        let allValues = [];

        // Iterate through the FormData entries
        for (const pair of formData.entries()) {
            const [name, value] = pair;
            allValues.push(value);
        }

        formData = new FormData()
        formData.set("verification_code",allValues.join(''))
        formData.set("lang",localStorage.getItem("language"))

        let res = await fetch(PathGenVerify(),{
            method:"POST",
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            body:formData
        })

        res = await res.json()
        if(res.status == "success") {
            if(data.user.roles[0].name == "parent"){
                goto("/")
            }else {
                goto("/admin")
            }
        }else {
            
                errors = res.errors
        }

        loading = false

    }

    async function genCode(){
        let res = await fetch(PathGenVerificationCode(),{
            method:"POST",
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })

        resendAvailable = false
        updateTimer()

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
                verify()
            }
        }
        if (eventCode === 8 && index !== 1) {
            getInputElement(index - 1).focus();
        }
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



            <div class="row justify-content-center">
                <div class="col-md-9 col-lg-7 col-xl-6">
                    <div class="card mt-4">

                        <div class="card-body p-4">
                            <div class="mb-4">
                                <div class="avatar-lg mx-auto">
                                    <div class="avatar-title bg-light text-primary display-5 rounded-circle">
                                        <i class="ri-mail-line"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="p-2 mt-4">
                                <div class="text-muted text-center mb-4 mx-lg-3">
                                    <h4>Verify Your Account</h4>
                                    <p>Please enter the 6 digits code sent to your phone number </p>
                                </div>

                                <form autocomplete="off" on:submit|preventDefault={verify} bind:this={form}>
                                    <div class="row">
                                        <div class="col-2">
                                            <div class="mb-3">
                                                <label for="digit1-input" class="visually-hidden">Digit 1</label>
                                                <input type="text" name="1" class="form-control form-control-lg bg-light border-light text-center p-0 p-0"  on:keyup={event => moveToNext(1, event)} maxLength="1" id="digit1-input">
                                            </div>
                                        </div><!-- end col -->
                                
                                        <div class="col-2">
                                            <div class="mb-3">
                                                <label for="digit2-input" class="visually-hidden">Digit 2</label>
                                                <input type="text" name="2" class="form-control form-control-lg bg-light border-light text-center p-0" on:keyup={event => moveToNext(2, event)} maxLength="1" id="digit2-input">
                                            </div>
                                        </div><!-- end col -->
                                
                                        <div class="col-2">
                                            <div class="mb-3">
                                                <label for="digit3-input" class="visually-hidden">Digit 3</label>
                                                <input type="text" name="3" class="form-control form-control-lg bg-light border-light text-center p-0"  on:keyup={event => moveToNext(3, event)} maxLength="1" id="digit3-input">
                                            </div>
                                        </div><!-- end col -->
                                
                                        <div class="col-2">
                                            <div class="mb-3">
                                                <label for="digit4-input" class="visually-hidden">Digit 4</label>
                                                <input type="text" name="4" class="form-control form-control-lg bg-light border-light text-center p-0"  on:keyup={event => moveToNext(4, event)} maxLength="1" id="digit4-input">
                                            </div>
                                        </div><!-- end col -->
                                        <div class="col-2">
                                            <div class="mb-3">
                                                <label for="digit5-input" class="visually-hidden">Digit 5</label>
                                                <input type="text" name="5" class="form-control form-control-lg bg-light border-light text-center p-0"  on:keyup={event => moveToNext(5, event)} maxLength="1" id="digit5-input">
                                            </div>
                                        </div><!-- end col -->
                                        <div class="col-2">
                                            <div class="mb-3">
                                                <label for="digit6-input" class="visually-hidden">Digit 6</label>
                                                <input type="text" name="6" class="form-control form-control-lg bg-light border-light text-center p-0"  on:keyup={event => moveToNext(6, event)} maxLength="1" id="digit6-input">
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
                                    <button class="btn btn-info w-100 btn-load" type="submit" disabled={loading}>
                                        {#if loading}
                                        <span class="spinner-border " role="status"></span>
                                        {:else}
                                        Confirm
                                        {/if}                                        
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- end card body -->
                    </div>
                    <!-- end card -->

                    <div class="mt-4 text-center">
                        {#if resendAvailable}
                        <p class="mb-0">Didn't receive the code ? <a href="javascript:void(0);" on:click={genCode} class="fw-semibold text-primary text-decoration-underline"> Resend  </a> </p>
                        {:else}
                        <p class="mb-0">You need to wait <span>{time}</span> in order to resend again  </p>
                        

                        {/if}
                    </div>

                </div>
            </div>
