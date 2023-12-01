<script>

    // import SubsTable from "$lib/tables/SubsTable.svelte";
    import AddSubModal from "$lib/modals/add/AddSubModal.svelte";
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
	import ViewSubModal from "$lib/modals/view/ViewSubModal.svelte";


	import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
	import ActiveSub from "./ActiveSub.svelte";
	import SubsTable from "$lib/tables/parent/SubsTable.svelte";
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import {translation} from "$lib/translation.js"
	import GenSubInvoiceModal from "./GenSubInvoiceModal.svelte";

	import InactiveSubsTable from "./InactiveSubsTable.svelte";




    export let data

    setContext('subStore', {
        subStore: writable({})
    });

    $: subsList = data.subsResponse.data.subscriptions
    $: activeSub = data.subsResponse.data.activeSubscription
    $: student = data.subsResponse.data.student
    $: packages = data.subsResponse.data.packages
    $: subsPagination = data.subsResponse.pagination
    $: inactiveSubsList = data.subsResponse.data.inactiveSubscriptions



    function subscribe(){
        goto(`/students/${student.id}/choosePackage`)
    }


    let subsPage
    let params 
    onMount(() => {
        params = new URL(document.location).searchParams;
        
        initToolTip(subsPage)
    })
    
</script>
<div class="row"  in:fade={{duration: 200 }} bind:this={subsPage}>
    {#if params?.get("status") == "success"}
        <div class="row p-3">
            <!-- Secondary Alert -->

            <div class="alert alert-success alert-border-left alert-dismissible fade show" role="alert">
                <i class="ri-check-double-line me-3 align-middle"></i> <strong>Success</strong> - New payment method has been added
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

        </div>
    {:else if params?.get("status") != null}
    <div class="row p-3">
        <!-- Secondary Alert -->

        <div class="alert alert-danger alert-border-left alert-dismissible fade show" role="alert">
            <i class="ri-check-double-line me-3 align-middle"></i> <strong>Fail</strong> - {params?.get("msg")}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

    </div>
    {/if}
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex">

                <div class="d-flex gap-2 align-items-center flex-grow-1">
                <div class="flex-shrink-0">
                    <img src={student.image.full_path} alt="" class="avatar-xs rounded-circle" />
                </div>
                <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">{student.fullname}</span> - {translation.subsciptionManagement[localStorage.getItem("language")]}</h4>
            </div> 

               
                <div class="flex-shrink-0">
                    <button type="button" on:click={subscribe} class="btn btn-primary waves-effect waves-light"><i class="ri-money-dollar-circle-line align-bottom me-1"></i>{translation.subscribe[localStorage.getItem("language")]}</button>
                    <ViewSubModal />
                    <GenSubInvoiceModal />

                </div>
            </div><!-- end card header -->
        </div><!-- end card -->
        <ActiveSub {activeSub} type={"parent"}/>
    

        <div class="card">
            <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1">{translation.incativeSubs[localStorage.getItem("language")]}</h4>
            </div><!-- end card header -->
        
            <div class="card-body">
        
                <!-- <div class="live-preview"> -->
                    <div class="row">
                            <!-- Input with Icon -->
                        <InactiveSubsTable subsList={inactiveSubsList}/>
                        <!--end col-->
                    </div>
                    <!--end row-->
                <!-- </div> -->
            </div><!-- end card-body -->
        </div><!-- end card -->        
       

        <div class="card">
            <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1">{translation.allSubs[localStorage.getItem("language")]}</h4>
            </div><!-- end card header -->
        
            <div class="card-body">
        
                <!-- <div class="live-preview"> -->
                    <div class="row">
                            <!-- Input with Icon -->
                        <SearchTable type={translation.subscription[localStorage.getItem("language")]}/>
                        <SubsTable {subsList} />
                        <Pagination {...subsPagination} />
                        <!--end col-->
                    </div>
                    <!--end row-->
                <!-- </div> -->
            </div><!-- end card-body -->

        </div><!-- end card -->
       
    
    </div>
                 <!--  
             <DeleteSubModal /> -->
            <!--  
     end col -->
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

    