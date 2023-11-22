<script>
    export let title 
    export let id 
    let openBtn
    export function openCollapse(){
        openBtn.click()
    }
</script>


<div class="accordion">
    <div class="accordion-item text-body">
        <h2 class="accordion-header" id="headingOne" bind:this={openBtn}>
            <button class="accordion-button collapsed"  type="button" data-bs-toggle="collapse" data-bs-target="#{id}" aria-expanded="true" aria-controls="{id}"  >
                {title}
            </button>
        </h2>
        <div id="{id}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#default-accordion-example">
            <div class="accordion-body text-body">
                <slot />
            </div>
        </div>
    </div>
</div>
