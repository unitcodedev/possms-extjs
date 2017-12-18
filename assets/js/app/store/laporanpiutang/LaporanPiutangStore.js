var LaporanPiutangModel = Ext.define('SIForLaP.model.LaporanPiutangModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'no_nota', type: 'string'},
        {name: 'kode_customer', type: 'string'},
        {name: 'nama_customer', type: 'string'},
        {name: 'harga_netto', type: 'number'},
        {name: 'kurang_bayar', type: 'number'},
        {name: 'tgl_jatuh_tempo', type: 'string'},
        {name: 'tgl_trx', type: 'string'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.laporanpiutang.LaporanPiutangStore', {
    extend: 'Ext.data.Store',
    alias: 'store.laporanpiutang.laporanpiutangStore',
    model: LaporanPiutangModel,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'laporan_piutang/list_piutang',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});