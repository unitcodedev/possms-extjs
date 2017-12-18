var JenisKartuBankModel = Ext.define('SIForLaP.model.JenisKartuBankModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'jenis_kartu', type: 'string'},
        {name: 'id_bank', type: 'int'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.JenisKartuBankStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.jeniskartubankstore',
    model: JenisKartuBankModel,
    storeId: 'fopendaftaranJenisKartuBankStore',
//    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_jeniskartubank',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});