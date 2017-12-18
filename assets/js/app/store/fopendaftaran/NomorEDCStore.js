var NomorEDCModel = Ext.define('SIForLaP.model.NomorEDCModel', {
    extend: 'Ext.data.Model',
    fields: [
//        {name: 'id', type: 'int'},
        {name: 'no_edc', type: 'string'},
//        {name: 'id_bank', type: 'int'},
    ],
//    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.NomorEDCStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.nomoredcstore',
    model: NomorEDCModel,
    storeId: 'fopendaftaranNomorEDCStore',
//    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_nomoredc',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});