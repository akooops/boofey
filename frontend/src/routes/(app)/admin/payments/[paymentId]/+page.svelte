<script>
    import ReceiptCard from '$lib/components/ReceiptCard.svelte';
    export let data 
    console.log(data.payment)
</script>

<ReceiptCard payment={data.payment}/>
