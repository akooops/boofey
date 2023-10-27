
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

<button type="button" class="btn btn-soft-info btn-sm" class:active={perPage == 10} on:click={() => changePerPage(10)}>
    10
</button>
<button type="button" class="btn btn-soft-info btn-sm" class:active={perPage == 25} on:click={() => changePerPage(25)}>
    25
</button>
<button type="button" class="btn btn-soft-info btn-sm" class:active={perPage == 50} on:click={() => changePerPage(50)}>
    50
</button>
<button type="button" class="btn btn-soft-info btn-sm" class:active={perPage == 100} on:click={() => changePerPage(100)}>
    100
</button>
<button type="button" class="btn btn-soft-info btn-sm" class:active={perPage == 250} on:click={() => changePerPage(250)}>
    250
</button>