"use strict";__filename="background/i18n.js",define(["require","exports","./store","./utils","./browser"],(e,r,n,l,o)=>{
let t,s;Object.defineProperty(r,"__esModule",{value:true}),r.$n=r.getI18nJson=r.An=r.Sn=r.zn=r.K=r.Ce=r.Dn=r.Fn=void 0,
r.Fn=1;let i=0;r.Dn=[],r.Ce=e=>o.t.i18n.getMessage(e),r.K=(e,n)=>{if(1===i){let r=s.get(e)
;return null!=n&&r?r.replace(/\$\d/g,e=>n[+e[1]-1]):r||""}return i||(i=r.getI18nJson("background").then(e=>{s=e,i=1})),
i.then(r.K.bind(null,e,n))},r.zn=(e,n)=>{if(n.forEach((e,n,l)=>{if(e instanceof Array){let o=e[0]
;l[n]=1===i?s.get(o)||o:r.K(o).then(e=>e||o)}}),n.some(e=>e instanceof Promise)){let l=Promise.all(n)
;return(1===i?l:(i||r.K("NS")).then(()=>l)).then(n=>r.K(e,n))}return r.K(e,n)
},r.Sn=(e,r)=>e&&e.split(" ").reduce((e,n)=>e||(n.includes("=")?r&&n.startsWith(r)?n.slice(r.length+1):e:n),""),
r.An=e=>{let n=r.Ce("i18n");return r.Sn(n,e||"background")||r.Ce("lang1")||"en"},
r.getI18nJson=e=>0===r.Fn?(r.Fn=Promise.all([l.Jn("/_locales/en/messages.json"),o.ye(o.t.i18n.getAcceptLanguages)]).then(([e,r])=>{
let n=((e.get("i18nAll")||{}).message||"").split(" "),o=""
;for(o of r||[])o=n.includes(o)||n.includes(o=o.split("-")[0])?o:""
;return o?Promise.all([e,l.Jn(`/_locales/${o}/messages.json`)]):[e]}).then(e=>{t=new Map,r.Fn=1
;for(let r of e)for(let[e,n]of r.entries())t.set(e,n.message)
})).then(r.getI18nJson.bind(0,e)):l.Jn(`/i18n/${r.An(e)}/${e}.json`),r.$n=()=>{let e=r.Dn,n=["$1","$2","$3","$4"]
;for(let r=0;r<116;r++)e.push(o.t.i18n.getMessage(""+r,n));r.$n=null}});