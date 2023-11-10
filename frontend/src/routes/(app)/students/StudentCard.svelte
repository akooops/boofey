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
        goto(`/students/${student.id}/subscriptions`)
    }

    function view(){
        viewBtn.click()
    }

</script>


<div class="col-3">
    <div class="card card-animate p-3 py-2"   role="button" on:click={view}>
        <div class="row g-0">
                <div class="card-body text-center">
                    <div class="avatar-md mb-3 mx-auto">
                        <img src={student.image.full_path} alt="" id="candidate-img" class="avatar-md rounded-circle">
                    </div>

                    <h5 id="candidate-name" class="mb-1">{student.fullname}</h5>
                    {#if student.subscribed}
                    <span class="badge bg-success-subtle text-success">{translation.subscribed[localStorage.getItem("language")]}</span>
                    {:else}
                    <span class="badge bg-danger-subtle text-danger">{translation.notSubscribed[localStorage.getItem("language")]}</span>
                    {/if}

                    <div class="d-flex gap-2 justify-content-center mt-4">
                        <!-- Soft Buttons -->
                        <span  data-bs-toggle="modal" data-bs-target="#editStudentModal" on:click|stopPropagation={setStudent} >
                            <button type="button" class="btn btn-soft-secondary btn-icon waves-effect waves-light" data-bs-toggle="tooltip" data-bs-original-title="{translation.edit[localStorage.getItem("language")]}">
                                <i class="ri-edit-2-line"></i>
                            </button>
                        </span>

                        <button type="button" on:click|stopPropagation={openSubs} bind:this={subsToolTip} class="btn btn-soft-secondary btn-icon waves-effect waves-light" data-bs-toggle="tooltip" data-bs-original-title="{translation.subscription[localStorage.getItem("language")]}">
                            <i class="ri-money-dollar-circle-line"></i>
                        </button>
                        
                        <span  data-bs-toggle="modal" data-bs-target="#ViewQrStudentModal" on:click|stopPropagation={setStudent} >
                            <button type="button"  class="btn btn-soft-secondary btn-icon waves-effect waves-light" data-bs-toggle="tooltip" data-bs-original-title="{translation.qrCode[localStorage.getItem("language")]}">
                                <i class="ri-qr-code-line"></i>
                            </button>
                        </span>
                        <button type="button" class="d-none" on:click={setStudent} data-bs-toggle="modal" data-bs-target="#viewStudentModal" bind:this={viewBtn}></button>
                        
                    
                    </div>
                </div>
        </div>
    </div>
    <!-- end card -->
</div>