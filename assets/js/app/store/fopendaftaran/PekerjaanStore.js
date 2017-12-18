var PekerjaanModel = Ext.define('SIForLaP.model.PekerjaanModel', {
    extend: 'Ext.data.Model',
    fields: [
//        id  Pekerjaan_code  Pekerjaan_alias  Pekerjaan_city  Pekerjaan_address  Pekerjaan_phone  Pekerjaan_active
        {name: 'id', type: 'int'},
        {name: 'mspk_nama', type: 'string'},
        {name: 'status', type: 'int'}
//        {name: 'Pekerjaan_city', type: 'string'},
//        {name: 'Pekerjaan_alias', type: 'string'},
//        {name: 'Pekerjaan_city_name', type: 'string'},
//        {name: 'Pekerjaan_address', type: 'string'},
//        {name: 'Pekerjaan_phone', type: 'string'}
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.PekerjaanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.pekerjaanstore',
    model: PekerjaanModel,
    storeId: 'fopendaftaranPekerjaanStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_pekerjaan_baru',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});