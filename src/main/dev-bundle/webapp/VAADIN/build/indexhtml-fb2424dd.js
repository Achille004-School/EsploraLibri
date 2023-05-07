(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();window.Vaadin=window.Vaadin||{};window.Vaadin.featureFlags=window.Vaadin.featureFlags||{};window.Vaadin.featureFlags.exampleFeatureFlag=!1;window.Vaadin.featureFlags.collaborationEngineBackend=!1;window.Vaadin.featureFlags.enforceFieldValidation=!1;const Yt="modulepreload",Jt=function(i,e){return new URL(i,e).href},je={},pe=function(e,t,o){if(!t||t.length===0)return e();const r=document.getElementsByTagName("link");return Promise.all(t.map(n=>{if(n=Jt(n,o),n in je)return;je[n]=!0;const s=n.endsWith(".css"),c=s?'[rel="stylesheet"]':"";if(!!o)for(let d=r.length-1;d>=0;d--){const h=r[d];if(h.href===n&&(!s||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${c}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":Yt,s||(l.as="script",l.crossOrigin=""),l.href=n,document.head.appendChild(l),s)return new Promise((d,h)=>{l.addEventListener("load",d),l.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>e())};function fe(i){return i=i||[],Array.isArray(i)?i:[i]}function x(i){return`[Vaadin.Router] ${i}`}function Xt(i){if(typeof i!="object")return String(i);const e=Object.prototype.toString.call(i).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(i)}`:e}const ve="module",ge="nomodule",Le=[ve,ge];function ze(i){if(!i.match(/.+\.[m]?js$/))throw new Error(x(`Unsupported type for bundle "${i}": .js or .mjs expected.`))}function Et(i){if(!i||!T(i.path))throw new Error(x('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=i.bundle,t=["component","redirect","bundle"];if(!D(i.action)&&!Array.isArray(i.children)&&!D(i.children)&&!me(e)&&!t.some(o=>T(i[o])))throw new Error(x(`Expected route config "${i.path}" to include either "${t.join('", "')}" or "action" function but none found.`));if(e)if(T(e))ze(e);else if(Le.some(o=>o in e))Le.forEach(o=>o in e&&ze(e[o]));else throw new Error(x('Expected route bundle to include either "'+ge+'" or "'+ve+'" keys, or both'));i.redirect&&["bundle","component"].forEach(o=>{o in i&&console.warn(x(`Route config "${i.path}" has both "redirect" and "${o}" properties, and "redirect" will always override the latter. Did you mean to only use "${o}"?`))})}function Ge(i){fe(i).forEach(e=>Et(e))}function We(i,e){let t=document.head.querySelector('script[src="'+i+'"][async]');return t||(t=document.createElement("script"),t.setAttribute("src",i),e===ve?t.setAttribute("type",ve):e===ge&&t.setAttribute(ge,""),t.async=!0),new Promise((o,r)=>{t.onreadystatechange=t.onload=n=>{t.__dynamicImportLoaded=!0,o(n)},t.onerror=n=>{t.parentNode&&t.parentNode.removeChild(t),r(n)},t.parentNode===null?document.head.appendChild(t):t.__dynamicImportLoaded&&o()})}function Qt(i){return T(i)?We(i):Promise.race(Le.filter(e=>e in i).map(e=>We(i[e],e)))}function J(i,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${i}`,{cancelable:i==="go",detail:e}))}function me(i){return typeof i=="object"&&!!i}function D(i){return typeof i=="function"}function T(i){return typeof i=="string"}function St(i){const e=new Error(x(`Page not found (${i.pathname})`));return e.context=i,e.code=404,e}const V=new class{};function Zt(i){const e=i.port,t=i.protocol,n=t==="http:"&&e==="80"||t==="https:"&&e==="443"?i.hostname:i.host;return`${t}//${n}`}function qe(i){if(i.defaultPrevented||i.button!==0||i.shiftKey||i.ctrlKey||i.altKey||i.metaKey)return;let e=i.target;const t=i.composedPath?i.composedPath():i.path||[];for(let c=0;c<t.length;c++){const a=t[c];if(a.nodeName&&a.nodeName.toLowerCase()==="a"){e=a;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||Zt(e))!==window.location.origin)return;const{pathname:r,search:n,hash:s}=e;J("go",{pathname:r,search:n,hash:s})&&(i.preventDefault(),i&&i.type==="click"&&window.scrollTo(0,0))}const ei={activate(){window.document.addEventListener("click",qe)},inactivate(){window.document.removeEventListener("click",qe)}},ti=/Trident/.test(navigator.userAgent);ti&&!D(window.PopStateEvent)&&(window.PopStateEvent=function(i,e){e=e||{};var t=document.createEvent("Event");return t.initEvent(i,Boolean(e.bubbles),Boolean(e.cancelable)),t.state=e.state||null,t},window.PopStateEvent.prototype=window.Event.prototype);function Ke(i){if(i.state==="vaadin-router-ignore")return;const{pathname:e,search:t,hash:o}=window.location;J("go",{pathname:e,search:t,hash:o})}const ii={activate(){window.addEventListener("popstate",Ke)},inactivate(){window.removeEventListener("popstate",Ke)}};var W=Rt,oi=Pe,ni=li,ri=Ct,si=xt,$t="/",At="./",ai=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function Pe(i,e){for(var t=[],o=0,r=0,n="",s=e&&e.delimiter||$t,c=e&&e.delimiters||At,a=!1,l;(l=ai.exec(i))!==null;){var d=l[0],h=l[1],u=l.index;if(n+=i.slice(r,u),r=u+d.length,h){n+=h[1],a=!0;continue}var p="",N=i[r],M=l[2],zt=l[3],Gt=l[4],re=l[5];if(!a&&n.length){var be=n.length-1;c.indexOf(n[be])>-1&&(p=n[be],n=n.slice(0,be))}n&&(t.push(n),n="",a=!1);var Wt=p!==""&&N!==void 0&&N!==p,qt=re==="+"||re==="*",Kt=re==="?"||re==="*",He=p||s,Be=zt||Gt;t.push({name:M||o++,prefix:p,delimiter:He,optional:Kt,repeat:qt,partial:Wt,pattern:Be?ci(Be):"[^"+k(He)+"]+?"})}return(n||r<i.length)&&t.push(n+i.substr(r)),t}function li(i,e){return Ct(Pe(i,e))}function Ct(i){for(var e=new Array(i.length),t=0;t<i.length;t++)typeof i[t]=="object"&&(e[t]=new RegExp("^(?:"+i[t].pattern+")$"));return function(o,r){for(var n="",s=r&&r.encode||encodeURIComponent,c=0;c<i.length;c++){var a=i[c];if(typeof a=="string"){n+=a;continue}var l=o?o[a.name]:void 0,d;if(Array.isArray(l)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but got array');if(l.length===0){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var h=0;h<l.length;h++){if(d=s(l[h],a),!e[c].test(d))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'"');n+=(h===0?a.prefix:a.delimiter)+d}continue}if(typeof l=="string"||typeof l=="number"||typeof l=="boolean"){if(d=s(String(l),a),!e[c].test(d))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but got "'+d+'"');n+=a.prefix+d;continue}if(a.optional){a.partial&&(n+=a.prefix);continue}throw new TypeError('Expected "'+a.name+'" to be '+(a.repeat?"an array":"a string"))}return n}}function k(i){return i.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function ci(i){return i.replace(/([=!:$/()])/g,"\\$1")}function Tt(i){return i&&i.sensitive?"":"i"}function di(i,e){if(!e)return i;var t=i.source.match(/\((?!\?)/g);if(t)for(var o=0;o<t.length;o++)e.push({name:o,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return i}function hi(i,e,t){for(var o=[],r=0;r<i.length;r++)o.push(Rt(i[r],e,t).source);return new RegExp("(?:"+o.join("|")+")",Tt(t))}function ui(i,e,t){return xt(Pe(i,t),e,t)}function xt(i,e,t){t=t||{};for(var o=t.strict,r=t.start!==!1,n=t.end!==!1,s=k(t.delimiter||$t),c=t.delimiters||At,a=[].concat(t.endsWith||[]).map(k).concat("$").join("|"),l=r?"^":"",d=i.length===0,h=0;h<i.length;h++){var u=i[h];if(typeof u=="string")l+=k(u),d=h===i.length-1&&c.indexOf(u[u.length-1])>-1;else{var p=u.repeat?"(?:"+u.pattern+")(?:"+k(u.delimiter)+"(?:"+u.pattern+"))*":u.pattern;e&&e.push(u),u.optional?u.partial?l+=k(u.prefix)+"("+p+")?":l+="(?:"+k(u.prefix)+"("+p+"))?":l+=k(u.prefix)+"("+p+")"}}return n?(o||(l+="(?:"+s+")?"),l+=a==="$"?"$":"(?="+a+")"):(o||(l+="(?:"+s+"(?="+a+"))?"),d||(l+="(?="+s+"|"+a+")")),new RegExp(l,Tt(t))}function Rt(i,e,t){return i instanceof RegExp?di(i,e):Array.isArray(i)?hi(i,e,t):ui(i,e,t)}W.parse=oi;W.compile=ni;W.tokensToFunction=ri;W.tokensToRegExp=si;const{hasOwnProperty:pi}=Object.prototype,Ne=new Map;Ne.set("|false",{keys:[],pattern:/(?:)/});function Ye(i){try{return decodeURIComponent(i)}catch{return i}}function fi(i,e,t,o,r){t=!!t;const n=`${i}|${t}`;let s=Ne.get(n);if(!s){const l=[];s={keys:l,pattern:W(i,l,{end:t,strict:i===""})},Ne.set(n,s)}const c=s.pattern.exec(e);if(!c)return null;const a=Object.assign({},r);for(let l=1;l<c.length;l++){const d=s.keys[l-1],h=d.name,u=c[l];(u!==void 0||!pi.call(a,h))&&(d.repeat?a[h]=u?u.split(d.delimiter).map(Ye):[]:a[h]=u&&Ye(u))}return{path:c[0],keys:(o||[]).concat(s.keys),params:a}}function kt(i,e,t,o,r){let n,s,c=0,a=i.path||"";return a.charAt(0)==="/"&&(t&&(a=a.substr(1)),t=!0),{next(l){if(i===l)return{done:!0};const d=i.__children=i.__children||i.children;if(!n&&(n=fi(a,e,!d,o,r),n))return{done:!1,value:{route:i,keys:n.keys,params:n.params,path:n.path}};if(n&&d)for(;c<d.length;){if(!s){const u=d[c];u.parent=i;let p=n.path.length;p>0&&e.charAt(p)==="/"&&(p+=1),s=kt(u,e.substr(p),t,n.keys,n.params)}const h=s.next(l);if(!h.done)return{done:!1,value:h.value};s=null,c++}return{done:!0}}}}function vi(i){if(D(i.route.action))return i.route.action(i)}function gi(i,e){let t=e;for(;t;)if(t=t.parent,t===i)return!0;return!1}function mi(i){let e=`Path '${i.pathname}' is not properly resolved due to an error.`;const t=(i.route||{}).path;return t&&(e+=` Resolution had failed on route: '${t}'`),e}function _i(i,e){const{route:t,path:o}=e;if(t&&!t.__synthetic){const r={path:o,route:t};if(!i.chain)i.chain=[];else if(t.parent){let n=i.chain.length;for(;n--&&i.chain[n].route&&i.chain[n].route!==t.parent;)i.chain.pop()}i.chain.push(r)}}class Q{constructor(e,t={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=t.baseUrl||"",this.errorHandler=t.errorHandler,this.resolveRoute=t.resolveRoute||vi,this.context=Object.assign({resolver:this},t.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){Ge(e);const t=[...fe(e)];this.root.__children=t}addRoutes(e){return Ge(e),this.root.__children.push(...fe(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const t=Object.assign({},this.context,T(e)?{pathname:e}:e),o=kt(this.root,this.__normalizePathname(t.pathname),this.baseUrl),r=this.resolveRoute;let n=null,s=null,c=t;function a(l,d=n.value.route,h){const u=h===null&&n.value.route;return n=s||o.next(u),s=null,!l&&(n.done||!gi(d,n.value.route))?(s=n,Promise.resolve(V)):n.done?Promise.reject(St(t)):(c=Object.assign(c?{chain:c.chain?c.chain.slice(0):[]}:{},t,n.value),_i(c,n.value),Promise.resolve(r(c)).then(p=>p!=null&&p!==V?(c.result=p.result||p,c):a(l,d,p)))}return t.next=a,Promise.resolve().then(()=>a(!0,this.root)).catch(l=>{const d=mi(c);if(l?console.warn(d):l=new Error(d),l.context=l.context||c,l instanceof DOMException||(l.code=l.code||500),this.errorHandler)return c.result=this.errorHandler(l),c;throw l})}static __createUrl(e,t){return new URL(e,t)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const t=this.__effectiveBaseUrl,o=this.constructor.__createUrl(e,t).href;if(o.slice(0,t.length)===t)return o.slice(t.length)}}Q.pathToRegexp=W;const{pathToRegexp:Je}=Q,Xe=new Map;function It(i,e,t){const o=e.name||e.component;if(o&&(i.has(o)?i.get(o).push(e):i.set(o,[e])),Array.isArray(t))for(let r=0;r<t.length;r++){const n=t[r];n.parent=e,It(i,n,n.__children||n.children)}}function Qe(i,e){const t=i.get(e);if(t&&t.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return t&&t[0]}function Ze(i){let e=i.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function yi(i,e={}){if(!(i instanceof Q))throw new TypeError("An instance of Resolver is expected");const t=new Map;return(o,r)=>{let n=Qe(t,o);if(!n&&(t.clear(),It(t,i.root,i.root.__children),n=Qe(t,o),!n))throw new Error(`Route "${o}" not found`);let s=Xe.get(n.fullPath);if(!s){let a=Ze(n),l=n.parent;for(;l;){const p=Ze(l);p&&(a=p.replace(/\/$/,"")+"/"+a.replace(/^\//,"")),l=l.parent}const d=Je.parse(a),h=Je.tokensToFunction(d),u=Object.create(null);for(let p=0;p<d.length;p++)T(d[p])||(u[d[p].name]=!0);s={toPath:h,keys:u},Xe.set(a,s),n.fullPath=a}let c=s.toPath(r,e)||"/";if(e.stringifyQueryParams&&r){const a={},l=Object.keys(r);for(let h=0;h<l.length;h++){const u=l[h];s.keys[u]||(a[u]=r[u])}const d=e.stringifyQueryParams(a);d&&(c+=d.charAt(0)==="?"?d:`?${d}`)}return c}}let et=[];function wi(i){et.forEach(e=>e.inactivate()),i.forEach(e=>e.activate()),et=i}const bi=i=>{const e=getComputedStyle(i).getPropertyValue("animation-name");return e&&e!=="none"},Ei=(i,e)=>{const t=()=>{i.removeEventListener("animationend",t),e()};i.addEventListener("animationend",t)};function tt(i,e){return i.classList.add(e),new Promise(t=>{if(bi(i)){const o=i.getBoundingClientRect(),r=`height: ${o.bottom-o.top}px; width: ${o.right-o.left}px`;i.setAttribute("style",`position: absolute; ${r}`),Ei(i,()=>{i.classList.remove(e),i.removeAttribute("style"),t()})}else i.classList.remove(e),t()})}const Si=256;function Ee(i){return i!=null}function $i(i){const e=Object.assign({},i);return delete e.next,e}function A({pathname:i="",search:e="",hash:t="",chain:o=[],params:r={},redirectFrom:n,resolver:s},c){const a=o.map(l=>l.route);return{baseUrl:s&&s.baseUrl||"",pathname:i,search:e,hash:t,routes:a,route:c||a.length&&a[a.length-1]||null,params:r,redirectFrom:n,getUrl:(l={})=>ce(L.pathToRegexp.compile(Lt(a))(Object.assign({},r,l)),s)}}function it(i,e){const t=Object.assign({},i.params);return{redirect:{pathname:e,from:i.pathname,params:t}}}function Ai(i,e){e.location=A(i);const t=i.chain.map(o=>o.route).indexOf(i.route);return i.chain[t].element=e,e}function le(i,e,t){if(D(i))return i.apply(t,e)}function ot(i,e,t){return o=>{if(o&&(o.cancel||o.redirect))return o;if(t)return le(t[i],e,t)}}function Ci(i,e){if(!Array.isArray(i)&&!me(i))throw new Error(x(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${i}`));e.__children=[];const t=fe(i);for(let o=0;o<t.length;o++)Et(t[o]),e.__children.push(t[o])}function se(i){if(i&&i.length){const e=i[0].parentNode;for(let t=0;t<i.length;t++)e.removeChild(i[t])}}function ce(i,e){const t=e.__effectiveBaseUrl;return t?e.constructor.__createUrl(i.replace(/^\//,""),t).pathname:i}function Lt(i){return i.map(e=>e.path).reduce((e,t)=>t.length?e.replace(/\/$/,"")+"/"+t.replace(/^\//,""):e,"")}class L extends Q{constructor(e,t){const o=document.head.querySelector("base"),r=o&&o.getAttribute("href");super([],Object.assign({baseUrl:r&&Q.__createUrl(r,document.URL).pathname.replace(/[^\/]*$/,"")},t)),this.resolveRoute=s=>this.__resolveRoute(s);const n=L.NavigationTrigger;L.setTriggers.apply(L,Object.keys(n).map(s=>n[s])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=A({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const t=e.route;let o=Promise.resolve();D(t.children)&&(o=o.then(()=>t.children($i(e))).then(n=>{!Ee(n)&&!D(t.children)&&(n=t.children),Ci(n,t)}));const r={redirect:n=>it(e,n),component:n=>{const s=document.createElement(n);return this.__createdByRouter.set(s,!0),s}};return o.then(()=>{if(this.__isLatestRender(e))return le(t.action,[e,r],t)}).then(n=>{if(Ee(n)&&(n instanceof HTMLElement||n.redirect||n===V))return n;if(T(t.redirect))return r.redirect(t.redirect);if(t.bundle)return Qt(t.bundle).then(()=>{},()=>{throw new Error(x(`Bundle not found: ${t.bundle}. Check if the file name is correct`))})}).then(n=>{if(Ee(n))return n;if(T(t.component))return r.component(t.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,t=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),t||this.__onNavigationEvent(),this.ready}render(e,t){const o=++this.__lastStartedRenderId,r=Object.assign({search:"",hash:""},T(e)?{pathname:e}:e,{__renderId:o});return this.ready=this.resolve(r).then(n=>this.__fullyResolveChain(n)).then(n=>{if(this.__isLatestRender(n)){const s=this.__previousContext;if(n===s)return this.__updateBrowserHistory(s,!0),this.location;if(this.location=A(n),t&&this.__updateBrowserHistory(n,o===1),J("location-changed",{router:this,location:this.location}),n.__skipAttach)return this.__copyUnchangedElements(n,s),this.__previousContext=n,this.location;this.__addAppearingContent(n,s);const c=this.__animateIfNeeded(n);return this.__runOnAfterEnterCallbacks(n),this.__runOnAfterLeaveCallbacks(n,s),c.then(()=>{if(this.__isLatestRender(n))return this.__removeDisappearingContent(),this.__previousContext=n,this.location})}}).catch(n=>{if(o===this.__lastStartedRenderId)throw t&&this.__updateBrowserHistory(r),se(this.__outlet&&this.__outlet.children),this.location=A(Object.assign(r,{resolver:this})),J("error",Object.assign({router:this,error:n},r)),n}),this.ready}__fullyResolveChain(e,t=e){return this.__findComponentContextAfterAllRedirects(t).then(o=>{const n=o!==t?o:e,c=ce(Lt(o.chain),o.resolver)===o.pathname,a=(l,d=l.route,h)=>l.next(void 0,d,h).then(u=>u===null||u===V?c?l:d.parent!==null?a(l,d.parent,u):u:u);return a(o).then(l=>{if(l===null||l===V)throw St(n);return l&&l!==V&&l!==o?this.__fullyResolveChain(n,l):this.__amendWithOnBeforeCallbacks(o)})})}__findComponentContextAfterAllRedirects(e){const t=e.result;return t instanceof HTMLElement?(Ai(e,t),Promise.resolve(e)):t.redirect?this.__redirect(t.redirect,e.__redirectCount,e.__renderId).then(o=>this.__findComponentContextAfterAllRedirects(o)):t instanceof Error?Promise.reject(t):Promise.reject(new Error(x(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${Xt(t)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(t=>t===this.__previousContext||t===e?t:this.__fullyResolveChain(t))}__runOnBeforeCallbacks(e){const t=this.__previousContext||{},o=t.chain||[],r=e.chain;let n=Promise.resolve();const s=()=>({cancel:!0}),c=a=>it(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,o.length){for(let a=0;a<Math.min(o.length,r.length)&&!(o[a].route!==r[a].route||o[a].path!==r[a].path&&o[a].element!==r[a].element||!this.__isReusableElement(o[a].element,r[a].element));a=++e.__divergedChainIndex);if(e.__skipAttach=r.length===o.length&&e.__divergedChainIndex==r.length&&this.__isReusableElement(e.result,t.result),e.__skipAttach){for(let a=r.length-1;a>=0;a--)n=this.__runOnBeforeLeaveCallbacks(n,e,{prevent:s},o[a]);for(let a=0;a<r.length;a++)n=this.__runOnBeforeEnterCallbacks(n,e,{prevent:s,redirect:c},r[a]),o[a].element.location=A(e,o[a].route)}else for(let a=o.length-1;a>=e.__divergedChainIndex;a--)n=this.__runOnBeforeLeaveCallbacks(n,e,{prevent:s},o[a])}if(!e.__skipAttach)for(let a=0;a<r.length;a++)a<e.__divergedChainIndex?a<o.length&&o[a].element&&(o[a].element.location=A(e,o[a].route)):(n=this.__runOnBeforeEnterCallbacks(n,e,{prevent:s,redirect:c},r[a]),r[a].element&&(r[a].element.location=A(e,r[a].route)));return n.then(a=>{if(a){if(a.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(a.redirect)return this.__redirect(a.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,t,o,r){const n=A(t);return e.then(s=>{if(this.__isLatestRender(t))return ot("onBeforeLeave",[n,o,this],r.element)(s)}).then(s=>{if(!(s||{}).redirect)return s})}__runOnBeforeEnterCallbacks(e,t,o,r){const n=A(t,r.route);return e.then(s=>{if(this.__isLatestRender(t))return ot("onBeforeEnter",[n,o,this],r.element)(s)})}__isReusableElement(e,t){return e&&t?this.__createdByRouter.get(e)&&this.__createdByRouter.get(t)?e.localName===t.localName:e===t:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,t,o){if(t>Si)throw new Error(x(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(t||0)+1,__renderId:o})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(x(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:t="",hash:o=""},r){if(window.location.pathname!==e||window.location.search!==t||window.location.hash!==o){const n=r?"replaceState":"pushState";window.history[n](null,document.title,e+t+o),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,t){let o=this.__outlet;for(let r=0;r<e.__divergedChainIndex;r++){const n=t&&t.chain[r].element;if(n)if(n.parentNode===o)e.chain[r].element=n,o=n;else break}return o}__addAppearingContent(e,t){this.__ensureOutlet(),this.__removeAppearingContent();const o=this.__copyUnchangedElements(e,t);this.__appearingContent=[],this.__disappearingContent=Array.from(o.children).filter(n=>this.__addedByRouter.get(n)&&n!==e.result);let r=o;for(let n=e.__divergedChainIndex;n<e.chain.length;n++){const s=e.chain[n].element;s&&(r.appendChild(s),this.__addedByRouter.set(s,!0),r===o&&this.__appearingContent.push(s),r=s)}}__removeDisappearingContent(){this.__disappearingContent&&se(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(se(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,t){if(t)for(let o=t.chain.length-1;o>=e.__divergedChainIndex&&this.__isLatestRender(e);o--){const r=t.chain[o].element;if(r)try{const n=A(e);le(r.onAfterLeave,[n,{},t.resolver],r)}finally{this.__disappearingContent.indexOf(r)>-1&&se(r.children)}}}__runOnAfterEnterCallbacks(e){for(let t=e.__divergedChainIndex;t<e.chain.length&&this.__isLatestRender(e);t++){const o=e.chain[t].element||{},r=A(e,e.chain[t].route);le(o.onAfterEnter,[r,{},e.resolver],o)}}__animateIfNeeded(e){const t=(this.__disappearingContent||[])[0],o=(this.__appearingContent||[])[0],r=[],n=e.chain;let s;for(let c=n.length;c>0;c--)if(n[c-1].route.animate){s=n[c-1].route.animate;break}if(t&&o&&s){const c=me(s)&&s.leave||"leaving",a=me(s)&&s.enter||"entering";r.push(tt(t,c)),r.push(tt(o,a))}return Promise.all(r).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:t,search:o,hash:r}=e?e.detail:window.location;T(this.__normalizePathname(t))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:t,search:o,hash:r},!0))}static setTriggers(...e){wi(e)}urlForName(e,t){return this.__urlForName||(this.__urlForName=yi(this)),ce(this.__urlForName(e,t),this)}urlForPath(e,t){return ce(L.pathToRegexp.compile(e)(t),this)}static go(e){const{pathname:t,search:o,hash:r}=T(e)?this.__createUrl(e,"http://a"):e;return J("go",{pathname:t,search:o,hash:r})}}const Ti=/\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,de=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function xi(){function i(){return!0}return Nt(i)}function Ri(){try{return ki()?!0:Ii()?de?!Li():!xi():!1}catch{return!1}}function ki(){return localStorage.getItem("vaadin.developmentmode.force")}function Ii(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function Li(){return!!(de&&Object.keys(de).map(e=>de[e]).filter(e=>e.productionMode).length>0)}function Nt(i,e){if(typeof i!="function")return;const t=Ti.exec(i.toString());if(t)try{i=new Function(t[1])}catch(o){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",o)}return i(e)}window.Vaadin=window.Vaadin||{};const nt=function(i,e){if(window.Vaadin.developmentMode)return Nt(i,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=Ri());function Ni(){}const Oi=function(){if(typeof nt=="function")return nt(Ni)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});Oi();L.NavigationTrigger={POPSTATE:ii,CLICK:ei};var Se,y;(function(i){i.CONNECTED="connected",i.LOADING="loading",i.RECONNECTING="reconnecting",i.CONNECTION_LOST="connection-lost"})(y||(y={}));class Di{constructor(e){this.stateChangeListeners=new Set,this.loadingCount=0,this.connectionState=e,this.serviceWorkerMessageListener=this.serviceWorkerMessageListener.bind(this),navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",this.serviceWorkerMessageListener),navigator.serviceWorker.ready.then(t=>{var o;(o=t==null?void 0:t.active)===null||o===void 0||o.postMessage({method:"Vaadin.ServiceWorker.isConnectionLost",id:"Vaadin.ServiceWorker.isConnectionLost"})}))}addStateChangeListener(e){this.stateChangeListeners.add(e)}removeStateChangeListener(e){this.stateChangeListeners.delete(e)}loadingStarted(){this.state=y.LOADING,this.loadingCount+=1}loadingFinished(){this.decreaseLoadingCount(y.CONNECTED)}loadingFailed(){this.decreaseLoadingCount(y.CONNECTION_LOST)}decreaseLoadingCount(e){this.loadingCount>0&&(this.loadingCount-=1,this.loadingCount===0&&(this.state=e))}get state(){return this.connectionState}set state(e){if(e!==this.connectionState){const t=this.connectionState;this.connectionState=e,this.loadingCount=0;for(const o of this.stateChangeListeners)o(t,this.connectionState)}}get online(){return this.connectionState===y.CONNECTED||this.connectionState===y.LOADING}get offline(){return!this.online}serviceWorkerMessageListener(e){typeof e.data=="object"&&e.data.id==="Vaadin.ServiceWorker.isConnectionLost"&&(e.data.result===!0&&(this.state=y.CONNECTION_LOST),navigator.serviceWorker.removeEventListener("message",this.serviceWorkerMessageListener))}}const ae=window;!((Se=ae.Vaadin)===null||Se===void 0)&&Se.connectionState||(ae.Vaadin=ae.Vaadin||{},ae.Vaadin.connectionState=new Di(navigator.onLine?y.CONNECTED:y.CONNECTION_LOST));function S(i,e,t,o){var r=arguments.length,n=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(i,e,t,o);else for(var c=i.length-1;c>=0;c--)(s=i[c])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const he=window,Me=he.ShadowRoot&&(he.ShadyCSS===void 0||he.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ue=Symbol(),rt=new WeakMap;let Ot=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==Ue)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Me&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=rt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&rt.set(t,e))}return e}toString(){return this.cssText}};const Pi=i=>new Ot(typeof i=="string"?i:i+"",void 0,Ue),$=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((o,r,n)=>o+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new Ot(t,i,Ue)},Mi=(i,e)=>{Me?i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const o=document.createElement("style"),r=he.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=t.cssText,i.appendChild(o)})},st=Me?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return Pi(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var $e;const _e=window,at=_e.trustedTypes,Ui=at?at.emptyScript:"",lt=_e.reactiveElementPolyfillSupport,Oe={toAttribute(i,e){switch(e){case Boolean:i=i?Ui:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Dt=(i,e)=>e!==i&&(e==e||i==i),Ae={attribute:!0,type:String,converter:Oe,reflect:!1,hasChanged:Dt};let U=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,o)=>{const r=this._$Ep(o,t);r!==void 0&&(this._$Ev.set(r,o),e.push(r))}),e}static createProperty(e,t=Ae){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const o=typeof e=="symbol"?Symbol():"__"+e,r=this.getPropertyDescriptor(e,o,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,o){return{get(){return this[t]},set(r){const n=this[e];this[t]=r,this.requestUpdate(e,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Ae}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,o=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of o)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const r of o)t.unshift(st(r))}else e!==void 0&&t.push(st(e));return t}static _$Ep(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,o;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((o=e.hostConnected)===null||o===void 0||o.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Mi(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var o;return(o=t.hostConnected)===null||o===void 0?void 0:o.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var o;return(o=t.hostDisconnected)===null||o===void 0?void 0:o.call(t)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$EO(e,t,o=Ae){var r;const n=this.constructor._$Ep(e,o);if(n!==void 0&&o.reflect===!0){const s=(((r=o.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?o.converter:Oe).toAttribute(t,o.type);this._$El=e,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(e,t){var o;const r=this.constructor,n=r._$Ev.get(e);if(n!==void 0&&this._$El!==n){const s=r.getPropertyOptions(n),c=typeof s.converter=="function"?{fromAttribute:s.converter}:((o=s.converter)===null||o===void 0?void 0:o.fromAttribute)!==void 0?s.converter:Oe;this._$El=n,this[n]=c.fromAttribute(t,s.type),this._$El=null}}requestUpdate(e,t,o){let r=!0;e!==void 0&&(((o=o||this.constructor.getPropertyOptions(e)).hasChanged||Dt)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),o.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,o))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((r,n)=>this[n]=r),this._$Ei=void 0);let t=!1;const o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),(e=this._$ES)===null||e===void 0||e.forEach(r=>{var n;return(n=r.hostUpdate)===null||n===void 0?void 0:n.call(r)}),this.update(o)):this._$Ek()}catch(r){throw t=!1,this._$Ek(),r}t&&this._$AE(o)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(o=>{var r;return(r=o.hostUpdated)===null||r===void 0?void 0:r.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,o)=>this._$EO(o,this[o],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};U.finalized=!0,U.elementProperties=new Map,U.elementStyles=[],U.shadowRootOptions={mode:"open"},lt==null||lt({ReactiveElement:U}),(($e=_e.reactiveElementVersions)!==null&&$e!==void 0?$e:_e.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ce;const ye=window,B=ye.trustedTypes,ct=B?B.createPolicy("lit-html",{createHTML:i=>i}):void 0,De="$lit$",I=`lit$${(Math.random()+"").slice(9)}$`,Pt="?"+I,Vi=`<${Pt}>`,j=document,Z=()=>j.createComment(""),ee=i=>i===null||typeof i!="object"&&typeof i!="function",Mt=Array.isArray,Fi=i=>Mt(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",Te=`[ 	
\f\r]`,K=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ht=/>/g,O=RegExp(`>|${Te}(?:([^\\s"'>=/]+)(${Te}*=${Te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ut=/'/g,pt=/"/g,Ut=/^(?:script|style|textarea|title)$/i,Vt=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),E=Vt(1),yo=Vt(2),P=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),ft=new WeakMap,F=j.createTreeWalker(j,129,null,!1),Hi=(i,e)=>{const t=i.length-1,o=[];let r,n=e===2?"<svg>":"",s=K;for(let a=0;a<t;a++){const l=i[a];let d,h,u=-1,p=0;for(;p<l.length&&(s.lastIndex=p,h=s.exec(l),h!==null);)p=s.lastIndex,s===K?h[1]==="!--"?s=dt:h[1]!==void 0?s=ht:h[2]!==void 0?(Ut.test(h[2])&&(r=RegExp("</"+h[2],"g")),s=O):h[3]!==void 0&&(s=O):s===O?h[0]===">"?(s=r??K,u=-1):h[1]===void 0?u=-2:(u=s.lastIndex-h[2].length,d=h[1],s=h[3]===void 0?O:h[3]==='"'?pt:ut):s===pt||s===ut?s=O:s===dt||s===ht?s=K:(s=O,r=void 0);const N=s===O&&i[a+1].startsWith("/>")?" ":"";n+=s===K?l+Vi:u>=0?(o.push(d),l.slice(0,u)+De+l.slice(u)+I+N):l+I+(u===-2?(o.push(void 0),a):N)}const c=n+(i[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ct!==void 0?ct.createHTML(c):c,o]};class te{constructor({strings:e,_$litType$:t},o){let r;this.parts=[];let n=0,s=0;const c=e.length-1,a=this.parts,[l,d]=Hi(e,t);if(this.el=te.createElement(l,o),F.currentNode=this.el.content,t===2){const h=this.el.content,u=h.firstChild;u.remove(),h.append(...u.childNodes)}for(;(r=F.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes()){const h=[];for(const u of r.getAttributeNames())if(u.endsWith(De)||u.startsWith(I)){const p=d[s++];if(h.push(u),p!==void 0){const N=r.getAttribute(p.toLowerCase()+De).split(I),M=/([.?@])?(.*)/.exec(p);a.push({type:1,index:n,name:M[2],strings:N,ctor:M[1]==="."?ji:M[1]==="?"?Gi:M[1]==="@"?Wi:we})}else a.push({type:6,index:n})}for(const u of h)r.removeAttribute(u)}if(Ut.test(r.tagName)){const h=r.textContent.split(I),u=h.length-1;if(u>0){r.textContent=B?B.emptyScript:"";for(let p=0;p<u;p++)r.append(h[p],Z()),F.nextNode(),a.push({type:2,index:++n});r.append(h[u],Z())}}}else if(r.nodeType===8)if(r.data===Pt)a.push({type:2,index:n});else{let h=-1;for(;(h=r.data.indexOf(I,h+1))!==-1;)a.push({type:7,index:n}),h+=I.length-1}n++}}static createElement(e,t){const o=j.createElement("template");return o.innerHTML=e,o}}function z(i,e,t=i,o){var r,n,s,c;if(e===P)return e;let a=o!==void 0?(r=t._$Co)===null||r===void 0?void 0:r[o]:t._$Cl;const l=ee(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((n=a==null?void 0:a._$AO)===null||n===void 0||n.call(a,!1),l===void 0?a=void 0:(a=new l(i),a._$AT(i,t,o)),o!==void 0?((s=(c=t)._$Co)!==null&&s!==void 0?s:c._$Co=[])[o]=a:t._$Cl=a),a!==void 0&&(e=z(i,a._$AS(i,e.values),a,o)),e}class Bi{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:o},parts:r}=this._$AD,n=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:j).importNode(o,!0);F.currentNode=n;let s=F.nextNode(),c=0,a=0,l=r[0];for(;l!==void 0;){if(c===l.index){let d;l.type===2?d=new ne(s,s.nextSibling,this,e):l.type===1?d=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(d=new qi(s,this,e)),this._$AV.push(d),l=r[++a]}c!==(l==null?void 0:l.index)&&(s=F.nextNode(),c++)}return n}v(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class ne{constructor(e,t,o,r){var n;this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=r,this._$Cp=(n=r==null?void 0:r.isConnected)===null||n===void 0||n}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=z(this,e,t),ee(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==P&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Fi(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==_&&ee(this._$AH)?this._$AA.nextSibling.data=e:this.$(j.createTextNode(e)),this._$AH=e}g(e){var t;const{values:o,_$litType$:r}=e,n=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=te.createElement(r.h,this.options)),r);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===n)this._$AH.v(o);else{const s=new Bi(n,this),c=s.u(this.options);s.v(o),this.$(c),this._$AH=s}}_$AC(e){let t=ft.get(e.strings);return t===void 0&&ft.set(e.strings,t=new te(e)),t}T(e){Mt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,r=0;for(const n of e)r===t.length?t.push(o=new ne(this.k(Z()),this.k(Z()),this,this.options)):o=t[r],o._$AI(n),r++;r<t.length&&(this._$AR(o&&o._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)===null||o===void 0||o.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class we{constructor(e,t,o,r,n){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=_}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,o,r){const n=this.strings;let s=!1;if(n===void 0)e=z(this,e,t,0),s=!ee(e)||e!==this._$AH&&e!==P,s&&(this._$AH=e);else{const c=e;let a,l;for(e=n[0],a=0;a<n.length-1;a++)l=z(this,c[o+a],t,a),l===P&&(l=this._$AH[a]),s||(s=!ee(l)||l!==this._$AH[a]),l===_?e=_:e!==_&&(e+=(l??"")+n[a+1]),this._$AH[a]=l}s&&!r&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ji extends we{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}}const zi=B?B.emptyScript:"";class Gi extends we{constructor(){super(...arguments),this.type=4}j(e){e&&e!==_?this.element.setAttribute(this.name,zi):this.element.removeAttribute(this.name)}}class Wi extends we{constructor(e,t,o,r,n){super(e,t,o,r,n),this.type=5}_$AI(e,t=this){var o;if((e=(o=z(this,e,t,0))!==null&&o!==void 0?o:_)===P)return;const r=this._$AH,n=e===_&&r!==_||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==_&&(r===_||n);n&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,o;typeof this._$AH=="function"?this._$AH.call((o=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&o!==void 0?o:this.element,e):this._$AH.handleEvent(e)}}class qi{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){z(this,e)}}const vt=ye.litHtmlPolyfillSupport;vt==null||vt(te,ne),((Ce=ye.litHtmlVersions)!==null&&Ce!==void 0?Ce:ye.litHtmlVersions=[]).push("2.7.3");const Ki=(i,e,t)=>{var o,r;const n=(o=t==null?void 0:t.renderBefore)!==null&&o!==void 0?o:e;let s=n._$litPart$;if(s===void 0){const c=(r=t==null?void 0:t.renderBefore)!==null&&r!==void 0?r:null;n._$litPart$=s=new ne(e.insertBefore(Z(),c),c,void 0,t??{})}return s._$AI(i),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var xe,Re;class H extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const o=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=o.firstChild),o}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ki(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return P}}H.finalized=!0,H._$litElement$=!0,(xe=globalThis.litElementHydrateSupport)===null||xe===void 0||xe.call(globalThis,{LitElement:H});const gt=globalThis.litElementPolyfillSupport;gt==null||gt({LitElement:H});((Re=globalThis.litElementVersions)!==null&&Re!==void 0?Re:globalThis.litElementVersions=[]).push("3.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yi=(i,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,i)}};function m(i){return(e,t)=>t!==void 0?((o,r,n)=>{r.constructor.createProperty(n,o)})(i,e,t):Yi(i,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function q(i){return m({...i,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ji=({finisher:i,descriptor:e})=>(t,o)=>{var r;if(o===void 0){const n=(r=t.originalKey)!==null&&r!==void 0?r:t.key,s=e!=null?{kind:"method",placement:"prototype",key:n,descriptor:e(t.key)}:{...t,key:n};return i!=null&&(s.finisher=function(c){i(c,n)}),s}{const n=t.constructor;e!==void 0&&Object.defineProperty(t,o,e(o)),i==null||i(n,o)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Xi(i,e){return Ji({descriptor:t=>{const o={get(){var r,n;return(n=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(i))!==null&&n!==void 0?n:null},enumerable:!0,configurable:!0};if(e){const r=typeof t=="symbol"?Symbol():"__"+t;o.get=function(){var n,s;return this[r]===void 0&&(this[r]=(s=(n=this.renderRoot)===null||n===void 0?void 0:n.querySelector(i))!==null&&s!==void 0?s:null),this[r]}}return o}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ke;((ke=window.HTMLSlotElement)===null||ke===void 0?void 0:ke.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Zi=i=>(...e)=>({_$litDirective$:i,values:e});class eo{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ft=Zi(class extends eo{constructor(i){var e;if(super(i),i.type!==Qi.ATTRIBUTE||i.name!=="class"||((e=i.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(e=>i[e]).join(" ")+" "}update(i,[e]){var t,o;if(this.it===void 0){this.it=new Set,i.strings!==void 0&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in e)e[n]&&!(!((t=this.nt)===null||t===void 0)&&t.has(n))&&this.it.add(n);return this.render(e)}const r=i.element.classList;this.it.forEach(n=>{n in e||(r.remove(n),this.it.delete(n))});for(const n in e){const s=!!e[n];s===this.it.has(n)||!((o=this.nt)===null||o===void 0)&&o.has(n)||(s?(r.add(n),this.it.add(n)):(r.remove(n),this.it.delete(n)))}return P}}),Ie="css-loading-indicator";var C;(function(i){i.IDLE="",i.FIRST="first",i.SECOND="second",i.THIRD="third"})(C||(C={}));class w extends H{constructor(){super(),this.firstDelay=300,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState=C.IDLE,this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=y.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>{this.expanded=!1},this.expandedDuration)}}static create(){var e,t;const o=window;return!((e=o.Vaadin)===null||e===void 0)&&e.connectionIndicator||(o.Vaadin=o.Vaadin||{},o.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(o.Vaadin.connectionIndicator)),(t=o.Vaadin)===null||t===void 0?void 0:t.connectionIndicator}render(){return E`
      <div class="v-loading-indicator ${this.loadingBarState}" style=${this.getLoadingBarStyle()}></div>

      <div
        class="v-status-message ${Ft({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var e;super.connectedCallback();const t=window;!((e=t.Vaadin)===null||e===void 0)&&e.connectionState&&(this.connectionStateStore=t.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(e){e!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=e,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var e;const t=(e=this.connectionStateStore)===null||e===void 0?void 0:e.state;return this.offline=t===y.CONNECTION_LOST,this.reconnecting=t===y.RECONNECTING,this.updateLoading(t===y.LOADING),this.loading?!1:t!==this.lastMessageState?(this.lastMessageState=t,!0):!1}updateLoading(e){this.loading=e,this.loadingBarState=C.IDLE,this.firstTimeout=this.timeoutFor(this.firstTimeout,e,()=>{this.loadingBarState=C.FIRST},this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,e,()=>{this.loadingBarState=C.SECOND},this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,e,()=>{this.loadingBarState=C.THIRD},this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById(Ie)){const e=document.createElement("style");e.id=Ie,e.textContent=this.getDefaultStyle(),document.head.appendChild(e)}}else{const e=document.getElementById(Ie);e&&document.head.removeChild(e)}}getDefaultStyle(){return`
      @keyframes v-progress-start {
        0% {
          width: 0%;
        }
        100% {
          width: 50%;
        }
      }
      @keyframes v-progress-delay {
        0% {
          width: 50%;
        }
        100% {
          width: 90%;
        }
      }
      @keyframes v-progress-wait {
        0% {
          width: 90%;
          height: 4px;
        }
        3% {
          width: 91%;
          height: 7px;
        }
        100% {
          width: 96%;
          height: 7px;
        }
      }
      @keyframes v-progress-wait-pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.1;
        }
        100% {
          opacity: 1;
        }
      }
      .v-loading-indicator,
      .v-status-message {
        position: fixed;
        z-index: 251;
        left: 0;
        right: auto;
        top: 0;
        background-color: var(--lumo-primary-color, var(--material-primary-color, blue));
        transition: none;
      }
      .v-loading-indicator {
        width: 50%;
        height: 4px;
        opacity: 1;
        pointer-events: none;
        animation: v-progress-start 1000ms 200ms both;
      }
      .v-loading-indicator[style*='none'] {
        display: block !important;
        width: 100%;
        opacity: 0;
        animation: none;
        transition: opacity 500ms 300ms, width 300ms;
      }
      .v-loading-indicator.second {
        width: 90%;
        animation: v-progress-delay 3.8s forwards;
      }
      .v-loading-indicator.third {
        width: 96%;
        animation: v-progress-wait 5s forwards, v-progress-wait-pulse 1s 4s infinite backwards;
      }

      vaadin-connection-indicator[offline] .v-loading-indicator,
      vaadin-connection-indicator[reconnecting] .v-loading-indicator {
        display: none;
      }

      .v-status-message {
        opacity: 0;
        width: 100%;
        max-height: var(--status-height-collapsed, 8px);
        overflow: hidden;
        background-color: var(--status-bg-color-online, var(--lumo-primary-color, var(--material-primary-color, blue)));
        color: var(
          --status-text-color-online,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        transition: all 0.5s;
        padding: 0 0.5em;
      }

      vaadin-connection-indicator[offline] .v-status-message,
      vaadin-connection-indicator[reconnecting] .v-status-message {
        opacity: 1;
        background-color: var(--status-bg-color-offline, var(--lumo-shade, #333));
        color: var(
          --status-text-color-offline,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        background-image: repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
      }

      vaadin-connection-indicator[reconnecting] .v-status-message {
        animation: show-reconnecting-status 2s;
      }

      vaadin-connection-indicator[offline] .v-status-message:hover,
      vaadin-connection-indicator[reconnecting] .v-status-message:hover,
      vaadin-connection-indicator[expanded] .v-status-message {
        max-height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[expanded] .v-status-message {
        opacity: 1;
      }

      .v-status-message span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[reconnecting] .v-status-message span::before {
        content: '';
        width: 1em;
        height: 1em;
        border-top: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-left: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: v-spin 0.4s linear infinite;
        margin: 0 0.5em;
      }

      @keyframes v-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `}getLoadingBarStyle(){switch(this.loadingBarState){case C.IDLE:return"display: none";case C.FIRST:case C.SECOND:case C.THIRD:return"display: block";default:return""}}timeoutFor(e,t,o,r){return e!==0&&window.clearTimeout(e),t?window.setTimeout(o,r):0}static get instance(){return w.create()}}S([m({type:Number})],w.prototype,"firstDelay",void 0);S([m({type:Number})],w.prototype,"secondDelay",void 0);S([m({type:Number})],w.prototype,"thirdDelay",void 0);S([m({type:Number})],w.prototype,"expandedDuration",void 0);S([m({type:String})],w.prototype,"onlineText",void 0);S([m({type:String})],w.prototype,"offlineText",void 0);S([m({type:String})],w.prototype,"reconnectingText",void 0);S([m({type:Boolean,reflect:!0})],w.prototype,"offline",void 0);S([m({type:Boolean,reflect:!0})],w.prototype,"reconnecting",void 0);S([m({type:Boolean,reflect:!0})],w.prototype,"expanded",void 0);S([m({type:Boolean,reflect:!0})],w.prototype,"loading",void 0);S([m({type:String})],w.prototype,"loadingBarState",void 0);S([m({type:Boolean})],w.prototype,"applyDefaultTheme",null);customElements.get("vaadin-connection-indicator")===void 0&&customElements.define("vaadin-connection-indicator",w);w.instance;const ie=window;ie.Vaadin=ie.Vaadin||{};ie.Vaadin.registrations=ie.Vaadin.registrations||[];ie.Vaadin.registrations.push({is:"@vaadin/common-frontend",version:"0.0.17"});class mt extends Error{}const Y=window.document.body,g=window;class to{constructor(e){this.response=void 0,this.pathname="",this.isActive=!1,this.baseRegex=/^\//,Y.$=Y.$||[],this.config=e||{},g.Vaadin=g.Vaadin||{},g.Vaadin.Flow=g.Vaadin.Flow||{},g.Vaadin.Flow.clients={TypeScript:{isActive:()=>this.isActive}};const t=document.head.querySelector("base");this.baseRegex=new RegExp(`^${(document.baseURI||t&&t.href||"/").replace(/^https?:\/\/[^/]+/i,"")}`),this.appShellTitle=document.title,this.addConnectionIndicator()}get serverSideRoutes(){return[{path:"(.*)",action:this.action}]}loadingStarted(){this.isActive=!0,g.Vaadin.connectionState.loadingStarted()}loadingFinished(){this.isActive=!1,g.Vaadin.connectionState.loadingFinished()}get action(){return async e=>{if(this.pathname=e.pathname,g.Vaadin.connectionState.online)try{await this.flowInit()}catch(t){if(t instanceof mt)return g.Vaadin.connectionState.state=y.CONNECTION_LOST,this.offlineStubAction();throw t}else return this.offlineStubAction();return this.container.onBeforeEnter=(t,o)=>this.flowNavigate(t,o),this.container.onBeforeLeave=(t,o)=>this.flowLeave(t,o),this.container}}async flowLeave(e,t){const{connectionState:o}=g.Vaadin;return this.pathname===e.pathname||!this.isFlowClientLoaded()||o.offline?Promise.resolve({}):new Promise(r=>{this.loadingStarted(),this.container.serverConnected=n=>{r(t&&n?t.prevent():{}),this.loadingFinished()},Y.$server.leaveNavigation(this.getFlowRoutePath(e),this.getFlowRouteQuery(e))})}async flowNavigate(e,t){return this.response?new Promise(o=>{this.loadingStarted(),this.container.serverConnected=(r,n)=>{t&&r?o(t.prevent()):t&&t.redirect&&n?o(t.redirect(n.pathname)):(this.container.style.display="",o(this.container)),this.loadingFinished()},Y.$server.connectClient(this.container.localName,this.container.id,this.getFlowRoutePath(e),this.getFlowRouteQuery(e),this.appShellTitle,history.state)}):Promise.resolve(this.container)}getFlowRoutePath(e){return decodeURIComponent(e.pathname).replace(this.baseRegex,"")}getFlowRouteQuery(e){return e.search&&e.search.substring(1)||""}async flowInit(e=!1){if(!this.isFlowClientLoaded()){this.loadingStarted(),this.response=await this.flowInitUi(e),this.response.appConfig.clientRouting=!e;const{pushScript:t,appConfig:o}=this.response;typeof t=="string"&&await this.loadScript(t);const{appId:r}=o;await(await pe(()=>import("./FlowBootstrap-feff2646.js"),[],import.meta.url)).init(this.response),typeof this.config.imports=="function"&&(this.injectAppIdScript(r),await this.config.imports());const s=await pe(()=>import("./FlowClient-e0ae8105.js"),[],import.meta.url);if(await this.flowInitClient(s),!e){const c=`flow-container-${r.toLowerCase()}`;this.container=document.createElement(c),Y.$[r]=this.container,this.container.id=r}this.loadingFinished()}return this.container&&!this.container.isConnected&&(this.container.style.display="none",document.body.appendChild(this.container)),this.response}async loadScript(e){return new Promise((t,o)=>{const r=document.createElement("script");r.onload=()=>t(),r.onerror=o,r.src=e,document.body.appendChild(r)})}injectAppIdScript(e){const t=e.substring(0,e.lastIndexOf("-")),o=document.createElement("script");o.type="module",o.setAttribute("data-app-id",t),document.body.append(o)}async flowInitClient(e){return e.init(),new Promise(t=>{const o=setInterval(()=>{Object.keys(g.Vaadin.Flow.clients).filter(n=>n!=="TypeScript").reduce((n,s)=>n||g.Vaadin.Flow.clients[s].isActive(),!1)||(clearInterval(o),t())},5)})}async flowInitUi(e){const t=g.Vaadin&&g.Vaadin.TypeScript&&g.Vaadin.TypeScript.initial;return t?(g.Vaadin.TypeScript.initial=void 0,Promise.resolve(t)):new Promise((o,r)=>{const s=new XMLHttpRequest,c=e?"&serverSideRouting":"",a=`?v-r=init&location=${encodeURIComponent(this.getFlowRoutePath(location))}&query=${encodeURIComponent(this.getFlowRouteQuery(location))}${c}`;s.open("GET",a),s.onerror=()=>r(new mt(`Invalid server response when initializing Flow UI.
        ${s.status}
        ${s.responseText}`)),s.onload=()=>{const l=s.getResponseHeader("content-type");l&&l.indexOf("application/json")!==-1?o(JSON.parse(s.responseText)):s.onerror()},s.send()})}addConnectionIndicator(){w.create(),g.addEventListener("online",()=>{if(!this.isFlowClientLoaded()){g.Vaadin.connectionState.state=y.RECONNECTING;const e=new XMLHttpRequest;e.open("HEAD","sw.js"),e.onload=()=>{g.Vaadin.connectionState.state=y.CONNECTED},e.onerror=()=>{g.Vaadin.connectionState.state=y.CONNECTION_LOST},setTimeout(()=>e.send(),50)}}),g.addEventListener("offline",()=>{this.isFlowClientLoaded()||(g.Vaadin.connectionState.state=y.CONNECTION_LOST)})}async offlineStubAction(){const e=document.createElement("iframe"),t="./offline-stub.html";e.setAttribute("src",t),e.setAttribute("style","width: 100%; height: 100%; border: 0"),this.response=void 0;let o;const r=()=>{o!==void 0&&(g.Vaadin.connectionState.removeStateChangeListener(o),o=void 0)};return e.onBeforeEnter=(n,s,c)=>{o=()=>{g.Vaadin.connectionState.online&&(r(),c.render(n,!1))},g.Vaadin.connectionState.addStateChangeListener(o)},e.onBeforeLeave=(n,s,c)=>{r()},e}isFlowClientLoaded(){return this.response!==void 0}}const{serverSideRoutes:io}=new to({imports:()=>pe(()=>import("./generated-flow-imports-ce6ee652.js"),["./generated-flow-imports-ce6ee652.js","./custom-element-73470d87.js"],import.meta.url)}),oo=[...io],no=new L(document.querySelector("#outlet"));no.setRoutes(oo);var ro=function(){var i=document.getSelection();if(!i.rangeCount)return function(){};for(var e=document.activeElement,t=[],o=0;o<i.rangeCount;o++)t.push(i.getRangeAt(o));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return i.removeAllRanges(),function(){i.type==="Caret"&&i.removeAllRanges(),i.rangeCount||t.forEach(function(r){i.addRange(r)}),e&&e.focus()}},_t={"text/plain":"Text","text/html":"Url",default:"Text"},so="Copy to clipboard: #{key}, Enter";function ao(i){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return i.replace(/#{\s*key\s*}/g,e)}function lo(i,e){var t,o,r,n,s,c,a=!1;e||(e={}),t=e.debug||!1;try{r=ro(),n=document.createRange(),s=document.getSelection(),c=document.createElement("span"),c.textContent=i,c.style.all="unset",c.style.position="fixed",c.style.top=0,c.style.clip="rect(0, 0, 0, 0)",c.style.whiteSpace="pre",c.style.webkitUserSelect="text",c.style.MozUserSelect="text",c.style.msUserSelect="text",c.style.userSelect="text",c.addEventListener("copy",function(d){if(d.stopPropagation(),e.format)if(d.preventDefault(),typeof d.clipboardData>"u"){t&&console.warn("unable to use e.clipboardData"),t&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var h=_t[e.format]||_t.default;window.clipboardData.setData(h,i)}else d.clipboardData.clearData(),d.clipboardData.setData(e.format,i);e.onCopy&&(d.preventDefault(),e.onCopy(d.clipboardData))}),document.body.appendChild(c),n.selectNodeContents(c),s.addRange(n);var l=document.execCommand("copy");if(!l)throw new Error("copy command was unsuccessful");a=!0}catch(d){t&&console.error("unable to copy using execCommand: ",d),t&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",i),e.onCopy&&e.onCopy(window.clipboardData),a=!0}catch(h){t&&console.error("unable to copy using clipboardData: ",h),t&&console.error("falling back to prompt"),o=ao("message"in e?e.message:so),window.prompt(o,i)}}finally{s&&(typeof s.removeRange=="function"?s.removeRange(n):s.removeAllRanges()),c&&document.body.removeChild(c),r()}return a}const Ve=1e3,Fe=(i,e)=>{const t=Array.from(i.querySelectorAll(e.join(", "))),o=Array.from(i.querySelectorAll("*")).filter(r=>r.shadowRoot).flatMap(r=>Fe(r.shadowRoot,e));return[...t,...o]};let yt=!1;const oe=(i,e)=>{yt||(window.addEventListener("message",r=>{r.data==="validate-license"&&window.location.reload()},!1),yt=!0);const t=i._overlayElement;if(t){if(t.shadowRoot){const r=t.shadowRoot.querySelector("slot:not([name])");if(r&&r.assignedElements().length>0){oe(r.assignedElements()[0],e);return}}oe(t,e);return}const o=e.messageHtml?e.messageHtml:`${e.message} <p>Component: ${e.product.name} ${e.product.version}</p>`.replace(/https:([^ ]*)/g,"<a href='https:$1'>https:$1</a>");i.isConnected&&(i.outerHTML=`<no-license style="display:flex;align-items:center;text-align:center;justify-content:center;"><div>${o}</div></no-license>`)},X={},wt={},G={},Ht={},R=i=>`${i.name}_${i.version}`,bt=i=>{const{cvdlName:e,version:t}=i.constructor,o={name:e,version:t},r=i.tagName.toLowerCase();X[e]=X[e]??[],X[e].push(r);const n=G[R(o)];n&&setTimeout(()=>oe(i,n),Ve),G[R(o)]||Ht[R(o)]||wt[R(o)]||(wt[R(o)]=!0,window.Vaadin.devTools.checkLicense(o))},co=i=>{Ht[R(i)]=!0,console.debug("License check ok for",i)},Bt=i=>{const e=i.product.name;G[R(i.product)]=i,console.error("License check failed for",e);const t=X[e];(t==null?void 0:t.length)>0&&Fe(document,t).forEach(o=>{setTimeout(()=>oe(o,G[R(i.product)]),Ve)})},ho=i=>{const e=i.message,t=i.product.name;i.messageHtml=`No license found. <a target=_blank onclick="javascript:window.open(this.href);return false;" href="${e}">Go here to start a trial or retrieve your license.</a>`,G[R(i.product)]=i,console.error("No license found when checking",t);const o=X[t];(o==null?void 0:o.length)>0&&Fe(document,o).forEach(r=>{setTimeout(()=>oe(r,G[R(i.product)]),Ve)})},uo=()=>{window.Vaadin.devTools.createdCvdlElements.forEach(i=>{bt(i)}),window.Vaadin.devTools.createdCvdlElements={push:i=>{bt(i)}}};var po=Object.defineProperty,fo=Object.getOwnPropertyDescriptor,b=(i,e,t,o)=>{for(var r=o>1?void 0:o?fo(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&po(e,t,r),r};const jt=class extends Object{constructor(i){super(),this.status="unavailable",i&&(this.webSocket=new WebSocket(i),this.webSocket.onmessage=e=>this.handleMessage(e),this.webSocket.onerror=e=>this.handleError(e),this.webSocket.onclose=e=>{this.status!=="error"&&this.setStatus("unavailable"),this.webSocket=void 0}),setInterval(()=>{this.webSocket&&self.status!=="error"&&this.status!=="unavailable"&&this.webSocket.send("")},jt.HEARTBEAT_INTERVAL)}onHandshake(){}onReload(){}onConnectionError(i){}onStatusChange(i){}onMessage(i){console.error("Unknown message received from the live reload server:",i)}handleMessage(i){let e;try{e=JSON.parse(i.data)}catch(t){this.handleError(`[${t.name}: ${t.message}`);return}e.command==="hello"?(this.setStatus("active"),this.onHandshake()):e.command==="reload"?this.status==="active"&&this.onReload():e.command==="license-check-ok"?co(e.data):e.command==="license-check-failed"?Bt(e.data):e.command==="license-check-nokey"?ho(e.data):this.onMessage(e)}handleError(i){console.error(i),this.setStatus("error"),i instanceof Event&&this.webSocket?this.onConnectionError(`Error in WebSocket connection to ${this.webSocket.url}`):this.onConnectionError(i)}setActive(i){!i&&this.status==="active"?this.setStatus("inactive"):i&&this.status==="inactive"&&this.setStatus("active")}setStatus(i){this.status!==i&&(this.status=i,this.onStatusChange(i))}send(i,e){const t=JSON.stringify({command:i,data:e});this.webSocket?this.webSocket.readyState!==WebSocket.OPEN?this.webSocket.addEventListener("open",()=>this.webSocket.send(t)):this.webSocket.send(t):console.error(`Unable to send message ${i}. No websocket is available`)}setFeature(i,e){this.send("setFeature",{featureId:i,enabled:e})}sendTelemetry(i){this.send("reportTelemetry",{browserData:i})}sendLicenseCheck(i){this.send("checkLicense",i)}sendShowComponentCreateLocation(i){this.send("showComponentCreateLocation",i)}sendShowComponentAttachLocation(i){this.send("showComponentAttachLocation",i)}};let ue=jt;ue.HEARTBEAT_INTERVAL=18e4;const vo=$`
  .popup {
    width: auto;
    position: fixed;
    background-color: var(--dev-tools-background-color-active-blurred);
    color: var(--dev-tools-text-color-primary);
    padding: 0.1875rem 0.75rem 0.1875rem 1rem;
    background-clip: padding-box;
    border-radius: var(--dev-tools-border-radius);
    overflow: hidden;
    margin: 0.5rem;
    width: 30rem;
    max-width: calc(100% - 1rem);
    max-height: calc(100vh - 1rem);
    flex-shrink: 1;
    background-color: var(--dev-tools-background-color-active);
    color: var(--dev-tools-text-color);
    transition: var(--dev-tools-transition-duration);
    transform-origin: bottom right;
    display: flex;
    flex-direction: column;
    box-shadow: var(--dev-tools-box-shadow);
    outline: none;
  }
`,v=class extends H{constructor(){super(),this.expanded=!1,this.messages=[],this.notifications=[],this.frontendStatus="unavailable",this.javaStatus="unavailable",this.tabs=[{id:"log",title:"Log",render:this.renderLog,activate:this.activateLog},{id:"info",title:"Info",render:this.renderInfo},{id:"features",title:"Feature Flags",render:this.renderFeatures}],this.activeTab="log",this.serverInfo={flowVersion:"",vaadinVersion:"",javaVersion:"",osVersion:"",productName:""},this.features=[],this.unreadErrors=!1,this.componentPickActive=!1,this.nextMessageId=1,this.transitionDuration=0,window.Vaadin.Flow&&this.tabs.push({id:"code",title:"Code",render:this.renderCode})}static get styles(){return[$`
        :host {
          --dev-tools-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
            'Helvetica Neue', sans-serif;
          --dev-tools-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
            monospace;

          --dev-tools-font-size: 0.8125rem;
          --dev-tools-font-size-small: 0.75rem;

          --dev-tools-text-color: rgba(255, 255, 255, 0.8);
          --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
          --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
          --dev-tools-text-color-active: rgba(255, 255, 255, 1);

          --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
          --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
          --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

          --dev-tools-border-radius: 0.5rem;
          --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

          --dev-tools-blue-hsl: ${this.BLUE_HSL};
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: ${this.GREEN_HSL};
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: ${this.GREY_HSL};
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: ${this.YELLOW_HSL};
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: ${this.RED_HSL};
          --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

          /* Needs to be in ms, used in JavaScript as well */
          --dev-tools-transition-duration: 180ms;

          all: initial;

          direction: ltr;
          cursor: default;
          font: normal 400 var(--dev-tools-font-size) / 1.125rem var(--dev-tools-font-family);
          color: var(--dev-tools-text-color);
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;

          position: fixed;
          z-index: 20000;
          pointer-events: none;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
        }

        .dev-tools {
          pointer-events: auto;
          display: flex;
          align-items: center;
          position: fixed;
          z-index: inherit;
          right: 0.5rem;
          bottom: 0.5rem;
          min-width: 1.75rem;
          height: 1.75rem;
          max-width: 1.75rem;
          border-radius: 0.5rem;
          padding: 0.375rem;
          box-sizing: border-box;
          background-color: var(--dev-tools-background-color-inactive);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          white-space: nowrap;
          line-height: 1rem;
        }

        .dev-tools:hover,
        .dev-tools.active {
          background-color: var(--dev-tools-background-color-active);
          box-shadow: var(--dev-tools-box-shadow);
        }

        .dev-tools.active {
          max-width: calc(100% - 1rem);
        }

        .dev-tools .dev-tools-icon {
          flex: none;
          pointer-events: none;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          fill: #fff;
          transition: var(--dev-tools-transition-duration);
          margin: 0;
        }

        .dev-tools.active .dev-tools-icon {
          opacity: 0;
          position: absolute;
          transform: scale(0.5);
        }

        .dev-tools .status-blip {
          flex: none;
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          z-index: 20001;
          background: var(--dev-tools-grey-color);
          position: absolute;
          top: -1px;
          right: -1px;
        }

        .dev-tools .status-description {
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 0.25rem;
        }

        .dev-tools.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.15);
          animation: bounce 0.5s;
          animation-iteration-count: 2;
        }

        .switch {
          display: inline-flex;
          align-items: center;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .switch .slider {
          display: block;
          flex: none;
          width: 28px;
          height: 18px;
          border-radius: 9px;
          background-color: rgba(255, 255, 255, 0.3);
          transition: var(--dev-tools-transition-duration);
          margin-right: 0.5rem;
        }

        .switch:focus-within .slider,
        .switch .slider:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transition: none;
        }

        .switch input:focus-visible ~ .slider {
          box-shadow: 0 0 0 2px var(--dev-tools-background-color-active), 0 0 0 4px var(--dev-tools-blue-color);
        }

        .switch .slider::before {
          content: '';
          display: block;
          margin: 2px;
          width: 14px;
          height: 14px;
          background-color: #fff;
          transition: var(--dev-tools-transition-duration);
          border-radius: 50%;
        }

        .switch input:checked + .slider {
          background-color: var(--dev-tools-green-color);
        }

        .switch input:checked + .slider::before {
          transform: translateX(10px);
        }

        .switch input:disabled + .slider::before {
          background-color: var(--dev-tools-grey-color);
        }

        .window.hidden {
          opacity: 0;
          transform: scale(0);
          position: absolute;
        }

        .window.visible {
          transform: none;
          opacity: 1;
          pointer-events: auto;
        }

        .window.visible ~ .dev-tools {
          opacity: 0;
          pointer-events: none;
        }

        .window.visible ~ .dev-tools .dev-tools-icon,
        .window.visible ~ .dev-tools .status-blip {
          transition: none;
          opacity: 0;
        }

        .window {
          border-radius: var(--dev-tools-border-radius);
          overflow: hidden;
          margin: 0.5rem;
          width: 30rem;
          max-width: calc(100% - 1rem);
          max-height: calc(100vh - 1rem);
          flex-shrink: 1;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          display: flex;
          flex-direction: column;
          box-shadow: var(--dev-tools-box-shadow);
          outline: none;
        }

        .window-toolbar {
          display: flex;
          flex: none;
          align-items: center;
          padding: 0.375rem;
          white-space: nowrap;
          order: 1;
          background-color: rgba(0, 0, 0, 0.2);
          gap: 0.5rem;
        }

        .tab {
          color: var(--dev-tools-text-color-secondary);
          font: inherit;
          font-size: var(--dev-tools-font-size-small);
          font-weight: 500;
          line-height: 1;
          padding: 0.25rem 0.375rem;
          background: none;
          border: none;
          margin: 0;
          border-radius: 0.25rem;
          transition: var(--dev-tools-transition-duration);
        }

        .tab:hover,
        .tab.active {
          color: var(--dev-tools-text-color-active);
        }

        .tab.active {
          background-color: rgba(255, 255, 255, 0.12);
        }

        .tab.unreadErrors::after {
          content: '•';
          color: hsl(var(--dev-tools-red-hsl));
          font-size: 1.5rem;
          position: absolute;
          transform: translate(0, -50%);
        }

        .ahreflike {
          font-weight: 500;
          color: var(--dev-tools-text-color-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        .ahreflike:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .button {
          all: initial;
          font-family: inherit;
          font-size: var(--dev-tools-font-size-small);
          line-height: 1;
          white-space: nowrap;
          background-color: rgba(0, 0, 0, 0.2);
          color: inherit;
          font-weight: 600;
          padding: 0.25rem 0.375rem;
          border-radius: 0.25rem;
        }

        .button:focus,
        .button:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .minimize-button {
          flex: none;
          width: 1rem;
          height: 1rem;
          color: inherit;
          background-color: transparent;
          border: 0;
          padding: 0;
          margin: 0 0 0 auto;
          opacity: 0.8;
        }

        .minimize-button:hover {
          opacity: 1;
        }

        .minimize-button svg {
          max-width: 100%;
        }

        .message.information {
          --dev-tools-notification-color: var(--dev-tools-blue-color);
        }

        .message.warning {
          --dev-tools-notification-color: var(--dev-tools-yellow-color);
        }

        .message.error {
          --dev-tools-notification-color: var(--dev-tools-red-color);
        }

        .message {
          display: flex;
          padding: 0.1875rem 0.75rem 0.1875rem 2rem;
          background-clip: padding-box;
        }

        .message.log {
          padding-left: 0.75rem;
        }

        .message-content {
          margin-right: 0.5rem;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }

        .message-heading {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.125rem 0;
        }

        .message.log {
          color: var(--dev-tools-text-color-secondary);
        }

        .message:not(.log) .message-heading {
          font-weight: 500;
        }

        .message.has-details .message-heading {
          color: var(--dev-tools-text-color-emphasis);
          font-weight: 600;
        }

        .message-heading::before {
          position: absolute;
          margin-left: -1.5rem;
          display: inline-block;
          text-align: center;
          font-size: 0.875em;
          font-weight: 600;
          line-height: calc(1.25em - 2px);
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .message.information .message-heading::before {
          content: 'i';
          border-color: currentColor;
          color: var(--dev-tools-notification-color);
        }

        .message.warning .message-heading::before,
        .message.error .message-heading::before {
          content: '!';
          color: var(--dev-tools-background-color-active);
          background-color: var(--dev-tools-notification-color);
        }

        .features-tray {
          padding: 0.75rem;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .features-tray p {
          margin-top: 0;
          color: var(--dev-tools-text-color-secondary);
        }

        .features-tray .feature {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 0.5em;
        }

        .message .message-details {
          font-weight: 400;
          color: var(--dev-tools-text-color-secondary);
          margin: 0.25rem 0;
        }

        .message .message-details[hidden] {
          display: none;
        }

        .message .message-details p {
          display: inline;
          margin: 0;
          margin-right: 0.375em;
          word-break: break-word;
        }

        .message .persist {
          color: var(--dev-tools-text-color-secondary);
          white-space: nowrap;
          margin: 0.375rem 0;
          display: flex;
          align-items: center;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        .message .persist::before {
          content: '';
          width: 1em;
          height: 1em;
          border-radius: 0.2em;
          margin-right: 0.375em;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .message .persist:hover::before {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .message .persist.on::before {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .message .persist.on::after {
          content: '';
          order: -1;
          position: absolute;
          width: 0.75em;
          height: 0.25em;
          border: 2px solid var(--dev-tools-background-color-active);
          border-width: 0 0 2px 2px;
          transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
        }

        .message .dismiss-message {
          font-weight: 600;
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          margin-left: 0.5rem;
          color: var(--dev-tools-text-color-secondary);
        }

        .message .dismiss-message:hover {
          color: var(--dev-tools-text-color);
        }

        .notification-tray {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          margin: 0.5rem;
          flex: none;
        }

        .window.hidden + .notification-tray {
          margin-bottom: 3rem;
        }

        .notification-tray .message {
          pointer-events: auto;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          max-width: 30rem;
          box-sizing: border-box;
          border-radius: var(--dev-tools-border-radius);
          margin-top: 0.5rem;
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          animation: slideIn var(--dev-tools-transition-duration);
          box-shadow: var(--dev-tools-box-shadow);
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }

        .notification-tray .message.animate-out {
          animation: slideOut forwards var(--dev-tools-transition-duration);
        }

        .notification-tray .message .message-details {
          max-height: 10em;
          overflow: hidden;
        }

        .message-tray {
          flex: auto;
          overflow: auto;
          max-height: 20rem;
          user-select: text;
        }

        .message-tray .message {
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          padding-left: 2.25rem;
        }

        .message-tray .message.warning {
          background-color: hsla(var(--dev-tools-yellow-hsl), 0.09);
        }

        .message-tray .message.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.09);
        }

        .message-tray .message.error .message-heading {
          color: hsl(var(--dev-tools-red-hsl));
        }

        .message-tray .message.warning .message-heading {
          color: hsl(var(--dev-tools-yellow-hsl));
        }

        .message-tray .message + .message {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .message-tray .dismiss-message,
        .message-tray .persist {
          display: none;
        }

        .info-tray {
          padding: 0.75rem;
          position: relative;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .info-tray dl {
          margin: 0;
          display: grid;
          grid-template-columns: max-content 1fr;
          column-gap: 0.75rem;
          position: relative;
        }

        .info-tray dt {
          grid-column: 1;
          color: var(--dev-tools-text-color-emphasis);
        }

        .info-tray dt:not(:first-child)::before {
          content: '';
          width: 100%;
          position: absolute;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          margin-top: -0.375rem;
        }

        .info-tray dd {
          grid-column: 2;
          margin: 0;
        }

        .info-tray :is(dt, dd):not(:last-child) {
          margin-bottom: 0.75rem;
        }

        .info-tray dd + dd {
          margin-top: -0.5rem;
        }

        .info-tray .live-reload-status::before {
          content: '•';
          color: var(--status-color);
          width: 0.75rem;
          display: inline-block;
          font-size: 1rem;
          line-height: 0.5rem;
        }

        .info-tray .copy {
          position: fixed;
          z-index: 1;
          top: 0.5rem;
          right: 0.5rem;
        }

        .info-tray .switch {
          vertical-align: -4px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.5);
            background-color: hsla(var(--dev-tools-red-hsl), 1);
          }
          100% {
            transform: scale(1);
          }
        }

        @supports (backdrop-filter: blur(1px)) {
          .dev-tools,
          .window,
          .notification-tray .message {
            backdrop-filter: blur(8px);
          }
          .dev-tools:hover,
          .dev-tools.active,
          .window,
          .notification-tray .message {
            background-color: var(--dev-tools-background-color-active-blurred);
          }
        }
      `,vo]}static get isActive(){const i=window.sessionStorage.getItem(v.ACTIVE_KEY_IN_SESSION_STORAGE);return i===null||i!=="false"}static notificationDismissed(i){const e=window.localStorage.getItem(v.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);return e!==null&&e.includes(i)}elementTelemetry(){let i={};try{const e=localStorage.getItem("vaadin.statistics.basket");if(!e)return;i=JSON.parse(e)}catch{return}this.frontendConnection&&this.frontendConnection.sendTelemetry(i)}openWebSocketConnection(){this.frontendStatus="unavailable",this.javaStatus="unavailable";const i=s=>this.log("error",s),e=()=>{if(this.liveReloadDisabled)return;this.showSplashMessage("Reloading…");const s=window.sessionStorage.getItem(v.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE),c=s?parseInt(s,10)+1:1;window.sessionStorage.setItem(v.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE,c.toString()),window.sessionStorage.setItem(v.TRIGGERED_KEY_IN_SESSION_STORAGE,"true"),window.location.reload()},t=new ue(this.getDedicatedWebSocketUrl());t.onHandshake=()=>{this.log("log","Vaadin development mode initialized"),v.isActive||t.setActive(!1),this.elementTelemetry()},t.onConnectionError=i,t.onReload=e,t.onStatusChange=s=>{this.frontendStatus=s},t.onMessage=s=>{(s==null?void 0:s.command)==="serverInfo"?this.serverInfo=s.data:(s==null?void 0:s.command)==="featureFlags"?this.features=s.data.features:console.error("Unknown message from front-end connection:",JSON.stringify(s))},this.frontendConnection=t;let o;this.backend===v.SPRING_BOOT_DEVTOOLS&&this.springBootLiveReloadPort?(o=new ue(this.getSpringBootWebSocketUrl(window.location)),o.onHandshake=()=>{v.isActive||o.setActive(!1)},o.onReload=e,o.onConnectionError=i):this.backend===v.JREBEL||this.backend===v.HOTSWAP_AGENT?o=t:o=new ue(void 0);const r=o.onStatusChange;o.onStatusChange=s=>{r(s),this.javaStatus=s};const n=o.onHandshake;o.onHandshake=()=>{n(),this.backend&&this.log("information",`Java live reload available: ${v.BACKEND_DISPLAY_NAME[this.backend]}`)},this.javaConnection=o,this.backend||this.showNotification("warning","Java live reload unavailable","Live reload for Java changes is currently not set up. Find out how to make use of this functionality to boost your workflow.","https://vaadin.com/docs/latest/flow/configuration/live-reload","liveReloadUnavailable")}getDedicatedWebSocketUrl(){function i(t){const o=document.createElement("div");return o.innerHTML=`<a href="${t}"/>`,o.firstChild.href}if(this.url===void 0)return;const e=i(this.url);if(!e.startsWith("http://")&&!e.startsWith("https://")){console.error("The protocol of the url should be http or https for live reload to work.");return}return`${e.replace(/^http/,"ws")}?v-r=push&debug_window`}getSpringBootWebSocketUrl(i){const{hostname:e}=i,t=i.protocol==="https:"?"wss":"ws";if(e.endsWith("gitpod.io")){const o=e.replace(/.*?-/,"");return`${t}://${this.springBootLiveReloadPort}-${o}`}else return`${t}://${e}:${this.springBootLiveReloadPort}`}connectedCallback(){if(super.connectedCallback(),this.catchErrors(),this.disableEventListener=t=>this.demoteSplashMessage(),document.body.addEventListener("focus",this.disableEventListener),document.body.addEventListener("click",this.disableEventListener),this.openWebSocketConnection(),window.sessionStorage.getItem(v.TRIGGERED_KEY_IN_SESSION_STORAGE)){const t=new Date,o=`${`0${t.getHours()}`.slice(-2)}:${`0${t.getMinutes()}`.slice(-2)}:${`0${t.getSeconds()}`.slice(-2)}`;this.showSplashMessage(`Page reloaded at ${o}`),window.sessionStorage.removeItem(v.TRIGGERED_KEY_IN_SESSION_STORAGE)}this.transitionDuration=parseInt(window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),10);const e=window;e.Vaadin=e.Vaadin||{},e.Vaadin.devTools=Object.assign(this,e.Vaadin.devTools),uo()}format(i){return i.toString()}catchErrors(){const i=window.Vaadin.ConsoleErrors;i&&i.forEach(e=>{this.log("error",e.map(t=>this.format(t)).join(" "))}),window.Vaadin.ConsoleErrors={push:e=>{this.log("error",e.map(t=>this.format(t)).join(" "))}}}disconnectedCallback(){this.disableEventListener&&(document.body.removeEventListener("focus",this.disableEventListener),document.body.removeEventListener("click",this.disableEventListener)),super.disconnectedCallback()}toggleExpanded(){this.notifications.slice().forEach(i=>this.dismissNotification(i.id)),this.expanded=!this.expanded,this.expanded&&this.root.focus()}showSplashMessage(i){this.splashMessage=i,this.splashMessage&&(this.expanded?this.demoteSplashMessage():setTimeout(()=>{this.demoteSplashMessage()},v.AUTO_DEMOTE_NOTIFICATION_DELAY))}demoteSplashMessage(){this.splashMessage&&this.log("log",this.splashMessage),this.showSplashMessage(void 0)}checkLicense(i){this.frontendConnection?this.frontendConnection.sendLicenseCheck(i):Bt({message:"Internal error: no connection",product:i})}log(i,e,t,o){const r=this.nextMessageId;for(this.nextMessageId+=1,this.messages.push({id:r,type:i,message:e,details:t,link:o,dontShowAgain:!1,deleted:!1});this.messages.length>v.MAX_LOG_ROWS;)this.messages.shift();this.requestUpdate(),this.updateComplete.then(()=>{const n=this.renderRoot.querySelector(".message-tray .message:last-child");this.expanded&&n?(setTimeout(()=>n.scrollIntoView({behavior:"smooth"}),this.transitionDuration),this.unreadErrors=!1):i==="error"&&(this.unreadErrors=!0)})}showNotification(i,e,t,o,r){if(r===void 0||!v.notificationDismissed(r)){if(this.notifications.filter(c=>c.persistentId===r).filter(c=>!c.deleted).length>0)return;const s=this.nextMessageId;this.nextMessageId+=1,this.notifications.push({id:s,type:i,message:e,details:t,link:o,persistentId:r,dontShowAgain:!1,deleted:!1}),o===void 0&&setTimeout(()=>{this.dismissNotification(s)},v.AUTO_DEMOTE_NOTIFICATION_DELAY),this.requestUpdate()}else this.log(i,e,t,o)}dismissNotification(i){const e=this.findNotificationIndex(i);if(e!==-1&&!this.notifications[e].deleted){const t=this.notifications[e];if(t.dontShowAgain&&t.persistentId&&!v.notificationDismissed(t.persistentId)){let o=window.localStorage.getItem(v.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);o=o===null?t.persistentId:`${o},${t.persistentId}`,window.localStorage.setItem(v.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE,o)}t.deleted=!0,this.log(t.type,t.message,t.details,t.link),setTimeout(()=>{const o=this.findNotificationIndex(i);o!==-1&&(this.notifications.splice(o,1),this.requestUpdate())},this.transitionDuration)}}findNotificationIndex(i){let e=-1;return this.notifications.some((t,o)=>t.id===i?(e=o,!0):!1),e}toggleDontShowAgain(i){const e=this.findNotificationIndex(i);if(e!==-1&&!this.notifications[e].deleted){const t=this.notifications[e];t.dontShowAgain=!t.dontShowAgain,this.requestUpdate()}}setActive(i){var e,t;(e=this.frontendConnection)==null||e.setActive(i),(t=this.javaConnection)==null||t.setActive(i),window.sessionStorage.setItem(v.ACTIVE_KEY_IN_SESSION_STORAGE,i?"true":"false")}getStatusColor(i){return i==="active"?$`hsl(${v.GREEN_HSL})`:i==="inactive"?$`hsl(${v.GREY_HSL})`:i==="unavailable"?$`hsl(${v.YELLOW_HSL})`:i==="error"?$`hsl(${v.RED_HSL})`:$`none`}renderMessage(i){return E`
      <div
        class="message ${i.type} ${i.deleted?"animate-out":""} ${i.details||i.link?"has-details":""}"
      >
        <div class="message-content">
          <div class="message-heading">${i.message}</div>
          <div class="message-details" ?hidden="${!i.details&&!i.link}">
            ${i.details?E`<p>${i.details}</p>`:""}
            ${i.link?E`<a class="ahreflike" href="${i.link}" target="_blank">Learn more</a>`:""}
          </div>
          ${i.persistentId?E`<div
                class="persist ${i.dontShowAgain?"on":"off"}"
                @click=${()=>this.toggleDontShowAgain(i.id)}
              >
                Don’t show again
              </div>`:""}
        </div>
        <div class="dismiss-message" @click=${()=>this.dismissNotification(i.id)}>Dismiss</div>
      </div>
    `}render(){return E` <div
        class="window ${this.expanded&&!this.componentPickActive?"visible":"hidden"}"
        tabindex="0"
        @keydown=${i=>i.key==="Escape"&&this.expanded&&this.toggleExpanded()}
      >
        <div class="window-toolbar">
          ${this.tabs.map(i=>E`<button
                class=${Ft({tab:!0,active:this.activeTab===i.id,unreadErrors:i.id==="log"&&this.unreadErrors})}
                id="${i.id}"
                @click=${()=>{this.activeTab=i.id,i.activate&&i.activate.call(this)}}
              >
                ${i.title}
              </button> `)}
          <button class="minimize-button" title="Minimize" @click=${()=>this.toggleExpanded()}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="#fff" opacity=".8">
                <path
                  d="m7.25 1.75c0-.41421.33579-.75.75-.75h3.25c2.0711 0 3.75 1.67893 3.75 3.75v6.5c0 2.0711-1.6789 3.75-3.75 3.75h-6.5c-2.07107 0-3.75-1.6789-3.75-3.75v-3.25c0-.41421.33579-.75.75-.75s.75.33579.75.75v3.25c0 1.2426 1.00736 2.25 2.25 2.25h6.5c1.2426 0 2.25-1.0074 2.25-2.25v-6.5c0-1.24264-1.0074-2.25-2.25-2.25h-3.25c-.41421 0-.75-.33579-.75-.75z"
                />
                <path
                  d="m2.96967 2.96967c.29289-.29289.76777-.29289 1.06066 0l5.46967 5.46967v-2.68934c0-.41421.33579-.75.75-.75.4142 0 .75.33579.75.75v4.5c0 .4142-.3358.75-.75.75h-4.5c-.41421 0-.75-.3358-.75-.75 0-.41421.33579-.75.75-.75h2.68934l-5.46967-5.46967c-.29289-.29289-.29289-.76777 0-1.06066z"
                />
              </g>
            </svg>
          </button>
        </div>
        ${this.tabs.map(i=>this.activeTab===i.id?i.render.call(this):_)}
      </div>

      <div class="notification-tray">${this.notifications.map(i=>this.renderMessage(i))}</div>
      <vaadin-dev-tools-component-picker
        .active=${this.componentPickActive}
        @component-picker-pick=${i=>{const e=i.detail.component;this.renderRoot.querySelector("#locationType").value==="create"?this.frontendConnection.sendShowComponentCreateLocation(e):this.frontendConnection.sendShowComponentAttachLocation(e),this.componentPickActive=!1}}
        @component-picker-abort=${i=>{this.componentPickActive=!1}}
      ></vaadin-dev-tools-component-picker>
      <div
        class="dev-tools ${this.splashMessage?"active":""}${this.unreadErrors?" error":""}"
        @click=${()=>this.toggleExpanded()}
      >
        ${this.unreadErrors?E`<svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="dev-tools-icon error"
            >
              <clipPath id="a"><path d="m0 0h16v16h-16z" /></clipPath>
              <g clip-path="url(#a)">
                <path
                  d="m6.25685 2.09894c.76461-1.359306 2.72169-1.359308 3.4863 0l5.58035 9.92056c.7499 1.3332-.2135 2.9805-1.7432 2.9805h-11.1606c-1.529658 0-2.4930857-1.6473-1.743156-2.9805z"
                  fill="#ff5c69"
                />
                <path
                  d="m7.99699 4c-.45693 0-.82368.37726-.81077.834l.09533 3.37352c.01094.38726.32803.69551.71544.69551.38741 0 .70449-.30825.71544-.69551l.09533-3.37352c.0129-.45674-.35384-.834-.81077-.834zm.00301 8c.60843 0 1-.3879 1-.979 0-.5972-.39157-.9851-1-.9851s-1 .3879-1 .9851c0 .5911.39157.979 1 .979z"
                  fill="#fff"
                />
              </g>
            </svg>`:E`<svg
              fill="none"
              height="17"
              viewBox="0 0 16 17"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              class="dev-tools-icon logo"
            >
              <g fill="#fff">
                <path
                  d="m8.88273 5.97926c0 .04401-.0032.08898-.00801.12913-.02467.42848-.37813.76767-.8117.76767-.43358 0-.78704-.34112-.81171-.76928-.00481-.04015-.00801-.08351-.00801-.12752 0-.42784-.10255-.87656-1.14434-.87656h-3.48364c-1.57118 0-2.315271-.72849-2.315271-2.21758v-1.26683c0-.42431.324618-.768314.748261-.768314.42331 0 .74441.344004.74441.768314v.42784c0 .47924.39576.81265 1.11293.81265h3.41538c1.5542 0 1.67373 1.156 1.725 1.7679h.03429c.05095-.6119.17048-1.7679 1.72468-1.7679h3.4154c.7172 0 1.0145-.32924 1.0145-.80847l-.0067-.43202c0-.42431.3227-.768314.7463-.768314.4234 0 .7255.344004.7255.768314v1.26683c0 1.48909-.6181 2.21758-2.1893 2.21758h-3.4836c-1.04182 0-1.14437.44872-1.14437.87656z"
                />
                <path
                  d="m8.82577 15.1648c-.14311.3144-.4588.5335-.82635.5335-.37268 0-.69252-.2249-.83244-.5466-.00206-.0037-.00412-.0073-.00617-.0108-.00275-.0047-.00549-.0094-.00824-.0145l-3.16998-5.87318c-.08773-.15366-.13383-.32816-.13383-.50395 0-.56168.45592-1.01879 1.01621-1.01879.45048 0 .75656.22069.96595.6993l2.16882 4.05042 2.17166-4.05524c.2069-.47379.513-.69448.9634-.69448.5603 0 1.0166.45711 1.0166 1.01879 0 .17579-.0465.35029-.1348.50523l-3.1697 5.8725c-.00503.0096-.01006.0184-.01509.0272-.00201.0036-.00402.0071-.00604.0106z"
                />
              </g>
            </svg>`}

        <span
          class="status-blip"
          style="background: linear-gradient(to right, ${this.getStatusColor(this.frontendStatus)} 50%, ${this.getStatusColor(this.javaStatus)} 50%)"
        ></span>
        ${this.splashMessage?E`<span class="status-description">${this.splashMessage}</span></div>`:_}
      </div>`}renderLog(){return E`<div class="message-tray">${this.messages.map(i=>this.renderMessage(i))}</div>`}activateLog(){this.unreadErrors=!1,this.updateComplete.then(()=>{const i=this.renderRoot.querySelector(".message-tray .message:last-child");i&&i.scrollIntoView()})}renderCode(){return E`<div class="info-tray">
      <div>
        <select id="locationType">
          <option value="create" selected>Create</option>
          <option value="attach">Attach</option>
        </select>
        <button
          class="button pick"
          @click=${()=>{this.componentPickActive=!0,pe(()=>import("./component-picker-a1ca0bd0.js"),["./component-picker-a1ca0bd0.js","./custom-element-73470d87.js"],import.meta.url)}}
        >
          Find component in code
        </button>
      </div>
      </div>
    </div>`}renderInfo(){return E`<div class="info-tray">
      <button class="button copy" @click=${this.copyInfoToClipboard}>Copy</button>
      <dl>
        <dt>${this.serverInfo.productName}</dt>
        <dd>${this.serverInfo.vaadinVersion}</dd>
        <dt>Flow</dt>
        <dd>${this.serverInfo.flowVersion}</dd>
        <dt>Java</dt>
        <dd>${this.serverInfo.javaVersion}</dd>
        <dt>OS</dt>
        <dd>${this.serverInfo.osVersion}</dd>
        <dt>Browser</dt>
        <dd>${navigator.userAgent}</dd>
        <dt>
          Live reload
          <label class="switch">
            <input
              id="toggle"
              type="checkbox"
              ?disabled=${this.liveReloadDisabled||(this.frontendStatus==="unavailable"||this.frontendStatus==="error")&&(this.javaStatus==="unavailable"||this.javaStatus==="error")}
              ?checked="${this.frontendStatus==="active"||this.javaStatus==="active"}"
              @change=${i=>this.setActive(i.target.checked)}
            />
            <span class="slider"></span>
          </label>
        </dt>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.javaStatus)}">
          Java ${this.javaStatus} ${this.backend?`(${v.BACKEND_DISPLAY_NAME[this.backend]})`:""}
        </dd>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.frontendStatus)}">
          Front end ${this.frontendStatus}
        </dd>
      </dl>
    </div>`}renderFeatures(){return E`<div class="features-tray">
      ${this.features.map(i=>E`<div class="feature">
          <label class="switch">
            <input
              class="feature-toggle"
              id="feature-toggle-${i.id}"
              type="checkbox"
              ?checked=${i.enabled}
              @change=${e=>this.toggleFeatureFlag(e,i)}
            />
            <span class="slider"></span>
            ${i.title}
          </label>
          <a class="ahreflike" href="${i.moreInfoLink}" target="_blank">Learn more</a>
        </div>`)}
    </div>`}copyInfoToClipboard(){const i=this.renderRoot.querySelectorAll(".info-tray dt, .info-tray dd"),e=Array.from(i).map(t=>(t.localName==="dd"?": ":`
`)+t.textContent.trim()).join("").replace(/^\n/,"");lo(e),this.showNotification("information","Environment information copied to clipboard",void 0,void 0,"versionInfoCopied")}toggleFeatureFlag(i,e){const t=i.target.checked;this.frontendConnection?(this.frontendConnection.setFeature(e.id,t),this.showNotification("information",`“${e.title}” ${t?"enabled":"disabled"}`,e.requiresServerRestart?"This feature requires a server restart":void 0,void 0,`feature${e.id}${t?"Enabled":"Disabled"}`)):this.log("error",`Unable to toggle feature ${e.title}: No server connection available`)}};let f=v;f.BLUE_HSL=$`206, 100%, 70%`;f.GREEN_HSL=$`145, 80%, 42%`;f.GREY_HSL=$`0, 0%, 50%`;f.YELLOW_HSL=$`38, 98%, 64%`;f.RED_HSL=$`355, 100%, 68%`;f.MAX_LOG_ROWS=1e3;f.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE="vaadin.live-reload.dismissedNotifications";f.ACTIVE_KEY_IN_SESSION_STORAGE="vaadin.live-reload.active";f.TRIGGERED_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggered";f.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggeredCount";f.AUTO_DEMOTE_NOTIFICATION_DELAY=5e3;f.HOTSWAP_AGENT="HOTSWAP_AGENT";f.JREBEL="JREBEL";f.SPRING_BOOT_DEVTOOLS="SPRING_BOOT_DEVTOOLS";f.BACKEND_DISPLAY_NAME={HOTSWAP_AGENT:"HotswapAgent",JREBEL:"JRebel",SPRING_BOOT_DEVTOOLS:"Spring Boot Devtools"};b([m({type:String})],f.prototype,"url",2);b([m({type:Boolean,attribute:!0})],f.prototype,"liveReloadDisabled",2);b([m({type:String})],f.prototype,"backend",2);b([m({type:Number})],f.prototype,"springBootLiveReloadPort",2);b([m({type:Boolean,attribute:!1})],f.prototype,"expanded",2);b([m({type:Array,attribute:!1})],f.prototype,"messages",2);b([m({type:String,attribute:!1})],f.prototype,"splashMessage",2);b([m({type:Array,attribute:!1})],f.prototype,"notifications",2);b([m({type:String,attribute:!1})],f.prototype,"frontendStatus",2);b([m({type:String,attribute:!1})],f.prototype,"javaStatus",2);b([q()],f.prototype,"tabs",2);b([q()],f.prototype,"activeTab",2);b([q()],f.prototype,"serverInfo",2);b([q()],f.prototype,"features",2);b([q()],f.prototype,"unreadErrors",2);b([Xi(".window")],f.prototype,"root",2);b([q()],f.prototype,"componentPickActive",2);customElements.get("vaadin-dev-tools")===void 0&&customElements.define("vaadin-dev-tools",f);export{_ as A,Ki as B,P as T,Xi as a,eo as b,Zi as c,yo as d,m as e,q as f,$ as i,Ot as o,vo as p,Pi as r,H as s,Qi as t,E as x};
