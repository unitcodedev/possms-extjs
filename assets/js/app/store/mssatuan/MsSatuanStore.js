//var MsSatuanModel = Ext.define('SIForLaP.model.MsSatuanModel', {
//    extend: 'Ext.data.Model',
//    fields: [
//        {name: 'ID', type: 'int'},
//        {name: 'Kode', type: 'string'},
//        {name: 'Keterangan', type: 'string'},
//    ],
//    idProperty: 'id'
//});


Ext.define('SIForLaP.store.mssatuan.MsSatuanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.mssatuan.mssatuanStore',
//    model: MsSatuanModel,
    model: 'SIForLaP.model.mssatuan.MsSatuanModel',
    remoteFilter: true,
    autoLoad : true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'satuan/listSatuan',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});