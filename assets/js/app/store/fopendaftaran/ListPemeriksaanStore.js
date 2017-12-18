var ListPemeriksaan = Ext.define('SIForLaP.model.ListPemeriksaanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'kode_barang', type: 'string'},
        {name: 'nama_barang', type: 'string'},
        {name: 'satuan', type: 'string'},
        {name: 'qty', type: 'number'},
        {name: 'harga', type: 'number'},
        {name: 'harga_satuan', type: 'number'},
        {name: 'diskon', type: 'number'},
        {name: 'netto', type: 'number'},
    ],
//    idProperty: 'id'
});

Ext.define('SIForLaP.store.fopendaftaran.ListPemeriksaanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.listpemeriksaanstore',
    model: ListPemeriksaan,
    storeId: 'PendaftaranListPemeriksaanStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
//        url: BASE_PATH + 'pendaftaran/daftar',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});