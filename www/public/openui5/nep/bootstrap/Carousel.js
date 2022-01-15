sap.ui.define(["./library","sap/ui/core/Control","./ElementHelper","./MarginSupport","./PaddingSupport","./BackgroundSupport","./BorderSupport","./ShadowSupport"],function(e,t,a,o,n,s,r,i){"use strict";const l={library:"nep.bootstrap",properties:{animation:{type:"nep.bootstrap.CarouselAnimation",defaultValue:e.CarouselAnimation.Slide},controlsVisible:{type:"boolean",defaultValue:!1},indicatorsVisible:{type:"boolean",defaultValue:!1},touchEnabled:{type:"boolean",defaultValue:!0},keyboardEnabled:{type:"boolean",defaultValue:!0},cycle:{type:"boolean",defaultValue:!1},interval:{type:"int",defaultValue:5e3},loop:{type:"boolean",defaultValue:!0},width:{type:"sap.ui.core.CSSSize",defaultValue:""},height:{type:"sap.ui.core.CSSSize",defaultValue:""},colorScheme:{type:"nep.bootstrap.ColorScheme",defaultValue:e.ColorScheme.Light}},aggregations:{items:{type:"nep.bootstrap.CarouselItem",multiple:!0,singularName:"item"}},defaultAggregation:"items",events:{slide:{},slid:{}}};a.addMetadata(l),o.addMetadata(l),n.addMetadata(l),r.addMetadata(l),s.addMetadata(l),i.addMetadata(l);const d=t.extend("nep.bootstrap.Carousel",{metadata:l,renderer:function(t,a){const o=a.getAnimation(),n=a.getControlsVisible(),s=a.getIndicatorsVisible(),r=a.getColorScheme(),i=a.getItems(),l=a.getCurrentItem();if(t.openStart("div",a),t.addClass(a.createStyleClass()),r===e.ColorScheme.Dark&&t.addClass("carousel-dark"),o===e.CarouselAnimation.Fade&&t.addClass("carousel-fade"),t.addStyle("width",a.getWidth()),t.addStyle("height",a.getHeight()),t.openEnd(),s){t.openStart("div"),t.addClass("carousel-indicators"),t.openEnd();for(let e=0;e<i.length;e++){const o=i[e];t.openStart("button"),t.attr("data-bs-target","#"+a.sId),t.attr("data-bs-slide-to",e),t.attr("type","button"),o===l&&(t.class("active"),t.attr("aria-current","true")),t.openEnd(),t.close("button")}t.close("div")}t.openStart("div"),t.addClass("carousel-inner"),t.openEnd();for(const e of i)t.renderControl(e);t.close("div"),n&&(t.openStart("button"),t.addClass("carousel-control-prev"),t.attr("data-bs-target","#"+a.sId),t.attr("data-bs-slide","prev"),t.attr("type","button"),t.openEnd(),t.openStart("span"),t.addClass("carousel-control-prev-icon"),t.attr("aria-hidden","true"),t.openEnd(),t.close("span"),t.openStart("span"),t.addClass("visually-hidden"),t.openEnd(),t.text("Previous"),t.close("span"),t.close("button"),t.openStart("button"),t.addClass("carousel-control-next"),t.attr("data-bs-target","#"+a.sId),t.attr("data-bs-slide","next"),t.attr("type","button"),t.openEnd(),t.openStart("span"),t.addClass("carousel-control-next-icon"),t.attr("aria-hidden","true"),t.openEnd(),t.close("span"),t.openStart("span"),t.addClass("visually-hidden"),t.openEnd(),t.text("Next"),t.close("span"),t.close("button")),t.close("div")}}),u=d.prototype;return d.getStylePrefix=function(){return"nbsCarousel"},u.getAdditionalStyleClass=function(){let e="carousel slide";return e+=o.createStyleClass(d,this),e+=n.createStyleClass(d,this),e+=s.createStyleClass(d,this),e+=r.createStyleClass(d,this),e+=i.createStyleClass(d,this)},a.addHelpers(d),u.exit=function(){const e=this.getDomRef();e&&(this.m_fnSlide&&e.removeEventListener("slide.bs.carousel",this.m_fnSlide),this.m_fnSlid&&e.removeEventListener("slid.bs.carousel",this.m_fnSlid)),this.m_oCarousel=null,this.m_oCurrentItem=null},u.onBeforeRendering=function(){const e=this.getDomRef();e&&(this.m_fnSlide&&e.removeEventListener("slide.bs.carousel",this.m_fnSlide),this.m_fnSlid&&e.removeEventListener("slid.bs.carousel",this.m_fnSlid))},u.onAfterRendering=function(e){const t=this,a=this.getDomRef(),o=this.getCycle(),n=new bootstrap.Carousel(a,{interval:!!o&&this.getInterval(),keyboard:this.getKeyboardEnabled(),touch:this.getTouchEnabled(),wrap:this.getLoop(),ride:!1,pause:"hover"});this.m_oCarousel=n,this.m_fnSlide=function(e){const a=t.getItems();t.m_oCurrentItem=a[e.to],t.fireSlide({direction:e.direction,previousItem:a[e.from],nextItem:t.m_oCurrentItem})},this.m_fnSlid=function(e){const a=t.getItems();t.fireSlid({direction:e.direction,previousItem:a[e.from],nextItem:a[e.to]})},a.addEventListener("slide.bs.carousel",this.m_fnSlide),a.addEventListener("slid.bs.carousel",this.m_fnSlid),o&&n.cycle()},u.toPreviousItem=function(){this.m_oCarousel&&this.m_oCarousel.prev()},u.toNextItem=function(){this.m_oCarousel&&this.m_oCarousel.next()},u.toItem=function(e){if(!this.m_oCarousel)return void console.warn("Cannot navigate to item: Bootstrap carousel not initialized yet!");const t=this.getItems();let a=-1;switch(typeof e){case"number":e>=0&&e<t.length&&(a=e);break;case"string":const o=sap.ui.getCore().byId(e);a=t.indexOf(o);break;case"object":a=t.indexOf(e)}a>0?this.m_oCarousel.to(a):console.warn("Cannot navigate to item: out of bounds!")},u.getCurrentItem=function(){return this.m_oCurrentItem||this.getItems()[0]},d});