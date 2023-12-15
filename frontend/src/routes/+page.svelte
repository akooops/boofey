<script>
    export let data
	import { onMount } from "svelte";
    import { goto } from '$app/navigation';
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
                <button class="navbar-toggler py-0 fs-20 text-body" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="mdi mdi-menu"></i>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mx-auto mt-2 mt-lg-0" id="navbar-example">
                        <li class="nav-item">
                            <a class="nav-link fs-15 active" href="#hero">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link fs-15" href="#services">Services</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link fs-15" href="#faq">FAQ</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link fs-15" href="#contact">Contact</a>
                        </li>
                    </ul>

                    <div class="">
                        {#if userResponse}
                            <a href="{user.roles[0].name == "parent" ? "/students" : "/admin"}" data-sveltekit-reload  class="btn btn-primary">Go To Control Panel</a>
                        {:else}
                        <a href="/signin"  data-sveltekit-reload class="btn btn-link fw-medium text-decoration-none text-body">Sign in</a>
                        <!-- <a href="/signup" data-sveltekit-reload  class="btn btn-primary">Sign Up</a> -->
                        {/if}
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
                            <h1 class="display-6 fw-semibold mb-3 lh-base">Boofey <span class="text-primary">Nourishing</span> the Next Generation </h1>
                            <p class="lead text-muted lh-base">Our mission is simple: to transform school canteens into hubs of nutrition and taste. We partner with schools to provide students with meals that are not just satisfying, but also nourishing and balanced.</p>

                            <div class="d-flex gap-2 justify-content-center mt-4">
                                {#if userResponse}
                                <a href="{user.roles[0].name == "parent" ? "/students" : "/admin"}" data-sveltekit-reload  class="btn btn-primary">Go To Control Panel <i class="ri-arrow-right-line align-middle ms-1"></i></a>
                                {:else}
                                <!-- <a href="/signup" data-sveltekit-reload  class="btn btn-primary">Get Started <i class="ri-arrow-right-line align-middle ms-1"></i></a> -->
                                <a href="/signin" data-sveltekit-reload  class="btn btn-primary">Subscribe Now <i class="ri-arrow-right-line align-middle ms-1"></i></a>
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
                            <h1 class="mb-3 ff-secondary fw-semibold lh-base">Why Choose Boofey?</h1>
                          
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
                                <h5 class="fs-18">Nutrition First</h5>
                                <p class="text-muted my-3 ff-secondary">Our menus are crafted by nutrition experts, ensuring each meal is a balanced blend of essential nutrients.</p>
                                
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
                                <h5 class="fs-18">Locally Sourced</h5>
                                <p class="text-muted my-3 ff-secondary">We believe in supporting our community. That's why we source fresh, seasonal ingredients from local farmers and suppliers.</p>
                                
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
                                <h5 class="fs-18">Tailored Menus</h5>
                                <p class="text-muted my-3 ff-secondary">Understanding diverse tastes and dietary needs, we offer a range of options and choices.</p>
                                
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
                                <h5 class="fs-18">Sustainability Commitment</h5>
                                <p class="text-muted my-3 ff-secondary">We're dedicated to eco-friendly practices, reducing waste, and promoting sustainability in all our operations.</p>
                                
                            </div>
                        </div>
                    </div>
                    <!-- end col -->

                    <!-- end col -->
                </div>


                <div class="row justify-content-center mt-4">
                    <div class="col-lg-8">
                        <div class="text-center mb-5">
                            <h1 class="mb-3 ff-secondary fw-semibold lh-base">Easy Online Subscription for Parents</h1>
                          
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
                                <h5 class="fs-18">Convenient & Flexible</h5>
                                <p class="text-muted my-3 ff-secondary">Subscribe to our meal plans easily through our online portal. Choose a package that fits your child's needs and schedule.</p>
                                
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
                                <h5 class="fs-18">Transparent Pricing</h5>
                                <p class="text-muted my-3 ff-secondary">Clear, upfront pricing with no hidden fees. Pick the plan that works best for your budget.</p>
                                
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
                                <h5 class="fs-18">Hassle-Free Payments</h5>
                                <p class="text-muted my-3 ff-secondary">Secure and straightforward payment process, with options for customization and changes as needed.</p>
                                
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
                                <h5 class="fs-18">Stay Informed</h5>
                                <p class="text-muted my-3 ff-secondary">Receive regular updates about menus, nutritional information, and special offers directly through the portal.</p>
                                
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
                            <h4 class="text-white mb-0 fw-semibold">subscribe to Boofey and bring daily nutritious delight to your child's school meals!</h4>
                        </div>
                    </div>
                    <!-- end col -->
                    <div class="col-sm-auto">
                        <div>
                            {#if userResponse}
                            <a href="{user.roles[0].name == "parent" ? "/students" : "/admin"}" data-sveltekit-reload class="btn bg-gradient btn-danger"><i class="ri-arrow-right-line align-middle me-1"></i> Go To Control Panel</a>

                            {:else}
                            <!-- <a href="/signup" data-sveltekit-reload class="btn bg-gradient btn-danger"><i class="ri-arrow-right-line align-middle me-1"></i> Get Started</a> -->
                            <a href="/signin" data-sveltekit-reload class="btn bg-gradient btn-danger"><i class="ri-arrow-right-line align-middle me-1"></i> Subscribe Now</a>
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
                            <h3 class="mb-3 fw-semibold">Frequently Asked Questions</h3>
                            <p class="text-muted mb-4 ff-secondary">If you can not find answer to your question in our FAQ, you can always contact us or email us. We will answer you shortly!</p>

                            <div class="hstack gap-2 justify-content-center">
                                <button type="button" class="btn btn-primary btn-label rounded-pill"><i class="ri-mail-line label-icon align-middle rounded-pill fs-16 me-2"></i> Email Us</button>
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
                                        What types of meal plans does Boofey offer?
                                    </button>
                                </h2>
                                <div id="genques-collapseOne" class="accordion-collapse collapse show" aria-labelledby="genques-headingOne" data-bs-parent="#genques-accordion">
                                    <div class="accordion-body ff-secondary">
                                        Boofey offers fixed, nutritious meal plans designed to cater to a variety of tastes.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="genques-headingTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseTwo" aria-expanded="false" aria-controls="genques-collapseTwo">
                                        How do you ensure meals are nutritious?
                                    </button>
                                </h2>
                                <div id="genques-collapseTwo" class="accordion-collapse collapse" aria-labelledby="genques-headingTwo" data-bs-parent="#genques-accordion">
                                    <div class="accordion-body ff-secondary">
                                        Our menus, crafted by nutrition experts, focus on balanced diets that provide essential nutrients for growing children.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="genques-headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseThree" aria-expanded="false" aria-controls="genques-collapseThree">
                                        Can I customize my child’s meals?
                                    </button>
                                </h2>
                                <div id="genques-collapseThree" class="accordion-collapse collapse" aria-labelledby="genques-headingThree" data-bs-parent="#genques-accordion">
                                    <div class="accordion-body ff-secondary">
                                        Our meal plans are fixed and cannot be customized to ensure consistency and efficiency in our meal preparation.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="genques-headingFour">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseFour" aria-expanded="false" aria-controls="genques-collapseFour">
                                        How are the ingredients sourced?
                                    </button>
                                </h2>
                                <div id="genques-collapseFour" class="accordion-collapse collapse" aria-labelledby="genques-headingFour" data-bs-parent="#genques-accordion">
                                    <div class="accordion-body ff-secondary">
                                        We prioritize locally sourced, seasonal ingredients to support our community and ensure freshness.
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
                                        What is the policy regarding food allergies?
                                    </button>
                                </h2>
                                <div id="privacy-collapseOne" class="accordion-collapse collapse" aria-labelledby="privacy-headingOne" data-bs-parent="#privacy-accordion">
                                    <div class="accordion-body ff-secondary">
                                        Parents are responsible for checking our fixed menus for potential allergens. We provide detailed menu information to assist parents in this process.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="privacy-headingTwo">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#privacy-collapseTwo" aria-expanded="true" aria-controls="privacy-collapseTwo">
                                        What is the subscription policy?
                                    </button>
                                </h2>
                                <div id="privacy-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="privacy-headingTwo" data-bs-parent="#privacy-accordion">
                                    <div class="accordion-body ff-secondary">
                                        Once a subscription starts, it cannot be cancelled, refunded, or paused. Missed days by the child are not subject to reimbursement.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="privacy-headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacy-collapseThree" aria-expanded="false" aria-controls="privacy-collapseThree">
                                        How is food safety managed in the canteens?
                                    </button>
                                </h2>
                                <div id="privacy-collapseThree" class="accordion-collapse collapse" aria-labelledby="privacy-headingThree" data-bs-parent="#privacy-accordion">
                                    <div class="accordion-body ff-secondary">
                                        Food safety is our top priority. We adhere to strict hygiene standards and conduct regular safety audits.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="privacy-headingFour">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#privacy-collapseFour" aria-expanded="false" aria-controls="privacy-collapseFour">
                                        How do I provide feedback or suggestions?
                                    </button>
                                </h2>
                                <div id="privacy-collapseFour" class="accordion-collapse collapse" aria-labelledby="privacy-headingFour" data-bs-parent="#privacy-accordion">
                                    <div class="accordion-body ff-secondary">
                                        We welcome feedback and suggestions! Please contact us through our website or the parent portal.
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
                            <h3 class="mb-3 fw-semibold">Get In Touch</h3>
                            <p class="text-muted mb-4 ff-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do..</p>
                        </div>
                    </div>
                </div>
                <!-- end row -->

                <div class="row text-center">
                    <div class="col-lg-12">
                        <div class="process-card ">
                            <div class="process-arrow-img d-none d-lg-block">
                                <img src="assets/images/landing/process-arrow-img.png" alt="" class="img-fluid">
                            </div>
                            <div class="avatar-sm icon-effect mx-auto mb-4">
                                <div class="avatar-title bg-transparent text-success rounded-circle h1">
                                    <i class="ri-user-follow-line"></i>
                                </div>
                            </div>

                            <h5>Email</h5>
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
                            <a href="{user.roles[0].name == "parent" ? "/students" : "/admin"}" data-sveltekit-reload class="btn bg-gradient btn-danger"><i class="ri-arrow-right-line align-middle me-1"></i> Go To Control Panel</a>

                            {:else}
                            <a href="/signup" data-sveltekit-reload class="btn bg-gradient btn-danger"><i class="ri-arrow-right-line align-middle me-1"></i> Get Started</a>
                            <a href="/signin" data-sveltekit-reload class="btn bg-gradient btn-danger"><i class="ri-arrow-right-line align-middle me-1"></i> Subscribe Now</a>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- Start footer -->
        <footer class="custom-footer bg-dark py-5 position-relative">
            <div class="container">


                <div class="row text-center text-sm-start align-items-center ">
                    <div class="col-sm-6">

                        <div>
                            <p class="copy-rights mb-0">
                               {new Date().getFullYear()} © Boofey
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="text-sm-end mt-3 mt-sm-0">
                            <ul class="list-inline mb-0 footer-social-link">
                                <li class="list-inline-item">
                                    <a href="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-facebook-fill"></i>
                                        </div>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-github-fill"></i>
                                        </div>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-linkedin-fill"></i>
                                        </div>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-google-fill"></i>
                                        </div>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-dribbble-line"></i>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <!-- end footer -->

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
