sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for overflow.
     * @alias nep.bootstrap.ListSelectionSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const TableSelectionSupport = {},
        Trait = {};

    Trait.getSelectedRows = function(){
        return this.getRows().filter(o => o.getSelected());
    };

    Trait.setSelectedRows = function(aSelectedRows){
        if(!Array.isArray(aSelectedRows)){
            aSelectedRows = [aSelectedRows];
        }

        const aRows = this.getRows();
        for (let i = 0; i < aRows.length; i++) {
            let oRow = aRows[i];
            oRow.setSelected(aSelectedRows.indexOf(oRow) !== -1);
        }
    };

    Trait.addRow = function(oRow, bSuppress){
        this.changeItemSelected(oRow, oRow.getSelected(), true);

        this.addAggregation("rows", oRow, bSuppress);

        return this;
    };

    Trait.insertRow = function(oRow, iIndex, bSuppress){
        this.changeItemSelected(oRow, oRow.getSelected(), true);

        this.insertAggregation("rows", oRow, iIndex, bSuppress);

        return this;
    };

    Trait.removeRow = function(vRow, bSuppress){
        const oRow = this.removeAggregation("rows", vRow, bSuppress);

        this.changeItemSelected(oRow, false);

        return oRow;
    };

    Trait.removeAllRows = function(bSuppress){
        this.setSelectedKeys(null);

        return this.removeAllAggregation("rows", bSuppress);
    };

    TableSelectionSupport.addMethods = function(ElementConstructor){
        const ElementProto = ElementConstructor.prototype;

        ElementProto.getSelectedRows = Trait.getSelectedRows;
        ElementProto.setSelectedRows = Trait.setSelectedRows;

        ElementProto.addRow = Trait.addRow;
        ElementProto.insertRow = Trait.insertRow;
        ElementProto.removeRow = Trait.removeRow;
        ElementProto.removeAllRows = Trait.removeAllRows;
    };

    return TableSelectionSupport;
});