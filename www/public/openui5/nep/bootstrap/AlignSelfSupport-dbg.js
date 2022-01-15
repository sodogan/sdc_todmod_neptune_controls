sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for responsive visibility.
     * @alias nep.bootstrap.AlignSelfSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const AlignSelfSupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    AlignSelfSupport.addMetadata = function (oMetadata) {

        oMetadata.properties.alignSelf = {
            type: "nep.bootstrap.Align"
        };

        oMetadata.properties.alignSelfSmall = {
            type: "nep.bootstrap.Align"
        };

        oMetadata.properties.alignSelfMedium = {
            type: "nep.bootstrap.Align"
        },

        oMetadata.properties.alignSelfLarge = {
            type: "nep.bootstrap.Align"
        };

        oMetadata.properties.alignSelfXLarge = {
            type: "nep.bootstrap.Align"
        };

        oMetadata.properties.alignSelfXXLarge = {
            type: "nep.bootstrap.Align"
        };

    };

    const mAlignToClass = {
        Start: "start",
        Center: "center",
        End: "end"
    };

    AlignSelfSupport.getAlignSelf = function(sAlign, sSize){
        if(!sAlign){
            return "";
        }

        return "align-self" + (sSize ? "-" + sSize : "") + "-" + mAlignToClass[sAlign];
    };

    AlignSelfSupport.createStyleClass = function (Constr, oInstance) {
        let sStyle = " " + AlignSelfSupport.getAlignSelf(oInstance.getAlignSelf());
        
        sStyle += " " + AlignSelfSupport.getAlignSelf(oInstance.getAlignSelfSmall(), "sm");
        sStyle += " " + AlignSelfSupport.getAlignSelf(oInstance.getAlignSelfMedium(), "md");
        sStyle += " " + AlignSelfSupport.getAlignSelf(oInstance.getAlignSelfLarge(), "lg");
        sStyle += " " + AlignSelfSupport.getAlignSelf(oInstance.getAlignSelfXLarge(), "xl");
        sStyle += " " + AlignSelfSupport.getAlignSelf(oInstance.getAlignSelfXXLarge(), "xxl");

        return sStyle;
    };

    return AlignSelfSupport;
});