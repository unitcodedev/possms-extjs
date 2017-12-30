
Ext.define('SIForLaP.controller.GetMsSalesman', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'mssalesman.MsSalesmanStore',
    ],
    views: [
        'mssalesman.GetMsSalesman',
        'mssalesman.MsSalesmanGrid',
    ],
    refs: [
    ],
    init: function () {
        this.control({
        }
        )
    },
});
