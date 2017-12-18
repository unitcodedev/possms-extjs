/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetMsGudang', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'msgudang.MsGudangStore',
    ],
    views: [
        'msgudang.GetMsGudang',
        'msgudang.MsGudangGrid',
        'msgudang.MsGudangAddWin',
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