sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for Bootstrap Margin classes.
     * @alias nep.bootstrap.ShadowSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const ShadowSupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    ShadowSupport.addMetadata = function (oMetadata) {

        oMetadata.properties.shadow = {
            type: "nep.bootstrap.ShadowSize"
        };

    };

    ShadowSupport.getShadow = function (shadow) {

        let sStyle = "";

        switch (shadow) {

            case "Small":
                sStyle = "shadow-sm";
                break;

            case "Normal":
                sStyle = "shadow";
                break;

            case "Large":
                sStyle = "shadow-lg";
                break;

            default:
                break;

        }

        return sStyle;

    }

    ShadowSupport.createStyleClass = function (Constr, oInstance) {

        let sStyle = "";

        // Text Color
        let sShadow = ShadowSupport.getShadow(oInstance.getShadow());
        if (sShadow) sStyle += " " + sShadow;

        return sStyle;

    };

    return ShadowSupport;

});