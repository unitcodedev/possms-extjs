/**
 * @author Parahita2015
 **/

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
        'mskendaraan.MsKendaraanAddWin',
    ],
    refs: [
    ],
    init: function () {
        this.control({
        }
        )
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */