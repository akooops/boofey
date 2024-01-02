<script>
    export let data
	import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import { initApp} from "$lib/init/initApp.js"
import {translation} from "$lib/translation.js"

    // import {windowScroll} from "$lib/landingInit.js"

    // let loaded = true
    // onMount(async () => {
    //     if(data.userResponse.data.user.roles[0].name.name == "admin"){
    //         await goto("/admin")
    //     }else{
    //         await goto("/students")
    //     }
    //     loaded = true
    // })

    onMount(() => {
        initApp(true)
    })

        $:userResponse = data.userResponse
        $:user = userResponse?.data?.user

</script>
<!-- {#if loaded}
<h1>Dashboard Coming Soon</h1>
{/if} -->


    <!-- Begin page -->
    <div class="layout-wrapper landing">
        <nav class="navbar navbar-expand-lg navbar-landing fixed-top is-sticky" id="navbar">
            <div class="container">
                <a class="navbar-brand" href="index.html">
                    <img src="/assets/images/logo.svg" class="card-logo card-logo-dark" alt="logo dark" height="20">
                    <img src="/assets/images/logo.svg" class="card-logo card-logo-light" alt="logo light" height="20">
                </a>
                <div class="d-flex">
                <div class="dropdown ms-1 topbar-head-dropdown d-lg-none header-item col-6">
                    <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img id="header-lang-img" src="/assets/images/flags/us.svg" alt="Header Language" height="20" class="rounded">
                    </button>
                    <div class="dropdown-menu dropdown-menu-end">
    
                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item language py-2" data-lang="en" title="English">
                            <img src="/assets/images/flags/us.svg" alt="user-image" class="me-2 rounded" height="18">
                            <span class="align-middle">English</span>
                        </a>
    
                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item language" data-lang="ar" title="Arabic">
                            <img src="/assets/images/flags/sa.svg" alt="user-image" class="me-2 rounded" height="18">
                            <span class="align-middle">العربية</span>
                        </a>
                    </div>
                </div>
                <button class="navbar-toggler border-0  py-0 fs-20 text-body col-6" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="mdi mdi-menu"></i>
                </button>
                </div>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mx-auto mt-2 mt-lg-0" id="navbar-example">
                        <li class="nav-item">
                            <a class="nav-link fs-15 active" href="#hero">{translation.home[localStorage.getItem("language")]}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link fs-15" href="#services">{translation.whyChooseBoofey[localStorage.getItem("language")]}</a>
                        </li>                    
                        <li class="nav-item">
                            <a class="nav-link fs-15" href="#faq">{translation.faq[localStorage.getItem("language")]}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link fs-15" href="#contact">{translation.contact[localStorage.getItem("language")]}</a>
                        </li>
                    </ul>
                    
                    <div class="">
                      
                        {#if userResponse}
                            <a href="{user.roles[0].name == "parent" ? "/students" : "/admin"}" data-sveltekit-reload  class="btn btn-primary">{translation.goToControl[localStorage.getItem("language")]}</a>
                        {:else}
                        <a href="/signin"  data-sveltekit-reload class="btn btn-primary">{translation.signIn[localStorage.getItem("language")]}</a>
                        <!-- <a href="/signup" data-sveltekit-reload  class="btn btn-primary">Sign Up</a> -->
                        {/if}
                    </div>

                    <div class="dropdown ms-1 topbar-head-dropdown header-item d-sm-none d-lg-flex">
                        <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img id="header-lang-img" src="/assets/images/flags/us.svg" alt="Header Language" height="20" class="rounded">
                        </button>
                        <div class="dropdown-menu dropdown-menu-end">
        
                            <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item notify-item language py-2" data-lang="en" title="English">
                                <img src="/assets/images/flags/us.svg" alt="user-image" class="me-2 rounded" height="18">
                                <span class="align-middle">English</span>
                            </a>
        
                            <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item notify-item language" data-lang="ar" title="Arabic">
                                <img src="/assets/images/flags/sa.svg" alt="user-image" class="me-2 rounded" height="18">
                                <span class="align-middle">العربية</span>
                            </a>
                        </div>
                    </div>
                </div>
                

            </div>
        </nav>
        <!-- end navbar -->
        <div class="vertical-overlay" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent.show"></div>

        <!-- start hero section -->
        <section class="section hero-section" id="hero">
            <div class="bg-overlay bg-overlay-pattern"></div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-sm-10">
                        <div class="text-center mt-lg-5 pt-5">
                            <h1 class="display-6 fw-semibold mb-3 lh-base">{@html translation.heroTitle[localStorage.getItem("language")]}</h1>
                            <p class="lead text-muted lh-base">{translation.heroSubTitle[localStorage.getItem("language")]}</p>

                            <div class="d-flex gap-2 justify-content-center mt-4">
                                {#if userResponse}
                                <a href="{user.roles[0].name == "parent" ? "/students" : "/admin"}" data-sveltekit-reload  class="btn btn-primary">{translation.goToControl[localStorage.getItem("language")]} <i class="{localStorage.getItem("language") == "en" ? "right" : "left"} align-middle ms-1"></i></a>
                                {:else}
                                <!-- <a href="/signup" data-sveltekit-reload  class="btn btn-primary">Get Started <i class="{localStorage.getItem("language") == "en" ? "right" : "left"} align-middle ms-1"></i></a> -->
                                <a href="/signin" data-sveltekit-reload  class="btn btn-primary">{translation.subscribeNow[localStorage.getItem("language")]} <i class="ri-arrow-{localStorage.getItem("language") == "en" ? "right" : "left"}-line align-middle ms-1"></i></a>
                                {/if}
                                <!-- <a href="pages-pricing.html" class="btn btn-danger">Contact <i class="ri-eye-line align-middle ms-1"></i></a> -->
                            </div>
                        </div>

                    </div>
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
            <!-- <div class="position-absolute start-0 end-0 bottom-0 hero-shape-svg">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                    <g mask="url(&quot;#SvgjsMask1003&quot;)" fill="none">
                        <path d="M 0,118 C 288,98.6 1152,40.4 1440,21L1440 140L0 140z">
                        </path>
                    </g>
                </svg>
            </div> -->
            <!-- end shape -->
        </section>
        <!-- end hero section -->

        <!-- start client section -->
        <!-- end client section -->

        <!-- start services -->
        <section class="section" id="services">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="text-center mb-5">
                            <h1 class="mb-3 ff-secondary fw-semibold lh-base">{translation.whyChooseBoofey[localStorage.getItem("language")]}</h1>
                          
                        </div>
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->

                <div class="row g-3">
         
                    <!-- end col -->
                    <div class="col-lg-3">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-restaurant-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">{translation.nutritionFirst[localStorage.getItem("language")]}</h5>
                                <p class="text-muted my-3 ff-secondary">{translation.nutritionFirstParagraph[localStorage.getItem("language")]}</p>
                                
                            </div>
                        </div>
                    </div>
                    <!-- end col -->
                    <div class="col-lg-3">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-truck-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">{translation.locallySourced[localStorage.getItem("language")]}</h5>
                                <p class="text-muted my-3 ff-secondary">{translation.locallySourcedParagraph[localStorage.getItem("language")]}</p>
                                
                            </div>
                        </div>
                    </div>
                    <!-- end col -->
                    <div class="col-lg-3">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-survey-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">{translation.tailoredMenus[localStorage.getItem("language")]}</h5>
                                <p class="text-muted my-3 ff-secondary">{translation.tailoredMenusParagraph[localStorage.getItem("language")]}</p>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-leaf-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">{translation.sustainability[localStorage.getItem("language")]}</h5>
                                <p class="text-muted my-3 ff-secondary">{translation.sustainabilityParagraph[localStorage.getItem("language")]}</p>
                                
                            </div>
                        </div>
                    </div>
                    <!-- end col -->

                    <!-- end col -->
                </div>


                <div class="row justify-content-center mt-4">
                    <div class="col-lg-8">
                        <div class="text-center mb-5">
                            <h1 class="mb-3 ff-secondary fw-semibold lh-base">{translation.easyOnlineSub[localStorage.getItem("language")]}</h1>
                          
                        </div>
                    </div>
                    <!-- end col -->
                </div>
                <div class="row g-3">
         
                    <!-- end col -->
                    <div class="col-lg-3">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-open-arm-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">{translation.convenientFlexible[localStorage.getItem("language")]}</h5>
                                <p class="text-muted my-3 ff-secondary">{translation.convenientFlexibleParagraph[localStorage.getItem("language")]}</p>
                                
                            </div>
                        </div>
                    </div>
                    <!-- end col -->
                    <div class="col-lg-3">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-price-tag-3-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">{translation.transparentPricing[localStorage.getItem("language")]}</h5>
                                <p class="text-muted my-3 ff-secondary">{translation.transparentPricingParagraph[localStorage.getItem("language")]}</p>
                                
                            </div>
                        </div>
                    </div>
                    <!-- end col -->
                    <div class="col-lg-3">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-bank-card-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">{translation.hasslePayment[localStorage.getItem("language")]}</h5>
                                <p class="text-muted my-3 ff-secondary">{translation.hasslePaymentParagraph[localStorage.getItem("language")]}</p>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-customer-service-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">{translation.stayInformed[localStorage.getItem("language")]}</h5>
                                <p class="text-muted my-3 ff-secondary">{translation.stayInformedParagraph[localStorage.getItem("language")]}</p>
                                
                            </div>
                        </div>
                    </div>
                    <!-- end col -->

                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </section>
        <!-- end services -->

        <!-- start features -->

        <!-- start cta -->
        <section class="py-5 bg-primary position-relative">
            <div class="bg-overlay bg-overlay-pattern opacity-50"></div>
            <div class="container">
                <div class="row align-items-center gy-4">
                    <div class="col-sm">
                        <div>
                            <h4 class="text-white mb-0 fw-semibold">{translation.ctaSentence[localStorage.getItem("language")]}</h4>
                        </div>
                    </div>
                    <!-- end col -->
                    <div class="col-sm-auto">
                        <div>
                            {#if userResponse}
                            <a href="{user.roles[0].name == "parent" ? "/students" : "/admin"}" data-sveltekit-reload class="btn bg-gradient btn-danger"><i class="{localStorage.getItem("language") == "en" ? "right" : "left"} align-middle me-1"></i> {translation.goToControl[localStorage.getItem("language")]}</a>

                            {:else}
                            <!-- <a href="/signup" data-sveltekit-reload class="btn bg-gradient btn-danger"><i class="{localStorage.getItem("language") == "en" ? "right" : "left"} align-middle me-1"></i> Get Started</a> -->
                            <a href="/signin" data-sveltekit-reload class="btn bg-gradient btn-danger"><i class="{localStorage.getItem("language") == "en" ? "right" : "left"} align-middle me-1"></i> {translation.subscribeNow[localStorage.getItem("language")]}</a>
                            {/if}
                        </div>
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </section>
        <!-- end cta -->

        <!-- start features -->


        <!-- start faqs -->
        <section class="section" id="faq">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="text-center mb-5">
                            <h3 class="mb-3 fw-semibold">{translation.faqLong[localStorage.getItem("language")]}</h3>
                            <p class="text-muted mb-4 ff-secondary">{translation.faqSubTitle[localStorage.getItem("language")]}</p>

                            <div class="hstack gap-2 justify-content-center">
                                <button type="button" class="btn btn-primary btn-label rounded-pill"><i class="ri-mail-line label-icon align-middle rounded-pill fs-16 me-2"></i> {translation.emailUs[localStorage.getItem("language")]}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end row -->

                <div class="row g-lg-5 g-4">
                    <div class="col-lg-6">
          
                        <div class="accordion custom-accordionwithicon custom-accordion-border accordion-border-box" id="genques-accordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="genques-headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseOne" aria-expanded="true" aria-controls="genques-collapseOne">
                                        {translation.typeOfMeals[localStorage.getItem("language")]}
                                    </button>
                                </h2>
                                <div id="genques-collapseOne" class="accordion-collapse collapse show" aria-labelledby="genques-headingOne" data-bs-parent="#genques-accordion">
                                    <div class="accordion-body ff-secondary">
                                        {translation.typeOfMealsAnswer[localStorage.getItem("language")]}
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="genques-headingTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseTwo" aria-expanded="false" aria-controls="genques-collapseTwo">
                                        {translation.ensureNutritiousMeals[localStorage.getItem("language")]}
                                    </button>
                                </h2>
                                <div id="genques-collapseTwo" class="accordion-collapse collapse" aria-labelledby="genques-headingTwo" data-bs-parent="#genques-accordion">
                                    <div class="accordion-body ff-secondary">
                                        {translation.ensureNutritiousMealsAnswer[localStorage.getItem("language")]}
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="genques-headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseThree" aria-expanded="false" aria-controls="genques-collapseThree">
                                        {translation.customizeMeals[localStorage.getItem("language")]}
                                    </button>
                                </h2>
                                <div id="genques-collapseThree" class="accordion-collapse collapse" aria-labelledby="genques-headingThree" data-bs-parent="#genques-accordion">
                                    <div class="accordion-body ff-secondary">
                                        {translation.customizeMealsAnswer[localStorage.getItem("language")]}
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="genques-headingFour">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseFour" aria-expanded="false" aria-controls="genques-collapseFour">
                                        {translation.ingredientsSource[localStorage.getItem("language")]}
                                    </button>
                                </h2>
                                <div id="genques-collapseFour" class="accordion-collapse collapse" aria-labelledby="genques-headingFour" data-bs-parent="#genques-accordion">
                                    <div class="accordion-body ff-secondary">
                                        {translation.ingredientsSourceAnswer[localStorage.getItem("language")]}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--end accordion-->

                    </div>
                    <!-- end col -->
                    <div class="col-lg-6">
                      

                        <div class="accordion custom-accordionwithicon custom-accordion-border accordion-border-box" id="privacy-accordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="privacy-headingOne">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacy-collapseOne" aria-expanded="false" aria-controls="privacy-collapseOne">
                                        {translation.foodAllergies[localStorage.getItem("language")]}
                                    </button>
                                </h2>
                                <div id="privacy-collapseOne" class="accordion-collapse collapse" aria-labelledby="privacy-headingOne" data-bs-parent="#privacy-accordion">
                                    <div class="accordion-body ff-secondary">
                                        {translation.foodAllergiesAnswer[localStorage.getItem("language")]}
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="privacy-headingTwo">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#privacy-collapseTwo" aria-expanded="true" aria-controls="privacy-collapseTwo">
                                        {translation.subPolicy[localStorage.getItem("language")]}
                                    </button>
                                </h2>
                                <div id="privacy-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="privacy-headingTwo" data-bs-parent="#privacy-accordion">
                                    <div class="accordion-body ff-secondary">
                                        {translation.subPolicyAnswer[localStorage.getItem("language")]}
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="privacy-headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacy-collapseThree" aria-expanded="false" aria-controls="privacy-collapseThree">
                                        {translation.foodSafety[localStorage.getItem("language")]}
                                    </button>
                                </h2>
                                <div id="privacy-collapseThree" class="accordion-collapse collapse" aria-labelledby="privacy-headingThree" data-bs-parent="#privacy-accordion">
                                    <div class="accordion-body ff-secondary">
                                        {translation.foodSafetyAnswer[localStorage.getItem("language")]}
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="privacy-headingFour">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacy-collapseFour" aria-expanded="false" aria-controls="privacy-collapseFour">
                                        {translation.feedBack[localStorage.getItem("language")]}
                                    </button>
                                </h2>
                                <div id="privacy-collapseFour" class="accordion-collapse collapse" aria-labelledby="privacy-headingFour" data-bs-parent="#privacy-accordion">
                                    <div class="accordion-body ff-secondary">
                                        {translation.feedBackAnswer[localStorage.getItem("language")]}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--end accordion-->
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </section>
        <!-- end faqs -->

        <!-- start review -->
        <!-- end review -->

        <!-- start counter -->
        <!-- <section class="py-5 position-relative bg-light">
            <div class="container">
                <div class="row text-center gy-4">
                    <div class="col-lg-3 col-6">
                        <div>
                            <h2 class="mb-2"><span class="counter-value" data-target="100">100</span>+</h2>
                            <div class="text-muted">Projects Completed</div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-6">
                        <div>
                            <h2 class="mb-2"><span class="counter-value" data-target="24">24</span></h2>
                            <div class="text-muted">Win Awards</div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-6">
                        <div>
                            <h2 class="mb-2"><span class="counter-value" data-target="20.3">20.3</span>k</h2>
                            <div class="text-muted">Satisfied Clients</div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-6">
                        <div>
                            <h2 class="mb-2"><span class="counter-value" data-target="50">50</span></h2>
                            <div class="text-muted">Employees</div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- start Work Process -->
        <section class="section" id="contact">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="text-center mb-5">
                            <h3 class="mb-3 fw-semibold">{translation.getInTouch[localStorage.getItem("language")]}</h3>
                        </div>
                    </div>
                </div>
                <!-- end row -->

                <div class="row text-center">
                    <div class="col-lg-12">
                        <div class="process-card ">
                            <div class="avatar-sm icon-effect mx-auto mb-4">
                                <div class="avatar-title bg-transparent text-success rounded-circle h1">
                                    <i class="ri-user-follow-line"></i>
                                </div>
                            </div>

                            <h5>{translation.email[localStorage.getItem("language")]}</h5>
                            <p class="text-muted ff-secondary">contact@boofey.app</p>
                        </div>
                    </div>
                    <!-- end col -->
                    <!-- <div class="col-lg-4">
                        <div class="process-card mt-4">
                            <div class="process-arrow-img d-none d-lg-block">
                                <img src="assets/images/landing/process-arrow-img.png" alt="" class="img-fluid">
                            </div>
                            <div class="avatar-sm icon-effect mx-auto mb-4">
                                <div class="avatar-title bg-transparent text-success rounded-circle h1">
                                    <i class="ri-phone-fill mt-3"></i>
                                </div>
                            </div>

                            <h5>Phone</h5>
                            <p class="text-muted ff-secondary">0000000000</p>
                        </div>
                    </div> -->
                    <!-- end col -->
                    <!-- <div class="col-lg-4">
                        <div class="process-card mt-4">
                            <div class="avatar-sm icon-effect mx-auto mb-4">
                                <div class="avatar-title bg-transparent text-success rounded-circle h1">
                                    <i class="ri-book-mark-line"></i>
                                </div>
                            </div>

                            <h5>Address</h5>
                            <p class="text-muted ff-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                    </div> -->
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </section>
        <footer class="pb-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center">
                            <p class="mb-0 text-muted">&copy;
                                {new Date().getFullYear()} {@html translation.crafted[localStorage.getItem("language")]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <!-- end Work Process -->

        <!-- start team -->
        <!-- end contact -->

        <!-- start cta -->
        <!-- <section class="py-5 bg-primary position-relative">
            <div class="bg-overlay bg-overlay-pattern opacity-50"></div>
            <div class="container">
                <div class="row align-items-center gy-4">
                    <div class="col-sm">
                        <div>
                            <h4 class="text-white mb-0 fw-semibold">subscribe to Boofey and bring daily nutritious delight to your child's school meals!</h4>
                        </div>
                    </div>
                    <div class="col-sm-auto">
                        <div>
                            {#if userResponse}
                            <a href="{user.roles[0].name == "parent" ? "/students" : "/admin"}" data-sveltekit-reload class="btn bg-gradient btn-danger"><i class="{localStorage.getItem("language") == "en" ? "right" : "left"} align-middle me-1"></i> Go To Control Panel</a>

                            {:else}
                            <a href="/signup" data-sveltekit-reload class="btn bg-gradient btn-danger"><i class="{localStorage.getItem("language") == "en" ? "right" : "left"} align-middle me-1"></i> Get Started</a>
                            <a href="/signin" data-sveltekit-reload class="btn bg-gradient btn-danger"><i class="{localStorage.getItem("language") == "en" ? "right" : "left"} align-middle me-1"></i> Subscribe Now</a>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <!--start back-to-top-->
        <button onclick="topFunction()" class="btn btn-danger btn-icon landing-back-top" id="back-to-top">
            <i class="ri-arrow-up-line"></i>
        </button>
        <!--end back-to-top-->

    </div>

    <!-- end layout wrapper -->


    <!-- JAVASCRIPT -->
    <!-- <script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="assets/libs/simplebar/simplebar.min.js"></script>
    <script src="assets/libs/node-waves/waves.min.js"></script>
    <script src="assets/libs/feather-icons/feather.min.js"></script>
    <script src="assets/js/pages/plugins/lord-icon-2.1.0.js"></script>
    <script src="assets/js/plugins.js"></script> -->

    <!--Swiper slider js-->
    <!-- <script src="assets/libs/swiper/swiper-bundle.min.js"></script> -->

    <!-- landing init -->
    <!-- <script src="assets/js/pages/landing.init.js"></script> -->
