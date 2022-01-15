sap.ui.define(["./library","sap/ui/core/Control","./ElementHelper","./MarginSupport","./PaddingSupport","./BackgroundSupport","./BorderSupport","./TextSupport","./ShadowSupport","./ResponsiveDisplaySupport"],function(e,t,a,n,o,s,r,l,d,i){"use strict";const c={library:"nep.bootstrap",properties:{text:{type:"string"},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},selectedIcon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},iconFirst:{type:"boolean",group:"Appearance",defaultValue:!0},selected:{type:"boolean",defaultValue:!1},enabled:{type:"boolean",defaultValue:!0},key:{type:"string"},dropdownColorScheme:{type:"nep.bootstrap.ColorScheme",defaultValue:e.ColorScheme.Light},dropdownDirection:{type:"nep.bootstrap.DropdownDirection"},dropdownMenuAlignment:{type:"nep.bootstrap.DropdownMenuAligment",defaultValue:e.DropdownMenuAligment.Start}},associations:{targetPage:{type:"sap.ui.core.Control"}},aggregations:{items:{type:["nep.bootstrap.DropdownItem","nep.bootstrap.HorizontalLine"],multiple:!0,singularName:"item"},content:{type:"sap.ui.core.Control",multiple:!0}},defaultAggregation:"items",events:{press:{}}};a.addMetadata(c),n.addMetadata(c),o.addMetadata(c),r.addMetadata(c),s.addMetadata(c),l.addMetadata(c),d.addMetadata(c),i.addMetadata(c);const p=t.extend("nep.bootstrap.NavItem",{metadata:c,renderer:function(t,a){const n=a.getItems(),o=a.getContent(),s=a.getDropdownColorScheme(),r=a.getDropdownMenuAlignment(),d=a.getSelected();let i=a.getIcon();if(d){const e=a.getSelectedIcon();e&&(i=e)}if(t.openStart("li",a),t.addClass(a.createStyleClass()),n.length&&t.addClass("dropdown"),t.openEnd(),t.openStart("a",a.createSubId("link")),t.attr("href","#"),t.addClass("nav-link"),t.addClass(a.createStyleClass("link")),a.getSelected()&&t.class("active"),a.getEnabled()||t.class("disabled"),t.addClass(l.getTextAlignment(a.getTextAlignment())),t.addClass(l.getTextColor(a.getTextColor())),t.addClass(l.getFontSize(a.getFontSize())),t.addClass(l.getFontWeight(a.getFontWeight())),n.length)t.addClass("dropdown-toggle"),t.attr("data-bs-toggle","dropdown");else if(o.length){t.attr("data-bs-toggle","tab");const e=a.getParent();e&&t.attr("data-bs-target","#"+e.createSubId("pane"+e.indexOfItem(a)))}if(t.openEnd(),i&&a.getIconFirst()&&t.write(e.createIcon(i,a.createStyleClass("icon"),a.createSubId("icon"))),t.openStart("span",a.createSubId("text")),t.class(a.createStyleClass("text")),t.openEnd(),t.text(a.getText()),t.close("span"),i&&!a.getIconFirst()&&t.write(e.createIcon(i,a.createStyleClass("icon"),a.createSubId("icon"))),t.close("a"),n.length){t.openStart("ul"),t.class("dropdown-menu"),"Dark"===s&&t.class("dropdown-menu-dark"),"End"===r&&t.class("dropdown-menu-end"),t.openEnd();for(let e=0;e<n.length;e++){const a=n[e];"nep.bootstrap.HorizontalLine"===a.getMetadata().getElementName()?(t.openStart("li"),t.openEnd(),t.openStart("hr"),t.class("dropdown-divider"),t.openEnd(),t.close("li")):t.renderControl(a)}t.close("ul")}t.close("li")}}),g=p.prototype;return p.getStylePrefix=function(){return"nbsNavItem"},g.getDisplayValue=function(){return"flex"},g.getAdditionalStyleClass=function(){let e="nav-item";switch(e+=n.createStyleClass(p,this),e+=o.createStyleClass(p,this),e+=s.createStyleClass(p,this),e+=r.createStyleClass(p,this),e+=l.createStyleClass(p,this),e+=d.createStyleClass(p,this),e+=i.createStyleClass(p,this),this.getDropdownDirection()){case"Top":e+=" dropup";break;case"Start":e+=" dropstart";break;case"End":e+=" dropend"}return e},a.addHelpers(p),g.onclick=function(e){this.getEnabled()&&this.firePress()},g.setSelected=function(e,t){const a=this.getParent();return a&&a.changeItemSelected&&a.changeItemSelected(this,e),this._setSelected(e,t),this},g._setSelected=function(t,a){const n=document.getElementById(this.createSubId("link"));if(n){this.setProperty("selected",t,!0),n.classList.toggle("active",t);const a=this.getSelectedIcon(),o=this.getIcon(),s=this.createSubId("icon"),r=document.getElementById(s);if(a)if(t)if(r)e.changeIcon(s,a);else{const t=document.createElement("div");t.innerHTML=e.createIcon(a,this.createStyleClass("icon"),s),this.getIconFirst()?n.insertBefore(t.firstChild,n.firstChild):n.appendChild(t.firstChild)}else o?e.changeIcon(s,o):r&&r.parentNode.removeChild(r)}else this.setProperty("selected",t,a);return this},p});