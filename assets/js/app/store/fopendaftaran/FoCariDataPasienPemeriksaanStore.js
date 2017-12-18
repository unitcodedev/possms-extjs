var FoCariDataPasienPemeriksaanModel = Ext.define('SIForLaP.model.FoCariDataPasienPemeriksaanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'pas_nama', type: 'string'},
        {name: 'kode_pemeriksaan', type: 'string'},
        {name: 'tp_namapemeriksaan', type: 'string'},
        {name: 'tp_harganett', type: 'string'},
        {name: 'tp_hargabruto', type: 'string'},
        {name: 'tp_discount', type: 'string'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.FoCariDataPasienPemeriksaanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.focaridatapasienpemeriksaanstore',
    model: FoCariDataPasienPemeriksaanModel,
    storeId: 'fopendaftaranFoCariDataPasienPemeriksaanStore',
//    autoLoad: true,
    groupField: 'pas_nama',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_caripasien_detailpemeriksaan',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});