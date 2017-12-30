Ext.define('SIForLaP.controller.GetMsBank', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'msbank.MsBankStore',
    ],
    views: [
        'msbank.GetMsBank',
        'msbank.MsBankGrid',
    ],
    refs: [
    ],
    init: function () {
        this.control({
        }
        )
    },
});
