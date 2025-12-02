"use strict"
;__filename="background/others.js",define(["require","exports","./store","./browser","./utils","./settings","./i18n","./normalize_urls","./normalize_urls","./open_urls"],(e,t,l,n,r,i,o,u,s,a)=>{
Object.defineProperty(t,"__esModule",{value:true}),l.ul.showActionIcon=e=>{let t=n.t.action;t?(l.u=e,
n.import2("/background/action_icon.js").then(e=>{e.e()}),Promise.resolve(o.Ce("name")).then(l=>{
e||(l+="\n\n"+o.Ce("noActiveState")),t.setTitle({title:l})})):l.ul.showActionIcon=void 0},i._l.then(()=>{
l.A.showActionIcon?l.ul.showActionIcon(true,"showActionIcon"):l.r=l.o}),(()=>{function e(){w&&(w.Xn=null),y=P=w=T=null,
k&&clearTimeout(k),$&&clearTimeout($),g=F=S=k=$=0,v="",r.Ol()}function t(){let l=Date.now()-g
;if(l>5e3||l<-5e3)return e();k=setTimeout(t,3e4)}function i(){$=0;let e=w;if(e&&!e.Yn&&(w=null,e.Xn)){let t=Date.now()
;return t<g&&(g=t-1e3),m(e.ci,e.Xn)}}function c(e,t,i,o,u){if(!e.Xn)return void(w===e&&(w=null));w=null
;let a,c=t.length>0?t[0]:null;F=o,S=u,P=[];let m=new Set,f=` ${l.Nr.t} `.includes(" type-letter ")
;for(let e=0,n=i?0:1,o=t.length;e<o;e++){
let o=t[e],{title:u,u:a,e:c}=o,d=a,g="",p=null!=o.s,b=!(i&&0===e||("tab"===c?o.s===l.he:"history"!==c||p));d=r.Sl(d,1),
d.startsWith("file")&&(d=s.tn(d)),d=d.replace(/%20/g," "),m.has(d)?d=`:${e+n} ${d}`:m.add(d),b&&(g=` ~${e+n}~`),
g=(u||f?(u?u+" <dim>":"<dim>")+(f?`[${o.e[0].toUpperCase()}] `:"")+(u?"-</dim> <url>":"</dim><url>"):"<url>")+o.textSplit+"</url>"+(g&&`<dim>${g}</dim>`)
;let h={content:d,description:g};b&&(h.deletable=true),(b||p)&&(y||(y=new Map),y.has(d)||y.set(d,{gi:c,il:p?o.s:null,
Jl:a})),P.push(h)}if(T=e.ci,i)if("search"===c.e){let e=c.p;a=(e&&`<dim>${r.zr(e)+p}</dim>`)+`<url>${c.textSplit}</url>`,
C=2,(c=t[1])&&"math"===c.e&&(P[1].description=`${c.textSplit} = <url><match>${c.t}</match></url>`)}else C=3,
a=P[0].description;else 1!==C&&(a=`<dim>${h}</dim><url>%s</url>`,C=1);i&&(v=t[0].u,
y&&P.length>0&&v!==P[0].content&&y.set(v,y.get(P[0].content)),P.shift()),a&&n.t.omnibox.setDefaultSuggestion({
description:a}),e.Xn(P),r.Ol()}function m(e,n){if(e=D(e),w){let t=e===w.ci;if(w.Xn=t?n:null,t)return}
if(e===T)return void(P&&n(P));if(1===F&&e.startsWith(T))return void n([]);if(w={Xn:n,ci:e,Yn:false},$)return
;let r=Date.now(),o=l.Nr.i+g-r;if(o>30&&o<3e3)return void($=setTimeout(i,o));w.Yn=true,k||(k=setTimeout(t,3e4)),g=r,
y=P=null,v="";let u=F<2||!e.startsWith(T)?0:3===F?e.includes(" ")?0:8:S;l.cl.Tl(e,{o:"omni",t:u,r:j,c:M,f:1
},c.bind(null,w))}function f(e,t,n){
return e?":"===e[0]&&/^:([1-9]|1[0-2]) /.test(e)&&(e=e.slice(" "===e[2]?3:4)):e=u.Xl(""),
"file://"===e.slice(0,7).toLowerCase()&&(e=r.En().test(e)?u.vn("show image "+e,false,0):e),null!=n?l.dn[7]({s:n
}):a.openUrlReq({u:e,r:"currentTab"===t?0:"newForegroundTab"===t?-1:-2})}let d=n.t.omnibox;if(!d)return
;let g,p=": ",b=false,h="Open: ",_=d.onDeleteSuggestion,T=null,v="",w=null,$=0,y=null,M=128,P=null,k=0,C=0,F=0,S=0,j=12,D=e=>{
if(e=e.trim().replace(r.D," "),l.In.actions.includes("icase")){let t=/^:[WBH] /.test(e)?3:0
;e=t?e.slice(0,t)+e.slice(t).toLowerCase():e.toLowerCase()}return e};d.onInputStarted.addListener(()=>{
if(n.getCurWnd(false,e=>{let t=e&&e.width;M=t?Math.floor((t-160)/7.72):128}),b||(b=true,
Promise.resolve(o.Ce("i18n")).then(()=>{"en"!==o.An()&&Promise.resolve(o.K("colon")).then(e=>{p=e+o.K("NS")||p,
h=o.K("OpenC")||h})})),k)return e()}),d.onInputChanged.addListener(m),d.onInputEntered.addListener(function t(n,r){
let o=w;if(o&&o.Xn){if(o.Xn=t.bind(null,n,r),o.Yn)return;return $&&clearTimeout($),i()}if(n=D(n),
null===T&&n)return l.cl.Tl(n,{o:"omni",t:0,r:3,c:M,f:1},(e,t)=>t?f(e[0].u,r,e[0].s):f(n,r));v&&n===T&&(n=v)
;let u=null==y?void 0:y.get(n),s=null==u?void 0:u.il;return e(),f(u?u.Jl:n,r,s)}),_.addListener(e=>{
let t=parseInt(e.slice(e.lastIndexOf("~",e.length-2)+1))-1,n=P&&P[t].content,r=n&&y?y.get(n):null,i=r&&r.gi;i?l.dn[25]({
t:i,s:r.il,u:r.Jl
}):console.log("Error: want to delete a suggestion but no related info found (may spend too long before deleting).")})
})(),(()=>{let e=0,t=false,r=0,i=l.Qe?"edge:":"chrome:",o=l.Qe?"":i+"//newtab/",u=l.Qe?"":i+"//new-tab-page/",s=t=>{
0===t.frameId&&t.url.startsWith(i)&&e&(l.Qe||!t.url.startsWith(o)&&!t.url.startsWith(u)?1:2)&&!r&&n.s(t.tabId)};n.v([{
origins:["chrome://*/*"]},l.Qe?null:{origins:["chrome://new-tab-page/*"]}],function a(c){if(e=(c[0]?1:0)+(c[1]?2:0),
1&e&&!l.A.allBrowserUrls&&(e^=1),t!==!!e){let e=n.N();if(!e)return false
;e.onCommitted[(t=!t)?"addListener":"removeListener"](s)}r=r||e&&setTimeout(()=>{e?n.Me.query({url:i+"//*/*"},t=>{r=0
;for(let r of t||[])!l.a.has(r.id)&&e&(r.url.startsWith(o)||r.url.startsWith(u)?2:1)&&n.s(r.id);return n.g()}):r=0
},120),e&&!l.ul.allBrowserUrls&&(l.ul.allBrowserUrls=a.bind(null,c,false))})})(),
l.tl&&Promise.all([l.tl,i._l]).then(([e])=>{let t=e&&e.reason,s="install"===t?"":"update"===t&&e.previousVersion||"none"
;"none"!==s&&setTimeout(()=>{if(n.Me.query({status:"complete"},e=>{let t=/^(file|ftps?|https?):/
;for(let r of e)t.test(r.url)&&!l.a.has(r.id)&&n.s(r.id)
}),console.log("%cVimium C%c has been %cinstalled%c with %o at %c%s%c.","color:red","color:auto","color:#0c85e9","color:auto",e,"color:#0c85e9",r.now(),"color:auto"),
l.We.is&&console.log("Sorry, but some commands of Vimium C require the permission to run in incognito mode."),!s){
let e=()=>{l.ns||l.bi?++t<25&&setTimeout(e,200):a.Un({u:l.We.Fr+"#commands"})},t=0;return void e()}
if(i.al("vomnibarPage"),parseFloat(s)>=parseFloat(l.We.Ta)&&(s>="1.99.98"||l.We.Ta<"1.99.98"))return
;if(i.al("newTabUrl"),!l.A.notifyUpdate)return;let t="vimium_c-upgrade-notification"
;Promise.all([o.K("Upgrade"),o.K("upgradeMsg",[l.We.aa]),o.K("upgradeMsg2"),o.K("clickForMore")]).then(([e,r,i,o])=>{
let s={type:"basic",iconUrl:l.Ue+"icons/icon128.png",title:"Vimium C "+e,message:r+i+"\n\n"+o};l.hi>=70&&(s.silent=true)
;let c=n.t.notifications;c&&c.create(t,s,e=>{let l;if(l=n.g())return l;t=e||t,c.onClicked.addListener(function e(t){
t==t&&(c.clear(t),a.Un({u:u.Xl("vimium://release")}),c.onClicked.removeListener(e))})})})},500)}),setTimeout(()=>{
let e=globalThis.document;e&&e.body&&(e.body.innerText=""),r.Ol()},1e3)});