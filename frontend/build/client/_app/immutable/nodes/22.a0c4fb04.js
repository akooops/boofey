import{H as r}from"../chunks/paths.29c5142d.js";import{a as s}from"../chunks/auth.82ff8344.js";import{s as c}from"../chunks/scheduler.726ac76d.js";import{S as l,i as m,b as p,d as f,m as u,a as d,t as _,e as v}from"../chunks/index.8a5ed380.js";import{R as g}from"../chunks/ReceiptCard.adb0e844.js";const $=!1;async function S({fetch:o,url:t,depends:n,params:e}){let a=await o(r(e.invoiceId),{headers:{Authorization:`${localStorage.getItem("SID")}`}});return s(a),{invoice:(await a.json()).data.invoice,tabTitle:"Invoice Details"}}const w=Object.freeze(Object.defineProperty({__proto__:null,load:S,ssr:$},Symbol.toStringTag,{value:"Module"}));function b(o){let t,n;return t=new g({props:{invoice:o[0].invoice}}),{c(){p(t.$$.fragment)},l(e){f(t.$$.fragment,e)},m(e,a){u(t,e,a),n=!0},p(e,[a]){const i={};a&1&&(i.invoice=e[0].invoice),t.$set(i)},i(e){n||(d(t.$$.fragment,e),n=!0)},o(e){_(t.$$.fragment,e),n=!1},d(e){v(t,e)}}}function h(o,t,n){let{data:e}=t;return o.$$set=a=>{"data"in a&&n(0,e=a.data)},[e]}class P extends l{constructor(t){super(),m(this,t,h,b,c,{data:0})}}export{P as component,w as universal};
