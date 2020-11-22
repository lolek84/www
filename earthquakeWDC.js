(function () {
    var myConnector = tableau.makeConnector();
    
    myConnector.init = function(initCallback) {
        initCallback();
        tableau.submit();
    };

    myConnector.getSchema = function (schemaCallback) {
            var cols = [{
        id: "id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "first_name",
        alias: "First name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "last_name",
        alias: "Last name",
        dataType: tableau.dataTypeEnum.string
    }];

    var tableSchema = {
        id: "earthquakeFeed",
        alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
        columns: cols
    };

    schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://202c70b7f2ea.ngrok.io/", function(resp) {
        var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "id": feat[i].id,
                "first_name": feat[i].first_name,
                "last_name": feat[i].last_name
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);
    
  
    
})();
