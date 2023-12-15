<script>
    import {PathLogin} from "$lib/api/paths.js"
    import { goto } from '$app/navigation';
	import { onMount } from "svelte";
    import {initApp} from "$lib/init/initApp.js"
    import { navigating } from '$app/stores';
	import Password from "$lib/components/Password.svelte";
    import {translation} from "$lib/translation.js"



    export let data;
    let form 
    let keep_me_signed_in = false
    let message = ""
    let errors
    let loading = false
    async function signin(){
        localStorage.setItem("language","en")
        loading = true
        errors = {}
        message = ""
        let formData = new FormData(form)
        formData.set("keep_me_signed_in",keep_me_signed_in)
        formData.set("lang",localStorage.getItem("language"))

        let res = await fetch(PathLogin(),{
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
                if(resJson?.data?.roles[0]?.name == "pos"){
                    window.location.href = `${window.location.origin}/admin/canteens`
                    return;
                }
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

    onMount(() => {
    })



</script>


            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card mt-4">

                        <div class="card-body p-4">
                            <div class="text-center mt-2">
                                <h5 class="text-primary">Welcome Back !</h5>
                                <p class="text-muted">Sign in to continue to Boofey.</p>
                            </div>
                            <div class="p-2 mt-4">
                                <form on:submit|preventDefault={signin} bind:this={form}>

                                    <div class="mb-3">
                                        <label for="username" class="form-label">Username</label>
                                        <input type="text" class="form-control" id="username" name="login" placeholder="Enter username, email or phone">
                                        {#if errors?.login}
                                            <strong class="text-danger ms-1 my-2">{errors.login[0]}</strong>
                                        {/if}
                                    </div>

                                    <div class="mb-3">
                                        <div class="float-end">
                                            <a href="/reset-password" class="text-muted">Forgot password ?</a>
                                        </div>
                                        <label class="form-label" for="password-input">Password</label>
                                        <div class="position-relative auth-pass-inputgroup mb-3">
                                            <Password name={"password"} placeholder="Enter Password"/>
                                        </div>
                                        {#if errors?.password}
                                        <strong class="text-danger ms-1 my-2">{errors.password[0]}</strong>
                                        {/if}
                                    </div>

                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" bind:checked={keep_me_signed_in} id="auth-remember-check">
                                        <label class="form-check-label" for="auth-remember-check">Keep me signed in</label>
                                    </div>
                                    {#if message != ""}
                                    <strong class="text-danger ms-1 my-2">{message}</strong>
                                    {/if}
<!-- Load More Buttons -->

                                    <div class="mt-4">
                                        <button class="btn btn-primary w-100 btn-load" type="submit" disabled={loading}>
                                            {#if loading}
                                            <span class="spinner-border " role="status"></span>
                                            {:else}
                                            Sign In

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
                        <!-- <p class="mb-0">Don't have an account ? <a href="/signup" class="fw-semibold text-primary text-decoration-underline"> Sign Up </a> </p> -->
                    </div>

                </div>
            </div>
  