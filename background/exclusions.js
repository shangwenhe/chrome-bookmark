"use strict"
;__filename="background/exclusions.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./settings","./ports"],(e,l,t,n,r,i,u,o)=>{
Object.defineProperty(l,"__esModule",{value:true}),l.in=l.un=l.rs=l.on=l.fn=l.ss=l.Ml=l.Ll=l.sn=void 0,l.sn=(e,l)=>{
let t,r,u
;return l=l&&l.replace(/<(\S+)>/g,"$1"),"^"===e[0]?(t=n.$l(e.startsWith("^$|")?e.slice(3):e,"",0))||console.log("Failed in creating an RegExp from %o",e):"`"===e[0]&&((r=n.an(e.slice(1),0))||console.log("Failed in creating an URLPattern from %o",e)),
u=t?{t:1,v:t,k:l}:r?{t:3,v:{p:r,s:e.slice(1)},k:l}:{t:2,
v:e.startsWith(":vimium://")?i.vn(e.slice(10),false,-1):e.slice(1),k:l},u},l.Ll=e=>{let l;if("^"===e[0]){
e=e.startsWith("^$|")?e.slice(3):e,l=".*$".includes(e.slice(-2))?e.endsWith(".*$")?3:e.endsWith(".*")?2:0:0,
e=0!==l&&"\\"!==e[e.length-l]?e.slice(0,-l):e;let t=n.$l(e,"");return t?{t:1,v:t}:null}if("`"===e[0]){
let l=e.slice(1),t=n.an(l);return t?{t:3,v:{p:t,s:l}}:null}
if("localhost"===e||!e.includes("/")&&e.includes(".")&&(!/:(?!\d+$)/.test(e)||n.cn(e,6))){let l
;e=(e=(e=e.toLowerCase()).endsWith("*")?e.slice(0,/^[^\\]\.\*$/.test(e.slice(-3))?-2:-1):e).startsWith(".*")&&!/[(\\[]/.test(e)?"*."+e.slice(2):e
;let t=n.$l("^https?://"+(e.startsWith("*")&&"."!==e[1]?"[^/]"+e:(l=e.replace(/\./g,"\\."),
l.startsWith("*")?l.replace("*\\.","(?:[^./]+\\.)*?"):l)),"",0);return t?{t:1,v:t}:e.includes("*")?null:{t:2,
v:"https://"+(e.startsWith(".")?e.slice(1):e)+"/"}}
return l=(e=(e=(":"===e[0]?e.slice(1):e).replace(/([\/?#])\*$/,"$1")).startsWith("vimium://")?i.vn(e.slice(9),false,-1):e.startsWith("extension:")?"chrome-"+e:e).indexOf("://"),
{t:2,v:l>0&&l+3<e.length&&e.indexOf("/",l+3)<0?e+"/":e}
},l.Ml=(e,l)=>1===e.t?e.v.test(l):2===e.t?l.startsWith(e.v):e.v.p.test(l);let f=false;l.ss=f;let s=false;l.fn=s
;let a=false,v=[],c=e=>{v=e.map(e=>l.sn(e.pattern,e.passKeys))};l.on=e=>(e?[l.sn(e,"")]:v).map(e=>({t:e.t,
v:1===e.t?e.v.source:2===e.t?e.v:e.v.s})),l.rs=(e,r)=>{var i;let u=""
;for(let l of v)if(1===l.t?l.v.test(e):2===l.t?e.startsWith(l.v):l.v.p.test(e)){let e=l.k
;if(0===e.length||"^"===e[0]&&e.length>2||a)return e&&e.trim();u+=e}
if(!u&&r.Q&&e.lastIndexOf("://",5)<0&&!n.ln.test(e)){let e=null===(i=t.a.get(r.m))||void 0===i?void 0:i.C
;if(null!=e)return l.rs(e.s.Jl,e.s)}return u?u.trim():null};let d=()=>{let e=!r.N()||false?null:e=>{t.dn[10](e)}
;return d=()=>e,e};l.un=()=>{let e=new Set;for(let{k:l}of v)if(l){if("^"===l[0]&&l.length>2)return true
;for(let t of l.split(" "))e.add(t)}return e.size?e:null},l.in=e=>{let n=v.length>0?null:{N:1,p:null,f:0}
;if(e)return void(n||u.mn({N:3,H:10,U:0}));let r=null!=t.n||void 0!==t.n&&t.u,i=v;o.c(4096,e=>{let i=e.d.s.f,u=e.d.s
;for(let t of e.J){let r=null,i=0;if(n){if(0===t.s.f)continue}else if(r=l.rs(t.s.Jl,t.s),i=null===r?0:r?1:2,
!r&&t.s.f===i)continue;e.ls||(t.postMessage(n||{N:1,p:r,f:0}),t.s.f=i)}r&&i!==u.f&&t.r(u.m,u.f)},()=>i===v)};let m=()=>{
let e=v.length>0,n=e||f?d():null;if(!n)return;if(f!==e){l.ss=f=e;let t=r.N().onHistoryStateUpdated
;e?t.addListener(n):t.removeListener(n)}let i=e&&t.A.exclusionListenHash;if(s!==i){l.fn=s=i
;let e=r.N().onReferenceFragmentUpdated;i?e.addListener(n):e.removeListener(n)}};t.ul.exclusionRules=e=>{
let n=!v.length,r=t.pn;c(e),a=t.A.exclusionOnlyFirstMatch,m(),setTimeout(()=>{setTimeout(l.in,10,n),
t.pn===r&&u.al("keyMappings",null)},1)},t.ul.exclusionOnlyFirstMatch=e=>{a=e},t.ul.exclusionListenHash=m,u._l.then(()=>{
c(t.A.exclusionRules),a=t.A.exclusionOnlyFirstMatch})});