Ext.define('SIForLaP.model.mscustomer.MsCustomerModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'Kode', type: 'string'},
        {name: 'Nama', type: 'string'},
        {name: 'Alamat', type: 'string'},
        {name: 'JenisUsaha', type: 'string'},
        {name: 'Telepon', type: 'string'},
    ],
    idProperty: 'id'
});
