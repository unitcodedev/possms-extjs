var MasterPersyaratanPaket = Ext.define('SIForLaP.model.MasterPersyaratanPaketModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'integer'},
        {name: 'persyaratan', type: 'string'}, 
        {name: 'status', type: 'string'}, 
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.MasterPersyaratanPaketStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.masterpersyaratanpaketstore',
    model: MasterPersyaratanPaket,
//    storeId: 'masterpersyaratanpaketstore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_persyaratanpaket',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});