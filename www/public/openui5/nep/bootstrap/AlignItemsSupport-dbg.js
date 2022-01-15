sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for responsive visibility.
     * @alias nep.bootstrap.AlignItemsSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const AlignItemsSupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    AlignItemsSupport.addMetadata = function (oMetadata) {

        oMetadata.properties.alignItems = {
            type: "nep.bootstrap.Align"
        };

        oMetadata.properties.alignItemsSmall = {
            type: "nep.bootstrap.Align"
        };

        oMetadata.properties.alignItemsMedium = {
            type: "nep.bootstrap.Align"
        },

        oMetadata.properties.alignItemsLarge = {
            type: "nep.bootstrap.Align"
        };

        oMetadata.properties.alignItemsXLarge = {
            type: "nep.bootstrap.Align"
        };

        oMetadata.properties.alignItemsXXLarge = {
            type: "nep.bootstrap.Align"
        };

    };

    const mAlignToClass = {
        Start: "start",
        Center: "center",
        End: "end"
    };

    AlignItemsSupport.getAlignItems = function(sAlign, sSize){
        if(!sAlign){
            return "";
        }

        return "align-items" + (sSize ? "-" + sSize : "") + "-" + mAlignToClass[sAlign];
    };

    AlignItemsSupport.createStyleClass = function (Constr, oInstance) {
        let sStyle = " " + AlignItemsSupport.getAlignItems(oInstance.getAlignItems());
        
        sStyle += " " + AlignItemsSupport.getAlignItems(oInstance.getAlignItemsSmall(), "sm");
        sStyle += " " + AlignItemsSupport.getAlignItems(oInstance.getAlignItemsMedium(), "md");
        sStyle += " " + AlignItemsSupport.getAlignItems(oInstance.getAlignItemsLarge(), "lg");
        sStyle += " " + AlignItemsSupport.getAlignItems(oInstance.getAlignItemsXLarge(), "xl");
        sStyle += " " + AlignItemsSupport.getAlignItems(oInstance.getAlignItemsXXLarge(), "xxl");

        return sStyle;
    };

    return AlignItemsSupport;
});