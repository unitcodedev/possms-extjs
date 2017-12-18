var PelunasanModel = Ext.define('SIForLaP.model.PelunasanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'tgl', type: 'string'},
        {name: 'group', type: 'string'},
        {name: 'no_nota', type: 'string'},
        {name: 'nama', type: 'string'},
        {name: 'tunai', type: 'number'},
        {name: 'non_tunai', type: 'number'},
        {name: 'kurang_bayar', type: 'number'},
        {name: 'total', type: 'number'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.pelunasan.PelunasanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.pelunasan.pelunasanStore',
    model: PelunasanModel,
    remoteFilter: true,
    groupField: 'group',
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pelunasan/list_data',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});