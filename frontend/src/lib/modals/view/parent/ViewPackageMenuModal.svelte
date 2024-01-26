<script>
    import { getContext } from 'svelte';
    import {translation} from "$lib/translation.js"

    let {packageStore} = getContext("packageStore")
</script>

<div class="modal  fade" id="viewPackageMenuModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">{translation.checkMenu[localStorage.getItem("language")]}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
             
                {#if localStorage.getItem("language") == "en" && $packageStore.menu_en != null}
                    {@html $packageStore.menu_en}
                {/if}

                {#if localStorage.getItem("language") == "ar" && $packageStore.menu_ar != null}
                    {@html $packageStore.menu_ar}
                {/if}
            </div>
        </div>
    </div>
</div>