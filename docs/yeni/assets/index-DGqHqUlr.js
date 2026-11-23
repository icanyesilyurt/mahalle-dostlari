(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const ln=(i,t,e,n)=>({id:i,species:"cat",name:t,price:e,look:{size:1,belly:"#f4efe6",...n}}),In=(i,t,e,n)=>({id:i,species:"dog",name:t,price:e,look:{size:1,belly:"#f4ead8",...n}}),to=[ln("tekir","Tekir",{coin:500},{body:"#8d8f94",mark:"#4a4c51",pattern:"tabby",eyes:"#c9b23a"}),ln("sarman","Sarman",{coin:500},{body:"#e9a24c",mark:"#b5651f",belly:"#f7e2c2",pattern:"tabby",eyes:"#d8a020"}),ln("smokin","Smokin",{coin:600},{body:"#2a2727",belly:"#f4f1ea",pattern:"tuxedo",eyes:"#9ccf5a"}),ln("uc_renk","Üç Renkli",{coin:700},{body:"#f4f0e8",mark:"#e38a3a",belly:"#f8f4ee",pattern:"calico",eyes:"#d8a020"}),ln("kara","Kara Kedi",{coin:500},{body:"#262424",belly:"#2f2c2c",pattern:"solid",eyes:"#e8b53a"}),ln("van","Van Kedisi",{coin:1200},{body:"#f8f6f0",belly:"#ffffff",pattern:"solid",fluff:.5,size:1.1,eyes:"#6fb3d6"}),ln("siyam","Siyam",{coin:1100},{body:"#efe2c8",mark:"#4a3428",pattern:"points",ears:1.2,size:.95,eyes:"#5aa8e8"}),ln("british","British Shorthair",{coin:1300},{body:"#8e97a3",belly:"#9aa3ae",pattern:"solid",head:1.15,ears:.8,size:1.1,eyes:"#e8a43a"}),ln("maine_coon","Maine Coon",{gem:25},{body:"#8a6a4a",mark:"#4a3424",pattern:"tabby",size:1.35,fluff:.9,tail:1.3,eyes:"#c9a03a"}),ln("munchkin","Munchkin",{gem:20},{body:"#d8a874",mark:"#9a6a3c",pattern:"tabby",legs:.55,eyes:"#9ccf5a"}),In("sokak","Sokak Köpeği",{coin:500},{body:"#d9b46a",belly:"#f0e2c0",pattern:"solid",size:1.05}),In("kangal","Kangal",{coin:1500},{body:"#d8c39a",belly:"#ece0c4",mark:"#2a2422",pattern:"mask",size:1.4,floppy:!0,head:1.1}),In("golden","Golden Retriever",{coin:1200},{body:"#d9a25a",belly:"#ecc888",pattern:"solid",size:1.2,floppy:!0,tail:1.3,fluff:.5}),In("beagle","Beagle",{coin:800},{body:"#a8662e",belly:"#f4eee2",mark:"#2a2422",pattern:"saddle",size:.85,floppy:!0,ears:1.2}),In("dalmacyali","Dalmaçyalı",{coin:1e3},{body:"#f4f2ec",belly:"#f8f6f0",mark:"#1f1c1b",pattern:"spots",size:1.15,floppy:!0}),In("corgi","Corgi",{coin:1100},{body:"#d9893a",belly:"#f6eee2",pattern:"solid",legs:.55,long:1.15,ears:1.35,tail:.4,head:1.1}),In("husky","Husky",{gem:25},{body:"#5d6066",belly:"#f2f0ea",pattern:"mask",mark:"#f2f0ea",size:1.15,fluff:.4,eyes:"#6fb3d6"}),In("pug","Pug",{gem:15},{body:"#d9c09a",belly:"#e6d2b0",mark:"#2a2422",pattern:"mask",size:.75,head:1.35,floppy:!0,snout:.4})],li=i=>to.find(t=>t.id===i),Di=[{id:"kedi_evi",kind:"house",name:"Kedi Evi",price:{coin:300},color:"#e07a5f",desc:"Sokak kedileri için sıcak bir yuva"},{id:"kopek_kulubesi",kind:"house",name:"Köpek Kulübesi",price:{coin:400},color:"#7a9e7e",desc:"Çatılı ahşap kulübe"},{id:"tisort_mercan",kind:"outfit",name:"Mercan Tişört",price:{coin:0},color:"#f07f6a",rarity:"common"},{id:"kazak_hardal",kind:"outfit",name:"Hardal Kazak",price:{coin:250},color:"#e0a53b",rarity:"common"},{id:"yagmurluk",kind:"outfit",name:"Sarı Yağmurluk",price:{coin:450},color:"#f2c94c",color2:"#2f5d62",rarity:"rare"},{id:"hirka_mavi",kind:"outfit",name:"Boğaz Mavisi Hırka",price:{gem:8},color:"#4f86c6",color2:"#f4efe6",rarity:"epic"},{id:"kasket",kind:"hat",name:"Kasket",price:{coin:200},color:"#6b4f3a",rarity:"common"},{id:"bere",kind:"hat",name:"Örgü Bere",price:{coin:300},color:"#c8423a",color2:"#f4efe6",rarity:"rare"},{id:"hasir",kind:"hat",name:"Hasır Şapka",price:{coin:400},color:"#e8c987",color2:"#c8423a",rarity:"rare"},{id:"kedi_kulak",kind:"hat",name:"Kedi Kulaklı Bere",price:{gem:10},color:"#f2a7b8",rarity:"epic"},{id:"yelek_kirmizi",kind:"petwear",name:"Kırmızı Yelek",price:{coin:200},color:"#d64545",rarity:"common"},{id:"kazak_cizgili",kind:"petwear",name:"Çizgili Kazak",price:{coin:350},color:"#3b6aa8",color2:"#f4efe6",rarity:"rare"},{id:"tasma_mavi",kind:"collar",name:"Mavi Tasma",price:{coin:100},color:"#3b8ed6",rarity:"common"},{id:"tasma_canli",kind:"collar",name:"Çıngıraklı Tasma",price:{coin:250},color:"#d64545",color2:"#f2c94c",rarity:"rare"},{id:"tasma_altin",kind:"collar",name:"Altın Tasma",price:{gem:6},color:"#e8b53a",rarity:"epic"},{id:"top_kirmizi",kind:"ball",name:"Kırmızı Top",price:{coin:80},color:"#e2493b",rarity:"common"},{id:"top_tenis",kind:"ball",name:"Tenis Topu",price:{coin:150},color:"#d8e84a",rarity:"common"},{id:"top_plaj",kind:"ball",name:"Plaj Topu",price:{coin:300},color:"#3b8ed6",color2:"#f2c94c",rarity:"rare"},{id:"top_yildiz",kind:"ball",name:"Yıldızlı Top",price:{gem:5},color:"#9a5ac8",color2:"#f2c94c",rarity:"legendary"}],be=i=>Di.find(t=>t.id===i),eo=[{id:"mahalle_paketi",name:"Mahalle Paketi",price:{coin:250},color:"#e07a5f",tiers:[{rarity:"common",chance:60,rewards:[{type:"coin",amount:150},{type:"food",amount:5},{type:"item",id:"tasma_mavi"},{type:"item",id:"top_kirmizi"}]},{rarity:"rare",chance:30,rewards:[{type:"item",id:"bere"},{type:"item",id:"kazak_cizgili"},{type:"item",id:"tasma_canli"},{type:"item",id:"top_plaj"}]},{rarity:"epic",chance:9,rewards:[{type:"item",id:"kedi_kulak"},{type:"item",id:"tasma_altin"},{type:"gem",amount:10}]},{rarity:"legendary",chance:1,rewards:[{type:"item",id:"top_yildiz"},{type:"gem",amount:40}]}]}],pr={common:"Yaygın",rare:"Nadir",epic:"Epik",legendary:"Efsane"},mr={common:"#8fb996",rare:"#4f86c6",epic:"#9a5ac8",legendary:"#e8a83a"},sa=[{id:"istanbul",name:"İstanbul",country:"Türkiye",price:{},available:!0,accent:"#e07a5f",tagline:"Cumbalı evler, simit, çay ve Boğaz"},{id:"roma",name:"Roma",country:"İtalya",price:{coin:2e3},available:!1,accent:"#d9a25a",tagline:"Yakında"},{id:"paris",name:"Paris",country:"Fransa",price:{coin:2500},available:!1,accent:"#7c8dc7",tagline:"Yakında"},{id:"londra",name:"Londra",country:"İngiltere",price:{coin:3e3},available:!1,accent:"#c8423a",tagline:"Yakında"},{id:"barselona",name:"Barselona",country:"İspanya",price:{coin:3500},available:!1,accent:"#e8b53a",tagline:"Yakında"},{id:"newyork",name:"New York",country:"ABD",price:{coin:4500},available:!1,accent:"#4f86c6",tagline:"Yakında"},{id:"tokyo",name:"Tokyo",country:"Japonya",price:{coin:5e3},available:!1,accent:"#e98aa0",tagline:"Yakında"},{id:"pekin",name:"Pekin",country:"Çin",price:{coin:5500},available:!1,accent:"#b23a3a",tagline:"Yakında"}],we=10,er=30*60*1e3,no=5,Do=15,Uo=5,No=2,Kc=1,jl="mahalle-dostlari-v2",Jl=1;function jc(i){return{v:Jl,food:we,foodTs:i,water:no,coins:300,gems:15,city:"istanbul",unlockedCities:["istanbul"],items:{tisort_mercan:1},houses:[],pets:[],activePet:null,look:{outfit:"tisort_mercan",hat:null,skin:"#f1c7a5",hair:"#4a2f22"},friends:{},stats:{fed:0,watered:0,boxes:0,ads:0},muted:!1}}function ar(i,t){if(i.food>=we){i.foodTs=t;return}const e=Math.max(0,t-i.foodTs),n=Math.floor(e/er);n<=0||(i.food=Math.min(we,i.food+n),i.foodTs=i.food>=we?t:i.foodTs+n*er)}function ra(i,t){return i.food>=we?0:Math.max(0,er-(t-i.foodTs))}function Jc(i,t){return i.food>=we?0:ra(i,t)+(we-i.food-1)*er}function Qc(i,t){return ar(i,t),i.food<=0?!1:(i.food>=we&&(i.foodTs=t),i.food-=1,!0)}function th(i,t){i.food=we,i.foodTs=t,i.stats.ads++}function ni(i,t){return(t.coin??0)<=i.coins&&(t.gem??0)<=i.gems}function or(i,t){return ni(i,t)?(i.coins-=t.coin??0,i.gems-=t.gem??0,!0):!1}function io(i,t){var e;return(e=i.friends)[t]??(e[t]={fed:0,watered:0,petted:0,lastPet:0})}function eh(i,t,e){if(!Qc(i,e))return{ok:!1,coins:0,gems:0,newFriend:!1};const n=io(i,t),s=n.fed===0;n.fed++,i.stats.fed++,i.coins+=Do;const r=s?Kc:0;return i.gems+=r,{ok:!0,coins:Do,gems:r,newFriend:s}}function nh(i,t){return i.water<=0?{ok:!1,coins:0}:(i.water--,io(i,t).watered++,i.stats.watered++,i.coins+=Uo,{ok:!0,coins:Uo})}function ih(i,t,e){const n=io(i,t);return n.petted++,e-n.lastPet<6e4?0:(n.lastPet=e,i.coins+=No,No)}function sh(i){i.water=no}let rh=0;const Ql=()=>Date.now().toString(36)+(rh++).toString(36)+Math.floor(Math.random()*1e4).toString(36);function ah(i,t){const e=be(t);return!e||e.kind!=="house"&&(i.items[t]??0)>0||!or(i,e.price)?!1:(i.items[t]=(i.items[t]??0)+1,!0)}function oh(i,t,e){const n=li(t);if(!n||!or(i,n.price))return null;const s={uid:Ql(),breed:t,name:e.trim()||n.name};return i.pets.push(s),i.activePet||(i.activePet=s.uid),s}function lh(i,t,e,n,s,r,a){if((i.items[t]??0)<=0)return null;i.items[t]--;const o={uid:Ql(),item:t,city:i.city,x:e,z:n,rot:s,name:r.trim()||be(t).name,color:a};return i.houses.push(o),o}function ch(i,t){const e=sa.find(n=>n.id===t);return!e||!e.available||i.unlockedCities.includes(t)||!or(i,e.price)?!1:(i.unlockedCities.push(t),!0)}function hh(i,t=Math.random){const e=eo.find(o=>o.id===i);if(!e)return null;const n=e.tiers.reduce((o,l)=>o+l.chance,0);let s=t()*n,r=e.tiers[e.tiers.length-1];for(const o of e.tiers){if(s<o.chance){r=o;break}s-=o.chance}const a=r.rewards[Math.floor(t()*r.rewards.length)%r.rewards.length];return{rarity:r.rarity,reward:a}}function uh(i,t,e,n=Math.random){const s=eo.find(l=>l.id===t);if(!s||!or(i,s.price))return null;const r=hh(t,n);i.stats.boxes++;let a=r.reward,o=!1;return a.type==="item"&&(i.items[a.id]??0)>0&&(o=!0,a={type:"coin",amount:Math.max(50,Math.round((be(a.id).price.coin??400)*.5))}),dh(i,a,e),{rarity:r.rarity,reward:a,dup:o}}function dh(i,t,e){t.type==="coin"?i.coins+=t.amount:t.type==="gem"?i.gems+=t.amount:t.type==="food"?(ar(i,e),i.food=Math.min(we,i.food+t.amount),i.food>=we&&(i.foodTs=e)):i.items[t.id]=(i.items[t.id]??0)+1}function fh(i,t){const e=jc(t);if(!i||typeof i!="object")return e;const n={...e,...i,look:{...e.look,...i.look??{}},stats:{...e.stats,...i.stats??{}}};return n.v=Jl,n.pets=(n.pets??[]).filter(s=>to.some(r=>r.id===s.breed)),n.items=Object.fromEntries(Object.entries(n.items??{}).filter(([s])=>Di.some(r=>r.id===s))),n}function ph(i){let t=null;try{t=JSON.parse(localStorage.getItem(jl)??"null")}catch{t=null}const e=fh(t,i);return ar(e,i),e}function fe(i){try{localStorage.setItem(jl,JSON.stringify(i))}catch{}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const so="170",mh=0,Fo=1,gh=2,tc=1,ec=2,En=3,$n=0,ze=1,en=2,Vn=0,Oi=1,Oo=2,ko=3,zo=4,_h=5,si=100,vh=101,xh=102,yh=103,Mh=104,Sh=200,bh=201,wh=202,Eh=203,aa=204,oa=205,Th=206,Ah=207,Rh=208,Ch=209,Ph=210,Lh=211,Ih=212,Dh=213,Uh=214,la=0,ca=1,ha=2,Bi=3,ua=4,da=5,fa=6,pa=7,lr=0,Nh=1,Fh=2,Gn=0,Oh=1,kh=2,zh=3,ro=4,Bh=5,Hh=6,Vh=7,nc=300,Hi=301,Vi=302,ma=303,ga=304,cr=306,us=1e3,ai=1001,_a=1002,rn=1003,Gh=1004,Ms=1005,pn=1006,gr=1007,oi=1008,Cn=1009,ic=1010,sc=1011,ds=1012,ao=1013,ci=1014,Tn=1015,gs=1016,oo=1017,lo=1018,Gi=1020,rc=35902,ac=1021,oc=1022,sn=1023,lc=1024,cc=1025,ki=1026,Wi=1027,hc=1028,co=1029,uc=1030,ho=1031,uo=1033,Zs=33776,Ks=33777,js=33778,Js=33779,va=35840,xa=35841,ya=35842,Ma=35843,Sa=36196,ba=37492,wa=37496,Ea=37808,Ta=37809,Aa=37810,Ra=37811,Ca=37812,Pa=37813,La=37814,Ia=37815,Da=37816,Ua=37817,Na=37818,Fa=37819,Oa=37820,ka=37821,Qs=36492,za=36494,Ba=36495,dc=36283,Ha=36284,Va=36285,Ga=36286,Wh=3200,Xh=3201,fo=0,$h=1,Hn="",De="srgb",$i="srgb-linear",hr="linear",le="srgb",mi=7680,Bo=519,Yh=512,qh=513,Zh=514,fc=515,Kh=516,jh=517,Jh=518,Qh=519,Ho=35044,Vo="300 es",An=2e3,nr=2001;class Yi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_r=Math.PI/180,Wa=180/Math.PI;function qi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ce[i&255]+Ce[i>>8&255]+Ce[i>>16&255]+Ce[i>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]).toLowerCase()}function Ee(i,t,e){return Math.max(t,Math.min(e,i))}function tu(i,t){return(i%t+t)%t}function vr(i,t,e){return(1-e)*i+e*t}function Qi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Oe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class ut{constructor(t=0,e=0){ut.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,n,s,r,a,o,l,c){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],y=s[0],m=s[3],d=s[6],_=s[1],v=s[4],x=s[7],L=s[2],E=s[5],T=s[8];return r[0]=a*y+o*_+l*L,r[3]=a*m+o*v+l*E,r[6]=a*d+o*x+l*T,r[1]=c*y+h*_+u*L,r[4]=c*m+h*v+u*E,r[7]=c*d+h*x+u*T,r[2]=f*y+p*_+g*L,r[5]=f*m+p*v+g*E,r[8]=f*d+p*x+g*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,p=c*r-a*l,g=e*u+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return t[0]=u*y,t[1]=(s*c-h*n)*y,t[2]=(o*n-s*a)*y,t[3]=f*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-o*e)*y,t[6]=p*y,t[7]=(n*l-c*e)*y,t[8]=(a*e-n*r)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(xr.makeScale(t,e)),this}rotate(t){return this.premultiply(xr.makeRotation(-t)),this}translate(t,e){return this.premultiply(xr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const xr=new Gt;function pc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ir(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function eu(){const i=ir("canvas");return i.style.display="block",i}const Go={};function as(i){i in Go||(Go[i]=!0,console.warn(i))}function nu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function iu(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function su(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const te={enabled:!0,workingColorSpace:$i,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===le&&(i.r=Rn(i.r),i.g=Rn(i.g),i.b=Rn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===le&&(i.r=zi(i.r),i.g=zi(i.g),i.b=zi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Hn?hr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Rn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Wo=[.64,.33,.3,.6,.15,.06],Xo=[.2126,.7152,.0722],$o=[.3127,.329],Yo=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qo=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);te.define({[$i]:{primaries:Wo,whitePoint:$o,transfer:hr,toXYZ:Yo,fromXYZ:qo,luminanceCoefficients:Xo,workingColorSpaceConfig:{unpackColorSpace:De},outputColorSpaceConfig:{drawingBufferColorSpace:De}},[De]:{primaries:Wo,whitePoint:$o,transfer:le,toXYZ:Yo,fromXYZ:qo,luminanceCoefficients:Xo,outputColorSpaceConfig:{drawingBufferColorSpace:De}}});let gi;class ru{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{gi===void 0&&(gi=ir("canvas")),gi.width=t.width,gi.height=t.height;const n=gi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=gi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ir("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Rn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Rn(e[n]/255)*255):e[n]=Rn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let au=0;class mc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=qi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(yr(s[a].image)):r.push(yr(s[a]))}else r=yr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function yr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ru.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ou=0;class Ne extends Yi{constructor(t=Ne.DEFAULT_IMAGE,e=Ne.DEFAULT_MAPPING,n=ai,s=ai,r=pn,a=oi,o=sn,l=Cn,c=Ne.DEFAULT_ANISOTROPY,h=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=qi(),this.name="",this.source=new mc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case us:t.x=t.x-Math.floor(t.x);break;case ai:t.x=t.x<0?0:1;break;case _a:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case us:t.y=t.y-Math.floor(t.y);break;case ai:t.y=t.y<0?0:1;break;case _a:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ne.DEFAULT_IMAGE=null;Ne.DEFAULT_MAPPING=nc;Ne.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,n=0,s=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],g=l[9],y=l[2],m=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,x=(p+1)/2,L=(d+1)/2,E=(h+f)/4,T=(u+y)/4,R=(g+m)/4;return v>x&&v>L?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=E/n,r=T/n):x>L?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=E/s,r=R/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=T/r,s=R/r),this.set(n,s,r,e),this}let _=Math.sqrt((m-g)*(m-g)+(u-y)*(u-y)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(u-y)/_,this.z=(f-h)/_,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class lu extends Yi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ne(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new mc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends lu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class gc extends Ne{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=rn,this.minFilter=rn,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class cu extends Ne{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=rn,this.minFilter=rn,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fi{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const f=r[a+0],p=r[a+1],g=r[a+2],y=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=y;return}if(u!==y||l!==f||c!==p||h!==g){let m=1-o;const d=l*f+c*p+h*g+u*y,_=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const L=Math.sqrt(v),E=Math.atan2(L,d*_);m=Math.sin(m*E)/L,o=Math.sin(o*E)/L}const x=o*_;if(l=l*m+f*x,c=c*m+p*x,h=h*m+g*x,u=u*m+y*x,m===1-o){const L=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=L,c*=L,h*=L,u*=L}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*p-c*f,t[e+1]=l*g+h*f+c*u-o*p,t[e+2]=c*g+h*p+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),f=l(n/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"YZX":this._x=f*h*u+c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u-f*p*g;break;case"XZY":this._x=f*h*u-c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Zo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Zo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Mr.copy(this).projectOnVector(t),this.sub(Mr)}reflect(t){return this.sub(Mr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Mr=new P,Zo=new fi;class _s{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,je):je.fromBufferAttribute(r,a),je.applyMatrix4(t.matrixWorld),this.expandByPoint(je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ss.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ss.copy(n.boundingBox)),Ss.applyMatrix4(t.matrixWorld),this.union(Ss)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,je),je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ts),bs.subVectors(this.max,ts),_i.subVectors(t.a,ts),vi.subVectors(t.b,ts),xi.subVectors(t.c,ts),Dn.subVectors(vi,_i),Un.subVectors(xi,vi),Zn.subVectors(_i,xi);let e=[0,-Dn.z,Dn.y,0,-Un.z,Un.y,0,-Zn.z,Zn.y,Dn.z,0,-Dn.x,Un.z,0,-Un.x,Zn.z,0,-Zn.x,-Dn.y,Dn.x,0,-Un.y,Un.x,0,-Zn.y,Zn.x,0];return!Sr(e,_i,vi,xi,bs)||(e=[1,0,0,0,1,0,0,0,1],!Sr(e,_i,vi,xi,bs))?!1:(ws.crossVectors(Dn,Un),e=[ws.x,ws.y,ws.z],Sr(e,_i,vi,xi,bs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const yn=[new P,new P,new P,new P,new P,new P,new P,new P],je=new P,Ss=new _s,_i=new P,vi=new P,xi=new P,Dn=new P,Un=new P,Zn=new P,ts=new P,bs=new P,ws=new P,Kn=new P;function Sr(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Kn.fromArray(i,r);const o=s.x*Math.abs(Kn.x)+s.y*Math.abs(Kn.y)+s.z*Math.abs(Kn.z),l=t.dot(Kn),c=e.dot(Kn),h=n.dot(Kn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const hu=new _s,es=new P,br=new P;class po{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):hu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;es.subVectors(t,this.center);const e=es.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(es,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(br.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(es.copy(t.center).add(br)),this.expandByPoint(es.copy(t.center).sub(br))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Mn=new P,wr=new P,Es=new P,Nn=new P,Er=new P,Ts=new P,Tr=new P;class _c{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Mn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Mn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Mn.copy(this.origin).addScaledVector(this.direction,e),Mn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){wr.copy(t).add(e).multiplyScalar(.5),Es.copy(e).sub(t).normalize(),Nn.copy(this.origin).sub(wr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Es),o=Nn.dot(this.direction),l=-Nn.dot(Es),c=Nn.lengthSq(),h=Math.abs(1-a*a);let u,f,p,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const y=1/h;u*=y,f*=y,p=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(wr).addScaledVector(Es,f),p}intersectSphere(t,e){Mn.subVectors(t.center,this.origin);const n=Mn.dot(this.direction),s=Mn.dot(Mn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Mn)!==null}intersectTriangle(t,e,n,s,r){Er.subVectors(e,t),Ts.subVectors(n,t),Tr.crossVectors(Er,Ts);let a=this.direction.dot(Tr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Nn.subVectors(this.origin,t);const l=o*this.direction.dot(Ts.crossVectors(Nn,Ts));if(l<0)return null;const c=o*this.direction.dot(Er.cross(Nn));if(c<0||l+c>a)return null;const h=-o*Nn.dot(Tr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ie{constructor(t,e,n,s,r,a,o,l,c,h,u,f,p,g,y,m){ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,f,p,g,y,m)}set(t,e,n,s,r,a,o,l,c,h,u,f,p,g,y,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=y,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ie().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/yi.setFromMatrixColumn(t,0).length(),r=1/yi.setFromMatrixColumn(t,1).length(),a=1/yi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,p=a*u,g=o*h,y=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=f-y*c,e[9]=-o*l,e[2]=y-f*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,p=l*u,g=c*h,y=c*u;e[0]=f+y*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=y+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,p=l*u,g=c*h,y=c*u;e[0]=f-y*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=y-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,p=a*u,g=o*h,y=o*u;e[0]=l*h,e[4]=g*c-p,e[8]=f*c+y,e[1]=l*u,e[5]=y*c+f,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,p=a*c,g=o*l,y=o*c;e[0]=l*h,e[4]=y-f*u,e[8]=g*u+p,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*u+g,e[10]=f-y*u}else if(t.order==="XZY"){const f=a*l,p=a*c,g=o*l,y=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+y,e[5]=a*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*h,e[10]=y*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(uu,t,du)}lookAt(t,e,n){const s=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),Fn.crossVectors(n,Ve),Fn.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),Fn.crossVectors(n,Ve)),Fn.normalize(),As.crossVectors(Ve,Fn),s[0]=Fn.x,s[4]=As.x,s[8]=Ve.x,s[1]=Fn.y,s[5]=As.y,s[9]=Ve.y,s[2]=Fn.z,s[6]=As.z,s[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],y=n[6],m=n[10],d=n[14],_=n[3],v=n[7],x=n[11],L=n[15],E=s[0],T=s[4],R=s[8],b=s[12],M=s[1],I=s[5],B=s[9],z=s[13],D=s[2],G=s[6],U=s[10],X=s[14],F=s[3],q=s[7],J=s[11],nt=s[15];return r[0]=a*E+o*M+l*D+c*F,r[4]=a*T+o*I+l*G+c*q,r[8]=a*R+o*B+l*U+c*J,r[12]=a*b+o*z+l*X+c*nt,r[1]=h*E+u*M+f*D+p*F,r[5]=h*T+u*I+f*G+p*q,r[9]=h*R+u*B+f*U+p*J,r[13]=h*b+u*z+f*X+p*nt,r[2]=g*E+y*M+m*D+d*F,r[6]=g*T+y*I+m*G+d*q,r[10]=g*R+y*B+m*U+d*J,r[14]=g*b+y*z+m*X+d*nt,r[3]=_*E+v*M+x*D+L*F,r[7]=_*T+v*I+x*G+L*q,r[11]=_*R+v*B+x*U+L*J,r[15]=_*b+v*z+x*X+L*nt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],p=t[14],g=t[3],y=t[7],m=t[11],d=t[15];return g*(+r*l*u-s*c*u-r*o*f+n*c*f+s*o*p-n*l*p)+y*(+e*l*p-e*c*f+r*a*f-s*a*p+s*c*h-r*l*h)+m*(+e*c*u-e*o*p-r*a*u+n*a*p+r*o*h-n*c*h)+d*(-s*o*h-e*l*u+e*o*f+s*a*u-n*a*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],p=t[11],g=t[12],y=t[13],m=t[14],d=t[15],_=u*m*c-y*f*c+y*l*p-o*m*p-u*l*d+o*f*d,v=g*f*c-h*m*c-g*l*p+a*m*p+h*l*d-a*f*d,x=h*y*c-g*u*c+g*o*p-a*y*p-h*o*d+a*u*d,L=g*u*l-h*y*l-g*o*f+a*y*f+h*o*m-a*u*m,E=e*_+n*v+s*x+r*L;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/E;return t[0]=_*T,t[1]=(y*f*r-u*m*r-y*s*p+n*m*p+u*s*d-n*f*d)*T,t[2]=(o*m*r-y*l*r+y*s*c-n*m*c-o*s*d+n*l*d)*T,t[3]=(u*l*r-o*f*r-u*s*c+n*f*c+o*s*p-n*l*p)*T,t[4]=v*T,t[5]=(h*m*r-g*f*r+g*s*p-e*m*p-h*s*d+e*f*d)*T,t[6]=(g*l*r-a*m*r-g*s*c+e*m*c+a*s*d-e*l*d)*T,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*p+e*l*p)*T,t[8]=x*T,t[9]=(g*u*r-h*y*r-g*n*p+e*y*p+h*n*d-e*u*d)*T,t[10]=(a*y*r-g*o*r+g*n*c-e*y*c-a*n*d+e*o*d)*T,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*p-e*o*p)*T,t[12]=L*T,t[13]=(h*y*s-g*u*s+g*n*f-e*y*f-h*n*m+e*u*m)*T,t[14]=(g*o*s-a*y*s-g*n*l+e*y*l+a*n*m-e*o*m)*T,t[15]=(a*u*s-h*o*s+h*n*l-e*u*l-a*n*f+e*o*f)*T,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,p=r*h,g=r*u,y=a*h,m=a*u,d=o*u,_=l*c,v=l*h,x=l*u,L=n.x,E=n.y,T=n.z;return s[0]=(1-(y+d))*L,s[1]=(p+x)*L,s[2]=(g-v)*L,s[3]=0,s[4]=(p-x)*E,s[5]=(1-(f+d))*E,s[6]=(m+_)*E,s[7]=0,s[8]=(g+v)*T,s[9]=(m-_)*T,s[10]=(1-(f+y))*T,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=yi.set(s[0],s[1],s[2]).length();const a=yi.set(s[4],s[5],s[6]).length(),o=yi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Je.copy(this);const c=1/r,h=1/a,u=1/o;return Je.elements[0]*=c,Je.elements[1]*=c,Je.elements[2]*=c,Je.elements[4]*=h,Je.elements[5]*=h,Je.elements[6]*=h,Je.elements[8]*=u,Je.elements[9]*=u,Je.elements[10]*=u,e.setFromRotationMatrix(Je),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=An){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let p,g;if(o===An)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===nr)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=An){const l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(a-r),f=(e+t)*c,p=(n+s)*h;let g,y;if(o===An)g=(a+r)*u,y=-2*u;else if(o===nr)g=r*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const yi=new P,Je=new ie,uu=new P(0,0,0),du=new P(1,1,1),Fn=new P,As=new P,Ve=new P,Ko=new ie,jo=new fi;class $e{constructor(t=0,e=0,n=0,s=$e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ee(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ko.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ko,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return jo.setFromEuler(this),this.setFromQuaternion(jo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$e.DEFAULT_ORDER="XYZ";class mo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let fu=0;const Jo=new P,Mi=new fi,Sn=new ie,Rs=new P,ns=new P,pu=new P,mu=new fi,Qo=new P(1,0,0),tl=new P(0,1,0),el=new P(0,0,1),nl={type:"added"},gu={type:"removed"},Si={type:"childadded",child:null},Ar={type:"childremoved",child:null};class Te extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new P,e=new $e,n=new fi,s=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new Gt}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.premultiply(Mi),this}rotateX(t){return this.rotateOnAxis(Qo,t)}rotateY(t){return this.rotateOnAxis(tl,t)}rotateZ(t){return this.rotateOnAxis(el,t)}translateOnAxis(t,e){return Jo.copy(t).applyQuaternion(this.quaternion),this.position.add(Jo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Qo,t)}translateY(t){return this.translateOnAxis(tl,t)}translateZ(t){return this.translateOnAxis(el,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Sn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Rs.copy(t):Rs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sn.lookAt(ns,Rs,this.up):Sn.lookAt(Rs,ns,this.up),this.quaternion.setFromRotationMatrix(Sn),s&&(Sn.extractRotation(s.matrixWorld),Mi.setFromRotationMatrix(Sn),this.quaternion.premultiply(Mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(nl),Si.child=t,this.dispatchEvent(Si),Si.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(gu),Ar.child=t,this.dispatchEvent(Ar),Ar.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Sn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Sn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Sn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(nl),Si.child=t,this.dispatchEvent(Si),Si.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,t,pu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,mu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Te.DEFAULT_UP=new P(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qe=new P,bn=new P,Rr=new P,wn=new P,bi=new P,wi=new P,il=new P,Cr=new P,Pr=new P,Lr=new P,Ir=new ge,Dr=new ge,Ur=new ge;class nn{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Qe.subVectors(t,e),s.cross(Qe);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Qe.subVectors(s,e),bn.subVectors(n,e),Rr.subVectors(t,e);const a=Qe.dot(Qe),o=Qe.dot(bn),l=Qe.dot(Rr),c=bn.dot(bn),h=bn.dot(Rr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,wn)===null?!1:wn.x>=0&&wn.y>=0&&wn.x+wn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,wn.x),l.addScaledVector(a,wn.y),l.addScaledVector(o,wn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Ir.setScalar(0),Dr.setScalar(0),Ur.setScalar(0),Ir.fromBufferAttribute(t,e),Dr.fromBufferAttribute(t,n),Ur.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Ir,r.x),a.addScaledVector(Dr,r.y),a.addScaledVector(Ur,r.z),a}static isFrontFacing(t,e,n,s){return Qe.subVectors(n,e),bn.subVectors(t,e),Qe.cross(bn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Qe.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),Qe.cross(bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return nn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return nn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return nn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return nn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return nn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;bi.subVectors(s,n),wi.subVectors(r,n),Cr.subVectors(t,n);const l=bi.dot(Cr),c=wi.dot(Cr);if(l<=0&&c<=0)return e.copy(n);Pr.subVectors(t,s);const h=bi.dot(Pr),u=wi.dot(Pr);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(bi,a);Lr.subVectors(t,r);const p=bi.dot(Lr),g=wi.dot(Lr);if(g>=0&&p<=g)return e.copy(r);const y=p*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(wi,o);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return il.subVectors(r,s),o=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(il,o);const d=1/(m+y+f);return a=y*d,o=f*d,e.copy(n).addScaledVector(bi,a).addScaledVector(wi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const vc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},Cs={h:0,s:0,l:0};function Nr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=De){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=te.workingColorSpace){if(t=tu(t,1),e=Ee(e,0,1),n=Ee(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Nr(a,r,t+1/3),this.g=Nr(a,r,t),this.b=Nr(a,r,t-1/3)}return te.toWorkingColorSpace(this,s),this}setStyle(t,e=De){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=De){const n=vc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Rn(t.r),this.g=Rn(t.g),this.b=Rn(t.b),this}copyLinearToSRGB(t){return this.r=zi(t.r),this.g=zi(t.g),this.b=zi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=De){return te.fromWorkingColorSpace(Pe.copy(this),t),Math.round(Ee(Pe.r*255,0,255))*65536+Math.round(Ee(Pe.g*255,0,255))*256+Math.round(Ee(Pe.b*255,0,255))}getHexString(t=De){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.fromWorkingColorSpace(Pe.copy(this),e);const n=Pe.r,s=Pe.g,r=Pe.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=te.workingColorSpace){return te.fromWorkingColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=De){te.fromWorkingColorSpace(Pe.copy(this),t);const e=Pe.r,n=Pe.g,s=Pe.b;return t!==De?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(On),this.setHSL(On.h+t,On.s+e,On.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(On),t.getHSL(Cs);const n=vr(On.h,Cs.h,e),s=vr(On.s,Cs.s,e),r=vr(On.l,Cs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pe=new qt;qt.NAMES=vc;let _u=0;class Zi extends Yi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_u++}),this.uuid=qi(),this.name="",this.blending=Oi,this.side=$n,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=aa,this.blendDst=oa,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=Bi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mi,this.stencilZFail=mi,this.stencilZPass=mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Oi&&(n.blending=this.blending),this.side!==$n&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==aa&&(n.blendSrc=this.blendSrc),this.blendDst!==oa&&(n.blendDst=this.blendDst),this.blendEquation!==si&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Be extends Zi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $e,this.combine=lr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new P,Ps=new ut;class Xe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ho,this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ps.fromBufferAttribute(this,e),Ps.applyMatrix3(t),this.setXY(e,Ps.x,Ps.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Qi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Oe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Qi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Qi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Qi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Qi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array),s=Oe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array),s=Oe(s,this.array),r=Oe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ho&&(t.usage=this.usage),t}}class xc extends Xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class yc extends Xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class se extends Xe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let vu=0;const qe=new ie,Fr=new Te,Ei=new P,Ge=new _s,is=new _s,Me=new P;class Ae extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vu++}),this.uuid=qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(pc(t)?yc:xc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Gt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return qe.makeRotationFromQuaternion(t),this.applyMatrix4(qe),this}rotateX(t){return qe.makeRotationX(t),this.applyMatrix4(qe),this}rotateY(t){return qe.makeRotationY(t),this.applyMatrix4(qe),this}rotateZ(t){return qe.makeRotationZ(t),this.applyMatrix4(qe),this}translate(t,e,n){return qe.makeTranslation(t,e,n),this.applyMatrix4(qe),this}scale(t,e,n){return qe.makeScale(t,e,n),this.applyMatrix4(qe),this}lookAt(t){return Fr.lookAt(t),Fr.updateMatrix(),this.applyMatrix4(Fr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new se(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _s);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ge.setFromBufferAttribute(r),this.morphTargetsRelative?(Me.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(Me),Me.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(Me)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new po);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(Ge.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];is.setFromBufferAttribute(o),this.morphTargetsRelative?(Me.addVectors(Ge.min,is.min),Ge.expandByPoint(Me),Me.addVectors(Ge.max,is.max),Ge.expandByPoint(Me)):(Ge.expandByPoint(is.min),Ge.expandByPoint(is.max))}Ge.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Me.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Me));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Me.fromBufferAttribute(o,c),l&&(Ei.fromBufferAttribute(t,c),Me.add(Ei)),s=Math.max(s,n.distanceToSquared(Me))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xe(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new P,l[R]=new P;const c=new P,h=new P,u=new P,f=new ut,p=new ut,g=new ut,y=new P,m=new P;function d(R,b,M){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,R),p.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),h.sub(c),u.sub(c),p.sub(f),g.sub(f);const I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(y.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(I),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(I),o[R].add(y),o[b].add(y),o[M].add(y),l[R].add(m),l[b].add(m),l[M].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let R=0,b=_.length;R<b;++R){const M=_[R],I=M.start,B=M.count;for(let z=I,D=I+B;z<D;z+=3)d(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const v=new P,x=new P,L=new P,E=new P;function T(R){L.fromBufferAttribute(s,R),E.copy(L);const b=o[R];v.copy(b),v.sub(L.multiplyScalar(L.dot(b))).normalize(),x.crossVectors(E,b);const I=x.dot(l[R])<0?-1:1;a.setXYZW(R,v.x,v.y,v.z,I)}for(let R=0,b=_.length;R<b;++R){const M=_[R],I=M.start,B=M.count;for(let z=I,D=I+B;z<D;z+=3)T(t.getX(z+0)),T(t.getX(z+1)),T(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,h=new P,u=new P;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),y=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Me.fromBufferAttribute(t,e),Me.normalize(),t.setXYZ(e,Me.x,Me.y,Me.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let p=0,g=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?p=l[y]*o.data.stride+o.offset:p=l[y]*h;for(let d=0;d<h;d++)f[g++]=c[p++]}return new Xe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ae,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],p=t(f,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const sl=new ie,jn=new _c,Ls=new po,rl=new P,Is=new P,Ds=new P,Us=new P,Or=new P,Ns=new P,al=new P,Fs=new P;class st extends Te{constructor(t=new Ae,e=new Be){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Ns.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Or.fromBufferAttribute(u,t),a?Ns.addScaledVector(Or,h):Ns.addScaledVector(Or.sub(e),h))}e.add(Ns)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ls.copy(n.boundingSphere),Ls.applyMatrix4(r),jn.copy(t.ray).recast(t.near),!(Ls.containsPoint(jn.origin)===!1&&(jn.intersectSphere(Ls,rl)===null||jn.origin.distanceToSquared(rl)>(t.far-t.near)**2))&&(sl.copy(r).invert(),jn.copy(t.ray).applyMatrix4(sl),!(n.boundingBox!==null&&jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,jn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){const m=f[g],d=a[m.materialIndex],_=Math.max(m.start,p.start),v=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let x=_,L=v;x<L;x+=3){const E=o.getX(x),T=o.getX(x+1),R=o.getX(x+2);s=Os(this,d,t,n,c,h,u,E,T,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),y=Math.min(o.count,p.start+p.count);for(let m=g,d=y;m<d;m+=3){const _=o.getX(m),v=o.getX(m+1),x=o.getX(m+2);s=Os(this,a,t,n,c,h,u,_,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){const m=f[g],d=a[m.materialIndex],_=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=_,L=v;x<L;x+=3){const E=x,T=x+1,R=x+2;s=Os(this,d,t,n,c,h,u,E,T,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=g,d=y;m<d;m+=3){const _=m,v=m+1,x=m+2;s=Os(this,a,t,n,c,h,u,_,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function xu(i,t,e,n,s,r,a,o){let l;if(t.side===ze?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===$n,o),l===null)return null;Fs.copy(o),Fs.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Fs);return c<e.near||c>e.far?null:{distance:c,point:Fs.clone(),object:i}}function Os(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Is),i.getVertexPosition(l,Ds),i.getVertexPosition(c,Us);const h=xu(i,t,e,n,Is,Ds,Us,al);if(h){const u=new P;nn.getBarycoord(al,Is,Ds,Us,u),s&&(h.uv=nn.getInterpolatedAttribute(s,o,l,c,u,new ut)),r&&(h.uv1=nn.getInterpolatedAttribute(r,o,l,c,u,new ut)),a&&(h.normal=nn.getInterpolatedAttribute(a,o,l,c,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new P,materialIndex:0};nn.getNormal(Is,Ds,Us,f.normal),h.face=f,h.barycoord=u}return h}class Bt extends Ae{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new se(c,3)),this.setAttribute("normal",new se(h,3)),this.setAttribute("uv",new se(u,2));function g(y,m,d,_,v,x,L,E,T,R,b){const M=x/T,I=L/R,B=x/2,z=L/2,D=E/2,G=T+1,U=R+1;let X=0,F=0;const q=new P;for(let J=0;J<U;J++){const nt=J*I-z;for(let H=0;H<G;H++){const dt=H*M-B;q[y]=dt*_,q[m]=nt*v,q[d]=D,c.push(q.x,q.y,q.z),q[y]=0,q[m]=0,q[d]=E>0?1:-1,h.push(q.x,q.y,q.z),u.push(H/T),u.push(1-J/R),X+=1}}for(let J=0;J<R;J++)for(let nt=0;nt<T;nt++){const H=f+nt+G*J,dt=f+nt+G*(J+1),W=f+(nt+1)+G*(J+1),Q=f+(nt+1)+G*J;l.push(H,dt,Q),l.push(dt,W,Q),F+=6}o.addGroup(p,F,b),p+=F,f+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Xi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ue(i){const t={};for(let e=0;e<i.length;e++){const n=Xi(i[e]);for(const s in n)t[s]=n[s]}return t}function yu(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Mc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}const Mu={clone:Xi,merge:Ue};var Su=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yn extends Zi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Su,this.fragmentShader=bu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xi(t.uniforms),this.uniformsGroups=yu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Sc extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=An}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const kn=new P,ol=new ut,ll=new ut;class We extends Sc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Wa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(_r*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Wa*2*Math.atan(Math.tan(_r*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(kn.x,kn.y).multiplyScalar(-t/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-t/kn.z)}getViewSize(t,e){return this.getViewBounds(t,ol,ll),e.subVectors(ll,ol)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(_r*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ti=-90,Ai=1;class wu extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new We(Ti,Ai,t,e);s.layers=this.layers,this.add(s);const r=new We(Ti,Ai,t,e);r.layers=this.layers,this.add(r);const a=new We(Ti,Ai,t,e);a.layers=this.layers,this.add(a);const o=new We(Ti,Ai,t,e);o.layers=this.layers,this.add(o);const l=new We(Ti,Ai,t,e);l.layers=this.layers,this.add(l);const c=new We(Ti,Ai,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===An)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class bc extends Ne{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Hi,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Eu extends hi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new bc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:pn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Bt(5,5,5),r=new Yn({name:"CubemapFromEquirect",uniforms:Xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ze,blending:Vn});r.uniforms.tEquirect.value=e;const a=new st(s,r),o=e.minFilter;return e.minFilter===oi&&(e.minFilter=pn),new wu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const kr=new P,Tu=new P,Au=new Gt;class Bn{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=kr.subVectors(n,e).cross(Tu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(kr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Au.getNormalMatrix(t),s=this.coplanarPoint(kr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jn=new po,ks=new P;class go{constructor(t=new Bn,e=new Bn,n=new Bn,s=new Bn,r=new Bn,a=new Bn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=An){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],p=s[8],g=s[9],y=s[10],m=s[11],d=s[12],_=s[13],v=s[14],x=s[15];if(n[0].setComponents(l-r,f-c,m-p,x-d).normalize(),n[1].setComponents(l+r,f+c,m+p,x+d).normalize(),n[2].setComponents(l+a,f+h,m+g,x+_).normalize(),n[3].setComponents(l-a,f-h,m-g,x-_).normalize(),n[4].setComponents(l-o,f-u,m-y,x-v).normalize(),e===An)n[5].setComponents(l+o,f+u,m+y,x+v).normalize();else if(e===nr)n[5].setComponents(o,u,y,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(t){return Jn.center.set(0,0,0),Jn.radius=.7071067811865476,Jn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(ks.x=s.normal.x>0?t.max.x:t.min.x,ks.y=s.normal.y>0?t.max.y:t.min.y,ks.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ks)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function wc(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Ru(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],y=u[p];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,u[f]=y)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const y=u[p];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class an extends Ae{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,p=[],g=[],y=[],m=[];for(let d=0;d<h;d++){const _=d*f-a;for(let v=0;v<c;v++){const x=v*u-r;g.push(x,-_,0),y.push(0,0,1),m.push(v/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let _=0;_<o;_++){const v=_+c*d,x=_+c*(d+1),L=_+1+c*(d+1),E=_+1+c*d;p.push(v,x,E),p.push(x,L,E)}this.setIndex(p),this.setAttribute("position",new se(g,3)),this.setAttribute("normal",new se(y,3)),this.setAttribute("uv",new se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new an(t.width,t.height,t.widthSegments,t.heightSegments)}}var Cu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Lu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Iu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Du=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Uu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Fu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ou=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ku=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Vu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Gu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Xu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$u=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ku=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ju=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ju=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Qu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,td=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ed=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,id=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rd="gl_FragColor = linearToOutputTexel( gl_FragColor );",ad=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,od=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ld=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,hd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ud=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,dd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,md=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,_d=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Md=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Sd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ed=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Td=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ad=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Rd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Cd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Pd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ld=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Id=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ud=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Nd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Od=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,kd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Vd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Xd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$d=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Yd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,jd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ef=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,rf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,af=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,of=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,df=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ff=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,pf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,mf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,_f=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,wf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Af=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Rf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,If=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ff=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Of=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,kf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Wf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$f=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,qf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Kf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,tp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,np=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ip=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,sp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ap=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,op=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$t={alphahash_fragment:Cu,alphahash_pars_fragment:Pu,alphamap_fragment:Lu,alphamap_pars_fragment:Iu,alphatest_fragment:Du,alphatest_pars_fragment:Uu,aomap_fragment:Nu,aomap_pars_fragment:Fu,batching_pars_vertex:Ou,batching_vertex:ku,begin_vertex:zu,beginnormal_vertex:Bu,bsdfs:Hu,iridescence_fragment:Vu,bumpmap_pars_fragment:Gu,clipping_planes_fragment:Wu,clipping_planes_pars_fragment:Xu,clipping_planes_pars_vertex:$u,clipping_planes_vertex:Yu,color_fragment:qu,color_pars_fragment:Zu,color_pars_vertex:Ku,color_vertex:ju,common:Ju,cube_uv_reflection_fragment:Qu,defaultnormal_vertex:td,displacementmap_pars_vertex:ed,displacementmap_vertex:nd,emissivemap_fragment:id,emissivemap_pars_fragment:sd,colorspace_fragment:rd,colorspace_pars_fragment:ad,envmap_fragment:od,envmap_common_pars_fragment:ld,envmap_pars_fragment:cd,envmap_pars_vertex:hd,envmap_physical_pars_fragment:Md,envmap_vertex:ud,fog_vertex:dd,fog_pars_vertex:fd,fog_fragment:pd,fog_pars_fragment:md,gradientmap_pars_fragment:gd,lightmap_pars_fragment:_d,lights_lambert_fragment:vd,lights_lambert_pars_fragment:xd,lights_pars_begin:yd,lights_toon_fragment:Sd,lights_toon_pars_fragment:bd,lights_phong_fragment:wd,lights_phong_pars_fragment:Ed,lights_physical_fragment:Td,lights_physical_pars_fragment:Ad,lights_fragment_begin:Rd,lights_fragment_maps:Cd,lights_fragment_end:Pd,logdepthbuf_fragment:Ld,logdepthbuf_pars_fragment:Id,logdepthbuf_pars_vertex:Dd,logdepthbuf_vertex:Ud,map_fragment:Nd,map_pars_fragment:Fd,map_particle_fragment:Od,map_particle_pars_fragment:kd,metalnessmap_fragment:zd,metalnessmap_pars_fragment:Bd,morphinstance_vertex:Hd,morphcolor_vertex:Vd,morphnormal_vertex:Gd,morphtarget_pars_vertex:Wd,morphtarget_vertex:Xd,normal_fragment_begin:$d,normal_fragment_maps:Yd,normal_pars_fragment:qd,normal_pars_vertex:Zd,normal_vertex:Kd,normalmap_pars_fragment:jd,clearcoat_normal_fragment_begin:Jd,clearcoat_normal_fragment_maps:Qd,clearcoat_pars_fragment:tf,iridescence_pars_fragment:ef,opaque_fragment:nf,packing:sf,premultiplied_alpha_fragment:rf,project_vertex:af,dithering_fragment:of,dithering_pars_fragment:lf,roughnessmap_fragment:cf,roughnessmap_pars_fragment:hf,shadowmap_pars_fragment:uf,shadowmap_pars_vertex:df,shadowmap_vertex:ff,shadowmask_pars_fragment:pf,skinbase_vertex:mf,skinning_pars_vertex:gf,skinning_vertex:_f,skinnormal_vertex:vf,specularmap_fragment:xf,specularmap_pars_fragment:yf,tonemapping_fragment:Mf,tonemapping_pars_fragment:Sf,transmission_fragment:bf,transmission_pars_fragment:wf,uv_pars_fragment:Ef,uv_pars_vertex:Tf,uv_vertex:Af,worldpos_vertex:Rf,background_vert:Cf,background_frag:Pf,backgroundCube_vert:Lf,backgroundCube_frag:If,cube_vert:Df,cube_frag:Uf,depth_vert:Nf,depth_frag:Ff,distanceRGBA_vert:Of,distanceRGBA_frag:kf,equirect_vert:zf,equirect_frag:Bf,linedashed_vert:Hf,linedashed_frag:Vf,meshbasic_vert:Gf,meshbasic_frag:Wf,meshlambert_vert:Xf,meshlambert_frag:$f,meshmatcap_vert:Yf,meshmatcap_frag:qf,meshnormal_vert:Zf,meshnormal_frag:Kf,meshphong_vert:jf,meshphong_frag:Jf,meshphysical_vert:Qf,meshphysical_frag:tp,meshtoon_vert:ep,meshtoon_frag:np,points_vert:ip,points_frag:sp,shadow_vert:rp,shadow_frag:ap,sprite_vert:op,sprite_frag:lp},gt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},un={basic:{uniforms:Ue([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:Ue([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new qt(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:Ue([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:Ue([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:Ue([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new qt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:Ue([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:Ue([gt.points,gt.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:Ue([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:Ue([gt.common,gt.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:Ue([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:Ue([gt.sprite,gt.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:Ue([gt.common,gt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:Ue([gt.lights,gt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};un.physical={uniforms:Ue([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const zs={r:0,b:0,g:0},Qn=new $e,cp=new ie;function hp(i,t,e,n,s,r,a){const o=new qt(0);let l=r===!0?0:1,c,h,u=null,f=0,p=null;function g(_){let v=_.isScene===!0?_.background:null;return v&&v.isTexture&&(v=(_.backgroundBlurriness>0?e:t).get(v)),v}function y(_){let v=!1;const x=g(_);x===null?d(o,l):x&&x.isColor&&(d(x,1),v=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,a):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(_,v){const x=g(v);x&&(x.isCubeTexture||x.mapping===cr)?(h===void 0&&(h=new st(new Bt(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:Xi(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,E,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Qn.copy(v.backgroundRotation),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(cp.makeRotationFromEuler(Qn)),h.material.toneMapped=te.getTransfer(x.colorSpace)!==le,(u!==x||f!==x.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,p=i.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new st(new an(2,2),new Yn({name:"BackgroundMaterial",uniforms:Xi(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=te.getTransfer(x.colorSpace)!==le,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,f=x.version,p=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function d(_,v){_.getRGB(zs,Mc(i)),n.buffers.color.setClear(zs.r,zs.g,zs.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(_,v=1){o.set(_),l=v,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,d(o,l)},render:y,addToRenderList:m}}function up(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(M,I,B,z,D){let G=!1;const U=u(z,B,I);r!==U&&(r=U,c(r.object)),G=p(M,z,B,D),G&&g(M,z,B,D),D!==null&&t.update(D,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,x(M,I,B,z),D!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,I,B){const z=B.wireframe===!0;let D=n[M.id];D===void 0&&(D={},n[M.id]=D);let G=D[I.id];G===void 0&&(G={},D[I.id]=G);let U=G[z];return U===void 0&&(U=f(l()),G[z]=U),U}function f(M){const I=[],B=[],z=[];for(let D=0;D<e;D++)I[D]=0,B[D]=0,z[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:z,object:M,attributes:{},index:null}}function p(M,I,B,z){const D=r.attributes,G=I.attributes;let U=0;const X=B.getAttributes();for(const F in X)if(X[F].location>=0){const J=D[F];let nt=G[F];if(nt===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&(nt=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&(nt=M.instanceColor)),J===void 0||J.attribute!==nt||nt&&J.data!==nt.data)return!0;U++}return r.attributesNum!==U||r.index!==z}function g(M,I,B,z){const D={},G=I.attributes;let U=0;const X=B.getAttributes();for(const F in X)if(X[F].location>=0){let J=G[F];J===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&(J=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&(J=M.instanceColor));const nt={};nt.attribute=J,J&&J.data&&(nt.data=J.data),D[F]=nt,U++}r.attributes=D,r.attributesNum=U,r.index=z}function y(){const M=r.newAttributes;for(let I=0,B=M.length;I<B;I++)M[I]=0}function m(M){d(M,0)}function d(M,I){const B=r.newAttributes,z=r.enabledAttributes,D=r.attributeDivisors;B[M]=1,z[M]===0&&(i.enableVertexAttribArray(M),z[M]=1),D[M]!==I&&(i.vertexAttribDivisor(M,I),D[M]=I)}function _(){const M=r.newAttributes,I=r.enabledAttributes;for(let B=0,z=I.length;B<z;B++)I[B]!==M[B]&&(i.disableVertexAttribArray(B),I[B]=0)}function v(M,I,B,z,D,G,U){U===!0?i.vertexAttribIPointer(M,I,B,D,G):i.vertexAttribPointer(M,I,B,z,D,G)}function x(M,I,B,z){y();const D=z.attributes,G=B.getAttributes(),U=I.defaultAttributeValues;for(const X in G){const F=G[X];if(F.location>=0){let q=D[X];if(q===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(q=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(q=M.instanceColor)),q!==void 0){const J=q.normalized,nt=q.itemSize,H=t.get(q);if(H===void 0)continue;const dt=H.buffer,W=H.type,Q=H.bytesPerElement,mt=W===i.INT||W===i.UNSIGNED_INT||q.gpuType===ao;if(q.isInterleavedBufferAttribute){const rt=q.data,ft=rt.stride,Ut=q.offset;if(rt.isInstancedInterleavedBuffer){for(let It=0;It<F.locationSize;It++)d(F.location+It,rt.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let It=0;It<F.locationSize;It++)m(F.location+It);i.bindBuffer(i.ARRAY_BUFFER,dt);for(let It=0;It<F.locationSize;It++)v(F.location+It,nt/F.locationSize,W,J,ft*Q,(Ut+nt/F.locationSize*It)*Q,mt)}else{if(q.isInstancedBufferAttribute){for(let rt=0;rt<F.locationSize;rt++)d(F.location+rt,q.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let rt=0;rt<F.locationSize;rt++)m(F.location+rt);i.bindBuffer(i.ARRAY_BUFFER,dt);for(let rt=0;rt<F.locationSize;rt++)v(F.location+rt,nt/F.locationSize,W,J,nt*Q,nt/F.locationSize*rt*Q,mt)}}else if(U!==void 0){const J=U[X];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(F.location,J);break;case 3:i.vertexAttrib3fv(F.location,J);break;case 4:i.vertexAttrib4fv(F.location,J);break;default:i.vertexAttrib1fv(F.location,J)}}}}_()}function L(){R();for(const M in n){const I=n[M];for(const B in I){const z=I[B];for(const D in z)h(z[D].object),delete z[D];delete I[B]}delete n[M]}}function E(M){if(n[M.id]===void 0)return;const I=n[M.id];for(const B in I){const z=I[B];for(const D in z)h(z[D].object),delete z[D];delete I[B]}delete n[M.id]}function T(M){for(const I in n){const B=n[I];if(B[M.id]===void 0)continue;const z=B[M.id];for(const D in z)h(z[D].object),delete z[D];delete B[M.id]}}function R(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:b,dispose:L,releaseStatesOfGeometry:E,releaseStatesOfProgram:T,initAttributes:y,enableAttribute:m,disableUnusedAttributes:_}}function dp(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function l(c,h,u,f){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let y=0;y<u;y++)g+=h[y]*f[y];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function fp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(T){return!(T!==sn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const R=T===gs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Cn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Tn&&!R)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:_,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:L,maxSamples:E}}function pp(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Bn,o=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const _=r?0:n,v=_*4;let x=d.clippingState||null;l.value=x,x=h(g,f,v,p);for(let L=0;L!==v;++L)x[L]=e[L];d.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,p,g){const y=u!==null?u.length:0;let m=null;if(y!==0){if(m=l.value,g!==!0||m===null){const d=p+y*4,_=f.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<d)&&(m=new Float32Array(d));for(let v=0,x=p;v!==y;++v,x+=4)a.copy(u[v]).applyMatrix4(_,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}function mp(i){let t=new WeakMap;function e(a,o){return o===ma?a.mapping=Hi:o===ga&&(a.mapping=Vi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ma||o===ga)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Eu(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Ec extends Sc{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ui=4,cl=[.125,.215,.35,.446,.526,.582],ri=20,zr=new Ec,hl=new qt;let Br=null,Hr=0,Vr=0,Gr=!1;const ii=(1+Math.sqrt(5))/2,Ri=1/ii,ul=[new P(-ii,Ri,0),new P(ii,Ri,0),new P(-Ri,0,ii),new P(Ri,0,ii),new P(0,ii,-Ri),new P(0,ii,Ri),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class dl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Br=this._renderer.getRenderTarget(),Hr=this._renderer.getActiveCubeFace(),Vr=this._renderer.getActiveMipmapLevel(),Gr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Br,Hr,Vr),this._renderer.xr.enabled=Gr,t.scissorTest=!1,Bs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hi||t.mapping===Vi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Br=this._renderer.getRenderTarget(),Hr=this._renderer.getActiveCubeFace(),Vr=this._renderer.getActiveMipmapLevel(),Gr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:pn,minFilter:pn,generateMipmaps:!1,type:gs,format:sn,colorSpace:$i,depthBuffer:!1},s=fl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gp(r)),this._blurMaterial=_p(r,t,e)}return s}_compileMaterial(t){const e=new st(this._lodPlanes[0],t);this._renderer.compile(e,zr)}_sceneToCubeUV(t,e,n,s){const o=new We(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(hl),h.toneMapping=Gn,h.autoClear=!1;const p=new Be({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1}),g=new st(new Bt,p);let y=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,y=!0):(p.color.copy(hl),y=!0);for(let d=0;d<6;d++){const _=d%3;_===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):_===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const v=this._cubeSize;Bs(s,_*v,d>2?v:0,v,v),h.setRenderTarget(s),y&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Hi||t.mapping===Vi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ml()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new st(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Bs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,zr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=ul[(s-r-1)%ul.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new st(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ri-1),y=r/g,m=isFinite(r)?1+Math.floor(h*y):ri;m>ri&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ri}`);const d=[];let _=0;for(let T=0;T<ri;++T){const R=T/y,b=Math.exp(-R*R/2);d.push(b),T===0?_+=b:T<m&&(_+=2*b)}for(let T=0;T<d.length;T++)d[T]=d[T]/_;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const x=this._sizeLods[s],L=3*x*(s>v-Ui?s-v+Ui:0),E=4*(this._cubeSize-x);Bs(e,L,E,3*x,2*x),l.setRenderTarget(e),l.render(u,zr)}}function gp(i){const t=[],e=[],n=[];let s=i;const r=i-Ui+1+cl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Ui?l=cl[a-i+Ui-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,y=3,m=2,d=1,_=new Float32Array(y*g*p),v=new Float32Array(m*g*p),x=new Float32Array(d*g*p);for(let E=0;E<p;E++){const T=E%3*2/3-1,R=E>2?0:-1,b=[T,R,0,T+2/3,R,0,T+2/3,R+1,0,T,R,0,T+2/3,R+1,0,T,R+1,0];_.set(b,y*g*E),v.set(f,m*g*E);const M=[E,E,E,E,E,E];x.set(M,d*g*E)}const L=new Ae;L.setAttribute("position",new Xe(_,y)),L.setAttribute("uv",new Xe(v,m)),L.setAttribute("faceIndex",new Xe(x,d)),t.push(L),s>Ui&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function fl(i,t,e){const n=new hi(i,t,e);return n.texture.mapping=cr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function _p(i,t,e){const n=new Float32Array(ri),s=new P(0,1,0);return new Yn({name:"SphericalGaussianBlur",defines:{n:ri,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:_o(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function pl(){return new Yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_o(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function ml(){return new Yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_o(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function _o(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function vp(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ma||l===ga,h=l===Hi||l===Vi;if(c||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new dl(i)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new dl(i)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function xp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&as("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function yp(i,t,e,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const y=f.morphAttributes[g];for(let m=0,d=y.length;m<d;m++)t.remove(y[m])}f.removeEventListener("dispose",a),delete s[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const y=p[g];for(let m=0,d=y.length;m<d;m++)t.update(y[m],i.ARRAY_BUFFER)}}function c(u){const f=[],p=u.index,g=u.attributes.position;let y=0;if(p!==null){const _=p.array;y=p.version;for(let v=0,x=_.length;v<x;v+=3){const L=_[v+0],E=_[v+1],T=_[v+2];f.push(L,E,E,T,T,L)}}else if(g!==void 0){const _=g.array;y=g.version;for(let v=0,x=_.length/3-1;v<x;v+=3){const L=v+0,E=v+1,T=v+2;f.push(L,E,E,T,T,L)}}else return;const m=new(pc(f)?yc:xc)(f,1);m.version=y;const d=r.get(u);d&&t.remove(d),r.set(u,m)}function h(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Mp(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,p){i.drawElements(n,p,r,f*a),e.update(p,n,1)}function c(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*a,g),e.update(p,n,g))}function h(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,n,1)}function u(f,p,g,y){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/a,p[d],y[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,y,0,g);let d=0;for(let _=0;_<g;_++)d+=p[_]*y[_];e.update(d,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Sp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function bp(i,t,e){const n=new WeakMap,s=new ge;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let M=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var p=M;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),y===!0&&(x=2),m===!0&&(x=3);let L=o.attributes.position.count*x,E=1;L>t.maxTextureSize&&(E=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const T=new Float32Array(L*E*4*u),R=new gc(T,L,E,u);R.type=Tn,R.needsUpdate=!0;const b=x*4;for(let I=0;I<u;I++){const B=d[I],z=_[I],D=v[I],G=L*E*4*I;for(let U=0;U<B.count;U++){const X=U*b;g===!0&&(s.fromBufferAttribute(B,U),T[G+X+0]=s.x,T[G+X+1]=s.y,T[G+X+2]=s.z,T[G+X+3]=0),y===!0&&(s.fromBufferAttribute(z,U),T[G+X+4]=s.x,T[G+X+5]=s.y,T[G+X+6]=s.z,T[G+X+7]=0),m===!0&&(s.fromBufferAttribute(D,U),T[G+X+8]=s.x,T[G+X+9]=s.y,T[G+X+10]=s.z,T[G+X+11]=D.itemSize===4?s.w:1)}}f={count:u,texture:R,size:new ut(L,E)},n.set(o,f),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const y=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",y),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function wp(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class Tc extends Ne{constructor(t,e,n,s,r,a,o,l,c,h=ki){if(h!==ki&&h!==Wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ki&&(n=ci),n===void 0&&h===Wi&&(n=Gi),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:rn,this.minFilter=l!==void 0?l:rn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Ac=new Ne,gl=new Tc(1,1),Rc=new gc,Cc=new cu,Pc=new bc,_l=[],vl=[],xl=new Float32Array(16),yl=new Float32Array(9),Ml=new Float32Array(4);function Ki(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=_l[s];if(r===void 0&&(r=new Float32Array(s),_l[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function xe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ye(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ur(i,t){let e=vl[t];e===void 0&&(e=new Int32Array(t),vl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Ep(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Tp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2fv(this.addr,t),ye(e,t)}}function Ap(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(xe(e,t))return;i.uniform3fv(this.addr,t),ye(e,t)}}function Rp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4fv(this.addr,t),ye(e,t)}}function Cp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;Ml.set(n),i.uniformMatrix2fv(this.addr,!1,Ml),ye(e,n)}}function Pp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;yl.set(n),i.uniformMatrix3fv(this.addr,!1,yl),ye(e,n)}}function Lp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;xl.set(n),i.uniformMatrix4fv(this.addr,!1,xl),ye(e,n)}}function Ip(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Dp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2iv(this.addr,t),ye(e,t)}}function Up(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;i.uniform3iv(this.addr,t),ye(e,t)}}function Np(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4iv(this.addr,t),ye(e,t)}}function Fp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Op(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2uiv(this.addr,t),ye(e,t)}}function kp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;i.uniform3uiv(this.addr,t),ye(e,t)}}function zp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4uiv(this.addr,t),ye(e,t)}}function Bp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(gl.compareFunction=fc,r=gl):r=Ac,e.setTexture2D(t||r,s)}function Hp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Cc,s)}function Vp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Pc,s)}function Gp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Rc,s)}function Wp(i){switch(i){case 5126:return Ep;case 35664:return Tp;case 35665:return Ap;case 35666:return Rp;case 35674:return Cp;case 35675:return Pp;case 35676:return Lp;case 5124:case 35670:return Ip;case 35667:case 35671:return Dp;case 35668:case 35672:return Up;case 35669:case 35673:return Np;case 5125:return Fp;case 36294:return Op;case 36295:return kp;case 36296:return zp;case 35678:case 36198:case 36298:case 36306:case 35682:return Bp;case 35679:case 36299:case 36307:return Hp;case 35680:case 36300:case 36308:case 36293:return Vp;case 36289:case 36303:case 36311:case 36292:return Gp}}function Xp(i,t){i.uniform1fv(this.addr,t)}function $p(i,t){const e=Ki(t,this.size,2);i.uniform2fv(this.addr,e)}function Yp(i,t){const e=Ki(t,this.size,3);i.uniform3fv(this.addr,e)}function qp(i,t){const e=Ki(t,this.size,4);i.uniform4fv(this.addr,e)}function Zp(i,t){const e=Ki(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Kp(i,t){const e=Ki(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function jp(i,t){const e=Ki(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Jp(i,t){i.uniform1iv(this.addr,t)}function Qp(i,t){i.uniform2iv(this.addr,t)}function tm(i,t){i.uniform3iv(this.addr,t)}function em(i,t){i.uniform4iv(this.addr,t)}function nm(i,t){i.uniform1uiv(this.addr,t)}function im(i,t){i.uniform2uiv(this.addr,t)}function sm(i,t){i.uniform3uiv(this.addr,t)}function rm(i,t){i.uniform4uiv(this.addr,t)}function am(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Ac,r[a])}function om(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Cc,r[a])}function lm(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Pc,r[a])}function cm(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Rc,r[a])}function hm(i){switch(i){case 5126:return Xp;case 35664:return $p;case 35665:return Yp;case 35666:return qp;case 35674:return Zp;case 35675:return Kp;case 35676:return jp;case 5124:case 35670:return Jp;case 35667:case 35671:return Qp;case 35668:case 35672:return tm;case 35669:case 35673:return em;case 5125:return nm;case 36294:return im;case 36295:return sm;case 36296:return rm;case 35678:case 36198:case 36298:case 36306:case 35682:return am;case 35679:case 36299:case 36307:return om;case 35680:case 36300:case 36308:case 36293:return lm;case 36289:case 36303:case 36311:case 36292:return cm}}class um{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Wp(e.type)}}class dm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=hm(e.type)}}class fm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Wr=/(\w+)(\])?(\[|\.)?/g;function Sl(i,t){i.seq.push(t),i.map[t.id]=t}function pm(i,t,e){const n=i.name,s=n.length;for(Wr.lastIndex=0;;){const r=Wr.exec(n),a=Wr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Sl(e,c===void 0?new um(o,i,t):new dm(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new fm(o),Sl(e,u)),e=u}}}class tr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);pm(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function bl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const mm=37297;let gm=0;function _m(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const wl=new Gt;function vm(i){te._getMatrix(wl,te.workingColorSpace,i);const t=`mat3( ${wl.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(i)){case hr:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function El(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+_m(i.getShaderSource(t),a)}else return s}function xm(i,t){const e=vm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function ym(i,t){let e;switch(t){case Oh:e="Linear";break;case kh:e="Reinhard";break;case zh:e="Cineon";break;case ro:e="ACESFilmic";break;case Hh:e="AgX";break;case Vh:e="Neutral";break;case Bh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Hs=new P;function Mm(){te.getLuminanceCoefficients(Hs);const i=Hs.x.toFixed(4),t=Hs.y.toFixed(4),e=Hs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(os).join(`
`)}function bm(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function wm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function os(i){return i!==""}function Tl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Al(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Em=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xa(i){return i.replace(Em,Am)}const Tm=new Map;function Am(i,t){let e=$t[t];if(e===void 0){const n=Tm.get(t);if(n!==void 0)e=$t[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Xa(e)}const Rm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rl(i){return i.replace(Rm,Cm)}function Cm(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Cl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Pm(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===tc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===ec?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===En&&(t="SHADOWMAP_TYPE_VSM"),t}function Lm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hi:case Vi:t="ENVMAP_TYPE_CUBE";break;case cr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Im(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Vi:t="ENVMAP_MODE_REFRACTION";break}return t}function Dm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case lr:t="ENVMAP_BLENDING_MULTIPLY";break;case Nh:t="ENVMAP_BLENDING_MIX";break;case Fh:t="ENVMAP_BLENDING_ADD";break}return t}function Um(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Nm(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Pm(e),c=Lm(e),h=Im(e),u=Dm(e),f=Um(e),p=Sm(e),g=bm(r),y=s.createProgram();let m,d,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(os).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(os).join(`
`),d.length>0&&(d+=`
`)):(m=[Cl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(os).join(`
`),d=[Cl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Gn?"#define TONE_MAPPING":"",e.toneMapping!==Gn?$t.tonemapping_pars_fragment:"",e.toneMapping!==Gn?ym("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,xm("linearToOutputTexel",e.outputColorSpace),Mm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(os).join(`
`)),a=Xa(a),a=Tl(a,e),a=Al(a,e),o=Xa(o),o=Tl(o,e),o=Al(o,e),a=Rl(a),o=Rl(o),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Vo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Vo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const v=_+m+a,x=_+d+o,L=bl(s,s.VERTEX_SHADER,v),E=bl(s,s.FRAGMENT_SHADER,x);s.attachShader(y,L),s.attachShader(y,E),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function T(I){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(y).trim(),z=s.getShaderInfoLog(L).trim(),D=s.getShaderInfoLog(E).trim();let G=!0,U=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,L,E);else{const X=El(s,L,"vertex"),F=El(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+B+`
`+X+`
`+F)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(z===""||D==="")&&(U=!1);U&&(I.diagnostics={runnable:G,programLog:B,vertexShader:{log:z,prefix:m},fragmentShader:{log:D,prefix:d}})}s.deleteShader(L),s.deleteShader(E),R=new tr(s,y),b=wm(s,y)}let R;this.getUniforms=function(){return R===void 0&&T(this),R};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(y,mm)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=gm++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=L,this.fragmentShader=E,this}let Fm=0;class Om{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new km(t),e.set(t,n)),n}}class km{constructor(t){this.id=Fm++,this.code=t,this.usedTimes=0}}function zm(i,t,e,n,s,r,a){const o=new mo,l=new Om,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,M,I,B,z){const D=B.fog,G=z.geometry,U=b.isMeshStandardMaterial?B.environment:null,X=(b.isMeshStandardMaterial?e:t).get(b.envMap||U),F=X&&X.mapping===cr?X.image.height:null,q=g[b.type];b.precision!==null&&(p=s.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));const J=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,nt=J!==void 0?J.length:0;let H=0;G.morphAttributes.position!==void 0&&(H=1),G.morphAttributes.normal!==void 0&&(H=2),G.morphAttributes.color!==void 0&&(H=3);let dt,W,Q,mt;if(q){const oe=un[q];dt=oe.vertexShader,W=oe.fragmentShader}else dt=b.vertexShader,W=b.fragmentShader,l.update(b),Q=l.getVertexShaderID(b),mt=l.getFragmentShaderID(b);const rt=i.getRenderTarget(),ft=i.state.buffers.depth.getReversed(),Ut=z.isInstancedMesh===!0,It=z.isBatchedMesh===!0,Wt=!!b.map,tt=!!b.matcap,ot=!!X,C=!!b.aoMap,At=!!b.lightMap,at=!!b.bumpMap,_t=!!b.normalMap,ct=!!b.displacementMap,Nt=!!b.emissiveMap,bt=!!b.metalnessMap,A=!!b.roughnessMap,S=b.anisotropy>0,V=b.clearcoat>0,K=b.dispersion>0,it=b.iridescence>0,j=b.sheen>0,Rt=b.transmission>0,vt=S&&!!b.anisotropyMap,wt=V&&!!b.clearcoatMap,Kt=V&&!!b.clearcoatNormalMap,lt=V&&!!b.clearcoatRoughnessMap,Et=it&&!!b.iridescenceMap,Ft=it&&!!b.iridescenceThicknessMap,kt=j&&!!b.sheenColorMap,Tt=j&&!!b.sheenRoughnessMap,jt=!!b.specularMap,Xt=!!b.specularColorMap,ce=!!b.specularIntensityMap,N=Rt&&!!b.transmissionMap,xt=Rt&&!!b.thicknessMap,Z=!!b.gradientMap,et=!!b.alphaMap,St=b.alphaTest>0,yt=!!b.alphaHash,Ht=!!b.extensions;let me=Gn;b.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(me=i.toneMapping);const Re={shaderID:q,shaderType:b.type,shaderName:b.name,vertexShader:dt,fragmentShader:W,defines:b.defines,customVertexShaderID:Q,customFragmentShaderID:mt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:It,batchingColor:It&&z._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&z.instanceColor!==null,instancingMorph:Ut&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:rt===null?i.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:$i,alphaToCoverage:!!b.alphaToCoverage,map:Wt,matcap:tt,envMap:ot,envMapMode:ot&&X.mapping,envMapCubeUVHeight:F,aoMap:C,lightMap:At,bumpMap:at,normalMap:_t,displacementMap:f&&ct,emissiveMap:Nt,normalMapObjectSpace:_t&&b.normalMapType===$h,normalMapTangentSpace:_t&&b.normalMapType===fo,metalnessMap:bt,roughnessMap:A,anisotropy:S,anisotropyMap:vt,clearcoat:V,clearcoatMap:wt,clearcoatNormalMap:Kt,clearcoatRoughnessMap:lt,dispersion:K,iridescence:it,iridescenceMap:Et,iridescenceThicknessMap:Ft,sheen:j,sheenColorMap:kt,sheenRoughnessMap:Tt,specularMap:jt,specularColorMap:Xt,specularIntensityMap:ce,transmission:Rt,transmissionMap:N,thicknessMap:xt,gradientMap:Z,opaque:b.transparent===!1&&b.blending===Oi&&b.alphaToCoverage===!1,alphaMap:et,alphaTest:St,alphaHash:yt,combine:b.combine,mapUv:Wt&&y(b.map.channel),aoMapUv:C&&y(b.aoMap.channel),lightMapUv:At&&y(b.lightMap.channel),bumpMapUv:at&&y(b.bumpMap.channel),normalMapUv:_t&&y(b.normalMap.channel),displacementMapUv:ct&&y(b.displacementMap.channel),emissiveMapUv:Nt&&y(b.emissiveMap.channel),metalnessMapUv:bt&&y(b.metalnessMap.channel),roughnessMapUv:A&&y(b.roughnessMap.channel),anisotropyMapUv:vt&&y(b.anisotropyMap.channel),clearcoatMapUv:wt&&y(b.clearcoatMap.channel),clearcoatNormalMapUv:Kt&&y(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&y(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&y(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ft&&y(b.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&y(b.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&y(b.sheenRoughnessMap.channel),specularMapUv:jt&&y(b.specularMap.channel),specularColorMapUv:Xt&&y(b.specularColorMap.channel),specularIntensityMapUv:ce&&y(b.specularIntensityMap.channel),transmissionMapUv:N&&y(b.transmissionMap.channel),thicknessMapUv:xt&&y(b.thicknessMap.channel),alphaMapUv:et&&y(b.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(_t||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!G.attributes.uv&&(Wt||et),fog:!!D,useFog:b.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ft,skinning:z.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:nt,morphTextureStride:H,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:me,decodeVideoTexture:Wt&&b.map.isVideoTexture===!0&&te.getTransfer(b.map.colorSpace)===le,decodeVideoTextureEmissive:Nt&&b.emissiveMap.isVideoTexture===!0&&te.getTransfer(b.emissiveMap.colorSpace)===le,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===en,flipSided:b.side===ze,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ht&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&b.extensions.multiDraw===!0||It)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Re.vertexUv1s=c.has(1),Re.vertexUv2s=c.has(2),Re.vertexUv3s=c.has(3),c.clear(),Re}function d(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)M.push(I),M.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(_(M,b),v(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function _(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function v(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function x(b){const M=g[b.type];let I;if(M){const B=un[M];I=Mu.clone(B.uniforms)}else I=b.uniforms;return I}function L(b,M){let I;for(let B=0,z=h.length;B<z;B++){const D=h[B];if(D.cacheKey===M){I=D,++I.usedTimes;break}}return I===void 0&&(I=new Nm(i,M,b,r),h.push(I)),I}function E(b){if(--b.usedTimes===0){const M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function T(b){l.remove(b)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:x,acquireProgram:L,releaseProgram:E,releaseShaderCache:T,programs:h,dispose:R}}function Bm(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Hm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Pl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ll(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,f,p,g,y,m){let d=i[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:y,group:m},i[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=y,d.group=m),t++,d}function o(u,f,p,g,y,m){const d=a(u,f,p,g,y,m);p.transmission>0?n.push(d):p.transparent===!0?s.push(d):e.push(d)}function l(u,f,p,g,y,m){const d=a(u,f,p,g,y,m);p.transmission>0?n.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function c(u,f){e.length>1&&e.sort(u||Hm),n.length>1&&n.sort(f||Pl),s.length>1&&s.sort(f||Pl)}function h(){for(let u=t,f=i.length;u<f;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function Vm(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Ll,i.set(n,[a])):s>=r.length?(a=new Ll,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Gm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new qt};break;case"SpotLight":e={position:new P,direction:new P,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function Wm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Xm=0;function $m(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Ym(i){const t=new Gm,e=Wm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const s=new P,r=new ie,a=new ie;function o(c){let h=0,u=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let p=0,g=0,y=0,m=0,d=0,_=0,v=0,x=0,L=0,E=0,T=0;c.sort($m);for(let b=0,M=c.length;b<M;b++){const I=c[b],B=I.color,z=I.intensity,D=I.distance,G=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=B.r*z,u+=B.g*z,f+=B.b*z;else if(I.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(I.sh.coefficients[U],z);T++}else if(I.isDirectionalLight){const U=t.get(I);if(U.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const X=I.shadow,F=e.get(I);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,n.directionalShadow[p]=F,n.directionalShadowMap[p]=G,n.directionalShadowMatrix[p]=I.shadow.matrix,_++}n.directional[p]=U,p++}else if(I.isSpotLight){const U=t.get(I);U.position.setFromMatrixPosition(I.matrixWorld),U.color.copy(B).multiplyScalar(z),U.distance=D,U.coneCos=Math.cos(I.angle),U.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),U.decay=I.decay,n.spot[y]=U;const X=I.shadow;if(I.map&&(n.spotLightMap[L]=I.map,L++,X.updateMatrices(I),I.castShadow&&E++),n.spotLightMatrix[y]=X.matrix,I.castShadow){const F=e.get(I);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,n.spotShadow[y]=F,n.spotShadowMap[y]=G,x++}y++}else if(I.isRectAreaLight){const U=t.get(I);U.color.copy(B).multiplyScalar(z),U.halfWidth.set(I.width*.5,0,0),U.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=U,m++}else if(I.isPointLight){const U=t.get(I);if(U.color.copy(I.color).multiplyScalar(I.intensity),U.distance=I.distance,U.decay=I.decay,I.castShadow){const X=I.shadow,F=e.get(I);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,F.shadowCameraNear=X.camera.near,F.shadowCameraFar=X.camera.far,n.pointShadow[g]=F,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=I.shadow.matrix,v++}n.point[g]=U,g++}else if(I.isHemisphereLight){const U=t.get(I);U.skyColor.copy(I.color).multiplyScalar(z),U.groundColor.copy(I.groundColor).multiplyScalar(z),n.hemi[d]=U,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=gt.LTC_FLOAT_1,n.rectAreaLTC2=gt.LTC_FLOAT_2):(n.rectAreaLTC1=gt.LTC_HALF_1,n.rectAreaLTC2=gt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const R=n.hash;(R.directionalLength!==p||R.pointLength!==g||R.spotLength!==y||R.rectAreaLength!==m||R.hemiLength!==d||R.numDirectionalShadows!==_||R.numPointShadows!==v||R.numSpotShadows!==x||R.numSpotMaps!==L||R.numLightProbes!==T)&&(n.directional.length=p,n.spot.length=y,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+L-E,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=T,R.directionalLength=p,R.pointLength=g,R.spotLength=y,R.rectAreaLength=m,R.hemiLength=d,R.numDirectionalShadows=_,R.numPointShadows=v,R.numSpotShadows=x,R.numSpotMaps=L,R.numLightProbes=T,n.version=Xm++)}function l(c,h){let u=0,f=0,p=0,g=0,y=0;const m=h.matrixWorldInverse;for(let d=0,_=c.length;d<_;d++){const v=c[d];if(v.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(v.isSpotLight){const x=n.spot[p];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),p++}else if(v.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(v.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){const x=n.hemi[y];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(m),y++}}}return{setup:o,setupView:l,state:n}}function Il(i){const t=new Ym(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function qm(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Il(i),t.set(s,[o])):r>=a.length?(o=new Il(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Zm extends Zi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Wh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Km extends Zi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const jm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Qm(i,t,e){let n=new go;const s=new ut,r=new ut,a=new ge,o=new Zm({depthPacking:Xh}),l=new Km,c={},h=e.maxTextureSize,u={[$n]:ze,[ze]:$n,[en]:en},f=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:jm,fragmentShader:Jm}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ae;g.setAttribute("position",new Xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new st(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tc;let d=this.type;this.render=function(E,T,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const b=i.getRenderTarget(),M=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Vn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const z=d!==En&&this.type===En,D=d===En&&this.type!==En;for(let G=0,U=E.length;G<U;G++){const X=E[G],F=X.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);const q=F.getFrameExtents();if(s.multiply(q),r.copy(F.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,F.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,F.mapSize.y=r.y)),F.map===null||z===!0||D===!0){const nt=this.type!==En?{minFilter:rn,magFilter:rn}:{};F.map!==null&&F.map.dispose(),F.map=new hi(s.x,s.y,nt),F.map.texture.name=X.name+".shadowMap",F.camera.updateProjectionMatrix()}i.setRenderTarget(F.map),i.clear();const J=F.getViewportCount();for(let nt=0;nt<J;nt++){const H=F.getViewport(nt);a.set(r.x*H.x,r.y*H.y,r.x*H.z,r.y*H.w),B.viewport(a),F.updateMatrices(X,nt),n=F.getFrustum(),x(T,R,F.camera,X,this.type)}F.isPointLightShadow!==!0&&this.type===En&&_(F,R),F.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,I)};function _(E,T){const R=t.update(y);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new hi(s.x,s.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(T,null,R,f,y,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(T,null,R,p,y,null)}function v(E,T,R,b){let M=null;const I=R.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)M=I;else if(M=R.isPointLight===!0?l:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const B=M.uuid,z=T.uuid;let D=c[B];D===void 0&&(D={},c[B]=D);let G=D[z];G===void 0&&(G=M.clone(),D[z]=G,T.addEventListener("dispose",L)),M=G}if(M.visible=T.visible,M.wireframe=T.wireframe,b===En?M.side=T.shadowSide!==null?T.shadowSide:T.side:M.side=T.shadowSide!==null?T.shadowSide:u[T.side],M.alphaMap=T.alphaMap,M.alphaTest=T.alphaTest,M.map=T.map,M.clipShadows=T.clipShadows,M.clippingPlanes=T.clippingPlanes,M.clipIntersection=T.clipIntersection,M.displacementMap=T.displacementMap,M.displacementScale=T.displacementScale,M.displacementBias=T.displacementBias,M.wireframeLinewidth=T.wireframeLinewidth,M.linewidth=T.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const B=i.properties.get(M);B.light=R}return M}function x(E,T,R,b,M){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===En)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,E.matrixWorld);const z=t.update(E),D=E.material;if(Array.isArray(D)){const G=z.groups;for(let U=0,X=G.length;U<X;U++){const F=G[U],q=D[F.materialIndex];if(q&&q.visible){const J=v(E,q,b,M);E.onBeforeShadow(i,E,T,R,z,J,F),i.renderBufferDirect(R,null,z,J,E,F),E.onAfterShadow(i,E,T,R,z,J,F)}}}else if(D.visible){const G=v(E,D,b,M);E.onBeforeShadow(i,E,T,R,z,G,null),i.renderBufferDirect(R,null,z,G,E,null),E.onAfterShadow(i,E,T,R,z,G,null)}}const B=E.children;for(let z=0,D=B.length;z<D;z++)x(B[z],T,R,b,M)}function L(E){E.target.removeEventListener("dispose",L);for(const R in c){const b=c[R],M=E.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const t0={[la]:ca,[ha]:fa,[ua]:pa,[Bi]:da,[ca]:la,[fa]:ha,[pa]:ua,[da]:Bi};function e0(i,t){function e(){let N=!1;const xt=new ge;let Z=null;const et=new ge(0,0,0,0);return{setMask:function(St){Z!==St&&!N&&(i.colorMask(St,St,St,St),Z=St)},setLocked:function(St){N=St},setClear:function(St,yt,Ht,me,Re){Re===!0&&(St*=me,yt*=me,Ht*=me),xt.set(St,yt,Ht,me),et.equals(xt)===!1&&(i.clearColor(St,yt,Ht,me),et.copy(xt))},reset:function(){N=!1,Z=null,et.set(-1,0,0,0)}}}function n(){let N=!1,xt=!1,Z=null,et=null,St=null;return{setReversed:function(yt){if(xt!==yt){const Ht=t.get("EXT_clip_control");xt?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT);const me=St;St=null,this.setClear(me)}xt=yt},getReversed:function(){return xt},setTest:function(yt){yt?rt(i.DEPTH_TEST):ft(i.DEPTH_TEST)},setMask:function(yt){Z!==yt&&!N&&(i.depthMask(yt),Z=yt)},setFunc:function(yt){if(xt&&(yt=t0[yt]),et!==yt){switch(yt){case la:i.depthFunc(i.NEVER);break;case ca:i.depthFunc(i.ALWAYS);break;case ha:i.depthFunc(i.LESS);break;case Bi:i.depthFunc(i.LEQUAL);break;case ua:i.depthFunc(i.EQUAL);break;case da:i.depthFunc(i.GEQUAL);break;case fa:i.depthFunc(i.GREATER);break;case pa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}et=yt}},setLocked:function(yt){N=yt},setClear:function(yt){St!==yt&&(xt&&(yt=1-yt),i.clearDepth(yt),St=yt)},reset:function(){N=!1,Z=null,et=null,St=null,xt=!1}}}function s(){let N=!1,xt=null,Z=null,et=null,St=null,yt=null,Ht=null,me=null,Re=null;return{setTest:function(oe){N||(oe?rt(i.STENCIL_TEST):ft(i.STENCIL_TEST))},setMask:function(oe){xt!==oe&&!N&&(i.stencilMask(oe),xt=oe)},setFunc:function(oe,Ze,vn){(Z!==oe||et!==Ze||St!==vn)&&(i.stencilFunc(oe,Ze,vn),Z=oe,et=Ze,St=vn)},setOp:function(oe,Ze,vn){(yt!==oe||Ht!==Ze||me!==vn)&&(i.stencilOp(oe,Ze,vn),yt=oe,Ht=Ze,me=vn)},setLocked:function(oe){N=oe},setClear:function(oe){Re!==oe&&(i.clearStencil(oe),Re=oe)},reset:function(){N=!1,xt=null,Z=null,et=null,St=null,yt=null,Ht=null,me=null,Re=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,p=[],g=null,y=!1,m=null,d=null,_=null,v=null,x=null,L=null,E=null,T=new qt(0,0,0),R=0,b=!1,M=null,I=null,B=null,z=null,D=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,X=0;const F=i.getParameter(i.VERSION);F.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(F)[1]),U=X>=1):F.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),U=X>=2);let q=null,J={};const nt=i.getParameter(i.SCISSOR_BOX),H=i.getParameter(i.VIEWPORT),dt=new ge().fromArray(nt),W=new ge().fromArray(H);function Q(N,xt,Z,et){const St=new Uint8Array(4),yt=i.createTexture();i.bindTexture(N,yt),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ht=0;Ht<Z;Ht++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(xt,0,i.RGBA,1,1,et,0,i.RGBA,i.UNSIGNED_BYTE,St):i.texImage2D(xt+Ht,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,St);return yt}const mt={};mt[i.TEXTURE_2D]=Q(i.TEXTURE_2D,i.TEXTURE_2D,1),mt[i.TEXTURE_CUBE_MAP]=Q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[i.TEXTURE_2D_ARRAY]=Q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),mt[i.TEXTURE_3D]=Q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),rt(i.DEPTH_TEST),a.setFunc(Bi),at(!1),_t(Fo),rt(i.CULL_FACE),C(Vn);function rt(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function ft(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Ut(N,xt){return u[N]!==xt?(i.bindFramebuffer(N,xt),u[N]=xt,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=xt),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=xt),!0):!1}function It(N,xt){let Z=p,et=!1;if(N){Z=f.get(xt),Z===void 0&&(Z=[],f.set(xt,Z));const St=N.textures;if(Z.length!==St.length||Z[0]!==i.COLOR_ATTACHMENT0){for(let yt=0,Ht=St.length;yt<Ht;yt++)Z[yt]=i.COLOR_ATTACHMENT0+yt;Z.length=St.length,et=!0}}else Z[0]!==i.BACK&&(Z[0]=i.BACK,et=!0);et&&i.drawBuffers(Z)}function Wt(N){return g!==N?(i.useProgram(N),g=N,!0):!1}const tt={[si]:i.FUNC_ADD,[vh]:i.FUNC_SUBTRACT,[xh]:i.FUNC_REVERSE_SUBTRACT};tt[yh]=i.MIN,tt[Mh]=i.MAX;const ot={[Sh]:i.ZERO,[bh]:i.ONE,[wh]:i.SRC_COLOR,[aa]:i.SRC_ALPHA,[Ph]:i.SRC_ALPHA_SATURATE,[Rh]:i.DST_COLOR,[Th]:i.DST_ALPHA,[Eh]:i.ONE_MINUS_SRC_COLOR,[oa]:i.ONE_MINUS_SRC_ALPHA,[Ch]:i.ONE_MINUS_DST_COLOR,[Ah]:i.ONE_MINUS_DST_ALPHA,[Lh]:i.CONSTANT_COLOR,[Ih]:i.ONE_MINUS_CONSTANT_COLOR,[Dh]:i.CONSTANT_ALPHA,[Uh]:i.ONE_MINUS_CONSTANT_ALPHA};function C(N,xt,Z,et,St,yt,Ht,me,Re,oe){if(N===Vn){y===!0&&(ft(i.BLEND),y=!1);return}if(y===!1&&(rt(i.BLEND),y=!0),N!==_h){if(N!==m||oe!==b){if((d!==si||x!==si)&&(i.blendEquation(i.FUNC_ADD),d=si,x=si),oe)switch(N){case Oi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oo:i.blendFunc(i.ONE,i.ONE);break;case ko:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Oi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ko:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}_=null,v=null,L=null,E=null,T.set(0,0,0),R=0,m=N,b=oe}return}St=St||xt,yt=yt||Z,Ht=Ht||et,(xt!==d||St!==x)&&(i.blendEquationSeparate(tt[xt],tt[St]),d=xt,x=St),(Z!==_||et!==v||yt!==L||Ht!==E)&&(i.blendFuncSeparate(ot[Z],ot[et],ot[yt],ot[Ht]),_=Z,v=et,L=yt,E=Ht),(me.equals(T)===!1||Re!==R)&&(i.blendColor(me.r,me.g,me.b,Re),T.copy(me),R=Re),m=N,b=!1}function At(N,xt){N.side===en?ft(i.CULL_FACE):rt(i.CULL_FACE);let Z=N.side===ze;xt&&(Z=!Z),at(Z),N.blending===Oi&&N.transparent===!1?C(Vn):C(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);const et=N.stencilWrite;o.setTest(et),et&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Nt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?rt(i.SAMPLE_ALPHA_TO_COVERAGE):ft(i.SAMPLE_ALPHA_TO_COVERAGE)}function at(N){M!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),M=N)}function _t(N){N!==mh?(rt(i.CULL_FACE),N!==I&&(N===Fo?i.cullFace(i.BACK):N===gh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ft(i.CULL_FACE),I=N}function ct(N){N!==B&&(U&&i.lineWidth(N),B=N)}function Nt(N,xt,Z){N?(rt(i.POLYGON_OFFSET_FILL),(z!==xt||D!==Z)&&(i.polygonOffset(xt,Z),z=xt,D=Z)):ft(i.POLYGON_OFFSET_FILL)}function bt(N){N?rt(i.SCISSOR_TEST):ft(i.SCISSOR_TEST)}function A(N){N===void 0&&(N=i.TEXTURE0+G-1),q!==N&&(i.activeTexture(N),q=N)}function S(N,xt,Z){Z===void 0&&(q===null?Z=i.TEXTURE0+G-1:Z=q);let et=J[Z];et===void 0&&(et={type:void 0,texture:void 0},J[Z]=et),(et.type!==N||et.texture!==xt)&&(q!==Z&&(i.activeTexture(Z),q=Z),i.bindTexture(N,xt||mt[N]),et.type=N,et.texture=xt)}function V(){const N=J[q];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function it(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function j(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Rt(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function vt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function wt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Kt(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function lt(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Et(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ft(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function kt(N){dt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),dt.copy(N))}function Tt(N){W.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),W.copy(N))}function jt(N,xt){let Z=c.get(xt);Z===void 0&&(Z=new WeakMap,c.set(xt,Z));let et=Z.get(N);et===void 0&&(et=i.getUniformBlockIndex(xt,N.name),Z.set(N,et))}function Xt(N,xt){const et=c.get(xt).get(N);l.get(xt)!==et&&(i.uniformBlockBinding(xt,et,N.__bindingPointIndex),l.set(xt,et))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},q=null,J={},u={},f=new WeakMap,p=[],g=null,y=!1,m=null,d=null,_=null,v=null,x=null,L=null,E=null,T=new qt(0,0,0),R=0,b=!1,M=null,I=null,B=null,z=null,D=null,dt.set(0,0,i.canvas.width,i.canvas.height),W.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:rt,disable:ft,bindFramebuffer:Ut,drawBuffers:It,useProgram:Wt,setBlending:C,setMaterial:At,setFlipSided:at,setCullFace:_t,setLineWidth:ct,setPolygonOffset:Nt,setScissorTest:bt,activeTexture:A,bindTexture:S,unbindTexture:V,compressedTexImage2D:K,compressedTexImage3D:it,texImage2D:Et,texImage3D:Ft,updateUBOMapping:jt,uniformBlockBinding:Xt,texStorage2D:Kt,texStorage3D:lt,texSubImage2D:j,texSubImage3D:Rt,compressedTexSubImage2D:vt,compressedTexSubImage3D:wt,scissor:kt,viewport:Tt,reset:ce}}function Dl(i,t,e,n){const s=n0(n);switch(e){case ac:return i*t;case lc:return i*t;case cc:return i*t*2;case hc:return i*t/s.components*s.byteLength;case co:return i*t/s.components*s.byteLength;case uc:return i*t*2/s.components*s.byteLength;case ho:return i*t*2/s.components*s.byteLength;case oc:return i*t*3/s.components*s.byteLength;case sn:return i*t*4/s.components*s.byteLength;case uo:return i*t*4/s.components*s.byteLength;case Zs:case Ks:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case js:case Js:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xa:case Ma:return Math.max(i,16)*Math.max(t,8)/4;case va:case ya:return Math.max(i,8)*Math.max(t,8)/2;case Sa:case ba:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case wa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ea:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ta:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Aa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ra:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ca:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Pa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case La:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ia:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Da:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ua:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Na:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Fa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Oa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ka:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Qs:case za:case Ba:return Math.ceil(i/4)*Math.ceil(t/4)*16;case dc:case Ha:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Va:case Ga:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function n0(i){switch(i){case Cn:case ic:return{byteLength:1,components:1};case ds:case sc:case gs:return{byteLength:2,components:1};case oo:case lo:return{byteLength:2,components:4};case ci:case ao:case Tn:return{byteLength:4,components:1};case rc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function i0(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ut,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,S){return p?new OffscreenCanvas(A,S):ir("canvas")}function y(A,S,V){let K=1;const it=bt(A);if((it.width>V||it.height>V)&&(K=V/Math.max(it.width,it.height)),K<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const j=Math.floor(K*it.width),Rt=Math.floor(K*it.height);u===void 0&&(u=g(j,Rt));const vt=S?g(j,Rt):u;return vt.width=j,vt.height=Rt,vt.getContext("2d").drawImage(A,0,0,j,Rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+j+"x"+Rt+")."),vt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),A;return A}function m(A){return A.generateMipmaps}function d(A){i.generateMipmap(A)}function _(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(A,S,V,K,it=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let j=S;if(S===i.RED&&(V===i.FLOAT&&(j=i.R32F),V===i.HALF_FLOAT&&(j=i.R16F),V===i.UNSIGNED_BYTE&&(j=i.R8)),S===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(j=i.R8UI),V===i.UNSIGNED_SHORT&&(j=i.R16UI),V===i.UNSIGNED_INT&&(j=i.R32UI),V===i.BYTE&&(j=i.R8I),V===i.SHORT&&(j=i.R16I),V===i.INT&&(j=i.R32I)),S===i.RG&&(V===i.FLOAT&&(j=i.RG32F),V===i.HALF_FLOAT&&(j=i.RG16F),V===i.UNSIGNED_BYTE&&(j=i.RG8)),S===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(j=i.RG8UI),V===i.UNSIGNED_SHORT&&(j=i.RG16UI),V===i.UNSIGNED_INT&&(j=i.RG32UI),V===i.BYTE&&(j=i.RG8I),V===i.SHORT&&(j=i.RG16I),V===i.INT&&(j=i.RG32I)),S===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(j=i.RGB8UI),V===i.UNSIGNED_SHORT&&(j=i.RGB16UI),V===i.UNSIGNED_INT&&(j=i.RGB32UI),V===i.BYTE&&(j=i.RGB8I),V===i.SHORT&&(j=i.RGB16I),V===i.INT&&(j=i.RGB32I)),S===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),V===i.UNSIGNED_INT&&(j=i.RGBA32UI),V===i.BYTE&&(j=i.RGBA8I),V===i.SHORT&&(j=i.RGBA16I),V===i.INT&&(j=i.RGBA32I)),S===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),S===i.RGBA){const Rt=it?hr:te.getTransfer(K);V===i.FLOAT&&(j=i.RGBA32F),V===i.HALF_FLOAT&&(j=i.RGBA16F),V===i.UNSIGNED_BYTE&&(j=Rt===le?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function x(A,S){let V;return A?S===null||S===ci||S===Gi?V=i.DEPTH24_STENCIL8:S===Tn?V=i.DEPTH32F_STENCIL8:S===ds&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ci||S===Gi?V=i.DEPTH_COMPONENT24:S===Tn?V=i.DEPTH_COMPONENT32F:S===ds&&(V=i.DEPTH_COMPONENT16),V}function L(A,S){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==rn&&A.minFilter!==pn?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function E(A){const S=A.target;S.removeEventListener("dispose",E),R(S),S.isVideoTexture&&h.delete(S)}function T(A){const S=A.target;S.removeEventListener("dispose",T),M(S)}function R(A){const S=n.get(A);if(S.__webglInit===void 0)return;const V=A.source,K=f.get(V);if(K){const it=K[S.__cacheKey];it.usedTimes--,it.usedTimes===0&&b(A),Object.keys(K).length===0&&f.delete(V)}n.remove(A)}function b(A){const S=n.get(A);i.deleteTexture(S.__webglTexture);const V=A.source,K=f.get(V);delete K[S.__cacheKey],a.memory.textures--}function M(A){const S=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(S.__webglFramebuffer[K]))for(let it=0;it<S.__webglFramebuffer[K].length;it++)i.deleteFramebuffer(S.__webglFramebuffer[K][it]);else i.deleteFramebuffer(S.__webglFramebuffer[K]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[K])}else{if(Array.isArray(S.__webglFramebuffer))for(let K=0;K<S.__webglFramebuffer.length;K++)i.deleteFramebuffer(S.__webglFramebuffer[K]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let K=0;K<S.__webglColorRenderbuffer.length;K++)S.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[K]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const V=A.textures;for(let K=0,it=V.length;K<it;K++){const j=n.get(V[K]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(V[K])}n.remove(A)}let I=0;function B(){I=0}function z(){const A=I;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),I+=1,A}function D(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function G(A,S){const V=n.get(A);if(A.isVideoTexture&&ct(A),A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){const K=A.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(V,A,S);return}}e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+S)}function U(A,S){const V=n.get(A);if(A.version>0&&V.__version!==A.version){W(V,A,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+S)}function X(A,S){const V=n.get(A);if(A.version>0&&V.__version!==A.version){W(V,A,S);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+S)}function F(A,S){const V=n.get(A);if(A.version>0&&V.__version!==A.version){Q(V,A,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+S)}const q={[us]:i.REPEAT,[ai]:i.CLAMP_TO_EDGE,[_a]:i.MIRRORED_REPEAT},J={[rn]:i.NEAREST,[Gh]:i.NEAREST_MIPMAP_NEAREST,[Ms]:i.NEAREST_MIPMAP_LINEAR,[pn]:i.LINEAR,[gr]:i.LINEAR_MIPMAP_NEAREST,[oi]:i.LINEAR_MIPMAP_LINEAR},nt={[Yh]:i.NEVER,[Qh]:i.ALWAYS,[qh]:i.LESS,[fc]:i.LEQUAL,[Zh]:i.EQUAL,[Jh]:i.GEQUAL,[Kh]:i.GREATER,[jh]:i.NOTEQUAL};function H(A,S){if(S.type===Tn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===pn||S.magFilter===gr||S.magFilter===Ms||S.magFilter===oi||S.minFilter===pn||S.minFilter===gr||S.minFilter===Ms||S.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,q[S.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,q[S.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,q[S.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,J[S.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,J[S.minFilter]),S.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,nt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===rn||S.minFilter!==Ms&&S.minFilter!==oi||S.type===Tn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function dt(A,S){let V=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",E));const K=S.source;let it=f.get(K);it===void 0&&(it={},f.set(K,it));const j=D(S);if(j!==A.__cacheKey){it[j]===void 0&&(it[j]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,V=!0),it[j].usedTimes++;const Rt=it[A.__cacheKey];Rt!==void 0&&(it[A.__cacheKey].usedTimes--,Rt.usedTimes===0&&b(S)),A.__cacheKey=j,A.__webglTexture=it[j].texture}return V}function W(A,S,V){let K=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(K=i.TEXTURE_3D);const it=dt(A,S),j=S.source;e.bindTexture(K,A.__webglTexture,i.TEXTURE0+V);const Rt=n.get(j);if(j.version!==Rt.__version||it===!0){e.activeTexture(i.TEXTURE0+V);const vt=te.getPrimaries(te.workingColorSpace),wt=S.colorSpace===Hn?null:te.getPrimaries(S.colorSpace),Kt=S.colorSpace===Hn||vt===wt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt);let lt=y(S.image,!1,s.maxTextureSize);lt=Nt(S,lt);const Et=r.convert(S.format,S.colorSpace),Ft=r.convert(S.type);let kt=v(S.internalFormat,Et,Ft,S.colorSpace,S.isVideoTexture);H(K,S);let Tt;const jt=S.mipmaps,Xt=S.isVideoTexture!==!0,ce=Rt.__version===void 0||it===!0,N=j.dataReady,xt=L(S,lt);if(S.isDepthTexture)kt=x(S.format===Wi,S.type),ce&&(Xt?e.texStorage2D(i.TEXTURE_2D,1,kt,lt.width,lt.height):e.texImage2D(i.TEXTURE_2D,0,kt,lt.width,lt.height,0,Et,Ft,null));else if(S.isDataTexture)if(jt.length>0){Xt&&ce&&e.texStorage2D(i.TEXTURE_2D,xt,kt,jt[0].width,jt[0].height);for(let Z=0,et=jt.length;Z<et;Z++)Tt=jt[Z],Xt?N&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,Tt.width,Tt.height,Et,Ft,Tt.data):e.texImage2D(i.TEXTURE_2D,Z,kt,Tt.width,Tt.height,0,Et,Ft,Tt.data);S.generateMipmaps=!1}else Xt?(ce&&e.texStorage2D(i.TEXTURE_2D,xt,kt,lt.width,lt.height),N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt.width,lt.height,Et,Ft,lt.data)):e.texImage2D(i.TEXTURE_2D,0,kt,lt.width,lt.height,0,Et,Ft,lt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Xt&&ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,kt,jt[0].width,jt[0].height,lt.depth);for(let Z=0,et=jt.length;Z<et;Z++)if(Tt=jt[Z],S.format!==sn)if(Et!==null)if(Xt){if(N)if(S.layerUpdates.size>0){const St=Dl(Tt.width,Tt.height,S.format,S.type);for(const yt of S.layerUpdates){const Ht=Tt.data.subarray(yt*St/Tt.data.BYTES_PER_ELEMENT,(yt+1)*St/Tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,yt,Tt.width,Tt.height,1,Et,Ht)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,Tt.width,Tt.height,lt.depth,Et,Tt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Z,kt,Tt.width,Tt.height,lt.depth,0,Tt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?N&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,Tt.width,Tt.height,lt.depth,Et,Ft,Tt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Z,kt,Tt.width,Tt.height,lt.depth,0,Et,Ft,Tt.data)}else{Xt&&ce&&e.texStorage2D(i.TEXTURE_2D,xt,kt,jt[0].width,jt[0].height);for(let Z=0,et=jt.length;Z<et;Z++)Tt=jt[Z],S.format!==sn?Et!==null?Xt?N&&e.compressedTexSubImage2D(i.TEXTURE_2D,Z,0,0,Tt.width,Tt.height,Et,Tt.data):e.compressedTexImage2D(i.TEXTURE_2D,Z,kt,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?N&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,Tt.width,Tt.height,Et,Ft,Tt.data):e.texImage2D(i.TEXTURE_2D,Z,kt,Tt.width,Tt.height,0,Et,Ft,Tt.data)}else if(S.isDataArrayTexture)if(Xt){if(ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,kt,lt.width,lt.height,lt.depth),N)if(S.layerUpdates.size>0){const Z=Dl(lt.width,lt.height,S.format,S.type);for(const et of S.layerUpdates){const St=lt.data.subarray(et*Z/lt.data.BYTES_PER_ELEMENT,(et+1)*Z/lt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,et,lt.width,lt.height,1,Et,Ft,St)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,Et,Ft,lt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,kt,lt.width,lt.height,lt.depth,0,Et,Ft,lt.data);else if(S.isData3DTexture)Xt?(ce&&e.texStorage3D(i.TEXTURE_3D,xt,kt,lt.width,lt.height,lt.depth),N&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,Et,Ft,lt.data)):e.texImage3D(i.TEXTURE_3D,0,kt,lt.width,lt.height,lt.depth,0,Et,Ft,lt.data);else if(S.isFramebufferTexture){if(ce)if(Xt)e.texStorage2D(i.TEXTURE_2D,xt,kt,lt.width,lt.height);else{let Z=lt.width,et=lt.height;for(let St=0;St<xt;St++)e.texImage2D(i.TEXTURE_2D,St,kt,Z,et,0,Et,Ft,null),Z>>=1,et>>=1}}else if(jt.length>0){if(Xt&&ce){const Z=bt(jt[0]);e.texStorage2D(i.TEXTURE_2D,xt,kt,Z.width,Z.height)}for(let Z=0,et=jt.length;Z<et;Z++)Tt=jt[Z],Xt?N&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,Et,Ft,Tt):e.texImage2D(i.TEXTURE_2D,Z,kt,Et,Ft,Tt);S.generateMipmaps=!1}else if(Xt){if(ce){const Z=bt(lt);e.texStorage2D(i.TEXTURE_2D,xt,kt,Z.width,Z.height)}N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Et,Ft,lt)}else e.texImage2D(i.TEXTURE_2D,0,kt,Et,Ft,lt);m(S)&&d(K),Rt.__version=j.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function Q(A,S,V){if(S.image.length!==6)return;const K=dt(A,S),it=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+V);const j=n.get(it);if(it.version!==j.__version||K===!0){e.activeTexture(i.TEXTURE0+V);const Rt=te.getPrimaries(te.workingColorSpace),vt=S.colorSpace===Hn?null:te.getPrimaries(S.colorSpace),wt=S.colorSpace===Hn||Rt===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const Kt=S.isCompressedTexture||S.image[0].isCompressedTexture,lt=S.image[0]&&S.image[0].isDataTexture,Et=[];for(let et=0;et<6;et++)!Kt&&!lt?Et[et]=y(S.image[et],!0,s.maxCubemapSize):Et[et]=lt?S.image[et].image:S.image[et],Et[et]=Nt(S,Et[et]);const Ft=Et[0],kt=r.convert(S.format,S.colorSpace),Tt=r.convert(S.type),jt=v(S.internalFormat,kt,Tt,S.colorSpace),Xt=S.isVideoTexture!==!0,ce=j.__version===void 0||K===!0,N=it.dataReady;let xt=L(S,Ft);H(i.TEXTURE_CUBE_MAP,S);let Z;if(Kt){Xt&&ce&&e.texStorage2D(i.TEXTURE_CUBE_MAP,xt,jt,Ft.width,Ft.height);for(let et=0;et<6;et++){Z=Et[et].mipmaps;for(let St=0;St<Z.length;St++){const yt=Z[St];S.format!==sn?kt!==null?Xt?N&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St,0,0,yt.width,yt.height,kt,yt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St,jt,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St,0,0,yt.width,yt.height,kt,Tt,yt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St,jt,yt.width,yt.height,0,kt,Tt,yt.data)}}}else{if(Z=S.mipmaps,Xt&&ce){Z.length>0&&xt++;const et=bt(Et[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,xt,jt,et.width,et.height)}for(let et=0;et<6;et++)if(lt){Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Et[et].width,Et[et].height,kt,Tt,Et[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,jt,Et[et].width,Et[et].height,0,kt,Tt,Et[et].data);for(let St=0;St<Z.length;St++){const Ht=Z[St].image[et].image;Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St+1,0,0,Ht.width,Ht.height,kt,Tt,Ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St+1,jt,Ht.width,Ht.height,0,kt,Tt,Ht.data)}}else{Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,kt,Tt,Et[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,jt,kt,Tt,Et[et]);for(let St=0;St<Z.length;St++){const yt=Z[St];Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St+1,0,0,kt,Tt,yt.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St+1,jt,kt,Tt,yt.image[et])}}}m(S)&&d(i.TEXTURE_CUBE_MAP),j.__version=it.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function mt(A,S,V,K,it,j){const Rt=r.convert(V.format,V.colorSpace),vt=r.convert(V.type),wt=v(V.internalFormat,Rt,vt,V.colorSpace),Kt=n.get(S),lt=n.get(V);if(lt.__renderTarget=S,!Kt.__hasExternalTextures){const Et=Math.max(1,S.width>>j),Ft=Math.max(1,S.height>>j);it===i.TEXTURE_3D||it===i.TEXTURE_2D_ARRAY?e.texImage3D(it,j,wt,Et,Ft,S.depth,0,Rt,vt,null):e.texImage2D(it,j,wt,Et,Ft,0,Rt,vt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),_t(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,it,lt.__webglTexture,0,at(S)):(it===i.TEXTURE_2D||it>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,it,lt.__webglTexture,j),e.bindFramebuffer(i.FRAMEBUFFER,null)}function rt(A,S,V){if(i.bindRenderbuffer(i.RENDERBUFFER,A),S.depthBuffer){const K=S.depthTexture,it=K&&K.isDepthTexture?K.type:null,j=x(S.stencilBuffer,it),Rt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=at(S);_t(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,vt,j,S.width,S.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,vt,j,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,j,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Rt,i.RENDERBUFFER,A)}else{const K=S.textures;for(let it=0;it<K.length;it++){const j=K[it],Rt=r.convert(j.format,j.colorSpace),vt=r.convert(j.type),wt=v(j.internalFormat,Rt,vt,j.colorSpace),Kt=at(S);V&&_t(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Kt,wt,S.width,S.height):_t(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Kt,wt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,wt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ft(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(S.depthTexture);K.__renderTarget=S,(!K.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),G(S.depthTexture,0);const it=K.__webglTexture,j=at(S);if(S.depthTexture.format===ki)_t(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,it,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,it,0);else if(S.depthTexture.format===Wi)_t(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,it,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function Ut(A){const S=n.get(A),V=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){const K=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),K){const it=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,K.removeEventListener("dispose",it)};K.addEventListener("dispose",it),S.__depthDisposeCallback=it}S.__boundDepthTexture=K}if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");ft(S.__webglFramebuffer,A)}else if(V){S.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[K]),S.__webglDepthbuffer[K]===void 0)S.__webglDepthbuffer[K]=i.createRenderbuffer(),rt(S.__webglDepthbuffer[K],A,!1);else{const it=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=S.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,j)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),rt(S.__webglDepthbuffer,A,!1);else{const K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,it),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,it)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function It(A,S,V){const K=n.get(A);S!==void 0&&mt(K.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Ut(A)}function Wt(A){const S=A.texture,V=n.get(A),K=n.get(S);A.addEventListener("dispose",T);const it=A.textures,j=A.isWebGLCubeRenderTarget===!0,Rt=it.length>1;if(Rt||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=S.version,a.memory.textures++),j){V.__webglFramebuffer=[];for(let vt=0;vt<6;vt++)if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer[vt]=[];for(let wt=0;wt<S.mipmaps.length;wt++)V.__webglFramebuffer[vt][wt]=i.createFramebuffer()}else V.__webglFramebuffer[vt]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer=[];for(let vt=0;vt<S.mipmaps.length;vt++)V.__webglFramebuffer[vt]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Rt)for(let vt=0,wt=it.length;vt<wt;vt++){const Kt=n.get(it[vt]);Kt.__webglTexture===void 0&&(Kt.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&_t(A)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let vt=0;vt<it.length;vt++){const wt=it[vt];V.__webglColorRenderbuffer[vt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[vt]);const Kt=r.convert(wt.format,wt.colorSpace),lt=r.convert(wt.type),Et=v(wt.internalFormat,Kt,lt,wt.colorSpace,A.isXRRenderTarget===!0),Ft=at(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ft,Et,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,V.__webglColorRenderbuffer[vt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),rt(V.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),H(i.TEXTURE_CUBE_MAP,S);for(let vt=0;vt<6;vt++)if(S.mipmaps&&S.mipmaps.length>0)for(let wt=0;wt<S.mipmaps.length;wt++)mt(V.__webglFramebuffer[vt][wt],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt);else mt(V.__webglFramebuffer[vt],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0);m(S)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Rt){for(let vt=0,wt=it.length;vt<wt;vt++){const Kt=it[vt],lt=n.get(Kt);e.bindTexture(i.TEXTURE_2D,lt.__webglTexture),H(i.TEXTURE_2D,Kt),mt(V.__webglFramebuffer,A,Kt,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,0),m(Kt)&&d(i.TEXTURE_2D)}e.unbindTexture()}else{let vt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(vt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(vt,K.__webglTexture),H(vt,S),S.mipmaps&&S.mipmaps.length>0)for(let wt=0;wt<S.mipmaps.length;wt++)mt(V.__webglFramebuffer[wt],A,S,i.COLOR_ATTACHMENT0,vt,wt);else mt(V.__webglFramebuffer,A,S,i.COLOR_ATTACHMENT0,vt,0);m(S)&&d(vt),e.unbindTexture()}A.depthBuffer&&Ut(A)}function tt(A){const S=A.textures;for(let V=0,K=S.length;V<K;V++){const it=S[V];if(m(it)){const j=_(A),Rt=n.get(it).__webglTexture;e.bindTexture(j,Rt),d(j),e.unbindTexture()}}}const ot=[],C=[];function At(A){if(A.samples>0){if(_t(A)===!1){const S=A.textures,V=A.width,K=A.height;let it=i.COLOR_BUFFER_BIT;const j=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Rt=n.get(A),vt=S.length>1;if(vt)for(let wt=0;wt<S.length;wt++)e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer);for(let wt=0;wt<S.length;wt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(it|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(it|=i.STENCIL_BUFFER_BIT)),vt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[wt]);const Kt=n.get(S[wt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Kt,0)}i.blitFramebuffer(0,0,V,K,0,0,V,K,it,i.NEAREST),l===!0&&(ot.length=0,C.length=0,ot.push(i.COLOR_ATTACHMENT0+wt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ot.push(j),C.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,C)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ot))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),vt)for(let wt=0;wt<S.length;wt++){e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[wt]);const Kt=n.get(S[wt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,Kt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const S=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function at(A){return Math.min(s.maxSamples,A.samples)}function _t(A){const S=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ct(A){const S=a.render.frame;h.get(A)!==S&&(h.set(A,S),A.update())}function Nt(A,S){const V=A.colorSpace,K=A.format,it=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||V!==$i&&V!==Hn&&(te.getTransfer(V)===le?(K!==sn||it!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),S}function bt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=B,this.setTexture2D=G,this.setTexture2DArray=U,this.setTexture3D=X,this.setTextureCube=F,this.rebindTextures=It,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=At,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=_t}function s0(i,t){function e(n,s=Hn){let r;const a=te.getTransfer(s);if(n===Cn)return i.UNSIGNED_BYTE;if(n===oo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===lo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===rc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ic)return i.BYTE;if(n===sc)return i.SHORT;if(n===ds)return i.UNSIGNED_SHORT;if(n===ao)return i.INT;if(n===ci)return i.UNSIGNED_INT;if(n===Tn)return i.FLOAT;if(n===gs)return i.HALF_FLOAT;if(n===ac)return i.ALPHA;if(n===oc)return i.RGB;if(n===sn)return i.RGBA;if(n===lc)return i.LUMINANCE;if(n===cc)return i.LUMINANCE_ALPHA;if(n===ki)return i.DEPTH_COMPONENT;if(n===Wi)return i.DEPTH_STENCIL;if(n===hc)return i.RED;if(n===co)return i.RED_INTEGER;if(n===uc)return i.RG;if(n===ho)return i.RG_INTEGER;if(n===uo)return i.RGBA_INTEGER;if(n===Zs||n===Ks||n===js||n===Js)if(a===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Zs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Zs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ks)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Js)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===va||n===xa||n===ya||n===Ma)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===va)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ya)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ma)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Sa||n===ba||n===wa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Sa||n===ba)return a===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===wa)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ea||n===Ta||n===Aa||n===Ra||n===Ca||n===Pa||n===La||n===Ia||n===Da||n===Ua||n===Na||n===Fa||n===Oa||n===ka)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ea)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ta)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Aa)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ra)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ca)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Pa)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===La)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ia)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Da)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ua)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Na)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Fa)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Oa)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ka)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Qs||n===za||n===Ba)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Qs)return a===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===za)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ba)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===dc||n===Ha||n===Va||n===Ga)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Qs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ha)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Va)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ga)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class r0 extends We{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Qt extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const a0={type:"move"};class Xr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const y of t.hand.values()){const m=e.getJointPose(y,n),d=this._getHandJoint(c,y);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(a0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Qt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const o0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,l0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class c0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ne,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Yn({vertexShader:o0,fragmentShader:l0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new st(new an(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class h0 extends Yi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,g=null;const y=new c0,m=e.getContextAttributes();let d=null,_=null;const v=[],x=[],L=new ut;let E=null;const T=new We;T.viewport=new ge;const R=new We;R.viewport=new ge;const b=[T,R],M=new r0;let I=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let Q=v[W];return Q===void 0&&(Q=new Xr,v[W]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(W){let Q=v[W];return Q===void 0&&(Q=new Xr,v[W]=Q),Q.getGripSpace()},this.getHand=function(W){let Q=v[W];return Q===void 0&&(Q=new Xr,v[W]=Q),Q.getHandSpace()};function z(W){const Q=x.indexOf(W.inputSource);if(Q===-1)return;const mt=v[Q];mt!==void 0&&(mt.update(W.inputSource,W.frame,c||a),mt.dispatchEvent({type:W.type,data:W.inputSource}))}function D(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",G);for(let W=0;W<v.length;W++){const Q=x[W];Q!==null&&(x[W]=null,v[W].disconnect(Q))}I=null,B=null,y.reset(),t.setRenderTarget(d),p=null,f=null,u=null,s=null,_=null,dt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",D),s.addEventListener("inputsourceschange",G),m.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const Q={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,Q),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new hi(p.framebufferWidth,p.framebufferHeight,{format:sn,type:Cn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let Q=null,mt=null,rt=null;m.depth&&(rt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Q=m.stencil?Wi:ki,mt=m.stencil?Gi:ci);const ft={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(ft),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new hi(f.textureWidth,f.textureHeight,{format:sn,type:Cn,depthTexture:new Tc(f.textureWidth,f.textureHeight,mt,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),dt.setContext(s),dt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function G(W){for(let Q=0;Q<W.removed.length;Q++){const mt=W.removed[Q],rt=x.indexOf(mt);rt>=0&&(x[rt]=null,v[rt].disconnect(mt))}for(let Q=0;Q<W.added.length;Q++){const mt=W.added[Q];let rt=x.indexOf(mt);if(rt===-1){for(let Ut=0;Ut<v.length;Ut++)if(Ut>=x.length){x.push(mt),rt=Ut;break}else if(x[Ut]===null){x[Ut]=mt,rt=Ut;break}if(rt===-1)break}const ft=v[rt];ft&&ft.connect(mt)}}const U=new P,X=new P;function F(W,Q,mt){U.setFromMatrixPosition(Q.matrixWorld),X.setFromMatrixPosition(mt.matrixWorld);const rt=U.distanceTo(X),ft=Q.projectionMatrix.elements,Ut=mt.projectionMatrix.elements,It=ft[14]/(ft[10]-1),Wt=ft[14]/(ft[10]+1),tt=(ft[9]+1)/ft[5],ot=(ft[9]-1)/ft[5],C=(ft[8]-1)/ft[0],At=(Ut[8]+1)/Ut[0],at=It*C,_t=It*At,ct=rt/(-C+At),Nt=ct*-C;if(Q.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Nt),W.translateZ(ct),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),ft[10]===-1)W.projectionMatrix.copy(Q.projectionMatrix),W.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const bt=It+ct,A=Wt+ct,S=at-Nt,V=_t+(rt-Nt),K=tt*Wt/A*bt,it=ot*Wt/A*bt;W.projectionMatrix.makePerspective(S,V,K,it,bt,A),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function q(W,Q){Q===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(Q.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let Q=W.near,mt=W.far;y.texture!==null&&(y.depthNear>0&&(Q=y.depthNear),y.depthFar>0&&(mt=y.depthFar)),M.near=R.near=T.near=Q,M.far=R.far=T.far=mt,(I!==M.near||B!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,B=M.far),T.layers.mask=W.layers.mask|2,R.layers.mask=W.layers.mask|4,M.layers.mask=T.layers.mask|R.layers.mask;const rt=W.parent,ft=M.cameras;q(M,rt);for(let Ut=0;Ut<ft.length;Ut++)q(ft[Ut],rt);ft.length===2?F(M,T,R):M.projectionMatrix.copy(T.projectionMatrix),J(W,M,rt)};function J(W,Q,mt){mt===null?W.matrix.copy(Q.matrixWorld):(W.matrix.copy(mt.matrixWorld),W.matrix.invert(),W.matrix.multiply(Q.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(Q.projectionMatrix),W.projectionMatrixInverse.copy(Q.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Wa*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(W){l=W,f!==null&&(f.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(M)};let nt=null;function H(W,Q){if(h=Q.getViewerPose(c||a),g=Q,h!==null){const mt=h.views;p!==null&&(t.setRenderTargetFramebuffer(_,p.framebuffer),t.setRenderTarget(_));let rt=!1;mt.length!==M.cameras.length&&(M.cameras.length=0,rt=!0);for(let Ut=0;Ut<mt.length;Ut++){const It=mt[Ut];let Wt=null;if(p!==null)Wt=p.getViewport(It);else{const ot=u.getViewSubImage(f,It);Wt=ot.viewport,Ut===0&&(t.setRenderTargetTextures(_,ot.colorTexture,f.ignoreDepthValues?void 0:ot.depthStencilTexture),t.setRenderTarget(_))}let tt=b[Ut];tt===void 0&&(tt=new We,tt.layers.enable(Ut),tt.viewport=new ge,b[Ut]=tt),tt.matrix.fromArray(It.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(It.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(Wt.x,Wt.y,Wt.width,Wt.height),Ut===0&&(M.matrix.copy(tt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),rt===!0&&M.cameras.push(tt)}const ft=s.enabledFeatures;if(ft&&ft.includes("depth-sensing")){const Ut=u.getDepthInformation(mt[0]);Ut&&Ut.isValid&&Ut.texture&&y.init(t,Ut,s.renderState)}}for(let mt=0;mt<v.length;mt++){const rt=x[mt],ft=v[mt];rt!==null&&ft!==void 0&&ft.update(rt,Q,c||a)}nt&&nt(W,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const dt=new wc;dt.setAnimationLoop(H),this.setAnimationLoop=function(W){nt=W},this.dispose=function(){}}}const ti=new $e,u0=new ie;function d0(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,Mc(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,_,v,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,x)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),y(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,_,v):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===ze&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===ze&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const _=t.get(d),v=_.envMap,x=_.envMapRotation;v&&(m.envMap.value=v,ti.copy(x),ti.x*=-1,ti.y*=-1,ti.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),m.envMapRotation.value.setFromMatrix4(u0.makeRotationFromEuler(ti)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,_,v){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*_,m.scale.value=v*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,_){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===ze&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function y(m,d){const _=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function f0(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,v){const x=v.program;n.uniformBlockBinding(_,x)}function c(_,v){let x=s[_.id];x===void 0&&(g(_),x=h(_),s[_.id]=x,_.addEventListener("dispose",m));const L=v.program;n.updateUBOMapping(_,L);const E=t.render.frame;r[_.id]!==E&&(f(_),r[_.id]=E)}function h(_){const v=u();_.__bindingPointIndex=v;const x=i.createBuffer(),L=_.__size,E=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,L,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,x),x}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const v=s[_.id],x=_.uniforms,L=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let E=0,T=x.length;E<T;E++){const R=Array.isArray(x[E])?x[E]:[x[E]];for(let b=0,M=R.length;b<M;b++){const I=R[b];if(p(I,E,b,L)===!0){const B=I.__offset,z=Array.isArray(I.value)?I.value:[I.value];let D=0;for(let G=0;G<z.length;G++){const U=z[G],X=y(U);typeof U=="number"||typeof U=="boolean"?(I.__data[0]=U,i.bufferSubData(i.UNIFORM_BUFFER,B+D,I.__data)):U.isMatrix3?(I.__data[0]=U.elements[0],I.__data[1]=U.elements[1],I.__data[2]=U.elements[2],I.__data[3]=0,I.__data[4]=U.elements[3],I.__data[5]=U.elements[4],I.__data[6]=U.elements[5],I.__data[7]=0,I.__data[8]=U.elements[6],I.__data[9]=U.elements[7],I.__data[10]=U.elements[8],I.__data[11]=0):(U.toArray(I.__data,D),D+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(_,v,x,L){const E=_.value,T=v+"_"+x;if(L[T]===void 0)return typeof E=="number"||typeof E=="boolean"?L[T]=E:L[T]=E.clone(),!0;{const R=L[T];if(typeof E=="number"||typeof E=="boolean"){if(R!==E)return L[T]=E,!0}else if(R.equals(E)===!1)return R.copy(E),!0}return!1}function g(_){const v=_.uniforms;let x=0;const L=16;for(let T=0,R=v.length;T<R;T++){const b=Array.isArray(v[T])?v[T]:[v[T]];for(let M=0,I=b.length;M<I;M++){const B=b[M],z=Array.isArray(B.value)?B.value:[B.value];for(let D=0,G=z.length;D<G;D++){const U=z[D],X=y(U),F=x%L,q=F%X.boundary,J=F+q;x+=q,J!==0&&L-J<X.storage&&(x+=L-J),B.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=x,x+=X.storage}}}const E=x%L;return E>0&&(x+=L-E),_.__size=x,_.__cache={},this}function y(_){const v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),v}function m(_){const v=_.target;v.removeEventListener("dispose",m);const x=a.indexOf(v.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function d(){for(const _ in s)i.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:l,update:c,dispose:d}}class Lc{constructor(t={}){const{canvas:e=eu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),y=new Int32Array(4);let m=null,d=null;const _=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=De,this.toneMapping=Gn,this.toneMappingExposure=1;const x=this;let L=!1,E=0,T=0,R=null,b=-1,M=null;const I=new ge,B=new ge;let z=null;const D=new qt(0);let G=0,U=e.width,X=e.height,F=1,q=null,J=null;const nt=new ge(0,0,U,X),H=new ge(0,0,U,X);let dt=!1;const W=new go;let Q=!1,mt=!1;const rt=new ie,ft=new ie,Ut=new P,It=new ge,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let tt=!1;function ot(){return R===null?F:1}let C=n;function At(w,O){return e.getContext(w,O)}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${so}`),e.addEventListener("webglcontextlost",et,!1),e.addEventListener("webglcontextrestored",St,!1),e.addEventListener("webglcontextcreationerror",yt,!1),C===null){const O="webgl2";if(C=At(O,w),C===null)throw At(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let at,_t,ct,Nt,bt,A,S,V,K,it,j,Rt,vt,wt,Kt,lt,Et,Ft,kt,Tt,jt,Xt,ce,N;function xt(){at=new xp(C),at.init(),Xt=new s0(C,at),_t=new fp(C,at,t,Xt),ct=new e0(C,at),_t.reverseDepthBuffer&&f&&ct.buffers.depth.setReversed(!0),Nt=new Sp(C),bt=new Bm,A=new i0(C,at,ct,bt,_t,Xt,Nt),S=new mp(x),V=new vp(x),K=new Ru(C),ce=new up(C,K),it=new yp(C,K,Nt,ce),j=new wp(C,it,K,Nt),kt=new bp(C,_t,A),lt=new pp(bt),Rt=new zm(x,S,V,at,_t,ce,lt),vt=new d0(x,bt),wt=new Vm,Kt=new qm(at),Ft=new hp(x,S,V,ct,j,p,l),Et=new Qm(x,j,_t),N=new f0(C,Nt,_t,ct),Tt=new dp(C,at,Nt),jt=new Mp(C,at,Nt),Nt.programs=Rt.programs,x.capabilities=_t,x.extensions=at,x.properties=bt,x.renderLists=wt,x.shadowMap=Et,x.state=ct,x.info=Nt}xt();const Z=new h0(x,C);this.xr=Z,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const w=at.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=at.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(w){w!==void 0&&(F=w,this.setSize(U,X,!1))},this.getSize=function(w){return w.set(U,X)},this.setSize=function(w,O,$=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=w,X=O,e.width=Math.floor(w*F),e.height=Math.floor(O*F),$===!0&&(e.style.width=w+"px",e.style.height=O+"px"),this.setViewport(0,0,w,O)},this.getDrawingBufferSize=function(w){return w.set(U*F,X*F).floor()},this.setDrawingBufferSize=function(w,O,$){U=w,X=O,F=$,e.width=Math.floor(w*$),e.height=Math.floor(O*$),this.setViewport(0,0,w,O)},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(nt)},this.setViewport=function(w,O,$,Y){w.isVector4?nt.set(w.x,w.y,w.z,w.w):nt.set(w,O,$,Y),ct.viewport(I.copy(nt).multiplyScalar(F).round())},this.getScissor=function(w){return w.copy(H)},this.setScissor=function(w,O,$,Y){w.isVector4?H.set(w.x,w.y,w.z,w.w):H.set(w,O,$,Y),ct.scissor(B.copy(H).multiplyScalar(F).round())},this.getScissorTest=function(){return dt},this.setScissorTest=function(w){ct.setScissorTest(dt=w)},this.setOpaqueSort=function(w){q=w},this.setTransparentSort=function(w){J=w},this.getClearColor=function(w){return w.copy(Ft.getClearColor())},this.setClearColor=function(){Ft.setClearColor.apply(Ft,arguments)},this.getClearAlpha=function(){return Ft.getClearAlpha()},this.setClearAlpha=function(){Ft.setClearAlpha.apply(Ft,arguments)},this.clear=function(w=!0,O=!0,$=!0){let Y=0;if(w){let k=!1;if(R!==null){const ht=R.texture.format;k=ht===uo||ht===ho||ht===co}if(k){const ht=R.texture.type,Mt=ht===Cn||ht===ci||ht===ds||ht===Gi||ht===oo||ht===lo,Ct=Ft.getClearColor(),Pt=Ft.getClearAlpha(),zt=Ct.r,Vt=Ct.g,Lt=Ct.b;Mt?(g[0]=zt,g[1]=Vt,g[2]=Lt,g[3]=Pt,C.clearBufferuiv(C.COLOR,0,g)):(y[0]=zt,y[1]=Vt,y[2]=Lt,y[3]=Pt,C.clearBufferiv(C.COLOR,0,y))}else Y|=C.COLOR_BUFFER_BIT}O&&(Y|=C.DEPTH_BUFFER_BIT),$&&(Y|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",et,!1),e.removeEventListener("webglcontextrestored",St,!1),e.removeEventListener("webglcontextcreationerror",yt,!1),wt.dispose(),Kt.dispose(),bt.dispose(),S.dispose(),V.dispose(),j.dispose(),ce.dispose(),N.dispose(),Rt.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Eo),Z.removeEventListener("sessionend",To),qn.stop()};function et(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function St(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const w=Nt.autoReset,O=Et.enabled,$=Et.autoUpdate,Y=Et.needsUpdate,k=Et.type;xt(),Nt.autoReset=w,Et.enabled=O,Et.autoUpdate=$,Et.needsUpdate=Y,Et.type=k}function yt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Ht(w){const O=w.target;O.removeEventListener("dispose",Ht),me(O)}function me(w){Re(w),bt.remove(w)}function Re(w){const O=bt.get(w).programs;O!==void 0&&(O.forEach(function($){Rt.releaseProgram($)}),w.isShaderMaterial&&Rt.releaseShaderCache(w))}this.renderBufferDirect=function(w,O,$,Y,k,ht){O===null&&(O=Wt);const Mt=k.isMesh&&k.matrixWorld.determinant()<0,Ct=Yc(w,O,$,Y,k);ct.setMaterial(Y,Mt);let Pt=$.index,zt=1;if(Y.wireframe===!0){if(Pt=it.getWireframeAttribute($),Pt===void 0)return;zt=2}const Vt=$.drawRange,Lt=$.attributes.position;let ee=Vt.start*zt,he=(Vt.start+Vt.count)*zt;ht!==null&&(ee=Math.max(ee,ht.start*zt),he=Math.min(he,(ht.start+ht.count)*zt)),Pt!==null?(ee=Math.max(ee,0),he=Math.min(he,Pt.count)):Lt!=null&&(ee=Math.max(ee,0),he=Math.min(he,Lt.count));const ue=he-ee;if(ue<0||ue===1/0)return;ce.setup(k,Y,Ct,$,Pt);let Fe,re=Tt;if(Pt!==null&&(Fe=K.get(Pt),re=jt,re.setIndex(Fe)),k.isMesh)Y.wireframe===!0?(ct.setLineWidth(Y.wireframeLinewidth*ot()),re.setMode(C.LINES)):re.setMode(C.TRIANGLES);else if(k.isLine){let Dt=Y.linewidth;Dt===void 0&&(Dt=1),ct.setLineWidth(Dt*ot()),k.isLineSegments?re.setMode(C.LINES):k.isLineLoop?re.setMode(C.LINE_LOOP):re.setMode(C.LINE_STRIP)}else k.isPoints?re.setMode(C.POINTS):k.isSprite&&re.setMode(C.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)re.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(at.get("WEBGL_multi_draw"))re.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Dt=k._multiDrawStarts,xn=k._multiDrawCounts,ae=k._multiDrawCount,Ke=Pt?K.get(Pt).bytesPerElement:1,pi=bt.get(Y).currentProgram.getUniforms();for(let He=0;He<ae;He++)pi.setValue(C,"_gl_DrawID",He),re.render(Dt[He]/Ke,xn[He])}else if(k.isInstancedMesh)re.renderInstances(ee,ue,k.count);else if($.isInstancedBufferGeometry){const Dt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,xn=Math.min($.instanceCount,Dt);re.renderInstances(ee,ue,xn)}else re.render(ee,ue)};function oe(w,O,$){w.transparent===!0&&w.side===en&&w.forceSinglePass===!1?(w.side=ze,w.needsUpdate=!0,ys(w,O,$),w.side=$n,w.needsUpdate=!0,ys(w,O,$),w.side=en):ys(w,O,$)}this.compile=function(w,O,$=null){$===null&&($=w),d=Kt.get($),d.init(O),v.push(d),$.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(d.pushLight(k),k.castShadow&&d.pushShadow(k))}),w!==$&&w.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(d.pushLight(k),k.castShadow&&d.pushShadow(k))}),d.setupLights();const Y=new Set;return w.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const ht=k.material;if(ht)if(Array.isArray(ht))for(let Mt=0;Mt<ht.length;Mt++){const Ct=ht[Mt];oe(Ct,$,k),Y.add(Ct)}else oe(ht,$,k),Y.add(ht)}),v.pop(),d=null,Y},this.compileAsync=function(w,O,$=null){const Y=this.compile(w,O,$);return new Promise(k=>{function ht(){if(Y.forEach(function(Mt){bt.get(Mt).currentProgram.isReady()&&Y.delete(Mt)}),Y.size===0){k(w);return}setTimeout(ht,10)}at.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let Ze=null;function vn(w){Ze&&Ze(w)}function Eo(){qn.stop()}function To(){qn.start()}const qn=new wc;qn.setAnimationLoop(vn),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(w){Ze=w,Z.setAnimationLoop(w),w===null?qn.stop():qn.start()},Z.addEventListener("sessionstart",Eo),Z.addEventListener("sessionend",To),this.render=function(w,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(O),O=Z.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,O,R),d=Kt.get(w,v.length),d.init(O),v.push(d),ft.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),W.setFromProjectionMatrix(ft),mt=this.localClippingEnabled,Q=lt.init(this.clippingPlanes,mt),m=wt.get(w,_.length),m.init(),_.push(m),Z.enabled===!0&&Z.isPresenting===!0){const ht=x.xr.getDepthSensingMesh();ht!==null&&fr(ht,O,-1/0,x.sortObjects)}fr(w,O,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(q,J),tt=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,tt&&Ft.addToRenderList(m,w),this.info.render.frame++,Q===!0&&lt.beginShadows();const $=d.state.shadowsArray;Et.render($,w,O),Q===!0&&lt.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=m.opaque,k=m.transmissive;if(d.setupLights(),O.isArrayCamera){const ht=O.cameras;if(k.length>0)for(let Mt=0,Ct=ht.length;Mt<Ct;Mt++){const Pt=ht[Mt];Ro(Y,k,w,Pt)}tt&&Ft.render(w);for(let Mt=0,Ct=ht.length;Mt<Ct;Mt++){const Pt=ht[Mt];Ao(m,w,Pt,Pt.viewport)}}else k.length>0&&Ro(Y,k,w,O),tt&&Ft.render(w),Ao(m,w,O);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(x,w,O),ce.resetDefaultState(),b=-1,M=null,v.pop(),v.length>0?(d=v[v.length-1],Q===!0&&lt.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function fr(w,O,$,Y){if(w.visible===!1)return;if(w.layers.test(O.layers)){if(w.isGroup)$=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(O);else if(w.isLight)d.pushLight(w),w.castShadow&&d.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||W.intersectsSprite(w)){Y&&It.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ft);const Mt=j.update(w),Ct=w.material;Ct.visible&&m.push(w,Mt,Ct,$,It.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||W.intersectsObject(w))){const Mt=j.update(w),Ct=w.material;if(Y&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),It.copy(w.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),It.copy(Mt.boundingSphere.center)),It.applyMatrix4(w.matrixWorld).applyMatrix4(ft)),Array.isArray(Ct)){const Pt=Mt.groups;for(let zt=0,Vt=Pt.length;zt<Vt;zt++){const Lt=Pt[zt],ee=Ct[Lt.materialIndex];ee&&ee.visible&&m.push(w,Mt,ee,$,It.z,Lt)}}else Ct.visible&&m.push(w,Mt,Ct,$,It.z,null)}}const ht=w.children;for(let Mt=0,Ct=ht.length;Mt<Ct;Mt++)fr(ht[Mt],O,$,Y)}function Ao(w,O,$,Y){const k=w.opaque,ht=w.transmissive,Mt=w.transparent;d.setupLightsView($),Q===!0&&lt.setGlobalState(x.clippingPlanes,$),Y&&ct.viewport(I.copy(Y)),k.length>0&&xs(k,O,$),ht.length>0&&xs(ht,O,$),Mt.length>0&&xs(Mt,O,$),ct.buffers.depth.setTest(!0),ct.buffers.depth.setMask(!0),ct.buffers.color.setMask(!0),ct.setPolygonOffset(!1)}function Ro(w,O,$,Y){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[Y.id]===void 0&&(d.state.transmissionRenderTarget[Y.id]=new hi(1,1,{generateMipmaps:!0,type:at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float")?gs:Cn,minFilter:oi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace}));const ht=d.state.transmissionRenderTarget[Y.id],Mt=Y.viewport||I;ht.setSize(Mt.z,Mt.w);const Ct=x.getRenderTarget();x.setRenderTarget(ht),x.getClearColor(D),G=x.getClearAlpha(),G<1&&x.setClearColor(16777215,.5),x.clear(),tt&&Ft.render($);const Pt=x.toneMapping;x.toneMapping=Gn;const zt=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),d.setupLightsView(Y),Q===!0&&lt.setGlobalState(x.clippingPlanes,Y),xs(w,$,Y),A.updateMultisampleRenderTarget(ht),A.updateRenderTargetMipmap(ht),at.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let Lt=0,ee=O.length;Lt<ee;Lt++){const he=O[Lt],ue=he.object,Fe=he.geometry,re=he.material,Dt=he.group;if(re.side===en&&ue.layers.test(Y.layers)){const xn=re.side;re.side=ze,re.needsUpdate=!0,Co(ue,$,Y,Fe,re,Dt),re.side=xn,re.needsUpdate=!0,Vt=!0}}Vt===!0&&(A.updateMultisampleRenderTarget(ht),A.updateRenderTargetMipmap(ht))}x.setRenderTarget(Ct),x.setClearColor(D,G),zt!==void 0&&(Y.viewport=zt),x.toneMapping=Pt}function xs(w,O,$){const Y=O.isScene===!0?O.overrideMaterial:null;for(let k=0,ht=w.length;k<ht;k++){const Mt=w[k],Ct=Mt.object,Pt=Mt.geometry,zt=Y===null?Mt.material:Y,Vt=Mt.group;Ct.layers.test($.layers)&&Co(Ct,O,$,Pt,zt,Vt)}}function Co(w,O,$,Y,k,ht){w.onBeforeRender(x,O,$,Y,k,ht),w.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),k.onBeforeRender(x,O,$,Y,w,ht),k.transparent===!0&&k.side===en&&k.forceSinglePass===!1?(k.side=ze,k.needsUpdate=!0,x.renderBufferDirect($,O,Y,k,w,ht),k.side=$n,k.needsUpdate=!0,x.renderBufferDirect($,O,Y,k,w,ht),k.side=en):x.renderBufferDirect($,O,Y,k,w,ht),w.onAfterRender(x,O,$,Y,k,ht)}function ys(w,O,$){O.isScene!==!0&&(O=Wt);const Y=bt.get(w),k=d.state.lights,ht=d.state.shadowsArray,Mt=k.state.version,Ct=Rt.getParameters(w,k.state,ht,O,$),Pt=Rt.getProgramCacheKey(Ct);let zt=Y.programs;Y.environment=w.isMeshStandardMaterial?O.environment:null,Y.fog=O.fog,Y.envMap=(w.isMeshStandardMaterial?V:S).get(w.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&w.envMap===null?O.environmentRotation:w.envMapRotation,zt===void 0&&(w.addEventListener("dispose",Ht),zt=new Map,Y.programs=zt);let Vt=zt.get(Pt);if(Vt!==void 0){if(Y.currentProgram===Vt&&Y.lightsStateVersion===Mt)return Lo(w,Ct),Vt}else Ct.uniforms=Rt.getUniforms(w),w.onBeforeCompile(Ct,x),Vt=Rt.acquireProgram(Ct,Pt),zt.set(Pt,Vt),Y.uniforms=Ct.uniforms;const Lt=Y.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Lt.clippingPlanes=lt.uniform),Lo(w,Ct),Y.needsLights=Zc(w),Y.lightsStateVersion=Mt,Y.needsLights&&(Lt.ambientLightColor.value=k.state.ambient,Lt.lightProbe.value=k.state.probe,Lt.directionalLights.value=k.state.directional,Lt.directionalLightShadows.value=k.state.directionalShadow,Lt.spotLights.value=k.state.spot,Lt.spotLightShadows.value=k.state.spotShadow,Lt.rectAreaLights.value=k.state.rectArea,Lt.ltc_1.value=k.state.rectAreaLTC1,Lt.ltc_2.value=k.state.rectAreaLTC2,Lt.pointLights.value=k.state.point,Lt.pointLightShadows.value=k.state.pointShadow,Lt.hemisphereLights.value=k.state.hemi,Lt.directionalShadowMap.value=k.state.directionalShadowMap,Lt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Lt.spotShadowMap.value=k.state.spotShadowMap,Lt.spotLightMatrix.value=k.state.spotLightMatrix,Lt.spotLightMap.value=k.state.spotLightMap,Lt.pointShadowMap.value=k.state.pointShadowMap,Lt.pointShadowMatrix.value=k.state.pointShadowMatrix),Y.currentProgram=Vt,Y.uniformsList=null,Vt}function Po(w){if(w.uniformsList===null){const O=w.currentProgram.getUniforms();w.uniformsList=tr.seqWithValue(O.seq,w.uniforms)}return w.uniformsList}function Lo(w,O){const $=bt.get(w);$.outputColorSpace=O.outputColorSpace,$.batching=O.batching,$.batchingColor=O.batchingColor,$.instancing=O.instancing,$.instancingColor=O.instancingColor,$.instancingMorph=O.instancingMorph,$.skinning=O.skinning,$.morphTargets=O.morphTargets,$.morphNormals=O.morphNormals,$.morphColors=O.morphColors,$.morphTargetsCount=O.morphTargetsCount,$.numClippingPlanes=O.numClippingPlanes,$.numIntersection=O.numClipIntersection,$.vertexAlphas=O.vertexAlphas,$.vertexTangents=O.vertexTangents,$.toneMapping=O.toneMapping}function Yc(w,O,$,Y,k){O.isScene!==!0&&(O=Wt),A.resetTextureUnits();const ht=O.fog,Mt=Y.isMeshStandardMaterial?O.environment:null,Ct=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:$i,Pt=(Y.isMeshStandardMaterial?V:S).get(Y.envMap||Mt),zt=Y.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Vt=!!$.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Lt=!!$.morphAttributes.position,ee=!!$.morphAttributes.normal,he=!!$.morphAttributes.color;let ue=Gn;Y.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ue=x.toneMapping);const Fe=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,re=Fe!==void 0?Fe.length:0,Dt=bt.get(Y),xn=d.state.lights;if(Q===!0&&(mt===!0||w!==M)){const Ye=w===M&&Y.id===b;lt.setState(Y,w,Ye)}let ae=!1;Y.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==xn.state.version||Dt.outputColorSpace!==Ct||k.isBatchedMesh&&Dt.batching===!1||!k.isBatchedMesh&&Dt.batching===!0||k.isBatchedMesh&&Dt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Dt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Dt.instancing===!1||!k.isInstancedMesh&&Dt.instancing===!0||k.isSkinnedMesh&&Dt.skinning===!1||!k.isSkinnedMesh&&Dt.skinning===!0||k.isInstancedMesh&&Dt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Dt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Dt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Dt.instancingMorph===!1&&k.morphTexture!==null||Dt.envMap!==Pt||Y.fog===!0&&Dt.fog!==ht||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==lt.numPlanes||Dt.numIntersection!==lt.numIntersection)||Dt.vertexAlphas!==zt||Dt.vertexTangents!==Vt||Dt.morphTargets!==Lt||Dt.morphNormals!==ee||Dt.morphColors!==he||Dt.toneMapping!==ue||Dt.morphTargetsCount!==re)&&(ae=!0):(ae=!0,Dt.__version=Y.version);let Ke=Dt.currentProgram;ae===!0&&(Ke=ys(Y,O,k));let pi=!1,He=!1,ji=!1;const de=Ke.getUniforms(),on=Dt.uniforms;if(ct.useProgram(Ke.program)&&(pi=!0,He=!0,ji=!0),Y.id!==b&&(b=Y.id,He=!0),pi||M!==w){ct.buffers.depth.getReversed()?(rt.copy(w.projectionMatrix),iu(rt),su(rt),de.setValue(C,"projectionMatrix",rt)):de.setValue(C,"projectionMatrix",w.projectionMatrix),de.setValue(C,"viewMatrix",w.matrixWorldInverse);const Pn=de.map.cameraPosition;Pn!==void 0&&Pn.setValue(C,Ut.setFromMatrixPosition(w.matrixWorld)),_t.logarithmicDepthBuffer&&de.setValue(C,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&de.setValue(C,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,He=!0,ji=!0)}if(k.isSkinnedMesh){de.setOptional(C,k,"bindMatrix"),de.setOptional(C,k,"bindMatrixInverse");const Ye=k.skeleton;Ye&&(Ye.boneTexture===null&&Ye.computeBoneTexture(),de.setValue(C,"boneTexture",Ye.boneTexture,A))}k.isBatchedMesh&&(de.setOptional(C,k,"batchingTexture"),de.setValue(C,"batchingTexture",k._matricesTexture,A),de.setOptional(C,k,"batchingIdTexture"),de.setValue(C,"batchingIdTexture",k._indirectTexture,A),de.setOptional(C,k,"batchingColorTexture"),k._colorsTexture!==null&&de.setValue(C,"batchingColorTexture",k._colorsTexture,A));const Ji=$.morphAttributes;if((Ji.position!==void 0||Ji.normal!==void 0||Ji.color!==void 0)&&kt.update(k,$,Ke),(He||Dt.receiveShadow!==k.receiveShadow)&&(Dt.receiveShadow=k.receiveShadow,de.setValue(C,"receiveShadow",k.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(on.envMap.value=Pt,on.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&O.environment!==null&&(on.envMapIntensity.value=O.environmentIntensity),He&&(de.setValue(C,"toneMappingExposure",x.toneMappingExposure),Dt.needsLights&&qc(on,ji),ht&&Y.fog===!0&&vt.refreshFogUniforms(on,ht),vt.refreshMaterialUniforms(on,Y,F,X,d.state.transmissionRenderTarget[w.id]),tr.upload(C,Po(Dt),on,A)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(tr.upload(C,Po(Dt),on,A),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&de.setValue(C,"center",k.center),de.setValue(C,"modelViewMatrix",k.modelViewMatrix),de.setValue(C,"normalMatrix",k.normalMatrix),de.setValue(C,"modelMatrix",k.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const Ye=Y.uniformsGroups;for(let Pn=0,Ln=Ye.length;Pn<Ln;Pn++){const Io=Ye[Pn];N.update(Io,Ke),N.bind(Io,Ke)}}return Ke}function qc(w,O){w.ambientLightColor.needsUpdate=O,w.lightProbe.needsUpdate=O,w.directionalLights.needsUpdate=O,w.directionalLightShadows.needsUpdate=O,w.pointLights.needsUpdate=O,w.pointLightShadows.needsUpdate=O,w.spotLights.needsUpdate=O,w.spotLightShadows.needsUpdate=O,w.rectAreaLights.needsUpdate=O,w.hemisphereLights.needsUpdate=O}function Zc(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,O,$){bt.get(w.texture).__webglTexture=O,bt.get(w.depthTexture).__webglTexture=$;const Y=bt.get(w);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=$===void 0,Y.__autoAllocateDepthBuffer||at.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,O){const $=bt.get(w);$.__webglFramebuffer=O,$.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(w,O=0,$=0){R=w,E=O,T=$;let Y=!0,k=null,ht=!1,Mt=!1;if(w){const Pt=bt.get(w);if(Pt.__useDefaultFramebuffer!==void 0)ct.bindFramebuffer(C.FRAMEBUFFER,null),Y=!1;else if(Pt.__webglFramebuffer===void 0)A.setupRenderTarget(w);else if(Pt.__hasExternalTextures)A.rebindTextures(w,bt.get(w.texture).__webglTexture,bt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Lt=w.depthTexture;if(Pt.__boundDepthTexture!==Lt){if(Lt!==null&&bt.has(Lt)&&(w.width!==Lt.image.width||w.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(w)}}const zt=w.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(Mt=!0);const Vt=bt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Vt[O])?k=Vt[O][$]:k=Vt[O],ht=!0):w.samples>0&&A.useMultisampledRTT(w)===!1?k=bt.get(w).__webglMultisampledFramebuffer:Array.isArray(Vt)?k=Vt[$]:k=Vt,I.copy(w.viewport),B.copy(w.scissor),z=w.scissorTest}else I.copy(nt).multiplyScalar(F).floor(),B.copy(H).multiplyScalar(F).floor(),z=dt;if(ct.bindFramebuffer(C.FRAMEBUFFER,k)&&Y&&ct.drawBuffers(w,k),ct.viewport(I),ct.scissor(B),ct.setScissorTest(z),ht){const Pt=bt.get(w.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+O,Pt.__webglTexture,$)}else if(Mt){const Pt=bt.get(w.texture),zt=O||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,Pt.__webglTexture,$||0,zt)}b=-1},this.readRenderTargetPixels=function(w,O,$,Y,k,ht,Mt){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=bt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Mt!==void 0&&(Ct=Ct[Mt]),Ct){ct.bindFramebuffer(C.FRAMEBUFFER,Ct);try{const Pt=w.texture,zt=Pt.format,Vt=Pt.type;if(!_t.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=w.width-Y&&$>=0&&$<=w.height-k&&C.readPixels(O,$,Y,k,Xt.convert(zt),Xt.convert(Vt),ht)}finally{const Pt=R!==null?bt.get(R).__webglFramebuffer:null;ct.bindFramebuffer(C.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(w,O,$,Y,k,ht,Mt){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=bt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Mt!==void 0&&(Ct=Ct[Mt]),Ct){const Pt=w.texture,zt=Pt.format,Vt=Pt.type;if(!_t.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=w.width-Y&&$>=0&&$<=w.height-k){ct.bindFramebuffer(C.FRAMEBUFFER,Ct);const Lt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Lt),C.bufferData(C.PIXEL_PACK_BUFFER,ht.byteLength,C.STREAM_READ),C.readPixels(O,$,Y,k,Xt.convert(zt),Xt.convert(Vt),0);const ee=R!==null?bt.get(R).__webglFramebuffer:null;ct.bindFramebuffer(C.FRAMEBUFFER,ee);const he=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await nu(C,he,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Lt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,ht),C.deleteBuffer(Lt),C.deleteSync(he),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,O=null,$=0){w.isTexture!==!0&&(as("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,w=arguments[1]);const Y=Math.pow(2,-$),k=Math.floor(w.image.width*Y),ht=Math.floor(w.image.height*Y),Mt=O!==null?O.x:0,Ct=O!==null?O.y:0;A.setTexture2D(w,0),C.copyTexSubImage2D(C.TEXTURE_2D,$,0,0,Mt,Ct,k,ht),ct.unbindTexture()},this.copyTextureToTexture=function(w,O,$=null,Y=null,k=0){w.isTexture!==!0&&(as("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,w=arguments[1],O=arguments[2],k=arguments[3]||0,$=null);let ht,Mt,Ct,Pt,zt,Vt,Lt,ee,he;const ue=w.isCompressedTexture?w.mipmaps[k]:w.image;$!==null?(ht=$.max.x-$.min.x,Mt=$.max.y-$.min.y,Ct=$.isBox3?$.max.z-$.min.z:1,Pt=$.min.x,zt=$.min.y,Vt=$.isBox3?$.min.z:0):(ht=ue.width,Mt=ue.height,Ct=ue.depth||1,Pt=0,zt=0,Vt=0),Y!==null?(Lt=Y.x,ee=Y.y,he=Y.z):(Lt=0,ee=0,he=0);const Fe=Xt.convert(O.format),re=Xt.convert(O.type);let Dt;O.isData3DTexture?(A.setTexture3D(O,0),Dt=C.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(A.setTexture2DArray(O,0),Dt=C.TEXTURE_2D_ARRAY):(A.setTexture2D(O,0),Dt=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,O.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,O.unpackAlignment);const xn=C.getParameter(C.UNPACK_ROW_LENGTH),ae=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Ke=C.getParameter(C.UNPACK_SKIP_PIXELS),pi=C.getParameter(C.UNPACK_SKIP_ROWS),He=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,ue.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ue.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Pt),C.pixelStorei(C.UNPACK_SKIP_ROWS,zt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Vt);const ji=w.isDataArrayTexture||w.isData3DTexture,de=O.isDataArrayTexture||O.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const on=bt.get(w),Ji=bt.get(O),Ye=bt.get(on.__renderTarget),Pn=bt.get(Ji.__renderTarget);ct.bindFramebuffer(C.READ_FRAMEBUFFER,Ye.__webglFramebuffer),ct.bindFramebuffer(C.DRAW_FRAMEBUFFER,Pn.__webglFramebuffer);for(let Ln=0;Ln<Ct;Ln++)ji&&C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,bt.get(w).__webglTexture,k,Vt+Ln),w.isDepthTexture?(de&&C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,bt.get(O).__webglTexture,k,he+Ln),C.blitFramebuffer(Pt,zt,ht,Mt,Lt,ee,ht,Mt,C.DEPTH_BUFFER_BIT,C.NEAREST)):de?C.copyTexSubImage3D(Dt,k,Lt,ee,he+Ln,Pt,zt,ht,Mt):C.copyTexSubImage2D(Dt,k,Lt,ee,he+Ln,Pt,zt,ht,Mt);ct.bindFramebuffer(C.READ_FRAMEBUFFER,null),ct.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else de?w.isDataTexture||w.isData3DTexture?C.texSubImage3D(Dt,k,Lt,ee,he,ht,Mt,Ct,Fe,re,ue.data):O.isCompressedArrayTexture?C.compressedTexSubImage3D(Dt,k,Lt,ee,he,ht,Mt,Ct,Fe,ue.data):C.texSubImage3D(Dt,k,Lt,ee,he,ht,Mt,Ct,Fe,re,ue):w.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,k,Lt,ee,ht,Mt,Fe,re,ue.data):w.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,k,Lt,ee,ue.width,ue.height,Fe,ue.data):C.texSubImage2D(C.TEXTURE_2D,k,Lt,ee,ht,Mt,Fe,re,ue);C.pixelStorei(C.UNPACK_ROW_LENGTH,xn),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ae),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ke),C.pixelStorei(C.UNPACK_SKIP_ROWS,pi),C.pixelStorei(C.UNPACK_SKIP_IMAGES,He),k===0&&O.generateMipmaps&&C.generateMipmap(Dt),ct.unbindTexture()},this.copyTextureToTexture3D=function(w,O,$=null,Y=null,k=0){return w.isTexture!==!0&&(as("WebGLRenderer: copyTextureToTexture3D function signature has changed."),$=arguments[0]||null,Y=arguments[1]||null,w=arguments[2],O=arguments[3],k=arguments[4]||0),as('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,O,$,Y,k)},this.initRenderTarget=function(w){bt.get(w).__webglFramebuffer===void 0&&A.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?A.setTextureCube(w,0):w.isData3DTexture?A.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?A.setTexture2DArray(w,0):A.setTexture2D(w,0),ct.unbindTexture()},this.resetState=function(){E=0,T=0,R=null,ct.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}}class vo{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new qt(t),this.near=e,this.far=n}clone(){return new vo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ic extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $e,this.environmentIntensity=1,this.environmentRotation=new $e,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class vs extends Ne{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _n{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,p=(a-h)/f;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new ut:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new P,s=[],r=[],a=[],o=new P,l=new ie;for(let p=0;p<=t;p++){const g=p/t;s[p]=this.getTangentAt(g,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ee(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Ee(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class xo extends _n{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ut){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*h-p*u+this.aX,c=f*u+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class p0 extends xo{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function yo(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,p*=h,s(a,o,f,p)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const Vs=new P,$r=new yo,Yr=new yo,qr=new yo;class m0 extends _n{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new P){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Vs.subVectors(s[0],s[1]).add(s[0]),c=Vs);const u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Vs.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Vs),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),p),y=Math.pow(u.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(h),p);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),$r.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,y,m),Yr.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,y,m),qr.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,y,m)}else this.curveType==="catmullrom"&&($r.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Yr.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),qr.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set($r.calc(l),Yr.calc(l),qr.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ul(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function g0(i,t){const e=1-i;return e*e*t}function _0(i,t){return 2*(1-i)*i*t}function v0(i,t){return i*i*t}function ls(i,t,e,n){return g0(i,t)+_0(i,e)+v0(i,n)}function x0(i,t){const e=1-i;return e*e*e*t}function y0(i,t){const e=1-i;return 3*e*e*i*t}function M0(i,t){return 3*(1-i)*i*i*t}function S0(i,t){return i*i*i*t}function cs(i,t,e,n,s){return x0(i,t)+y0(i,e)+M0(i,n)+S0(i,s)}class Dc extends _n{constructor(t=new ut,e=new ut,n=new ut,s=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ut){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(cs(t,s.x,r.x,a.x,o.x),cs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class b0 extends _n{constructor(t=new P,e=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new P){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(cs(t,s.x,r.x,a.x,o.x),cs(t,s.y,r.y,a.y,o.y),cs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Uc extends _n{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class w0 extends _n{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nc extends _n{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(ls(t,s.x,r.x,a.x),ls(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class E0 extends _n{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(ls(t,s.x,r.x,a.x),ls(t,s.y,r.y,a.y),ls(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fc extends _n{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(Ul(o,l.x,c.x,h.x,u.x),Ul(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ut().fromArray(s))}return this}}var $a=Object.freeze({__proto__:null,ArcCurve:p0,CatmullRomCurve3:m0,CubicBezierCurve:Dc,CubicBezierCurve3:b0,EllipseCurve:xo,LineCurve:Uc,LineCurve3:w0,QuadraticBezierCurve:Nc,QuadraticBezierCurve3:E0,SplineCurve:Fc});class T0 extends _n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new $a[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new $a[s.type]().fromJSON(s))}return this}}class Ya extends T0{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Uc(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Nc(this.currentPoint.clone(),new ut(t,e),new ut(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new Dc(this.currentPoint.clone(),new ut(t,e),new ut(n,s),new ut(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Fc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const c=new xo(t,e,n,s,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Mo extends Ae{constructor(t=[new ut(0,-.5),new ut(.5,0),new ut(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ee(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/e,u=new P,f=new ut,p=new P,g=new P,y=new P;let m=0,d=0;for(let _=0;_<=t.length-1;_++)switch(_){case 0:m=t[_+1].x-t[_].x,d=t[_+1].y-t[_].y,p.x=d*1,p.y=-m,p.z=d*0,y.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case t.length-1:l.push(y.x,y.y,y.z);break;default:m=t[_+1].x-t[_].x,d=t[_+1].y-t[_].y,p.x=d*1,p.y=-m,p.z=d*0,g.copy(p),p.x+=y.x,p.y+=y.y,p.z+=y.z,p.normalize(),l.push(p.x,p.y,p.z),y.copy(g)}for(let _=0;_<=e;_++){const v=n+_*h*s,x=Math.sin(v),L=Math.cos(v);for(let E=0;E<=t.length-1;E++){u.x=t[E].x*x,u.y=t[E].y,u.z=t[E].x*L,a.push(u.x,u.y,u.z),f.x=_/e,f.y=E/(t.length-1),o.push(f.x,f.y);const T=l[3*E+0]*x,R=l[3*E+1],b=l[3*E+0]*L;c.push(T,R,b)}}for(let _=0;_<e;_++)for(let v=0;v<t.length-1;v++){const x=v+_*t.length,L=x,E=x+t.length,T=x+t.length+1,R=x+1;r.push(L,E,R),r.push(T,R,E)}this.setIndex(r),this.setAttribute("position",new se(a,3)),this.setAttribute("uv",new se(o,2)),this.setAttribute("normal",new se(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mo(t.points,t.segments,t.phiStart,t.phiLength)}}class Wn extends Mo{constructor(t=1,e=1,n=4,s=8){const r=new Ya;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new Wn(t.radius,t.length,t.capSegments,t.radialSegments)}}class ui extends Ae{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new P,h=new ut;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const p=n+u/e*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new se(a,3)),this.setAttribute("normal",new se(o,3)),this.setAttribute("uv",new se(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ui(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ot extends Ae{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],p=[];let g=0;const y=[],m=n/2;let d=0;_(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new se(u,3)),this.setAttribute("normal",new se(f,3)),this.setAttribute("uv",new se(p,2));function _(){const x=new P,L=new P;let E=0;const T=(e-t)/n;for(let R=0;R<=r;R++){const b=[],M=R/r,I=M*(e-t)+t;for(let B=0;B<=s;B++){const z=B/s,D=z*l+o,G=Math.sin(D),U=Math.cos(D);L.x=I*G,L.y=-M*n+m,L.z=I*U,u.push(L.x,L.y,L.z),x.set(G,T,U).normalize(),f.push(x.x,x.y,x.z),p.push(z,1-M),b.push(g++)}y.push(b)}for(let R=0;R<s;R++)for(let b=0;b<r;b++){const M=y[b][R],I=y[b+1][R],B=y[b+1][R+1],z=y[b][R+1];(t>0||b!==0)&&(h.push(M,I,z),E+=3),(e>0||b!==r-1)&&(h.push(I,B,z),E+=3)}c.addGroup(d,E,0),d+=E}function v(x){const L=g,E=new ut,T=new P;let R=0;const b=x===!0?t:e,M=x===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,m*M,0),f.push(0,M,0),p.push(.5,.5),g++;const I=g;for(let B=0;B<=s;B++){const D=B/s*l+o,G=Math.cos(D),U=Math.sin(D);T.x=b*U,T.y=m*M,T.z=b*G,u.push(T.x,T.y,T.z),f.push(0,M,0),E.x=G*.5+.5,E.y=U*.5*M+.5,p.push(E.x,E.y),g++}for(let B=0;B<s;B++){const z=L+B,D=I+B;x===!0?h.push(D,D+1,z):h.push(D+1,D,z),R+=3}c.addGroup(d,R,x===!0?1:2),d+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ot(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class gn extends Ot{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new gn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class So extends Ae{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new se(r,3)),this.setAttribute("normal",new se(r.slice(),3)),this.setAttribute("uv",new se(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const v=new P,x=new P,L=new P;for(let E=0;E<e.length;E+=3)p(e[E+0],v),p(e[E+1],x),p(e[E+2],L),l(v,x,L,_)}function l(_,v,x,L){const E=L+1,T=[];for(let R=0;R<=E;R++){T[R]=[];const b=_.clone().lerp(x,R/E),M=v.clone().lerp(x,R/E),I=E-R;for(let B=0;B<=I;B++)B===0&&R===E?T[R][B]=b:T[R][B]=b.clone().lerp(M,B/I)}for(let R=0;R<E;R++)for(let b=0;b<2*(E-R)-1;b++){const M=Math.floor(b/2);b%2===0?(f(T[R][M+1]),f(T[R+1][M]),f(T[R][M])):(f(T[R][M+1]),f(T[R+1][M+1]),f(T[R+1][M]))}}function c(_){const v=new P;for(let x=0;x<r.length;x+=3)v.x=r[x+0],v.y=r[x+1],v.z=r[x+2],v.normalize().multiplyScalar(_),r[x+0]=v.x,r[x+1]=v.y,r[x+2]=v.z}function h(){const _=new P;for(let v=0;v<r.length;v+=3){_.x=r[v+0],_.y=r[v+1],_.z=r[v+2];const x=m(_)/2/Math.PI+.5,L=d(_)/Math.PI+.5;a.push(x,1-L)}g(),u()}function u(){for(let _=0;_<a.length;_+=6){const v=a[_+0],x=a[_+2],L=a[_+4],E=Math.max(v,x,L),T=Math.min(v,x,L);E>.9&&T<.1&&(v<.2&&(a[_+0]+=1),x<.2&&(a[_+2]+=1),L<.2&&(a[_+4]+=1))}}function f(_){r.push(_.x,_.y,_.z)}function p(_,v){const x=_*3;v.x=t[x+0],v.y=t[x+1],v.z=t[x+2]}function g(){const _=new P,v=new P,x=new P,L=new P,E=new ut,T=new ut,R=new ut;for(let b=0,M=0;b<r.length;b+=9,M+=6){_.set(r[b+0],r[b+1],r[b+2]),v.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),E.set(a[M+0],a[M+1]),T.set(a[M+2],a[M+3]),R.set(a[M+4],a[M+5]),L.copy(_).add(v).add(x).divideScalar(3);const I=m(L);y(E,M+0,_,I),y(T,M+2,v,I),y(R,M+4,x,I)}}function y(_,v,x,L){L<0&&_.x===1&&(a[v]=_.x-1),x.x===0&&x.z===0&&(a[v]=L/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function d(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new So(t.vertices,t.indices,t.radius,t.details)}}class Oc extends Ya{constructor(t){super(t),this.uuid=qi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Ya().fromJSON(s))}return this}}const A0={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=kc(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,u,f,p;if(n&&(r=I0(i,t,r,e)),i.length>80*e){o=c=i[0],l=h=i[1];for(let g=e;g<s;g+=e)u=i[g],f=i[g+1],u<o&&(o=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);p=Math.max(c-o,h-l),p=p!==0?32767/p:0}return fs(r,a,e,o,l,p,0),a}};function kc(i,t,e,n,s){let r,a;if(s===G0(i,t,e,n)>0)for(r=t;r<e;r+=n)a=Nl(r,i[r],i[r+1],a);else for(r=e-n;r>=t;r-=n)a=Nl(r,i[r],i[r+1],a);return a&&dr(a,a.next)&&(ms(a),a=a.next),a}function di(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(dr(e,e.next)||pe(e.prev,e,e.next)===0)){if(ms(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function fs(i,t,e,n,s,r,a){if(!i)return;!a&&r&&O0(i,n,s,r);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?C0(i,n,s,r):R0(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),ms(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=P0(di(i),t,e),fs(i,t,e,n,s,r,2)):a===2&&L0(i,t,e,n,s,r):fs(di(i),t,e,n,s,r,1);break}}}function R0(i){const t=i.prev,e=i,n=i.next;if(pe(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=s<r?s<a?s:a:r<a?r:a,u=o<l?o<c?o:c:l<c?l:c,f=s>r?s>a?s:a:r>a?r:a,p=o>l?o>c?o:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=p&&Ni(s,o,r,l,a,c,g.x,g.y)&&pe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function C0(i,t,e,n){const s=i.prev,r=i,a=i.next;if(pe(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,u=r.y,f=a.y,p=o<l?o<c?o:c:l<c?l:c,g=h<u?h<f?h:f:u<f?u:f,y=o>l?o>c?o:c:l>c?l:c,m=h>u?h>f?h:f:u>f?u:f,d=qa(p,g,t,e,n),_=qa(y,m,t,e,n);let v=i.prevZ,x=i.nextZ;for(;v&&v.z>=d&&x&&x.z<=_;){if(v.x>=p&&v.x<=y&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&Ni(o,h,l,u,c,f,v.x,v.y)&&pe(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=p&&x.x<=y&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&Ni(o,h,l,u,c,f,x.x,x.y)&&pe(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=d;){if(v.x>=p&&v.x<=y&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&Ni(o,h,l,u,c,f,v.x,v.y)&&pe(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=_;){if(x.x>=p&&x.x<=y&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&Ni(o,h,l,u,c,f,x.x,x.y)&&pe(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function P0(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!dr(s,r)&&zc(s,n,n.next,r)&&ps(s,r)&&ps(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),ms(n),ms(n.next),n=i=r),n=n.next}while(n!==i);return di(n)}function L0(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&B0(a,o)){let l=Bc(a,o);a=di(a,a.next),l=di(l,l.next),fs(a,t,e,n,s,r,0),fs(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function I0(i,t,e,n){const s=[];let r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=kc(i,o,l,n,!1),c===c.next&&(c.steiner=!0),s.push(z0(c));for(s.sort(D0),r=0;r<s.length;r++)e=U0(s[r],e);return e}function D0(i,t){return i.x-t.x}function U0(i,t){const e=N0(i,t);if(!e)return t;const n=Bc(e,i);return di(n,n.next),di(e,e.next)}function N0(i,t){let e=t,n=-1/0,s;const r=i.x,a=i.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;const o=s,l=s.x,c=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&Ni(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),ps(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&F0(s,e)))&&(s=e,h=u)),e=e.next;while(e!==o);return s}function F0(i,t){return pe(i.prev,i,t.prev)<0&&pe(t.next,i,i.next)<0}function O0(i,t,e,n){let s=i;do s.z===0&&(s.z=qa(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,k0(s)}function k0(i){let t,e,n,s,r,a,o,l,c=1;do{for(e=i,i=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(a>1);return i}function qa(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function z0(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Ni(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function B0(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!H0(i,t)&&(ps(i,t)&&ps(t,i)&&V0(i,t)&&(pe(i.prev,i,t.prev)||pe(i,t.prev,t))||dr(i,t)&&pe(i.prev,i,i.next)>0&&pe(t.prev,t,t.next)>0)}function pe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function dr(i,t){return i.x===t.x&&i.y===t.y}function zc(i,t,e,n){const s=Ws(pe(i,t,e)),r=Ws(pe(i,t,n)),a=Ws(pe(e,n,i)),o=Ws(pe(e,n,t));return!!(s!==r&&a!==o||s===0&&Gs(i,e,t)||r===0&&Gs(i,n,t)||a===0&&Gs(e,i,n)||o===0&&Gs(e,t,n))}function Gs(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Ws(i){return i>0?1:i<0?-1:0}function H0(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&zc(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function ps(i,t){return pe(i.prev,i,i.next)<0?pe(i,t,i.next)>=0&&pe(i,i.prev,t)>=0:pe(i,t,i.prev)<0||pe(i,i.next,t)<0}function V0(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Bc(i,t){const e=new Za(i.i,i.x,i.y),n=new Za(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Nl(i,t,e,n){const s=new Za(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ms(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Za(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function G0(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class hs{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return hs.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Fl(t),Ol(n,t);let a=t.length;e.forEach(Fl);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,Ol(n,e[l]);const o=A0.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Fl(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Ol(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class bo extends Ae{constructor(t=new Oc([new ut(.5,.5),new ut(-.5,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new se(s,3)),this.setAttribute("uv",new se(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const d=e.extrudePath,_=e.UVGenerator!==void 0?e.UVGenerator:W0;let v,x=!1,L,E,T,R;d&&(v=d.getSpacedPoints(h),x=!0,f=!1,L=d.computeFrenetFrames(h,!1),E=new P,T=new P,R=new P),f||(m=0,p=0,g=0,y=0);const b=o.extractPoints(c);let M=b.shape;const I=b.holes;if(!hs.isClockWise(M)){M=M.reverse();for(let tt=0,ot=I.length;tt<ot;tt++){const C=I[tt];hs.isClockWise(C)&&(I[tt]=C.reverse())}}const z=hs.triangulateShape(M,I),D=M;for(let tt=0,ot=I.length;tt<ot;tt++){const C=I[tt];M=M.concat(C)}function G(tt,ot,C){return ot||console.error("THREE.ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(ot,C)}const U=M.length,X=z.length;function F(tt,ot,C){let At,at,_t;const ct=tt.x-ot.x,Nt=tt.y-ot.y,bt=C.x-tt.x,A=C.y-tt.y,S=ct*ct+Nt*Nt,V=ct*A-Nt*bt;if(Math.abs(V)>Number.EPSILON){const K=Math.sqrt(S),it=Math.sqrt(bt*bt+A*A),j=ot.x-Nt/K,Rt=ot.y+ct/K,vt=C.x-A/it,wt=C.y+bt/it,Kt=((vt-j)*A-(wt-Rt)*bt)/(ct*A-Nt*bt);At=j+ct*Kt-tt.x,at=Rt+Nt*Kt-tt.y;const lt=At*At+at*at;if(lt<=2)return new ut(At,at);_t=Math.sqrt(lt/2)}else{let K=!1;ct>Number.EPSILON?bt>Number.EPSILON&&(K=!0):ct<-Number.EPSILON?bt<-Number.EPSILON&&(K=!0):Math.sign(Nt)===Math.sign(A)&&(K=!0),K?(At=-Nt,at=ct,_t=Math.sqrt(S)):(At=ct,at=Nt,_t=Math.sqrt(S/2))}return new ut(At/_t,at/_t)}const q=[];for(let tt=0,ot=D.length,C=ot-1,At=tt+1;tt<ot;tt++,C++,At++)C===ot&&(C=0),At===ot&&(At=0),q[tt]=F(D[tt],D[C],D[At]);const J=[];let nt,H=q.concat();for(let tt=0,ot=I.length;tt<ot;tt++){const C=I[tt];nt=[];for(let At=0,at=C.length,_t=at-1,ct=At+1;At<at;At++,_t++,ct++)_t===at&&(_t=0),ct===at&&(ct=0),nt[At]=F(C[At],C[_t],C[ct]);J.push(nt),H=H.concat(nt)}for(let tt=0;tt<m;tt++){const ot=tt/m,C=p*Math.cos(ot*Math.PI/2),At=g*Math.sin(ot*Math.PI/2)+y;for(let at=0,_t=D.length;at<_t;at++){const ct=G(D[at],q[at],At);rt(ct.x,ct.y,-C)}for(let at=0,_t=I.length;at<_t;at++){const ct=I[at];nt=J[at];for(let Nt=0,bt=ct.length;Nt<bt;Nt++){const A=G(ct[Nt],nt[Nt],At);rt(A.x,A.y,-C)}}}const dt=g+y;for(let tt=0;tt<U;tt++){const ot=f?G(M[tt],H[tt],dt):M[tt];x?(T.copy(L.normals[0]).multiplyScalar(ot.x),E.copy(L.binormals[0]).multiplyScalar(ot.y),R.copy(v[0]).add(T).add(E),rt(R.x,R.y,R.z)):rt(ot.x,ot.y,0)}for(let tt=1;tt<=h;tt++)for(let ot=0;ot<U;ot++){const C=f?G(M[ot],H[ot],dt):M[ot];x?(T.copy(L.normals[tt]).multiplyScalar(C.x),E.copy(L.binormals[tt]).multiplyScalar(C.y),R.copy(v[tt]).add(T).add(E),rt(R.x,R.y,R.z)):rt(C.x,C.y,u/h*tt)}for(let tt=m-1;tt>=0;tt--){const ot=tt/m,C=p*Math.cos(ot*Math.PI/2),At=g*Math.sin(ot*Math.PI/2)+y;for(let at=0,_t=D.length;at<_t;at++){const ct=G(D[at],q[at],At);rt(ct.x,ct.y,u+C)}for(let at=0,_t=I.length;at<_t;at++){const ct=I[at];nt=J[at];for(let Nt=0,bt=ct.length;Nt<bt;Nt++){const A=G(ct[Nt],nt[Nt],At);x?rt(A.x,A.y+v[h-1].y,v[h-1].x+C):rt(A.x,A.y,u+C)}}}W(),Q();function W(){const tt=s.length/3;if(f){let ot=0,C=U*ot;for(let At=0;At<X;At++){const at=z[At];ft(at[2]+C,at[1]+C,at[0]+C)}ot=h+m*2,C=U*ot;for(let At=0;At<X;At++){const at=z[At];ft(at[0]+C,at[1]+C,at[2]+C)}}else{for(let ot=0;ot<X;ot++){const C=z[ot];ft(C[2],C[1],C[0])}for(let ot=0;ot<X;ot++){const C=z[ot];ft(C[0]+U*h,C[1]+U*h,C[2]+U*h)}}n.addGroup(tt,s.length/3-tt,0)}function Q(){const tt=s.length/3;let ot=0;mt(D,ot),ot+=D.length;for(let C=0,At=I.length;C<At;C++){const at=I[C];mt(at,ot),ot+=at.length}n.addGroup(tt,s.length/3-tt,1)}function mt(tt,ot){let C=tt.length;for(;--C>=0;){const At=C;let at=C-1;at<0&&(at=tt.length-1);for(let _t=0,ct=h+m*2;_t<ct;_t++){const Nt=U*_t,bt=U*(_t+1),A=ot+At+Nt,S=ot+at+Nt,V=ot+at+bt,K=ot+At+bt;Ut(A,S,V,K)}}}function rt(tt,ot,C){l.push(tt),l.push(ot),l.push(C)}function ft(tt,ot,C){It(tt),It(ot),It(C);const At=s.length/3,at=_.generateTopUV(n,s,At-3,At-2,At-1);Wt(at[0]),Wt(at[1]),Wt(at[2])}function Ut(tt,ot,C,At){It(tt),It(ot),It(At),It(ot),It(C),It(At);const at=s.length/3,_t=_.generateSideWallUV(n,s,at-6,at-3,at-2,at-1);Wt(_t[0]),Wt(_t[1]),Wt(_t[3]),Wt(_t[1]),Wt(_t[2]),Wt(_t[3])}function It(tt){s.push(l[tt*3+0]),s.push(l[tt*3+1]),s.push(l[tt*3+2])}function Wt(tt){r.push(tt.x),r.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return X0(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new $a[s.type]().fromJSON(s)),new bo(n,t.options)}}const W0={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new ut(r,a),new ut(o,l),new ut(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],p=t[s*3+1],g=t[s*3+2],y=t[r*3],m=t[r*3+1],d=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ut(a,1-l),new ut(c,1-u),new ut(f,1-g),new ut(y,1-d)]:[new ut(o,1-l),new ut(h,1-u),new ut(p,1-g),new ut(m,1-d)]}};function X0(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Xn extends So{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Xn(t.radius,t.detail)}}class sr extends Ae{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let u=t;const f=(e-t)/s,p=new P,g=new ut;for(let y=0;y<=s;y++){for(let m=0;m<=n;m++){const d=r+m/n*a;p.x=u*Math.cos(d),p.y=u*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let y=0;y<s;y++){const m=y*(n+1);for(let d=0;d<n;d++){const _=d+m,v=_,x=_+n+1,L=_+n+2,E=_+1;o.push(v,x,E),o.push(x,L,E)}}this.setIndex(o),this.setAttribute("position",new se(l,3)),this.setAttribute("normal",new se(c,3)),this.setAttribute("uv",new se(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Yt extends Ae{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new P,f=new P,p=[],g=[],y=[],m=[];for(let d=0;d<=n;d++){const _=[],v=d/n;let x=0;d===0&&a===0?x=.5/e:d===n&&l===Math.PI&&(x=-.5/e);for(let L=0;L<=e;L++){const E=L/e;u.x=-t*Math.cos(s+E*r)*Math.sin(a+v*o),u.y=t*Math.cos(a+v*o),u.z=t*Math.sin(s+E*r)*Math.sin(a+v*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),y.push(f.x,f.y,f.z),m.push(E+x,1-v),_.push(c++)}h.push(_)}for(let d=0;d<n;d++)for(let _=0;_<e;_++){const v=h[d][_+1],x=h[d][_],L=h[d+1][_],E=h[d+1][_+1];(d!==0||a>0)&&p.push(v,x,E),(d!==n-1||l<Math.PI)&&p.push(x,L,E)}this.setIndex(p),this.setAttribute("position",new se(g,3)),this.setAttribute("normal",new se(y,3)),this.setAttribute("uv",new se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yt(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class dn extends Ae{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new P,u=new P,f=new P;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const y=g/s*r,m=p/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(y),u.y=(t+e*Math.cos(m))*Math.sin(y),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(y),h.y=t*Math.sin(y),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const y=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,_=(s+1)*p+g;a.push(y,m,_),a.push(m,d,_)}this.setIndex(a),this.setAttribute("position",new se(o,3)),this.setAttribute("normal",new se(l,3)),this.setAttribute("uv",new se(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class rr extends Zi{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new qt(16777215),this.specular=new qt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fo,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $e,this.combine=lr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Se extends Zi{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fo,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $e,this.combine=lr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Hc extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Vc extends Hc{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Zr=new ie,kl=new P,zl=new P;class $0{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new go,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;kl.setFromMatrixPosition(t.matrixWorld),e.position.copy(kl),zl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(zl),e.updateMatrixWorld(),Zr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Zr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Y0 extends $0{constructor(){super(new Ec(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ka extends Hc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new Y0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class q0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Bl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Bl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Bl(){return performance.now()}const Hl=new ie;class Z0{constructor(t,e,n=0,s=1/0){this.ray=new _c(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new mo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Hl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hl),this}intersectObject(t,e=!0,n=[]){return ja(t,this,n,e),n.sort(Vl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ja(t[s],this,n,e);return n.sort(Vl),n}}function Vl(i,t){return i.distance-t.distance}function ja(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)ja(r[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:so}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=so);const ke=i=>new Se({color:i}),ss=(i,t)=>new Wn(i,t,4,10);class Ja{constructor(t){this.root=new Qt,this.hips=new Qt,this.torso=new Qt,this.head=new Qt,this.armL=new Qt,this.armR=new Qt,this.foreL=new Qt,this.foreR=new Qt,this.legL=new Qt,this.legR=new Qt,this.shinL=new Qt,this.shinR=new Qt,this.eyes=[],this.hatSlot=new Qt,this.shirtMats=[],this.accentMats=[],this.outfitExtras=new Qt,this.hand=new Qt,this.speed=0,this.phase=0,this.t=Math.random()*10,this.blink=2,this.action=null,this.actT=0,this.actDur=1,this.onPeak=null,this.peakDone=!1,this.sitting=!1;const e=ke(t.skin),n=ke(t.hair),s=ke(t.pants??"#3d4f6b"),r=ke("#f4efe6"),a=ke("#5a3a28"),o=ke("#f07f6a");this.shirtMats.push(o),this.root.add(this.hips),this.hips.position.y=.56;const l=new st(ss(.2,.22),o);l.scale.set(1.12,1,.86),l.position.y=.2,this.torso.add(l);const c=new st(new Ot(.205,.215,.1,14),s);c.position.y=.02,c.scale.z=.88,this.torso.add(c),this.torso.add(this.outfitExtras),this.hips.add(this.torso),this.head.position.y=.55;const h=new st(new Yt(.27,20,16),e);h.scale.set(1,.95,.95),this.head.add(h);const u=new st(new Yt(.29,20,12,0,Math.PI*2,0,Math.PI*.55),n);u.rotation.x=-.35,u.position.set(0,.03,-.02),this.head.add(u);const f=new st(new Yt(.27,16,12),n);f.scale.set(1.02,.85,.7),f.position.set(0,-.02,-.08),this.head.add(f);for(const _ of[-1,1]){const v=new st(new Yt(.11,10,8),n);v.scale.set(1.3,.55,.8),v.position.set(_*.1,.16,.2),v.rotation.z=_*.4,this.head.add(v)}const p=new Yt(.042,10,8),g=ke("#2a1f1a"),y=new Be({color:"#ffffff"});for(const _ of[-1,1]){const v=new st(p,g);v.scale.set(.85,1.15,.5),v.position.set(_*.1,0,.245),this.head.add(v),this.eyes.push(v);const x=new st(new Yt(.013,6,4),y);x.position.set(.012,.018,.02),v.add(x);const L=new st(new ui(.045,12),new Be({color:"#f29a8a",transparent:!0,opacity:.55}));L.position.set(_*.16,-.07,.228),L.rotation.y=_*.45,this.head.add(L);const E=new st(new Yt(.055,8,6),e);E.position.set(_*.265,-.01,0),E.scale.set(.6,1,.8),this.head.add(E)}const m=new st(new dn(.03,.009,4,10,Math.PI),g);m.position.set(0,-.09,.25),m.rotation.z=Math.PI,this.head.add(m),this.head.add(this.hatSlot),this.torso.add(this.head);for(const[_,v,x]of[[this.armL,this.foreL,-1],[this.armR,this.foreR,1]]){_.position.set(x*.25,.34,0);const L=new st(ss(.065,.12),o);L.position.y=-.1,_.add(L),v.position.y=-.2,_.add(v);const E=new st(ss(.058,.1),e);E.position.y=-.08,v.add(E);const T=new st(new Yt(.07,10,8),e);T.position.y=-.18,v.add(T),x===1&&(this.hand.position.y=-.22,v.add(this.hand)),this.torso.add(_)}for(const[_,v,x]of[[this.legL,this.shinL,-1],[this.legR,this.shinR,1]]){_.position.set(x*.1,0,0);const L=new st(ss(.085,.12),s);L.position.y=-.11,_.add(L),v.position.y=-.24,_.add(v);const E=new st(ss(.075,.1),s);E.position.y=-.08,v.add(E);const T=new st(new Yt(.1,12,8),r);T.scale.set(.85,.6,1.35),T.position.set(0,-.23,.04),v.add(T);const R=new st(new Ot(.085,.085,.03,10),a);R.scale.z=1.5,R.position.set(0,-.28,.04),v.add(R),this.hips.add(_)}const d=new st(new ui(.34,20),new Be({color:"#000",transparent:!0,opacity:.18,depthWrite:!1}));d.rotation.x=-Math.PI/2,d.position.y=.02,this.root.add(d),l.castShadow=h.castShadow=u.castShadow=!0,this.setLook(t)}setLook(t){const e=be(t.outfit),n=t.shirt??(e==null?void 0:e.color)??"#f07f6a";this.shirtMats.forEach(r=>r.color.set(n)),this.outfitExtras.clear();const s=t.outfit;if(s==="yagmurluk"){const r=new st(new dn(.17,.06,8,16),ke(n));r.rotation.x=Math.PI/2,r.position.set(0,.42,-.03),this.outfitExtras.add(r);for(let a=0;a<3;a++){const o=new st(new Yt(.018,6,4),ke(e.color2));o.position.set(0,.32-a*.1,.18),this.outfitExtras.add(o)}}else if(s==="kazak_hardal"){const r=new st(new dn(.11,.04,8,16),ke("#c98b2a"));r.rotation.x=Math.PI/2,r.position.y=.43,this.outfitExtras.add(r)}else if(s==="hirka_mavi"){const r=new st(new Bt(.1,.36,.05),ke(e.color2));r.position.set(0,.2,.17),this.outfitExtras.add(r)}else{const r=new st(new dn(.09,.025,6,14),ke("#ffffff"));r.rotation.x=Math.PI/2,r.position.y=.43,this.outfitExtras.add(r)}this.setHat(t.hat)}setHat(t){this.hatSlot.clear();const e=t?be(t):null;if(!e)return;const n=ke(e.color),s=ke(e.color2??e.color);if(t==="kasket"){const r=new st(new Yt(.3,16,8,0,Math.PI*2,0,Math.PI/2),n);r.scale.set(1.02,.5,1.05),r.position.y=.12,this.hatSlot.add(r);const a=new st(new Ot(.2,.2,.03,16,1,!1,-Math.PI/2,Math.PI),n);a.position.set(0,.13,.2),a.scale.z=.7,this.hatSlot.add(a)}else if(t==="bere"){const r=new st(new Yt(.3,16,10,0,Math.PI*2,0,Math.PI/2),n);r.scale.y=.85,r.position.y=.06,this.hatSlot.add(r);const a=new st(new dn(.28,.05,8,20),s);a.rotation.x=Math.PI/2,a.position.y=.07,this.hatSlot.add(a);const o=new st(new Yt(.08,10,8),s);o.position.y=.33,this.hatSlot.add(o)}else if(t==="hasir"){const r=new st(new Ot(.48,.48,.03,24),n);r.position.y=.14,this.hatSlot.add(r);const a=new st(new Ot(.22,.26,.2,18),n);a.position.y=.25,this.hatSlot.add(a);const o=new st(new Ot(.265,.265,.05,18),s);o.position.y=.18,this.hatSlot.add(o)}else if(t==="kedi_kulak"){const r=new st(new Yt(.3,16,10,0,Math.PI*2,0,Math.PI/2),n);r.scale.y=.75,r.position.y=.06,this.hatSlot.add(r);for(const a of[-1,1]){const o=new st(new gn(.08,.16,8),n);o.position.set(a*.16,.28,0),o.rotation.z=-a*.3,this.hatSlot.add(o)}}}act(t,e=1.2,n){this.action=t,this.actT=0,this.actDur=e,this.onPeak=n??null,this.peakDone=!1}get busy(){return this.action!==null}update(t){var E;this.t+=t;const e=Math.min(this.speed,6),n=e>.15;this.phase+=t*(4+e*2.1);const s=Math.min(1,e/3.2),r=Math.sin(this.phase),a=Math.cos(this.phase);let o=.56,l=0,c=0,h=0,u=0,f=0,p=0,g=0,y=-.12,m=.12,d=-.15,_=-.15,v=0,x=0;if(n)c=r*.8*s,h=-r*.8*s,u=Math.max(0,-Math.sin(this.phase-.6))*1*s,f=Math.max(0,Math.sin(this.phase-.6))*1*s,p=-r*.7*s,g=r*.7*s,d=-.3-Math.max(0,-r)*.4*s,_=-.3-Math.max(0,r)*.4*s,o+=Math.abs(a)*.05*s-.02*s,l=.1*s+(e>4?.08:0),v=-l*.5;else{const T=Math.sin(this.t*2.2);o+=T*.004,y=-.12-T*.02,m=.12+T*.02,x=Math.sin(this.t*.45)*.25*(Math.sin(this.t*.17)>.3?1:.2)}if(this.sitting&&(o=.42,c=h=-1.45,u=f=1.45,p=g=-.5,d=_=-.6),this.action){this.actT+=t;const T=this.actT/this.actDur,R=Math.sin(Math.min(1,T)*Math.PI),b=Math.min(1,R*1.6);if(!this.peakDone&&T>=.5&&(this.peakDone=!0,(E=this.onPeak)==null||E.call(this)),this.action==="kneel")o-=.26*b,c=h=-1.3*b,u=f=2.1*b,l=.55*b,g=-1.1*b,p=-.4*b,_=-.2,v=.25*b;else if(this.action==="pet")o-=.22*b,c=-1.1*b,h=-.4*b,u=1.9*b,f=1.6*b,l=.45*b,g=(-1.15+Math.sin(this.actT*14)*.18)*b,_=-.2,p=-.3*b,v=.3*b;else if(this.action==="throw"){const M=T<.45?T/.45:1-(T-.45)/.55;g=T<.45?2.2*M:-1.4*(1-M)*1.5+.2,_=-.5,l=T<.45?-.1:.25*R}else this.action==="wave"&&(m=2.6*b,g=0,_=-.3+Math.sin(this.actT*12)*.5*b);T>=1&&(this.action=null,this.onPeak=null)}this.hips.position.y=o,this.torso.rotation.x=l,this.legL.rotation.x=c,this.legR.rotation.x=h,this.shinL.rotation.x=u,this.shinR.rotation.x=f,this.armL.rotation.set(p,0,y),this.armR.rotation.set(g,0,m),this.foreL.rotation.x=d,this.foreR.rotation.x=_,this.head.rotation.set(v,x,0),this.blink-=t;const L=this.blink<.12;this.blink<0&&(this.blink=2+Math.random()*3);for(const T of this.eyes)T.scale.y=L?.15:1.15}}function K0(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Ae;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(u.morphAttributes[p])}if(t){let p;if(e)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(e){let h=0;const u=[];for(let f=0;f<i.length;++f){const p=i[f].index;for(let g=0;g<p.count;++g)u.push(p.getX(g)+h);h+=i[f].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Gl(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const p=[];for(let y=0;y<a[h].length;++y)p.push(a[h][y][f]);const g=Gl(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Gl(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new Xe(a,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let f=0,p=h.count;f<p;f++)for(let g=0;g<e;g++){const y=h.getComponent(f,g);o.setComponent(f+u,g,y)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}function j0(i,t=1e-4){t=Math.max(t,Number.EPSILON);const e={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count;let a=0;const o=Object.keys(i.attributes),l={},c={},h=[],u=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let _=0,v=o.length;_<v;_++){const x=o[_],L=i.attributes[x];l[x]=new L.constructor(new L.array.constructor(L.count*L.itemSize),L.itemSize,L.normalized);const E=i.morphAttributes[x];E&&(c[x]||(c[x]=[]),E.forEach((T,R)=>{const b=new T.array.constructor(T.count*T.itemSize);c[x][R]=new T.constructor(b,T.itemSize,T.normalized)}))}const p=t*.5,g=Math.log10(1/t),y=Math.pow(10,g),m=p*y;for(let _=0;_<r;_++){const v=n?n.getX(_):_;let x="";for(let L=0,E=o.length;L<E;L++){const T=o[L],R=i.getAttribute(T),b=R.itemSize;for(let M=0;M<b;M++)x+=`${~~(R[u[M]](v)*y+m)},`}if(x in e)h.push(e[x]);else{for(let L=0,E=o.length;L<E;L++){const T=o[L],R=i.getAttribute(T),b=i.morphAttributes[T],M=R.itemSize,I=l[T],B=c[T];for(let z=0;z<M;z++){const D=u[z],G=f[z];if(I[G](a,R[D](v)),b)for(let U=0,X=b.length;U<X;U++)B[U][G](a,b[U][D](v))}}e[x]=a,h.push(a),a++}}const d=i.clone();for(const _ in i.attributes){const v=l[_];if(d.setAttribute(_,new v.constructor(v.array.slice(0,a*v.itemSize),v.itemSize,v.normalized)),_ in c)for(let x=0;x<c[_].length;x++){const L=c[_][x];d.morphAttributes[_][x]=new L.constructor(L.array.slice(0,a*L.itemSize),L.itemSize,L.normalized)}}return d.setIndex(h),d}function fn(i){let t=i>>>0||1;const e=()=>(t^=t<<13,t^=t>>>17,t^=t<<5,(t>>>0)%1e5/1e5);return{next:e,range:(n,s)=>n+(s-n)*e(),int:(n,s)=>Math.floor(n+(s-n+1)*e()),pick:n=>n[Math.floor(e()*n.length)%n.length],chance:n=>e()<n}}function zn(i,t,e,n=!0){const s=document.createElement("canvas");s.width=i,s.height=t,e(s.getContext("2d"));const r=new vs(s);return r.colorSpace=De,n&&(r.wrapS=r.wrapT=us),r.anisotropy=4,r}const mn={plaster:()=>zn(256,256,i=>{i.fillStyle="#f2f2f2",i.fillRect(0,0,256,256);const t=fn(11);for(let e=0;e<2600;e++){const n=215+t.int(0,40);i.fillStyle=`rgba(${n},${n},${n},0.35)`,i.fillRect(t.int(0,255),t.int(0,255),t.int(1,4),t.int(1,4))}for(let e=0;e<30;e++)i.fillStyle="rgba(200,190,180,0.10)",i.beginPath(),i.arc(t.int(0,255),t.int(0,255),t.int(8,30),0,7),i.fill()}),cobble:()=>zn(512,512,i=>{i.fillStyle="#8f8478",i.fillRect(0,0,512,512);const t=fn(5),e=32;for(let n=0;n<512;n+=e*.8)for(let s=-e;s<512;s+=e){const r=Math.floor(n/(e*.8))%2*e*.5,a=t.int(150,190),o=t.int(-12,12);i.fillStyle=`rgb(${a+o+10},${a+2},${a-14})`,i.beginPath(),i.roundRect(s+r+2,n+2,e-4,e*.8-4,9),i.fill(),i.fillStyle="rgba(255,255,255,0.10)",i.beginPath(),i.roundRect(s+r+5,n+4,e-12,6,3),i.fill()}}),slab:()=>zn(256,256,i=>{i.fillStyle="#cfc6b8",i.fillRect(0,0,256,256);const t=fn(9);for(let e=0;e<256;e+=64)for(let n=0;n<256;n+=64){const s=t.int(205,228);i.fillStyle=`rgb(${s},${s-6},${s-16})`,i.fillRect(n+2,e+2,60,60)}}),grass:()=>zn(256,256,i=>{i.fillStyle="#7fae5a",i.fillRect(0,0,256,256);const t=fn(3);for(let e=0;e<3e3;e++)i.fillStyle=t.chance(.5)?"rgba(150,196,100,0.5)":"rgba(96,140,70,0.45)",i.fillRect(t.int(0,255),t.int(0,255),2,t.int(2,5));for(let e=0;e<40;e++)i.fillStyle=t.pick(["#f6e27a","#ffffff","#f2a7b8"]),i.beginPath(),i.arc(t.int(0,255),t.int(0,255),1.8,0,7),i.fill()}),roof:()=>zn(128,128,i=>{i.fillStyle="#ededed",i.fillRect(0,0,128,128);for(let t=0;t<128;t+=16){i.fillStyle="rgba(0,0,0,0.20)",i.fillRect(0,t+13,128,3);for(let e=t/16%2?0:8;e<128;e+=16)i.fillStyle="rgba(0,0,0,0.10)",i.fillRect(e,t,2,14);i.fillStyle="rgba(255,255,255,0.25)",i.fillRect(0,t,128,3)}}),wood:()=>zn(128,128,i=>{i.fillStyle="#e6e6e6",i.fillRect(0,0,128,128);const t=fn(21);for(let e=0;e<40;e++){i.strokeStyle=`rgba(0,0,0,${t.range(.04,.12)})`,i.lineWidth=t.range(1,2.5);const n=t.int(0,128);i.beginPath(),i.moveTo(0,n),i.bezierCurveTo(40,n+t.int(-6,6),80,n+t.int(-6,6),128,n),i.stroke()}}),sky:()=>zn(4,256,i=>{const t=i.createLinearGradient(0,0,0,256);t.addColorStop(0,"#7fb6e0"),t.addColorStop(.45,"#bcd9ea"),t.addColorStop(.75,"#f7dcc0"),t.addColorStop(1,"#f5c9a2"),i.fillStyle=t,i.fillRect(0,0,4,256)},!1),sign:(i,t,e="#fff")=>zn(512,128,n=>{n.fillStyle=t,n.roundRect(0,0,512,128,26),n.fill(),n.strokeStyle="rgba(255,255,255,0.6)",n.lineWidth=6,n.roundRect(10,10,492,108,20),n.stroke(),n.fillStyle=e,n.font='800 64px Baloo2, "Trebuchet MS", sans-serif',n.textAlign="center",n.textBaseline="middle",n.fillText(i,256,70)},!1)},Ci=new P;function J0(i,t,e=!1){const n=i.attributes.position,s=i.attributes.normal,r=i.attributes.uv;for(let a=0;a<n.count;a++){Ci.set(s.getX(a),s.getY(a),s.getZ(a));const o=Math.abs(Ci.x),l=Math.abs(Ci.y),c=Math.abs(Ci.z);let h,u;e?o>c?(h=n.getZ(a),u=n.getX(a)+n.getY(a)*Math.sign(Ci.x)):(h=n.getX(a),u=n.getZ(a)+n.getY(a)*Math.sign(Ci.z)):l>=o&&l>=c?(h=n.getX(a),u=n.getZ(a)):o>=c?(h=n.getZ(a),u=n.getY(a)):(h=n.getX(a),u=n.getY(a)),r.setXY(a,h/t,u/t)}r.needsUpdate=!0}const Xs=new qt;class wo{constructor(t,e={}){this.mats=t,this.uvScale=e,this.parts=new Map,this.tile=!1}add(t,e,n,s,r=0){let a=e.index?e.toNonIndexed():e.clone();a.attributes.uv||a.setAttribute("uv",new Xe(new Float32Array(a.attributes.position.count*2),2)),a.attributes.normal||a.computeVertexNormals(),s&&a.applyMatrix4(s);const o=this.uvScale[t];o&&J0(a,Math.abs(o),o<0),Xs.set(n);const l=a.attributes.position.count,c=new Float32Array(l*3),h=a.attributes.normal;for(let g=0;g<l;g++){const y=1-r*(1-Math.max(0,h.getY(g)))*.5;c[g*3]=Xs.r*y,c[g*3+1]=Xs.g*y,c[g*3+2]=Xs.b*y}a.setAttribute("color",new Xe(c,3));for(const g of Object.keys(a.attributes))["position","normal","uv","color"].includes(g)||a.deleteAttribute(g);a.computeBoundingBox();const u=a.boundingBox,f=this.tile?`|${Math.floor((u.min.x+u.max.x)/2/20)}|${Math.floor((u.min.z+u.max.z)/2/20)}`:"",p=t+f;this.parts.has(p)||this.parts.set(p,[]),this.parts.get(p).push(a)}box(t,e,n,s,r,a,o,l,c=0,h=0,u=0){const f=new ie().compose(new P(a,o,l),new fi().setFromEuler(new $e(h,c,u)),new P(1,1,1));this.add(t,new Bt(n,s,r),e,f)}build(t=!0){const e=new Qt;for(const[n,s]of this.parts){const r=n.split("|")[0],a=K0(s,!1);if(!a)continue;a.computeBoundingSphere();const o=new st(a,this.mats[r]);o.castShadow=t&&r!=="glass"&&r!=="ground",o.receiveShadow=!0,o.name=n,e.add(o),s.forEach(l=>l.dispose())}return this.parts.clear(),e}}const pt=(i,t,e,n=0,s=1,r=1,a=1,o=0,l=0)=>new ie().compose(new P(i,t,e),new fi().setFromEuler(new $e(o,n,l)),new P(s,r,a));function Wl(i,t,e){const n=i/2,s=t/2,r=[-n,0,-s],a=[n,0,-s],o=[n,0,s],l=[-n,0,s];let c;if(i>=t){const d=(i-t)/2,_=[-d,e,0],v=[d,e,0];c=[[r,a,v,_],[o,l,_,v],[l,r,_],[a,o,v]]}else{const d=(t-i)/2,_=[0,e,-d],v=[0,e,d];c=[[r,a,_],[a,o,v,_],[o,l,v],[l,r,_,v]]}const h=[],u=new P,f=new P,p=new P,g=(d,_,v)=>{u.fromArray(d),f.fromArray(_),p.fromArray(v),f.sub(u).cross(p.sub(u)).y<0?h.push(...d,...v,..._):h.push(...d,..._,...v)};for(const d of c)g(d[0],d[1],d[2]),d.length===4&&g(d[0],d[2],d[3]);const y=new Ae;y.setAttribute("position",new se(h,3)),y.computeVertexNormals();const m=[];for(let d=0;d<h.length;d+=3)m.push((h[d]+h[d+2])*.5,h[d+1]*1.2);return y.setAttribute("uv",new se(m,2)),y}function Gc(i,t,e=2,n=.12){let s=new Xn(i,e);s.deleteAttribute("normal"),s.deleteAttribute("uv"),s=j0(s);const r=s.attributes.position,a=fn(t),o=new Map;for(let l=0;l<r.count;l++){const c=`${r.getX(l).toFixed(3)},${r.getY(l).toFixed(3)},${r.getZ(l).toFixed(3)}`;o.has(c)||o.set(c,1+a.range(-n,n));const h=o.get(c);r.setXYZ(l,r.getX(l)*h,r.getY(l)*h*.92,r.getZ(l)*h)}return s.computeVertexNormals(),s}const Le=(i,t)=>new Se({color:i,map:t??null});function Q0(i,t){const e=document.createElement("canvas");e.width=256,e.height=128;const n=e.getContext("2d"),s=i.look,r=fn(t);n.fillStyle=s.body,n.fillRect(0,0,256,128);const a=s.mark??"#333";if(s.pattern==="tabby"){n.strokeStyle=a,n.lineCap="round";for(let l=10;l<120;l+=13){n.lineWidth=r.range(4,7),n.beginPath(),n.moveTo(136,l+r.range(-3,3));for(let c=136;c<=248;c+=14)n.lineTo(c,l+Math.sin(c*.12+l)*4);n.stroke()}n.lineWidth=9,n.beginPath(),n.moveTo(192,0),n.lineTo(192,128),n.stroke()}else if(s.pattern==="spots"){n.fillStyle=a;for(let l=0;l<70;l++)n.beginPath(),n.ellipse(r.range(0,256),r.range(0,128),r.range(3,7),r.range(3,6),0,0,7),n.fill()}else if(s.pattern==="calico")for(let l=0;l<9;l++)n.fillStyle=l%2?a:"#2b2727",n.beginPath(),n.ellipse(r.range(120,256),r.range(0,128),r.range(16,34),r.range(12,26),r.next()*3,0,7),n.fill();else s.pattern==="saddle"&&(n.fillStyle=a,n.beginPath(),n.ellipse(192,60,60,44,0,0,7),n.fill());for(let l=0;l<900;l++)n.fillStyle=`rgba(${r.chance(.5)?"255,255,255":"0,0,0"},0.05)`,n.fillRect(r.int(0,255),r.int(0,127),1,r.int(2,5));const o=new vs(e);return o.colorSpace=De,o}class Qa{constructor(t,e=1,n={}){this.breed=t,this.root=new Qt,this.body=new Qt,this.head=new Qt,this.mouth=new Qt,this.legs=[],this.tail=[],this.eyes=[],this.ears=[],this.wearSlot=new Qt,this.collarSlot=new Qt,this.speed=0,this.pose="stand",this.poseK={stand:1,sit:0,lie:0,eat:0,happy:0,beg:0},this.wag=.3,this.phase=Math.random()*6,this.t=Math.random()*10,this.blink=1+Math.random()*3,this.lookYaw=0,this.sleeping=!1;const s=t.look;this.cat=t.species==="cat";const r=s.size*(this.cat?1.22:1.3);this.bodyR=(this.cat?.15:.18)*r*(1+(s.fluff??0)*.12),this.bodyLen=(this.cat?.5:.62)*r*(s.long??1),this.legLen=(this.cat?.2:.27)*r*(s.legs??1),this.bodyY=this.legLen+this.bodyR*.75;const a=(this.cat?.158:.172)*r*(s.head??1);this.height=this.bodyY+this.bodyR+a*1.6,this.radius=Math.max(this.bodyLen*.55,.25);const o=Q0(t,e),l=Le("#ffffff",o),c=Le(s.body),h=Le(s.belly),u=s.pattern==="points",f=s.pattern==="mask",p=Le(u?s.mark:s.body),g=Le(f||u?s.mark:s.belly);this.root.add(this.body),this.body.position.y=this.bodyY;const y=new Yt(1,22,16);y.rotateX(Math.PI/2);const m=new st(y,l);m.scale.set(this.bodyR,this.bodyR*.95,this.bodyLen/2),this.body.add(m);const d=new st(new Yt(1,16,12),h);d.scale.set(this.bodyR*.82,this.bodyR*.7,this.bodyLen*.42),d.position.y=-this.bodyR*.3,this.body.add(d);const _=1+(s.fluff??0)*.5,v=new st(new Yt(1,14,10),s.pattern==="tuxedo"||s.pattern==="calico"||s.fluff?h:c);v.scale.set(this.bodyR*.8*_,this.bodyR*.85*_,this.bodyR*.7*_),v.position.set(0,-this.bodyR*.05,this.bodyLen*.36),this.body.add(v),this.body.add(this.wearSlot),this.head.position.set(0,this.bodyR*.85,this.bodyLen/2+a*.35),this.body.add(this.head);const x=new st(new Yt(a,18,14),u?Le(s.body):c);if(x.scale.set(this.cat?1.08:1,this.cat?.92:.95,this.cat?.95:1.05),this.head.add(x),s.pattern==="tabby")for(const F of[-1,0,1]){const q=new st(new Bt(a*.12,a*.05,a*.5),Le(s.mark));q.position.set(F*a*.3,a*.85,a*.2),q.rotation.y=F*.3,this.head.add(q)}if(s.pattern==="tuxedo"||s.pattern==="calico"){const F=new st(new Yt(a*.55,12,8),h);F.scale.set(.8,1,.6),F.position.set(0,-a*.25,a*.6),this.head.add(F)}const L=s.eyes??(this.cat?"#d8b23a":"#3a2a20"),E=a*(this.cat?.22:.17);for(const F of[-1,1]){const q=new st(new Yt(E,12,10),Le(this.cat?L:"#2a1f1a"));if(q.position.set(F*a*.42,a*.12,a*.82),q.scale.z=.55,this.head.add(q),this.eyes.push(q),this.cat){const nt=new st(new Yt(E*.5,8,6),Le("#151010"));nt.scale.set(.45,1.2,.6),nt.position.z=E*.75,q.add(nt)}const J=new st(new Yt(E*.28,6,4),new Be({color:"#fff"}));J.position.set(E*.3,E*.35,E*.8),q.add(J)}if(this.cat){for(const J of[-1,1]){const nt=new st(new Yt(a*.24,10,8),g);nt.position.set(J*a*.16,-a*.3,a*.82),this.head.add(nt)}const F=new st(new Yt(a*.1,8,6),Le("#e8889a"));F.scale.set(1.3,.8,.8),F.position.set(0,-a*.12,a*1),this.head.add(F);const q=new Be({color:"#f4f1ea"});for(const J of[-1,1])for(const nt of[-.02,.03]){const H=new st(new Ot(.0035,.0035,a*1.3,3),q);H.rotation.z=Math.PI/2+nt*4*J,H.position.set(J*a*.75,-a*.3+nt,a*.85),this.head.add(H)}this.mouth.position.set(0,-a*.45,a*.9)}else{const F=s.snout??1,q=new st(new Wn(a*.42,a*.5*F,4,10),g);q.rotation.x=Math.PI/2,q.position.set(0,-a*.28,a*(.75+.25*F)),this.head.add(q);const J=new st(new Yt(a*.17,10,8),Le("#1f1a18"));J.scale.set(1.2,.9,.9),J.position.set(0,-a*.16,a*(1.05+.55*F)),this.head.add(J),this.tongue=new st(new Yt(a*.16,8,6),Le("#e8707e")),this.tongue.scale.set(1,.35,1.5),this.tongue.position.set(0,-a*.55,a*(.95+.3*F)),this.head.add(this.tongue),this.mouth.position.set(0,-a*.5,a*(1.1+.4*F))}this.head.add(this.mouth);const T=s.ears??1;for(const F of[-1,1]){const q=new Qt;this.head.add(q),this.ears.push(q);const J=f||u?Le(s.mark):p;if(this.cat||!s.floppy){q.position.set(F*a*.55,a*.72,-a*.05),q.rotation.z=-F*.35;const nt=new st(new gn(a*.36*T,a*.75*T,4),J);nt.scale.z=.5,nt.rotation.y=Math.PI/4,nt.position.y=a*.3*T,q.add(nt);const H=new st(new gn(a*.22*T,a*.5*T,4),Le("#f2b5b5"));H.scale.z=.3,H.rotation.y=Math.PI/4,H.position.set(0,a*.25*T,a*.06),q.add(H)}else{q.position.set(F*a*.78,a*.35,-a*.05);const nt=new st(new Yt(a*.45*T,10,8),J);nt.scale.set(.35,1.1,.75),nt.position.y=-a*.35*T,q.add(nt),q.rotation.z=F*.25}}const R=u?p:c,b=s.pattern==="tuxedo"?h:R,M=this.bodyR*.55,I=this.bodyLen*.33;for(const[F,q]of[[-M,I],[M,I],[-M,-I],[M,-I]]){const J=new Qt;J.position.set(F,this.legLen+.02,q),this.root.add(J),this.legs.push(J);const nt=(this.cat?.05:.068)*s.size*(1+(s.fluff??0)*.3),H=new st(new Wn(nt,this.legLen*.75,3,8),R);H.position.y=-this.legLen*.48,J.add(H);const dt=new st(new Yt(nt*1.25,8,6),b);dt.scale.set(1,.65,1.3),dt.position.set(0,-this.legLen+nt*.6,nt*.4),J.add(dt)}const B=(s.tail??1)*(this.cat?.42:.3)*s.size,z=(this.cat?.035:.045)*s.size*(1+(s.fluff??0)*.9);let D=this.body;const G=u?p:s.pattern==="tabby"||s.pattern==="spots"?l:c,U=4;for(let F=0;F<U;F++){const q=new Qt;F===0?q.position.set(0,this.bodyR*.45,-this.bodyLen/2+.02):q.position.y=B/U,D.add(q),this.tail.push(q);const J=new st(new Wn(z*(1-F*.12),B/U,3,6),G);J.position.y=B/U/2,q.add(J),D=q}if(!this.cat&&s.pattern!=="mask"&&t.id!=="dalmacyali"){const F=new st(new Yt(z*.9,6,5),h);F.position.y=B/U,D.add(F)}this.body.add(this.collarSlot),this.setGear(n.wear,n.collar);const X=new st(new ui(1,18),new Be({color:"#000",transparent:!0,opacity:.18,depthWrite:!1}));X.scale.set(this.bodyR*1.6,this.bodyLen*.75,1),X.rotation.x=-Math.PI/2,X.position.y=.02,this.root.add(X),m.castShadow=x.castShadow=!0}setGear(t,e){this.wearSlot.clear(),this.collarSlot.clear();const n=t?be(t):null;if(n){let r;if(n.color2){const l=document.createElement("canvas");l.width=64,l.height=64;const c=l.getContext("2d");c.fillStyle=n.color,c.fillRect(0,0,64,64),c.fillStyle=n.color2;for(let h=0;h<64;h+=16)c.fillRect(0,h,64,7);r=new vs(l),r.colorSpace=De}const a=new Yt(1,18,12,0,Math.PI*2,0,Math.PI*.62);a.rotateX(Math.PI/2-0),a.rotateX(-Math.PI/2);const o=new st(a,Le(r?"#ffffff":n.color,r));o.scale.set(this.bodyR*1.08,this.bodyR*1.05,this.bodyLen*.4),o.position.set(0,0,this.bodyLen*.08),this.wearSlot.add(o)}const s=e?be(e):null;if(s){const r=new st(new dn(this.bodyR*.62,this.bodyR*.09,6,18),Le(s.color));if(r.position.set(0,this.bodyR*.65,this.bodyLen/2-.01),r.rotation.x=Math.PI/2-.9,this.collarSlot.add(r),s.color2){const a=new st(new Yt(this.bodyR*.14,8,6),new rr({color:s.color2,shininess:90}));a.position.set(0,this.bodyR*.3,this.bodyLen/2+this.bodyR*.25),this.collarSlot.add(a)}}}setPose(t){this.pose=t}update(t){this.t+=t;const e=this.poseK;for(const E of Object.keys(e))e[E]+=((E===this.pose?1:0)-e[E])*Math.min(1,t*6);const n=this.speed,s=n>.08;this.phase+=t*(5+n*(this.cat?6:4.5));const r=Math.min(1,n/1.5)*(n>3?.9:.6),a=n>3,o=a?[0,.4,Math.PI,Math.PI+.4]:[0,Math.PI,Math.PI,0],l=e.sit+e.beg,c=e.lie;for(let E=0;E<4;E++){const T=E<2;let R=s?Math.sin(this.phase+o[E])*r:0;T||(R-=l*1.35),R+=c*(T?-1.35:1.35),e.beg>.01&&T&&(R-=e.beg*1.2),this.legs[E].rotation.x=R,this.legs[E].position.y=this.legLen+.02-c*this.legLen*.85-(T?0:l*this.legLen*.35)-(T&&e.beg>0?-e.beg*.1:0)}const h=s?Math.abs(Math.sin(this.phase))*.025*r:Math.sin(this.t*2.4)*.004;this.body.position.y=this.bodyY+h-c*(this.legLen*.85)-l*this.legLen*.25+e.beg*.08,this.body.rotation.x=-l*.36-e.beg*.3+e.eat*.12+(s?Math.sin(this.phase*2)*.02:0),this.body.rotation.z=e.happy*Math.sin(this.t*9)*.06+c*.15,this.body.position.z=l*-this.bodyLen*.12;let u=0,f=this.lookYaw*(1-c),p=0;e.eat>.01&&(u+=e.eat*(.75+Math.sin(this.t*11)*.12)),u+=l*.45+e.beg*.3,p+=e.happy*Math.sin(this.t*3)*.25+(this.cat?0:e.beg*.3),u+=c*.55,!s&&e.stand>.5&&!this.lookYaw&&(f+=Math.sin(this.t*.5)*.35*(Math.sin(this.t*.21)>0?1:0)),this.head.rotation.set(u,f,p),this.ears.forEach((E,T)=>{E.rotation.x=Math.max(0,Math.sin(this.t*7+T*2)-.92)*3});const g=this.sleeping?.05:Math.max(this.wag,e.happy,e.beg*.8,s?.25:0),y=this.cat?3+g*5:7+g*12,m=this.cat?.25+g*.35:.2+g*.7,d=!!this.breed.look.floppy;let _=this.cat?s?-.75:-.35:d?-2.1:-.55;const v=Math.max(c,l*.85);_=_+(-1.95-_)*v;const x=this.cat?.3:d?-.08:.45;this.tail.forEach((E,T)=>{T===0?(E.rotation.x=_,E.rotation.z=Math.sin(this.t*y)*m):(E.rotation.x=x*(1-v*.8),E.rotation.z=Math.sin(this.t*y-T*.8)*m*.4)}),this.tongue&&(this.tongue.visible=(e.happy>.3||a||e.beg>.3)&&!this.sleeping),this.blink-=t,this.blink<0&&(this.blink=2+Math.random()*4);const L=this.blink<.12||e.happy>.5||this.sleeping;for(const E of this.eyes)E.scale.y=L?.12:1}}const tn=i=>new Se({color:i}),Xl=["#e07a5f","#f2c94c","#7a9e7e","#4f86c6","#e98aa0","#9a5ac8","#f4efe6","#8a5a3a"];function $l(i,t,e){const n=new Qt,s=new qt(t).offsetHSL(0,-.05,-.18).getStyle(),r=tn("#2b211c");if(i==="kedi_evi"){const o=new st(new Bt(.9,.7,.8),tn(t));o.position.y=.38,n.add(o);const l=new st(new ui(.17,20),r);l.position.set(0,.29,.401),n.add(l);const c=new st(new dn(.18,.03,6,20),tn("#f4efe6"));c.position.set(0,.29,.405),n.add(c);const h=new st(new gn(.75,.5,4),tn(s));h.rotation.y=Math.PI/4,h.position.y=.98,h.scale.set(1,1,.92),n.add(h);const u=new st(new Ot(.25,.25,.08,14),tn("#f2a7b8"));u.position.set(0,.06,.62),n.add(u);const f=new st(new Ot(.07,.07,.9,10),tn("#d8c39a"));f.position.set(.62,.45,.1),n.add(f);const p=new st(new Ot(.2,.2,.06,14),tn(t));p.position.set(.62,.92,.1),n.add(p)}else{const o=new st(new Bt(1.1,.85,1.2),tn(t));o.position.y=.45,n.add(o);const l=new st(new ui(.28,20,0,Math.PI),r);l.position.set(0,.5,.601),n.add(l);const c=new st(new an(.56,.38),r);c.position.set(0,.31,.601),n.add(c);const h=new Oc;h.moveTo(-.7,0),h.lineTo(0,.55),h.lineTo(.7,0),h.lineTo(-.7,0);const u=new st(new bo(h,{depth:1.4,bevelEnabled:!1}),tn(s));u.position.set(0,.86,-.7),n.add(u);const f=new st(new Ot(.16,.12,.08,14),tn("#3b8ed6"));f.position.set(.5,.05,.85),n.add(f);const p=new st(new Wn(.04,.2,3,6),tn("#f4efe6"));p.rotation.z=Math.PI/2,p.position.set(-.45,.05,.85),n.add(p)}const a=new st(new an(.8,.2),new Be({map:mn.sign(e.slice(0,14),"#6b4630"),toneMapped:!1}));return a.position.set(0,i==="kedi_evi"?.6:1.02,i==="kedi_evi"?.41:.715),n.add(a),n.traverse(o=>{o.isMesh&&(o.castShadow=!0,o.receiveShadow=!0)}),n}const Yl=["#eab49b","#f2d49b","#a9d3c1","#f5e7d1","#de8f78","#b8cfe8","#f3c2c0","#ead27c","#cbb7e2","#f2aa72","#a3c79c","#f6d3b3","#d9e4a8"],tg=["#fbf6ee","#f3ebdd","#fff8ec"],eg=["#4f7d5a","#7a4b33","#3b6a8a","#8a3b3b","#5e7f8f"],ng=["#c8603e","#b6553a","#d27548","#a94f37"],ig=["#9a6a45","#7d4f33","#b07a4f","#c99a6a"],ql=["#e2493b","#f28aa5","#f2c94c","#ffffff","#c85ac8"],sg={bakkal:["BAKKAL","#2f7d6d"],firin:["FIRIN","#b5651f"],cay:["ÇAY OCAĞI","#c8423a"],berber:["BERBER","#3b6aa8"],manav:["MANAV","#5a8f3b"],kafe:["KAHVE","#6b4f3a"],cicekci:["ÇİÇEKÇİ","#c85a8a"],simit:["SİMİT SARAYI","#d9893a"]},rg={bakkal:["#2f7d6d","#f4efe6"],firin:["#c8423a","#f4efe6"],cay:["#c8423a","#f2c94c"],berber:["#3b6aa8","#f4efe6"],manav:["#5a8f3b","#f2c94c"],kafe:["#6b4f3a","#f2d49b"],cicekci:["#e98aa0","#f4efe6"],simit:["#d9893a","#f4efe6"]},cn=2.5;function ag(i,t){const{r:e,w:n,d:s,floors:r}=t,a=pt(t.x,0,t.z,t.rot),o=new ie,l=D=>o.multiplyMatrices(a,D).clone(),c=(D,G,U,X,F,q,J,nt,H=0,dt=0)=>i.add(D,new Bt(U,X,F),G,l(pt(q,J,nt,H,1,1,1,dt))),h=e.pick(Yl),u=e.pick(tg),f=e.pick(eg),p=e.pick(ng),g=e.pick(ig),y=r*cn+.4,m=e.pick(["cumba","cumba","balkon","balkon","kepenk","karma"]),d=s/2;c("plaster",h,n,y,s,0,y/2,0),c("plaster","#b9ab98",n+.08,.55,s+.08,0,.27,0),c("wood","#c98f5c",n-.12,.06,s-.12,0,.58,0);for(let D=1;D<r;D++)c("plain",u,n+.14,.14,s+.14,0,D*cn+.4,0);c("plain",u,n+.24,.22,s+.24,0,y,0);for(const D of[-1,1])c("plain",u,.22,y,.06,D*(n/2-.11),y/2,d+.02);const _=(D,G,U,X,F,q)=>{const J=(H,dt,W)=>{const Q=new P(H,dt,W).applyAxisAngle(new P(0,1,0),X);return[D+Q.x,G+Q.y,U+Q.z]},nt=(H,dt,W,Q,mt,rt,ft,Ut)=>{const[It,Wt,tt]=J(rt,ft,Ut);c(H,dt,W,Q,mt,It,Wt,tt,X)};if(nt("plain",u,1,1.45,.08,0,0,.02),nt("glass","#3d5a73",.78,1.22,.06,0,0,.06),nt("plain",u,.05,1.22,.07,0,0,.08),nt("plain",u,.78,.05,.07,0,.18,.08),nt("plain",u,1.16,.08,.22,0,-.76,.1),F)for(const H of[-1,1]){nt("wood",f,.42,1.38,.05,H*.74,0,.06);for(let dt=0;dt<5;dt++)nt("wood",f,.36,.04,.03,H*.74,-.52+dt*.26,.1)}if(q){nt("wood","#8a5a3a",.9,.18,.2,0,-.66,.2);for(let H=0;H<4;H++){const[dt,W,Q]=J(-.3+H*.2,-.5,.22);i.add("plain",new Xn(.11,0),e.pick(ql),l(pt(dt,W,Q)))}}},v=Math.max(1,Math.floor((n-.6)/1.75)),x=(n-.4)/v,L=Math.min(3.2,n-1.4),E=(m==="cumba"||m==="karma")&&r>=2&&n>=4.6,T=e.chance(.5)?h:e.pick(Yl);for(let D=0;D<r;D++){const G=D*cn+.4+cn*.55;for(let U=0;U<v;U++){const X=-n/2+.2+x*(U+.5);D===0&&(t.shop||U===Math.floor(v/2))||D>=1&&E&&Math.abs(X)<L/2+.2||_(X,G,d,0,m==="kepenk"||e.chance(.35),e.chance(.25))}if(D>0||!t.shop){const U=Math.max(1,Math.floor((s-1)/2.4));for(let X=0;X<U;X++){const F=-s/2+.5+(s-1)/U*(X+.5);e.chance(.7)&&_(n/2,G,F,Math.PI/2,e.chance(.4),!1),e.chance(.7)&&_(-n/2,G,-F,-Math.PI/2,e.chance(.4),!1)}}for(let U=0;U<v;U++)e.chance(.6)&&_(-n/2+.2+x*(U+.5),G,-d,Math.PI,e.chance(.3),!1)}if(E){const D=cn+.4,G=(r-1)*cn-.1,U=.95;c("plaster",T,L,G,U,0,D+G/2,d+U/2),c("plain",u,L+.18,.16,U+.12,0,D+G+.08,d+U/2),c("plain",u,L+.1,.14,U+.06,0,D,d+U/2);for(const X of[-.4,0,.4])i.add("wood",new Bt(.16,.7,.16),g,l(pt(X*L,D-.3,d+.55,0,1,1,1,-.6)));for(let X=1;X<r;X++){const F=X*cn+.4+cn*.55,q=L>2.6?2:1;for(let J=0;J<q;J++)_(q===1?0:(J-.5)*1.35,F,d+U,0,!1,e.chance(.4));_(L/2,F,d+U/2,Math.PI/2,!1,!1),_(-L/2,F,d+U/2,-Math.PI/2,!1,!1)}i.add("roof",Wl(L+.3,U+.3,.35),p,l(pt(0,D+G+.16,d+U/2)))}if((m==="balkon"||m==="karma")&&r>=2){const D=m==="karma"?Math.min(2.2,n*.35):Math.min(n-1,3.6),G=m==="karma"?(e.chance(.5)?-1:1)*(n/2-D/2-.3):0;if(!(m==="karma"&&E&&Math.abs(G)<L/2+D/2))for(let U=1;U<r;U++){const X=U*cn+.4;c("plain",u,D,.14,.9,G,X+.05,d+.45),c("plain","#3a3a3a",D,.05,.05,G,X+.95,d+.88);for(const q of[-1,1])c("plain","#3a3a3a",.05,.05,.9,G+q*D/2,X+.95,d+.45);const F=Math.round(D/.22);for(let q=0;q<=F;q++)c("plain","#3a3a3a",.03,.85,.03,G-D/2+q*D/F,X+.5,d+.88);if(c("plain",u,1,2,.08,G,X+1.1,d+.02),c("glass","#3d5a73",.8,1.8,.06,G,X+1.1,d+.06),e.chance(.8))for(let q=0;q<3;q++){const J=G-D/2+.3+e.next()*(D-.6);i.add("plain",new Ot(.14,.1,.24,8),"#c0603e",l(pt(J,X+.24,d+.65))),i.add("plain",new Xn(.2,1),e.chance(.5)?"#5f9a4a":e.pick(ql),l(pt(J,X+.48,d+.65)))}}}const R=[];if(t.shop){const[D,G]=rg[t.shop],U=n-.9;c("wood",g,U+.2,2.2,.12,0,1.45,d+.02),c("glass","#5f8296",U-1.4,1.7,.06,-.6,1.4,d+.1),c("wood","#6b4630",1,2,.08,U/2-.6,1.35,d+.1),c("glass","#5f8296",.6,.8,.04,U/2-.6,1.75,d+.15);const X=Math.round(U/.5);for(let nt=0;nt<X;nt++){const H=-U/2+(nt+.5)*U/X;i.add("plain",new Bt(U/X+.005,.06,1.3),nt%2?G:D,l(pt(H,2.75,d+.6,0,1,1,1,.42))),i.add("plain",new Bt(U/X+.005,.28,.05),nt%2?G:D,l(pt(H,2.36,d+1.2)))}const[F,q]=sg[t.shop],J=new st(new an(Math.min(U,3.6),.7),new Be({map:mn.sign(F,q),toneMapped:!1}));J.position.set(0,3.35,d+.05),J.applyMatrix4(a),R.push(J)}else{const D=-n/2+.2+x*(Math.floor(v/2)+.5);c("plain",u,1.4,2.5,.1,D,1.35,d+.02),c("wood",e.pick(["#6b4630","#2f5d62","#8a3b3b","#4a5d3a"]),1.1,2.1,.08,D,1.2,d+.08),c("glass","#3d5a73",1,.36,.05,D,2.42,d+.08),c("plain","#bdb3a4",1.6,.16,.5,D,.08,d+.25),c("plain","#d9b24a",.06,.06,.06,D+.4,1.2,d+.14),i.add("plain",new Yt(.12,8,6),"#fff3c4",l(pt(D+.85,2.3,d+.12))),e.chance(.5)&&(i.add("plain",new Ot(.22,.16,.4,10),"#c0603e",l(pt(D-1.05,.2,d+.35))),i.add("plain",new Xn(.34,1),"#5f9a4a",l(pt(D-1.05,.62,d+.35))))}const b=y+.11;if(e.chance(.88)){const D=e.range(1,1.7);if(i.add("roof",Wl(n+.7,s+.7,D),p,l(pt(0,b,0))),c("plain",u,n+.72,.12,s+.72,0,b,0),e.chance(.5)){const G=e.range(-n/3,n/3),U=e.range(-s/4,s/4);c("plaster","#b9654a",.4,1.4,.4,G,b+.9,U),c("plain","#7a3b2a",.5,.1,.5,G,b+1.62,U)}}else c("plaster",h,n,.5,.18,0,b+.25,d-.09),c("plaster",h,n,.5,.18,0,b+.25,-d+.09),c("plaster",h,.18,.5,s,n/2-.09,b+.25,0),c("plaster",h,.18,.5,s,-n/2+.09,b+.25,0),i.add("plain",new Ot(.45,.45,.9,12),"#e8e8e8",l(pt(e.range(-1,1),b+.5,-.5,0,1,1,1,0,Math.PI/2)));if(e.chance(.35)){const D=(e.chance(.5)?-1:1)*(n/2-.5);i.add("plain",new Yt(.35,12,6,0,Math.PI*2,0,1.1),"#f2f2f2",l(pt(D,cn*r-.2,d+.3,0,1,.45,1,1.2)))}const M=(t.rot%(Math.PI*2)+Math.PI*2)%(Math.PI*2),I=Math.abs(Math.sin(M))>.5,B=E?.5:0,z=new P(0,0,d+1.2).applyAxisAngle(new P(0,1,0),t.rot);return{rect:{x:t.x,z:t.z,hw:(I?s:n)/2+.1+(I?B:0),hd:(I?n:s)/2+.1+(I?0:B)},signs:R,front:new P(t.x+z.x,0,t.z+z.z),top:y}}const Wc=["#6fa34f","#5f9a4a","#7fb35a","#8dbb5e","#5a8f45"];function $s(i,t,e,n,s=1,r=!1){const a=s*(r?1.8:n.range(.85,1.15)),o=(r?3.4:2)*a;if(i.add("plain",new Ot(.16*a,.26*a,o,8),"#7a5236",pt(t,o/2,e)),r)for(const h of[.6,2.4,4.3])i.add("plain",new Ot(.08*a,.14*a,1.6*a,6),"#7a5236",pt(t+Math.cos(h)*.4*a,o*.85,e+Math.sin(h)*.4*a,0,1,1,1,Math.cos(h)*.6,-Math.sin(h)*.6));const l=r?7:n.int(3,4),c=n.pick(Wc);for(let h=0;h<l;h++){const u=h/l*Math.PI*2+n.next(),f=(r?1.7:.75)*a*(h===0?0:1),p=(r?1.2:.95)*a*n.range(.8,1.1),g=new qt(c).offsetHSL(n.range(-.02,.02),0,n.range(-.05,.06));i.add("leaf",Gc(p,n.int(1,9999)),g,pt(t+Math.cos(u)*f,o+(h===0?p*.6:n.range(-.1,.5)*a),e+Math.sin(u)*f))}i.add("plain",new Ot(.7*a,.7*a,.1,16),"#7a6250",pt(t,.07,e))}function Ys(i,t,e){i.add("plain",new Ot(.12,.16,.3,8),"#2f3235",pt(t,.15,e)),i.add("plain",new Ot(.06,.07,3,8),"#2f3235",pt(t,1.6,e)),i.add("plain",new Ot(.22,.12,.12,8),"#2f3235",pt(t,3.1,e)),i.add("glow",new Ot(.2,.15,.4,8),"#ffe3a3",pt(t,3.35,e)),i.add("plain",new gn(.3,.3,8),"#2f3235",pt(t,3.68,e))}function Zl(i,t,e,n){const s=(r,a,o,l=0)=>new ie().multiplyMatrices(pt(t,0,e,n),pt(r,a,o,0,1,1,1,l));for(const r of[-.8,.8])i.add("plain",new Bt(.08,.45,.5),"#2f3235",s(r,.22,0)),i.add("plain",new Bt(.08,.5,.06),"#2f3235",s(r,.7,-.24));for(let r=0;r<3;r++)i.add("wood",new Bt(1.9,.06,.14),"#b0743f",s(0,.47,-.17+r*.17));for(let r=0;r<2;r++)i.add("wood",new Bt(1.9,.12,.05),"#b0743f",s(0,.68+r*.18,-.27,-.15))}function og(i,t,e,n){const s=(a,o,l)=>new ie().multiplyMatrices(pt(t,0,e,n),pt(a,o,l));i.add("plaster",new Bt(2.4,2.6,.9),"#ece6da",s(0,1.3,0)),i.add("plain",new Bt(2.8,.25,1.2),"#d8d0c2",s(0,2.7,0)),i.add("roof",new Ot(.01,1.7,.8,4,1),"#8a8f96",s(0,3.2,0).multiply(pt(0,0,0,Math.PI/4,1,1,.6))),i.add("plain",new Ot(.55,.55,.12,16,1,!1,0,Math.PI),"#d8d0c2",s(0,1.9,.46).multiply(pt(0,0,0,0,1,1,1,Math.PI/2))),i.add("plain",new Bt(1.1,1.3,.06),"#d8cdb8",s(0,1.25,.46)),i.add("plain",new Ot(.04,.04,.3,6),"#c9a03a",s(0,1,.6).multiply(pt(0,0,0,0,1,1,1,Math.PI/2))),i.add("plain",new Bt(1.6,.45,.6),"#d8d0c2",s(0,.22,.75)),i.add("water",new Bt(1.4,.05,.45),"#6fb3d6",s(0,.44,.75))}function lg(i,t,e,n){i.add("wood",new Ot(.45,.45,.06,14),"#b0743f",pt(t,.62,e)),i.add("plain",new Ot(.05,.08,.6,6),"#5a3a28",pt(t,.3,e));for(let s=0;s<n.int(2,3);s++){const r=s*2.2+n.next(),a=t+Math.cos(r)*.75,o=e+Math.sin(r)*.75;i.add("wood",new Ot(.2,.2,.05,10),n.pick(["#3b6aa8","#c8423a","#2f7d6d"]),pt(a,.4,o));for(let l=0;l<4;l++)i.add("plain",new Ot(.02,.02,.4,4),"#3a3a3a",pt(a+Math.cos(l*1.57)*.13,.2,o+Math.sin(l*1.57)*.13))}for(let s=0;s<2;s++){const r=t+(s-.5)*.3,a=e+n.range(-.15,.15);i.add("plain",new Ot(.08,.08,.02,10),"#f2f2f2",pt(r,.66,a)),i.add("glow",new Ot(.045,.035,.14,8),"#b8401f",pt(r,.74,a))}}function cg(i,t,e,n){const s=(r,a,o,l=0,c=0)=>new ie().multiplyMatrices(pt(t,0,e,n),pt(r,a,o,0,1,1,1,l,c));i.add("plain",new Bt(1.6,.7,.9),"#c8423a",s(0,.85,0)),i.add("plain",new Bt(1.7,.06,1),"#f4efe6",s(0,1.22,0)),i.add("glass",new Bt(1.5,.6,.8),"#cfe6ef",s(0,1.55,0)),i.add("plain",new Bt(1.7,.06,1),"#c8423a",s(0,1.88,0));for(const r of[-.55,.55])i.add("plain",new Ot(.32,.32,.08,14),"#2f3235",s(r,.34,.48,Math.PI/2));i.add("plain",new Ot(.03,.03,1.2,6),"#2f3235",s(-1,1,0,0,1));for(let r=0;r<9;r++)i.add("plain",new dn(.16,.06,6,12),"#c77a35",s(-.5+r%3*.35,1.32+Math.floor(r/3)*.13,-.1+r%2*.15,Math.PI/2));for(let r=0;r<4;r++)i.add("plain",new Bt(.45,.04,1.2),r%2?"#f4efe6":"#c8423a",s(-.68+r*.45,2.5,0,0));for(const r of[-.8,.8])i.add("plain",new Ot(.025,.025,.6,6),"#2f3235",s(r,2.2,0))}function hg(i,t,e,n,s){const r=["#e2493b","#f2a33b","#9ccf5a","#f2d24c","#8e3b5a"];for(let a=0;a<3;a++){const o=new ie().multiplyMatrices(pt(t,0,e,n),pt(-.7+a*.7,0,0));i.add("wood",new Bt(.62,.36,.5),"#c9955c",o.clone().multiply(pt(0,.48,0))),i.add("plain",new Bt(.56,.3,.06),"#6b4630",o.clone().multiply(pt(0,.15,.2)));const l=s.pick(r);for(let c=0;c<6;c++)i.add("plain",new Xn(.1,1),l,o.clone().multiply(pt(-.2+c%3*.2,.7,-.1+Math.floor(c/3)*.2)))}}function ug(i,t,e,n,s){for(let r=0;r<4;r++){const a=new ie().multiplyMatrices(pt(t,0,e,n),pt(-.9+r*.6,0,0));i.add("plain",new Ot(.2,.16,.42,10),"#9aa3ae",a.clone().multiply(pt(0,.21,0)));const o=s.pick(["#e2493b","#f28aa5","#f2c94c","#ffffff","#c85ac8"]);for(let l=0;l<5;l++)i.add("plain",new Xn(.09,0),o,a.clone().multiply(pt(s.range(-.12,.12),.55+s.range(0,.12),s.range(-.12,.12))))}}function dg(i,t,e,n){i.add("plain",new Ot(.3,.22,.5,10),n.pick(["#c0603e","#d27548","#9aa3ae"]),pt(t,.25,e)),i.add("leaf",Gc(.45,n.int(1,999),1),n.pick(Wc),pt(t,.8,e))}function fg(i,t,e){const n=new wo({},{}),s=new P().subVectors(t,i),r=s.length(),a=new P().addVectors(i,t).multiplyScalar(.5),o=Math.atan2(s.x,s.z);n.add("plain",new Ot(.012,.012,r,4),"#e8e8e8",pt(0,0,0,0,1,1,1,Math.PI/2));const l=["#e2493b","#f2c94c","#3b8ed6","#ffffff","#f28aa5","#5a8f3b","#9a5ac8","#f2a33b"],c=Math.floor(r/.8);for(let f=0;f<c;f++){const p=-r/2+.5+f*(r-1)/Math.max(1,c-1),g=-.25*(1-(2*p/r)**2),y=e.int(0,2),m=e.pick(l);y===0?n.add("plain",new Bt(.03,.55,.5),m,pt(0,g-.28,p)):y===1?(n.add("plain",new Bt(.03,.45,.42),m,pt(0,g-.25,p)),n.add("plain",new Bt(.03,.14,.7),m,pt(0,g-.07,p))):n.add("plain",new Bt(.03,.3,.2),m,pt(0,g-.17,p))}const h=new Se({vertexColors:!0,side:en});n.mats.plain=h;const u=n.build(!0);return u.position.copy(a),u.rotation.y=o,u.userData.sway=e.range(0,6),u}function pg(i,t,e){for(let r=0;r<14;r++){const a=-140+r*22+e.range(-6,6);i.add("far",new Yt(e.range(16,26),16,8,0,Math.PI*2,0,Math.PI/2),e.pick(["#9fb5a6","#a9bdb0","#94ab9c"]),pt(a,-4,t-e.range(0,20),0,1.4,e.range(.4,.7),1))}for(let r=0;r<60;r++){const a=e.range(-130,130),o=t+e.range(6,14);i.add("far",new Bt(e.range(2,5),e.range(2,6),2),e.pick(["#e8d8c4","#f0e2d0","#d9c9b5","#e2c4b0"]),pt(a,1,o))}const n=-30,s=t+4;i.add("far",new Bt(14,5,8),"#e9e1d4",pt(n,2.5,s)),i.add("far",new Yt(4.2,16,8,0,Math.PI*2,0,Math.PI/2),"#a9b3bd",pt(n,5,s));for(const r of[-4.5,4.5])i.add("far",new Yt(1.9,12,6,0,Math.PI*2,0,Math.PI/2),"#a9b3bd",pt(n+r,5,s));for(const r of[-8.5,8.5])i.add("far",new Ot(.45,.55,16,8),"#efe8dc",pt(n+r,8,s)),i.add("far",new gn(.6,2.4,8),"#a9b3bd",pt(n+r,17.2,s));i.add("far",new Ot(3,3.4,1.5,12),"#c9bca8",pt(40,.4,t+14)),i.add("far",new Ot(1.1,1.2,7,10),"#f0e8da",pt(40,4.5,t+14)),i.add("far",new gn(1.4,2.2,10),"#8f9aa4",pt(40,9.1,t+14))}function mg(){const i=new wo({plain:new Se({vertexColors:!0})});i.add("plain",new Bt(14,1.6,4),"#f4f1ea",pt(0,.8,0)),i.add("plain",new Bt(14.2,.5,4.2),"#2b3a4a",pt(0,.2,0)),i.add("plain",new Bt(10,1.4,3.4),"#f8f6f0",pt(0,2.3,0)),i.add("plain",new Bt(10.2,.16,3.6),"#c8423a",pt(0,3.05,0));for(let t=0;t<8;t++)i.add("plain",new Bt(.8,.6,3.45),"#3d5a73",pt(-4.2+t*1.2,2.4,0));return i.add("plain",new Ot(.5,.6,1.8,10),"#f2c94c",pt(0,4,0)),i.add("plain",new Ot(.52,.52,.4,10),"#2b2b2b",pt(0,4.8,0)),i.build(!1)}const Kr=[],jr=[],ve=(i,t,e,n)=>({x:(i+e)/2,z:(t+n)/2,hw:(e-i)/2,hd:(n-t)/2}),Jr=(i,t,e=0)=>Math.abs(i.x-t.x)<i.hw+t.hw+e&&Math.abs(i.z-t.z)<i.hd+t.hd+e;function gg(i,t){const e=fn(1453),n=new Qt,s=new wo(i,{plaster:3,wood:1.2,roof:-1.4});s.tile=!0;const r=[],a=[],o=ve(-52,-30,52,-23),l=ve(-52,-23,52,-17),c=ve(-4,-17,4,48),h=ve(-52,9,52,15),u=ve(-28,-17,-23,48),f=ve(23,-17,28,48),p=ve(-11,4,11,20);Kr.push(l,c,h,u,f),jr.push(o,...Kr,p);const g=(H,dt,W,Q,mt="#ffffff")=>{const rt=H.clone();rt.needsUpdate=!0,rt.repeat.set(dt.hw*2/Q,dt.hd*2/Q);const ft=new st(new an(dt.hw*2,dt.hd*2),new Se({map:rt,color:mt}));ft.rotation.x=-Math.PI/2,ft.position.set(dt.x,W,dt.z),ft.receiveShadow=!0,n.add(ft)},y=mn.cobble(),m=mn.slab(),d=mn.grass();g(m,ve(-60,-30,60,56),0,3);for(const H of Kr)g(y,H,.012,4);g(y,p,.03,4,"#f6eadb"),g(m,o,.016,2.5,"#fff6ea");const _=(H,dt,W,Q)=>s.box("plain","#d8d0c4",Math.max(.2,W-H),.12,Math.max(.2,Q-dt),(H+W)/2,.06,(dt+Q)/2);_(-52,-17.1,-28,-16.9),_(-23,-17.1,-4,-16.9),_(4,-17.1,23,-16.9),_(28,-17.1,52,-16.9),_(-52,-23.1,52,-22.9);const v=[],x=["bakkal","firin","manav","berber","cicekci","kafe","simit","bakkal","cay","manav"];let L=0;const E=(H,dt,W,Q,mt,rt)=>{let ft=dt;for(;ft<W-4.2;){const Ut=Math.min(W-ft,e.range(4.6,7.4)),It=W-ft-Ut<4.4?W-ft:Ut,Wt=e.range(6.2,7.6),tt=e.chance(.15)?2:e.chance(.6)?3:4,ot=new P(Math.sin(mt),0,Math.cos(mt)),C=H==="x"?new P(ft+It/2,0,Q):new P(Q,0,ft+It/2);C.addScaledVector(ot,-Wt/2);const At=H==="x"?{x:C.x,z:C.z,hw:It/2,hd:Wt/2}:{x:C.x,z:C.z,hw:Wt/2,hd:It/2};if(!(!jr.some(_t=>Jr(_t,At,-.05))&&!v.some(_t=>Jr(_t,At,-.05)))){ft+=.7;continue}{const _t=e.chance(rt)?x[L++%x.length]:void 0,ct=ag(s,{x:C.x,z:C.z,rot:mt,w:It,d:Wt,floors:tt,shop:_t,r:e});v.push(At),r.push(ct.rect),a.push(...ct.signs),(_t==="bakkal"||_t==="manav")&&hg(s,ct.front.x+ot.x*-.3+(H==="x"?1.2:0),ct.front.z+(H==="z"?1.2:0),mt,e),_t==="cicekci"&&ug(s,ct.front.x,ct.front.z,mt,e)}ft+=It+.02}};E("x",-52,-28,-17,Math.PI,.1),E("x",-23,-4,-17,Math.PI,.35),E("x",4,23,-17,Math.PI,.35),E("x",28,52,-17,Math.PI,.1);for(const[H,dt]of[[-52,-28],[-23,-11],[11,23],[28,52]])E("x",H,dt,9,0,H>-24&&dt<24?.5:.15),E("x",H,dt,15,Math.PI,H>-24&&dt<24?.5:.15);E("z",-17,4,-4,Math.PI/2,.7),E("z",-17,4,4,-Math.PI/2,.7),E("z",20,48,-4,Math.PI/2,.6),E("z",20,48,4,-Math.PI/2,.6),E("z",4,9,-11,Math.PI/2,.3),E("z",4,9,11,-Math.PI/2,.3),E("z",15,20,-11,Math.PI/2,.3),E("z",15,20,11,-Math.PI/2,.3),E("x",-11,-4,20,Math.PI,.4),E("x",4,11,20,Math.PI,.4);for(const[H,dt]of[[-28,Math.PI/2],[-23,-Math.PI/2],[23,Math.PI/2],[28,-Math.PI/2]])E("z",-17,9,H,dt,.05),E("z",15,48,H,dt,.05);for(const[H,dt]of[[-52,-28],[-23,-4],[4,23],[28,52]])E("x",H,dt,48,Math.PI,0);const T=[ve(-52,-17,-28,9),ve(-23,-17,-4,9),ve(4,-17,23,9),ve(28,-17,52,9),ve(-52,15,-28,48),ve(-23,20,-4,48),ve(4,20,23,48),ve(28,15,52,48)];for(const H of T){const dt={...H,hw:H.hw-1,hd:H.hd-1};g(d,dt,.02,4);for(let W=0;W<(t?4:7);W++){const Q=H.x+e.range(-H.hw+3,H.hw-3),mt=H.z+e.range(-H.hd+3,H.hd-3),rt={x:Q,z:mt,hw:1.2,hd:1.2};v.some(ft=>Jr(ft,rt))||$s(s,Q,mt,e)}}s.box("plaster","#cbbfae",104,1.2,.6,0,-.5,-30.2);for(let H=-50;H<=50;H+=1.2)s.box("plain","#2f3235",.05,.9,.05,H,.45,-29.7);s.box("plain","#2f3235",104,.08,.1,0,.92,-29.7),s.box("plain","#2f3235",104,.05,.06,0,.3,-29.7),r.push(ve(-60,-32,60,-29.4));for(let H=-48;H<=48;H+=9)Ys(s,H,-28.8),Math.abs(H+14)>8&&Zl(s,H+4.5,-28.9,Math.PI);for(let H=-46;H<=46;H+=13)Math.abs(H+14)>9&&$s(s,H,-25,e,.9);const R=new P(-14,0,-24.4);s.box("wood","#b0743f",3.6,2.4,2.2,R.x,1.2,R.z),s.box("glass","#cfe6ef",2.8,1,.05,R.x,1.6,R.z-1.12),s.box("wood","#8a5a3a",3.8,.12,.6,R.x,1,R.z-1.3);for(let H=0;H<8;H++)s.add("plain",new Bt(.5,.06,1.6),H%2?"#f2c94c":"#c8423a",pt(R.x-1.75+H*.5,2.8,R.z-1.4,0,1,1,1,-.35));s.add("roof",new gn(2.8,1.1,4),"#c8423a",pt(R.x,3,R.z,Math.PI/4,1,1,.7)),s.add("glow",new Ot(.22,.25,.5,10),"#d9d9d9",pt(R.x+.9,1.33,R.z-1.3));const b=new st(new an(2.6,.62),new Be({map:mn.sign("ÇAY OCAĞI","#c8423a"),toneMapped:!1}));b.position.set(R.x,2.25,R.z-1.13),b.rotation.y=Math.PI,a.push(b),r.push({x:R.x,z:R.z,hw:1.9,hd:1.2});for(const[H,dt]of[[-19,-27],[-16.5,-27.6],[-11.5,-27.4],[-9,-26.8],[-19.5,-24.6],[-8.6,-24.4]])lg(s,H,dt,e);for(const H of[-20.5,-7.5])$s(s,H,-26.2,e,1.05);$s(s,-5.5,12.5,e,1,!0),r.push({x:-5.5,z:12.5,hw:.7,hd:.7}),s.add("plaster",new Ot(2.4,2.5,.45,20),"#d8cdb8",pt(-5.5,.22,12.5));const M=new P(7.5,0,6.2);og(s,M.x,M.z,0),r.push({x:M.x,z:M.z,hw:1.3,hd:.6});const I=new P(M.x,0,M.z+1.6),B=new P(6.5,0,17.2);cg(s,B.x,B.z,Math.PI),r.push({x:B.x,z:B.z,hw:1.1,hd:.7});for(const[H,dt,W]of[[-9.6,8,Math.PI/2],[-9.6,16,Math.PI/2],[9.6,12,-Math.PI/2],[-1.5,16.6,0]])Zl(s,H,dt,W);for(const[H,dt]of[[-10,5],[10,5],[-10,19],[10,19]])Ys(s,H,dt);for(const[H,dt]of[[-2.8,5.6],[2.8,5.6],[-2.8,18.6]])dg(s,H,dt,e);for(let H=-12;H<46;H+=10)H>3&&H<21||(Ys(s,-3.4,H),Ys(s,3.4,H+5));s.box("plaster","#cbbfae",120,3,1,0,1.5,55.6),r.push(ve(-60,55,60,60),ve(-60,-40,-52.5,60),ve(52.5,-40,60,60)),s.box("plaster","#cbbfae",1,3,90,-52.6,1.5,10),s.box("plaster","#cbbfae",1,3,90,52.6,1.5,10),pg(s,-150,e);const z=s.build(!t);n.add(z);for(const H of a)n.add(H);const D=[],G=(H,dt)=>{const W=fg(H,dt,e);n.add(W),D.push(W)};for(const[H,dt]of[[-28,-23],[23,28]])for(let W=-13;W<46;W+=e.range(5,8)){if(W>8&&W<16)continue;const Q=e.range(4.6,7.4),mt=v.some(ft=>Math.abs(ft.x-(H-3))<ft.hw+.5&&Math.abs(ft.z-W)<ft.hd),rt=v.some(ft=>Math.abs(ft.x-(dt+3))<ft.hw+.5&&Math.abs(ft.z-W)<ft.hd);mt&&rt&&e.chance(.75)&&G(new P(H-.05,Q,W),new P(dt+.05,Q+e.range(-.4,.4),W+e.range(-1,1)))}for(let H=-12;H<46;H+=9)(H<2||H>22)&&e.chance(.6)&&G(new P(-4,e.range(5.5,7.2),H),new P(4,e.range(5.5,7.2),H+e.range(-1.5,1.5)));const U=_g(),X=new rr({color:"#3f9cc4",specular:"#cfefff",shininess:70,bumpMap:U,bumpScale:.6});U.repeat.set(60,30);const F=new st(new an(600,300),X);F.rotation.x=-Math.PI/2,F.position.set(0,-.7,-180),n.add(F);const q=mg();q.position.set(-80,-.7,-62),n.add(q);const J=[{id:"pamuk",name:"Pamuk",breed:"van",x:-6,z:10},{id:"tarcin",name:"Tarçın",breed:"sarman",x:2,z:-8},{id:"zeytin",name:"Zeytin",breed:"kara",x:-25.5,z:0},{id:"boncuk",name:"Boncuk",breed:"uc_renk",x:-14,z:-21},{id:"duman",name:"Duman",breed:"tekir",x:25.5,z:30},{id:"pasa",name:"Paşa",breed:"smokin",x:6,z:14},{id:"minnos",name:"Minnoş",breed:"tekir",x:1,z:34},{id:"limon",name:"Limon",breed:"sarman",x:-30,z:-26},{id:"karabas",name:"Karabaş",breed:"kangal",x:20,z:-20},{id:"comar",name:"Çomar",breed:"sokak",x:-2,z:26},{id:"sarikiz",name:"Sarıkız",breed:"golden",x:36,z:12},{id:"fistik",name:"Fıstık",breed:"beagle",x:-38,z:12},{id:"benek",name:"Benek",breed:"dalmacyali",x:30,z:-26},{id:"kahve",name:"Kahve",breed:"sokak",x:-25.5,z:30}],nt=[{x:B.x-1.6,z:B.z,rot:Math.PI/2,shirt:"#f4efe6",hat:"kasket",role:"Simitçi"},{x:R.x+.2,z:R.z-1.9,rot:Math.PI,shirt:"#f4efe6",hat:null,role:"Çaycı"},{x:9.2,z:12,rot:-Math.PI/2,shirt:"#6b4f3a",hat:"kasket",role:"Mahalle sakini",sit:!0}];return{root:n,colliders:r,laundry:D,sea:U,boat:q,bounds:{x0:-51.5,x1:51.5,z0:-29.2,z1:54.5},spawn:new P(0,0,-20.5),fountain:I,strays:J,npcs:nt,open:jr.slice(),lots:v}}function _g(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d");t.fillStyle="#808080",t.fillRect(0,0,128,128);const e=fn(77);for(let s=0;s<160;s++){t.strokeStyle=`rgba(255,255,255,${e.range(.1,.4)})`,t.lineWidth=e.range(1,3);const r=e.int(0,128),a=e.int(0,128),o=e.int(6,20);t.beginPath(),t.moveTo(r,a),t.quadraticCurveTo(r+o/2,a-3,r+o,a),t.stroke()}const n=new vs(i);return n.wrapS=n.wrapT=us,n}const vg={istanbul:gg};function xg(){const i=mn.plaster(),t=mn.wood(),e=mn.roof();return{plaster:new Se({vertexColors:!0,map:i}),plain:new Se({vertexColors:!0}),wood:new Se({vertexColors:!0,map:t}),roof:new Se({vertexColors:!0,map:e}),glass:new rr({vertexColors:!0,shininess:90,specular:new qt("#9fb8c8")}),leaf:new Se({vertexColors:!0}),glow:new Be({vertexColors:!0}),water:new rr({vertexColors:!0,shininess:100}),far:new Se({vertexColors:!0})}}function Qr(i,t,e,n){for(const s of e){const r=i.x-s.x,a=i.z-s.z,o=s.hw+t-Math.abs(r),l=s.hd+t-Math.abs(a);o>0&&l>0&&(o<l?i.x+=Math.sign(r||1)*o:i.z+=Math.sign(a||1)*l)}i.x=Math.min(n.x1,Math.max(n.x0,i.x)),i.z=Math.min(n.z1,Math.max(n.z0,i.z))}function ta(i,t,e,n){return n.some(s=>Math.abs(i-s.x)<s.hw+e&&Math.abs(t-s.z)<s.hd+e)}let rs=null,Xc=!1;const Kl=i=>{Xc=i};function $c(){if(Xc)return null;if(!rs)try{rs=new(window.AudioContext||window.webkitAudioContext)}catch{return null}return rs.state==="suspended"&&rs.resume(),rs}function Ie(i,t,e="sine",n=.15,s=0,r=0){const a=$c();if(!a)return;const o=a.currentTime+r,l=a.createOscillator(),c=a.createGain();l.type=e,l.frequency.setValueAtTime(i,o),s&&l.frequency.exponentialRampToValueAtTime(Math.max(40,i+s),o+t),c.gain.setValueAtTime(0,o),c.gain.linearRampToValueAtTime(n,o+.01),c.gain.exponentialRampToValueAtTime(8e-4,o+t),l.connect(c).connect(a.destination),l.start(o),l.stop(o+t+.02)}function Pi(i,t=.1,e=1200,n=0){const s=$c();if(!s)return;const r=s.currentTime+n,a=s.createBuffer(1,Math.floor(s.sampleRate*i),s.sampleRate),o=a.getChannelData(0);for(let u=0;u<o.length;u++)o[u]=(Math.random()*2-1)*(1-u/o.length);const l=s.createBufferSource();l.buffer=a;const c=s.createBiquadFilter();c.type="bandpass",c.frequency.value=e,c.Q.value=1.2;const h=s.createGain();h.gain.value=t,l.connect(c).connect(h).connect(s.destination),l.start(r)}const ne={tap:()=>Ie(620,.08,"sine",.12,260),open:()=>{Ie(420,.12,"triangle",.08,300),Pi(.12,.03,2400)},close:()=>Ie(560,.1,"triangle",.07,-220),coin:()=>{Ie(988,.09,"square",.05),Ie(1319,.18,"square",.05,0,.08)},gem:()=>{Ie(1568,.12,"sine",.08),Ie(2093,.25,"sine",.07,0,.1)},crunch:()=>{for(let i=0;i<4;i++)Pi(.05,.08,1800+Math.random()*800,i*.18)},pour:()=>Pi(.6,.05,900),meow:()=>{Ie(620,.42,"sawtooth",.035,-180),Ie(760,.2,"sine",.05,160)},purr:()=>{for(let i=0;i<6;i++)Ie(70,.12,"sawtooth",.03,0,i*.13)},bark:()=>{Ie(320,.12,"square",.05,-120),Pi(.08,.05,700),Ie(300,.1,"square",.04,-100,.18)},success:()=>{[523,659,784,1047].forEach((i,t)=>Ie(i,.18,"triangle",.07,0,t*.08))},error:()=>{Ie(220,.15,"square",.04),Ie(180,.2,"square",.04,0,.12)},box:()=>{[392,494,587,784,988].forEach((i,t)=>Ie(i,.22,"triangle",.06,0,t*.07)),Pi(.3,.03,4e3,.3)},throw:()=>Pi(.2,.05,1600)};function Fi(i=10){var t;try{(t=navigator.vibrate)==null||t.call(navigator,i)}catch{}}const hn=()=>Date.now(),yg=new P(0,1,0);class Mg{constructor(t,e,n,s){this.canvas=t,this.state=e,this.input=n,this.ev=s,this.scene=new Ic,this.camera=new We(45,1,.3,500),this.pos=new P,this.yaw=0,this.camYaw=0,this.camZoom=1,this.camTarget=new P,this.strays=[],this.companion=null,this.homePets=[],this.near=null,this.nearCompanion=null,this.nearFountain=!1,this.houseObjs=new Map,this.npcs=[],this.balls=[],this.tapTarget=null,this.tapStray=null,this.clock=new q0,this.gulls=[],this.placing=null,this.paused=!1,this.lowEnd=/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent)||Math.min(screen.width,screen.height)<600,this.renderer=new Lc({canvas:t,antialias:!this.lowEnd||devicePixelRatio<2,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,this.lowEnd?1.6:2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ec,this.renderer.toneMapping=ro,this.renderer.toneMappingExposure=1.12,this.labelsEl=document.getElementById("labels"),this.xray={u:{pos:{value:new ut(-999,-999)},depth:{value:1},rad:{value:120},player:{value:new P},camDir:{value:new ut(0,1)}}},this.setupScene(),this.loadCity(e.city),addEventListener("resize",()=>this.resize()),this.resize()}setupScene(){const t=this.scene;t.background=mn.sky(),t.fog=new vo("#f2dcc6",75,240),t.add(new Vc("#fff0d8","#9d8a74",1.35));const e=new Ka("#ffe0b0",2.6);e.castShadow=!0;const n=this.lowEnd?1024:2048;e.shadow.mapSize.set(n,n);const s=e.shadow.camera;s.left=-26,s.right=26,s.top=26,s.bottom=-26,s.near=1,s.far=120,e.shadow.bias=-6e-4,e.shadow.normalBias=.03,e.shadow.radius=3,t.add(e,e.target),this.sun=e;const r=new Ka("#bcd6ff",.45);r.position.set(30,20,-40),t.add(r),this.marker=new st(new sr(.25,.36,24),new Be({color:"#ffffff",transparent:!0,opacity:.8,depthWrite:!1})),this.marker.rotation.x=-Math.PI/2,this.marker.visible=!1,t.add(this.marker),this.ring=new st(new sr(.55,.68,32),new Be({color:"#ffd36b",transparent:!0,opacity:.85,depthWrite:!1})),this.ring.rotation.x=-Math.PI/2,this.ring.visible=!1,t.add(this.ring)}patchXray(t){const e=this.xray.u;t.onBeforeCompile=n=>{n.uniforms.xrPos=e.pos,n.uniforms.xrDepth=e.depth,n.uniforms.xrRad=e.rad,n.uniforms.xrP=e.player,n.uniforms.xrC=e.camDir,n.vertexShader=n.vertexShader.replace("void main() {",`varying vec3 vXrW;
void main() {`).replace("#include <project_vertex>",`#include <project_vertex>
  vXrW = (modelMatrix * vec4(transformed, 1.0)).xyz;`),n.fragmentShader=n.fragmentShader.replace("void main() {",`uniform vec2 xrPos; uniform float xrDepth; uniform float xrRad; uniform vec3 xrP; uniform vec2 xrC;
varying vec3 vXrW;
float xrDither(vec2 p){ return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }
void main() {
  float xa = dot(vXrW.xz - xrP.xz, xrC);
  if (xa > 1.2 && xa < 17.0) { float e = smoothstep(2.1, 2.7, vXrW.y - xrP.y); if (xrDither(gl_FragCoord.xy) < e) discard; }
  float xd = distance(gl_FragCoord.xy, xrPos);
  if (gl_FragCoord.z < xrDepth - 0.0004 && xd < xrRad) { float e2 = smoothstep(xrRad * 0.6, xrRad, xd); if (xrDither(gl_FragCoord.xy) > e2) discard; }`)}}loadCity(t){const e=xg();for(const s of["plaster","plain","wood","roof","glass","leaf"])this.patchXray(e[s]);this.world=vg[t](e,this.lowEnd),this.scene.add(this.world.root),this.pos.copy(this.world.spawn),this.yaw=Math.PI,this.camYaw=0,this.player=new Ja(this.state.look),this.scene.add(this.player.root),this.makeGulls();for(const s of this.world.npcs){const r=new Ja({outfit:"tisort_mercan",hat:s.hat,skin:"#e0b090",hair:"#3a3030",pants:"#4a4a4a",shirt:s.shirt});r.root.position.set(s.x,0,s.z),r.root.rotation.y=s.rot,r.sitting=!!s.sit,this.scene.add(r.root),this.npcs.push(r)}const n=fn(99);for(const s of this.world.strays){const r=li(s.breed),a=new Qa(r,n.int(1,9999));a.root.position.set(s.x,0,s.z),this.scene.add(a.root);const o=document.createElement("div");o.className="plabel",this.labelsEl.appendChild(o);const l={id:s.id,name:s.name,pet:a,home:new P(s.x,0,s.z),mode:"idle",t:n.range(0,4),target:null,yaw:n.range(0,6.28),hungryAt:0,thirstyAt:0,bowl:null,label:o,vocalT:n.range(4,12)},c=this.state.friends[s.id];l.hungryAt=n.chance(c?.6:.85)?0:hn()+n.range(60,240)*1e3,l.thirstyAt=n.chance(.55)?0:hn()+n.range(60,300)*1e3,n.chance(.2)&&(l.mode="sleep",l.t=n.range(8,20),a.sleeping=!0,a.setPose("lie")),this.strays.push(l)}for(const s of this.state.houses.filter(r=>r.city===t))this.addHouseObj(s.uid);this.spawnPets()}makeGulls(){const t=new Se({color:"#f6f6f2",side:en});for(let e=0;e<6;e++){const n=new Qt,s=new st(new Wn(.12,.3,3,6),t);s.rotation.x=Math.PI/2,n.add(s);for(const r of[-1,1]){const a=new st(new an(.7,.25),t);a.position.x=r*.38,a.name="w"+r,n.add(a)}n.userData={r:8+e*3,h:7+e%3*2,sp:.25+e*.03,o:e*1.3,cx:-30+e*12,cz:-40-e%2*8},this.scene.add(n),this.gulls.push(n)}}spawnPets(){const t=[this.companion,...this.homePets].filter(Boolean);for(const e of t)this.scene.remove(e.pet.root),e.label.remove();this.companion=null,this.homePets=[];for(const e of this.state.pets){const n=li(e.breed);if(!n)continue;const s=e.uid===this.state.activePet,r=e.house?this.state.houses.find(c=>c.uid===e.house&&c.city===this.state.city):void 0;if(!s&&!r)continue;const a=new Qa(n,e.uid.length*31+e.uid.charCodeAt(0),{wear:e.wear,collar:e.collar}),o=document.createElement("div");o.className="plabel mine",this.labelsEl.appendChild(o);const l={uid:e.uid,pet:a,yaw:0,mode:s?"follow":"home",t:0,ball:null,label:o};s?a.root.position.copy(this.pos).add(new P(1,0,1)):(l.home=new P(r.x,0,r.z+1.2),a.root.position.copy(l.home)),this.scene.add(a.root),s?this.companion=l:this.homePets.push(l)}}refreshGear(){for(const t of[this.companion,...this.homePets]){if(!t)continue;const e=this.state.pets.find(n=>n.uid===t.uid);e&&t.pet.setGear(e.wear,e.collar)}}addHouseObj(t){const e=this.state.houses.find(s=>s.uid===t);if(!e)return;const n=$l(e.item,e.color,e.name);n.position.set(e.x,0,e.z),n.rotation.y=e.rot,this.scene.add(n),this.houseObjs.set(t,n)}startPlacing(t){const e=$l(t,be(t).color,"...");e.traverse(n=>{const s=n.material;s&&(n.material=s.clone(),n.material.transparent=!0,n.material.opacity=.7)}),this.scene.add(e),this.placing={item:t,ghost:e,rot:this.yaw+Math.PI,valid:!0}}rotatePlacing(){this.placing&&(this.placing.rot+=Math.PI/2)}cancelPlacing(){this.placing&&(this.scene.remove(this.placing.ghost),this.placing=null)}placingSpot(){if(!this.placing)return null;const t=this.placing.ghost.position;return{x:t.x,z:t.z,rot:this.placing.rot,valid:this.placing.valid}}faceTo(t){this.yaw=Math.atan2(t.x-this.pos.x,t.z-this.pos.z)}bowl(t,e){const n=new Qt,s=new st(new Ot(.2,.15,.1,16),new Se({color:t?"#3b8ed6":"#e2493b"}));s.position.y=.05,n.add(s);const r=new st(new Ot(.17,.17,.02,16),new Se({color:t?"#9fd8f0":"#b0743f"}));if(r.position.y=.1,n.add(r),!t)for(let a=0;a<7;a++){const o=new st(new Yt(.035,5,4),new Se({color:"#8a5a32"}));o.position.set(Math.cos(a)*.09,.12,Math.sin(a*1.7)*.09),n.add(o)}return n.position.copy(e),n.scale.setScalar(.01),n.userData.grow=0,this.scene.add(n),n}feed(){const t=this.near;if(this.player.busy)return;if(!t){if(this.nearCompanion){this.ev.toast(`${this.petName(this.nearCompanion)} tok, onu sevebilirsin`);return}this.ev.toast("Yakında aç bir dost yok. Başında 🍖 olanları ara"),ne.error();return}if(t.hungryAt>hn()){this.ev.toast(`${t.name} tok. Biraz sevmeye ne dersin?`);return}if(t.bowl)return;const e=eh(this.state,t.id,hn());if(!e.ok){this.ev.toast("Mama bitti! Bekle ya da reklam izleyip doldur"),ne.error();return}this.faceTo(t.pet.root.position),Fi(15);const n=this.pos.clone().add(new P(Math.sin(this.yaw)*.75,0,Math.cos(this.yaw)*.75));this.player.act("kneel",1.3,()=>{t.bowl=this.bowl(!1,n),ne.pour(),t.mode="toBowl",t.target=n.clone(),t.t=12}),t.hungryAt=hn()+(300+Math.random()*240)*1e3,this.ev.reward(e.coins,e.gems,t.pet.root.position.clone().setY(1)),e.newFriend&&setTimeout(()=>this.ev.toast(`${t.name} artık senin dostun! 💛`),900),fe(this.state),this.ev.changed()}water(){if(this.player.busy)return;if(this.nearFountain){sh(this.state),ne.pour(),Fi(10),this.player.act("kneel",1),this.ev.toast("Su kabın doldu 💧"),fe(this.state),this.ev.changed();return}const t=this.near;if(!t){this.ev.toast(this.state.water>0?"Yakında susamış dost yok":"Su bitti. Meydandaki çeşmeden doldur"),ne.error();return}if(t.thirstyAt>hn()){this.ev.toast(`${t.name} susamamış`);return}if(t.bowl)return;const e=nh(this.state,t.id);if(!e.ok){this.ev.toast("Su bitti. Meydandaki çeşmeden doldur ⛲"),ne.error();return}this.faceTo(t.pet.root.position),Fi(15);const n=this.pos.clone().add(new P(Math.sin(this.yaw)*.75,0,Math.cos(this.yaw)*.75));this.player.act("kneel",1.3,()=>{t.bowl=this.bowl(!0,n),ne.pour(),t.mode="toBowl",t.target=n.clone(),t.t=12}),t.thirstyAt=hn()+(360+Math.random()*240)*1e3,this.ev.reward(e.coins,0,t.pet.root.position.clone().setY(1)),fe(this.state),this.ev.changed()}pet(){if(this.player.busy)return;const t=this.near,e=this.nearCompanion,n=(t==null?void 0:t.pet)??(e==null?void 0:e.pet);if(!n){this.ev.toast("Sevmek için bir dostun yanına git");return}if(this.faceTo(n.root.position),Fi(8),this.player.act("pet",1.8,()=>{n.cat?ne.purr():ne.bark(),this.ev.hearts(n.root.position.clone().setY(n.height+.2))}),t){t.mode="happy",t.t=2.2,t.target=null,t.pet.sleeping=!1,t.yaw=Math.atan2(this.pos.x-t.pet.root.position.x,this.pos.z-t.pet.root.position.z);const s=ih(this.state,t.id,hn());s&&this.ev.reward(s,0,t.pet.root.position.clone().setY(1)),fe(this.state),this.ev.changed()}else e&&(e.mode="happy",e.t=2.2)}canThrow(){return!!this.companion&&Object.keys(this.state.items).some(t=>{var e;return((e=be(t))==null?void 0:e.kind)==="ball"&&this.state.items[t]>0})&&this.balls.length===0}throwBall(){const t=this.companion;if(!t||this.player.busy||this.balls.length)return;const e=Object.keys(this.state.items).filter(s=>{var r;return((r=be(s))==null?void 0:r.kind)==="ball"&&this.state.items[s]>0}).pop();if(!e){this.ev.toast("Mağazadan bir top al");return}const n=be(e);this.player.act("throw",.8,()=>{ne.throw();const s=n.color2?new Se({map:Sg(n.color,n.color2)}):new Se({color:n.color}),r=new st(new Yt(e==="top_plaj"?.16:.1,14,10),s);r.castShadow=!0;const a=this.pos.clone().add(new P(0,1.3,0));r.position.copy(a),this.scene.add(r);const o=new P(Math.sin(this.yaw),0,Math.cos(this.yaw));this.balls.push({mesh:r,vel:o.multiplyScalar(6.5).add(new P(0,4.2,0)),resting:!1,owner:t}),t.mode="fetch",t.t=10,t.pet.sleeping=!1})}petName(t){var e;return((e=this.state.pets.find(n=>n.uid===t.uid))==null?void 0:e.name)??""}resize(){const t=innerWidth,e=innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.fov=t<e?60:45,this.camera.updateProjectionMatrix(),this.xray.u.rad.value=Math.min(t,e)*.17*this.renderer.getPixelRatio()}start(){const t=()=>{requestAnimationFrame(t);const e=Math.min(.05,this.clock.getDelta());this.paused||this.update(e),this.renderer.render(this.scene,this.camera)};t()}update(t){const e=this.input.poll(),n=performance.now()/1e3;this.camYaw+=e.yawDelta,this.camZoom=Math.min(1.5,Math.max(.65,this.camZoom+e.zoomDelta)),e.tap&&this.handleTap(e.tap.x,e.tap.y),this.input.consume();let s=e.move.x,r=e.move.y,a=Math.hypot(s,r),o=new P;if(a>.08){this.tapTarget=null,this.tapStray=null,this.marker.visible=!1;const _=new P(-Math.sin(this.camYaw),0,-Math.cos(this.camYaw)),v=new P(-_.z,0,_.x);o.addScaledVector(_,r).addScaledVector(v,s).normalize(),a=Math.min(1,a)}else if(this.tapTarget){this.tapStray&&this.tapTarget.copy(this.tapStray.pet.root.position);const _=this.tapTarget.clone().sub(this.pos).setY(0),v=this.tapStray?1.3:.25;if(_.length()<v){if(this.tapTarget=null,this.marker.visible=!1,this.tapStray){const x=this.tapStray;this.tapStray=null,this.near=x,this.pet()}}else o.copy(_.normalize()),a=_.length()>4?1:.75}const c=this.player.busy?0:a*(this.input.running?5.2:4);if(c>0){let v=Math.atan2(o.x,o.z)-this.yaw;v=Math.atan2(Math.sin(v),Math.cos(v)),this.yaw+=v*Math.min(1,t*12);const x=this.pos.clone();this.pos.addScaledVector(o,c*t),Qr(this.pos,.35,this.world.colliders,this.world.bounds);for(const E of this.houseObjs.values())this.pushOut(this.pos,E.position,.9);const L=this.pos.distanceTo(x)/t;this.player.speed+=(L-this.player.speed)*Math.min(1,t*10)}else this.player.speed+=(0-this.player.speed)*Math.min(1,t*10);this.player.root.position.copy(this.pos);let h=this.yaw-this.player.root.rotation.y;h=Math.atan2(Math.sin(h),Math.cos(h)),this.player.root.rotation.y+=h*Math.min(1,t*14),this.player.update(t);for(const _ of this.npcs)_.update(t);Math.random()<t*.05&&this.npcs[0]&&!this.npcs[0].busy&&this.npcs[0].act("wave",1.6),this.updateStrays(t),this.updateCompanions(t),this.updateBalls(t),this.updatePlacing();for(const _ of this.world.laundry)_.rotation.z=Math.sin(n*1.3+_.userData.sway)*.06;this.world.sea.offset.set(n*.01,n*.006);const u=this.world.boat;u.position.x+=t*2.4,u.position.x>110&&(u.position.x=-110),u.position.y=-.7+Math.sin(n*1.2)*.06;for(const _ of this.gulls){const v=_.userData,x=n*v.sp+v.o;_.position.set(v.cx+Math.cos(x)*v.r,v.h+Math.sin(n*.7+v.o),v.cz+Math.sin(x)*v.r),_.rotation.y=-x;const L=Math.sin(n*6+v.o)*.5;_.children[1].rotation.z=L,_.children[2].rotation.z=-L}for(const _ of this.strays)_.bowl&&_.bowl.userData.grow<1&&(_.bowl.userData.grow=Math.min(1,_.bowl.userData.grow+t*5),_.bowl.scale.setScalar(_.bowl.userData.grow));this.findNear();const f=innerWidth<innerHeight,p=(f?18:14)*this.camZoom,g=f?.98:.86;this.camTarget.lerp(this.pos.clone().add(new P(0,.9,0)),Math.min(1,t*6));const y=new P(Math.sin(this.camYaw)*Math.cos(g),Math.sin(g),Math.cos(this.camYaw)*Math.cos(g)).multiplyScalar(p);this.camera.position.copy(this.camTarget).add(y),this.camera.lookAt(this.camTarget),this.sun.position.copy(this.camTarget).add(new P(-22,38,16)),this.sun.target.position.copy(this.camTarget);const m=this.pos.clone().add(new P(0,.8,0)).project(this.camera),d=this.renderer.getPixelRatio();this.xray.u.pos.value.set((m.x*.5+.5)*innerWidth*d,(m.y*.5+.5)*innerHeight*d),this.xray.u.depth.value=m.z*.5+.5,this.xray.u.player.value.copy(this.camTarget).setY(0),this.xray.u.camDir.value.set(Math.sin(this.camYaw),Math.cos(this.camYaw)),this.updateLabels()}pushOut(t,e,n){const s=t.clone().sub(e).setY(0),r=s.length();r<n&&r>.001&&t.add(s.multiplyScalar((n-r)/r))}handleTap(t,e){if(this.placing)return;let n=null,s=60*60;for(const l of this.strays){const c=l.pet.root.position.clone().setY(.4).project(this.camera);if(c.z>1)continue;const h=(c.x*.5+.5)*innerWidth,u=(-c.y*.5+.5)*innerHeight,f=(h-t)**2+(u-e)**2;f<s&&(s=f,n=l)}if(n){this.tapStray=n,this.tapTarget=n.pet.root.position.clone(),this.marker.visible=!1;return}const r=new ut(t/innerWidth*2-1,-(e/innerHeight)*2+1),a=new Z0;a.setFromCamera(r,this.camera);const o=new P;if(a.ray.intersectPlane(new Bn(yg,0),o)){if(ta(o.x,o.z,.2,this.world.colliders))return;this.tapTarget=o,this.tapStray=null,this.marker.position.set(o.x,.03,o.z),this.marker.visible=!0,this.marker.scale.setScalar(1.4)}}findNear(){let t=null,e=2.6;for(const o of this.strays){const l=o.pet.root.position.distanceTo(this.pos);l<e&&(e=l,t=o)}let n=null;if(!t){for(const o of[this.companion,...this.homePets])if(o){const l=o.pet.root.position.distanceTo(this.pos);l<2.4&&l<e&&(e=l,n=o)}}const s=this.pos.distanceTo(this.world.fountain)<2.6,r=t!==this.near||n!==this.nearCompanion||s!==this.nearFountain;this.near=t,this.nearCompanion=n,this.nearFountain=s;const a=(t==null?void 0:t.pet)??(n==null?void 0:n.pet);this.ring.visible=!!a,a&&(this.ring.position.set(a.root.position.x,.03,a.root.position.z),this.ring.scale.setScalar(Math.max(.8,a.radius*2)),this.ring.material.opacity=.6+Math.sin(performance.now()/200)*.25),this.marker.visible&&this.marker.scale.multiplyScalar(.97).clampScalar(.8,2),r&&this.ev.nearChanged()}walkTo(t,e,n,s,r,a=.2){const o=n.clone().sub(t.root.position).setY(0),l=o.length();if(l<a)return t.speed+=(0-t.speed)*Math.min(1,r*8),!0;let h=Math.atan2(o.x,o.z)-e.yaw;h=Math.atan2(Math.sin(h),Math.cos(h)),e.yaw+=h*Math.min(1,r*7);const u=s*Math.min(1,l/.8+.3)*(Math.abs(h)>1.2?.4:1),f=t.root.position.clone();t.root.position.addScaledVector(new P(Math.sin(e.yaw),0,Math.cos(e.yaw)),u*r),Qr(t.root.position,.25,this.world.colliders,this.world.bounds),this.pushOut(t.root.position,this.pos,.55);const p=t.root.position.distanceTo(f)/r;return t.speed+=(p-t.speed)*Math.min(1,r*8),p<u*.3&&u>.3}updateStrays(t){const e=hn();for(const n of this.strays){const s=n.pet;n.t-=t;const r=s.root.position.distanceTo(this.pos),a=n.hungryAt<=e;if(r>45){s.root.visible=!1;continue}switch(s.root.visible=!0,s.lookYaw=0,n.mode){case"idle":{if(s.speed*=.85,r<3.2&&!this.player.busy){let l=Math.atan2(this.pos.x-s.root.position.x,this.pos.z-s.root.position.z)-n.yaw;l=Math.atan2(Math.sin(l),Math.cos(l)),Math.abs(l)>1?n.yaw+=l*Math.min(1,t*3):s.lookYaw=l,s.setPose(a?s.cat?"sit":"beg":"sit"),s.wag=a?.8:.5,n.vocalT-=t,n.vocalT<0&&a&&(n.vocalT=5+Math.random()*6,s.cat?ne.meow():ne.bark())}else if(n.t<0){const o=Math.random();o<.55?(n.mode="wander",n.target=this.pickWander(n.home,7),n.t=12,s.setPose("stand")):o<.75?(n.mode="sleep",n.t=10+Math.random()*15,s.setPose("lie"),s.sleeping=!0):(n.t=3+Math.random()*5,s.setPose(Math.random()<.5?"sit":"stand")),s.wag=.2}break}case"wander":{(!n.target||this.walkTo(s,n,n.target,s.cat?.9:1.1,t,.3)||n.t<0)&&(n.mode="idle",n.t=2+Math.random()*5,n.target=null),r<2.5&&a&&(n.mode="idle",n.t=4);break}case"sleep":{s.speed*=.8,(n.t<0||r<1.6&&a)&&(s.sleeping=!1,n.mode="idle",n.t=2,s.setPose("stand"));break}case"toBowl":{if(!n.target){n.mode="idle";break}s.setPose("stand"),n.target.clone().sub(new P(Math.sin(n.yaw),0,Math.cos(n.yaw)).multiplyScalar(s.radius*.9)),(this.walkTo(s,n,n.target,2.2,t,s.radius+.15)||n.t<0)&&(n.mode="eat",n.t=4,s.setPose("eat"),ne.crunch(),s.wag=.9,n.yaw=Math.atan2(n.target.x-s.root.position.x,n.target.z-s.root.position.z));break}case"eat":{s.speed*=.8,n.t<0&&(n.bowl&&(this.fadeOut(n.bowl),n.bowl=null),n.mode="happy",n.t=1.8,s.setPose("happy"),this.ev.hearts(s.root.position.clone().setY(s.height+.2)),s.cat?ne.meow():ne.bark());break}case"happy":{s.speed*=.8,s.setPose("happy"),n.t<0&&(n.mode="follow",n.t=10+Math.random()*6,s.setPose("stand"));break}case"follow":{const o=this.pos.clone().add(new P(Math.sin(this.yaw+2.5),0,Math.cos(this.yaw+2.5)).multiplyScalar(1.4)),l=s.root.position.distanceTo(this.pos),c=l>4?4.6:2.6,h=this.walkTo(s,n,o,c,t,.5);s.wag=.9,h&&this.player.speed<.2?s.setPose("sit"):s.setPose("stand"),(n.t<0||l>20)&&(n.mode="wander",n.target=this.pickWander(n.home,3),n.t=20,s.setPose("stand"));break}}s.root.rotation.y=n.yaw,s.update(t)}}pickWander(t,e){for(let n=0;n<8;n++){const s=Math.random()*Math.PI*2,r=Math.random()*e,a=t.clone().add(new P(Math.cos(s)*r,0,Math.sin(s)*r));if(!ta(a.x,a.z,.4,this.world.colliders))return a}return t.clone()}fadeOut(t){let e=1;const n=()=>{e-=.06,t.scale.setScalar(Math.max(.01,e)),e>0?requestAnimationFrame(n):this.scene.remove(t)};setTimeout(n,400)}updateCompanions(t){const e=[this.companion,...this.homePets].filter(Boolean);for(const n of e){const s=n.pet;if(n.t-=t,s.lookYaw=0,n.mode==="home"&&n.home){n.t<0&&(n.t=6+Math.random()*8,n.target=this.pickWander(n.home,2.5),s.sleeping=Math.random()<.4,s.setPose(s.sleeping?"lie":"stand"));const r=n.target;r&&!s.sleeping?this.walkTo(s,n,r,.9,t,.3)&&s.setPose("sit"):s.speed*=.8}else if(n.mode==="follow"||n.mode==="sit"){const r=this.pos.clone().add(new P(Math.sin(this.yaw+2.4),0,Math.cos(this.yaw+2.4)).multiplyScalar(1.3)),a=s.root.position.distanceTo(this.pos);a>25&&s.root.position.copy(r);const o=a>5?5.4:a>2.2?3.6:2;if(this.walkTo(s,n,r,o,t,.45)&&this.player.speed<.2){s.setPose("sit");let h=Math.atan2(this.pos.x-s.root.position.x,this.pos.z-s.root.position.z)-n.yaw;h=Math.atan2(Math.sin(h),Math.cos(h)),n.yaw+=h*Math.min(1,t*3)}else s.setPose("stand");s.wag=.6}else if(n.mode==="fetch"){const r=this.balls.find(a=>a.owner===n);r?r.resting||r.mesh.position.y<.5?(s.setPose("stand"),(this.walkTo(s,n,r.mesh.position,5.6,t,s.radius*.8+.1)||n.t<0)&&(s.mouth.add(r.mesh),r.mesh.position.set(0,0,0),n.ball=r.mesh,this.balls=this.balls.filter(a=>a!==r),n.mode="return",n.t=10)):(s.setPose("stand"),this.walkTo(s,n,r.mesh.position.clone().setY(0),4.2,t,.3)):n.mode="follow",s.wag=1}else n.mode==="return"?(s.wag=1,(this.walkTo(s,n,this.pos,4.5,t,1.2)||n.t<0)&&(n.ball&&(n.pet.mouth.remove(n.ball),n.ball=null),n.mode="happy",n.t=1.6,s.setPose("happy"),ne.coin(),this.state.coins+=1,fe(this.state),this.ev.changed(),this.ev.hearts(s.root.position.clone().setY(s.height+.2)),this.ev.reward(1,0,s.root.position.clone().setY(1)))):n.mode==="happy"&&(s.speed*=.8,s.setPose("happy"),n.t<0&&(n.mode=n.home&&n!==this.companion?"home":"follow",s.setPose("stand")));s.root.rotation.y=n.yaw,s.update(t)}}updateBalls(t){for(const e of this.balls){if(e.resting)continue;e.vel.y-=14*t,e.mesh.position.addScaledVector(e.vel,t);const n=e.mesh.geometry.parameters.radius;e.mesh.position.y<n&&(e.mesh.position.y=n,e.vel.y*=-.45,e.vel.x*=.7,e.vel.z*=.7,Math.abs(e.vel.y)<.6&&(e.vel.set(0,0,0),e.resting=!0));const s=e.mesh.position.clone();Qr(e.mesh.position,n,this.world.colliders,this.world.bounds),s.equals(e.mesh.position)||(e.vel.x*=-.5,e.vel.z*=-.5),e.mesh.rotation.x+=e.vel.length()*t*3}}updatePlacing(){const t=this.placing;if(!t)return;const e=this.pos.clone().add(new P(Math.sin(this.yaw)*2.4,0,Math.cos(this.yaw)*2.4));t.ghost.position.copy(e),t.ghost.rotation.y=t.rot;const n=this.state.houses.filter(s=>s.city===this.state.city).some(s=>Math.hypot(s.x-e.x,s.z-e.z)<1.6);t.valid=!ta(e.x,e.z,.75,this.world.colliders)&&!n&&e.z>this.world.bounds.z0+.8,t.ghost.traverse(s=>{const r=s.material;r&&r.emissive&&r.emissive.set(t.valid?"#1f5f2a":"#7a1414")})}updateLabels(){var r;const t=innerWidth,e=innerHeight,n=hn(),s=(a,o,l,c)=>{if(!c){a.style.display!=="none"&&(a.style.display="none");return}const h=o.root.position.clone().setY(o.height+.35).project(this.camera);if(h.z>1||Math.abs(h.x)>1.1||Math.abs(h.y)>1.1){a.style.display="none";return}a.style.display="",a.style.transform=`translate(${(h.x*.5+.5)*t}px, ${(-h.y*.5+.5)*e}px) translate(-50%, -100%)`,a.dataset.h!==l&&(a.innerHTML=l,a.dataset.h=l)};for(const a of this.strays){const o=a.pet.root.position.distanceTo(this.pos),l=a.hungryAt<=n,c=a.thirstyAt<=n,h=(((r=this.state.friends[a.id])==null?void 0:r.fed)??0)>0,u=(l?'<i class="need food"></i>':"")+(c?'<i class="need drop"></i>':"")+(a.pet.sleeping?'<b class="zz">z z</b>':""),f=a===this.near,p=(o<9||f?`<span>${h?"💛 ":""}${a.name}</span>`:"")+u;s(a.label,a.pet,p,o<22&&(l||c||a.pet.sleeping)||o<9),a.label.classList.toggle("near",f)}for(const a of[this.companion,...this.homePets])if(a){const o=a.pet.root.position.distanceTo(this.pos);s(a.label,a.pet,`<span>🏠 ${this.petName(a)}</span>`,o<12)}}screenOf(t){const e=t.clone().project(this.camera);return{x:(e.x*.5+.5)*innerWidth,y:(-e.y*.5+.5)*innerHeight}}}function Sg(i,t){const e=document.createElement("canvas");e.width=64,e.height=32;const n=e.getContext("2d");for(let r=0;r<4;r++)n.fillStyle=r%2?t:i,n.fillRect(r*16,0,16,32);const s=new vs(e);return s.colorSpace=De,s}class bg{constructor(t,e){this.el=t,this.state={move:{x:0,y:0},tap:null,yawDelta:0,zoomDelta:0},this.keys=new Set,this.joyId=null,this.joyO={x:0,y:0},this.joyV={x:0,y:0},this.pointers=new Map,this.pinchD=0,this.enabled=!0,this.base=e,this.knob=e.querySelector(".knob"),t.addEventListener("pointerdown",n=>this.down(n)),window.addEventListener("pointermove",n=>this.moveP(n)),window.addEventListener("pointerup",n=>this.up(n)),window.addEventListener("pointercancel",n=>this.up(n)),t.addEventListener("wheel",n=>{this.state.zoomDelta+=Math.sign(n.deltaY)*.08,n.preventDefault()},{passive:!1}),window.addEventListener("keydown",n=>{n.target instanceof HTMLInputElement||this.keys.add(n.key.toLowerCase())}),window.addEventListener("keyup",n=>this.keys.delete(n.key.toLowerCase())),window.addEventListener("blur",()=>this.keys.clear())}joyZone(t,e){const n=window.innerWidth,s=window.innerHeight;return t<n*.45&&e>s*(n>s?.4:.55)}down(t){var e,n;if(this.enabled){if((n=(e=this.el).setPointerCapture)==null||n.call(e,t.pointerId),this.joyId===null&&this.joyZone(t.clientX,t.clientY)){this.joyId=t.pointerId,this.joyO={x:t.clientX,y:t.clientY},this.joyV={x:0,y:0},this.base.classList.add("active"),this.base.style.left=`${t.clientX}px`,this.base.style.top=`${t.clientY}px`,this.knob.style.transform="translate(-50%,-50%)";return}this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY,sx:t.clientX,sy:t.clientY,t:performance.now(),moved:!1}),this.pointers.size===2&&(this.pinchD=this.dist())}}dist(){const t=[...this.pointers.values()];return Math.hypot(t[0].x-t[1].x,t[0].y-t[1].y)}moveP(t){if(t.pointerId===this.joyId){let r=t.clientX-this.joyO.x,a=t.clientY-this.joyO.y;const o=Math.hypot(r,a);o>52&&(r*=52/o,a*=52/o),this.joyV={x:r/52,y:-a/52},this.knob.style.transform=`translate(calc(-50% + ${r}px), calc(-50% + ${a}px))`;return}const e=this.pointers.get(t.pointerId);if(!e)return;const n=t.clientX-e.x;if(e.x=t.clientX,e.y=t.clientY,Math.hypot(e.x-e.sx,e.y-e.sy)>12&&(e.moved=!0),this.pointers.size===1&&e.moved&&(this.state.yawDelta+=n*.006),this.pointers.size===2){const s=this.dist();this.state.zoomDelta-=(s-this.pinchD)*.004,this.pinchD=s}}up(t){if(t.pointerId===this.joyId){this.joyId=null,this.joyV={x:0,y:0},this.base.classList.remove("active"),this.knob.style.transform="translate(-50%,-50%)";return}const e=this.pointers.get(t.pointerId);e&&(!e.moved&&performance.now()-e.t<450&&this.pointers.size===1&&(this.state.tap={x:t.clientX,y:t.clientY}),this.pointers.delete(t.pointerId))}poll(){let t=this.joyV.x,e=this.joyV.y;const n=this.keys;(n.has("w")||n.has("arrowup"))&&(e+=1),(n.has("s")||n.has("arrowdown"))&&(e-=1),(n.has("a")||n.has("arrowleft"))&&(t-=1),(n.has("d")||n.has("arrowright"))&&(t+=1),n.has("q")&&(this.state.yawDelta-=.03),n.has("e")&&(this.state.yawDelta+=.03);const s=Math.hypot(t,e);return s>1&&(t/=s,e/=s),this.state.move={x:t,y:e},this.state}consume(){this.state.tap=null,this.state.yawDelta=0,this.state.zoomDelta=0}get running(){return this.keys.has("shift")}}let Li=null;const ea=new Map;function na(i,t={}){const e=`${i}|${t.wear??""}|${t.collar??""}`;if(ea.has(e))return ea.get(e);const n=li(i);if(!n)return"";if(!Li){const h=document.createElement("canvas");h.width=h.height=192,Li=new Lc({canvas:h,alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),Li.toneMapping=ro,Li.toneMappingExposure=1.15}const s=new Ic;s.add(new Vc("#fff4e0","#a08a70",1.8));const r=new Ka("#fff0d0",2.2);r.position.set(2,3,3),s.add(r);const a=new Qa(n,7,t);a.setPose("sit");for(let h=0;h<40;h++)a.update(.05);a.root.rotation.y=.6,s.add(a.root);const o=a.height,l=new We(30,1,.05,20);l.position.set(0,o*.75,o*3.1+.4),l.lookAt(0,o*.45,0),Li.render(s,l);const c=Li.domElement.toDataURL("image/png");return ea.set(e,c),s.traverse(h=>{const u=h;u.isMesh&&u.geometry.dispose()}),c}class wg{constructor(t){this.show=t,this.name="test"}showRewarded(){return this.show(5)}}const Jt={food:'<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="18" ry="9" fill="#e2493b"/><ellipse cx="24" cy="26" rx="16" ry="6" fill="#b0743f"/><circle cx="18" cy="25" r="3" fill="#8a5a32"/><circle cx="25" cy="23" r="3" fill="#8a5a32"/><circle cx="30" cy="26" r="3" fill="#8a5a32"/><path d="M6 30c2 8 34 8 36 0" fill="#c23a2e"/></svg>',water:'<svg viewBox="0 0 48 48"><path d="M24 5c7 10 14 17 14 25a14 14 0 0 1-28 0c0-8 7-15 14-25z" fill="#3b8ed6"/><path d="M17 30a7 7 0 0 0 7 7" stroke="#bfe3ff" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>',coin:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#f2b632"/><circle cx="24" cy="24" r="14" fill="#f8cf5a" stroke="#d99a1e" stroke-width="2"/><path d="M19 17h10M19 24h9M24 17v15" stroke="#c78614" stroke-width="3.5" stroke-linecap="round"/></svg>',gem:'<svg viewBox="0 0 48 48"><path d="M12 8h24l8 11-20 23L4 19z" fill="#4fc3e8"/><path d="M4 19h40M16 8l-4 11 12 23 12-23-4-11" stroke="#2a8fc0" stroke-width="2" fill="none"/><path d="M12 19l12-11 12 11" fill="#9be3f7" opacity=".7"/></svg>',map:'<svg viewBox="0 0 48 48"><path d="M5 11l12-4 14 4 12-4v30l-12 4-14-4-12 4z" fill="#8fd18a"/><path d="M17 7v30M31 11v30" stroke="#5aa055" stroke-width="2.5"/><circle cx="24" cy="21" r="5" fill="#e2493b"/><path d="M24 30l-4-7h8z" fill="#e2493b"/></svg>',paw:'<svg viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="10" ry="8.5" fill="#f28a5a"/><circle cx="12" cy="21" r="4.5" fill="#f28a5a"/><circle cx="19" cy="13" r="4.5" fill="#f28a5a"/><circle cx="29" cy="13" r="4.5" fill="#f28a5a"/><circle cx="36" cy="21" r="4.5" fill="#f28a5a"/></svg>',shop:'<svg viewBox="0 0 48 48"><path d="M8 18h32l-3 23H11z" fill="#9a5ac8"/><path d="M16 18v-4a8 8 0 0 1 16 0v4" stroke="#6d3a96" stroke-width="3.5" fill="none"/><circle cx="18" cy="25" r="2.4" fill="#fff"/><circle cx="30" cy="25" r="2.4" fill="#fff"/></svg>',home:'<svg viewBox="0 0 48 48"><path d="M6 23L24 8l18 15" stroke="#c8423a" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 21v19h26V21L24 10z" fill="#f2c94c"/><rect x="20" y="28" width="8" height="12" rx="3" fill="#8a5a3a"/></svg>',heart:'<svg viewBox="0 0 48 48"><path d="M24 41S6 30 6 18a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 12-18 23-18 23z" fill="#f25f7a"/><path d="M13 16a5 5 0 0 1 5-4" stroke="#ffc2cd" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',ball:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="#e2493b"/><path d="M10 18c8 4 20 4 28 0M10 30c8-4 20-4 28 0" stroke="#fff" stroke-width="3" fill="none"/></svg>',sound:'<svg viewBox="0 0 48 48"><path d="M8 18h8l10-8v28l-10-8H8z" fill="#fff"/><path d="M32 17a9 9 0 0 1 0 14M36 12a15 15 0 0 1 0 24" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>',mute:'<svg viewBox="0 0 48 48"><path d="M8 18h8l10-8v28l-10-8H8z" fill="#fff"/><path d="M32 18l10 12M42 18L32 30" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/></svg>',close:'<svg viewBox="0 0 48 48"><path d="M14 14l20 20M34 14L14 34" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',ad:'<svg viewBox="0 0 48 48"><rect x="5" y="10" width="38" height="28" rx="7" fill="#fff"/><path d="M20 17v14l12-7z" fill="#e2493b"/></svg>',lock:'<svg viewBox="0 0 48 48"><rect x="10" y="21" width="28" height="20" rx="5" fill="#fff"/><path d="M16 21v-5a8 8 0 0 1 16 0v5" stroke="#fff" stroke-width="4" fill="none"/></svg>',rotate:'<svg viewBox="0 0 48 48"><path d="M36 18a14 14 0 1 0 2 10" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M38 8v11H27" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',check:'<svg viewBox="0 0 48 48"><path d="M11 25l9 9 18-19" stroke="#fff" stroke-width="5.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',gift:'<svg viewBox="0 0 48 48"><rect x="7" y="18" width="34" height="23" rx="4" fill="#e07a5f"/><rect x="5" y="13" width="38" height="8" rx="3" fill="#f2a07f"/><rect x="21" y="13" width="6" height="28" fill="#f2c94c"/><path d="M24 13c-4-7-12-6-10-1 1 2 6 2 10 1zm0 0c4-7 12-6 10-1-1 2-6 2-10 1z" fill="#f2c94c"/></svg>',shirt:i=>`<svg viewBox="0 0 48 48"><path d="M16 7l-11 7 5 9 5-3v21h18V20l5 3 5-9-11-7c-1 4-4 6-8 6s-7-2-8-6z" fill="${i}"/></svg>`,hat:i=>`<svg viewBox="0 0 48 48"><path d="M10 30a14 14 0 0 1 28 0z" fill="${i}"/><rect x="5" y="29" width="38" height="6" rx="3" fill="${i}" opacity=".85"/></svg>`,collar:i=>`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="22" rx="16" ry="9" stroke="${i}" stroke-width="6" fill="none"/><circle cx="24" cy="34" r="5" fill="#f2c94c"/></svg>`,vest:i=>`<svg viewBox="0 0 48 48"><path d="M8 16c6-8 26-8 32 0l-3 20c-8 4-18 4-26 0z" fill="${i}"/><ellipse cx="24" cy="12" rx="7" ry="4" fill="#fff" opacity=".5"/></svg>`,ballC:(i,t)=>`<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="17" fill="${i}"/>${t?`<path d="M24 7v34M7 24h34" stroke="${t}" stroke-width="6"/>`:'<path d="M10 17c8 5 20 5 28 0M10 31c8-5 20-5 28 0" stroke="#fff" stroke-width="2.5" fill="none" opacity=".8"/>'}</svg>`,houseC:i=>`<svg viewBox="0 0 48 48"><path d="M5 24L24 9l19 15" fill="${i}" opacity=".8"/><rect x="10" y="22" width="28" height="19" rx="3" fill="${i}"/><circle cx="24" cy="32" r="5.5" fill="#2b211c"/></svg>`},Zt=i=>document.querySelector(i),qs=i=>i.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),ia=i=>{const t=Math.ceil(i/1e3),e=Math.floor(t/3600),n=Math.floor(t%3600/60),s=t%60;return e?`${e}:${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${n}:${String(s).padStart(2,"0")}`},ei=i=>i.gem?`<span class="price gem">${Jt.gem}${i.gem}</span>`:`<span class="price">${Jt.coin}${i.coin??0}</span>`,Eg=i=>!i.coin&&!i.gem;function Ii(i){switch(i.kind){case"outfit":return Jt.shirt(i.color);case"hat":return Jt.hat(i.color);case"collar":return Jt.collar(i.color);case"petwear":return Jt.vest(i.color);case"ball":return Jt.ballC(i.color,i.color2);case"house":return Jt.houseC(i.color)}}class Tg{constructor(){this.sheetOpen=null,this.tab={shop:"house",pets:"mine",home:"wardrobe",map:"hood"},this.ads=new wg(t=>this.fakeAd(t))}bind(t){this.game=t;const e=t.state;Kl(e.muted),document.querySelectorAll("[data-icon]").forEach(n=>{n.insertAdjacentHTML("afterbegin",Jt[n.dataset.icon])}),document.addEventListener("pointerdown",n=>{const s=n.target.closest("button");s&&!s.disabled&&(ne.tap(),Fi(8))},!0),Zt("#btnFood").onclick=()=>t.feed(),Zt("#btnWater").onclick=()=>t.water(),Zt("#btnPet").onclick=()=>t.pet(),Zt("#btnBall").onclick=()=>t.throwBall(),Zt("#foodPill").onclick=()=>this.foodModal(),Zt("#coinPlus").onclick=()=>this.open("shop","box"),Zt("#gemPlus").onclick=()=>this.open("shop","gem"),Zt("#muteBtn").onclick=()=>{e.muted=!e.muted,Kl(e.muted),fe(e),this.sync()};for(const n of["map","pets","shop","home"])Zt(`#nav-${n}`).onclick=()=>this.sheetOpen===n?this.close():this.open(n);Zt("#sheetClose").onclick=()=>this.close(),Zt("#scrim").onclick=()=>this.close(),Zt("#plRotate").onclick=()=>t.rotatePlacing(),Zt("#plCancel").onclick=()=>{t.cancelPlacing(),this.placeMode(!1)},Zt("#plOk").onclick=()=>this.confirmPlace(),setInterval(()=>this.tick(),500),this.sync()}tick(){const t=this.game.state,e=Date.now(),n=t.food;ar(t,e),t.food!==n&&(fe(t),this.sync()),Zt("#foodT").textContent=t.food>=we?"dolu":`+1 ${ia(ra(t,e))}`,this.sheetOpen==="map"&&this.tab.map==="hood"&&this.drawMinimap();const s=document.getElementById("foodModalT");s&&(s.textContent=t.food>=we?"Stok dolu!":`Sonraki mama ${ia(ra(t,e))} · tam dolum ${ia(Jc(t,e))}`)}sync(){const t=this.game.state;Zt("#foodN").textContent=`${t.food}/${we}`,Zt("#coinN").textContent=t.coins.toLocaleString("tr-TR"),Zt("#gemN").textContent=String(t.gems),Zt("#waterN").textContent=`${t.water}/${no}`,Zt("#foodBadge").textContent=String(t.food),Zt("#foodPill").classList.toggle("low",t.food<=2),Zt("#muteBtn").innerHTML=t.muted?Jt.mute:Jt.sound,this.nearChanged(),this.sheetOpen&&this.render()}nearChanged(){const t=this.game,e=t.near,n=Date.now(),s=!!e&&e.hungryAt<=n,r=!!e&&e.thirstyAt<=n;Zt("#btnFood").classList.toggle("glow",s&&t.state.food>0),Zt("#btnWater").classList.toggle("glow",r&&t.state.water>0||t.nearFountain),Zt("#btnWater").querySelector(".lbl").textContent=t.nearFountain?"Doldur":"Su",Zt("#btnPet").classList.toggle("show",!!e||!!t.nearCompanion),Zt("#btnBall").classList.toggle("show",t.canThrow()&&!e)}toast(t){const e=document.createElement("div");for(e.className="toast",e.textContent=t,Zt("#toasts").appendChild(e);Zt("#toasts").children.length>2;)Zt("#toasts").firstElementChild.remove();setTimeout(()=>e.classList.add("out"),2300),setTimeout(()=>e.remove(),2700)}reward(t,e,n){const s=this.game.screenOf(n),r=(a,o,l,c)=>setTimeout(()=>{const h=document.createElement("div");h.className="floater",h.innerHTML=a,h.style.left=`${s.x}px`,h.style.top=`${s.y}px`,Zt("#fx").appendChild(h);const u=Zt(o).getBoundingClientRect();requestAnimationFrame(()=>{h.animate([{transform:"translate(-50%,-50%) scale(.6)",opacity:0},{transform:"translate(-50%,-140%) scale(1.15)",opacity:1,offset:.3},{transform:`translate(${u.left+u.width/2-s.x-20}px, ${u.top+u.height/2-s.y}px) scale(.5)`,opacity:.9}],{duration:1100,easing:"cubic-bezier(.4,.1,.3,1)"}).onfinish=()=>{h.remove(),c(),Zt(o).animate([{transform:"scale(1)"},{transform:"scale(1.18)"},{transform:"scale(1)"}],{duration:260})}})},l);t&&r(`${Jt.coin}<b>+${t}</b>`,"#coinPill",0,ne.coin),e&&r(`${Jt.gem}<b>+${e}</b>`,"#gemPill",350,ne.gem)}hearts(t){const e=this.game.screenOf(t);for(let n=0;n<4;n++){const s=document.createElement("div");s.className="heartfx",s.innerHTML=Jt.heart,s.style.left=`${e.x+(Math.random()-.5)*40}px`,s.style.top=`${e.y}px`,Zt("#fx").appendChild(s),s.animate([{transform:"translate(-50%,0) scale(.3)",opacity:0},{transform:"translate(-50%,-30px) scale(1)",opacity:1,offset:.3},{transform:`translate(${(Math.random()-.5)*60-20}px,-110px) scale(.8)`,opacity:0}],{duration:1300+n*150,delay:n*120,easing:"ease-out",fill:"backwards"}).onfinish=()=>s.remove()}}open(t,e){this.game.placing||(e&&(this.tab[t]=e),this.sheetOpen=t,ne.open(),document.body.classList.add("sheet-open"),document.querySelectorAll(".side button").forEach(n=>n.classList.toggle("on",n.id===`nav-${t}`)),this.render())}close(){this.sheetOpen&&(this.sheetOpen=null,ne.close(),document.body.classList.remove("sheet-open"),document.querySelectorAll(".side button").forEach(t=>t.classList.remove("on")))}tabs(t,e){return`<div class="tabs">${e.map(([n,s])=>`<button class="tab ${this.tab[t]===n?"on":""}" data-tab="${n}">${s}</button>`).join("")}</div>`}render(){var l;const t=this.sheetOpen;if(!t)return;const e=Zt("#sheetBody"),n=Zt("#sheetTitle"),s=((l=e.querySelector(".grid, .list, .mapwrap"))==null?void 0:l.scrollTop)??0,r=this.game.state;let a="";if(t==="map")if(n.innerHTML=`${Jt.map}<span>Harita</span>`,a=this.tabs("map",[["hood","Mahalle"],["cities","Şehirler"]]),this.tab.map==="hood"){const c=this.game.strays.filter(h=>h.hungryAt<=Date.now()).length;a+=`<div class="mapwrap"><canvas id="minimap" width="560" height="460"></canvas><div class="legend"><span><i class="dot me"></i>Sen</span><span><i class="dot hungry"></i>Aç dost (${c})</span><span><i class="dot ok"></i>Tok dost</span><span><i class="dot fnt"></i>Çeşme</span></div></div>`}else a+=`<div class="grid cities">${sa.map(c=>{const h=r.city===c.id,u=r.unlockedCities.includes(c.id),f=h?'<span class="chip ok">Buradasın</span>':c.available?u?`<button class="btn" data-city="${c.id}">Git</button>`:`<button class="btn" data-unlock="${c.id}" ${ni(r,c.price)?"":"disabled"}>Aç ${ei(c.price)}</button>`:`<span class="chip soon">Yakında</span>${ei(c.price)}`;return`<div class="card city ${c.available?"":"locked"}" style="--ac:${c.accent}"><div class="cityart"><b>${c.name}</b><small>${c.country}</small>${c.available?"":`<div class="lockico">${Jt.lock}</div>`}</div><p>${c.tagline}</p><div class="row">${f}</div></div>`}).join("")}</div>`;else if(t==="pets")n.innerHTML=`${Jt.paw}<span>Petlerim</span>`,a=this.tabs("pets",[["mine",`Dostlarım (${r.pets.length})`],["adopt","Sahiplen"]]),this.tab.pets==="mine"?(r.pets.length||(a+=`<div class="empty">${Jt.paw}<p>Henüz sahiplendiğin bir dost yok.<br>Sokaktakileri besleyip jeton biriktir, sonra <b>Sahiplen</b> sekmesinden bir dost edin.</p><button class="btn" data-tab="adopt">Sahiplen</button></div>`),a+=`<div class="list">${r.pets.map(c=>{const h=li(c.breed),u=r.activePet===c.uid,f=r.houses.find(g=>g.uid===c.house),p=Di.filter(g=>(g.kind==="petwear"||g.kind==="collar")&&(r.items[g.id]??0)>0);return`<div class="card pet"><img src="${na(c.breed,{wear:c.wear,collar:c.collar})}" alt=""><div class="info"><b>${qs(c.name)}</b><small>${h.name}${f?` · 🏠 ${qs(f.name)}`:""}</small>
            <div class="row wrap">${u?'<span class="chip ok">Yanında</span>':`<button class="btn sm" data-walk="${c.uid}">Yanıma çağır</button>`}
            ${f&&u?`<button class="btn sm ghost" data-tohome="${c.uid}">Evine gönder</button>`:""}</div>
            ${p.length?`<div class="gear">${p.map(g=>`<button class="gearbtn ${c.wear===g.id||c.collar===g.id?"on":""}" data-gear="${c.uid}|${g.id}" title="${g.name}">${Ii(g)}</button>`).join("")}</div>`:'<small class="hint">Mağazadan kıyafet ve tasma alıp giydirebilirsin.</small>'}
          </div></div>`}).join("")}</div>`):a+=`<div class="grid">${to.map(c=>`<div class="card shopitem"><img src="${na(c.id)}" alt=""><b>${c.name}</b><small>${c.species==="cat"?"Kedi":"Köpek"}</small><button class="btn" data-adopt="${c.id}" ${ni(r,c.price)?"":"disabled"}>${ei(c.price)}</button></div>`).join("")}</div>`;else if(t==="shop"){n.innerHTML=`${Jt.shop}<span>Mağaza</span>`,a=this.tabs("shop",[["house","Yuvalar"],["outfit","Kıyafet"],["hat","Şapka"],["petwear","Pet Giyim"],["ball","Toplar"],["box","Sürpriz"],["gem","Elmas"]]);const c=this.tab.shop;if(c==="box")a+=`<div class="list">${eo.map(h=>`<div class="card box" style="--ac:${h.color}"><div class="boxart">${Jt.gift}</div><div class="info"><b>${h.name}</b><small>Oyun içi jetonla açılır. Sahip olduğun eşya çıkarsa jetona dönüşür.</small>
          <table class="odds">${h.tiers.map(u=>`<tr><td><i style="background:${mr[u.rarity]}"></i>${pr[u.rarity]}</td><td>%${u.chance}</td><td class="r">${u.rewards.map(f=>this.rewardName(f)).join(", ")}</td></tr>`).join("")}</table>
          <button class="btn big" data-box="${h.id}" ${ni(r,h.price)?"":"disabled"}>Aç ${ei(h.price)}</button></div></div>`).join("")}</div>`;else if(c==="gem")a+=`<div class="empty">${Jt.gem}<p><b>Elmas</b> premium para birimidir. Nadir petler ve özel eşyalar elmasla açılır.<br>Elmas paketleri yayına yakın eklenecek. Şimdilik yeni dost edindiğinde ve sürpriz paketlerden elmas kazanırsın.</p></div>
          <div class="grid">${[[80,"₺—"],[250,"₺—"],[600,"₺—"]].map(([h,u])=>`<div class="card shopitem dim"><div class="ico">${Jt.gem}</div><b>${h} Elmas</b><button class="btn" disabled>${u}</button></div>`).join("")}</div>`;else{const h=c==="petwear"?["petwear","collar"]:[c];a+=`<div class="grid">${Di.filter(u=>h.includes(u.kind)&&!Eg(u.price)).map(u=>{const f=r.items[u.id]??0,p=u.kind==="house"?`<button class="btn" data-buy="${u.id}" ${ni(r,u.price)?"":"disabled"}>${ei(u.price)}</button>${f?`<small class="own">Envanterde: ${f}</small>`:""}`:f?'<span class="chip ok">Sende var</span>':`<button class="btn" data-buy="${u.id}" ${ni(r,u.price)?"":"disabled"}>${ei(u.price)}</button>`;return`<div class="card shopitem" ${u.rarity?`style="--rc:${mr[u.rarity]}"`:""}>${u.rarity?`<span class="rar">${pr[u.rarity]}</span>`:""}<div class="ico">${Ii(u)}</div><b>${u.name}</b>${u.desc?`<small>${u.desc}</small>`:""}${p}</div>`}).join("")}</div>`}}else if(t==="home")if(n.innerHTML=`${Jt.home}<span>Ev</span>`,a=this.tabs("home",[["wardrobe","Gardırop"],["builds","Yuvalarım"]]),this.tab.home==="wardrobe"){const c=h=>Di.filter(u=>u.kind===h&&(r.items[u.id]??0)>0);a+=`<div class="list"><div class="card"><b>Kıyafet</b><div class="gear">${c("outfit").map(h=>`<button class="gearbtn lg ${r.look.outfit===h.id?"on":""}" data-outfit="${h.id}" title="${h.name}">${Ii(h)}</button>`).join("")}</div></div>
          <div class="card"><b>Şapka / aksesuar</b><div class="gear"><button class="gearbtn lg ${r.look.hat?"":"on"}" data-hat="">—</button>${c("hat").map(h=>`<button class="gearbtn lg ${r.look.hat===h.id?"on":""}" data-hat="${h.id}" title="${h.name}">${Ii(h)}</button>`).join("")}</div></div>
          <div class="card"><b>Saç rengi</b><div class="gear">${["#4a2f22","#2b2320","#8a5a32","#c9a46a","#b8442a","#e8d8a8","#3b6aa8","#d98aa0"].map(h=>`<button class="swatch ${r.look.hair===h?"on":""}" style="background:${h}" data-hair="${h}"></button>`).join("")}</div>
          <b>Ten rengi</b><div class="gear">${["#f6d7bf","#f1c7a5","#e0a982","#c68a62","#9a6544","#6e4630"].map(h=>`<button class="swatch ${r.look.skin===h?"on":""}" style="background:${h}" data-skin="${h}"></button>`).join("")}</div></div>
          <small class="hint">Yeni kıyafet ve şapkaları Mağaza'dan veya Sürpriz Paket'ten alabilirsin.</small></div>`}else{const c=Di.filter(u=>u.kind==="house"&&(r.items[u.id]??0)>0),h=r.houses.filter(u=>u.city===r.city);a+=`<div class="list">${c.map(u=>`<div class="card row between"><div class="ico sm">${Ii(u)}</div><div class="info"><b>${u.name}</b><small>Envanterde ${r.items[u.id]} adet</small></div><button class="btn" data-place="${u.id}">Haritaya kur</button></div>`).join("")}
          ${c.length?"":`<div class="empty">${Jt.home}<p>Kurulacak yuva yok. <b>Mağaza → Yuvalar</b>'dan kedi evi veya köpek kulübesi alabilirsin.</p><button class="btn" data-goshop="house">Mağazaya git</button></div>`}
          ${h.length?"<h4>Kurduğun yuvalar</h4>"+h.map(u=>{const f=r.pets.find(p=>p.house===u.uid);return`<div class="card row between"><div class="ico sm">${Jt.houseC(u.color)}</div><div class="info"><b>${qs(u.name)}</b><small>${be(u.item).name}${f?` · ${qs(f.name)} burada yaşıyor`:""}</small></div><button class="btn sm ghost" data-goto="${u.uid}">Git</button></div>`}).join(""):""}
        </div>`}e.innerHTML=a;const o=e.querySelector(".grid, .list, .mapwrap");o&&(o.scrollTop=s),this.wire(e),t==="map"&&this.tab.map==="hood"&&this.drawMinimap()}rewardName(t){var e;return t.type==="coin"?`${t.amount} jeton`:t.type==="gem"?`${t.amount} elmas`:t.type==="food"?`${t.amount} mama`:((e=be(t.id))==null?void 0:e.name)??t.id}wire(t){const e=this.game,n=e.state,s=(r,a)=>t.querySelectorAll(`[data-${r}]`).forEach(o=>o.onclick=()=>a(o.dataset[r.replace(/-./g,l=>l[1].toUpperCase())]));s("tab",r=>{this.tab[this.sheetOpen]=r,this.render()}),s("buy",r=>{if(ah(n,r)){ne.success(),fe(n),this.sync();const a=be(r);a.kind==="house"?this.toast(`${a.name} envanterde. Ev → Yuvalarım'dan kurabilirsin`):a.kind==="outfit"?(n.look.outfit=r,e.player.setLook(n.look),fe(n),this.toast(`${a.name} giyildi`)):a.kind==="hat"?(n.look.hat=r,e.player.setLook(n.look),fe(n),this.toast(`${a.name} takıldı`)):a.kind==="ball"?(this.toast(`${a.name} alındı! Yanındaki dostunla "Top" butonuyla oyna`),this.nearChanged()):this.toast(`${a.name} alındı. Petlerim'den giydir`)}else ne.error(),this.toast("Yeterli bakiye yok")}),s("box",r=>this.openBoxFlow(r)),s("adopt",r=>this.adoptModal(r)),s("walk",r=>{n.activePet=r,fe(n),e.spawnPets(),this.sync(),this.toast(`${n.pets.find(a=>a.uid===r).name} artık yanında`)}),s("tohome",r=>{n.activePet===r&&(n.activePet=null),fe(n),e.spawnPets(),this.sync()}),s("gear",r=>{const[a,o]=r.split("|"),l=n.pets.find(h=>h.uid===a);be(o).kind==="collar"?l.collar=l.collar===o?void 0:o:l.wear=l.wear===o?void 0:o,fe(n),e.refreshGear(),this.render()}),s("outfit",r=>{n.look.outfit=r,e.player.setLook(n.look),fe(n),this.render()}),s("hat",r=>{n.look.hat=r||null,e.player.setLook(n.look),fe(n),this.render()}),s("hair",r=>{n.look.hair=r,fe(n),this.toast("Saç rengi bir sonraki açılışta da kalır"),this.rebuildPlayer(),this.render()}),s("skin",r=>{n.look.skin=r,fe(n),this.rebuildPlayer(),this.render()}),s("place",r=>{this.close(),e.startPlacing(r),this.placeMode(!0)}),s("goshop",r=>this.open("shop",r)),s("goto",r=>{const a=n.houses.find(o=>o.uid===r);e.pos.set(a.x,0,a.z+2),this.close()}),s("city",r=>this.toast(`${sa.find(a=>a.id===r).name} yakında`)),s("unlock",r=>{ch(n,r)&&(ne.success(),fe(n),this.sync())})}rebuildPlayer(){const t=this.game,e=t.player.root,n=new Ja(t.state.look);n.root.position.copy(e.position),n.root.rotation.copy(e.rotation),t.scene.remove(e),t.scene.add(n.root),t.player=n}drawMinimap(){const t=document.getElementById("minimap");if(!t)return;const e=t.getContext("2d"),n=this.game.world,s=n.bounds,r=t.width,a=t.height,o=r/(s.x1-s.x0+4),l=a/(s.z1-s.z0+6),c=Math.min(o,l),h=r/2-(s.x0+s.x1)/2*c,u=a/2-(s.z0+s.z1)/2*c+6,f=d=>h+d*c,p=d=>u+d*c;e.fillStyle="#4aa3c7",e.fillRect(0,0,r,a),e.fillStyle="#e8dccb",e.fillRect(f(s.x0-1),p(s.z0-.8),(s.x1-s.x0+2)*c,(s.z1-s.z0+1.5)*c),e.fillStyle="#d6c6b0";for(const d of n.open)e.fillRect(f(d.x-d.hw),p(d.z-d.hd),d.hw*2*c,d.hd*2*c);e.fillStyle="#e8a68a";for(const d of n.lots)e.beginPath(),e.roundRect(f(d.x-d.hw)+.6,p(d.z-d.hd)+.6,d.hw*2*c-1.2,d.hd*2*c-1.2,2),e.fill();e.fillStyle="#3b8ed6",e.beginPath(),e.arc(f(n.fountain.x),p(n.fountain.z),6,0,7),e.fill();for(const d of this.game.state.houses.filter(_=>_.city===this.game.state.city))e.fillStyle=d.color,e.fillRect(f(d.x)-4,p(d.z)-4,8,8);const g=Date.now();for(const d of this.game.strays){const _=d.pet.root.position,v=d.hungryAt<=g;e.fillStyle=v?"#e2493b":"#5aa055",e.strokeStyle="#fff",e.lineWidth=2,e.beginPath(),e.arc(f(_.x),p(_.z),v?6:4.5,0,7),e.fill(),e.stroke()}const y=this.game.pos,m=this.game.yaw;e.save(),e.translate(f(y.x),p(y.z)),e.rotate(-m+Math.PI),e.fillStyle="#f2c94c",e.strokeStyle="#2b211c",e.lineWidth=2.5,e.beginPath(),e.moveTo(0,-11),e.lineTo(8,8),e.lineTo(0,4),e.lineTo(-8,8),e.closePath(),e.fill(),e.stroke(),e.restore(),e.fillStyle="#ffffffcc",e.font="700 15px Baloo2, sans-serif",e.fillText("BOĞAZ",f(-6),p(s.z0-.2)-6>14?p(s.z0)-8:16)}modal(t,e=""){const n=Zt("#modal");return n.className=`modal show ${e}`,n.innerHTML=`<div class="mcard">${t}</div>`,n.onclick=s=>{s.target===n&&this.closeModal()},this.game.input.enabled=!1,n.querySelector(".mcard")}closeModal(){const t=Zt("#modal");t.className="modal",t.innerHTML="",this.game.input.enabled=!0}foodModal(){const t=this.game.state,e=this.modal(`<div class="mhead">${Jt.food}<b>Mama Stoğu</b></div>
      <div class="bigstat">${t.food}<small>/${we}</small></div>
      <div class="bar"><i style="width:${t.food/we*100}%"></i></div>
      <p id="foodModalT" class="muted"></p>
      <p class="muted">Saatte 2 mama dolar, oyun kapalıyken de. Sokak dostunu beslemek <b>15 jeton</b> kazandırır.</p>
      <button class="btn big ad" id="adBtn" ${t.food>=we?"disabled":""}>${Jt.ad} Reklam izle, stoğu doldur</button>
      <button class="btn ghost" id="mClose">Kapat</button>`);this.tick(),e.querySelector("#mClose").onclick=()=>this.closeModal(),e.querySelector("#adBtn").onclick=async()=>{this.closeModal(),await this.ads.showRewarded()?(th(t,Date.now()),fe(t),this.sync(),ne.success(),this.toast("Mama stoğu doldu! 🍖")):this.toast("Reklam yarıda kaldı")}}fakeAd(t){return new Promise(e=>{const n=this.modal(`<div class="adfake"><small>TEST REKLAMI</small><b>Mahalle Dostları</b><p>Burada gerçek reklam (AdMob) gösterilecek.</p><div class="count" id="adCount">${t}</div><button class="btn ghost" id="adSkip">Vazgeç</button></div>`,"dark");let s=t,r=!1;const a=setInterval(()=>{s--;const o=n.querySelector("#adCount");o&&(o.textContent=String(s)),s<=0&&(clearInterval(a),r=!0,this.closeModal(),e(!0))},1e3);n.querySelector("#adSkip").onclick=()=>{clearInterval(a),r||(this.closeModal(),e(!1))}})}adoptModal(t){const e=this.game.state,n=li(t),s=n.species==="cat"?["Pamuk","Mırmır","Boncuk","Fındık","Tarçın","Bulut"]:["Karamel","Paşa","Kont","Bal","Zeytin","Kömür"],r=this.modal(`<img class="mthumb" src="${na(t)}"><div class="mhead"><b>${n.name}</b></div>
      <label class="field">Adı ne olsun?<input id="petName" maxlength="14" value="${s[Math.floor(Math.random()*s.length)]}"></label>
      <button class="btn big" id="doAdopt" ${ni(e,n.price)?"":"disabled"}>Sahiplen ${ei(n.price)}</button><button class="btn ghost" id="mClose">Vazgeç</button>`);r.querySelector("#mClose").onclick=()=>this.closeModal(),r.querySelector("#doAdopt").onclick=()=>{const a=r.querySelector("#petName").value,o=oh(e,t,a);if(!o){ne.error(),this.toast("Yeterli bakiye yok");return}e.activePet=o.uid,fe(e),this.closeModal(),this.game.spawnPets(),this.sync(),ne.success(),this.toast(`${o.name} artık senin! Peşinden geliyor 🐾`),this.tab.pets="mine",this.close()}}openBoxFlow(t){const e=this.game.state,n=uh(e,t,Date.now());if(!n){ne.error(),this.toast("Yeterli jeton yok");return}fe(e),this.sync();const s=mr[n.rarity],r=this.modal(`<div class="boxopen" style="--rc:${s}"><div class="giftbig">${Jt.gift}</div><div class="reveal"><div class="rlabel">${pr[n.rarity]}</div><div class="rico">${this.rewardIcon(n.reward)}</div><b>${this.rewardName(n.reward)}</b>${n.dup?"<small>Bu eşya sende vardı, jetona çevrildi</small>":""}<button class="btn big" id="mClose">Harika!</button></div></div>`,"box");ne.open(),setTimeout(()=>{r.querySelector(".boxopen").classList.add("opened"),ne.box(),Fi(30)},1100),r.querySelector("#mClose").onclick=()=>this.closeModal()}rewardIcon(t){if(t.type==="coin")return Jt.coin;if(t.type==="gem")return Jt.gem;if(t.type==="food")return Jt.food;const e=be(t.id);return e?Ii(e):Jt.gift}placeMode(t){document.body.classList.toggle("placing",t),t&&this.toast("Yürüyerek yer seç, sonra Kur")}confirmPlace(){const t=this.game,e=t.placingSpot();if(!e)return;if(!e.valid){ne.error(),this.toast("Burası uygun değil, biraz yürü");return}const n=t.placing.item,s=be(n);let r=Xl[0];const a=this.modal(`<div class="mhead">${Jt.houseC(s.color)}<b>${s.name}</b></div>
      <label class="field">Yuvanın adı<input id="hName" maxlength="14" value="${n==="kedi_evi"?"Mırnav Yuva":"Hav Hav Evi"}"></label>
      <div class="field">Rengi<div class="gear">${Xl.map((o,l)=>`<button class="swatch ${l===0?"on":""}" style="background:${o}" data-c="${o}"></button>`).join("")}</div></div>
      <button class="btn big" id="hOk">${Jt.check} Kur</button><button class="btn ghost" id="mClose">Geri</button>`);a.querySelectorAll("[data-c]").forEach(o=>o.onclick=()=>{r=o.dataset.c,a.querySelectorAll("[data-c]").forEach(l=>l.classList.toggle("on",l===o))}),a.querySelector("#mClose").onclick=()=>this.closeModal(),a.querySelector("#hOk").onclick=()=>{const o=t.state,l=a.querySelector("#hName").value,c=lh(o,n,e.x,e.z,e.rot,l,r);if(!c)return;const h=n==="kedi_evi"?"cat":"dog",u=o.pets.find(f=>{var p;return!f.house&&((p=li(f.breed))==null?void 0:p.species)===h});u&&(u.house=c.uid),fe(o),t.cancelPlacing(),t.addHouseObj(c.uid),t.spawnPets(),this.placeMode(!1),this.closeModal(),this.sync(),ne.success(),this.toast(u?`${c.name} kuruldu, ${u.name} artık burada yaşıyor`:`${c.name} kuruldu! 🏠`),this.hearts(new P(e.x,1.2,e.z))}}}async function Ag(){const i=document.getElementById("loadMsg");try{await Promise.race([document.fonts.load("800 64px Baloo2"),new Promise(r=>setTimeout(r,1500))])}catch{}const t=ph(Date.now()),e=new Tg,n=new bg(document.getElementById("c"),document.getElementById("joy"));i.textContent="Kediler sokağa çıkıyor…",await new Promise(r=>setTimeout(r,30));const s=new Mg(document.getElementById("c"),t,n,{reward:(r,a,o)=>e.reward(r,a,o),toast:r=>e.toast(r),changed:()=>e.sync(),hearts:r=>e.hearts(r),nearChanged:()=>e.nearChanged()});if(e.bind(s),s.start(),window.__game=s,setTimeout(()=>document.getElementById("loading").classList.add("done"),300),!localStorage.getItem("md-intro")){setTimeout(()=>e.toast("Hoş geldin! Başında 🍖 olan sokak dostlarına yaklaş ve Mama'ya bas"),900);try{localStorage.setItem("md-intro","1")}catch{}}document.addEventListener("visibilitychange",()=>{document.hidden&&fe(t)}),addEventListener("pagehide",()=>fe(t))}Ag().catch(i=>{document.getElementById("loadMsg").textContent="Bir hata oluştu: "+i.message,console.error(i)});
