import {translation} from "$lib/translation.js"

export const routes = [
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
      title: translation.students[localStorage.getItem("language")],
      item: translation.students[localStorage.getItem("language")],
      active: translation.list[localStorage.getItem("language")],
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
      path: /^\/users\/\d+\/canteens$/,
      title: "User's Canteens",
      item: "Users",
      active: "Canteens",
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
      path: /^\/profile$/,
      title: "Profile",
      item: "User",
      active: "Profile",
    },
    {
      path: /^\/profile\/settings$/,
      title: "Settings",
      item: "Profile",
      active: "settings",
    },
    {
      path: /^\/students\/\d+\/subscriptions$/,
      title: translation.subscription[localStorage.getItem("language")],
      item: translation.students[localStorage.getItem("language")],
      active: translation.subscription[localStorage.getItem("language")],
    },
    {
      path: /^\/students\/\d+\/choosePackage$/,
      title: translation.packages[localStorage.getItem("language")],
      item: translation.students[localStorage.getItem("language")],
      active: translation.subscribe[localStorage.getItem("language")],
    },
    {
      path: /^\/students\/\d+\/checkout$/,
      title: translation.checkOut[localStorage.getItem("language")],
      item: translation.students[localStorage.getItem("language")],
      active: translation.subscribe[localStorage.getItem("language")],
    },
    {
      path: /^\/students\/\d+\/cart$/,
      title: "Cart",
      item: "Students",
      active: "Subscribe",
    },
    {
      path: /^\/invoices$/,
      title: "Invoices",
      item: "Invoices",
      active: "List",
    },
    {
      path: /^\/payments$/,
      title: "Payments",
      item: "Payments",
      active: "List",
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