import"../chunks/paths.7846b4ff.js";import"../chunks/index.93323930.js";import{s as x,f as d,a as b,g as o,h as g,z as u,c as y,d as f,j as m,i as h,C as v,A as p,H as T,o as w}from"../chunks/scheduler.726ac76d.js";import{S as M,i as S,f as k}from"../chunks/index.8a5ed380.js";import{f as C}from"../chunks/index.955fed47.js";async function H({fetch:n,url:t,depends:e,params:a}){return{tabTitle:"Payment Methods",arTabTitle:"وسائل الدفع"}}const R=Object.freeze(Object.defineProperty({__proto__:null,load:H},Symbol.toStringTag,{value:"Module"}));function j(n){let t,e='<div class="card p-3 py-2"><div class="row g-0"><div class="card-body text-center"><div class="avatar-md mb-3 mx-auto"><span class="avatar-title bg-primary-subtle rounded fs-1"><i class="ri-file-list-3-line text-primary"></i></span></div> <h5 id="candidate-name" class="mb-1 text-truncate">Daily Preparation</h5> <p class="text-muted">check subscribed students in order to plan today&#39;s meals</p> <div class="d-flex gap-2 mt-4 flex-wrap justify-content-center"><a role="button" href="reports/todaySubscribers" class="btn text-center btn-soft-info waves-effect waves-light">Check Report</a></div></div></div></div>';return{c(){t=d("div"),t.innerHTML=e,this.h()},l(a){t=o(a,"DIV",{class:!0,"data-svelte-h":!0}),u(t)!=="svelte-139hd9m"&&(t.innerHTML=e),this.h()},h(){m(t,"class","col-xxl-3 col-xl-4 col-lg-5 col-sm-6 col-xs-12")},m(a,s){h(a,t,s)},d(a){a&&f(t)}}}function D(n){let t,e,a='<div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1">Reports</h4> <div class="flex-shrink-0"></div></div></div>',s,_=JSON.parse(sessionStorage.getItem("permissions")).includes("reports.index"),c,i=_&&j();return{c(){t=d("div"),e=d("div"),e.innerHTML=a,s=b(),i&&i.c(),this.h()},l(r){t=o(r,"DIV",{class:!0});var l=g(t);e=o(l,"DIV",{class:!0,"data-svelte-h":!0}),u(e)!=="svelte-aal20y"&&(e.innerHTML=a),s=y(l),i&&i.l(l),l.forEach(f),this.h()},h(){m(e,"class","col-lg-12"),m(t,"class","row")},m(r,l){h(r,t,l),v(t,e),v(t,s),i&&i.m(t,null)},p,i(r){r&&(c||T(()=>{c=k(t,C,{duration:200}),c.start()}))},o:p,d(r){r&&f(t),i&&i.d()}}}function I(n,t,e){let{data:a}=t;return w(()=>{}),n.$$set=s=>{"data"in s&&e(0,a=s.data)},[a]}class q extends M{constructor(t){super(),S(this,t,I,D,x,{data:0})}}export{q as component,R as universal};