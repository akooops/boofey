<form method="post" action="https://sbcheckout.payfort.com/FortAPI/paymentPage" id="payment-form" name="form1" onsubmit="submitForm(event)">
    <input type="hidden" name="service_command" value="TOKENIZATION" />
    <input type="hidden" name="language" value="en" />
    <input type="hidden" name="merchant_identifier" value="ea198946" />
    <input type="hidden" name="access_code" value="fVV2e5KWuLxKDRqIcBYW" />
    <input type="hidden" name="signature"  />
    <input type="hidden" name="return_url" value="https://boofey.test/backend/public/paymentReturn" />
    <input type="hidden" name="merchant_reference" id="merchant_reference" value="" />
    <input type="hidden" name="remember_me" value="YES" />

    <label>Card Number</label>
    <input type="text" name="card_number">

    <label>Card Expiry Date</label>
    <input type="text" name="expiry_date">

    <label>Card CCV</label>
    <input type="text" name="card_security_code">

    <label>Card Holder Name</label>
    <input type="text" name="card_holder_name">
    <input type="submit">
</form>

<script src="https://code.jquery.com/jquery-1.12.4.min.js" crossorigin="anonymous"></script>

<script>


    $(document).ready(function() {
        if($("#payment-form") !== undefined && $("#payment-form").length > 0) {

            $("#payment-form").attr("action", isSandbox() ? '{{env('PAYFORT_TEST_URL')}}' : '{{env('PAYFORT_PROD_URL')}}');
            $("input[name=access_code]").val('{{env('PAYFORT_ACCESS_CODE')}}');
            $("input[name=merchant_identifier]").val('{{env('PAYFORT_MERCHANT_ID')}}');
            $("input[name=return_url]").val('{{env('PAYFORT_RETURN_URL')}}');
            $("input[name=merchant_reference]").val(generateUUID());

            if($("input[name=signature]") !== undefined) {
                calculateTokenizationSigniture(function(hashed) {
                    $("input[name=signature]").val(hashed);
                });
            }
        }
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

        getHashedSigniture(fieldsStr.join('|') + '&prefix=' + '{{env('PAYFORT_SHA_REQUEST_PHRASE')}}', function(result) {
            callback(result);
        });
    }

    function calculatePaymentSigniture(values, callback)
    {
        const fieldsStr = [];

        for(let k in values) {
            fieldsStr.push(`${k}=${values[k]}`);
        }
        
        getHashedSigniture(fieldsStr.join('|') + '&prefix=' + config.shaRequest, function(result) {
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

    function generateUUID() 
    { 
        var d = new Date().getTime();
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    function isSandbox() {
        return '{{env('PAYFORT_IS_SANDBOX')}}' == "1";
    }
</script>