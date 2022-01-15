sap.ui.define(["./library","sap/ui/core/Control","./ElementHelper"],function(t,e,o){"use strict";const a={library:"nep.bootstrap",properties:{title:{type:"string"},show:{type:"boolean"},enableAutoHide:{type:"boolean",defaultValue:!0}},aggregations:{content:{type:"sap.ui.core.Control",multiple:!0}},defaultAggregation:"content"};o.addMetadata(a);const n=e.extend("nep.bootstrap.AccordionItem",{metadata:a,renderer:function(t,e){const o=e.getContent(),a=e.createSubId("content"),n=e.getEnableAutoHide(),d=e.getShow(),r=e.getTitle();t.openStart("div",e),t.addClass(e.createStyleClass()),t.openEnd(),t.openStart("h2"),t.addClass("accordion-header"),t.openEnd(),t.openStart("button"),t.addClass("accordion-button"),t.attr("type","button"),t.attr("data-bs-toggle","collapse"),t.attr("data-bs-target","#"+a),d||t.addClass("collapsed"),t.openEnd(),t.text(r),t.close("button"),t.close("h2"),t.openStart("div",a),t.addClass("accordion-collapse collapse"),n&&t.attr("data-bs-parent","#"+e.getParent().sId),d&&t.addClass("show"),t.openEnd(),t.openStart("div"),t.addClass("accordion-body"),t.openEnd();for(let e=0;e<o.length;e++)t.renderControl(o[e]);t.close("div"),t.close("div"),t.close("div")}}),d=n.prototype;return n.getStylePrefix=function(){return"nbsAccordionItem"},d.getAdditionalStyleClass=function(){return"accordion-item"},o.addHelpers(n),n});