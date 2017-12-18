var MasterDokter = Ext.define('SIForLaP.model.MasterDokterModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'kode_dokter', type: 'string'},
        {name: 'nama_dokter', type: 'string'},
        {name: 'md_kota_1', type: 'string'},   
        {name: 'gelar_depan', type: 'string'},   
        {name: 'gelar_belakang', type: 'string'},   
        {name: 'md_kota_2', type: 'string'},   
        {name: 'md_alamat_praktek1', type: 'string'},   
        {name: 'md_alamat_praktek2', type: 'string'},     
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.MasterDokterStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.masterdokterstore',
    model: MasterDokter,
    storeId: 'masterdokterstore',
//    autoLoad: true,
//    pageSize: 10,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_dokter',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});