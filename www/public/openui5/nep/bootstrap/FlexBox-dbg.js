sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./JustifyContentSupport",
    "./MarginSupport",
    "./PaddingSupport",
    "./BackgroundSupport",
    "./BorderSupport",
    "./TextSupport",
    "./ShadowSupport",
    "./AlignItemsSupport"
], function (Lib, ControlBase, ElementHelper, JustifyContentSupport, MarginSupport, PaddingSupport, BackgroundSupport, BorderSupport, TextSupport, ShadowSupport, AlignItemsSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {
            direction: {
                type: "nep.bootstrap.FlexDirection",
                defaultValue: Lib.FlexDirection.Row
            },

            width: {
                type: "sap.ui.core.CSSSize",
                defaultValue: "100%"
            },

            height: {
                type: "sap.ui.core.CSSSize",
                defaultValue: "100%"
            },

            alignContent : {
                type: "nep.bootstrap.AlignContent"
            },
    
            alignContentSmall : {
                type: "nep.bootstrap.AlignContent"
            },
    
            alignContentMedium : {
                type: "nep.bootstrap.AlignContent"
            },
    
            alignContentLarge : {
                type: "nep.bootstrap.AlignContent"
            },
    
            alignContentXLarge : {
                type: "nep.bootstrap.AlignContent"
            },
    
            alignContentXXLarge : {
                type: "nep.bootstrap.AlignContent"
            },

            fill : {
                type: "boolean",
                defaultValue: false
            },

            fillSmall : {
                type: "boolean",
                defaultValue: false
            },

            fillMedium : {
                type: "boolean",
                defaultValue: false
            },

            fillLarge : {
                type: "boolean",
                defaultValue: false
            },

            fillXLarge : {
                type: "boolean",
                defaultValue: false
            },

            fillXXLarge : {
                type: "boolean",
                defaultValue: false
            },

            wrap : {
                type: "nep.bootstrap.FlexWrap"
            },
    
            wrapSmall : {
                type: "nep.bootstrap.FlexWrap"
            },
    
            wrapMedium : {
                type: "nep.bootstrap.FlexWrap"
            },
    
            wrapLarge : {
                type: "nep.bootstrap.FlexWrap"
            },
    
            wrapXLarge : {
                type: "nep.bootstrap.FlexWrap"
            },
    
            wrapXXLarge : {
                type: "nep.bootstrap.FlexWrap"
            },

            grow : {
                type: "nep.bootstrap.FlexGrow"
            },
    
            growSmall : {
                type: "nep.bootstrap.FlexGrow"
            },
    
            growMedium : {
                type: "nep.bootstrap.FlexGrow"
            },
    
            growLarge : {
                type: "nep.bootstrap.FlexGrow"
            },
    
            growXLarge : {
                type: "nep.bootstrap.FlexGrow"
            },
    
            growXXLarge : {
                type: "nep.bootstrap.FlexGrow"
            },

            shrink : {
                type: "nep.bootstrap.FlexShrink"
            },
    
            shrinkSmall : {
                type: "nep.bootstrap.FlexShrink"
            },
    
            shrinkMedium : {
                type: "nep.bootstrap.FlexShrink"
            },
    
            shrinkLarge : {
                type: "nep.bootstrap.FlexShrink"
            },
    
            shrinkXLarge : {
                type: "nep.bootstrap.FlexShrink"
            },
    
            shrinkXXLarge : {
                type: "nep.bootstrap.FlexShrink"
            }


        },

        aggregations: {
            items: {
                type: "nep.bootstrap.FlexBoxItem",
                multiple: true,
                singularName: "item"
            }
        },

        defaultAggregation: "items"
    };

    ElementHelper.addMetadata(oMetadata);
    JustifyContentSupport.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    TextSupport.addMetadata(oMetadata);
    ShadowSupport.addMetadata(oMetadata);
    AlignItemsSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {
        const aItems = oControl.getItems();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());
        oRm.openEnd();

        for (let i = 0; i < aItems.length; i++) {

            const oItem = aItems[i],
                aContent = oItem.getContent();

            oRm.openStart("div", oItem);
            oRm.addClass(oItem.createStyleClass());
            oRm.addStyle("width", oItem.getWidth());
            oRm.addStyle("height", oItem.getHeight());            
            oRm.openEnd();

            for (let j = 0; j < aContent.length; j++) {
                oRm.renderControl(aContent[j]);
            }
            oRm.close("div");
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
     * @alias nep.bootstrap.FlexBox
     * 
     */
    const FlexBox = ControlBase.extend("nep.bootstrap.FlexBox", /** @lends nep.bootstrap.FlexBox.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.FlexBox.prototype
         */
        FlexBoxProto = FlexBox.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    FlexBox.getStylePrefix = function () {
        return "nbsFlexBox";
    };


    const mDirectionToClass = {
        Row: "-row",
        RowReverse: "-row-reverse",
        Column: "-column",
        ColumnReverse: "-column-reverse"
    },
    mWrapToClass = {
        Wrap: "-wrap",
        WrapReverse: "-wrap-reverse",
        NoWrap: "-nowrap"
    },
    mGrowToClass = {
        Grow0: "-grow-0",
        Grow1: "-grow-1"
    },
    mShrinkToClass = {
        Shrink0: "-shrink-0",
        Shrink1: "-shrink-1"
    };

    FlexBoxProto.createAlignContentStyle = function(sAlign, sSize){
        if(!sAlign){
            return "";
        }

        return "align-content" + (sSize ? "-" + sSize : "") + "-" + sAlign.toLowerCase();
    };

    FlexBoxProto.createFillStyle = function(sFill, sSize){
        if(!sFill){
            return "";
        }

        return "flex" + (sSize ? "-" + sSize : "") + "-fill";
    };

    FlexBoxProto.createWrapStyle = function(sWrap, sSize){
        if(!sWrap){
            return "";
        }

        return "flex" + (sSize ? "-" + sSize : "") + "-" + mWrapToClass[sWrap];
    };

    FlexBoxProto.createGrowStyle = function(sGrow, sSize){
        if(!sGrow){
            return "";
        }

        return "flex" + (sSize ? "-" + sSize : "") + "-" + mGrowToClass[sGrow];
    };

    FlexBoxProto.createShrinkStyle = function(sShrink, sSize){
        if(!sShrink){
            return "";
        }

        return "flex" + (sSize ? "-" + sSize : "") + "-" + mShrinkToClass[sShrink];
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    FlexBoxProto.getAdditionalStyleClass = function () {
        let sClass = "d-flex";

        sClass += " flex" + mDirectionToClass[this.getDirection()];
        sClass += JustifyContentSupport.createStyleClass(FlexBox, this);
        sClass += AlignItemsSupport.createStyleClass(FlexBox, this);
        sClass += MarginSupport.createStyleClass(FlexBox, this);
        sClass += PaddingSupport.createStyleClass(FlexBox, this);
        sClass += BackgroundSupport.createStyleClass(FlexBox, this);
        sClass += BorderSupport.createStyleClass(FlexBox, this);
        sClass += TextSupport.createStyleClass(FlexBox, this);
        sClass += ShadowSupport.createStyleClass(FlexBox, this);

        sClass += " " + this.createAlignContentStyle(this.getAlignContent());
        sClass += " " + this.createAlignContentStyle(this.getAlignContentSmall(), "sm");
        sClass += " " + this.createAlignContentStyle(this.getAlignContentMedium(), "md");
        sClass += " " + this.createAlignContentStyle(this.getAlignContentLarge(), "lg");
        sClass += " " + this.createAlignContentStyle(this.getAlignContentXLarge(), "xl");
        sClass += " " + this.createAlignContentStyle(this.getAlignContentXXLarge(), "xxl");

        sClass += " " + this.createFillStyle(this.getFill());
        sClass += " " + this.createFillStyle(this.getFillSmall(), "sm");
        sClass += " " + this.createFillStyle(this.getFillMedium(), "md");
        sClass += " " + this.createFillStyle(this.getFillLarge(), "lg");
        sClass += " " + this.createFillStyle(this.getFillXLarge(), "xl");
        sClass += " " + this.createFillStyle(this.getFillXXLarge(), "xxl");

        sClass += " " + this.createWrapStyle(this.getWrap());
        sClass += " " + this.createWrapStyle(this.getWrapSmall(), "sm");
        sClass += " " + this.createWrapStyle(this.getWrapMedium(), "md");
        sClass += " " + this.createWrapStyle(this.getWrapLarge(), "lg");
        sClass += " " + this.createWrapStyle(this.getWrapXLarge(), "xl");
        sClass += " " + this.createWrapStyle(this.getWrapXXLarge(), "xxl");

        sClass += " " + this.createGrowStyle(this.getGrow());
        sClass += " " + this.createGrowStyle(this.getGrowSmall(), "sm");
        sClass += " " + this.createGrowStyle(this.getGrowMedium(), "md");
        sClass += " " + this.createGrowStyle(this.getGrowLarge(), "lg");
        sClass += " " + this.createGrowStyle(this.getGrowXLarge(), "xl");
        sClass += " " + this.createGrowStyle(this.getGrowXXLarge(), "xxl");

        sClass += " " + this.createShrinkStyle(this.getShrink());
        sClass += " " + this.createShrinkStyle(this.getShrinkSmall(), "sm");
        sClass += " " + this.createShrinkStyle(this.getShrinkMedium(), "md");
        sClass += " " + this.createShrinkStyle(this.getShrinkLarge(), "lg");
        sClass += " " + this.createShrinkStyle(this.getShrinkXLarge(), "xl");
        sClass += " " + this.createShrinkStyle(this.getShrinkXXLarge(), "xxl");

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(FlexBox);

    /*
     * END apply helpers
     */

    //Return Constructor
    return FlexBox;
});