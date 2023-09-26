<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    
    import OrdersTable from "$lib/tables/OrdersTable.svelte";
    import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    export let data
    
    $: ordersList = data.ordersResponse.data  
    $: ordersPagination = data.ordersResponse.pagination
    let ordersPage
    onMount(() => {
        initToolTip(ordersPage)
    })
    
    </script>
    <div class="row" bind:this={ordersPage}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">Orders Managment</h4>
                    <div class="flex-shrink-0">
                        <a type="button" href="/admin/orders/add" target="_blank" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Order</a>
                    </div>
                </div><!-- end card header -->
    
                <div class="card-body">
    
                    <!-- <div class="live-preview"> -->
                        <div class="row">
                                <!-- Input with Icon -->
                            <SearchTable type={"Order"}/>
                            <OrdersTable {ordersList}/>
                            <Pagination {...ordersPagination} />
                            <!--end col-->
                        </div>
                        <!--end row-->
                    <!-- </div> -->
                </div><!-- end card-body -->
            </div><!-- end card -->
        </div>
        <!-- end col -->
    </div>
    
    