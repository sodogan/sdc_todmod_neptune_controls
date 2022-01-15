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

        }

    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {

        oRm.openStart("hr", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.openEnd();

    };

    /**
     * Constructor for a new HorizontalLine instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating Bootstrap HorizontalLines.
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias nep.bootstrap.HorizontalLine
     * 
     */
    const HorizontalLine = ControlBase.extend("nep.bootstrap.HorizontalLine", /** @lends nep.bootstrap.HorizontalLine.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.HorizontalLine.prototype
         */
        HorizontalLineProto = HorizontalLine.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    HorizontalLine.getStylePrefix = function () {
        return "nbsHorizontalLine";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    HorizontalLineProto.getAdditionalStyleClass = function () {

        let sStyleClass = "";

        sStyleClass += MarginSupport.createStyleClass(HorizontalLine, this);
        sStyleClass += PaddingSupport.createStyleClass(HorizontalLine, this);
        sStyleClass += BackgroundSupport.createStyleClass(HorizontalLine, this);

        return sStyleClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(HorizontalLine);

    /*
     * END apply helpers
     */

    //Return Constructor
    return HorizontalLine;
});