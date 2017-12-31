Ext.define('SIForLaP.controller.GetMsSupplier', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'mssupplier.MsSupplierStore',
    ],
    views: [
        'mssupplier.GetMsSupplier',
        'mssupplier.MsSupplierGrid',
    ],
    refs: [
    ],
    init: function () {
        this.control({
        }
        )
    },
});
