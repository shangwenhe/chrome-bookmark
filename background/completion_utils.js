"use strict"
;__filename="background/completion_utils.js",define(["require","exports","./store","./browser","./utils","./settings","./normalize_urls","./tools","./browsing_data_manager"],(e,t,l,r,n,u,o,i,f)=>{
Object.defineProperty(t,"__esModule",{value:true
}),t.Wl=t.Ar=t.sortBy0=t.shortenUrl=t.highlight=t.cutTitle=t.dr=t.get2ndArg=t.ComputeRelevancy=t.ComputeRecency=t.ComputeWordRelevancy=t.ql=t.Zl=t.tr=t.vr=t.vt=t.or=t.Ir=t.kr=t.setupQueryTerms=t.Hr=t.ur=t.tabsInNormal=void 0
;let a=[0,0],s=null;t.tabsInNormal=s;let _,c,h,m,d=null,b=0,p=[],w=0,g=3;t.ur=g,t.Hr=()=>{t.tabsInNormal=s=null},
t.setupQueryTerms=(e,t,l)=>{_=e,c=t,m=false,h=l},t.kr=e=>{_=e},t.Ir=e=>{w=e},t.or=e=>{t.ur=g=e},t.vt={Ql:null,Ul:null,
Xt:0,Kr:0,Pr(e){let r=null,n=0,u=_.join(" ");for(let t=p,l=u?t.length:0;0<=--l;){if(!t[l].Lr&&e)continue
;let n=t[l].Jr,u=0,o=0;for(;u<n.length&&o<_.length;o++)_[o].includes(n[u])&&u++;if(u>=n.length){r=t[l];break}}t.vt.Ql=r,
r&&(l.Nr.i<200||!r.Ct||r.Ct.length>1e3)&&(n=performance.now())-r.qt<Math.max(300,1.3*l.Nr.i)?(t.vt.Ul=r,
r.Jr=_.slice(0)):!u||r&&u===r.Jr.join(" ")||!(u.length>4||/\w\S|[^\x00-\x80]/.test(u))?t.vt.Ul=null:(t.vt.Ul={
Jr:_.slice(0),Lr:e,qt:n||performance.now(),Ct:r&&r.Ct,ne:r&&r.ne},p.push(t.vt.Ul),
t.vt.Xt||(t.vt.Xt=setInterval(t.vt.Vr,6e3)))},Vr(){let e=p,l=-1,r=performance.now()-5983;for(;++l<e.length&&e[l].qt<r;);
l++,l<e.length?e.splice(0,l):(e.length=0,clearInterval(t.vt.Xt),t.vt.Xt=0)},pe(e){
for(let t of p)e<2?t.Ct=null:e<3?t.ne=null:d=null},dl(e){d!==e&&(t.vt.Kr&&(clearTimeout(t.vt.Kr),t.vt.Kr=0),d=e,
e&&(t.vt.Kr=setTimeout(t.vt.dl,3e3,null)))}},t.vr={Xr:0,ct:0,gr(){let e=_[0],r=l.Rl.keywords
;return null===r?(t.vr.ct=t.vr.ct||setTimeout(t.vr.Yr,67),true):!(e.length>=t.vr.Xr)&&r.includes("\n"+e)},Yr(){
let e=n.en(l.Rl.map).sort(),r=0,u="",o=[];for(let t=e.length;0<=--t;){let l=e[t];if(!u.startsWith(l)){let e=l.length
;r=e>r?e:r,u=l,o.push(l)}}l.Rl.keywords="\n"+o.join("\n"),t.vr.Xr=r,t.vr.ct=0}},t.tr={er:null,lr:null,qr:null,Ur(){
let e=t.tr.er=[];t.tr.lr=t.tr.qr=null
;for(let t of _)e.push(new RegExp(n.sl(t),t!==t.toUpperCase()&&t.toLowerCase()===t?"i":""))},rr(){
let e=t.tr.lr=[],l=t.tr.qr=[];for(let r of t.tr.er){let t="\\b"+r.source,n=r.flags;e.push(new RegExp(t,n)),
l.push(new RegExp(t+"\\b",n))}},Cr(e,l){
t.tr.er&&(e=n.sl(l?e:e.slice(0,-1)),t.tr.er[0]=new RegExp(l?e:e+"(?:/|$)",t.tr.er[0].flags))}},t.Zl=(e,l)=>{
for(let r of t.tr.er)if(!(r.test(e)||r.test(l)))return false;return true},t.ql=(e,l)=>{let r=0,n=0,u=0,o=0,i=!!l
;t.tr.lr||t.tr.rr();for(let t=0,f=_.length;t<f;t++){let f=M(t,e);o+=f[0],u+=f[1],i&&(f=M(t,l),n+=f[0],r+=f[1])}
return o=o/g*x(u,e.length),0===r?l?o/2:o:(n=n/g*x(r,l.length),o<n?n:(o+n)/2)};let x=(e,t)=>e<t?e/t:t/e,M=(e,l)=>{
let r=0,n=0;return r=l.split(t.tr.er[e]).length,r<1?a:(n=1,t.tr.lr[e].test(l)&&(n+=1,t.tr.qr[e].test(l)&&(n+=1)),
[n,(r-1)*_[e].length])};t.ComputeWordRelevancy=e=>t.ql(e.t,e.title),t.ComputeRecency=e=>{let t=(e-w)/18144e5
;return t<0?0:t<1?t*t*.666667:t<1.000165?.666446:0},t.ComputeRelevancy=(e,l,r)=>{let n=t.ComputeRecency(r),u=t.ql(e,l)
;return n<=u?u:(u+n)/2},t.get2ndArg=(e,t)=>t,t.dr=e=>{if(c||void 0!==e.v||(e.v=t.Ar(e.u)),
null!=e.textSplit)return void(e.t===e.u&&(e.t=""));e.title=t.cutTitle(e.title);let l,r=e.t,n=o.tn(r,e.u)
;n.length!==r.length?l=T(r,"\\"===n[0]?5:"/"===r.charAt(7)&&"%3a"===r.substr(9,3).toLowerCase()?10:8):(n=t.shortenUrl(r),
l=k(n)),e.t=r.length!==e.u.length?n:"",e.textSplit=v(n,l,r.length-n.length,c?h-13-Math.min(e.title.length,40):h)},
t.cutTitle=(e,l)=>{let r=e.length>h+40;return r&&(e=n.Yt(e,0,h+39)),t.highlight(r?e+"\u2026":e,l||k(e))},
t.highlight=(e,t)=>{if(m)return e;if(0===t.length)return n.zr(e);let l="",r=0;for(let u=0;u<t.length;u+=2){
let o=t[u],i=t[u+1];o>=e.length||(l+=n.zr(e.slice(r,o)),l+="<match>",l+=n.zr(e.slice(o,i)),l+="</match>",r=i)}
return l+n.zr(e.slice(r))},t.shortenUrl=e=>{let t=n.jr(e)
;return!t||t>=e.length?e:e.slice(t,e.length-+(e.endsWith("/")&&!e.endsWith("://")))};let T=(e,t)=>{let l=k(e)
;for(let e=0;e<l.length;)l[e+1]<=t?l.splice(e,2):(l[e]=Math.max(l[e]-t,0),l[e+1]-=t,e+=2);return l},k=e=>{let l=[]
;for(let r=0,n=_.length;r<n;r++){let n,u=0,o=0,i=e.split(t.tr.er[r]),f=i.length-1,a=_[r].length;for(;u<f;u++,
o=n)n=(o+=i[u].length)+a,l.push([o,n])}if(0===l.length)return l;if(1===l.length)return l[0];l.sort(t.sortBy0);let r=l[0]
;for(let e=1,t=1,n=l.length;t<n;t++){let n=l[t];r[e]>=n[0]?r[e]<n[1]&&(r[e]=n[1]):(r.push(n[0],n[1]),e+=2)}return r}
;t.sortBy0=(e,t)=>e[0]-t[0];let v=(e,t,l,r)=>{let u="",o=e.length,i=o,f=""
;if(o<=r||(l>1?i=e.indexOf("/")+1||o:(i=e.indexOf(":"))<0?i=o:n.ln.test(e.slice(0,i+3).toLowerCase())?i=e.indexOf("/",i+4)+1||o:i+=22),
i<o&&t.length)for(let e=t.length,l=o+8;(e-=2)>-4&&l>=i;l=e<0?0:t[e]){let n=e<0?i:t[e+1],u=l-20-Math.max(n,i)
;if(u>0&&(o-=u,o<=r)){i=n+(r-o);break}}o=0;for(let l=0;o<r&&l<t.length;l+=2){let a=t[l],s=Math.max(o,i),_=a-20-s
;_>0?(r+=_,f=n.Yt(e,o,s+11),u+=m?f:n.zr(f),u+="\u2026",f=n.rn(e,a-8,a),u+=m?f:n.zr(f)):o<a&&(f=e.slice(o,a),
u+=m?f:n.zr(f)),o=t[l+1],f=e.slice(a,o),m?u+=f:(u+="<match>",u+=n.zr(f),u+="</match>")}
return f=e.length<=r?e.slice(o):n.Yt(e,o,r-1>o?r-1:o+10),u+(m?f:n.zr(f))+(e.length<=r?"":"\u2026")};t.Ar=e=>{
let t=f.it.Lt&&e.startsWith("http")?f.it.Ut(e):-1,r=t<0?~t-1:t,n=r<0?[]:l.St.Ct,u=e.indexOf(":")+3,o=0,i=0,a="",s="",_=0,c=0
;for(;o<=r&&(u="/"===e[u]?u+1:e.indexOf("/",u+1)+(i?0:1))>0;i=u){for(a=e.slice(i,u),c=r;o<=c;)if(_=o+c>>>1,
s=n[_].u.slice(i),s>a)c=_-1;else{if(s===a)return i?n[_].u:"";o=_+1}if(o<=r&&i&&(a=n[o].u,
"/"===a[u]&&a.length<=++u))return a}return""},t.Wl=(e,n,u,o,i)=>{{t.tabsInNormal=s=2!==l.fe&&!(2048&n)
;let f=(s?2:0)|(e?1:0);if(b!==f&&(d=null,b=f),i=i||d)u(o,i);else{let t=u.bind(null,o)
;e?(512&n?r.getCurTabs:r.le)(t):r.Me.query({},t)}}},i.ze.nn=()=>{d&&(1&b||!(2&b)!=(2===l.fe))&&t.vt.dl(null)},
u._l.then(()=>{u.al("searchEngines",null)})});