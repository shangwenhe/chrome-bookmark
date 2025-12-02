"use strict"
;__filename="background/run_commands.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./ports","./i18n","./key_mappings"],(e,l,t,r,n,u,i,s,o)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.initHelpDialog=l.waitAndRunKeyReq=l.runNextOnTabLoaded=l.runNextCmdBy=l.getRunNextCmdBy=l.runNextCmd=l.makeFallbackContext=l.wrapFallbackOptions=l.parseFallbackOptions=l.hasFallbackOptions=l.executeExternalCmd=l.executeShortcut=l.portSendFgCmd=l.sendFgCmd=l.onConfirmResponse=l.onBeforeConfirm=l.T=l.re=l.executeCommand=l.fillOptionWithMask=l.overrideOption=l.overrideCmdOptions=l.concatOptions=l.copyCmdOptions=l.replaceCmdOptions=void 0
;let f,a,m,$=Math.abs,p=0,c=1;l.replaceCmdOptions=e=>{t.x=r.Tn(e)},l.copyCmdOptions=(e,l)=>{
for(let t in l)("$"!==t[0]||"$then=$else=$retry=$f=".includes(t+"=")&&!t.includes("="))&&(void 0!==e[t]||(e[t]=l[t]))
;return e},l.concatOptions=(e,t)=>t&&e?l.copyCmdOptions(l.copyCmdOptions(r.i(),t),e):e||t||null,
l.overrideCmdOptions=(e,l,n)=>{let u=n||t.x;r.Gn(r.Tn(e),u),l?delete e.$o:e.$o=u,n||(t.x=e)},l.overrideOption=(e,r,n)=>{
(n=n||t.x)[e]=r;let u=n.$o;null!=u&&l.overrideOption(e,r,u)},l.fillOptionWithMask=(e,n,i,s,o,f)=>{
let a,m=-1,$=n,p=true===$||""===$;if(p){let l,t=/\$\$|[$%][sS]/g;for(;(l=t.exec(e))&&"$$"===l[0];);$=l&&l[0]||"$s"}
let c,d=null,v=false,_=!!$&&"string"==typeof $&&e.includes($),y=f||t.x,g=()=>{if(null!==d||1!==h)return d||""
;let e=i&&y[i];if(e)a=i;else{let l=Object.keys(y).filter(e=>"$"!==e[0]&&!s.includes(e)&&true===y[e])
;if(1===l.length)e=a=l[0];else{if(""!==n)return h=l.length,"";e=""}}return m=1,d=e+"",d="$s"===$||"%s"===$?r.Cl(d):d,d
},h=1,b=0
;if(p?((e.includes(c="$c")||e.includes(c="%c"))&&(m=1,v=true),e=e.replace(new RegExp("\\$\\{([^}]*)}|\\$\\$"+(v?"|"+r.sl(c):"")+(_?"|"+r.sl($):""),"g"),(e,l)=>{
if(e===$)return g();if(e===c)return o+"";if(!l)return"$";m=1,b++;let n=false,i=u.ni.exec(l);i&&(l=l.slice(0,i.index)),
/^[sS]:/.test(l)&&(n="s"===l[0],l=l.slice(2));let s=u.si.exec(l)||u.ui.exec(l)
;s&&(l="<"===s[0][0]?l.slice(0,s.index):l.slice(s[0].length))
;let f=s?t.kl.get("<"===s[0][0]?s[0].slice(1):s[0].slice(0,-1))||"":"__proto__"===l||"$"===l[0]?"":l?y[l]:g()
;return f="string"==typeof f?f:f&&"object"==typeof f?JSON.stringify(f):f+"",i&&(f=t.S(f,0,r.Ye(i[0].slice(1)))),
n?r.Cl(f):f})):_&&(g(),null!==d&&(e=e.replace($,()=>d))),1!==h)return{ok:0,result:h};if($&&"string"==typeof $){
let e=f||{};f||l.overrideCmdOptions(e),e.$masked=true,a&&delete e[a]}return{ok:m,value:d||"",result:e,useCount:v,
useDict:b}};let d=e=>{let l=f;if(f=null,l)if(a){let{Ee:t,Ge:n}=r.Je();l(e,n),t.then(g)}else l(e,t.o);return t.Rn=null,
e?void 0:n.g()},v=e=>{l.executeCommand(e,1,t.je,t.O,t.$)};l.executeCommand=(e,u,s,m,p,c)=>{if(y(0),f)return f=null,
void(t.Rn=null);let _,h=o._n(e),b=e.fa
;if(h&&(_=h.$count)&&(u=u*_||1),1===(u=p||(u>=1e4?9999:u<=-1e4?-9999:0|u||1)));else if(1===b)u=1;else if(b>1&&(u>b||u<-b)){
if(null!=c)u=u<0?-1:1;else if(!(p||h&&true===h.confirmed))return t.je=s,t.x=null,t.O=m,t.$=u,t.Rn=null,
void l.T(e.ra,$(u)).then(v.bind(null,e))}else u=u||1;if(null!=c){let r=0|c.r
;if(r=Math.max(1,r>=0&&r<100?Math.min(r||6,20):$(r)),c.c&&c.c.i>=r&&(!h||"showTip"!==h.$else))return t.O=m,
i.showHUD(`Has run sequential commands for ${r} times`),void(t.Rn=null);let n=l.makeFallbackContext(c.c,1,c.u)
;if(h&&((38===e.kn||n.t)&&e.Mn||l.hasFallbackOptions(h))){let t={};l.overrideCmdOptions(t,false,h),t.$retry=-r,t.$f=n,
n.t&&e.Mn&&!h.$else&&(t.$else="showTip"),h=t}}if(e.Mn);else{if(null!=m){
let{kn:r}=e,n=4620>>r&1||4===r&&!!h&&false===h.keepHover;return t.O=m,t.Rn=null,void l.portSendFgCmd(m,r,n,h,u)}{
let l=e.kn,t=0;if(18===l?n.Me.goBack&&(t=23):11===l&&(t=14),!t)return;e=o.la(e.ra,h,[t,1,e.fa])}}let{kn:T}=e,j=t.M[T]
;if(a=e.ga,null===a&&(a=e.ga=null!=h&&l.hasFallbackOptions(h)),t.je=s,t.x=h||(e.ba=r.i()),t.O=m,t.$=u,u=t.y[T],
null==m&&T<13&&T>2);else if(u<1){if(a){let{Ee:e,Ge:l}=r.Je();j(l),e.then(g)}else j(t.o);t.Rn=null}else a=e.ga,f=j,
(u<2||2===u&&$(t.$)<2?n.getCurTab:n.le)(d)},l.re=()=>c&&true!==t.x.confirmed,l.T=(e,n)=>{if(!t.O)return f=null,
t.$=t.$>0?1:-1,Promise.resolve(t.$>0);let u="string"==typeof e?e:"string"==typeof e[0]?e[0]:null
;if(!m&&u)return l.initHelpDialog().then(()=>l.T(e,n));let{Ee:o,Ge:a}=r.Je(),$=t.$,d=t.x,v=t.O
;return y(setTimeout(_,2e3,0,void 0)),f=e=>{t.je=0,t.x=d,t.O=v,t.$=e?$>0?1:-1:$,c=0,a(e),setTimeout(()=>{c=1},0)},
Promise.resolve(u?s.K("cmdConfirm",[n,t.oa[1].get(m.ea(u))||`### ${u} ###`]):e[0][0]).then(l=>{var r
;((null===(r=i.R())||void 0===r?void 0:r.C)||t.O).postMessage({N:12,c:"",i:p,m:l,r:"string"!=typeof e})}),o}
;let _=(e,l)=>{let t=f;f=null,(e>1||(null==l?void 0:l.i))&&t&&t(e<3)},y=e=>{p&&clearTimeout(p),p=e}
;l.onBeforeConfirm=e=>{e.i>=-1&&p===e.i&&clearTimeout(e.i)},l.onConfirmResponse=(e,t)=>{
let r="number"!=typeof e.i?e.i.i:0
;0===e.i||r>=-1&&p!==r||(y(0),e.r?_(e.r,e.i):l.executeCommand(o.ma.get(e.i.c),e.n,0,t,0))},l.sendFgCmd=(e,r,n)=>{
l.portSendFgCmd(t.O,e,r,n,1)},l.portSendFgCmd=(e,l,t,r,n)=>{e.postMessage({N:10,H:t?i.ensureInnerCSS(e.s):null,c:l,n,a:r
})},l.executeShortcut=(e,u)=>{let s=o.ma.get(e),f=38===s.kn&&s.Mn;if(f&&t.na(s),y(0),u&&!(512&u.d.s.b)){let t=u.d
;return y(setTimeout(l.executeShortcut,100,e,null)),t.postMessage({N:12,c:e,i:p,m:"",r:false}),512&u.b&&i.eo(u,0),
void i.ensuredExitAllGrab(u)}let a=o._n(s),m=f?"runKey":s.ra,$=s.kn,c=0,d=s
;if(s.Mn||(18===$?n.Me.goBack&&(c=23):11===$&&(c=14)),c)d=o.la(m,a,[c,1,s.fa]);else{if(!s.Mn)return;c=s.kn}
c>12||c<3?l.executeCommand(d,1,0,null,0):a&&a.$noWarn||((a||(s.ba=r.i())).$noWarn=true,
console.log("Error: Command",m,"must run on pages which have run Vimium C"))},l.executeExternalCmd=(e,n,u)=>{
let s=e.command;s=s?s+"":"";let f,a=s?o.ia[s]:null;if(!a)return
;if(!(u=u||(n.tab?i.indexFrame(n.tab.id,n.frameId||0)||(f=t.a.get(n.tab.id),f?f.d:null):null))&&!a[1])return
;let m=e.options||null,$=e.key,p=o.la(s,m),c=e.count;p&&(c="-"!==c?parseInt(c,10)||1:-1,
m&&"object"==typeof m?r.Tn(m):m=null,$|=0,l.executeCommand(p,c,$,u,0))},l.hasFallbackOptions=e=>!!(e.$then||e.$else),
l.parseFallbackOptions=e=>{let l=e.$then,t=e.$else;return l||t?{$then:l,$else:t,$retry:e.$retry,$f:e.$f}:null},
l.wrapFallbackOptions=e=>{let r=l.parseFallbackOptions(t.x);return r&&Object.assign(e,r),e},
l.makeFallbackContext=(e,l,t)=>({i:(e?e.i:0)+l,t:t&&2!==t?t:e?e.t:0}),l.runNextCmd=e=>l.runNextCmdBy(e,t.x),
l.getRunNextCmdBy=e=>l.hasFallbackOptions(t.x)?r=>{let u=2&e?void 0===r:n.g(),i=t.x
;return u?l.runNextCmdBy(0,i):l.runNextOnTabLoaded(i,1&e?r:null),2&e?void 0:u}:2&e?t.o:n.g;let g=e=>{
"object"==typeof e?l.runNextOnTabLoaded(t.x,e):"boolean"==typeof e?l.runNextCmdBy(e?1:0,t.x,null):e<0||l.runNextCmdBy(e?1:0,t.x,e>1?e:null)
};l.runNextCmdBy=(e,l,r)=>{let n=e?l.$then:l.$else,u=!!n&&"string"==typeof n;if(u){let e={c:l.$f,r:l.$retry,u:0,w:0
},u=n&&/\$D/.test(n.split("#",1)[0]);y(setTimeout(async()=>{let l=t.a.get(t.he);await i.Vn(l,true)
;let r=t.O&&t.O.s.m===t.he&&l&&l.J.indexOf(t.O)>0?t.O:l?2===l.d.s.f&&l.J.filter(e=>2!==e.s.f&&!(512&e.s.b)).sort((e,l)=>e.s.Q-l.s.Q)[0]||l.d:null
;l&&i.ensuredExitAllGrab(l),t.I(n,r,e)},u?0:r||50))}return u},l.runNextOnTabLoaded=(e,r,u)=>{let i=e.$then
;if(!(i&&"string"==typeof i||u))return;let s=r=>{let s=Date.now(),c=s<$-500||s-$>=o||a;if(!r||!p)return m=-1,n.g()
;if(c||"complete"===r.status){if(!c&&!t.a.has(r.id)&&(u||r.url.startsWith(location.protocol)))return;y(0),f=null,u&&u(),
i&&l.runNextCmdBy(1,e,u?67:0)}
},o=false!==r?1500:500,a=!!i&&/[$%]l/.test(i.split("#",1)[0]),m=r?r.id:false!==r?-1:t.he,$=Date.now()
;y(setInterval(()=>{n.tabsGet(-1!==m?m:t.he,s)},a?50:100)),i&&/\$D/.test(i.split("#",1)[0])&&n.tabsGet(-1!==m?m:t.he,s)
},l.waitAndRunKeyReq=(e,r)=>{let n=e.f,u={$then:e.k,$else:null,$retry:n&&n.r,$f:n&&l.makeFallbackContext(n.c,0,n.u)}
;t.O=r,n&&false===n.u?l.runNextOnTabLoaded(u,null):l.runNextCmdBy(1,u,n&&n.w)},l.initHelpDialog=()=>{let e=t.oa||[]
;return m?Promise.resolve(m):Promise.all([n.import2(t.We.HelpDialogJS),null!=e[0]?null:r.Jn("help_dialog.html"),null!=e[1]?null:s.getI18nJson("help_dialog")]).then(([e,l,r])=>{
let n=t.oa||(t.oa=[null,null]);return l&&(n[0]=l),r&&(n[1]=r),m=e},null)}});