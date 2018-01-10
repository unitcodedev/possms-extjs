Ext.define('SIForLaP.store.mscustomer.MsCustomerStore', {
    extend: 'Ext.data.Store',
    alias: 'store.mscustomer.mscustomerstore',
    model: 'SIForLaP.model.mscustomer.MsCustomerModel',
    remoteFilter: true,
    autoLoad : true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'Customer/listCustomer',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
