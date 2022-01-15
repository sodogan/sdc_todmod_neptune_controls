sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for overflow.
     * @alias nep.bootstrap.SelectionSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const SelectionSupport = {},
        Trait = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    SelectionSupport.addMetadata = function (oMetadata, bMultiSelect) {

        oMetadata.properties.selectedKey = {
            type: "string"
        };

        if(bMultiSelect){
            oMetadata.properties.selectedKeys = {
                type: "string[]"
            };
        }

        if(!oMetadata.events){
            oMetadata.events = {};
        }

        oMetadata.events.selectionChange = {};
    };

    Trait.changeItemSelected = function(oItem, bSelected, bNew){
        this.onSelectionChange && this.onSelectionChange(oItem, bSelected, bNew);
        
        this.changeSelectedKeys(oItem.getKey(), bSelected);
    };

    Trait.changeSelectedKeys = function(sItemKey, bSelected){
        const bMultiple = this._supportsMultipleSelection && this._supportsMultipleSelection(),
                sSelectedKey = this.getSelectedKey();

        if(!sItemKey){
            return;
        }

        if(bSelected){
            if(bMultiple){
                let aSelectedKeys = this.getSelectedKeys();

                if(!aSelectedKeys){
                    aSelectedKeys = [];
                }
                
                if(aSelectedKeys.indexOf(sItemKey) === -1){
                    aSelectedKeys.push(sItemKey);
                    this._setSelectedKeys(aSelectedKeys);
                }
            }
            else{
                if(sItemKey !== sSelectedKey){
                    this._setSelectedKey(sItemKey);
                }    
            }
        }
        else{
            if(bMultiple){
                let aSelectedKeys = this.getSelectedKeys();
                if(aSelectedKeys){
                    const iIndex = aSelectedKeys.indexOf(sItemKey);
                    if(iIndex !== -1){
                        aSelectedKeys.splice(iIndex, 1);
                        this._setSelectedKeys(aSelectedKeys);
                    }
                }
            }
            else{
                if(sItemKey === sSelectedKey){
                    this._setSelectedKey(null);
                }
            }
        }
    };

    Trait.setSelectedKey = function (sSelectedKey) {
        const aItems = this.getItems();
            
        for(const oItem of aItems){
            oItem._setSelected(sSelectedKey && oItem.getKey() === sSelectedKey, true);
        }

        this._setSelectedKey(sSelectedKey);
        
        return this;
    };

    Trait.setSelectedKeys = function (aSelectedKeys) {
        const aItems = this.getItems();
            
        for(const oItem of aItems){
            oItem._setSelected(!!(aSelectedKeys && aSelectedKeys.length && aSelectedKeys.indexOf(oItem.getKey()) !== -1), true);
        }

        this._setSelectedKeys(aSelectedKeys);

        return this;
    };

    Trait._setSelectedKey = function(sSelectedKey){
        if(this.setSelectedKeys){
            this.setProperty("selectedKeys", sSelectedKey ? [sSelectedKey] : null, true);
        }

        this.setProperty("selectedKey", sSelectedKey, true);
    };

    Trait._setSelectedKeys = function (aSelectedKeys) {
        this.setProperty("selectedKey", aSelectedKeys && aSelectedKeys.length ? aSelectedKeys[aSelectedKeys.length-1] : null, true);
        this.setProperty("selectedKeys", aSelectedKeys, true);
    };

    

    SelectionSupport.addMethods = function(ElementConstructor, bMultiSelect){
        const ElementProto = ElementConstructor.prototype;

        ElementProto.changeItemSelected = Trait.changeItemSelected;
        ElementProto.changeSelectedKeys = Trait.changeSelectedKeys;

        ElementProto.setSelectedKey = Trait.setSelectedKey;
        ElementProto._setSelectedKey = Trait._setSelectedKey;

        if(bMultiSelect){
            ElementProto.setSelectedKeys = Trait.setSelectedKeys;
            ElementProto._setSelectedKeys = Trait._setSelectedKeys;
        }
    };

    return SelectionSupport;
});