sap.ui.define(["./library","./NavItem","./ElementHelper"],function(e,t,n){"use strict";const a={library:"nep.bootstrap",properties:{enabled:{type:"boolean",defaultValue:!0}},aggregations:{items:{type:"nep.bootstrap.DropdownItem",multiple:!0,singularName:"item"}},defaultAggregation:"items",events:{press:{}}};n.addMetadata(a);const o=t.extend("nep.bootstrap.DropdownNavItem",{metadata:a,renderer:function(e,t){const n=t.getItems();e.openStart("li",t),e.addClass(t.createStyleClass()),e.openEnd(),e.openStart("a",t.createSubId("link")),e.attr("href","#"),e.addClass("nav-link dropdown-toggle"),e.attr("data-bs-toggle","dropdown"),t.getSelected()&&e.class("active"),t.getEnabled()||e.class("disabled"),e.openEnd(),e.text(t.getText()),e.close("a"),e.openStart("ul"),e.class("dropdown-menu"),e.openEnd();for(let t=0;t<n.length;t++){const a=n[t];e.renderControl(a)}e.close("ul"),e.close("li")}}),r=o.prototype;return o.getStylePrefix=function(){return"nbsDropdownNavItem"},r.getAdditionalStyleClass=function(){return"nav-item dropdown"},n.addHelpers(o),r.onclick=function(e){this.getEnabled()&&this.firePress()},o});