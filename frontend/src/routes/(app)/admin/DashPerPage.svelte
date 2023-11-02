
<script>


    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    let perPage = 10

    function changePerPage(amount){
        if(perPage == amount) return;
        perPage = amount
        dispatch("perPage",perPage)
    }

</script>

<div class="dropdown card-header-dropdown">
    <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="text-muted">Per Page : {perPage} <i class="mdi mdi-chevron-down ms-1"></i></span>
    </a>
    <div class="dropdown-menu dropdown-menu-end">
        <a class="dropdown-item" href="#" on:click={() => changePerPage(10)}>10</a>
        <a class="dropdown-item" href="#" on:click={() => changePerPage(25)}>25 </a>
        <a class="dropdown-item" href="#" on:click={() => changePerPage(50)}>50</a>
        <a class="dropdown-item" href="#" on:click={() => changePerPage(100)}>100</a>
        <a class="dropdown-item" href="#" on:click={() => changePerPage(250)}>250</a>

    </div>
</div>
