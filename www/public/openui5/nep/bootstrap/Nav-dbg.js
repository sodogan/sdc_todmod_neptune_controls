sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./NavItem",
    "./MarginSupport",
    "./SelectionSupport",
    "./ListSelectionSupport",
    "./NavContainerSupport",
    "./PaddingSupport",
    "./BackgroundSupport",
    "./BorderSupport",
    "./ShadowSupport",
    "./TextSupport",
    "./JustifyContentSupport"
], function (Lib, ControlBase, ElementHelper, NavItem, MarginSupport, SelectionSupport, ListSelectionSupport, NavContainerSupport, PaddingSupport, BackgroundSupport, BorderSupport, ShadowSupport, TextSupport, JustifyContentSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {
            type: {
                type: "nep.bootstrap.NavType",
                defaultValue: Lib.NavType.Default
            },

            selectable: {
                type: "boolean",
                defaultValue: false
            },

            justifyContent: {
                type: "nep.bootstrap.JustifyContent"
            },

            justifyContentSmall: {
                type: "nep.bootstrap.JustifyContent"
            },

            justifyContentMedium: {
                type: "nep.bootstrap.JustifyContent"
            },

            justifyContentLarge: {
                type: "nep.bootstrap.JustifyContent"
            },

            justifyContentXLarge: {
                type: "nep.bootstrap.JustifyContent"
            },

            justifyContentXXLarge: {
                type: "nep.bootstrap.JustifyContent"
            },

            enableFade: {
                type: "boolean",
                defaultValue: false
            },
        },

        aggregations: {
            items: {
                type: "nep.bootstrap.NavItem",
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
    SelectionSupport.addMetadata(oMetadata, false);
    //ListSelectionSupport.addMetadata(oMetadata);
    NavContainerSupport.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    ShadowSupport.addMetadata(oMetadata);
    TextSupport.addMetadata(oMetadata);
    JustifyContentSupport.addMetadata(oMetadata);
    
    const fnRenderer = function (oRm, oControl) {
        const aItems = oControl.getItems(),
            aEnableFade = oControl.getEnableFade(),
            aSelectedItems = oControl.getSelectedItems();

        let bContentPresent = false;

        oRm.openStart("ul", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.openEnd();

        for (let i = 0; i < aItems.length; i++) {
            const oItem = aItems[i];
            oRm.renderControl(oItem);

            if (!bContentPresent && oItem.getContent().length) {
                bContentPresent = true;
            }
        }

        oRm.close("ul");

        if (bContentPresent) {
            let oSelectedItem = null;
            if (aSelectedItems.length) {
                oSelectedItem = aSelectedItems[0];
            }
            oRm.openStart("div", oControl.createSubId("panes"));
            oRm.addClass("tab-content");
            oRm.openEnd();

            for (let i = 0; i < aItems.length; i++) {
                oRm.openStart("div", oControl.createSubId("pane" + i));
                oRm.attr("role", "tab-panel");
                oRm.addClass("tab-pane");

                if (aEnableFade) {
                    oRm.addClass("fade");
                }

                if (oSelectedItem && i === oControl.indexOfItem(oSelectedItem)) {
                    oRm.addClass("show active");
                }
                oRm.addClass(oControl.createStyleClass("pane"));
                oRm.openEnd();

                const aContent = aItems[i].getContent();
                for (const oCon of aContent) {
                    oRm.renderControl(oCon);
                }

                oRm.close("div");
            }

            oRm.close("div");
        }
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
     * @alias nep.bootstrap.Nav
     * 
     */
    const Nav = ControlBase.extend("nep.bootstrap.Nav", /** @lends nep.bootstrap.Nav.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Nav.prototype
         */
        NavProto = Nav.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Nav.getStylePrefix = function () {
        return "nbsNav";
    };


    const mTypeToClass = {
        Default: "nav",
        NavBar: "navbar-nav",
        Tabs: "nav nav-tabs",
        Pills: "nav nav-pills",
        Columns: "nav flex-column"
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    NavProto.getAdditionalStyleClass = function () {

        let sClass = mTypeToClass[this.getType()];

        sClass += MarginSupport.createStyleClass(Nav, this);
        sClass += PaddingSupport.createStyleClass(Nav, this);
        sClass += BackgroundSupport.createStyleClass(Nav, this);
        sClass += BorderSupport.createStyleClass(Nav, this);
        sClass += TextSupport.createStyleClass(Nav, this);
        sClass += ShadowSupport.createStyleClass(Nav, this);
        sClass += JustifyContentSupport.createStyleClass(Nav, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(Nav);

    /*
     * END apply helpers
     */

    NavProto.exit = function () {

    };

    NavProto.onclick = function (oEvent) {
        oEvent.preventDefault();
        let oSrcControl = oEvent.srcControl;
        if (oSrcControl && oSrcControl instanceof NavItem) {
            if (this.getSelectable() && oSrcControl.getEnabled()) {
                const aItems = this.getItems();
                for (const oItem of aItems) {
                    oItem.setSelected(oItem === oSrcControl, true);
                }
                this.fireSelectionChange();
            }
        }

        this.firePress({
            item: oSrcControl
        });
    };

    SelectionSupport.addMethods(Nav, false);
    ListSelectionSupport.addMethods(Nav);
    NavContainerSupport.addMethods(Nav);


    //Return Constructor
    return Nav;
});
