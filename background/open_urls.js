"use strict"
;__filename="background/open_urls.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./ports","./exclusions","./i18n","./key_mappings","./run_commands","./tools","./clipboard","./filter_tabs"],(e,l,t,r,n,i,u,o,f,s,d,a,v,p,m)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.Un=l.openUrlReq=l.openUrl=l.goToNextUrl=l.openUrlWithActions=l.openShowPage=l.openJSUrl=l.parseReuse=l.Ln=l.parseOpenPageUrlOptions=l.preferLastWnd=l.newTabIndex=void 0
;let w={current:0,reuse:1,newwnd:2,frame:3,newbg:-2,lastwndfg:-5,lastwnd:-5,lastwndbg:-6,iflastwnd:-7,reuseincurwnd:-3,
lastwndbgbg:-8,lastwndbginactive:-8}
;l.newTabIndex=(e,l,t,r)=>"before"===l||"left"===l||"prev"===l||"previous"===l?e.index:"after"===l||"next"===l||"right"===l?e.index+1:"default"===l?void 0:false!==r&&null!=n.getGroupId(e)?"start"===l||"begin"===l?e.index:"end"===l?void 0:e.index+1:"start"===l||"begin"===l?0:"end"===l?t?3e4:void 0:e.index+1,
l.preferLastWnd=e=>e.find(e=>e.id===t.nu)||e[e.length-1],l.parseOpenPageUrlOptions=(e,l)=>({d:(l=e.decoded,
null!=l?l:e.decode),g:e.group,i:e.incognito,k:e.keyword,m:e.replace,o:e.opener,p:e.position,r:e.reuse,s:p.P(e),
t:e.testUrl,w:e.window})
;let c=e=>"boolean"==typeof e?e:e?"force"===e||("reverse"===e?2!==t.fe:"same"===e||"keep"===e?2===t.fe:null):null,g=e=>"popup"===e||"normal"===e?e:void 0
;l.Ln=(e,l)=>{e=e.slice(0,128).split("?")[0].replace(/\\/g,"/")
;let r=t.G>1&&/\/globalroot\/device\/condrv|\bdevice\/condrv\/kernelconnect/.test(e);return r&&(t.O=l||t.O,
o.showHUD(s.K("harmfulURL"))),r};let y=(e,u,f,s)=>{r.Ol();let v=e=>{a.replaceCmdOptions(u),a.overrideCmdOptions({urls:e,
url:null,url_f:null,copied:null,keyword:null},true)};switch(s[1]){case 1:o.showHUD(s[0],15),a.runNextCmdBy(1,u);break
;case 5:case 7:v(null),7===s[1]||u.$p?e=0:a.overrideOption("$p",1),l.openUrlWithActions(i.Xl(s[0]),e,false,f);break
;case 4:e>=3&&s[0]&&a.runNextCmdBy(1,u);break;case 6:let p=s[0],m=t.he;if("openUrls"===p[0]){let l=p.slice(1),t=[]
;for(let r of l)"string"==typeof r||5!==r[1]&&7!==r[1]||(r=i.Xl(s[0],null,e)),
"string"!=typeof r?Promise.resolve(r).then(l=>{6===l[1]&&"openUrls"===l[0][0]||y(e,u,f,l)}):t.push(r)
;if(0===t.length)return;return v(t),void(f&&f.length>0?M(f):n.getCurTab(M))}setTimeout(()=>{
let e=t.a.get(m),l=e?e.d:null,n=r.Tn({keys:[p[1]]});t.Rn=null,"run1"===p[0]?t.I(p[1],l,{c:u.$f,r:u.$retry,u:0,w:0
}):a.executeCommand(d.la("runKey",n),1,0,l,0,null)},0)}},b=(e,l,t)=>{e?a.runNextOnTabLoaded(l,t):a.runNextCmdBy(0,l)
},h=(e,l,r,i,u)=>{let o=l=>(b(l,e,l),n.g());if(u){if(u.length>0&&u[0].incognito&&n.w(r))return void n.tabsCreate({url:r
},o)}else if(n.w(r)&&true!==i)return void n.getCurTab(h.bind(null,e,l,r,true));if(3===l&&t.O&&t.O.s.Q){let l={id:t.O.s.m
};return a.sendFgCmd(18,false,{r:1,u:r}),void setTimeout(()=>b(true,e,l),100)}u?n.tabsUpdate(u[0].id,{url:r
},o):n.tabsUpdate({url:r},o)},_=(e,l,t,r,i,u)=>{n.makeWindow({url:e,focused:l,incognito:t,
type:"string"==typeof e||1===e.length?g(r.window):void 0,left:i.left,top:i.top,width:i.width,height:i.height
},null!=i.state?i.state:u&&"minimized"!==u.state?u.state:"",e=>{b(e,r,e&&e.tabs[0])})},k=(e,r,i,u,o)=>{
let f=-2!==r,s=u?u.windowId:t.we,d=o.find(e=>e.id===s),a=null!=d&&d.incognito
;if(!i.window&&2!==r&&(a||(o=o.filter(e=>e.incognito&&"normal"===e.type)).length>0)){let r={url:e[0],active:f,
windowId:a?s:l.preferLastWnd(o).id};if(a){let e=true===i.opener;r.index=l.newTabIndex(u,i.position,e,i.group),
e&&(r.openerTabId=u.id)}n.openMultiTabs(r,t.$,true,e,a&&i.group,u,e=>{!a&&f&&n.selectWnd(e),b(e,i,e)})
}else _(e,true,true,i,i,d)}
;l.parseReuse=e=>null==e?-1:"string"!=typeof e?"boolean"==typeof e?e?1:-1:isNaN(e=+e&&0|e)||e>3||e<-8?-1:e:(e=e.toLowerCase().replace("window","wnd").replace(/-/g,""))in w?w[e]:-1
;let I=(e,l,i)=>{
let u=l&&l.length>0?n.getTabUrl(l[0]):"",o=[true!==i?false===i?"":i:(/[%$]s/i.exec(e)||["${url_mask}"])[0],t.x.host_mask||t.x.host_mark,t.x.tabid_mask||t.x.tabId_mask||t.x.tabid_mark||t.x.tabId_mark,t.x.title_mask||t.x.title_mark,t.x.id_mask||t.x.id_mark||t.x.id_marker],f=[]
;for(let t=0;t<o.length;t++){let i=null!=o[t]?o[t]+"":"",s=i?e.indexOf(i):-1;if(s>=0){let e=s+i.length;for(let e of f);
f.push([s,e,0===t?/^[%$]S|^\$\{S:/.test(i)?u:r.Cl(u):1===t?r.Cl(new URL(u).host):2===t?u&&""+l[0].id:3===t?u&&""+r.Cl(l[0].title):n.t.runtime.id])
}}if(f.length){let l="",t=0;f.sort((e,l)=>e[0]-l[0]);for(let r of f)l=l+e.slice(t,r[0])+r[2],t=r[1];e=l+e.slice(t)}
return e},$=(e,r,i,u)=>{let o,f=c(u.incognito);o=(r>-4?new Promise(e=>{n.getCurWnd(false,l=>(e(l||null),n.g()))
}):m.eu(g(u.window),true,f,t.we)).then(e=>e&&new Promise(l=>{n.Me.query({active:true,windowId:e.id},t=>(e.tabs=t,l(e),
n.g()))})),o.then(o=>{let s=!!o&&!o.focused&&o.id!==t.we,d=-7===r&&!s
;if(!o||!(s||-7===r&&(null==f||o.incognito===!!f))){if(-7===r&&a.runNextCmdBy(0,u))return
;return void _(e,r>-8,null!=f?!!f:i,u,u,o)}let v=o.tabs&&o.tabs.length>0?n.selectFrom(o.tabs):null;n.openMultiTabs({
url:e[0],active:r>-6||d,windowId:o.id,pinned:!!u.pinned,index:v?l.newTabIndex(v,u.position,false,u.group):void 0
},t.$,!!u.incognito&&"string"==typeof u.incognito,e,u.group,v,e=>{r>-6?s&&n.selectWnd(e):e&&r>-8&&!d&&n.selectTab(e.id),
b(e,u,r>-6&&-2!==r&&e)})})},P=(e,r,i,u)=>{
let o=u&&u[0],f=!!o&&o.incognito||2===t.fe,s=-2!==r&&-8!==r,d=2===r||r<-3||!!i.window,a=c(i.incognito),v=null!=a&&"string"==typeof i.incognito
;if(!v&&e.some(n.w))d=f||d;else if(f)d=false===a||d;else if(a&&r>-4)return void n.Ae.getAll(k.bind(null,e,r,i,o))
;if(d)return void $(e,r,f,i);let p=i.opener&&o?o.id:void 0,m={url:e[0],active:s,windowId:o?o.windowId:void 0,
openerTabId:p,pinned:!!i.pinned,index:o?l.newTabIndex(o,i.position,null!=p,i.group):void 0}
;n.openMultiTabs(m,t.$,v,e,i.group,o,e=>{s&&e&&n.selectWndIfNeed(e),b(e,i,s&&e)})},T=(e,r,i,u,o,s)=>{
let d,v=i?"string"==typeof i?f.Ll(i):"object"==typeof i&&i.t&&i.v?i:null:null,p=2===r||1===r,w=1===r||-3===r,y=w&&o.q||{},h=g(w?y.w:u.window),_=c(w?y.i:u.incognito),k=true===(w?y.g:u.group)
;t.$=1,w?(y.m=null,y.g=k):(a.overrideOption("group",k,u),null!=u.replace&&a.overrideOption("replace",v,u)),
d=r<-3&&v?m.eu(h,-7===r,_,t.we).then(e=>!e||e instanceof Array?null:e):Promise.resolve(!p&&t.we>=0?{id:t.we}:null),
Promise.all([d,!k||s?null:new Promise(e=>{n.getCurTab(l=>{s=l||[],e()})})]).then(([e,l])=>v&&(e||p)?new Promise(l=>{
n.Me.query(e?{windowId:e.id}:{windowType:h||void 0},e=>{
let i=null!=_?!_:r>-4?2!==t.fe:-2,u=(e||[]).filter(e=>f.Ml(v,e.url)&&e.incognito!==i);if(k&&u.length>0&&s.length>0){
let l=n.getGroupId(s[0]);e&&(u=u.filter(e=>n.getGroupId(e)===l))}if(u.sort((e,l)=>{let r=t.qe.get(l.id),n=t.qe.get(e.id)
;return n?r?r-n:1:r?-1:l.id-e.id}),1===r){let e=u.filter(e=>e.windowId===t.we);u=e.length>0?e:u}
return l(u.length?u[0]:null),n.g()})}):null).then(i=>{
if(null==i||i.id===t.he&&!w)w?l.Un(o):a.runNextCmdBy(0,u)||(s?P([e],r,u,s):n.getCurTab(P.bind(null,[e],r,u)));else if(t.Kn&&i.url.startsWith(t.We.Bn))x(w?o.f||{}:u,i);else{
let l=-2!==r&&-8!==r,f=i.windowId!==t.we&&r>-6;n.tabsUpdate(i.id,{url:e},e=>(e&&(l&&(n.selectTab(e.id),e.active=true),
f&&n.selectWnd(e)),b(e,w?o.f||{}:u,-2!==r&&r>-6&&e),n.g()))}})};l.openJSUrl=(e,l,i,u)=>{var f
;if(/^(void|\(void\))? ?(0|\(0\))?;?$/.test(e.slice(11).trim()))a.runNextCmdBy(1,l);else{if(!i&&t.O){
if(0===u&&(t.O=(null===(f=o.R())||void 0===f?void 0:f.C)||t.O),o.safePost(t.O,{N:5,u:e,f:a.parseFallbackOptions(l)
}))return;if(-1!==u)return void a.runNextCmdBy(0,l);t.O=null}r.Ye(e.slice(11)),Promise.resolve().then(e=>{
void 0===e&&i&&i(),b(!!e,l,null)}),n.g()}},l.openShowPage=(e,r,i,u)=>{let o=t.We.Bn
;if(e.length<o.length+3||!e.startsWith(o))return false
;if(void 0===u)return n.getCurTab(t=>(l.openShowPage(e,t&&t.length>0||-2===r?r:-1,i,t&&t[0]||null),n.g())),true
;e=e.slice(o.length);let f=u?u.incognito:2===t.fe
;e.startsWith("#!image ")&&f&&(e="#!image incognito=1&"+e.slice(8).trim());let s=[e,null,0]
;return t.Kn=s[1]=()=>(clearTimeout(s[2]),t.Kn=null,s[0]),s[2]=setTimeout(()=>{
s[0]="#!url vimium://error (vimium://show: sorry, the info has expired.)",s[2]=setTimeout(()=>{t.Kn===s[1]&&(t.Kn=null),
s[0]="",s[1]=null},2e3)},1200),t.$=1,0===r||3===r||f&&(-2===r||-1===r)?f?n.tabsCreate({url:o,active:-2!==r},e=>{b(e,i,e)
}):x(i,u):(i.incognito=false,1===r||-3===r?T(e,r,i.replace,null,{u:o,a:i.parent,p:i.prefix,
q:l.parseOpenPageUrlOptions(i),f:a.parseFallbackOptions(i)},u?[u]:void 0):P([o],r,i,u?[u]:void 0)),true};let x=(e,l)=>{
n.tabsUpdate(l.id,{url:t.We.Bn,active:true}),r.os(()=>{a.runNextOnTabLoaded(e,null)})},M=e=>{let r=t.x,u=r.urls
;if(2!==r.$fmt){if(1!==r.$fmt)for(let e=0;e<u.length;e++)u[e]=i.Xl(u[e]+"");a.overrideCmdOptions({},true),
a.overrideOption("urls",u),a.overrideOption("$fmt",2)}for(let e of u)if(l.Ln(e))return n.g()
;let o=l.parseReuse(r.reuse),f=1===o||0===o||3===o||-3===o?-1:o;t.x=null,P(u,f,r,e)};l.openUrlWithActions=(e,u,o,f)=>{
var s,d;if("string"!=typeof e);else if(e||9!==u){
let n=a.fillOptionWithMask(e,t.x.mask,"value",["url","url_mask","url_mark","value"],t.$),v={};n.ok&&(e=n.result,
n.useCount&&(t.$=1));let m=t.x.url_mask,w=t.x.url_mark;if(null==m&&null==w||(e=I(e,f,null!=m?m:w)),o){let l=p.P(t.x)
;e=t.S(e,0,l,v)}if(9!==u){
let l=null!==(s=v.F)&&void 0!==s?s:(t.x.keyword||"")+"",n=null!==(d=t.x.testUrl)&&void 0!==d?d:!l,o=!!v.F||!!v.Fl||!!l&&"~"!==l
;e=n?i.Xl(e,l,u):i.q(e.trim().split(r.D),l,o?-2:u),e=n||!o?e:i.Xl(e,null,i.ii&&e.startsWith("vimium:")?3:u)}
let c=t.x.goNext;c&&e&&"string"==typeof e&&(e=t.S(e,8192,null,{}),e=l.goToNextUrl(e,t.$,"absolute"===c)[1],
v.F&&(e=i.q(e.trim().split(r.D),v.F,3))),e="string"==typeof e?i.ei(e):e}else e=t.newTabUrl_f
;let v=t.x,m=l.parseReuse(v.reuse)
;t.x=null,r.Ol(),"string"!=typeof e?Promise.resolve(e).then(y.bind(0,u,v,f)):l.openShowPage(e,m,v)||(r.di(e)?l.openJSUrl(e,v,null,m):l.Ln(e)?a.runNextCmdBy(0,v):1===m||-3===m?T(e,m,v.replace,null,{
u:e,a:v.parent,p:v.prefix,q:l.parseOpenPageUrlOptions(v),f:a.parseFallbackOptions(v)
},f):0===m||3===m?h(v,m,e):v.replace?T(e,m,v.replace,v,null,f):f?P([e],m,v,f):n.getCurTab(P.bind(null,[e],m,v)))}
;let U=(e,f,d)=>{if(null===d)return o.complainLimits(s.K("readClipboard")),void a.runNextCmd(0)
;if(!(d=d.trim()))return o.showHUD(s.K("noCopied")),void a.runNextCmd(0);let v,p="string"==typeof e&&e.includes("any")
;if(("urls"===e||p)&&(v=d.split(/[\r\n]+/g)).length>1){let e=[],l=p&&t.x.keyword,u=l?l+"":null,s=false
;for(let l of v)if(l=l.trim(),l){if(l=i.Xl(l,u,0),!(p||i.Yl<=2)){e.length=0,s=true;break}e.push(l)}
if(e.length>1)return t.x=a.copyCmdOptions(r.i(),t.x),t.x.urls=e,t.x.$fmt=1,void(f&&f.length>0?M(f):n.getCurTab(M))
;if(s)return void(a.runNextCmd(0)||o.showHUD("The copied lines are not URLs"))}if(i.es.test(d))d=d.slice(1,-1);else{
let e=t.x.testUrl;(null!=e?e:!t.x.keyword)&&(d=u.Wn(d,e))}let m=d.indexOf("://")+3;if(m>3&&r.ln.test(d)){
let e,l=(d=/^ttps?:/i.test(d)?"h"+d:d).indexOf("/",m)+1||d.length,t=d.slice(m,l),r=t.startsWith("0.0.0.0")?7:t.includes(":::")&&(e=/^(\[?::\]?):\d{2,5}$/.exec(t))?e[1].length:0
;d=r?d.slice(0,m)+(r>6?"127.0.0.1":"[::1]")+d.slice(m+r):d}l.openUrlWithActions(d,2,false,f)};l.goToNextUrl=(e,l,t)=>{
let r=false
;return e=e.replace(/\$(?:\{([\da-zA-Z_-]+)(?:[,\/#@](\d*)(?::(\d*)(:-?\d*)?)?(?:[,\/#@]([^}]+))?)?\}|\$)/g,(e,n,i,u,o,f)=>{
if("$$"===e)return"$";r=true;let s=10,d=1,a=false
;for(let[e,l]of f?f.split("&").map(e=>e.split("=")):[])"min_len"===e||"len"===e?d=+l||1:"radix"===e?(s=+l||0,
s=s>=2&&s<=36?s:10):"reverse"!==e&&"negative"!==e||(a="1"===l||"true"===l.toLowerCase())
;let v=n&&parseInt(n,s)||1,p=i&&parseInt(i)||0,m=u&&parseInt(u)||0,w=o&&parseInt(o.slice(1))||1
;w<0&&([p,m]=[Math.min(p,m),Math.max(p,m)]),l*=a?-w:w,v=t?l>0?p+l-1:l<0?m+l:v:v+l
;let c=""+Math.max(p||1,Math.min(v,m?m-1:v));return c="0".repeat(d-c.length)+c,c}),[r,e]},l.openUrl=e=>{
if(t.x.urls)return void(t.x.urls instanceof Array&&(e&&e.length>0?M(e):n.getCurTab(M)))
;if((null!=t.x.url_mask||null!=t.x.url_mark)&&!e)return n.g()||void n.getCurTab(l.openUrl);let r=t.x.url
;if(r)l.openUrlWithActions(r+"",3,true,e);else if(t.x.copied){
let l,r=t.x.copied,n="string"!=typeof r?null:r.includes("<")?r.split("<")[1]:r.includes(">")?r.split(">")[0]:null,i={}
;n?(r=r.includes("<")?r.split("<")[0]:r.split(">")[1],l=t.kl.get(n)||"",l=t.S(l,32768,p.P(t.x),i)):l=t.El(p.P(t.x),0,i),
null!=i.F&&a.overrideCmdOptions({keyword:i.F}),l instanceof Promise?l.then(U.bind(null,r,e)):U(r,e,l)
}else l.openUrlWithActions(t.x.url_f||"",9,false,e)},l.openUrlReq=(e,n)=>{var f,s;r.Tn(e)
;let d=null!=n&&o.isNotVomnibarPage(n,true);t.O=d?n:o.findCPort(n)||t.O
;let v=e.u||"",p=e.n&&a.parseFallbackOptions(e.n)||{},m=e.o||e.n&&l.parseOpenPageUrlOptions(e.n)||{},w=(m.k||"")+"",g=null!==(f=m.t)&&void 0!==f?f:!w,y=m.s,b=e.m||0,h=b<64?-17&b:b,_=null!=e.f?e.f:45===h||46===h
;if(p.group=!d||m.g,p.incognito=null!=c(m.i)?m.i:45===h||null,p.replace=m.m,p.position=m.p,
p.reuse=null!=m.r?m.r:b?"window"===e.t?2:(16&b?-2:-1)+("last-window"===e.t?-4:0):e.r,p.window=m.w,v||!d){
":"===v[0]&&!d&&/^:[bhtwWBHdso]\s/.test(v)&&(v=e.u=v.slice(2).trim());let l=v,n={},o=d?_?1048576:524288:g?16384:0
;v=g?u.Zn(v,_):v,v=t.S(v,o,y,n);let f,a=null!==(s=n.F)&&void 0!==s?s:w
;_?v=(f=v!==l)?i.Xl(v,null,-1):v:(f=!!g||!d&&!a)?(v=g?u.Wn(v,g):v,
v=i.Xl(v,a,d?-1:3)):(v=i.q(v.trim().split(r.D),a,a&&"~"!==a?-1:0),
f=i.ii,v=f?i.Xl(v,null,v.startsWith("vimium:")?3:0):v),
f&&(2!==i.Yl&&1!==i.Yl||null==e.h?3===i.Yl&&v.startsWith("vimium:")&&!l.startsWith("vimium://")&&(v=i.Xl(v,null,i.ii||v.startsWith("vimium://run")?3:0)):v=(e.h?"https":"http")+v.slice("s"===v[4]?5:4)),
p.opener=d?false!==m.o:t.In.actions.includes("opener"),p.url_f=v}else{if(!e.c)return t.O=n||o.findCPort(null),
void(a.runNextCmdBy(0,p)||o.showHUD("",14));p.copied=e.c,p.keyword=w,p.testUrl=m.t,p.sed=y}t.$=1,a.replaceCmdOptions(p),
l.openUrl()},l.Un=(e,u)=>{let o,f=r=>{var i;let f=null!==(i=c(w.i))&&void 0!==i?i:2===t.fe&&null;if(r=r||[],
null!==f&&(r=r.filter(e=>e.incognito===f)),w.g&&o.length>0){let e=n.getGroupId(o[0]);r=r.filter(l=>n.getGroupId(l)===e)}
if(r.length>0){let e=r.filter(e=>e.windowId===t.we);return void s(e.length>0?e:r)}let v=2===t.fe&&n.w(e.u)
;return e.f&&a.runNextCmdBy(0,e.f)||(o.length<=0||w.w||2===y?n.makeWindow({url:e.u,type:g(w.w),incognito:!v&&2===t.fe
},"",e=>{d(e&&e.tabs&&e.tabs.length>0?e.tabs[0]:null)}):v?n.openMultiTabs({url:e.u,active:true
},1,null,[null],w.g,null,d):0===y||3===y?(h({},y,e.u),3===y&&u&&u.s.Q?(a.sendFgCmd(18,false,{r:1,u:e.u}),
d(o[0])):n.tabsUpdate(o[0].id,{url:e.u},d)):n.openMultiTabs({url:e.u,index:l.newTabIndex(o[0],w.p,false,true),
openerTabId:w.o&&o[0]?o[0].id:void 0,windowId:o[0].windowId,active:true},1,null,[null],w.g,o[0],d)),n.g()},s=l=>{
let r=e.u,i=!!e.p,u=i?1:e.a?-1:0;u&&l.sort((e,l)=>(e.url.length-l.url.length)*u);let o=n.selectFrom(l)
;if(u&&o.url.length>l[0].url.length===i&&(o=l[0]),
!r.startsWith(t.We.Fr)||t.a.get(o.id)||e.s)if(t.Kn&&o.url.startsWith(t.We.Bn))x(e.f||{},o),n.selectWndIfNeed(o);else{
let l=t.Qe?o.url.replace(/^edge:/,"chrome:"):o.url,u=t.Qe?r.replace(/^edge:/i,"chrome:"):r
;p=i?l.startsWith(u):e.a?u.startsWith(l):u===l,n.tabsUpdate(o.id,{url:p?void 0:r,active:true},d),n.selectWndIfNeed(o)
}else n.tabsCreate({url:r},d),n.Me.remove(o.id)},d=l=>{if(!l)return e.f&&a.runNextCmdBy(0,e.f),n.g()
;a.runNextOnTabLoaded(e.f||{},l,e.s&&(()=>{v.ve.Qn(e,l.id,0,p)}))},p=false,m=i.ei(e.u.split("#",1)[0])
;if(l.Ln(m,u))return;let w=e.q||(e.q={});(null==w.g||m.startsWith(t.We.Fr))&&(w.g=false)
;let y=null!=w.r?l.parseReuse(w.r):1;w.m?T(e.u,3!==y&&0!==y?y:1,w.m,null,e):n.ye(n.getCurTab).then(async l=>{o=l
;let i=[],u=-3===y&&t.we>=0?t.we:void 0,s=m,d=g(w.w)||"normal";if(r.ln.test(m)){
let l=m.indexOf("/")+2,t=m.indexOf("/",l+1),r=m.slice(l,t>0?t:void 0);e.a&&(m=m.slice(0,t>0?t+1:void 0),
s=m=m.endsWith("/")?m:m+"/"),r&&r.includes("@")&&(s=m=m.slice(0,l)+r.split("@")[1]+m.slice(t))}let a=!!(e.p||e.a)
;!m.startsWith("file:")&&!m.startsWith("ftp")||m.includes(".",m.lastIndexOf("/")+1)||i.push(s+(a?"/*":"/")),
i.push(a?s+"*":s);for(let l of i){let r=await n.ye(n.Me.query,{url:l,windowType:d,windowId:u})
;if(r&&e.a&&(t.Qe&&(m=m.replace(/^chrome:/i,"edge:")),r=r.filter(e=>m.startsWith(e.url.split(/[#?]/,1)[0]))),
r&&r.length>0)return f(r)}f([])})}});