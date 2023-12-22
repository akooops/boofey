<script>
    import {onMount} from "svelte"
    import {translation} from "$lib/translation.js"

    onMount(() => {

    })

</script>
<div class="auth-page-wrapper pt-5">
    <!-- auth page bg -->
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div class="bg-overlay" style="background:linear-gradient(to right,#e16f28,#e12828);"></div>

        <div class="shape">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
            </svg>
        </div>
    </div>

    <!-- auth page content -->
    <div class="auth-page-content">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="text-center mt-sm-5 mb-4 text-white-50">
                        <div>
                            <a href="index.html" class="d-inline-block auth-logo">
                                <img src="/assets/images/logo-white.svg" alt="" height="30">
                            </a>
                        </div>
                        <p class="mt-3 fs-15 fw-medium">{translation.bestSystem[localStorage.getItem("language")]}</p>
                    </div>
                </div>
            </div>
            <!-- end row -->

            <slot />
            <!-- end row -->
        </div>
        <!-- end container -->
    </div>
    <!-- end auth page content -->

    <!-- footer -->
    <footer class="footer">
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
    <!-- end Footer -->
</div>



<style>
    .auth-one-bg {
        background-image: url("/assets/images/cafeteria.jpg");
    }
</style>