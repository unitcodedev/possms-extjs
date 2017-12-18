/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetMsJenisUsaha', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'msjenisusaha.MsJenisUsahaStore',
    ],
    views: [
        'msjenisusaha.GetMsJenisUsaha',
        'msjenisusaha.MsJenisUsahaGrid',
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