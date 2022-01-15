sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ListGroupItem",
    "./ElementHelper",
    "./SelectionSupport",
    "./ListSelectionSupport",
    "./NavContainerSupport",
    "./MarginSupport",
    "./ResponsiveDisplaySupport"
], function (Lib, ControlBase, ListGroupItem, ElementHelper, SelectionSupport, ListSelectionSupport, NavContainerSupport, MarginSupport, ResponsiveDisplaySupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            selectionMode: {
                type: "nep.bootstrap.ListSelectionMode",
                defaultValue: Lib.ListSelectionMode.None
            },

            

            flush: {
                type: "boolean",
                defaultValue: false
            },

            numbered: {
                type: "boolean",
                defaultValue: false
            },

            horizontal: {
                type: "boolean",
                defaultValue: false
            }
        },

        aggregations: {
            items: {
                type: "nep.bootstrap.ListGroupItem",
                multiple: true,
                singularName: "item"
            }
        },

        defaultAggregation: "items",

        events: {
            press: {

            }
        }
    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    SelectionSupport.addMetadata(oMetadata, true);
    //ListSelectionSupport.addMetadata(oMetadata);
    NavContainerSupport.addMetadata(oMetadata);
    ResponsiveDisplaySupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {
        const aItems = oControl.getItems();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());

        if(oControl.getFlush()){
            oRm.class("list-group-flush");
        }
        
        if(oControl.getNumbered()){
            oRm.class("list-group-numbered");
        }

        if(oControl.getHorizontal()){
            oRm.class("list-group-horizontal");
        }

        oRm.openEnd();

        for (let i = 0; i < aItems.length; i++) {
            const oItem = aItems[i];

            oRm.renderControl(oItem);
        }

        oRm.close("div");

    };

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
     * @alias nep.bootstrap.ListGroup
     * 
     */
    const ListGroup = ControlBase.extend("nep.bootstrap.ListGroup", /** @lends nep.bootstrap.ListGroup.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.ListGroup.prototype
         */
        ListGroupProto = ListGroup.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    ListGroup.getStylePrefix = function () {
        return "nbsListGroup";
    };

    ListGroupProto.getDisplayValue = function(){
        return "block";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    ListGroupProto.getAdditionalStyleClass = function () {

        let sClass = "list-group";

        sClass += MarginSupport.createStyleClass(ListGroup, this);
        sClass += ResponsiveDisplaySupport.createStyleClass(ListGroup, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(ListGroup);

    /*
     * END apply helpers
     */

    ListGroupProto.onclick = function (oEvent) {
        const oSourceControl = oEvent.srcControl;
        if(oSourceControl && oSourceControl instanceof ListGroupItem){

            if(oSourceControl.getEnabled()){
                const sSelectionMode = this.getSelectionMode(),
                        aItems = this.getItems();
                
                switch(sSelectionMode){
                    case Lib.ListSelectionMode.Multiple:
                        oSourceControl.setSelected(!oSourceControl.getSelected(), true);
                        this.fireSelectionChange();
                        break;
                    case Lib.ListSelectionMode.Single:
                        for(const oItem of aItems){
                            oItem.setSelected(oItem === oSourceControl, true);
                        }
                        this.fireSelectionChange();
                        break;
                    case Lib.ListSelectionMode.SingleToggle:
                        for(const oItem of aItems){
                            oItem.setSelected((oItem === oSourceControl) && !oItem.getSelected(), true);
                        }
                        this.fireSelectionChange();
                        break;
                }

                this.firePress({
                    item: oSourceControl
                });
            }
        
        }
        
    };

    SelectionSupport.addMethods(ListGroup, true);
    ListSelectionSupport.addMethods(ListGroup);

    NavContainerSupport.addMethods(ListGroup);

    ListGroupProto._supportsMultipleSelection = function(){
        return this.getSelectionMode() === Lib.ListSelectionMode.Multiple;
    };

    //Return Constructor
    return ListGroup;
});