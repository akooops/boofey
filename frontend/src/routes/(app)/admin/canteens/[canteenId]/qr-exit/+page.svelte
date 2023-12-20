<script>
import QrScanner from 'qr-scanner';
import { onMount } from 'svelte';
import {PathExitQr} from "$lib/api/paths.js"
import { redirector } from "$lib/api/auth";
import { fade } from 'svelte/transition';
import { page } from '$app/stores';  
import {Html5QrcodeScanner} from "html5-qrcode";
import {Html5Qrcode} from "html5-qrcode";
import { beforeNavigate } from "$app/navigation";
	import QrOperation from './QrOperation.svelte';


let stream
let qrScanner
let noCamera = false
let cameraActive = false
let loading = false
let preferredCamera = "environment"
let status = "neutral"
let errors = {}
let camerasList = []
let camera
let boxSize = 250
let fps = 24
let config = { fps: 24, qrbox: { width: 250, height: 250 } };
let qrOutput = ""
let timeout = false
let operations = []
onMount(async () => {
    camerasList = await Html5Qrcode.getCameras()
    camera = camerasList[0] 
   
    config = localStorage.getItem("QrSettings") == null ? config : JSON.parse(localStorage.getItem("QrSettings"))

    fps = config.fps
    boxSize = config.qrbox.width

    qrScanner = new Html5Qrcode("stream")

    
})

async function startCam(){
    if(laserScan) return;
    noCamera = false
    try {
        // await qrScanner.start();
        await qrScanner.start(
            camera.id, 
            config,
            exitQueue
        );
        cameraActive = true
        // let list = await QrScanner.listCameras(true);
    }catch(e){
        noCamera = true
        cameraActive = false
        // navigator.mediaDevices.getUserMedia({ video: true })
    }
}

async function stopCam(){
    if(laserScan) return;
    if(cameraActive == false) return;
    await qrScanner.stop();
    cameraActive = false
}

async function exitQueue(result){
    if(timeout) return;
    errors = {}
    // stopCam()
    loading = true 
    timeout = true
    setTimeout(async () => {
        timeout = false
        status = "neutral";
        // await qrScanner.start()
    }, 1200); 


    let newIndex = operations.push({status:"loading"})
    operations = operations

    // try {
    //     result = result.split("=")[1]
    // }catch(e){
    //     loading = false
    //     errors.json = ["Qr code isn't in the correct format"]
    //     operations[newIndex - 1] = {status:"error",errors:{json:["Qr code isn't in the correct format"]}}
    //     return;
    // }
    let formData = new FormData()
    formData.set("student_id",result)


    let res = await fetch(PathExitQr($page.params.canteenId),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        },
        method:"POST",
        body:formData
    })
    redirector(res)

    res = await res.json()

    loading = false
    if(res.status == "success") {
        status = "success"
        operations[newIndex - 1] = {status:"success"}
    }else {
        errors = res.errors
        status = "error"
        operations[newIndex - 1] = {status:"error",errors:res.errors}
    }   



}

async function switchCamera(){
    preferredCamera = preferredCamera == "environment" ? "user" : "environment"
    qrScanner.setCamera(preferredCamera);
}

async function applySettings(){
    await stopCam()
    fps = fps == null ? 24 : fps
    boxSize = boxSize == null ? 250 : boxSize
    console.log(config)
    config.fps = fps
    config.qrbox = {
        width:boxSize,
        height:boxSize
    }



    localStorage.setItem("QrSettings",JSON.stringify(config))
    await startCam()
}


let laserScan = false

function changeType(){
    if(laserScan == false){
        stopCam()
    }
}


function listenInput(event) {
        if(laserScan == false) return;
        let key = event.key;
        if (key === '\n' || key === '\r' || key == "Enter") {
            // QR code scan is complete
            exitQueue(qrOutput)
            qrOutput = ""
        } else {
            // Collect scanned characters
            qrOutput += key;
        }
};
beforeNavigate( () => {
    document.removeEventListener('keydown', this.listenInput);
})

document.addEventListener('keydown',listenInput)



function destroyOperation(e){
    operations.splice(e.detail.index,1)
    operations = operations
}





</script>
{#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.exit")}
<div class="row"  in:fade={{duration: 200 }} >
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex flex-wrap">
                <h4 class="card-title mb-2 flex-grow-1">Queue QR exit</h4>
                
                <div class="form-check form-switch col-2 flex-shrink-0" >
                    <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" on:changed={changeType} bind:checked={laserScan}>
                    <label class="form-check-label" for="SwitchCheck1">External Scanner</label>
                </div><!-- Switches Color -->
                <div class="flex-shrink-0">
                    <!-- Switches Color -->
           

                    <!-- <button type="button"  class="btn btn-info waves-effect waves-light" on:click={switchCamera}>Switch Camera</button> -->
                    {#if laserScan == false}
                        <button type="button" data-bs-toggle="modal" data-bs-target="#QrSettings" class="btn btn-light btn-icon waves-effect me-2"><i class="  ri-settings-4-line fs-4"></i></button>
                        {#if cameraActive}
                        <button type="button" class="btn btn-danger waves-effect waves-light" on:click={stopCam}>Stop Qr Scanner</button>
                        {:else}
                        <button type="button" class="btn btn-primary waves-effect waves-light" on:click={startCam}>Launch Qr Scanner</button>
                        {/if}
                    {/if}
                </div>
            </div><!-- end card header -->

            {#if laserScan}
                <input type="text" name="firstname" class="form-control" id="firstName" bind:value={qrOutput}>
            {/if}

            {#if noCamera} <!-- Object.keys(errors).length > 0 -->
            <div class="card-body">
                <!-- Danger Alert -->
                {#if noCamera}
                <div class="alert alert-danger alert-border-left alert-dismissible fade show" role="alert">
                    <i class="ri-error-warning-line me-3 align-middle"></i> <strong>No Camera Found</strong> - make sure to give the browser the permission to use the camera
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                {/if}
                <!-- {#if errors?.json}
                <div class="alert alert-danger alert-border-left alert-dismissible fade show" role="alert">
                    <i class="ri-error-warning-line me-3 align-middle"></i> {errors.json[0]}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                {/if}
                {#if errors?.student_id}
                <div class="alert alert-danger alert-border-left alert-dismissible fade show" role="alert">
                    <i class="ri-error-warning-line me-3 align-middle"></i> {errors.student_id[0]}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                {/if}
                {#if errors?.queue_student_id}
                <div class="alert alert-danger alert-border-left alert-dismissible fade show" role="alert">
                    <i class="ri-error-warning-line me-3 align-middle"></i> {errors.queue_student_id[0]}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                {/if}
                {#if errors?.queue_id}
                <div class="alert alert-danger alert-border-left alert-dismissible fade show" role="alert">
                    <i class="ri-error-warning-line me-3 align-middle"></i> {errors.queue_id[0]}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                {/if} -->
            </div>
            {/if}
            
        </div><!-- end card -->
    </div>
    <!-- <span class="VideoContainer"> -->
        <!-- {#if loading}
        <div class="row align-items-center justify-content-center">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        {:else if Object.keys(errors).length > 0 && status != "neutral"}
            {#if status == "error"}
            <div class="row  text-center">
                <i class="ri-error-warning-line text-danger fs-1 align-middle"></i>
            </div>
            {/if}
        {:else if status == "success"}
            <div class="row  text-center">
                <i class="ri-check-double-line text-success fs-1 align-middle"></i>
            </div>
        {/if} -->
        <div class="row mt-4">
            {#each operations as operation,index (operation)}
                <QrOperation {index} {operation} on:destroy={destroyOperation}/>
            {/each}
        </div>
        <div id="stream">

        </div>
        <!-- <video  bind:this={stream}></video> -->
        <!-- </span> -->
     

</div>

{/if}



<div class="modal  fade" id="QrSettings" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" on:hidden.bs.modal={applySettings}>
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">Qr Settings</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" >
          

                    <div class="row g-3">

                            <div>
                                <label for="name" class="form-label">Box Size</label>
                                <input type="number" class="form-control" name="name" id="firstName" bind:value={boxSize}>
                                
                            </div>
                            <div>
                                <label for="name" class="form-label">Fps</label>
                                <input type="number" class="form-control" name="name" id="firstName" bind:value={fps}>
                            </div>
                            <label for="class" class="form-label">Camera</label>
                            <select class="form-select" name="class" id="class" aria-label="Default select example" bind:value={camera}>
                                {#each camerasList as camera}
                                    <option value={camera}>{camera.label}</option>
                                {/each}
                            </select>
                            <div class="hstack gap-2 justify-content-end">
                                <input type="submit" class="btn btn-primary waves-effect waves-light" data-bs-dismiss="modal" value="Apply">
                            </div>
                                
                    </div><!--end row-->
            </div>
        </div>
    </div>
</div>




