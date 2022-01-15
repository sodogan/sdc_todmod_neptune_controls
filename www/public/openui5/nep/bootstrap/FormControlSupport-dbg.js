sap.ui.define(["./library", "./TextSupport"], function (Lib, TextSupport) {

    "use strict";

    /**
     * @class
     * Class that provides support for overflow.
     * @alias nep.bootstrap.FormControlSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const FormControlSupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    FormControlSupport.addMetadata = function (oMetadata) {
        //Properties
        oMetadata.properties.formLayout = {
            type: "nep.bootstrap.FormLayout",
            defaultValue: Lib.FormLayout.Vertical
        };
        
        oMetadata.properties.label = {
            type: "string"
        };

        oMetadata.properties.labelSize = {
            type: "nep.bootstrap.ColumnSpan",
            defaultValue: Lib.ColumnSpan.Col2
        };

        oMetadata.properties.labelSizeSmall = {
            type: "nep.bootstrap.ColumnSpan"
        };

        oMetadata.properties.labelSizeMedium = {
            type: "nep.bootstrap.ColumnSpan"
        },

        oMetadata.properties.labelSizeLarge = {
            type: "nep.bootstrap.ColumnSpan"
        };

        oMetadata.properties.labelSizeXLarge = {
            type: "nep.bootstrap.ColumnSpan"
        };

        oMetadata.properties.labelSizeXXLarge = {
            type: "nep.bootstrap.ColumnSpan"
        };

        oMetadata.properties.labelAlign = {
            type: "nep.bootstrap.TextAlignment",
            defaultValue: Lib.TextAlignment.Start
        };

        oMetadata.properties.labelColor = {
            type: "nep.bootstrap.TextColor"
        };

        oMetadata.properties.labelFontSize = {
            type: "nep.bootstrap.FontSize"
        };

        oMetadata.properties.labelFontWeight = {
            type: "nep.bootstrap.FontWeight"
        };

        //Aggregations
        oMetadata.aggregations.contentBefore = {
            type: "sap.ui.core.Control",
            multiple: "true"
        };

        oMetadata.aggregations.contentAfter = {
            type: "sap.ui.core.Control",
            multiple: "true"
        };
    };

    FormControlSupport.createStyleClass = function (Constr, oInstance) {
        let sClass = "";

        const sFormLayout = oInstance.getFormLayout();
        if (oInstance.getLabel() && sFormLayout === Lib.FormLayout.Floating) {
            sClass += " form-floating";
        }
        
        if (sFormLayout === Lib.FormLayout.Horizontal) {
            sClass += " row";
        }

        return sClass;
    };

    const mLabelSizeToClass = {
        Default: "",
        Col1: "-1",
        Col2: "-2",
        Col3: "-3",
        Col4: "-4",
        Col5: "-5",
        Col6: "-6",
        Col7: "-7",
        Col8: "-8",
        Col9: "-9",
        Col10: "-10",
        Col11: "-11",
        Col12: "-12",
        Auto: "-auto"
    };

    FormControlSupport.startRender = function (oRm, oControl) {

        const sLabel = oControl.getLabel(),
            sLabelSize = oControl.getLabelSize(),
            sLabelSizeSmall = oControl.getLabelSizeSmall(),
            sLabelSizeMedium = oControl.getLabelSizeMedium(),
            sLabelSizeLarge = oControl.getLabelSizeLarge(),
            sLabelSizeXLarge = oControl.getLabelSizeXLarge(),
            sLabelSizeXXLarge = oControl.getLabelSizeXXLarge(),

            sInputId = oControl.createSubId("input"),
            sFormLayout = oControl.getFormLayout(),
            sSize = oControl.getSize(),
            aContentBefore = oControl.getContentBefore(),
            aContentAfter = oControl.getContentAfter(),
            bFloating = sFormLayout === Lib.FormLayout.Floating,
            bHor = sFormLayout === Lib.FormLayout.Horizontal,
            bAdditionalContent = aContentBefore.length > 0 || aContentAfter.length > 0;

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.openEnd();

        if (sLabel && !bFloating) {
            oRm.openStart("label", oControl.createSubId("label"));

            oRm.attr("for", sInputId);

            if (bHor) {
                if (sLabelSize && sLabelSize !== Lib.ColumnSpan.None) {
                    oRm.class("col" + mLabelSizeToClass[sLabelSize]);
                }

                if (sLabelSizeSmall && sLabelSizeSmall !== Lib.ColumnSpan.None) {
                    oRm.class("col-sm" + mLabelSizeToClass[sLabelSizeSmall]);
                }

                if (sLabelSizeMedium && sLabelSizeMedium !== Lib.ColumnSpan.None) {
                    oRm.class("col-md" + mLabelSizeToClass[sLabelSizeMedium]);
                }

                if (sLabelSizeLarge && sLabelSizeLarge !== Lib.ColumnSpan.None) {
                    oRm.class("col-lg" + mLabelSizeToClass[sLabelSizeLarge]);
                }

                if (sLabelSizeXLarge && sLabelSizeXLarge !== Lib.ColumnSpan.None) {
                    oRm.class("col-xl" + mLabelSizeToClass[sLabelSizeXLarge]);
                }

                if (sLabelSizeXXLarge && sLabelSizeXXLarge !== Lib.ColumnSpan.None) {
                    oRm.class("col-xxl" + mLabelSizeToClass[sLabelSizeXXLarge]);
                }

                oRm.class("col-form-label");
            }
            else {
                oRm.class("form-label");
            }

            oRm.addClass(TextSupport.getTextAlignment(oControl.getLabelAlign()));
            oRm.addClass(TextSupport.getTextColor(oControl.getLabelColor()));
            oRm.addClass(TextSupport.getFontSize(oControl.getLabelFontSize()));
            oRm.addClass(TextSupport.getFontWeight(oControl.getLabelFontWeight()));

            oRm.openEnd();
            oRm.write(sLabel);
            oRm.close("label");
        
            if (bHor) {
                oRm.openStart("div");

                if (sLabelSize && sLabelSize !== Lib.ColumnSpan.None) {
                    let vColSize = mLabelSizeToClass[sLabelSize];
                    if (vColSize && vColSize !== "auto") {
                        vColSize = "-" + (12 + Number(vColSize));
                    }
                    oRm.class("col" + vColSize);
                }

                if (sLabelSizeSmall && sLabelSizeSmall !== Lib.ColumnSpan.None) {
                    let vColSize = mLabelSizeToClass[sLabelSizeSmall];
                    if (vColSize && vColSize !== "auto") {
                        vColSize = "-" + (12 + Number(vColSize));
                    }
                    oRm.class("col-sm" + vColSize);
                }

                if (sLabelSizeMedium && sLabelSizeMedium !== Lib.ColumnSpan.None) {
                    let vColSize = mLabelSizeToClass[sLabelSizeMedium];
                    if (vColSize && vColSize !== "auto") {
                        vColSize = "-" + (12 + Number(vColSize));
                    }
                    oRm.class("col-md" + vColSize);
                }

                if (sLabelSizeLarge && sLabelSizeLarge !== Lib.ColumnSpan.None) {
                    let vColSize = mLabelSizeToClass[sLabelSizeLarge];
                    if (vColSize && vColSize !== "auto") {
                        vColSize = "-" + (12 + Number(vColSize));
                    }
                    oRm.class("col-lg" + vColSize);
                }

                if (sLabelSizeXLarge && sLabelSizeXLarge !== Lib.ColumnSpan.None) {
                    let vColSize = mLabelSizeToClass[sLabelSizeXLarge];
                    if (vColSize && vColSize !== "auto") {
                        vColSize = "-" + (12 + Number(vColSize));
                    }
                    oRm.class("col-xl" + vColSize);
                }

                if (sLabelSizeXXLarge && sLabelSizeXXLarge !== Lib.ColumnSpan.None) {
                    let vColSize = mLabelSizeToClass[sLabelSizeXXLarge];
                    if (vColSize && vColSize !== "auto") {
                        vColSize = "-" + (12 + Number(vColSize));
                    }
                    oRm.class("col-xxl" + vColSize);
                }

                oRm.openEnd();
            }
        }

        if (bAdditionalContent) {
            if (sLabel && bFloating) {
                console.warn("contentBefore is not supported when FormLayout is Floating!");
            }
            else{
                oRm.openStart("div", oControl.createSubId("group"));
                oRm.class("input-group");

                if (sSize !== Lib.InputSize.Normal) {
                    oRm.class("input-group-" + Lib.InputSizeToClass[sSize]);
                }

                oRm.openEnd();

                for (let i = 0; i < aContentBefore.length; i++) {
                    const oItem = aContentBefore[i];
                    oRm.renderControl(oItem);
                }
            }
        }
    };

    FormControlSupport.endRender = function (oRm, oControl) {

        const sLabel = oControl.getLabel(),
            sInputId = oControl.createSubId("input"),
            sFormLayout = oControl.getFormLayout(),
            aContentBefore = oControl.getContentBefore(),
            aContentAfter = oControl.getContentAfter(),
            bAdditionalContent = aContentBefore.length > 0 || aContentAfter.length > 0,
            bFloating = sFormLayout === Lib.FormLayout.Floating;

        if (sLabel && bFloating) {
            oRm.openStart("label", oControl.createSubId("label"));
            oRm.class("form-label");
            oRm.attr("for", sInputId);
            oRm.addClass(TextSupport.getTextAlignment(oControl.getLabelAlign()));
            oRm.addClass(TextSupport.getTextColor(oControl.getLabelColor()));
            oRm.addClass(TextSupport.getFontSize(oControl.getLabelFontSize()));
            oRm.addClass(TextSupport.getFontWeight(oControl.getLabelFontWeight()));
            oRm.openEnd();
            oRm.write(sLabel);
            oRm.close("label");
        }

        if (bAdditionalContent) {
            if (sLabel && bFloating) {
                console.warn("contentAfter is not supported when FormLayout is Floating!");
            }
            else{
                for (let i = 0; i < aContentAfter.length; i++) {
                    const oItem = aContentAfter[i];
                    oRm.renderControl(oItem);
                }

                //.input-group
                oRm.close("div");
            }
        } 
        
        if (sLabel && sFormLayout === Lib.FormLayout.Horizontal) {
            //.col-?
            oRm.close("div");
        }

        oRm.close("div");
    };

    return FormControlSupport;
});