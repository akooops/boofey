<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    
    import OrdersTable from "$lib/tables/OrdersTable.svelte";
    import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
import { fade } from 'svelte/transition';
import { goto } from '$app/navigation';
    
export let data
    
    $: ordersList = data.ordersResponse.data  
    $: ordersPagination = data.ordersResponse.pagination
    let ordersPage
    onMount(() => {
        initToolTip(ordersPage)
    })
    
    function add(){
        goto("/admin/orders/add")
    }

    </script>
    <div class="row"  in:fade={{duration: 200 }} bind:this={ordersPage}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">Orders Managment</h4>
                    <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("orders.store")}
                        <a type="button" on:click={add} class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Order</a>
                    {/if}
                    </div>
                </div><!-- end card header -->
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("orders.index")}
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
                {/if}
            </div><!-- end card -->
        </div>
        <!-- end col -->
    </div>
    
    