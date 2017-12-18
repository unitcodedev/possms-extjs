/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetLaporanPenjualan', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'laporanpenjualan.LaporanPenjualanStore',
    ],
    views: [
        'laporanpenjualan.GetLaporanPenjualan',
        'laporanpenjualan.LaporanPenjualanGrid',
        'laporanpenjualan.LaporanPenjualanAddWin',
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