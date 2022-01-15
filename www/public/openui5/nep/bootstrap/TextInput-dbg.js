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
], function (Lib, ControlBase, ElementHelper, MarginSupport, PaddingSupport, BackgroundSupport, BorderSupport, TextSupport, ShadowSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            label: {
                type: "string"
            },

            value: {
                type: "string"
            },

            type: {
                type: "string"
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

            formLayout: {
                type: "nep.bootstrap.FormLayout",
                defaultValue: Lib.FormLayout.Vertical
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

        },

        events: {
            change: {

            }
        },

        aggregations: {
            contentBefore: {
                type: "sap.ui.core.Control",
                multiple: "true"
            },
            contentAfter: {
                type: "sap.ui.core.Control",
                multiple: "true"
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

    const mSizeToClass = {
        Small : "sm",
        Normal: "",
        Large: "lg"
    };

    const fnRenderer = function (oRm, oControl) {

        let sLabel = oControl.getLabel(),
            sValue = oControl.getValue(),
            sInputId = oControl.createSubId("input"),
            sFormLayout = oControl.getFormLayout(),
            sSize = oControl.getSize(),
            sType = oControl.getType(),
            sEnabled = oControl.getEnabled(),
            sEditable = oControl.getEditable(),
            sPlaceholder = oControl.getPlaceholder(),
            aContentBefore = oControl.getContentBefore(),
            aContentAfter = oControl.getContentAfter(),
            bAdditionalContent = aContentBefore.length > 0 || aContentAfter.length > 0;

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.openEnd();

        if(sLabel && sFormLayout !== Lib.FormLayout.Floating){
            oRm.openStart("label", oControl.createSubId("label"));
            oRm.class("form-label");
            oRm.attr("for", sInputId);
            oRm.openEnd();
            oRm.write(sLabel);
            oRm.close("label");
        }

        if(bAdditionalContent){
            oRm.openStart("div", oControl.createSubId("group"));
            oRm.class("input-group");
            if(sSize !== Lib.InputSize.Normal){
                oRm.class("input-group-" + mSizeToClass[sSize]);
            }
            oRm.openEnd();

            for (let i = 0; i < aContentBefore.length; i++) {
                const oItem = aContentBefore[i];
                oRm.renderControl(oItem);
            }
        }

        oRm.openStart("input", sInputId);
        oRm.class("form-control");

        if(!bAdditionalContent && sSize !== Lib.InputSize.Normal){
            if(sFormLayout === Lib.FormLayout.Floating){
                console.warn("TextInput.size is not supported if formLayout is Floating!");
            }
            else{
                oRm.class("form-control-" + mSizeToClass[sSize]);
            }
        }
        
        if (sValue){
            oRm.attr("value", sValue);
        }

        if (sType){ 
            oRm.attr("type", sType);
        }

        if (sPlaceholder){ 
            oRm.attr("placeholder", sPlaceholder);
        }

        if (!sEnabled){
             oRm.attr("disabled", "disabled");
        }

        if (!sEditable){
            oRm.attr("readonly", "readonly");
        }

        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());

        oRm.openEnd();
        oRm.close("input");

        if(bAdditionalContent){
            for (let i = 0; i < aContentAfter.length; i++) {
                const oItem = aContentAfter[i];
                oRm.renderControl(oItem);
            }

            oRm.close("div");

            if(sFormLayout === Lib.FormLayout.Floating){
                console.warn("Floating is not supported if additional content is provided!");
            }
        }
        else if(sLabel && sFormLayout === Lib.FormLayout.Floating){
            oRm.openStart("label", oControl.createSubId("label"));
            oRm.class("form-label");
            oRm.attr("for", sInputId);
            oRm.openEnd();
            oRm.write(sLabel);
            oRm.close("label");
        }

        oRm.close("div");
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
     * @alias nep.bootstrap.TextInput
     * 
     */
    const TextInput = ControlBase.extend("nep.bootstrap.TextInput", /** @lends nep.bootstrap.TextInput.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.TextInput.prototype
         */
        TextInputProto = TextInput.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    TextInput.getStylePrefix = function () {
        return "nbsTextInput";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    TextInputProto.getAdditionalStyleClass = function () {

        let sClass = "";

        if(this.getFormLayout() === Lib.FormLayout.Floating){
            sClass += "form-floating";
        }

        sClass += MarginSupport.createStyleClass(TextInput, this);
        sClass += PaddingSupport.createStyleClass(TextInput, this);
        sClass += BackgroundSupport.createStyleClass(TextInput, this);
        sClass += BorderSupport.createStyleClass(TextInput, this);
        sClass += TextSupport.createStyleClass(TextInput, this);
        sClass += ShadowSupport.createStyleClass(TextInput, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(TextInput);

    TextInputProto.onBeforeRendering = function(oEvent){
        const elInput = document.getElementById(this.createSubId("input"));

        if(elInput){
            elInput.removeEventListener("change", this.m_fnChange);
        }

    };

    TextInputProto.onAfterRendering = function(oEvent){
        const that = this, 
            elInput = document.getElementById(this.createSubId("input"));

        this.m_fnChange = function(){
            that.setProperty("value", elInput.value, true);
        };

        elInput.addEventListener("change", this.m_fnChange);
    };  

    TextInputProto.setValue = function (sValue, bSuppressInvalidate) {
        let oDomRef = document.getElementById(this.createSubId("input"));
        if (oDomRef) {
            this.setProperty("value", sValue, true);
            oDomRef.value = sValue;
        }
        else {
            this.setProperty("value", sValue, bSuppressInvalidate);
        }
        return this;
    };

    TextInputProto.setLabel = function (sLabel, bSuppressInvalidate) {
        let oDomRef = document.getElementById(this.createSubId("label"));
        if (oDomRef) {
            this.setProperty("label", sLabel, true);
            oDomRef.textContent = sLabel;

            if(this.getFormLayout() === Lib.FormLayout.Floating){
                this.setProperty("placeholder", sLabel, true);
                document.getElementById(this.createSubId("input")).placeholder = sLabel;
            }
        }
        else {
            if(this.getFormLayout() === Lib.FormLayout.Floating){
                this.setProperty("placeholder", sLabel, true);
            }
            
            this.setProperty("label", sLabel, bSuppressInvalidate);
        }
        return this;
    };

    /*
     * END apply helpers
     */

    //Return Constructor
    return TextInput;
});