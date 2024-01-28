import {translation} from "$lib/translation.js"

export const routes = [
    {
      path: /^\/schools\/\d+\/academicYears\/\d+\/academicBreaks$/,
      title: "AcademicBreaks",
      item: "AcademicYears",
      active: "AcademicBreaks",
      itemHref:(pathName) => {
        let parts = pathName.replace("/admin","").split("/")

        return `/schools/${parts[2]}/academicYears`
      } 
    },
    {
      path: /^\/canteens\/\d+\/queues$/,
      title: "Queues",
      item: "Canteens",
      active: "Queues",
      itemHref:() => "/canteens"
    },
    {
      path: /^\/canteens\/\d+\/qr-exit$/,
      title: "QR Exit",
      item: "Canteens",
      active: "Qr Exit",
      itemHref:() => "/canteens"
    },
    {
      path: /^\/canteens\/\d+\/queues\/\d+\/qr-exit$/,
      title: "Qr Exit",
      item: "Queues",
      active: "Qr exit",
      itemHref:(pathName) => {

        let parts = pathName.replace("/admin","").split("/")

        return `/canteens/${parts[2]}/queues/`

      }
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
      path: /^\/reports$/,
      title: "Reports",
      item: "Reports",
      active: "List",
    },
    {
      path: /^\/reports\/todaySubscribers$/,
      title: "Today Subscribers",
      item: "Reports",
      active: "Today Subscribers",
    },
    {
      path: /^\/reports\/todaySubscribers\/\d+$/,
      title: "Today Subscribers",
      item: "Reports",
      active: "Today Subscribers",
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
      itemHref:() => "/orders"

    },
    {
      path: /^\/orders\/\d+\/edit$/,
      title: "Edit",
      item: "Orders",
      active: "Edit",
      itemHref:() => "/orders"
    },
    {
      path: /^\/orders\/\d+$/,
      title: "Orders",
      item: "Orders",
      active: "View",
      itemHref:() => "/orders"
    },
    {
      path: /^\/payments\/\d+$/,
      title: "Payment Details",
      item: "Subscriptions",
      active: "Payment",
    },
    {
      path: /^\/packages$/,
      title: "Packages",
      item: "Packages",
      active: "List",
    },
    {
      path: /^\/subscriptions$/,
      title: translation.subs[localStorage.getItem("language")],
      item: translation.subs[localStorage.getItem("language")],
      active: translation.list[localStorage.getItem("language")],
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
      path: /^\/canteens\/\d+\/queues\/\d+\/queueStudents$/,
      title: "Queue's Students",
      item: "Queues",
      active: "Students",
      itemHref:(pathName) => {
        let parts = pathName.replace("/admin","").split("/")

        return parts.slice(0, -2).join('/');
      } 

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
      itemHref:() => "/schools"
    },
    {
      path: /^\/schools\/\d+\/canteens$/,
      title: "Canteens",
      item: "Schools",
      active: "Canteens",
      itemHref:() => "/schools"
    },
    {
      path: /^\/schools\/\d+\/packages$/,
      title: "Packages",
      item: "Schools",
      active: "Packages",
      itemHref:() => "/schools"

    },
    {
      path: /^\/schools\/\d+\/students$/,
      title: "School's Students",
      item: "Schools",
      active: "Students",
      itemHref:() => "/schools"

    },
    {
      path: /^\/students$/,
      title: translation.students[localStorage.getItem("language")],
      item: translation.students[localStorage.getItem("language")],
      active: translation.list[localStorage.getItem("language")],
    },
    {
      path: /^\/students\/\d+$/,
      title: "Students",
      item: "Students",
      active: null,
      itemHref:() => "/students"
    },
    {
      path: /^\/users$/,
      title: "Users",
      item: "Users",
      active: "List",
    },
    {
      path: /^\/users\/\d+\/canteens$/,
      title: "User's Canteens",
      item: "Users",
      active: "Canteens",
      itemHref:() => "/users"

    },
    {
      path: /^\/paymentMethods$/,
      title: translation.paymentMethods[localStorage.getItem("language")],
      item: translation.paymentMethods[localStorage.getItem("language")],
      active: translation.list[localStorage.getItem("language")],
    },
    {
      path: /^\/paymentMethods\/add$/,
      title: translation.addPaymentMethod[localStorage.getItem("language")],
      item: translation.paymentMethods[localStorage.getItem("language")],
      active: translation.add[localStorage.getItem("language")],
      itemHref:() => "/paymentMethods"
    },
    {
      path: /^\/profile$/,
      title: translation.profile[localStorage.getItem("language")],
      item: translation.user[localStorage.getItem("language")],
      active: translation.profile[localStorage.getItem("language")],
    },
    {
      path: /^\/profile\/settings$/,
      title: translation.settings[localStorage.getItem("language")],
      item: translation.profile[localStorage.getItem("language")],
      active: translation.settings[localStorage.getItem("language")],
      itemHref:() => "/profile"
    },
    {
      path: /^\/students\/\d+\/subscriptions$/,
      title: translation.subscription[localStorage.getItem("language")],
      item: translation.students[localStorage.getItem("language")],
      active: translation.subscription[localStorage.getItem("language")],
      itemHref:() => "/students",
    },
    {
      path: /^\/students\/\d+\/choosePackage$/,
      title: translation.packages[localStorage.getItem("language")],
      item: translation.students[localStorage.getItem("language")],
      active: translation.subscribe[localStorage.getItem("language")],
      itemHref:() => "/students"
    },
    {
      path: /^\/students\/\d+\/checkout$/,
      title: translation.checkOut[localStorage.getItem("language")],
      item: translation.students[localStorage.getItem("language")],
      active: translation.subscribe[localStorage.getItem("language")],
      itemHref:() => "/students"
    },
    {
      path: /^\/students\/\d+\/cart$/,
      title: "Cart",
      item: "Students",
      active: "Subscribe",
      itemHref:() => "/students"

    },
    {
      path: /^\/invoices\/\d+$/,
      title: translation.invoiceDetails[localStorage.getItem("language")],
      item: translation.invoices[localStorage.getItem("language")],
      active: translation.details[localStorage.getItem("language")],
    },
    {
      path: /^\/invoices$/,
      title: translation.invoices[localStorage.getItem("language")],
      item: translation.invoices[localStorage.getItem("language")],
      active: "List",
    },
    {
      path: /^\/payments$/,
      title: translation.payments[localStorage.getItem("language")],
      item: translation.payments[localStorage.getItem("language")],
      active: translation.list[localStorage.getItem("language")],
    }
  ];

  export const states = [
    {
      "name_ar": "منطقة الرياض",
      "name_en": "Riyadh",
    },
    {
      "name_ar": "منطقة مكة المكرمة",
      "name_en": "Makkah",
    },
    {
      "name_ar": "منطقة المدينة المنورة",
      "name_en": "Madinah",
    },
    {
      "name_ar": "منطقة القصيم",
      "name_en": "Qassim",
    },
    {
      "name_ar": "المنطقة الشرقية",
      "name_en": "Eastern Province",
    },
    {
      "name_ar": "منطقة عسير",
      "name_en": "Asir",
    },
    {
      "name_ar": "منطقة تبوك",
      "name_en": "Tabuk",
    },
    {
      "name_ar": "منطقة حائل",
      "name_en": "Hail",
    },
    {
      "name_ar": "منطقة الحدود الشمالية",
      "name_en": "Northern Borders",
    },
    {
      "name_ar": "منطقة جازان",
      "name_en": "Jazan",
    },
    {
      "name_ar": "منطقة نجران",
      "name_en": "Najran",
    },
    {
      "name_ar": "منطقة الباحة",
      "name_en": "Bahah",
    },
    {
      "name_ar": "منطقة الجوف",
      "name_en": "Jawf",
    }
  ]