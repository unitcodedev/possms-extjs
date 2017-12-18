var LaporanHutangModel = Ext.define('SIForLaP.model.LaporanHutangModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'no_nota', type: 'string'},
        {name: 'kode_suplier', type: 'string'},
        {name: 'nama_suplier', type: 'string'},
        {name: 'no_nota', type: 'string'},
        {name: 'no_trx', type: 'string'},
        {name: 'harga_netto', type: 'number'},
        {name: 'kurang_bayar', type: 'number'},
        {name: 'tgl_jatuh_tempo', type: 'string'},
        {name: 'tgl_trx', type: 'string'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.laporanhutang.LaporanHutangStore', {
    extend: 'Ext.data.Store',
    alias: 'store.laporanhutang.laporanhutangStore',
    model: LaporanHutangModel,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'laporan_hutang/list_hutang',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});