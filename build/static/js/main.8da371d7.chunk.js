(this["webpackJsonptensorflow-test"]=this["webpackJsonptensorflow-test"]||[]).push([[2],{32:function(e){e.exports=JSON.parse('[{"name":"facebook_share_button_prelaunch_win_lose_page","category":"Social","action":"Share","label":"facebook.com"},{"name":"twitter_button_prelaunch_win_lose_page","category":"Social","action":"Share","label":"twitter.com"},{"name":"oreo_button_prelaunch_win_lose_page","category":"Affiliate","action":"Exit","label":"oreo.com"},{"name":"play_button_landing","category":"Play","action":"Click","label":"landing_play"},{"name":"video_page_next_button","category":"Video","action":"Click","label":"video_next"},{"name":"video_page_back_button","category":"Video","action":"Click","label":"video_back"},{"name":"video_page_continue","category":"Video","action":"Click","label":"video_continue"},{"name":"reg_facebook_button","category":"Social","action":"Click","label":"reg_facebook_connect"},{"name":"reg_google_button","category":"Social","action":"Click","label":"reg_google_connect"},{"name":"play_button_reg","category":"Play","action":"Click","label":"reg_play"},{"name":"need_help","category":"Help","action":"Click","label":"help"},{"name":"play_without_camera_first_time","category":"Play","action":"Click","label":"no_camera_1"},{"name":"continue","category":"Play","action":"Click","label":"continue"},{"name":"play_without_camera_second_time","category":"Play","action":"Click","label":"no_camera_2"},{"name":"if_in_unsupported_social_browser_link","category":"Affiliate","action":"Exit","label":"social_browser_redirect"},{"name":"successful_scans","category":"Play","action":"Allow Camera Access & approved by NK technology","label":"successful_scan"},{"name":"no_orientation","category":"Device Detection","action":"NK array","label":"no_orientation"},{"name":"no_webgl","category":"Device Detection","action":"NK array","label":"no_webgl "},{"name":"no_camera","category":"Camera Detection","action":"NK array","label":"no_camera "},{"name":"allowed_camera","category":"Camera Detection","action":"NK array","label":"allowed_camera "},{"name":"experience_type","category":"Camera Detection","action":"NK array","label":["amoe","3dof","webxr","arquicklook"]},{"name":"frame_rate_avg","category":"Camera Detection","action":"NK array","label":"frame_rate_avg"},{"name":"consolation_prize_download_mobile_us","category":"Consolation","action":"Click","label":"mobile_us"},{"name":"consolation_prize_download_mobile_canada_english","category":"Consolation","action":"Click","label":"mobile_ca_en"},{"name":"consolation_prize_download_mobile_canada_french","category":"Consolation","action":"Click","label":"mobile_ca_fr"},{"name":"consolation_prize_download_desktop_us","category":"Consolation","action":"Click","label":"desktop_us"},{"name":"consolation_prize_download_desktop_canada_english","category":"Consolation","action":"Click","label":"desktop_ca_en"},{"name":"consolation_prize_download_desktop_canada_french","category":"Consolation","action":"Click","label":"desktop_ca_fr"}]')},35:function(e,t,n){e.exports=n(44)},40:function(e,t,n){},41:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},42:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),r=n(31),i=n.n(r),c=(n(40),n(41),n(42),n(4)),l=n.n(c),s=n(7),u=n(18),d=n(25),p=n(20),f=n(16),m=n(26),v={dev_mode:!1,override_country:"",override_language:"",api:{override_live:!1,override_win:!1,override_lose:!1},tensorflow:{scanTimeout:3e3,debugProceed:!1,WIDTH:256,HEIGHT:256,threshold:.8,samplerate:1e3,OREO_CLASSES:["Fake Oreo","No Cookie","Real Oreo"],FAKE:"Fake Oreo",REAL:"Real Oreo",NONE:"No Cookie"},pwa:{toastTimeout:8e3,iosTipTimeout:5e3},recaptcha_key:"6LeJoo0UAAAAAOiGx5r4k2h2nbXshF-jmN1uDzUV"},b=n(6),g=document.createElement("canvas");g.getContext("2d");g.width=v.WIDTH,g.height=v.HEIGHT;var y=Object(b.a)(2,function(){var e=Object(s.a)(l.a.mark((function e(t,n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.srcObject!==n){e.next=2;break}return e.abrupt("return",Promise.resolve(t));case 2:return t.srcObject=n,e.abrupt("return",new Promise((function(e,n){t.onloadedmetadata=function(){t.play(),t.addEventListener("playing",(function(){return e(t)}))},t.onerror=n})));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),h=Object(b.a)(2,function(){var e=Object(s.a)(l.a.mark((function e(t,n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,a){t.pause(),t.src=n,t.onloadedmetadata=function(){t.play(),t.height=256,t.width=256,t.addEventListener("playing",(function(){e(t)}))},t.onerror=a})));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}());!function(e,t,n){function a(e,t){return typeof e===t}function o(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):h?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function r(e,n,a,r){var i,c,l,s,u="modernizr",d=o("div"),p=function(){var e=t.body;return e||((e=o(h?"svg":"body")).fake=!0),e}();if(parseInt(a,10))for(;a--;)(l=o("div")).id=r?r[a]:u+(a+1),d.appendChild(l);return(i=o("style")).type="text/css",i.id="s"+u,(p.fake?p:d).appendChild(i),p.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),d.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",s=y.style.overflow,y.style.overflow="hidden",y.appendChild(p)),c=n(d,e),p.fake?(p.parentNode.removeChild(p),y.style.overflow=s,y.offsetHeight):d.parentNode.removeChild(d),!!c}function i(e,t){return!!~(""+e).indexOf(t)}function c(e){return e.replace(/([A-Z])/g,(function(e,t){return"-"+t.toLowerCase()})).replace(/^ms-/,"-ms-")}function l(t,n,a){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,t,n);var r=e.console;if(null!==o)a&&(o=o.getPropertyValue(a));else if(r){r[r.error?"error":"log"].call(r,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!n&&t.currentStyle&&t.currentStyle[a];return o}function s(t,a){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(c(t[o]),a))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+c(t[o])+":"+a+")");return r("@supports ("+(i=i.join(" or "))+") { #modernizr { position: absolute; } }",(function(e){return"absolute"==l(e,null,"position")}))}return n}function u(e){return e.replace(/([a-z])-([a-z])/g,(function(e,t,n){return t+n.toUpperCase()})).replace(/^-/,"")}function d(e,t,r,c){function l(){p&&(delete C.style,delete C.modElem)}if(c=!a(c,"undefined")&&c,!a(r,"undefined")){var d=s(e,r);if(!a(d,"undefined"))return d}for(var p,f,v,b,g,y=["modernizr","tspan","samp"];!C.style&&y.length;)p=!0,C.modElem=o(y.shift()),C.style=C.modElem.style;for(v=e.length,f=0;v>f;f++)if(b=e[f],g=C.style[b],i(b,"-")&&(b=u(b)),C.style[b]!==n){if(c||a(r,"undefined"))return l(),"pfx"!=t||b;try{C.style[b]=r}catch(m){}if(C.style[b]!=g)return l(),"pfx"!=t||b}return l(),!1}function p(e,t){return function(){return e.apply(t,arguments)}}function f(e,t,n,o,r){var i=e.charAt(0).toUpperCase()+e.slice(1),c=(e+" "+x.join(i+" ")+i).split(" ");return a(t,"string")||a(t,"undefined")?d(c,t,o,r):function(e,t,n){var o;for(var r in e)if(e[r]in t)return!1===n?e[r]:a(o=t[e[r]],"function")?p(o,n||t):o;return!1}(c=(e+" "+E.join(i+" ")+i).split(" "),t,n)}var m=[],v={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout((function(){t(n[e])}),0)},addTest:function(e,t,n){m.push({name:e,fn:t,options:n})},addAsyncTest:function(e){m.push({name:null,fn:e})}},b=function(){};b.prototype=v,b=new b;var g=[],y=t.documentElement,h="svg"===y.nodeName.toLowerCase(),_=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return r("@media "+t+" { #modernizr { position: absolute; } }",(function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position})),n}}();v.mq=_;var w="Moz O ms Webkit",x=v._config.usePrefixes?w.split(" "):[];v._cssomPrefixes=x;var k={elem:o("modernizr")};b._q.push((function(){delete k.elem}));var C={style:k.elem.style};b._q.unshift((function(){delete C.style}));var E=v._config.usePrefixes?w.toLowerCase().split(" "):[];v._domPrefixes=E,v.testAllProps=f;var O=function(t){var a,o=prefixes.length,r=e.CSSRule;if("undefined"==typeof r)return n;if(!t)return!1;if((a=(t=t.replace(/^@/,"")).replace(/-/g,"_").toUpperCase()+"_RULE")in r)return"@"+t;for(var i=0;o>i;i++){var c=prefixes[i];if(c.toUpperCase()+"_"+a in r)return"@-"+c.toLowerCase()+"-"+t}return!1};v.atRule=O;var j=v.prefixed=function(e,t,n){return 0===e.indexOf("@")?O(e):(-1!=e.indexOf("-")&&(e=u(e)),t?f(e,t,n):f(e,"pfx"))};b.addTest("requestanimationframe",!!j("requestAnimationFrame",e),{aliases:["raf"]}),b.addTest("pagevisibility",!!j("hidden",t,!1)),b.addTest("video",(function(){var e=o("video"),t=!1;try{(t=!!e.canPlayType)&&((t=new Boolean(t)).ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t})),b.addTest("webgl",(function(){var t=o("canvas"),n="probablySupportsContext"in t?"probablySupportsContext":"supportsContext";return n in t?t[n]("webgl")||t[n]("experimental-webgl"):"WebGLRenderingContext"in e}));var S=v.testStyles=r;b.addTest("formvalidation",(function(){var t=o("form");if(!("checkValidity"in t&&"addEventListener"in t))return!1;if("reportValidity"in t)return!0;var n,a=!1;return b.formvalidationapi=!0,t.addEventListener("submit",(function(t){(!e.opera||e.operamini)&&t.preventDefault(),t.stopPropagation()}),!1),t.innerHTML='<input name="modTest" required="required" /><button></button>',S("#modernizr form{position:absolute;top:-99999em}",(function(e){e.appendChild(t),(n=t.getElementsByTagName("input")[0]).addEventListener("invalid",(function(e){a=!0,e.preventDefault(),e.stopPropagation()}),!1),b.formvalidationmessage=!!n.validationMessage,t.getElementsByTagName("button")[0].click()})),a})),b.addTest("devicemotion","DeviceMotionEvent"in e),b.addTest("deviceorientation","DeviceOrientationEvent"in e),b.addTest("getUserMedia","mediaDevices"in navigator&&"getUserMedia"in navigator.mediaDevices),function(){var e,t,n,o,r,i;for(var c in m)if(m.hasOwnProperty(c)){if(e=[],(t=m[c]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=a(t.fn,"function")?t.fn():t.fn,r=0;r<e.length;r++)1===(i=e[r].split(".")).length?b[i[0]]=o:(!b[i[0]]||b[i[0]]instanceof Boolean||(b[i[0]]=new Boolean(b[i[0]])),b[i[0]][i[1]]=o),g.push((o?"":"no-")+i.join("-"))}}(),function(e){var t=y.className,n=b._config.classPrefix||"";if(h&&(t=t.baseVal),b._config.enableJSClass){var a=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(a,"$1"+n+"js$2")}b._config.enableClasses&&(t+=" "+n+e.join(" "+n),h?y.className.baseVal=t:y.className=t)}(g),delete v.addTest,delete v.addAsyncTest;for(var T=0;T<b._q.length;T++)b._q[T]();e.Modernizr=b}(window,document);var _=window.Modernizr,w=n(32),x=n(11),k=(n(45),n(46)),C=(n(47),{}),E=S(),O=Object(k.a)((function(e,t){return E[e]!==t&&(E[e]=t,T(e,t)),t})),j=Object(k.a)((function(e,t){return C[e]?C[e].push(t):C[e]=[t],t}));Object(k.a)((function(e,t){C[e]=C[e].filter((function(e){return e!==t}))})),Object(k.a)((function(e,t){return function(){return O(e,t)}}));function S(){var e=localStorage.getItem("oreo-state");return e?JSON.parse(e):{}}function T(e,t){C[e]&&C[e].forEach((function(e){e(t)}))}var P,N,A,z,L,D,M=w.reduce((function(e,t){return"experience_type"===t.name?e[t.name]=function(){"ga"in window&&window.ga("send","event",t.category,t.action,"amoe"===E["upload_type"]?"amoe":"3dof")}:"frame_rate_avg"===t.name?e[t.name]=function(e){"ga"in window&&window.ga("send","event",t.category,t.action,t.label,e)}:e[t.name]=function(e){return function(){return"ga"in window&&window.ga("send","event",e.category,e.action,e.label)}}(t),e}),{}),F={audio:!1,video:{facingMode:"environment",width:_.mq("(max-width: 839px)")?void 0:1280}},R=!1,I=!0,H=function(){return Boolean(P)},U=function(){var e=Object(s.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!_.getusermedia){e.next=13;break}if(P){e.next=8;break}return R=!0,e.next=5,navigator.mediaDevices.getUserMedia(F);case 5:P=e.sent,M.allowed_camera(),document.body.classList.add("scanning");case 8:return I&&(I=!1,q()),R=!1,e.abrupt("return",P);case 13:return e.next=15,Promise.reject(new Error("getUserMedia not supported"));case 15:return e.abrupt("return",e.sent);case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),q=function(){var e=Object(s.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!R){e.next=3;break}return I=!0,e.abrupt("return");case 3:if(!P){e.next=9;break}Array.from(P.getVideoTracks()).forEach((function(e){e.stop()})),P=null,document.body.classList.remove("scanning"),e.next=10;break;case 9:return e.abrupt("return",!1);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),V=n(29),W=n(58),$=n(48),B=n(49),K=n(50),G=n(51),J=n(52),X=v.tensorflow,Q=X.WIDTH,Y=X.HEIGHT,Z=X.OREO_CLASSES,ee=X.REAL,te=function(e,t){return t.value-e.value},ne=function(e,t){return{value:e,label:Z[t]}},ae=null,oe=!1,re=!1,ie=function(){return L&&A},ce=function(){var e=Object(s.a)(l.a.mark((function e(){var t,n,a,o,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return N=N||document.createElement("canvas"),z=N.getContext("2d"),N.width=Q,N.height=Y,t=D.fromPixels(N),n=t.resizeNearestNeighbor([224,224]).toFloat(),n=D.div(n,255),a=n.reshape([1].concat(Object(V.a)(n.shape))),o=A.predict(a),console.log("logits: ",o),r=D.tidy((function(){return o})),console.log("predictions: ",r),e.abrupt("return",r.data().then((function(){r.dispose()})));case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),le=Object(W.a)($.a,Object(B.a)([Object(K.a)("label",ee),Object(G.a)(Object(J.a)(v.tensorflow.threshold),"value")])),se=function(){var e=Object(s.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t&&t instanceof HTMLVideoElement)){e.next=4;break}L=t,e.next=5;break;case 4:return e.abrupt("return",Promise.reject(new Error("You must pass a video element to load")));case 5:if(D){e.next=9;break}return e.next=8,Promise.all([n.e(0),n.e(1)]).then(n.bind(null,224));case 8:D=e.sent;case 9:if(oe=!0,A){e.next=18;break}return e.next=13,D.loadModel("tensorflow/model.json");case 13:return A=e.sent,re&&(oe=re=!1,pe()),e.next=17,ce();case 17:re&&(oe=re=!1,pe());case 18:return oe=!1,e.abrupt("return",A);case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ue=function(e){ae=null,clearTimeout(ae),ie()?ae=setTimeout(function(e){return function(){var t=Object(s.a)(l.a.mark((function t(){var a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fe();case 2:if(a=t.sent,null!==ae){t.next=5;break}return t.abrupt("return");case 5:le(a)?(ae=null,e(!0)):ae=setTimeout(n,v.tensorflow.samplerate);case 6:case"end":return t.stop()}}),t)})));function n(){return t.apply(this,arguments)}return n}()}(e),v.tensorflow.samplerate):console.error("model is not loaded")},de=function(){ae=null,clearTimeout(ae)},pe=function(){oe?re=!0:(de(),A&&(A.dispose(),A=null),L&&(L=null))},fe=function(){if(!ie())return e="model is not loaded",Promise.reject(new Error(e));var e;z.drawImage(L,0,0,L.videoWidth,L.videoHeight,0,0,Q,Y);var t=me();return t.data().then((function(e){return t.dispose(),Array.from(e).map(ne).sort(te).slice(0,3)}))},me=function(){return D.tidy((function(){var e=D.fromPixels(N).resizeNearestNeighbor([224,224]).toFloat(),t=(e=D.div(e,255)).reshape([1].concat(Object(V.a)(e.shape)));return A.predict(t)}))},ve=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={ready:!1,predictions:[],widthFirst:"0vw",widthSecond:"0vw",widthThird:"0vw"},j("settings/tensorflow-test/video-src",(function(e){n.video&&h("/assets/video/".concat(e,".mp4"),n.video)})),n}return Object(m.a)(t,e),Object(f.a)(t,null,[{key:"getMetadata",value:function(){return{path:"/debug/tensorflow",container:".debug-tensorflow"}}}]),Object(f.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=function(){var n=Object(s.a)(l.a.mark((function n(){var a;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fe();case 2:a=n.sent,e.setState({predictions:a}),e.tid=setTimeout(t,v.tensorflow.samplerate);case 5:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();se(this.refs.video).then(U).then(y(this.refs.video)).then((function(){e.canvas=N,e.ctx=e.canvas.getContext("2d"),e.setState({ready:!0}),t()})).catch((function(e){console.log("error enabling camera",e),console.log(e.stack)}))}},{key:"componentDidUpdate",value:function(e){if(!this.state.predictions||!this.state.predictions[0])return"";var t=(100*this.state.predictions[2].value).toFixed(2);console.log("component updated: ",t),t>.6&&(console.log("go to next"),de(),window.location.assign("https://www.oreo.com/"))}},{key:"componentWillUnmount",value:function(){this.canvas=null,clearTimeout(this.tid),de(),pe()}},{key:"render",value:function(){return o.a.createElement("div",{className:"container tensorflow-test"},o.a.createElement("video",{className:"test-video",ref:"video",muted:!0,playsInline:!0,autoPlay:!0}),o.a.createElement("div",{className:"canvas-container"}),this.renderPredictionGraph())}},{key:"renderPredictionGraph",value:function(){if(!this.state.predictions||!this.state.predictions[0])return"";var e=this.state.predictions,t=(100*e[0].value).toFixed(2),n=(100*e[1].value).toFixed(2),a=(100*e[2].value).toFixed(2),r={zIndex:200,overflowX:"visible",backgroundColor:"red",position:"absolute",transition:"all 2s",textAlign:"left",color:"white",fontFamily:"PlutoRegular",top:"-50px"},i={zIndex:200,backgroundColor:"black",overflow:"visible",position:"absolute",transition:"width 2s",color:"white",textAlign:"left",fontFamily:"PlutoRegular",top:"-25px"},c={zIndex:200,backgroundColor:"blue",overflow:"visible",position:"absolute",transition:"width 2s",color:"white",textAlign:"left",fontFamily:"PlutoRegular"},l={position:"relative",color:"white",fontFamily:"PlutoRegular",display:"block",width:"100vw"},s={overflow:"Visible",bottom:"50px",left:"0px",position:"absolute"};return o.a.createElement("div",{style:s},this.state.predictions[0]&&o.a.createElement("div",null,o.a.createElement("div",{style:r},o.a.createElement("span",{style:l},e[0].label+": "+a)),o.a.createElement("div",{style:i},o.a.createElement("span",{style:l},e[1].label+": "+t)),o.a.createElement("div",{style:c},o.a.createElement("span",{style:l},e[2].label+": "+n))))}},{key:"renderPredictions",value:function(){return o.a.createElement("table",null,o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Class"),o.a.createElement("th",null,"Confidence"))),o.a.createElement("tbody",null,this.state.predictions.map((function(e,t){return o.a.createElement("tr",{key:t},o.a.createElement("td",null,e.label),o.a.createElement("td",null,e.value.toFixed(2)))}))))}},{key:"renderTop",value:function(){var e=this.state.predictions[0];return e&&e.value>.8?o.a.createElement("div",null,"Predicted ",e.label," with ",parseInt(100*e.value),"% confidence"):o.a.createElement("div",null,"Nothing met confidence threshold")}}]),t}(a.Component),be=n(19),ge=n(59),ye=n(53),he=n(54),_e=n(12),we=n(61),xe=n(62),ke=n(28),Ce=Math.min(500,window.innerWidth),Ee={duration:600},Oe={opacity:{value:1}},je={opacity:{value:0}},Se={easing:"easeInOutCubic"},Te={opacity:[0,1],easing:"linear",duration:300,delay:300},Pe={opacity:[1,0],easing:"linear",duration:300},Ne=(Object(x.a)({},Ee,{},je,{},Se,{},{translateX:{value:-Ce}}),Object(x.a)({},Ee,{},je,{},Se,{},{translateX:{value:Ce}}),Object(x.a)({},Ee,{},Oe,{},Se,{},{translateX:{value:[Ce,0]}}),Object(x.a)({},Ee,{},Oe,{},Se,{},{translateX:{value:[-Ce,0]}}),Object(b.a)(2,Object(W.a)(ge.a,Object(ye.a)(Object(he.a)("length"),[Object(W.a)(_e.a,we.a),xe.a]),Array.from)),function(e){return function(t){return Object(ke.a)(t?Object(ge.a)(e,t):e)}}),Ae=Ne(Te),ze=Ne(Pe),Le=400,De=(Ne({targets:"#overlay-circle",r:function(e){return[window.innerHeight,parseFloat(e.getAttribute("r"))]},easing:"easeOutQuad",duration:Le}),n(34)),Me=n(60),Fe=n(55),Re=n(56),Ie=n(57),He=n(33),Ue=Ne({opacity:0,delay:3e3,duration:1e3,easing:"linear"}),qe=(Ne({opacity:1,delay:3e3,duration:1e3,easing:"linear"}),Object(W.a)(De.a,Object(Me.a)(Fe.a,2),Object(Re.a)(Object(Ie.a)(He.a)))),Ve=qe(["location","pathname"]),We=qe(["webgl_status"]);Ne({targets:".camera-wrapper",opacity:0,delay:5e3,duration:1e3,easing:"linear"}),a.Component;var $e=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(ve,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement($e,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[35,3,4]]]);
//# sourceMappingURL=main.8da371d7.chunk.js.map