<script>
    import IdCard from "./IdCard.svelte"
    import { goto } from '$app/navigation';
    import {translation} from "$lib/translation.js"


    export let data
$: user = data.profileResponse.data.user

function settings(){
    goto("/profile/settings")
}

</script>


<div class="profile-foreground position-relative mx-n4 mt-n4">
    <div class="profile-wid-bg" >
        <!-- <img src="assets/images/profile-bg.jpg" alt="" class="profile-wid-img" /> -->
    </div>
</div>
<div class="pt-5   profile-wrapper">
    <div class="row g-4">
        <div class="col-auto">
            <!-- <div class="avatar-lg">
                <img src={user?.profile?.image?.full_path} alt="user-img" class="img-thumbnail rounded-circle" />
            </div> -->
            <div class="profile-user position-relative d-inline-block mx-auto">
                <img src={user?.profile?.image?.full_path} class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image">
            </div>

        </div>
        <!--end col-->
        <div class="col align-self-center">
            <div class="">
                <h3 class="text-white mb-1">{user?.profile.fullname}</h3>
                <p class="text-white text-opacity-75">{user?.roles[0]?.name}</p>
            </div>
        </div>

        <!--end col-->

    </div>
    <!--end row-->
</div>

<div class="row">
    <div class="col-lg-12">
        <div>
            <div class="d-flex profile-wrapper justify-content-end">
                <a on:click={settings} href="javascript:void(0);" class="btn btn-info"><i class="ri-edit-box-line align-bottom"></i> {translation.editProfile[localStorage.getItem("language")]}</a>
            </div>
            <!-- Tab panes -->
            <div class="tab-content pt-4 text-muted">
                <div class="tab-pane active" id="overview-tab" role="tabpanel">
                    <div class="row">
                        <div class="col-xxl-3">
                          

                           <IdCard {user}/>

                            <!--end card-->
                        </div>
                        <!--end col-->
                        <div class="col-xxl-9">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title mb-3 text-primary">{translation.about[localStorage.getItem("language")]}</h5>
                                    {#if user?.profile?.description}
                                        <p>{user?.profile?.description}</p>
                                    {:else}
                                    <div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert">
                                        <i class="ri-airplay-line me-3 align-middle"></i><strong>{translation.noDescription[localStorage.getItem("language")]}</strong> - {translation.youCanAddDescription[localStorage.getItem("language")]} 
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                            
                                    {/if}
                                </div>
                                <!--end card-body-->
                            </div><!-- end card -->
                        </div>
                        <!--end col-->
                    </div>
                    <!--end row-->
                </div>
                <!--end tab-pane-->
            </div>
            <!--end tab-content-->
            
        </div>
    </div>
    <!--end col-->
</div>
<!--end row-->

<style>

.profile-wid-bg:before {
    background:linear-gradient(to top,#ff4141,#ff7f41) !important;
}

</style>

