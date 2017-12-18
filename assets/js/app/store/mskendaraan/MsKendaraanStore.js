var MsKendaraanModel = Ext.define('SIForLaP.model.MsKendaraanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ID', type: 'int'},
        {name: 'Kode', type: 'string'},
        {name: 'Keterangan', type: 'string'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.mskendaraan.MsKendaraanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.mskendaraan.mskendaraanStore',
    model: MsKendaraanModel,
    remoteFilter: true,
    autoLoad : true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'datamaster/list_kendaraan',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});