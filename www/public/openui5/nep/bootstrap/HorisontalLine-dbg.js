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
     * Constructor for a new HorisontalLine instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating Bootstrap HorisontalLines.
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias nep.bootstrap.HorisontalLine
     * 
     */
    const HorisontalLine = ControlBase.extend("nep.bootstrap.HorisontalLine", /** @lends nep.bootstrap.HorisontalLine.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.HorisontalLine.prototype
         */
        HorisontalLineProto = HorisontalLine.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    HorisontalLine.getStylePrefix = function () {
        return "nbsHorisontalLine";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    HorisontalLineProto.getAdditionalStyleClass = function () {

        let sStyleClass = "";

        sStyleClass += MarginSupport.createStyleClass(HorisontalLine, this);
        sStyleClass += PaddingSupport.createStyleClass(HorisontalLine, this);
        sStyleClass += BackgroundSupport.createStyleClass(HorisontalLine, this);

        return sStyleClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(HorisontalLine);

    /*
     * END apply helpers
     */

    //Return Constructor
    return HorisontalLine;
});