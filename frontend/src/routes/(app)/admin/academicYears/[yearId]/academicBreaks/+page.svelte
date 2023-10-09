<script>
import Calendar from '$lib/components/Calendar.svelte';
import { invalidate } from '$app/navigation';
import { onMount, setContext,getContext } from 'svelte';
import {InitFlatPickr} from "$lib/init/initFlatpickr.js"
import { writable } from 'svelte/store';
import { fade } from 'svelte/transition';

import AddBreakModal from '$lib/modals/add/AddBreakModal.svelte';
	import ViewBreakModal from '$lib/modals/view/ViewBreakModal.svelte';
	import DeleteBreakModal from '$lib/modals/delete/DeleteBreakModal.svelte';
    import EditBreakModal from '$lib/modals/edit/EditBreakModal.svelte';

// import FullCalendar from 'svelte-fullcalendar';

export let data

$: breaksList = data.breaksResponse.data.academicBreaks
console.log(breaksList)
$: year = data.breaksResponse.data.academicYear
$: school = year.school

const breaksListStore = writable(breaksList)
$: breaksListStore.set(breaksList)
setContext('breaksListStore', breaksListStore);

const breakStore = writable({})
setContext('breakStore', breakStore);


    
let currentBadge = "badge bg-success-subtle text-success"
let notCurrentBadge = "badge bg-danger-subtle text-danger "


onMount(() => {
    InitFlatPickr()

})

</script>


<div class="row" in:fade={{delay:200,duration: 200 }} out:fade={{duration: 200 }}>
    <div class="col-12">
        <div class="row">
            <div class="col-xl-3">
                <div class="card card-h-100">
                    <div class="card-body">
                        
                        <div class="card-body text-center">
                            <div class="avatar-md mb-3 mx-auto">
                                <img src={school.logo.full_path} alt="" i class="img-thumbnail rounded-circle shadow-none">
                            </div>
                            
                            <h4  class="mb-3">{school.name}</h4>

                            <p class="text-muted mb-1 fs-6">{year.from} &gt {year.to}</p>
                            
                                <div class="d-flex justify-content-center">
                                    <div class="me-2">
                                        <span class="{year.current ? currentBadge : notCurrentBadge}">{year.current ? "current" : "not current"}</span>
                                    </div>
                                    <p class="text-muted mb-0">{year.name}</p>
                                </div>

                            </div>
                        {#if JSON.parse(sessionStorage.getItem("permissions")).includes("academicBreaks.store")}
                        
                        <button  class="btn btn-primary w-100" id="btn-new-event"  data-bs-toggle="modal" data-bs-target="#addBreakModal"><i class="mdi mdi-plus"></i> New Academic Break</button>
                        <AddBreakModal {year} />
                        {/if}
                        <ViewBreakModal />
                        <DeleteBreakModal />
                        <EditBreakModal {year} />

                            
                    </div>
                </div>


                <div class="card">
                    <div class="card-body bg-info-subtle">
                        <div class="d-flex">
                            <div class="flex-shrink-0">
                                <i data-feather="calendar" class="text-info icon-dual-info"></i>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <h6 class="fs-15">Keep in mind!</h6>
                                <p class="text-muted mb-0">Saturday and friday are considered as breaksby default</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--end card-->
            </div> <!-- end col-->

            <div class="col-xl-9">
                <div class="card card-h-100">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("academicBreaks.index")}
                    <div class="card-body">
                        
                        <!-- <div id="calendar"></div> -->
                        <Calendar {year}/>

                    </div>
                    {/if}
                </div>
            </div><!-- end col -->
        </div>
        <!--end row-->
    </div>
</div> <!-- end row-->
