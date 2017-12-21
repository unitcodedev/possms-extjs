Ext.define('SIForLaP.store.mskendaraan.MsKendaraanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.mskendaraan.kendaraanstore',
    model: 'SIForLaP.model.mskendaraan.MsKendaraanModel',
    remoteFilter: true,
    autoLoad : true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'Kendaraan/listKendaraan',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
