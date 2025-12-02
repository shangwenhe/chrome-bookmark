"use strict";__filename="background/browser.js",define(["require","exports","./store","./utils"],(e,l,t,r)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.import2=l.s=l.p=l.v=l.w=l.removeTempTab=l.downloadFile=l.makeTempWindow_r=l.makeWindow=l.openMultiTabs=l.tabsCreate=l.selectWndIfNeed=l.selectWnd=l.selectTab=l.h=l.k=l.Pe=l.$e=l.ye=l.H=l.selectIndexFrom=l.selectFrom=l.getCurWnd=l.xe=l.le=l.getCurTabs=l.getCurTab=l.isTabMuted=l.getTabUrl=l.getGroupId=l.tabsUpdate=l.tabsGet=l.g=l.N=l.Te=l.Ae=l.Me=l.t=void 0,
l.t=chrome,l.Me=l.t.tabs,l.Ae=l.t.windows,l.Te=()=>l.t.sessions,l.N=()=>l.t.webNavigation,l.g=()=>l.t.runtime.lastError,
l.tabsGet=l.Me.get,l.tabsUpdate=l.Me.update,l.getGroupId=e=>{let l=e.groupId;return-1!==l&&null!=l?l:null},
l.getTabUrl=e=>e.url||e.pendingUrl||"",l.isTabMuted=e=>e.mutedInfo.muted,l.getCurTab=l.Me.query.bind(null,{active:true,
lastFocusedWindow:true}),l.getCurTabs=l.Me.query.bind(null,{lastFocusedWindow:true}),l.le=l.getCurTabs,l.xe=()=>true,
l.getCurWnd=(e,r)=>{let u={populate:e};return t.we>=0?l.Ae.get(t.we,u,r):l.Ae.getCurrent(u,r)},
l.selectFrom=e=>e[l.selectIndexFrom(e)],l.selectIndexFrom=e=>{for(let l=e.length;0<--l;)if(e[l].active)return l;return 0
},l.H=e=>/^(edge-)?extension:/.test(e)?t.We.U+"-"+e.slice(e.indexOf("ext")):e,l.ye=function(e){
let t=[].slice.call(arguments,1),{Ee:u,Ge:n}=r.Je();return t.push(e=>{let t=l.g();return n(t?void 0:null!=e?e:null),t}),
e.apply(void 0,t),u},l.$e=e=>e!==t.o?()=>{let t=l.g();return e(!t),t}:l.g,l.Pe=function(e){
let l=[].slice.call(arguments,1);return new Promise(t=>{l.push(t),e.apply(0,l)})};let u=(e,l)=>{let r=t.Le.get(e)
;return 1===r||2===r&&!(!t.Qe&&!l)};l.h=e=>{l.k=e},l.selectTab=(e,t)=>{l.tabsUpdate(e,{active:true},t)},
l.selectWnd=e=>(e&&l.Ae.update(e.windowId,{focused:true
}),l.g()),l.selectWndIfNeed=e=>(e&&e.windowId!==t.we&&l.selectWnd(e),l.g()),l.tabsCreate=(e,r,n)=>{let{url:o}=e
;return o?u(o,2===t.fe)&&delete e.url:(o=t.newTabUrl_f,
2===t.fe&&(-1===n?o.includes("pages/blank.html")&&o.startsWith(t.Ue):!n&&o.startsWith(location.protocol))||u(o,2===t.fe)||(e.url=o),
e.url||delete e.url),l.Me.create(e,r)},l.openMultiTabs=(e,t,r,u,n,o,s)=>{let i;n=false!==n,
i=null!=o?l.getGroupId(o):null,n||null==i||delete e.index,i=n&&null!=i&&l.Me.group?i:void 0,l.tabsCreate(e,r=>{
if(l.g())return s&&s(),l.g();e.index=r.index,e.windowId=r.windowId,null!=i&&l.Me.group({tabIds:r.id,groupId:i}),s&&s(r),
e.active=false;let n=null!=e.index,o=u?u.length:1,a=null!=i?e=>(e&&l.Me.group({tabIds:e.id,groupId:i}),l.g()):l.g
;u.length>1&&(u[0]=e.url);for(let r=0;r<t;r++)for(let t=r>0?0:1;t<o;t++)u.length>1&&(e.url=u[t]),n&&++e.index,
l.Me.create(e,a)},r)},l.makeWindow=(e,r,n)=>{let o=false!==e.focused
;(r=r?"minimized"===r===o||"popup"===e.type||"normal"===r||"docked"===r?"":r:"")&&!r.includes("fullscreen")&&(e.state=r,
r=""),e.focused=true;let s=e.url
;s||null!=e.tabId||(s=e.url=t.newTabUrl_f),"string"==typeof s&&u(s,e.incognito)&&delete e.url,
l.Ae.create(e,r||!o||n?e=>{if(n&&n(e),!(r||!o)||!e)return l.g();let t=o?{}:{focused:false};r&&(t.state=r),
l.Ae.update(e.id,t)}:l.g)},l.makeTempWindow_r=(e,t,r)=>{l.Ae.create({type:"normal",focused:false,incognito:t,
state:"minimized",tabId:e},r)},l.downloadFile=(e,u)=>e.startsWith("data:")?t.Xe(4,{u:e,t:u||""
},null).then(e=>!!e):l.ye(l.t.permissions.contains,{permissions:["downloads"]}).then(t=>{if(!t)return false;let n={url:e
};if(u){let l=/\.[a-z\d]{1,4}(?=$|[?&])/i
;if(u=(u="#"===(u=r.Ye(u))[0]?u.slice(1):u).replace(/[\r\n]+/g," ").replace(/[/\\?%*:|"<>_]+/g,"_"),!l.test(u)){
let t=l.exec(e);u+=t?t[0]:e.includes(".")?"":".bin"}n.filename=u}return l.ye(l.t.downloads.download,n).then(()=>true)}),
l.removeTempTab=e=>{l.Me.remove(e,l.g)
},l.w=e=>(e=e.slice(0,99).toLowerCase(),1!==t.Le.get(e)&&(e.startsWith("about:")?"about:blank"!==e:e.startsWith("chrome:")?!e.startsWith("chrome://downloads"):e.startsWith(t.We.U)&&!("string"!=typeof t.We.Ze?t.We.Ze.test(e):e.startsWith(t.We.Ze))||t.Qe&&/^(edge|extension):/.test(e)&&!e.startsWith("edge://downloads"))),
l.v=(e,t)=>{
let r=l.t.permissions,u=Promise.all(e.map(e=>e&&l.ye(l.t.permissions.contains,e))),n=e.map(e=>e&&(e.permissions||e.origins)[0])
;u.then(e=>{let l=false,u=false,o=(o,a)=>{let d=!a;if(a){let l=a.permissions;for(let t of l||[]){let l=n.indexOf(t)
;l>=0&&(e[l]=o,d=true)}for(let t of(!l||l.length<=0)&&a.origins||[])if("chrome://*/*"!==t){let l=n.indexOf(t)
;l>=0&&(e[l]=o,d=true)}else for(let l=0;l<n.length;l++)(n[l]||"").startsWith("chrome://")&&(e[l]=o,d=true)}
d&&(false===t(e,true)&&(l=u=false),l!==e.includes(false)&&r.onAdded[(l=!l)?"addListener":"removeListener"](s),
u!==e.includes(true)&&r.onRemoved[(u=!u)?"addListener":"removeListener"](i))},s=o.bind(null,true),i=o.bind(null,false)
;e.includes(false)||e.includes(true)?o(true):t(e,false)})},l.p=(e,t,r,u,n,o)=>{l.t.scripting.executeScript({
files:u?void 0:r,func:u,args:n,target:t>=0?{tabId:e,frameIds:[t]}:{tabId:e,allFrames:true},injectImmediately:true
},o||l.g)},l.s=e=>{let r=t.Ue.length-1;l.p(e,-1,t.We.el.slice(0,-1).map(e=>e.slice(r)))},
l.import2=e=>Promise.resolve(__moduleMap[e.split("/").slice(-1)[0].replace(".js","")]),t.ll<6&&(t.tl=new Promise(e=>{
let t=l.t.runtime.onInstalled,r=l=>{let u=r;u&&(r=null,e(l),t.removeListener(u))};t.addListener(r),
setTimeout(r,6e3,null)}))});