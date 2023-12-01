<script>
	import CountCard from "$lib/components/cards/CountCard.svelte";
	import LastSubs from "./LastSubs.svelte";
    import ExpiringSubs from "./ExpiringSubs.svelte"
     import CanteensDash from "./CanteensDash.svelte"
	import DailyTotal from "./DailyTotal.svelte";
	import CanteenStatus from "./CanteenStatus.svelte";
    import AbsentStudents from "./AbsentStudents.svelte";
	import { onMount } from "svelte";
    import Swiper from 'swiper';
    import {InitFlatPickr,loadDefaultDate,getDatesFromRange} from "$lib/init/initFlatpickr.js"
    import { PathGetDashCount} from "$lib/api/paths"
    import { redirector } from "$lib/api/auth";
    import {counter} from "$lib/init/initApp.js"
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    
  
    export let data 


    let count

    let swiper
    let slider
    let selector
    let start_date = ""
    let end_date = ""


    function applyRange(){
        let dates = getDatesFromRange(selector.value)
        start_date = dates[0]
        end_date = dates[1]
        getCounts()
}


    onMount(() => {
        if(!JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.count")) return;

        InitFlatPickr()

        let currentDate = new Date();
        let pastDate = new Date();
        pastDate.setDate(currentDate.getDate() - 7);

        loadDefaultDate(selector,[pastDate,currentDate])

        applyRange()

        // selector._flatpickr.config.onClose.push(applyRange);



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
                slidesPerView: 3,
                },
                1200: {
                slidesPerView: 5,
                },
            },
        });
     

    })

    async function getCounts(){
        let res = await fetch(PathGetDashCount({start_date,end_date}),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)


        count = (await res.json()).data
        count = count 
    }
  



</script>

<div class="row mb-3 pb-1">
    <div class="col-12">
        <div class="d-flex align-items-lg-center flex-lg-row flex-column">
            <div class="flex-grow-1">
                <h4 class="fs-16 mb-1">Good Morning, <span class="text-primary"> {data.userResponse.data.user.username}</span></h4>
                <p class="text-muted mb-0">Here's what's happening with your store today.</p>
            </div>
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.count")}
            <div class="mt-3 mt-lg-0">
                <form action="javascript:void(0);">
                    <div class="row g-3 mb-0 align-items-center">
                        <div class="col-sm-auto">
                            <div class="input-group">
                                <input type="text" class="form-control border-0 dash-filter-picker shadow" data-provider="flatpickr" data-range-date="true" data-date-format="d M, Y" on:change={applyRange}  bind:this={selector} >
                                <div class="input-group-text bg-primary border-primary text-white">
                                    <i class="ri-calendar-2-line"></i>
                                </div>
                            </div>
                        </div>
                        <!--end col-->
                        <!--end col-->
                    </div>
                    <!--end row-->
                </form>
            </div>
            {/if}
        </div><!-- end card header -->
    </div>
    <!--end col-->
</div>
{#if JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.count")}
<div class="row swiper" bind:this={slider}>
    <div class="swiper-wrapper">
        {#if count}
        <CountCard title={"Subscribers"} icon={"ri-refund-2-line"} bind:count={count.subscribersCount} />
        <CountCard title={"Students"} icon={"ri-user-2-line"} bind:count={count.studentsCount}/>
        <CountCard title={"Parents"} icon={"bx-user-circle"} bind:count={count.fathersCount}/>
        <CountCard title={"Subscriptions Total"} symbol="SAR" icon={"bx-dollar-circle"} bind:count={count.subscriptionsTotal}/>
        <CountCard title={"Orders Total"} symbol="SAR" icon={"ri-survey-line"} bind:count={count.ordersTotal}/>
        {/if}
    </div>
</div> <!-- end row-->
{/if}
{#if JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.dailyTotal")}
<div class="row">
    <DailyTotal />
</div>
{/if}

<div class="row">
    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.lastSubscribedStudents")}
    <LastSubs/>
    {/if}

    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.canteensStatus")}
    <CanteenStatus />
    {/if}

</div>
<div class="row">
    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.absentStudents")}
    <AbsentStudents />
    {/if}
    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.expiringSoonStudents")}
    <ExpiringSubs /> 
    {/if}
</div>
<div class="row">
    <CanteensDash />
</div>
