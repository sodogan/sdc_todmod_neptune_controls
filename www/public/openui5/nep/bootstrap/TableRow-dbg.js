sap.ui.define([
    "./library",
    "sap/ui/core/Element",
    "./ElementHelper",
    "./ContextColorSupport"
], function (Lib, ElementBase, ElementHelper, ContextColorSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {
            selected: {
                type: "boolean",
                defaultValue: false
            },

            enabled: {
                type: "boolean",
                defaultValue: true
            },

            key: {
                type: "string"
            }
            
        },

        aggregations: {
            cells: {
                type: "nep.bootstrap.TableCell",
                singularName: "cell",
                multiple: true
            }
        },

        defaultAggregation: "cells"
    };

    ElementHelper.addMetadata(oMetadata);
    ContextColorSupport.addMetadata(oMetadata);

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
     * @alias nep.bootstrap.TableRow
     * 
     */
    const TableRow = ElementBase.extend("nep.bootstrap.TableRow", /** @lends nep.bootstrap.TableRow.prototype */ {
        metadata: oMetadata
    }),
        /**
         * @alias nep.bootstrap.TableRow.prototype
         */
        TableRowProto = TableRow.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    TableRow.getStylePrefix = function () {
        return "nbsTableRow";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    TableRowProto.getAdditionalStyleClass = function () {

        let sClass = "";

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(TableRow);

    /*
     * END apply helpers
     */

    TableRowProto.setSelected = function(bSelected, bSuppress){
        const oParent = this.getParent();
        if(oParent && oParent.changeItemSelected){
            oParent.changeItemSelected(this, bSelected);
        }

        this._setSelected(bSelected, bSuppress);

        return this;
    };

    TableRowProto._setSelected = function(bSelected, bSuppress){
        const elDomRef = this.getDomRef();

        if(elDomRef){
            this.setProperty("selected", bSelected, true);

            elDomRef.classList.toggle("table-active", bSelected);
        }
        else{
            this.setProperty("selected", bSelected, bSuppress);
        }

        return this;
    };

    //Return Constructor
    return TableRow;
});