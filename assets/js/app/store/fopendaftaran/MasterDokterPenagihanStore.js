var MasterDokterPenagihan = Ext.define('SIForLaP.model.MasterDokterPenagihanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'kode_dokter', type: 'string'},
        {name: 'nama_dokter', type: 'string'},
        {name: 'md_kota_1', type: 'string'},   
        {name: 'md_kota_2', type: 'string'},   
        {name: 'gelar_depan', type: 'string'},   
        {name: 'gelar_belakang', type: 'string'},   
        {name: 'md_alamat_praktek1', type: 'string'},   
        {name: 'md_alamat_praktek2', type: 'string'},     
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.MasterDokterPenagihanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.masterdokterpenagihanstore',
    model: MasterDokterPenagihan,
    storeId: 'masterdokterpenagihanstore',
//    autoLoad: true,
//    pageSize: 10,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_dokter_penagihan',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});