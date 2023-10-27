<script>
    import { page } from '$app/stores';

</script>

<svelte:head>
	<title>{$page.data.tabTitle} - boofey</title>
</svelte:head>

<slot />