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

            position: {
                type: "nep.bootstrap.ToastPosition",
                defaultValue: Lib.ToastPosition.BottomCenter
            },

            delay: {
                type: "int",
                defaultValue: 5000
            },

            autohide: {
                type: "boolean",
                defaultValue: true
            },

            animation: {
                type: "boolean",
                defaultValue: true
            },

            title: {
                type: "string"
            },

            message: {
                type: "string"
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
            sMessage = oControl.getMessage(),
            aContent = oControl.getContent(),
            aHeader = oControl.getHeader();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());

        oRm.attr("role", "alert");
        oRm.attr("aria-live", "assertive");
        oRm.attr("aria-atomic", "true");

        oRm.openEnd();

        if (sTitle || aHeader.length) {
            oRm.openStart("div", oControl.createSubId("header"));
            oRm.class("toast-header");
            oRm.class(oControl.createStyleClass("header"));
            oRm.openEnd();
            if (aHeader.length) {
                if (sTitle) {
                    oRm.openStart("span");
                    oRm.openEnd();
                    oRm.text(sTitle);
                    oRm.close("span");
                }

                for (let i = 0; i < aHeader.length; i++) {
                    oRm.renderControl(aHeader[i]);
                }
            }
            else {
                oRm.text(sTitle);
            }

            oRm.close("div");
        }

        if (sMessage || aContent.length) {
            oRm.openStart("div", oControl.createSubId("body"));
            oRm.class("toast-body");
            oRm.class(oControl.createStyleClass("body"));
            oRm.openEnd();
            if (aContent.length) {
                if (sMessage) {
                    oRm.openStart("span");
                    oRm.openEnd();
                    oRm.text(sMessage);
                    oRm.close("span");
                }

                for (let i = 0; i < aContent.length; i++) {
                    oRm.renderControl(aContent[i]);
                }
            }
            else {
                oRm.text(sMessage);
            }
            oRm.close("div");
        }


        oRm.close("div");

    };

    /**
     * Constructor for a new Toast instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating Bootstrap Toasts.
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias nep.bootstrap.Toast
     * 
     */
    const Toast = ControlBase.extend("nep.bootstrap.Toast", /** @lends nep.bootstrap.Toast.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Toast.prototype
         */
        ToastProto = Toast.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Toast.getStylePrefix = function () {
        return "nbsToast";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    ToastProto.getAdditionalStyleClass = function () {

        let sStyleClass = "toast " + (this.m_bShown ? "show" : "hide");

        sStyleClass += BackgroundSupport.createStyleClass(Toast, this);
        sStyleClass += TextSupport.createStyleClass(Toast, this);
        sStyleClass += BorderSupport.createStyleClass(Toast, this);

        return sStyleClass;

    };

    //Add the helpers
    ElementHelper.addHelpers(Toast);

    /*
     * END apply helpers
     */

    ToastProto.exit = function () {
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
            elDomRef.removeEventListener('show.bs.toast', this.m_fnShow);
        }

        if (this.m_fnShown) {
            elDomRef.removeEventListener('shown.bs.toast', this.m_fnShown);
        }

        if (this.m_fnHide) {
            elDomRef.removeEventListener('hide.bs.toast', this.m_fnHide);
        }

        if (this.m_fnHidden) {
            elDomRef.removeEventListener('hidden.bs.toast', this.m_fnHidden);
        }

        let sContainerId = Toast.createStyleClass(this.getPosition()),
            elContainer = document.getElementById(sContainerId);


        elContainer.removeChild(elUiArea);

        requestAnimationFrame(function () {
            //Remove empty container
            if (elContainer && !elContainer.children.length) {
                try{
                    document.body.removeChild(elContainer);
                }
                catch(err){
                    console.warn(err);
                }
            }
        });

        this.m_fnShow = null;
        this.m_fnShown = null;
        this.m_fnHide = null;
        this.m_fnHidden = null;
        this.m_oToast = null;
    };

    ToastProto.onBeforeRendering = function (oEvent) {
        if (!this.m_oToast) {
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
            elDomRef.removeEventListener('show.bs.toast', this.m_fnShow);
        }

        if (this.m_fnShown) {
            elDomRef.removeEventListener('shown.bs.toast', this.m_fnShown);
        }

        if (this.m_fnHide) {
            elDomRef.removeEventListener('hide.bs.toast', this.m_fnHide);
        }

        if (this.m_fnHidden) {
            elDomRef.removeEventListener('hidden.bs.toast', this.m_fnHidden);
        }
    };

    ToastProto.onAfterRendering = function (oEvent) {
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
            throw new Error("Toast is not first child of UIArea!");
        }

        this.m_oToast = new bootstrap.Toast(elDomRef, {
            delay: this.getDelay(),
            autohide: this.getAutohide(),
            animation: this.getAnimation()
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

            requestAnimationFrame(function () {
                that.destroy();
            });
        };

        elDomRef.addEventListener('show.bs.toast', this.m_fnShow);
        elDomRef.addEventListener('shown.bs.toast', this.m_fnShown);
        elDomRef.addEventListener('hide.bs.toast', this.m_fnHide);
        elDomRef.addEventListener('hidden.bs.toast', this.m_fnHidden);
    };

    ToastProto.show = function () {
        let that = this,
            elUiArea = document.createElement("div");

        this.placeAt(elUiArea);

        setTimeout(function () {
            Toast.getToastContainer(that.getPosition()).appendChild(elUiArea);
            requestAnimationFrame(function () {
                that.m_bShown = true;
                that.m_oToast.show();
            });
        },25);
    };

    ToastProto.hide = function () {
        if (!this.m_oToast) {
            console.error("Cannot hide toast: toast has never been shown.");
            return;
        }
        this.m_oToast.hide();
    };

    Toast._positionToCss = {
        TopLeft: "top-0 start-0",
        TopCenter: "top-0 start-50 translate-middle-x",
        TopRight: "top-0 end-0",
        MiddleLeft: "top-50 start-0 translate-middle-y",
        MiddleCenter: "top-50 start-50 translate-middle",
        MiddleRight: "top-50 end-0 translate-middle-y",
        BottomLeft: "bottom-0 start-0",
        BottomCenter: "bottom-0 start-50 translate-middle-x",
        BottomRight: "bottom-0 end-0"
    };


    Toast.getToastContainer = function (sPosition) {
        //We use a generated class as static container id
        let sContainerId = Toast.createStyleClass(sPosition),
            elContainer = document.getElementById(sContainerId);
        if (!elContainer) {
            elContainer = document.createElement("div");
            elContainer.id = sContainerId;
            elContainer.className = "toast-container position-fixed p-3 " + Toast._positionToCss[sPosition];
            elContainer.style.zIndex = 10000;

            document.body.appendChild(elContainer);
        }

        return elContainer;
    };

    Toast.show = function (sMessage, sTitle) {
        let oToast = new Toast({
            title: sTitle,
            message: sMessage
        });

        oToast.show();
    };

    //Return Constructor
    return Toast;
});