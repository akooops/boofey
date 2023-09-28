<script>
    import { PathUpdateStudent } from "$lib/api/paths";
    import {onMount} from "svelte"
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import Accordion from "$lib/components/Accordion.svelte";
    import SchoolsTableCollapse from "$lib/modals/collapses/parent/SchoolsTableCollapse.svelte";
    import YearsTableCollapse from "$lib/modals/collapses/parent/YearsTableCollapse.svelte";
    import { getContext } from 'svelte';
    import { imageDataURLToFile } from "$lib/utils.js";


    let close
    let studentname
    let form 
    let selectClass
    let errors 
    let onHold = false;
    let parentId = ""
    let schoolId = ""
    let yearId = ""
    let resetSchool
    let resetYear
    let editImage = false
    let {studentStore} = getContext("studentStore")

    let video 
    let canvas
    let ctx
    let cameraActive = false
    let front = true 
    let imageDataURL

    $: constraints = {
        video: { facingMode: front ? "user" : "environment" },
    };


    async function save(){
        errors = {}
        let formData = new FormData(form)
        
        if(schoolId != ""){
            formData.set("school_id",schoolId)
        }
        if(yearId != ""){
            formData.set("academic_year_id",yearId)
        }
        formData.set("edit_image",editImage)
        formData.set("file",imageDataURLToFile(imageDataURL))
    
        formData.set("onhold",onHold)

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
        yearId = $studentStore.academic_year_id

    })

    function reset(){
        editImage = false
        form.reset()
        selectClass.selectedIndex = 0
        errors = {}
        resetSchool()
        resetYear()
        onHold = false
        parentId = schoolId = yearId = ""
        stopCam()
        imageDataURL = null
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
        if (video.srcObject) {
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



    </script>
    
    
    <div class="modal  fade" id="editStudentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered modal-lg" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Student</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                        <div class="row g-3">

                            <!-- Base Example -->

                              

                                <Accordion id={"school"} title={"Student's School"}>               
                                    <SchoolsTableCollapse  on:select={(e) => schoolId = e.detail.schoolId} selected={$studentStore.school} bind:resetSchool />                     
                                </Accordion>
                                {#if errors?.school_id}
                                <strong class="text-danger ms-1 my-2">{errors.school_id[0]}</strong>
                                {/if}
                                <Accordion id={"year"} title={"Student's Academic Year"}>
                                    <YearsTableCollapse {schoolId} on:select={(e) => yearId = e.detail.yearId} selected={$studentStore.academic_year} bind:resetYear/>
                                </Accordion>
                                {#if errors?.academic_year_id}
                                <strong class="text-danger ms-1 my-2">{errors.academic_year_id[0]}</strong>
                                {/if}

                        <form  on:submit|preventDefault={save} bind:this={form}>
                         <div class="row g-3">


                                <div class="col-xxl-6">
                                    <div>
                                        <label for="firstName" class="form-label">First Name</label>
                                        <input type="text" name="firstname" class="form-control" id="firstName" placeholder="Enter Firstname" bind:value={$studentStore.firstname}>
                                        {#if errors?.firstname}
                                        <strong class="text-danger ms-1 my-2">{errors.firstname[0]}</strong>
                                        {/if}
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-xxl-6">
                                    <div>
                                        <label for="lastName" class="form-label">Last Name</label>
                                        <input type="text" name="lastname" class="form-control" id="lastName" placeholder="Enter Lastname" bind:value={$studentStore.lastname}>
                                        {#if errors?.lastname}
                                        <strong class="text-danger ms-1 my-2">{errors.lastname[0]}</strong>
                                        {/if}
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <label for="class" class="form-label">Class</label>
                                    <select class="form-select" name="class" id="class" aria-label="Default select example" bind:this={selectClass} bind:value={$studentStore.class}>
                                        <option disabled selected value> -- select a class -- </option>

                                        <option value={0}>ابتدائي</option>
                                        <option value={1}>متوسط</option>
                                        <option value={2}>ثانوي</option>
                                    
                                    </select>
                                    {#if errors?.class}
                                    <strong class="text-danger ms-1 my-2">{errors.class[0]}</strong>
                                    {/if}
                                </div>
    


                                <div class="col-lg-12">
                                    <label for="studentname" class="form-label" >NFC ID</label>
                                    <input type="text" name="nfc_id" class="form-control" id="nfc_id" placeholder="Enter Studentname name"  bind:value={$studentStore.nfc_id}>
                                    {#if errors?.nfc_id}
                                    <strong class="text-danger ms-1 my-2">{errors.nfc_id[0]}</strong>
                                    {/if}
                                </div>
                                <div class="col-lg-12">
                                    <label for="studentname" class="form-label" >Face ID</label>
                                    <input type="text" name="face_id" class="form-control" id="face_id" placeholder="Enter Studentname name"  bind:value={$studentStore.face_id}>
                                    {#if errors?.face_id}
                                    <strong class="text-danger ms-1 my-2">{errors.face_id[0]}</strong>
                                    {/if}
                                </div>
                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={$studentStore.onhold}>
                                        <label class="form-check-label" for="SwitchCheck1">On Hold</label>
                                    </div><!-- Switches Color -->

                                </div>
                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" on:change={changeEditImage} bind:checked={editImage}>
                                        <label class="form-check-label" for="SwitchCheck1">Edit Image</label>
                                    </div><!-- Switches Color -->

                                </div>



                                
                                    <div  class:none={!editImage}>
                                        {#if cameraActive}
                                        <button type="button"  class="btn btn-danger waves-effect waves-light" on:click={stopCam}>Stop Camera</button>
                                        {:else}
                                        <button type="button" class="btn btn-primary waves-effect waves-light" on:click={openCam}>Launch Camera</button>              
                                        {/if}
                                    </div>
                                    {#if cameraActive}
                                        <div class:none={!editImage}>
                                            <video id="video" autoplay bind:this={video}></video>
                                            {#if video?.srcObject}
                                            <div class="square"></div>
                                            {/if}
                                            <canvas id="canvas" width="400" height="400" bind:this={canvas}></canvas>
                                        </div>
                                        <div  class:none={!editImage} class="hstack gap-2 justify-content-end">
                                            <button type="button"  class="btn btn-info waves-effect waves-light" on:click={switchCamera}>Switch Camera</button>
                                        <button type="button" class="btn btn-primary waves-effect waves-light" on:click={capture}>Capture</button>              
                                        </div>
                                    {/if}
                                    {#if imageDataURL}
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
                                        <figcaption class="figure-caption">Current Student image</figcaption>
                                    </figure>
                                    
                                {/if}
                                


                                <div class="hstack gap-2 justify-content-end">
                                    <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>Close</button>
                                    <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save">
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
           width: 400px;
           height: 400px;
           transform: translate(-50%, -50%);
           border: 2px solid red; /* Add styling for the cropping square */
       }
       .none {
        display: none;
       }
       </style>
       