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

            minValue: {
                type: "int"
            },

            maxValue: {
                type: "int"
            },

            valueStep: {
                type: "float"
            },

            minLength: {
                type: "int"
            },

            maxLength: {
                type: "int"
            },

            required: {
                type: "boolean",
                defaultValue: false
            },

            type: {
                type: "nep.bootstrap.InputType",
                defaultValue: Lib.InputType.Text
            },

            placeholder: {
                type: "string"
            },

            enabled: {
                type: "boolean",
                defaultValue: true
            },

            editable: {
                type: "boolean",
                defaultValue: true
            },

            plainText: {
                type: "boolean",
                defaultValue: false
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
            },

            liveChangeEnabled: {
                type: "boolean",
                defaultValue: false
            },

            autoValidation: {
                type: "boolean",
                defaultValue: false
            },

            validity: {
                type: "nep.bootstrap.InputValidity",
                defaultValue: Lib.InputValidity.None
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
            sType = oControl.getType(),
            sPlaceholder = oControl.getPlaceholder(),
            nMinLength = oControl.getMinLength(),
            nMaxLength = oControl.getMaxLength(),
            aContentBefore = oControl.getContentBefore(),
            aContentAfter = oControl.getContentAfter(),
            bAdditionalContent = aContentBefore.length > 0 || aContentAfter.length > 0,
            bTextArea = sType === Lib.InputType.TextArea,
            sTag = bTextArea ? "textarea" : "input",
            aItems = oControl.getItems(),
            sValidity = oControl.getValidity();

        FormControlSupport.startRender(oRm, oControl);

        //Start Input Field
        oRm.openStart(sTag, oControl.createSubId("input"));

        if (sType === Lib.InputType.Range) {
            oRm.class("form-range");
        } else {
            oRm.class("form-control");
        }

        //Color
        if (sType === Lib.InputType.Color) {
            oRm.class("form-control-color");
        }

        //PlainText
        if (oControl.getPlainText()) {
            if(sType === Lib.InputType.Color || sType === Lib.InputType.Range){
                console.warn("PlainText is not supported for type: " + sType);
            }
            else{
                oRm.class("form-control-plaintext");
            }
        } 

        if(sValidity !== Lib.InputValidity.None){
            oRm.class("is-" + sValidity.toLowerCase());
        }
        
        //Min, Max, Step
        if(sType  === Lib.InputType.Range){
            const nMin = oControl.getMinValue(),
                nMax = oControl.getMaxValue(),
                nStep = oControl.getValueStep();
            
            nMin && oRm.attr("min", nMin);
            nMax && oRm.attr("max", nMax);
            nStep && oRm.attr("step", nStep);
        }


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
                oRm.class("form-control-" + Lib.InputSizeToClass[sSize]);
            }
        }

        if (sValue) {
            oRm.attr("value", sValue);
        }

        if (sType && sType !== Lib.InputType.TextArea) {
            oRm.attr("type", Lib.InputTypeToAttr[sType]);
        }

        if (sType !== Lib.InputType.Color && sType !== Lib.InputType.Range) {
            if(nMinLength){
                oRm.attr("minlength", nMinLength);
            }

            if(nMaxLength){
                oRm.attr("maxlength", nMaxLength);
            }
        }

        if (sPlaceholder) {
            oRm.attr("placeholder", sPlaceholder);
        }

        if (!oControl.getEnabled()) {
            oRm.attr("disabled", "disabled");
        }

        if (oControl.getRequired()) {
            oRm.attr("required", "required");
        }

        if (!oControl.getEditable()) {
            oRm.attr("readonly", "readonly");
        }

        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());

        if (aItems.length > 0) {
            oRm.attr("list", oControl.createSubId("datalist"));
        }

        oRm.openEnd();
        oRm.close(sTag);
        //End Input Field

        if (aItems.length > 0) {
            oRm.openStart("datalist", oControl.createSubId("datalist"));
            oRm.openEnd();
            for (let i = 0; i < aItems.length; i++) {
                let sName = aItems[i].getText();
                oRm.openStart("option");
                oRm.attr("value", aItems[i].getKey());
                oRm.openEnd();
                if (sName) {
                    oRm.write(sName);
                }
                oRm.close("option");
            }
            oRm.close("datalist");
        }

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
     * @alias nep.bootstrap.Input
     * 
     */
    const Input = ControlBase.extend("nep.bootstrap.Input", /** @lends nep.bootstrap.Input.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Input.prototype
         */
        InputProto = Input.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Input.getStylePrefix = function () {
        return "nbsInput";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    InputProto.getAdditionalStyleClass = function () {
        let sClass = "";

        sClass += FormControlSupport.createStyleClass(Input, this);
        sClass += MarginSupport.createStyleClass(Input, this);
        sClass += PaddingSupport.createStyleClass(Input, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(Input);

    InputProto.exit = function () {
        const elInput = document.getElementById(this.createSubId("input"));

        if (elInput) {
            elInput.removeEventListener("focus", this.m_fnFocus);
            elInput.removeEventListener("change", this.m_fnChange);
            elInput.removeEventListener("input", this.m_fnLiveChange);
        }

        this.m_fnFocus = null;
        this.m_fnChange = null;
        this.m_fnLiveChange = null;

        this.m_sLastValue = null;
    };

    InputProto.onBeforeRendering = function (oEvent) {
        const elInput = document.getElementById(this.createSubId("input"));

        if (elInput) {
            elInput.removeEventListener("focus", this.m_fnFocus);
            elInput.removeEventListener("change", this.m_fnChange);
            elInput.removeEventListener("input", this.m_fnLiveChange);
        }

    };

    InputProto.onAfterRendering = function (oEvent) {
        const that = this,
            elInput = document.getElementById(this.createSubId("input"));

        this.m_fnFocus = function () {
            that.m_sLastValue = that.getValue();
            that.fireFocus();
        };
        elInput.addEventListener("focus", this.m_fnFocus);

        this.m_fnChange = function () {
            const sPrevValue = that.m_sLastValue,
                sNewValue = elInput.value;
            if (sPrevValue !== sNewValue) {
                that.setProperty("value", sNewValue, true);

                if(that.getAutoValidation()){
                    that.checkValidity();
                }

                that.fireChange({
                    previousValue: sPrevValue,
                    newValue: sNewValue
                });
            }
        };
        elInput.addEventListener("change", this.m_fnChange);

        if (this.getLiveChangeEnabled()) {
            this.m_fnLiveChange = function () {
                const sPrevValue = that.getValue(),
                    sNewValue = elInput.value;
                if (sPrevValue !== sNewValue) {
                    that.setProperty("value", sNewValue, true);
                    that.fireLiveChange({
                        previousValue: sPrevValue,
                        newValue: sNewValue
                    });
                }
            };
            elInput.addEventListener("input", this.m_fnLiveChange);
        }


    };

    InputProto.setValue = function (sValue, bSuppressInvalidate) {
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

    InputProto.setLabel = function (sLabel, bSuppressInvalidate) {
        const oDomRef = document.getElementById(this.createSubId("label"));
        if (oDomRef) {
            this.setProperty("label", sLabel, true);
            oDomRef.textContent = sLabel;

            if (this.getFormLayout() === Lib.FormLayout.Floating) {
                this.setProperty("placeholder", sLabel, true);
                document.getElementById(this.createSubId("input")).placeholder = sLabel;
            }
        }
        else {
            if (this.getFormLayout() === Lib.FormLayout.Floating) {
                this.setProperty("placeholder", sLabel, true);
            }

            this.setProperty("label", sLabel, bSuppressInvalidate);
        }
        return this;
    };

    InputProto.setValidity = function (sValidity, bSuppressInvalidate) {
        const oDomRef = document.getElementById(this.createSubId("input"));
        if (oDomRef) {
            this.setProperty("validity", sValidity, true);
            oDomRef.classList.toggle("is-valid", sValidity === Lib.InputValidity.Valid);
            oDomRef.classList.toggle("is-invalid", sValidity === Lib.InputValidity.Invalid);
        }
        else {
            this.setProperty("validity", sValidity, bSuppressInvalidate);
        }
        return this;
    };

    InputProto.checkValidity = function(){
        const elInput = document.getElementById(this.createSubId("input"));
        if(elInput){
            let bValidity = elInput.checkValidity();
            this.setValidity(bValidity ? Lib.InputValidity.Valid : Lib.InputValidity.Invalid, true);
        }
    };

    /*
     * END apply helpers
     */

    //Return Constructor
    return Input;
});