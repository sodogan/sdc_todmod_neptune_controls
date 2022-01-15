sap.ui.define(["./library", "./NavItem", "./ElementHelper"], function (Lib, ControlBase, ElementHelper) {

    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            enabled: {
                type: "boolean",
                defaultValue: true
            },


        },

        aggregations: {
            items: {
                type: "nep.bootstrap.DropdownItem",
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

    const fnRenderer = function (oRm, oControl) {
        const aItems = oControl.getItems();

        oRm.openStart("li", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.openEnd();

        oRm.openStart("a", oControl.createSubId("link"));
        oRm.attr("href", "#");
        oRm.addClass("nav-link dropdown-toggle");
        oRm.attr("data-bs-toggle", "dropdown");
        if (oControl.getSelected()) {
            oRm.class("active");
        }
        if (!oControl.getEnabled()) {
            oRm.class("disabled");
        }
        oRm.openEnd();

        oRm.text(oControl.getText());

        oRm.close("a");

        oRm.openStart("ul");
        oRm.class("dropdown-menu");
        oRm.openEnd();

        for (let i = 0; i < aItems.length; i++) {
            const oItem = aItems[i];
            oRm.renderControl(oItem);
        }

        oRm.close("ul");
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
     * @alias nep.bootstrap.NavItem
     * 
     */
    const DropdownNavItem = ControlBase.extend("nep.bootstrap.DropdownNavItem", /** @lends nep.bootstrap.DropdownNavItem.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.DropdownNavItem.prototype
         */
        DropdownNavItemProto = DropdownNavItem.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    DropdownNavItem.getStylePrefix = function () {
        return "nbsDropdownNavItem";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    DropdownNavItemProto.getAdditionalStyleClass = function () {
        let sClass = "nav-item dropdown";

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(DropdownNavItem);

    DropdownNavItemProto.onclick = function (oEvent) {
        if (this.getEnabled()) {
            this.firePress();
        }
    };

    /*
     * END apply helpers
     */

    //Return Constructor
    return DropdownNavItem;
});