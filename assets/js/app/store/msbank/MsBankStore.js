Ext.define('SIForLaP.store.msbank.MsBankStore', {
    extend: 'Ext.data.Store',
    alias: 'store.msbank.bankstore',
    model: 'SIForLaP.model.msbank.MsBankModel',
    remoteFilter: true,
    autoLoad : true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'Bank/listBank',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
