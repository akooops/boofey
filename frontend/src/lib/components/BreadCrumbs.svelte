<script>
import { page } from '$app/stores';  
import {routes} from "$lib/env.js"
let title 
let item 
let active 




function matchPathWithPatterns(currentPath) {
  for (const route of routes) {
    const { path, title, item, active } = route;
    if (currentPath.match(path)) {
      return { title, item, active };
    }
  }
  return null; // Return null if no match is found
}


page.subscribe(() => {


    let currentPath = $page.url.pathname.replace("/admin","")

    let matchedObject = matchPathWithPatterns(currentPath)
    if(matchedObject){
    title = matchedObject.title
    item = matchedObject.item
    active = matchedObject.active
}

})


</script>

<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0">{title}</h4>

            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="javascript: void(0);">{item}</a></li>
                    {#if active}
                    <li class="breadcrumb-item active">{active}</li>
                    {/if}
                </ol>
            </div>

        </div>
    </div>
</div>