"use strict"
;__filename="background/action_icon.js",define(["require","exports","./store","./utils","./i18n","./browser","./ports"],(e,l,t,i,n,a,s)=>{
Object.defineProperty(l,"__esModule",{value:true}),l.e=l.l=void 0
;let r,u=["/icons/enabled.bin","/icons/partial.bin","/icons/disabled.bin"];l.l=a.t.action;let o=e=>{
fetch(u[e]).then(e=>e.arrayBuffer()).then(l=>{
let n=new Uint8ClampedArray(l),a=l.byteLength/5,s=0|Math.sqrt(a/4),u=s+s,o=i.i()
;o[s]=new ImageData(n.subarray(0,a),s,s),o[u]=new ImageData(n.subarray(a),u,u),t.n[e]=o;let c=r.get(e);r.delete(e)
;for(let l=0,i=c.length;l<i;l++)t.a.has(c[l])&&t.r(c[l],e,true)})};l.e=()=>{let e=t.u;e!==!!t.n&&(t.r=e?c:t.o,
e?(t.n=[null,null,null],r=new Map,s.c(0,({d:{s:l},b:i})=>{if(0!==l.f){if(512&i&&e)return void(l.f=0);t.r(l.m,e?l.f:0)}
},()=>t.u===e)):setTimeout(()=>{t.u||null==t.n||(t.n=null,r=null)},200))};let c=(e,i,n)=>{let s
;if(e<0);else if(s=t.n[i]){let t=l.l.setIcon,i={tabId:e,imageData:s};n?t(i,a.g):t(i)
}else r.has(i)?r.get(i).push(e):(setTimeout(o,0,i),r.set(i,[e]))};l.e()});