Ext.define('SIForLaP.store.mssupplier.MsSupplierStore', {
    extend: 'Ext.data.Store',
    alias: 'store.mssupplier.mssupplierStore',
    model: 'SIForLaP.model.mssupplier.MsSupplierModel',
    remoteFilter: true,
    autoLoad : true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'supplier/listSupplier',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
