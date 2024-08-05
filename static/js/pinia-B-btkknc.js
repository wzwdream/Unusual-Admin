import{i as Z}from"./vue-demi-Dq6ymT-8.js";import{R as F,a as H,O as B,S as G,i as $,p as D,f as R,U as L,t as A,w as T,v as tt,g as et,b as st,n as nt,V as ot,j as ct}from"./@vue-CRj7PaMA.js";/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */let J;const k=t=>J=t,N=Symbol();function E(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var C;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(C||(C={}));function vt(){const t=F(!0),n=t.run(()=>H({}));let s=[],e=[];const r=B({install(u){k(r),r._a=u,u.provide(N,r),u.config.globalProperties.$pinia=r,e.forEach(a=>s.push(a)),e=[]},use(u){return!this._a&&!Z?e.push(u):s.push(u),this},_p:s,_a:null,_e:t,_s:new Map,state:n});return r}const U=()=>{};function V(t,n,s,e=U){t.push(n);const r=()=>{const u=t.indexOf(n);u>-1&&(t.splice(u,1),e())};return!s&&et()&&st(r),r}function P(t,...n){t.slice().forEach(s=>{s(...n)})}const rt=t=>t();function I(t,n){t instanceof Map&&n instanceof Map&&n.forEach((s,e)=>t.set(e,s)),t instanceof Set&&n instanceof Set&&n.forEach(t.add,t);for(const s in n){if(!n.hasOwnProperty(s))continue;const e=n[s],r=t[s];E(r)&&E(e)&&t.hasOwnProperty(s)&&!R(e)&&!L(e)?t[s]=I(r,e):t[s]=e}return t}const ut=Symbol();function ft(t){return!E(t)||!t.hasOwnProperty(ut)}const{assign:v}=Object;function at(t){return!!(R(t)&&t.effect)}function it(t,n,s,e){const{state:r,actions:u,getters:a}=n,f=s.state.value[t];let g;function b(){f||(s.state.value[t]=r?r():{});const y=ot(s.state.value[t]);return v(y,u,Object.keys(a||{}).reduce((m,_)=>(m[_]=B(ct(()=>{k(s);const d=s._s.get(t);return a[_].call(d,d)})),m),{}))}return g=q(t,b,n,s,e,!0),g}function q(t,n,s={},e,r,u){let a;const f=v({actions:{}},s),g={deep:!0};let b,y,m=[],_=[],d;const j=e.state.value[t];!u&&!j&&(e.state.value[t]={}),H({});let O;function W(c){let o;b=y=!1,typeof c=="function"?(c(e.state.value[t]),o={type:C.patchFunction,storeId:t,events:d}):(I(e.state.value[t],c),o={type:C.patchObject,payload:c,storeId:t,events:d});const h=O=Symbol();nt().then(()=>{O===h&&(b=!0)}),y=!0,P(m,o,e.state.value[t])}const z=u?function(){const{state:o}=s,h=o?o():{};this.$patch(S=>{v(S,h)})}:U;function K(){a.stop(),m=[],_=[],e._s.delete(t)}function M(c,o){return function(){k(e);const h=Array.from(arguments),S=[],p=[];function X(i){S.push(i)}function Y(i){p.push(i)}P(_,{args:h,name:c,store:l,after:X,onError:Y});let x;try{x=o.apply(this&&this.$id===t?this:l,h)}catch(i){throw P(p,i),i}return x instanceof Promise?x.then(i=>(P(S,i),i)).catch(i=>(P(p,i),Promise.reject(i))):(P(S,x),x)}}const Q={_p:e,$id:t,$onAction:V.bind(null,_),$patch:W,$reset:z,$subscribe(c,o={}){const h=V(m,c,o.detached,()=>S()),S=a.run(()=>T(()=>e.state.value[t],p=>{(o.flush==="sync"?y:b)&&c({storeId:t,type:C.direct,events:d},p)},v({},g,o)));return h},$dispose:K},l=tt(Q);e._s.set(t,l);const w=(e._a&&e._a.runWithContext||rt)(()=>e._e.run(()=>(a=F()).run(n)));for(const c in w){const o=w[c];if(R(o)&&!at(o)||L(o))u||(j&&ft(o)&&(R(o)?o.value=j[c]:I(o,j[c])),e.state.value[t][c]=o);else if(typeof o=="function"){const h=M(c,o);w[c]=h,f.actions[c]=o}}return v(l,w),v(D(l),w),Object.defineProperty(l,"$state",{get:()=>e.state.value[t],set:c=>{W(o=>{v(o,c)})}}),e._p.forEach(c=>{v(l,a.run(()=>c({store:l,app:e._a,pinia:e,options:f})))}),j&&u&&s.hydrate&&s.hydrate(l.$state,j),b=!0,y=!0,l}function yt(t,n,s){let e,r;const u=typeof n=="function";typeof t=="string"?(e=t,r=u?s:n):(r=t,e=t.id);function a(f,g){const b=G();return f=f||(b?$(N,null):null),f&&k(f),f=J,f._s.has(e)||(u?q(e,n,r,f):it(e,r,f)),f._s.get(e)}return a.$id=e,a}function St(t){{t=D(t);const n={};for(const s in t){const e=t[s];(R(e)||L(e))&&(n[s]=A(t,s))}return n}}export{vt as c,yt as d,St as s};