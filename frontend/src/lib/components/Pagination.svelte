<script>
    export let total 
    export let pages
    export let current_page = 1
    export let last_page
    export let from 
    export let to 

</script>


<div class="row mt-4 align-items-center">
    <div class="col-sm-12 col-md-6">
        <p >Showing <span class="fw-bold">{from}</span> to <span class="fw-bold">{to}</span> of <span class="fw-bold">{total}</span> results</p>
    </div>
    <div class="col-sm-12 col-md-6  ">
    <nav>
        <ul class="pagination justify-content-md-end justify-content-sm-start pagination-separated">
            <li class="page-item" class:disabled={current_page == 1}><a class="page-link" href="#">Previous</a></li>
            {#each pages as page,i}
                <li class="page-item" class:active={current_page == i+1}><a class="page-link" href="#">{page}</a></li>
            {/each}
            <li class="page-item" class:disabled={current_page == last_page}><a class="page-link" href="#">Next</a></li>
        </ul>
    </nav>
</div>
</div>