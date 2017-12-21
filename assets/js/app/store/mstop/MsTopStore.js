var MsTopModel = Ext.define('SIForLaP.model.MsTopModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ID', type: 'int'},
        {name: 'Tempo', type: 'string'},
        {name: 'Keterangan', type: 'string'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.mstop.MsTopStore', {
    extend: 'Ext.data.Store',
    alias: 'store.mstop.mstopStore',
    model: MsTopModel,
    remoteFilter: true,
    autoLoad : true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'datamaster/list_top',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});