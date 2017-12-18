/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetPenerimaanKas', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'penerimaankas.PenerimaanKasStore',
    ],
    views: [
        'penerimaankas.GetPenerimaanKas',
        'penerimaankas.PenerimaanKasGrid',
        'penerimaankas.PenerimaanKasAddWin',
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