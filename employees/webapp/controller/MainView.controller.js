sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        function myChech() {
            var inputEmployee = this.byId("inputEmployee");
            var valueEmployee = inputEmployee.getValue();

            if (valueEmployee.length === 6){
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

            },

            onValidate: myChech 
        });
    });
