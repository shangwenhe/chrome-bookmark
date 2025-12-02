"use strict"
;__filename="background/page_handlers.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./settings","./ports","./exclusions","./ui_css","./key_mappings","./run_commands","./tools","./open_urls","./frame_commands"],(l,e,n,r,t,u,s,o,i,a,f,d,m,c,v,p)=>{
Object.defineProperty(e,"__esModule",{value:true}),e.onReq=void 0;let _=[()=>[o.E,n.G,n.We.ka],l=>{
if(n.bi)return n.bi.then(_[1].bind(null,l,null));let e={};for(let l in o.E){let r=n.A[l];r!==o.E[l]&&(e[l]=r)}return e
},l=>{var e,r;if(n.bi)return n.bi.then(_[2].bind(null,l,null))
;let t=l.key,u=null!==(r=null!==(e=l.val)&&void 0!==e?e:o.E[t])&&void 0!==r?r:null;o.La(t,u);let s=n.A[t]
;return s!==u?s:null},l=>{let e=o.W(l.key,l.val);return e!==l.val?e:null},l=>{o.mn({N:6,d:l})},l=>n.A[l.key],l=>{
n.a.has(l)||t.s(l)},()=>{let l=d.xn;if(1&n.V.l&&!l){let l=l=>/[^ -\xff]/.test(l.join("")),e=l(Object.keys(n.pn))?1:0
;if(e|=n.ya&&l(Object.keys(n.ya))?2:0,e&&(e|=2&e||!n.ya||!l(Object.values(n.ya))?0:4,2&e||!(4&e)))return true}
return l?(l=>{let e,n,r=l.length>1?l.length+" Errors:\n":"Error: ";for(n of l)e=0,
r+=n[0].replace(/%([a-z])/g,(l,r)=>(++e,"c"===r?"":"s"===r||"d"===r?n[e]:JSON.stringify(n[e]))),
e+1<n.length&&(r+=" "+n.slice(e+1).map(l=>"object"==typeof l&&l?JSON.stringify(l):l).join(" ")),r+=".\n";return r
})(l):""},l=>{let e=i.indexFrame(l[1],0);return e&&e.s&&(e.s.b|=44),f.mergeCSS(l[0],-1)},l=>{
l&&o.su("isHC_f",l.hc?"1":null),f.ou(2)},l=>[u.Xl(l[0],null,l[1]),u.Yl],()=>{},()=>{
let l=n.yn.get("?"),e=l&&8===l.kn&&l.Mn?"?":"";return e||n.yn.forEach((l,n)=>{
8===l.kn&&l.Mn&&(e=e&&e.length<n.length?e:n)}),e},l=>{var e
;return[l=u.Xl(l,null,0),null!==(e=n.Le.get(l))&&void 0!==e?e:null]},l=>{let e=new Map;s.iu("k:"+l,e);let n=e.get("k")
;if(null==n)return null;let r=u.Xl(n.Jl,null,-2),t=u.Yl>2
;return[!t,t?n.Jl:r.replace(/\s+/g,"%20")+(n.Tr&&"k"!==n.Tr?" "+n.Tr:"")]},l=>{v.Un(l)},l=>{let e=null
;return l.startsWith("vimium://")&&(e=n.$r(l.slice(9),1,true)),e=null!==e?e:u.Xl(l,null,-1),
"string"==typeof e&&(e=s.Wn(e,"whole"),e=u.ei(e)),e},()=>n.Kn&&n.Kn(),l=>n.S(l[0],l[1]),l=>v.Ln(l),()=>{
let l=n.he>=0&&n.a.get(n.he)||null,e=l?n.he:-1,u=l?l.d.s.Q:-1,s=u>=0&&t.N()||null
;return Promise.all([t.ye(t.getCurTab).then(l=>l&&l.length?l:e<0?null:t.ye(t.tabsGet,e).then(l=>l&&[l])),s?t.ye(s.getFrame,{
tabId:e,frameId:u}):null,n.bi]).then(([l,s])=>{var i
;let f=l&&l[0]||null,d=f?f.id:n.he,m=null!==(i=n.a.get(d))&&void 0!==i?i:null
;s&&s.url&&e===d&&m.d.s.Q===u&&(m.d.s.Jl=s.url);let c=f?t.getTabUrl(f):m&&(m.C||m.d).s.Jl||"";f&&m&&m.C&&(m.C.s.Jl=c)
;let v=!m||m.d.s.Q&&!r.ln.test(m.d.s.Jl)?null:m.d.s,p=!(m||f&&c&&"loading"===f.status&&/^(ht|s?f)tp/.test(c)),_=k(m),b=!p&&!_,g=b?null:_||!c?_:c.startsWith(location.protocol)&&!c.startsWith(n.Ue)?new URL(c).host:null,y=g?n.au.get(g):null
;return b||null==y||true===y?g=null:m&&(m.fu=-1),{ver:n.We.aa,runnable:b,url:c,tabId:d,
frameId:m&&(v||m.C)?(v||m.C.s).Q:0,topUrl:v&&v.Q&&m.C?m.C.s.Jl:null,frameUrl:v&&v.Jl,lock:m&&m.ls?m.ls.f:null,
status:v?v.f:0,unknownExt:g,exclusions:b?{rules:n.A.exclusionRules,onlyFirst:n.A.exclusionOnlyFirstMatch,
matchers:a.on(null),defaults:o.E.exclusionRules}:null,os:n.G,reduceMotion:n.V.m}})},([l,e])=>{
let u=n.A.extAllowList,s=u.split("\n");if(s.indexOf(e)<0){let l=s.indexOf("# "+e)+1||s.indexOf("#"+e)+1
;s.splice(l?l-1:s.length,l?1:0,e),u=s.join("\n"),o.La("extAllowList",u)}let i=n.a.get(l);return i&&(i.fu=null),
t.ye(t.t.tabs.get,l).then(l=>{let e=r.Je(),n=()=>(m.runNextOnTabLoaded({},l,e.Ge),t.t.runtime.lastError)
;return l?t.t.tabs.reload(l.id,n):t.t.tabs.reload(n),e.Ee})},([l,e,r])=>{n.$r("status/"+l,3)
;let t=i.indexFrame(e,r)||i.indexFrame(e,0),u=t?n.a.get(e).ls:null;return t&&!u&&n.dn[10]({u:t.s.Jl},t),
[t?t.s.f:0,u?u.f:null]},l=>a.on(l)[0],(l,e)=>p.initHelp({f:true},e),l=>{let e=l.module,n=l.name,r=b[e]
;if(!b.hasOwnProperty(e)||!r.includes(n))return[void 0,{message:"refused"}];let u=t.t[e],s=l.args,o=u[n]
;return new Promise(l=>{s.push(e=>{let n=t.g();return l(n?[void 0,n]:[g(e),void 0]),n}),o.apply(u,s)})
},(l,e)=>e.s.m,l=>{let e=r.i();if(l){let r=n.du.get(l);e[l]=null!=r?r:null}else n.du.forEach((l,n)=>{e[n]=l});return e
},({key:l,val:e})=>{l.includes("|")&&o.su(l,e)},({key:l,val:e},r)=>{let t=r&&r.s&&r.s.m||n.he,u=n.Se.find(l=>l.s.m===t)
;u&&u.postMessage({N:47,d:{[l]:e}})},()=>{n.A.vimSync&&n.ul.vimSync(true,"vimSync")},()=>({os:n.G}),l=>{t.tabsCreate({
url:l.url}),t.t.tabs.remove(l.tabId)}],b={permissions:["contains","request","remove"],tabs:["update"]},g=l=>({
message:l&&l.message?l.message+"":JSON.stringify(l)});e.onReq=(l,e)=>_[l.n](l.q,e)
;let k=l=>l&&"string"==typeof l.fu&&true!==n.au.get(l.fu)?l.fu:null});