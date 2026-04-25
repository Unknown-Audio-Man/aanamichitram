function H(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var j={exports:{}},n={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d=Symbol.for("react.element"),K=Symbol.for("react.portal"),Z=Symbol.for("react.fragment"),G=Symbol.for("react.strict_mode"),J=Symbol.for("react.profiler"),Q=Symbol.for("react.provider"),X=Symbol.for("react.context"),Y=Symbol.for("react.forward_ref"),ee=Symbol.for("react.suspense"),te=Symbol.for("react.memo"),re=Symbol.for("react.lazy"),b=Symbol.iterator;function ne(e){return e===null||typeof e!="object"?null:(e=b&&e[b]||e["@@iterator"],typeof e=="function"?e:null)}var O={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},L=Object.assign,P={};function y(e,t,r){this.props=e,this.context=t,this.refs=P,this.updater=r||O}y.prototype.isReactComponent={};y.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function A(){}A.prototype=y.prototype;function k(e,t,r){this.props=e,this.context=t,this.refs=P,this.updater=r||O}var S=k.prototype=new A;S.constructor=k;L(S,y.prototype);S.isPureReactComponent=!0;var $=Array.isArray,I=Object.prototype.hasOwnProperty,w={current:null},M={key:!0,ref:!0,__self:!0,__source:!0};function q(e,t,r){var o,u={},c=null,l=null;if(t!=null)for(o in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(c=""+t.key),t)I.call(t,o)&&!M.hasOwnProperty(o)&&(u[o]=t[o]);var s=arguments.length-2;if(s===1)u.children=r;else if(1<s){for(var i=Array(s),a=0;a<s;a++)i[a]=arguments[a+2];u.children=i}if(e&&e.defaultProps)for(o in s=e.defaultProps,s)u[o]===void 0&&(u[o]=s[o]);return{$$typeof:d,type:e,key:c,ref:l,props:u,_owner:w.current}}function oe(e,t){return{$$typeof:d,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function E(e){return typeof e=="object"&&e!==null&&e.$$typeof===d}function ue(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var R=/\/+/g;function v(e,t){return typeof e=="object"&&e!==null&&e.key!=null?ue(""+e.key):t.toString(36)}function m(e,t,r,o,u){var c=typeof e;(c==="undefined"||c==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(c){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case d:case K:l=!0}}if(l)return l=e,u=u(l),e=o===""?"."+v(l,0):o,$(u)?(r="",e!=null&&(r=e.replace(R,"$&/")+"/"),m(u,t,r,"",function(a){return a})):u!=null&&(E(u)&&(u=oe(u,r+(!u.key||l&&l.key===u.key?"":(""+u.key).replace(R,"$&/")+"/")+e)),t.push(u)),1;if(l=0,o=o===""?".":o+":",$(e))for(var s=0;s<e.length;s++){c=e[s];var i=o+v(c,s);l+=m(c,t,r,i,u)}else if(i=ne(e),typeof i=="function")for(e=i.call(e),s=0;!(c=e.next()).done;)c=c.value,i=o+v(c,s++),l+=m(c,t,r,i,u);else if(c==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function h(e,t,r){if(e==null)return e;var o=[],u=0;return m(e,o,"","",function(c){return t.call(r,c,u++)}),o}function ce(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var f={current:null},_={transition:null},se={ReactCurrentDispatcher:f,ReactCurrentBatchConfig:_,ReactCurrentOwner:w};function N(){throw Error("act(...) is not supported in production builds of React.")}n.Children={map:h,forEach:function(e,t,r){h(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return h(e,function(){t++}),t},toArray:function(e){return h(e,function(t){return t})||[]},only:function(e){if(!E(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};n.Component=y;n.Fragment=Z;n.Profiler=J;n.PureComponent=k;n.StrictMode=G;n.Suspense=ee;n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=se;n.act=N;n.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=L({},e.props),u=e.key,c=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(c=t.ref,l=w.current),t.key!==void 0&&(u=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(i in t)I.call(t,i)&&!M.hasOwnProperty(i)&&(o[i]=t[i]===void 0&&s!==void 0?s[i]:t[i])}var i=arguments.length-2;if(i===1)o.children=r;else if(1<i){s=Array(i);for(var a=0;a<i;a++)s[a]=arguments[a+2];o.children=s}return{$$typeof:d,type:e.type,key:u,ref:c,props:o,_owner:l}};n.createContext=function(e){return e={$$typeof:X,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Q,_context:e},e.Consumer=e};n.createElement=q;n.createFactory=function(e){var t=q.bind(null,e);return t.type=e,t};n.createRef=function(){return{current:null}};n.forwardRef=function(e){return{$$typeof:Y,render:e}};n.isValidElement=E;n.lazy=function(e){return{$$typeof:re,_payload:{_status:-1,_result:e},_init:ce}};n.memo=function(e,t){return{$$typeof:te,type:e,compare:t===void 0?null:t}};n.startTransition=function(e){var t=_.transition;_.transition={};try{e()}finally{_.transition=t}};n.unstable_act=N;n.useCallback=function(e,t){return f.current.useCallback(e,t)};n.useContext=function(e){return f.current.useContext(e)};n.useDebugValue=function(){};n.useDeferredValue=function(e){return f.current.useDeferredValue(e)};n.useEffect=function(e,t){return f.current.useEffect(e,t)};n.useId=function(){return f.current.useId()};n.useImperativeHandle=function(e,t,r){return f.current.useImperativeHandle(e,t,r)};n.useInsertionEffect=function(e,t){return f.current.useInsertionEffect(e,t)};n.useLayoutEffect=function(e,t){return f.current.useLayoutEffect(e,t)};n.useMemo=function(e,t){return f.current.useMemo(e,t)};n.useReducer=function(e,t,r){return f.current.useReducer(e,t,r)};n.useRef=function(e){return f.current.useRef(e)};n.useState=function(e){return f.current.useState(e)};n.useSyncExternalStore=function(e,t,r){return f.current.useSyncExternalStore(e,t,r)};n.useTransition=function(){return f.current.useTransition()};n.version="18.3.1";j.exports=n;var p=j.exports;const me=H(p);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=(...e)=>e.filter((t,r,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,o)=>o?o.toUpperCase():r.toLowerCase());/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=e=>{const t=le(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var C={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},fe=p.createContext({}),pe=()=>p.useContext(fe),ye=p.forwardRef(({color:e,size:t,strokeWidth:r,absoluteStrokeWidth:o,className:u="",children:c,iconNode:l,...s},i)=>{const{size:a=24,strokeWidth:x=2,absoluteStrokeWidth:W=!1,color:D="currentColor",className:T=""}=pe()??{},F=o??W?Number(r??x)*24/Number(t??a):r??x;return p.createElement("svg",{ref:i,...C,width:t??a??C.width,height:t??a??C.height,stroke:e??D,strokeWidth:F,className:U("lucide",T,u),...!c&&!ae(s)&&{"aria-hidden":"true"},...s},[...l.map(([z,B])=>p.createElement(z,B)),...Array.isArray(c)?c:[c]])});/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=(e,t)=>{const r=p.forwardRef(({className:o,...u},c)=>p.createElement(ye,{ref:c,iconNode:t,className:U(`lucide-${ie(g(e))}`,`lucide-${e}`,o),...u}));return r.displayName=g(e),r};/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],_e=V("external-link",de);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],ve=V("loader-circle",he);export{_e as E,ve as L,me as R,p as r};
