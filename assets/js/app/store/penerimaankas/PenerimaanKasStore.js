var PenerimaanKasModel = Ext.define('SIForLaP.model.PenerimaanKasModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'tgl_transaksi', type: 'string'},
        {name: 'customer', type: 'string'},
        {name: 'tunai', type: 'number'},
        {name: 'non_tunai', type: 'string'},
        {name: 'group', type: 'string'},
        {name: 'kasir', type: 'string'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.penerimaankas.PenerimaanKasStore', {
    extend: 'Ext.data.Store',
    alias: 'store.penerimaankas.penerimaankasStore',
    model: PenerimaanKasModel,
    groupField: 'group',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'laporan_kas/list_kas',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});