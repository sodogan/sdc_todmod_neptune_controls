/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/IconPool","./AvatarRenderer","sap/ui/events/KeyCodes","sap/base/Log"],function(l,C,I,A,K,L){"use strict";var a=l.AvatarType;var b=l.AvatarImageFitType;var c=l.AvatarColor;var d=l.AvatarSize;var e=l.AvatarShape;var f=C.extend("sap.f.Avatar",{metadata:{library:"sap.f",properties:{src:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},initials:{type:"string",group:"Data",defaultValue:null},displayShape:{type:"sap.f.AvatarShape",group:"Appearance",defaultValue:e.Circle},displaySize:{type:"sap.f.AvatarSize",group:"Appearance",defaultValue:d.S},customDisplaySize:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"3rem"},customFontSize:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"1.125rem"},imageFitType:{type:"sap.f.AvatarImageFitType",group:"Appearance",defaultValue:b.Cover},fallbackIcon:{type:"string",group:"Data",defaultValue:null},backgroundColor:{type:"sap.f.AvatarColor",group:"Appearance",defaultValue:c.Accent6},showBorder:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{detailBox:{type:'sap.m.LightBox',multiple:false,bindable:"bindable"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{}},dnd:{draggable:true,droppable:false},designtime:"sap/f/designtime/Avatar.designtime"}});f.DEFAULT_CIRCLE_PLACEHOLDER="sap-icon://person-placeholder";f.DEFAULT_SQUARE_PLACEHOLDER="sap-icon://product";f.prototype.init=function(){this._sActualType=null;this._bIsDefaultIcon=true;this._sImageFallbackType=null;};f.prototype.exit=function(){if(this._icon){this._icon.destroy();}if(this._fnLightBoxOpen){this._fnLightBoxOpen=null;}};f.prototype.setDetailBox=function(o){var g=this.getDetailBox();if(o){if(o===g){return this;}if(g){this.detachPress(this._fnLightBoxOpen,g);}this._fnLightBoxOpen=o.open;this.attachPress(this._fnLightBoxOpen,o);}else if(this._fnLightBoxOpen){this.detachPress(this._fnLightBoxOpen,g);this._fnLightBoxOpen=null;}return this.setAggregation("detailBox",o);};f.prototype.clone=function(){var o=C.prototype.clone.apply(this,arguments),g=o.getDetailBox();if(g){o.detachPress(this._fnLightBoxOpen,this.getDetailBox());o._fnLightBoxOpen=g.open;o.attachPress(o._fnLightBoxOpen,g);}return o;};f.prototype.attachPress=function(){Array.prototype.unshift.apply(arguments,["press"]);C.prototype.attachEvent.apply(this,arguments);if(this.hasListeners("press")){this.$().attr("tabindex","0");this.$().attr("role","button");}return this;};f.prototype.detachPress=function(){Array.prototype.unshift.apply(arguments,["press"]);C.prototype.detachEvent.apply(this,arguments);if(!this.hasListeners("press")){this.$().removeAttr("tabindex");this.$().attr("role","img");}return this;};f.prototype.ontap=function(){this.firePress({});};f.prototype.onkeyup=function(E){if(E.which===K.SPACE||E.which===K.ENTER){this.firePress({});E.stopPropagation();}};f.prototype._areInitialsValid=function(i){var v=/^[a-zA-Z]{1,2}$/;if(!v.test(i)){L.warning("Initials should consist of only 1 or 2 latin letters",this);this._sActualType=a.Icon;this._bIsDefaultIcon=true;return false;}return true;};f.prototype._validateSrc=function(s){if(I.isIconURI(s)){this._sActualType=a.Icon;this._bIsDefaultIcon=I.getIconInfo(s)?false:true;}else{this._bIsDefaultIcon=true;this._sActualType=a.Image;this.preloadedImage=new window.Image();this.preloadedImage.src=s;this.preloadedImage.onload=this._onImageLoad.bind(this);this.preloadedImage.onerror=this._onImageError.bind(this);}return this;};f.prototype._getActualDisplayType=function(){var s=this.getSrc(),i=this.getInitials();if(s){this._validateSrc(s);}else if(i&&this._areInitialsValid(i)){this._sActualType=a.Initials;}else{L.warning("No src and initials were provided",this);this._sActualType=a.Icon;this._bIsDefaultIcon=true;}return this._sActualType;};f.prototype._getImageFallbackType=function(){var i=this.getInitials();if(this._sActualType===a.Image){this._sImageFallbackType=i&&this._areInitialsValid(i)?a.Initials:a.Icon;}return this._sImageFallbackType;};f.prototype._getDefaultIconPath=function(D){var s=null,F=this.getFallbackIcon();if(F&&I.isIconURI(F)){s=F;}else if(D===e.Circle){s=f.DEFAULT_CIRCLE_PLACEHOLDER;}else if(D===e.Square){s=f.DEFAULT_SQUARE_PLACEHOLDER;}return s;};f.prototype._getIcon=function(){var s=this.getSrc(),D=this.getDisplayShape();if(this._bIsDefaultIcon){s=this._getDefaultIconPath(D);}if(!this._icon){this._icon=I.createControlByURI({alt:"Image placeholder",src:s});}else if(this._icon.getSrc()!==s){this._icon.setSrc(s);}return this._icon;};f.prototype._getDefaultTooltip=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.f").getText("AVATAR_TOOLTIP");};f.prototype._onImageLoad=function(){delete this.preloadedImage;};f.prototype._onImageError=function(){var F=this._getImageFallbackType();this.$().removeClass("sapFAvatarImage").addClass("sapFAvatar"+F);delete this.preloadedImage;};return f;});