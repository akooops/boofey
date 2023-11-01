
<script>
    import Progress from "$lib/components/Progress.svelte"
    import { getContext } from "svelte";
    import {translation} from "$lib/translation.js"

    export let activeSub

    let {subStore} = getContext("subStore")
    export let type
    function setSub(){
        $subStore = JSON.parse(JSON.stringify(activeSub));
    }

</script>


<div class="card">
    <div class="card-header align-items-center d-flex">

        <h4 class="card-title mb-0 flex-grow-1">{translation.ativeSubs[localStorage.getItem("language")]}</h4>
       
        <div class="flex-shrink-0">
            {#if activeSub}
            <div class="hstack gap-3 flex-wrap">

                {#if activeSub?.invoice == null}
                    <span data-bs-toggle="modal" data-bs-target="#genSubInvoiceModal" on:click={setSub}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="{translation.genInvoice[localStorage.getItem("language")]}" ><i class="ri-file-paper-2-line"></i></a></span>
                {:else}
                    <a href="/invoices/{activeSub.invoice.id}" target="_blank" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="{translation.print[localStorage.getItem("language")]}" ><i class="ri-file-paper-2-line"></i></a>
                {/if}            <!-- {/if} -->

                    <span data-bs-toggle="modal" data-bs-target="#viewSubModal" on:click={setSub}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="{translation.view[localStorage.getItem("language")]}" ><i class="ri-eye-fill"></i></a></span>
            </div>
            {/if}
            <!-- <AddSubModal schoolId={school.id}/> -->
        </div>
    </div><!-- end card header -->

    <div class="card-body">

        <!-- <div class="live-preview"> -->
            <!--end col-->
        {#if activeSub}

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
                                <th scope="col">{translation.id[localStorage.getItem("language")]}</th>
                                <th scope="col">{translation.package[localStorage.getItem("language")]}</th>
                                <th scope="col">{translation.days[localStorage.getItem("language")]}</th>
                                <th scope="col">{translation.balance[localStorage.getItem("language")]}</th>
                                <th scope="col">{translation.startedAt[localStorage.getItem("language")]}</th>
                                <th scope="col" class="text-end">{translation.subTotal[localStorage.getItem("language")]}</th>
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
                                            <img src={activeSub.package.school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                                        </div>
                                        {#if localStorage.getItem("language") == "ar"}
                                            <div class="flex-grow-1">
                                                {activeSub.package.school.name_ar} - {activeSub.package.name_ar}
                                            </div>
                                            {:else}
                                            <div class="flex-grow-1">
                                                {activeSub.package.school.name} - {activeSub.package.name}
                                            </div>
                                        {/if}
                                    </div>
                                </td>
                                <td>{activeSub.days}</td>
                                <td>
                                    <Progress now={activeSub.balance} max={activeSub.days}/>
                                </td>
                                <td>{activeSub.started_at}</td>
                                <td class="text-end">{activeSub.total} {translation.sar[localStorage.getItem("language")]}</td>

                                
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
                            {#if activeSub?.coupon}
                            <tr>
                                <td>{translation.discount[localStorage.getItem("language")]} <span class="text-muted">({activeSub?.discount})</span> : </td>
                                <td class="text-end" id="cart-subtotal">{activeSub.discountCalculated.toFixed(3)} {translation.sar[localStorage.getItem("language")]}</td>
                            </tr>
                            {/if}
                            <tr>
                                <td>{translation.estimatedTax[localStorage.getItem("language")]} ({activeSub.tax}%) : </td>
                                <td class="text-end" id="cart-discount">- {activeSub.taxCalculated} {translation.sar[localStorage.getItem("language")]}</td>
                            </tr>
                            <tr class="table-active">
                                <th>{translation.total[localStorage.getItem("language")]} ({translation.sar[localStorage.getItem("language")]}) :</th>
                                <td class="text-end">
                                    <span class="fw-semibold" id="cart-total">
                                        {activeSub.total} {translation.sar[localStorage.getItem("language")]}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- end table-responsive -->
            </div>
        {:else}
                    <!-- Info Alert -->
        <div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert">
            <i class="ri-airplay-line me-3 align-middle"></i> There are no <strong>Active Subscriptions</strong> at the moment 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>


        {/if}
            <!--end row-->
        <!-- </div> -->
    </div><!-- end card-body -->
</div><!-- end card -->