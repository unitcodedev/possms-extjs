/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetMsKota', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'mskota.MsKotaStore',
    ],
    views: [
        'mskota.GetMsKota',
        'mskota.MsKotaGrid',
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