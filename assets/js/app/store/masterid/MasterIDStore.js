var MasterIDModel = Ext.define('SIForLaP.model.MasterIDModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'kode_barang', type: 'string'},
        {name: 'nama_barang', type: 'string'},
        {name: 'harga_beli', type: 'string'},
        {name: 'harga_barang', type: 'string'},
        {name: 'satuan', type: 'string'},
        {name: 'satuan_harga', type: 'string'},
        {name: 'kategori', type: 'string'},
        {name: 'lokasi', type: 'string'},
        {name: 'id_lokasi_barang', type: 'int'},
        {name: 'id_kategori_barang', type: 'int'},
        {name: 'id_satuan_beli', type: 'int'},
        {name: 'id_satuan_harga', type: 'int'},
        {name: 'status', type: 'bool'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.masterid.MasterIDStore', {
    extend: 'Ext.data.Store',
    alias: 'store.masterid.masteridStore',
    model: MasterIDModel,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'master_barang/list_barang',
//        url: BASE_PATH + 'mikrotik/list_hotspot_active',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});