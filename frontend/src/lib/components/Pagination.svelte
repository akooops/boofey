<script>

    export let total = 1
    export let pages
    export let current_page = 1


</script>


<div class="row mt-4">
    <nav>
        <ul class="pagination justify-content-end pagination-separated">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            {#each pages as page,i}
                <li class="page-item" class:active={current_page == i+1}><a class="page-link" href="#">{page}</a></li>
            {/each}
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
    </nav>
</div>