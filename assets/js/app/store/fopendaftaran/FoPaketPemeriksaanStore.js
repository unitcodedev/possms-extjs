var FoPaketPemeriksaanModel = Ext.define('SIForLaP.model.FoPaketPemeriksaanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'nama_paket', type: 'string'},
        {name: 'kode_paket', type: 'string'}
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.FoPaketPemeriksaanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.fopaketpemeriksaanstore',
    model: FoPaketPemeriksaanModel,
    storeId: 'fopendaftaranFoPaketPemeriksaanStore',
//    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_paket',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});