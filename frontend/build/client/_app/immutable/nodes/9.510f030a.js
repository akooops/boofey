import{d as pe,D as _e}from"../chunks/paths.29c5142d.js";import{a as he}from"../chunks/auth.82ff8344.js";import{s as se,f as $,a as M,l as G,g as k,h as I,d as m,c as P,m as F,E as X,j as p,i as j,C as _,F as ge,n as Q,A as z,T as ve,y as ne,z as U,H as be,o as $e,J as Y,R as re,p as ke,e as B}from"../chunks/scheduler.726ac76d.js";import{S as le,i as ie,b as A,d as H,m as L,a as V,t as x,e as O,g as oe,c as ce,f as we}from"../chunks/index.8a5ed380.js";import{e as Z,u as Se,o as ye}from"../chunks/each.381f634d.js";import{g as fe,a as ue}from"../chunks/spread.8a54911c.js";import{P as de}from"../chunks/Pagination.0a529dad.js";import{S as me}from"../chunks/SearchTable.1c079677.js";import{V as Ce,A as Ie,C as Ee}from"../chunks/AddCanteenModal.31453fc1.js";import{i as De}from"../chunks/initToolTip.b2308c6a.js";import{w as ee}from"../chunks/singletons.df66ea99.js";import{f as Ve}from"../chunks/index.955fed47.js";import{g as xe}from"../chunks/utils.5f096ebf.js";import"../chunks/paths.7846b4ff.js";import"../chunks/index.93323930.js";import{n as Te}from"../chunks/stores.1008b3f8.js";const Me=!1;async function Pe({fetch:o,url:e,depends:s}){s("canteens:refresh");let a=await o(pe(null,_e(e)),{headers:{Authorization:`${localStorage.getItem("SID")}`}});return he(a),{canteensResponse:await a.json(),tabTitle:"Canteens"}}const ot=Object.freeze(Object.defineProperty({__proto__:null,load:Pe,ssr:Me},Symbol.toStringTag,{value:"Module"}));function je(o){let e,s=o[0].status+"",a;return{c(){e=$("span"),a=G(s),this.h()},l(n){e=k(n,"SPAN",{class:!0});var t=I(e);a=F(t,s),t.forEach(m),this.h()},h(){p(e,"class","badge bg-danger-subtle text-danger")},m(n,t){j(n,e,t),_(e,a)},p(n,t){t&1&&s!==(s=n[0].status+"")&&Q(a,s)},d(n){n&&m(e)}}}function Ne(o){let e,s=o[0].status+"",a;return{c(){e=$("span"),a=G(s),this.h()},l(n){e=k(n,"SPAN",{class:!0});var t=I(e);a=F(t,s),t.forEach(m),this.h()},h(){p(e,"class","badge bg-success-subtle text-success")},m(n,t){j(n,e,t),_(e,a)},p(n,t){t&1&&s!==(s=n[0].status+"")&&Q(a,s)},d(n){n&&m(e)}}}function Ae(o){let e,s,a,n,t,i,r,l,u,b=o[0].name+"",d,w,g,c=o[0].school.name+"",v,y,T,E;function C(h,D){return h[0].status=="open"?Ne:je}let S=C(o),f=S(o);return{c(){e=$("div"),s=$("div"),a=$("div"),n=$("div"),t=$("img"),r=M(),l=$("div"),u=$("h5"),d=G(b),w=M(),g=$("p"),v=G(c),y=M(),f.c(),this.h()},l(h){e=k(h,"DIV",{class:!0});var D=I(e);s=k(D,"DIV",{class:!0,role:!0});var J=I(s);a=k(J,"DIV",{class:!0});var N=I(a);n=k(N,"DIV",{class:!0});var R=I(n);t=k(R,"IMG",{src:!0,alt:!0,class:!0}),R.forEach(m),r=P(N),l=k(N,"DIV",{class:!0});var q=I(l);u=k(q,"H5",{class:!0});var K=I(u);d=F(K,b),K.forEach(m),w=P(q),g=k(q,"P",{class:!0});var W=I(g);v=F(W,c),W.forEach(m),q.forEach(m),y=P(N),f.l(N),N.forEach(m),J.forEach(m),D.forEach(m),this.h()},h(){X(t.src,i=o[0].school.logo.full_path)||p(t,"src",i),p(t,"alt",""),p(t,"class","avatar-sm rounded-circle"),p(n,"class","flex-shrink-0"),p(u,"class","card-title mb-1"),p(g,"class","text-muted mb-0"),p(l,"class","flex-grow-1 ms-2"),p(a,"class","d-flex align-items-center"),p(s,"class","card card-animate p-3 "),p(s,"role","button"),p(e,"class","col-xxl-3 col-xl-4 col-lg-5 col-sm-6 col-xs-12")},m(h,D){j(h,e,D),_(e,s),_(s,a),_(a,n),_(n,t),_(a,r),_(a,l),_(l,u),_(u,d),_(l,w),_(l,g),_(g,v),_(a,y),f.m(a,null),T||(E=ge(s,"click",o[2]),T=!0)},p(h,[D]){D&1&&!X(t.src,i=h[0].school.logo.full_path)&&p(t,"src",i),D&1&&b!==(b=h[0].name+"")&&Q(d,b),D&1&&c!==(c=h[0].school.name+"")&&Q(v,c),S===(S=C(h))&&f?f.p(h,D):(f.d(1),f=S(h),f&&(f.c(),f.m(a,null)))},i:z,o:z,d(h){h&&m(e),f.d(),T=!1,E()}}}function He(o,e,s){let{canteenStore:a}=ve("canteenStore");ne(o,a,i=>s(3,i));let{canteen:n}=e;function t(){xe(`/admin/canteens/${n.id}/queues`)}return o.$$set=i=>{"canteen"in i&&s(0,n=i.canteen)},[n,a,t]}class Le extends le{constructor(e){super(),ie(this,e,He,Ae,se,{canteen:0})}}function te(o,e,s){const a=o.slice();return a[6]=e[s],a[8]=s,a}function Oe(o){let e,s='<i class="ri-add-line align-bottom me-1"></i>Add Canteen',a,n,t;return n=new Ie({props:{general:!0}}),{c(){e=$("button"),e.innerHTML=s,a=M(),A(n.$$.fragment),this.h()},l(i){e=k(i,"BUTTON",{type:!0,"data-bs-toggle":!0,"data-bs-target":!0,class:!0,"data-svelte-h":!0}),U(e)!=="svelte-1ezwblx"&&(e.innerHTML=s),a=P(i),H(n.$$.fragment,i),this.h()},h(){p(e,"type","button"),p(e,"data-bs-toggle","modal"),p(e,"data-bs-target","#addCanteenModal"),p(e,"class","btn btn-primary waves-effect waves-light")},m(i,r){j(i,e,r),j(i,a,r),L(n,i,r),t=!0},i(i){t||(V(n.$$.fragment,i),t=!0)},o(i){x(n.$$.fragment,i),t=!1},d(i){i&&(m(e),m(a)),O(n,i)}}}function Je(o){let e,s,a,n,t,i,r,l;a=new me({props:{type:"Canteen"}}),t=new Ee({props:{canteensList:o[2],general:!0}});const u=[o[1]];let b={};for(let d=0;d<u.length;d+=1)b=re(b,u[d]);return r=new de({props:b}),{c(){e=$("div"),s=$("div"),A(a.$$.fragment),n=M(),A(t.$$.fragment),i=M(),A(r.$$.fragment),this.h()},l(d){e=k(d,"DIV",{class:!0});var w=I(e);s=k(w,"DIV",{class:!0});var g=I(s);H(a.$$.fragment,g),n=P(g),H(t.$$.fragment,g),i=P(g),H(r.$$.fragment,g),g.forEach(m),w.forEach(m),this.h()},h(){p(s,"class","row"),p(e,"class","card-body")},m(d,w){j(d,e,w),_(e,s),L(a,s,null),_(s,n),L(t,s,null),_(s,i),L(r,s,null),l=!0},p(d,w){const g={};w&4&&(g.canteensList=d[2]),t.$set(g);const c=w&2?fe(u,[ue(d[1])]):{};r.$set(c)},i(d){l||(V(a.$$.fragment,d),V(t.$$.fragment,d),V(r.$$.fragment,d),l=!0)},o(d){x(a.$$.fragment,d),x(t.$$.fragment,d),x(r.$$.fragment,d),l=!1},d(d){d&&m(e),O(a),O(t),O(r)}}}function Re(o){let e,s,a,n,t,i,r,l;s=new me({props:{type:"Canteen"}});const u=[qe,ze],b=[];function d(c,v){var y,T,E,C,S,f;return((E=(T=(y=c[3])==null?void 0:y.from)==null?void 0:T.route)==null?void 0:E.id)==((f=(S=(C=c[3])==null?void 0:C.to)==null?void 0:S.route)==null?void 0:f.id)&&c[3]?0:1}n=d(o),t=b[n]=u[n](o);const w=[o[1]];let g={};for(let c=0;c<w.length;c+=1)g=re(g,w[c]);return r=new de({props:g}),{c(){e=$("div"),A(s.$$.fragment),a=M(),t.c(),i=M(),A(r.$$.fragment),this.h()},l(c){e=k(c,"DIV",{class:!0});var v=I(e);H(s.$$.fragment,v),a=P(v),t.l(v),i=P(v),H(r.$$.fragment,v),v.forEach(m),this.h()},h(){p(e,"class","row")},m(c,v){j(c,e,v),L(s,e,null),_(e,a),b[n].m(e,null),_(e,i),L(r,e,null),l=!0},p(c,v){let y=n;n=d(c),n===y?b[n].p(c,v):(oe(),x(b[y],1,1,()=>{b[y]=null}),ce(),t=b[n],t?t.p(c,v):(t=b[n]=u[n](c),t.c()),V(t,1),t.m(e,i));const T=v&2?fe(w,[ue(c[1])]):{};r.$set(T)},i(c){l||(V(s.$$.fragment,c),V(t),V(r.$$.fragment,c),l=!0)},o(c){x(s.$$.fragment,c),x(t),x(r.$$.fragment,c),l=!1},d(c){c&&m(e),O(s),b[n].d(),O(r)}}}function ze(o){let e=[],s=new Map,a,n,t=Z(o[2]);const i=r=>r[6].id;for(let r=0;r<t.length;r+=1){let l=te(o,t,r),u=i(l);s.set(u,e[r]=ae(u,l))}return{c(){for(let r=0;r<e.length;r+=1)e[r].c();a=B()},l(r){for(let l=0;l<e.length;l+=1)e[l].l(r);a=B()},m(r,l){for(let u=0;u<e.length;u+=1)e[u]&&e[u].m(r,l);j(r,a,l),n=!0},p(r,l){l&4&&(t=Z(r[2]),oe(),e=Se(e,l,i,1,r,t,s,a.parentNode,ye,ae,a,te),ce())},i(r){if(!n){for(let l=0;l<t.length;l+=1)V(e[l]);n=!0}},o(r){for(let l=0;l<e.length;l+=1)x(e[l]);n=!1},d(r){r&&m(a);for(let l=0;l<e.length;l+=1)e[l].d(r)}}}function qe(o){let e,s='<lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>';return{c(){e=$("div"),e.innerHTML=s,this.h()},l(a){e=k(a,"DIV",{class:!0,"data-svelte-h":!0}),U(e)!=="svelte-dxv6g9"&&(e.innerHTML=s),this.h()},h(){p(e,"class","text-center")},m(a,n){j(a,e,n)},p:z,i:z,o:z,d(a){a&&m(e)}}}function ae(o,e){let s,a,n;return a=new Le({props:{canteen:e[6]}}),{key:o,first:null,c(){s=B(),A(a.$$.fragment),this.h()},l(t){s=B(),H(a.$$.fragment,t),this.h()},h(){this.first=s},m(t,i){j(t,s,i),L(a,t,i),n=!0},p(t,i){e=t;const r={};i&4&&(r.canteen=e[6]),a.$set(r)},i(t){n||(V(a.$$.fragment,t),n=!0)},o(t){x(a.$$.fragment,t),n=!1},d(t){t&&m(s),O(a,t)}}}function Ge(o){let e,s,a,n,t,i="Canteens Management",r,l,u=JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.store"),b,d=JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.index"),w,g=JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.index.simplified"),c,v,y,T,E=u&&Oe(),C=d&&Je(o),S=g&&Re(o);return y=new Ce({props:{general:!0,simple:JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.show.simplified")}}),{c(){e=$("div"),s=$("div"),a=$("div"),n=$("div"),t=$("h4"),t.textContent=i,r=M(),l=$("div"),E&&E.c(),b=M(),C&&C.c(),w=M(),S&&S.c(),v=M(),A(y.$$.fragment),this.h()},l(f){e=k(f,"DIV",{class:!0});var h=I(e);s=k(h,"DIV",{class:!0});var D=I(s);a=k(D,"DIV",{class:!0});var J=I(a);n=k(J,"DIV",{class:!0});var N=I(n);t=k(N,"H4",{class:!0,"data-svelte-h":!0}),U(t)!=="svelte-1cmpfjx"&&(t.textContent=i),r=P(N),l=k(N,"DIV",{class:!0});var R=I(l);E&&E.l(R),R.forEach(m),N.forEach(m),b=P(J),C&&C.l(J),J.forEach(m),w=P(D),S&&S.l(D),D.forEach(m),h.forEach(m),v=P(f),H(y.$$.fragment,f),this.h()},h(){p(t,"class","card-title mb-0 flex-grow-1"),p(l,"class","flex-shrink-0"),p(n,"class","card-header align-items-center d-flex"),p(a,"class","card"),p(s,"class","col-lg-12"),p(e,"class","row")},m(f,h){j(f,e,h),_(e,s),_(s,a),_(a,n),_(n,t),_(n,r),_(n,l),E&&E.m(l,null),_(a,b),C&&C.m(a,null),_(s,w),S&&S.m(s,null),o[5](e),j(f,v,h),L(y,f,h),T=!0},p(f,[h]){d&&C.p(f,h),g&&S.p(f,h)},i(f){T||(V(E),V(C),V(S),f&&(c||be(()=>{c=we(e,Ve,{duration:200}),c.start()})),V(y.$$.fragment,f),T=!0)},o(f){x(E),x(C),x(S),x(y.$$.fragment,f),T=!1},d(f){f&&(m(e),m(v)),E&&E.d(),C&&C.d(),S&&S.d(),o[5](null),O(y,f)}}}function Fe(o,e,s){let a,n,t;ne(o,Te,u=>s(3,t=u));let{data:i}=e,r;$e(()=>{De(r)}),Y("apiStore",{apiStore:ee("")}),Y("canteenStore",{canteenStore:ee({})});function l(u){ke[u?"unshift":"push"](()=>{r=u,s(0,r)})}return o.$$set=u=>{"data"in u&&s(4,i=u.data)},o.$$.update=()=>{o.$$.dirty&16&&s(2,a=i.canteensResponse.data.canteens),o.$$.dirty&16&&s(1,n=i.canteensResponse.pagination)},[r,n,a,t,i,l]}class ct extends le{constructor(e){super(),ie(this,e,Fe,Ge,se,{data:4})}}export{ct as component,ot as universal};
