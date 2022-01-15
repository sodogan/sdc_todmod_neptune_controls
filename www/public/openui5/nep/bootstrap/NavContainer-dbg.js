sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./BackgroundSupport",
], function (Lib, ControlBase, ElementHelper, BackgroundSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {


        },

        events: {

        },

        aggregations: {
            pages: {
                multiple: true,
                singularName: "page",
                type: "sap.ui.core.Control"
            }
        },

        defaultAggregation: "pages"

    };

    ElementHelper.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {
        //console.log("NavContainer start rendering ...");

        let oCurrentPage = oControl.getCurrentPage();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.openEnd();

        if (oCurrentPage) {
            oRm.renderControl(oCurrentPage);
        }

        oRm.close("div");

        //console.log("NavContainer rendering finished.");
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
     * @alias nep.bootstrap.NavContainer
     * 
     */
    const NavContainer = ControlBase.extend("nep.bootstrap.NavContainer", /** @lends nep.bootstrap.NavContainer.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.NavContainer.prototype
         */
        NavContainerProto = NavContainer.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    NavContainer.getStylePrefix = function () {
        return "nbsNavContainer";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    NavContainerProto.getAdditionalStyleClass = function () {

        let sClass = "";

        sClass += BackgroundSupport.createStyleClass(NavContainer, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(NavContainer);

    /*
     * END apply helpers
     */

    NavContainerProto.exit = function () {
        this.m_oCurrentPage = null;
    };

    NavContainerProto.addPage = function (oPage, bSuppress) {
        this.addAggregation("pages", oPage, true);

        return this;
    };

    NavContainerProto.insertPage = function (oPage, iIndex, bSuppress) {
        this.insertAggregation("pages", oPage, iIndex, true);

        return this;
    };

    NavContainerProto.removePage = function (vPage, bSuppress) {
        let oPage;
        if (typeof (vPage) == "number") {
            oPage = this.getPages()[vPage];
        } else if (typeof (vPage) == "string") {
            oPage = sap.ui.getCore().byId(vPage);
        } else {
            oPage = vPage;
        }

        let oCurrentPage = this.getCurrentPage();

        if(oPage === oCurrentPage){
            this.m_oCurrentPage = null;
        }

        this.removeAggregation("pages", oPage, oPage !== oCurrentPage);

        return oPage;
    };

    NavContainerProto.removeAllPages = function (bSuppress) {
        this.m_oCurrentPage = null;
        return this.removeAllAggregation("pages", bSuppress);
    };

    NavContainerProto.getCurrentPage = function () {
        let aPages = this.getPages();
        if (!aPages.length) {
            return null;
        }

        return this.m_oCurrentPage || aPages[0];
    };

    NavContainerProto.to = function (oControl, mOptions) {
        if (typeof oControl === "string") {
            oControl = sap.ui.getCore().byId(oControl);
            if (!oControl) {
                throw new Error("Invalid control!");
            }
        }

        if (this.indexOfPage(oControl) === -1) {
            throw new Error(this.getId() + ": cannot navigate: target control has never been aggregated.");
        }

        let oCurrentPage = this.getCurrentPage();
        if (oCurrentPage && oControl === oCurrentPage) {
            //Is current page
            return;
        }

        //console.log("Navigating to " + oControl.getId() + " ...");

        this.m_oCurrentPage = oControl;

        this.rerender();
    };

    //Return Constructor
    return NavContainer;
});