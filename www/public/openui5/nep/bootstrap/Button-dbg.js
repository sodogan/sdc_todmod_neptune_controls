sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport",
    "./ShadowSupport",
    "./PaddingSupport",
    "./BackgroundSupport",
    "./ContextColorSupport",
    "./TextSupport",
    "./BorderSupport",
    "./ResponsiveDisplaySupport"
], function (Lib, ControlBase, ElementHelper, MarginSupport, ShadowSupport, PaddingSupport, BackgroundSupport, ContextColorSupport, TextSupport, BorderSupport, ResponsiveDisplaySupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            type: {
                type: "nep.bootstrap.ButtonType",
                defaultValue: Lib.ButtonType.Default
            },

            size: {
                type: "nep.bootstrap.ButtonSize",
                defaultValue: Lib.ButtonSize.Normal
            },

            enabled: {
                type: "boolean",
                defaultValue: true
            },

            text: {
                type: "string"
            },

            bsToggle: {
                type: "nep.bootstrap.BsElement"
            },

            bsTarget: {
                type: "string"
            },

            bsDismiss: {
                type: "nep.bootstrap.BsElement"
            },

            width: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            },

            height: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            },

            dropdownSplit: {
                type: "boolean",
                defaultValue: false
            },

            dropdownColorScheme: {
                type: "nep.bootstrap.ColorScheme",
                defaultValue: Lib.ColorScheme.Light
            },

            dropdownMenuAlignment: {
                type: "nep.bootstrap.DropdownMenuAligment",
                defaultValue: Lib.DropdownMenuAligment.Start
            },

            dropdownDirection: {
                type: "nep.bootstrap.DropdownDirection"
            },

            /**
             * Defines the icon to be displayed as graphical element within the <code>Button</code>.
             * It can be an image or an icon from the icon font.
             */
            icon: { type: "sap.ui.core.URI", group: "Appearance", defaultValue: "" },

            /**
             * Determines whether the icon is displayed before the text.
             */
            iconFirst: { type: "boolean", group: "Appearance", defaultValue: true },

        },

        aggregations: {
            items: {
                type: ["nep.bootstrap.DropdownItem", "nep.bootstrap.HorizontalLine"],
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
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    ShadowSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    ContextColorSupport.addMetadata(oMetadata, true);
    TextSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    ResponsiveDisplaySupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {

        const aItems = oControl.getItems(),
            sItemTitle = oControl.getTooltip_AsString(),
            bAccessibility = sap.ui.getCore().getConfiguration().getAccessibility(),
            sDropdownColorScheme = oControl.getDropdownColorScheme(),
            sDropdownMenuAlignment = oControl.getDropdownMenuAlignment(),
            sText = oControl.getText(),
            sIcon = oControl.getIcon(),
            bDropdown = !!aItems.length,
            bSplit = oControl.getDropdownSplit();

        if(bDropdown){
            oRm.openStart("div", oControl);
            oRm.addClass(oControl.createStyleClass());

            if (sItemTitle) {
                oRm.attr("title", sItemTitle);
            }

            oRm.openEnd();

            oRm.openStart("button", oControl.createSubId("button"));
            oRm.addClass(oControl.getAdditionalButtonStyleClass());
            
            if(!bSplit){
                oRm.addClass("dropdown-toggle");
                oRm.attr("data-bs-toggle", "dropdown");
            }
        }
        else{
            oRm.openStart("button", oControl);
            oRm.addClass(oControl.createStyleClass());

            if (sItemTitle) {
                oRm.attr("title", sItemTitle);
            }

            oRm.addStyle("width", oControl.getWidth());
            oRm.addStyle("height", oControl.getHeight());


            if (oControl.getBsToggle()) {
                oRm.attr("data-bs-toggle", oControl.getBsToggle().toLowerCase());
            }
    
            if (oControl.getBsDismiss()) {
                oRm.attr("data-bs-dismiss", oControl.getBsDismiss().toLowerCase());
            }
    
            if (oControl.getBsTarget()) {
                oRm.attr("data-bs-target", oControl.getBsTarget());
            }
        }

        if (!oControl.getEnabled()) {
            oRm.attr("disabled", "disabled");
        }

        oRm.openEnd();

        if (sIcon && oControl.getIconFirst()) {
            oRm.write(Lib.createIcon(sIcon, oControl.createStyleClass("icon"), oControl.createSubId("icon")));
        }

        if (sText) {
            oRm.openStart("span", oControl.createSubId("text"));
            oRm.class(oControl.createStyleClass("text"));
            oRm.openEnd();
            oRm.text(sText);
            oRm.close("span");
        }

        if (sIcon && !oControl.getIconFirst()) {
            oRm.write(Lib.createIcon(sIcon, oControl.createStyleClass("icon"), oControl.createSubId("icon")));
        }

        oRm.close("button");

        if(bSplit){
            oRm.openStart("button",  oControl.createSubId("buttonSplit"));
            oRm.addClass(oControl.getAdditionalButtonStyleClass());
            
            oRm.addClass("dropdown-toggle");
            oRm.addClass("dropdown-toggle-split");
            oRm.attr("data-bs-toggle", "dropdown");
            
            if (!oControl.getEnabled()) {
                oRm.attr("disabled", "disabled");
            }
    
            oRm.openEnd();

            oRm.openStart("span");
            oRm.class("visually-hidden");
            oRm.write("Toggle Dropdown");
            oRm.openEnd();
            oRm.close("span");

            oRm.close("button");
        }

        // Dropdown Menu
        if (bDropdown) {

            oRm.openStart("ul");
            oRm.class("dropdown-menu");

            if (sDropdownColorScheme === "Dark") {
                oRm.class("dropdown-menu-dark");
            }

            if (sDropdownMenuAlignment === "End") {
                oRm.class("dropdown-menu-end");
            }

            oRm.openEnd();

            for (let i = 0; i < aItems.length; i++) {
                const oItem = aItems[i];

                if (oItem.getMetadata().getElementName() === "nep.bootstrap.HorizontalLine") {

                    oRm.openStart("li");
                    oRm.openEnd();

                    oRm.openStart("hr");
                    oRm.class("dropdown-divider");
                    oRm.openEnd();

                    oRm.close("li");

                } else {
                    oRm.renderControl(oItem);
                }
            }

            oRm.close("ul");
            oRm.close("div");
        }

        

    };

    /**
     * Constructor for a new Button instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating Bootstrap Buttons.
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias nep.bootstrap.Button
     * 
     */
    const Button = ControlBase.extend("nep.bootstrap.Button", /** @lends nep.bootstrap.Button.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Button.prototype
         */
        ButtonProto = Button.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Button.getStylePrefix = function () {
        return "nbsButton";
    };

    ButtonProto.getDisplayValue = function(){
        return this.getItems().length ? "inline-flex" : "inline-block";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    ButtonProto.getAdditionalStyleClass = function () {
        const bDropdown = !!this.getItems().length;

        let sStyleClass;
        if(bDropdown){
            sStyleClass = this.getAdditionalDropdownStyleClass();
        }
        else{
            sStyleClass = this.getAdditionalButtonStyleClass();
        }

        sStyleClass += MarginSupport.createStyleClass(Button, this);
        sStyleClass += ShadowSupport.createStyleClass(Button, this);
        sStyleClass += ResponsiveDisplaySupport.createStyleClass(Button, this);
        
        return sStyleClass;
    };

    ButtonProto.getAdditionalDropdownStyleClass = function () {
        let sStyleClass = "btn-group";

        switch (this.getDropdownDirection()) {

            case "Top":
                sStyleClass += " dropup";
                break;

            case "Start":
                sStyleClass += " dropstart";
                break;

            case "End":
                sStyleClass += " dropend";
                break;

            default:
                break;

        }

        return sStyleClass;
    };

    ButtonProto.getAdditionalButtonStyleClass = function () {
        let sStyleClass = "btn";

        const sType = this.getType();

        switch(sType){
            case Lib.ButtonType.Default:
                sStyleClass += " btn-" + this.getContextColor().toLowerCase();
                break;
            case Lib.ButtonType.Outline:
                sStyleClass += " btn-outline-" + this.getContextColor().toLowerCase();
                break;
            case Lib.ButtonType.Link:
                sStyleClass += " btn-link";
                break;
            case Lib.ButtonType.Close:
                sStyleClass += " btn-close";
                break;
        }

        sStyleClass += PaddingSupport.createStyleClass(Button, this);
        sStyleClass += BackgroundSupport.createStyleClass(Button, this);
        sStyleClass += TextSupport.createStyleClass(Button, this);
        sStyleClass += BorderSupport.createStyleClass(Button, this);

        switch (this.getSize()) {

            case Lib.ButtonSize.Small:
                sStyleClass += " btn-sm";
                break;

            case Lib.ButtonSize.Large:
                sStyleClass += " btn-lg";
                break;

            default:
                break;
        }

        return sStyleClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(Button);

    /*
     * END apply helpers
     */

    ButtonProto.onclick = function (oEvent) {
        let bSplitSegment = false;

        if(oEvent.target.id === this.createSubId("buttonSplit")){
            bSplitSegment = true;
        }
        
        if (this.getEnabled()) {
            this.firePress({
                splitSegment: bSplitSegment
            });
        }
    };

    //Return Constructor
    return Button;
});