var MasterPemeriksaanModel = Ext.define('SIForLaP.model.MasterPemeriksaanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'mspem_nama', type: 'string'},
        {name: 'kode_pemeriksaan', type: 'string'},
        {name: 'id_type', type: 'int'},
        {name: 'mspem_rp', type: 'string'},   
        {name: 'jasmed', type: 'string'},   
        {name: 'obat', type: 'string'},   
        {name: 'discount', type: 'string'},   
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.MasterPemeriksaanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.masterpemeriksaanstore',
    model: MasterPemeriksaanModel,
    storeId: 'masterpemeriksaanstore',
//    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_pemeriksaan',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});