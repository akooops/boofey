<script>
    import {translation} from "$lib/translation.js"
    import { getContext } from "svelte";


    let {subStore} = getContext("subStore")
    export let activeSub
    
    function setSub(){
        $subStore = JSON.parse(JSON.stringify(activeSub));
    }
    let state = "success"
    $: percentage = ((activeSub.balance * 100) / activeSub.days)

    $: {
        if( percentage > 66.66 ){
            state = "success"
        }else if (percentage < 33.33){
            state = "danger"
        }else {
            state = "warning"
        }
    }

</script>


<!-- <div class="col-xl-3 col-md-6 swiper-slide"> -->
    <!-- card -->
<div class="col-xl-3 col-md-6 swiper-slide">

    <div class="card card-animate" style="filter: drop-shadow( {localStorage.getItem("language") == "en" ? "-4px" : "4px"} 0px 0px var(--vz-{state}));" role="button" on:click={setSub}  data-bs-toggle="modal" data-bs-target="#viewSubModal">
        <div class="card-body">
            <div class="d-flex flex-column h-100">
                <div class="d-flex  align-items-center mb-3">
                    <div class="flex-shrink-0">
                        <img src={activeSub.student.image.full_path} alt="" class="avatar-sm rounded-circle" />
                    </div>
                    <div class="flex-grow-1 ms-2">
                        <h5 class="card-title mb-1">{activeSub.student.fullname}</h5>
                        <p class="text-muted mb-0">{translation.package[localStorage.getItem("language")]}: {#if localStorage.getItem("language") == "ar"}
                            {activeSub.package.school.name_ar} - {activeSub.package.name_ar}
                        {:else}
                            {activeSub.package.school.name} - {activeSub.package.name}
                        {/if}</p>
                    </div>
   
                </div>

                <div class="mt-auto">
                    <div class="d-flex mb-2">
                        <div class="flex-grow-1">
                            <div>{translation.days[localStorage.getItem("language")]}</div>
                        </div>
                        <div class="flex-shrink-0">
                            <div><span class="text-{state} counter-value fs-5" data-target={activeSub.balance}>{activeSub.balance}</span>/{activeSub.days}</div>
                        </div>
                    </div>
                    <div class="progress progress-sm animated-progress">
                        <div class="progress-bar bg-{state} bg-gradient" role="progressbar" style="width: {percentage}%"></div><!-- /.progress-bar -->
                    </div><!-- /.progress -->
                </div>
            </div>

        </div>

        <div class="card-footer bg-transparent border-top-dashed py-2">
            <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                    <span class="badge bg-{state}-subtle text-{state}">{activeSub.days - activeSub.balance} days subscribed</span>
                </div>
                <div class="flex-shrink-0">
                    <div class="text-muted">
                        <i class="ri-calendar-event-fill me-1 align-bottom"></i> {activeSub.started_at}
                    </div>
                </div>

            </div>

        </div>
    </div><!-- end card -->
</div>