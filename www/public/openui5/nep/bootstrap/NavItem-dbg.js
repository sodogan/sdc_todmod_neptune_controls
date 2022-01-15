sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport",
    "./PaddingSupport",
    "./BackgroundSupport",
    "./BorderSupport",
    "./TextSupport",
    "./ShadowSupport",
    "./ResponsiveDisplaySupport"
], function (Lib, ControlBase, ElementHelper, MarginSupport, PaddingSupport, BackgroundSupport, BorderSupport, TextSupport, ShadowSupport, ResponsiveDisplaySupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {
            text: {
                type: "string"
            },

            /**
             * Defines the icon to be displayed as graphical element within the <code>Button</code>.
             * It can be an image or an icon from the icon font.
             */
            icon: {
                type: "sap.ui.core.URI",
                group: "Appearance",
                defaultValue: ""
            },

            selectedIcon: {
                type: "sap.ui.core.URI",
                group: "Appearance",
                defaultValue: ""
            },

            /**
             * Determines whether the icon is displayed before the text.
             */
            iconFirst: {
                type: "boolean",
                group: "Appearance",
                defaultValue: true
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

            dropdownColorScheme: {
                type: "nep.bootstrap.ColorScheme",
                defaultValue: Lib.ColorScheme.Light
            },

            dropdownDirection: {
                type: "nep.bootstrap.DropdownDirection"
            },

            dropdownMenuAlignment: {
                type: "nep.bootstrap.DropdownMenuAligment",
                defaultValue: Lib.DropdownMenuAligment.Start
            },

        },

        associations: {
            targetPage: {
                type: "sap.ui.core.Control"
            }
        },

        aggregations: {
            items: {
                type: ["nep.bootstrap.DropdownItem", "nep.bootstrap.HorizontalLine"],
                multiple: true,
                singularName: "item"
            },
            content: {
                type: "sap.ui.core.Control",
                multiple: true
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
    PaddingSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    TextSupport.addMetadata(oMetadata);
    ShadowSupport.addMetadata(oMetadata);
    ResponsiveDisplaySupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {

        const aItems = oControl.getItems(),
            aContent = oControl.getContent(),
            sDropdownColorScheme = oControl.getDropdownColorScheme(),
            sDropdownMenuAlignment = oControl.getDropdownMenuAlignment(),
            bSelected = oControl.getSelected();

        let sIcon = oControl.getIcon();

        if (bSelected) {
            const sSelectedIcon = oControl.getSelectedIcon();
            if (sSelectedIcon) {
                sIcon = sSelectedIcon;
            }
        }

        oRm.openStart("li", oControl);
        oRm.addClass(oControl.createStyleClass());

        if (aItems.length) {
            oRm.addClass("dropdown");
        }

        oRm.openEnd();

        oRm.openStart("a", oControl.createSubId("link"));
        oRm.attr("href", "#");
        oRm.addClass("nav-link");
        oRm.addClass(oControl.createStyleClass("link"));

        if (oControl.getSelected()) {
            oRm.class("active");
        }

        if (!oControl.getEnabled()) {
            oRm.class("disabled");
        }

        oRm.addClass(TextSupport.getTextAlignment(oControl.getTextAlignment()));
        oRm.addClass(TextSupport.getTextColor(oControl.getTextColor()));
        oRm.addClass(TextSupport.getFontSize(oControl.getFontSize()));
        oRm.addClass(TextSupport.getFontWeight(oControl.getFontWeight()));

        if (aItems.length) {
            oRm.addClass("dropdown-toggle");
            oRm.attr("data-bs-toggle", "dropdown");
        }
        else if (aContent.length) {
            oRm.attr("data-bs-toggle", "tab");
            const oParent = oControl.getParent();
            if (oParent) {
                oRm.attr("data-bs-target", "#" + oParent.createSubId("pane" + oParent.indexOfItem(oControl)));
            }
        }

        oRm.openEnd();

        if (sIcon && oControl.getIconFirst()) {
            oRm.write(Lib.createIcon(sIcon, oControl.createStyleClass("icon"), oControl.createSubId("icon")));
        }

        oRm.openStart("span", oControl.createSubId("text"));
        oRm.class(oControl.createStyleClass("text"));
        oRm.openEnd();
        oRm.text(oControl.getText());
        oRm.close("span");

        if (sIcon && !oControl.getIconFirst()) {
            oRm.write(Lib.createIcon(sIcon, oControl.createStyleClass("icon"), oControl.createSubId("icon")));
        }

        oRm.close("a");

        if (aItems.length) {

            oRm.openStart("ul");
            oRm.class("dropdown-menu");

            if (sDropdownColorScheme === "Dark") {
                oRm.class("dropdown-menu-dark");
            }

            if (sDropdownMenuAlignment === "End") {
                oRm.class("dropdown-menu-end");
            }

            oRm.openEnd();

            for (let i = 0; i < aItems.length; i++) {
                const oItem = aItems[i];

                if (oItem.getMetadata().getElementName() === "nep.bootstrap.HorizontalLine") {

                    oRm.openStart("li");
                    oRm.openEnd();

                    oRm.openStart("hr");
                    oRm.class("dropdown-divider");
                    oRm.openEnd();

                    oRm.close("li");

                } else {
                    oRm.renderControl(oItem);
                }
            }

            oRm.close("ul");

        }

        oRm.close("li");
    };

    /**
     * Constructor for a new NavItem instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating Bootstrap Nav items.
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
    const NavItem = ControlBase.extend("nep.bootstrap.NavItem", /** @lends nep.bootstrap.NavItem.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.NavItem.prototype
         */
        NavItemProto = NavItem.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    NavItem.getStylePrefix = function () {
        return "nbsNavItem";
    };

    NavItemProto.getDisplayValue = function(){
        return "flex";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    NavItemProto.getAdditionalStyleClass = function () {
        let sClass = "nav-item";

        sClass += MarginSupport.createStyleClass(NavItem, this);
        sClass += PaddingSupport.createStyleClass(NavItem, this);
        sClass += BackgroundSupport.createStyleClass(NavItem, this);
        sClass += BorderSupport.createStyleClass(NavItem, this);
        sClass += TextSupport.createStyleClass(NavItem, this);
        sClass += ShadowSupport.createStyleClass(NavItem, this);
        sClass += ResponsiveDisplaySupport.createStyleClass(NavItem, this);
        
        switch (this.getDropdownDirection()) {

            case "Top":
                sClass += " dropup";
                break;

            case "Start":
                sClass += " dropstart";
                break;

            case "End":
                sClass += " dropend";
                break;

            default:
                break;

        }

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(NavItem);

    /*
     * END apply helpers
     */

    NavItemProto.onclick = function (oEvent) {
        if (this.getEnabled()) {
            this.firePress();
        }
    };

    NavItemProto.setSelected = function (bSelected, bSuppress) {
        const oParent = this.getParent();
        if (oParent && oParent.changeItemSelected) {
            oParent.changeItemSelected(this, bSelected);
        }

        this._setSelected(bSelected, bSuppress);

        return this;
    };

    NavItemProto._setSelected = function (bSelected, bSuppress) {
        const elNavLink = document.getElementById(this.createSubId("link"));
        if (elNavLink) {
            this.setProperty("selected", bSelected, true);
            elNavLink.classList.toggle("active", bSelected);

            const sSelectedIcon = this.getSelectedIcon(),
                sIcon = this.getIcon(),
                sIconId = this.createSubId("icon"),
                elIcon = document.getElementById(sIconId);

            if (sSelectedIcon) {
                if (bSelected) {
                    if (elIcon) {
                        Lib.changeIcon(sIconId, sSelectedIcon);
                    }
                    else {
                        const elTemp = document.createElement("div");
                        elTemp.innerHTML = Lib.createIcon(sSelectedIcon, this.createStyleClass("icon"), sIconId);
                        if (this.getIconFirst()) {
                            elNavLink.insertBefore(elTemp.firstChild, elNavLink.firstChild);
                        }
                        else {
                            elNavLink.appendChild(elTemp.firstChild);
                        }
                    }
                }
                else {
                    if (sIcon) {
                        Lib.changeIcon(sIconId, sIcon);
                    }
                    else if (elIcon) {
                        elIcon.parentNode.removeChild(elIcon);
                    }
                }
            }
        }
        else {
            this.setProperty("selected", bSelected, bSuppress);
        }

        return this;
    };

    //Return Constructor
    return NavItem;
});