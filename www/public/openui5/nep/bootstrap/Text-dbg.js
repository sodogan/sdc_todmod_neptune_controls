sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport",
    "./PaddingSupport",
    "./BackgroundSupport",
    "./BorderSupport",
    "./TextSupport",
    "./ResponsiveDisplaySupport"
], function (Lib, ControlBase, ElementHelper, MarginSupport, PaddingSupport, BackgroundSupport, BorderSupport, TextSupport, ResponsiveDisplaySupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            text: {
                type: "string"
            },

            type: {
                type: "nep.bootstrap.TextType",
                defaultValue: Lib.TextType.Text
            },

            color: {
                type: "string"
            },

        }

    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    TextSupport.addMetadata(oMetadata);
    ResponsiveDisplaySupport.addMetadata(oMetadata);

    const mTypeToTag = {
        Text: "span",
        Paragraph: "p",
        Strong: "strong",
        Small: "small",
        Emphasized: "em",
        Label: "label",
        Heading1: "h1",
        Heading2: "h2",
        Heading3: "h3",
        Heading4: "h4",
        Heading5: "h5",
        Heading6: "h6",
        Inserted: "ins",
        Deleted: "del",
        Mark: "mark",
        Badge: "span",
        Blockquote: "blockquote",
        NavbarText: "span"
    };

    const mTypeToDisplay = {
        Text: "inline",
        Paragraph: "block",
        Strong: "inline",
        Small: "inline",
        Emphasized: "inline",
        Label: "inline",
        Heading1: "block",
        Heading2: "block",
        Heading3: "block",
        Heading4: "block",
        Heading5: "block",
        Heading6: "block",
        Inserted: "inline",
        Deleted: "inline",
        Mark: "inline",
        Badge: "inline",
        Blockquote: "block",
        NavbarText: "inline"
    };

    const fnRenderer = function (oRm, oControl) {

        let sTag = mTypeToTag[oControl.getType()],
            sColor = oControl.getColor();


        oRm.openStart(sTag, oControl);
        oRm.addClass(oControl.createStyleClass());

        if (oControl.getType() === "Badge") oRm.addClass("badge");
        if (oControl.getType() === "Label") oRm.addClass("form-label col-form-label");
        if (oControl.getType() === "NavbarText") oRm.addClass("navbar-text");

        if (sColor) {
            oRm.addStyle("background-color", sColor);
        }

        oRm.openEnd();

        oRm.text(oControl.getText());
        oRm.close(sTag);

    };

    /**
     * Constructor for a new Text instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating Bootstrap Texts.
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias nep.bootstrap.Text
     * 
     */
    const Text = ControlBase.extend("nep.bootstrap.Text", /** @lends nep.bootstrap.Text.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Text.prototype
         */
        TextProto = Text.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Text.getStylePrefix = function () {
        return "nbsText";
    };

    TextProto.getDisplayValue = function(){
        return mTypeToDisplay[this.getType()];
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    TextProto.getAdditionalStyleClass = function () {

        let sClass = "";

        sClass += MarginSupport.createStyleClass(Text, this);
        sClass += PaddingSupport.createStyleClass(Text, this);
        sClass += BackgroundSupport.createStyleClass(Text, this);
        sClass += BorderSupport.createStyleClass(Text, this);
        sClass += TextSupport.createStyleClass(Text, this);
        sClass += ResponsiveDisplaySupport.createStyleClass(Text, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(Text);

    /*
     * END apply helpers
     */

    TextProto.setText = function (sText, bSuppressInvalidate) {
        let oDomRef = this.getDomRef();
        if (oDomRef) {
            this.setProperty("text", sText, true);
            oDomRef.textContent = sText;
        }
        else {
            this.setProperty("text", sText, bSuppressInvalidate);
        }
        return this;
    };

    //Return Constructor
    return Text;
});