var DivisiModel = Ext.define('SIForLaP.model.DivisiModel', {
    extend: 'Ext.data.Model',
    fields: [
//        id  Divisi_code  Divisi_alias  Divisi_city  Divisi_address  Divisi_phone  Divisi_active
        {name: 'id', type: 'int'},
        {name: 'msd_nama', type: 'string'},
        {name: 'status', type: 'int'}
//        {name: 'Divisi_city', type: 'string'},
//        {name: 'Divisi_alias', type: 'string'},
//        {name: 'Divisi_city_name', type: 'string'},
//        {name: 'Divisi_address', type: 'string'},
//        {name: 'Divisi_phone', type: 'string'}
    ], 
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.DivisiStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.divisistore',
    model: DivisiModel,
    storeId: 'fopendaftaranDivisiStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_divisi_baru',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});