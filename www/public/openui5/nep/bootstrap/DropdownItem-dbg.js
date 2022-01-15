sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport",
    "./PaddingSupport",
    "./BackgroundSupport",
    "./BorderSupport",
    "./TextSupport",
], function (Lib, ControlBase, ElementHelper, MarginSupport, PaddingSupport, BackgroundSupport, BorderSupport, TextSupport) {
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

            enabled: {
                type: "boolean",
                defaultValue: true
            },

            key: {
                type: "string"
            },

        },

        events: {
            press: {

            }
        }
    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    TextSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {

        oRm.openStart("li", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.openEnd();

        oRm.openStart("a");
        oRm.attr("href", "#");
        oRm.addClass("dropdown-item");

        oRm.addClass(TextSupport.getTextAlignment(oControl.getTextAlignment()));
        oRm.addClass(TextSupport.getTextColor(oControl.getTextColor()));
        oRm.addClass(TextSupport.getFontSize(oControl.getFontSize()));
        oRm.addClass(TextSupport.getFontWeight(oControl.getFontWeight()));

        if (oControl.getSelected()){
            oRm.class("active");
        } 
        if (!oControl.getEnabled()){
            oRm.class("disabled");
        }

        oRm.openEnd();

        oRm.text(oControl.getText());

        oRm.close("a");
        oRm.close("li");
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
     * @alias nep.bootstrap.DropdownItem
     * 
     */
    const DropdownItem = ControlBase.extend("nep.bootstrap.DropdownItem", /** @lends nep.bootstrap.DropdownItem.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.DropdownItem.prototype
         */
        DropdownItemProto = DropdownItem.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    DropdownItem.getStylePrefix = function () {
        return "nbsDropdownItem";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    DropdownItemProto.getAdditionalStyleClass = function () {

        let sClass = "";

        sClass += BackgroundSupport.createStyleClass(DropdownItem, this);
        sClass += MarginSupport.createStyleClass(DropdownItem, this);
        sClass += PaddingSupport.createStyleClass(DropdownItem, this);
        sClass += BorderSupport.createStyleClass(DropdownItem, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(DropdownItem);

    /*
     * END apply helpers
     */

    DropdownItemProto.onclick = function (oEvent) {

        if (this.getEnabled()) {
            this.firePress();
            /*
            const parent = this.getParent();
            if (parent) {
                parent.firePress({ item: this });
            } else {
                this.firePress();
            }
            */
        }
    };

    //Return Constructor
    return DropdownItem;
});