<form method="post" action="https://checkout.payfort.com/FortAPI/paymentPage" id=form1 name=form1>
    <input type="hidden" name="signature" value="{{$signature}}">
    <input type="hidden" name="command" value="{{$command}}">
    <input type="hidden" name="merchant_reference" value="{{$merchant_reference}}">
    <input type="hidden" name="amount" value="{{$amount}}">
    <input type="hidden" name="access_code" value="{{$access_code}}">
    <input type="hidden" name="merchant_identifier" value="{{$merchant_identifier}}">
    <input type="hidden" name="currency" value="{{$currency}}">
    <input type="hidden" name="language" value="{{$language}}">
    <input type="hidden" name="customer_email" value="{{$customer_email}}">
    <input type="hidden" name="return_url" value="{{$return_url}}">
    <input type="submit" value="" id="" name="">
</form>