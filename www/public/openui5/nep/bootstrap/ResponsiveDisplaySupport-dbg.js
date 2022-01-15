sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for responsive visibility.
     * @alias nep.bootstrap.ResponsiveDisplaySupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const ResponsiveDisplaySupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    ResponsiveDisplaySupport.addMetadata = function (oMetadata) {

        oMetadata.properties.display = {
            type: "boolean"
        };

        oMetadata.properties.displaySmall = {
            type: "boolean"
        };

        oMetadata.properties.displayMedium = {
            type: "boolean"
        },

        oMetadata.properties.displayLarge = {
            type: "boolean"
        };

        oMetadata.properties.displayXLarge = {
            type: "boolean"
        };

        oMetadata.properties.displayXXLarge = {
            type: "boolean"
        };

    };

    ResponsiveDisplaySupport.getDisplay = function(sDisplay, sSize, sDisplayValue){
        if(typeof sDisplay === "undefined" || sDisplay === null){
            return "";
        }

        return "d" + (sSize ? "-" + sSize : "") + "-" + (sDisplay ? sDisplayValue : "none");
    };

    ResponsiveDisplaySupport.createStyleClass = function (Constr, oInstance) {
        const sDisplayValue = oInstance.getDisplayValue();

        let sStyle = " " + ResponsiveDisplaySupport.getDisplay(oInstance.getDisplay());
        
        sStyle += " " + ResponsiveDisplaySupport.getDisplay(oInstance.getDisplaySmall(), "sm", sDisplayValue);
        sStyle += " " + ResponsiveDisplaySupport.getDisplay(oInstance.getDisplayMedium(), "md", sDisplayValue);
        sStyle += " " + ResponsiveDisplaySupport.getDisplay(oInstance.getDisplayLarge(), "lg", sDisplayValue);
        sStyle += " " + ResponsiveDisplaySupport.getDisplay(oInstance.getDisplayXLarge(), "xl", sDisplayValue);
        sStyle += " " + ResponsiveDisplaySupport.getDisplay(oInstance.getDisplayXXLarge(), "xxl", sDisplayValue);

        return sStyle;
    };

    return ResponsiveDisplaySupport;
});