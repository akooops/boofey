<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    import AddPackageModal from "$lib/modals/add/AddPackageModal.svelte";
	import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
	import PackagesTable from "$lib/tables/PackagesTable.svelte";
    export let data
    $: packagesList = data.packagesResponse.data.packages
    $: packagesPagination = data.packagesResponse.pagination

    let packagesPage
    onMount(() => {
        initToolTip(packagesPage)

    })
    
</script>
<div class="row" bind:this={packagesPage}>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1"> Packages Management</h4>

               
                <div class="flex-shrink-0">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addPackageModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Package</button>
                    <AddPackageModal general={true}/>
                </div>
            </div><!-- end card header -->

            <div class="card-body">

                <!-- <div class="live-preview"> -->
                    <div class="row">
                            <!-- Input with Icon -->
                        <SearchTable type={"Package"}/>
                        <PackagesTable {packagesList} general={true}/>
                        <Pagination {...packagesPagination} />
                        <!--end col-->
                    </div>
                    <!--end row-->
                <!-- </div> -->
            </div><!-- end card-body -->
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

    