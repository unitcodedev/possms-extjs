/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetTrxPembelian', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'trxpembelian.TrxPembelianStore',
    ],
    views: [
        'trxpembelian.GetTrxPembelian',
        'trxpembelian.TrxPembelianGrid',
        'trxpembelian.TrxPembelianAddWin',
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