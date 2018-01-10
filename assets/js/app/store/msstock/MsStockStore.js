Ext.define('SIForLaP.store.msstock.MsStockStore', {
    extend: 'Ext.data.Store',
    alias: 'store.msstock.msstockStore',
//    model: MsStockModel,
    model: 'SIForLaP.model.msstock.MsStockModel',
    remoteFilter: true,
    autoLoad : true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'stock/listStock',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
