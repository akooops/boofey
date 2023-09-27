<script>
import PersonalDetails from "./PersonalDetails.svelte"
import ChangePassword from "./ChangePassword.svelte"

export let data
$: user = data.profileResponse.data.user
</script>

    <div class="position-relative mx-n4 mt-n4">
        <div class="profile-wid-bg profile-setting-img">
        </div>
    </div>

    <div class="row">
        <!-- <div class="col-xxl-3">
            <div class="card mt-n5">
                <div class="card-body p-4">
                    
                </div>
            </div>

        </div> -->
        <!--end col-->
        <div class="">
            <div class="card mt-xxl-n5">
                <div class="card-header">
                    <ul class="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-bs-toggle="tab" href="#personalDetails" role="tab">
                                <i class="fas fa-home"></i> Personal Details
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#changePassword" role="tab">
                                <i class="far fa-user"></i> Change Password
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="card-body p-4">
                    <div class="tab-content">
                        <PersonalDetails {user}/>
                        <ChangePassword/>
                        <!--end tab-pane-->

                        <!--end tab-pane-->
                    </div>
                </div>
            </div>
        </div>
        <!--end col-->
    </div>
    <!--end row-->
