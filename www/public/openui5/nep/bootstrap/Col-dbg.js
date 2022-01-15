sap.ui.define([
        "./library",
        "sap/ui/core/Element",
        "./ElementHelper",
        "./MarginSupport",
        "./PaddingSupport",
        "./BackgroundSupport",
        "./BorderSupport",
        "./ResponsiveDisplaySupport",
        "./OrderSupport",
        "./AlignSelfSupport"
    ],
    function (
        Lib,
        ElementBase,
        ElementHelper,
        MarginSupport,
        PaddingSupport,
        BackgroundSupport,
        BorderSupport,
        ResponsiveDisplaySupport,
        OrderSupport,
        AlignSelfSupport
    ) {

        "use strict";

        const oMetadata = {
            library: "nep.bootstrap",

            properties: {
                size: {
                    type: "nep.bootstrap.ColumnSpan",
                    //defaultValue: Lib.ColumnSpan.Default
                },

                sizeSmall: {
                    type: "nep.bootstrap.ColumnSpan"
                },

                sizeMedium: {
                    type: "nep.bootstrap.ColumnSpan"
                },

                sizeLarge: {
                    type: "nep.bootstrap.ColumnSpan"
                },

                sizeXLarge: {
                    type: "nep.bootstrap.ColumnSpan"
                },

                sizeXXLarge: {
                    type: "nep.bootstrap.ColumnSpan"
                },

                offset: {
                    type: "nep.bootstrap.ColumnOffset"
                },

                offsetSmall: {
                    type: "nep.bootstrap.ColumnOffset"
                },

                offsetMedium: {
                    type: "nep.bootstrap.ColumnOffset"
                },

                offsetLarge: {
                    type: "nep.bootstrap.ColumnOffset"
                },

                offsetXLarge: {
                    type: "nep.bootstrap.ColumnOffset"
                },

                offsetXXLarge: {
                    type: "nep.bootstrap.ColumnOffset"
                },

                width: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: ""
                },

                height: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: ""
                }

            },

            aggregations: {
                content: {
                    type: "sap.ui.core.Control",
                    multiple: true
                }
            },

            defaultAggregation: "content"
        };

        ElementHelper.addMetadata(oMetadata);
        MarginSupport.addMetadata(oMetadata);
        PaddingSupport.addMetadata(oMetadata);
        BackgroundSupport.addMetadata(oMetadata);
        BorderSupport.addMetadata(oMetadata);
        ResponsiveDisplaySupport.addMetadata(oMetadata);
        OrderSupport.addMetadata(oMetadata);
        AlignSelfSupport.addMetadata(oMetadata);

        /**
         * Constructor for a new Col instance.
         * 
         * @param {string} [sId] ID for the new control, generated automatically if no ID is given
         * @param {object} [mSettings] Initial settings for the new control
         * 
         * @class
         * Control for creating menu items.
         * @extends sap.ui.core.Control
         * 
         * @author Jan Philipp Knoeller
         * @version 1.0.8-SNAPSHOT
         * 
         * @constructor
         * @public
         * @alias nep.bootstrap.Col
         * 
         */
        const Col = ElementBase.extend("nep.bootstrap.Col", /** @lends nep.bootstrap.Col.prototype */ {
            metadata: oMetadata
        }),
            /**
             * @alias nep.bootstrap.Col.prototype
             */
            ColProto = Col.prototype;

        /*
         * START apply helpers
         */

        /**
         * Returns the style prefix for this control
         * 
         * @return {string} - The style class prefix
         */
        Col.getStylePrefix = function () {
            return "nbsCol";
        };

        ColProto.getDisplayValue = function(){
            return "block";
        }

        const mSizeToClass = {
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
        },
            mOffsetToClass = {
                Offset1: "1",
                Offset2: "2",
                Offset3: "3",
                Offset4: "4",
                Offset5: "5",
                Offset6: "6",
                Offset7: "7",
                Offset8: "8",
                Offset9: "9",
                Offset10: "10",
                Offset11: "11"
            };

        /**
         * Returns the additional style class(es) for this control.
         * 
         * @return {string} - The additional style classes.
         */
        ColProto.getAdditionalStyleClass = function () {
            let sClass = "",
                sSize = this.getSize(),
                sSizeSmall = this.getSizeSmall(),
                sSizeMedium = this.getSizeMedium(),
                sSizeLarge = this.getSizeLarge(),
                sSizeXLarge = this.getSizeXLarge(),
                sSizeXXLarge = this.getSizeXXLarge(),
                sOffset = this.getOffset(),
                sOffsetSmall = this.getOffsetSmall(),
                sOffsetMedium = this.getOffsetMedium(),
                sOffsetLarge = this.getOffsetLarge(),
                sOffsetXLarge = this.getOffsetXLarge(),
                sOffsetXXLarge = this.getOffsetXXLarge();

            if (sSize && sSize !== Lib.ColumnSpan.None) {
                sClass += " col" + mSizeToClass[sSize];
            }

            if (sSizeSmall && sSizeSmall !== Lib.ColumnSpan.None) {
                sClass += " col-sm" + mSizeToClass[sSizeSmall];
            }

            if (sSizeMedium && sSizeMedium !== Lib.ColumnSpan.None) {
                sClass += " col-md" + mSizeToClass[sSizeMedium];
            }

            if (sSizeLarge && sSizeLarge !== Lib.ColumnSpan.None) {
                sClass += " col-lg" + mSizeToClass[sSizeLarge];
            }

            if (sSizeXLarge && sSizeXLarge !== Lib.ColumnSpan.None) {
                sClass += " col-xl" + mSizeToClass[sSizeXLarge];
            }

            if (sSizeXXLarge && sSizeXXLarge !== Lib.ColumnSpan.None) {
                sClass += " col-xxl" + mSizeToClass[sSizeXXLarge];
            }

            if (!sClass) {
                sClass += " col";
            }

            if (sOffset) {
                sClass += " offset-" + mOffsetToClass[sOffset];
            }

            if (sOffsetSmall) {
                sClass += " offset-sm-" + mOffsetToClass[sOffsetSmall];
            }

            if (sOffsetMedium) {
                sClass += " offset-md-" + mOffsetToClass[sOffsetMedium];
            }

            if (sOffsetLarge) {
                sClass += " offset-lg-" + mOffsetToClass[sOffsetLarge];
            }

            if (sOffsetXLarge) {
                sClass += " offset-xl-" + mOffsetToClass[sOffsetXLarge];
            }

            if (sOffsetXXLarge) {
                sClass += " offset-xxl-" + mOffsetToClass[sOffsetXXLarge];
            }

            sClass += MarginSupport.createStyleClass(Col, this);
            sClass += PaddingSupport.createStyleClass(Col, this);
            sClass += BackgroundSupport.createStyleClass(Col, this);
            sClass += BorderSupport.createStyleClass(Col, this);
            sClass += ResponsiveDisplaySupport.createStyleClass(Col, this);
            sClass += OrderSupport.createStyleClass(Col, this);
            sClass += AlignSelfSupport.createStyleClass(Col, this);

            return sClass;
        };

        //Add the helpers
        ElementHelper.addHelpers(Col);

        /*
         * END apply helpers
         */

        //Return Constructor
        return Col;
    });