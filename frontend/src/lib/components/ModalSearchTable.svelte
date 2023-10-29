<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { createEventDispatcher } from 'svelte';
    import {translation} from "$lib/translation.js"


    const dispatch = createEventDispatcher();
    export let type
    let searchQuery = ""

    function search(){
        dispatch("search",{searchQuery})
    }

    function enter(e){
        if (e.keyCode === 13) {
            search()
        }
    }

</script>

<div class="row mb-4">
    <div class="col-xxl-6 col-md-6 col-sm-6 col-9">
        <div class="form-icon">
            <input type="text" class="form-control form-control-icon" id="iconInput" on:keyup|preventDefault={enter} placeholder="{translation.searchFor[localStorage.getItem("language")]} {type}..." bind:value={searchQuery}>
            <i class="ri-search-line"></i>
        </div>
    </div>
    <div class="col-xxl-6 col-md-6 col-sm-6 col-3 ps-0">
        <button class="btn btn-primary" type="button" on:click={search}>{translation.searchBtn[localStorage.getItem("language")]}</button>
    </div>
</div>
