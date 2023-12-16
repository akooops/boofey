<script>
    import { getContext } from "svelte"
    import {translation} from "$lib/translation.js"
    import { goto } from '$app/navigation';

    export let student

    let {studentStore} = getContext("studentStore")
    
    function setStudent(){
        $studentStore = JSON.parse(JSON.stringify(student));
    }

    let subsToolTip
    let viewBtn
    async function openSubs(){
        let toolTipInstance = bootstrap.Tooltip.getOrCreateInstance(subsToolTip)        
        // goto(`/students/2/subscriptions`)
        toolTipInstance.hide()
        // goto(`/students/${student.id}/subscriptions`)
        goto(`/students/${student.id}/choosePackage`)
    }

    function view(){
        viewBtn.click()
    }

</script>


<div class="col-xxl-3 col-xl-4  col-lg-5  col-sm-6   col-xs-12">
    <div class="card card-animate p-3 py-2"   role="button" on:click={view}>
        <div class="row g-0">
                <div class="card-body text-center">
                    <div class="avatar-md mb-3 mx-auto">
                        <img src={student.image.full_path} alt="" id="candidate-img" class="avatar-md rounded-circle">
                    </div>

                    <h5 id="candidate-name" class="mb-1 text-truncate">{student.fullname}</h5>
                    {#if student.subscribed}
                    <span class="badge bg-success-subtle text-success">{translation.subscribed[localStorage.getItem("language")]}</span>
                    {:else}
                    <span class="badge bg-danger-subtle text-danger">{translation.notSubscribed[localStorage.getItem("language")]}</span>
                    {/if}

                    <div class="d-flex gap-2  mt-4 flex-wrap">
                        {#if student.face_id == null}
                        <span  data-bs-toggle="modal" class="col-12" data-bs-target="#editStudentModal" on:click|stopPropagation={setStudent} >
                            <button type="button" class="btn  col-12 text-start btn-soft-success btn-label  waves-effect waves-light">
                                <i class="ri-edit-2-line label-icon align-middle fs-16 me-2"></i> {translation.edit[localStorage.getItem("language")]}
                            </button>
                        </span>
                        {/if}

                        <button type="button" on:click|stopPropagation={openSubs} bind:this={subsToolTip} class="col-12 btn text-start btn-soft-secondary btn-label waves-effect waves-light" >
                            <i class="ri-money-dollar-circle-line label-icon align-middle fs-16 me-2"></i> {translation.subscribe[localStorage.getItem("language")]}
                        </button>
                        {#if student.qrEnabled && student.subscribed}
                        <span  data-bs-toggle="modal" class="col-12" data-bs-target="#ViewQrStudentModal" on:click|stopPropagation={setStudent} >
                            <button type="button"  class="col-12 btn text-start btn-soft-danger btn-label waves-effect waves-light">
                                <i class="ri-qr-code-line label-icon align-middle fs-16 me-2"></i> {translation.qrCode[localStorage.getItem("language")]}
                            </button>
                        </span>
                        {/if}
                        <button type="button" class="d-none" on:click={setStudent} data-bs-toggle="modal" data-bs-target="#viewStudentModal" bind:this={viewBtn}></button>
                        
                    </div>
                </div>
        </div>
    </div>
    <!-- end card -->
</div>