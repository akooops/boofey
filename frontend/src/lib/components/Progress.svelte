<script>
    export let now 
    export let max
    let bg = "bg-success"
    let color = "text-success"
    $: percentage = ((now * 100) / max)

    $: {
        if( percentage > 66.66 ){
            bg = "bg-success"
            color = "text-success"
        }else if (percentage < 33.33){
            bg = "bg-danger"
            color = "text-danger"
        }else {
            bg = "bg-warning"
            color = "text-warning"
        }
    }

</script>

<div class="d-flex gap-2 align-items-center">
    <div class="flex-grow-1">
            
        <div class="progress progress-sm progress-label animated-progress">
            <div class="progress-bar bg-gradient {bg}" role="progressbar"    style="width: {percentage}%"></div>
        </div>
    </div>
    <div class="flex-shrink-0">
        <span class="{color}">{now}</span>/{max}
    </div>

</div>
