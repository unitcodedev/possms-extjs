Ext.define('SIForLaP.controller.GetMsKendaraan', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'mskendaraan.MsKendaraanStore',
    ],
    views: [
        'mskendaraan.GetMsKendaraan',
        'mskendaraan.MsKendaraanGrid',
    ],
    refs: [
    ],
    init: function () {
        this.control({
        }
        )
    },
});
