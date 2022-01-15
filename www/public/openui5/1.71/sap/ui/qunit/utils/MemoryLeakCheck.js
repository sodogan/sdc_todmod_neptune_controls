/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Core','sap/ui/base/Object','sap/ui/core/Element','sap/ui/core/Control'],function(q,C,B,E,a){"use strict";q.sap.require("sap.ui.qunit.qunit-css");q.sap.require("sap.ui.thirdparty.qunit");q.sap.require("sap.ui.qunit.qunit-junit");q.sap.require("sap.ui.qunit.qunit-coverage");QUnit.config.reorder=false;var M={};function g(){return E.registry.all();}var f=function(c){var p=c.getMetadata().getAllProperties();for(var P in p){if(c.isPropertyInitial(P)){var o=p[P];try{c[o._sMutator]("dummyValueForMemLeakTest");}catch(e){}}}if(!c.getTooltip()){c.setTooltip("test");}};var _=function(c,b,s,h){QUnit.test("Control "+c+" should not have any memory leaks",function(i){var o=b();i.ok(o,"calling fnControlFactory() should return something (a control)");i.ok(o instanceof a,"calling fnControlFactory() should return something that is really instanceof sap.ui.core.Control");if(o.placeAt&&!h){try{o.getMetadata().getRenderer();}catch(e){i.ok(false,"Error: control does not have a renderer. If this is known, please set the 'bControlCannotRender' flag when calling MemoryLeakCheck.checkControl");}}f(o);if(o.placeAt&&!h){try{o.placeAt("qunit-fixture");sap.ui.getCore().applyChanges();}catch(e){i.ok(false,"Error: control has a renderer, but could not be rendered. If this is known, please set the 'bControlCannotRender' flag when calling MemoryLeakCheck.checkControl");throw e;}}if(s){s(o);sap.ui.getCore().applyChanges();}o.destroy();sap.ui.getCore().applyChanges();var p=g(),j=b();f(j);if(j.placeAt&&!h){j.placeAt("qunit-fixture");sap.ui.getCore().applyChanges();j.rerender();sap.ui.getCore().applyChanges();}if(s){s(j);sap.ui.getCore().applyChanges();}j.destroy();sap.ui.getCore().applyChanges();var P=g();d(i,P,p,"Memory leak check should not find any leftover controls after creating two instances and rendering twice"+(s?"\n(and calling fnSomeAdditionalFunction)":""));});};var d=function(b,A,e,m){var u=[];for(var I in A){if(!e[I]){u.push(A[I]);}}for(var i=0;i<u.length;i++){if(typeof u[i].getText==="function"){u[i]+=" (text: '"+u[i].getText()+"')";}}m=m+(u.length>0?". LEFTOVERS: "+u.join(", "):"");b.equal(u.length,0,m);};M.checkControl=function(c,b,s,e){if(typeof c!=="string"){e=s;s=b;b=c;c="[some control, id: "+Math.random()+" - please update your test to also pass the control name]";}if(s===true||s===false){e=s;s=undefined;}var o;QUnit.module("MemoryLeakCheck.checkControl: "+c,{beforeEach:function(){o=g();},afterEach:function(h){E.registry.forEach(function(i,I){if(!o[I]){h.ok(i.getMetadata().getName(),"Cleanup of id: "+I+", control: "+i.getMetadata().getName());i.destroy();}});}});QUnit.test("MemoryLeakCheck.checkControl(fnControlFactory) should receive a control factory",function(h){h.equal(typeof b,"function","MemoryLeakCheck should have received a control factory");h.ok(document.getElementById("qunit-fixture"),"the test page HTML should contain an element with ID 'qunit-fixture'");});_(c,b,s,e);};return M;},true);
