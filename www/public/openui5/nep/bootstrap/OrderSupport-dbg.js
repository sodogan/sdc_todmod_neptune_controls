sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for responsive visibility.
     * @alias nep.bootstrap.OrderSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const OrderSupport = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    OrderSupport.addMetadata = function (oMetadata) {

        oMetadata.properties.order = {
            type: "nep.bootstrap.Order"
        };

        oMetadata.properties.orderSmall = {
            type: "nep.bootstrap.Order"
        };

        oMetadata.properties.orderMedium = {
            type: "nep.bootstrap.Order"
        },

        oMetadata.properties.orderLarge = {
            type: "nep.bootstrap.Order"
        };

        oMetadata.properties.orderXLarge = {
            type: "nep.bootstrap.Order"
        };

        oMetadata.properties.orderXXLarge = {
            type: "nep.bootstrap.Order"
        };

    };

    const mOrderToClass = {
        OrderFirst: "first",
        Order1: "1",
        Order2: "2",
        Order3: "3",
        Order4: "4",
        Order5: "5",
        OrderLast: "last"
    };

    OrderSupport.getOrder = function(sOrder, sSize){
        if(!sOrder){
            return "";
        }

        return "order" + (sSize ? "-" + sSize : "") + "-" + mOrderToClass[sOrder];
    };

    OrderSupport.createStyleClass = function (Constr, oInstance) {
        let sStyle = " " + OrderSupport.getOrder(oInstance.getOrder());
        
        sStyle += " " + OrderSupport.getOrder(oInstance.getOrderSmall(), "sm");
        sStyle += " " + OrderSupport.getOrder(oInstance.getOrderMedium(), "md");
        sStyle += " " + OrderSupport.getOrder(oInstance.getOrderLarge(), "lg");
        sStyle += " " + OrderSupport.getOrder(oInstance.getOrderXLarge(), "xl");
        sStyle += " " + OrderSupport.getOrder(oInstance.getOrderXXLarge(), "xxl");

        return sStyle;
    };

    return OrderSupport;
});