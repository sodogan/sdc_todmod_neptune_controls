sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./FormControlSupport",
    "./MarginSupport",
    "./PaddingSupport",
    "./BackgroundSupport",
    "./BorderSupport",
    "./TextSupport",
    "./ShadowSupport",
], function (Lib, ControlBase, ElementHelper, FormControlSupport, MarginSupport, PaddingSupport, BackgroundSupport, BorderSupport, TextSupport, ShadowSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            value: {
                type: "string"
            },

            enabled: {
                type: "boolean",
                defaultValue: true
            },

            size: {
                type: "nep.bootstrap.InputSize",
                defaultValue: "Normal"
            },

            width: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            },

            height: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            }

        },

        events: {
            focus: {

            },
            change: {

            },
            liveChange: {

            }
        },

        aggregations: {
            items: {
                type: "sap.ui.core.Item",
                multiple: true,
                singularName: "item"
            }
        },

        defaultAggregation: "items"

    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    TextSupport.addMetadata(oMetadata);
    ShadowSupport.addMetadata(oMetadata);
    FormControlSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {

        const sValue = oControl.getValue(),
            sFormLayout = oControl.getFormLayout(),
            sSize = oControl.getSize(),
            aContentBefore = oControl.getContentBefore(),
            aContentAfter = oControl.getContentAfter(),
            bAdditionalContent = aContentBefore.length > 0 || aContentAfter.length > 0,
            aItems = oControl.getItems();

        FormControlSupport.startRender(oRm, oControl);

        //Start SelectBox Field
        oRm.openStart("select", oControl.createSubId("input"));
        oRm.class("form-select");

        oRm.addClass(TextSupport.getTextAlignment(oControl.getTextAlignment()));
        oRm.addClass(TextSupport.getTextColor(oControl.getTextColor()));
        oRm.addClass(TextSupport.getFontSize(oControl.getFontSize()));
        oRm.addClass(TextSupport.getFontWeight(oControl.getFontWeight()));
        oRm.addClass(BackgroundSupport.getBackgroundColor(oControl.getBackgroundColor()));
        oRm.addClass(BorderSupport.getBorder(oControl.getBorder()));
        oRm.addClass(BorderSupport.getBorderColor(oControl.getBorderColor()));
        oRm.addClass(BorderSupport.getBorderRadius(oControl.getBorderRadius()));
        oRm.addClass(BorderSupport.getBorderSize(oControl.getBorderSize()));
        oRm.addClass(ShadowSupport.getShadow(oControl.getShadow()));

        if (!bAdditionalContent && sSize !== Lib.InputSize.Normal) {
            if (sFormLayout === Lib.FormLayout.Floating) {
                console.warn("Input.size is not supported if FormLayout is Floating!");
            } else {
                oRm.class("form-select-" + Lib.InputSizeToClass[sSize]);
            }
        }

        if (sValue) {
            oRm.attr("value", sValue);
        }

        if (!oControl.getEnabled()) {
            oRm.attr("disabled", "disabled");
        }

        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());

        oRm.openEnd();
        
        for(let i=0; i < aItems.length; i++){
            let sName = aItems[i].getText();
            oRm.openStart("option");
            oRm.attr("value", aItems[i].getKey());
            oRm.openEnd();
            if(sName){
                oRm.write(sName);
            }
            oRm.close("option");
        }
            
        oRm.close("select");
        
        FormControlSupport.endRender(oRm, oControl);
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
     * @alias nep.bootstrap.SelectBox
     * 
     */
    const SelectBox = ControlBase.extend("nep.bootstrap.SelectBox", /** @lends nep.bootstrap.SelectBox.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.SelectBox.prototype
         */
        SelectBoxProto = SelectBox.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    SelectBox.getStylePrefix = function () {
        return "nbsSelectBox";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    SelectBoxProto.getAdditionalStyleClass = function () {
        let sClass = "";

        sClass += FormControlSupport.createStyleClass(SelectBox, this);
        sClass += MarginSupport.createStyleClass(SelectBox, this);
        sClass += PaddingSupport.createStyleClass(SelectBox, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(SelectBox);

    SelectBoxProto.exit = function () {
        const elSelectBox = document.getElementById(this.createSubId("input"));

        if (elSelectBox) {
            elSelectBox.removeEventListener("focus", this.m_fnFocus);
            elSelectBox.removeEventListener("change", this.m_fnChange);
        }

        this.m_fnFocus = null;
        this.m_fnChange = null;
        
        this.m_sLastValue = null;
    };

    SelectBoxProto.onBeforeRendering = function (oEvent) {
        const elSelectBox = document.getElementById(this.createSubId("input"));

        if (elSelectBox) {
            elSelectBox.removeEventListener("focus", this.m_fnFocus);
            elSelectBox.removeEventListener("change", this.m_fnChange);
        }

    };

    SelectBoxProto.onAfterRendering = function (oEvent) {
        const that = this,
            elSelectBox = document.getElementById(this.createSubId("input"));

        this.m_fnFocus = function () {
            that.m_sLastValue = that.getValue();
            that.fireFocus();
        };
        elSelectBox.addEventListener("focus", this.m_fnFocus);

        this.m_fnChange = function () {
            const sPrevValue = that.m_sLastValue,
                sNewValue = elSelectBox.value;
            if (sPrevValue !== sNewValue) {
                that.setProperty("value", sNewValue, true);
                that.fireChange({
                    previousValue: sPrevValue,
                    newValue: sNewValue
                });
            }
        };
        elSelectBox.addEventListener("change", this.m_fnChange);
    };

    SelectBoxProto.setValue = function (sValue, bSuppressInvalidate) {
        const oDomRef = document.getElementById(this.createSubId("input"));
        if (oDomRef) {
            this.setProperty("value", sValue, true);
            oDomRef.value = sValue;
        }
        else {
            this.setProperty("value", sValue, bSuppressInvalidate);
        }
        return this;
    };

    SelectBoxProto.setLabel = function (sLabel, bSuppressInvalidate) {
        const oDomRef = document.getElementById(this.createSubId("label"));
        if (oDomRef) {
            this.setProperty("label", sLabel, true);
            oDomRef.textContent = sLabel;
        }
        else {
            this.setProperty("label", sLabel, bSuppressInvalidate);
        }
        return this;
    };

    /*
     * END apply helpers
     */

    //Return Constructor
    return SelectBox;
});