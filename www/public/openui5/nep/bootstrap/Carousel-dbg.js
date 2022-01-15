sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport",
    "./PaddingSupport",
    "./BackgroundSupport",
    "./BorderSupport",
    "./ShadowSupport",
], function (Lib, ControlBase, ElementHelper, MarginSupport, PaddingSupport, BackgroundSupport, BorderSupport, ShadowSupport) {
    "use strict";

    const oMetadata = {

        library: "nep.bootstrap",

        properties: {

            animation: {
                type: "nep.bootstrap.CarouselAnimation",
                defaultValue: Lib.CarouselAnimation.Slide
            },

            controlsVisible: {
                type: "boolean",
                defaultValue: false
            },

            indicatorsVisible: {
                type: "boolean",
                defaultValue: false
            },

            touchEnabled: {
                type: "boolean",
                defaultValue: true
            },

            keyboardEnabled: {
                type: "boolean",
                defaultValue: true
            },

            cycle: {
                type: "boolean",
                defaultValue: false
            },

            interval:{
                type: "int",
                defaultValue: 5000
            },

            loop:{
                type: "boolean",
                defaultValue: true
            },

            width: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            },

            height: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            },

            colorScheme: {
                type: "nep.bootstrap.ColorScheme",
                defaultValue: Lib.ColorScheme.Light
            },

        },

        aggregations: {
            items: {
                type: "nep.bootstrap.CarouselItem",
                multiple: true,
                singularName: "item"
            }
        },

        defaultAggregation: "items",

        events: {
            slide: {

            },
            slid: {

            }
        }
    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);    
    ShadowSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {

        const sAnimation = oControl.getAnimation(),
            bControlsVisible = oControl.getControlsVisible(),
            bIndicatorsVisible = oControl.getIndicatorsVisible(),
            sColorScheme = oControl.getColorScheme(),
            aItems = oControl.getItems(),
            oCurrentItem = oControl.getCurrentItem();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());
        
        if (sColorScheme === Lib.ColorScheme.Dark) {
            oRm.addClass("carousel-dark");
        }

        if (sAnimation === Lib.CarouselAnimation.Fade) {
            oRm.addClass("carousel-fade");
        }

        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());

        oRm.openEnd();

        // Indicators
        if (bIndicatorsVisible) {

            oRm.openStart("div");
            oRm.addClass("carousel-indicators");
            oRm.openEnd();

            for (let i = 0; i < aItems.length; i++) {
                const oItem = aItems[i];

                oRm.openStart("button");
                oRm.attr("data-bs-target", "#" + oControl.sId);
                oRm.attr("data-bs-slide-to", i);
                oRm.attr("type", "button");

                if (oItem === oCurrentItem) {
                    oRm.class("active");
                    oRm.attr("aria-current", "true");
                }

                oRm.openEnd();
                oRm.close("button");

            }

            oRm.close("div");

        }

        // Content
        oRm.openStart("div");
        oRm.addClass("carousel-inner");
        oRm.openEnd();

        for (const oItem of aItems) {
            oRm.renderControl(oItem);
        }

        oRm.close("div");

        // Controls 
        if (bControlsVisible) {

            // Previous
            oRm.openStart("button");
            oRm.addClass("carousel-control-prev");
            oRm.attr("data-bs-target", "#" + oControl.sId);
            oRm.attr("data-bs-slide", "prev");
            oRm.attr("type", "button");
            oRm.openEnd();

            oRm.openStart("span");
            oRm.addClass("carousel-control-prev-icon");
            oRm.attr("aria-hidden", "true");
            oRm.openEnd();
            oRm.close("span");

            oRm.openStart("span");
            oRm.addClass("visually-hidden");
            oRm.openEnd();
            oRm.text("Previous");
            oRm.close("span");

            oRm.close("button");

            // Next
            oRm.openStart("button");
            oRm.addClass("carousel-control-next");
            oRm.attr("data-bs-target", "#" + oControl.sId);
            oRm.attr("data-bs-slide", "next");
            oRm.attr("type", "button");
            oRm.openEnd();

            oRm.openStart("span");
            oRm.addClass("carousel-control-next-icon");
            oRm.attr("aria-hidden", "true");
            oRm.openEnd();
            oRm.close("span");

            oRm.openStart("span");
            oRm.addClass("visually-hidden");
            oRm.openEnd();
            oRm.text("Next");
            oRm.close("span");

            oRm.close("button");
        }

        oRm.close("div");

    };

    /**
     * Constructor for a new MenuItem instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating menu items.
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias nep.bootstrap.Carousel
     * 
     */
    const Carousel = ControlBase.extend("nep.bootstrap.Carousel", /** @lends nep.bootstrap.Carousel.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Carousel.prototype
         */
        CarouselProto = Carousel.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Carousel.getStylePrefix = function () {
        return "nbsCarousel";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    CarouselProto.getAdditionalStyleClass = function () {

        let sClass = "carousel slide";

        sClass += MarginSupport.createStyleClass(Carousel, this);
        sClass += PaddingSupport.createStyleClass(Carousel, this);
        sClass += BackgroundSupport.createStyleClass(Carousel, this);
        sClass += BorderSupport.createStyleClass(Carousel, this);
        sClass += ShadowSupport.createStyleClass(Carousel, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(Carousel);

    /*
     * END apply helpers
     */

    CarouselProto.exit = function(){
        const elDomRef = this.getDomRef();
        if(elDomRef){
            if (this.m_fnSlide) {
                elDomRef.removeEventListener('slide.bs.carousel', this.m_fnSlide);
            }

            if (this.m_fnSlid) {
                elDomRef.removeEventListener('slid.bs.carousel', this.m_fnSlid);
            }
        }

        this.m_oCarousel = null;
        this.m_oCurrentItem = null;
    };

    CarouselProto.onBeforeRendering = function(){
        const elDomRef = this.getDomRef();
        if(elDomRef){
            if (this.m_fnSlide) {
                elDomRef.removeEventListener('slide.bs.carousel', this.m_fnSlide);
            }

            if (this.m_fnSlid) {
                elDomRef.removeEventListener('slid.bs.carousel', this.m_fnSlid);
            }
        }
    };

    CarouselProto.onAfterRendering = function (oEvent) {
        const that = this,
                elDomRef = this.getDomRef(),
                bCycle = this.getCycle();

        const oCarousel = new bootstrap.Carousel(elDomRef, {
            interval: bCycle ? this.getInterval() : false,
            keyboard: this.getKeyboardEnabled(),
            touch: this.getTouchEnabled(),
            wrap: this.getLoop(),
            
            //TODO
            ride: false, //vRide,
            pause: "hover"
        });
        this.m_oCarousel = oCarousel;

        this.m_fnSlide = function (ev) {
            const aItems = that.getItems();

            that.m_oCurrentItem = aItems[ev.to];

            that.fireSlide({
                direction: ev.direction,
                previousItem: aItems[ev.from],
                nextItem: that.m_oCurrentItem
            });
        };

        this.m_fnSlid = function (ev) {
            const aItems = that.getItems();

            that.fireSlid({
                direction: ev.direction,
                previousItem: aItems[ev.from],
                nextItem: aItems[ev.to]
            });
        };

        elDomRef.addEventListener('slide.bs.carousel', this.m_fnSlide);
        elDomRef.addEventListener('slid.bs.carousel', this.m_fnSlid);
        
        
        if(bCycle){
            oCarousel.cycle();
        }
        
    };

    CarouselProto.toPreviousItem = function(){
        this.m_oCarousel && this.m_oCarousel.prev();
    };

    CarouselProto.toNextItem = function(){
        this.m_oCarousel && this.m_oCarousel.next();
    };

    CarouselProto.toItem = function(vItem){
        if(!this.m_oCarousel){
            console.warn("Cannot navigate to item: Bootstrap carousel not initialized yet!");
            return;
        }
        const aItems = this.getItems();
        let nIndex = -1;
        switch(typeof vItem){
            case "number":
                if(vItem >= 0 && vItem < aItems.length){
                    nIndex = vItem;
                }
                break;
            case "string":
                const oItem = sap.ui.getCore().byId(vItem);
                nIndex = aItems.indexOf(oItem);
                break;
            case "object":
                nIndex = aItems.indexOf(vItem);
                break;
        }
        
        if(nIndex > 0){
            this.m_oCarousel.to(nIndex);
        }
        else{
            console.warn("Cannot navigate to item: out of bounds!");
        }
    };

    CarouselProto.getCurrentItem = function(){
        return this.m_oCurrentItem || this.getItems()[0];
    };

    //Return Constructor
    return Carousel;
});