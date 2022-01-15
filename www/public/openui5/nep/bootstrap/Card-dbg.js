sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport",
    "./PaddingSupport",
    "./BackgroundSupport",
    "./BorderSupport",
    "./TextSupport",
    "./ShadowSupport",
], function (Lib, ControlBase, ElementHelper, MarginSupport, PaddingSupport, BackgroundSupport, BorderSupport, TextSupport, ShadowSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            imagePlacement: {
                type: "nep.bootstrap.CardImagePlacement",
                defaultValue: "Top"
            },

            src: {
                type: "sap.ui.core.URI",
                defaultValue: null
            },

            title: {
                type: "string"
            },

            subTitle: {
                type: "string"
            },

            text: {
                type: "string"
            },

            textAlignmentTitle: {
                type: "nep.bootstrap.TextAlignment",
            },

            textAlignmentSubTitle: {
                type: "nep.bootstrap.TextAlignment",
            },

            textAlignmentText: {
                type: "nep.bootstrap.TextAlignment",
            },

            textColorTitle: {
                type: "nep.bootstrap.TextColor",
            },

            textColorSubTitle: {
                type: "nep.bootstrap.TextColor",
            },

            textColorText: {
                type: "nep.bootstrap.TextColor",
            },

            fontSizeTitle: {
                type: "nep.bootstrap.FontSize",
            },

            fontSizeSubTitle: {
                type: "nep.bootstrap.FontSize",
            },

            fontSizeText: {
                type: "nep.bootstrap.FontSize",
            },

            fontWeightTitle: {
                type: "nep.bootstrap.FontWeight",
            },

            fontWeightSubTitle: {
                type: "nep.bootstrap.FontWeight",
            },

            fontWeightText: {
                type: "nep.bootstrap.FontWeight",
            },

            width: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            },

            height: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            },

            backgroundColorHeader: {
                type: "nep.bootstrap.BackgroundColor",
            },

            backgroundColorFooter: {
                type: "nep.bootstrap.BackgroundColor",
            },

            borderColorHeader: {
                type: "nep.bootstrap.BorderColor"
            },

            borderSizeHeader: {
                type: "nep.bootstrap.BorderSize"
            },

            borderRadiusHeader: {
                type: "nep.bootstrap.BorderRadius"
            },

            borderHeader: {
                type: "nep.bootstrap.Border"
            },

            borderColorFooter: {
                type: "nep.bootstrap.BorderColor"
            },

            borderSizeFooter: {
                type: "nep.bootstrap.BorderSize"
            },

            borderRadiusFooter: {
                type: "nep.bootstrap.BorderRadius"
            },

            borderFooter: {
                type: "nep.bootstrap.Border"
            },

            icon: {
                type: "sap.ui.core.URI",
                defaultValue: ""
            },

            iconFirst: {
                type: "boolean",
                defaultValue: true
            },

        },

        aggregations: {
            content: {
                type: "sap.ui.core.Control",
                multiple: true
            },

            header: {
                type: "sap.ui.core.Control",
                multiple: true
            },

            footer: {
                type: "sap.ui.core.Control",
                multiple: true
            }
        },

        defaultAggregation: "content"
    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    TextSupport.addMetadata(oMetadata);
    ShadowSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {

        let aContent = oControl.getContent(),
            aHeader = oControl.getHeader(),
            aFooter = oControl.getFooter(),
            sIcon = oControl.getIcon(),
            sTitle = oControl.getTitle(),
            sSubTitle = oControl.getSubTitle(),
            sText = oControl.getText(),
            sSrc = oControl.getSrc(),
            sImagePlacement = oControl.getImagePlacement();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());

        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());

        oRm.openEnd();

        // Header 
        if (aHeader.length) {
            oRm.openStart("div");
            oRm.addClass(oControl.createStyleClass("header"));
            oRm.addClass("card-header");

            oRm.addClass(BackgroundSupport.getBackgroundColor(oControl.getBackgroundColorHeader()));
            oRm.addClass(BorderSupport.getBorder(oControl.getBorderHeader()));
            oRm.addClass(BorderSupport.getBorderColor(oControl.getBorderColorHeader()));
            oRm.addClass(BorderSupport.getBorderRadius(oControl.getBorderRadiusHeader()));
            oRm.addClass(BorderSupport.getBorderSize(oControl.getBorderSizeHeader()));
            oRm.openEnd();

            // Footer
            for (let i = 0; i < aHeader.length; i++) {
                oRm.renderControl(aHeader[i]);
            }

            oRm.close("div");

        }

        // Image Top
        if (sSrc && sImagePlacement === "Top") {
            oRm.openStart("img");
            oRm.addClass(oControl.createStyleClass("image"));
            oRm.addClass("card-img-top");
            oRm.attr("src", sSrc);
            oRm.openEnd();
            oRm.close("img");
        }

        // Body
        oRm.openStart("div");
        oRm.addClass("card-body");
        oRm.openEnd();

        // Row for Icon/Title
        oRm.openStart("div");
        oRm.addClass("row mb-2");
        oRm.openEnd();

        // Icon - First
        if (sIcon && oControl.getIconFirst()) {
            oRm.openStart("div");
            oRm.addClass("col-auto ps-3");
            oRm.addStyle("font-size", "32px");
            oRm.openEnd();
            oRm.write(Lib.createIcon(sIcon, oControl.createStyleClass("icon"), oControl.createSubId("icon")));
            oRm.close("div");
        }

        // Col for Title/SubTitle
        oRm.openStart("div");
        oRm.addClass("col");
        oRm.openEnd();

        // Title
        if (sTitle) {
            oRm.openStart("h5");
            oRm.addClass(oControl.createStyleClass("title"));
            oRm.addClass("card-title");

            oRm.addClass(TextSupport.getTextAlignment(oControl.getTextAlignmentTitle()));
            oRm.addClass(TextSupport.getTextColor(oControl.getTextColorTitle()));
            oRm.addClass(TextSupport.getFontSize(oControl.getFontSizeTitle()));
            oRm.addClass(TextSupport.getFontWeight(oControl.getFontWeightTitle()));

            oRm.openEnd();
            oRm.text(sTitle);
            oRm.close("h5");
        }

        // SubTitle
        if (sSubTitle) {
            oRm.openStart("h6");
            oRm.addClass(oControl.createStyleClass("subtitle"));
            oRm.addClass("card-subtitle mt-2");

            oRm.addClass(TextSupport.getTextAlignment(oControl.getTextAlignmentSubTitle()));
            oRm.addClass(TextSupport.getTextColor(oControl.getTextColorSubTitle()));
            oRm.addClass(TextSupport.getFontSize(oControl.getFontSizeSubTitle()));
            oRm.addClass(TextSupport.getFontWeight(oControl.getFontWeightSubTitle()));

            oRm.openEnd();
            oRm.text(sSubTitle);
            oRm.close("h6");
        }

        // Close Col Title/SubTitle
        oRm.close("div");

        // Icon - Last 
        if (sIcon && !oControl.getIconFirst()) {
            oRm.openStart("div");
            oRm.addClass("col-auto pe-3");
            oRm.addStyle("font-size", "32px");
            oRm.openEnd();
            oRm.write(Lib.createIcon(sIcon, oControl.createStyleClass("icon"), oControl.createSubId("icon")));
            oRm.close("div");
        }

        // Close Row
        oRm.close("div");

        // Text
        if (sText) {
            oRm.openStart("p");
            oRm.addClass(oControl.createStyleClass("text"));
            oRm.addClass("card-text");

            oRm.addClass(TextSupport.getTextAlignment(oControl.getTextAlignmentText()));
            oRm.addClass(TextSupport.getTextColor(oControl.getTextColorText()));
            oRm.addClass(TextSupport.getFontSize(oControl.getFontSizeText()));
            oRm.addClass(TextSupport.getFontWeight(oControl.getFontWeightText()));

            oRm.openEnd();
            oRm.text(sText);
            oRm.close("p");
        }

        // Content
        for (let i = 0; i < aContent.length; i++) {
            oRm.renderControl(aContent[i]);
        }

        // Close Body
        oRm.close("div");

        // Image Bottom
        if (sSrc && sImagePlacement === "Bottom") {
            oRm.openStart("img");
            oRm.addClass(oControl.createStyleClass("image"));
            oRm.addClass("card-img-bottom");
            oRm.attr("src", sSrc);
            oRm.openEnd();
            oRm.close("img");
        }

        // Footer 
        if (aFooter.length) {
            oRm.openStart("div");
            oRm.addClass(oControl.createStyleClass("footer"));
            oRm.addClass("card-footer");

            oRm.addClass(BackgroundSupport.getBackgroundColor(oControl.getBackgroundColorFooter()));
            oRm.addClass(BorderSupport.getBorder(oControl.getBorderFooter()));
            oRm.addClass(BorderSupport.getBorderColor(oControl.getBorderColorFooter()));
            oRm.addClass(BorderSupport.getBorderRadius(oControl.getBorderRadiusFooter()));
            oRm.addClass(BorderSupport.getBorderSize(oControl.getBorderSizeFooter()));
            oRm.openEnd();

            // Footer
            for (let i = 0; i < aFooter.length; i++) {
                oRm.renderControl(aFooter[i]);
            }

            oRm.close("div");

        }

        // Close Card
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
     * @alias nep.bootstrap.Card
     * 
     */
    const Card = ControlBase.extend("nep.bootstrap.Card", /** @lends nep.bootstrap.Card.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Card.prototype
         */
        CardProto = Card.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Card.getStylePrefix = function () {
        return "nbsCard";
    };


    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    CardProto.getAdditionalStyleClass = function () {

        let sClass = "card";

        sClass += MarginSupport.createStyleClass(Card, this);
        sClass += PaddingSupport.createStyleClass(Card, this);
        sClass += BackgroundSupport.createStyleClass(Card, this);
        sClass += BorderSupport.createStyleClass(Card, this);
        sClass += TextSupport.createStyleClass(Card, this);
        sClass += ShadowSupport.createStyleClass(Card, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(Card);

    /*
     * END apply helpers
     */

    //Return Constructor
    return Card;
});