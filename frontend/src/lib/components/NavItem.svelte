<script>
    import { page } from '$app/stores';
    
    export let submenu

</script>

<li class="nav-item">
    <a class="nav-link menu-link" class:active={$page.url.pathname.includes(submenu.route)} href="{submenu.route}"  role="button" aria-expanded="false" >
        <i class="{submenu.icon}"></i> <span >{submenu.title}</span>
    </a>
</li>