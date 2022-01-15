sap.ui.define(["./library"], function (Lib) {

    "use strict";

    /**
     * @class
     * Class that provides support for overflow.
     * @alias nep.bootstrap.NavContainerSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    const NavContainerSupport = {},
        Trait = {};

    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    NavContainerSupport.addMetadata = function (oMetadata) {
        if(!oMetadata.associations){
            oMetadata.associations = {};
        }

        oMetadata.associations.navContainer = {
            type: "nep.bootstrap.NavContainer"
        };

    };

    Trait.setNavContainer = function(sId, bSuppress){
        this.setAssociation("navContainer", sId, true);

        const aSelectedItems = this.getSelectedItems();
        if(aSelectedItems && aSelectedItems.length){
            this.onSelectionChange(aSelectedItems[aSelectedItems.length-1], true);
        }

        return this;
    };

    Trait.onSelectionChange = function(oItem, bSelected){
        if(!bSelected){
            return;
        }

        //console.log("NEW SELECTED: ", oItem, bSelected, oItem.getTargetPage());
        const sNavContainer = this.getNavContainer();

        if(sNavContainer){
            const oNavContainer = sap.ui.getCore().byId(sNavContainer);

            if(oNavContainer){
                let sTargetPage = oItem.getTargetPage();

                if(sTargetPage){
                    sTargetPage = sap.ui.getCore().byId(sTargetPage);
                }

                if(sTargetPage){
                    oNavContainer.to(sTargetPage);
                }
            }
            else{
                console.warn("Could not find NavContainer: " + sNavContainer);
            }
        }
    };

    NavContainerSupport.addMethods = function(ElementConstructor){
        ElementConstructor.prototype.setNavContainer = Trait.setNavContainer;
        ElementConstructor.prototype.onSelectionChange = Trait.onSelectionChange;
    };

    return NavContainerSupport;
});