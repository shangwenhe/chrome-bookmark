"use strict";__filename="background/utils.js",define(["require","exports","./store"],(e,t,a)=>{
Object.defineProperty(t,"__esModule",{value:true
}),t.splitWhenKeepExpressions=t.ji=t.tryParse=t.isNotPriviledged=t.En=t.now=t.va=t.Z=t.Hn=t.sl=t.qn=t.yi=t.Jn=t.no=t.os=t.Je=t.an=t.$l=t._i=t.$i=t.jr=t.Cl=t.Sl=t.Nl=t.zl=t.Ye=t.uu=t.cn=t.ar=t.pi=t.Tn=t.i=t.di=t.zr=t.rn=t.Yt=t.Ol=t.en=t.Gn=t.ln=t.D=void 0,
t.D=/\s+/g,t.ln=/^[a-z][\+\-\.\da-z]+:\/\//,t.Gn=(e,t)=>{for(let a in t)void 0!==e[a]||(e[a]=t[a]);return e},
t.en=e=>Array.from(e.keys());let r=/a?/;t.Ol=()=>r.test(""),t.Yt=(e,t,a)=>{let r=a<e.length&&a>t?e.charCodeAt(a-1):0
;return e.slice(t,a+=r>=55296&&r<56320?1:8205===r&&a>t+1?-1:0)},t.rn=(e,t,a)=>{let r=t>0&&t<e.length?e.charCodeAt(t):0
;return e.slice(t+=r>=56320&&r<=57343?-1:8205===r&&t<e.length-1&&t<a-1?1:0,a)},t.zr=e=>{function a(e){
let t=e.charCodeAt(0);return 38===t?"&amp;":39===t?"&apos;":t<39?"&quot;":60===t?"&lt;":"&gt;"}let r=/["&'<>]/g
;return t.zr=e=>e.replace(r,a),t.zr(e)},t.di=e=>58===e.charCodeAt(10)&&"javascript"===e.slice(0,10).toLowerCase()
;let n=["","",".ac.ad.ae.af.ag.ai.al.am.ao.aq.ar.as.at.au.aw.ax.az.ba.bb.bd.be.bf.bg.bh.bi.bj.bm.bn.bo.br.bs.bt.bv.bw.by.bz.ca.cc.cd.cf.cg.ch.ci.ck.cl.cm.cn.co.cr.cu.cv.cw.cx.cy.cz.de.dj.dk.dm.do.dz.ec.ee.eg.er.es.et.eu.fi.fj.fk.fm.fo.fr.ga.gb.gd.ge.gf.gg.gh.gi.gl.gm.gn.gp.gq.gr.gs.gt.gu.gw.gy.hk.hm.hn.hr.ht.hu.id.ie.il.im.in.io.iq.ir.is.it.je.jm.jo.jp.ke.kg.kh.ki.km.kn.kp.kr.kw.ky.kz.la.lb.lc.li.lk.lr.ls.lt.lu.lv.ly.ma.mc.md.me.mg.mh.mk.ml.mm.mn.mo.mp.mq.mr.ms.mt.mu.mv.mw.mx.my.mz.na.nc.ne.nf.ng.ni.nl.no.np.nr.nu.nz.om.pa.pe.pf.pg.ph.pk.pl.pm.pn.pr.ps.pt.pw.qa.re.ro.rs.ru.rw.sa.sb.sc.sd.se.sg.sh.si.sj.sk.sl.sm.sn.so.sr.ss.st.su.sv.sx.sy.sz.tc.td.tf.tg.th.tj.tk.tl.tm.tn.to.tr.tt.tv.tw.tz.ua.ug.uk.us.uy.uz.va.vc.ve.vg.vi.vn.vu.wf.ws.ye.yt.za.zm.zw",".aaa.abb.abc.aco.ads.aeg.afl.aig.anz.aol.app.art.aws.axa.bar.bbc.bbt.bcg.bcn.bet.bid.bio.biz.bms.bmw.bnl.bom.boo.bot.box.buy.bzh.cab.cal.cam.car.cat.cba.cbn.cbs.ceb.ceo.cfa.cfd.com.cpa.crs.csc.dad.day.dds.dev.dhl.diy.dnp.dog.dot.dtv.dvr.eat.eco.edu.esq.eus.fan.fit.fly.foo.fox.frl.ftr.fun.fyi.gal.gap.gdn.gea.gle.gmo.gmx.goo.gop.got.gov.hbo.hiv.hkt.hot.how.ibm.ice.icu.ifm.inc.ing.ink.int.ist.itv.iwc.jcb.jcp.jio.jlc.jll.jmp.jnj.jot.joy.kfh.kia.kim.kpn.krd.lat.law.lds.llc.llp.lol.lpl.ltd.man.map.mba.med.men.mil.mit.mlb.mls.mma.moe.moi.mom.mov.msd.mtn.mtr.nab.nba.nec.net.new.nfl.ngo.nhk.now.nra.nrw.ntt.nyc.obi.off.one.ong.onl.ooo.org.ott.ovh.pay.pet.phd.pid.pin.pnc.pro.pru.pub.pwc.qvc.red.ren.ril.rio.rip.run.rwe.sap.sas.sbi.sbs.sca.scb.ses.sew.sex.sfr.ski.sky.soy.spa.srl.srt.stc.tab.tax.tci.tdk.tel.thd.tjx.top.trv.tui.tvs.ubs.uno.uol.ups.vet.vig.vin.vip.wed.win.wme.wow.wtc.wtf.xin.xxx.xyz.you.yun",".aero.arpa.asia.auto.band.beer.chat.city.club.cool.coop.date.fans.fund.game.gift.gold.guru.help.host.info.jobs.life.link.live.loan.love.luxe.mobi.name.news.pics.plus.shop.show.site.sohu.team.tech.wang.wiki.work.yoga.zone",".citic.cloud.email.games.group.local.onion.party.photo.press.rocks.space.store.today.trade.video.world",".center.design.lawyer.market.museum.online.social.studio.travel",".company.fashion.science.website",".engineer.software"]
;t.i=()=>Object.create(null),
t.Tn=e=>Object.setPrototypeOf(e,null),t.pi=(e,t)=>!t&&/[^a-z]/.test(e)?/^xn--[\x20-\x7f]+/.test(e)||".\u4e2d\u4fe1.\u4e2d\u56fd.\u4e2d\u570b.\u4e2d\u6587\u7f51.\u4f01\u4e1a.\u4f5b\u5c71.\u4fe1\u606f.\u516c\u53f8.\u516c\u76ca.\u5546\u57ce.\u5546\u5e97.\u5546\u6807.\u5728\u7ebf.\u5a31\u4e50.\u5e7f\u4e1c.\u6211\u7231\u4f60.\u624b\u673a.\u62db\u8058.\u653f\u52a1.\u6e38\u620f.\u7f51\u5740.\u7f51\u5e97.\u7f51\u5e97.\u7f51\u7edc.\u8d2d\u7269.\u96c6\u56e2.\u9910\u5385.".includes("."+e+".")?2:0:e&&e.length<n.length&&n[e.length].includes(e)?1:0,
t.ar=e=>{let a=e.toLowerCase().split("."),r=a.length
;return[a,0===t.pi(a[r-1])?1:r>2&&2===a[r-1].length&&1===t.pi(a[r-2])?3:2]
},t.cn=(e,a)=>!!(6!==a&&/^\d{1,3}(?:\.\d{1,3}){3}$/.test(e)||4!==a&&/^\[[\da-f]{0,4}(?::[\da-f]{0,4}){1,5}(?:(?::[\da-f]{0,4}){1,2}|:\d{0,3}(?:\.\d{0,3}){3})]$/.test(e))&&!!t.uu("http://"+e),
t.uu=e=>{try{return new URL(e)}catch(e){return null}},t.Ye=(e,t)=>{if(!e||!e.includes("%"))return e||"";try{
e=(t?"atob"===t?atob:decodeURI:decodeURIComponent)(e)}catch(e){}return e},t.zl=(e,a)=>{if(!e.includes("%"))return e
;if(!t.ln.test(e)&&!/^(about|data|javascript|vimium)/i.test(e))return e
;let r=e.replace(/%(2[356f]|3[adf]|40)/gi,"%25$1").replace(/%(?![\da-fA-F]{2})/g,"%25"),n=t.Ye(r,1)
;n=n.length!==r.length?n:t.Sl(e,1)
;let o=!a&&(t.ln.test(n)?!n.startsWith("vimium:"):n.startsWith("data:")||n.startsWith("about:"))
;n=n.replace(o?t.D:/[\r\n]+/g,encodeURIComponent);let l=n&&n.charAt(n.length-1)
;return l&&!/[a-z\d\ud800-\udfff]/i.test(l)&&(l=l<"\x7f"?"%"+(l.charCodeAt(0)+256).toString(16).slice(1):t.Cl(l),
l.length>1&&(n=n.slice(0,n.length-1)+l)),n
},t.Nl=(e,a)=>(e=!e.includes("://")&&/%(?:2[36f]|3[adf])/i.test(e)?t.Ye(e).trim():e,t.zl(e,a)),
t.Sl=(e,a)=>(a?e:encodeURI(e)).replace(/(?:%[\da-f]{2})+/gi,e=>{let a=t.Ye(e);return a.length<e.length?t.Cl(a):e}),
t.Cl=e=>e.replace(/[^\p{L}\p{N}]+/gu,encodeURIComponent),
t.jr=e=>(e=e.slice(0,8).toLowerCase()).startsWith("http://")?7:"https://"===e?8:0,
t.$i=e=>e.trim()?e.trim().split(/[.\s]+/g).sort().filter(e=>!!e):[],t._i=e=>e&&[e[0],e[1],t.$i(e[2]||"")]||0,
t.$l=(e,t,a)=>{try{return new RegExp(e,t)}catch(r){
0===a||console.log("%c/%s/%s","color:#c41a16",e,t,"is not a valid regexp.")}return null},t.an=(e,t)=>{
if(!e.endsWith("*")){let t=e.indexOf("://"),a=t>0?e.indexOf("/",t+3):-1
;e+=t>0&&(a===e.length-1||a<0)?(a>0?"":"/")+"*\\?*#*":""}try{
return a.hi<107?new URLPattern(e):new URLPattern(e,"http://localhost",{ignoreCase:true})}catch(a){
0===t||console.log("%c/%s/%s","color:#c41a16",e,"is not a valid URLPattern.")}return null};let o=null,l=e=>{o=e}
;t.Je=()=>{let e=new Promise(l),t=o;return o=null,{Ee:e,Ge:t}},t.os=e=>{queueMicrotask(e)},t.no=(e,t,a)=>{let r=()=>{
a&&false===a()&&(n=0);for(let a=0,r=0;a<32&&r<128&&n>0;){let o=t(e[--n]);if(o>0)a++,r+=o;else if(o<0)break}
n>0&&(e.length=n,setTimeout(r,150))},n=e.length;n>=10?setTimeout(r,17):e.length>0&&r()},t.Jn=(e,t)=>{
let a=!t&&e.endsWith(".json")
;return e=t||e.includes("/")?e:"/front/"+e,fetch(e).then(e=>a?e.json().then(e=>new Map(Object.entries(e))):t?"blob"===t?e.blob():e.arrayBuffer():e.text())
},t.yi=(e,a)=>{let r,n=0;a=a||1e4;{let t=new AbortController;n=setTimeout(t.abort.bind(t),a),r=fetch(e,{
cache:"force-cache",signal:t.signal})}
return r=r.then(e=>e.status>=300||e.status<200?null:e.blob().catch(e=>(console.log("on reading response:",e),
0)),e=>(console.log("on requesting",e),null)),n&&r.then(()=>{clearTimeout(n)
}),r.then(e=>e?t.qn(e.slice(0,Math.min(16,e.size),e.type)).then(e=>[null,e]):(console.clear(),e))},t.qn=e=>{
let a=new FileReader,r=t.Je();return a.onload=e=>{r.Ge(e.target.result)},a.readAsDataURL(e),r.Ee},
t.sl=e=>e.replace(/[$()*+.?\[\\\]\^{|}]/g,"\\$&");let s="",c=0;t.Hn=e=>{let t=Date.now();if(t-c>8e3){if(!e)return""
;let t=new Uint8Array(8);crypto.getRandomValues(t),s=t.reduce((e,t)=>e+(t<16?"0":"")+t.toString(16),"")}return c=t,s},
t.Z=e=>{if(null!=e&&false!==e){
for(e="string"!=typeof e?"number"==typeof e?[e,.5]:true===e?[.5,.5]:e instanceof Array?e:[+e.x||0,+e.y||0,+e.s||0]:e.trim().split(/[\s,]+/).map((e,t)=>"count"===e&&t<2?e:isNaN(+e)?t<2?.5:0:+e);e.length<2;)e.push(.5)
;for(;e.length<3;)e.push(0);let t="count"===e[0]||"count"===e[1];return{x:e[0],y:e[1],n:t?0:1,s:t?+e[2]||.01:0}}},
t.va=e=>{let t="";for(let a=0,r=e.length-1;a<r;a++){let r=e[a];r.trimRight()&&e.indexOf(r,a+1)<0&&(t+=r)}return t},
t.now=()=>new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toJSON().slice(0,-5).replace("T"," "),
t.En=()=>/\.(?:avif|bmp|gif|icon?|jpe?g|a?png|svg|tiff?|webp)$/i,t.isNotPriviledged=e=>{let t=e.s.Jl
;return!(t.startsWith("chrome")||t.startsWith("edge"))};let i=(e,t)=>{let a=[],r=0,n=-1,o=0,l=e.length
;for(;r<l;r++)switch(e[r]){case"#":case"&":"#"===e.charAt(r+1)&&(a.push([r+1,l]),r=e.length);break;case"(":case")":
case"?":case"+":t&&(l=r);break;case":":o||t&&(l=r);break;case"{":case"[":o++||(n=r);break;case"]":case"}":
--o||a.push([n,r+1]);break;case'"':{let t=/^"([^"\\]|\\[^])*"/.exec(e.slice(r));o||t&&a.push([r,r+t[0].length]),
r+=t?t[0].length-1:0;break}default:{let t=/^(?:[$a-zA-Z_][$\w]*|\d[\d.eE+-]|,?\s+)/.exec(e.slice(r))
;r+=t?t[0].length-1:0}}return[a,l]};t.tryParse=e=>{try{return JSON.parse(e)}catch(t){return e}},t.ji=e=>{
let[a,r]=i(e,1),n="",o=0;for(let[r,l]of a){if("#"===e[r])break;if("="!==e[r-1]||e[l]&&"&"!==e[l])continue
;n+=e.slice(o,r),o=l;let a=t.tryParse(e.slice(r,l))
;n+="string"!=typeof a||a.length!==l-r?JSON.stringify(a).replace(/[%\s&]/g,e=>"\\u"+(e.charCodeAt(0)+65536).toString(16).slice(1)):a.replace(/&/g,"%26")
}return n+=e.slice(o,r),[n,r]},t.splitWhenKeepExpressions=(e,t)=>{let a=i(e)[0],r=-1,n=0,o=0,l=[]
;for(;(r=e.indexOf(t,r+1))>=0;){for(;n<a.length&&r>=a[n][1];)n++
;n<a.length&&r>=a[n][0]?r=a[n][1]-1:(l.push(e.slice(o,r)),o=r+1)}return l.push(e.slice(o)),l}});