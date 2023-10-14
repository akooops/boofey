<script>
	import { page } from '$app/stores';
    import E404 from '$lib/pages/E404.svelte';
    import E500 from '$lib/pages/E500.svelte';

</script>


{#if $page.status == 404}
<E404 />
{:else if $page.status == 500}
<E500 />
{/if}
