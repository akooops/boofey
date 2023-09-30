<script>


    export let order


</script>

<div class="col-xl-4">
    <div class="sticky-side-div">
        <div class="card">
            <div class="card-header border-bottom-dashed">
                <h5 class="card-title mb-0">Order Summary</h5>
            </div>

            

            <div class="card-body pt-2">
                <div class="table-responsive">
                    <table class="table table-borderless mb-0">
                        <tbody>
                            <tr>
                                <td>Sub Total :</td>
                                <td class="text-end" id="cart-subtotal">{order?.subtotal} SAR</td>
                            </tr>
                            <tr>
                                <td>Discount <span class="text-muted">({order?.discount}%)</span> : </td>
                                <td class="text-end" id="cart-discount">{order?.discountCalculated} SAR</td>
                            </tr>
                            <tr>
                                <td>Estimated Tax ({order?.tax}%) : </td>
                                <td class="text-end" id="cart-tax">{order?.taxCalculated} SAR</td>
                            </tr>
                            <tr class="table-active">
                                <th>Total (SAR) :</th>
                                <td class="text-end">
                                    <span class="fw-semibold" id="cart-total">
                                        {order?.total} SAR
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
    <!-- end stickey -->

</div>