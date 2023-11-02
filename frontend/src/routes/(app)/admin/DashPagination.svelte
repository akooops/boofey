<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let total 
    export let pages = []
    export let current_page = 1
    export let last_page
    export let from 
    export let to 


    function switchPage(pageTarget){
        if(pageTarget == current_page) return;
        dispatch("page",pageTarget)
    }

</script>


<div class="align-items-center  mt-4 justify-content-between d-flex ">
    <div class="flex-shrink-0">
        <div class="text-muted">Showing <span class="fw-semibold">{from}</span> to <span class="fw-semibold">{to}</span> of <span class="fw-semibold">{total}</span> results</div>
    </div>

    <ul class="pagination pagination-separated pagination-sm mb-0">
        <li class="page-item" class:disabled={current_page == 1}><a class="page-link" on:click={() => switchPage(current_page - 1)} href="#">←</a></li>
        {#each pages as page,i}
            <li class="page-item" class:active={current_page == i+1}><a class="page-link" on:click={() => switchPage(i+1)} href="#">{page}</a></li>
        {/each}
        <li class="page-item" class:disabled={current_page == last_page}><a class="page-link" on:click={() => switchPage(current_page + 1)} href="#">→</a></li>
    </ul>
</div>