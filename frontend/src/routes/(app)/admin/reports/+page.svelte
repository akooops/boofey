<script>
    import { goto } from '$app/navigation';
    import {translation} from "$lib/translation.js"
    
    import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { fade } from 'svelte/transition';
    export let data

    
    // $: paymentMethodsList = data.paymentMethodsResponse.data  
    // $: paymentMethodsPagination = data.paymentMethodsResponse.pagination
    onMount(() => {
    })

    


    </script>
    <div class="row"  in:fade={{duration: 200 }}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">Reports</h4>
                    <div class="flex-shrink-0">
                        <!-- <AddPaymentMethodModal /> -->
                    </div>
                </div><!-- end card header -->
            </div><!-- end card -->

            
        </div>
        {#if JSON.parse(sessionStorage.getItem("permissions")).includes("reports.index")}
            <div class="col-xxl-3 col-xl-4  col-lg-5  col-sm-6   col-xs-12">
                <div class="card p-3 py-2" >
                    <div class="row g-0">
                            <div class="card-body text-center">
                                <div class="avatar-md mb-3 mx-auto">
                                    <span class="avatar-title bg-primary-subtle rounded fs-1">
                                        <i class="ri-file-list-3-line text-primary"></i>
                                    </span>
                                </div>
            
                                <h5 id="candidate-name" class="mb-1 text-truncate">Daily Preparation</h5>
                                <p class="text-muted">check subscribed students in order to plan today's meals</p>    
            
                                <div class="d-flex gap-2  mt-4 flex-wrap justify-content-center">
                                    
                                    <a role="button" href="reports/todaySubscribers"  class=" btn text-center btn-soft-info waves-effect waves-light">
                                        Check Report
                                    </a>
                                    
                                </div>
                            </div>
                    </div>
                </div>
                <!-- end card -->
            </div>
        {/if}
    </div>
    
    