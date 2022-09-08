// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel 
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("estib.Lists.controller.ListTypes", {
            onInit: function () {

                //vamos instanciar el modelo a la vista
                var oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.loadData("./localService/mockdata/ListData.json");
                this.getView().setModel(oJSONModel);
            },

            getGroupHeader: function (oGroup) {
                var groupHeadeListItem = new sap.m.GroupHeaderListItem({
                    title: oGroup.key,
                    upperCase: true
                });

                return groupHeadeListItem;
            },

            onShowSelectedRow: function () {

                var standardList = this.getView().byId("standardList");
                var selectedItems = standardList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if (selectedItems.length === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));
                } else {

                    var textMessage = i18nModel.getText("selection");

                    for (var item in selectedItems) {
                        var context = selectedItems[item].getBindingContext();
                        var oContext = context.getObject();
                        textMessage = textMessage + "-" + oContext.Material;
                    }

                    sap.m.MessageToast.show(textMessage);
                }

            },

            onDeleteSelectedRow: function () {

                var standardList = this.getView().byId("standardList");
                var selectedItems = standardList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if (selectedItems.length === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));
                } else {

                    var textMessage = i18nModel.getText("Deleted");
                    var model = this.getView().getModel();
                    var products = model.getProperty("/Products");

                    var arrayId = [];


                    for (var i in selectedItems) {
                        var context = selectedItems[i].getBindingContext();
                        var oContext = context.getObject();

                        arrayId.push(oContext.Id);
                        textMessage = textMessage + "-" + oContext.Material;
                    };


                    products = products.filter(function (p) {
                        return !arrayId.includes(p.Id);
                    });

                    model.setProperty("/Products", products); //Quitamos del modelo los registros no selecctionados

                    standardList.removeSelections();

                    sap.m.MessageToast.show(textMessage);
                }
            },


            onDeleteRow: function (oEvent) {

                var selectedRow = oEvent.getParameter("listItem");
                var context = selectedRow.getBindingContext();
                var splitPath = context.getPath().split("/");
                var indexSelecteRow = splitPath[splitPath.length - 1];

                var model = this.getView().getModel();
                var products = model.getProperty("/Products");
                products.splice(indexSelecteRow, 1);

                model.refresh();

            }


        });
    });
