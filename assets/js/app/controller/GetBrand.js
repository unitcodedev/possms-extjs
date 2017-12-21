Ext.define('SIForLaP.controller.GetMsBrand', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'msbrand.MsBrandStore',
    ],
    views: [
        'msbrand.GetMsBrand',
        'msbrand.MsBrandGrid',
    ],
    refs: [
    ],
    init: function () {
        this.control({
        }
        )
    },
});
