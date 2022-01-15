/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"],function(D){"use strict";var A={value:function(e,n){e.value=(n==null)?"":n;},checked:function(e,n){e.checked=(n==null)?false:true;},selected:function(e,n){e.selected=(n==null)?false:true;}};if(D.browser.msie){A.style=function(e,n,o){if(n&&o&&n!=o&&n.length==o.length){return(n+" ").split("; ").sort().toString()==(o+" ").split("; ").sort().toString();}};}function c(t){if(t=="svg"){return document.createElementNS("http://www.w3.org/2000/svg","svg");}return document.createElement(t);}var P={_sStyles:"",_sClasses:"",_aContexts:[],_mAttributes:Object.create(null)};P.setRootNode=function(r){if(this._oRoot){this._aContexts.push(this._getContext());}this._setContext({_oRoot:r});};P.getCurrentNode=function(){return this._oCurrent;};P.reset=function(){this._setContext(this._aContexts.pop());this._oParent=this._oReference=null;};P.matchElement=function(i,t,C,p){return null;};P.createElement=function(i,t,p){return null;};P._getContext=function(){return this._applyContext(this,{});};P._setContext=function(C){this._applyContext(C||{},this);};P._applyContext=function(s,t){t._oRoot=s._oRoot||null;t._oCurrent=s._oCurrent||null;t._oNewElement=s._oNewElement||null;t._oNewParent=s._oNewParent||null;t._oNewReference=s._oNewReference||null;t._iTagOpenState=s._iTagOpenState||0;return t;};P._walkOnTree=function(){this._oReference=null;if(!this._oCurrent){this._oParent=this._oRoot.parentNode;this._oCurrent=this._oRoot;}else if(this._iTagOpenState){this._oParent=this._oCurrent;this._oCurrent=this._oCurrent.firstChild;}else{this._oParent=this._oCurrent.parentNode;this._oCurrent=this._oCurrent.nextSibling;}};P._matchElement=function(i,t){if(!i){return;}if(this._oCurrent){if(this._oCurrent==this._oRoot||this._oCurrent.id==i){return;}var C=document.getElementById(i);if(C){this._oCurrent=this._oParent.insertBefore(C,this._oCurrent);return;}var m=this.matchElement(i,t,this._oCurrent,this._oParent);if(m){if(m!==this._oCurrent){this._oCurrent=this._oParent.insertBefore(m,this._oCurrent);}}else if(this._oCurrent.id){this._oReference=this._oCurrent;this._oCurrent=null;}}if(!this._oCurrent){this._oCurrent=this.createElement(i,t,this._oParent);this._setNewElement(this._oCurrent);}};P._matchNodeName=function(n){if(!this._oCurrent){return;}var C=(this._oCurrent.nodeType==1)?this._oCurrent.localName:this._oCurrent.nodeName;if(C==n){return;}if(this._oCurrent==this._oRoot){this._oReference=this._oCurrent.nextSibling;this._oParent.removeChild(this._oCurrent);}else{this._oReference=this._oCurrent;}this._oCurrent=null;};P._getAttributes=(D.browser.msie||D.browser.edge)?function(){for(var i=0,a=this._oCurrent.attributes,l=a.length;i<l;i++){this._mAttributes[a[i].name]=a[i].value;}}:function(){for(var i=0,a=this._oCurrent.getAttributeNames();i<a.length;i++){this._mAttributes[a[i]]=this._oCurrent.getAttribute(a[i]);}};P._setNewElement=function(n){if(!n){return;}if(!this._oNewElement){this._oNewElement=this._oCurrent;this._oNewParent=this._oParent;this._oNewReference=this._oReference;}else{this._oParent.insertBefore(this._oCurrent,this._oReference);}};P._insertNewElement=function(){if(this._oCurrent==this._oNewElement){this._oNewParent.insertBefore(this._oNewElement,this._oNewReference);this._oNewElement=this._oNewParent=this._oNewReference=null;}};P.openStart=function(t,i){this._walkOnTree();this._matchElement(i,t);this._matchNodeName(t);if(this._oCurrent){this._getAttributes();this._iTagOpenState=2;}else{this._oCurrent=c(t);this._setNewElement(this._oCurrent);this._iTagOpenState=1;}if(i){this.attr("id",i);}return this;};P.voidStart=P.openStart;P.attr=function(a,v){if(this._iTagOpenState==1){this._oCurrent.setAttribute(a,v);return this;}var n=String(v);var o=this._mAttributes[a];var m=A[a];if(o!==undefined){delete this._mAttributes[a];}if(m&&m(this._oCurrent,n,o)){return this;}if(o!==n){this._oCurrent.setAttribute(a,n);}return this;};P.class=function(C){if(C){this._sClasses+=(this._sClasses)?" "+C:C;}return this;};P.style=function(n,v){if(!n||v==null||v==""){return this;}this._sStyles+=(this._sStyles?" ":"")+(n+": "+v+";");return this;};P.openEnd=function(){if(this._sClasses){this.attr("class",this._sClasses);this._sClasses="";}if(this._sStyles){this.attr("style",this._sStyles);this._sStyles="";}if(this._iTagOpenState==1){return this;}var r=Object.keys(this._mAttributes);for(var i=0;i<r.length;i++){var a=r[i];var m=A[a];m&&m(this._oCurrent,null);this._oCurrent.removeAttribute(a);delete this._mAttributes[a];}return this;};P.voidEnd=function(){this.openEnd();this._iTagOpenState=0;this._insertNewElement();return this;};P.text=function(t){this._walkOnTree();this._matchNodeName("#text");if(!this._oCurrent){this._oCurrent=document.createTextNode(t);this._oParent.insertBefore(this._oCurrent,this._oReference);}else if(this._oCurrent.data!=t){this._oCurrent.data=t;}this._iTagOpenState=0;return this;};P.close=function(t){if(this._iTagOpenState){this._iTagOpenState=0;this._oCurrent.textContent="";}else{var p=this._oCurrent.parentNode;for(var l=p.lastChild;l&&l!=this._oCurrent;l=p.lastChild){p.removeChild(l);}this._oCurrent=p;}this._insertNewElement();return this;};P.unsafeHtml=function(h,i){var r=null;if(!this._oCurrent){r=this._oRoot;if(h){r.outerHTML=h;}}else if(this._iTagOpenState){r=this._oCurrent.firstChild;if(h){this._iTagOpenState=0;this._oCurrent.insertAdjacentHTML("afterbegin",h);if(r){this._oCurrent=r.previousSibling;if(!this._oCurrent){r.data=h;this._oCurrent=r;}}else{this._oCurrent=this._oCurrent.lastChild;}}}else{r=this._oCurrent.nextSibling;if(h){this._oCurrent.insertAdjacentHTML("afterend",h);this._oCurrent=r?r.previousSibling:this._oCurrent.parentNode.lastChild;}}if(i&&r&&r.id==i){r.parentNode.removeChild(r);}return this;};return P;});