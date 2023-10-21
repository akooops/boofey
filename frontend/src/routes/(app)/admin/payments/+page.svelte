<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    
    import PaymentsTable from "$lib/tables/PaymentsTable.svelte";
    import AddPaymentModal from "$lib/modals/add/AddPaymentModal.svelte";
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
    <div class="row" in:fade={{delay:200,duration: 200 }} out:fade={{duration: 200 }} bind:this={paymentsPage}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">Payments Managment</h4>
                    <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("payments.store")}
                        <button type="button" data-bs-toggle="modal" data-bs-target="#addPaymentModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Payment</button>
                        <AddPaymentModal />
                    {/if}
                    </div>
                </div><!-- end card header -->
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("payments.index")}
                <div class="card-body">
    
                    <!-- <div class="live-preview"> -->
                        <div class="row">
                                <!-- Input with Icon -->
                            <SearchTable type={"Payment"}/>
                            <PaymentsTable {paymentsList}/>
                            <Pagination {...paymentsPagination} />
                            <!--end col-->
                        </div>
                        <!--end row-->
                    <!-- </div> -->
                </div><!-- end card-body -->
                {/if}
            </div><!-- end card -->
        </div>
        <!-- end col -->
    </div>
    
    