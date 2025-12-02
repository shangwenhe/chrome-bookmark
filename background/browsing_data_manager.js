"use strict"
;__filename="background/browsing_data_manager.js",define(["require","exports","./store","./browser","./utils","./settings","./completion_utils"],(e,t,l,r,i,o,n)=>{
Object.defineProperty(t,"__esModule",{value:true}),t.et=t.tt=t.lt=t.rt=t.it=t.ot=t.nt=t.omniBlockList=void 0
;let f,u,s=decodeURIComponent,_=-1,a="1",m=null,c=null,d=null,p=false;t.omniBlockList=c,t.nt=e=>{let t,l,r=e.slice(0,5)
;if("https"===r)t=8;else if("http:"===r)t=7;else{if(!r.startsWith("ftp"))return null;t=6}return l=e.indexOf("/",t),{
ft:e=e.slice(t,l<0?e.length:l),ut:t}},t.ot={st:null,_t:"",at:"",mt:0,ct:0,dt:0,pt:null,ht(){let e=r.t.bookmarks
;e.onCreated.addListener(t.ot.Tt),e.onRemoved.addListener(t.ot.bt),e.onChanged.addListener(t.ot.bt),
e.onMoved.addListener(t.ot.Tt),e.onImportBegan.addListener(()=>{r.t.bookmarks.onCreated.removeListener(t.ot.Tt)}),
e.onImportEnded.addListener(()=>{r.t.bookmarks.onCreated.addListener(t.ot.Tt),t.ot.Tt()})},gt(){l.ie.f=1,
t.ot.ct&&(clearTimeout(t.ot.ct),t.ot.ct=0),r.t.bookmarks.getTree(t.ot.xt)},xt(e){l.ie.ne=[],l.ie.Be=[],l.ie.f=2,
n.vt.pe(2),e.forEach(t.ot.kt),setTimeout(()=>t.et.yt(l.ie.ne),50),t.ot.ht&&(setTimeout(t.ot.ht,0),t.ot.ht=null)
;let r=t.ot.pt;t.ot.pt=null,r&&r()},kt(e,r){let o=e.title,n=e.id,f=o||n,u=t.ot._t+"/"+f;if(e.children){l.ie.Be.push({
ee:n,Dt:u,wt:f});let r=t.ot._t,i=t.ot.at;2<++t.ot.mt&&(t.ot._t=u),t.ot.at=n,e.children.forEach(t.ot.kt),--t.ot.mt,
t.ot._t=r,t.ot.at=i}else{let s=e.url,_="javascript:",a=s.startsWith(_);l.ie.ne.push({ee:n,Dt:u,wt:f,t:a?_:s,
Pt:c?t.lt(s,p?u:o):1,u:a?_:s,Y:t.ot.at,te:r,Ve:a?s:null,Rt:a?i.Ye(s):null})}},Tt(){let e=()=>{
let r=performance.now()-l.ie.Ke;0===l.ie.f&&(r>=59900||r<-5e3?(t.ot.ct=t.ot.dt=0,t.ot.gt()):t.ot.ct=setTimeout(e,3e4))}
;l.ie.Ke=performance.now(),l.ie.f<2||(t.ot.ct=setTimeout(e,6e4),l.ie.f=0)},bt(e,r){
let i=l.ie.ne,o=r&&r.title,n=i.findIndex(t=>t.ee===e);if(n>=0){let e=i[n],u=e.u,s=r&&r.url
;if(f&&(null==o?u!==e.t||!r:null!=s&&u!==s)&&l.It.has(u)&&t.it.Lt&&t.it.Ut(u)<0&&l.It.delete(u),
null!=o)e.Dt=e.Dt.slice(0,-e.wt.length)+(o||e.ee),e.wt=o||e.ee,s&&(e.u=s,e.t=t.et.Mt(s,e),t.et.jt()),
c&&(e.Pt=t.lt(e.Ve||e.u,p?e.Dt:e.wt)),l.ie.Ke=performance.now();else{i.splice(n,1)
;for(let t=r?n:i.length;t<i.length;t++)i[t].Y===e.Y&&i[t].te--;r||t.ot.Tt()}}else if(l.ie.Be.find(t=>t.ee===e)){
if(null==o&&!t.ot.dt&&f){let e=l.It,r=t.it.Ut;for(let{u:l}of t.it.Lt?i:[])e.has(l)&&r(l)<0&&e.delete(l);t.ot.dt=1}
t.ot.Tt()}}},l.X=(e,r)=>{if(2!==l.ie.f){let o=i.Je();return t.ot.pt=o.Ge,t.ot.gt(),o.Ee.then(l.X.bind(0,e,r))}
let o=!r&&e.includes("/"),n=o?(e+"").replace(/\\\/?|\//g,e=>e.length>1?"/":"\n").split("\n").filter(e=>e):[]
;if(!e||o&&!n.length)return Promise.resolve(false)
;if(r)return Promise.resolve(l.ie.ne.find(t=>t.ee===e)||l.ie.Be.find(t=>t.ee===e)||null)
;let f=o?"/"+n.slice(1).join("/"):"",u=o?"/"+n[0]+f:""
;for(let t of l.ie.ne)if(o&&(t.Dt===u||t.Dt===f)||t.wt===e)return Promise.resolve(t)
;for(let t of l.ie.Be)if(o&&(t.Dt===u||t.Dt===f)||t.wt===e)return Promise.resolve(t);let s=null
;for(let t of l.ie.ne)if(t.wt.includes(e)){if(s){s=null;break}s=t}return Promise.resolve(s)};let h=e=>{e&&e()};t.it={
Lt:false,Et:0,Ot:null,At(e){t.it.Ot?e&&t.it.Ot.push(e):(l.St.Bt=Date.now(),t.it.Ot=e?[e]:[],
t.it.Et||r.t.history.search({text:"",maxResults:2e4,startTime:0},e=>{setTimeout(t.it.Vt,0,e)}))},Vt(e){t.it.Vt=null
;for(let l=0,r=e.length;l<r;l++){let r=e[l],i=r.url;i.length>2e3&&(i=t.it.Wt(i,r)),e[l]={t:i,wt:r.title,
qt:r.lastVisitTime,Pt:1,u:i}}if(c)for(let l of e)0===t.lt(l.t,l.wt)&&(l.Pt=0);setTimeout(()=>{setTimeout(()=>{
let e=l.St.Ct;for(let l=e.length-1;0<l;){let r=e[l],i=r.u,o=r.t=t.et.Mt(i,r),n=o.length>=i.length;for(;0<=--l;){
let r=e[l],f=r.u;if(f.length>=i.length||!i.startsWith(f))break;r.u=i.slice(0,f.length);let u=n?f:t.et.Mt(f,r)
;r.t=n||u.length<f.length?o.slice(0,u.length):u}}t.it.Ht&&setTimeout(()=>{t.it.Ht&&t.it.Ht(l.St.Ct)},200)},100),
l.St.Ct.sort((e,t)=>e.u>t.u?1:-1),t.it.Lt=true,r.t.history.onVisitRemoved.addListener(t.it.$t),
r.t.history.onVisited.addListener(t.it.zt)},100),l.St.Ct=e,t.it.At=h,t.it.Ot&&t.it.Ot.length>0&&setTimeout(e=>{
for(let t of e)t()},1,t.it.Ot),t.it.Ot=null},zt(e){let r=e.url;r.length>2e3&&(r=t.it.Wt(r,e))
;let i=e.lastVisitTime,o=e.title,f=++l.St.Ft,u=l.St.Gt,s=t.it.Ut(r);s<0&&l.St.Jt++,
(f>59||f>10&&Date.now()-l.St.Bt>3e5)&&t.it.Kt();let _,a=s>=0?l.St.Ct[s]:{t:"",wt:o,qt:i,Pt:c?t.lt(r,o):1,u:r};if(u){
let e=t.nt(r);e&&((_=u.get(e.ft))?(_.qt=i,s<0&&(_.Nt+=a.Pt),e.ut>6&&(_.Qt=8===e.ut?1:0)):u.set(e.ft,{qt:i,Nt:a.Pt,
Qt:8===e.ut?1:0}))}if(s>=0){if(a.qt=i,o&&o!==a.wt&&(a.wt=o,n.vt.Xt&&n.vt.pe(1),c)){let e=t.lt(r,o);a.Pt!==e&&(a.Pt=e,
_&&(_.Nt+=e||-1))}}else a.t=t.et.Mt(r,a),l.St.Ct.splice(~s,0,a),n.vt.Xt&&n.vt.pe(1)},$t(e){u.length=0;let r=l.It
;if(n.vt.pe(1),e.allHistory){l.St.Ct=[],l.St.Gt=new Map;let e=[];for(let t of l.ie.ne){let l=r.get(t.u)
;l&&e.push([t.u,l])}r.clear();for(let[t,l]of e)r.set(t,l);return}let i,o=t.it.Ut,{Ct:f,Gt:s}=l.St;for(let l of e.urls){
let e=o(l);if(e>=0){if(s&&f[e].Pt){let e=t.nt(l);e&&(i=s.get(e.ft))&&--i.Nt<=0&&s.delete(e.ft)}f.splice(e,1),r.delete(l)
}}},Wt(e,t){let l=e.lastIndexOf(":",9),r=l>0&&"://"===e.substr(l,3),o=t.title
;return e=e.slice(0,(r?e.indexOf("/",l+4):l)+320)+"\u2026",o&&o.length>160&&(t.title=i.Yt(o,0,160)),e},Kt(){
let e=Date.now();if(l.St.Jt<=0);else{if(e<l.St.Bt+1e3&&e>=l.St.Bt)return;setTimeout(r.t.history.search,50,{text:"",
maxResults:Math.min(999,l.St.Ft+10),startTime:e<l.St.Bt?e-3e5:l.St.Bt},t.it.Zt)}return l.St.Bt=e,l.St.Jt=l.St.Ft=0,
t.et.jt()},Ht(e){t.it.Ht=null;let r=l.St.Gt;for(let{u:l,qt:i,Pt:o}of e){let e=t.nt(l);if(!e)continue
;let{ft:n,ut:f}=e,u=r.get(n);u?(u.qt<i&&(u.qt=i),u.Nt+=o,f>6&&(u.Qt=8===f?1:0)):r.set(n,{qt:i,Nt:o,Qt:8===f?1:0})}},
Zt(e){let r=l.St.Ct,i=t.it.Ut;if(!(r.length<=0))for(let o of e){let e=o.url;e.length>2e3&&(o.url=e=t.it.Wt(e,o))
;let n=i(e);if(n<0)l.St.Jt--;else{let e=r[n],t=o.title;if(!t||t===e.wt)continue}l.St.Ft--,t.it.zt(o)}},Ut(e){
let t="",r=l.St.Ct,i=r.length-1,o=0,n=0;for(;o<=i;)if(n=o+i>>>1,t=r[n].u,t>e)i=n-1;else{if(t===e)return n;o=n+1}return~o
}},t.rt=(e,i,o)=>{let n=r.Te();n?n.getRecentlyClosed({
maxResults:Math.min(Math.round(1.2*e),+n.MAX_SESSION_RESULTS||25,25)},e=>{let n,f=[],u=0,s=Date.now()-performance.now()
;for(let r of e||[]){let e=r.tab,o=null;if(!e){if(!(o=r.window)||!o.tabs||!o.tabs.length)continue;u=1,
e=o.tabs.find(e=>e.active)||o.tabs[0],o.sessionId||(o=null)}let _=e.url;_.length>2e3&&(_=t.it.Wt(_,e));let a=e.title
;if(!i&&!t.lt(_,a))continue;n=r.lastModified,n=n<3e11&&n>-4e10?1e3*n:n;let m=e.windowId;f.push({u:_,wt:a,rl:n,
il:[m,(o||e).sessionId,o?o.tabs.length:0],ol:o?` +${o.tabs.length>1?o.tabs.length-1:""}`:m&&m!==l.we&&n>s?" +":""})}
return u?setTimeout(o,0,f):o(f),r.g()}):o([])},t.lt=(e,t)=>d.test(t)||d.test(e)?0:1,t.tt={nl(e){
if(c)for(let t of e)for(let e of c)if(e=e.trim(),
t.includes(e)||e.length>9&&t.length+2>=e.length&&e.includes(t))return true;return false},fl(){
if(l.ie.ne)for(let e of l.ie.ne)e.Pt=c?t.lt(e.Ve||e.u,p?e.Dt:e.wt):1;if(!l.St.Ct)return;let e=l.St.Gt
;for(let r of l.St.Ct){let l=c?t.lt(r.u,r.wt):1;if(r.Pt!==l){r.Pt=l;let i=e&&t.nt(r.u),o=i&&e.get(i.ft);o&&(o.Nt+=l||-1)
}}}},t.et={Mt(e,t){if(e.length>=400||e.lastIndexOf("%")<0)return e;try{return s(e)}catch(e){}
return l.It.get(e)||(t&&u.push(t),e)},yt(e){let r,i,o=l.It,n=u,f=-1,_=e.length;for(;;)try{for(;++f<_;)r=e[f],i=r.u,
r.t=i.length>=400||i.lastIndexOf("%")<0?i:s(i);break}catch(e){r.t=o.get(i)||(n.push(r),i)}t.et.jt()},jt(){
0!==u.length&&-1===_&&(_=0,setTimeout(T,17))}};let T=()=>{let e,t=u.length;if(!a||_>=t)return u.length=0,_=-1,
void(m=null);for(t=Math.min(_+32,t),m=m||new TextDecoder(a);_<t;_++){let t=u[_],r="string"==typeof t,i=r?t:t.u
;(e=l.It.get(i))?r||(t.t=e):(e=i.replace(/%[a-f\d]{2}(?:%[a-f\d]{2})+/gi,b),e=e.length!==i.length?e:i,
"string"!=typeof t?l.It.set(t.u,t.t=e):l.It.set(t,e))}_<u.length?setTimeout(T,4):(u.length=0,_=-1,m=null)},b=e=>{
let t=new Uint8Array(e.length/3);for(let l=1,r=0;l<e.length;l+=3)t[r++]=parseInt(e.substr(l,2),16);return m.decode(t)}
;l.ul.omniBlockList=e=>{let r=[];for(let t of e.split("\n"))t.trim()&&"#"!==t[0]&&r.push(t)
;d=r.length>0?new RegExp(r.map(i.sl).join("|"),""):null,p=r.join("").includes("/"),t.omniBlockList=c=r.length>0?r:null,
(l.St.Ct||l.ie.ne.length)&&setTimeout(t.tt.fl,100)},o._l.then(()=>{o.al("omniBlockList")}),l.ul.localeEncoding=e=>{
let r=!!e&&!(e=e.toLowerCase()).startsWith("utf"),i=a;if(a=r?e:"",a!==i){try{new TextDecoder(a)}catch(e){r=false}
r?"1"!==i&&setTimeout(()=>(l.St.Ct&&t.et.yt(l.St.Ct),t.et.yt(l.ie.ne)),100):(l.It.clear(),u&&(u.length=0)),
f!==r&&(u=r?[]:{length:0,push:l.o},f=r,_=-1)}},o.al("localeEncoding"),l.cl.ml=(e,l,i)=>{switch(l){case"tab":
n.vt.dl(null),r.Me.remove(+e,()=>{let e=r.g();return e||n.vt.dl(null),i(!e),e});break;case"history":
let l=!t.it.Lt||t.it.Ut(e)>=0;r.t.history.deleteUrl({url:e}),l&&n.vt.pe(1),i(l)}},l.cl.pl=t.tt.nl});