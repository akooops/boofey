<script>
    import { PathAddQueueStudent } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import Accordion from "$lib/components/Accordion.svelte";
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import StudentsTableCollapse from "$lib/modals/collapses/StudentsTableCollapse.svelte"; 

    let close
    let form 
    let errors
let loading = false 
    let resetStudent
    let studentId = ""
    export let queue

    async function save(){
loading = true
        errors = {}
        let formData = new FormData(form)
        if(studentId){
            formData.set("student_id",studentId)
        }
        formData.set("simplified",true)

        let res = await fetch(PathAddQueueStudent(queue.id),{
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
            close.click()
            let text = `Added a new student to the  queue` 
            toast(text,"success")
            invalidate("queueStudents:refresh")
            reset()
        }else {
            errors = res.errors
        }

        

        
    }

    function reset(){
       
        form.reset()
        resetStudent()
        studentId = ""
        errors = {}
    }


    </script>
    
    
    <div class="modal  fade" id="addQueueStudentModal" tabindex="-1"  data-bs-focus="false" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Student</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" >
                        {#if loading }
                        <div class="text-center">
                            <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                        </div>
                        {/if}
    
                        <div class="row g-3" class:d-none={loading}>
                            <!-- Base Example -->
                                    <StudentsTableCollapse collapse={true} on:select={(e) => studentId = e.detail.studentId} title={"Students"} bind:resetStudent/>            
                                {#if errors?.student_id}
                                <strong class="text-danger ms-1 my-2">{errors.student_id[0]}</strong>
                                {/if}

                        <form  on:submit|preventDefault={save} bind:this={form}>
                         <div class="row g-3">

                     
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

