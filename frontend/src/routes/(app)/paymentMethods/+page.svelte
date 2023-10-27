<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import PaymentMethodsTable from "$lib/tables/parent/PaymentMethodsTable.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    import { goto } from '$app/navigation';
    
    // import PaymentMethodsTable from "$lib/tables/PaymentMethodsTable.svelte";
    // import AddPaymentMethodModal from "$lib/modals/add/AddPaymentMethodModal.svelte";
    import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
import { fade } from 'svelte/transition';
    export let data
    $: paymentMethodsList = data.paymentMethodsResponse.data.paymentMethods 

    
    // $: paymentMethodsList = data.paymentMethodsResponse.data  
    // $: paymentMethodsPagination = data.paymentMethodsResponse.pagination
    let paymentMethodsPage
    onMount(() => {
        initToolTip(paymentMethodsPage)
    })

    function addPayment(){
        goto(`/paymentMethods/add`)
    }
    let params 

    onMount(() => {
        params = new URL(document.location).searchParams;
    })


    </script>
    <div class="row"  in:fade={{duration: 200 }} bind:this={paymentMethodsPage}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">Payment Methods</h4>
                    <div class="flex-shrink-0">
                        <button type="button" on:click={addPayment} class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Payment Method</button>
                        <!-- <AddPaymentMethodModal /> -->
                    </div>
                </div><!-- end card header -->
    
                <div class="card-body">
                        {#if params?.get("status") == "success"}
                            <div class="row p-3">
                                <!-- Secondary Alert -->

                                <div class="alert alert-success alert-border-left alert-dismissible fade show" role="alert">
                                    <i class="ri-check-double-line me-3 align-middle"></i> <strong>Success</strong> - New payment method has been added
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>

                            </div>
                        {/if}
                    <!-- <div class="live-preview"> -->
                        <div class="row">
                                <!-- Input with Icon -->
                            <!-- <SearchTable type={"PaymentMethod"}/> -->
                            <PaymentMethodsTable {paymentMethodsList}/>
                            <!-- <Pagination {...paymentMethodsPagination} /> -->
                            <!--end col-->
                        </div>
                        <!--end row-->
                    <!-- </div> -->
                </div><!-- end card-body -->
            </div><!-- end card -->
        </div>
        <!-- end col -->
    </div>
    
    