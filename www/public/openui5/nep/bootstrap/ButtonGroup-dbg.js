sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport",
    "./PaddingSupport",
    "./BackgroundSupport",
    "./BorderSupport",
    "./ShadowSupport",
], function (Lib, ControlBase, ElementHelper, MarginSupport, PaddingSupport, BackgroundSupport, BorderSupport, ShadowSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            size: {
                type: "nep.bootstrap.ButtonSize",
                defaultValue: Lib.ButtonSize.Normal
            },

            layout: {
                type: "nep.bootstrap.ButtonGroupLayout"
            }

        },

        aggregations: {

            content: {
                type: "sap.ui.core.Control",
                multiple: true
            },

        },

        defaultAggregation: "content"

    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    ShadowSupport.addMetadata(oMetadata);


    const fnRenderer = function (oRm, oControl) {

        const aContent = oControl.getContent();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.attr("role", "group");
        oRm.openEnd();

        for (let i = 0; i < aContent.length; i++) {
            oRm.renderControl(aContent[i]);
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
     * @alias nep.bootstrap.ButtonGroup
     * 
     */
    const ButtonGroup = ControlBase.extend("nep.bootstrap.ButtonGroup", /** @lends nep.bootstrap.ButtonGroup.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.ButtonGroup.prototype
         */
        ButtonGroupProto = ButtonGroup.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    ButtonGroup.getStylePrefix = function () {
        return "nbsButtonGroup";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    ButtonGroupProto.getAdditionalStyleClass = function () {

        let sClass = "btn-group";

        sClass += MarginSupport.createStyleClass(ButtonGroup, this);
        sClass += PaddingSupport.createStyleClass(ButtonGroup, this);
        sClass += BackgroundSupport.createStyleClass(ButtonGroup, this);
        sClass += BorderSupport.createStyleClass(ButtonGroup, this);
        sClass += ShadowSupport.createStyleClass(ButtonGroup, this);

        switch (this.getSize()) {

            case Lib.ButtonSize.Small:
                sClass += " btn-group-sm";
                break;

            case Lib.ButtonSize.Large:
                sClass += " btn-group-lg";
                break;

            default:
                break;
        }

        if (this.getLayout() === "Vertical") {
            sClass += " btn-group-vertical";
        }

        return sClass;

    };

    //Add the helpers
    ElementHelper.addHelpers(ButtonGroup);

    /*
     * END apply helpers
     */

    //Return Constructor
    return ButtonGroup;
});