/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/URI','sap/ui/Device','sap/ui/test/_LogCollector',"sap/base/Log","sap/ui/thirdparty/jquery",'sap/base/util/ObjectPath'],function(U,D,_,L,q,O){"use strict";var a=1280;var b=1024;var f=null,F=null,$=null,o=null,c=null,d=null,r=false,u=false,A=null,e=null,s;function h(){f=F[0].contentWindow;j();k();}function g(W,H){if(W){F.css("width",W);$.css("padding-left",W);}else{F.css("width",a);F.addClass("default-scale-x");}if(H){F.css("height",H);}else{F.css("height",b);F.addClass("default-scale-y");}if(!W&&!H){F.addClass("default-scale-both");}}function j(){var i=f.onerror;f.onerror=function(E,y,z,C,B){var R=false;if(i){R=i.apply(this,arguments);}setTimeout(function(){var G=C?"\ncolumn: "+C:"";var I=B&&"\niFrame error: "+(B.stack?B.message+"\n"+B.stack:B)||"";throw new Error("Error in launched application iFrame: "+E+"\nurl: "+y+"\nline: "+z+G+I);},0);return R;};}function k(){if(u){return true;}if(f&&f.sap&&f.sap.ui&&f.sap.ui.getCore){if(!r){f.sap.ui.getCore().attachInit(m);}r=true;}return u;}function l(i){f.sap.ui.require(["sap/ui/thirdparty/sinon"],function(y){if(!y){setTimeout(function(){l(i);},50);}else{i();}});}function m(){p();if(D.browser.firefox){l(v);}else{v();}}function n(){d.sap.log.addLogListener(_.getInstance()._oListener);u=true;}function p(){d=f.jQuery;w("sap/ui/test");w("sap/ui/qunit");w("sap/ui/thirdparty");}function t(i,H,y){var z=new y(),B=new H(z),C=i.setHash,E=i.getHash,G,K=false,I=f.history.go;i.replaceHash=function(N){K=true;var P=this.getHash();G=N;z.fireEvent("hashReplaced",{sHash:N});this.changed.dispatch(N,P);};i.setHash=function(N){K=true;var R=E.call(this);G=N;z.fireEvent("hashSet",{sHash:N});C.apply(this,arguments);if(R===this.getHash()){this.changed.dispatch(R,B.aHistory[B.iHistoryPosition]);}};i.getHash=function(){if(G===undefined){return E.apply(this,arguments);}return G;};i.changed.add(function(N){if(!K){z.fireEvent("hashSet",{sHash:N});G=N;}K=false;});z.init();function J(){K=true;var N=B.aHistory[B.iHistoryPosition],P=B.getPreviousHash();G=P;i.changed.dispatch(P,N);}function M(){K=true;var N=B.aHistory[B.iHistoryPosition+1],P=B.aHistory[B.iHistoryPosition];if(N===undefined){L.error("Could not navigate forwards, there is no history entry in the forwards direction",this);return;}G=N;i.changed.dispatch(N,P);}f.history.back=J;f.history.forward=M;f.history.go=function(S){if(S===-1){J();return;}else if(S===1){M();return;}L.error("Using history.go with a number greater than 1 is not supported by OPA5",this);return I.apply(f.history,arguments);};}function v(){f.sap.ui.require(["sap/ui/test/OpaPlugin","sap/ui/test/autowaiter/_autoWaiter","sap/ui/test/_OpaLogger","sap/ui/qunit/QUnitUtils","sap/ui/thirdparty/hasher","sap/ui/core/routing/History","sap/ui/core/routing/HashChanger"],function(i,y,z,Q,B,H,C){z.setLevel(s);o=new i();A=y;c=Q;t(B,H,C);e=C;n();});}function w(R){var i=sap.ui.require.toUrl(R);var y=new U(i).absoluteTo(document.baseURI).search("").toString();var C=O.get("sap.ui._ui5loader.config",f)||O.get("sap.ui.loader.config",f);if(C){var z={};z[R]=y;C({paths:z});}else if(d&&d.sap&&d.sap.registerResourcePath){d.sap.registerResourcePath(R,y);}else{throw new Error("iFrameLauncher.js: UI5 module system not found.");}}function x(){if(!f){throw new Error("sap.ui.test.launchers.iFrameLauncher: Teardown was called before launch. No iFrame was loaded.");}f.onerror=q.noop;for(var i=0;i<F.length;i++){F[0].src="about:blank";F[0].contentWindow.document.write('');F[0].contentWindow.close();}if(typeof CollectGarbage=="function"){CollectGarbage();}F.remove();$.remove();d=null;o=null;c=null;f=null;u=false;r=false;A=null;e=null;}return{launch:function(i){if(f){throw new Error("sap.ui.test.launchers.iFrameLauncher: Launch was called twice without teardown. Only one iFrame may be loaded at a time.");}F=q("#"+i.frameId);if(!F.length){if(!i.source){L.error("No source was given to launch the IFrame",this);}$=q("<div class='opaFrameContainer'></div>");F=q('<IFrame id="'+i.frameId+'" class="opaFrame" src="'+i.source+'"></IFrame>');$.append(F);q("body").append($);g(i.width,i.height);}if(F[0].contentDocument&&F[0].contentDocument.readyState==="complete"){h();}else{F.on("load",h);}s=i.opaLogLevel;return k();},hasLaunched:function(){k();return u;},teardown:function(){x();},getHashChanger:function(){if(!e){return null;}return e.getInstance();},getPlugin:function(){return o;},getJQuery:function(){return d;},getUtils:function(){return c;},getWindow:function(){return f;},_getAutoWaiter:function(){return A;}};},true);
