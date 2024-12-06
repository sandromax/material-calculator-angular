import{w as X}from "./chunk-Z5CN4BXF.js";import{L as G,a as _,b as H,c as N,d as W,f as Y,h as $,i as E,j as s,l as Z}from "./chunk-63CPMSPJ.js";import{f as q,g as c,h as F,m as J,n as M,p as K,u as Q}from "./chunk-7JUTKCDM.js";import"./chunk-Q64FFBLU.js";import{$a as d,Ca as f,Da as L,Fa as V,Ha as g,Ka as y,Q as x,Qb as S,S as p,V as b,X as m,Y as w,Yb as U,_ as u,ab as v,bb as k,ca as P,da as j,eb as B,qa as h,rb as A,vb as z,wb as C,ya as l}from "./chunk-EKOAIOEB.js";import"./chunk-EQDQRRRY.js";var R=class n{constructor(e){this.translate=e;this.translate.setDefaultLang("ru"),this.translate.use("ru")}changeLanguage(e){this.translate.use(e)}static \u0275fac=function(t){return new(t||n)(f(s))};static \u0275cmp=u({type:n,selectors:[["app-language-switcher"]],standalone:!0,features:[z([s]),C],decls:7,vars:0,consts:[["placeholder","Select Language",3,"selectionChange"],["value","fr"],["value","ru"],["value","ro"]],template:function(t, r){t&1&&(d(0,"mat-select",0),B("selectionChange",function(i){return r.changeLanguage(i.value)}),d(1,"mat-option",1),A(2,"Fran\xE7ais"),v(),d(3,"mat-option",2),A(4,"\u0420\u0443\u0441\u044C\u043A\u0430"),v(),d(5,"mat-option",3),A(6,"Rom\xE2n\u0103"),v()())},dependencies:[X,G],styles:["mat-select[_ngcontent-%COMP%]{margin:10px;min-width:150px}"]})};var D=class n{constructor(e){this.translate=e}title="calculatorAngular4";static \u0275fac=function(t){return new(t||n)(f(s))};static \u0275cmp=u({type:n,selectors:[["app-root"]],standalone:!0,features:[C],decls:2,vars:0,template:function(t, r){t&1&&k(0,"app-language-switcher")(1,"router-outlet")},dependencies:[Y,U,R]})};var ee=[{path:"",redirectTo:"order",pathMatch:"full"},{path:"order",loadComponent:()=>import("./chunk-KHAPLZJV.js").then(n=>n.OrderFormComponent)},{path:"result",loadComponent:()=>import("./chunk-XNRVRMNY.js").then(n=>n.CalculationResultComponent)}];var le="@",de=(()=>{class n{constructor(t, r, o, i, a){this.doc=t,this.delegate=r,this.zone=o,this.animationType=i,this.moduleImpl=a,this._rendererFactoryPromise=null,this.scheduler=w(V,{optional:!0}),this.loadingSchedulerFn=w(ce,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){let t=()=>this.moduleImpl??import("./chunk-H6DR6UBG.js").then(o=>o),r;return this.loadingSchedulerFn?r=this.loadingSchedulerFn(t):r=t(),r.catch(o=>{throw new x(5300,!1)}).then(({\u0275createEngine:o,\u0275AnimationRendererFactory:i})=>{this._engine=o(this.animationType,this.doc);let a=new i(this.delegate,this._engine,this.zone);return this.delegate=a,a})}createRenderer(t, r){let o=this.delegate.createRenderer(t,r);if(o.\u0275type===0)return o;typeof o.throwOnSyntheticProps=="boolean"&&(o.throwOnSyntheticProps=!1);let i=new O(o);return r?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(a=>{let ie=a.createRenderer(t,r);i.use(ie),this.scheduler?.notify(10)}).catch(a=>{i.use(o)}),i}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}static{this.\u0275fac=function(r){L()}}static{this.\u0275prov=p({token:n,factory:n.\u0275fac})}}return n})(),O=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let t of this.replay)t(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e, t){return this.delegate.createElement(e,t)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e, t){this.delegate.appendChild(e,t)}insertBefore(e, t, r, o){this.delegate.insertBefore(e,t,r,o)}removeChild(e, t, r){this.delegate.removeChild(e,t,r)}selectRootElement(e, t){return this.delegate.selectRootElement(e,t)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e, t, r, o){this.delegate.setAttribute(e,t,r,o)}removeAttribute(e, t, r){this.delegate.removeAttribute(e,t,r)}addClass(e, t){this.delegate.addClass(e,t)}removeClass(e, t){this.delegate.removeClass(e,t)}setStyle(e, t, r, o){this.delegate.setStyle(e,t,r,o)}removeStyle(e, t, r){this.delegate.removeStyle(e,t,r)}setProperty(e, t, r){this.shouldReplay(t)&&this.replay.push(o=>o.setProperty(e,t,r)),this.delegate.setProperty(e,t,r)}setValue(e, t){this.delegate.setValue(e,t)}listen(e, t, r){return this.shouldReplay(t)&&this.replay.push(o=>o.listen(e,t,r)),this.delegate.listen(e,t,r)}shouldReplay(e){return this.replay!==null&&e.startsWith(le)}},ce=new b("");function te(n="animations"){return y("NgAsyncAnimations"),P([{provide:g,useFactory:(e, t, r)=>new de(e,t,r,n),deps:[S,N,h]},{provide:l,useValue:n==="noop"?"NoopAnimations":"BrowserAnimations"}])}var I=class{http;prefix;suffix;constructor(e, t="/assets/i18n/", r=".json"){this.http=e,this.prefix=t,this.suffix=r}getTranslation(e){return this.http.get(`${this.prefix}${e}${this.suffix}`)}};var pe=(()=>{class n extends M{constructor(t, r, o){super(t,r,o)}ngOnDestroy(){this.flush()}static{this.\u0275fac=function(r){return new(r||n)(m(S),m(c),m(F))}}static{this.\u0275prov=p({token:n,factory:n.\u0275fac})}}return n})();function me(){return new J}function ue(n, e, t){return new Q(n,e,t)}var re=[{provide:F,useFactory:me},{provide:M,useClass:pe},{provide:g,useFactory:ue,deps:[N,M,h]}],he=[{provide:c,useFactory:()=>new K},{provide:l,useValue:"BrowserAnimations"},...re],Be=[{provide:c,useClass:q},{provide:l,useValue:"NoopAnimations"},...re];function ne(){return y("NgEagerAnimations"),[...he]}function oe(n){return new I(n,"./assets/i18n/",".json")}W(D,{providers:[H(),$(ee),te(),ne(),{provide:E,useFactory:oe,deps:[_]},j(Z.forRoot({loader:{provide:E,useFactory:oe,deps:[_]}}))]}).catch(n=>console.error(n));export{oe as httpLoaderFactory};