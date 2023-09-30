<script>
    import SavedAdress from "./SavedAdress.svelte";
    import BillingInfo from "./BillingInfo.svelte";


    export let billings

    let states = ["active","",""]
    let addressId

    function proceed(index,e){
        addressId = e.detail.addressId != null ? e.detail.addressId : addressId
        
        states[index] = "done"
        states[index+1] = "active"
    }
    function back(index){
        states[index] = ""
        states[index-1] = "active"
    }

</script>

<div class="card">
    <div class="card-body checkout-tab">

        <form action="#">
            <div class="step-arrow-nav mt-n3 mx-n3 mb-3">

                <ul class="nav nav-pills nav-justified custom-nav" >
                    <li class="nav-item" role="presentation">
                        <button class="nav-link fs-15 p-3 {states[0]}" id="pills-bill-info-tab" type="button"  aria-controls="pills-bill-info" aria-selected="true">
                            <i class="ri-bill-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i> Billing Info
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link fs-15 p-3 {states[1]}" id="pills-payment-tab"  type="button"  aria-controls="pills-payment" aria-selected="false">
                            <i class="ri-bank-card-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i> Payment Info
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link fs-15 p-3 {states[2]}" id="pills-finish-tab"  type="button" aria-controls="pills-finish" aria-selected="false">
                            <i class="ri-checkbox-circle-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i> Finish
                        </button>
                    </li>
                </ul>
            </div>

            <div class="tab-content">
                <div class="tab-pane fade {states[0] == "active" ? "show active" : ""}" id="pills-bill-info" role="tabpanel" aria-labelledby="pills-bill-info-tab">
                   <BillingInfo {billings} on:proceed={(e) => proceed(0,e)}/>
                </div>


                <div class="tab-pane fade {states[1] == "active" ? "show active" : ""}" id="pills-payment" role="tabpanel" aria-labelledby="pills-payment-tab">
                    <div>
                        <h5 class="mb-1">Payment Selection</h5>
                        <p class="text-muted mb-4">Please select and enter your billing information</p>
                    </div>

                    <div class="row g-4">
                        <div class="col-lg-4 col-sm-6">
                            <div data-bs-toggle="collapse" data-bs-target="#paymentmethodCollapse.show" aria-expanded="false" aria-controls="paymentmethodCollapse">
                                <div class="form-check card-radio">
                                    <input id="paymentMethod01" name="paymentMethod" type="radio" class="form-check-input">
                                    <label class="form-check-label" for="paymentMethod01">
                                        <span class="fs-16 text-muted me-2"><i class="ri-paypal-fill align-bottom"></i></span>
                                        <span class="fs-14 text-wrap">Paypal</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div data-bs-toggle="collapse" data-bs-target="#paymentmethodCollapse" aria-expanded="true" aria-controls="paymentmethodCollapse">
                                <div class="form-check card-radio">
                                    <input id="paymentMethod02" name="paymentMethod" type="radio" class="form-check-input" checked>
                                    <label class="form-check-label" for="paymentMethod02">
                                        <span class="fs-16 text-muted me-2"><i class="ri-bank-card-fill align-bottom"></i></span>
                                        <span class="fs-14 text-wrap">Credit / Debit Card</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-sm-6">
                            <div data-bs-toggle="collapse" data-bs-target="#paymentmethodCollapse.show" aria-expanded="false" aria-controls="paymentmethodCollapse">
                                <div class="form-check card-radio">
                                    <input id="paymentMethod03" name="paymentMethod" type="radio" class="form-check-input">
                                    <label class="form-check-label" for="paymentMethod03">
                                        <span class="fs-16 text-muted me-2"><i class="ri-money-dollar-box-fill align-bottom"></i></span>
                                        <span class="fs-14 text-wrap">Cash on Delivery</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="collapse show" id="paymentmethodCollapse">
                        <div class="card p-4 border shadow-none mb-0 mt-4">
                            <div class="row gy-3">
                                <div class="col-md-12">
                                    <label for="cc-name" class="form-label">Name on card</label>
                                    <input type="text" class="form-control" id="cc-name" placeholder="Enter name">
                                    <small class="text-muted">Full name as displayed on card</small>
                                </div>

                                <div class="col-md-6">
                                    <label for="cc-number" class="form-label">Credit card number</label>
                                    <input type="text" class="form-control" id="cc-number" placeholder="xxxx xxxx xxxx xxxx">
                                </div>

                                <div class="col-md-3">
                                    <label for="cc-expiration" class="form-label">Expiration</label>
                                    <input type="text" class="form-control" id="cc-expiration" placeholder="MM/YY">
                                </div>

                                <div class="col-md-3">
                                    <label for="cc-cvv" class="form-label">CVV</label>
                                    <input type="text" class="form-control" id="cc-cvv" placeholder="xxx">
                                </div>
                            </div>
                        </div>
                        <div class="text-muted mt-2 fst-italic">
                            <i data-feather="lock" class="text-muted icon-xs"></i> Your transaction is secured with SSL encryption
                        </div>
                    </div>

                    <div class="d-flex align-items-start gap-3 mt-4">
                        <button type="button" class="btn btn-light btn-label previestab" data-previous="pills-bill-address-tab"><i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>Back to Shipping</button>
                        <button type="button" class="btn btn-primary btn-label right ms-auto nexttab" data-nexttab="pills-finish-tab"><i class="ri-shopping-basket-line label-icon align-middle fs-16 ms-2"></i>Complete Order</button>
                    </div>
                </div>
                <!-- end tab pane -->

                <div class="tab-pane fade {states[2] == "active" ? "show active" : ""}" id="pills-finish" role="tabpanel" aria-labelledby="pills-finish-tab">
                    <div class="text-center py-5">

                        <div class="mb-4">
                            <lord-icon src="https://cdn.lordicon.com/lupuorrc.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                        </div>
                        <h5>Thank you ! Your Order is Completed !</h5>
                        <p class="text-muted">You will receive an order confirmation email with details of your order.</p>

                        <h3 class="fw-semibold">Order ID: <a href="apps-ecommerce-order-details.html" class="text-decoration-underline">VZ2451</a></h3>
                    </div>
                </div>
                <!-- end tab pane -->
            </div>
            <!-- end tab content -->
        </form>
    </div>
    <!-- end card body -->
</div>