/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Table","./TableExtension","./TableUtils","./library","sap/base/Log"],function(T,a,b,l,L){"use strict";var E={setRowSelection:function(i,s){var t=this.getTable();var r=t.getRows()[i];if(r&&s!=null){b.toggleRowSelection(t,r.getIndex(),s);}},setRowHover:function(i,h){var t=this.getTable();var r=t.getRows()[i];if(r&&h!=null){r._setHovered(h);}},addVerticalScrollingListener:function(C){var t=this.getTable();var s=t._getScrollExtension();var S=s.constructor.ScrollDirection;if(C){s.registerForMouseWheel(C.wheelAreas,{scrollDirection:S.VERTICAL});s.registerForTouch(C.touchAreas,{scrollDirection:S.VERTICAL});}},placeVerticalScrollbarAt:function(h){var t=this.getTable();var s=t._getScrollExtension();if(!h){throw new Error("The HTMLElement in which the vertical scrollbar should be placed must be specified.");}if(!s.isVerticalScrollbarExternal()){var r=sap.ui.getCore().createRenderManager();t.getRenderer().renderVSbExternal(r,t);r.flush(h);var e=h.querySelector("#"+t.getId()+"-"+l.SharedDomRef.VerticalScrollBar);s.markVerticalScrollbarAsExternal(e);t.invalidate();}else{h.appendChild(s.getVerticalScrollbar());s.restoreVerticalScrollPosition();}},renderHorizontalScrollbar:function(r,i,s){var t=this.getTable();if(i==null){throw new Error("The id must be specified.");}t.getRenderer().renderHSbExternal(r,t,i,s);}};var c={onAfterRendering:function(e){var s=this._getScrollExtension();var r=e&&e.isMarked("renderRows");var C=this.getDomRef("tableCCnt");if(s.isVerticalScrollbarExternal()&&!r){s.updateVerticalScrollbarHeight();s.updateVerticalScrollHeight();}if(!r){C.addEventListener("scroll",function(e){this._getSyncExtension().syncInnerVerticalScrollPosition(e.target.scrollTop);}.bind(this));}}};var d=a.extend("sap.ui.table.TableSyncExtension",{_init:function(t,s,S){this._delegate=c;this._oPublicInterface={syncRowSelection:E.setRowSelection.bind(this),syncRowHover:E.setRowHover.bind(this),registerVerticalScrolling:E.addVerticalScrollingListener.bind(this),placeVerticalScrollbarAt:E.placeVerticalScrollbarAt.bind(this),renderHorizontalScrollbar:E.renderHorizontalScrollbar.bind(this)};b.addDelegate(t,this._delegate,t);return"SyncExtension";},destroy:function(){var t=this.getTable();if(t){t.removeEventDelegate(this._delegate);}this._delegate=null;this._oPublicInterface=null;a.prototype.destroy.apply(this,arguments);}});d.prototype.syncRowCount=function(C){this.callInterfaceHook("rowCount",arguments);};d.prototype.syncRowSelection=function(i,s){this.callInterfaceHook("rowSelection",arguments);};d.prototype.syncRowHover=function(i,h){this.callInterfaceHook("rowHover",arguments);};d.prototype.syncRowHeights=function(h){return this.callInterfaceHook("rowHeights",arguments);};d.prototype.syncInnerVerticalScrollPosition=function(s){this.callInterfaceHook("innerVerticalScrollPosition",arguments);};d.prototype.syncLayout=function(m){this.callInterfaceHook("layout",arguments);};d.prototype.callInterfaceHook=function(h,A){var C={};C[h]=Array.prototype.slice.call(A);L.debug("sap.ui.table.TableSyncExtension","Sync "+h+"("+C[h]+")",this.getTable());return b.dynamicCall(this._oPublicInterface,C);};d.prototype.getInterface=function(){return this._oPublicInterface;};return d;});
