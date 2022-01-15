sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for Bootstrap Background classes.
     * @alias nep.bootstrap.BackgroundSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const BackgroundSupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    BackgroundSupport.addMetadata = function (oMetadata) {

        oMetadata.properties.backgroundColor = {
            type: "nep.bootstrap.BackgroundColor",
        };

        oMetadata.properties.backgroundGradient = {
            type: "boolean",
            defaultValue: false
        };

    };

    BackgroundSupport.getBackgroundColor = function (backgroundColor) {

        let sStyle = "";

        switch (backgroundColor) {

            case "Primary":
                sStyle = "bg-primary";
                break;

            case "Secondary":
                sStyle = "bg-secondary";
                break;

            case "Success":
                sStyle = "bg-success";
                break;

            case "Danger":
                sStyle = "bg-danger";
                break;

            case "Warning":
                sStyle = "bg-warning";
                break;

            case "Info":
                sStyle = "bg-info";
                break;

            case "Light":
                sStyle = "bg-light";
                break;

            case "Dark":
                sStyle = "bg-dark";
                break;

            case "Body":
                sStyle = "bg-body";
                break;

            case "White":
                sStyle = "bg-white";
                break;

            case "Transparent":
                sStyle = "bg-transparent";
                break;

            default:
                break;

        }

        return sStyle;

    }

    BackgroundSupport.createStyleClass = function (Constr, oInstance) {

        let sStyle = "";

        // Background Color
        let sBackgroundColor = BackgroundSupport.getBackgroundColor(oInstance.getBackgroundColor());
        if (sBackgroundColor) sStyle += " " + sBackgroundColor;

        // Background Gradient
        if (oInstance.getBackgroundGradient()) sStyle += " bg-gradient";

        return sStyle;

    };

    return BackgroundSupport;

});