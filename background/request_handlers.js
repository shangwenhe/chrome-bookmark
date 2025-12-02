"use strict"
;__filename="background/request_handlers.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./settings","./ports","./exclusions","./ui_css","./i18n","./key_mappings","./run_commands","./run_keys","./tools","./open_urls","./frame_commands","./tab_commands"],function(e,l,t,r,n,i,o,u,s,a,f,d,m,v,c,p,b,g,y){
let _;Object.defineProperty(l,"__esModule",{value:true}),t.dn=[(e,l)=>{let r=e.handler
;r&&"string"==typeof r&&("focus"===r?(4&l.s.b||(l.s.b|=4,l.postMessage({N:8
})),t.dn[12]({},l)):"command"===r?v.executeExternalCmd(e,null,l):"tip"===r&&(t.O=s.indexFrame(l.s.m,0)||l,
s.showHUD(e.tip||"Error: Lack .tip")))},()=>0,(e,l)=>{let r=e.k,n=u.vi;if(!(r>=0&&r<n.length))return t.O=l,
s.complainLimits(d.K("notModify",[r]));let i=n[r],o=t.bi;t.A[i]!==e.v&&(o?o.then(()=>{u.La(i,e.v)}):u.La(i,e.v))
},(e,l)=>{let t="object"==typeof e;return p.ce.Jr(l.s.se,t?e.q:"",t?1:e)},(e,l)=>{let t=o.Ne(e);if(null==e.i)return t
;l.postMessage({N:44,i:e.i,s:t})},(e,l)=>{let i=e.u,u=e.e,a=o.gu(e);r.Ol(),e.e=a,null==a.p?(t.O=l,
s.showHUD(a.u)):u||i!==a.u?!l||"file://"===a.u.slice(0,7).toLowerCase()&&"file://"!==i.slice(0,7).toLowerCase()?n.tabsUpdate({
url:a.u}):v.sendFgCmd(18,false,{r:1,u:a.u}):(t.O=l,s.showHUD("Here is just root"),e.e={p:null,u:"(just root)"})
},(e,l)=>{let r,n=o.Ne(e);if(!n||!n.k)return t.O=l,s.showHUD(d.K("noEngineFound")),void(e.n&&v.runNextCmdBy(0,e.n))
;let i=e.o||b.parseOpenPageUrlOptions(e.n),u={}
;r=e.t.trim()&&t.S(e.t.trim(),524288,i.s,u).trim()||(e.c?t.El(i.s,0,u={}):""),Promise.resolve(r).then(r=>{var o
;let a=null===r?"It's not allowed to read clipboard":(r=r.trim())?"":d.K("noSelOrCopied");if(a)return t.O=l,
s.showHUD(a),void(e.n&&v.runNextCmdBy(0,e.n));i.k=null!==(o=u.F)&&void 0!==o?o:null==i.k?n.k:i.k,t.dn[8]({u:r,o:i,r:0,
n:v.parseFallbackOptions(e.n)||{}},l)})},(e,l)=>{let r=e.s,i=0!==e.a,o=2===e.a,u=t.we;if(t.O=s.findCPort(l),
"number"==typeof r)return void n.selectTab(r,e=>(n.g()?s.showHUD(d.K("noTabItem")):n.selectWnd(e),n.g()))
;if(!n.Te())return void s.complainNoSession();let a=l.s.m>=0?l.s.m:t.he>=0?t.he:null,f=i?null:a;n.Te().restore(r[1],e=>{
let l=n.g();return l?s.showHUD(d.K("noSessionItem")):y.Ie(u,e,f).then(e=>{o&&a&&e&&e.windowId!==u&&n.tabsGet(a,l=>{
n.Me.move(e.id,{windowId:u,index:l?l.index+1:-1},n.g),n.tabsUpdate(e.id,{active:true})})}),l}),f&&n.selectTab(f,n.g)
},b.openUrlReq,(e,l)=>{let r,n=l.s.m,i=t.a.get(n);if(!i)return void(t.u&&t.r(n,l.s.f));let o=i.d;l!==o&&(i.d=l,
t.u&&(r=l.s.f)!==o.s.f&&t.r(n,r))},(e,l)=>{let r=l;if(!r&&(r=s.indexFrame(e.tabId,e.frameId),!r)){let l=t.a.get(e.tabId)
;return void(l&&512&l.b&&(l.b|=4096))}let{s:n}=r,i=n.Jl,o=t.a.get(n.m),u=n.Jl=l?e.u:e.url;if(o&&o.ls)return
;let f=a.ss?a.rs(u,n):null,d=null===f?0:f?1:2;if(n.f!==d)n.f=d,t.u&&o.d===r&&t.r(n.m,d);else if(!f||f===a.rs(i,n))return
;r.postMessage({N:1,p:f,f:0})},(e,l)=>{let r,n=e.t||0;t.O=l,t.$=n||t.$>0?1:-1,t.je=e.k,v.replaceCmdOptions(e.f||{}),
2!==n?1===n?g.parentFrame():g.nextFrame():(r=s.hn(l))?g.focusFrame(r.d,r.J.length<=2,e.o?1:2):s.safePost(l,{N:45,l:t.je
})},(e,l)=>{let t=s.hn(l);if(!t)return;if(l.s.b|=4,t.b|=4,t.J.length<2)return;let r={N:8};for(let e of t.J){let l=e.s.b
;e.s.b|=4,4&l||e.postMessage(r)}},(e,l,r)=>{let i,o=l.s.m,u=s.hn(l),a=e.u;if(!u||u.J.length<2)return false
;for(let e of u.J)if(e.s.Jl===a&&e!==u.C){if(i){i=null;break}i=e}return i&&i!==l?(t.je=e.k,k(e,l,i,1),
true):!!n.N()&&(n.N().getAllFrames({tabId:l.s.m},r=>{let n=0,i=l.s.Q;for(let e of r)if(e.parentFrameId===i){if(n){n=0
;break}n=e.frameId}let u=n&&s.indexFrame(o,n);u&&(t.je=e.k,k(e,l,u,1))}),!!r&&l)},g.initHelp,(e,l)=>{s.hn(l).b|=4,
l.s.b|=12,l.postMessage({N:11,H:t.to})},(e,l)=>{var n;let{i}=e;if(t.je=0,null!=e.u){
let{m:l,t:r}=e,i=l>=42&&l<=64,u=e.u,s={};u=i?o.Zn(u,true):u,u=t.S(u,i?1048576:524288,e.o&&e.o.s,s),v.replaceCmdOptions({
url:u,newtab:null!=r?!!r:!i,keyword:null!==(n=s.F)&&void 0!==n?n:e.o.k}),I(e.f),t.$=1}else{if(true!==e.r)return
;if(null==t.x||"omni"!==t.x.k){if(i)return;t.x=r.i(),t.$=1}else if(i&&t.x.v===t.We.Nn)return}t.O=l,g.showVomnibar(i)
},(e,l)=>{s.isNotVomnibarPage(l,false)||t.cl.Tl(e.q,e,N.bind(l,0|e.i))},(e,l)=>{if(null!=e.i){
let n=(e.r||"")+"",i=e.i,o=n.includes("name")?e.u:""
;return void Promise.all([/^data:/i.test(i)?Promise.resolve(i):r.yi(i||e.u),null]).then(([e,i])=>{
let u="string"==typeof e,a=u?e:e?e[1]:"";t.O=l
;let f=a.indexOf(",")+1,m=a.slice(5,Math.max(5,f)).toLowerCase(),v=m.split(";")[0]
;if(!e||v.startsWith("text/"))return void(e?s.showHUD("",74):s.showHUD(d.K(0===e?"downloadTimeout":"downloadFail")))
;let c=a.slice(f,f+8);c=m.includes("base64")?r.Ye(c,"atob"):c.slice(0,6)
;let p=c.startsWith("\x89PNG")?"PNG":c.startsWith("\xff\xd8\xff")?"JPEG":/^GIF8[79]a/.test(c)?"GIF":(v.split("/")[1]||"").toUpperCase()||v,b=o&&/^(http|ftp|file)/i.test(o)?o:"",y=n.includes("safe")&&"GIF"!==p||n.includes("force")
;g.handleImageUrl(a,u?null:e[0],y&&"PNG"!==p?9:1,e=>{
s.showHUD(d.K(e?"imgCopied":"failCopyingImg",[1===e?"HTML":y?"PNG":p]))},o,b,null,false),r.Ol()})}
let n=e.n,i=e.o||n&&b.parseOpenPageUrlOptions(n)||{},u=!!(n&&n.copy&&n.o),a=null!=e.s&&e.m||0,f=u?null:i.s,c=u?null:i.k,p=a>=42&&a<=64&&(!f||false!==f.r),y=e.d?false!==i.d:!!i.d
;if(!e.s&&n&&null!=n.type&&"frame"!==n.type){let e=n.type,i=v.concatOptions(n,r.Tn({url:null,
type:"tab"===e&&n.url||"tab-url"===e?null:"tab-title"===e?"title":e}));return t.O=l,t.$=1,
void v.executeCommand(m.la("copyWindowInfo",i),1,t.je,l,1,n.$f&&{c:n.$f,r:n.$retry,u:0,w:0})}let _=e.u||e.s||""
;if(y)if("string"!=typeof _)for(let e=_.length;0<=--e;)p&&(_[e]=o.Zn(_[e]+"")),_[e]=r.zl(_[e]+"");else p&&(_=o.Zn(_)),
_=r.zl(_);else"string"==typeof _&&_.length<4&&!_.trim()&&" "===_[0]&&(_="");let N=!!_,k=_&&t.Dl(_,e.j,f,c)
;k=e.s&&"object"==typeof e.s?`[${e.s.length}] `+e.s.slice(-1)[0]:k,Promise.resolve(k).then(r=>{t.O=l,
n&&v.runNextCmdBy(N?1:0,n)||s.showHUD(y?r.replace(/%[0-7][\dA-Fa-f]/g,decodeURIComponent):r,e.u?14:15)})},(e,l)=>{
let n=null!=l?l.s:null;if(null!==n&&!(4&n.b)){n.b|=4;let e=s.hn(l);e&&(e.b|=4)}let i=e.k,o=1,u=/^\d+|^-\d*/.exec(i)
;if(null!=u){let e=u[0];i=i.slice(e.length),o="-"!==e?parseInt(e,10)||1:-1
}else i.length>6&&i.startsWith(`<c-v-${i[5]}>`)&&(i=i[5]+i.slice(7));let a=t.yn.get(i);a||(u=i.match(m.pa),
i=u[u.length-1],o=1,a=t.yn.get(i)),r.Ol(),a&&(38===a.kn&&a.Mn&&t.na(a),e.e&&(t.Rn={element:r._i(e.e)}),
v.executeCommand(a,o,e.l,l,0,null))},v.waitAndRunKeyReq,(e,l)=>{if(2===e.c){let l=p.ve.pe(e.u)
;return void(e.f&&v.runNextCmdBy(l>0?1:0,e.f))}let r=!!e.f,n=e.c.o;r||(t.O=l);let i=!r&&g.me(l,n.type,e.l)||l
;Promise.resolve(i).then(t=>{if(!(r||t===l&&e.u)){let l=e;return l.U=(n.extUrl?1:0)|(e.c.a?2:0),l.f=true,
void s.be(l,true,1,t)}
1===e.c.a?(p.ve.La(e,l.s.se,l.s.m),s.showHUDEx(l,"mNormalMarkTask",1,[["mCreate"],[e.l?"Local":"Global"],e.n]),
v.runNextCmdBy(1,n)):p.ve.Ni(n,e,l,e.l&&r?e.k:0)})},b.Un,v.onBeforeConfirm,v.onConfirmResponse,(e,l)=>{var r
;if("e"===e.t)return void s.showHUD(d.K("cannotDelSug"))
;let{t:i,s:o,u}=e,a="history"===i&&null!=o?"session":i,f="tab"===a?a:a+" item",m=e=>{
Promise.resolve(d.K("sugs")).then(l=>{s.showHUD(d.K(e?"delSug":"notDelSug",[l&&d.Sn(l,a[0])||f]))})}
;if(t.O=s.findCPort(l),
"tab"===a&&t.he===o)s.showHUD(d.K("notRemoveCur"));else if("session"!==a)t.cl.ml("tab"===a?o:u,a,m);else if(null===(r=n.Te())||void 0===r?void 0:r.forgetClosedTab){
let e=o;n.Te().forgetClosedTab(e[0],e[1]).then(()=>1,t.o).then(m)}},g.openImgReq,(e,l)=>{t.O=null,
b.openJSUrl(e.u,{},()=>{t.O=l,s.showHUD(d.K("jsFail"))})},(e,l)=>{var t
;2!==e.c&&4!==e.c?k(e,l,(null===(t=s.hn(l))||void 0===t?void 0:t.C)||null,e.f):s.getParentFrame(l.s.m,l.s.Q,1).then(t=>{
var r;k(e,l,t||(null===(r=s.hn(l))||void 0===r?void 0:r.C)||null,e.f)})},f.Fe,(e,l)=>{v.replaceCmdOptions({active:true,
returnToViewport:true,extend:!!(1&e.c),direction:e.c>=56?"before":null}),t.O=l,t.$=1,g.performFind()
},g.framesGoBack,()=>(d.$n&&d.$n(),d.Dn),(e,l)=>{l.s.b|=8},(e,l)=>{v.replaceCmdOptions({mode:e.c?"caret":"",start:true
}),I(e.f),t.O=l,t.$=1,g.enterVisualMode()},e=>{if(performance.now()-e.r.n<500){let l=e.r.c;l.element=r._i(e.e),
c.runKeyWithCond(l)}},(e,l)=>{var r
;let u=e.o||{},a={},f=t.S(o.Zn(e.u,true),1048576,u.s,a),d=null!==(r=a.F)&&void 0!==r?r:u.k;f=f!==e.u||d?i.Xl(f,d,0):f,
t.O=l,s.showHUD(f,78),n.downloadFile(f,e.f,e.r||"").then(e.m<44?r=>{r||t.dn[26]({m:37,f:e.f,u:f},l)}:void 0)
},(e,l,t)=>(setTimeout(()=>{s.sendResponse(l,t,9)},e),l),({k:e,v:l})=>{let t=l!==!!l
;s.showHUD(d.K(t?"useVal":l?"turnOn":"turnOff",[e,t?JSON.stringify(l):""]))},(e,l)=>{t.dn[19](e,s.findCPort(l))
},(e,l,r)=>!(false!==l.s&&!l.s.Jl.startsWith(t.Ue))&&(P(e.q,e.i,l).then(e=>{l.postMessage(r?{N:4,m:r,r:e}:e)}),
l),(e,l)=>{let r=e.u,n=r.indexOf("://");r=n>0?r.slice(r.indexOf("/",n+4)+1):r,r=r.length>40?r.slice(0,39)+"\u2026":r,
t.O=l,s.showHUD(r,78)},(e,l)=>{
let n=e.t,i=r.zl(e.u),o=n&&i?(t.In.actions.find(e=>e.startsWith("itemJoin="))||"").slice(9):""
;o=o?o.includes("\\")?r.tryParse('"'===o[0]?o:`"${o}"`):r.Ye(o):"\n",t.dn[18]({s:n&&i?n+o+i:i||n,d:false,m:0
},s.findCPort(l))},(e,l)=>{t.O=s.findCPort(l),s.showHUD(e.t,15)},(e,l)=>{
s.showHUDEx(l,"mLocalMarkTask",1,[[e.n?"mCreate":"mJumpTo"],e.i>1?e.i:["mLastMark"]]),t.O=l,v.runNextCmdBy(1,e.c.o)
},()=>{let e=t.gn(null,null);return e&&(clearTimeout(e.i),e.r&&e.r(false)),!e},(e,l)=>{let r=e>0&&s.indexFrame(l.s.m,e)
;return r?(g.focusFrame(r,false,2,1),2):(e<=0&&t.dn[45](),e?4:2)},s.OnFreeze,(e,l)=>{
let[r,n,i]=e.s,o=i&&(n?"^ ":"")+i.join(" "),u={N:1,p:o,f:r};l.postMessage(u);let a=s.hn(l),f=3===r?2:0
;if(a&&(!a.ls||a.ls.f!==f||a.ls.ts!==o)){a.ls={f,ts:o},t.u&&a.d.s.f!==f&&t.r(l.s.m,f);for(let e of a.J)e.s.f=f,
512&e.s.b||e.postMessage(u)}},(e,l)=>{let r=l.s.m,i=0,o=setInterval(()=>{let e=t.a.get(r);r!==t.he&&e?(clearInterval(o),
(e.J.includes(l)||512&l.s.b)&&n.selectTab(r,n.selectWndIfNeed)):(++i>=12||!e)&&clearInterval(o)},17)}]
;let N=function(e,l,n,i,o,u,a,f){let d=2===e?2:0;t.hi<104&&(d=0),s.safePost(this,{N:43,a:n,c:f,i:d,l,m:i,r:a,s:o,t:u}),
r.Ol()};t.ki=(e,l,r,n,i)=>{e.postMessage({N:7,H:i||4!==l?s.ensureInnerCSS(e.s):null,m:i?5:0,k:i?t.je:0,f:{},c:l,n:n||0,
a:r})};let k=(e,l,r,n)=>{r&&2!==r.s.f?t.ki(r,e.c,e.a,e.n,n):(e.a.$forced=1,v.portSendFgCmd(l,e.c,false,e.a,e.n||0))
},I=e=>{e&&("string"==typeof e&&(e=c.parseEmbeddedOptions(e)),e&&"object"==typeof e&&Object.assign(t.x,r.Tn(e)))
},P=(e,l,t)=>(_||(_=u._l.then(()=>n.import2("/background/page_handlers.js"))),
_.then(l=>Promise.all(e.map(e=>l.onReq(e,t)))).then(e=>({i:l,a:e.map(e=>void 0!==e?e:null)})))});