/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetMasterCustomer', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'mastercustomer.MasterCustomerStore',
    ],
    views: [
        'mastercustomer.GetMasterCustomer',
        'mastercustomer.MasterCustomerGrid',
        'mastercustomer.MasterCustomerAddWin',
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