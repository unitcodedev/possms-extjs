var MsJenisUsahaModel = Ext.define('SIForLaP.model.MsJenisUsahaModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ID', type: 'int'},
        {name: 'Kode', type: 'string'},
        {name: 'Keterangan', type: 'string'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.msjenisusaha.MsJenisUsahaStore', {
    extend: 'Ext.data.Store',
    alias: 'store.msjenisusaha.msjenisusahaStore',
    model: MsJenisUsahaModel,
    remoteFilter: true,
    autoLoad : true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'datamaster/list_jenisusaha',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});