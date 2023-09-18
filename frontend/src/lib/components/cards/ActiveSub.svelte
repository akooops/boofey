
<script>
    import Progress from "$lib/components/Progress.svelte"
    import { getContext } from "svelte";

    export let activeSub

    let {subStore} = getContext("subStore")
    
    function setSub(){
        $subStore = JSON.parse(JSON.stringify(activeSub));
    }

</script>


<div class="card">
    <div class="card-header align-items-center d-flex">

        <h4 class="card-title mb-0 flex-grow-1">Active Subscription</h4>


       
        <div class="flex-shrink-0">

            <div class="hstack gap-3 flex-wrap">
                <span data-bs-toggle="modal" data-bs-target="#viewSubModal" on:click={setSub}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="View" ><i class="ri-eye-fill"></i></a></span>
                <span data-bs-toggle="modal" data-bs-target="#editSubModal" on:click={setSub}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
                <span data-bs-toggle="modal" data-bs-target="#deleteSubModal" on:click={setSub}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
            </div>
            <!-- <AddSubModal schoolId={school.id}/> -->
        </div>
    </div><!-- end card header -->

    <div class="card-body">

        <!-- <div class="live-preview"> -->
                <!--end col-->
                <div class="row pe-0">
                    <div class="table-responsive">
                        <table class="table align-middle table-nowrap mb-0 border-top">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col" style="width: 25px;">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="checkAll" value="option1">
                                        </div>
                                    </th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Package</th>
                                    <th scope="col">Days</th>
                                    <th scope="col">Balance</th>
                                    <th scope="col">Should Start At</th>
                                    <th scope="col">Started At</th>
                                    <th scope="col" class="text-end">Sub Total</th>
                                </tr>
                            </thead>
                            <tbody class="list">
                                <tr scope="row">
                                    <td>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
                                        </div>
                                    </td>
                                    <td>{activeSub.id}</td>
                                    <td>
                                        <div class="d-flex gap-2 align-items-center">
                                            <div class="flex-shrink-0">
                                                <img src={activeSub.payment.package.school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                                            </div>
                                            <div class="flex-grow-1">
                                                {activeSub.payment.package.school.name} - {activeSub.payment.package.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{activeSub.days}</td>
                                    <td>
                                       <Progress now={activeSub.balance} max={activeSub.days}/>
                                    </td>
                                    <td>{activeSub.should_start_at == null ? "unset" : activeSub.should_start_at}</td>
                                    <td>{activeSub.started_at}</td>
                                    <td class="text-end">{activeSub.payment.total} SAR</td>

                                    
                            </tbody>
                        </table>
                             <!-- <ViewSubModal /> 
                             <DeleteSubModal /> -->
                            <!--  
                            <EditSubModal />  balance * 100 / days 
                            -->
                
                    </div>
                </div>
            <div class="row justify-content-sm-end">

                    <div class="table-responsive col-3 ">
                        <table class="table table-borderless mb-0">
                            <tbody>
                                {#if activeSub?.payment?.coupon}
                                <tr>
                                    <td>Discount <span class="text-muted">(activeSub?.payment?.coupon)</span> : </td>
                                    <td class="text-end" id="cart-subtotal">{activeSub.payment.discount} SAR</td>
                                </tr>
                                {/if}
                                <tr>
                                    <td>Estimated Tax({activeSub.payment.tax}%) : </td>
                                    <td class="text-end" id="cart-discount">- {activeSub.payment.taxCalculated} SAR</td>
                                </tr>
                                <tr class="table-active">
                                    <th>Total (SAR) :</th>
                                    <td class="text-end">
                                        <span class="fw-semibold" id="cart-total">
                                            {activeSub.payment.total} SAR
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- end table-responsive -->
            </div>
            <!--end row-->
        <!-- </div> -->
    </div><!-- end card-body -->
</div><!-- end card -->