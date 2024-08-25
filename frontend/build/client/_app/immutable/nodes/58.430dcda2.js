import{aV as wt,aW as Dt,aX as St}from"../chunks/paths.29c5142d.js";import{a as qe}from"../chunks/auth.82ff8344.js";import{s as Xe,f as i,a as h,l as F,g as f,h as u,c as _,z as _t,d as n,m as M,E as ct,j as t,i as ce,C as e,K as ye,F as ke,Q as bt,n as Ie,A as ut,G as Vt,p as He}from"../chunks/scheduler.726ac76d.js";import{S as Ke,i as Qe,b as je,d as Be,m as Ge,a as Ue,t as Fe,e as Me}from"../chunks/index.8a5ed380.js";import{t as It}from"../chunks/toast.aca1940a.js";import{i as Et}from"../chunks/utils.5f096ebf.js";import{t as K}from"../chunks/translation.098a1f9d.js";import{P as ze}from"../chunks/Password.86e83035.js";const Pt=!1;async function Tt({fetch:c,url:a,depends:o,params:r}){o("profile:refresh");let l=await c(wt(),{headers:{Authorization:`${localStorage.getItem("SID")}`}});return qe(l),{profileResponse:await l.json(),tabTitle:"Profile Settings",arTabTitle:"اعدادات الملف الشخصي"}}const Ht=Object.freeze(Object.defineProperty({__proto__:null,load:Tt,ssr:Pt},Symbol.toStringTag,{value:"Module"}));function dt(c){let a,o=c[3].firstname[0]+"",r;return{c(){a=i("strong"),r=F(o),this.h()},l(l){a=f(l,"STRONG",{class:!0});var s=u(a);r=M(s,o),s.forEach(n),this.h()},h(){t(a,"class","text-danger ms-1 my-2")},m(l,s){ce(l,a,s),e(a,r)},p(l,s){s&8&&o!==(o=l[3].firstname[0]+"")&&Ie(r,o)},d(l){l&&n(a)}}}function mt(c){let a,o=c[3].lastname[0]+"",r;return{c(){a=i("strong"),r=F(o),this.h()},l(l){a=f(l,"STRONG",{class:!0});var s=u(a);r=M(s,o),s.forEach(n),this.h()},h(){t(a,"class","text-danger ms-1 my-2")},m(l,s){ce(l,a,s),e(a,r)},p(l,s){s&8&&o!==(o=l[3].lastname[0]+"")&&Ie(r,o)},d(l){l&&n(a)}}}function pt(c){let a,o=c[3].description[0]+"",r;return{c(){a=i("strong"),r=F(o),this.h()},l(l){a=f(l,"STRONG",{class:!0});var s=u(a);r=M(s,o),s.forEach(n),this.h()},h(){t(a,"class","text-danger ms-1 my-2")},m(l,s){ce(l,a,s),e(a,r)},p(l,s){s&8&&o!==(o=l[3].description[0]+"")&&Ie(r,o)},d(l){l&&n(a)}}}function $t(c){var We,Je,Ye,Ze,xe,et;let a,o,r,l,s,m,S,I,P,p,L,le,k,A='<span class="avatar-title rounded-circle bg-light text-body"><i class="ri-camera-fill"></i></span>',b,T,$=((We=c[0])==null?void 0:We.profile.fullname)+"",x,Q,se,re=((Ye=(Je=c[0])==null?void 0:Je.roles[0])==null?void 0:Ye.name)+"",W,y,g,B,O,R,J=K.firstName[localStorage.getItem("language")]+"",w,q,D,Y,ee,te,G,z,pe=K.lastName[localStorage.getItem("language")]+"",ne,V,d,N,Se,ve,ae,v,ie=K.description[localStorage.getItem("language")]+"",ge,Z,U,ue,Ve,he,oe,de,Ne=K.update[localStorage.getItem("language")]+"",me,Pe,Ae,C=((Ze=c[3])==null?void 0:Ze.firstname)&&dt(c),j=((xe=c[3])==null?void 0:xe.lastname)&&mt(c),X=((et=c[3])==null?void 0:et.description)&&pt(c);return{c(){a=i("div"),o=i("form"),r=i("div"),l=i("div"),s=i("div"),m=i("div"),S=i("img"),P=h(),p=i("div"),L=i("input"),le=h(),k=i("label"),k.innerHTML=A,b=h(),T=i("h5"),x=F($),Q=h(),se=i("p"),W=F(re),y=h(),g=i("div"),B=i("div"),O=i("div"),R=i("label"),w=F(J),q=h(),D=i("input"),Y=h(),C&&C.c(),ee=h(),te=i("div"),G=i("div"),z=i("label"),ne=F(pe),V=h(),d=i("input"),N=h(),j&&j.c(),Se=h(),ve=i("div"),ae=i("div"),v=i("label"),ge=F(ie),Z=h(),U=i("textarea"),ue=h(),X&&X.c(),Ve=h(),he=i("div"),oe=i("div"),de=i("button"),me=F(Ne),this.h()},l(E){a=f(E,"DIV",{class:!0,id:!0,role:!0});var H=u(a);o=f(H,"FORM",{});var be=u(o);r=f(be,"DIV",{class:!0});var Ee=u(r);l=f(Ee,"DIV",{class:!0});var Oe=u(l);s=f(Oe,"DIV",{class:!0});var _e=u(s);m=f(_e,"DIV",{class:!0});var we=u(m);S=f(we,"IMG",{src:!0,class:!0,alt:!0}),P=_(we),p=f(we,"DIV",{class:!0});var De=u(p);L=f(De,"INPUT",{id:!0,name:!0,type:!0,class:!0}),le=_(De),k=f(De,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),_t(k)!=="svelte-1hsqj3p"&&(k.innerHTML=A),De.forEach(n),we.forEach(n),b=_(_e),T=f(_e,"H5",{class:!0});var Re=u(T);x=M(Re,$),Re.forEach(n),Q=_(_e),se=f(_e,"P",{class:!0});var Ce=u(se);W=M(Ce,re),Ce.forEach(n),_e.forEach(n),Oe.forEach(n),y=_(Ee),g=f(Ee,"DIV",{class:!0});var fe=u(g);B=f(fe,"DIV",{class:!0});var tt=u(B);O=f(tt,"DIV",{class:!0});var Te=u(O);R=f(Te,"LABEL",{for:!0,class:!0});var at=u(R);w=M(at,J),at.forEach(n),q=_(Te),D=f(Te,"INPUT",{type:!0,class:!0,id:!0,placeholder:!0,name:!0}),Y=_(Te),C&&C.l(Te),Te.forEach(n),tt.forEach(n),ee=_(fe),te=f(fe,"DIV",{class:!0});var lt=u(te);G=f(lt,"DIV",{class:!0});var $e=u(G);z=f($e,"LABEL",{for:!0,class:!0});var st=u(z);ne=M(st,pe),st.forEach(n),V=_($e),d=f($e,"INPUT",{type:!0,class:!0,id:!0,placeholder:!0,name:!0}),N=_($e),j&&j.l($e),$e.forEach(n),lt.forEach(n),Se=_(fe),ve=f(fe,"DIV",{class:!0});var rt=u(ve);ae=f(rt,"DIV",{class:!0});var Le=u(ae);v=f(Le,"LABEL",{for:!0,class:!0});var ot=u(v);ge=M(ot,ie),ot.forEach(n),Z=_(Le),U=f(Le,"TEXTAREA",{class:!0,id:!0,placeholder:!0,name:!0,rows:!0}),u(U).forEach(n),ue=_(Le),X&&X.l(Le),Le.forEach(n),rt.forEach(n),Ve=_(fe),he=f(fe,"DIV",{class:!0});var nt=u(he);oe=f(nt,"DIV",{class:!0});var it=u(oe);de=f(it,"BUTTON",{type:!0,class:!0});var ft=u(de);me=M(ft,Ne),ft.forEach(n),it.forEach(n),nt.forEach(n),fe.forEach(n),Ee.forEach(n),be.forEach(n),H.forEach(n),this.h()},h(){var E,H,be;ct(S.src,I=(be=(H=(E=c[0])==null?void 0:E.profile)==null?void 0:H.image)==null?void 0:be.full_path)||t(S,"src",I),t(S,"class","rounded-circle avatar-xl img-thumbnail user-profile-image"),t(S,"alt","user-profile-image"),t(L,"id","profile-img-file-input"),t(L,"name","file"),t(L,"type","file"),t(L,"class","profile-img-file-input"),t(k,"for","profile-img-file-input"),t(k,"class","profile-photo-edit avatar-xs"),t(p,"class","avatar-xs p-0 rounded-circle profile-photo-edit"),t(m,"class","profile-user position-relative d-inline-block mx-auto mb-4"),t(T,"class","fs-16 mb-1"),t(se,"class","text-muted mb-0"),t(s,"class","text-center"),t(l,"class","col-xxl-3"),t(R,"for","firstnameInput"),t(R,"class","form-label"),t(D,"type","text"),t(D,"class","form-control"),t(D,"id","firstnameInput"),t(D,"placeholder",K.enterFirstName[localStorage.getItem("language")]),t(D,"name","firstname"),t(O,"class","mb-3"),t(B,"class","col-xxl-6"),t(z,"for","lastnameInput"),t(z,"class","form-label"),t(d,"type","text"),t(d,"class","form-control"),t(d,"id","lastnameInput"),t(d,"placeholder",K.enterLastName[localStorage.getItem("language")]),t(d,"name","lastname"),t(G,"class","mb-3"),t(te,"class","col-xxl-6"),t(v,"for","exampleFormControlTextarea"),t(v,"class","form-label"),t(U,"class","form-control"),t(U,"id","exampleFormControlTextarea"),t(U,"placeholder",K.enterDescription[localStorage.getItem("language")]),t(U,"name","description"),t(U,"rows","4"),t(ae,"class","mb-3 pb-2"),t(ve,"class","col-lg-12"),t(de,"type","submit"),t(de,"class","btn btn-primary"),t(oe,"class","hstack gap-2 justify-content-end"),t(he,"class","col-lg-12"),t(g,"class","col-xxl-9 row"),t(r,"class","row"),t(a,"class","tab-pane active"),t(a,"id","personalDetails"),t(a,"role","tabpanel")},m(E,H){ce(E,a,H),e(a,o),e(o,r),e(r,l),e(l,s),e(s,m),e(m,S),e(m,P),e(m,p),e(p,L),c[6](L),e(p,le),e(p,k),e(s,b),e(s,T),e(T,x),e(s,Q),e(s,se),e(se,W),e(r,y),e(r,g),e(g,B),e(B,O),e(O,R),e(R,w),e(O,q),e(O,D),ye(D,c[0].profile.firstname),e(O,Y),C&&C.m(O,null),e(g,ee),e(g,te),e(te,G),e(G,z),e(z,ne),e(G,V),e(G,d),ye(d,c[0].profile.lastname),e(G,N),j&&j.m(G,null),e(g,Se),e(g,ve),e(ve,ae),e(ae,v),e(v,ge),e(ae,Z),e(ae,U),ye(U,c[0].profile.description),e(ae,ue),X&&X.m(ae,null),e(g,Ve),e(g,he),e(he,oe),e(oe,de),e(de,me),c[10](o),Pe||(Ae=[ke(L,"change",c[4]),ke(D,"input",c[7]),ke(d,"input",c[8]),ke(U,"input",c[9]),ke(o,"submit",bt(c[5]))],Pe=!0)},p(E,[H]){var be,Ee,Oe,_e,we,De,Re,Ce,fe;H&1&&!ct(S.src,I=(Oe=(Ee=(be=E[0])==null?void 0:be.profile)==null?void 0:Ee.image)==null?void 0:Oe.full_path)&&t(S,"src",I),H&1&&$!==($=((_e=E[0])==null?void 0:_e.profile.fullname)+"")&&Ie(x,$),H&1&&re!==(re=((De=(we=E[0])==null?void 0:we.roles[0])==null?void 0:De.name)+"")&&Ie(W,re),H&1&&D.value!==E[0].profile.firstname&&ye(D,E[0].profile.firstname),(Re=E[3])!=null&&Re.firstname?C?C.p(E,H):(C=dt(E),C.c(),C.m(O,null)):C&&(C.d(1),C=null),H&1&&d.value!==E[0].profile.lastname&&ye(d,E[0].profile.lastname),(Ce=E[3])!=null&&Ce.lastname?j?j.p(E,H):(j=mt(E),j.c(),j.m(G,null)):j&&(j.d(1),j=null),H&1&&ye(U,E[0].profile.description),(fe=E[3])!=null&&fe.description?X?X.p(E,H):(X=pt(E),X.c(),X.m(ae,null)):X&&(X.d(1),X=null)},i:ut,o:ut,d(E){E&&n(a),c[6](null),C&&C.d(),j&&j.d(),X&&X.d(),c[10](null),Pe=!1,Vt(Ae)}}}function Lt(c,a,o){let{user:r}=a,l,s,m;function S(b){o(0,r.profile.image.full_path=URL.createObjectURL(l.files[0]),r)}async function I(){o(3,m={});let b=new FormData(s);b.set("lang",localStorage.getItem("language"));let T=await fetch(Dt(),{headers:{Authorization:`${localStorage.getItem("SID")}`},method:"POST",body:b});qe(T),T=await T.json(),T.status=="success"?(It("Profile updated successfully","success"),Et("profile:refresh"),P()):o(3,m=T.errors)}function P(){s.reset()}function p(b){He[b?"unshift":"push"](()=>{l=b,o(1,l)})}function L(){r.profile.firstname=this.value,o(0,r)}function le(){r.profile.lastname=this.value,o(0,r)}function k(){r.profile.description=this.value,o(0,r)}function A(b){He[b?"unshift":"push"](()=>{s=b,o(2,s)})}return c.$$set=b=>{"user"in b&&o(0,r=b.user)},[r,l,s,m,S,I,p,L,le,k,A]}class yt extends Ke{constructor(a){super(),Qe(this,a,Lt,$t,Xe,{user:0})}}function vt(c){let a,o=c[1].old_password[0]+"",r;return{c(){a=i("strong"),r=F(o),this.h()},l(l){a=f(l,"STRONG",{class:!0});var s=u(a);r=M(s,o),s.forEach(n),this.h()},h(){t(a,"class","text-danger ms-1 my-2")},m(l,s){ce(l,a,s),e(a,r)},p(l,s){s&2&&o!==(o=l[1].old_password[0]+"")&&Ie(r,o)},d(l){l&&n(a)}}}function gt(c){let a,o=c[1].password[0]+"",r;return{c(){a=i("strong"),r=F(o),this.h()},l(l){a=f(l,"STRONG",{class:!0});var s=u(a);r=M(s,o),s.forEach(n),this.h()},h(){t(a,"class","text-danger ms-1 my-2")},m(l,s){ce(l,a,s),e(a,r)},p(l,s){s&2&&o!==(o=l[1].password[0]+"")&&Ie(r,o)},d(l){l&&n(a)}}}function ht(c){let a,o=c[1].password[0]+"",r;return{c(){a=i("strong"),r=F(o),this.h()},l(l){a=f(l,"STRONG",{class:!0});var s=u(a);r=M(s,o),s.forEach(n),this.h()},h(){t(a,"class","text-danger ms-1 my-2")},m(l,s){ce(l,a,s),e(a,r)},p(l,s){s&2&&o!==(o=l[1].password[0]+"")&&Ie(r,o)},d(l){l&&n(a)}}}function kt(c){var Se,ve,ae;let a,o,r,l,s,m,S=K.currentPass[localStorage.getItem("language")]+"",I,P,p,L,le,k,A,b,T=K.newPass[localStorage.getItem("language")]+"",$,x,Q,se,re,W,y,g,B=K.confirmPassword[localStorage.getItem("language")]+"",O,R,J,w,q,D,Y,ee,te=K.changePass[localStorage.getItem("language")]+"",G,z,pe,ne;p=new ze({props:{name:"old_password",placeholder:K.enterCurrentPass[localStorage.getItem("language")]}});let V=((Se=c[1])==null?void 0:Se.old_password)&&vt(c);Q=new ze({props:{name:"password",placeholder:K.enterNewPass[localStorage.getItem("language")]}});let d=((ve=c[1])==null?void 0:ve.password)&&gt(c);J=new ze({props:{name:"password_confirmation",placeholder:K.enterPasswordConfirmation[localStorage.getItem("language")]}});let N=((ae=c[1])==null?void 0:ae.password)&&ht(c);return{c(){a=i("div"),o=i("form"),r=i("div"),l=i("div"),s=i("div"),m=i("label"),I=F(S),P=h(),je(p.$$.fragment),L=h(),V&&V.c(),le=h(),k=i("div"),A=i("div"),b=i("label"),$=F(T),x=h(),je(Q.$$.fragment),se=h(),d&&d.c(),re=h(),W=i("div"),y=i("div"),g=i("label"),O=F(B),R=h(),je(J.$$.fragment),w=h(),N&&N.c(),q=h(),D=i("div"),Y=i("div"),ee=i("button"),G=F(te),this.h()},l(v){a=f(v,"DIV",{class:!0,id:!0,role:!0});var ie=u(a);o=f(ie,"FORM",{});var ge=u(o);r=f(ge,"DIV",{class:!0});var Z=u(r);l=f(Z,"DIV",{class:!0});var U=u(l);s=f(U,"DIV",{});var ue=u(s);m=f(ue,"LABEL",{for:!0,class:!0});var Ve=u(m);I=M(Ve,S),Ve.forEach(n),P=_(ue),Be(p.$$.fragment,ue),L=_(ue),V&&V.l(ue),ue.forEach(n),U.forEach(n),le=_(Z),k=f(Z,"DIV",{class:!0});var he=u(k);A=f(he,"DIV",{});var oe=u(A);b=f(oe,"LABEL",{for:!0,class:!0});var de=u(b);$=M(de,T),de.forEach(n),x=_(oe),Be(Q.$$.fragment,oe),se=_(oe),d&&d.l(oe),oe.forEach(n),he.forEach(n),re=_(Z),W=f(Z,"DIV",{class:!0});var Ne=u(W);y=f(Ne,"DIV",{});var me=u(y);g=f(me,"LABEL",{for:!0,class:!0});var Pe=u(g);O=M(Pe,B),Pe.forEach(n),R=_(me),Be(J.$$.fragment,me),w=_(me),N&&N.l(me),me.forEach(n),Ne.forEach(n),q=_(Z),D=f(Z,"DIV",{class:!0});var Ae=u(D);Y=f(Ae,"DIV",{class:!0});var C=u(Y);ee=f(C,"BUTTON",{type:!0,class:!0});var j=u(ee);G=M(j,te),j.forEach(n),C.forEach(n),Ae.forEach(n),Z.forEach(n),ge.forEach(n),ie.forEach(n),this.h()},h(){t(m,"for","oldpasswordInput"),t(m,"class","form-label"),t(l,"class","col-lg-4"),t(b,"for","newpasswordInput"),t(b,"class","form-label"),t(k,"class","col-lg-4"),t(g,"for","confirmpasswordInput"),t(g,"class","form-label"),t(W,"class","col-lg-4"),t(ee,"type","submit"),t(ee,"class","btn btn-info"),t(Y,"class","text-end"),t(D,"class","col-lg-12 mt-4"),t(r,"class","row g-2"),t(a,"class","tab-pane"),t(a,"id","changePassword"),t(a,"role","tabpanel")},m(v,ie){ce(v,a,ie),e(a,o),e(o,r),e(r,l),e(l,s),e(s,m),e(m,I),e(s,P),Ge(p,s,null),e(s,L),V&&V.m(s,null),e(r,le),e(r,k),e(k,A),e(A,b),e(b,$),e(A,x),Ge(Q,A,null),e(A,se),d&&d.m(A,null),e(r,re),e(r,W),e(W,y),e(y,g),e(g,O),e(y,R),Ge(J,y,null),e(y,w),N&&N.m(y,null),e(r,q),e(r,D),e(D,Y),e(Y,ee),e(ee,G),c[3](o),z=!0,pe||(ne=ke(o,"submit",bt(c[2])),pe=!0)},p(v,[ie]){var ge,Z,U;(ge=v[1])!=null&&ge.old_password?V?V.p(v,ie):(V=vt(v),V.c(),V.m(s,null)):V&&(V.d(1),V=null),(Z=v[1])!=null&&Z.password?d?d.p(v,ie):(d=gt(v),d.c(),d.m(A,null)):d&&(d.d(1),d=null),(U=v[1])!=null&&U.password?N?N.p(v,ie):(N=ht(v),N.c(),N.m(y,null)):N&&(N.d(1),N=null)},i(v){z||(Ue(p.$$.fragment,v),Ue(Q.$$.fragment,v),Ue(J.$$.fragment,v),z=!0)},o(v){Fe(p.$$.fragment,v),Fe(Q.$$.fragment,v),Fe(J.$$.fragment,v),z=!1},d(v){v&&n(a),Me(p),V&&V.d(),Me(Q),d&&d.d(),Me(J),N&&N.d(),c[3](null),pe=!1,ne()}}}function Nt(c,a,o){let r,l;async function s(){o(1,l={});let I=new FormData(r);I.set("lang",localStorage.getItem("language"));let P=await fetch(St(),{headers:{Authorization:`${localStorage.getItem("SID")}`},method:"POST",body:I});qe(P),P=await P.json(),P.status=="success"?(It("Paswword changed successfully","success"),Et("profile:refresh"),m()):o(1,l=P.errors)}function m(){r.reset()}function S(I){He[I?"unshift":"push"](()=>{r=I,o(0,r)})}return[r,l,s,S]}class At extends Ke{constructor(a){super(),Qe(this,a,Nt,kt,Xe,{})}}function Ot(c){let a,o='<div class="profile-wid-bg profile-setting-img"></div>',r,l,s,m,S,I,P,p,L,le,k=K.personalDetails[localStorage.getItem("language")]+"",A,b,T,$,x,Q,se=K.changePass[localStorage.getItem("language")]+"",re,W,y,g,B,O,R,J;return B=new yt({props:{user:c[0]}}),R=new At({}),{c(){a=i("div"),a.innerHTML=o,r=h(),l=i("div"),s=i("div"),m=i("div"),S=i("div"),I=i("ul"),P=i("li"),p=i("a"),L=i("i"),le=h(),A=F(k),b=h(),T=i("li"),$=i("a"),x=i("i"),Q=h(),re=F(se),W=h(),y=i("div"),g=i("div"),je(B.$$.fragment),O=h(),je(R.$$.fragment),this.h()},l(w){a=f(w,"DIV",{class:!0,"data-svelte-h":!0}),_t(a)!=="svelte-1srf0z3"&&(a.innerHTML=o),r=_(w),l=f(w,"DIV",{class:!0});var q=u(l);s=f(q,"DIV",{class:!0});var D=u(s);m=f(D,"DIV",{class:!0});var Y=u(m);S=f(Y,"DIV",{class:!0});var ee=u(S);I=f(ee,"UL",{class:!0,role:!0});var te=u(I);P=f(te,"LI",{class:!0});var G=u(P);p=f(G,"A",{class:!0,"data-bs-toggle":!0,href:!0,role:!0});var z=u(p);L=f(z,"I",{class:!0}),u(L).forEach(n),le=_(z),A=M(z,k),z.forEach(n),G.forEach(n),b=_(te),T=f(te,"LI",{class:!0});var pe=u(T);$=f(pe,"A",{class:!0,"data-bs-toggle":!0,href:!0,role:!0});var ne=u($);x=f(ne,"I",{class:!0}),u(x).forEach(n),Q=_(ne),re=M(ne,se),ne.forEach(n),pe.forEach(n),te.forEach(n),ee.forEach(n),W=_(Y),y=f(Y,"DIV",{class:!0});var V=u(y);g=f(V,"DIV",{class:!0});var d=u(g);Be(B.$$.fragment,d),O=_(d),Be(R.$$.fragment,d),d.forEach(n),V.forEach(n),Y.forEach(n),D.forEach(n),q.forEach(n),this.h()},h(){t(a,"class","position-relative mx-n4 mt-n4"),t(L,"class","fas fa-home"),t(p,"class","nav-link active"),t(p,"data-bs-toggle","tab"),t(p,"href","#personalDetails"),t(p,"role","tab"),t(P,"class","nav-item"),t(x,"class","far fa-user"),t($,"class","nav-link"),t($,"data-bs-toggle","tab"),t($,"href","#changePassword"),t($,"role","tab"),t(T,"class","nav-item"),t(I,"class","nav nav-tabs-custom rounded card-header-tabs border-bottom-0"),t(I,"role","tablist"),t(S,"class","card-header"),t(g,"class","tab-content"),t(y,"class","card-body p-4"),t(m,"class","card mt-xxl-n5"),t(s,"class",""),t(l,"class","row")},m(w,q){ce(w,a,q),ce(w,r,q),ce(w,l,q),e(l,s),e(s,m),e(m,S),e(S,I),e(I,P),e(P,p),e(p,L),e(p,le),e(p,A),e(I,b),e(I,T),e(T,$),e($,x),e($,Q),e($,re),e(m,W),e(m,y),e(y,g),Ge(B,g,null),e(g,O),Ge(R,g,null),J=!0},p(w,[q]){const D={};q&1&&(D.user=w[0]),B.$set(D)},i(w){J||(Ue(B.$$.fragment,w),Ue(R.$$.fragment,w),J=!0)},o(w){Fe(B.$$.fragment,w),Fe(R.$$.fragment,w),J=!1},d(w){w&&(n(a),n(r),n(l)),Me(B),Me(R)}}}function Rt(c,a,o){let r,{data:l}=a;return c.$$set=s=>{"data"in s&&o(1,l=s.data)},c.$$.update=()=>{c.$$.dirty&2&&o(0,r=l.profileResponse.data.user)},[r,l]}class qt extends Ke{constructor(a){super(),Qe(this,a,Rt,Ot,Xe,{data:1})}}export{qt as component,Ht as universal};
