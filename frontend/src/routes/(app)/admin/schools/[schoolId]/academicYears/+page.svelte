<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    import YearsTable from "$lib/tables/YearsTable.svelte";
    import AddYearModal from "$lib/modals/add/AddYearModal.svelte";
    import {InitFlatPickr} from "$lib/init/initFlatpickr.js"
	import { onMount } from "svelte";
import { fade } from 'svelte/transition';
    import {initToolTip} from "$lib/init/initToolTip.js"
    export let data
    $: yearsList = data.academicYearsResponse.data.academicYears
    $: school = data.academicYearsResponse.data.school  
    $: yearsPagination = data.academicYearsResponse.pagination

    let yearsPage
    onMount(() => {
        initToolTip(yearsPage)
        InitFlatPickr()

    })
    
</script>
<div class="row" in:fade={{delay:200,duration: 200 }} out:fade={{duration: 200 }} bind:this={yearsPage}>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex">

                <div class="d-flex gap-2 align-items-center flex-grow-1">
                    <div class="flex-shrink-0">
                        <img src={school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                    </div>
                    <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">{school.name}'s</span> Academic Years Management</h4>
                </div> 

               
                <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("academicYears.store")}
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addYearModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Academic Year</button>
                    <AddYearModal schoolId={school.id}/>
                    {/if}
                </div>
            </div><!-- end card header -->

            <div class="card-body">

                <!-- <div class="live-preview"> -->
                    <div class="row">
                            <!-- Input with Icon -->
                        <SearchTable type={"Year"}/>
                        <YearsTable {yearsList}/>
                        <Pagination {...yearsPagination} />
                        <!--end col-->
                    </div>
                    <!--end row-->
                <!-- </div> -->
            </div><!-- end card-body -->
        </div><!-- end card -->
    </div>
    <!-- end col -->
</div>

<!-- src="https://boofey.akoops.com/uploads/schools/_5607de8d-e2d4-47e3-a808-d54851903b65.jpeg"
<div class="d-flex gap-2 align-items-center">
    <div class="flex-shrink-0">
        <img src={school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
    </div>
    <div class="flex-grow-1">
        {school.name}
    </div>
</div> -->

    