sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for Bootstrap Text classes.
     * @alias nep.bootstrap.TextSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const TextSupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    TextSupport.addMetadata = function (oMetadata) {

        oMetadata.properties.textColor = {
            type: "nep.bootstrap.TextColor",
        };

        oMetadata.properties.textAlignment = {
            type: "nep.bootstrap.TextAlignment",
        };

        oMetadata.properties.textWrapping = {
            type: "boolean",
            defaultValue: true
        };

        oMetadata.properties.fontSize = {
            type: "nep.bootstrap.FontSize",
        };

        oMetadata.properties.fontWeight = {
            type: "nep.bootstrap.FontWeight",
        };
    };

    TextSupport.getTextColor = function (textColor) {

        let sStyle = "";

        switch (textColor) {

            case "Primary":
                sStyle = "text-primary";
                break;

            case "Secondary":
                sStyle = "text-secondary";
                break;

            case "Success":
                sStyle = "text-success";
                break;

            case "Danger":
                sStyle = "text-danger";
                break;

            case "Warning":
                sStyle = "text-warning";
                break;

            case "Info":
                sStyle = "text-info";
                break;

            case "Light":
                sStyle = "text-light";
                break;

            case "Dark":
                sStyle = "text-dark";
                break;

            case "Body":
                sStyle = "text-body";
                break;

            case "White":
                sStyle = "text-white";
                break;

            case "Muted":
                sStyle = "text-muted";
                break;

            case "Black50":
                sStyle = "text-black-50";
                break;

            case "White50":
                sStyle = "text-white-50";
                break;

            default:
                break;

        }

        return sStyle;

    }

    TextSupport.getTextAlignment = function (textAlignment) {

        let sStyle = "";

        switch (textAlignment) {

            case "Start":
                sStyle = "text-start";
                break;

            case "Center":
                sStyle = "text-center";
                break;

            case "End":
                sStyle = "text-end";
                break;

            default:
                break;

        }

        return sStyle;

    }

    TextSupport.getFontSize = function (fontSize) {

        let sStyle = "";

        switch (fontSize) {

            case "FontSize1":
                sStyle = "fs-1";
                break;

            case "FontSize2":
                sStyle = "fs-2";
                break;

            case "FontSize3":
                sStyle = "fs-3";
                break;

            case "FontSize4":
                sStyle = "fs-4";
                break;

            case "FontSize5":
                sStyle = "fs-5";
                break;

            case "FontSize6":
                sStyle = "fs-6";
                break;

            default:
                break;

        }

        return sStyle;

    }

    TextSupport.getFontWeight = function (fontWeight) {

        let sStyle = "";

        switch (fontWeight) {

            case "Bold":
                sStyle = "fw-bold";
                break;

            case "Bolder":
                sStyle = "fw-bolder";
                break;

            case "Normal":
                sStyle = "fw-normal";
                break;

            case "Light":
                sStyle = "fw-light";
                break;

            case "Lighter":
                sStyle = "fw-lighter";
                break;

            case "Italic":
                sStyle = "fst-italic";
                break;

            case "NormalStyle":
                sStyle = "fst-normal";
                break;

            default:
                break;

        }

        return sStyle;

    }


    TextSupport.createStyleClass = function (Constr, oInstance) {

        let sStyle = "";

        // Text Color
        let sTextColor = TextSupport.getTextColor(oInstance.getTextColor());
        if (sTextColor) sStyle += " " + sTextColor;

        // Text Alignment
        let sTextAlignment = TextSupport.getTextAlignment(oInstance.getTextAlignment());
        if (sTextAlignment) sStyle += " " + sTextAlignment;

        // Text Wrapping
        if (!oInstance.getTextWrapping()) sStyle += " text-nowrap";

        // Font Size
        let sFontSize = TextSupport.getFontSize(oInstance.getFontSize());
        if (sFontSize) sStyle += " " + sFontSize;

        // Font Weight
        let sFontWeight = TextSupport.getFontWeight(oInstance.getFontWeight());
        if (sFontWeight) sStyle += " " + sFontWeight;        

        return sStyle;

    };

    return TextSupport;

});