/* eslint-disable */
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-devicemotion_deviceorientation-formvalidation-getusermedia-pagevisibility-requestanimationframe-video-webgl-mq-prefixed-setclasses !*/
!(function(e,n,t){function r(e,n){return typeof e===n}function i(){var e,n,t,i,o,a,s;for(var l in h)if(h.hasOwnProperty(l)){if(e=[],n=h[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(i=r(n.fn,"function")?n.fn():n.fn,o=0;o<e.length;o++)a=e[o],s=a.split("."),1===s.length?Modernizr[s[0]]=i:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=i),b.push((i?"":"no-")+s.join("-"))}}function o(e){var n=S.className,t=Modernizr._config.classPrefix||"";if(w&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),w?S.className.baseVal=n:S.className=n)}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):w?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function s(){var e=n.body;return e||(e=a(w?"svg":"body"),e.fake=!0),e}function l(e,t,r,i){var o,l,u,d,f="modernizr",p=a("div"),c=s();if(parseInt(r,10))for(;r--;)u=a("div"),u.id=i?i[r]:f+(r+1),p.appendChild(u);return o=a("style"),o.type="text/css",o.id="s"+f,(c.fake?c:p).appendChild(o),c.appendChild(p),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(n.createTextNode(e)),p.id=f,c.fake&&(c.style.background="",c.style.overflow="hidden",d=S.style.overflow,S.style.overflow="hidden",S.appendChild(c)),l=t(p,e),c.fake?(c.parentNode.removeChild(c),S.style.overflow=d,S.offsetHeight):p.parentNode.removeChild(p),!!l}function u(e,n){return!!~(""+e).indexOf(n)}function d(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function f(n,t,r){var i;if("getComputedStyle"in e){i=getComputedStyle.call(e,n,t);var o=e.console;if(null!==i)r&&(i=i.getPropertyValue(r));else if(o){var a=o.error?"error":"log";o[a].call(o,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else i=!t&&n.currentStyle&&n.currentStyle[r];return i}function p(n,r){var i=n.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(d(n[i]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];i--;)o.push("("+d(n[i])+":"+r+")");return o=o.join(" or "),l("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==f(e,null,"position")})}return t}function c(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function m(e,n,i,o){function s(){d&&(delete P.style,delete P.modElem)}if(o=r(o,"undefined")?!1:o,!r(i,"undefined")){var l=p(e,i);if(!r(l,"undefined"))return l}for(var d,f,m,v,y,g=["modernizr","tspan","samp"];!P.style&&g.length;)d=!0,P.modElem=a(g.shift()),P.style=P.modElem.style;for(m=e.length,f=0;m>f;f++)if(v=e[f],y=P.style[v],u(v,"-")&&(v=c(v)),P.style[v]!==t){if(o||r(i,"undefined"))return s(),"pfx"==n?v:!0;try{P.style[v]=i}catch(h){}if(P.style[v]!=y)return s(),"pfx"==n?v:!0}return s(),!1}function v(e,n){return function(){return e.apply(n,arguments)}}function y(e,n,t){var i;for(var o in e)if(e[o]in n)return t===!1?e[o]:(i=n[e[o]],r(i,"function")?v(i,t||n):i);return!1}function g(e,n,t,i,o){var a=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+E.join(a+" ")+a).split(" ");return r(n,"string")||r(n,"undefined")?m(s,n,i,o):(s=(e+" "+L.join(a+" ")+a).split(" "),y(s,n,t))}var h=[],C={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){h.push({name:e,fn:n,options:t})},addAsyncTest:function(e){h.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=C,Modernizr=new Modernizr;var b=[],S=n.documentElement,w="svg"===S.nodeName.toLowerCase(),x=function(){var n=e.matchMedia||e.msMatchMedia;return n?function(e){var t=n(e);return t&&t.matches||!1}:function(n){var t=!1;return l("@media "+n+" { #modernizr { position: absolute; } }",function(n){t="absolute"==(e.getComputedStyle?e.getComputedStyle(n,null):n.currentStyle).position}),t}}();C.mq=x;var T="Moz O ms Webkit",E=C._config.usePrefixes?T.split(" "):[];C._cssomPrefixes=E;var _={elem:a("modernizr")};Modernizr._q.push(function(){delete _.elem});var P={style:_.elem.style};Modernizr._q.unshift(function(){delete P.style});var L=C._config.usePrefixes?T.toLowerCase().split(" "):[];C._domPrefixes=L,C.testAllProps=g;var z=function(n){var r,i=prefixes.length,o=e.CSSRule;if("undefined"==typeof o)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in o)return"@"+n;for(var a=0;i>a;a++){var s=prefixes[a],l=s.toUpperCase()+"_"+r;if(l in o)return"@-"+s.toLowerCase()+"-"+n}return!1};C.atRule=z;var N=C.prefixed=function(e,n,t){return 0===e.indexOf("@")?z(e):(-1!=e.indexOf("-")&&(e=c(e)),n?g(e,n,t):g(e,"pfx"))};Modernizr.addTest("requestanimationframe",!!N("requestAnimationFrame",e),{aliases:["raf"]}),Modernizr.addTest("pagevisibility",!!N("hidden",n,!1)),Modernizr.addTest("video",function(){var e=a("video"),n=!1;try{n=!!e.canPlayType,n&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),n.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),n.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(t){}return n}),Modernizr.addTest("webgl",function(){var n=a("canvas"),t="probablySupportsContext"in n?"probablySupportsContext":"supportsContext";return t in n?n[t]("webgl")||n[t]("experimental-webgl"):"WebGLRenderingContext"in e});var q=C.testStyles=l;Modernizr.addTest("formvalidation",function(){var n=a("form");if(!("checkValidity"in n&&"addEventListener"in n))return!1;if("reportValidity"in n)return!0;var t,r=!1;return Modernizr.formvalidationapi=!0,n.addEventListener("submit",function(n){(!e.opera||e.operamini)&&n.preventDefault(),n.stopPropagation()},!1),n.innerHTML='<input name="modTest" required="required" /><button></button>',q("#modernizr form{position:absolute;top:-99999em}",function(e){e.appendChild(n),t=n.getElementsByTagName("input")[0],t.addEventListener("invalid",function(e){r=!0,e.preventDefault(),e.stopPropagation()},!1),Modernizr.formvalidationmessage=!!t.validationMessage,n.getElementsByTagName("button")[0].click()}),r}),Modernizr.addTest("devicemotion","DeviceMotionEvent"in e),Modernizr.addTest("deviceorientation","DeviceOrientationEvent"in e),Modernizr.addTest("getUserMedia","mediaDevices"in navigator&&"getUserMedia"in navigator.mediaDevices),i(),o(b),delete C.addTest,delete C.addAsyncTest;for(var M=0;M<Modernizr._q.length;M++)Modernizr._q[M]();e.Modernizr=Modernizr}(window,document));
export default window.Modernizr;