<script>
	import { page } from '$app/stores';
    import E404 from '$lib/pages/E404.svelte';
    import E500 from '$lib/pages/E500.svelte';

</script>

<svelte:head>
	<title>{$page.status == 404 ? "Page not Found 404" : "Internal error 500"} - boofey</title>
</svelte:head>

{#if $page.status == 404}
<E404 />
{:else if $page.status == 500}
<E500 />
{/if}
