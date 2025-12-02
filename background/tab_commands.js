"use strict"
;__filename="background/tab_commands.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./ports","./i18n","./run_commands","./clipboard","./open_urls","./frame_commands","./filter_tabs","./tools"],(e,l,t,i,r,n,o,u,d,f,a,s,w,v,m)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.toggleWindow=l.Ie=l._e=l.toggleTabUrl=l.togglePinTab=l.toggleMuteTab=l.removeTab=l.reloadTab=l.moveTabToNextWindow=l.moveTabToNewWindow=l.joinTabs=l.copyWindowInfo=void 0
;let c=Math.abs,p=()=>{t.O&&w.focusFrame(t.O,false,0,1)
},b=e=>t.x.end?null:null!=t.x.position?s.newTabIndex(e,t.x.position,false,false):null!=t.x.rightInOld?e.index+(t.x.rightInOld?0:1):e.index+(false!==t.x.right?1:0)
;l.copyWindowInfo=e=>{
let l=t.x.filter,n=t.x.keyword,o=t.x.decoded,s=null!=o?o:t.x.decode,w=t.x.format,m=t.x.type,p="tab"===m&&(c(t.$)>1||!!l),b=a.P(t.x),I={
d:false!==s,s:b,k:n};if("frame"===m&&t.O&&!w){let l;return 128&t.O.s.b?(t.O.postMessage({N:3,H:18,U:1,o:I}),
l=1):l=u.be({H:18,U:1,o:I}),void(1!==l&&(l&&l instanceof Promise?l.then(()=>{e(1)}):e(1)))}r.Me.query("browser"===m?{
windowType:"normal"}:{active:"window"!==m&&!p||void 0,lastFocusedWindow:true},o=>{var a
;if((!m||"browser"!==m&&"window"!==m&&"tab"!==m&&"string"==typeof m)&&!w){
let e="title"===m?o[0].title:m&&"frame"!==m&&"url"!==m?(null===(a=i.uu(r.getTabUrl(o[0])))||void 0===a?void 0:a[m])||"":r.getTabUrl(o[0]),l="title"===m?{
s:e}:{u:e};return l.o=I,l.n=f.parseFallbackOptions(t.x),void t.dn[18](l,t.O)}
let c=t.O?t.O.s.se:2===t.fe,g=""+(w||"${title}: ${url}"),x=t.x.join,y="json"===x&&!w;if(p){
let e=o.length<2?0:r.selectIndexFrom(o),l=v.getTabRange(e,o.length);o=o.slice(l[0],l[1])
}else o=o.filter(e=>e.incognito===c);if(l){let e=t.O?t.O.s.m:t.he,i=o.find(l=>l.id===e);o=v.oe(i,o,l)}
if(!o.length)return void e(0);"browser"===m&&o.sort((e,l)=>e.windowId-l.windowId||e.index-l.index);let _=o.map(e=>y?{
title:e.title,url:s?i.zl(r.getTabUrl(e)):r.getTabUrl(e)}:g.replace(/\$\{([^}]+)}/g,(l,t)=>t.split("||").reduce((l,t)=>{
let n
;return l||(s&&"url"===t?i.zl(r.getTabUrl(e)):"host"===t?(n=i.uu(r.getTabUrl(e)))&&n.host||"":"__proto__"!==t&&(n=e[t],
n&&"object"==typeof n?JSON.stringify(n):n||""))},"")));Promise.resolve(t.Dl(_,x,b,n)).then(l=>{e(1),
u.showHUD("tab"===m&&o.length<2?l:d.K("copiedWndInfo"),15)})})},l.joinTabs=e=>{
let l=null!=t.x.order?t.x.order:t.x.sort,i=t.x.windows,n="current"===i,o="all"===i,u=u=>{let d=2===t.fe
;u=n?u:u.filter(e=>e.incognito===d);let f=n?u:u.filter(e=>e.id===t.we);if(!n&&!f.length)return void e(0);let a=i=>{
let o=[],d=e=>{o.push(e)};if(u.sort((e,l)=>e.id-l.id).forEach(e=>{e.tabs.forEach(d)}),!o.length)return void e(0)
;let f=t.x.filter,a=i?i.id:t.we,s=o.find(e=>e.id===t.he)||(i?r.selectFrom(i.tabs):o[0]);if(n&&c(t.$)>1&&o.length>1){
let e=o.findIndex(e=>e.id===s.id),l=v.getTabRange(e,o.length);o=o.slice(l[0],l[1])}if(f){let e={};o=v.oe(s,o,f,e),
f=e.known?f:null}if(!o.length)return void e(0);o=l?v.lu(o,l):o
;let w,m=t.x.position,p="before"===m||(m+"").startsWith("prev")
;f&&i?m&&"string"==typeof m&&"keep"!==m?"begin"===m||"start"===m?w=i.tabs.filter(e=>e.pinned).length:"end"!==m?(o.includes(s)&&o.splice(o.indexOf(s),1),
p?o.push(s):o.unshift(s),
w=Math.max(0,i.tabs.findIndex(e=>e.id===t.he)-o.filter(e=>e.windowId===a&&e.index<s.index).length)):w=i.tabs.length:w=o.reduce((e,l)=>l.windowId===a?Math.min(l.index,e):e,o.length):w=i?i.tabs.length:0
;for(let e of o)r.Me.move(e.id,e.windowId!==a?{windowId:a,index:w++}:{index:w++})
;for(let e of o)e.pinned&&e.windowId!==a&&r.tabsUpdate(e.id,{pinned:true});e(1)};{let e=f.length?f[0]:null
;if(e&&"popup"===e.type&&e.tabs.length){let l=r.selectFrom(e.tabs).id;e.tabs=e.tabs.filter(e=>e.id!==l),r.makeWindow({
tabId:l,incognito:e.incognito},e.state,e=>{e&&(t.we=e.id,e.tabs[0]&&(t.he=e.tabs[0].id)),a(e)})
}else u=n||!e||o||l&&!i?u:u.filter(l=>l.id!==e.id),a(e)}};n?r.getCurWnd(true,e=>e?u([e]):r.g()):(t.$=1,r.Ae.getAll({
populate:true,windowTypes:["normal","popup"]},u))},l.moveTabToNewWindow=e=>{let l=!!t.x.all,i=n=>{var o
;let a,s=n.tabs,w=s.length,m=false!==t.x.focused,I=r.selectIndexFrom(s),g=s[I]
;if(!l&&w<=1&&(!w||0===g.index&&c(t.$)>1))return void e(0);if(l){
for(let l of s)if(null!=r.getGroupId(l))return u.showHUD("Can not keep groups info during this command"),void e(0)
;a=[0,w]}else a=1===w?[0,1]:v.getTabRange(I,w);let x=t.x.filter,y=s.slice(a[0],a[1]);if(y=x?v.oe(g,y,x):y,
!y.length)return void e(0);if(!l){let l=y.length;if(l>=w&&w>1)return e(0),void u.showHUD(d.K("moveAllTabs"))
;if(l>30&&f.re())return void f.T("moveTabToNewWindow",l).then(i.bind(null,n))
;if(1===w&&0===g.index&&1===c(t.$))return void r.ye(r.Me.query,{windowId:n.id,index:1}).then(l=>{
if(!l||!l.length)return e(0),void u.showHUD(d.K("moveAllTabs"));n.tabs=[n.tabs[0],l[0]],i(n)})}
let _=g.incognito,h=y.includes(g)?g:y[0],T=(null!==(o=b(g))&&void 0!==o?o:g.index+1)<=g.index,k={tabId:h.id,incognito:_,
focused:m},z="normal"===n.type?n.state:"";v.ru(y[T?y.length-1:0],T,s).then(l=>{m||l&&r.selectTab(l.id),
r.makeWindow(k,z,t=>{if(!t)return void e(0);p(),m&&l&&r.selectTab(l.id)
;let i=y.indexOf(h),n=y.slice(0,i),o=y.slice(i+1),u=n.length,d=o.length,f=e=>e.id;u&&(r.Me.move(n.map(f),{index:0,
windowId:t.id},r.g),u>1&&r.Me.move(y[i].id,{index:u})),d&&r.Me.move(o.map(f),{index:u+1,windowId:t.id},r.g)
;for(let e of y)e.pinned&&r.tabsUpdate(e.id,{pinned:true});e(1)})})},n=l=>{let i=r.selectFrom(l.tabs)
;if(l.incognito&&i.incognito)return e(0),u.showHUD(d.K("hasIncog"));let n=i.id,o={incognito:true},a=r.getTabUrl(i)
;if(i.incognito);else{if(r.w(a))return e(0),u.complainLimits(d.K("openIncog"));o.url=a}l.tabs=null,r.Ae.getAll(i=>{
let u=false!==t.x.focused;if((i=i.filter(e=>e.incognito&&"normal"===e.type)).length)return void r.Me.query({
windowId:s.preferLastWnd(i).id,active:true},([e])=>{r.tabsCreate({url:a,windowId:e.windowId,active:false!==t.x.active,
index:s.newTabIndex(e,t.x.position,false,false)},f.getRunNextCmdBy(3)),u&&r.selectWnd(e),r.Me.remove(n)})
;let d="normal"===l.type?l.state:"",w=null!=o.url;w?t.We.is&&(u=true,d=""):o.tabId=n,o.focused=u,r.makeWindow(o,d,l=>{
w||l&&p(),w&&l?f.getRunNextCmdBy(0)(l.tabs&&l.tabs[0]||null):e(!!l)}),w&&r.Me.remove(n)})},o=!!t.x.incognito
;o&&(t.O?t.O.s.se:2===t.fe)?(u.showHUD(d.K("hasIncog")),
e(0)):(l||1!==c(t.$)&&!o?r.ye(r.getCurWnd,true):r.ye(r.getCurWnd,false).then(e=>e&&r.ye(r.Me.query,{windowId:e.id,
active:true}).then(l=>(e.tabs=l,l&&l.length?e:void 0)))).then(l=>{l?(o?n:i)(l):e(0)})},l.moveTabToNextWindow=([e],i)=>{
function n(n,d){let f,a=false!==t.x.focused,s=t.x.filter,w=!!(t.x.tabs||s||u);if(n.length>0){
f=n.map(e=>e.id).sort((e,l)=>e-l);let l=f.indexOf(e.windowId);if(f.length>=2||f.length>0&&l<0){
let m=t.x.nextWindow,I=u?1:(null==m?1:"boolean"==typeof m?m?1:-1:0|+m||1)*(w?1:t.$),g=u?0:l>=0?I>0?l+1:l:0,x=I>0?g+I-1:g+I
;x=(x%f.length+f.length)%f.length,x=x!==l?x:x+(I>0?1:-1),x=(x%f.length+f.length)%f.length
;let y=f[x],_=n.find(e=>e.id===y),h=a&&!o&&_&&"minimized"===_.state?d&&"maximized"===d.state?d.state:"normal":""
;return void r.Me.query({windowId:y,active:true},([l])=>{let n=b(l),o=null==n||n>l.index,u=null,d=false,f=null,m=()=>{
if(false===d)return void v.ru(e,!o,f).then(e=>{d=e,m()});let s;a||d&&r.selectTab(d.id),r.Me.move(e.id,{
index:null!=n?n:-1,windowId:y},l=>{if(r.g())return i(0),r.selectWnd(e),r.g();Promise.resolve(s).then(()=>i(1)),u=u||[e]
;for(let e=0;e<u.length;e++)u[e].id!==l.id&&r.Me.move(u[e].id,{index:l.index+e,windowId:l.windowId},r.g),
u[e].pinned&&r.Me.update(u[e].id,{pinned:true});t.O&&t.O.s.m===l.id&&p()}),a&&(h&&r.Ae.update(y,{state:h}),
r.selectWnd(l)),s=false!==t.x.active&&new Promise(l=>{r.selectTab(e.id,l)}),a&&d&&r.selectTab(d.id)}
;!w||!s&&1===c(t.$)?m():v.ke(true,0,(l,r)=>{if(f=l.slice(0),e=l[r[1]],l=l.slice(r[0],r[2]),
t.hi<52&&(l=l.filter(l=>l.incognito===e.incognito)),s){if(!(l=v.oe(e,l,s)).length)return void i(0)
;e=l.includes(e)?e:l[0]}u=l,d=(1!==u.length||!u[0].active)&&null,m()},[],i)})}}else n=d?[d]:[]
;w&&c(t.$)>1?l.moveTabToNewWindow(i):v.ru(e,false).then(l=>{a||l&&r.selectTab(l.id),r.makeWindow({tabId:e.id,
incognito:e.incognito,focused:a},1===n.length&&"normal"===n[0].type?n[0].state:"",t=>{t&&(p(),a&&l&&r.selectTab(l.id)),
e.pinned&&t&&t.tabs&&t.tabs[0]&&r.tabsUpdate(t.tabs[0].id,{pinned:true}),i(!!t)})})}
let o=false===t.x.minimized||false===t.x.min,u=t.x.last;u?v.eu("normal",false,e.incognito,e.windowId,o).then(e=>{
!e||e instanceof Array?n(e[0].slice(0,1),e[1]):n([e])}):r.Ae.getAll(l=>{
n(l.filter(l=>l.incognito===e.incognito&&"normal"===l.type&&(!o||"minimized"!==l.state)),l.find(l=>l.id===e.windowId))})
},l.reloadTab=(e,[i,n,o],u,d)=>{let a={bypassCache:true===(t.x.hard||t.x.bypassCache)},s=r.Me.reload,w=e
;if(c(t.$)<2||t.x.single)return void s(e[d?n:i].id,a,f.getRunNextCmdBy(0));let m=e[n],p=t.x.filter;if(e=e.slice(i,o),p){
if(!(e=v.oe(m,e,p)).length)return void u(0);m=e.includes(m)?m:e[0]}
if(e.length>20&&f.re())f.T("reloadTab",e.length).then(l.reloadTab.bind(null,w,[i,n,o],u));else{
s(m.id,a,f.getRunNextCmdBy(0));for(let l of e)l!==m&&s(l.id,a)}},l.removeTab=(e,i,n)=>{
let o=t.x.highlighted,u=t.x.goto||(t.x.left?"left":""),d=(u+"").split(/[\/,;\s]/),a=d.length>1?d[c(t.$)>1?1:0]:u+"",s="near"===a||"reverse"===a||a.startsWith("back"),w=a.startsWith("forw"),p=s?t.$>0:w?t.$<0:"left"===a,b=s?t.$<0:w?t.$>0:"right"===a,x=a.includes("previous"),y=x&&a.includes("only")
;if(!i){let i=c(t.$)>1||o||x&&!y;return void(i?r.getCurTabs:r.getCurTab)(l.removeTab.bind(null,e,i?2:1))}
if(!n||!n.length)return e(0),r.g();let _,h=n.length,T=r.selectIndexFrom(n),k=n[T],z=1,j=T,P=T+1;if(c(t.$)>1&&h>1){
let r=0;if(n[0].pinned!==k.pinned&&!(t.$<0&&n[T-1].pinned))for(;n[r].pinned;)r++;let o=v.getTabRange(T-r,h-r,h)
;if(z=o[1]-o[0],z>20&&f.re()&&i<3)return void f.T("removeTab",z).then(l.removeTab.bind(null,e,2,n));z>1&&(j=r+o[0],
P=r+o[1])}else if(o){let l=n.filter(e=>e.highlighted&&e!==k),t="no-current"===o;if(z=l.length+1,
z>1&&(t||z<h)&&r.Me.remove(l.map(e=>e.id),r.g),t)return void e(z>1)
}else if(t.x.filter&&0===v.oe(k,[k],t.x.filter).length)return void e(0)
;if(!j&&z>=h&&true!==(null!=t.x.mayClose?t.x.mayClose:t.x.allow_close))return void(i<2?r.getCurTabs(l.removeTab.bind(null,e,3)):r.Ae.getAll(I.bind(null,e,k,n)))
;if(i<2){if(y){let e=v.He();e>=0&&(_=r.ye(r.tabsGet,e))}else(b||p&&j>0)&&(_=r.ye(r.Me.query,{windowId:k.windowId,
index:p?j-1:j+1}).then(e=>e&&e[0]));if(_)return void _.then(t=>{t&&t.windowId===k.windowId&&r.xe(t)?(r.selectTab(t.id),
r.Me.remove(k.id,r.$e(e))):r.getCurTabs(l.removeTab.bind(null,e,3))})}let A=h;if(z>=h);else if(x){
let e=!y&&P<h&&!t.qe.has(n[P].id)?n[P]:n.filter((e,l)=>(l<j||l>=P)&&t.qe.has(e.id)).sort(m.ze.De)[0];A=e?n.indexOf(e):h
}else if(p||b){let e=A=p?j>0?j-1:P:P<h?P:j-1;for(;e>=0&&e<h&&(e<j||e>=P)&&!r.xe(n[e]);)e+=e<j?-1:1;A=e>=0&&e<h?e:A}
A>=0&&A<h&&r.selectTab(n[A].id),g(k,n,j,P,e)};let I=(e,l,i,n)=>{let o,u,d=false;n=n.filter(e=>"normal"===e.type),
"always"===t.x.keepWindow?d=!n.length||n.some(e=>e.id===l.windowId):n.length<=1?(d=true,
(u=n[0])&&(u.id!==l.windowId?d=false:u.incognito&&!r.w(t.newTabUrl_f)&&(o=u.id))):l.incognito||1===(n=n.filter(e=>!e.incognito)).length&&n[0].id===l.windowId&&(o=n[0].id,
d=true),d&&r.tabsCreate({index:i.length,url:"",windowId:o},f.getRunNextCmdBy(3)),g(l,i,0,i.length,d?null:e)
},g=(e,l,i,n,o)=>{let u=Math.max(0,l.indexOf(e));r.Me.remove(e.id,o?r.$e(o):r.g);let d=l.slice(u+1,n),f=l.slice(i,u)
;t.$<0&&([d,f]=[f,d]),d.length>0&&r.Me.remove(d.map(e=>e.id),r.g),f.length>0&&r.Me.remove(f.map(e=>e.id).reverse(),r.g)}
;l.toggleMuteTab=e=>{let l,i=t.x.filter,n=t.x.currentWindow,o=t.x.others,f=null!=o?o:t.x.other
;if(!(t.x.all||n||i||f))return void r.getCurTab(([l])=>{let i=!r.isTabMuted(l),n=null!=t.x.mute?!!t.x.mute:i
;n===i&&r.tabsUpdate(l.id,{muted:n}),u.showHUD(d.K(n?"muted":"unmuted")),e(1)});let a=n=>{
let o=f?t.O?t.O.s.m:t.he:-1,d=0===n.length||-1!==o&&1===n.length&&n[0].id===o
;if(null!=t.x.mute)d=!!t.x.mute;else for(let e of n)if(e.id!==o&&!r.isTabMuted(e)){d=true;break}
if(i&&!(n=v.oe(l,n,i)).length)return void e(0);let a={muted:d}
;for(let e of n)e.id!==o&&d!==r.isTabMuted(e)&&r.tabsUpdate(e.id,a)
;u.showHUDEx(t.O,d?"mute":"unmute",0,[[-1===o?"All":"Other"]]),e(1)},s=v.getNecessaryCurTabInfo(i),w=n&&t.we>=0?{
audible:true,windowId:t.we}:{audible:true};s?s.then(e=>{l=e,r.Me.query(w,a)}):r.Me.query(w,a)},l.togglePinTab=(e,l,i)=>{
let n=t.x.filter,o=l[1],u=e[o];e=n?v.oe(u,e,n):e;let d=!n||e.includes(u)?!u.pinned:!!e.find(e=>!e.pinned),a={pinned:d
},s=d?0:1,w=0;if(c(t.$)>1&&d)for(;e[w].pinned;)w++
;let m=v.getTabRange(o-w,e.length-w,e.length),p=w+m[s]-s,b=w+m[1-s]-s,I=[]
;for(;p!==b;p+=d?1:-1)(d||e[p].pinned)&&I.push(e[p])
;b=I.length,b?(b<=30||!f.re()?Promise.resolve(false):f.T("togglePinTab",b)).then(e=>{e&&(I.length=1)}).then(()=>{
let e=I.includes(u)?u.id:I[0].id;for(let l of I)r.tabsUpdate(l.id,a,l.id===e?r.$e(i):r.g)}):i(0)},
l.toggleTabUrl=(e,l)=>{let a=r.getTabUrl(e[0]),w=t.x.reader,v=t.x.keyword
;if(a.startsWith(t.We.U))return u.complainLimits(d.K(w?"noReader":"openExtSrc")),void l(0);if(w&&v){let l=o.Ne({u:a})
;l&&l.k===v?(f.overrideCmdOptions({keyword:""}),s.openUrlWithActions(l.u,0,true,e)):(a=n.Xl(l&&t.x.parsed?l.u:a,v),
s.openUrlWithActions(a,9,true,e))
}else w?t.Qe&&i.ln.test(a)?(a=a.startsWith("read:")?i.Ye(a.slice(a.indexOf("?url=")+5)):`read://${new URL(a).origin.replace(/:\/\/|:/g,"_")}/?url=${i.Cl(a)}`,
s.openUrlWithActions(a,9,true,e)):(u.complainLimits(d.K("noReader")),
l(0)):(a=a.startsWith("view-source:")?a.slice(12):"view-source:"+a,s.openUrlWithActions(a,9,true,e))},l._e=(e,l,i,n)=>{
let o,u=e.id,d=1===l;if(l&&r.Te()&&(false!==n||null==r.getGroupId(e))){let l=0,t=-1,i=()=>{let e=r.g()
;if(e)return r.Te().restore(null,f.getRunNextCmdBy(0)),t>=0&&r.Me.remove(t),t=0,e;l+=1,l>=5||setTimeout(()=>{
r.tabsGet(u,i)},50*l*l)};return d&&r.tabsCreate({url:"about:blank",active:false,windowId:e.windowId},e=>{
t?t=e.id:r.Me.remove(e.id)}),void r.Me.remove(u,()=>(r.tabsGet(u,i),r.g()))}{let l=r.isTabMuted(e);o=e=>{
l!==r.isTabMuted(e)&&r.tabsUpdate(e.id,{muted:l})}}let a={windowId:e.windowId,index:e.index,url:r.getTabUrl(e),
active:e.active,pinned:e.pinned,openerTabId:e.openerTabId};i&&(a=Object.assign(i,a)),null!=a.index&&a.index++,
r.openMultiTabs(a,1,true,[null],n,e,e=>{e&&o&&o(e),e?f.runNextOnTabLoaded(t.x,e):f.runNextCmd(0)}),r.Me.remove(u)},
l.Ie=(e,l,i)=>{let n=null;return(async()=>{var i;let o=l?l.window?r.selectFrom(l.window.tabs):l.tab:null;if(o&&(n=o),
!o||!(l.window||o.windowId!==e&&0===o.index))return;let u=o.url,d=/^(file|ftps?|https?)/.test(u)||u.startsWith(t.Ue)
;if(!d&&u.startsWith(location.protocol)&&!u.startsWith(t.Ue)){let e=new URL(u).host;d=!!e&&true===t.au.get(e)}
if(!d)return;let f=l.window;if(!f){let e=await r.ye(r.Me.query,{windowId:o.windowId,index:1})
;f=e&&e.length?null:await r.ye(r.Ae.get,o.windowId)}if(!f||"popup"===f.type)return;let a=r.ye(r.Me.create,{
url:"about:blank",windowId:f.id});await r.ye(r.Me.remove,o.id);let s=await a,w=r.ye(r.Te().restore)
;n=(null===(i=await w)||void 0===i?void 0:i.tab)||null,s&&await r.Me.remove(s.id)
})().then(async()=>(i&&(await r.ye(r.tabsUpdate,i,{active:true}),t.we!==e&&await r.ye(r.Ae.update,e,{focused:true})),n))
},l.toggleWindow=e=>{let l=t.x.target,i=t.x.states;i="string"==typeof i?i.trim().split(/[\s,;]+/):i,
i=i||["normal","maximized"];let n=t.we,o=l&&"current"!==l&&"all"!==l?t.nu:n
;o<0?e(0):r.ye(r.Ae.get,o).then(e=>e||r.ye(r.Ae.get,t.we)).then(async u=>{if(!u)return void e(0)
;let d="other"===l||"others"===l?await r.Pe(r.Ae.getAll).then(e=>(e=null==e?void 0:e.filter(e=>e.id!==n&&e.id!==o&&"devtools"!==e.type))?e.map(e=>e.id):[]):[],f={}
;if(i instanceof Array){let e=["normal","maximized","fullscreen","minimized"];i=i.map(l=>{var t
;return null!==(t=e.find(e=>e.startsWith(l)))&&void 0!==t?t:"current keep".includes(l)?"":" "}).filter(e=>" "!==e)
;let l=t.$>1?t.$-2:i.indexOf(u.state)+1,r=i.length>0&&i[l%i.length]||u.state;(r!==u.state||d.length>0)&&(f.state=r)}
Object.keys(f).length&&r.Ae.update(o,f,r.$e(e));for(let e of d)r.Ae.update(e,f,r.g)})}});