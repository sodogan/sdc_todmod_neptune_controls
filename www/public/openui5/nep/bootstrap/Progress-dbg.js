sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport",
    "./ShadowSupport",
    "./BackgroundSupport",
    "./TextSupport"
], function (Lib, ControlBase, ElementHelper, MarginSupport, ShadowSupport, BackgroundSupport, TextSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

            enabled: {
                type: "boolean",
                defaultValue: true
            },

            striped: {
                type: "boolean",
                defaultValue: false
            },

            animated: {
                type: "boolean",
                defaultValue: false
            },

            text: {
                type: "string"
            },

            min: {
                type: "int",
                defaultValue: 0
            },

            max: {
                type: "int",
                defaultValue: 100
            },

            percentValue: {
                type: "int",
                defaultValue: 0
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
    };

    ElementHelper.addMetadata(oMetadata);
    MarginSupport.addMetadata(oMetadata);
    ShadowSupport.addMetadata(oMetadata);
    BackgroundSupport.addMetadata(oMetadata);
    TextSupport.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());

        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());

        if (!oControl.getEnabled()) oRm.attr("disabled", "disabled");
        oRm.openEnd();

        oRm.openStart("div");
        oRm.addClass("progress-bar");

        if (oControl.getStriped()) oRm.addClass("progress-bar-striped");
        if (oControl.getAnimated()) oRm.addClass("progress-bar-animated");

        oRm.addClass(BackgroundSupport.createStyleClass(Progress, oControl));
        oRm.addClass(TextSupport.createStyleClass(Progress, oControl));

        oRm.attr("role", "progressbar");
        oRm.attr("aria-valuemin", oControl.getMin());
        oRm.attr("aria-valuemax", oControl.getMax());
        oRm.attr("aria-valuenow", oControl.getPercentValue());
        oRm.addStyle("width", oControl.getPercentValue() + "%");
        oRm.openEnd();

        if (oControl.getText()) {
            oRm.openStart("span", oControl.createSubId("text"));
            oRm.class(oControl.createStyleClass("text"));
            oRm.openEnd();
            oRm.text(oControl.getText());
            oRm.close("span");
        }

        oRm.close("div");
        oRm.close("div");


    };

    /**
     * Constructor for a new Progress instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating Bootstrap Progresss.
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias nep.bootstrap.Progress
     * 
     */
    const Progress = ControlBase.extend("nep.bootstrap.Progress", /** @lends nep.bootstrap.Progress.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Progress.prototype
         */
        ProgressProto = Progress.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Progress.getStylePrefix = function () {
        return "nbsProgress";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    ProgressProto.getAdditionalStyleClass = function () {

        let sStyleClass = "progress";

        sStyleClass += MarginSupport.createStyleClass(Progress, this);
        sStyleClass += ShadowSupport.createStyleClass(Progress, this);

        return sStyleClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(Progress);

    /*
     * END apply helpers
     */

    ProgressProto.onclick = function (oEvent) {
        if (this.getEnabled()) {
            this.firePress();
        }
    };

    //Return Constructor
    return Progress;
});