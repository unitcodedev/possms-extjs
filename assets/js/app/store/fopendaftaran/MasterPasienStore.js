var MasterPasien = Ext.define('SIForLaP.model.MasterPasienModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'pas_id', type: 'string'},
        {name: 'pas_nama', type: 'string'},
        {name: 'pas_telp', type: 'string'},   
        {name: 'pas_hp', type: 'string'},   
        {name: 'pas_tgllahir', type: 'string'},   
        {name: 'umur', type: 'string'},   
        {name: 'pas_jenkelamin', type: 'string'},   
        {name: 'pas_alamat', type: 'string'},   
        {name: 'pas_kota', type: 'string'},   
        {name: 'pas_status', type: 'string'},   
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.MasterPasienStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.masterpasienstore',
    model: MasterPasien,
    storeId: 'masterpasienstore',
//    autoLoad: true,
//    pageSize: 10,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_pasien',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});