<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
import {translation} from "$lib/translation.js"
    
    import PaymentsTable from "$lib/tables/parent/PaymentsTable.svelte";
    import { onMount } from "svelte";
import { fade } from 'svelte/transition';
    import {initToolTip} from "$lib/init/initToolTip.js"
    export let data
    
    $: paymentsList = data.paymentsResponse.data.payments
    $: paymentsPagination = data.paymentsResponse.pagination
    let paymentsPage
    onMount(() => {
        initToolTip(paymentsPage)
    })
    
    </script>
    <div class="row"  in:fade={{duration: 200 }} bind:this={paymentsPage}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">{translation.paymentManagement[localStorage.getItem("language")]}</h4>
                    <div class="flex-shrink-0">
                    </div>
                </div><!-- end card header -->
                <div class="card-body">
    
                    <!-- <div class="live-preview"> -->
                        <div class="row">
                                <!-- Input with Icon -->
                            <SearchTable type={translation.payment[localStorage.getItem("language")]}/>
                            <PaymentsTable {paymentsList}/>
                            <Pagination {...paymentsPagination} />
                            <!--end col-->
                        </div>
                        <!--end row-->
                    <!-- </div> -->
                </div><!-- end card-body -->
            </div><!-- end card -->
        </div>
        <!-- end col -->
    </div>
    
    