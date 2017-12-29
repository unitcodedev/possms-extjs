var TrxPembelianModel = Ext.define('SIForLaP.model.TrxPembelianModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'kode_barang', type: 'string'},
        {name: 'nama_barang', type: 'string'},
        {name: 'qty', type: 'number'},
        {name: 'satuan', type: 'string'},
        {name: 'harga_satuan', type: 'number'},
        {name: 'disc1', type: 'number'},
        {name: 'disc2', type: 'number'},
        {name: 'disc3', type: 'number'},
        {name: 'discrp', type: 'number'},
        {name: 'harga_total', type: 'number'},
        {name: 'exp', type: 'string'},
        {name: 'gdg', type: 'string'},
    ],
    idProperty: 'id'
});
Ext.define('SIForLaP.store.trxpembelian.TrxPembelianStore', {
    extend: 'Ext.data.Store',
    alias: 'store.trxpembelian.trxpembelianStore',
    model: TrxPembelianModel,
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