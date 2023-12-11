<script>
    export let orderItem 

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

</script>
<div class="card product">
    <div class="card-body">
        <div class="row gy-3">
            <div class="col-sm-auto">
                <div class="avatar-lg bg-light rounded p-1">
                    <img src={orderItem.product.image.full_path} alt="" class="img-fluid d-block">
                </div>
            </div>
            <div class="col-sm">
                <h5 class="fs-14 text-truncate"><a href="ecommerce-orderItem.product-detail.html" class="text-body">{orderItem.product.name}</a></h5>
                <ul class="list-inline text-muted">
                    <li class="list-inline-item">Category : <span class="fw-medium">{orderItem.product.category == null ? "no category" : orderItem.product.category.name}</span></li>
                </ul>
                <ul class="list-inline text-muted">
                    <li class="list-inline-item">Quantity : <span class="fw-medium">x{orderItem.qty}</span></li>
                </ul>
                
            </div>
            <div class="col-sm-auto">
                <div class="text-lg-end">
                    <p class="text-muted mb-1">Item Price:</p>
                    <h5 class="fs-14">{orderItem.product.currentPrice} SAR</h5>
                </div>
            </div>
        </div>
    </div>
    <!-- card body -->
    <div class="card-footer">
        <div class="row align-items-center gy-3">
            <div class="col-sm">
                <!-- <div class="d-flex flex-wrap my-n1">
                    <div>
                        <a href="#" class="d-block text-body p-1 px-2"><i class="ri-delete-bin-fill text-muted align-bottom me-1"></i> Remove</a>
                    </div>
                </div> -->
            </div>
            <div class="col-sm-auto">
                <div class="d-flex align-items-center gap-2 text-muted">
                    <div>Total :</div>
                    <h5 class="fs-14 mb-0">{orderItem.product.currentPrice*orderItem.qty} SAR</h5>
                </div>
            </div>
        </div>
    </div>
    <!-- end card footer -->
</div>