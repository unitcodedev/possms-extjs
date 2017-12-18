/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetBarangMasuk', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'barangmasuk.BarangMasukStore',
    ],
    views: [
        'barangmasuk.GetBarangMasuk',
        'barangmasuk.BarangMasukGrid',
        'barangmasuk.BarangMasukAddWin',
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