<script>
    import Pagination from "$lib/components/Pagination.svelte";    
    import SearchTable from "$lib/components/SearchTable.svelte";    
    import ParentsTable from "$lib/tables/ParentsTable.svelte";

    import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { fade } from 'svelte/transition';

    export let data
    $: parentsList = data.parentsResponse.data.fathers
    $: parentsPagination = data.parentsResponse.pagination

let parentsPage
onMount(() => {
    initToolTip(parentsPage)
})

</script>
    <div class="row"  in:fade={{duration: 200 }} bind:this={parentsPage}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">Parents Managment</h4>
                </div><!-- end card header -->
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("fathers.index")}
                <div class="card-body">
    
                    <!-- <div class="live-preview"> -->
                        
                            <SearchTable type={"Parent"}/>
                            <ParentsTable {parentsList}/>
                            <Pagination {...parentsPagination} />
                            <!--end col-->
                        
                        <!--end row-->
                    <!-- </div> -->
                </div><!-- end card-body -->
                {/if}
            </div><!-- end card -->
        </div>
        <!-- end col -->
    </div>