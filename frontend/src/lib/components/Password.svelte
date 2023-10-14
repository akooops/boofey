<script>
    export let name 
    export let placeholder
    let passwordInput
    export let value

    function toggle(){
        passwordInput.type = passwordInput.type == "password" ?  "text" : "password"  
    }


</script>


<div class="position-relative auth-pass-inputgroup mb-3">
    <input type="password" class="form-control pe-5 password-input" {placeholder} {name} id="password-input" bind:this={passwordInput} bind:value={value}>
    <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" on:click={toggle} type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button>
</div>