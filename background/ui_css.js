"use strict"
;__filename="background/ui_css.js",define(["require","exports","./store","./utils","./browser","./settings","./ports"],(n,e,t,l,i,r,u)=>{
let s,f;Object.defineProperty(e,"__esModule",{value:true}),e.Fe=e.mergeCSS=e.ou=void 0,e.ou=(n,i)=>{
if(-1===n)return e.mergeCSS(i,-1);2===n&&(t.oa=null);{let e;if(0===n&&(e=t.du.get("findCSS")))return f=null,t.Sa=o(e),
t.to=i.slice(s.length),void(t.Nr.c=t.du.get("omniCSS")||"")}l.Jn("vimium-c.css").then(l=>{s.slice(s.indexOf(",")+1)
;let i=S(l);{let n=(l=i.ui).indexOf("all:"),e=l.lastIndexOf("{",n),t=l.indexOf(";",n)
;l=l.slice(0,e+1)+l.slice(n,t+1)+l.slice(l.indexOf("\n",t)+1||l.length)}{
let n=l.indexOf("display:"),e=l.lastIndexOf("{",n);l=l.slice(0,e+1)+l.slice(n)}
t.hi<112&&(l=l.replace(/\n\.PO\{[^}]+\}/,"")),l=l.replace(/\n/g,""),r.su("innerCSS",s+l);let u=i.find
;r.su("findCSS",u.length+"\n"+u),e.mergeCSS(t.A.userDefinedCss,n)})};let S=n=>{
let e=n?n.split(/^\/\*\s?#!?([A-Za-z:]+)\s?\*\//m):[""],t={ui:e[0].trim()};for(let n=1;n<e.length;n+=2){
let l=e[n].toLowerCase();t[l]=(t[l]||"")+e[n+1].trim()}return t},o=n=>{
let e=(n=n.slice(n.indexOf("\n")+1)).indexOf("\n")+1,t=n.indexOf("\n",e);return{c:n.slice(0,e-1).replace("  ","\n"),
s:n.slice(e,t).replace("  ","\n"),i:n.slice(t+1)}};e.mergeCSS=(n,l)=>{let f=t.du.get("innerCSS"),d=f.indexOf("\n")
;f=d>0?f.slice(0,d):f
;let a=S(n),C=a.ui?f+"\n"+a.ui:f,c=a["find:host"],m=a["find:selection"],v=a.find,g=a.omni,_="findCSS",b="omniCSS"
;f=t.du.get(_),d=f.indexOf("\n"),f=f.slice(0,d+1+ +f.slice(0,d));let p=f.indexOf("\n",d+1),N=f.slice(0,p).indexOf("  ")
;m=m?"  "+m.replace(/\n/g," "):"",(N>0?f.slice(N,p)!==m:m)&&(N=N>0?N:p,f=f.slice(d+1,N)+m+f.slice(p),p=N-(d+1)+m.length,
d=-1);let $=f.indexOf("\n",p+1),j=f.slice(0,$).indexOf("  ",p);if(c=c?"  "+c.replace(/\n/g," "):"",
(j>0?f.slice(j,$)!==c:c)&&(f=f.slice(d+1,j>0?j:$)+c+f.slice($),d=-1),d<0&&(f=f.length+"\n"+f),v=v?f+"\n"+v:f,
f=(t.du.get(b)||"").split("\n",1)[0],g=g?f+"\n"+g:f,-1===l)return{ui:C.slice(s.length),find:o(v),omni:g}
;r.su("innerCSS",C),r.su(_,v),r.su(b,g||null),e.ou(0,C),0!==l&&1!==l&&(u.c(16384,n=>{for(let e of n.J){let n=e.s.b
;8&e.s.b&&e.postMessage({N:11,H:t.to,f:32&n?i.k(e.s):void 0})}}),r.Ha({N:47,d:{c:t.Nr.c}}))},e.Fe=(n,e)=>{let i,r=t.Nr.t
;if(!n.o&&t.Va)return;{let e=` ${n.t} `,u=r&&` ${r} `,s=u.includes(e),f=null!=n.e?n.e:s;if(i=f?s?r:r+e:u.replace(e," "),
i=i.trim().replace(l.D," "),false===n.b)return void(t.Nr.t=i)
;n.o&&(t.Va=f!==` ${t.A.vomnibarOptions.styles} `.includes(e))}if(i===r)return;t.Nr.t=i;let u={N:47,d:{t:i}}
;l.no(t.Se.slice(0),n=>(n!==e&&t.Se.includes(n)&&n.postMessage(u),1))},i.k=()=>t.Sa,r._l.then(()=>{
s=t.We.Ta+","+t.hi+";",t.to=t.du.get("innerCSS")||"",t.to&&!t.to.startsWith(s)?(t.du.set("vomnibarPage_f",""),
e.ou(1)):(e.ou(0,t.to),t.tl&&t.tl.then(n=>n&&e.ou(1))),t.ul.userDefinedCss=e.mergeCSS})});