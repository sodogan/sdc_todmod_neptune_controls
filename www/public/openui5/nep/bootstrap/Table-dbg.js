sap.ui.define([
    "./library",
    "sap/ui/core/Control",
    "./ElementHelper",
    "./ContextColorSupport",
    "./ResponsiveDisplaySupport",
    "./SelectionSupport",
    "./TableSelectionSupport",
    "./TableRow",
    "./TableCell"
], function (Lib, ControlBase, ElementHelper, ContextColorSupport, ResponsiveDisplaySupport, SelectionSupport, TableSelectionSupport, TableRow, TableCell) {
    "use strict";

    const oMetadata = {
        library: "nep.bootstrap",

        properties: {
            striped: {
                type: "boolean",
                defaultValue: false
            },

            border: {
                type: "nep.bootstrap.TableBorder",
                defaultValue: Lib.TableBorder.Default
            },
            
            hover: {
                type: "boolean",
                defaultValue: false
            },

            small: {
                type: "boolean",
                defaultValue: false
            },

            responsive: {
                type: "boolean",
                defaultValue: false
            },

            responsiveSmall: {
                type: "boolean",
                defaultValue: false
            },

            responsiveMedium: {
                type: "boolean",
                defaultValue: false
            },

            responsiveLarge: {
                type: "boolean",
                defaultValue: false
            },

            responsiveXLarge: {
                type: "boolean",
                defaultValue: false
            },

            responsiveXXLarge: {
                type: "boolean",
                defaultValue: false
            },

            caption: {
                type: "string"
            },

            captionTop: {
                type: "boolean",
                defaultValue: true
            },

            selectionMode: {
                type: "nep.bootstrap.TableSelectionMode",
                defaultValue: Lib.TableSelectionMode.None
            }

        },

        aggregations: {
            headerRows: {
                type: ["nep.bootstrap.TableRow", "nep.bootstrap.TableRowHeader"],
                singularName: "headerRow",
                multiple: true
            },

            rows: {
                type: "nep.bootstrap.TableRow",
                singularName: "row",
                multiple: true
            },

            footerRows: {
                type: ["nep.bootstrap.TableRow", "nep.bootstrap.TableRowFooter"],
                singularName: "footerRow",
                multiple: true
            }
        },

        defaultAggregation: "rows",

        events: {
            press: {}
        }
    };

    ElementHelper.addMetadata(oMetadata);
    ContextColorSupport.addMetadata(oMetadata);
    SelectionSupport.addMetadata(oMetadata, true);
    ResponsiveDisplaySupport.addMetadata(oMetadata);

    const fnRenderRows = function(oRm, oControl, aRows, bHeaderCellType){
        for (const oRow of aRows) {
            const aCells = oRow.getCells();

            let sContextColor = oRow.getContextColor();
            oRm.openStart("tr", oRow);

            if(sContextColor){
                oRm.addClass(ContextColorSupport.getContextColor(sContextColor, "table"));
            }

            if(oRow.getSelected()){
                oRm.class("table-active");
            }

            oRm.openEnd();

            for (const oCell of aCells) {
                const sCellType = oCell.getType(),
                    nColspan = oCell.getColspan(),
                    nRowspan = oCell.getRowspan();

                sContextColor = oCell.getContextColor();

                let sTagName = "td";

                switch(sCellType){
                    case Lib.TableCellType.Auto:
                        sTagName = bHeaderCellType ? "th" : "td";
                        break;
                    case Lib.TableCellType.Header:
                        sTagName = "th";
                        break;
                    case Lib.TableCellType.Data:
                        sTagName = "td";
                        break;
                }

                oRm.openStart(sTagName, oCell);
                if(sContextColor){
                    oRm.addClass(ContextColorSupport.getContextColor(sContextColor, "table"));
                }
                
                oRm.addClass(ResponsiveDisplaySupport.createStyleClass(TableCell, oCell));

                if(nColspan){
                    oRm.attr("colspan", nColspan);
                }

                if(nRowspan){
                    oRm.attr("rowspan", nRowspan);
                }

                oRm.addStyle("width", oCell.getWidth());
                oRm.addStyle("height", oCell.getHeight());

                oRm.openEnd();

                const aContent = oCell.getContent();
                for (const oControl of aContent) {
                    oRm.renderControl(oControl);
                }
                
                oRm.close(sTagName);
            }

            oRm.close("tr");
        }
    }

    const fnRenderer = function (oRm, oControl) {
        const aHeaderRows = oControl.getHeaderRows(), 
            aRows = oControl.getRows(),
            aFooterRows = oControl.getFooterRows(),
            sCaption = oControl.getCaption();

        oRm.openStart("table", oControl);
        oRm.addClass(oControl.createStyleClass());
        oRm.openEnd();

        if(sCaption){
            oRm.openStart("caption");
            oRm.openEnd();
            oRm.writeEscaped(sCaption);
            oRm.close("caption");
        }

        if(aHeaderRows.length){
            oRm.openStart("thead");
            oRm.openEnd();

            fnRenderRows(oRm, oControl, aHeaderRows, true);

            oRm.close("thead");
        }

        oRm.openStart("tbody");
        oRm.openEnd();

        fnRenderRows(oRm, oControl, aRows, false);

        oRm.close("tbody");

        if(aFooterRows.length){
            oRm.openStart("tfoot");
            oRm.openEnd();

            fnRenderRows(oRm, oControl, aFooterRows, false);

            oRm.close("tfoot");
        }

        oRm.close("table");

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
     * @alias nep.bootstrap.Table
     * 
     */
    const Table = ControlBase.extend("nep.bootstrap.Table", /** @lends nep.bootstrap.Table.prototype */ {
        metadata: oMetadata,
        renderer: fnRenderer
    }),
        /**
         * @alias nep.bootstrap.Table.prototype
         */
        TableProto = Table.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    Table.getStylePrefix = function () {
        return "nbsTable";
    };

    TableProto.getDisplayValue = function(){
        return "table";
    };

    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    TableProto.getAdditionalStyleClass = function () {

        let sClass = "table";

        const sBorder = this.getBorder();
        switch(sBorder){
            case Lib.TableBorder.Bordered:
                sClass += " table-bordered";
                break;
            case Lib.TableBorder.Borderless:
                sClass += " table-borderless";
                break;
        }
        
        if(this.getSmall()){
            sClass += " table-sm";
        }

        if(this.getStriped()){
            sClass += " table-striped";
        }

        if(this.getHover()){
            sClass += " table-hover";
        }

        if(this.getResponsive()){
            sClass += " table-responsive";
        }

        if(this.getResponsiveSmall()){
            sClass += " table-responsive-sm";
        }

        if(this.getResponsiveMedium()){
            sClass += " table-responsive-md";
        }

        if(this.getResponsiveLarge()){
            sClass += " table-responsive-lg";
        }

        if(this.getResponsiveXLarge()){
            sClass += " table-responsive-xl";
        }

        if(this.getResponsiveXXLarge()){
            sClass += " table-responsive-xxl";
        }

        if(this.getCaptionTop()){
            sClass += " caption-top";
        }

        sClass += ContextColorSupport.createStyleClass(Table, this, "table");
        sClass += ResponsiveDisplaySupport.createStyleClass(Table, this);

        return sClass;
    };

    //Add the helpers
    ElementHelper.addHelpers(Table);
    SelectionSupport.addMethods(Table, true);
    TableSelectionSupport.addMethods(Table);

    /*
     * END apply helpers
     */

    TableProto.onclick = function (oEvent) {
        const oSourceControl = oEvent.srcControl;
        if(oSourceControl == this){
            return;
        }

        const elTableRow = oEvent.target.closest("#" + this.getId() + " > tbody > tr");

        if(!elTableRow){
            return;
        }

        const oControl = sap.ui.getCore().byId(elTableRow.id);
        if(!oControl){
            return;
        }

        

        if(oControl.getEnabled()){
            const sSelectionMode = this.getSelectionMode(),
                    aRows = this.getRows();
                   
            switch(sSelectionMode){
                case Lib.TableSelectionMode.MultipleRow:
                    oControl.setSelected(!oControl.getSelected(), true);
                    this.fireSelectionChange();
                    break;
                case Lib.TableSelectionMode.SingleRow:
                    
                    for(const oRow of aRows){
                        oRow.setSelected(oRow === oControl, true);
                    }
                    this.fireSelectionChange();
                    break;
                case Lib.TableSelectionMode.SingleRowToggle:
                    for(const oRow of aRows){
                        oRow.setSelected((oRow === oControl) && !oRow.getSelected(), true);
                    }
                    this.fireSelectionChange();
                    break;
            }

            this.firePress({
                row: oControl
            });
        }
        
    };

    //Return Constructor
    return Table;
});