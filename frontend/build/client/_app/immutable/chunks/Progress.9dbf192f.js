import{s as C,f as h,a as j,l as E,g as _,h as v,d as u,c as q,m as D,j as g,k as P,B as S,i as y,C as d,n as k,A}from"./scheduler.726ac76d.js";import{S as B,i as N}from"./index.8a5ed380.js";function z(a){let e,s,t,r,f,m,n,c,o,w,p;return{c(){e=h("div"),s=h("div"),t=h("div"),r=h("div"),m=j(),n=h("div"),c=h("span"),o=E(a[0]),w=E("/"),p=E(a[1]),this.h()},l(l){e=_(l,"DIV",{class:!0});var i=v(e);s=_(i,"DIV",{class:!0});var I=v(s);t=_(I,"DIV",{class:!0});var V=v(t);r=_(V,"DIV",{class:!0,role:!0,style:!0}),v(r).forEach(u),V.forEach(u),I.forEach(u),m=q(i),n=_(i,"DIV",{class:!0});var b=v(n);c=_(b,"SPAN",{class:!0});var x=v(c);o=D(x,a[0]),x.forEach(u),w=D(b,"/"),p=D(b,a[1]),b.forEach(u),i.forEach(u),this.h()},h(){g(r,"class",f="progress-bar bg-gradient "+a[4]),g(r,"role","progressbar"),P(r,"width",a[3]+"%"),g(t,"class","progress progress-sm progress-label"),S(t,"animated-progress",a[2]),g(s,"class","flex-grow-1 d-print-none"),g(c,"class",a[5]),g(n,"class","flex-shrink-0"),g(e,"class","d-flex gap-2 align-items-center")},m(l,i){y(l,e,i),d(e,s),d(s,t),d(t,r),d(e,m),d(e,n),d(n,c),d(c,o),d(n,w),d(n,p)},p(l,[i]){i&16&&f!==(f="progress-bar bg-gradient "+l[4])&&g(r,"class",f),i&8&&P(r,"width",l[3]+"%"),i&4&&S(t,"animated-progress",l[2]),i&1&&k(o,l[0]),i&32&&g(c,"class",l[5]),i&2&&k(p,l[1])},i:A,o:A,d(l){l&&u(e)}}}function F(a,e,s){let t,{now:r}=e,{max:f}=e,m="bg-success",n="text-success",{animation:c=!0}=e;return a.$$set=o=>{"now"in o&&s(0,r=o.now),"max"in o&&s(1,f=o.max),"animation"in o&&s(2,c=o.animation)},a.$$.update=()=>{a.$$.dirty&3&&s(3,t=r*100/f),a.$$.dirty&8&&(t>66.66?(s(4,m="bg-success"),s(5,n="text-success")):t<33.33?(s(4,m="bg-danger"),s(5,n="text-danger")):(s(4,m="bg-warning"),s(5,n="text-warning")))},[r,f,c,t,m,n]}class J extends B{constructor(e){super(),N(this,e,F,z,C,{now:0,max:1,animation:2})}}export{J as P};