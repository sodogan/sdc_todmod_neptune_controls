sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for overflow.
     * @alias nep.bootstrap.OverflowSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const OverflowSupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    OverflowSupport.addMetadata = function (oMetadata) {

        oMetadata.properties.overflow = {
            type: "nep.bootstrap.Overflow"
        };

    };

    OverflowSupport.createStyleClass = function (Constr, oInstance) {
        let sOverflow = oInstance.getOverflow();
        if (!sOverflow) {
            return "";
        }

        // Overflow
        switch (sOverflow) {

            case "Auto":
                return " overflow-auto";
            case "Visible":
                return " overflow-visible";
            case "Hidden":
                return " overflow-hidden";
            case "Scroll":
                return " overflow-scroll";    
            default:
                return "";

        }

    };



    return OverflowSupport;
});