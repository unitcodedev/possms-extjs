var CabangModel = Ext.define('SIForLaP.model.CabangModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'msc_nama', type: 'string'},
        {name: 'msc_alamat', type: 'string'}
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.CabangStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.cabangstore',
    model: CabangModel,
    storeId: 'fopendaftaranCabangStore',
//    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_cabang',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});