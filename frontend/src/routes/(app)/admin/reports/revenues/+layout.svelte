<script>
    import { goto } from '$app/navigation';
    import {translation} from "$lib/translation.js"
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';

    import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { fade } from 'svelte/transition';
    import { page } from '$app/stores';
    import { bill,formatTimestamp } from "$lib/utils.js";
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import {InitFlatPickr} from "$lib/init/initFlatpickr.js"
    
    export let data

    let startDateInput
    let endDateInput
   
    let currentFilter = writable({})

    onMount(() => {
        InitFlatPickr()
        let nowDate = Date.now()
        loadDefaultDate(startDateInput,nowDate)
        loadDefaultDate(endDateInput,nowDate)
        startDateInput.value = formatTimestamp(nowDate,true)
        endDateInput.value = formatTimestamp(nowDate,true)

        $currentFilter = {
            startDate:startDateInput.value,
            endDate:endDateInput.value,
        }

    })



    setContext('currentFilterStore', {
        currentFilter,
    });

    function applyFilters(){
        const url = new URL($page.url);
        url.searchParams.set("start_date",startDateInput.value)
        url.searchParams.set("end_date",endDateInput.value)
        $currentFilter = {
            startDate:startDateInput.value,
            endDate:endDateInput.value,
        }
        goto(url)
    }

    </script>
    <div class="row"  in:fade={{duration: 200 }}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex d-print-none">
                    <h4 class="card-title mb-0 flex-grow-1">Revenues</h4>
                    <div class="flex-shrink-0">
                        <!-- <AddPaymentMethodModal /> -->
                    </div>
                </div><!-- end card header -->
            </div><!-- end card -->

            <div class="card">
                <div class="card-header align-items-center d-flex d-print-none flex-wrap">
                    <div class=" d-flex align-items-center">
                        <!-- <AddPaymentMethodModal /> -->
                        <!-- Select -->
                        <div class="d-flex align-items-center gap-2">
                            <label for="firstName" class="form-label mb-0 text-nowrap">From : </label>
                            <input type="text" name="start_date" class="form-control" placeholder="Insert start date" data-provider="flatpickr" data-maxDate="{formatTimestamp(Date.now())}"   data-date-format="Y-m-d" id="from" bind:this={startDateInput}>

                        </div>
                        <div class="ms-3 d-flex align-items-center gap-2">
                            <label for="firstName" class="form-label mb-0 text-nowrap">To : </label>
                            <input type="text" name="end_date" class="form-control" placeholder="Insert end date" data-provider="flatpickr"  data-maxDate="{formatTimestamp(Date.now())}"  data-date-format="Y-m-d" id="from" bind:this={endDateInput}>                       
                        </div>
                        
                        <button type="button"  class="btn btn-primary waves-effect waves-light ms-3" on:click={applyFilters}>Apply</button>
                    </div>
                </div><!-- end card header -->
                <div class="card-body">
                    
                    <slot />
    
                </div>
            </div><!-- end card -->
    
        </div>
        
    </div>


    