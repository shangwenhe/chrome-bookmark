"use strict"
;__filename="background/all_commands.js",define(["require","exports","./utils","./store","./browser","./normalize_urls","./parse_urls","./settings","./ports","./ui_css","./i18n","./key_mappings","./run_commands","./run_keys","./clipboard","./open_urls","./frame_commands","./filter_tabs","./tab_commands","./tools"],(e,t,l,o,r,n,i,u,a,s,f,d,c,m,p,v,b,h,y,k)=>{
Object.defineProperty(t,"__esModule",{value:true
}),o.y=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,2,0,1,0,0,0,0,2,0,1,0,2,2,0,0,1,0,0,1,0,0,1,0,2,1,1,0,0,0,0,0,0],
o.M=[()=>{let e=o.x.for||o.x.wait,t=o.x.isError?0:1;if("ready"!==e){
if(e=e?Math.abs("count"===e||"number"===e?o.$:0|e):c.hasFallbackOptions(o.x)?Math.abs(o.$):0,e){e=Math.max(34,e)
;let t=o.x.block;t=null!=t?!!t:e>17&&e<=1e3,t&&o.O&&o.O.postMessage({N:14,t:e+50})}c.runNextCmdBy(o.$>0?t:1-t,o.x,e)
}else c.runNextOnTabLoaded({},null,()=>{c.runNextCmdBy(t,o.x,1)})},()=>{
let e=(o.x.$then||"")+"",t=(o.x.$else||"")+"",l=o.$
;if(!e&&!t)return void a.showHUD('"confirm" requires "$then" or "$else"')
;let r=o.x.question||o.x.ask||o.x.text||o.x.value,n=r?null:[e,t].map(e=>e.split("#",1)[0].split("+").slice(-1)[0]),i=Math.abs(0|(o.x.minRepeat||0)),u=[o.x.$f,o.x.$retry]
;(Math.abs(l)<i?Promise.resolve():c.T([n?n[0]===n[1]?e:n[0].replace(/^([$%][a-zA-Z]\+?)+(?=\S)/,""):[r+""]],l)).then(r=>{
(r?t:e)&&setTimeout(()=>{o.$=l,o.I(r?t:e,o.O,{c:u[0],r:u[1],u:0,w:0},r?1:l)},0)})},()=>{
let e=o.x.rel,t=!!o.x.absolute,r=e?(e+"").toLowerCase():"next",i=null!=o.x.isNext?!!o.x.isNext:!r.includes("prev")&&!r.includes("before"),u=p.P(o.x)
;p.doesNeedToSed(8192,u)||t?Promise.resolve(a.j(o.O&&a.R().C)).then(e=>{
let a=i?o.$:-o.$,s={},f=e&&o.S(e,8192,u),[d,m]=f?v.goToNextUrl(f,a,t):[false,e];if(d&&m){
let e=s.F?n.q(m.trim().split(l.D),s.F,3):m;o.$=a,null==o.x.reuse&&c.overrideOption("reuse",0),c.overrideCmdOptions({
url_f:e,goNext:false}),v.openUrl()}else t?c.runNextCmd(0):b.framesGoNext(i,r)}):b.framesGoNext(i,r)},()=>{var e,t
;let l=o.x.key,r=l&&"string"==typeof l?d.z(l).trim():""
;r=r.length>1||1===r.length&&!/[0-9a-z]/i.test(r)&&r===r.toUpperCase()&&r===r.toLowerCase()?r:""
;let n=null!==(t=null!==(e=o.x.hideHUD)&&void 0!==e?e:o.x.hideHud)&&void 0!==t?t:!r&&o.A.hideHud
;Promise.resolve(f.K("globalInsertMode",[r&&": "+(1===r.length?`" ${r} "`:`<${r}>`)])).then(e=>{
c.sendFgCmd(7,!n,Object.assign({h:n?null:e,k:r||null,i:!!o.x.insert,p:!!o.x.passExitKey,r:+!!o.x.reset,
bubbles:!!o.x.bubbles,u:!!o.x.unhover},c.parseFallbackOptions(o.x)||{})),n&&"force"!==n&&"always"!==n&&a.showHUD(e,1)})
},b.nextFrame,b.parentFrame,b.performFind,e=>{
let t=(o.x.key||"")+"",l="darkMode"===t?"d":"reduceMotion"===t?"m":u.B[t],r=l?o.V[l]:0,n=f.K("quoteA",[t]),i=o.x.value,s="boolean"==typeof i,d=null,m=""
;l?"boolean"==typeof r?s||(i=null):s||void 0===i?d=s?"notBool":"needVal":typeof i!=typeof r&&(m=JSON.stringify(r),
d="unlikeVal",m=m.length>10?m.slice(0,9)+"\u2026":m):d=t in u.E?"notFgOpt":"unknownA",Promise.resolve(n).then(t=>{
if(d)a.showHUD(f.K(d,[t,m]));else{if(i=u.W(l,i),"c"===l||"n"===l){let e=""
;for(let t of i.replace(/\s/g,""))e.includes(t)||(e+=t);i=e}let o=a.R(),r=o.d;for(let e of o.J){let o=e===r
;c.portSendFgCmd(e,8,o,{k:l,n:o?t:"",v:i},1)}e(1)}})},()=>{
0!==o.O.s.Q||262144&o.O.s.b?c.sendFgCmd(17,true,o.x):b.initHelp({a:o.x},o.O)},()=>{let e=c.copyCmdOptions(l.i(),o.x)
;if(!e.esc){let t=e.key,r=(e.type||(t?"keydown":""))+"",n=e.class,i=e.delay,{xy:u,direct:s,directOptions:f}=e
;if(n=n&&"$"===n[0]?n.slice(1):(n&&n[0].toUpperCase()+n.slice(1).replace(/event$/i,"")||(r.startsWith("mouse")||r.includes("click")?"Mouse":"Keyboard"))+"Event",
u=/^(Mouse|Pointer|Wheel)/.test(n)&&null==u?[.5,.5]:u,u=e.xy=l.Z(u),u&&!u.n&&(u.n=o.$,o.$=1),e.click)r="click",
e.c=1;else if(o.$<0)for(let e of"down up;enter leave;start end;over out".split(";")){let[t,l]=e.split(" ")
;r=r.replace(t,l)}if(!r)return a.showHUD('Require a "type" parameter'),void c.runNextCmd(0)
;let d=e.init,m=d&&"object"==typeof d?d:e,p={};i=i&&+i>=0?Math.max(0|+i,1):null
;for(let t of["bubbles","cancelable","composed"]){let l=m!==e&&t in m?m[t]:e[t]
;p[t]=false!==l&&(null!=l||"mouseenter"!==r&&"mouseleave"!==r)}let v={e:1,c:1,t:1,class:1,type:1,key:1,return:1,delay:1,
esc:1,click:1,init:1,xy:1,match:1,direct:1,directOptions:1,clickable:1,exclude:1,evenIf:1,scroll:1,typeFilter:1,
textFilter:1,clickableOnHost:1,excludeOnHost:1,closedShadow:1,trust:1,trusted:1,isTrusted:1,superKey:1,target:1,
targetOptions:1}
;for(let[t,l]of Object.entries(m))t&&"$"!==t[0]&&!v.hasOwnProperty(t)&&(p[m===e&&t.startsWith("o.")?t.slice(2):t]=l,
m===e&&delete e[t]);e.superKey&&(o.G?p.ctrlKey=true:p.metaKey=true,delete e.superKey);let b=null
;if(t&&("object"==typeof t||"string"==typeof t)){"string"==typeof t&&(b=/[^\w]/.exec(t.slice(1)))
;let e="object"==typeof t?t:b?t.split(b[0]):[t];if(e[0]&&(1==e.length||!e[1]||+e[1]>=0)){b&&!e[0]&&(e[0]=t[0],
e[1]||e.splice(1,1))
;let l=e[0],o=/^[a-z]$/i.test(l),n=!o&&l>="0"&&l<="9"&&1===l.length,i=l.toLowerCase(),u=e[1]&&0|+e[1]?0|+e[1]:o?i.charCodeAt(0)-("keypress"!==r||l!==i?32:0):n?l.charCodeAt(0)-0:"Space"===l?32:0
;p.key="Space"===l?" ":"Comma"===l?",":"Slash"===l?"/":"Minus"===l?"-":"$"===l[0]&&l.length>1?l.slice(1):l,
u&&null==m.keyCode&&(p.keyCode=u),
u&&null==m.which&&(p.which=u),(e.length>=3&&e[2]||null==m.code)&&(p.code=e[2]||(o?"Key"+l.toUpperCase():n?"Digit"+l:l))}
}e.type=r,e.class=n,e.init=p,e.delay=i,e.direct=s&&"string"==typeof s?s:"element,hover,scroll,focus",
f&&!f.search&&(f.search="doc"),e.directOptions=f||{search:"doc"},e.e=`Can't create "${n}#${r}"`,
e.t=r.startsWith("key")&&!!(e.trust||e.trusted||"force"===(e.isTrusted||m.isTrusted))}
c.portSendFgCmd(o.O,16,false,e,o.$)},()=>{b.showVomnibar()},b.L,b.enterVisualMode,e=>{
let t=o.x.id,l=null!=t&&t+""||o.x.folder||o.x.path,n=((o.x.position||"")+"").toLowerCase(),i=!!o.x.all
;if(!l||"string"!=typeof l)return a.showHUD('Need "folder" to refer a bookmark folder.'),void e(0)
;o.X(l,null!=t&&!!(t+"")).then(t=>{
if(!t)return e(0),void a.showHUD(false===t?'Need valid "folder".':"The bookmark folder is not found.")
;let l=null!=t.u,u=l?t.Y:t.ee,s="begin"===n?0:"end"===n?-1:"before"===n?l?t.te:0:l&&"after"===n?t.te+1:-1
;(!i&&o.$*o.$<2?r.getCurTab:r.le)(function t(l){if(!l||!l.length)return e(0),r.g()
;let n=r.selectIndexFrom(l),f=l[n],[d,m]=i?[0,l.length]:h.getTabRange(n,l.length),p=o.x.filter,v=l;if(l=l.slice(d,m),
p&&!(l=h.oe(f,l,p)).length)return void e(0);let b=l.length;if(b>20&&c.re())c.T("addBookmark",b).then(t.bind(0,v));else{
s=s>=0?s:o.ie.ne.length;for(let e of l)r.t.bookmarks.create({parentId:u,title:e.title,url:r.getTabUrl(e),index:s++},r.g)
;a.showHUD(`Added ${b} bookmark${b>1?"s":""}.`),e(1)}})})},e=>{false!==o.x.copied?(c.overrideCmdOptions({
copied:o.x.copied||true}),v.openUrl()):e(0)},b.captureTab,e=>{e(k.ae.ue(o.x,o.O))},e=>{let t=o.O?o.O.s.se:2===o.fe
;k.ce.de(t),a.showHUDEx(o.O,"fhCleared",0,[t?["incog"]:""]),e(1)},e=>{let t=o.O&&b.me(o.O,o.x.type,!!o.x.local)
;Promise.resolve(t).then(t=>{let l=o.x.local?o.x.all?k.ve.pe("#"):void a.be({H:21,U:0,c:2,f:c.parseFallbackOptions(o.x)
},true,1,t):k.ve.pe();"number"==typeof l&&e(l>0?1:0)})},y.copyWindowInfo,function e(t,l,n){let i,u=o.x.$pure
;if(null==u&&c.overrideOption("$pure",u=!Object.keys(o.x).some(e=>"opener"!==e&&"position"!==e&&"evenIncognito"!==e&&"$"!==e[0])),
u)if(!(i=t&&t.length>0?t[0]:null)&&o.he>=0&&!r.g()&&"dedup"!==n)r.ye(r.tabsGet,o.he).then(t=>{e(t&&[t],0,"dedup")
});else{let e=true===o.x.opener;r.openMultiTabs(i?{active:true,windowId:i.windowId,openerTabId:e?i.id:void 0,
index:v.newTabIndex(i,o.x.position,e,true)}:{active:true},o.$,o.x.evenIncognito,[null],true,i,e=>{
e&&r.selectWndIfNeed(e),c.getRunNextCmdBy(3)(e)})}else v.openUrl(t)},(e,t)=>{h.ke(true,1,function e(t,[l,n,i],u,s){
s&&([l,i]=h.getTabRange(n,t.length,0,1));let d=o.x.filter,m=t;t=t.slice(l,i)
;let p=r.selectFrom(t),v=(t=d?h.oe(p,t,d):t).includes(p)?t.length-1:t.length;if(!v)return void u(0)
;if(v>20&&c.re())return void c.T("discardTab",v).then(e.bind(null,m,[l,n,i],u))
;let b=t[h.getNearArrIndex(t,p.index+(o.$>0?1:-1),o.$>0)],y=[],k=!b.discarded
;k&&(v<2||false!==b.autoDiscardable)&&y.push(r.ye(r.Me.discard,b.id));for(let e of t)e===p||e===b||e.discarded||(k=true,
false!==e.autoDiscardable&&y.push(r.ye(r.Me.discard,e.id)));y.length?Promise.all(y).then(e=>{
let t=e.filter(e=>void 0!==e),l=t.length>0;a.showHUD(l?`Discarded ${t.length} tab(s).`:f.K("discardFail")),u(l)
}):(a.showHUD(k?f.K("discardFail"):"Discarded."),u(0))},e,t)},e=>{let t=o.O?o.O.s.m:o.he
;if(t<0)return a.complainLimits(f.K("dupTab")),void e(0);let l=false===o.x.active;r.ye(r.Me.duplicate,t).then(n=>{
n?(l&&r.selectTab(t,r.g),l?e(1):c.runNextOnTabLoaded(o.x,n),o.$<2||r.tabsGet(t,e=>{r.openMultiTabs({url:r.getTabUrl(e),
active:false,windowId:e.windowId,pinned:e.pinned,index:e.index+2,openerTabId:e.id},o.$-1,true,[null],true,e,null)
})):e(0)}),l&&r.selectTab(t,r.g)},e=>{e.length&&b.framesGoBack({s:o.$,o:o.x},null,e[0])},e=>{
let t=!!o.x.absolute,l=o.x.filter,n=b.ge(),i=i=>{let u=o.$,a=r.selectFrom(i),s=i.length
;if(l&&!(i=h.oe(a,i,l)).length)return void e(0)
;let f=i.length,d=h.getNearArrIndex(i,a.index,u<0),m=t?u>0?Math.min(f,u)-1:Math.max(0,f+u):Math.abs(u)>2*s?u>0?f-1:0:d+u
;if(m=m>=0?m%f:f+(m%f||-f),i[0].pinned&&o.x.noPinned&&!a.pinned&&(u<0||t)){let l=1;for(;l<f&&i[l].pinned;)l++;if(f-=l,
f<1)return void e(0);t||Math.abs(u)>2*s?m=t?Math.max(l,m):m||l:(m=d-l+u,m=m>=0?m%f:f+(m%f||-f),m+=l)}
let p=i[m],v=!p.active;v?r.selectTab(p.id,n?b.blurInsertOnTabChange:c.getRunNextCmdBy(1)):e(v)},u=t=>{
h.ke(true,1,i,t||[],e,null)};t?1!==o.$||l?u():r.ye(r.Me.query,{windowId:o.we,index:0}).then(e=>{
e&&e[0]&&r.xe(e[0])?i(e):u()}):1===Math.abs(o.$)?r.ye(r.getCurTab).then(u):u()},()=>{var e
;"frame"!==o.x.type&&o.O&&o.O.s.Q&&(o.O=(null===(e=a.R())||void 0===e?void 0:e.C)||o.O);let t={H:5,U:0,p:o.$,
t:o.x.trailingSlash,r:o.x.trailing_slash,s:p.P(o.x),e:false!==o.x.reloadOnRoot},l=a.be(t)
;Promise.resolve(l||"").then(()=>{"object"==typeof t.e&&c.getRunNextCmdBy(2)(null!=t.e.p||void 0)})
},y.joinTabs,b.mainFrame,(e,t)=>{let l=r.selectIndexFrom(e)
;if(e.length>0&&(o.$<0?0===(o.$<-1?l:e[l].index):o.$>1&&l===e.length-1))return void t(0)
;let n=o.x.group,i="ignore"!==n&&false!==n;h.ke(true,1,l=>{
let n=r.selectIndexFrom(l),u=l[n],a=u.pinned,s=Math.max(0,Math.min(l.length-1,n+o.$))
;for(;a!==l[s].pinned;)s-=o.$>0?1:-1;if(s!==n&&i){let e=r.getGroupId(u),t=r.getGroupId(l[s])
;if(t!==e&&(1===Math.abs(o.$)||e!==r.getGroupId(l[o.$>0?s<l.length-1?s+1:s:s&&s-1]))){
for(null!==e&&(n>0&&r.getGroupId(l[n-1])===e||n+1<l.length&&r.getGroupId(l[n+1])===e)&&(s=n,t=e);s+=o.$>0?1:-1,
0<=s&&s<l.length&&r.getGroupId(l[s])===t;);s-=o.$>0?1:-1}}s===n&&u.active?t(0):r.Me.move((u.active?u:e[0]).id,{
index:l[s].index},r.$e(t))},e,t,i?t=>r.getGroupId(e[0])===r.getGroupId(t):null)
},y.moveTabToNewWindow,y.moveTabToNextWindow,()=>{v.openUrl()},(e,t)=>{h.ke(!o.x.single,0,y.reloadTab,e,t)},(e,t)=>{
h.ke(false,1,(e,[t],l)=>{r.Me.remove(e[t].id,r.$e(l))},e,t)},y.removeTab,e=>{function t(l){let u=l
;if(!u||0===u.length)return r.g()
;let a=i?u.findIndex(e=>e.id===o.he):-1,s=a>=0?a:r.selectIndexFrom(u),f=o.x.noPinned,d=o.x.filter,m=u[s];n>0?(++s,
u=u.slice(s,s+n)):(f=null!=f?f&&u[0].pinned:s>0&&u[0].pinned&&!u[s-1].pinned,
n<0?u=u.slice(Math.max(s+n,0),s):(u=u.slice(0)).splice(s,1)),f&&(u=u.filter(e=>!e.pinned)),d&&(u=h.oe(m,u,d))
;let p=o.x.mayConfirm
;p&&u.length>("number"==typeof p?Math.max(p,5):20)&&c.re()?c.T("closeSomeOtherTabs",u.length).then(t.bind(null,l)):u.length>0?(n<0&&(u=u.reverse()),
r.Me.remove(u.map(e=>e.id),r.$e(e))):e(0)}let l=o.x.others,n=(null!=l?l:o.x.other)?0:o.$,i=0===n&&o.x.acrossWindows
;i?r.Me.query({},t):h.Oe(n,t)},(e,t)=>{e.length<=0?t(0):y._e(e[0],void 0,void 0,false!==o.x.group)},e=>{let t=r.Te()
;if(!t)return e(0),a.complainNoSession();let l=!!o.x.one,n=+t.MAX_SESSION_RESULTS||25,i=Math.abs(o.$);if(i>n){
if(l)return e(0),void a.showHUD(f.K("indexOOR"));i=n}if(!l&&i<2&&(o.O?o.O.s.se:2===o.fe)&&!o.x.incognito)return e(0),
a.showHUD(f.K("notRestoreIfIncog"));let u=false!==o.x.active,s=true===o.x.currentWindow,d=o.O?o.O.s.m:o.he,m=o.we,p=t=>{
void 0!==t?y.Ie(m,t,u?null:d).then(t=>{u&&t?c.runNextOnTabLoaded(o.x,t):e(1)}):e(0)};(async()=>{
let o,v=Math.max(1.2*i|0,2),b=false,h=s?e=>!!e.tab&&e.tab.windowId>0&&e.tab.windowId===m:null
;if(s&&i<=Math.min(n,25)&&(o=await r.Pe(t.getRecentlyClosed,{maxResults:i
}),o.some(e=>!(!e.tab||e.tab.windowId>0))&&(c.overrideOption("currentWindow",false),s=false),b=o.length>i,
o=h?o.filter(h):o,!b&&o.length<i&&v<=Math.min(n,25)&&(o=await r.Pe(t.getRecentlyClosed,{maxResults:v}),
o=h?o.filter(h):o)),(!o||!b&&o.length<i)&&(o=await r.Pe(t.getRecentlyClosed,i<=25&&!s?{maxResults:i}:{}),
o=h?o.filter(h):o),o.length<(l?i:1))return e(0),a.showHUD(f.K("indexOOR"))
;1===i?r.ye(t.restore,s?o[0].tab.sessionId:null).then(p):Promise.all(o.slice(l?i-1:0,i).map(e=>r.ye(t.restore,(e.tab||e.window).sessionId))).then(e=>{
p(l?e[0]:null)}),u||r.selectTab(d,r.g)})()},()=>{null==o.x.$seq?m.runKeyWithCond():m.runKeyInSeq(o.x.$seq,o.$,null)
},e=>{let t=(o.x.keyword||"")+"",l=i.Ne({u:r.getTabUrl(e[0])})
;if(!l||!t)return void(c.runNextCmd(0)||a.showHUD(f.K(t?"noQueryFound":"noKw")));let u={},s=p.P(o.x);l.u=o.S(l.u,0,s,u),
null!=u.F&&(t=u.F);let d=n.q(l.u.split(" "),t,2),m=o.x.reuse;c.overrideCmdOptions({url_f:d,reuse:null!=m?m:0,
opener:true,keyword:""}),v.openUrl(e)},e=>{let t=o.x.id,l=o.x.data
;if(!(t&&"string"==typeof t&&void 0!==l))return a.showHUD('Require a string "id" and message "data"'),void e(0)
;let n=Date.now(),i=l=>{l=l&&l.message||l+"",console.log("Can not send message to the extension %o:",t,l),
a.showHUD("Error: "+l),e(0)};try{r.t.runtime.sendMessage(t,o.x.raw?l:{handler:"message",from:"Vimium C",count:o.$,
keyCode:o.je,data:l},t=>{let l=r.g();return l?i(l):"string"==typeof t&&Math.abs(Date.now()-n)<1e3&&a.showHUD(t),
l||e(false!==t),l})}catch(e){i(e)}},e=>{let t=o.x.text,l="number"==typeof t,r=!!o.x.silent,n=o.x.isError
;if(!t&&!l&&!r&&null==n&&o.x.$f){let l=o.x.$f;if(t=l&&l.t?f.Ce(`${l.t}`):"",!t)return void e(false)}
r||a.showHUD(t||l?t instanceof Promise?t:t+"":f.K("needText")),e(null!=n?!!n:!!t||l)},(e,t)=>{k.ae.Re(o.x,o.$,e,t)
},y.toggleMuteTab,(e,t)=>{h.ke(true,0,y.togglePinTab,e,t)},y.toggleTabUrl,(e,t)=>{
let l=e[0].id,r=((o.x.style||"")+"").trim(),n=!!o.x.current;if(!r)return a.showHUD(f.K("noStyleName")),void t(0)
;for(let e of o.Se)if(e.s.m===l)return e.postMessage({N:46,t:r,c:n}),void setTimeout(t,100,1);n||s.Fe({t:r,o:1}),
setTimeout(t,100,1)},b.toggleZoom,e=>{let t=!!o.x.acrossWindows,l=!!o.x.onlyActive,n=o.x.filter,i=b.ge(),u={},s=t=>{
if(t.length<2)return l&&a.showHUD("Only found one browser window"),e(0),r.g()
;let u=o.O?o.O.s.m:o.he,s=t.findIndex(e=>e.id===u),d=s>=0?t[s]:null;if(s>=0&&t.splice(s,1),
n&&!(t=h.oe(d,t,n)).length)return void e(0)
;let c=t.filter(e=>o.qe.has(e.id)).sort(k.ze.De),m=(t=l&&0===c.length?t.sort((e,t)=>t.id-e.id):c)[o.$>0?Math.min(o.$,t.length)-1:Math.max(0,t.length+o.$)]
;m?l?r.Ae.update(m.windowId,{focused:true},i?()=>b.blurInsertOnTabChange(m):r.$e(e)):f(m.id):e(0)},f=t=>{
r.selectTab(t,t=>(t&&r.selectWndIfNeed(t),i?b.blurInsertOnTabChange(t):r.$e(e)()))};if(1===o.$&&!l&&-1!==o.he){
let e=h.He();if(e>=0)return void Promise.all([r.ye(r.tabsGet,e),h.getNecessaryCurTabInfo(n)]).then(([e,l])=>{
e&&(t||e.windowId===o.we)&&r.xe(e)&&(!n||h.oe(l,[e],n).length>0)?f(e.id):t?r.Me.query(u,s):r.le(s)})}t||l?r.Me.query(l?{
active:true}:u,s):r.le(s)},e=>{let t=o.x.newWindow;true!==t&&true?r.ye(r.t.permissions.contains,{
permissions:["downloads.shelf","downloads"]}).then(l=>{if(l){let t,l=r.t.downloads.setShelfEnabled;try{l(false),
setTimeout(()=>{l(true),e(1)},256)}catch(e){t=(e&&e.message||e)+""}
a.showHUD(t?"Can not close the shelf: "+t:f.K("downloadBarClosed")),t&&e(0)
}else false===t&&o.O?(a.showHUD("No permissions to close download bar"),e(0)):o.M[29](e)}):o.M[29](e)},()=>{
let e=a.R(),t=!!o.x.unhover,l=o.x.suppress;for(let l of e?e.J:[]){let r={r:1,u:t};if(l===e.d){
let e=c.parseFallbackOptions(o.x);e&&Object.assign(r,e)}c.portSendFgCmd(l,7,false,r,1)}
(c.hasFallbackOptions(o.x)?true===l:false!==l)&&e&&e.d.postMessage({N:14,t:150})},e=>{let t,l=o.x.$cache;if(null!=l){
let e=o.ie.Ke===l[1]?l[0]:"",r=e&&(o.ie.ne.find(t=>t.ee===e)||o.ie.Be.find(t=>t.ee===e))
;r?t=Promise.resolve(r):c.overrideOption("$cache",null)}let r=!!t,n=o.$,i=false;if(!t){
let l=o.x.id,r=o.x.path,u=null!=l&&l+""||r||o.x.title
;if(!u||"string"!=typeof u)return a.showHUD("Invalid bookmark "+(null!=l?"id":r?"path":"title")),void e(0)
;let s=c.fillOptionWithMask(u,o.x.mask,"name",["path","title","mask","name","value"],n)
;if(!s.ok)return void a.showHUD((s.result?"Too many potential names":"No name")+" to find bookmarks");i=s.useCount,
t=o.X(s.result,null!=l&&!!(l+""))}t.then(t=>{if(t){r||i||c.overrideOption("$cache",[t.ee,o.ie.Ke]);let e=null!=t.u
;c.overrideCmdOptions(e?{url:t.Ve||t.u}:{urls:o.ie.ne.filter(e=>e.Y===t.ee).map(e=>e.Ve||e.u)},true),o.$=i||!e?1:n,
v.openUrl()}else e(0),a.showHUD(false===t?'Need valid "title" or "title".':"The bookmark node is not found.")})
},y.toggleWindow]});