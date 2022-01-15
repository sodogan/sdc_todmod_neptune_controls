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
    "./BorderSupport"
], function (Lib, ControlBase, ElementHelper, MarginSupport, ShadowSupport, PaddingSupport, BackgroundSupport, ContextColorSupport, TextSupport, BorderSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            width: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            },

            height: {
                type: "sap.ui.core.CSSSize",
                defaultValue: ""
            }

        },
        defaultAggregation: "content",
        aggregations: {

            /**
             * Determines the content of the Panel.
             * The content will be visible only when the Panel is expanded.
             */
            content: { type: "sap.ui.core.Control", multiple: true, singularName: "content" },

        },


    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    PaddingSupport.addMetadata(oMetadata);
    ShadowSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    ContextColorSupport.addMetadata(oMetadata, true);
    TextSupport.addMetadata(oMetadata);
    BorderSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {

        let aContent = oControl.getContent();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());
        oRm.openEnd();

        for (let i = 0; i < aContent.length; i++) {
            oRm.renderControl(aContent[i]);
        }

        oRm.close("div");

    };

    /**
     * Constructor for a new Alert instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating Bootstrap Alerts.
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias nep.bootstrap.Alert
     * 
     */
    const Alert = ControlBase.extend("nep.bootstrap.Alert", /** @lends nep.bootstrap.Alert.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Alert.prototype
         */
        AlertProto = Alert.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Alert.getStylePrefix = function () {
        return "nbsAlert";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    AlertProto.getAdditionalStyleClass = function () {

        let sStyleClass = "alert";

        

        sStyleClass += MarginSupport.createStyleClass(Alert, this);
        sStyleClass += PaddingSupport.createStyleClass(Alert, this);
        sStyleClass += ShadowSupport.createStyleClass(Alert, this);
        sStyleClass += BackgroundSupport.createStyleClass(Alert, this);
        sStyleClass += ContextColorSupport.createStyleClass(Alert, this, "alert");
        sStyleClass += TextSupport.createStyleClass(Alert, this);
        sStyleClass += BorderSupport.createStyleClass(Alert, this);

        return sStyleClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(Alert);

    /*
     * END apply helpers
     */


    //Return Constructor
    return Alert;
});