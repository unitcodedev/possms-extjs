Ext.define('SIForLaP.model.msbank.MsBankModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ID', type: 'int'},
        {name: 'Kode', type: 'string'},
        {name: 'Nama', type: 'string'},
        {name: 'AN', type: 'string'},
        {name: 'Rek', type: 'string'},
        {name: 'Akun', type: 'string'},
    ],
    idProperty: 'id'
});
