/*import { stringify } from "querystring";*/

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        function myChech() {
            var inputEmployee = this.byId("inputEmployee");
            var valueEmployee = inputEmployee.getValue();

            if (valueEmployee.length === 6) {
                // inputEmployee.setDescription("OK");

                this.byId("labelCountry").setVisible(true);
                this.byId("slCountry").setVisible(true);

            } else {
                // inputEmployee.setDescription("Not OK");

                this.getView().byId("labelCountry").setVisible(false);
                this.getView().byId("slCountry").setVisible(false);
            };
        }

        return Controller.extend("nttdata.employees.controller.MainView", {

            onInit: function () {
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oView = this.getView();
                //var i18nBundle = oView.getModel("i18n").getResourceBundle();

                // var oJSON = {
                //     employeeId: "12345",
                //     countryKey: "UK",
                //     listCountry: [
                //         {
                //             key: "US",
                //             text: "United States"//i18nBundle.getText("countryUS")
                //         },
                //         {
                //             key: "UK",
                //             text: "United Kindom" //i18nBundle.getText("countryUK")
                //         },
                //         {
                //             key: "ES",
                //             text: "Spain"//i18nBundle.getText("countryES")
                //         }
                //     ]
                // };

                //oJSONModel.setData(oJSON);

                oJSONModel.loadData("./localService/mockdata/Employees.json", false);
                // oJSONModel.attachRequestCompleted(function (oEventModel){
                //     console.log(JSON.stringify(oJSONModel.getData()));
                // });
                oView.setModel(oJSONModel);

            },

            

            onFilter: function () {

                var oJSON = this.getView().getModel().getData();

                var filters = [];

                if (oJSON.EmployeeId !== "") {
                    filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSON.EmployeeId));
                };

                if (oJSON.CountryKey !== ""){
                    filters.push(new Filter("Country", FilterOperator.EQ, oJSON.CountryKey));
                };

                var oList = this.getView().byId("tableEmployee");
                var oBinding = oList.getBinding("items");
                oBinding.filter(filters);

            },

            onClearFilter: function () {
                var oModel = this.getView().getModel();
                oModel.setProperty("/EmployeeId", "");
                oModel.setProperty("/CountryKey", "");
            },

            onValidate: myChech,

        });
    });
