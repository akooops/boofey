<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    export let type
    let searchQuery = ""

    function search(){
        if(searchQuery == ""){
            const url = new URL($page.url);
            url.searchParams.delete("search")
            url.searchParams.delete("page")
            goto(url)
            return;
        }
        goto(`?search=${searchQuery}`);
    }

    function initSearchQuery(){
        searchQuery = $page.url.searchParams.get("search") ? $page.url.searchParams.get("search") : "" 
    }

</script>

<div class="row mb-4">
    <div class="col-xxl-3 col-md-6 col-sm-6 col-9">
        <div class="form-icon">
            <input type="email" use:initSearchQuery class="form-control form-control-icon" id="iconInput" placeholder="Search for {type}..." bind:value={searchQuery}>
            <i class="ri-search-line"></i>
        </div>
    </div>
    <div class="col-xxl-9 col-md-6 col-sm-6 col-3 ps-0">
        <button class="btn btn-primary" type="button" on:click={search}>Search</button>
    </div>
</div>
