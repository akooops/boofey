
<script>
import { getContext } from "svelte"
let isCopied = false
let {apiStore} = getContext("apiStore")


let animationValue = "iOwqS7PMGO2kNNRh9UE8wvOWbZTmoMYAblxqVOfxCHweUaVKrXwucPa24LR7iQLu"
function copyApiKey(){
    if(isCopied) return;
    navigator.clipboard.writeText($apiStore);
    
    isCopied = true;
    setTimeout(() => {
        isCopied = false;
    }, 1000); 
}

function reset(){
    $apiStore = ""
}
let currentIndex = 0
function getNextApi() {
  if($apiStore != ""){
    clearInterval(intervalId)
  }
  animationValue = ApisList[currentIndex]; // Get the current API
  currentIndex = (currentIndex + 1) % ApisList.length; // Move to the next index cyclically
}



let ApisList = [
    "6uRnGDARwml6k1PAEQHANUy8uIdUCPDno4qwmHWsCOcbxdR8wnx5TXKBFD2IZHW3",
    "37rE1nuNhGvWdmZrQBLCL4SMmvwyb1EtQU14olT7YbRI3fCncTkaeeL4quRuJepZ",
    "kVt5RQY9U36YaK7o13B1eSRLxL0MkM3E3GqMarI5T2KIErnl7B2jAQfDQdyRPphv",
    "GddXC74VlhTYS2jURTEYD5cmZ06YYGDnutAOeLL38FbtgOFn4RJuboEkvT7687vT",
    "6FkgVZruKZXIathOhd8XPWIvkJAXskKCgM1dPhuRSXAEJjKSJcWXejLb0y1uxcRg",
    "xiz0V9pJAimbVBK1Qc7nZsWgeoHK8YrDhPIQlNQefU222Lzr4uPLfCvLBgBTunmB",
    "d83Lo4u4pKxJ1SScxkketuKlif2IPmZ9ijOk1Hv90LaIaxUZyjLdXGfwiZ3AfsUl",
    "tP7CKy75ewajzAON7geWgVIgMVsjz8JPz7B3vGL9evmeixZvNsYd74ZYzyxRpYVv",
    "HRvB4x4Al8Fz49U8HWnvyEIl81jAFidgD6XJROqfmCn0gj9cpwHGeM1B8RVvXAG8"
]

let intervalId

function startAnimation(){
    if($apiStore != "") return;
    intervalId = setInterval(getNextApi, 1);
}

</script>


<div class="modal  fade" id="ApiModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset} on:show.bs.modal={startAnimation}>
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">Canteen's API Key</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row g-3">

                            <div>
                                <label for="canteenName" class="form-label">Canteen API key</label>
                                <div class="input-group">
                                    {#if $apiStore == ""}                                    
                                    <input type="text" class="form-control text-primary" aria-label="APi key" disabled bind:value={animationValue}>
                                    {:else}
                                    <input type="text" class="form-control" aria-label="APi key" readonly bind:value={$apiStore}>
                                    {/if}

                                    <button type="button" class="btn btn-icon  waves-effect waves-light {isCopied ? "btn-success" : "btn-primary"}" disabled={$apiStore == ""} on:click={copyApiKey}>    
                                        {#if isCopied}
                                        <i class="ri-check-double-line"></i>
                                        {:else}
                                        <i class="ri-file-copy-line"></i>
                                        {/if}
                                    </button>

                                        <!-- <button type="button" class="btn btn-primary btn-label waves-effect waves-light" on:click={copyApiKey}> </button> -->

                                </div>
                            </div>
                     
                            <div>
                                <!-- Warning Alert -->
                                <div class="alert alert-warning alert-border-left alert-dismissible fade show" role="alert">
                                    <i class="ri-alert-line me-3 align-middle"></i>Please note that this API key cannot be retrieved once generated, so it's crucial to store it securely, preferably within an environment variable. Failing to do so may pose a risk of data leaks or unauthorized access to your sensitive information. Protect your API key like a digital key to your home.
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>

                            </div>
                            <div class="hstack gap-2 justify-content-end">
                                <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button>
                            </div>



                    </div><!--end row-->
                </form>
            </div>
        </div>
    </div>
</div>