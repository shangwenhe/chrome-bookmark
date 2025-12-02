"use strict";__filename="background/store.js",define(["require","exports"],(e,l)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.We=l.Xe=l.Kn=l._a=l.$r=l.S=l.El=l.Dl=l.bi=l.po=l.r=l.getNextFakeTabId=l.cl=l.o=l.gn=l.ki=l.na=l.I=l.y=l.M=l.$=l.O=l.je=l.kl=l.ha=l.yn=l.ya=l.pn=l.X=l.It=l.St=l.ie=l.Ma=l.Ca=l.fe=l.nu=l.we=l.he=l.qe=l.Se=l.a=l.oo=l.cs=l.ul=l.dn=l.ns=l.ll=l.au=l.Le=l.oa=l.n=l.Pa=l.u=l.ja=l.to=l.Sa=l.Va=l.In=l.Nr=l.Rl=l.V=l.vomnibarPage_f=l.newTabUrl_f=l.du=l.A=l.Ia=l.wo=l.ro=l.Ue=l.tl=l.G=l.Na=l.hi=l.Qe=l.OnSafari=l.OnEdge=l.OnFirefox=l.OnChrome=l.Ba=void 0,
l.Ba=1,l.OnChrome=true,l.OnFirefox=!!0,l.OnEdge=!!0,l.OnSafari=!!0;let a,n=navigator.userAgentData.brands
;l.Qe=!!n.find(e=>e.brand.includes("Edge")||e.brand.includes("Microsoft")),
l.hi=(a=n.find(e=>e.brand.includes("Chromium")))&&parseInt(a.version)>82?parseInt(a.version):0|(navigator.userAgent.match(/\bChrom(?:e|ium)\/(\d+)/)||[0,998])[1],
l.Na=999,l.G=2,l.Ue=location.origin+"/",l.ro=navigator.language.startsWith("zh"),l.wo=false,l.Ia=false,l.A={},
l.du=new Map,l.newTabUrl_f="",l.vomnibarPage_f="",l.V={v:l.hi,d:"",g:false,m:false},l.Rl={map:new Map,rules:[],
keywords:null},l.Nr={v:l.Qe?-l.hi:l.hi,c:"",i:0,l:0,m:null,n:0,s:"",t:""},l.In={actions:[]},l.Va=false,l.u=false,
l.Le=new Map,l.au=new Map,l.ll=0,l.ul={},l.cs=-1,l.oo=false,l.a=new Map,l.Se=[],l.qe=new Map,l.he=-1,l.we=-1,l.nu=-1
;l.fe=0,l.Ca=null,l.Ma=null,l.ie={ne:[],Be:[],f:0,Ke:0},l.St={Ct:null,Gt:new Map,Bt:0,Ft:0,Jt:0},l.It=new Map,l.pn=null,
l.ya=null,l.ha=0,l.kl=new Map,l.je=0,l.O=null,l.$=1;let t=null;l.x=null,l.Rn=null,l.gn=(e,l)=>{let a=t,n=!e||a&&a.i===e
;return t=n?l:a,n?a:null},l.o=()=>{},l.cl={};let o=-4;l.getNextFakeTabId=()=>o--,l.r=l.o,l.po=l.o,l.bi=null,l.Dl=()=>"",
l.El=()=>"",l.S=e=>e,l.$r=()=>null,l._a=null,l.Kn=null,l.We={uo:"pages/blank.html#keep-alive",U:"chrome",Da:0,
Ze:l.Qe?/^https:\/\/(ntp|www)\.msn\.\w+\/(edge|spartan)\/ntp\b/:"chrome-search://local-ntp/local-ntp.html",is:false,
el:null,Ta:"",aa:"",GitVer:"dev",us:"/lib/injector.js",bn:"/front/vomnibar-tee.html",
HelpDialogJS:"/background/help_dialog.js",Fr:"pages/options.html",ka:"browser",Ga:"",
ta:"https://github.com/gdh1995/vimium-c",wa:null,Bn:"/pages/show.html",Nn:"",lo:"/front/vomnibar.js",jn:""}});