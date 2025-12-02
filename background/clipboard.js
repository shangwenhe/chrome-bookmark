"use strict"
;__filename="background/clipboard.js",define(["require","exports","./store","./utils","./exclusions","./normalize_urls"],(e,t,l,r,n,u)=>{
Object.defineProperty(t,"__esModule",{value:true}),t.replaceUsingClipboard=t.doesNeedToSed=t.P=void 0;let f={
__proto__:null,atob:8,base64:9,base64decode:8,btoa:9,base64encode:9,decodeforcopy:1,decode:1,decodeuri:1,decodeurl:1,
decodemaybeescaped:2,decodeall:19,decodecomp:2,encode:10,encodecomp:11,encodeall:12,encodeallcomp:13,unescape:3,upper:4,
lower:5,capitalize:16,capitalizeall:17,camel:14,camelcase:14,dash:15,dashed:15,hyphen:15,normalize:6,reverse:7,
reversetext:7,break:99,stop:99,return:99,latin:18,latinize:18,latinise:18,noaccent:18,nodiacritic:18,json:20,
jsonparse:21,readablejson:25,virtual:22,virtually:22,dryrun:22,inc:23,dec:24,increase:23,decrease:24
},o=/^[<>][\w\x80-\ufffd]{1,8}$|^[\w\x80-\ufffd]{1,8}>$/,a=null,i=0,s=(e,t)=>{let l=[],n=new Map
;for(let u of e.replace(/\\(?:\n|\\\n[^\S\n]*)/g,"").split("\n")){
u=u.trim(),o.test(u)&&(u=`s/^//,${">"===u[0]?"copy":"paste"}=${u.endsWith(">")?u.slice(0,-1):u.slice(1)}`)
;let e=/^([\w\x80-\ufffd]{1,8})([^\x00- \w\\\x7f-\uffff])/.exec(u);if(!e)continue;let a=e[2],i=n.get(a);if(!i){
let e="\\u"+(a.charCodeAt(0)+65536).toString(16).slice(1)
;i=new RegExp(`^((?:\\\\[^]|[^${e}\\\\])+)${e}(.*)${e}([a-z]{0,9})(?:,|$)`),n.set(a,i)}
let s=i.exec(u=u.slice(e[0].length));if(!s)continue;let p=e[1],d=s[3],$=u.slice(s[0].length),g=[],_=null,b=0
;for(let e of $?$.split(","):[]){let t=e.toLowerCase()
;if(t.startsWith("host="))_=e.slice(5);else if(t.startsWith("match"))b=Math.max(t.includes("=")&&parseInt(t.split("=")[1])||1,1);else if(t.includes("="))g.push(t);else{
let e=f[t.replace(/[_-]/g,"")]||0;e&&g.push(e)}}let x=r.$l(s[1],b?d.replace(/g/g,""):d);x&&l.push({gl:t||y(p),yl:_,bl:x,
xl:b,wl:c(s[2],1),hl:g})}return l
},c=(e,t)=>e.replace(/\\(x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[^])|\$[0$]/g,(e,l)=>l?"x"===l[0]||"u"===l[0]?"$"===(l=String.fromCharCode(parseInt(l.slice(1),16)))?l+l:l:"t"===l?"\t":"r"===l?"\r":"n"===l?"\n":t?"0"===l?"$&":l>="1"&&l<="9"?"$"+l:l:l:t&&"$0"===e?"$&":e),p=(e,t)=>{
let l=14===t,r=15===t,n=16===t,u=17===t,f=new RegExp(l||r?"(?:[-_\\t\\r\\n/+\\u2010-\\u2015\\p{Z}]|(\\p{N})|^)(\\p{Ll}|\\p{Lu}+\\p{Ll}?)|[\\t\\r\\n/+]":n||u?"(\\b|_)\\p{Ll}":"",n?"u":"ug"),o=0,a=0,i=(e,t)=>t?e.toLocaleLowerCase():e.toLocaleUpperCase()
;return e=l||r?e.replace(f,(t,l,n,u)=>{
let f="\t\r\n/+".includes(t[0]),s=f||!o++&&e.slice(a,u).toUpperCase()===e.slice(a,u).toLowerCase();return f&&(o=0,
a=u+1),
n=n?n.length>2&&n.slice(-1).toLowerCase()===n.slice(-1)&&!/^e?s\b/.test(e.substr(u+t.length-1,3))?r?i(n.slice(0,-2),true)+"-"+i(n.slice(-2),true):i(n[0],s)+i(n.slice(1,-2),true)+i(n.slice(-2,-1),false)+n.slice(-1):r?i(n,true):i(n[0],s)+i(n.slice(1),true):"",
(f?t[0]:(l||"")+(l||r&&!s?"-":""))+n
}):n||u?e.replace(f,e=>i(e,false)):e,r&&(e=e.replace(/\p{Ll}(\p{Lu}+\p{Ll}?)/u,(t,l,r)=>(l=l.length>2&&l.slice(-1).toLowerCase()===l.slice(-1)&&!/^e?s\b/.test(e.substr(r+t.length-1,3))?i(l.slice(0,-2),true)+"-"+i(l.slice(-2),true):i(l,true),
t[0]+"-"+l))),e
},d=e=>e.replace(/\p{Diacritic}/gu,""),$=e=>(e=JSON.stringify(e).slice(1,-1)).replace(/[<\s"$%&#()?:+,;]/g,e=>"\\u"+(e.charCodeAt(0)+65536).toString(16).slice(1)),g=e=>(e=(e='"'===e[0]?e.slice(1,e.endsWith('"')?-1:void 0):e).replace(/[\r\n\0]/g,e=>e<"\n"?"\\0":e>"\n"?"\\r":"\\n"),
r.tryParse(e=`"${e}"`));t.P=e=>{if(null!=e.$sed)return e.$sed;let t=e.sed,l=e.sedKeys||e.sedKey
;return null!=t||l||0===l?t&&"object"==typeof t?null!=t.r||t.k?t:null:e.$sed={r:"number"==typeof t?t+"":t,
k:"number"==typeof l?l+"":l}:null};let y=(e,t)=>{if("object"==typeof e)return e.jl||e.vl?e:t?t.k=null:null
;let l=null,r=0,n="number"==typeof e?e+"":e;"_"===n[0]&&(l=[n.slice(1)],n="");for(let e=0;e<n.length;e++){
let u=n.charCodeAt(e),f=-33&u;f>64&&f<91?r|=83===f?32772:1<<f-65:(l||(l=[]),!t&&l.includes(u)||l.push(u))}let u=r||l?{
jl:r,vl:l}:null;return t?t.k=u:u},_=(e,t)=>{if(e.jl&t.jl)return true;let l=t.vl;if(!e.vl||!l)return false
;for(let t of e.vl)if(l.includes(t))return true;return false};t.doesNeedToSed=(e,t)=>{
if(t&&(false===t.r||t.r&&true!==t.r))return false!==t.r;let r=t&&t.k&&y(t.k,t)||(e?{jl:e,vl:null}:null)
;a||r&&(a=s(l.A.clipSub,null));for(let e of r?a:[])if(_(e.gl,r))return true;return false}
;let b=e=>(e.startsWith(",")&&(e="s/^//"+e),
e.includes("\n")?e:e.replace(/(?<!\\) ([\w\x80-\ufffd]{1,8})(?![\x00- \w\\\x7f-\uffff])/g,"\n$1"))
;t.replaceUsingClipboard=(e,t,r)=>{let n=t.wl;if(!n.includes("${"))return e.replace(t.bl,n)
;let u=new Map,f=new Map,o=n.replace(/\$(?:\$|\{([^}]*)})/g,(e,t)=>{if(!t)return e
;let r=t.split(/>(?=[\w\x80-\ufffd]{1,8}$)/);if(r.length>1&&r[0]){let e=r[0],t=r[1]
;return e="0"===e||"$0"===e?"&":"$"===e[0]?e.slice(1):1===e.length?e:{input:"_",lastMatch:"&",lastParen:"+",
leftContext:"`",rightContext:"'"}[e]||"1",u.has(t)?u.get(t).push(e):u.set(t,[e]),"$"+e}
return(l.kl.get(t.replace(/^<|>$/,""))||"").replace(/\$/g,"$$$$")});return e=e.replace(t.bl,u.size?function(){
let t=arguments,l=t.length,r=t[l-2];return o.replace(/\$([$1-9_&+`'])/g,(n,u)=>{if("$"===u)return"$"
;let o="_"===u?e:"&"===u?t[0]:"`"===u?e.slice(0,r):"'"===u?e.slice(r+t[0].length):l-3<=0?"":u>="1"&&u<"9"?+u<=l-2?t[+u]:"":"+"===u?t[l-3]:t[1]
;return f.set(u,o),o})}:o),u.forEach((e,t)=>{let n=e.reduce((e,t)=>e||f.get(t)||"","");i!==r?l.kl.set(t,n):x(t,n)}),e},
l.S=(e,u,o,m)=>{let w=o&&"object"==typeof o?o.r:o;if(false===w)return e;let h=a||(a=s(l.A.clipSub,null))
;w&&("number"==typeof w||"string"==typeof w&&w.length<=8&&!/[^\w\x80-\ufffd]/.test(w))&&(o={r:null,k:w},w=null)
;let j=o&&"object"==typeof o&&(o.k||0===o.k)&&y(o.k,o)||(u?{jl:u,vl:null}:null);w&&true!==w&&(j||(h=[]),
h=s(b(w+""),j||(j={jl:1073741824,vl:null})).concat(h));let v=i
;for(let u of j?h:[])if(_(u.gl,j)&&(!u.yl||("string"==typeof u.yl&&(u.yl=n.Ll(u.yl)||-1),-1!==u.yl&&n.Ml(u.yl,e)))){
let n=-1,o=e;if(u.xl){let e,l=0,r=u.xl;if(o.replace(u.bl,function(t){let u=arguments;return l=u[u.length-2],
n=l+t.length,e=u.length>2+r&&u[r]||"",""}),n>=0){let r=t.replaceUsingClipboard(o,u,v)
;o=r.slice(l,r.length-(o.length-n))||e||o.slice(l,n)}}else u.bl.test(o)&&(n=u.bl.lastIndex=0,
o=t.replaceUsingClipboard(o,u,v));if(n<0){let e=(u.hl.find(e=>"string"==typeof e&&e.startsWith("else="))||"").slice(5)
;if(e){if(99===f[e])break;/^[\w\x80-\ufffd]{1,8}$/.test(e)&&(j=y(e))}continue}let a=false
;for(let e of u.hl)if("string"!=typeof e){if(a=99===e)break
;o=o?1===e?r.zl(o):2===e?r.Nl(o):19===e?r.Nl(o,true):3===e?c(o):4===e?o.toLocaleUpperCase():5===e?o.toLocaleLowerCase():10===e?r.Sl(o):11===e?r.Cl(o):12===e?encodeURI(o):13===e?encodeURIComponent(o):8===e?r.Ye(o,"atob"):9===e?btoa(o):20===e?$(o):25===e?JSON.stringify(o).slice(1,-1):21===e?g(o):23===e?+o+1+"":24===e?+o-1+"":(o=6!==e&&7!==e&&18!==e||false?o:o.normalize(18===e?"NFD":"NFC"),
7===e?Array.from(o).reverse().join(""):18===e?d(o):14===e||15===e||16===e||17===e?p(o,e):o):""}else{
let t=e.split("=")[0],r=e.slice(t.length+1)
;"copy"===t?x(r,o):"paste"===t?o=l.kl.get(r)||"":"keyword"===t&&m?m.F=r:"act"===t&&m?m.Fl="false"!==r:"sys-clip"!==t&&"sysclip"!==t||!m||(m.Il=/^-1$|^false$|^non?e?$|null$/i.test(t))
}if(!u.hl.includes(22)&&(e=o,a))break}return r.Ol(),e};let x=(e,t)=>{l.kl.set(e,t),i&&clearTimeout(i),i=setTimeout(()=>{
l.kl.clear(),i=0},1e4)},m=(e,t,n,f,o)=>{var a;let i=f,s=e=>{let t=l.Rl.map.get(f)
;return t?u.Al(e.trim().split(r.D),t.Jl,t.o):e};if("string"!=typeof e)return e=e.map(e=>{var t;let r={},u=l.S(e,4,n,r)
;return(f=null!==(t=r.F)&&void 0!==t?t:i)?s(u):u
}),e="string"==typeof t&&t.startsWith("json")?JSON.stringify(e,null,+t.slice(4)||2):e.join(t!==!!t&&t||"\n")+(e.length>1&&(!t||t===!!t)?"\n":""),
false!==(n&&"object"==typeof n?n.r:n)&&(e=l.S(e,4096,null,o)),e
;let c=(e=e.replace(/\xa0/g," ").replace(/\r\n?/g,"\n")).charCodeAt(e.length-1)
;return 32!==c&&9!==c||((c=e.lastIndexOf("\n")+1)?e=e.slice(0,c)+e.slice(c).trimRight():32!==(c=e.charCodeAt(0))&&9!==c&&(e=e.trimRight())),
e=l.S(e,4,n,o),(f=null!==(a=o.F)&&void 0!==a?a:i)?s(e):e},w=(e,t,r)=>(e&&(e=e.replace(/\xa0/g," "),e=l.S(e,32768,t,r)),
e),h=(e,t)=>{let l=e&&("string"==typeof e?e:"object"==typeof e&&(e.r||e.k))
;return l&&"string"==typeof l&&(l[0]===t||l.endsWith(">"))&&o.test(l)?l[0]===t?l.slice(1):l.slice(0,-1):null}
;l.Dl=(e,t,r,n)=>{let u=h(r,">"),f={};return u&&(r=null),e=m(e,t,r,n,f),u?(x(u,e),
e):!e||f.Il?e:l.Xe(5,e,null).then(()=>e)},l.El=(e,t,r)=>{let n=h(e,"<")
;return n?w(l.kl.get(n)||"",null,r):l.Xe(3,null,null).then(t=>"string"==typeof t?t&&w(t.slice(0,20971520),e,r):null)},
l.ul.clipSub=()=>{a=null}});