sap.ui.define(["./library","sap/ui/core/Control","./ElementHelper","./MarginSupport","./PaddingSupport","./BackgroundSupport","./BorderSupport","./JustifyContentSupport","./AlignItemsSupport"],function(t,e,r,a,s,o,u,l,n){"use strict";const p={library:"nep.bootstrap",properties:{columnsPerRow:{type:"nep.bootstrap.ColumnsPerRow"},columnsPerRowSmall:{type:"nep.bootstrap.ColumnsPerRow"},columnsPerRowMedium:{type:"nep.bootstrap.ColumnsPerRow"},columnsPerRowLarge:{type:"nep.bootstrap.ColumnsPerRow"},columnsPerRowXLarge:{type:"nep.bootstrap.ColumnsPerRow"},columnsPerRowXXLarge:{type:"nep.bootstrap.ColumnsPerRow"},gutter:{type:"nep.bootstrap.GutterSize"},gutterSmall:{type:"nep.bootstrap.GutterSize"},gutterMedium:{type:"nep.bootstrap.GutterSize"},gutterLarge:{type:"nep.bootstrap.GutterSize"},gutterXLarge:{type:"nep.bootstrap.GutterSize"},gutterXXLarge:{type:"nep.bootstrap.GutterSize"},width:{type:"sap.ui.core.CSSSize",defaultValue:""},height:{type:"sap.ui.core.CSSSize",defaultValue:""}},aggregations:{columns:{type:"nep.bootstrap.Col",singularName:"column",multiple:!0}},defaultAggregation:"columns"};r.addMetadata(p),a.addMetadata(p),s.addMetadata(p),u.addMetadata(p),o.addMetadata(p),l.addMetadata(p),n.addMetadata(p);const g=e.extend("nep.bootstrap.Row",{metadata:p,renderer:function(t,e){let r=e.getColumns();t.openStart("div",e),t.addClass(e.createStyleClass()),t.addStyle("width",e.getWidth()),t.addStyle("height",e.getHeight()),t.openEnd();for(let e=0;e<r.length;e++){let a=r[e],s=a.getContent();t.openStart("div",a),t.addClass(a.createStyleClass()),t.openEnd();for(let e=0;e<s.length;e++)t.renderControl(s[e]);t.close("div")}t.close("div")}}),i=g.prototype;g.getStylePrefix=function(){return"nbsRow"};const c={Col1:"1",Col2:"2",Col3:"3",Col4:"4",Col5:"5",Col6:"6",Auto:"auto"};return i.getAdditionalStyleClass=function(){let t=this.getColumnsPerRow(),e=this.getColumnsPerRowSmall(),r=this.getColumnsPerRowMedium(),p=this.getColumnsPerRowLarge(),i=this.getColumnsPerRowXLarge(),d=this.getColumnsPerRowXXLarge(),y=this.getGutter(),C=this.getGutterSmall(),S=this.getGutterMedium(),m=this.getGutterLarge(),G=this.getGutterXLarge(),w=this.getGutterXXLarge(),h="row";return t&&(h+=" row-cols-"+c[t]),e&&(h+=" row-cols-sm-"+c[e]),r&&(h+=" row-cols-md-"+c[r]),p&&(h+=" row-cols-lg-"+c[p]),i&&(h+=" row-cols-xl-"+c[i]),d&&(h+=" row-cols-xxl-"+c[d]),y&&(h+=g.createGutterStyleClass(y)),C&&(h+=g.createGutterStyleClass(C)),S&&(h+=g.createGutterStyleClass(S)),m&&(h+=g.createGutterStyleClass(m)),G&&(h+=g.createGutterStyleClass(G)),w&&(h+=g.createGutterStyleClass(w)),h+=a.createStyleClass(g,this),h+=s.createStyleClass(g,this),h+=o.createStyleClass(g,this),h+=u.createStyleClass(g,this),h+=l.createStyleClass(g,this),h+=n.createStyleClass(g,this)},g.createGutterStyleClass=function(t){switch(t){case"Gutter0":return" g-0";case"Gutter1":return" g-1";case"Gutter2":return" g-2";case"Gutter3":return" g-3";case"Gutter4":return" g-4";case"Gutter5":return" g-5";case"GutterX0":return" gx-0";case"GutterX1":return" gx-1";case"GutterX2":return" gx-2";case"GutterX3":return" gx-3";case"GutterX4":return" gx-4";case"GutterX5":return" gx-5";case"GutterY0":return" gy-0";case"GutterY1":return" gy-1";case"GutterY2":return" gy-2";case"GutterY3":return" gy-3";case"GutterY4":return" gy-4";case"GutterY5":return" gy-5";default:return""}},r.addHelpers(g),g});