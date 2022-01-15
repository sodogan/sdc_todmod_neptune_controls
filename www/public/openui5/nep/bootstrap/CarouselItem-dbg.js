sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper"
], function (Lib, ControlBase, ElementHelper) {
    "use strict";

    const oMetadata = {

        library: "nep.bootstrap",

        properties: {

            interval: {
                type: "string"
            },

        },

        aggregations: {
            content: {
                type: "sap.ui.core.Control",
                multiple: true
            },
            caption: {
                type: "sap.ui.core.Control",
                multiple: true
            }
        },

        defaultAggregation: "content"

    };

    ElementHelper.addMetadata(oMetadata);

    const fnRenderer = function (oRm, oControl) {

        const aContent = oControl.getContent(),
            aCaption = oControl.getCaption(),
            sInterval = oControl.getInterval();

        oRm.openStart("div", oControl);
        oRm.addClass(oControl.createStyleClass());

        if (sInterval){
            oRm.attr("data-bs-interval", sInterval);
        }

        oRm.openEnd();

        for (const oContent of aContent) {
            oRm.renderControl(oContent);
        }

        if (aCaption.lenght) {
            oRm.openStart("div");
            oRm.addClass("carousel-caption d-none d-md-block");
            oRm.openEnd();

            for(const oCaption of aCaption){
                oRm.renderControl(oCaption);
            }

            oRm.close("div");
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
     * @alias nep.bootstrap.CarouselItem
     * 
     */
    const CarouselItem = ControlBase.extend("nep.bootstrap.CarouselItem", /** @lends nep.bootstrap.CarouselItem.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.CarouselItem.prototype
         */
        CarouselItemProto = CarouselItem.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    CarouselItem.getStylePrefix = function () {
        return "nbsCarouselItem";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    CarouselItemProto.getAdditionalStyleClass = function () {

        let sClass = "carousel-item";

        if (this.getParent().getCurrentItem() === this) {
            sClass += " active";
        }

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(CarouselItem);

    /*
     * END apply helpers
     */

    //Return Constructor
    return CarouselItem;
});