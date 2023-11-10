<script>
	import { onMount,getContext } from "svelte";
    import QRCodeStyling from "qr-code-styling";
    import { PathGetStudentQr } from "$lib/api/paths"
    import { redirector } from "$lib/api/auth";

    import {translation} from "$lib/translation.js"


    export let type 

    let {studentStore} = getContext("studentStore")

    let view
    let qrInstance
    let width = 200
    let height = 200

    function loadQr(data){
        console.log(data)
        qrInstance.update({
            width: 300,
            height: 300,
            type: "png",
            data
        })
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
    }

    studentStore.subscribe(async () => {
        if($studentStore?.id == null) return;
        let res = await fetch(PathGetStudentQr($studentStore.id,type),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },            
            method:"POST"
        })
        redirector(res)
    
        let otpResponse = await res.json()
        if(otpResponse.status == "success"){
            loadQr(otpResponse.data.otp)
        }


    })

    async function downLoad(){
        await qrInstance.download({
            name:$studentStore.fullname,
            extension:"png"
        })

    }

</script>

<div class="modal  fade" id="ViewQrStudentModal" tabindex="-1" aria-labelledby="ViewQrStudentModal" aria-modal="true"  on:hidden.bs.modal={reset} on:show.bs.modal={loadQr}>
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">{translation.studentQrCode[localStorage.getItem("language")]}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row g-3">

                            <div bind:this={view} class="text-center">
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn btn-primary waves-effect waves-light" on:click={downLoad}>{translation.download[localStorage.getItem("language")]}</button>
                            </div>
                            <div>
                                <!-- Warning Alert -->
                                <div class="alert alert-warning alert-border-left alert-dismissible fade show" role="alert">
                                    <i class="ri-alert-line me-3 align-middle"></i>{translation.qrExpireNote[localStorage.getItem("language")]} <strong>{translation.endOfDay[localStorage.getItem("language")]}</strong>.
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>

                            </div>
                            <div class="hstack gap-2 justify-content-end">
                                <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" >{translation.close[localStorage.getItem("language")]}</button>
                            </div>



                    </div><!--end row-->
                </form>
            </div>
        </div>
    </div>
</div>