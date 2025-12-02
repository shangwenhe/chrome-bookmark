"use strict"
;__filename="background/filter_tabs.js",define(["require","exports","./store","./utils","./browser","./ports","./exclusions","./run_commands"],(e,l,t,r,u,n,a,i)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.eu=l.lu=l.oe=l.tu=l.mayRequireActiveTab=l.getNecessaryCurTabInfo=l.Oe=l.getNearArrIndex=l.ru=l.He=l.ke=l.getTabRange=void 0,
l.getTabRange=(e,l,r,u)=>s(e,l,r,t.$,u,t.x.limited,t.x.filter);let s=(e,l,t,r,u,n,a)=>{let i=r>0;u&&(r+=i?u:-u)
;let s=e+r
;return s<=l&&s>-2?i?[e,s]:[s+1,e+1]:false===n||(null==n||"auto"===n)&&(Math.abs(r)<2*(t||l)||r<10||a&&null==n)?Math.abs(r)<l?i?[l-r,l]:[0,-r]:[0,l]:i?[e,l]:[0,e+1]
};l.ke=(e,r,n,a,s,c)=>{let o=a=>{if(!a||!a.length)return s(0),u.g()
;let c=u.selectIndexFrom(a),[o,d]=f?[0,a.length]:l.getTabRange(c,a.length,0,r);f&&(i.overrideCmdOptions({limited:false
},true),i.overrideOption("$limit",t.$),t.$=t.$>0?9999:-9999),n(a,e?[o,c,d]:[c+1===d||t.$>0&&o!==c?o:d-1,c,d],s)
},d=t.x.filter,f=d&&/(^|[&+])limit(ed)?=count\b/.test(d+"")
;if(a)if(0===a.length||Math.abs(t.$)>1||f)if(0===a.length||f||false){let e=a[0]?a[0].windowId:t.we
;(e>=0?u.ye(u.Ae.get,e,{populate:true}):u.ye(u.getCurWnd,true)).then(e=>{o(e?e.tabs:[])})
}else o(a);else r?a[0].index+t.$<0?u.le(o):u.Me.query({windowId:a[0].windowId,index:a[0].index+t.$
},r=>(r&&r.length&&(true===c||u.xe(r[0])&&(!c||c(r[0])))&&(!d||l.oe(a[0],r,d).length>0)?t.$<0?n([r[0],a[0]],[0,1,e?2:1],s):n([a[0],r[0]],[e?0:1,0,2],s):u.le(o),
u.g())):n(a,[0,0,1],s);else s(0)},l.He=()=>{let e=0,l=-1;return t.qe.forEach((r,u)=>{r>e&&u!==t.he&&(e=r,l=u)}),l},
l.ru=(e,t,r)=>{let n
;return e&&(e.index||t)?r&&r[n=Math.max(r.indexOf(e),0)+(t?1:-1)]&&u.xe(r[n])?Promise.resolve(r[n]):u.ye(u.Me.query,{
windowId:e.windowId,index:e.index+(t?1:-1)
}).then(n=>n&&n[0]?u.xe(n[0])?n[0]:(r&&r.length>2?Promise.resolve(r.filter(u.xe)):u.ye(u.le)).then(r=>r&&r.length?r[l.getNearArrIndex(r,e.index+(t?1:-1),t)]:null):null):Promise.resolve(null)
},l.getNearArrIndex=(e,l,t)=>{
for(let r=e.length>1?0:1;r<e.length;r++)if(e[r].index>=l)return e[r].index===l||t?r:r>0?r-1:0;return e.length-1},
l.Oe=(e,l)=>{1===Math.abs(e)?u.getCurTab(t=>{let r=t[0].index+e;r>=0?u.Me.query({windowId:t[0].windowId,index:r
},r=>(r&&r[0]?l(e>0?[t[0],r[0]]:[r[0],t[0]]):u.getCurTabs(l),u.g())):u.getCurTabs(l)}):u.getCurTabs(l)},
l.getNecessaryCurTabInfo=e=>{if(!e)return null;let t=l.mayRequireActiveTab(e)
;return t>2?u.ye(u.getCurTab).then(e=>e&&e[0]||null):t?Promise.resolve(n.j(null,t>1)).then(e=>e?{url:e}:null):null},
l.mayRequireActiveTab=e=>{let l=0;for(let t of(e+"").split(/[&+]/)){
let e=t.split("=",1)[0],r=e.includes(".")?"":e||t,u=t.slice(r?r.length+1:0)
;if(r&&"same"===u&&"hidden"!==r&&!r.startsWith("discard"))return 3;if(!u&&r){
if(r.startsWith("title")||"group"===r)return 3;l="hash"===r?2:l||("host"===r||"url"===r?1:0)}}return l}
;let c=(e,l)=>""===(e=e&&e.toLowerCase())||"1"===e||"true"===e?!l||null:"only"===e||"0"!==e&&"false"!==e&&null
;l.tu=(e,l,t)=>{let r=e?(e+"").split(/[&+]/).find(e=>e.startsWith(l)):null,u=r?r.slice(1+l.length):null
;return null!==u?c(u,t):null};let o=(e,l)=>{
let t=e&&"/"===e[0]?e.lastIndexOf("/"):0,u=t>1&&/^[a-z]+$/.test(e.slice(t+1))?r.$l(e.slice(1,t),e.slice(t+1).replace(/g/g,""),0):null
;return u?e=>u.test(e||""):l?e=>(e||"").includes(l):null};l.oe=(e,l,i,d)=>{var f;let h=0,m=0,b=0,w=[]
;for(let l of(i+"").split(/[&+]/)){
let n=l.split("=",1)[0],i=n.includes("."),s=!i&&n.endsWith("!"),d=i?"":(s?n.slice(0,-1):n)||l,k=l.slice(i?0:n.length+("="===l.charAt(n.length+1)?2:1)),v=k&&r.Ye(k),g="same"===v||"cur"===v||"current"===v,p=null
;switch(d){case"title":case"title*":let l=o(v,v||e&&e.title);p=l?e=>l(e.title):null;break;case"url":case"urlhash":
case"url+hash":case"url-hash":case"hash":let n=null;if("url"===d&&v)n=a.Ll(v);else{
let l=e?u.getTabUrl(e):null,t=d.includes("hash");n=l?a.Ll(":"+(t?l:l.split("#",1)[0])):null}
p=n?e=>a.Ml(n,u.getTabUrl(e)):p;break;case"title+url":let i=v&&o(v,v);p=i?e=>i(e.title)||i(u.getTabUrl(e)):p;break
;case"host":case"":let s=v||(d&&e?null===(f=r.uu(u.getTabUrl(e)))||void 0===f?void 0:f.host:"");p=s?e=>{var l
;return s===(null===(l=r.uu(u.getTabUrl(e)))||void 0===l?void 0:l.host)}:p;break;case"active":let w=c(v,1)
;p=null!=w?e=>e.active===w:p;break;case"new":case"old":case"visited":let k=c(v)===("new"!==d);p=e=>t.qe.has(e.id)===k
;case"discarded":case"discard":let x=!g&&c(v,1);p=null!=x?e=>e.discarded===x:p;break;case"group":
let M=v||(e?null!=u.getGroupId(e)?u.getGroupId(e)+"":"":null);p=null!=M?e=>{var l
;return(null!==(l=u.getGroupId(e))&&void 0!==l?l:"")+""===M}:p;break;case"hidden":let _=null;p=null!=_?e=>u.xe(e)!==_:p
;break;case"highlight":case"highlighted":let I=g?e?e.highlighted:null:c(v);p=null!=I?e=>e.highlighted===I:p;break
;case"incognito":let P=g?e?e.incognito:null:c(v);p=null!=P?e=>e.incognito===P:p;break;case"pinned":
let $=g?e?e.pinned:null:c(v,1);p=null!=$?e=>e.pinned===$:p;break;case"mute":case"muted":{
let l=g?e?u.isTabMuted(e):null:c(v);p=null!=l?e=>u.isTabMuted(e)===l:p}break;case"audible":case"audio":{
let l=g?e?e.audible:null:c(v);p=null!=l?e=>e.audible===l:p}break;case"min":case"max":case"limit":case"limited":
let y="count"===v?t.x.$limit||t.$:parseInt(v)||0;"min"===d?m=y:"max"===d?b=y:h=y||1,p=()=>true}p&&w.push([p,s])}
if(d&&(d.known=w.length>0),0===w.length)return l.slice(0);let k=l,v=l.filter(e=>{
for(let l of w)if(l[0](e)===l[1])return false;return true}),g=v.length
;if(!g||m>0&&g<m||b>0&&g>b)return t.x&&t.x.$else||n.showHUD(g?`${g} tabs found but expect ${g<m?m:b}`:"No tabs matched the filter parameter"),
[];if(h){let l=e?k.indexOf(e):-1;if(l<0){let r=e?e.id:t.he;l=k.findIndex(e=>e.id===r)}if(l>=0){
let e=v.findIndex(e=>k.indexOf(e)>=l),r=e>=0&&k.indexOf(v[e])>l;r&&v.splice(e,0,null)
;let u=s(e>=0?e:g-1,g,0,t.$>0?h:-h,r?1:0,false);v=v.slice(u[0],u[1]),r&&(v=v.filter(e=>!!e))
}else v=h>0?v.slice(0,h):v.slice(-h)}return v},l.lu=(e,l)=>{let r,n=(e,l)=>{e.ind=l
},a=(e,l)=>e<l?-1:e>l?1:0,i=e.map((e,l)=>({tab:e,ind:l,time:null,rhost:null,group:u.getGroupId(e),pinned:e.pinned
})),s=-1,c=false
;for(let e of(l instanceof Array?l.slice(0):(true===l?"time":l+"").split(/[, ]+/g)).reverse())r="r"===e[0]&&"e"!==e[1]||"-"===e[0]?(e=e.slice(1),
-1):1,e.includes("time")&&!e.includes("creat")||e.includes("recen")?(null==i[0].time&&i.forEach(e=>{
let l=e.tab.id,r=t.qe.get(l);e.time=l===t.he?1:null!=r?r:l+2
}),s=1):e.startsWith("host")||"url"===e?(i[0].rhost||i.forEach(e=>{
let l=e.tab.url,t=l.indexOf("://")+3,r=t>3?l.indexOf("/",t):0;if(r<t)return void(e.rhost=l)
;let u=l.slice(t,r),n=u.lastIndexOf(":"),a=n>0&&u.lastIndexOf(":",n-1)>0
;e.rhost=a?u:u.slice(0,n>0?n:u.length).split(".").reverse().join(".")+(n>0?" "+u.slice(1):"")}),
s="url"===e?3:2):s="title"===e?4:e.includes("creat")||"id"===e?5:"window"===e?6:"index"===e?7:"reverse"===e?(r=-1,7):-1,
s<0||(i.sort((e,l)=>(1===s?e.time-l.time:s<4?a(e.rhost,l.rhost)||(3===s?a(e.tab.url,l.tab.url):0):4===s?a(e.tab.title,l.tab.title):5===s?e.tab.id-l.tab.id:6===s?e.tab.windowId-l.tab.windowId:e.ind-l.ind)*r||e.ind-l.ind),
i.forEach(n),c=true)
;return c&&i.some(e=>null!=e.group)&&i.sort((e,l)=>null==e.group?null==l.group?e.ind-l.ind:1:null==l.group||e.group<l.group?-1:e.group>l.group?1:e.ind-l.ind),
c&&(i.forEach(n),i.sort((e,l)=>e.pinned!==l.pinned?e.pinned?-1:1:e.ind-l.ind)),c?i.map(e=>e.tab):e},
l.eu=async(e,l,r,n,a)=>{let i=l=>(!e||l.type===e)&&(null==r||l.incognito===r)&&(a||"minimized"!==l.state);if(t.nu>=0){
let e=await u.ye(u.Ae.get,t.nu);if(e&&i(e))return e;t.nu=-1}let s=[];{let e=(await u.ye(u.getCurTabs)||[]).map(e=>e.id)
;e.push(t.he),t.qe.forEach((l,t)=>{e.includes(t)||s.push([t,l])}),s.sort((e,l)=>l[1]-e[1])}if(s.length>0){
let e=await u.Pe(u.Me.get,s[0][0]);if(!e){let l=s.find(e=>t.a.has(e[0]));e=l&&await u.Pe(u.Me.get,l[0])}
let l=e&&await u.Pe(u.Ae.get,e.windowId);if(l&&i(l))return l}
let c=await u.Pe(u.Ae.getAll),o=c.filter(i),d=o.filter(e=>e.id!==n);return d.sort((e,l)=>l.id-e.id),
(d.length>0?d[0]:null)||(l?c.find(e=>e.id===n)||c.find(e=>e.focused)||null:[o,c.find(e=>e.id===n)])}});