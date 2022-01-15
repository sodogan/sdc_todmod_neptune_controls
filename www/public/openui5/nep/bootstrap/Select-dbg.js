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

            selectedKey: {
                type: "string"
            },

            selectedKeys: {
                type: "string[]"
            },

            enabled: {
                type: "boolean",
                defaultValue: true
            },

            multiple: {
                type: "boolean",
                defaultValue: false
            },

            rows: {
                type: "int"
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

        const sFormLayout = oControl.getFormLayout(),
            sSize = oControl.getSize(),
            aContentBefore = oControl.getContentBefore(),
            aContentAfter = oControl.getContentAfter(),
            bAdditionalContent = aContentBefore.length > 0 || aContentAfter.length > 0,
            aItems = oControl.getItems(),
            sSelectedKey = oControl.getSelectedKey(),
            aSelectedKeys = oControl.getSelectedKeys(),
            nRows = oControl.getRows();
        

        FormControlSupport.startRender(oRm, oControl);

        //Start Select Field
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

        if (!oControl.getEnabled()) {
            oRm.attr("disabled", "disabled");
        }

        if(oControl.getMultiple()){
            oRm.attr("multiple", "multiple");
        }

        if(nRows){
            oRm.attr("size", nRows);
        }

        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());

        oRm.openEnd();
        
        for(let i=0; i < aItems.length; i++){
            let sKey = aItems[i].getKey(),
                sName = aItems[i].getText();
            oRm.openStart("option");
            oRm.attr("value", aItems[i].getKey());
            if(sKey === sSelectedKey || (aSelectedKeys && aSelectedKeys.indexOf(sKey) !== -1)){
                oRm.attr("selected", "selected");
            }
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
     * @alias nep.bootstrap.Select
     * 
     */
    const Select = ControlBase.extend("nep.bootstrap.Select", /** @lends nep.bootstrap.Select.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Select.prototype
         */
        SelectProto = Select.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Select.getStylePrefix = function () {
        return "nbsSelect";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    SelectProto.getAdditionalStyleClass = function () {
        let sClass = "";

        sClass += FormControlSupport.createStyleClass(Select, this);
        sClass += MarginSupport.createStyleClass(Select, this);
        sClass += PaddingSupport.createStyleClass(Select, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(Select);

    SelectProto.exit = function () {
        const elSelect = document.getElementById(this.createSubId("input"));

        if (elSelect) {
            elSelect.removeEventListener("focus", this.m_fnFocus);
            elSelect.removeEventListener("change", this.m_fnChange);
        }

        this.m_fnFocus = null;
        this.m_fnChange = null;
    };

    SelectProto.onBeforeRendering = function (oEvent) {
        const elSelect = document.getElementById(this.createSubId("input"));

        if (elSelect) {
            elSelect.removeEventListener("focus", this.m_fnFocus);
            elSelect.removeEventListener("change", this.m_fnChange);
        }

    };

    SelectProto.onAfterRendering = function (oEvent) {
        const that = this,
            bMultiple = this.getMultiple(),
            elSelect = document.getElementById(this.createSubId("input"));

        this.m_fnFocus = function () {
            that.fireFocus();
        };
        elSelect.addEventListener("focus", this.m_fnFocus);

        this.m_fnChange = function () {
            const sPrevSelectedKey = that.getSelectedKey(),
                    sNewSelectedKey = elSelect.value;

            let aPrevSelectedKeys,
                aNewSelectedKeys;

            if(bMultiple){
                aPrevSelectedKeys = that.getSelectedKeys();
                aNewSelectedKeys = [];

                const aOptions = elSelect.options;

                for(const elOption of aOptions){
                    if(elOption.selected){
                        aNewSelectedKeys.push(elOption.value);
                    }
                }

                this.setSelectedKeys(aNewSelectedKeys, true);
            }
            else{
                aPrevSelectedKeys = [sPrevSelectedKey];
                aNewSelectedKeys = [sNewSelectedKey];
                
                this.setSelectedKey(sNewSelectedKey, true);
            }

            that.fireChange({
                previousSelectedKey: sPrevSelectedKey,
                newSelectedKey: sNewSelectedKey,
                previousSelectedKeys: aPrevSelectedKeys,
                newSelectedKeys: aNewSelectedKeys
            });
            
        };
        elSelect.addEventListener("change", this.m_fnChange);
    };

    SelectProto.setSelectedKey = function (sSelectedKey) {
        this.setProperty("selectedKeys", [sSelectedKey], true);
        this.setProperty("selectedKey", sSelectedKey, true);

        const oDomRef = document.getElementById(this.createSubId("input"));
        if (oDomRef) {
            oDomRef.value = sSelectedKey;
        }
        
        return this;
    };

    SelectProto.setSelectedKeys = function (aSelectedKeys) {
        this.setProperty("selectedKey", aSelectedKeys && aSelectedKeys.length ? aSelectedKeys[aSelectedKeys.length-1] : null, true);
        this.setProperty("selectedKeys", aSelectedKeys, true);
        
        const oDomRef = document.getElementById(this.createSubId("input"));
        if (oDomRef) {
            const aOptions = oDomRef.options;
            for(const elOption of aOptions){
                elOption.selected = aSelectedKeys.indexOf(elOption.value) !== -1;
            }
        }
        
        return this;
    };

    SelectProto.setLabel = function (sLabel, bSuppressInvalidate) {
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
    return Select;
});