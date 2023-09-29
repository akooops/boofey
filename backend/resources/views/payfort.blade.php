@extends('layouts.master')
@section('title') Payment Methods @endsection
@section('css')
@endsection
@section('content')
<div class="card">
    <div class="card-body">
        <div class="tab-pane fade active show" id="pills-payment" role="tabpanel" aria-labelledby="pills-payment-tab">
            <div>
                <h5 class="mb-1">Payment Selection</h5>
                <p class="text-muted mb-4">Please select and enter your billing information</p>
            </div>
        
            <div class="row g-4">
                <div class="col-lg-4 col-sm-6">
                    <div data-bs-toggle="collapse" data-bs-target="#paymentmethodCollapse" aria-expanded="true" aria-controls="paymentmethodCollapse" class="">
                        <div class="form-check card-radio">
                            <input id="paymentMethod02" name="paymentMethod" type="radio" class="form-check-input" checked="">
                            <label class="form-check-label" for="paymentMethod02">
                                <span class="fs-16 text-muted me-2"><i class="ri-bank-card-fill align-bottom"></i></span>
                                <span class="fs-14 text-wrap">Credit / Debit Card</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            @if (session('success'))
                <div class="alert alert-success mt-4">
                    {{ session('success') }}
                </div>
            @endif

            @if (session('error'))
                <div class="alert alert-danger mt-4">
                    {{ session('error') }}
                </div>
            @endif

            <form method="post" action="https://sbcheckout.payfort.com/FortAPI/paymentPage" id="payment-form" name="form1">
                <div class="collapse show" id="paymentmethodCollapse" style="">
                    <div class="card p-4 border shadow-none mb-0 mt-4">
                            <input type="hidden" name="service_command" value="TOKENIZATION" />
                            <input type="hidden" name="language" value="en" />
                            <input type="hidden" name="merchant_identifier" value="ea198946" />
                            <input type="hidden" name="access_code" value="fVV2e5KWuLxKDRqIcBYW" />
                            <input type="hidden" name="signature"  />
                            <input type="hidden" name="return_url" value="https://boofey.test/backend/public/payfort" />
                            <input type="hidden" name="merchant_reference" id="merchant_reference" value="{{$merchant_reference}}" />
                            <input type="hidden" name="remember_me" value="YES" />
                            <input type="hidden" name="expiry_date" id="expiry_date" />

                            <div class="row gy-3">
                                <div class="col-md-12">
                                    <label for="cc-name" class="form-label">Name on card</label>
                                    <input type="text" name="card_holder_name" class="form-control" id="cc-name" placeholder="Enter name">
                                    <small class="text-muted">Full name as displayed on card</small>
                                </div>
                
                                <div class="col-md-6">
                                    <label for="cc-number" class="form-label">Credit card number</label>
                                    <input type="text" name="card_number" class="form-control" id="cc-number" placeholder="xxxx xxxx xxxx xxxx">
                                </div>
                
                                <div class="col-md-3">
                                    <label for="cc-expiration" class="form-label">Expiration</label>
                                    <input type="text" class="form-control" id="cc-expiration" placeholder="MM/YY">
                                </div>
                
                                <div class="col-md-3">
                                    <label for="cc-cvv" class="form-label">CVV</label>
                                    <input type="text" name="card_security_code" class="form-control" id="cc-cvv" placeholder="xxx">
                                </div>
                            </div>
                    </div>
                </div>
        
                <div class="d-flex align-items-start gap-3 mt-4">
                    <button type="button" class="btn btn-light btn-label previestab">
                        <i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>Back
                    </button>
                    <button type="submit" class="btn btn-primary right ms-auto">Add Card</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
@section('script')
<script src="{{ URL::asset('/assets/js/app.min.js') }}"></script>

<script>
    $(document).ready(function() {
        if($("#payment-form") !== undefined && $("#payment-form").length > 0) {

            $("#payment-form").attr("action", isSandbox() ? '{{env('PAYFORT_TEST_URL')}}' : '{{env('PAYFORT_PROD_URL')}}');
            $("input[name=access_code]").val('{{env('PAYFORT_ACCESS_CODE')}}');
            $("input[name=merchant_identifier]").val('{{env('PAYFORT_MERCHANT_ID')}}');
            $("input[name=return_url]").val('{{env('PAYFORT_RETURN_URL')}}');

            if($("input[name=signature]") !== undefined) {
                calculateTokenizationSigniture(function(hashed) {
                    $("input[name=signature]").val(hashed);
                });
            }
        }

        const expiryDateInput = document.getElementById('cc-expiration');
        const hiddenExpiryDateInput = document.getElementById('expiry_date');

        expiryDateInput.addEventListener('input', function () {
            // Get the current value of the input field
            const mmYYValue = expiryDateInput.value;

            // Remove any non-digit characters (e.g., slashes)
            const cleanedValue = mmYYValue.replace(/\D/g, '');

            // Ensure the cleaned value is exactly 4 characters
            if (cleanedValue.length === 4) {
            // Rearrange the characters to YYMM format
            const yyMMValue = cleanedValue.slice(2) + cleanedValue.slice(0, 2);

                // Update the hidden input field with the same value
                hiddenExpiryDateInput.value = yyMMValue;
            } else {
                // If the input is not valid, clear the hidden input
                hiddenExpiryDateInput.value = '';
            }
        });
    });

    function calculateTokenizationSigniture(callback)
    {
        let fields = [
            {
                field: 'access_code',
                val: $("input[name=access_code]").val()
            },
            {
                field: 'language',
                val: $("input[name=language]").val()
            }
            ,
            {
                field: 'merchant_identifier',
                val: $("input[name=merchant_identifier]").val()
            },
            {
                field: 'merchant_reference',
                val: $("input[name=merchant_reference]").val()
            },
            {
                field: 'return_url',
                val: $("input[name=return_url]").val()
            },
            {
                field: 'service_command',
                val: $("input[name=service_command]").val()
            }
        ];

        const fieldsStr = [];

        fields.forEach(f => {
            fieldsStr.push(`${f.field}=${f.val}`);
        });

        getHashedSigniture(fieldsStr.join('|'), function(result) {
            callback(result);
        });
    }

    function calculatePaymentSigniture(values, callback)
    {
        const fieldsStr = [];

        for(let k in values) {
            fieldsStr.push(`${k}=${values[k]}`);
        }
        
        getHashedSigniture(fieldsStr.join('|'), function(result) {
            callback(result);
        });
    }

    function getHashedSigniture(data, callback)
    {
        $.get('{{route("calculateSignature")}}?fields=' + data, function( data ) {
                const result = data;

                callback(result.hashed);
            });
    }

    function isSandbox() {
        return '{{env('PAYFORT_IS_SANDBOX')}}' == "1";
    }
</script>

@endsection