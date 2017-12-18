/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetMsSatuan', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'mssatuan.MsSatuanStore',
    ],
    views: [
        'mssatuan.GetMsSatuan',
        'mssatuan.MsSatuanGrid',
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