sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
], function (Lib, ControlBase, ElementHelper) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            title: {
                type: "string"
            },

            show: {
                type: "boolean"
            },

            enableAutoHide: {
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


    const fnRenderer = function (oRm, oControl) {

        const aContent = oControl.getContent(),
            sContentId = oControl.createSubId("content"),
            sEnableAutoHide = oControl.getEnableAutoHide(),
            sShow = oControl.getShow(),
            sTitle = oControl.getTitle();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.openEnd();

        // Header
        oRm.openStart("h2");
        oRm.addClass("accordion-header");
        oRm.openEnd();

        oRm.openStart("button");
        oRm.addClass("accordion-button");
        oRm.attr("type", "button");
        oRm.attr("data-bs-toggle", "collapse");
        oRm.attr("data-bs-target", "#" + sContentId);

        if (!sShow) {
            oRm.addClass("collapsed");
        }

        oRm.openEnd();

        oRm.text(sTitle);

        oRm.close("button");
        oRm.close("h2");

        // Body
        oRm.openStart("div", sContentId);
        oRm.addClass("accordion-collapse collapse");

        if (sEnableAutoHide) {
            oRm.attr("data-bs-parent", "#" + oControl.getParent().sId);
        }

        if (sShow) {
            oRm.addClass("show");
        }

        oRm.openEnd();

        oRm.openStart("div");
        oRm.addClass("accordion-body");
        oRm.openEnd();

        // Content
        for (let i = 0; i < aContent.length; i++) {
            oRm.renderControl(aContent[i]);
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
     * @alias nep.bootstrap.AccordionItem
     * 
     */
    const AccordionItem = ControlBase.extend("nep.bootstrap.AccordionItem", /** @lends nep.bootstrap.AccordionItem.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.AccordionItem.prototype
         */
        AccordionItemProto = AccordionItem.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    AccordionItem.getStylePrefix = function () {
        return "nbsAccordionItem";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    AccordionItemProto.getAdditionalStyleClass = function () {

        let sClass = "accordion-item";

        return sClass;

    };

    //Add the helpers
    ElementHelper.addHelpers(AccordionItem);

    /*
     * END apply helpers
     */

    //Return Constructor
    return AccordionItem;
});