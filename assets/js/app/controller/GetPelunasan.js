/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetPelunasan', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'pelunasan.PelunasanStore',
    ],
    views: [
        'pelunasan.GetPelunasan',
        'pelunasan.PelunasanGrid',
        'pelunasan.PelunasanAddWin',
        'pelunasan.PelunasanForm',
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