sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport",
    "./PaddingSupport",
    "./ContextColorSupport",
    "./BorderSupport",
    "./ResponsiveDisplaySupport"
], function (Lib, ControlBase, ElementHelper, MarginSupport, PaddingSupport, ContextColorSupport, BorderSupport, ResponsiveDisplaySupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {
            text: {
                type: "string"
            },

            selected: {
                type: "boolean",
                defaultValue: false
            },

            /**
             * Defines the icon to be displayed as graphical element within the <code>Button</code>.
             * It can be an image or an icon from the icon font.
             */
             icon: { type: "sap.ui.core.URI", group: "Appearance", defaultValue: "" },

             selectedIcon: { type: "sap.ui.core.URI", group: "Appearance", defaultValue: "" },

             /**
              * Determines whether the icon is displayed before the text.
              */
            iconFirst: { type: "boolean", group: "Appearance", defaultValue: true },

            enabled: {
                type: "boolean",
                defaultValue: true
            },

            key: {
                type: "string"
            },

        },

        associations: {
            targetPage:{
                type:"sap.ui.core.Control"
            }
        },

        events: {
            press: {

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
    BorderSupport.addMetadata(oMetadata);
    ContextColorSupport.addMetadata(oMetadata);
    ResponsiveDisplaySupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {
        const aContent = oControl.getContent(),
            bSelected = oControl.getSelected(),
            sText = oControl.getText();

        let sIcon = oControl.getIcon();

        if(bSelected){
            const sSelectedIcon = oControl.getSelectedIcon();
            if(sSelectedIcon){
                sIcon = sSelectedIcon;
            }
        }

        oRm.openStart("button", oControl);
        oRm.addClass(oControl.createStyleClass());
        
        if(aContent.length){
            oRm.addClass(oControl.createStyleFlag("Custom"));
        }
        
        if (oControl.getSelected()){
            oRm.class("active");
        }

        if (!oControl.getEnabled()){ 
            oRm.attr("disabled", "disabled");
        }

        oRm.openEnd();

        if (sIcon && oControl.getIconFirst()) {
            oRm.write(Lib.createIcon(sIcon, oControl.createStyleClass("icon"), oControl.createSubId("icon")));
        }

        if(sText){
            oRm.openStart("span", oControl.createSubId("text"));
            oRm.class(oControl.createStyleClass("text"));
            oRm.openEnd();
            oRm.text(sText);
            oRm.close("span");
        }

        for (let i = 0; i < aContent.length; i++) {
            oRm.renderControl(aContent[i]);
        }

        if (sIcon && !oControl.getIconFirst()) {
            oRm.write(Lib.createIcon(sIcon, oControl.createStyleClass("icon"), oControl.createSubId("icon")));
        }

        oRm.close("button");
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
     * @alias nep.bootstrap.ListGroupItem
     * 
     */
    const ListGroupItem = ControlBase.extend("nep.bootstrap.ListGroupItem", /** @lends nep.bootstrap.ListGroupItem.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.ListGroupItem.prototype
         */
        ListGroupItemProto = ListGroupItem.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    ListGroupItem.getStylePrefix = function () {
        return "nbsListGroupItem";
    };

    ListGroupItemProto.getDisplayValue = function(){
        return this.getContent().length ? "block" : "flex";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    ListGroupItemProto.getAdditionalStyleClass = function () {

        let sClass = "list-group-item list-group-item-action";

        sClass += ContextColorSupport.createStyleClass(ListGroupItem, this, "list-group-item");
        sClass += MarginSupport.createStyleClass(ListGroupItem, this);
        sClass += PaddingSupport.createStyleClass(ListGroupItem, this);
        sClass += BorderSupport.createStyleClass(ListGroupItem, this);
        sClass += ResponsiveDisplaySupport.createStyleClass(ListGroupItem, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(ListGroupItem);

    /*
     * END apply helpers
     */

    ListGroupItemProto.onclick = function (oEvent) {

        if (this.getEnabled()) {
            this.firePress();
        }

    };

    ListGroupItemProto.setSelected = function(bSelected, bSuppress){
        const oParent = this.getParent();
        if(oParent && oParent.changeItemSelected){
            oParent.changeItemSelected(this, bSelected);
        }

        this._setSelected(bSelected, bSuppress);

        return this;
    };

    ListGroupItemProto._setSelected = function(bSelected, bSuppress){
        const elDomRef = this.getDomRef();

        if(elDomRef){
            this.setProperty("selected", bSelected, true);

            elDomRef.classList.toggle("active", bSelected);

            const sSelectedIcon = this.getSelectedIcon(),
                sIcon = this.getIcon(),
                sIconId = this.createSubId("icon"),
                elIcon = document.getElementById(sIconId);
            
            if(sSelectedIcon){
                if(bSelected){
                    if(elIcon){
                        Lib.changeIcon(sIconId, sSelectedIcon);
                    }
                    else{
                        const elTemp = document.createElement("div");
                        elTemp.innerHTML = Lib.createIcon(sSelectedIcon, this.createStyleClass("icon"), sIconId);
                        if(this.getIconFirst()){
                            elDomRef.insertBefore(elTemp.firstChild, elDomRef.firstChild);
                        }
                        else{
                            elDomRef.appendChild(elTemp.firstChild);
                        }
                    }
                }
                else{
                    if(sIcon){
                        Lib.changeIcon(sIconId, sIcon);
                    }
                    else if(elIcon){
                        elIcon.parentNode.removeChild(elIcon);
                    }
                }
            }
        }
        else{
            this.setProperty("selected", bSelected, bSuppress);
        }

        return this;
    };

    //Return Constructor
    return ListGroupItem;
});