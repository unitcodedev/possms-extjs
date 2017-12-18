/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetLaporanHutang', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'laporanhutang.LaporanHutangStore',
    ],
    views: [
        'laporanhutang.GetLaporanHutang',
        'laporanhutang.LaporanHutangGrid',
        'laporanhutang.LaporanHutangAddWin',
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