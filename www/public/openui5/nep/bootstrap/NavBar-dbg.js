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

            brand: {
                type: "string"
            },

            src: {
                type: "string"
            },

            color: {
                type: "string"
            },

            expand: {
                type: "nep.bootstrap.NavBarExpand",
                defaultValue: Lib.NavBarExpand.Always
            },

            colorScheme: {
                type: "nep.bootstrap.ColorScheme",
                defaultValue: Lib.ColorScheme.Light
            },

            containerType: {
                type: "nep.bootstrap.ContainerType",
                defaultValue: Lib.ContainerType.Normal
            },

            placement: {
                type: "nep.bootstrap.NavBarPlacement",
            },

            width: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            },

            height: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            },

        },

        events: {
            brandPress: {

            }
        },

        aggregations: {
            content: {
                type: "sap.ui.core.Control",
                multiple: true
            },

            toggler: {
                type: "nep.bootstrap.Button",
                multiple: false
            }
        },

        defaultAggregation: "content"
    };

    ElementHelper.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    TextSupport.addMetadata(oMetadata);
    ShadowSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {
        var sBrand = oControl.getBrand(),
            sSrc = oControl.getSrc(),
            sColor = oControl.getColor(),
            aContent = oControl.getContent(),
            sPlacement = oControl.getPlacement(),
            sCollapseId = oControl.createSubId("collapse");

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());

        if (sPlacement) {
            oRm.addClass(Lib.NavBarPlacementToClass[sPlacement]);
        }

        if (sColor) {
            oRm.addStyle("background-color", sColor);
        }

        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("min-height", oControl.getHeight());
        oRm.openEnd();

        oRm.openStart("div", oControl.createSubId("container"));
        oRm.addClass(Lib.ContainerTypeToClass[oControl.getContainerType()]);
        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("min-height", oControl.getHeight());
        oRm.openEnd();

        if (sBrand) {
            oRm.openStart("a", oControl.createSubId("brand"));
            oRm.addClass("navbar-brand");
            oRm.openEnd();

            if (sSrc) {
                oRm.openStart("img");
                oRm.addClass("d-inline-block align-text-top me-2");
                oRm.attr("height", "28");
                oRm.attr("src", sSrc);
                oRm.openEnd();
            }

            oRm.text(sBrand);
            oRm.close("a");
        }

        if (oControl.getExpand() !== Lib.NavBarExpand.Always) {
            let oToggler = oControl.getToggler();
            if (oToggler) {
                oRm.renderControl(oToggler);
            } else {
                oRm.openStart("button", oControl.createSubId("toggler"));
                oRm.addClass("navbar-toggler");
                oRm.attr("type", "button");
                oRm.attr("aria-expanded", false);
                oRm.attr("aria-controls", sCollapseId);
                oRm.attr("data-bs-target", "#" + sCollapseId);
                oRm.attr("data-bs-toggle", "collapse");
                oRm.openEnd();
                oRm.openStart("span");
                oRm.class("navbar-toggler-icon");
                oRm.openEnd();
                oRm.close("span");
                oRm.close("button");
            }
        }

        oRm.openStart("div", sCollapseId);
        oRm.addClass("collapse navbar-collapse");
        oRm.openEnd();

        for (let j = 0; j < aContent.length; j++) {
            oRm.renderControl(aContent[j]);
        }

        oRm.close("div");
        oRm.close("div");
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
     * @alias nep.bootstrap.NavBar
     * 
     */
    const NavBar = ControlBase.extend("nep.bootstrap.NavBar", /** @lends nep.bootstrap.NavBar.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.NavBar.prototype
         */
        NavBarProto = NavBar.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    NavBar.getStylePrefix = function () {
        return "nbsNavBar";
    };

    const mExpandToClass = {
        "Never": "",
        "Always": "navbar-expand",
        "Small": "navbar-expand-sm",
        "Medium": "navbar-expand-md",
        "Large": "navbar-expand-lg",
        "XLarge": "navbar-expand-xl"
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    NavBarProto.getAdditionalStyleClass = function () {

        let sClass = "navbar",
            sExpand = this.getExpand();

        if (sExpand !== Lib.NavBarExpand.Never) {
            sClass += " " + mExpandToClass[sExpand];
        }

        sClass += " navbar-" + this.getColorScheme().toLowerCase();

        sClass += BackgroundSupport.createStyleClass(NavBar, this);
        sClass += MarginSupport.createStyleClass(NavBar, this);
        sClass += PaddingSupport.createStyleClass(NavBar, this);
        sClass += BorderSupport.createStyleClass(NavBar, this);
        sClass += ShadowSupport.createStyleClass(NavBar, this);
        sClass += TextSupport.createStyleClass(NavBar, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(NavBar);

    /*
     * END apply helpers
     */

    //Return Constructor
    return NavBar;
});