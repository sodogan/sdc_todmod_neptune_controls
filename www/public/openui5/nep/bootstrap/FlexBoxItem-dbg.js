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
    "./OverflowSupport",
    "./OrderSupport",
    "./AlignSelfSupport"
    
], function (Lib, ControlBase, ElementHelper, MarginSupport, PaddingSupport, BackgroundSupport, BorderSupport, TextSupport, ShadowSupport, OverflowSupport, OrderSupport, AlignSelfSupport) {
    "use strict";


    const oMetadata = {

        library: "nep.bootstrap",

        properties: {

            fill: {
                type: "boolean",
                deafaultValue: false
            },

            width: {
                type: "sap.ui.core.CSSSize"
            },

            height: {
                type: "sap.ui.core.CSSSize"
            }

        },

        aggregations: {
            content: {
                multiple: true
            }
        },

        defaultAggregation: "content"
    };

    ElementHelper.addMetadata(oMetadata);
    OverflowSupport.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    TextSupport.addMetadata(oMetadata);
    ShadowSupport.addMetadata(oMetadata);
    OrderSupport.addMetadata(oMetadata);
    AlignSelfSupport.addMetadata(oMetadata);

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
     * @alias nep.bootstrap.FlexBoxItem
     * 
     */
    const FlexBoxItem = ControlBase.extend("nep.bootstrap.FlexBoxItem", /** @lends nep.bootstrap.FlexBoxItem.prototype */ {
        metadata: oMetadata
    }),
        /**
         * @alias nep.bootstrap.FlexBoxItem.prototype
         */
        FlexBoxItemProto = FlexBoxItem.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    FlexBoxItem.getStylePrefix = function () {
        return "nbsFlexBoxItem";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    FlexBoxItemProto.getAdditionalStyleClass = function () {
        let sClass = "";

        if (this.getFill()) {
            sClass += "flex-fill";
        }

        sClass += OverflowSupport.createStyleClass(FlexBoxItem, this);
        sClass += MarginSupport.createStyleClass(FlexBoxItem, this);
        sClass += PaddingSupport.createStyleClass(FlexBoxItem, this);
        sClass += BackgroundSupport.createStyleClass(FlexBoxItem, this);
        sClass += BorderSupport.createStyleClass(FlexBoxItem, this);
        sClass += TextSupport.createStyleClass(FlexBoxItem, this);
        sClass += ShadowSupport.createStyleClass(FlexBoxItem, this);
        sClass += OrderSupport.createStyleClass(FlexBoxItem, this);
        sClass += AlignSelfSupport.createStyleClass(FlexBoxItem, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(FlexBoxItem);

    /*
     * END apply helpers
     */

    //Return Constructor
    return FlexBoxItem;
});