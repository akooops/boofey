<script>
    import {translation} from "$lib/translation.js"

    export let invoice
    export let data
    $:orderResponse = data.orderResponse
    $:order = orderResponse.data.order
</script>

    <div class=" d-flex  justify-content-center" dir="ltr">
        <div class="card p-2" id="demo">
            <div class="row">
<!-- 
                <div class="col-lg-12 text-center">
                    <h4> Boofey</h4>
                </div> -->

                <div class="col-lg-12">
                    <!-- <div class="card-header border-bottom-dashed p-4">
                        <div class="d-flex">
                            <div class="flex-shrink-0 mt-sm-0 mt-3">
                                <h6><span class="text-muted fw-normal">Email:</span><span id="email"> contact@boofey.app</span></h6>
                                <h6><span class="text-muted fw-normal">Website:</span> <a href="https://boofey.app/" class="link-primary" target="_blank" id="website"> www.boofey.app</a></h6>
                                <h6 class="mb-0"><span class="text-muted fw-normal">Contact No: </span><span id="contact-no"> +</span></h6>
                            </div>
                        </div>
                    </div> -->
                    <!--end card-header-->
                </div><!--end col-->
 


                  <div class="receipt">
                    <div class="receipt-header">
                      <h1>Boofey</h1>
                      <p><strong>Email : </strong> contact@boofey.app</p>
                      <p><strong>Website : </strong> contact@boofey.app</p>
                      <p><strong>Mobile : </strong> (966) 56 382 3920</p>
                      <p><strong>Date: </strong> January 1, 2023</p>
                    </div>
                    <hr>
                    <table class="table table-borderless">
                      <tbody class="list">
                        {#each order.order_items as item}
                        <tr class="">
                          <td>{item.qty}x</td>
                          <td>{item.product.name}</td>
                          <td class="text-end">{item.price * item.qty} SAR</td>
                        </tr>
                        {/each}
                    </tbody>
                    </table>
                    <hr>
                    <table class="me-auto table table-borderless">
                      <tbody class="list">
                        <tr class="">
                          <td>Sub Total</td>
                          <td class="text-end">{order.subtotal} SAR</td>
                        </tr>
                        <tr class="">
                          <td>Discount ({order.discount}%)</td>
                          <td class="text-end">-{order.discountCalculated} SAR</td>
                        </tr>
                        <tr class="">
                          <td>Estimated Tax ({order.tax}%)</td>
                          <td class="text-end">+{order.taxCalculated} SAR</td>
                        </tr>
                        <tr>
                          <td class="p-0">
                            <hr colspan="2">
                          </td>           
                          <td class="p-0">  
                          <hr colspan="2">
                          </td>                          
                        </tr>
                        <tr class="fw-bold">
                          <td >Total</td>
                          <td class="text-end">{order.total} SAR</td>
                        </tr>
                    </tbody>
                    </table>
                    <hr>
                    <p class="text-center  mt-2">{order.ref}</p>
                    <h5 class="text-center">THANK YOU!</h5>
                  </div>


                  

                <div class="col-lg-12" >
                        <div class="hstack gap-2 justify-content-end d-print-none mt-4">
                            <a href="javascript:window.print()" class="btn btn-info"><i class="ri-printer-line align-bottom me-1"></i> {translation.print[localStorage.getItem("language")]}</a>
                        </div>
                    </div>
                    <!--end card-body-->
                </div><!--end col-->
            </div><!--end row-->
        </div>

        <style>
            /* Add your CSS styles here */
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .receipt {
              /* border: 1px solid #ccc; */
              padding: 20px;
              max-width: 400px;
            }
            .receipt-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .receipt-items {
              border-top: 1px solid #ccc;
              margin-top: 20px;
              padding-top: 10px;
            }
            .item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            .item span {
              flex: 1;
            }
            .total {
              font-weight: bold;
              margin-top: 10px;
            }
          </style>