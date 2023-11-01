<script>
    export let data
	import { onMount } from "svelte";
    import { goto } from '$app/navigation';

    let loaded = false
    onMount(async () => {
        if(data.userResponse.data.user.roles[0].name == "admin"){
            await goto("/admin")
        }
        loaded = true
    })
</script>
{#if loaded}
<h1>Dashboard Coming Soon</h1>
{/if}