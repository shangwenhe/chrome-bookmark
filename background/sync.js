"use strict"
;__filename="background/sync.js",define(["require","exports","./store","./utils","./browser","./settings"],(e,t,l,n,r,i)=>{
Object.defineProperty(t,"__esModule",{value:true});let u,o=n.Tn({findModeRawQueryList:1,innerCSS:1,keyboard:1,
newTabUrl_f:1,vomnibarPage_f:1
}),s=r.t.storage,f="sync.cloud:",a=null,d=null,c="",y=null,S=null,p=null,b=()=>u||(u=s&&s.sync),g=(e,t)=>{let l=e=>{
if(y){n.Tn(e);for(let t in y){let l=t.split(":")[0],n=l===t;if(n||!(l in y)){let r=n?y[t]:null
;v(l,null!=r?r.newValue:e[l],e)}}y=null}};if(n.Tn(e),y?Object.assign(y,e):y=e,p)p.then(()=>g({},t));else{e=y,y=null
;for(let t in e){let n=e[t];if(8===(t.includes(":")?8:v(t,null!=n?n.newValue:null)))return y=e,void b().get(l)
;delete e[t]}}},m=console.log.bind(console,"[%s]",{toString(){
return new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toJSON().slice(0,-5).replace("T"," ")}}),v=(e,t,n)=>{
let r,u=t&&"object"==typeof t&&t.$_serialize||"";if(!(e in i.E)||!_(e)){let n=u||!i.mo?-1:i.ao.indexOf(e)
;return void(n>=0&&(r=l.du.get(e),(null!=r?r+"":null)!==(null!=t?t+"":null))&&(i.su(e,null!=t?t:null),i.so(n)))}
let o=i.E[e];if(u){if("split"===u&&!n)return 8;if(8===(t=N(e,t,n)))return}
if(null==t)return void(l.A[e]!=o&&(p||m("sync.this:","reset",e),O(e,o)));let s,f,a,d=l.A[e]
;(a="object"!=typeof o||!t||"object"!=typeof t)?(f=t,s=d):(f=JSON.stringify(t),s=JSON.stringify(d)),
f!==s&&(f===(a?o:JSON.stringify(o))&&(t=o),
p||m("sync.this:","update",e,"string"==typeof t?(t.length>32?t.slice(0,30)+"...":t).replace(/\n/g,"\\n"):t),O(e,t))
},O=(e,t)=>{c=e,i.La(e,t),c="",e in i.B&&i.mn({N:6,d:[i.B[e]]})},j=(e,t)=>{let l=_(e)?1:i.ao.includes(e)?2:0
;l&&e!==c&&(a||(setTimeout(k,800),a=n.i()),1===l?a[e]=t:(d||(d=[])).push(e))},w=e=>{let t={Q:'\\"',S:"\\\\",d:"`",l:"<",
n:"\u2029",q:'"',r:"\u2028"};return e.replace(/`[QSdlnqr]/g,e=>t[e[1]])},N=(e,t,l)=>{let n="";switch(t.$_serialize){
case"split":for(let{k:r,s:i}=t,u=0;u<i;u++){let t=l[e+":"+u];if(!t||"string"!=typeof t||!t.startsWith(r))return 8
;n+=t.slice(r.length)}break;case"single":return JSON.parse(w(JSON.stringify(t.d)));default:
return m("Error: can not support the data format in synced settings data:",e,":",t.$_serialize),null}
return"string"==typeof i.E[e]?(n=w(n),n):(n=w(JSON.stringify(n)),JSON.parse(n.slice(1,-1)))},J=(e,t,l)=>{
if(!t||("string"!=typeof t?"object"!=typeof t:t.length<8192/6-40))return;let n=JSON.stringify(t),r=""
;if(n.length<8192/6-40)return;let u=n.length
;n=n.replace(/[<`\u2028\u2029]/g,e=>"<"===e?"`l":"`"===e?"`d":"\u2028"===e?"`r":"`n");let o=n.length
;if(3*(o-u)+3*u<8093)return;if(r=l.encode(n),r.length<8093)return r.length+4*(o-u)<8093?void 0:n
;let s=0,f=Date.now().toString(36)+":",a={}
;n="string"==typeof i.E[e]?n.slice(1,-1):n.replace(/"|\\[\\"]/g,e=>'"'===e?"`q":'\\"'===e?"`Q":"`S"),
S||(S=new TextDecoder),r=l.encode(n);for(let t=0,l=r.length;t<l;){let i,u=Math.min(t+8134,l),o=0
;for(;u<l&&128==(192&r[u]);u--);if(i=S.decode(r.subarray(t,u)),n=i.slice(-6),o=u<l?n.lastIndexOf("\\"):-1,
o>0&&o>n.length-2)i+="b",o=1;else if(o>0&&"u"===n[o+1]){o=n.length-o;for(let e=o;e++<6;i+="b");}else o=0
;if(i=JSON.parse(`"${i}"`),o){let e=i.endsWith("b");e||(u-=o),i=i.slice(0,o>1&&e?o-6:-1)}if(a[e+":"+s++]=f+i,t=u,
s>=13)break}return a[e]={$_serialize:"split",k:f,s},a},k=()=>{let e=a,t=d,u=[],o=[],s=[],c=n.i(),y={};if(a=d=null,
!e||l.po!==j)return;let p=Object.keys(e).length>0?new TextEncoder:null;for(let t in e){
let l=t,n=e[l],r=i.E[l],f="string"==typeof r||"object"==typeof r&&"vimSync"!==l?0:13;if(null!=n){let e=J(l,n,p)
;e&&"object"==typeof e?(c[l]=e,f=e[l].s):(y[l]=e?{$_serialize:"single",d:JSON.parse(e)}:n,o.push(l))}else u.push(l)
;for(;f<13;f++)s.push(l+":"+f)}S=p=null,t&&u.push(...t),s.push(...u),u.length>0&&m(f,"reset",u.join(", ")),
s.length>0&&b().remove(s),o.length>0&&(m(f,"update",o.join(", ")),b().set(y));for(let e in c)b().set(c[e],()=>{
let t=r.g();return t?m("Failed to update",e,":",t.message||t):m(f,"update (serialized) "+e),t})
},_=e=>!(e in o),T=(e,t)=>{n.Tn(e);let r=e.vimSync||null==l.A.vimSync&&l.wo;if(l.ul.vimSync(false,"vimSync"),
!r)return void t();e.vimSync||(m(f,"enable vimSync"),e.vimSync=true,b().set({vimSync:true}));let u=[]
;for(let t in l.A)l.A[t]!==i.E[t]&&!(t in e)&&_(t)&&("keyLayout"===t&&2&i.mo||u.push(t));for(let e of u)v(e,null)
;for(let t in e)t.includes(":")||v(t,e[t],e);i.al("vimSync"),setTimeout(()=>{t()},4),m(f,"download settings")}
;l.ul.vimSync=e=>{if(!b())return;let t=b().onChanged,n=g;if(!e)return t.removeListener(n),void(l.po=l.o)
;l.po!==j?(t.addListener(n),l.po=j):a&&(m(f,"save immediately"),k())},i._l.then(()=>{let e=l.A.vimSync
;false===e||!e&&!l.wo?l.tl=null:l.tl?(p=l.tl.then(e=>(l.tl=null,!!e&&"install"===e.reason)).then(e=>new Promise(t=>{
b()?b().get(n=>{let u=r.g(),o=e&&l.wo&&(u||0===Object.keys(n).length)?()=>{i.La("keyLayout",2),t()}:t
;return u?(l.ul.vimSync=l.o,o(),m("Error: failed to get storage:",u,"\n\tSo disable syncing temporarily.")):T(n,o),u
}):t()})).then(()=>{l.bi=null,p=null}),l.bi=Promise.race([p,new Promise(e=>{setTimeout(e,800)})]).then(()=>{l.bi=null,
l.A.vimSync&&l.po!==j&&i.al("vimSync")})):i.al("vimSync")})});