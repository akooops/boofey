import{a as Ce,b9 as Le}from"../chunks/paths.29c5142d.js";import{g as J}from"../chunks/utils.5f096ebf.js";import{s as Ve,f as d,a as E,g as f,h as w,z as W,c as S,d as u,j as l,i as X,C as s,F as Ee,Q as Pe,G as Me,o as je,l as se,m as le,n as ue,p as Oe}from"../chunks/scheduler.726ac76d.js";import{S as Be,i as Ne,b as Ae,d as He,m as Fe,a as Ge,t as Ue,e as xe}from"../chunks/index.8a5ed380.js";import"../chunks/initApp.110985ec.js";import"../chunks/paths.7846b4ff.js";import{P as ze}from"../chunks/Password.86e83035.js";const qe=!1;async function Ke({fetch:o,cookies:e,url:t,depends:r}){var n,P,D,I,m,_,y,k,M,i,j;let a=await o(Ce(),{headers:{Authorization:`${localStorage.getItem("SID")}`}});if(a.ok){let h=await a.json();((P=(n=h==null?void 0:h.data)==null?void 0:n.user)==null?void 0:P.verified)==!1&&J("/verification"),console.log("i am pos",(m=(I=(D=h==null?void 0:h.data)==null?void 0:D.user)==null?void 0:I.roles[0])==null?void 0:m.name),((k=(y=(_=h==null?void 0:h.data)==null?void 0:_.user)==null?void 0:y.roles[0])==null?void 0:k.name)=="parent"?J("/"):((j=(i=(M=h==null?void 0:h.data)==null?void 0:M.user)==null?void 0:i.roles[0])==null?void 0:j.name)=="pos"?J("/admin/canteens"):J("/admin")}return{tabTitle:"Sign In",arTabTitle:"تسجيل الدخول"}}const st=Object.freeze(Object.defineProperty({__proto__:null,load:Ke,ssr:qe},Symbol.toStringTag,{value:"Module"}));function Se(o){let e,t=o[3].login[0]+"",r;return{c(){e=d("strong"),r=se(t),this.h()},l(a){e=f(a,"STRONG",{class:!0});var n=w(e);r=le(n,t),n.forEach(u),this.h()},h(){l(e,"class","text-danger ms-1 my-2")},m(a,n){X(a,e,n),s(e,r)},p(a,n){n&8&&t!==(t=a[3].login[0]+"")&&ue(r,t)},d(a){a&&u(e)}}}function Te(o){let e,t=o[3].password[0]+"",r;return{c(){e=d("strong"),r=se(t),this.h()},l(a){e=f(a,"STRONG",{class:!0});var n=w(e);r=le(n,t),n.forEach(u),this.h()},h(){l(e,"class","text-danger ms-1 my-2")},m(a,n){X(a,e,n),s(e,r)},p(a,n){n&8&&t!==(t=a[3].password[0]+"")&&ue(r,t)},d(a){a&&u(e)}}}function De(o){let e,t;return{c(){e=d("strong"),t=se(o[2]),this.h()},l(r){e=f(r,"STRONG",{class:!0});var a=w(e);t=le(a,o[2]),a.forEach(u),this.h()},h(){l(e,"class","text-danger ms-1 my-2")},m(r,a){X(r,e,a),s(e,t)},p(r,a){a&4&&ue(t,r[2])},d(r){r&&u(e)}}}function Qe(o){let e;return{c(){e=se("Sign In")},l(t){e=le(t,"Sign In")},m(t,r){X(t,e,r)},d(t){t&&u(e)}}}function We(o){let e;return{c(){e=d("span"),this.h()},l(t){e=f(t,"SPAN",{class:!0,role:!0}),w(e).forEach(u),this.h()},h(){l(e,"class","spinner-border "),l(e,"role","status")},m(t,r){X(t,e,r)},d(t){t&&u(e)}}}function Xe(o){var ge,be;let e,t,r,a,n,P='<h5 class="text-primary">Welcome Back !</h5> <p class="text-muted">Sign in to continue to Boofey.</p>',D,I,m,_,y,k="Username",M,i,j,h,p,C,Y='<a href="/reset-password" class="text-muted">Forgot password ?</a>',z,N,me="Password",re,q,G,ne,oe,A,O,ie,H,he="Keep me signed in",ce,$,K,L,de,U,_e="",Z,fe,pe,v=((ge=o[3])==null?void 0:ge.login)&&Se(o);G=new ze({props:{name:"password",placeholder:"Enter Password"}});let g=((be=o[3])==null?void 0:be.password)&&Te(o),b=o[2]!=""&&De(o);function ve(c,T){return c[4]?We:Qe}let ee=ve(o),B=ee(o);return{c(){e=d("div"),t=d("div"),r=d("div"),a=d("div"),n=d("div"),n.innerHTML=P,D=E(),I=d("div"),m=d("form"),_=d("div"),y=d("label"),y.textContent=k,M=E(),i=d("input"),j=E(),v&&v.c(),h=E(),p=d("div"),C=d("div"),C.innerHTML=Y,z=E(),N=d("label"),N.textContent=me,re=E(),q=d("div"),Ae(G.$$.fragment),ne=E(),g&&g.c(),oe=E(),A=d("div"),O=d("input"),ie=E(),H=d("label"),H.textContent=he,ce=E(),b&&b.c(),$=E(),K=d("div"),L=d("button"),B.c(),de=E(),U=d("div"),U.innerHTML=_e,this.h()},l(c){e=f(c,"DIV",{class:!0});var T=w(e);t=f(T,"DIV",{class:!0});var x=w(t);r=f(x,"DIV",{class:!0});var R=w(r);a=f(R,"DIV",{class:!0});var te=w(a);n=f(te,"DIV",{class:!0,"data-svelte-h":!0}),W(n)!=="svelte-4rnjjw"&&(n.innerHTML=P),D=S(te),I=f(te,"DIV",{class:!0});var we=w(I);m=f(we,"FORM",{});var V=w(m);_=f(V,"DIV",{class:!0});var Q=w(_);y=f(Q,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),W(y)!=="svelte-1f7p7ai"&&(y.textContent=k),M=S(Q),i=f(Q,"INPUT",{type:!0,class:!0,id:!0,name:!0,placeholder:!0}),j=S(Q),v&&v.l(Q),Q.forEach(u),h=S(V),p=f(V,"DIV",{class:!0});var F=w(p);C=f(F,"DIV",{class:!0,"data-svelte-h":!0}),W(C)!=="svelte-r9ee5n"&&(C.innerHTML=Y),z=S(F),N=f(F,"LABEL",{class:!0,for:!0,"data-svelte-h":!0}),W(N)!=="svelte-1a98ful"&&(N.textContent=me),re=S(F),q=f(F,"DIV",{class:!0});var ke=w(q);He(G.$$.fragment,ke),ke.forEach(u),ne=S(F),g&&g.l(F),F.forEach(u),oe=S(V),A=f(V,"DIV",{class:!0});var ae=w(A);O=f(ae,"INPUT",{class:!0,type:!0,id:!0}),ie=S(ae),H=f(ae,"LABEL",{class:!0,for:!0,"data-svelte-h":!0}),W(H)!=="svelte-3oqf06"&&(H.textContent=he),ae.forEach(u),ce=S(V),b&&b.l(V),$=S(V),K=f(V,"DIV",{class:!0});var Ie=w(K);L=f(Ie,"BUTTON",{class:!0,type:!0});var ye=w(L);B.l(ye),ye.forEach(u),Ie.forEach(u),V.forEach(u),we.forEach(u),te.forEach(u),R.forEach(u),de=S(x),U=f(x,"DIV",{class:!0,"data-svelte-h":!0}),W(U)!=="svelte-mw7r13"&&(U.innerHTML=_e),x.forEach(u),T.forEach(u),this.h()},h(){l(n,"class","text-center mt-2"),l(y,"for","username"),l(y,"class","form-label"),l(i,"type","text"),l(i,"class","form-control"),l(i,"id","username"),l(i,"name","login"),l(i,"placeholder","Enter username, email or phone"),l(_,"class","mb-3"),l(C,"class","float-end"),l(N,"class","form-label"),l(N,"for","password-input"),l(q,"class","position-relative auth-pass-inputgroup mb-3"),l(p,"class","mb-3"),l(O,"class","form-check-input"),l(O,"type","checkbox"),l(O,"id","auth-remember-check"),l(H,"class","form-check-label"),l(H,"for","auth-remember-check"),l(A,"class","form-check"),l(L,"class","btn btn-primary w-100 btn-load"),l(L,"type","submit"),L.disabled=o[4],l(K,"class","mt-4"),l(I,"class","p-2 mt-4"),l(a,"class","card-body p-4"),l(r,"class","card mt-4"),l(U,"class","mt-4 text-center"),l(t,"class","col-md-8 col-lg-6 col-xl-5"),l(e,"class","row justify-content-center")},m(c,T){X(c,e,T),s(e,t),s(t,r),s(r,a),s(a,n),s(a,D),s(a,I),s(I,m),s(m,_),s(_,y),s(_,M),s(_,i),s(_,j),v&&v.m(_,null),s(m,h),s(m,p),s(p,C),s(p,z),s(p,N),s(p,re),s(p,q),Fe(G,q,null),s(p,ne),g&&g.m(p,null),s(m,oe),s(m,A),s(A,O),O.checked=o[1],s(A,ie),s(A,H),s(m,ce),b&&b.m(m,null),s(m,$),s(m,K),s(K,L),B.m(L,null),o[8](m),s(t,de),s(t,U),Z=!0,fe||(pe=[Ee(O,"change",o[7]),Ee(m,"submit",Pe(o[5]))],fe=!0)},p(c,[T]){var x,R;(x=c[3])!=null&&x.login?v?v.p(c,T):(v=Se(c),v.c(),v.m(_,null)):v&&(v.d(1),v=null),(R=c[3])!=null&&R.password?g?g.p(c,T):(g=Te(c),g.c(),g.m(p,null)):g&&(g.d(1),g=null),T&2&&(O.checked=c[1]),c[2]!=""?b?b.p(c,T):(b=De(c),b.c(),b.m(m,$)):b&&(b.d(1),b=null),ee!==(ee=ve(c))&&(B.d(1),B=ee(c),B&&(B.c(),B.m(L,null))),(!Z||T&16)&&(L.disabled=c[4])},i(c){Z||(Ge(G.$$.fragment,c),Z=!0)},o(c){Ue(G.$$.fragment,c),Z=!1},d(c){c&&u(e),v&&v.d(),xe(G),g&&g.d(),b&&b.d(),B.d(),o[8](null),fe=!1,Me(pe)}}}function Ye(o,e,t){let{data:r}=e,a,n=!1,P="",D,I=!1;async function m(){var j,h,p,C,Y,z;localStorage.setItem("language","en"),t(4,I=!0),t(3,D={}),t(2,P="");let k=new FormData(a);k.set("keep_me_signed_in",n),k.set("lang",localStorage.getItem("language"));let M=await fetch(Le(),{method:"POST",body:k}),i=await M.json();if(i.status=="success")if(localStorage.setItem("SID",`Bearer ${i.data.token}`),((h=(j=i==null?void 0:i.data)==null?void 0:j.user)==null?void 0:h.verified)==!1&&J("/verification"),((C=(p=i==null?void 0:i.data)==null?void 0:p.roles[0])==null?void 0:C.name)!="parent"){if(((z=(Y=i==null?void 0:i.data)==null?void 0:Y.roles[0])==null?void 0:z.name)=="pos"){window.location.href=`${window.location.origin}/admin/canteens`;return}window.location.href=`${window.location.origin}/admin`}else window.location.href=`${window.location.origin}/students`;else M.status==422?t(3,D=i.errors):t(2,P=i.message);t(4,I=!1)}je(()=>{});function _(){n=this.checked,t(1,n)}function y(k){Oe[k?"unshift":"push"](()=>{a=k,t(0,a)})}return o.$$set=k=>{"data"in k&&t(6,r=k.data)},[a,n,P,D,I,m,r,_,y]}class lt extends Be{constructor(e){super(),Ne(this,e,Ye,Xe,Ve,{data:6})}}export{lt as component,st as universal};
