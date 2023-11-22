<script>
    import { PathAddStudent } from "$lib/api/paths";
    import {onMount} from "svelte"
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import Accordion from "$lib/components/Accordion.svelte";
    import ParentsTableCollapse from "../collapses/ParentsTableCollapse.svelte";
import SchoolsTableCollapse from "../collapses/SchoolsTableCollapse.svelte";
import YearsTableCollapse from "../collapses/YearsTableCollapse.svelte";

    let close
    let studentname
    let form 
    let selectClass
    let errors 
    let onHold = false;
    let parentId = ""
    let schoolId = ""
    let yearId = ""
    let resetParent
    let resetSchool
    let resetYear



    async function save(){
        errors = {}
        let formData = new FormData(form)
        console.log(parentId)
        if(parentId != ""){
            formData.set("father_id",parentId)
        }
        if(schoolId != ""){
            formData.set("school_id",schoolId)
        }
        if(yearId != ""){
            formData.set("academic_year_id",yearId)
        }
    
    
        formData.set("onhold",onHold)
        
        let res = await fetch(PathAddStudent(),{
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
            let text = `Added ${studentname} as a new student` 
            toast(text,"success")
            invalidate("students:refresh")
            reset()
        }else {
            errors = res.errors
        }

        

        
    }

    function reset(){
        form.reset()
        selectClass.selectedIndex = 0
        errors = {}
        resetParent()
        resetSchool()
        resetYear()
        onHold = false
        parentId = schoolId = yearId = ""

    }


    </script>
    
    
    <div class="modal  fade" id="addStudentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered modal-lg" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Student</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                        <div class="row g-3">
                            <!-- Base Example -->

                                <ParentsTableCollapse collapse={true} on:select={(e) => parentId = e.detail.parentId} bind:resetParent title={"Student's Parent"}/>            
                                {#if errors?.father_id}
                                <strong class="text-danger ms-1 my-2">{errors.father_id[0]}</strong>
                                {/if}
                                               
                                    <SchoolsTableCollapse collapse={true} on:select={(e) => schoolId = e.detail.schoolId} bind:resetSchool title={"Student's School"}/>                     
                                {#if errors?.school_id}
                                <strong class="text-danger ms-1 my-2">{errors.school_id[0]}</strong>
                                {/if}
                                
                                <YearsTableCollapse collapse={true} {schoolId} on:select={(e) => yearId = e.detail.yearId} bind:resetYear  title={"Student's Academic Year"}/>
                                {#if errors?.academic_year_id}
                                <strong class="text-danger ms-1 my-2">{errors.academic_year_id[0]}</strong>
                                {/if}

                        <form  on:submit|preventDefault={save} bind:this={form}>
                         <div class="row g-3">


                                <div class="col-xxl-6">
                                    <div>
                                        <label for="firstName" class="form-label">First Name</label>
                                        <input type="text" name="firstname" class="form-control" id="firstName" placeholder="Enter Firstname">
                                        {#if errors?.firstname}
                                        <strong class="text-danger ms-1 my-2">{errors.firstname[0]}</strong>
                                        {/if}
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-xxl-6">
                                    <div>
                                        <label for="lastName" class="form-label">Last Name</label>
                                        <input type="text" name="lastname" class="form-control" id="lastName" placeholder="Enter Lastname">
                                        {#if errors?.lastname}
                                        <strong class="text-danger ms-1 my-2">{errors.lastname[0]}</strong>
                                        {/if}
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <label for="class" class="form-label">Class</label>
                                    <select class="form-select" name="class" id="class" aria-label="Default select example" bind:this={selectClass}>
                                        <option disabled selected value> -- select a class -- </option>

                                        <option value={0}>Primary School - Grade 1</option>
                                        <option value={1}>Primary School - Grade 2</option>
                                        <option value={2}>Primary School - Grade 3</option>
                                        <option value={3}>Primary School - Grade 4</option>
                                        <option value={4}>Primary School - Grade 5</option>
                                        <option value={5}>Primary School - Grade 6</option>
                                        <option value={6}>Middle School - Grade 1</option>
                                        <option value={7}>Middle School - Grade 2</option>
                                        <option value={8}>Middle School - Grade 3</option>
                                        <option value={9}>Secondary School - Grade 1</option>
                                        <option value={10}>Secondary School - Grade 2</option>
                                        <option value={11}>Secondary School - Grade 3</option>
                                    
                                    </select>
                                    {#if errors?.class}
                                    <strong class="text-danger ms-1 my-2">{errors.class[0]}</strong>
                                    {/if}
                                </div>
    


                                <div class="col-lg-12">
                                    <label for="studentname" class="form-label" >NFC ID</label>
                                    <input type="text" name="nfc_id" class="form-control" id="nfc_id" placeholder="Enter Studentname name"  >
                                    {#if errors?.nfc_id}
                                    <strong class="text-danger ms-1 my-2">{errors.nfc_id[0]}</strong>
                                    {/if}
                                </div>
                                <div class="col-lg-12">
                                    <label for="studentname" class="form-label" >Face ID</label>
                                    <input type="text" name="face_id" class="form-control" id="face_id" placeholder="Enter Studentname name"  >
                                    {#if errors?.face_id}
                                    <strong class="text-danger ms-1 my-2">{errors.face_id[0]}</strong>
                                    {/if}
                                </div>
                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={onHold}>
                                        <label class="form-check-label" for="SwitchCheck1">On Hold</label>
                                    </div><!-- Switches Color -->

                                </div>

                                <div>
                                    <label for="formFile" class="form-label">Student  Image</label>
                                    <input class="form-control" name="file" type="file" id="formFile">
                                    {#if errors?.file}
                                    <strong class="text-danger ms-1 my-2">{errors.file[0]}</strong>
                                    {/if}
                                </div>


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

