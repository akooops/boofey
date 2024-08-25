import{d as te,D as ae}from"../chunks/paths.29c5142d.js";import{a as se}from"../chunks/auth.82ff8344.js";import{s as ne,f as h,a as D,l as q,g as v,h as w,d as f,c as E,m as Q,E as Y,j as c,i as O,C as d,n as re,H as ie,o as oe,J as Z,z as le,R as ce,p as de}from"../chunks/scheduler.726ac76d.js";import{S as fe,i as me,a as T,t as M,b as R,d as j,m as A,e as L,f as ue}from"../chunks/index.8a5ed380.js";import{g as pe,a as _e}from"../chunks/spread.8a54911c.js";import{P as ge}from"../chunks/Pagination.0a529dad.js";import{S as he}from"../chunks/SearchTable.1c079677.js";import{A as ve,C as be}from"../chunks/AddCanteenModal.31453fc1.js";import{i as $e}from"../chunks/initToolTip.b2308c6a.js";import{f as Se}from"../chunks/index.955fed47.js";import{w as ee}from"../chunks/singletons.df66ea99.js";const we=!1;async function Ie({fetch:l,url:e,depends:s,params:i}){s("canteens:refresh");let r=await l(te(i.schoolId,ae(e)),{headers:{Authorization:`${localStorage.getItem("SID")}`}});return se(r),{canteensResponse:await r.json(),tabTitle:"Canteens"}}const ze=Object.freeze(Object.defineProperty({__proto__:null,load:Ie,ssr:we},Symbol.toStringTag,{value:"Module"}));function Ce(l){let e,s='<i class="ri-add-line align-bottom me-1"></i>Add Canteen',i,r,o;return r=new ve({props:{schoolId:l[2].id}}),{c(){e=h("button"),e.innerHTML=s,i=D(),R(r.$$.fragment),this.h()},l(t){e=v(t,"BUTTON",{type:!0,"data-bs-toggle":!0,"data-bs-target":!0,class:!0,"data-svelte-h":!0}),le(e)!=="svelte-1ezwblx"&&(e.innerHTML=s),i=E(t),j(r.$$.fragment,t),this.h()},h(){c(e,"type","button"),c(e,"data-bs-toggle","modal"),c(e,"data-bs-target","#addCanteenModal"),c(e,"class","btn btn-primary waves-effect waves-light")},m(t,a){O(t,e,a),O(t,i,a),A(r,t,a),o=!0},p(t,a){const m={};a&4&&(m.schoolId=t[2].id),r.$set(m)},i(t){o||(T(r.$$.fragment,t),o=!0)},o(t){M(r.$$.fragment,t),o=!1},d(t){t&&(f(e),f(i)),L(r,t)}}}function ye(l){let e,s,i,r,o,t,a,m;i=new he({props:{type:"Canteen"}}),o=new be({props:{canteensList:l[3]}});const p=[l[1]];let b={};for(let n=0;n<p.length;n+=1)b=ce(b,p[n]);return a=new ge({props:b}),{c(){e=h("div"),s=h("div"),R(i.$$.fragment),r=D(),R(o.$$.fragment),t=D(),R(a.$$.fragment),this.h()},l(n){e=v(n,"DIV",{class:!0});var _=w(e);s=v(_,"DIV",{class:!0});var u=w(s);j(i.$$.fragment,u),r=E(u),j(o.$$.fragment,u),t=E(u),j(a.$$.fragment,u),u.forEach(f),_.forEach(f),this.h()},h(){c(s,"class","row"),c(e,"class","card-body")},m(n,_){O(n,e,_),d(e,s),A(i,s,null),d(s,r),A(o,s,null),d(s,t),A(a,s,null),m=!0},p(n,_){const u={};_&8&&(u.canteensList=n[3]),o.$set(u);const V=_&2?pe(p,[_e(n[1])]):{};a.$set(V)},i(n){m||(T(i.$$.fragment,n),T(o.$$.fragment,n),T(a.$$.fragment,n),m=!0)},o(n){M(i.$$.fragment,n),M(o.$$.fragment,n),M(a.$$.fragment,n),m=!1},d(n){n&&f(e),L(i),L(o),L(a)}}}function De(l){let e,s,i,r,o,t,a,m,p,b,n,_=l[2].name+"",u,V,z,H,C,U=JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.storeBySchool"),N,F=JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.indexBySchool"),B,y,$=U&&Ce(l),S=F&&ye(l);return{c(){e=h("div"),s=h("div"),i=h("div"),r=h("div"),o=h("div"),t=h("div"),a=h("img"),p=D(),b=h("h4"),n=h("span"),u=q(_),V=q("'s"),z=q(" Canteens Management"),H=D(),C=h("div"),$&&$.c(),N=D(),S&&S.c(),this.h()},l(g){e=v(g,"DIV",{class:!0});var I=w(e);s=v(I,"DIV",{class:!0});var K=w(s);i=v(K,"DIV",{class:!0});var k=w(i);r=v(k,"DIV",{class:!0});var P=w(r);o=v(P,"DIV",{class:!0});var x=w(o);t=v(x,"DIV",{class:!0});var W=w(t);a=v(W,"IMG",{src:!0,alt:!0,class:!0}),W.forEach(f),p=E(x),b=v(x,"H4",{class:!0});var G=w(b);n=v(G,"SPAN",{class:!0});var J=w(n);u=Q(J,_),V=Q(J,"'s"),J.forEach(f),z=Q(G," Canteens Management"),G.forEach(f),x.forEach(f),H=E(P),C=v(P,"DIV",{class:!0});var X=w(C);$&&$.l(X),X.forEach(f),P.forEach(f),N=E(k),S&&S.l(k),k.forEach(f),K.forEach(f),I.forEach(f),this.h()},h(){Y(a.src,m=l[2].logo.full_path)||c(a,"src",m),c(a,"alt",""),c(a,"class","avatar-xs rounded-circle"),c(t,"class","flex-shrink-0"),c(n,"class","text-primary"),c(b,"class","card-title mb-0 flex-grow-1"),c(o,"class","d-flex gap-2 align-items-center flex-grow-1"),c(C,"class","flex-shrink-0"),c(r,"class","card-header align-items-center d-flex"),c(i,"class","card"),c(s,"class","col-lg-12"),c(e,"class","row")},m(g,I){O(g,e,I),d(e,s),d(s,i),d(i,r),d(r,o),d(o,t),d(t,a),d(o,p),d(o,b),d(b,n),d(n,u),d(n,V),d(b,z),d(r,H),d(r,C),$&&$.m(C,null),d(i,N),S&&S.m(i,null),l[5](e),y=!0},p(g,[I]){(!y||I&4&&!Y(a.src,m=g[2].logo.full_path))&&c(a,"src",m),(!y||I&4)&&_!==(_=g[2].name+"")&&re(u,_),U&&$.p(g,I),F&&S.p(g,I)},i(g){y||(T($),T(S),g&&(B||ie(()=>{B=ue(e,Se,{duration:200}),B.start()})),y=!0)},o(g){M($),M(S),y=!1},d(g){g&&f(e),$&&$.d(),S&&S.d(),l[5](null)}}}function Ee(l,e,s){let i,r,o,{data:t}=e,a;oe(()=>{$e(a)}),Z("apiStore",{apiStore:ee("")}),Z("canteenStore",{canteenStore:ee({})});function m(p){de[p?"unshift":"push"](()=>{a=p,s(0,a)})}return l.$$set=p=>{"data"in p&&s(4,t=p.data)},l.$$.update=()=>{l.$$.dirty&16&&s(3,i=t.canteensResponse.data.canteens),l.$$.dirty&16&&s(2,r=t.canteensResponse.data.school),l.$$.dirty&16&&s(1,o=t.canteensResponse.pagination)},[a,o,r,i,t,m]}class He extends fe{constructor(e){super(),me(this,e,Ee,De,ne,{data:4})}}export{He as component,ze as universal};
