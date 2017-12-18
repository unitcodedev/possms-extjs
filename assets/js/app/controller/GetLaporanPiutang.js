/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetLaporanPiutang', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'laporanpiutang.LaporanPiutangStore',
    ],
    views: [
        'laporanpiutang.GetLaporanPiutang',
        'laporanpiutang.LaporanPiutangGrid',
        'laporanpiutang.LaporanPiutangAddWin',
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