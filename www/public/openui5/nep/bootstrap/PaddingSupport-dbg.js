sap.ui.define(["./library"], function (Lib) {
    "use strict";

    /**
     * @class
     * Class that provides support for Bootstrap Padding classes.
     * @alias nep.bootstrap.PaddingSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const PaddingSupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    PaddingSupport.addMetadata = function (oMetadata) {

        oMetadata.properties.padding = {
            type: "nep.bootstrap.Padding"
        };

        oMetadata.properties.paddingSmall = {
            type: "nep.bootstrap.Padding"
        };

        oMetadata.properties.paddingMedium = {
            type: "nep.bootstrap.Padding"
        };

        oMetadata.properties.paddingLarge = {
            type: "nep.bootstrap.Padding"
        };

        oMetadata.properties.paddingXLarge = {
            type: "nep.bootstrap.Padding"
        };

        oMetadata.properties.paddingXXLarge = {
            type: "nep.bootstrap.Padding"
        };

    };

    PaddingSupport._paddingBase = function(sPadding){
        switch (sPadding) {

            case "PaddingAuto":
                return "p-{bp}auto";

            case "PaddingStartAuto":
                return "ps-{bp}auto";

            case "PaddingEndAuto":
                return "pe-{bp}auto";

            case "PaddingTopAuto":
                return "pt-{bp}auto";

            case "PaddingBottomAuto":
                return "pb-{bp}auto";

            case "PaddingStartEndAuto":
                return "px-{bp}auto";

            case "PaddingTopBottomAuto":
                return "py-{bp}auto";


            case "Padding5":
                return "p-{bp}5";

            case "PaddingStart5":
                return "ps-{bp}5";

            case "PaddingEnd5":
                return "pe-{bp}5";

            case "PaddingTop5":
                return "pt-{bp}5";

            case "PaddingBottom5":
                return "pb-{bp}5";

            case "PaddingStartEnd5":
                return "px-{bp}5";

            case "PaddingTopBottom5":
                return "py-{bp}5";


            case "Padding4":
                return "p-{bp}4";

            case "PaddingStart4":
                return "ps-{bp}4";

            case "PaddingEnd4":
                return "pe-{bp}4";

            case "PaddingTop4":
                return "pt-{bp}4";

            case "PaddingBottom4":
                return "pb-{bp}4";

            case "PaddingStartEnd4":
                return "px-{bp}4";

            case "PaddingTopBottom4":
                return "py-{bp}4";


            case "Padding3":
                return "p-{bp}3";

            case "PaddingStart3":
                return "ps-{bp}3";

            case "PaddingEnd3":
                return "pe-{bp}3";

            case "PaddingTop3":
                return "pt-{bp}3";

            case "PaddingBottom3":
                return "pb-{bp}3";

            case "PaddingStartEnd3":
                return "px-{bp}3";

            case "PaddingTopBottom3":
                return "py-{bp}3";


            case "Padding2":
                return "p-{bp}2";

            case "PaddingStart2":
                return "ps-{bp}2";

            case "PaddingEnd2":
                return "pe-{bp}2";

            case "PaddingTop2":
                return "pt-{bp}2";

            case "PaddingBottom2":
                return "pb-{bp}2";

            case "PaddingStartEnd2":
                return "px-{bp}2";

            case "PaddingTopBottom2":
                return "py-{bp}2";


            case "Padding1":
                return "p-{bp}1";

            case "PaddingStart1":
                return "ps-{bp}1";

            case "PaddingEnd1":
                return "pe-{bp}1";

            case "PaddingTop1":
                return "pt-{bp}1";

            case "PaddingBottom1":
                return "pb-{bp}1";

            case "PaddingStartEnd1":
                return "px-{bp}1";

            case "PaddingTopBottom1":
                return "py-{bp}1";


            case "Padding0":
                return "p-{bp}0";

            case "PaddingStart0":
                return "ps-{bp}0";

            case "PaddingEnd0":
                return "pe-{bp}0";

            case "PaddingTop0":
                return "pt-{bp}0";

            case "PaddingBottom0":
                return "pb-{bp}0";

            case "PaddingStartEnd0":
                return "px-{bp}0";

            case "PaddingTopBottom0":
                return "py-{bp}0";

            default:
                throw new Error("Invalid Padding!");
        }
    };

    PaddingSupport.getPadding = function(sPadding, sSize){
        if(!sPadding){
            return "";
        }

        let sBase = this._paddingBase(sPadding);

        if(!sSize){
            sSize = "";
        }
        else{
            sSize += "-";
        }

        return sBase.replace("{bp}", sSize);
    };

    PaddingSupport.createStyleClass = function (Constr, oInstance) {

        let sStyle = ""; 
        
        sStyle += " " + this.getPadding(oInstance.getPadding());
        sStyle += " " + this.getPadding(oInstance.getPaddingSmall(), "sm");
        sStyle += " " + this.getPadding(oInstance.getPaddingMedium(), "md");
        sStyle += " " + this.getPadding(oInstance.getPaddingLarge(), "lg");
        sStyle += " " + this.getPadding(oInstance.getPaddingXLarge(), "xl");
        sStyle += " " + this.getPadding(oInstance.getPaddingXXLarge(), "xxl");

        return  sStyle;

    };



    return PaddingSupport;

});