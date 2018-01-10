Ext.define('SIForLaP.controller.GetMsStock', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'msstock.MsStockStore',
    ],
    views: [
        'msstock.GetMsStock',
        'msstock.MsStockGrid',
    ],
    refs: [
    ],
    init: function () {
        this.control({
        }
        )
    },
});
