function B(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var j={exports:{}},n={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h=Symbol.for("react.element"),K=Symbol.for("react.portal"),Z=Symbol.for("react.fragment"),G=Symbol.for("react.strict_mode"),J=Symbol.for("react.profiler"),Q=Symbol.for("react.provider"),X=Symbol.for("react.context"),Y=Symbol.for("react.forward_ref"),ee=Symbol.for("react.suspense"),te=Symbol.for("react.memo"),re=Symbol.for("react.lazy"),$=Symbol.iterator;function ne(e){return e===null||typeof e!="object"?null:(e=$&&e[$]||e["@@iterator"],typeof e=="function"?e:null)}var L={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},P=Object.assign,O={};function d(e,t,r){this.props=e,this.context=t,this.refs=O,this.updater=r||L}d.prototype.isReactComponent={};d.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};d.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function A(){}A.prototype=d.prototype;function g(e,t,r){this.props=e,this.context=t,this.refs=O,this.updater=r||L}var x=g.prototype=new A;x.constructor=g;P(x,d.prototype);x.isPureReactComponent=!0;var E=Array.isArray,N=Object.prototype.hasOwnProperty,C={current:null},I={key:!0,ref:!0,__self:!0,__source:!0};function V(e,t,r){var o,u={},c=null,a=null;if(t!=null)for(o in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(c=""+t.key),t)N.call(t,o)&&!I.hasOwnProperty(o)&&(u[o]=t[o]);var s=arguments.length-2;if(s===1)u.children=r;else if(1<s){for(var i=Array(s),l=0;l<s;l++)i[l]=arguments[l+2];u.children=i}if(e&&e.defaultProps)for(o in s=e.defaultProps,s)u[o]===void 0&&(u[o]=s[o]);return{$$typeof:h,type:e,key:c,ref:a,props:u,_owner:C.current}}function oe(e,t){return{$$typeof:h,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function S(e){return typeof e=="object"&&e!==null&&e.$$typeof===h}function ue(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var R=/\/+/g;function k(e,t){return typeof e=="object"&&e!==null&&e.key!=null?ue(""+e.key):t.toString(36)}function _(e,t,r,o,u){var c=typeof e;(c==="undefined"||c==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(c){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case h:case K:a=!0}}if(a)return a=e,u=u(a),e=o===""?"."+k(a,0):o,E(u)?(r="",e!=null&&(r=e.replace(R,"$&/")+"/"),_(u,t,r,"",function(l){return l})):u!=null&&(S(u)&&(u=oe(u,r+(!u.key||a&&a.key===u.key?"":(""+u.key).replace(R,"$&/")+"/")+e)),t.push(u)),1;if(a=0,o=o===""?".":o+":",E(e))for(var s=0;s<e.length;s++){c=e[s];var i=o+k(c,s);a+=_(c,t,r,i,u)}else if(i=ne(e),typeof i=="function")for(e=i.call(e),s=0;!(c=e.next()).done;)c=c.value,i=o+k(c,s++),a+=_(c,t,r,i,u);else if(c==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function m(e,t,r){if(e==null)return e;var o=[],u=0;return _(e,o,"","",function(c){return t.call(r,c,u++)}),o}function ce(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var f={current:null},v={transition:null},se={ReactCurrentDispatcher:f,ReactCurrentBatchConfig:v,ReactCurrentOwner:C};function D(){throw Error("act(...) is not supported in production builds of React.")}n.Children={map:m,forEach:function(e,t,r){m(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return m(e,function(){t++}),t},toArray:function(e){return m(e,function(t){return t})||[]},only:function(e){if(!S(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};n.Component=d;n.Fragment=Z;n.Profiler=J;n.PureComponent=g;n.StrictMode=G;n.Suspense=ee;n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=se;n.act=D;n.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=P({},e.props),u=e.key,c=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(c=t.ref,a=C.current),t.key!==void 0&&(u=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(i in t)N.call(t,i)&&!I.hasOwnProperty(i)&&(o[i]=t[i]===void 0&&s!==void 0?s[i]:t[i])}var i=arguments.length-2;if(i===1)o.children=r;else if(1<i){s=Array(i);for(var l=0;l<i;l++)s[l]=arguments[l+2];o.children=s}return{$$typeof:h,type:e.type,key:u,ref:c,props:o,_owner:a}};n.createContext=function(e){return e={$$typeof:X,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Q,_context:e},e.Consumer=e};n.createElement=V;n.createFactory=function(e){var t=V.bind(null,e);return t.type=e,t};n.createRef=function(){return{current:null}};n.forwardRef=function(e){return{$$typeof:Y,render:e}};n.isValidElement=S;n.lazy=function(e){return{$$typeof:re,_payload:{_status:-1,_result:e},_init:ce}};n.memo=function(e,t){return{$$typeof:te,type:e,compare:t===void 0?null:t}};n.startTransition=function(e){var t=v.transition;v.transition={};try{e()}finally{v.transition=t}};n.unstable_act=D;n.useCallback=function(e,t){return f.current.useCallback(e,t)};n.useContext=function(e){return f.current.useContext(e)};n.useDebugValue=function(){};n.useDeferredValue=function(e){return f.current.useDeferredValue(e)};n.useEffect=function(e,t){return f.current.useEffect(e,t)};n.useId=function(){return f.current.useId()};n.useImperativeHandle=function(e,t,r){return f.current.useImperativeHandle(e,t,r)};n.useInsertionEffect=function(e,t){return f.current.useInsertionEffect(e,t)};n.useLayoutEffect=function(e,t){return f.current.useLayoutEffect(e,t)};n.useMemo=function(e,t){return f.current.useMemo(e,t)};n.useReducer=function(e,t,r){return f.current.useReducer(e,t,r)};n.useRef=function(e){return f.current.useRef(e)};n.useState=function(e){return f.current.useState(e)};n.useSyncExternalStore=function(e,t,r){return f.current.useSyncExternalStore(e,t,r)};n.useTransition=function(){return f.current.useTransition()};n.version="18.3.1";j.exports=n;var y=j.exports;const Ce=B(y);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=(...e)=>e.filter((t,r,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,o)=>o?o.toUpperCase():r.toLowerCase());/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=e=>{const t=ae(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var w={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},fe=y.createContext({}),pe=()=>y.useContext(fe),ye=y.forwardRef(({color:e,size:t,strokeWidth:r,absoluteStrokeWidth:o,className:u="",children:c,iconNode:a,...s},i)=>{const{size:l=24,strokeWidth:b=2,absoluteStrokeWidth:U=!1,color:W="currentColor",className:z=""}=pe()??{},H=o??U?Number(r??b)*24/Number(t??l):r??b;return y.createElement("svg",{ref:i,...w,width:t??l??w.width,height:t??l??w.height,stroke:e??W,strokeWidth:H,className:F("lucide",z,u),...!c&&!le(s)&&{"aria-hidden":"true"},...s},[...a.map(([T,q])=>y.createElement(T,q)),...Array.isArray(c)?c:[c]])});/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=(e,t)=>{const r=y.forwardRef(({className:o,...u},c)=>y.createElement(ye,{ref:c,iconNode:t,className:F(`lucide-${ie(M(e))}`,`lucide-${e}`,o),...u}));return r.displayName=M(e),r};/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],Se=p("camera",de);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],be=p("chevron-right",he);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 3v18",key:"bbkbws"}],["path",{d:"M3 7.5h4",key:"zfgn84"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 16.5h4",key:"1230mu"}],["path",{d:"M17 3v18",key:"in4fa5"}],["path",{d:"M17 7.5h4",key:"myr1c1"}],["path",{d:"M17 16.5h4",key:"go4c1d"}]],$e=p("film",me);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Ee=p("layout-dashboard",_e);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],Re=p("lock",ve);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],Me=p("log-out",ke);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=[["path",{d:"M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z",key:"vbtd3f"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["rect",{x:"2",y:"3",width:"20",height:"14",rx:"2",key:"x3v2xh"}]],je=p("monitor-play",we);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["path",{d:"M18 8L22 12L18 16",key:"1r0oui"}],["path",{d:"M2 12H22",key:"1m8cig"}]],Le=p("move-right",ge);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Pe=p("plus",xe);export{Se as C,$e as F,Re as L,Le as M,Pe as P,Ce as R,Ee as a,je as b,Me as c,be as d,y as r};
