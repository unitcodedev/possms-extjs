var LaporanPenjualanModel = Ext.define('SIForLaP.model.LaporanPenjualanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'tgl_transaksi', type: 'string'},
        {name: 'kode_barang', type: 'string'},
        {name: 'nama_barang', type: 'string'},
        {name: 'qty', type: 'number'},
        {name: 'group', type: 'string'},
        {name: 'sub_total', type: 'number'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.laporanpenjualan.LaporanPenjualanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.laporanpenjualan.laporanpenjualanStore',
    model: LaporanPenjualanModel,
    remoteFilter: true,
    groupField: 'group',
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'laporan_penjualan/list_penjualan',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});