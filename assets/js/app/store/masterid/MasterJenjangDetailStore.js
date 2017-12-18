var MasterIDModel = Ext.define('SIForLaP.model.MasterIDModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'mjd_id', type: 'int'},
        {name: 'mjd_kode', type: 'string'},
        {name: 'mjd_id', type: 'string'},
        {name: 'mjd_nama', type: 'string'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.masterid.MasterJenjangDetailStore', {
    extend: 'Ext.data.Store',
    alias: 'store.masterid.masterJenjangDetailStore',
    model: MasterIDModel,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'datamaster/list_jenjang_detail',
//        url: BASE_PATH + 'mikrotik/list_hotspot_active',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});