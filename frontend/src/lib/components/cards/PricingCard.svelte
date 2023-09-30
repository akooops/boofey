<script>
import { goto } from '$app/navigation';


export let packageObj
export let studentId

function choose() {
    goto(`/students/${studentId}/checkout?package=${packageObj.id}`)
}

</script>


<div class="col-lg-4">
    <div class="card pricing-box {packageObj.popular ? "ribbon-box right" : ""}">
        <div class="card-body p-4 m-2 ">
            {#if packageObj.popular}
                <div class="ribbon-two ribbon-two-danger"><span>Popular</span></div>
            {/if}
            <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                    <h5 class="mb-1 fw-semibold">{packageObj.name}</h5>
                    <p class="text-muted mb-0">{packageObj.description}</p>
                </div>
            </div>
            <div class="pt-4">
                <h2>{packageObj.currentPrice}<sup><small>SAR</small></sup> <span class="fs-13 text-muted">{packageObj.yearly ? "" : `/ ${packageObj.days} Days`}</span></h2>
            </div>
            <hr class="my-4 text-muted">
            <div>
                <ul class="list-unstyled text-muted vstack gap-3">
                    {#each packageObj.package_features as feature}
                    <li>
                        <div class="d-flex">
                            {#if feature.checked}
                            <div class="flex-shrink-0 text-success me-1">
                                <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                            </div>
                            {:else}
                            <div class="flex-shrink-0 text-danger me-1">
                                <i class="ri-close-circle-fill fs-15 align-middle"></i>
                            </div>
                            {/if}

                            <div class="flex-grow-1">
                               { feature.name}
                            </div>
                        </div>
                    </li>    
                    {/each}
                </ul>
                <div class="mt-4">
                    <a href="javascript:void(0);" class="btn w-100 waves-effect waves-light {!packageObj.popular ? "btn-soft-info" : "btn-info"}" on:click={choose}>Choose</a>
                </div>
            </div>
        </div>
    </div>
</div>