<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    import CanteensTable from "$lib/tables/CanteensTable.svelte";
    import AddCanteenModal from "$lib/modals/add/AddCanteenModal.svelte";
	import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
	import CanteenCard from "./simplified/CanteenCard.svelte";
    import ViewCanteenModal from "$lib/modals/view/ViewCanteenModal.svelte";
    import EditCanteenModal from "$lib/modals/edit/EditCanteenModal.svelte";
    import { navigating } from '$app/stores';


    export let data
    $: canteensList = data.canteensResponse.data.canteens
    $: canteensPagination = data.canteensResponse.pagination

    let canteensPage
    onMount(() => {
        initToolTip(canteensPage)
        // InitFlatPickr()
    })

    setContext('apiStore', {
	    apiStore: writable("")
    });


    setContext('canteenStore', {
	    canteenStore: writable({})
    });



    
</script>
<div class="row"  in:fade={{duration: 200 }} bind:this={canteensPage}>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex">

                <h4 class="card-title mb-0 flex-grow-1">Canteens Management</h4>

               
                <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.store")}
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addCanteenModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Canteen</button>
                    <AddCanteenModal general={true}/>
                    {/if}
                </div>
            </div><!-- end card header -->
            
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.index")}

            <div class="card-body">
                    <div class="row">
                        <SearchTable type={"Canteen"}/>
                        <CanteensTable {canteensList} general={true}/>
                        <Pagination {...canteensPagination} />
                    </div>
            </div>

            {/if}
        </div><!-- end card  -->
        {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.index.simplified")}
            <div class="row">
            
            <SearchTable type={"Canteen"}/>
                
            {#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
                <div class="text-center">
                    <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                </div>
            {:else}
                {#each canteensList as canteen,_ (canteen.id)}
                    <CanteenCard {canteen} />
                {/each}
            {/if}
            <Pagination {...canteensPagination} />
            </div>
        {/if}
    </div>
    <!-- end col -->
</div>

<ViewCanteenModal general={true} simple={JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.show.simplified")}/> 



<!-- src="https://boofey.akoops.com/uploads/schools/_5607de8d-e2d4-47e3-a808-d54851903b65.jpeg"
<div class="d-flex gap-2 align-items-center">
    <div class="flex-shrink-0">
        <img src={school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
    </div>
    <div class="flex-grow-1">
        {school.name}
    </div>
</div> -->

    