sap.ui.define([
	'sap/ui/Device',
	'sap/ui/core/library',
	"sap/ui/core/IconPool",
	"./bootstrap.bundle.min"
], function (Device, coreLib, IconPool) {
	"use strict";

	/**
	 * The ui5strap library.
	 * 
	 * @namespace
	 * @name pks.winui5
	 * @author Jan Philipp Knoeller
	 * @version 1.0.8-SNAPSHOT
	 * @public
	 */
	sap.ui.getCore().initLibrary({
		name: "nep.bootstrap",
		version: "1.0.0",
		dependencies: ["sap.ui.core"],
		types: [],
		interfaces: [],
		controls: [
			"nep.bootstrap.Alert",
			"nep.bootstrap.Accordion",
			"nep.bootstrap.AccordionItem",
			"nep.bootstrap.Button",
			"nep.bootstrap.ButtonGroup",
			"nep.bootstrap.ButtonToolbar",
			"nep.bootstrap.Card",
			"nep.bootstrap.Carousel",
			"nep.bootstrap.CarouselItem",
			"nep.bootstrap.CheckRadioToggle",
			"nep.bootstrap.Container",
			"nep.bootstrap.Col",
			"nep.bootstrap.DropdownItem",
			"nep.bootstrap.FlexBox",
			"nep.bootstrap.FlexBoxItem",
			"nep.bootstrap.HorizontalLine",
			"nep.bootstrap.ListGroup",
			"nep.bootstrap.ListGroupItem",
			"nep.bootstrap.Image",
			"nep.bootstrap.Modal",
			"nep.bootstrap.Nav",
			"nep.bootstrap.NavBar",
			"nep.bootstrap.NavItem",
			"nep.bootstrap.NavContainer",
			"nep.bootstrap.Offcanvas",
			"nep.bootstrap.Page",
			"nep.bootstrap.Progress",
			"nep.bootstrap.Row",
			"nep.bootstrap.Select",
			"nep.bootstrap.Table",
			"nep.bootstrap.TableCell",
			"nep.bootstrap.TableRow",
			"nep.bootstrap.TableRowHeader",
			"nep.bootstrap.TableRowFooter",
			"nep.bootstrap.Text",
			"nep.bootstrap.Toast",
			"nep.bootstrap.Input"
		],
		elements: []
	});

	/**
	 * @alias nep.bootstrap
	 */
	const Lib = nep.bootstrap;

	Lib.TableCellType = {
		Auto: "Auto",
		Data: "Data",
		Header: "Header"
	};

	Lib.TableBorder = {
		Default: "Default",
		Bordered: "Bordered",
		Borderless: "Borderless"
	};

	Lib.ListSelectionMode = {
		None: "None",
		Single: "Single",
		SingleToggle: "SingleToggle",
		Multiple: "Multiple"
	};

	Lib.TableSelectionMode = {
		None: "None",
		SingleRow: "SingleRow",
		SingleRowToggle: "SingleRowToggle",
		MultipleRow: "MultipleRow"
	};

	Lib.NavType = {
		Default: "Default",
		NavBar: "NavBar",
		Pills: "Pills",
		Tabs: "Tabs",
		Columns: "Columns"
	};

	Lib.ColorScheme = {
		Light: "Light",
		Dark: "Dark"
	};

	Lib.NavBarExpand = {
		Never: "Never",
		Always: "Always",
		Small: "Small",
		Medium: "Medium",
		Large: "Large",
		XLarge: "XLarge"
	};

	Lib.FlexDirection = {
		Row: "Row",
		RowReverse: "RowReverse",
		Column: "Column",
		ColumnReverse: "ColumnReverse"
	};

	Lib.FlexWrap = {
		NoWrap: "NoWrap",
		Wrap: "Wrap",
		WrapReverse: "WrapReverse"
	};

	Lib.FlexGrow = {
		Grow0: "Grow0",
		Grow1: "Grow1"
	};

	Lib.FlexShrink = {
		Shrink0: "Shrink0",
		Shrink1: "Shrink1"
	};

	Lib.Overflow = {
		Auto: "Auto",
		Visible: "Visible",
		Hidden: "Hidden",
		Scroll: "Scroll"
	};

	Lib.ModalBackdrop = {
		Default: "Default",
		None: "None",
		Static: "Static"
	};

	Lib.ModalSize = {
		Default: "Default",
		Small: "Small",
		Large: "Large",
		XLarge: "XLarge"
	};

	Lib.ModalFullScreen = {
		Never: "Never",
		Always: "Always",
		BelowSmall: "BelowSmall",
		BelowMedium: "BelowMedium",
		BelowLarge: "BelowLarge",
		BelowXLarge: "BelowXLarge",
		BelowXXLarge: "BelowXXLarge"
	};

	Lib.NavBarPlacement = {
		FixedTop: "FixedTop",
		FixedBottom: "FixedBottom",
		StickyTop: "StickyTop"
	};

	Lib.NavBarPlacementToClass = {
		FixedTop: "fixed-top",
		FixedBottom: "fixed-bottom",
		StickyTop: "sticky-top"
	};

	Lib.OffcanvasPlacement = {
		Top: "Top",
		Bottom: "Bottom",
		Start: "Start",
		End: "End"
	};

	Lib.DropdownDirection = {
		Top: "Top",
		Bottom: "Bottom",
		Start: "Start",
		End: "End"
	};


	Lib.DropdownMenuAligment = {
		Start: "Start",
		End: "End"
	};

	Lib.ContainerType = {
		Plain: "Plain",
		Normal: "Normal",
		Fluid: "Fluid",
		Small: "Small",
		Medium: "Medium",
		Large: "Large",
		XLarge: "XLarge",
		XXLarge: "XXLarge"
	};

	Lib.ContainerTypeToClass = {
		Plain: "",
		Normal: "container",
		Fluid: "container-fluid",
		Small: "container-sm",
		Medium: "container-md",
		Large: "container-lg",
		XLarge: "container-xl",
		XXLarge: "container-xxl"
	};

	Lib.BsElement = {
		Modal: "modal",
		Toast: "toast",
		Offcanvas: "offcanvas",
		Dropdown: "dropdown",
		Alert: "alert"
	};

	Lib.GutterSize = {
		Gutter0: "Gutter0",
		Gutter1: "Gutter1",
		Gutter2: "Gutter2",
		Gutter3: "Gutter3",
		Gutter4: "Gutter4",
		Gutter5: "Gutter5"
	};

	Lib.ColumnSpan = {
		None: "None",
		Default: "Default",
		Col1: "Col1",
		Col2: "Col2",
		Col3: "Col3",
		Col4: "Col4",
		Col5: "Col5",
		Col6: "Col6",
		Col7: "Col7",
		Col8: "Col8",
		Col9: "Col9",
		Col10: "Col10",
		Col11: "Col11",
		Col12: "Col12",
		Auto: "Auto"
	};

	Lib.ColumnOffset = {
		Offset1: "Offset1",
		Offset2: "Offset2",
		Offset3: "Offset3",
		Offset4: "Offset4",
		Offset5: "Offset5",
		Offset6: "Offset6",
		Offset7: "Offset7",
		Offset8: "Offset8",
		Offset9: "Offset9",
		Offset10: "Offset10",
		Offset11: "Offset11",
	};

	Lib.ColumnsPerRow = {
		Col1: "Col1",
		Col2: "Col2",
		Col3: "Col3",
		Col4: "Col4",
		Col5: "Col5",
		Col6: "Col6",
		Auto: "Auto"
	};

	Lib.Align = {
		Start: "Start",
		Center: "Center",
		End: "End"
	};

	Lib.AlignContent = {
		Start: "Start",
		Center: "Center",
		End: "End",
		Around: "Around",
		Stretch: "Stretch"
	};

	Lib.Order = {
		OrderFirst: "OrderFirst",
		Order0: "Order0",
		Order1: "Order1",
		Order2: "Order2",
		Order3: "Order3",
		Order4: "Order4",
		Order5: "Order5",
		OrderLast: "OrderLast"
	};

	Lib.JustifyContent = {
		Start: "Start",
		Center: "Center",
		End: "End",
		Around: "Around",
		Between: "Between",
		Evenly: "Evenly",
	};

	Lib.ToastPosition = {
		TopLeft: "TopLeft",
		TopCenter: "TopCenter",
		TopRight: "TopRight",
		MiddleLeft: "MiddleLeft",
		MiddleCenter: "MiddleCenter",
		MiddleRight: "MiddleRight",
		BottomLeft: "BottomLeft",
		BottomCenter: "BottomCenter",
		BottomRight: "BottomRight"
	};

	Lib.ButtonType = {
		Default: "Default",
		Outline: "Outline",
		Link: "Link",
		Close: "Close"
	};

	Lib.ContextColor = {
		Primary: "Primary",
		Secondary: "Secondary",
		Success: "Success",
		Danger: "Danger",
		Warning: "Warning",
		Info: "Info",
		Light: "Light",
		Dark: "Dark"
	};

	Lib.TextType = {
		Text: "Text",
		Paragraph: "Paragraph",
		Strong: "Strong",
		Small: "Small",
		Emphasized: "Emphasized",
		Label: "Label",
		Heading1: "Heading1",
		Heading2: "Heading2",
		Heading3: "Heading3",
		Heading4: "Heading4",
		Heading5: "Heading5",
		Heading6: "Heading6",
		Inserted: "Inserted",
		Deleted: "Deleted",
		Mark: "Mark",
		Badge: "Badge",
		Blockquote: "Blockquote",
		NavbarText: "NavbarText"
	};

	Lib.TextColor = {
		Primary: "Primary",
		Secondary: "Secondary",
		Success: "Success",
		Danger: "Danger",
		Warning: "Warning",
		Info: "Info",
		Light: "Light",
		Dark: "Dark",
		Body: "Body",
		White: "White",
		Muted: "Muted",
		Black50: "Black50",
		White50: "White50",
		Default: ""
	};

	Lib.TextAlignment = {
		Start: "Start",
		Center: "Center",
		End: "End",
	};

	Lib.BackgroundColor = {
		Primary: "Primary",
		Secondary: "Secondary",
		Success: "Success",
		Danger: "Danger",
		Warning: "Warning",
		Info: "Info",
		Light: "Light",
		Dark: "Dark",
		Body: "Body",
		White: "White",
		Transparent: "Transparent",
		Default: ""
	};

	Lib.Border = {
		Border: "Border",
		BorderTop: "BorderTop",
		BorderBottom: "BorderBottom",
		BorderStart: "BorderStart",
		BorderEnd: "BorderEnd",
		BorderStartEnd: "BorderStartEnd",
		BorderTopBottom: "BorderTopBottom",
		Border0: "Border0",
		BorderTop0: "BorderTop0",
		BorderBottom0: "BorderBottom0",
		BorderStart0: "BorderStart0",
		BorderEnd0: "BorderEnd0",
		BorderStartEnd0: "BorderStartEnd0",
		BorderTopBottom0: "BorderTopBottom0"
	};

	Lib.BorderColor = {
		Primary: "Primary",
		Secondary: "Secondary",
		Success: "Success",
		Danger: "Danger",
		Warning: "Warning",
		Info: "Info",
		Light: "Light",
		Dark: "Dark",
		White: "White",
	};

	Lib.BorderSize = {
		Border0: "Border0",
		Border1: "Border1",
		Border2: "Border2",
		Border3: "Border3",
		Border4: "Border4",
		Border5: "Border5",
	};

	Lib.BorderRadius = {
		Rounded0: "Rounded0",
		Rounded1: "Rounded1",
		Rounded2: "Rounded2",
		Rounded3: "Rounded3",
		RoundedCircle: "RoundedCircle",
		RoundedPill: "RoundedPill",
	};

	Lib.FontSize = {
		FontSize1: "FontSize1",
		FontSize2: "FontSize2",
		FontSize3: "FontSize3",
		FontSize4: "FontSize4",
		FontSize5: "FontSize5",
		FontSize6: "FontSize6",
	};

	Lib.FontWeight = {
		Bold: "Bold",
		Bolder: "Bolder",
		Normal: "Normal",
		Light: "Light",
		Lighter: "Lighter",
		Italic: "Italic",
		NormalStyle: "NormalStyle",
	};

	Lib.ButtonSize = {
		Small: "Small",
		Normal: "Normal",
		Large: "Large"
	};

	Lib.ShadowSize = {
		Small: "Small",
		Normal: "Normal",
		Large: "Large"
	};

	Lib.InputType = {
		Text: "Text",
		Password: "Password",
		File: "File",
		TextArea: "TextArea",
		Email: "Email",
		Search: "Search",
		Tel: "Tel",
		Url: "Url",
		Date: "Date",
		Number: "Number",
		Range: "Range",
		DateTimeLocal: "DateTimeLocal",
		Month: "Month",
		Time: "Time",
		Week: "Week",
		Color: "Color"
	};

	Lib.InputTypeToAttr = {
		Text: "text",
		Password: "password",
		TextArea: null,
		File: "file",
		Email: "email",
		Search: "search",
		Tel: "tel",
		Url: "url",
		Date: "date",
		Number: "number",
		Range: "range",
		DateTimeLocal: "datetime-local",
		Month: "month",
		Time: "time",
		Week: "week",
		Color: "color"
	};

	Lib.InputSize = {
		Small: "Small",
		Normal: "Normal",
		Large: "Large"
	};

	Lib.InputValidity = {
		Valid: "Valid",
		Invalid: "Invalid",
		None: "None"
	};

	Lib.InputSizeToClass = {
		Small: "sm",
		Normal: "",
		Large: "lg"
	};
	Lib.ButtonGroupLayout = {
		Vertical: "Vertical",
		Horizontal: "Horizontal"
	};

	Lib.FormLayout = {
		Vertical: "Vertical",
		Horizontal: "Horizontal",
		Floating: "Floating"
	};

	Lib.CheckRadioToggleType = {
		Checkbox: "Checkbox",
		Radio: "Radio",
		Switch: "Switch",
		ToggleButton: "ToggleButton",
		RadioToggle: "RadioToggle"
	};

	Lib.CarouselAnimation = {
		Slide: "Slide",
		Fade: "Fade"
	};

	Lib.TitleLevel = {
		H1: "H1",
		H2: "H2",
		H3: "H3",
		H4: "H4",
		H5: "H5",
		H6: "H6"
	};

	Lib.CardImagePlacement = {
		Top: "Top",
		Bottom: "Bottom"
	};

	Lib.Margin = {

		MarginAuto: "MarginAuto",
		MarginStartAuto: "MarginStartAuto",
		MarginEndAuto: "MarginEndAuto",
		MarginTopAuto: "MarginTopAuto",
		MarginBottomAuto: "MarginBottomAuto",
		MarginStartEndAuto: "MarginStartEndAuto",
		MarginTopBottomAuto: "MarginTopBottomAuto",

		Margin5: "Margin5",
		MarginStart5: "MarginStart5",
		MarginEnd5: "MarginEnd5",
		MarginTop5: "MarginTop5",
		MarginBottom5: "MarginBottom5",
		MarginStartEnd5: "MarginStartEnd5",
		MarginTopBottom5: "MarginTopBottom5",

		Margin4: "Margin4",
		MarginStart4: "MarginStart4",
		MarginEnd4: "MarginEnd4",
		MarginTop4: "MarginTop4",
		MarginBottom4: "MarginBottom4",
		MarginStartEnd4: "MarginStartEnd4",
		MarginTopBottom4: "MarginTopBottom4",

		Margin3: "Margin3",
		MarginStart3: "MarginStart3",
		MarginEnd3: "MarginEnd3",
		MarginTop3: "MarginTop3",
		MarginBottom3: "MarginBottom3",
		MarginStartEnd3: "MarginStartEnd3",
		MarginTopBottom3: "MarginTopBottom3",

		Margin2: "Margin2",
		MarginStart2: "MarginStart2",
		MarginEnd2: "MarginEnd2",
		MarginTop2: "MarginTop2",
		MarginBottom2: "MarginBottom2",
		MarginStartEnd2: "MarginStartEnd2",
		MarginTopBottom2: "MarginTopBottom2",

		Margin1: "Margin1",
		MarginStart1: "MarginStart1",
		MarginEnd1: "MarginEnd1",
		MarginTop1: "MarginTop1",
		MarginBottom1: "MarginBottom1",
		MarginStartEnd1: "MarginStartEnd1",
		MarginTopBottom1: "MarginTopBottom1",

		Margin0: "Margin0",
		MarginStart0: "MarginStart0",
		MarginEnd0: "MarginEnd0",
		MarginTop0: "MarginTop0",
		MarginBottom0: "MarginBottom0",
		MarginStartEnd0: "MarginStartEnd0",
		MarginTopBottom0: "MarginTopBottom0",

	};

	Lib.Padding = {

		PaddingAuto: "PaddingAuto",
		PaddingStartAuto: "PaddingStartAuto",
		PaddingEndAuto: "PaddingEndAuto",
		PaddingTopAuto: "PaddingTopAuto",
		PaddingBottomAuto: "PaddingBottomAuto",
		PaddingStartEndAuto: "PaddingStartEndAuto",
		PaddingTopBottomAuto: "PaddingTopBottomAuto",

		Padding5: "Padding5",
		PaddingStart5: "PaddingStart5",
		PaddingEnd5: "PaddingEnd5",
		PaddingTop5: "PaddingTop5",
		PaddingBottom5: "PaddingBottom5",
		PaddingStartEnd5: "PaddingStartEnd5",
		PaddingTopBottom5: "PaddingTopBottom5",

		Padding4: "Padding4",
		PaddingStart4: "PaddingStart4",
		PaddingEnd4: "PaddingEnd4",
		PaddingTop4: "PaddingTop4",
		PaddingBottom4: "PaddingBottom4",
		PaddingStartEnd4: "PaddingStartEnd4",
		PaddingTopBottom4: "PaddingTopBottom4",

		Padding3: "Padding3",
		PaddingStart3: "PaddingStart3",
		PaddingEnd3: "PaddingEnd3",
		PaddingTop3: "PaddingTop3",
		PaddingBottom3: "PaddingBottom3",
		PaddingStartEnd3: "PaddingStartEnd3",
		PaddingTopBottom3: "PaddingTopBottom3",

		Padding2: "Padding2",
		PaddingStart2: "PaddingStart2",
		PaddingEnd2: "PaddingEnd2",
		PaddingTop2: "PaddingTop2",
		PaddingBottom2: "PaddingBottom2",
		PaddingStartEnd2: "PaddingStartEnd2",
		PaddingTopBottom2: "PaddingTopBottom2",

		Padding1: "Padding1",
		PaddingStart1: "PaddingStart1",
		PaddingEnd1: "PaddingEnd1",
		PaddingTop1: "PaddingTop1",
		PaddingBottom1: "PaddingBottom1",
		PaddingStartEnd1: "PaddingStartEnd1",
		PaddingTopBottom1: "PaddingTopBottom1",

		Padding0: "Padding0",
		PaddingStart0: "PaddingStart0",
		PaddingEnd0: "PaddingEnd0",
		PaddingTop0: "PaddingTop0",
		PaddingBottom0: "PaddingBottom0",
		PaddingStartEnd0: "PaddingStartEnd0",
		PaddingTopBottom0: "PaddingTopBottom0",

	};

	Lib.resolveIcon = function (sIconPath) {
		var mInfo = {};
		if (0 === sIconPath.indexOf("sap-icon://")) {
			var mIconInfo = IconPool.getIconInfo(sIconPath) || {};

			mInfo.image = false;
			mInfo.fontFamily = mIconInfo.fontFamily;
			mInfo.content = mIconInfo.content;

			//console.log(mInfo);
		}
		else {
			mInfo.image = true;
			mInfo.src = sIconPath;
		}

		return mInfo;
	};

	/**
	 * 
	 */
	Lib.createIcon = function (sIconPath, sClass, sId, sCustomStyle) {
		const mInfo = Lib.resolveIcon(sIconPath);

		let sHtml = "";

		if (mInfo.image) {
			sHtml = '<span ';

			if (sClass) sHtml += 'class="' + sClass + '" ';
			if (sId) sHtml += 'id="' + sId + '"';
			if (sCustomStyle) sHtml += 'style="' + sCustomStyle + '"';

			sHtml += '>';
			sHtml += '<img src="' + mInfo.src + '" />';
			sHtml += '</span>';
		}
		else {
			var sStyle = "font-family:'" + mInfo.fontFamily + "';";

			sHtml = '<span ';

			if (sClass) sHtml += 'class="' + sClass + '" ';
			if (sId) sHtml += 'id="' + sId + '"';
			if (sCustomStyle) sStyle += sCustomStyle;

			sHtml += 'style="' + sStyle + '"';
			sHtml += '>' + mInfo.content + '</span>';
		}
		return sHtml;
	};

	Lib.changeIcon = function(sId, sIconPath){
		const mInfo = Lib.resolveIcon(sIconPath),
			elIcon = document.getElementById(sId);

		if(!elIcon){
			console.warn("Cannot change icon: cannot find element: " + sId);
			return;
		}

		if (mInfo.image) {
			const elImg = elIcon.querySelector("img");
			if(elImg){
				elImg.src =  mInfo.src;
			}
			else{
				console.warn("Cannot change icon: image not present!");
			}
		}	
		else{
			elIcon.textContent = mInfo.content;
		}
	};

	//Return constructor
	return Lib;
});
