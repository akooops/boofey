<script>
    export let title 
    export let value
    export let percentageDiff
    export let increase
    export let symbol = ""
    export let icon = ""

</script>
<div class="col-xl-3 col-md-6">
    <!-- card -->
    <div class="card card-animate">
        <div class="card-body">
            <div class="d-flex align-items-center">
                <div class="flex-grow-1 overflow-hidden">
                    <p class="text-uppercase fw-medium text-muted text-truncate mb-0"> {title}</p>
                </div>
                <div class="flex-shrink-0">
                    {#if increase == "decrease"}
                    <h5 class="text-danger fs-14 mb-0">
                        <i class="ri-arrow-right-down-line fs-13 align-middle"></i> {percentageDiff} %
                    </h5>
                    {:else}
                    <h5 class="text-success fs-14 mb-0">
                        <i class="ri-arrow-right-up-line fs-13 align-middle"></i> {percentageDiff} %
                    </h5>
                    {/if}
                    
                </div>
            </div>
            <div class="d-flex align-items-end justify-content-between mt-4">
                <div>
                    <h4 class="fs-22 fw-semibold ff-secondary"><span class="counter-value" data-target="{value}">0</span> {symbol}</h4>
                </div>
                <div class="avatar-sm flex-shrink-0">
                    <span class="avatar-title bg-primary-subtle rounded fs-3">
                        <i class="bx {icon} text-primary"></i>
                    </span>
                </div>
            </div>
        </div><!-- end card body -->
    </div><!-- end card -->
</div><!-- end col -->