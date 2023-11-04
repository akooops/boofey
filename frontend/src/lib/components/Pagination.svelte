<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import {translation} from "$lib/translation.js"

    export let total 
    export let pages
    export let current_page = 1
    export let last_page
    export let from 
    export let to 


    function switchPage(pageTarget){
        const url = new URL($page.url);
        url.searchParams.set("page",pageTarget)
        goto(url);
    }

</script>


<div class="row mt-4 align-items-center flex-wrap">
    <div class="col-sm-12 col-md-6">
        <p >{translation.showing[localStorage.getItem("language")]} <span class="fw-bold">{from}</span> {translation.to[localStorage.getItem("language")]} <span class="fw-bold">{to}</span> {translation.of[localStorage.getItem("language")]} <span class="fw-bold">{total}</span> {translation.results[localStorage.getItem("language")]}</p>
    </div>
    <div class="col-sm-12 col-md-6  ">
    <nav>
        <ul class="pagination justify-content-md-end justify-content-sm-start pagination-separated pagination-sm">
            <li class="page-item" class:disabled={current_page == 1}><a class="page-link ms-0" on:click={() => switchPage(current_page - 1)} href="#">{translation.previous[localStorage.getItem("language")]}</a></li>
            {#each pages as page,i}
                <li class="page-item" class:active={current_page == i+1}><a class="page-link" on:click={() => switchPage(page)} href="#">{page}</a></li>
            {/each}
            <li class="page-item" class:disabled={current_page == last_page}><a class="page-link" on:click={() => switchPage(current_page + 1)} href="#">{translation.next[localStorage.getItem("language")]}</a></li>
        </ul>
    </nav>
</div>
</div>