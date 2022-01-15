sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for overflow.
     * @alias nep.bootstrap.JustifyContentSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const JustifyContentSupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    JustifyContentSupport.addMetadata = function (oMetadata) {

        oMetadata.properties.justifyContent = {
            type: "nep.bootstrap.JustifyContent"
        };

        oMetadata.properties.justifyContentSmall = {
            type: "nep.bootstrap.JustifyContent"
        };

        oMetadata.properties.justifyContentMedium = {
            type: "nep.bootstrap.JustifyContent"
        };

        oMetadata.properties.justifyContentLarge = {
            type: "nep.bootstrap.JustifyContent"
        };

        oMetadata.properties.justifyContentXLarge = {
            type: "nep.bootstrap.JustifyContent"
        };

        oMetadata.properties.justifyContentXXLarge = {
            type: "nep.bootstrap.JustifyContent"
        };
    };

    const mJustifyContentToClass = {
		Start: "start",
		Center: "center",
		End: "end",
		Around: "around",
		Between: "between",
		Evenly: "evenly"
	};

    JustifyContentSupport.createStyleClass = function (Constr, oInstance) {
        const sJustifyContent = oInstance.getJustifyContent(),
            sJustifyContentSmall = oInstance.getJustifyContentSmall(),
            sJustifyContentMedium = oInstance.getJustifyContentMedium(),
            sJustifyContentLarge = oInstance.getJustifyContentLarge(),
            sJustifyContentXLarge = oInstance.getJustifyContentXLarge(),
            sJustifyContentXXLarge = oInstance.getJustifyContentXXLarge();

        let sClass = "";

        if (sJustifyContent){
            sClass += " justify-content-" + mJustifyContentToClass[sJustifyContent];
        }

        if (sJustifyContentSmall){
            sClass += " justify-content-sm-" + mJustifyContentToClass[sJustifyContentSmall];
        }

        if (sJustifyContentMedium){
            sClass += " justify-content-md-" + mJustifyContentToClass[sJustifyContentMedium];
        }

        if (sJustifyContentLarge){
            sClass += " justify-content-lg-" + mJustifyContentToClass[sJustifyContentLarge];
        }

        if (sJustifyContentXLarge){
            sClass += " justify-content-xl-" + mJustifyContentToClass[sJustifyContentXLarge];
        }

        if (sJustifyContentXXLarge){
            sClass += " justify-content-xxl-" + mJustifyContentToClass[sJustifyContentXXLarge];
        }

        return sClass;
    };



    return JustifyContentSupport;
});