Ext.define('SIForLaP.store.msbrand.MsBrandStore', {
    extend: 'Ext.data.Store',
    alias: 'store.msbrand.brandstore',
    model: 'SIForLaP.model.msbrand.MsBrandModel',
    remoteFilter: true,
    autoLoad : true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'Brand/listBrand',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
