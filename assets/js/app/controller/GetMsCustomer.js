Ext.define('SIForLaP.controller.GetMsCustomer', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'mscustomer.MsCustomerStore',
    ],
    views: [
        'mscustomer.GetMsCustomer',
        'mscustomer.MsCustomerGrid',
    ],
    refs: [
    ],
    init: function () {
        this.control({
        }
        )
    },
});
