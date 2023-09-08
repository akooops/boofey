<script>
    export let data

$: breaksList = data.breaksResponse.data.academicBreaks
$: year = data.breaksResponse.data.academicYear
$: school = year.school

let currentBadge = "badge bg-success-subtle text-success"
let notCurrentBadge = "badge bg-danger-subtle text-danger "
</script>


<div class="row">
    <div class="col-12">
        <div class="row">
            <div class="col-xl-3">
                <div class="card card-h-100">
                    <div class="card-body">
                        
                        <div class="card-body text-center">
                            <div class="avatar-md mb-3 mx-auto">
                                <img src={school.logo.full_path} alt="" i class="img-thumbnail rounded-circle shadow-none">
                            </div>
                            
                            <h4  class="mb-3">{school.name}</h4>

                            <p class="text-muted mb-1 fs-6">{year.from} &gt {year.to}</p>
                            
                                <div class="d-flex justify-content-center">
                                    <div class="me-2">
                                        <span class="{year.current ? currentBadge : notCurrentBadge}">{year.current ? "current" : "not current"}</span>
                                    </div>
                                    <p class="text-muted mb-0">{year.name}</p>
                                </div>

                            </div>
                        
                        <button class="btn btn-primary w-100" id="btn-new-event"><i class="mdi mdi-plus"></i> New Academic Break</button>
                    </div>
                </div>


                <div class="card">
                    <div class="card-body bg-info-subtle">
                        <div class="d-flex">
                            <div class="flex-shrink-0">
                                <i data-feather="calendar" class="text-info icon-dual-info"></i>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <h6 class="fs-15">Keep in mind!</h6>
                                <p class="text-muted mb-0">Saturday and friday are considered as breaksby default</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--end card-->
            </div> <!-- end col-->

            <div class="col-xl-9">
                <div class="card card-h-100">
                    <div class="card-body">
                        <div id="calendar"></div>
                    </div>
                </div>
            </div><!-- end col -->
        </div>
        <!--end row-->
    </div>
</div> <!-- end row-->
