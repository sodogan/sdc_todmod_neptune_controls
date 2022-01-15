sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for Bootstrap Background classes.
     * @alias nep.bootstrap.ColorContextSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const ColorContextSupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    ColorContextSupport.addMetadata = function (oMetadata) {

        oMetadata.properties.colorContext = {
            type: "nep.bootstrap.ColorContext",
        };

    };

    ColorContextSupport.getColorContext = function (sColorContext, sPrefix) {
        return sColorContext ? " " + sPrefix + "-" + sColorContext.toLowerCase() : "";

    }

    ColorContextSupport.createStyleClass = function (Constr, oInstance, sPrefix) {
        return ColorContextSupport.getColorContext(oInstance.getColorContext(), sPrefix);
    };

    return ColorContextSupport;

});