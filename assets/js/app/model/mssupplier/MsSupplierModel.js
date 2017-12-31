Ext.define('SIForLaP.model.mssupplier.MsSupplierModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'Kode', type: 'int'},
        {name: 'Nama', type: 'string'},
        {name: 'Alamat', type: 'string'},
        {name: 'Telepon', type: 'string'},
        {name: 'Fax', type: 'string'},
        {name: 'Kota', type: 'string'},
    ],
    idProperty: 'id'
});
