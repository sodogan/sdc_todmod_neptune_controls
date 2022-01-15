sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport",
    "./PaddingSupport",
    "./BackgroundSupport",
], function (Lib, ControlBase, ElementHelper, MarginSupport, PaddingSupport, BackgroundSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            width: {
                type: "sap.ui.core.CSSSize",
                defaultValue: "100%"
            },

            height: {
                type: "sap.ui.core.CSSSize",
                defaultValue: "100%"
            },

            enableScrolling: {
                type: "boolean",
                defaultValue: true
            },
        },

        aggregations: {
            content: {
                type: "sap.ui.core.Control",
                multiple: true
            }
        },

        defaultAggregation: "content"
    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {

        const aContent = oControl.getContent();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());
        if (oControl.getEnableScrolling()) oRm.addStyle("overflow", "auto");
        oRm.openEnd();

        for (let j = 0; j < aContent.length; j++) {
            oRm.renderControl(aContent[j]);
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
     * @alias nep.bootstrap.Page
     * 
     */
    const Page = ControlBase.extend("nep.bootstrap.Page", /** @lends nep.bootstrap.Page.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Page.prototype
         */
        PageProto = Page.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Page.getStylePrefix = function () {
        return "nbsPage";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */

    PageProto.getAdditionalStyleClass = function () {
        let sClass = "";

        sClass += MarginSupport.createStyleClass(Page, this);
        sClass += PaddingSupport.createStyleClass(Page, this);
        sClass += BackgroundSupport.createStyleClass(Page, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(Page);

    /*
     * END apply helpers
     */

    //Return Constructor
    return Page;
});