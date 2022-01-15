sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./BackgroundSupport",
    "./TextSupport",
    "./BorderSupport",
], function (Lib, ControlBase, ElementHelper, BackgroundSupport, TextSupport, BorderSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            placement: {
                type: "nep.bootstrap.OffcanvasPlacement",
                defaultValue: Lib.OffcanvasPlacement.Start
            },

            backdrop: {
                type: "boolean",
                defaultValue: true
            },

            keyboard: {
                type: "boolean",
                defaultValue: true
            },

            scroll: {
                type: "boolean",
                defaultValue: false
            },

            title: {
                type: "string"
            },

            closeButton: {
                type: "boolean",
                defaultValue: true
            }

        },

        aggregations: {
            header: {
                type: "sap.ui.core.Control",
                multiple: true
            },
            content: {
                type: "sap.ui.core.Control",
                multiple: true
            }
        },

        defaultAggregation: "content",

        events: {
            show: {

            },
            shown: {

            },
            hide: {

            },
            hidden: {

            }
        }
    };

    ElementHelper.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    TextSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {

        let sTitle = oControl.getTitle(),
            aContent = oControl.getContent(),
            aHeader = oControl.getHeader();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());

        oRm.attr("tabindex", "-1");
        oRm.attr("aria-hidden", "true");

        oRm.openEnd();

        

        //offcanvas-header
        if (sTitle || aHeader.length) {
            oRm.openStart("div", oControl.createSubId("header"));
            oRm.class("offcanvas-header");
            oRm.class(oControl.createStyleClass("header"));

            oRm.openEnd();

            if (sTitle) {
                oRm.openStart("h5");
                oRm.class("offcanvas-title");
                oRm.openEnd();
                oRm.text(sTitle);
                oRm.close("h5");
            }

            for (let i = 0; i < aHeader.length; i++) {
                oRm.renderControl(aHeader[i]);
            }

            if (oControl.getCloseButton()) {
                oRm.openStart("button");
                oRm.attr("data-bs-dismiss", "offcanvas");
                oRm.attr("aria-label", "Close");
                oRm.class("btn-close");
                oRm.openEnd();
                oRm.close("button");
            }

            oRm.close("div");
        }

        //offcanvas-body
        oRm.openStart("div", oControl.createSubId("body"));
        oRm.class("offcanvas-body");
        oRm.class(oControl.createStyleClass("body"));
        oRm.openEnd();
        
        for (let i = 0; i < aContent.length; i++) {
            oRm.renderControl(aContent[i]);
        }

        oRm.close("div");
        
        //CLOSE offcanvas
        oRm.close("div");

    };

    /**
     * Constructor for a new Offcanvas instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating Bootstrap Offcanvass.
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias nep.bootstrap.Offcanvas
     * 
     */
    const Offcanvas = ControlBase.extend("nep.bootstrap.Offcanvas", /** @lends nep.bootstrap.Offcanvas.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Offcanvas.prototype
         */
        OffcanvasProto = Offcanvas.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Offcanvas.getStylePrefix = function () {
        return "nbsOffcanvas";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    OffcanvasProto.getAdditionalStyleClass = function () {

        let sClass = "offcanvas offcanvas-" + this.getPlacement().toLowerCase();

        sClass += BackgroundSupport.createStyleClass(Offcanvas, this);
        sClass += TextSupport.createStyleClass(Offcanvas, this);
        sClass += BorderSupport.createStyleClass(Offcanvas, this);

        return sClass;

    };

    //Add the helpers
    ElementHelper.addHelpers(Offcanvas);

    /*
     * END apply helpers
     */

    OffcanvasProto.exit = function () {
        let oParent = this.getParent();

        if (!oParent) {
            return;
        }

        let elUiArea = oParent.oRootNode;

        if (!elUiArea) {
            return;
        }

        let elDomRef = elUiArea.firstChild;

        if (!elDomRef) {
            return;
        }

        if (this.m_fnShow) {
            elDomRef.removeEventListener('show.bs.offcanvas', this.m_fnShow);
        }

        if (this.m_fnShown) {
            elDomRef.removeEventListener('shown.bs.offcanvas', this.m_fnShown);
        }

        if (this.m_fnHide) {
            elDomRef.removeEventListener('hide.bs.offcanvas', this.m_fnHide);
        }

        if (this.m_fnHidden) {
            elDomRef.removeEventListener('hidden.bs.offcanvas', this.m_fnHidden);
        }

        document.body.removeChild(elUiArea);
        oParent.removeContent(this, true);
        oParent.destroy();

        this.m_fnShow = null;
        this.m_fnShown = null;
        this.m_fnHide = null;
        this.m_fnHidden = null;
        this.m_oCanvas = null;
    };

    OffcanvasProto.onBeforeRendering = function (oEvent) {
        if (!this.m_oCanvas) {
            return;
        }

        let oParent = this.getParent();

        if (!oParent) {
            return;
        }

        let elUiArea = oParent.oRootNode;

        if (!elUiArea) {
            return;
        }

        let elDomRef = elUiArea.firstChild;

        if (!elDomRef) {
            return;
        }

        if (this.m_fnShow) {
            elDomRef.removeEventListener('show.bs.offcanvas', this.m_fnShow);
        }

        if (this.m_fnShown) {
            elDomRef.removeEventListener('shown.bs.offcanvas', this.m_fnShown);
        }

        if (this.m_fnHide) {
            elDomRef.removeEventListener('hide.bs.offcanvas', this.m_fnHide);
        }

        if (this.m_fnHidden) {
            elDomRef.removeEventListener('hidden.bs.offcanvas', this.m_fnHidden);
        }
    };

    OffcanvasProto.onAfterRendering = function (oEvent) {
        let oParent = this.getParent();

        if (!oParent) {
            throw new Error("Cannot access parent UIArea!");
        }

        let elUiArea = oParent.oRootNode;

        if (!elUiArea) {
            throw new Error("Cannot access DOM of parent UIArea!");
        }

        let that = this,
            elDomRef = elUiArea.firstChild;  //this.getDomRef();

        if (!elDomRef) {
            throw new Error("Offcanvas is not first child of UIArea!");
        }

        this.m_oCanvas = new bootstrap.Offcanvas(elDomRef, {
            backdrop: this.getBackdrop(),
            keyboard: this.getKeyboard(),
            scroll: this.getScroll()
        });

        this.m_fnShow = function () {
            that.fireShow();
        };

        this.m_fnShown = function () {
            that.fireShown();
        };

        this.m_fnHide = function () {
            that.fireHide();
        };

        this.m_fnHidden = function () {
            that.fireHidden();

            document.body.removeChild(elUiArea);
            oParent.removeContent(that, true);
            oParent.destroy();
        };

        elDomRef.addEventListener('show.bs.offcanvas', this.m_fnShow);
        elDomRef.addEventListener('shown.bs.offcanvas', this.m_fnShown);
        elDomRef.addEventListener('hide.bs.offcanvas', this.m_fnHide);
        elDomRef.addEventListener('hidden.bs.offcanvas', this.m_fnHidden);
    };

    OffcanvasProto.show = function () {
        if (this.getParent()) {
            this.m_oCanvas.show();
            return this;
        }

        let that = this,
            elUiArea = document.createElement("div");
        
        elUiArea.className = "nbs-layer";

        this.placeAt(elUiArea);

        requestAnimationFrame(function () {
            document.body.appendChild(elUiArea);
            requestAnimationFrame(function () {
                that.m_oCanvas.show();
            });
        });

        return this;
    };

    OffcanvasProto.hide = function () {
        if (!this.m_oCanvas) {
            console.error("Cannot hide Offcanvas: Offcanvas has never been shown.");
            return;
        }
        this.m_oCanvas.hide();

        return this;
    };

    OffcanvasProto.toggle = function () {
        if (!this.m_oCanvas) {
            console.error("Cannot toggle Offcanvas: Offcanvas has never been shown.");
            return;
        }
        this.m_oCanvas.toggle();

        return this;
    };

    Offcanvas.show = function (sMessage, sTitle) {
        let oOffcanvas = new Offcanvas({
            title: sTitle,
            message: sMessage
        });

        oOffcanvas.show();
    };

    //Return Constructor
    return Offcanvas;
});