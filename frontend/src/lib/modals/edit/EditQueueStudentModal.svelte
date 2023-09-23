<script>
    import { PathUpdateQueueStudent } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import Accordion from "$lib/components/Accordion.svelte";
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import StudentsTableCollapse from "../collapses/StudentsTableCollapse.svelte"; 
    import {getContext} from "svelte"

    let close
    let form 
    let errors 
    let startedAt
    let exitedAt
    let exited = true
    let resetStudent
    let studentId = ""
    let student

    let {queueStudentStore} = getContext("queueStudentStore")

    export let queue

    async function save(){
        errors = {}
        let formData = new FormData(form)
        formData.set("exited",exited)
        if(studentId){
            formData.set("student_id",studentId)
        }

        let res = await fetch(PathUpdateQueueStudent($queueStudentStore.id),{
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
            let text = `Successfuly Edited` 
            toast(text,"success")
            invalidate("queueStudents:refresh")
            reset()
        }else {
            errors = res.errors
        }

        

        
    }

    queueStudentStore.subscribe(() => {
        if(Object.keys($queueStudentStore).length == 0 || startedAt == undefined) return;
        loadDefaultDate(startedAt,$queueStudentStore.started_at)        
        if($queueStudentStore.exited_at){
            console.log(exited,exitedAt)
            loadDefaultDate(exitedAt,$queueStudentStore.exited_at)
        }else {
            exited = false
        }
        studentId = $queueStudentStore?.student?.id
        
    })
    
    
    function reset(){
        loadDefaultDate(startedAt,Date.now())
        if(exitedAt){
            loadDefaultDate(exitedAt,Date.now())
        }
        form.reset()
        resetStudent()
        exited = true
        studentId = ""
        errors = {}
    }


    </script>
    
    
    <div class="modal  fade" id="editQueueStudentModal" tabindex="-1"  data-bs-focus="false" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Student</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                        <div class="row g-3">
                            <!-- Base Example -->
                                <Accordion id={"parent"} title={"Student"}>
                                    <StudentsTableCollapse on:select={(e) => studentId = e.detail.studentId} selected={$queueStudentStore?.student} bind:resetStudent/>            
                                </Accordion>
                                {#if errors?.student_id}
                                <strong class="text-danger ms-1 my-2">{errors.student_id[0]}</strong>
                                {/if}

                        <form  on:submit|preventDefault={save} bind:this={form}>
                         <div class="row g-3">

                                <div>
                                    <div>
                                        <label for="firstName" class="form-label">Started At</label>
                                        <input type="text" name="started_at" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" data-enable-time id="from" bind:this={startedAt}>
                                        {#if errors?.started_at}
                                        <strong class="text-danger ms-1 my-2">{errors.started_at[0]}</strong>
                                        {/if}
                                    </div>
                                </div>

                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={exited}>
                                        <label class="form-check-label" for="SwitchCheck1">exited</label>
                                    </div><!-- Switches Color -->

                                </div>
                                
                               <!-- {#if exited} -->
                               <div class:d-none={!exited}>
                                    <div>
                                        <label for="firstName" class="form-label">Exited At</label>
                                        <input type="text" name="exited_at" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" data-enable-time id="from" bind:this={exitedAt}>
                                        {#if errors?.exited_at}
                                        <strong class="text-danger ms-1 my-2">{errors.exited_at[0]}</strong>
                                        {/if}
                                    </div>
                                </div>
                                <!-- {/if} -->

                        


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

