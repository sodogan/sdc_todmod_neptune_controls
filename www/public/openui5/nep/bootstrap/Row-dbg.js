sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport",
    "./PaddingSupport",
    "./BackgroundSupport",
    "./BorderSupport",
    "./JustifyContentSupport",
    "./AlignItemsSupport"
], function (Lib, ControlBase, ElementHelper, MarginSupport, PaddingSupport, BackgroundSupport, BorderSupport, JustifyContentSupport, AlignItemsSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {
            columnsPerRow: {
                type: "nep.bootstrap.ColumnsPerRow"
            },

            columnsPerRowSmall: {
                type: "nep.bootstrap.ColumnsPerRow"
            },

            columnsPerRowMedium: {
                type: "nep.bootstrap.ColumnsPerRow"
            },

            columnsPerRowLarge: {
                type: "nep.bootstrap.ColumnsPerRow"
            },

            columnsPerRowXLarge: {
                type: "nep.bootstrap.ColumnsPerRow"
            },

            columnsPerRowXXLarge: {
                type: "nep.bootstrap.ColumnsPerRow"
            },

            gutter: {
                type: "nep.bootstrap.GutterSize"
            },

            gutterSmall: {
                type: "nep.bootstrap.GutterSize"
            },

            gutterMedium: {
                type: "nep.bootstrap.GutterSize"
            },

            gutterLarge: {
                type: "nep.bootstrap.GutterSize"
            },

            gutterXLarge: {
                type: "nep.bootstrap.GutterSize"
            },

            gutterXXLarge: {
                type: "nep.bootstrap.GutterSize"
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
            columns: {
                type: "nep.bootstrap.Col",
                singularName: "column",
                multiple: true
            }
        },

        defaultAggregation: "columns"
    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    JustifyContentSupport.addMetadata(oMetadata);
    AlignItemsSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {
        let aColumns = oControl.getColumns();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());

        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());

        oRm.openEnd();

        for (let i = 0; i < aColumns.length; i++) {
            let oCol = aColumns[i],
                aContent = oCol.getContent();

            oRm.openStart("div", oCol);
            oRm.addClass(oCol.createStyleClass());
            oRm.openEnd();

            for (let i = 0; i < aContent.length; i++) {
                oRm.renderControl(aContent[i]);
            }

            oRm.close("div");
        }

        oRm.close("div");
    };

    /**
     * Constructor for a new Row instance.
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
     * @alias nep.bootstrap.Row
     * 
     */
    const Row = ControlBase.extend("nep.bootstrap.Row", /** @lends nep.bootstrap.Row.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Row.prototype
         */
        RowProto = Row.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Row.getStylePrefix = function () {
        return "nbsRow";
    };

    const mRowColToClass = {
        Col1: "1",
        Col2: "2",
        Col3: "3",
        Col4: "4",
        Col5: "5",
        Col6: "6",
        Auto: "auto"
    }

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    RowProto.getAdditionalStyleClass = function () {

        let sColumnsPerRow = this.getColumnsPerRow(),
            sColumnsPerRowSmall = this.getColumnsPerRowSmall(),
            sColumnsPerRowMedium = this.getColumnsPerRowMedium(),
            sColumnsPerRowLarge = this.getColumnsPerRowLarge(),
            sColumnsPerRowXLarge = this.getColumnsPerRowXLarge(),
            sColumnsPerRowXXLarge = this.getColumnsPerRowXXLarge(),

            sGutter = this.getGutter(),
            sGutterSmall = this.getGutterSmall(),
            sGutterMedium = this.getGutterMedium(),
            sGutterLarge = this.getGutterLarge(),
            sGutterXLarge = this.getGutterXLarge(),
            sGutterXXLarge = this.getGutterXXLarge(),

            sClass = "row";

        if (sColumnsPerRow) {
            sClass += " row-cols-" + mRowColToClass[sColumnsPerRow];
        }

        if (sColumnsPerRowSmall) {
            sClass += " row-cols-sm-" + mRowColToClass[sColumnsPerRowSmall];
        }

        if (sColumnsPerRowMedium) {
            sClass += " row-cols-md-" + mRowColToClass[sColumnsPerRowMedium];
        }

        if (sColumnsPerRowLarge) {
            sClass += " row-cols-lg-" + mRowColToClass[sColumnsPerRowLarge];
        }

        if (sColumnsPerRowXLarge) {
            sClass += " row-cols-xl-" + mRowColToClass[sColumnsPerRowXLarge];
        }

        if (sColumnsPerRowXXLarge) {
            sClass += " row-cols-xxl-" + mRowColToClass[sColumnsPerRowXXLarge];
        }

        if (sGutter) {
            sClass += Row.createGutterStyleClass(sGutter);
        }

        if (sGutterSmall) {
            sClass += Row.createGutterStyleClass(sGutterSmall);
        }

        if (sGutterMedium) {
            sClass += Row.createGutterStyleClass(sGutterMedium);
        }

        if (sGutterLarge) {
            sClass += Row.createGutterStyleClass(sGutterLarge);
        }

        if (sGutterXLarge) {
            sClass += Row.createGutterStyleClass(sGutterXLarge);
        }

        if (sGutterXXLarge) {
            sClass += Row.createGutterStyleClass(sGutterXXLarge);
        }

        sClass += MarginSupport.createStyleClass(Row, this);
        sClass += PaddingSupport.createStyleClass(Row, this);
        sClass += BackgroundSupport.createStyleClass(Row, this);
        sClass += BorderSupport.createStyleClass(Row, this);
        sClass += JustifyContentSupport.createStyleClass(Row, this);
        sClass += AlignItemsSupport.createStyleClass(Row, this);

        return sClass;
    };

    Row.createGutterStyleClass = function (sGutter) {
        switch (sGutter) {

            case "Gutter0":
                return " g-0";
            case "Gutter1":
                return " g-1";
            case "Gutter2":
                return " g-2";
            case "Gutter3":
                return " g-3";
            case "Gutter4":
                return " g-4";
            case "Gutter5":
                return " g-5";

            case "GutterX0":
                return " gx-0";
            case "GutterX1":
                return " gx-1";
            case "GutterX2":
                return " gx-2";
            case "GutterX3":
                return " gx-3";
            case "GutterX4":
                return " gx-4";
            case "GutterX5":
                return " gx-5";

            case "GutterY0":
                return " gy-0";
            case "GutterY1":
                return " gy-1";
            case "GutterY2":
                return " gy-2";
            case "GutterY3":
                return " gy-3";
            case "GutterY4":
                return " gy-4";
            case "GutterY5":
                return " gy-5";

            default:
                return "";
        }

    };

    //Add the helpers
    ElementHelper.addHelpers(Row);

    /*
     * END apply helpers
     */

    //Return Constructor
    return Row;
});