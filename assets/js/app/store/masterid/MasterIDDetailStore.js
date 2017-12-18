var MasterIDModel = Ext.define('SIForLaP.model.MasterIDModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'mbd_satuan', type: 'string'},
        {name: 'mbd_harga', type: 'number'},
        {name: 'mbd_konversi', type: 'number'},
        {name: 'satuan', type: 'string'}
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.masterid.MasterIDDetailStore', {
    extend: 'Ext.data.Store',
    alias: 'store.masterid.masterIDDetailStore',
    model: MasterIDModel,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'master_barang/list_barang_detail',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});