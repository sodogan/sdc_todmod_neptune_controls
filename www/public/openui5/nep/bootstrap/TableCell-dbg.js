sap.ui.define([
    "./library",
    "sap/ui/core/Element",
    "./ElementHelper",
    "./ContextColorSupport",
    "./ResponsiveDisplaySupport"
], function (Lib, ElementBase, ElementHelper, ContextColorSupport, ResponsiveDisplaySupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {
            type: {
                type: "nep.bootstrap.TableCellType",
                defaultValue: Lib.TableCellType.Auto
            },

            colspan: {
                type: "int"
            },

            rowspan: {
                type: "int"
            },

            width: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            },

            height: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            },
            
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
    ContextColorSupport.addMetadata(oMetadata);
    ResponsiveDisplaySupport.addMetadata(oMetadata);

    /**
     * Constructor for a new MenuItem instance.
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
     * @alias nep.bootstrap.TableCell
     * 
     */
    const TableCell = ElementBase.extend("nep.bootstrap.TableCell", /** @lends nep.bootstrap.TableCell.prototype */ {
        metadata: oMetadata
    }),
        /**
         * @alias nep.bootstrap.TableCell.prototype
         */
        TableCellProto = TableCell.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    TableCell.getStylePrefix = function () {
        return "nbsTableCell";
    };

    TableCellProto.getDisplayValue = function(){
        return "table-cell";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    TableCellProto.getAdditionalStyleClass = function () {

        let sClass = "";

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(TableCell);

    /*
     * END apply helpers
     */

    //Return Constructor
    return TableCell;
});