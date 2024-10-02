import{s as nt,r as rt,f as d,a as O,l as st,g as u,h as E,z as x,c as w,m as ot,d as p,j as t,K as W,H as Ce,k as it,i as te,C as o,L as oe,F as ce,n as ct,v as dt,w as ut,x as ft,G as vt,y as Se,o as ht,J as Qe,E as We,I as ie,M as Oe,p as mt,D as _t,A as pt}from"../chunks/scheduler.726ac76d.js";import{S as bt,i as gt,b as Xe,d as Ye,m as Ze,a as we,t as Ne,e as $e,f as St}from"../chunks/index.8a5ed380.js";import{e as et}from"../chunks/each.381f634d.js";import{g as Me}from"../chunks/utils.7c7f4a39.js";import{w as Ve}from"../chunks/singletons.08415598.js";import{f as Ct}from"../chunks/index.955fed47.js";import{S as yt}from"../chunks/SchoolsTableCollapse.8f0a9e4d.js";import{D as Et}from"../chunks/DivisionsTableCollapse.01b2794c.js";import{p as It}from"../chunks/stores.b420ea9f.js";async function kt({fetch:s,url:e,depends:l,params:r}){return{tabTitle:"Daily Preparation",arTabTitle:"التحضير اليومي"}}const Ht=Object.freeze(Object.defineProperty({__proto__:null,load:kt},Symbol.toStringTag,{value:"Module"}));function tt(s,e,l){const r=s.slice();return r[5]=e[l],r}function lt(s){let e,l;return{c(){e=d("img"),this.h()},l(r){e=u(r,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){var r,h;We(e.src,l=(h=(r=s[3])==null?void 0:r.logo)==null?void 0:h.full_path)||t(e,"src",l),t(e,"alt",""),t(e,"class","avatar-xs rounded-circle me-2")},m(r,h){te(r,e,h)},p(r,h){var a,f;h&8&&!We(e.src,l=(f=(a=r[3])==null?void 0:a.logo)==null?void 0:f.full_path)&&t(e,"src",l)},d(r){r&&p(e)}}}function Tt(s){let e,l,r="Grade",h,a,f,I="All",C,k,b=et(s[6]),i=[];for(let n=0;n<b.length;n+=1)i[n]=at(tt(s,b,n));return{c(){e=d("div"),l=d("label"),l.textContent=r,h=O(),a=d("select"),f=d("option"),f.textContent=I;for(let n=0;n<i.length;n+=1)i[n].c();this.h()},l(n){e=u(n,"DIV",{class:!0});var _=E(e);l=u(_,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),x(l)!=="svelte-1bmxbek"&&(l.textContent=r),h=w(_),a=u(_,"SELECT",{class:!0,name:!0,id:!0,"aria-label":!0});var m=E(a);f=u(m,"OPTION",{"data-svelte-h":!0}),x(f)!=="svelte-13f2t2c"&&(f.textContent=I);for(let L=0;L<i.length;L+=1)i[L].l(m);m.forEach(p),_.forEach(p),this.h()},h(){t(l,"for","firstName"),t(l,"class","form-label mb-0"),f.__value="all",W(f,f.__value),t(a,"class","form-select"),t(a,"name","class"),t(a,"id","class"),t(a,"aria-label","Default select example"),s[5]===void 0&&Ce(()=>s[18].call(a)),t(e,"class","d-flex align-items-center gap-2")},m(n,_){te(n,e,_),o(e,l),o(e,h),o(e,a),o(a,f);for(let m=0;m<i.length;m+=1)i[m]&&i[m].m(a,null);oe(a,s[5],!0),C||(k=ce(a,"change",s[18]),C=!0)},p(n,_){if(_&64){b=et(n[6]);let m;for(m=0;m<b.length;m+=1){const L=tt(n,b,m);i[m]?i[m].p(L,_):(i[m]=at(L),i[m].c(),i[m].m(a,null))}for(;m<i.length;m+=1)i[m].d(1);i.length=b.length}_&96&&oe(a,n[5])},d(n){n&&p(e),_t(i,n),C=!1,k()}}}function Pt(s){let e,l,r="Level",h,a,f,I="All",C,k="Primary School",b,i="Meduim School",n,_="Secondary School",m,L;return{c(){e=d("div"),l=d("label"),l.textContent=r,h=O(),a=d("select"),f=d("option"),f.textContent=I,C=d("option"),C.textContent=k,b=d("option"),b.textContent=i,n=d("option"),n.textContent=_,this.h()},l(g){e=u(g,"DIV",{class:!0});var S=E(e);l=u(S,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),x(l)!=="svelte-59jyzl"&&(l.textContent=r),h=w(S),a=u(S,"SELECT",{class:!0,name:!0,id:!0,"aria-label":!0});var y=E(a);f=u(y,"OPTION",{"data-svelte-h":!0}),x(f)!=="svelte-13f2t2c"&&(f.textContent=I),C=u(y,"OPTION",{"data-svelte-h":!0}),x(C)!=="svelte-1x0123k"&&(C.textContent=k),b=u(y,"OPTION",{"data-svelte-h":!0}),x(b)!=="svelte-10san4g"&&(b.textContent=i),n=u(y,"OPTION",{"data-svelte-h":!0}),x(n)!=="svelte-k0kzc2"&&(n.textContent=_),y.forEach(p),S.forEach(p),this.h()},h(){t(l,"for","firstName"),t(l,"class","form-label mb-0"),f.__value="all",W(f,f.__value),C.__value=0,W(C,C.__value),b.__value=1,W(b,b.__value),n.__value=2,W(n,n.__value),t(a,"class","form-select"),t(a,"name","class"),t(a,"id","class"),t(a,"aria-label","Default select example"),s[1]===void 0&&Ce(()=>s[17].call(a)),t(e,"class","d-flex align-items-center gap-2")},m(g,S){te(g,e,S),o(e,l),o(e,h),o(e,a),o(a,f),o(a,C),o(a,b),o(a,n),oe(a,s[1],!0),m||(L=ce(a,"change",s[17]),m=!0)},p(g,S){S&2&&oe(a,g[1])},d(g){g&&p(e),m=!1,L()}}}function at(s){let e,l=s[5].name+"",r;return{c(){e=d("option"),r=st(l),this.h()},l(h){e=u(h,"OPTION",{});var a=E(e);r=ot(a,l),a.forEach(p),this.h()},h(){e.__value=s[5].value,W(e,e.__value)},m(h,a){te(h,e,a),o(e,r)},p:pt,d(h){h&&p(e)}}}function Dt(s){var Fe,qe;let e,l,r,h='<div class="card-header align-items-center d-flex d-print-none"><h4 class="card-title mb-0 flex-grow-1">Daily Preparation</h4> <div class="flex-shrink-0"></div></div>',a,f,I,C,k,b=((Fe=s[3])!=null&&Fe.name?s[3].name:"No School Selected")+"",i,n,_,m='<a href="javascript:void(0);" data-bs-toggle="tooltip" data-bs-original-title="Select"><i class="ri-edit-2-line"></i></a>',L,g,S,y,de="Filter By :",ne,P,V,ue="Level",G,fe="Grade",re,v,X,H,Ge="Apply",ye,le,Ee,ve,N,ae,U,Y,Ae='<h5 class="modal-title" id="exampleModalgridLabel">Select School</h5>',Ie,J,K,z,ke,B,Te,R,j,je="Close",Pe,F,He="Apply",Z,De,ze,D=((qe=s[3])==null?void 0:qe.logo)!=null&&lt(s);function Be(c,T){return c[2]=="level"?Pt:Tt}let he=Be(s),A=he(s);const xe=s[15].default,M=rt(xe,s,s[14],null);return z=new yt({props:{collapse:!1,selected:s[3],title:"Schools"}}),z.$on("select",s[10]),B=new Et({props:{collapse:!0,schoolId:s[3].id,selected:s[4],title:"Division"}}),B.$on("select",s[19]),{c(){e=d("div"),l=d("div"),r=d("div"),r.innerHTML=h,a=O(),f=d("div"),I=d("div"),D&&D.c(),C=O(),k=d("h4"),i=st(b),n=O(),_=d("span"),_.innerHTML=m,L=O(),g=d("div"),S=d("div"),y=d("label"),y.textContent=de,ne=O(),P=d("select"),V=d("option"),V.textContent=ue,G=d("option"),G.textContent=fe,re=O(),v=d("span"),A.c(),X=O(),H=d("button"),H.textContent=Ge,ye=O(),le=d("div"),M&&M.c(),ve=O(),N=d("div"),ae=d("div"),U=d("div"),Y=d("div"),Y.innerHTML=Ae,Ie=O(),J=d("div"),K=d("div"),Xe(z.$$.fragment),ke=O(),Xe(B.$$.fragment),Te=O(),R=d("div"),j=d("button"),j.textContent=je,Pe=O(),F=d("button"),F.textContent=He,this.h()},l(c){e=u(c,"DIV",{class:!0});var T=E(e);l=u(T,"DIV",{class:!0});var $=E(l);r=u($,"DIV",{class:!0,"data-svelte-h":!0}),x(r)!=="svelte-17w1mee"&&(r.innerHTML=h),a=w($),f=u($,"DIV",{class:!0});var Q=E(f);I=u(Q,"DIV",{class:!0});var q=E(I);D&&D.l(q),C=w(q),k=u(q,"H4",{class:!0});var ee=E(k);i=ot(ee,b),n=w(ee),_=u(ee,"SPAN",{"data-bs-toggle":!0,"data-bs-target":!0,"data-svelte-h":!0}),x(_)!=="svelte-1q04hzs"&&(_.innerHTML=m),ee.forEach(p),L=w(q),g=u(q,"DIV",{class:!0});var se=E(g);S=u(se,"DIV",{class:!0});var me=E(S);y=u(me,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),x(y)!=="svelte-7g7cbt"&&(y.textContent=de),ne=w(me),P=u(me,"SELECT",{class:!0,name:!0,id:!0,"aria-label":!0});var Le=E(P);V=u(Le,"OPTION",{"data-svelte-h":!0}),x(V)!=="svelte-89wzkk"&&(V.textContent=ue),G=u(Le,"OPTION",{"data-svelte-h":!0}),x(G)!=="svelte-1jkzslo"&&(G.textContent=fe),Le.forEach(p),me.forEach(p),re=w(se),v=u(se,"SPAN",{class:!0});var Ue=E(v);A.l(Ue),Ue.forEach(p),X=w(se),H=u(se,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),x(H)!=="svelte-1pk9nl7"&&(H.textContent=Ge),se.forEach(p),q.forEach(p),ye=w(Q),le=u(Q,"DIV",{class:!0});var Je=E(le);M&&M.l(Je),Je.forEach(p),Q.forEach(p),$.forEach(p),T.forEach(p),ve=w(c),N=u(c,"DIV",{class:!0,id:!0,tabindex:!0,"data-bs-backdrop":!0,"data-bs-keyboard":!0,"aria-labelledby":!0,"aria-modal":!0,style:!0});var Ke=E(N);ae=u(Ke,"DIV",{class:!0});var Re=E(ae);U=u(Re,"DIV",{class:!0});var _e=E(U);Y=u(_e,"DIV",{class:!0,"data-svelte-h":!0}),x(Y)!=="svelte-1nqpj2a"&&(Y.innerHTML=Ae),Ie=w(_e),J=u(_e,"DIV",{class:!0});var pe=E(J);K=u(pe,"DIV",{class:!0});var be=E(K);Ye(z.$$.fragment,be),ke=w(be),Ye(B.$$.fragment,be),be.forEach(p),Te=w(pe),R=u(pe,"DIV",{class:!0});var ge=E(R);j=u(ge,"BUTTON",{type:!0,class:!0,"data-bs-dismiss":!0,"data-svelte-h":!0}),x(j)!=="svelte-uq2pc6"&&(j.textContent=je),Pe=w(ge),F=u(ge,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),x(F)!=="svelte-19p5jr6"&&(F.textContent=He),ge.forEach(p),pe.forEach(p),_e.forEach(p),Re.forEach(p),Ke.forEach(p),this.h()},h(){t(r,"class","card"),t(_,"data-bs-toggle","modal"),t(_,"data-bs-target","#selectSchool"),t(k,"class","card-title mb-0"),t(y,"for","firstName"),t(y,"class","form-label mb-0 text-nowrap"),V.__value="level",W(V,V.__value),G.__value="grade",W(G,G.__value),t(P,"class","form-select"),t(P,"name","class"),t(P,"id","class"),t(P,"aria-label","Default select example"),s[2]===void 0&&Ce(()=>s[16].call(P)),t(S,"class","d-flex align-items-center gap-2"),t(v,"class","ms-3"),t(H,"type","button"),t(H,"class","btn btn-primary waves-effect waves-light ms-3"),t(g,"class","d-flex align-items-center ms-auto"),t(I,"class","card-header align-items-center d-flex d-print-none flex-wrap"),t(le,"class","card-body"),t(f,"class","card"),t(l,"class","col-lg-12"),t(e,"class","row"),t(Y,"class","modal-header"),t(K,"class","row g-3"),t(j,"type","button"),t(j,"class","btn btn-light fw-light hidden"),t(j,"data-bs-dismiss","modal"),t(F,"type","button"),t(F,"class","btn btn-primary waves-effect waves-light"),t(R,"class","hstack gap-2 justify-content-end mt-4"),t(J,"class","modal-body"),t(U,"class","modal-content"),t(ae,"class","modal-dialog modal-dialog-centered"),t(N,"class","modal fade"),t(N,"id","selectSchool"),t(N,"tabindex","-1"),t(N,"data-bs-backdrop","static"),t(N,"data-bs-keyboard","false"),t(N,"aria-labelledby","exampleModalgridLabel"),t(N,"aria-modal","true"),it(N,"display","none")},m(c,T){te(c,e,T),o(e,l),o(l,r),o(l,a),o(l,f),o(f,I),D&&D.m(I,null),o(I,C),o(I,k),o(k,i),o(k,n),o(k,_),o(I,L),o(I,g),o(g,S),o(S,y),o(S,ne),o(S,P),o(P,V),o(P,G),oe(P,s[2],!0),o(g,re),o(g,v),A.m(v,null),o(g,X),o(g,H),o(f,ye),o(f,le),M&&M.m(le,null),te(c,ve,T),te(c,N,T),o(N,ae),o(ae,U),o(U,Y),o(U,Ie),o(U,J),o(J,K),Ze(z,K,null),o(K,ke),Ze(B,K,null),o(J,Te),o(J,R),o(R,j),s[20](j),o(R,Pe),o(R,F),Z=!0,De||(ze=[ce(P,"change",s[16]),ce(H,"click",s[11]),ce(F,"click",s[12])],De=!0)},p(c,[T]){var q,ee;((q=c[3])==null?void 0:q.logo)!=null?D?D.p(c,T):(D=lt(c),D.c(),D.m(I,C)):D&&(D.d(1),D=null),(!Z||T&8)&&b!==(b=((ee=c[3])!=null&&ee.name?c[3].name:"No School Selected")+"")&&ct(i,b),T&4&&oe(P,c[2]),he===(he=Be(c))&&A?A.p(c,T):(A.d(1),A=he(c),A&&(A.c(),A.m(v,null))),M&&M.p&&(!Z||T&16384)&&dt(M,xe,c,c[14],Z?ft(xe,c[14],T,null):ut(c[14]),null);const $={};T&8&&($.selected=c[3]),z.$set($);const Q={};T&8&&(Q.schoolId=c[3].id),T&16&&(Q.selected=c[4]),B.$set(Q)},i(c){Z||(we(M,c),c&&(Ee||Ce(()=>{Ee=St(e,Ct,{duration:200}),Ee.start()})),we(z.$$.fragment,c),we(B.$$.fragment,c),Z=!0)},o(c){Ne(M,c),Ne(z.$$.fragment,c),Ne(B.$$.fragment,c),Z=!1},d(c){c&&(p(e),p(ve),p(N)),D&&D.d(),A.d(),M&&M.d(c),$e(z),$e(B),s[20](null),De=!1,vt(ze)}}}function xt(s,e,l){let r,h,a,f;Se(s,It,v=>l(22,f=v));let{$$slots:I={},$$scope:C}=e,{data:k}=e,b,i="all",n="all",_="level";ht(()=>{l(1,i=f.url.searchParams.get("level")),i==null&&(l(5,n=f.url.searchParams.get("grade")),n&&l(2,_="grade")),l(1,i=i==null?"all":parseInt(i)),l(5,n=n==null?"all":parseInt(n))});let m=[{value:0,name:"Primary School Grade 1"},{value:1,name:"Primary School Grade 2"},{value:2,name:"Primary School Grade 3"},{value:3,name:"Primary School Grade 4"},{value:4,name:"Primary School Grade 5"},{value:5,name:"Primary School Grade 6"},{value:6,name:"Middle School Grade 7"},{value:7,name:"Middle School Grade 8"},{value:8,name:"Middle School Grade 9"},{value:9,name:"Secondary School Grade 10"},{value:10,name:"Secondary School Grade 11"},{value:11,name:"Secondary School Grade 12"}],L=[{value:0,name:"Primary School"},{value:1,name:"Meduim School"},{value:2,name:"Secondary School"}],g=Ve({});Se(s,g,v=>l(3,r=v));let S=Ve({});Se(s,S,v=>l(4,h=v));let y=Ve("All");Se(s,y,v=>l(21,a=v)),Qe("selectedSchoolStore",{selectedSchool:g,selectedDivision:S}),Qe("currentFilterStore",{currentFilter:y});function de(v){ie(g,r=v.detail.school,r)}function ne(){const v=new URL(f.url);_=="level"?(v.searchParams.delete("grade"),v.searchParams.set("level",i)):(v.searchParams.delete("level"),v.searchParams.set("grade",n)),i=="all"&&v.searchParams.delete("level"),n=="all"&&v.searchParams.delete("grade"),ie(y,a="All",a),_=="level"&&i!="all"?ie(y,a=L.find(X=>X.value==i).name,a):_=="grade"&&n!="all"&&ie(y,a=m.find(X=>X.value==n).name,a),Me(v)}function P(){b.click(),h!=null&&h.id?Me(`/admin/reports/todaySubscribers/${r.id}?division=${h.id}`):Me(`/admin/reports/todaySubscribers/${r.id}`)}function V(){_=Oe(this),l(2,_)}function ue(){i=Oe(this),l(1,i)}function G(){n=Oe(this),l(5,n),l(6,m)}const fe=v=>ie(S,h=v.detail.division,h);function re(v){mt[v?"unshift":"push"](()=>{b=v,l(0,b)})}return s.$$set=v=>{"data"in v&&l(13,k=v.data),"$$scope"in v&&l(14,C=v.$$scope)},[b,i,_,r,h,n,m,g,S,y,de,ne,P,k,C,I,V,ue,G,fe,re]}class zt extends bt{constructor(e){super(),gt(this,e,xt,Dt,nt,{data:13})}}export{zt as component,Ht as universal};