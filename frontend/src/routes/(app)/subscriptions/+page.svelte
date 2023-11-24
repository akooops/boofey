<script>

    // import SubsTable from "$lib/tables/SubsTable.svelte";
    import AddSubModal from "$lib/modals/add/AddSubModal.svelte";
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
	import ViewSubModal from "$lib/modals/view/ViewSubModal.svelte";


	import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
	import ActiveSubs from "./ActiveSubs.svelte";
	import SubsTable from "./SubsTable.svelte";
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import {translation} from "$lib/translation.js"
	import GenSubInvoiceModal from "./GenSubInvoiceModal.svelte";

	import InactiveSubsTable from "./InactiveSubsTable.svelte";
import ActiveSubCard from "./activeSubCard.svelte";
import Swiper from 'swiper';




    export let data
    let swiper
    let slider

    setContext('subStore', {
        subStore: writable({})
    });

    $: subsList = data.subsResponse.data.subscriptions
    $: activeSubs = data.subsResponse.data.activeSubscriptions
    $: student = data.subsResponse.data.student
    $: packages = data.subsResponse.data.packages
    $: subsPagination = data.subsResponse.pagination
    $: inactiveSubsList = data.subsResponse.data.inactiveSubscriptions



    function subscribe(){
        goto(`/students/${student.id}/choosePackage`)
    }


    let subsPage
    onMount(() => {
        initToolTip(subsPage)

        swiper = new Swiper(slider, {
            slidesPerView: 1,
            loop: false,
            spaceBetween: 24,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            breakpoints: {
                640: {
                slidesPerView: 2,
                },
                768: {
                slidesPerView: 2.5,
                },
                1024: {
                slidesPerView: 2,
                },
                1200: {
                slidesPerView: 3,
                },
            },
        });
    })
    
</script>
<ViewSubModal />
<div class="row"  in:fade={{duration: 200 }} bind:this={subsPage}>
    <h4 class="card-title mb-3  flex-grow-1 col-lg-12">{translation.ativeSubs[localStorage.getItem("language")]}</h4>
    
    <div class="row swiper" bind:this={slider}>
        <div class="swiper-wrapper p-2">
       
        {#each activeSubs as activeSub}

            <ActiveSubCard {activeSub}/>
        {/each}
        </div>
    </div>
        

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
      

<!-- src="https://boofey.akoops.com/uploads/schools/_5607de8d-e2d4-47e3-a808-d54851903b65.jpeg"
<div class="d-flex gap-2 align-items-center">
    <div class="flex-shrink-0">
        <img src={school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
    </div>
    <div class="flex-grow-1">
        {school.name}
    </div>
</div> -->

    