<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
import {translation} from "$lib/translation.js"
    
    import InvoicesTable from "$lib/tables/parent/InvoicesTable.svelte";
    import { onMount } from "svelte";
import { fade } from 'svelte/transition';
    import {initToolTip} from "$lib/init/initToolTip.js"
    export let data
    
    $: invoicesList = data.invoicesResponse.data.invoices  
    $: invoicesPagination = data.invoicesResponse.pagination
    let invoicesPage
    onMount(() => {
        initToolTip(invoicesPage)
    })
    
    </script>
    <div class="row"  in:fade={{duration: 200 }} bind:this={invoicesPage}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">{translation.invoiceManagement[localStorage.getItem("language")]}</h4>
                    <div class="flex-shrink-0">
                    </div>
                </div><!-- end card header -->
                <div class="card-body">
    
                    <!-- <div class="live-preview"> -->
                        <div class="row">
                                <!-- Input with Icon -->
                            <SearchTable type={translation.invoice[localStorage.getItem("language")]}/>
                            <InvoicesTable {invoicesList}/>
                            <Pagination {...invoicesPagination} />
                            <!--end col-->
                        </div>
                        <!--end row-->
                    <!-- </div> -->
                </div><!-- end card-body -->
            </div><!-- end card -->
        </div>
        <!-- end col -->
    </div>
    
    