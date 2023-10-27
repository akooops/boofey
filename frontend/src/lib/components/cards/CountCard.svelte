<script>
    import { getContext } from "svelte"

     export let count
     export let title 
     
     export let symbol = ""
     export let icon = ""

     let counterValue = 0
    
     let interval; // Variable to store the interval

// Function to increment the count

function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
function updateCount() {
    let speed = 250
    var target = +count.value;
    var thisCount = +counterValue;
    var inc = target / speed;
    if (inc < 1) {
        inc = 1;
    }
    // Check if target is reached
    if (thisCount < target) {
        // Add inc to count and output in counter_value
        
        counterValue = (thisCount + inc).toFixed(0);
        // Call function every ms
        setTimeout(updateCount, 1);
    } else {
        counterValue = numberWithCommas(target);
    }
    numberWithCommas(counterValue);
}
    

  
        // Watch for changes in the 'value' prop
    $: {
        if (count.value !== undefined) {
            counterValue = 0; // Reset count to 0 when the 'value' prop changes
            updateCount()
        }
    }


</script>
<div class="col-xl-3 col-md-6 swiper-slide">
    <!-- card -->
    <div class="card card-animate">
        <div class="card-body">
            <div class="d-flex align-items-center">
                <div class="flex-grow-1 overflow-hidden">
                    <p class="text-uppercase fw-medium text-muted text-truncate mb-0"> {title}</p>
                </div>
                <div class="flex-shrink-0">
                    {#if count?.increase == "decrease"}
                    <h5 class="text-danger fs-14 mb-0">
                        <i class="ri-arrow-right-down-line fs-13 align-middle"></i> {count?.percentageDiff == null ? 0 : count.percentageDiff} %
                    </h5>
                    {:else}
                    <h5 class="text-success fs-14 mb-0">
                        <i class="ri-arrow-right-up-line fs-13 align-middle"></i> {count?.percentageDiff == null ? 0 : count.percentageDiff} %
                    </h5>
                    {/if}
                    
                </div>
            </div>
            <div class="d-flex align-items-end justify-content-between mt-4">
                <div>
                    
                    <h4 class="fs-22 fw-semibold ff-secondary"><span>{counterValue}</span>{symbol}</h4>
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