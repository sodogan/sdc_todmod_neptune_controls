sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport",
    "./PaddingSupport",
    "./BorderSupport",
    "./ShadowSupport",
], function (Lib, ControlBase, ElementHelper, MarginSupport, PaddingSupport, BorderSupport, ShadowSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {


        },

        aggregations: {
            items: {
                type: "nep.bootstrap.AccordionItem",
                multiple: true,
                singularName: "item"
            }
        },

        defaultAggregation: "items",

    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    ShadowSupport.addMetadata(oMetadata);


    const fnRenderer = function (oRm, oControl) {

        const aItems = oControl.getItems();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.attr("role", "group");
        oRm.openEnd();

        for (let i = 0; i < aItems.length; i++) {
            oRm.renderControl(aItems[i]);
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
     * @alias nep.bootstrap.Accordion
     * 
     */
    const Accordion = ControlBase.extend("nep.bootstrap.Accordion", /** @lends nep.bootstrap.Accordion.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Accordion.prototype
         */
        AccordionProto = Accordion.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Accordion.getStylePrefix = function () {
        return "nbsAccordion";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    AccordionProto.getAdditionalStyleClass = function () {

        let sClass = "accordion";

        sClass += MarginSupport.createStyleClass(Accordion, this);
        sClass += PaddingSupport.createStyleClass(Accordion, this);
        sClass += BorderSupport.createStyleClass(Accordion, this);
        sClass += ShadowSupport.createStyleClass(Accordion, this);

        return sClass;

    };

    //Add the helpers
    ElementHelper.addHelpers(Accordion);

    /*
     * END apply helpers
     */

    //Return Constructor
    return Accordion;
});