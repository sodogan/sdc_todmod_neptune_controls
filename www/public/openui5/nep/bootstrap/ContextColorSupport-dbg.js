sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for Bootstrap Background classes.
     * @alias nep.bootstrap.ContextColorSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const ContextColorSupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    ContextColorSupport.addMetadata = function (oMetadata, bWithDefault) {

        oMetadata.properties.contextColor = {
            type: "nep.bootstrap.ContextColor"
        };

        if(bWithDefault){
            oMetadata.properties.contextColor.defaultValue = Lib.ContextColor.Secondary;
        }

    };

    ContextColorSupport.getContextColor = function (sContextColor, sPrefix) {
        return sContextColor ? " " + sPrefix + "-" + sContextColor.toLowerCase() : "";

    }

    ContextColorSupport.createStyleClass = function (Constr, oInstance, sPrefix) {
        return ContextColorSupport.getContextColor(oInstance.getContextColor(), sPrefix);
    };

    return ContextColorSupport;

});