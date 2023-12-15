<script>
      import Pagination from "$lib/components/Pagination.svelte";

    import SearchTable from "$lib/components/SearchTable.svelte";

    import { goto } from '$app/navigation';
    import QueueCard from "./QueueCard.svelte";

   

    export let queuesList 
    export let activeQueue 
    export let canteen 
    export let queuesPagination

    let close
    let loading  = false

</script>

    
<div class="modal  fade" id="ViewAllQueuesModal" tabindex="-1"  data-bs-focus="false" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered modal-xl" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">Queues</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" >
                    {#if loading }
                    <div class="text-center">
                        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                    </div>
                    {/if}


                        <div class="row g-3">
                        <div class="col-lg-12">
                            
                    
                            <h4 class="card-title mb-0 flex-grow-1 mb-3">Active Queue Students</h4>
                    
                            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.index.simplified")}
                                {#if activeQueue}
                                <QueueCard {canteen}  queue={activeQueue} active={true}/>
                                    
                                {:else}
                                    <div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert">
                                        <i class="ri-airplay-line me-3 align-middle"></i> There are no <strong>Active Queues</strong> at the moment 
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    
                                {/if}
                            {/if}


                            <h4 class="card-title mb-0 flex-grow-1 mb-3">All queues</h4>

                            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.index.simplified")}
                        
                                    <div class="row">
                                        {#each queuesList as queue,_ (queue.id)}
                                            <QueueCard {canteen}  {queue} />
                                        {/each}
                                        <Pagination {...queuesPagination} />
                                    </div>
                            {/if}
                    

                            <div class="hstack gap-2 justify-content-end">
                                <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>Close</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

