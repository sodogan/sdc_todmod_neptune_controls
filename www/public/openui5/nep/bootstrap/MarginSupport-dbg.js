sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for Bootstrap Margin classes.
     * @alias nep.bootstrap.MarginSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const MarginSupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    MarginSupport.addMetadata = function (oMetadata) {

        oMetadata.properties.margin = {
            type: "nep.bootstrap.Margin"
        };

        oMetadata.properties.marginSmall = {
            type: "nep.bootstrap.Margin"
        };

        oMetadata.properties.marginMedium = {
            type: "nep.bootstrap.Margin"
        };

        oMetadata.properties.marginLarge = {
            type: "nep.bootstrap.Margin"
        };

        oMetadata.properties.marginXLarge = {
            type: "nep.bootstrap.Margin"
        };

        oMetadata.properties.marginXXLarge = {
            type: "nep.bootstrap.Margin"
        };

    };

    MarginSupport._marginBase = function(sMargin){
        switch (sMargin) {

            case "MarginAuto":
                return "m-{bp}auto";

            case "MarginStartAuto":
                return "ms-{bp}auto";

            case "MarginEndAuto":
                return "me-{bp}auto";

            case "MarginTopAuto":
                return "mt-{bp}auto";

            case "MarginBottomAuto":
                return "mb-{bp}auto";

            case "MarginStartEndAuto":
                return "mx-{bp}auto";

            case "MarginTopBottomAuto":
                return "my-{bp}auto";


            case "Margin5":
                return "m-{bp}5";

            case "MarginStart5":
                return "ms-{bp}5";

            case "MarginEnd5":
                return "me-{bp}5";

            case "MarginTop5":
                return "mt-{bp}5";

            case "MarginBottom5":
                return "mb-{bp}5";

            case "MarginStartEnd5":
                return "mx-{bp}5";

            case "MarginTopBottom5":
                return "my-{bp}5";


            case "Margin4":
                return "m-{bp}4";

            case "MarginStart4":
                return "ms-{bp}4";

            case "MarginEnd4":
                return "me-{bp}4";

            case "MarginTop4":
                return "mt-{bp}4";

            case "MarginBottom4":
                return "mb-{bp}4";

            case "MarginStartEnd4":
                return "mx-{bp}4";

            case "MarginTopBottom4":
                return "my-{bp}4";


            case "Margin3":
                return "m-{bp}3";

            case "MarginStart3":
                return "ms-{bp}3";

            case "MarginEnd3":
                return "me-{bp}3";

            case "MarginTop3":
                return "mt-{bp}3";

            case "MarginBottom3":
                return "mb-{bp}3";

            case "MarginStartEnd3":
                return "mx-{bp}3";

            case "MarginTopBottom3":
                return "my-{bp}3";


            case "Margin2":
                return "m-{bp}2";

            case "MarginStart2":
                return "ms-{bp}2";

            case "MarginEnd2":
                return "me-{bp}2";

            case "MarginTop2":
                return "mt-{bp}2";

            case "MarginBottom2":
                return "mb-{bp}2";

            case "MarginStartEnd2":
                return "mx-{bp}2";

            case "MarginTopBottom2":
                return "my-{bp}2";


            case "Margin1":
                return "m-{bp}1";

            case "MarginStart1":
                return "ms-{bp}1";

            case "MarginEnd1":
                return "me-{bp}1";

            case "MarginTop1":
                return "mt-{bp}1";

            case "MarginBottom1":
                return "mb-{bp}1";

            case "MarginStartEnd1":
                return "mx-{bp}1";

            case "MarginTopBottom1":
                return "my-{bp}1";


            case "Margin0":
                return "m-{bp}0";

            case "MarginStart0":
                return "ms-{bp}0";

            case "MarginEnd0":
                return "me-{bp}0";

            case "MarginTop0":
                return "mt-{bp}0";

            case "MarginBottom0":
                return "mb-{bp}0";

            case "MarginStartEnd0":
                return "mx-{bp}0";

            case "MarginTopBottom0":
                return "my-{bp}0";
            default:
                throw new Error("Invalid Margin!");
        }
    }

    MarginSupport.getMargin = function(sMargin, sSize){
        if(!sMargin){
            return "";
        }

        let sBase = this._marginBase(sMargin);

        if(!sSize){
            sSize = "";
        }
        else{
            sSize += "-";
        }

        return sBase.replace("{bp}", sSize);
    };



    MarginSupport.createStyleClass = function (Constr, oInstance) {

        let sStyle = ""; 
        
        sStyle += " " + this.getMargin(oInstance.getMargin());
        sStyle += " " + this.getMargin(oInstance.getMarginSmall(), "sm");
        sStyle += " " + this.getMargin(oInstance.getMarginMedium(), "md");
        sStyle += " " + this.getMargin(oInstance.getMarginLarge(), "lg");
        sStyle += " " + this.getMargin(oInstance.getMarginXLarge(), "xl");
        sStyle += " " + this.getMargin(oInstance.getMarginXXLarge(), "xxl");

        return  sStyle;
    };



    return MarginSupport;
});