var BankModel = Ext.define('SIForLaP.model.BankModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'nama_bank', type: 'string'},
        {name: 'status', type: 'int'},
        {name: 'pot_persen', type: 'string'}
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.BankStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.bankstore',
    model: BankModel,
    storeId: 'fopendaftaranBankStore',
//    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_bank',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});