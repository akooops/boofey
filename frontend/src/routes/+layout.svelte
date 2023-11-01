<script>
    import { page } from '$app/stores';
    import { browser } from '$app/environment';

</script>

<svelte:head>
        <title>{localStorage.getItem("language") == "ar" ?  `${$page.data.arTabTitle} - بووفي` : `${$page.data.tabTitle} - boofey`}</title>
</svelte:head>

<slot />