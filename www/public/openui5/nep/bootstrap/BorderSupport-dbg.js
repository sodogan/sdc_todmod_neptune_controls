sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for Bootstrap Border classes.
     * @alias nep.bootstrap.BorderSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const BorderSupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    BorderSupport.addMetadata = function (oMetadata) {

        oMetadata.properties.borderColor = {
            type: "nep.bootstrap.BorderColor"
        };

        oMetadata.properties.borderSize = {
            type: "nep.bootstrap.BorderSize"
        };

        oMetadata.properties.borderRadius = {
            type: "nep.bootstrap.BorderRadius"
        };

        oMetadata.properties.border = {
            type: "nep.bootstrap.Border"
        };

    };

    BorderSupport.getBorder = function (border) {

        let sStyle = "";

        switch (border) {

            case "Border":
                sStyle = "border";
                break;

            case "BorderTop":
                sStyle = "border-top border-start-0 border-end-0 border-bottom-0";
                break;

            case "BorderBottom":
                sStyle = "border-bottom border-start-0 border-end-0 border-top-0";
                break;

            case "BorderStart":
                sStyle = "border-start border-top-0 border-end-0 border-bottom-0";
                break;

            case "BorderEnd":
                sStyle = "border-end border-start-0 border-top-0 border-bottom-0";
                break;

            case "BorderStartEnd":
                sStyle = "border-end border-start border-top-0 border-bottom-0";
                break;

            case "BorderTopBottom":
                sStyle = "border-top border-bottom border-start-0 border-end-0";
                break;

            case "Border0":
                sStyle = "border-0";
                break;

            case "BorderTop0":
                sStyle = "border-top-0";
                break;

            case "BorderBottom0":
                sStyle = "border-bottom-0";
                break;

            case "BorderStart0":
                sStyle = "border-start-0";
                break;

            case "BorderEnd0":
                sStyle = "border-end-0";
                break;

            case "BorderStartEnd0":
                sStyle = "border-end-0 border-start-0";
                break;

            case "BorderTopBottom0":
                sStyle = "border-top-0 border-bottom-0";
                break;

        }

        return sStyle;

    }

    BorderSupport.getBorderColor = function (borderColor) {

        let sStyle = "";

        switch (borderColor) {

            case "Primary":
                sStyle += " border-primary";
                break;

            case "Secondary":
                sStyle += " border-secondary";
                break;

            case "Success":
                sStyle += " border-success";
                break;

            case "Danger":
                sStyle += " border-danger";
                break;

            case "Warning":
                sStyle += " border-warning";
                break;

            case "Info":
                sStyle += " border-info";
                break;

            case "Light":
                sStyle += " border-light";
                break;

            case "Dark":
                sStyle += " border-dark";
                break;

            case "White":
                sStyle += " border-white";
                break;

            default:
                break;

        }

        return sStyle;

    }

    BorderSupport.getBorderRadius = function (borderRadius) {

        let sStyle = "";

        switch (borderRadius) {

            case "Rounded0":
                sStyle = "rounded-0";
                break;

            case "Rounded1":
                sStyle = "rounded-1";
                break;

            case "Rounded2":
                sStyle = "rounded-2";
                break;

            case "Rounded3":
                sStyle = "rounded-3";
                break;

            case "RoundedCircle":
                sStyle = "rounded-circle";
                break;

            case "RoundedPill":
                sStyle = "rounded-pill";
                break;
        }

        return sStyle;

    }

    BorderSupport.getBorderSize = function (borderSize) {

        let sStyle = "";

        switch (borderSize) {

            case "Border0":
                sStyle = "border-0";
                break;

            case "Border1":
                sStyle = "border-1";
                break;

            case "Border2":
                sStyle = "border-2";
                break;

            case "Border3":
                sStyle = "border-3";
                break;

            case "Border4":
                sStyle = "border-4";
                break;

            case "Border5":
                sStyle = "border-5";
                break;

        }

        return sStyle;

    }

    BorderSupport.createStyleClass = function (Constr, oInstance) {

        let sStyle = "";

        // Border 
        let sBorder = BorderSupport.getBorder(oInstance.getBorder());
        if (sBorder) sStyle += " " + sBorder;

        // Border Color
        let sBorderColor = BorderSupport.getBorderColor(oInstance.getBorderColor());
        if (sBorderColor) sStyle += " " + sBorderColor;

        // Border Radius
        let sBorderRadius = BorderSupport.getBorderRadius(oInstance.getBorderRadius());
        if (sBorderRadius) sStyle += " " + sBorderRadius;

        // Border Size
        let sBorderSize = BorderSupport.getBorderSize(oInstance.getBorderSize());
        if (sBorderSize) sStyle += " " + sBorderSize;

        return sStyle;

    };

    return BorderSupport;
});