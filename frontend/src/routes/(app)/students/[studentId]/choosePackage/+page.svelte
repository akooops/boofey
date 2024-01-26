<script>
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';

    import PricingCard from "$lib/components/cards/PricingCard.svelte"
    import ViewPackageMenuModal from "$lib/modals/view/parent/ViewPackageMenuModal.svelte"

    import {translation} from "$lib/translation.js"

    export let data 
    $: student = data.student
    $: packages = data.packages
    $: yearlyPackages = data.yearlyPackages

    let active = "monthly"

    setContext('packageStore', {
	    packageStore: writable({})
    });
</script>


    <div class="row justify-content-center mt-4">
        <div class="col-lg-5">
            <div class="text-center mb-4">
                <h4 class="fw-semibold fs-22">{translation.chooseThePlan[localStorage.getItem("language")]}</h4>
                <p class="text-muted mb-4 fs-15">{translation.simplePricingQuote[localStorage.getItem("language")]}</p>

            </div>
        </div>
        <!--end col-->
    </div>


    <div class="row">
        <div class="card">
            <div class="card-header align-items-center d-flex">

                <div class="d-flex gap-2 align-items-center flex-grow-1">
                <div class="flex-shrink-0">
                    <img src={student.image.full_path} alt="" class="avatar-xs rounded-circle" />
                </div>
                <h4 class="card-title mb-0 flex-grow-1">{student.fullname}</h4>
            </div> 
                
                <div class="flex-shrink-0">
                    <!-- <button type="button" &on:click={subscribe} class="btn btn-primary waves-effect waves-light"><i class="ri-money-dollar-circle-line align-bottom me-1"></i>Subscribe</button> -->
                    <ul class="nav nav-pills nav-custom-outline nav-primary" role="tablist">
                        <li class="nav-item waves-effect waves-light" role="presentation" on:click={() => active = "monthly"}>
                            <a class="nav-link active" data-bs-toggle="tab" href="#border-nav-home" role="tab" aria-selected="false" tabindex="-1">{translation.monthly[localStorage.getItem("language")]}</a>
                        </li>
                        <li class="nav-item waves-effect waves-light" role="presentation" on:click={() => active = "yearly"}>
                            <a class="nav-link" data-bs-toggle="tab" href="#border-nav-profile" role="tab" aria-selected="false" tabindex="-1">{translation.yearly[localStorage.getItem("language")]}</a>
                        </li>
                    </ul>
                
                </div>
            </div><!-- end card header -->
        </div><!-- end card -->
    </div>

    <ViewPackageMenuModal /> 

    <div class="row justify-content-center">
        <div class="col-xl-12">
            <div class="row justify-content-center">
                {#if active == "monthly"}
                    {#each packages as packageObj}
                        <PricingCard {packageObj} studentId={student.id}/>
                    {/each}
                {:else}
                    {#each yearlyPackages as packageObj}
                        <PricingCard {packageObj} studentId={student.id}/>
                    {/each}
                    
                {/if}
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!--end col-->
    </div>
