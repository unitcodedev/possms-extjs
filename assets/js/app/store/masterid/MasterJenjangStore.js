var MasterIDModel = Ext.define('SIForLaP.model.MasterIDModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'mj_id', type: 'int'},
        {name: 'mj_nama', type: 'string'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.masterid.MasterJenjangStore', {
    extend: 'Ext.data.Store',
    alias: 'store.masterid.masterJenjangStore',
    model: MasterIDModel,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'datamaster/list_jenjang',
//        url: BASE_PATH + 'mikrotik/list_hotspot_active',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});