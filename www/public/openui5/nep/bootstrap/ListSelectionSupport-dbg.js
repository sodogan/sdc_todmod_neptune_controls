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
    const ListSelectionSupport = {},
        Trait = {};

    Trait.getSelectedItems = function(){
        return this.getItems().filter(o => o.getSelected());
    };

    Trait.setSelectedItems = function(aSelectedItems){
        if(!Array.isArray(aSelectedItems)){
            aSelectedItems = [aSelectedItems];
        }

        const aItems = this.getItems();
        for (let i = 0; i < aItems.length; i++) {
            let oItem = aItems[i];
            oItem.setSelected(aSelectedItems.indexOf(oItem) !== -1);
        }
    };

    Trait.addItem = function(oItem, bSuppress){
        this.changeItemSelected(oItem, oItem.getSelected(), true);

        this.addAggregation("items", oItem, bSuppress);

        return this;
    };

    Trait.insertItem = function(oItem, iIndex, bSuppress){
        this.changeItemSelected(oItem, oItem.getSelected(), true);

        this.insertAggregation("items", oItem, iIndex, bSuppress);

        return this;
    };

    Trait.removeItem = function(vItem, bSuppress){
        const oItem = this.removeAggregation("items", vItem, bSuppress);

        this.changeItemSelected(oItem, false);

        return oItem;
    };

    Trait.removeAllItems = function(bSuppress){
        this.setSelectedKeys(null);

        return this.removeAllAggregation("items", bSuppress);
    };

    ListSelectionSupport.addMethods = function(ElementConstructor){
        const ElementProto = ElementConstructor.prototype;

        ElementProto.getSelectedItems = Trait.getSelectedItems;
        ElementProto.setSelectedItems = Trait.setSelectedItems;

        ElementProto.addItem = Trait.addItem;
        ElementProto.insertItem = Trait.insertItem;
        ElementProto.removeItem = Trait.removeItem;
        ElementProto.removeAllItems = Trait.removeAllItems;
    };

    return ListSelectionSupport;
});