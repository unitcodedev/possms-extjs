/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetMasterSuplier', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'mastersuplier.MasterSuplierStore',
    ],
    views: [
        'mastersuplier.GetMasterSuplier',
        'mastersuplier.MasterSuplierGrid',
        'mastersuplier.MasterSuplierAddWin',
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