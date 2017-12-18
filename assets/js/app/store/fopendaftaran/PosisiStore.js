var PekerjaanModel = Ext.define('SIForLaP.model.PosisiModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'msp_nama', type: 'string'},
        {name: 'status', type: 'int'}
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.PosisiStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.posisistore',
    model: PekerjaanModel,
    storeId: 'fopendaftaranPosisiStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_posisi_baru',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});