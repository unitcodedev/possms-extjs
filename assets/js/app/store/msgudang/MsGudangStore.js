var MsGudangModel = Ext.define('SIForLaP.model.MsGudangModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ID', type: 'int'},
        {name: 'Kode', type: 'string'},
        {name: 'Keterangan', type: 'string'},
        {name: 'Jenis', type: 'string'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.msgudang.MsGudangStore', {
    extend: 'Ext.data.Store',
    alias: 'store.msgudang.msgudangStore',
    model: MsGudangModel,
    remoteFilter: true,
    autoLoad: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'datamaster/list_gudang',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});