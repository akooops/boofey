<script>
    import ReceiptCard from '$lib/components/ReceiptCard.svelte';
    export let data 
</script>

<ReceiptCard invoice={data.invoice}/>
