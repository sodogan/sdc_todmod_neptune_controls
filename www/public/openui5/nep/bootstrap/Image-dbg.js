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

            src: {
                type: "string"
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

    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    ShadowSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {

        var sSrc = oControl.getSrc();

        oRm.openStart("img", oControl);
        oRm.addClass(oControl.createStyleClass());

        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());

        if (sSrc) {
            oRm.attr("src", sSrc);
        }

        oRm.openEnd();
        oRm.close("img");

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
     * @alias nep.bootstrap.Image
     * 
     */
    const Image = ControlBase.extend("nep.bootstrap.Image", /** @lends nep.bootstrap.Image.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Image.prototype
         */
        ImageProto = Image.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Image.getStylePrefix = function () {
        return "nbsImage";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    ImageProto.getAdditionalStyleClass = function () {

        let sClass = "";

        sClass += MarginSupport.createStyleClass(Image, this);
        sClass += PaddingSupport.createStyleClass(Image, this);
        sClass += BackgroundSupport.createStyleClass(Image, this);
        sClass += BorderSupport.createStyleClass(Image, this);
        sClass += ShadowSupport.createStyleClass(Image, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(Image);

    /*
     * END apply helpers
     */

    //Return Constructor
    return Image;
});