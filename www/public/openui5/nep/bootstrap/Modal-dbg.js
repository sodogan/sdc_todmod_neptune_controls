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

            size: {
                type: "nep.bootstrap.ModalSize",
                defaultValue: Lib.ModalSize.Default
            },

            fullScreen: {
                type: "nep.bootstrap.ModalFullScreen",
                defaultValue: Lib.ModalFullScreen.Never
            },

            backdrop: {
                type: "nep.bootstrap.ModalBackdrop",
                defaultValue: Lib.ModalBackdrop.Default
            },

            keyboard: {
                type: "boolean",
                defaultValue: true
            },

            autoFocus: {
                type: "boolean",
                defaultValue: true
            },

            animation: {
                type: "boolean",
                defaultValue: true
            },

            scrollable: {
                type: "boolean",
                defaultValue: false
            },

            verticallyCentered: {
                type: "boolean",
                defaultValue: false
            },

            title: {
                type: "string"
            },

            message: {
                type: "string"
            },

            closeButton: {
                type: "boolean",
                defaultValue: true
            },

            textColorTitle: {
                type: "nep.bootstrap.TextColor",
            },

            textColorMessage: {
                type: "nep.bootstrap.TextColor",
            },

            fontSizeTitle: {
                type: "nep.bootstrap.FontSize",
            },

            fontSizeMessage: {
                type: "nep.bootstrap.FontSize",
            },

            fontWeightTitle: {
                type: "nep.bootstrap.FontWeight",
            },

            fontWeightMessage: {
                type: "nep.bootstrap.FontWeight",
            },

            backgroundColorHeader: {
                type: "nep.bootstrap.BackgroundColor",
            },

            backgroundColorFooter: {
                type: "nep.bootstrap.BackgroundColor",
            },

            borderColorHeader: {
                type: "nep.bootstrap.BorderColor"
            },

            borderSizeHeader: {
                type: "nep.bootstrap.BorderSize"
            },

            borderRadiusHeader: {
                type: "nep.bootstrap.BorderRadius"
            },

            borderHeader: {
                type: "nep.bootstrap.Border"
            },

            borderColorFooter: {
                type: "nep.bootstrap.BorderColor"
            },

            borderSizeFooter: {
                type: "nep.bootstrap.BorderSize"
            },

            borderRadiusFooter: {
                type: "nep.bootstrap.BorderRadius"
            },

            borderFooter: {
                type: "nep.bootstrap.Border"
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
            },
            footer: {
                type: "sap.ui.core.Control",
                multiple: true
            }
        },

        events: {
            show: {

            },
            shown: {

            },
            hide: {

            },
            hidden: {

            },
            hidePrevented: {

            }
        }
    };

    ElementHelper.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    TextSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);

    const mSizeToClass = {
        Default: "",
        Small: "modal-sm",
        Large: "modal-lg",
        XLarge: "modal-xl"
    },
        mFullScreenToClass = {
            Never: "",
            Always: "modal-fullscreen",
            BelowSmall: "modal-fullscreen-sm-down",
            BelowMedium: "modal-fullscreen-md-down",
            BelowLarge: "modal-fullscreen-lg-down",
            BelowXLarge: "modal-fullscreen-xl-down",
            BelowXXLarge: "modal-fullscreen-xxl-down"
        };

    const fnRenderer = function (oRm, oControl) {

        let sTitle = oControl.getTitle(),
            sMessage = oControl.getMessage(),
            aContent = oControl.getContent(),
            aHeader = oControl.getHeader(),
            aFooter = oControl.getFooter();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());

        oRm.attr("tabindex", "-1");
        oRm.attr("aria-hidden", "true");

        oRm.openEnd();

        //OPEN modal-dialog
        oRm.openStart("div");
        oRm.class("modal-dialog");
        if (oControl.getScrollable()) {
            oRm.class("modal-dialog-scrollable");
        }
        if (oControl.getVerticallyCentered()) {
            oRm.class("modal-dialog-centered");
        }
        oRm.class(mSizeToClass[oControl.getSize()]);
        oRm.class(mFullScreenToClass[oControl.getFullScreen()]);
        oRm.openEnd();

        //OPEN modal-content
        oRm.openStart("div");
        oRm.class("modal-content");

        oRm.addClass(BackgroundSupport.getBackgroundColor(oControl.getBackgroundColor()));
        oRm.addClass(BorderSupport.getBorder(oControl.getBorder()));
        oRm.addClass(BorderSupport.getBorderColor(oControl.getBorderColor()));
        oRm.addClass(BorderSupport.getBorderRadius(oControl.getBorderRadius()));
        oRm.addClass(BorderSupport.getBorderSize(oControl.getBorderSize()));

        oRm.openEnd();

        //modal-header
        if (sTitle || aHeader.length) {
            oRm.openStart("div", oControl.createSubId("header"));
            oRm.class("modal-header");
            oRm.class(oControl.createStyleClass("header"));

            oRm.addClass(BackgroundSupport.getBackgroundColor(oControl.getBackgroundColorHeader()));
            oRm.addClass(BorderSupport.getBorder(oControl.getBorderHeader()));
            oRm.addClass(BorderSupport.getBorderColor(oControl.getBorderColorHeader()));
            oRm.addClass(BorderSupport.getBorderRadius(oControl.getBorderRadiusHeader()));
            oRm.addClass(BorderSupport.getBorderSize(oControl.getBorderSizeHeader()));

            oRm.openEnd();

            if (sTitle) {
                oRm.openStart("h5");
                oRm.class("modal-title");

                oRm.addClass(TextSupport.getTextColor(oControl.getTextColorTitle()));
                oRm.addClass(TextSupport.getFontSize(oControl.getFontSizeTitle()));
                oRm.addClass(TextSupport.getFontWeight(oControl.getFontWeightTitle()));

                oRm.openEnd();
                oRm.text(sTitle);
                oRm.close("h5");
            }

            for (let i = 0; i < aHeader.length; i++) {
                oRm.renderControl(aHeader[i]);
            }

            if (oControl.getCloseButton()) {
                oRm.openStart("button");
                oRm.attr("data-bs-dismiss", "modal");
                oRm.attr("aria-label", "Close");
                oRm.class("btn-close");
                oRm.openEnd();
                oRm.close("button");
            }

            oRm.close("div");
        }

        //modal-body
        if (sMessage || aContent.length) {
            oRm.openStart("div", oControl.createSubId("body"));
            oRm.class("modal-body");
            oRm.class(oControl.createStyleClass("body"));
            oRm.openEnd();
            if (aContent.length) {
                if (sMessage) {
                    oRm.openStart("p");

                    oRm.addClass(TextSupport.getTextColor(oControl.getTextColorMessage()));
                    oRm.addClass(TextSupport.getFontSize(oControl.getFontSizeMessage()));
                    oRm.addClass(TextSupport.getFontWeight(oControl.getFontWeightMessage()));

                    oRm.openEnd();
                    oRm.text(sMessage);
                    oRm.close("p");
                }

                for (let i = 0; i < aContent.length; i++) {
                    oRm.renderControl(aContent[i]);
                }
            }
            else {
                oRm.openStart("p");

                oRm.addClass(TextSupport.getTextColor(oControl.getTextColorMessage()));
                oRm.addClass(TextSupport.getFontSize(oControl.getFontSizeMessage()));
                oRm.addClass(TextSupport.getFontWeight(oControl.getFontWeightMessage()));

                oRm.openEnd();
                oRm.text(sMessage);
                oRm.close("p");
            }

            oRm.close("div");
        }

        //modal-footer
        if (aFooter.length) {
            oRm.openStart("div", oControl.createSubId("footer"));
            oRm.class("modal-footer");
            oRm.class(oControl.createStyleClass("footer"));          
            
            oRm.addClass(BackgroundSupport.getBackgroundColor(oControl.getBackgroundColorFooter()));
            oRm.addClass(BorderSupport.getBorder(oControl.getBorderFooter()));
            oRm.addClass(BorderSupport.getBorderColor(oControl.getBorderColorFooter()));
            oRm.addClass(BorderSupport.getBorderRadius(oControl.getBorderRadiusFooter()));
            oRm.addClass(BorderSupport.getBorderSize(oControl.getBorderSizeFooter()));
            
            oRm.openEnd();

            for (let i = 0; i < aFooter.length; i++) {
                oRm.renderControl(aFooter[i]);
            }

            oRm.close("div");
        }

        //CLOSE modal-content
        oRm.close("div");

        //CLOSE modal-dialog
        oRm.close("div");

        //CLOSE modal
        oRm.close("div");

    };

    /**
     * Constructor for a new Modal instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating Bootstrap Modals.
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias nep.bootstrap.Modal
     * 
     */
    const Modal = ControlBase.extend("nep.bootstrap.Modal", /** @lends nep.bootstrap.Modal.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Modal.prototype
         */
        ModalProto = Modal.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Modal.getStylePrefix = function () {
        return "nbsModal";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    ModalProto.getAdditionalStyleClass = function () {

        let sStyleClass = "modal";

        if (this.getAnimation()) {
            sStyleClass += " fade";
        }

        sStyleClass += TextSupport.createStyleClass(Modal, this);

        return sStyleClass;

    };

    //Add the helpers
    ElementHelper.addHelpers(Modal);

    /*
     * END apply helpers
     */

    ModalProto.exit = function () {
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
            elDomRef.removeEventListener('show.bs.modal', this.m_fnShow);
        }

        if (this.m_fnShown) {
            elDomRef.removeEventListener('shown.bs.modal', this.m_fnShown);
        }

        if (this.m_fnHide) {
            elDomRef.removeEventListener('hide.bs.modal', this.m_fnHide);
        }

        if (this.m_fnHidden) {
            elDomRef.removeEventListener('hidden.bs.modal', this.m_fnHidden);
        }

        if (this.m_fnHidePrevented) {
            elDomRef.removeEventListener('hidePrevented.bs.modal', this.m_fnHidePrevented);
        }

        document.body.removeChild(elUiArea);
        oParent.removeContent(this, true);
        oParent.destroy();

        this.m_fnShow = null;
        this.m_fnShown = null;
        this.m_fnHide = null;
        this.m_fnHidden = null;
        this.m_oModal = null;
    };

    ModalProto.onBeforeRendering = function (oEvent) {
        if (!this.m_oModal) {
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
            elDomRef.removeEventListener('show.bs.modal', this.m_fnShow);
        }

        if (this.m_fnShown) {
            elDomRef.removeEventListener('shown.bs.modal', this.m_fnShown);
        }

        if (this.m_fnHide) {
            elDomRef.removeEventListener('hide.bs.modal', this.m_fnHide);
        }

        if (this.m_fnHidden) {
            elDomRef.removeEventListener('hidden.bs.modal', this.m_fnHidden);
        }

        if (this.m_fnHidePrevented) {
            elDomRef.removeEventListener('hidePrevented.bs.modal', this.m_fnHidePrevented);
        }
    };

    const mBackdropToValue = {
        Default: true,
        None: false,
        Static: "static"
    };

    ModalProto.onAfterRendering = function (oEvent) {
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
            throw new Error("Modal is not first child of UIArea!");
        }

        this.m_oModal = new bootstrap.Modal(elDomRef, {
            backdrop: mBackdropToValue[this.getBackdrop()],
            keyboard: this.getKeyboard(),
            focus: this.getAutoFocus()
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

        this.m_fnHidePrevented = function () {
            that.fireHidePrevented();
        };

        elDomRef.addEventListener('show.bs.modal', this.m_fnShow);
        elDomRef.addEventListener('shown.bs.modal', this.m_fnShown);
        elDomRef.addEventListener('hide.bs.modal', this.m_fnHide);
        elDomRef.addEventListener('hidden.bs.modal', this.m_fnHidden);
        elDomRef.addEventListener('hidePrevented.bs.modal', this.m_fnHidden);
    };

    ModalProto.show = function () {
        if (this.getParent()) {
            this.m_oModal.show();
            return this;
        }

        let that = this,
            elUiArea = document.createElement("div");

        elUiArea.className = "nbs-layer";
        this.placeAt(elUiArea);

        requestAnimationFrame(function () {
            document.body.appendChild(elUiArea);
            requestAnimationFrame(function () {
                that.m_oModal.show();
            });
        });

        return this;
    };

    ModalProto.hide = function () {
        if (!this.m_oModal) {
            console.error("Cannot hide Modal: Modal has never been shown.");
            return;
        }
        this.m_oModal.hide();

        return this;
    };

    ModalProto.toggle = function () {
        if (!this.m_oModal) {
            console.error("Cannot toggle Modal: Modal has never been shown.");
            return;
        }
        this.m_oModal.toggle();

        return this;
    };

    Modal.show = function (sMessage, sTitle) {
        let oModal = new Modal({
            title: sTitle,
            message: sMessage
        });

        oModal.show();
    };

    //Return Constructor
    return Modal;
});