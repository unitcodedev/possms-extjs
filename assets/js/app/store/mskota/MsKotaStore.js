var MsKotaModel = Ext.define('SIForLaP.model.MsKotaModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ID', type: 'int'},
        {name: 'Kode', type: 'string'},
        {name: 'Keterangan', type: 'string'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.mskota.MsKotaStore', {
    extend: 'Ext.data.Store',
    alias: 'store.mskota.mskotaStore',
    model: MsKotaModel,
    remoteFilter: true,
    autoLoad : true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'datamaster/list_kota',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});