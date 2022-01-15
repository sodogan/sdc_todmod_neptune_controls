/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/controls/propertyEditors/BasePropertyEditor","sap/ui/core/Fragment","sap/ui/model/json/JSONModel","sap/base/util/deepClone"],function(B,F,J,d){"use strict";var P=B.extend("sap.ui.integration.designtime.controls.propertyEditors.ParametersEditor",{constructor:function(){B.prototype.constructor.apply(this,arguments);this._oTableModel=new J([]);F.load({name:"sap.ui.integration.designtime.controls.propertyEditors.ParametersTable",controller:this}).then(function(t){t.setModel(this._oTableModel);if(this.getRenderLabel()){t.getHeaderToolbar().insertContent(this.getLabel(),0);}this.addContent(t);}.bind(this));},renderer:function(r,p){r.openStart("div",p);r.openEnd();p.getContent().forEach(function(c){r.openStart("div");r.style("max-heigth","500px");r.openEnd();r.renderControl(c);r.close("div");});r.close("div");},onValueChange:function(){var r=B.prototype.onValueChange.apply(this,arguments);var p=this.getConfig().value||{};var a=Object.keys(p).map(function(k){var o=p[k];o._key=k;return o;});this._oTableModel.setData(a);return r;},_syncParameters:function(){this._oTableModel.checkUpdate();var p={};this._oTableModel.getData().forEach(function(o){p[o._key]=d(o);delete p[o._key]._key;});this.firePropertyChanged(p);},_addParameter:function(){var p=this.getConfig().value||{};var k="key";var i=0;while(p[k]){k="key"+ ++i;}var a=this._oTableModel.getData();a.push({_key:k,value:""});this._syncParameters(a);},_removeParameter:function(e){var p=e.getSource().getBindingContext().getObject();var a=this._oTableModel.getData();a.splice(a.indexOf(p),1);this._syncParameters(a);},_onKeyChange:function(e){var p=this.getConfig().value;var i=e.getSource();var n=e.getParameter("value");var o=i.getBindingContext().getObject();var O=o._key;if(!p[n]||n===O){i.setValueState("None");o._key=n;this._syncParameters();}else{i.setValueState("Error");i.setValueStateText(this.getI18nProperty("CARD_EDITOR.PARAMETERS.DUPLICATE_KEY"));}},_onValueChange:function(e){var v=e.getParameter("value");var p=e.getSource().getBindingContext().getObject();p.value=v;this._syncParameters();}});return P;});
