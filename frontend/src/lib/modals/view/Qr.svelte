<script>
	import { onMount,getContext } from "svelte";
    import QRCodeStyling from "qr-code-styling";
    import { PathGetStudentQr } from "$lib/api/paths"
    import { redirector } from "$lib/api/auth";
    import printJS from 'print-js'
    import {translation} from "$lib/translation.js"
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"


    export let type 

    let {studentStore} = getContext("studentStore")

    let view
    let qrInstance
    let width = 200
    let height = 200
    let otpExpiresLater = false
    let expiresAt
    let form 
    let errors
    let loading = false 
    let qrAvailable = false

    function loadQr(data){
        qrInstance.update({
            width: 300,
            height: 300,
            type: "png",
            data
        })
        qrAvailable = true
    }


    onMount(() => {

        qrInstance = new QRCodeStyling({
            width,
            height,
            type: "png",
        });

        qrInstance.append(view);

    })

    function reset(){
        qrInstance.update({
            width,
            height,
            type: "png",
            data: ""
        })
        loadDefaultDate(expiresAt,Date.now())

        qrAvailable = false

    }

    studentStore.subscribe(async () => {
        if($studentStore?.id == null) return;
        // await otp()

    })

    async function downLoad(){
        await qrInstance.download({
            name:$studentStore.fullname,
            extension:"png"
        })

    }

    async function otp(){
        loading = true

        errors = {}
        let formData = new FormData(form)
        formData.set("otp_expires_later",otpExpiresLater)

        if(otpExpiresLater == false){
            formData.delete("otp_expires_at")
        }

        let res = await fetch(PathGetStudentQr($studentStore.id,type),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },            
            method:"POST",
            body:formData

        })
        redirector(res)
    
        let otpResponse = await res.json()
        if(otpResponse.status == "success"){
            loadQr(otpResponse.data.otp)
        }else {
            errors = otpResponse.errors
        }

        loading = false


    }


    async function print(){
        // printJS('qrImage', 'html')
        printJS({ printable: 'qrImage', type: 'html', header: `Boofey - ${$studentStore.fullname}`})
    }

</script>

<div class="modal  fade" id="ViewQrStudentModal" tabindex="-1" aria-labelledby="ViewQrStudentModal" aria-modal="true"  on:hidden.bs.modal={reset}>
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">{translation.studentQrCode[localStorage.getItem("language")]}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                {#if loading }
                    <div class="text-center">
                        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                    </div>
                {/if}
                <form on:submit|preventDefault={otp} bind:this={form} class:d-none={loading}>
                    <div class="row g-3 d-print-block">

                            <div bind:this={view} class="text-center" id="qrImage" class:d-none={qrAvailable == false}>
                            </div>
                            <div class="text-center hstack gap-2 justify-content-center" class:d-none={qrAvailable == false}>
                                
                                <button type="button" class="btn btn-primary waves-effect waves-light" on:click={downLoad}>{translation.download[localStorage.getItem("language")]}</button>
                                <button type="button" class="btn btn-primary waves-effect waves-light" on:click={print}>{translation.print[localStorage.getItem("language")]}</button>
                            </div>
                            
                            <div class="row ps-3 g-3">
                                <!-- Switches Color -->
                                <div class="form-check form-switch col" >
                                    <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={otpExpiresLater} >
                                    <label class="form-check-label" for="SwitchCheck1">Otp Expires Later</label>
                                </div><!-- Switches Color -->

                                {#if errors?.otp_expires_later}
                                    <strong class="text-danger ms-1 my-2">{errors.otp_expires_later[0]}</strong>
                                {/if}
                            </div>    

                            <div class:d-none={otpExpiresLater == false}>
                                <div>
                                    <label for="firstName" class="form-label">Otp Expires At</label>
                                    <input type="text" name="otp_expires_at" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" data-enable-time id="from" bind:this={expiresAt}>
                                    {#if errors?.otp_expires_at}
                                    <strong class="text-danger ms-1 my-2">{errors.otp_expires_at[0]}</strong>
                                    {/if}
                                </div>
                            </div>
                            <div class="hstack gap-2 justify-content-end">
                                <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" >{translation.close[localStorage.getItem("language")]}</button>
                                <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save">
                                
                            </div>



                    </div><!--end row-->
                </form>
            </div>
        </div>
    </div>
</div>