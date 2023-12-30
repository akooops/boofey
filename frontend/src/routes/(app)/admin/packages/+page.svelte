<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    import AddPackageModal from "$lib/modals/add/AddPackageModal.svelte";
	import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
	import PackagesTable from "$lib/tables/PackagesTable.svelte";
    import { fade } from 'svelte/transition';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import {InitFlatPickr} from "$lib/init/initFlatpickr.js"


    export let data
    $: packagesList = data.packagesResponse.data.packages
    $: packagesPagination = data.packagesResponse.pagination

    let packagesPage
    let yearly = "all"
    let popular = "all"
    let hidden = "all"
    onMount(() => {
        initToolTip(packagesPage)
        InitFlatPickr()

        let state = $page.url.searchParams.get("popular")
        if(state != null){
            popular = state == "true" ? "popular" : "not popular"
        }
        state = $page.url.searchParams.get("hidden")
        if(state != null){
            hidden = state == "true" ? "hidden" : "not hidden"
        }
        state = $page.url.searchParams.get("yearly")
        if(state != null){
            yearly = state == "true" ? "yearly" : "monthly"
        }

    })

    function toggleFilters(state){
        const url = new URL($page.url);
        url.searchParams.delete("page")

        if(yearly == "all"){
            url.searchParams.delete("yearly")
        }else {
            url.searchParams.set("yearly",yearly == "yearly")
        }
        if(popular == "all"){
            url.searchParams.delete("popular")
        }else {
            url.searchParams.set("popular",popular == "popular")
        }
        if(hidden == "all"){
            url.searchParams.delete("hidden")
        }else {
            url.searchParams.set("hidden",hidden == "hidden")
        }
        goto(url)
}
    
</script>
<div class="row"  in:fade={{duration: 200 }} bind:this={packagesPage}>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1"> Packages Management</h4>

               
                <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("packages.store")}
                        <button type="button" data-bs-toggle="modal" data-bs-target="#addPackageModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Package</button>
                        <AddPackageModal general={true}/>
                    {/if}
                </div>
            </div><!-- end card header -->
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("packages.index")}
            <div class="card-body">

                <!-- <div class="live-preview"> -->
                    <div class="row">
                            <!-- Input with Icon -->
                        <SearchTable type={"Package"}/>
                        <div class="col-xl-3 mb-3">
                            <select class="form-select" name="class" id="class" aria-label="Default select example" bind:value={yearly} on:change={toggleFilters}>
                                <option value={"all"}>All</option>
                                <option value={"yearly"}>Yearly</option>
                                <option value={"monthly"}>Monthly</option>
                            </select>
                        </div>
                        <div class="col-xl-3 mb-3">
                            <select class="form-select" name="class" id="class" aria-label="Default select example" bind:value={popular} on:change={toggleFilters}>
                                <option value={"all"}>All</option>
                                <option value={"popular"}>Popular</option>
                                <option value={"not popular"}>Not Popular</option>
                            </select>
                        </div>
                        <div class="col-xl-3 mb-3">
                            <select class="form-select" name="class" id="class" aria-label="Default select example" bind:value={hidden} on:change={toggleFilters}>
                                <option value={"all"}>All</option>
                                <option value={"hidden"}>Hidden</option>
                                <option value={"not hidden"}>Not Hidden</option>
                            </select>
                        </div>


                        <PackagesTable {packagesList} general={true}/>
                        <Pagination {...packagesPagination} />
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

<!-- src="https://boofey.akoops.com/uploads/schools/_5607de8d-e2d4-47e3-a808-d54851903b65.jpeg"
<div class="d-flex gap-2 align-items-center">
    <div class="flex-shrink-0">
        <img src={school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
    </div>
    <div class="flex-grow-1">
        {school.name}
    </div>
</div> -->

    