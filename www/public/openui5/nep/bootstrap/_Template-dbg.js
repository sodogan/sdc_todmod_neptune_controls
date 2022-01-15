sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper"
], function (Lib, ControlBase, ElementHelper) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            prop: {
                type: "string"
            },

        },

        events: {
            press: {

            }
        }
    };

    ElementHelper.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {
        
        const sProp = oControl.getProp();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());


        if (sProp) {
            oRm.attr("title", sProp);
        }

        oRm.openEnd();

        if (sProp) {
            oRm.openStart("span", oControl.createSubId("text"));
            oRm.addClass(oControl.createStyleClass("text"));
            oRm.openEnd();
            oRm.text(sProp);
            oRm.close("span");
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
     * @alias nep.bootstrap.Template
     * 
     */
    const Template = ControlBase.extend("nep.bootstrap.Template", /** @lends nep.bootstrap.Template.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Template.prototype
         */
        TemplateProto = Template.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Template.getStylePrefix = function () {
        return "nbsTemplate";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    TemplateProto.getAdditionalStyleClass = function () {

        let sClass = "";

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(Template);

    /*
     * END apply helpers
     */

    //Return Constructor
    return Template;
});