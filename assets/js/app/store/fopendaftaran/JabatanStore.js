var JabatanModel = Ext.define('SIForLaP.model.JabatanModel', {
    extend: 'Ext.data.Model',
    fields: [
//        id  Jabatan_code  Jabatan_alias  Jabatan_city  Jabatan_address  Jabatan_phone  Jabatan_active
        {name: 'id', type: 'int'},
        {name: 'msj_nama', type: 'string'},
        {name: 'status', type: 'int'}
//        {name: 'Jabatan_city', type: 'string'},
//        {name: 'Jabatan_alias', type: 'string'},
//        {name: 'Jabatan_city_name', type: 'string'},
//        {name: 'Jabatan_address', type: 'string'},
//        {name: 'Jabatan_phone', type: 'string'}
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.JabatanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.jabatanstore',
    model: JabatanModel,
    storeId: 'fopendaftaranJabatanStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'datamaster/list_jabatan_baru',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});