"use strict"
;__filename="background/ports.js",define(["require","exports","./store","./utils","./browser","./exclusions","./i18n"],(e,l,t,r,n,o,u)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.Vn=l.eo=l.tryToKeepAliveIfNeeded_mv3_non_ff=l.getParentFrame=l.complainNoSession=l.complainLimits=l.c=l.ensuredExitAllGrab=l.showHUDEx=l.showHUD=l.safePost=l.isNotVomnibarPage=l.ensureInnerCSS=l.indexFrame=l.hn=l.R=l.isExtIdAllowed=l.findCPort=l.be=l.j=l.OnFreeze=l.OnConnect=l.sendResponse=void 0
;let i=0,f=(e,l)=>{if(90!==e.H)t.dn[e.H](e,l);else{let r=t.dn[e.c](e.a,l,e.i);r!==l&&l.postMessage({N:4,m:e.i,r})}}
;l.sendResponse=(e,t,r)=>{let n=l.hn(e);if(n&&n.J.includes(e))try{e.postMessage({N:4,m:t,r})}catch(e){}},
l.OnConnect=(e,l)=>{if(128&l)return void c(e,l)
;let r=e.sender.documentLifecycle,u=!!r&&"active"!==r,i=v(e),d=i.Jl,m=d===t.vomnibarPage_f;if(l>7||m){
if(999===l)return void(i.m>=0&&!i.Q&&n.removeTempTab(i.m,e.sender.tab.windowId,i.Jl))
;if(256&l||m)return void s(e,l,m||d===t.We.Nn);if(u)return void e.disconnect()}
let _,b,w,N=i.m,I=N>=0?t.a.get(N):void(N=i.m=t.getNextFakeTabId()),h=1!=(9&l)&&33!=(33&l)&&void 0!==I
;if(h&&null!==I.ls?(b=I.ls.ts,_=I.ls.f,w=2===_?3:1):(b=!o.ss||8&l?null:o.rs(d,i),_=null===b?0:b?1:2,w=0),i.f=_,
64&l&&(i.b=w|=64),h&&(w|=4&I.b,1024&l&&(w|=128,I.b|=128),i.b=w),8&l)4096&l&&e.postMessage({N:1,p:1&w?b:o.rs(d,i),f:3&w
}),g(I,e,l);else if(e.postMessage(4&l?{N:0,c:null,d:u,f:w,p:b}:{N:0,c:t.V,d:u,f:w,k:t.pn,m:t.ya,p:b,t:t.ha}),
u)return void e.disconnect();e.onDisconnect.addListener(a),e.onMessage.addListener(f);let k=0===i.Q
;h?(2&l&&(t.u&&I.d.s.f!==_&&t.r(N,_),I.d=e),k&&(I.C=e),I.J.push(e)):(t.a.set(N,{d:e,C:k?e:null,J:[e],ls:null,b:0}),
0!==_&&t.u&&t.r(N,_),void 0!==I&&p(I.J))};let a=e=>{let r,{m:o}=e.s,u=t.a.get(o);if(!u)return n.g();let i=u.J
;if(r=i.lastIndexOf(e),e.s.Q)return r===i.length-1?--i.length:r>=0&&i.splice(r,1),
i.length?e===u.d&&(u.d=i[0]):(512&u.b||t.a.delete(o),o===t.cs&&l.tryToKeepAliveIfNeeded_mv3_non_ff(o)),n.g()
;r>=0&&(t.a.delete(o),o===t.cs&&l.tryToKeepAliveIfNeeded_mv3_non_ff(o))},s=(e,l,o)=>{if(256&l){
if(o)return e.s.m<0&&(e.s.m=8&l?t.getNextFakeTabId():t.O?t.O.s.m:t.he),e.s.b|=256,t.Se.push(e),
e.onDisconnect.addListener(d),e.onMessage.addListener(f),void(8&l||e.postMessage({N:42,l:t.Nr,s:r.Hn(false)}))
}else e.s.m<0||0===e.s.Q||n.p(e.s.m,e.s.Q,[t.We.lo]);e.disconnect()},d=e=>{let l=t.Se,r=l.lastIndexOf(e)
;return r===l.length-1?--l.length:r>=0&&l.splice(r,1),n.g()},c=(e,l)=>{if(1024&l)e.disconnect();else if(e.s=false,
2048&l){let l=t.gn(null,null);if(l&&l.t){l.d=null,e.postMessage({N:49,t:l.t,s:l.s});let t=e=>{l&&(clearTimeout(l.i),
l.r&&l.r(e)),l=null};e.onMessage.addListener(t),e.onDisconnect.addListener(()=>{t(false)})}else e.disconnect()
}else e.onMessage.addListener(f)},v=e=>{let l=e.sender,t=l.tab;return l.tab=null,e.s={Q:l.frameId||0,b:0,f:0,
se:null!=t&&t.incognito,m:null!=t?t.id:-3,Jl:l.url}},p=e=>{for(let l of e)l.s.Q&&m(l)},m=e=>{try{e.s.b|=512,
e.onDisconnect.removeListener(a),e.postMessage({N:15})}catch(l){return e.disconnect(),1}};l.OnFreeze=(e,l)=>{
l.onDisconnect.removeListener(a),l.s.Q||(l.s.Q=2),a(l)},l.j=(e,u,i,f)=>{var a
;return(e=e||(null===(a=t.a.get(t.he))||void 0===a?void 0:a.C)||null)&&!i&&o.ss&&(u||o.fn)?e.s.Jl:new Promise(t=>{
let o=e&&e.s.Q&&r.isNotPriviledged(e)?n.N():null;e?(e.s.Q?o?o.getFrame:(e,l)=>l(null):n.tabsGet)(o?{tabId:e.s.m,
frameId:e.s.Q}:e.s.m,r=>{let o=r?r.url:"";return!o&&f&&(f.N=3,l.safePost(e,f)),t(o),n.g()
}):n.getCurTab(e=>(t(e&&e.length?n.getTabUrl(e[0]):""),n.g()))})},l.be=(e,r,n,o)=>{var u
;o||(t.O=o=t.O||(null===(u=t.a.get(t.he))||void 0===u?void 0:u.C));let i=l.j(o,r,n,e)
;if("string"!=typeof i)return i.then(l=>(e.u=l,l&&t.dn[e.H](e,o),l));e.u=i,t.dn[e.H](e,o)},l.findCPort=e=>{
let l=t.a.get(e&&e.s.m>=0?e.s.m:t.he);return l?l.d:null},l.isExtIdAllowed=e=>{
let l=null!=e.id?e.id:"unknown_sender",r=e.url,n=e.tab,o=t.au,u=o.get(l);if(true!==u&&n){
let e=t.a.get(n.id),r=e?e.fu:null;e&&(null==r||r!==l&&"string"==typeof r)&&(e.fu=null==r?l:2)}
return null!=u?u:r===t.vomnibarPage_f||(console.log("%cReceive message from an extension/sender not in the allow list: %c%s","background-color:#fffbe5","background-color:#fffbe5;color:red",l),
o.set(l,false),false)},l.R=()=>t.a.get(t.O?t.O.s.m:t.he),l.hn=e=>t.a.get(e.s.m),l.indexFrame=(e,l)=>{let r=t.a.get(e)
;for(let e of r?r.J:[])if(e.s.Q===l)return e;return null},l.ensureInnerCSS=e=>{if(8&e.b)return null;let l=t.a.get(e.m)
;return l&&(l.b|=4),e.b|=12,t.to},l.isNotVomnibarPage=(e,l)=>{let t=e.s,r=t.b
;return!(256&r)&&(l||2048&r||(console.warn("Receive a request from %can unsafe source page%c (should be vomnibar) :\n %s @ tab %o","color:red","color:auto",t.Jl.slice(0,128),t.m),
t.b|=2048),true)},l.safePost=(e,l)=>{try{let t=512&e.s.b;return t||e.postMessage(l),t?0:1}catch(e){return 0}}
;let _=(e,t)=>{l.showHUD(t+"",e)};l.showHUD=(e,r)=>{if("string"!=typeof e)return void e.then(_.bind(null,r))
;let n=14===r||15===r
;n&&(e.startsWith(t.We.U+"-")&&e.includes("://")&&(e=e.slice(e.indexOf("/",e.indexOf("/")+2)+1)||e),
e=e.length>41?e.slice(0,41)+"\u2026":e&&e+(t.ro?"\u3002":".")),t.O&&!l.safePost(t.O,{N:11,H:l.ensureInnerCSS(t.O.s),
k:n&&e?20:r||1,t:e})&&(t.O=null)},l.showHUDEx=(e,t,r,n,o)=>{if(!e)return;let i=o||u.zn(t,n)
;"string"==typeof i?l.safePost(e,{N:11,H:l.ensureInnerCSS(e.s),k:1,d:r,t:i}):i.then(l.showHUDEx.bind(null,e,"NS",r,[]))
},l.ensuredExitAllGrab=e=>{let l={N:8};for(let t of e.J)4&t.s.b||(t.s.b|=4,t.postMessage(l));e.b|=4},l.c=(e,l,n)=>{
let o=r.en(t.a),u=t.he,i=r=>{let n=t.a.get(r),o=0;return void 0!==n&&(512&n.b&&e&&(n.b|=e),o=Math.min(n.J.length,8),
l(n)),o};if(o.length>=10){let e=o.indexOf(u);e>=0&&(o.splice(e,1),i(u)),r.no(o,i,n)}else o.forEach(i)},
l.complainLimits=e=>{l.showHUDEx(t.O,"notAllowA",0,[e])},l.complainNoSession=()=>{
l.complainLimits("control tab sessions")},l.getParentFrame=(e,t,r)=>t&&n.N()?1===r&&true?n.ye(n.N().getFrame,{tabId:e,
frameId:t}).then(t=>{let r=t?t.parentFrameId:0;return r>0?l.indexFrame(e,r):null}):n.ye(n.N().getAllFrames,{tabId:e
}).then(n=>{let o=false,u=t;if(!n)return null;do{o=false;for(let e of n)if(e.frameId===u){u=e.parentFrameId,o=u>0;break}
}while(o&&0<--r);return u>0&&u!==t?l.indexFrame(e,u):null}):Promise.resolve(null);let b=e=>{
let o=performance.now(),u=1!==e;i&&(u&&clearTimeout(i),i=0);for(let e of u?t.Se:[])1024&e.s.b?e.postMessage({N:48,
d:e.s.b!==t.he}):e.s.b|=1024;let f=0;if(u){let e=[];t.a.forEach((l,r)=>{let n=l.J.length&&r>=0&&t.qe.get(r)||0
;n>0&&e.push(n)}),e.sort((e,l)=>l-e),f=Math.max(o-288e3,e.length?e[Math.min(5,e.length-1)]-1e3:0)}
let a=0,s=null,d=[],c=t.oo?t.cs:-1;if(t.a.forEach((e,l)=>{let n=e.J,o=n.length;if(a>3&&!o)return
;(a<3||o&&3===a)&&(a=l===c?o?1:2:o?4:3,s=e);let i=[];if(u)for(let e of n)1024&e.s.b?i.push(e):e.s.b|=1024
;if(!i.length)return void(4===a&&o&&l!==c&&(a=5,s=e))
;let v=(l>=0&&t.qe.get(l)||0)<f&&l!==t.he&&(1===o&&!(131072&e.b)&&n[0]===e.C||n.some(r.isNotPriviledged));if(o){
v&&(e.b|=512);for(let e of i)e.s.b|=512;d.push(e)}}),t.oo&&a>2){let e=t.a.get(t.cs)
;(null==e?void 0:e.d.s.Jl.startsWith(t.We.uo))&&(e.b=-131073&e.b|512,e.J.forEach(e=>e.s.b|=512),d.push(e))}let v=s
;for(let e of d){let t=!!(512&e.b)&&e!==v,n=!!(131072&e.b)||e.J.length>1,o=0,u=[]
;for(let l of e.J)512&l.s.b?!t||n&&!r.isNotPriviledged(l)?m(l)?o=1:a<6&&(a=6,s=e):(l.disconnect(),
l.s.Q&&(e.b|=131072)):(a<5&&(a=5,s=e),u.push(l));e===v&&(e.b&=-513),e.J.length=0,o&&(u.forEach(m),l.eo(e,1))}
let p=s?s.d.s.m:-1
;t.cs!==p&&(t.oo&&(t.oo=false,n.tabsGet(t.cs,N)),t.cs=p),-1===t.cs?t.A.keepWorkerAlive&&w():a<5&&a>1&&l.eo(s,0)}
;l.tryToKeepAliveIfNeeded_mv3_non_ff=e=>{if(!(e===t.cs&&!i&&!t.oo))return
;for(let l of t.a.values())if(l.J.length)return void(t.cs=e)
;let l=30001-performance.now()%3e4|0,r=l>3e3?0|Math.max(1e3,l-5e3):l>1200?0:-1;r<0?b(1):(t.cs=-1,i=setTimeout(b,r,1))},
l.eo=(e,l)=>{(131072&e.b||r.isNotPriviledged(e.d))&&(n.p(e.d.s.m,-1,null,(e,l)=>{
"object"==typeof VApi&&VApi&&VApi.q(0,l)},[0,512|(l?8:0)|126976&e.b]),e.b&=-258561)};let w=async()=>{
let e=await n.ye(n.getCurWnd,false),l=e&&"normal"===e.type?e.id:void 0;if(null==l){let e=await n.ye(n.Ae.getAll,{
windowTypes:["normal"]});l=e&&e.length?e[0].id:void 0}let r=await n.ye(n.Me.create,{url:t.We.uo,windowId:l,active:false
});if(!r)return;let o=r.id;if(t.cs=o,t.oo=true,n.Me.update(o,{autoDiscardable:false},n.g),!n.t.tabGroups)return
;let u=await n.Me.group({tabIds:[o],createProperties:{windowId:r.windowId}}).catch(t.o)
;null!=u&&n.t.tabGroups.update(u,{collapsed:true,title:"VimiumC",color:"grey"}).catch(t.o)},N=e=>{if(!e)return n.g()
;if(e&&e.url.startsWith(t.We.uo)){let l=e.id;n.Me.remove(l,()=>{let e=n.g();return e&&(t.cs=l,t.oo=true),e})}
},g=(e,r,o)=>{r.s.b|=16&o&&8,e||l.eo({d:r,C:null,J:[],ls:null,b:131072},0);let u=o;if(!(512&o)){
if(!(2&o&&e&&512&e.b))return;u=258048&e.b,(131072&u||r.s.Q)&&l.eo(e,0)}8192&u&&r.postMessage({N:6,d:t.V}),
32768&u&&r.postMessage({N:9,m:t.ya,t:t.ha,k:65536&u?t.pn:null}),16384&u&&8&r.s.b&&(r.s.b|=32,r.postMessage({N:11,H:t.to,
f:n.k(r.s)}))};l.Vn=(e,t)=>{let o=r.Je(),u=e&&(t?e.d:e.C);if(e&&(!u||512&u.s.b)){l.eo(e,0),
/^(?:http|file|ftp)/i.test(e.d.s.Jl)||n.selectTab(e.d.s.m,n.selectWndIfNeed);let r=0,u=setInterval(()=>{r++
;let l=t?e.d:e.C;5!==r&&(!l||512&l.s.b)||(clearInterval(u),o.Ge())},33)}else o.Ge();return o.Ee},setInterval(b,144e3),
i=setTimeout(b,22e3,1)});