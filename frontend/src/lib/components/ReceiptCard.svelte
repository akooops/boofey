<script>
    export let payment

    function formatDateShortMonth(){
        const optionsDate = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        };
        const optionsTime = {
            hour: '2-digit',
            minute: '2-digit',
        };

        const date = new Date(payment.created_at);
        const formattedDate = date.toLocaleDateString('en-US', optionsDate);
        const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

         return [formattedDate,formattedTime]
    }
    $: [date , time] = formatDateShortMonth()
</script>

<div class="row justify-content-center">
    <div class="col-xxl-9">
        <div class="card" id="demo">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card-header border-bottom-dashed p-4">
                        <div class="d-flex">
                            <div class="flex-grow-1">
                                <img src="/assets/images/logo-dark.png" class="card-logo card-logo-dark" alt="logo dark" height="17">
                                <img src="/assets/images/logo-light.png" class="card-logo card-logo-light" alt="logo light" height="17">
                                <div class="mt-sm-5 mt-4">
                                    <h6 class="text-muted text-uppercase fw-semibold">Address</h6>
                                    <p class="text-muted mb-1" id="address-details">Riyadh,  Saudi Arabia</p>
                                    <p class="text-muted mb-0" id="zip-code"><span>Zip-code:</span> 12211</p>
                                </div>
                            </div>
                            <div class="flex-shrink-0 mt-sm-0 mt-3">
                                <h6><span class="text-muted fw-normal">Legal Registration No:</span><span id="legal-register-no">000000</span></h6>
                                <h6><span class="text-muted fw-normal">Email:</span><span id="email">contact@boofey.app</span></h6>
                                <h6><span class="text-muted fw-normal">Website:</span> <a href="https://boofey.app/" class="link-primary" target="_blank" id="website">www.boofey.app</a></h6>
                                <h6 class="mb-0"><span class="text-muted fw-normal">Contact No: </span><span id="contact-no"> +(966) 56 382 3920</span></h6>
                            </div>
                        </div>
                    </div>
                    <!--end card-header-->
                </div><!--end col-->
                <div class="col-lg-12">
                    <div class="card-body p-4">
                        <div class="row g-3">
                            <div class="col-lg-3 col-6">
                                <p class="text-muted mb-2 text-uppercase fw-semibold">Payment No</p>
                                <h5 class="fs-15 mb-0">#{payment.ref}</h5>
                            </div>
                            <!--end col-->
                            <div class="col-lg-3 col-6">
                                <p class="text-muted mb-2 text-uppercase fw-semibold">Date</p>
                                <h5 class="fs-15 mb-0"><span id="invoice-date">{date}</span> <small class="text-muted" id="invoice-time">{time}</small></h5>
                            </div>
                            <!--end col-->
                            <div class="col-lg-3 col-6">
                                <p class="text-muted mb-2 text-uppercase fw-semibold">Payment Status</p>
                                {#if payment.status == 14}
                                    <span class="badge bg-success-subtle text-success fs-11" id="payment-status">Success</span>
                                {:else}
                                <span class="badge bg-danger-subtle text-danger fs-11" id="payment-status">Failed</span>
                                {/if}
                            </div>
                            <!--end col-->
                            <div class="col-lg-3 col-6">
                                <p class="text-muted mb-2 text-uppercase fw-semibold">Total Amount</p>
                                <h5 class="fs-15 mb-0">{payment.total} SAR</h5>
                            </div>
                            <!--end col-->
                        </div>
                        <!--end row-->
                    </div>
                    <!--end card-body-->
                </div><!--end col-->
                <div class="col-lg-12">
                    <div class="card-body p-4 border-top border-top-dashed">
                        <div class="row g-3">
                            {#if payment?.billing}
                            <div class="col-6">
                                <h6 class="text-muted text-uppercase fw-semibold mb-3">Billing Address</h6>
                                <p class="fw-medium mb-2" id="billing-name">{payment?.billing?.firstname} {payment?.billing?.lastname}</p>
                                <p class="text-muted mb-1" id="billing-address-line-1">{payment?.billing?.email}</p>
                                <p class="text-muted mb-1">{payment?.billing?.phone}</p>
                                <p class="text-muted mb-1">{payment?.billing?.country},{payment?.billing?.state},{payment?.billing?.zipcode}</p>
                                <p class="text-muted mb-0">{payment?.billing?.address}</p>
                            </div>
                            {/if}
                            <!--end col-->
                            <div class="col-6">
                                <h6 class="text-muted text-uppercase fw-semibold mb-3">Student</h6>
                                <p class="fw-medium mb-2" id="billing-name">{payment?.student.fullname}</p>
                                <p class="text-muted mb-0" id="billing-address-line-1">Class : {payment?.student.className}</p>
                            </div>
                            <!--end col-->
                        </div>
                        <!--end row-->
                    </div>
                    <!--end card-body-->
                </div><!--end col-->
                <div class="col-lg-12">
                    <div class="card-body p-4">
                        <div class="table-responsive">
                            <table class="table table-borderless  table-nowrap align-middle mb-0">
                                <thead>
                                    <tr class="table-active">
                                        <th scope="col">Name</th>
                                        <th scope="col">School</th>
                                        <th scope="col">Code</th>
                                        <th scope="col" class="text-end">Price</th>
                                    </tr>
                                </thead>
                                <tbody id="products-list">
                                    <tr>
                                        <td class="text-start">
                                            {payment.package.name}
                                        </td>
                                        <div class="d-flex gap-2 align-items-center">
                                            <div class="flex-shrink-0">
                                                <img src={payment.package.school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                                            </div>
                                            <div class="flex-grow-1">
                                                {payment.package.school.name}
                                            </div>
                                        </div>
                                        <td><span class="badge border border-primary text-primary">{payment.package.code}</span></td>
                                        <td class="text-end">{payment.package.currentPrice} SAR</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="border-top border-top-dashed mt-2">
                            <table class="table table-borderless table-nowrap align-middle mb-0 ms-auto" style="width:250px">
                                <tbody>
                                    <tr>
                                        <td>Sub Total</td>
                                        <td class="text-end">{payment.subtotal} SAR</td>
                                    </tr>
                                    <tr>
                                        <td>Estimated Tax ({payment.tax}%)</td>
                                        <td class="text-end">+ {payment.taxCalculated} SAR</td>
                                    </tr>
                                    <tr>
                                        <td>Discount <small class="text-muted">({payment.discount}%)</small></td>
                                        <td class="text-end">- {payment.discountCalculated} SAR</td>
                                    </tr>
                                    <tr class="border-top border-top-dashed fs-15">
                                        <th scope="row">Total Amount</th>
                                        <th class="text-end">{payment.total} SAR</th>
                                    </tr>
                                </tbody>
                            </table>
                            <!--end table-->
                        </div>
                        <div class="mt-3">
                            <h6 class="text-muted text-uppercase fw-semibold mb-3">Payment Details:</h6>
                            <p class="text-muted mb-1">Payment Method: <span class="fw-medium" id="payment-method">Mastercard</span></p>
                            <p class="text-muted mb-1">Card Holder: <span class="fw-medium" id="card-holder-name">{payment.payment_method.card_holder_name}</span></p>
                            <p class="text-muted mb-1">Card Number: <span class="fw-medium" id="card-number">{payment.payment_method.card_number}</span></p>
                            <p class="text-muted">Total Amount: {payment.total} SAR</p>
                        </div>
                        <!-- <div class="mt-4">
                            <div class="alert alert-info">
                                <p class="mb-0"><span class="fw-semibold">NOTES:</span>
                                    <span id="note">All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or
                                        credit card or direct payment online. If account is not paid within 7
                                        days the credits details supplied as confirmation of work undertaken
                                        will be charged the agreed quoted fee noted above.
                                    </span>
                                </p>
                            </div>
                        </div> -->
                        <div class="hstack gap-2 justify-content-end d-print-none mt-4">
                            <a href="javascript:window.print()" class="btn btn-info"><i class="ri-printer-line align-bottom me-1"></i> Print</a>
                        </div>
                    </div>
                    <!--end card-body-->
                </div><!--end col-->
            </div><!--end row-->
        </div>
        <!--end card-->
    </div>
    <!--end col-->
</div>