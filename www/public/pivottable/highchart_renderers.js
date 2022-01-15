(function ($) {
    'use strict'

    var titleFormatter = function (text) {        
        if (text && stringStartsWith(text, "[") && stringEndsWith(text, "]")) {
            text = text.substring(text.lastIndexOf("[") + 1)
            text = text.substring(0, text.length - 1);
        }
        return text;
    }
    var stringStartsWith = function (string, prefix) {
        return string.slice(0, prefix.length) == prefix;
    };
    var stringEndsWith = function (string, suffix) {
        return suffix == '' || string.slice(-suffix.length) == suffix;
    };

    var makeHighChart, makeTreemap;

    function makeHighChart(chartType, extraOptions) {

        return function (pivotData, opts) {
            var agg, colKey, colKeys, categories, defaults, groupByTitle, h, hAxisTitle, series, rowKey, rowKeys, title, vAxisTitle, _i, _j, _len, _len1;
            defaults = {
                $el: $(document),
                localeStrings: {
                    vs: "vs",
                    by: "by",
                    and: "and"
                }
            };
            opts = $.extend({}, defaults, opts);            

            rowKeys = pivotData.getRowKeys();
            if (rowKeys.length === 0) rowKeys.push([]);

            colKeys = pivotData.getColKeys();
            if (colKeys.length === 0) colKeys.push([]);

            // Series
            series = [];
            for (_i = 0, _len = rowKeys.length; _i < _len; _i++) {
                var rowData = [];
                rowKey = rowKeys[_i];
                for (_j = 0, _len1 = colKeys.length; _j < _len1; _j++) {
                    colKey = colKeys[_j];

                    agg = pivotData.getAggregator(rowKey, colKey);
                    if (agg.value() != null) {

                        if (chartType == "pie") {
                            colKey[0]
                            rowData.push({name: colKey[0], y:agg.value()});
                        } else {
                            rowData.push(agg.value());
                        }
                    } else {
                        rowData.push(null);
                    }
                }
                h = rowKeys[_i];
                series.push({
                    name: h.join("-"),
                    data: rowData
                });
            }

            // Categories
            categories = [];
            for (_i = 0, _len = colKeys.length; _i < _len; _i++) {
                colKey = colKeys[_i];
                categories.push(colKey.join("-"));
            };

            // Titles
            title = titleFormatter(pivotData.aggregatorName);

            hAxisTitle = pivotData.rowAttrs.map(titleFormatter).join(",");
            if (hAxisTitle !== "") title += " by " + hAxisTitle;

            groupByTitle = pivotData.colAttrs.map(titleFormatter).join(",");

            if (groupByTitle !== "") {
                if (hAxisTitle) {
                    title += " and " + groupByTitle;
                } else {
                    title += " by " + groupByTitle;
                }
            }

            var parent = getParent(); 
            var $result = $("<div class='pvtHighChart'>").width(parent.offsetWidth - 20).height(parent.offsetHeight - 20);

            var enabledLegend = true;
            if (series.length <= 1) enabledLegend = false;

            var options = {
                chart: {
                    type: chartType,
                    style: { fontFamily: '72' },
                    backgroundColor: "transparent",
                    zoomType: 'xy',
                },
                title: {
                    text: title,
                    align: "left",
                    style: { fontSize: "16px" }
                },
                xAxis: {
                    title: { text: hAxisTitle },
                    categories: categories
                },
                yAxis: {
                    title: { text: vAxisTitle }
                },
                tooltip: {
                    formatter: function () {
                        return (this.key && this.key != "" ? '<span style="font-size: 10px">' + this.key + '</span><br/>' : "") +
                            '<span style="color:' + this.point.series.color + '">\u25CF</span> ' + this.series.name + ': <b>' + Highcharts.numberFormat(this.point.y, 2) + '</b><br/>'
                    }
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    enabled: enabledLegend
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    },
                    column: {borderRadius: 0 },
                    bar: {borderRadius: 0}                    
                },
                credits: false,
                series: series
            };

            if (extraOptions) options = $.extend(options, extraOptions, true);
            if (opts) options = $.extend(options, opts, true);

            $result.highcharts(options);

            try {
                setTimeout(function () {
                    Highcharts.charts[Highcharts.charts.length - 1].reflow();
                }, 10);
            } catch (e) { }

            return $result;

        };
    };

    function makeTreemap() {

        return function (pivotData, opts) {
            var title, vAxisTitle, hAxisTitle, groupByTitle, series, _i, _j, _len, _len1, agg, value, rowKeys, colKeys, defaults, rowKey, colKey;

            defaults = {
                $el: $(document),
                localeStrings: {
                    vs: "vs",
                    by: "by",
                    and: "and"
                }
            };

            opts = $.extend(defaults, opts);
            rowKeys = pivotData.getRowKeys();
            series = [];

            var item;
            var itemDic = {};
            var countLevel1 = 0;

            for (var nRow = 0; nRow < rowKeys.length; nRow++) {
                var row = rowKeys[nRow];
                var acumKey = "";
                var prevKey = "";
                for (var nKey = 0; nKey < row.length; nKey++) {
                    var key = row[nKey];
                    acumKey = acumKey + "_" + key;

                    if (!itemDic[acumKey]) {
                        item = {
                            id: acumKey,
                            name: key,
                            value: 0
                        };
                        if (nKey == 0) {
                            item.color = Highcharts.getOptions().colors[countLevel1];
                            countLevel1++;
                        }
                        else {
                            item.parent = prevKey;
                        }

                        itemDic[acumKey] = item;
                    }
                    item = itemDic[acumKey];
                    item.value += pivotData.getAggregator(row, []).value();
                    prevKey = acumKey;
                }
            }

            for (var key in itemDic) {
                series.push(itemDic[key]);
            }

            title = titleFormatter(pivotData.aggregatorName);

            hAxisTitle = pivotData.rowAttrs.map(titleFormatter).join(",");
            if (hAxisTitle !== "") title += " " + opts.localeStrings.by + " " + hAxisTitle;

            var parent = getParent(); 
            var $result = $("<div class='pvtHighChart'>").width(parent.offsetWidth - 20).height(parent.offsetHeight - 20);

            var options = {
                chart: {
                    type: "treemap",
                    style: { fontFamily: '72' },
                    backgroundColor: "transparent",
                     zoomType: 'xy',
                },
                series: [{
                    layoutAlgorithm: 'squarified',
                    allowDrillToNode: true,
                    dataLabels: { enabled: false },
                    levelIsConstant: false,
                    levels: [{
                        level: 1,
                        dataLabels: { enabled: true },
                        borderWidth: 3
                    }],
                    data: series
                }],
                title: {
                    text: title,
                    align: "left",
                    style: { fontSize: "16px" }
                },
                credits: false
            };


            if (opts) options = $.extend(options, opts, true);

             $result.highcharts(options);

             try {
                setTimeout(function () {
                    Highcharts.charts[Highcharts.charts.length - 1].reflow();
                }, 10);
            } catch (e) { }

            return $result;

        }

    }

    function getParent() {
        var elems = document.getElementsByClassName("pvtUi");
        var elem = elems[elems.length - 1]       
        return elem.parentNode.parentNode.parentNode;
    }

    return $.pivotUtilities.highchart_renderers = {
        "Area Chart": makeHighChart("area", { plotOptions: { series: { stacking: 'normal' } }, }),
        "Area Spline Chart": makeHighChart("areaspline"),
        "Area Percent Chart": makeHighChart("area", { plotOptions: { series: { stacking: 'percent' } }, }),        
        "Bar Chart": makeHighChart("bar"),
        "Bar Percent Chart": makeHighChart("bar", { plotOptions: { series: { stacking: 'percent' } }, }),
        "Column Chart": makeHighChart("column"),
        "Column Percent Chart": makeHighChart("column", { plotOptions: { series: { stacking: 'percent' } }, }),
        "Line Chart": makeHighChart("line"),
        "Pie Chart": makeHighChart("pie"),
        "Spline Chart": makeHighChart("spline"),
        "Stacked Bar Chart": makeHighChart("bar", { plotOptions: { series: { stacking: 'normal' } }, }),
        "Stacked Column Chart": makeHighChart("column", { plotOptions: { series: { stacking: 'normal' } }, }),
        "TreeMap Chart": makeTreemap("treemap"),
    };

})(jQuery);
