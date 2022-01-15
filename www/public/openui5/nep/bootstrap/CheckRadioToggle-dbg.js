sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport"
], function (Lib, ControlBase, ElementHelper, MarginSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            type: {
                type: "nep.bootstrap.CheckRadioToggleType",
                defaultValue: Lib.CheckRadioToggleType.Checkbox
            },

            enabled: {
                type: "boolean",
                defaultValue: true
            },

            selected: {
                type: "boolean",
                defaultValue: false
            },

            label: {
                type: "string"
            },

            name: {
                type: "string"
            },

            toggleButtonType: {
                type: "nep.bootstrap.ButtonType",
                defaultValue: Lib.ButtonType.Default
            },
            
            toggleButtonContextColor: {
                type: "nep.bootstrap.ContextColor",
                defaultValue: Lib.ContextColor.Secondary
            }

        },

        events: {
            focus: {

            },

            change: {

            }
        }
    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {
        
        const sLabel = oControl.getLabel(),
            sType = oControl.getType(),
            sName = oControl.getName(),
            sInputId = oControl.createSubId("input"),
            bRadio = sType === Lib.CheckRadioToggleType.Radio || sType === Lib.CheckRadioToggleType.RadioToggle;

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.openEnd();

        if (sLabel && sType !== Lib.CheckRadioToggleType.ToggleButton) {
            oRm.openStart("label", oControl.createSubId("label"));
            oRm.addClass("form-check-label");
            oRm.attr("for", sInputId);
            oRm.openEnd();
            oRm.text(sLabel);
            oRm.close("label");
        }

        oRm.openStart("input", sInputId);
        if(sType === Lib.CheckRadioToggleType.ToggleButton || sType === Lib.CheckRadioToggleType.RadioToggle){
            oRm.addClass("btn-check");
        }
        else{
            oRm.addClass("form-check-input");
        }
        oRm.attr("type", bRadio ? "radio" : "checkbox");
        if(oControl.getSelected()){
            oRm.attr("checked", "checked");
        }
        if(!oControl.getEnabled()){
            oRm.attr("disabled", "disabled");
        }
        if(bRadio && sName){
            oRm.attr("name", sName);
        }
        oRm.openEnd();
        oRm.close("input");

        if(sType === Lib.CheckRadioToggleType.ToggleButton || sType === Lib.CheckRadioToggleType.RadioToggle){
            const sToggleButtonType = oControl.getToggleButtonType(),
                sContextColor = oControl.getToggleButtonContextColor();

            oRm.openStart("label", oControl.createSubId("label"));
            oRm.addClass("btn");
            
            switch(sToggleButtonType){
                case Lib.ButtonType.Default:
                    oRm.addClass("btn-" + sContextColor.toLowerCase());
                    break;
                case Lib.ButtonType.Outline:
                    oRm.addClass("btn-outline-" + sContextColor.toLowerCase());
                    break;
                default:
                    throw new Error("Invalid ToggleButtonType!");
            }

            
            oRm.attr("for", sInputId);
            oRm.openEnd();
            oRm.text(sLabel);
            oRm.close("label");
        }

        oRm.close("div");

    };

    /**
     * Constructor for a new CheckRadioToggle instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating checkboxes, radio and toggle buttons.
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias nep.bootstrap.CheckRadioToggle
     * 
     */
    const CheckRadioToggle = ControlBase.extend("nep.bootstrap.CheckRadioToggle", /** @lends nep.bootstrap.CheckRadioToggle.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.CheckRadioToggle.prototype
         */
        CheckRadioToggleProto = CheckRadioToggle.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    CheckRadioToggle.getStylePrefix = function () {
        return "nbsCheckRadioToggle";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    CheckRadioToggleProto.getAdditionalStyleClass = function () {

        let sClass = "",
            sType = this.getType();

        switch (sType) {
            case Lib.CheckRadioToggleType.Checkbox:
                sClass = "form-check";
                break;
            case Lib.CheckRadioToggleType.Radio:
                sClass = "form-check";
                break;
            case Lib.CheckRadioToggleType.Switch:
                sClass = "form-check form-switch";
                break;
        }

        sClass += MarginSupport.createStyleClass(CheckRadioToggle, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(CheckRadioToggle);

    /*
     * END apply helpers
     */

    CheckRadioToggleProto.exit = function (oEvent) {
        const elInput = document.getElementById(this.createSubId("input"));

        if (elInput) {
            elInput.removeEventListener("focus", this.m_fnFocus);
            elInput.removeEventListener("change", this.m_fnChange);
        }

    };

    CheckRadioToggleProto.onBeforeRendering = function (oEvent) {
        const elInput = document.getElementById(this.createSubId("input"));

        if (elInput) {
            elInput.removeEventListener("focus", this.m_fnFocus);
            elInput.removeEventListener("change", this.m_fnChange);
        }

    };

    CheckRadioToggleProto.onAfterRendering = function (oEvent) {
        const that = this,
            elInput = document.getElementById(this.createSubId("input"));

        this.m_fnFocus = function () {
            that.fireFocus();
        };
        elInput.addEventListener("focus", this.m_fnFocus);

        this.m_fnChange = function () {
            const sPrevSelected = that.getSelected(),
                sNewSelected = elInput.checked,
                sType = that.getType(),
                bRadio = sType === Lib.CheckRadioToggleType.Radio || sType === Lib.CheckRadioToggleType.RadioToggle;

                if(bRadio){
                    let aRadios = that.getRelatedRadios();
                    for(const oRadio of aRadios){
                        if(oRadio !== that){
                            oRadio.setSelected(false, true);
                        }
                    }
                }

                that.setProperty("selected", sNewSelected, true);

                that.fireChange({
                    previousSelected: sPrevSelected,
                    newSelected: sNewSelected
                });
            
        };
        elInput.addEventListener("change", this.m_fnChange);
    };

    CheckRadioToggleProto.setSelected = function(bSelected, bSuppress){
        const elInput = document.getElementById(this.createSubId("input"));
        if(elInput){
            elInput.checked = bSelected;
            this.setProperty("selected", bSelected, true);
        }
        else{
            this.setProperty("selected", bSelected, bSuppress);
        }
        return this;
    };

    CheckRadioToggleProto.getRelatedRadios = function(){
        const sType = this.getType(),
            bRadio = sType === Lib.CheckRadioToggleType.Radio || sType === Lib.CheckRadioToggleType.RadioToggle;

        if(!bRadio){
            throw new Error("Cannot get related Radios: control must be of type Radio or RadioToggle!");
        }

        const sName = this.getName();
        if(!sName){
            throw new Error("Cannot get related Radios: name property is not set!");
        }
        const aRadios = document.querySelectorAll("." + CheckRadioToggle.getStylePrefix() + ' [name="' + sName + '"]');
        
        const aRadioButtons = [];
        for (const elRadio of aRadios) {
            const sControlId = elRadio.parentNode.id; 
            const oControl = sap.ui.getCore().byId(sControlId);
            if(oControl){
                aRadioButtons.push(oControl);
            }
        }
        
        return aRadioButtons;
    };

    CheckRadioToggleProto.getSelectedRadio = function(){
        const aRadios = this.getRelatedRadios();
        for (const oRadio of aRadios) {
            if(oRadio.getSelected()){
                return oRadio;
            }
        }
        return null;
    };

    //Return Constructor
    return CheckRadioToggle;
});