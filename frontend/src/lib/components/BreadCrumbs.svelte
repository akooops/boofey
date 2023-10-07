<script>
import { page } from '$app/stores';  

let title 
let item 
let active 


const routes = [
  {
    path: /^\/academicYears\/\d+\/academicBreaks$/,
    title: "AcademicBreaks",
    item: "AcademicYears",
    active: "AcademicBreaks",
  },
  {
    path: /^\/canteens\/\d+\/queues$/,
    title: "Queues",
    item: "Canteens",
    active: "Queues",
  },
  {
    path: /^\/canteens$/,
    title: "Canteens",
    item: "Canteens",
    active: "List",
  },
  {
    path: /^\/categories$/,
    title: "Categories",
    item: "Categories",
    active: "List",
  },
  {
    path: /^\/coupons$/,
    title: "Coupons",
    item: "Coupons",
    active: "List",
  },
  {
    path: /^\/orders$/,
    title: "Orders",
    item: "Orders",
    active: "List",
  },
  {
    path: /^\/orders\/add$/,
    title: "Add",
    item: "Orders",
    active: "Add",
  },
  {
    path: /^\/orders\/\d+\/edit$/,
    title: "Edit",
    item: "Orders",
    active: "Edit",
  },
  {
    path: /^\/orders\/\d+$/,
    title: "Orders",
    item: "Orders",
    active: "View",
  },
  {
    path: /^\/packages$/,
    title: "Packages",
    item: "Packages",
    active: "List",
  },
  {
    path: /^\/parents$/,
    title: "Parents",
    item: "Parents",
    active: "List",
  },
  {
    path: /^\/permissions$/,
    title: "Permissions",
    item: "Permissions",
    active: "List",
  },
  {
    path: /^\/products$/,
    title: "Products",
    item: "Products",
    active: "List",
  },
  {
    path: /^\/qr-exit$/,
    title: "QR-Exit",
    item: "QR-Exit",
    active: null,
  },
  {
    path: /^\/queues\/\d+\/queueStudents$/,
    title: "QueueStudents",
    item: "Queues",
    active: "Students",
  },
  {
    path: /^\/roles$/,
    title: "Roles",
    item: "Roles",
    active: "List",
  },
  {
    path: /^\/schools$/,
    title: "Schools",
    item: "Schools",
    active: "List",
  },
  {
    path: /^\/schools\/\d+\/academicYears$/,
    title: "AcademicYears",
    item: "Schools",
    active: "AcademicYears",
  },
  {
    path: /^\/schools\/\d+\/canteens$/,
    title: "Canteens",
    item: "Schools",
    active: "Canteens",
  },
  {
    path: /^\/schools\/\d+\/packages$/,
    title: "Packages",
    item: "Schools",
    active: "Packages",
  },
  {
    path: /^\/students$/,
    title: "Students",
    item: "Students",
    active: "List",
  },
  {
    path: /^\/students\/\d+$/,
    title: "Students",
    item: "Students",
    active: null,
  },
  {
    path: /^\/users$/,
    title: "Users",
    item: "Users",
    active: "List",
  },
  {
    path: /^\/paymentMethods$/,
    title: "Payment Methods",
    item: "Payment Methods",
    active: "List",
  },
  {
    path: /^\/paymentMethods\/add$/,
    title: "Add Payment Method",
    item: "Payment Methods",
    active: "Add",
  },
  {
    path: /^\/profile\/settings$/,
    title: "Settings",
    item: "Profile",
    active: "settings",
  },
  {
    path: /^\/students\/\d+\/subscriptions$/,
    title: "Subscriptions",
    item: "Students",
    active: "Subscriptions",
  },
  {
    path: /^\/students\/\d+\/choosePackage$/,
    title: "Packages",
    item: "Students",
    active: "Subscribe",
  },
  {
    path: /^\/students\/\d+\/checkout$/,
    title: "Checkout",
    item: "Students",
    active: "Subscribe",
  },
  {
    path: /^\/students\/\d+\/cart$/,
    title: "Cart",
    item: "Students",
    active: "Subscribe",
  },
];

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