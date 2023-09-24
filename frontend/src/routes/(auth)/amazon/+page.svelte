<script>
	import { onMount } from "svelte";
    import {hash,TransactionData} from "$lib/api/amazon.js"
let sig = ""
onMount(() => {

sig = hash(TransactionData)

})

let form 
async function save(){
    

    let formData = new FormData(form)

    const params = new URLSearchParams();

    for (const [key, value] of formData) {
        params.append(key, value);
    }

    // console.log(`?${params.toString()}`)



    let res = await fetch(`https://sbcheckout.payfort.com/FortAPI/paymentPage?${params.toString()}`,{
        method:"POST",
        // body:formData,
        mode: 'no-cors'
    })

    console.log(res)

    


}





</script>

<form on:submit|preventDefault={save} bind:this={form} id=form1 name=form1>
    <input type="text" name="service_command" value="TOKENIZATION">
    <input type="text" name="language" value="en">
    <input type="text" name="merchant_identifier" value="ea198946">
    <input type="text" name="access_code" value="fVV2e5KWuLxKDRqIcBYW">
    <input type="text" name="signature" value="51719497d273c64144eb5e3700da2146b75cd8b7f89a66aa479f10eb98c1326a">
    <input type="text" name="return_url" value="https://boofey.app/">
    <input type="text" name="merchant_reference" value="BaZ9239-yK898">
    <input type="text" name="card_number" value="4005550000000001">
    <input type="text" name="expiry_date" value="2505">
    <input type="text" name="card_security_code" value="123">
    <input type="text" name="card_holder_name" value="Lokmane Younes">
    <input type="submit" value="Submit" id="submit2" name="">
</form>