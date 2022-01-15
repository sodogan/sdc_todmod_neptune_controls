sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./MarginSupport",
    "./PaddingSupport",
    "./BackgroundSupport",
    "./BorderSupport",
    "./ShadowSupport",
    "./JustifyContentSupport",
], function (Lib, ControlBase, ElementHelper, MarginSupport, PaddingSupport, BackgroundSupport, BorderSupport, ShadowSupport, JustifyContentSupport) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {

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
    JustifyContentSupport.addMetadata(oMetadata);


    const fnRenderer = function (oRm, oControl) {

        const aContent = oControl.getContent();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.attr("role", "toolbar");
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
     * @alias nep.bootstrap.ButtonToolbar
     * 
     */
    const ButtonToolbar = ControlBase.extend("nep.bootstrap.ButtonToolbar", /** @lends nep.bootstrap.ButtonToolbar.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.ButtonToolbar.prototype
         */
        ButtonToolbarProto = ButtonToolbar.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    ButtonToolbar.getStylePrefix = function () {
        return "nbsButtonToolbar";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    ButtonToolbarProto.getAdditionalStyleClass = function () {

        let sClass = "btn-toolbar";

        sClass += MarginSupport.createStyleClass(ButtonToolbar, this);
        sClass += PaddingSupport.createStyleClass(ButtonToolbar, this);
        sClass += BackgroundSupport.createStyleClass(ButtonToolbar, this);
        sClass += BorderSupport.createStyleClass(ButtonToolbar, this);
        sClass += ShadowSupport.createStyleClass(ButtonToolbar, this);
        sClass += JustifyContentSupport.createStyleClass(ButtonToolbar, this);

        return sClass;

    };

    //Add the helpers
    ElementHelper.addHelpers(ButtonToolbar);

    /*
     * END apply helpers
     */

    //Return Constructor
    return ButtonToolbar;
});