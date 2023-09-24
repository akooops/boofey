<script>
    export let src 
    export let name 
    export let category
</script>


<span>
    <div class="d-flex align-items-center">
        <div class="flex-shrink-0 me-3">
            <div class="avatar-sm bg-light rounded p-1">
                <img {src} alt="" class="img-fluid d-block">
            </div>
        </div>
        <div class="flex-grow-1">
            <h5 class="fs-14 mb-1">
                <a href="apps-ecommerce-product-details.html" class="text-body">{name}</a>
            </h5>
            <p class="text-muted mb-0">Category : <span class="fw-medium">{category == null ? "no category" : category}</span>
            </p>
        </div>
    </div>
</span>