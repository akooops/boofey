<script>
    import Pagination from "$lib/components/Pagination.svelte";    
    import SearchTable from "$lib/components/SearchTable.svelte";    
    import QueueStudentsTable from "$lib/tables/QueueStudentsTable.svelte";
    import AddQueueStudentModal from "$lib/modals/add/AddQueueStudentModal.svelte"
    import {InitFlatPickr} from "$lib/init/initFlatpickr.js"
    import { fade } from 'svelte/transition';

    import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"

    export let data
    $: queueStudentsList = data.queueStudentsResponse.data.queueStudents
    $: queue = data.queueStudentsResponse.data.queue
    $: queueStudentsPagination = data.queueStudentsResponse.pagination

let queueStudentsPage
onMount(() => {
    initToolTip(queueStudentsPage)
    InitFlatPickr()

})

</script>
<div class="row" in:fade={{delay:200,duration: 200 }} out:fade={{duration: 200 }} bind:this={queueStudentsPage}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">

                    <div class="d-flex gap-2 align-items-center flex-grow-1">
                        <div class="flex-shrink-0">
                            <img src={queue?.canteen?.school?.logo?.full_path} alt="" class="avatar-xs rounded-circle" />
                        </div>
                        <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">{queue?.canteen?.school?.name}</span> - <span class="text-primary">{queue?.canteen?.name}</span> - <span class="text-primary">Queue #{queue.id}</span> - Queue students Managment</h4>
                    </div><!-- end card header -->
                    <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.store")}

                        <button type="button" data-bs-toggle="modal" data-bs-target="#addQueueStudentModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Student</button>
                        <AddQueueStudentModal {queue}/>
                    {/if}
                    </div>
                </div>
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.index")}
                <div class="card-body">
    
                    <!-- <div class="live-preview"> -->
                        
                            <SearchTable type={"Student"}/>
                            <QueueStudentsTable {queueStudentsList}/>
                            <Pagination {...queueStudentsPagination} />
                            <!--end col-->
                        
                        <!--end row-->
                    <!-- </div> -->
                </div><!-- end card-body -->
                {/if}
        </div><!-- end card -->
    </div>
        <!-- end col -->
</div>
