<script>
    import { PathUpdateStudent } from "$lib/api/paths";
    import {onMount} from "svelte"
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import Accordion from "$lib/components/Accordion.svelte";
    import SchoolsTableCollapse from "$lib/modals/collapses/parent/SchoolsTableCollapse.svelte";
    import { getContext } from 'svelte';
    import { imageDataURLToFile } from "$lib/utils.js";
    import {translation} from "$lib/translation.js"


    let close
    let studentname
    let form 
    let selectClass
    let errors 
    let parentId = ""
    let schoolId = ""
    let resetSchool
    let editImage = false
    let {studentStore} = getContext("studentStore")

    let video 
    let canvas
    let square
    let squareWidth = 400
    let squareHeight = 400
    let ctx
    let cameraActive = false
    let captured = false
    let front = true 
    let imageDataURL
    let useCamera = true

    $: constraints = {
        video: { facingMode: front ? "user" : "environment" },
    };

    onMount(() => {
        window.addEventListener('resize', sizeSquare);
    });

    function sizeSquare(){
        if(video == null) return;
        let videoWidth = 400; 
        let videoHeight = 400; 
        let scale = 1; 

        videoWidth = video.offsetWidth;
        videoHeight = video.offsetHeight;

        if (videoWidth < 400 || videoHeight < 400) {
            scale = Math.min(videoWidth / 400, videoHeight / 400); 

            squareWidth = Math.min(videoWidth  * scale, videoHeight  * scale);
            squareHeight = Math.min(videoWidth  * scale, videoHeight  * scale);
        }else{
            squareWidth = 400;
            squareHeight = 400;
        }
    }

    async function save(){
        errors = {}
        let formData = new FormData(form)
        
        if(schoolId != ""){
            formData.set("school_id",schoolId)
        }

        formData.set("edit_image",editImage)

        if(editImage && useCamera) formData.set("file", imageDataURLToFile(imageDataURL))    
    
        formData.set("lang",localStorage.getItem("language"))

        let res = await fetch(PathUpdateStudent($studentStore.id,"parent"),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
        if(res.status == "success") {
            close.click()
            let text = `Edit ${$studentStore.fullname} ` 
            toast(text,"success")
            invalidate("students:refresh")
            reset()
        }else {
            errors = res.errors
        }

        

        
    }

    studentStore.subscribe(() => {
        parentId = $studentStore.father_id
        schoolId = $studentStore.school_id
    })

    function reset(){
        editImage = false
        form.reset()
        selectClass.selectedIndex = 0
        errors = {}
        resetSchool()
        parentId = schoolId = ""
        stopCam()
        captured = false;
        imageDataURL = null
    }

    function takeAnother(){
        captured = false;
        imageDataURL = null;

        openCam();
    }

    function capture(){
        ctx = canvas.getContext('2d');
        const sourceX = (video.videoWidth - 400) / 2;
        const sourceY = (video.videoHeight - 400) / 2;
        const sourceWidth = 400;
        const sourceHeight = 400;

        // Draw the cropped image onto the canvas
        ctx.drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, 400, 400);

        // Convert the canvas content to a data URL (e.g., toDataURL('image/jpeg'))
        imageDataURL = canvas.toDataURL('image/jpeg');
        stopCam()
        cameraActive = false;
        captured = true;
    }

    async function openCam(){
        try {
            cameraActive = true
            let stream = await navigator.mediaDevices.getUserMedia(constraints)
            video.srcObject = stream;
        }catch(error)  {
            console.error('Error accessing camera:', error);
        };
    }

    function stopCam(){
        if (video?.srcObject) {
            const stream = video.srcObject;
            const tracks = stream.getTracks();
            
            tracks.forEach(track => {
            track.stop(); // Stop each track in the stream
            });
            
            video.srcObject = null; // Clear the srcObject to stop displaying the video
        }
        cameraActive = false
    }

    function switchCamera(){
        front = !front;
        console.log(constraints)
        openCam()
    }

    function changeEditImage(){
        if(editImage && video){
            stopCam()
            imageDataURL = null
        }
    }

    function picType(){
        if(cameraActive){
            stopCam()
        }
        captured = false
    }



    </script>
    
    
    <div class="modal  fade" id="editStudentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered modal-lg" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">{translation.editStudent[localStorage.getItem("language")]}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                        <div class="row g-3">

                            <!-- Base Example -->
                                <SchoolsTableCollapse collapse={true} on:select={(e) => schoolId = e.detail.schoolId} selected={$studentStore.school} bind:resetSchool title={translation.studentSchool[localStorage.getItem("language")]}/>                     
                                {#if errors?.school_id}
                                <strong class="text-danger ms-1 my-2">{errors.school_id[0]}</strong>
                                {/if}

                        <form  on:submit|preventDefault={save} bind:this={form}>
                         <div class="row g-3">


                                <div class="col-xxl-6">
                                    <div>
                                        <label for="firstName" class="form-label">{translation.firstName[localStorage.getItem("language")]}</label>
                                        <input type="text" name="firstname" class="form-control" id="firstName" placeholder={translation.enterFirstName[localStorage.getItem("language")]} bind:value={$studentStore.firstname}>
                                        {#if errors?.firstname}
                                        <strong class="text-danger ms-1 my-2">{errors.firstname[0]}</strong>
                                        {/if}
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-xxl-6">
                                    <div>
                                        <label for="lastName" class="form-label">{translation.lastName[localStorage.getItem("language")]}</label>
                                        <input type="text" name="lastname" class="form-control" id="lastName" placeholder={translation.enterLastName[localStorage.getItem("language")]} bind:value={$studentStore.lastname}>
                                        {#if errors?.lastname}
                                        <strong class="text-danger ms-1 my-2">{errors.lastname[0]}</strong>
                                        {/if}
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <label for="class" class="form-label">{translation.class[localStorage.getItem("language")]}</label>
                                    <select class="form-select" name="class" id="class" aria-label="Default select example" bind:this={selectClass} bind:value={$studentStore.class}>
                                        <option disabled selected value> -- {translation.selectClass[localStorage.getItem("language")]} -- </option>

                                        <option value={0}>{translation.primarySchool[localStorage.getItem("language")]} - {translation.grade[localStorage.getItem("language")]} 1</option>
                                        <option value={1}>{translation.primarySchool[localStorage.getItem("language")]} - {translation.grade[localStorage.getItem("language")]} 2</option>
                                        <option value={2}>{translation.primarySchool[localStorage.getItem("language")]} - {translation.grade[localStorage.getItem("language")]} 3</option>
                                        <option value={3}>{translation.primarySchool[localStorage.getItem("language")]} - {translation.grade[localStorage.getItem("language")]} 4</option>
                                        <option value={4}>{translation.primarySchool[localStorage.getItem("language")]} - {translation.grade[localStorage.getItem("language")]} 5</option>
                                        <option value={5}>{translation.primarySchool[localStorage.getItem("language")]} - {translation.grade[localStorage.getItem("language")]} 6</option>
                                        <option value={6}>{translation.middleSchool[localStorage.getItem("language")]} - {translation.grade[localStorage.getItem("language")]} 1</option>
                                        <option value={7}>{translation.middleSchool[localStorage.getItem("language")]} - {translation.grade[localStorage.getItem("language")]} 2</option>
                                        <option value={8}>{translation.middleSchool[localStorage.getItem("language")]} - {translation.grade[localStorage.getItem("language")]} 3</option>
                                        <option value={9}>{translation.secondarySchool[localStorage.getItem("language")]} - {translation.grade[localStorage.getItem("language")]} 1</option>
                                        <option value={10}>{translation.secondarySchool[localStorage.getItem("language")]} - {translation.grade[localStorage.getItem("language")]} 2</option>
                                        <option value={11}>{translation.secondarySchool[localStorage.getItem("language")]} - {translation.grade[localStorage.getItem("language")]} 3</option>
                                    
                                    </select>
                                    {#if errors?.class}
                                    <strong class="text-danger ms-1 my-2">{errors.class[0]}</strong>
                                    {/if}
                                </div>
    

                           
                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" on:change={changeEditImage} bind:checked={editImage}>
                                        <label class="form-check-label" for="SwitchCheck1">{translation.editImage[localStorage.getItem("language")]}</label>
                                    </div><!-- Switches Color -->

                                </div>
                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" on:change={picType} bind:checked={useCamera} >
                                        <label class="form-check-label" for="SwitchCheck1">{translation.useCamera[localStorage.getItem("language")]}</label>
                                    </div><!-- Switches Color -->

                                </div>


                                

                                    {#if useCamera}
                                        <div class:none={!editImage}>
                                        {#if captured}
                                        <button type="button"  class="btn btn-success waves-effect waves-light" on:click={takeAnother}>{translation.takeAnother[localStorage.getItem("language")]}</button>
                                        {:else if cameraActive}
                                        <button type="button"  class="btn btn-danger waves-effect waves-light" on:click={stopCam}>{translation.stopCamera[localStorage.getItem("language")]}</button>
                                        {:else}
                                        <button type="button" class="btn btn-primary waves-effect waves-light" on:click={openCam}>{translation.launchCamera[localStorage.getItem("language")]}</button>              
                                        {/if}
                                    </div>
                                    {:else}
                                        <div class:none={!editImage}>
                                            <label for="formFile" class="form-label">{translation.studentImage[localStorage.getItem("language")]}</label>
                                            <input class="form-control" name="file" type="file" id="formFile">
                                            {#if errors?.file}
                                            <strong class="text-danger ms-1 my-2">{errors.file[0]}</strong>
                                            {/if}
                                        </div>
                                    {/if}
                                    
                                    {#if cameraActive && editImage}
                                        <div>
                                            <div id="video-container">
                                                <video id="video" autoplay bind:this={video} on:playing={sizeSquare}></video>
                                                {#if video?.srcObject}
                                                    <div class="square" bind:this={square} style="width: {squareWidth}px; height: {squareHeight}px"></div>

                                                    <div class="camera-btn-group">
                                                        <button type="button" class="btn btn-primary waves-effect waves-light" on:click={capture}>
                                                            <i class="ri-camera-lens-fill"></i>
                                                        </button>   

                                                        <button type="button" class="btn btn-success waves-effect waves-light mt-2" on:click={switchCamera}>
                                                            <i class="ri-camera-switch-line"></i>
                                                        </button>   
                                                    </div>

                                                            
                                                {/if}
                                            </div>
                                            <canvas id="canvas" width="400" height="400" bind:this={canvas}></canvas>
                                        </div>
                                    {/if}

                                    {#if imageDataURL && captured}
                                    <div class:none={!editImage}>
                                        <img class="rounded avatar-xl mb-3 object-fit-cover" alt="School logo" width="200" src={imageDataURL}>
                                    </div>
                                    {/if}
                                    <div class:none={!editImage}>
                                        {#if errors?.file}
                                        <strong class="text-danger ms-1 my-2">{errors.file[0]}</strong>
                                        {/if}
                                    </div>
                                {#if !editImage}
                                    <figure class="figure">
                                        <img  alt="school logo " width="200" src={$studentStore?.image?.full_path} class="figure-img rounded avatar-xl mb-3 object-fit-cover" >
                                        <figcaption class="figure-caption">{translation.currentStudentImage[localStorage.getItem("language")]}</figcaption>
                                    </figure>
                                    
                                {/if}
                                


                                <div class="hstack gap-2 justify-content-end">
                                    <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>{translation.close[localStorage.getItem("language")]}</button>
                                    {#if !$studentStore.subscribed}
                                    <button type="button" class="btn btn-danger waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#deleteStudentModal" data-bs-dismiss="modal">{translation.delete[localStorage.getItem("language")]}</button>
                                    {/if}
                                    <input type="submit" class="btn btn-primary waves-effect waves-light" value="{translation.save[localStorage.getItem("language")]}">
                                </div>
                                </div>
                            </form>
                        </div><!--end row-->
                </div>
            </div>
        </div>
    </div>

    <style>
        video {
           width: 100%;
           display: block;
        }
       canvas {
           display: none;
       }
        .square {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            outline: 4px solid #695eef;
        }

        .camera-btn-group{
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 15px;
            right: 20px;
        }
       .none {
        display: none;
       }
       </style>
       