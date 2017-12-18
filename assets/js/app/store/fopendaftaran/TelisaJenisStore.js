var TelisaJenis = Ext.define('SIForLaP.model.TelisaJenisModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'mtj_name', type: 'string'},
        {name: 'is_active', type: 'boolean'}
    ],
    idProperty: 'id'
});

Ext.define('SIForLaP.store.fopendaftaran.TelisaJenisStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.telisajenisstore',
    model: TelisaJenis,
    storeId: 'AkMtTelisaJenisStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_telisajenis',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});