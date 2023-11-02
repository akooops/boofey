<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import {translation} from "$lib/translation.js"

    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let type
    export let searchQuery = ""


    function enter(e){
        if (e.keyCode === 13) {
            search()
        }
    }

    function search(){
        dispatch("search",searchQuery)
    }



</script>

<div class="row mb-4">
    <div class="col-auto">
        <div class="form-icon">
            <input type="text"  class="form-control form-control-icon" id="iconInput" on:keyup|preventDefault={enter} placeholder="{translation.searchFor[localStorage.getItem("language")]} {type}..." bind:value={searchQuery}>
            <i class="ri-search-line"></i>
        </div>
    </div>
    <div class="col-auto ps-0">
        <button class="btn btn-primary" type="button" on:click={search}>{translation.searchBtn[localStorage.getItem("language")]}</button>
    </div>
</div>
