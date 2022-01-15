sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport",
    "./PaddingSupport",
    "./BackgroundSupport",
    "./BorderSupport",
    "./OverflowSupport",
    "./ResponsiveDisplaySupport"
], function (Lib, ControlBase, ElementHelper, MarginSupport, PaddingSupport, BackgroundSupport, BorderSupport, OverflowSupport, ResponsiveDisplaySupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            type: {
                type: "nep.bootstrap.ContainerType",
                defaultValue: Lib.ContainerType.Normal
            },

            width: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            },

            height: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            },

            color: {
                type: "string"
            },

        },

        aggregations: {
            content: {
                type: "sap.ui.core.Control",
                multiple: true
            }
        },

        defaultAggregation: "content"
    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    OverflowSupport.addMetadata(oMetadata);
    ResponsiveDisplaySupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {

        let aContent = oControl.getContent(),
            sColor = oControl.getColor();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());

        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());

        if (sColor) {
            oRm.addStyle("background-color", sColor);
        }

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
     * @alias nep.bootstrap.Container
     * 
     */
    const Container = ControlBase.extend("nep.bootstrap.Container", /** @lends nep.bootstrap.Container.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Container.prototype
         */
        ContainerProto = Container.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Container.getStylePrefix = function () {
        return "nbsContainer";
    };

    ContainerProto.getDisplayValue = function(){
        return "block";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    ContainerProto.getAdditionalStyleClass = function () {

        let sClass = Lib.ContainerTypeToClass[this.getType()];

        sClass += ResponsiveDisplaySupport.createStyleClass(Container, this);
        sClass += MarginSupport.createStyleClass(Container, this);
        sClass += PaddingSupport.createStyleClass(Container, this);
        sClass += BackgroundSupport.createStyleClass(Container, this);
        sClass += BorderSupport.createStyleClass(Container, this);
        sClass += OverflowSupport.createStyleClass(Container, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(Container);

    /*
     * END apply helpers
     */

    //Return Constructor
    return Container;
});