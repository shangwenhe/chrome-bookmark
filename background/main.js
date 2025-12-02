"use strict"
;__filename="background/main.js",define(["require","exports","./store","./utils","./browser","./settings","./ports","./key_mappings","./run_commands","./normalize_urls","./parse_urls","./exclusions","./ui_css","./eval_urls","./open_urls","./all_commands","./request_handlers","./tools"],(e,t,s,l,n,o,r,i,u)=>{
Object.defineProperty(t,"__esModule",{value:true});let c=e=>{let t=s.a.get(s.he);"quickNext"===e&&(e="nextTab")
;let l=i.ma
;6!==s.ll||(l&&l.get(e)?null==t||4&t.b||s.he<0?u.executeShortcut(e,t):n.tabsGet(s.he,t=>(u.executeShortcut(e,t&&"complete"===t.status?s.a.get(t.id):null),
n.g())):(l&&null!==l.get(e)&&(l.set(e,null),console.log("Shortcut %o has not been configured.",e)),t&&(s.O=t.d),
r.showHUD(`Shortcut "${e}" has not been configured.`)))};s.ns=()=>{if(6===s.ll){
if(s.ns)return l.os(o._l.then.bind(o._l,s.ns)),void(s.ns=null);s.pn||(o.al("keyMappings"),s.G||(i.Cn["m-s-c"]=36)),
o.al("exclusionListenHash"),o.al("vomnibarOptions"),n.t.runtime.onConnectExternal.addListener(e=>{
let t,{sender:l,name:n}=e;if(l&&r.isExtIdAllowed(l)&&n.startsWith("vimium-c.")&&(t=n.split("@")).length>1){
if(t[1]!==s.We.GitVer)return e.postMessage({N:2,t:1}),void e.disconnect();r.OnConnect(e,1024|t[0].slice(9))
}else e.disconnect()}),n.t.extension.isAllowedIncognitoAccess(e=>{s.We.is=false===e})}},
n.t.runtime.onConnect.addListener(e=>{if(6===s.ll)return r.OnConnect(e,0|e.name);e.disconnect()}),
n.t.commands.onCommand.addListener(c),o._l.then(()=>{
o.al("extAllowList"),n.t.runtime.onMessageExternal.addListener((e,t,l)=>{if(r.isExtIdAllowed(t)){
if("string"==typeof e)u.executeExternalCmd({command:e},t);else if("object"==typeof e&&e)switch(e.handler){
case"shortcut":let n=e.shortcut;n&&c(n+"");break;case"id":return void l({name:"Vimium C",host:location.host,
shortcuts:true,injector:s.We.us,version:s.We.Ta});case 99:return void l({s:e.scripts?s.We.el:null,version:s.We.Ta,
host:"",h:"@"+s.We.GitVer});case"command":u.executeExternalCmd(e,t)}}else l(false)}),o.al("vomnibarPage",null),
o.al("searchUrl",null)}),n.Me.onReplaced.addListener((e,t)=>{let l=s.a.get(t);if(s.cs===t&&(s.cs=e),l){s.a.delete(t),
s.a.set(e,l);for(let t of l.J)t.s.m=e;l.d.s.m=e;for(let l of s.Se)l.s.m===t&&(l.s.m=e)}}),s.cl.Tl=(e,t,l)=>{
setTimeout(()=>{s.cl.Tl(e,t,l)},210)},s.ll=4|s.ll,s.ns(),n.t.scripting.registerContentScripts([{id:"extend_click",
js:["content/extend_click_vc.js"],matches:["<all_urls>"],allFrames:true,runAt:"document_start",world:"MAIN"
}]).catch(e=>{(e+"").includes("Duplicate script ID")||console.log("Can not register extend_click:",e)})});