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
    $.getJSON("https://312b4fa12a93.ngrok.io", function(resp) {
        var tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = resp.length; i < len; i++) {
            tableData.push({
                "id": resp[i].id,
                "first_name": resp[i].first_name,
                "last_name": resp[i].last_name
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);
    
  
    
})();
