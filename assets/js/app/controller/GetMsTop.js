/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetMsTop', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'mstop.MsTopStore',
    ],
    views: [
        'mstop.GetMsTop',
        'mstop.MsTopGrid',
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