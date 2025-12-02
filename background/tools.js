"use strict"
;__filename="background/tools.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./settings","./ports","./ui_css","./i18n","./run_commands","./open_urls","./tab_commands"],(e,t,r,l,n,o,i,u,a,s,f,c,d,_)=>{
function m(e){let l=e.tabId,o=r.a.get(l);if(o&&512&o.b&&a.eo(o,0),e.windowId!==r.we)return void n.Ae.get(e.windowId,p)
;let i=performance.now();if(i-h>666){let e=1===r.G?Date.now():i;b.set(r.he,e)}r.he=l,h=i,-2===w&&(w=-3,
setTimeout(t.do.fo,0))}function p(e){if(!e||!e.focused)return n.g();let t=e.id;t!==r.we&&(r.nu=r.we,r.we=t),n.Me.query({
windowId:t,active:true},e=>{e&&e.length>0&&t===r.we&&g(e)})}function g(e){if(!e||0===e.length)return n.g()
;let l=e[0],o=l.windowId,i=r.we;o!==i&&(r.we=o,r.nu=i),r.fe=l.incognito?2:0,t.ze.nn(),m({tabId:l.id,windowId:o})}
Object.defineProperty(t,"__esModule",{value:true}),t.ze=t.do=t.ce=t.ve=t.ae=void 0,t.ae={
_o:(e,t)=>"vimiumContent|"+e+(t?"|"+t:""),go(e,t){let o=n.t.contentSettings;try{o&&o.images.get({
primaryUrl:"https://127.0.0.1/"},n.g)}catch(e){o=null}
return o?o[e]&&!/^[A-Z]/.test(e)&&o[e].get?!(!t.startsWith("read:")&&l.ln.test(t)&&!t.startsWith(r.We.U))&&(a.complainLimits(f.K("changeItsCS")),
true):(a.showHUD(f.K("unknownCS",[e])),true):(a.showHUD("Has not permitted to set contentSettings"),true)},yo(e,t){
if(e.startsWith("file:")){let t=1;return t?(a.complainLimits(1===t?f.K("setFileCS",[56]):f.K("setFolderCS")),
[]):[e.split(/[?#]/,1)[0]]}if(e.startsWith("ftp"))return a.complainLimits(f.K("setFTPCS")),[]
;let r,n=e.match(/^([^:]+:\/\/)([^\/]+)/),i=o.mi.exec(n[2]),u=i[3]+(i[4]||"");if(r=[(e=n[1])+u+"/*"],
t<2||l.cn(i[3],0))return r;i=null;let[s,c]=l.ar(u),d=Math.min(s.length-c,t-1)
;for(let t=0;t<d;t++)u=u.slice(s[t].length+1),r.push(e+u+"/*");return r.push(e+"*."+u+"/*"),
d===s.length-c&&"http://"===e&&r.push("https://*."+u+"/*"),r},bo(e){let t;for(let{s:{Jl:r}}of e.J){let e=new URL(r).host
;if(t&&t!==e)return true;t=e}return false},vo(e,r){let l=n.t.contentSettings[e];null==r?(l.clear({scope:"regular"}),
l.clear({scope:"incognito_session_only"},n.g),u.su(t.ae._o(e),null)):l.clear({scope:r?"incognito_session_only":"regular"
})},ue(e,l){let n=e.type?""+e.type:"images";return!t.ae.go(n,"http://a.cc/")&&(t.ae.vo(n,l?l.s.se:2===r.fe),
a.showHUDEx(l,"csCleared",0,[[n[0].toUpperCase()+n.slice(1)]]),true)},Re(e,r,l,n){let o=e.type?""+e.type:"images",i=l[0]
;e.incognito?t.ae.Mo(r,o,i,n):t.ae.Co(o,r,i,"reopen"===e.action,n)},Co(e,l,i,a,s){let f=o.ti(i.url)
;t.ae.go(e,f)?s(0):n.t.contentSettings[e].get({primaryUrl:f,incognito:i.incognito},o=>{t.ae.ko(e,f,l,{
scope:i.incognito?"incognito_session_only":"regular",setting:o&&"allow"===o.setting?"block":"allow"},l=>{
if(l)return void s(0);if(!i.incognito){let r=t.ae._o(e);1!==u.io(r)&&u.su(r,1)}
let o,f=!n.Te()||(o=r.a.get(i.id))&&o.J.length>1&&t.ae.bo(o)
;i.incognito||a?_._e(i):i.index>0?_._e(i,f?0:2):n.getCurWnd(true,e=>(e&&"normal"===e.type?_._e(i,f?0:e.tabs.length>1?2:1):n.Me.reload(c.getRunNextCmdBy(0)),
n.g()))})})},Mo(e,l,i,u){if(r.We.is)return a.complainLimits(f.K("setIncogCS")),void u(0);let s=o.ti(i.url)
;t.ae.go(l,s)?u(0):n.t.contentSettings[l].get({primaryUrl:s,incognito:true},r=>n.g()?(n.t.contentSettings[l].get({
primaryUrl:s},r=>{r&&"allow"===r.setting?u(1):n.Ae.create({type:"normal",incognito:true,focused:false,url:"about:blank"
},r=>{let o=r.tabs[0].id;return t.ae.To(e,l,i,s,r.id,true,()=>{n.Me.remove(o)})})}),
n.g()):r&&"allow"===r.setting&&i.incognito?t.ae.Io(i):void n.Ae.getAll(n=>{
if(!(n=n.filter(e=>e.incognito&&"normal"===e.type)).length)return void console.log("%cContentSettings.ensure","color:red","get incognito content settings",r," but can not find an incognito window.")
;let o=d.preferLastWnd(n);if(r&&"allow"===r.setting)return t.ae.Io(i,o.id)
;let u=i.windowId,a=i.incognito&&n.some(e=>e.id===u);return t.ae.To(e,l,i,s,a?void 0:o.id)}))},To(e,r,l,o,i,u,a){
let s=t.ae.So.bind(null,l,i,a);return t.ae.ko(r,o,e,{scope:"incognito_session_only",setting:"allow"
},u&&i!==l.windowId?e=>{if(e)return s(e);n.Ae.get(l.windowId,s)}:s)},ko(e,r,o,i,u){
let a,s=false,f=n.t.contentSettings[e],c=()=>{let e=n.g();return e&&console.log("[%o]",Date.now(),e),s||(--a,s=!!e,
(s||0===a)&&setTimeout(u,0,s)),e},d=t.ae.yo(r,0|o);if(a=d.length,a<=0)return u(true);l.Tn(i)
;for(let e of d)f.set(Object.assign({primaryPattern:e},i),c)},So(e,r,l,o){true!==o&&t.ae.Io(e,r),l&&l(),
true!==o?r&&n.Ae.update(r,{focused:true,state:o?o.state:void 0}):c.runNextCmd(0)},Io(e,t){e.active=true,
"number"==typeof t&&e.windowId!==t&&(e.index=void 0,e.windowId=t),_._e(e)}},t.ve={La({l:e,n:l,s:n,u:o},i,a){
if(e&&0===n[0]&&0===n[1])if(2===n.length){let e=o.indexOf("#");e>0&&e<o.length-1&&(n=[0,0,o.slice(e)])
}else(n[2]||"").length<2&&(n=[0,0]);a=a>=0?a:-1
;let s=i?n:2!==n.length||n[0]||n[1]?2!==n.length||n[1]>524287||n[0]>8191?n:Math.max(0,n[0])|Math.max(0,n[1])<<13:0,f=t.ve.Lo(l,e?o:""),c=e?s:s?{
s,t:a,u:o.slice(0,8192)}:{t:a,u:o.slice(0,8192)};i?(r.Ma||(y.Ao(),r.Ma=new Map)).set(f,c):u.su(f,c)},Ni(e,o,i,s){
let{n:f}=o,_=t.ve.Lo(f,o.l?o.u:""),m=i.s.se&&(null==r.Ma?void 0:r.Ma.get(_))||u.io(_),p="number"==typeof m?[8191&m,m>>>13]:"string"==typeof m?JSON.parse(m):m?m instanceof Array?m.slice(0):{
url:m.u,tabId:m.t,scroll:"number"!=typeof m.s?m.s||[0,0]:[8191&m.s,m.s>>>13]}:m;if("string"==typeof m&&t.ve.La({l:o.l,
n:f,s:p instanceof Array?p:p.scroll||[0,0],u:o.u},false,i.s.m),!p&&o.s)try{let e=JSON.parse(o.s)
;if(e&&"object"==typeof e){let t=+e.scrollX,r=+e.scrollY;t>=0&&r>=0&&(p=[0|t,0|r,""+(e.hash||"")])}}catch(e){}
if(!p)return a.showHUDEx(i,"noMark",0,[[o.l?"Local":"Global"],f]),void c.runNextCmdBy(0,e)
;let g=c.parseFallbackOptions(e);if(p instanceof Array)return g&&(g.$else=null),
void t.ve.Oo(i.s.m,null,i,true,f,p,0,g,s);g&&(g.$else=g.$then);let y=p.tabId,w=e.wait,b=e.prefix,h=p.url,v={n:f,
a:!!e.parent&&!b,p:true,q:d.parseOpenPageUrlOptions(e),s:p.scroll||[0,0],t:y,u:h,f:g,
w:"number"==typeof w?Math.min(Math.max(0,w||0),2e3):w}
;v.p=!!b||null==b&&!v.a&&0===v.s[1]&&0===v.s[0]&&!!l.jr(h)&&(!h.includes("#")||o.u.startsWith(h)),
t.ve.Uo(o.u,h,v)?t.ve.Oo(i.s.m,null,i,false,f,v.s,0,g,s):y>=0&&r.a.has(y)?n.tabsGet(y,t.ve.jo.bind(0,v,s)):d.Un(v)},
Uo(e,t,r){let l=e.split("#",1)[0],n=t.split("#",1)[0]
;return l===n||!!r.p&&l.startsWith(n.endsWith("/")||n.includes("?")?n:n+"/")||!!r.a&&n.startsWith(l.endsWith("/")||l.includes("?")?l:l+"/")
},jo(e,l,o){let i=n.getTabUrl(o);if(t.ve.Uo(i,e.u,e)){let i=o.id===r.he;i||n.selectTab(o.id,n.selectWndIfNeed),
t.ve.Qn(e,o.id,i?l:0,true)}else d.Un(e)},
Lo:(e,t)=>t?"vimiumMark|"+i.pu(t.slice(0,499).split("#",1)[0])+(t.length>1?"|"+e:""):"vimiumGlobalMark|"+e,
Oo(e,t,l,o,i,u,a,s,d){if(l=!t||!t.C||512&t.C.s.b?l:t.C){let e={g:!o,s:u,t:"",f:s||{},w:a||0}
;Promise.resolve(i&&f.zn("mNormalMarkTask",[["mJumpTo"],[o?"Local":"Global"],i])).then(t=>{e.t=t||"",d?(r.je=d,
r.ki(l,19,e,1,1)):c.portSendFgCmd(l,19,true,e,1)})}else n.p(e,0,null,(e,t)=>{window.scrollTo(e,t)
},[u[0],u[1]],s?()=>(c.runNextCmdBy(1,s),n.g()):null)},Qn(e,l,n,o){let i=r.a.get(l),u=e.w;a.Vn(i).then(()=>{
t.ve.Oo(l,i,null,false,e.n,e.s,o||false===u?0:"number"!=typeof u?200:u,e.f,n)}),e.t!==l&&e.n&&t.ve.La({l:false,n:e.n,
s:e.s,u:e.u},2===r.fe,l)},pe(e){let l=t.ve.Lo("",e),n=0;r.du.forEach((e,t)=>{t.startsWith(l)&&(n++,u.su(t,null))})
;let o=r.Ma;return o&&o.forEach((e,t)=>{t.startsWith(l)&&(n++,o.delete(t))
}),a.showHUDEx(r.O,"markRemoved",0,[n,["#"===e?"allLocal":e?"Local":"Global"],[1!==n?"have":"has"]]),n}},t.ce={Ro:null,
Xt:0,qo(){let e=r.du.get("findModeRawQueryList")||"";t.ce.Ro=e?e.split("\n"):[],t.ce.qo=null},Jr(e,n,o){let i=t.ce
;i.qo&&i.qo();let a=e?r.Ca||(y.Ao(),r.Ca=i.Ro.slice(0)):i.Ro;if(!n)return(a[a.length-(o||1)]||"").replace(/\r/g,"\n")
;if(n=n.replace(/\n/g,"\r"),e)return void i.Go(n,a,true);n=l.Yt(n,0,99);let s=i.Go(n,a)
;s&&u.su("findModeRawQueryList",s),r.Ca&&i.Go(n,r.Ca,true)},Go(e,t,r){let l=t.lastIndexOf(e);if(l>=0){
if(l===t.length-1)return;t.splice(l,1)}else t.length>=50&&t.shift();if(t.push(e),!r)return t.join("\n")},de(e){
e?r.Ca&&(r.Ca=[]):(t.ce.qo=null,t.ce.Ro=[],u.su("findModeRawQueryList",""))}};let y={No:false,Xt:0,Ao(){
y.No||(n.Ae.onRemoved.addListener(y.Po),y.No=true)},Po(){y.No&&(y.Xt=y.Xt||setTimeout(y.Wo,34))},Wo(){y.Xt=0
;for(let e of r.a.values())if(e.d.s.se)return;n.Ae.getAll(e=>{e.some(e=>e.incognito)||y.Fo()})},Fo(){r.Ca=null,
r.Ma=null,n.Ae.onRemoved.removeListener(y.Po),y.No=false}},w=0;t.do=null;let b=r.qe;t.ze={De(e,t){
return b.get(t.id)-b.get(e.id)},nn:r.o};let h=0;n.Me.onActivated.addListener(m),n.Ae.onFocusChanged.addListener(e=>{
-1!==e&&n.Me.query({windowId:e,active:true},g)}),n.Me.onRemoved.addListener(e=>{let t=r.a.delete(e);b.delete(e),
e===r.cs&&t&&a.tryToKeepAliveIfNeeded_mv3_non_ff(e)}),u._l.then(()=>{n.getCurTab(e=>{h=performance.now();let t=e&&e[0]
;if(!t)return n.g();r.he=t.id,r.we=t.windowId,r.fe=t.incognito?2:0});let e=[]
;for(let l of["images","plugins","javascript","cookies"])null!=r.du.get(t.ae._o(l))&&e.push(l)
;e.length&&n.t.contentSettings&&setTimeout(()=>{for(let r of e)t.ae.vo(r)},100)}),r.ul.vomnibarOptions=e=>{
let t=u.E.vomnibarOptions,l=r.Nr,n=true,{actions:o,maxMatches:i,queryInterval:a,styles:s,sizes:f}=t
;if(e!==t&&e&&"object"==typeof e){
let t=Math.max(3,Math.min(0|e.maxMatches||i,25)),l=e.actions,u=l?l.replace(/[,\s]+/g," ").trim():"",c=+e.queryInterval,d=((e.sizes||"")+"").trim(),_=((e.styles||"")+"").trim(),m=Math.max(0,Math.min(c>=0?c:a,1200))
;n=i===t&&a===m&&d===f&&o===u&&s===_,n||(i=t,a=m,f=d,s=_),r.In.actions=u?u.split(" "):[],e.actions=u,e.maxMatches=t,
e.queryInterval=m,e.sizes=d,e.styles=_}r.A.vomnibarOptions=n?t:e,l.n=i,l.i=a,l.s=f,l.t=s,u.Ha({N:47,d:{n:i,i:a,s:f,t:l.t
}})}});