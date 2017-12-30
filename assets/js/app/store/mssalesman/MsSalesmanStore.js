Ext.define('SIForLaP.store.mssalesman.MsSalesmanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.mssalesman.mssalesmanstore',
    model: 'SIForLaP.model.mssalesman.MsSalesmanModel',
    remoteFilter: true,
    autoLoad : true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'Salesman/listSalesman',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
