<script>
import ThermalPrinterEncoder from '$lib/ThermalEncoder.js';
// import ThermalPrinterEncoder from 'thermal-printer-encoder.esm.js';
import WebUSBReceiptPrinter from "$lib/WebUsbPrinter.js"
import {onMount} from "svelte"

    export let order
    let receiptPrinter


    function makeOrdersTable(){

        let orderItems = []
        orderItems.push([(encoder) => encoder.rule({ style: 'single' }),(encoder) => encoder.rule({ style: 'single' }),(encoder) => encoder.rule({ style: 'single' })])
        
        for(let orderItem of order.order_items){
            let row = [
                `${orderItem.qty}x`,
                (encoder) => encoder.line(`${orderItem.product.name}`).size("small").text(`${orderItem.product.category.name}`).size("normal"),
                `${orderItem.price * orderItem.qty} SAR`
            ]

            orderItems.push(row)

        }

        let table = {
            columns:[
                {  marginRight: 2, align: 'left' },
                {  align: 'left' },
                {  align: 'right' }
            ],
            rows:orderItems,
        }


        return table;
    }

    function makeOrderSummaryTable(){


        let table = {
            columns:[
                {  align: 'left' },
                {  align: 'right' }
            ],
            rows:[
                ["Sub Total :",`${order.subtotal} SAR`],
                [(encoder) => encoder.rule({ style: 'single' }),(encoder) => encoder.rule({ style: 'single' })],
                [`Discount (${order.discount}%) `,`-${order.discountCalculated} SAR`],
                [`Estimated Tax (${order.tax}%) :`,`+${order.taxCalculated} SAR`],
                [(encoder) => encoder.rule({ style: 'single' }),(encoder) => encoder.rule({ style: 'single' })],
                [(encoder) => encoder.bold().text("Total : ").bold(),(encoder) => encoder.bold().text(`${order.total} SAR`).bold()],
                [(encoder) => encoder.rule({ style: 'single' }),(encoder) => encoder.rule({ style: 'single' })],
            ],
        }


        return table;
    }

    function print(){
        console.log(order)
        let encoder = new ThermalPrinterEncoder({
            language: 'esc-pos'
        });

        let ordersTable = makeOrdersTable()
        let orderSummaryTable = makeOrderSummaryTable()

        let result = encoder
            .initialize()
            .line('Boofey')
            .line(`email: Boofey@Boofey.com`)
            .line(`phone: 05000000`)
            .rule({ style: 'single' })  
            .table(ordersTable.columns,ordersTable.rows)
            .rule({ style: 'single' })  
            .table(orderSummaryTable.columns,orderSummaryTable.rows)
            .align("center")
            .line("Thank You")
            .cut('partial')
            .encode();

        receiptPrinter.connect();


        receiptPrinter.print(result);

    }
    onMount(() => {
        receiptPrinter = new WebUSBReceiptPrinter();
    })


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
                                <td class="text-end" id="cart-subtotal">{order.subtotal} SAR</td>
                            </tr>
                            <tr>
                                <td>Discount <span class="text-muted">({order.discount}%)</span> : </td>
                                <td class="text-end" id="cart-discount">{order.discountCalculated} SAR</td>
                            </tr>
                            <tr>
                                <td>Estimated Tax ({order.tax}%) : </td>
                                <td class="text-end" id="cart-tax">{order.taxCalculated} SAR</td>
                            </tr>
                            <tr class="table-active">
                                <th>Total (SAR) :</th>
                                <td class="text-end">
                                    <span class="fw-semibold" id="cart-total">
                                        {order.total} SAR
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row g-3 mt-2 ">
                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-primary waves-effect waves-light" on:click={print}> <i class="ri-printer-line align-bottom me-1"></i> Print Order</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- end stickey -->

</div>