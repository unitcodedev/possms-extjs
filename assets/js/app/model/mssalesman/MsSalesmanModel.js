Ext.define('SIForLaP.model.mssalesman.MsSalesmanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'Kode', type: 'string'},
        {name: 'Nama', type: 'string'},
        {name: 'Alamat', type: 'string'},
    ],
    idProperty: 'id'
});
