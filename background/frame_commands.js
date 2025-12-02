"use strict"
;__filename="background/frame_commands.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./ports","./exclusions","./i18n","./key_mappings","./run_commands","./open_urls","./tools"],(e,l,t,r,n,u,i,o,a,s,f,d,c)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.blurInsertOnTabChange=l.ge=l.focusFrame=l.framesGoNext=l.toggleZoom=l.mainFrame=l.framesGoBack=l.openImgReq=l.captureTab=l.handleImageUrl=l.enterVisualMode=l.L=l.me=l.showVomnibar=l.initHelp=l.performFind=l.parentFrame=l.nextFrame=void 0,
t.Xe=(e,l)=>{var u,o;let a=t.a.get(t.he)||t.O&&i.R(),s=a?a.d:t.O
;if(!a||!a.C||s===a.C||512&a.C.s.b||r.ln.test(a.C.s.Jl)&&!(512&s.s.b)&&s.s.Jl.startsWith((null!==(o=null===(u=r.uu(a.C.s.Jl))||void 0===u?void 0:u.origin)&&void 0!==o?o:"")+"/")||(s=a.C),
3===e&&!l)return navigator.permissions.query({name:"clipboard-read"
}).catch(t.o).then(e=>!!e&&"denied"!==e.state&&t.Xe(3,true,null));let d=setTimeout(()=>{let e=t.gn(d,null)
;e&&e.r&&e.r(false)},4e4),c=r.Je();if(t.gn(null,{i:d,t:e,s:l,d:null,r:c.Ge}),s)f.portSendFgCmd(s,0,1,{u:t.We.bn,
c:"R TEE UI",a:1===e||5===e||9===e||3===e?"clipboard-write; clipboard-read":"",t:3e3,
i:!a||s===a.d||512&a.d.s.b?0:a.d.s.Q},1);else{let e=c.Ee;n.getCurWnd(false,l=>{let r=l?l.id:t.we;n.makeWindow({
type:"popup",url:t.We.bn,focused:true,incognito:false,left:0,top:0,width:100,height:32},"",l=>{
let u=l?null:t.gn(null,null);if(l){let u=l.id;e.then(()=>{r!==t.we&&n.Ae.update(r,{focused:true},n.g),n.Ae.remove(u,n.g)
}),e=null}else u&&u.i===d&&(clearTimeout(u.i),u.r&&u.r(false))})})}return c.Ee},l.nextFrame=()=>{
let e=t.O,r=-1,n=i.R(),u=n&&n.J;if(u&&u.length>1){r=u.indexOf(e);for(let e=Math.abs(t.$);e>0;e--)r+=t.$>0?1:-1,
r===u.length?r=0:r<0&&(r=u.length-1);e=u[r]}l.focusFrame(e,0===e.s.Q,e!==t.O&&n&&e!==n.d?4:3)},l.parentFrame=()=>{
let e=t.O.s,r=e.m>=0&&i.hn(t.O)?null:"Vimium C can not access frames in current tab";r&&i.showHUD(r),
i.getParentFrame(e.m,e.Q,t.$).then(e=>{e?l.focusFrame(e,true,5):l.mainFrame()})},l.performFind=()=>{
let e=t.O.s,l=t.$<0?-t.$:t.$,r=t.x.index,u=r?"other"===r?l+1:"count"===r?l:r>=0?-1-(0|r):0:0,i=t.x.highlight,o=t.x.extend,a="before"===o||"before"===t.x.direction?-1:1,s=!!u||!t.x.active,d=null
;32&e.b||(e.b|=32,d=n.k(e)),f.sendFgCmd(1,true,f.wrapFallbackOptions({c:u>0?t.$/l:t.$,l:s?1:0,f:d,d:a,
m:"number"==typeof i?i>=1?Math.min(0|i,200):0:i?s?100:20:0,n:!!t.x.normalize,r:true===t.x.returnToViewport,
s:!u&&l<2&&!!t.x.selected,t:o?a>0?2:1:0,p:!!t.x.postOnEsc,e:!!t.x.restart,
q:t.x.query?t.x.query+"":s||t.x.last?c.ce.Jr(e.se,"",u<0?-u:u):""}))},l.initHelp=(e,l)=>f.initHelpDialog().then(r=>{
var n;if(!r)return;let u=e.w&&(null===(n=i.hn(l))||void 0===n?void 0:n.C)||l,o=u.s.Jl.startsWith(t.We.Fr),a=e.a||{}
;if(u.s.b|=262144,t.O=u,e.f){let e=t.yn.get("?"),l=e&&8===e.kn&&e.Mn?"?":"";l||t.yn.forEach((t,r)=>{
8===t.kn&&t.Mn&&(l=l&&l.length<r.length?l:(e=t,r))}),a=l&&s._n(e)||a}f.sendFgCmd(17,true,{h:r.wn(o,a.commandNames),
o:t.We.Fr,f:e.f,e:!!a.exitOnClick,c:o&&!!s.xn||t.A.showAdvancedCommands})}),l.showVomnibar=e=>{var n;let u=t.O,o=t.x.url
;if(null!=o&&true!==o&&"string"!=typeof o&&(o=null,delete t.x.url),!u){
if(u=(null===(n=i.R())||void 0===n?void 0:n.C)||null,!u)return;t.O=u}let a=null;if(null!=o&&t.x.urlSedKeys){
let r="string"==typeof o?o:"string"==typeof t.x.u?t.x.u:i.j();if(r&&r instanceof Promise)return void r.then(t=>{
f.overrideCmdOptions({u:t||""},true),l.showVomnibar(e)});let n={};a=t.S(r,0,{r:null,k:t.x.urlSedKeys},n),
null!=n.F&&f.overrideCmdOptions({keyword:n.F})}"bookmark"===t.x.mode&&f.overrideOption("mode","bookm")
;let s=t.vomnibarPage_f,{Jl:d}=u.s,c=!s.startsWith(t.We.U),m=d.startsWith(t.We.U),p=e||!s.startsWith(t.Ue)?t.We.Nn:s,v=(e=e||(c?m||s.startsWith("file:")&&!d.startsWith("file:///")||s.startsWith("http:")&&!/^http:/.test(d)&&!/^http:\/\/localhost[:/]/i.test(s):u.s.se||m&&!s.startsWith(d.slice(0,d.indexOf("/",d.indexOf("://")+3)+1))))||s===p||u.s.m<0,g=t.x.trailingSlash,b=t.x.trailing_slash,h=f.copyCmdOptions(r.Tn({
v:v?p:s,i:v?null:p,t:v?0:c?2:1,s:null!=g?!!g:null!=b?!!b:null,j:v?"":t.We.jn,e:!!t.x.exitOnClick,u:a,
url:"string"==typeof o&&a||o,k:r.Hn(true)}),t.x);null==h.icase&&t.In.actions.includes("icase")&&(h.icase=true),
f.portSendFgCmd(u,6,true,h,t.$),h.k="omni",t.x=h},l.me=(e,l,r)=>{let n=e.s.m,u=n>=0?n:t.he,o=e.s.Q||n<0?t.a.get(u):null
;return o&&(n<0&&(64&e.s.b||e.s.Jl.startsWith("about:"))&&(e=o.d),("tab"===l||!l&&!r&&n<0)&&(o.C||n<0)&&(e=o.C||o.d),
64&e.s.b||e.s.Jl.startsWith("blob:"))?i.getParentFrame(u,e.s.Q,1).then(e=>e||o.C||o.d):e},l.L=()=>{
let e=t.x.mode,l=t.$<2||t.$>10?1:t.$,r=e&&"create"===(e+"").toLowerCase()?1:0,n=t.x.key,u={a:r,n:!t.x.storeCount,
s:true!==t.x.swap,t:"",o:t.x};if("string"==typeof n&&1===n.trim().length)return u.a=0,void t.dn[21]({H:21,c:u,k:t.je,
n:n.trim(),s:0,u:"",l:!!t.x.local},t.O);Promise.resolve(a.K(1===r?"mBeginCreate":"mBeginGoto")).then(e=>{u.t=e,
f.portSendFgCmd(t.O,3,true,u,l)})},l.enterVisualMode=()=>{
let e=t.x.mode,l=t.x.start,u="string"==typeof e?e.toLowerCase():"",i=t.O.s,o=null,a=null,d=null
;16&~i.b&&(32&i.b||(i.b|=32,o=n.k(i)),a=s.Cn,d=s.Pn,i.b|=16);let c=r.Gn({m:"caret"===u?3:"line"===u?2:1,f:o,g:d,k:a,
t:!!t.x.richText,s:null!=l?!!l:null,w:""},t.x);delete c.mode,delete c.start,delete c.richText,f.sendFgCmd(5,true,c)},
l.handleImageUrl=(e,l,u,o,a,s,f)=>{var d;if(u){if(1&u&&(e||!1?Promise.resolve():r.qn(l).then(l=>{e=l
})).then(()=>t.Xe(9===u?u:1,{u:e,t:s,b:1},l)).then(async e=>{o(!!e)}),2&u)return f(e),void(1&u||o(1));if(4&u){
let l=(null===(d=i.R())||void 0===d?void 0:d.C)||t.O,s=r.Je();1&u&&true?setTimeout(s.Ge,800):s.Ge(0),
s.Ee.then(()=>n.downloadFile("",a,l?l.s.Jl:null)).then(l=>{l||f(e),4===u&&o(true)})}}else o(1)},l.captureTab=(e,u)=>{
let o=t.x.show,s=!!t.x.copy,f=t.x.download,d=s?true===f:false!==f,c=!!t.x.richText,m=t.x.png?0:Math.min(Math.max(0|t.x.jpeg,0),100),p=e&&e[0],v=!!p&&p.url.startsWith(location.protocol),g=p?p.windowId:t.we,b=p?p.title:"Tab"+(p?p.id:t.he)
;b="title"===t.x.name?b:r.now().replace(/[-: ]/g,e=>" "===e?"_":"")+"-"+b,b=b.replace(r.En(),""),b+=m>0?".jpg":".png",
n.Me.captureVisibleTab(g,m>0?{format:"jpeg",quality:m}:{format:"png"},e=>{
if(!e)return t.O&&i.showHUD("Can not capture "+(v?"injected extensions":"this tab")),u(0),n.g()
;l.handleImageUrl(e,null,(o?2:0)|(d?4:0)|(s?1:0),s?e=>{
i.showHUD(a.K(e?"imgCopied":"failCopyingImg",[1===e?"HTML":m?"JPEG":"PNG"])),u(e)
}:u,b,((c||"")+"").includes("name")?b:"",e=>{t.dn[26]({t:"pixel=1&",u:e,f:b,a:false,m:37,o:{r:t.x.reuse,m:t.x.replace,
p:t.x.position,w:t.x.window}},t.O)})})},l.openImgReq=(e,l)=>{var n,o;let s=e.u;if(/^<svg[\s>]/i.test(s)){if(s=u.On(s),
!s)return t.O=l,void i.showHUD(a.K("invalidImg"));e.f=e.f||"SVG Image"}if(!r.uu(s))return t.O=l,
void i.showHUD(a.K("invalidImg"));let c=t.We.Bn+"#!image ";e.f&&(c+="download="+r.Cl(e.f)+"&"),
false!==e.a&&(c+="auto=once&"),e.t&&(c+=e.t)
;let m=e.o||r.i(),p={},v=m.s?t.S(s,32768,m.s,p):s,g=null!==(n=p.F)&&void 0!==n?n:m.k,b=null!==(o=m.t)&&void 0!==o?o:!g,h=v!==s
;s=v,f.replaceCmdOptions({opener:true,reuse:null!=m.r?m.r:16&e.m?-2:-1,replace:m.m,position:m.p,window:m.w}),t.$=1
;let y=g||h?b?u.Xl(s,g,2):u.q(s.trim().split(r.D),g,2):s;l&&i.safePost(l,{N:11,H:i.ensureInnerCSS(t.O.s),k:1,t:" ",
d:1e-4}),d.openUrlWithActions("string"!=typeof y||!b||y.startsWith(location.protocol)&&!y.startsWith(t.Ue)?y:c+y,9)},
l.framesGoBack=(e,t,r)=>{let u=f.hasFallbackOptions(e.o)?(f.replaceCmdOptions(e.o),
f.getRunNextCmdBy(0)):n.g,i=r?r.id:t.s.m,o=e.s,a=d.parseReuse(e.o.reuse||0);if(a){let t=e.o.position
;n.Me.duplicate(i,r=>{if(!r)return u();-2===a&&n.selectTab(i);{let t=f.parseFallbackOptions(e.o)||{};t.reuse=0,
l.framesGoBack({s:o,o:t},null,r)}let s=r.index--,c="end"===t?-1:d.newTabIndex(r,t,false,true)
;null!=c&&c!==s&&n.Me.move(r.id,{index:3e4===c?-1:c},n.g)})}else{let e=o>0?n.Me.goForward:n.Me.goBack
;for(let l=0,t=o>0?o:-o;l<t;l++)e(i,l?n.g:u)}},l.mainFrame=()=>{let e=i.R(),r=e&&e.C
;!r||r===e.d&&t.x.$else&&"string"==typeof t.x.$else?f.runNextCmd(0):l.focusFrame(r,true,r===e.d?3:5)},l.toggleZoom=e=>{
n.ye(n.Me.getZoom).then(l=>{if(!l)return void e(0);let r=t.$<-4?-t.$:t.$;(t.x.in||t.x.out)&&(r=0,t.$=t.x.in?t.$:-t.$)
;let u,i=t.x.level,o=Math;if(t.x.reset)u=1;else if(null!=i&&!isNaN(+i)||r>4){
let e=o.max(.1,o.min(0|t.x.min||.25,.9)),l=o.max(1.1,o.min(0|t.x.min||5,100))
;u=null==i||isNaN(+i)?r>1e3?1:r/(r>49?100:10):1+i*t.$,u=o.max(e,o.min(u,l))}else{
let e=0,r=9,n=[.25,1/3,.5,2/3,.75,.8,.9,1,1.1,1.25,1.5,1.75,2,2.5,3,4,5]
;for(let t=0,u=0;t<n.length&&(u=Math.abs(n[t]-l))<r;t++)e=t,r=u;u=n[e+t.$<0?0:o.min(e+t.$,n.length-1)]}
Math.abs(u-l)>.005?n.Me.setZoom(u,n.$e(e)):e(0)})},l.framesGoNext=(e,l)=>{let r=t.x.patterns,n=false
;if(r&&r instanceof Array||(r=r&&"string"==typeof r?r:(n=true,e?t.A.nextPatterns:t.A.previousPatterns),r=r.split(",")),
n||!t.x.$fmt){let e=[];for(let l of r)if(l=l&&(l+"").trim(),l&&e.push(".#[:".includes(l[0])?l:l.toLowerCase()),
200===e.length)break;r=e,n||(f.overrideOption("patterns",r),f.overrideOption("$fmt",1))}
let u=r.map(e=>Math.max(e.length+12,4*e.length)),i=Math.max.apply(Math,u);f.sendFgCmd(10,true,f.wrapFallbackOptions({
r:t.x.noRel?"":l,n:e,match:t.x.match,clickable:t.x.clickable,clickableOnHost:t.x.clickableOnHost,exclude:t.x.exclude,
excludeOnHost:t.x.excludeOnHost,evenIf:t.x.evenIf,scroll:t.x.scroll,p:r,l:u,m:i>0&&i<99?i:32,v:false!==t.x.view,
a:!!t.x.avoidClick}))},l.focusFrame=(e,l,r,n)=>{e.postMessage({N:7,H:l?i.ensureInnerCSS(e.s):null,m:r,k:t.je,c:0,
f:!n&&t.x&&f.parseFallbackOptions(t.x)||{}})},l.ge=()=>{var e;return null!==(e=t.x.blur)&&void 0!==e?e:t.x.grabFocus},
l.blurInsertOnTabChange=e=>{let u=f.parseFallbackOptions(t.x);u&&u.$then?u.$else=u.$then:u=null;let a=l.ge()
;if("string"==typeof a){let e=o.Ll(a)||false;f.overrideOption(a===t.x.blur?"blur":"grabFocus",e),a=e}
let s=e?t.a.get(e.id):null;if(n.g()||!s||a&&true!==a&&!o.Ml(a,s.d.s.Q?s.d.s.Jl:e.url))return u&&f.runNextCmdBy(1,u),
n.g();setTimeout(()=>{i.Vn(t.a.get(t.he),true).then(()=>{let e=t.a.get(t.he);if(!e||512&e.b)u&&f.runNextCmdBy(1,u);else{
let l=r.Tn({esc:true});u&&f.copyCmdOptions(l,r.Tn(u)),f.portSendFgCmd(e.d,16,false,l,-1)}})},17)}});