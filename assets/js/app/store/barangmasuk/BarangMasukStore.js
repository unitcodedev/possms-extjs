var BarangMasukModel = Ext.define('SIForLaP.model.BarangMasukModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'kode_barang', type: 'string'},
        {name: 'nama_barang', type: 'string'},
        {name: 'qty', type: 'number'},
        {name: 'satuan', type: 'string'},
        {name: 'harga_satuan', type: 'number'},
        {name: 'harga_total', type: 'number'},
    ],
    idProperty: 'id'
});
Ext.define('SIForLaP.store.barangmasuk.BarangMasukStore', {
    extend: 'Ext.data.Store',
    alias: 'store.barangmasuk.barangmasukStore',
    model: BarangMasukModel,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'barang_masuk/list_barang_masuk',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});